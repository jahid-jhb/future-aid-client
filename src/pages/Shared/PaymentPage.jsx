import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const PaymentPage = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');

    // Data from Apply Page (scholarship, fees, etc.)
    const { scholarship } = location.state || {};
    const applicationFees = parseFloat(scholarship?.applicationFees) || 0;

    // Create payment intent
    useEffect(() => {
        if (applicationFees > 0) {
            api.post('/create-payment-intent', { amount: applicationFees * 100 }) // cents
                .then(res => setClientSecret(res.data.clientSecret))
                .catch(err => {
                    console.error(err);
                    setError('Failed to initialize payment.');
                });
        }
    }, [applicationFees]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !clientSecret) return;

        setProcessing(true);

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { paymentMethod, error: methodErr } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (methodErr) {
            setError(methodErr.message);
            setProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmErr } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
        });

        if (confirmErr) {
            setError(confirmErr.message);
            setProcessing(false);
            return;
        }

        // On success, store application
        // const applicationData = {
        //     scholarshipId: scholarship._id,
        //     scholarshipName: scholarship.scholarshipName,
        //     universityName: scholarship.universityName,
        //     degree: scholarship.degree,
        //     applicationFees,
        //     status: 'pending',
        //     appliedAt: new Date(),
        //     userEmail: user.email,
        //     transactionId: paymentIntent.id,
        // };

        // try {
        //     await api.post('/applications', applicationData);
        //     Swal.fire('Success!', 'Application & payment completed.', 'success');
        //     navigate('/dashboard/user/applications');
        // } catch (err) {
        //     console.error(err);
        //     Swal.fire('Error', 'Payment succeeded but failed to submit application.', 'error');
        // } finally {
        //     setProcessing(false);
        // }

        navigate(`/application-form/${scholarship._id}`);
    };

    return (
        <section className="max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Pay Application Fee</h2>
            <div className="card shadow-lg bg-base-200 p-6">
                <p className="mb-4 font-semibold">
                    Scholarship: <span className="text-primary">{scholarship?.scholarshipName}</span><br />
                    Amount: <span className="text-green-600">${applicationFees}</span>
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="bg-white p-4 rounded border mb-4">
                        <CardElement options={{ hidePostalCode: true }} />
                    </div>

                    {error && <p className="text-red-500 mb-2">{error}</p>}

                    <button
                        className="btn btn-primary w-full"
                        type="submit"
                        disabled={!stripe || !clientSecret || processing}
                    >
                        {processing ? 'Processing...' : 'Pay Now'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default PaymentPage;
