import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';

const AdminAddScholarship = () => {
    const { user } = useAuth();
    const [uploading, setUploading] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    const imgbbAPI = import.meta.env.VITE_IMGBB_API_KEY;

    const onSubmit = async (data) => {
        setUploading(true);
        const imageFile = data.universityImage[0];

        // Upload to imgbb
        const formData = new FormData();
        formData.append('image', imageFile);

        let imageUrl;
        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPI}`, {
                method: 'POST',
                body: formData
            });
            const imgRes = await res.json();
            if (imgRes.success) {
                imageUrl = imgRes.data.url;
            } else {
                throw new Error('Image upload failed');
            }
        } catch (err) {
            setUploading(false);
            return Swal.fire('Error', err.message, 'error');
        }

        // Prepare data
        const scholarshipData = {
            scholarshipName: data.scholarshipName,
            universityName: data.universityName,
            universityImage: imageUrl,
            universityCountry: data.universityCountry,
            universityCity: data.universityCity,
            universityRank: data.universityRank,
            subjectCategory: data.subjectCategory,
            scholarshipCategory: data.scholarshipCategory,
            degree: data.degree,
            tuitionFees: Number(data.tuitionFees || 0),
            applicationFees: Number(data.applicationFees),
            serviceCharge: Number(data.serviceCharge),
            applicationDeadline: data.applicationDeadline,
            postDate: new Date().toISOString(),
            stipend: data.stipend || null,
            description: data.description || '',
            postedUserEmail: user?.email
        };

        // Post to backend
        try {
            const res = await api.post('/scholarships', scholarshipData);
            if (res.data.insertedId || res.data.acknowledged) {
                Swal.fire('Success!', 'Scholarship added successfully!', 'success');
                reset();
            }
        } catch (err) {
            Swal.fire('Error', 'Failed to add scholarship', 'error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <section className="max-w-4xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Add New Scholarship</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input {...register('scholarshipName')} className="input input-bordered w-full" placeholder="Scholarship Name" required />
                <input {...register('universityName')} className="input input-bordered w-full" placeholder="University Name" required />
                <input type="file" {...register('universityImage')} className="file-input file-input-bordered w-full" required />
                <input {...register('universityCountry')} className="input input-bordered w-full" placeholder="Country" required />
                <input {...register('universityCity')} className="input input-bordered w-full" placeholder="City" required />
                <input {...register('universityRank')} className="input input-bordered w-full" placeholder="World Rank" required />

                <select {...register('subjectCategory')} className="select select-bordered w-full" required>
                    <option value="">Subject Category</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Doctor">Doctor</option>
                </select>

                <select {...register('scholarshipCategory')} className="select select-bordered w-full" required>
                    <option value="">Scholarship Category</option>
                    <option value="Full fund">Full fund</option>
                    <option value="Partial">Partial</option>
                    <option value="Self-fund">Self-fund</option>
                </select>

                <select {...register('degree')} className="select select-bordered w-full" required>
                    <option value="">Degree</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                </select>

                <input {...register('tuitionFees')} type="number" className="input input-bordered w-full" placeholder="Tuition Fees (optional)" />
                <input {...register('applicationFees')} type="number" className="input input-bordered w-full" placeholder="Application Fees" required />
                <input {...register('serviceCharge')} type="number" className="input input-bordered w-full" placeholder="Service Charge" required />
                <input {...register('applicationDeadline')} type="date" className="input input-bordered w-full" placeholder="Deadline" required />
                <input {...register('stipend')} className="input input-bordered w-full" placeholder="Stipend (optional)" />

                <textarea {...register('description')} className="textarea textarea-bordered md:col-span-2 w-full" placeholder="Description"></textarea>

                <button type="submit" className="btn bg-accent md:col-span-2">
                    {uploading ? 'Uploading...' : 'Add Scholarship'}
                </button>
            </form>
        </section>
    );
};

export default AdminAddScholarship;
