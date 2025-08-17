import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import Swal from 'sweetalert2';

const ApplyScholarshipForm = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [scholarship, setScholarship] = useState(null);
    const [formData, setFormData] = useState({
        phone: '',
        photo: '',
        address: '',
        gender: '',
        degree: '',
        ssc: '',
        hsc: '',
        gap: ''
    });

    useEffect(() => {
        const fetchScholarship = async () => {
            try {
                const res = await api.get(`/scholarships/${id}`);
                setScholarship(res.data);
            } catch (err) {
                Swal.fire('Error', 'Failed to fetch scholarship details', 'error');
            }
        };
        fetchScholarship();
    }, [id]);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    console.log(scholarship);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const application = {
                ...formData,
                userName: user.displayName,
                userEmail: user.email,
                userId: user._id,
                scholarshipId: scholarship._id,
                scholarshipName: scholarship.scholarshipName,
                universityName: scholarship.universityName,
                universityAddress: { city: scholarship.universityCity, country: scholarship.universityCountry } || '',
                subjectCategory: scholarship.subjectCategory,
                applicationFees: scholarship.applicationFees,
                serviceCharge: 5,
                appliedAt: new Date().toISOString(),
                status: 'pending'
            };

            const result = await api.post('/applications', application);

            if (result.data.insertedId || result.data.acknowledged) {
                Swal.fire('Success', 'Application submitted successfully!', 'success');
                navigate('/dashboard/user/applications');
            } else {
                throw new Error('Failed to apply.');
            }
        } catch (err) {
            Swal.fire('Error', err.message || 'Something went wrong.', 'error');
        }
    };

    if (!scholarship) return <p>Loading...</p>;

    return (
        <section className="p-6 mx-auto">
            <h2 className="text-2xl font-bold mb-4">Scholarship Application Form</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <div className='flex flex-col gap-2'>
                    <input name="phone" type="text" placeholder="Phone Number" className="input input-bordered" required onChange={handleChange} />
                    <input name="photo" type="url" placeholder="Photo URL" className="input input-bordered" required onChange={handleChange} />
                    <input name="address" type="text" placeholder="Village, District, Country" className="input input-bordered" required onChange={handleChange} />

                    <select name="gender" className="select select-bordered" required onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <select name="degree" className="select select-bordered" required onChange={handleChange}>
                        <option value="">Select Degree</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Masters">Masters</option>
                    </select>

                    <input name="ssc" type="text" placeholder="SSC Result" className="input input-bordered" required onChange={handleChange} />
                    <input name="hsc" type="text" placeholder="HSC Result" className="input input-bordered" required onChange={handleChange} />

                </div>

                <div className='flex flex-col gap-2'>

                    <select name="gap" className="select select-bordered" onChange={handleChange}>
                        <option value="">Study Gap?</option>
                        <option value="None">None</option>
                        <option value="1 Year">1 Year</option>
                        <option value="2+ Years">2+ Years</option>
                    </select>

                    <input value={scholarship.universityName} readOnly className="input input-bordered bg-gray-100" />
                    <input value={scholarship.scholarshipCategory} readOnly className="input input-bordered bg-gray-100" />
                    <input value={scholarship.subjectCategory} readOnly className="input input-bordered bg-gray-100" />

                </div>
                <button type="submit" className="btn bg-accent mt-2">Apply Now</button>
            </form>
        </section>
    );
};

export default ApplyScholarshipForm;
