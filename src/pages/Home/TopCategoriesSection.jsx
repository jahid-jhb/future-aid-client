import React from 'react';

const categories = [
    { name: 'Engineering', icon: '⚙️' },
    { name: 'Business', icon: '📈' },
    { name: 'Medical', icon: '🧬' },
    { name: 'Arts & Humanities', icon: '🎨' },
    { name: 'Computer Science', icon: '💻' },
    { name: 'Law', icon: '⚖️' },
];

const TopCategoriesSection = () => {
    return (
        <section className="py-12 bg-base-200 mt-8">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6">🎓 Top Scholarship Categories</h2>
                <p className="mb-10 text-gray-600">Explore scholarships based on your field of interest.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                            <div className="text-4xl mb-2">{cat.icon}</div>
                            <h4 className="font-semibold">{cat.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopCategoriesSection;
