import React from 'react';

const stories = [
    {
        name: 'Maria Khan',
        image: 'https://i.ibb.co/Y4T3L26b/user.png',
        story: '“Thanks to FutureAid, I received a full scholarship at a top UK university. The process was smooth and transparent!”',
    },
    {
        name: 'Arif Rahman',
        image: 'https://i.ibb.co/Y4T3L26b/user.png',
        story: '“I never thought studying abroad was possible for me, but this platform connected me with the right opportunity.”',
    },
];

const SuccessStoriesSection = () => {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">🌟 Success Stories</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {stories.map((s, i) => (
                        <div key={i} className="bg-base-100 border p-6 rounded-lg shadow">
                            <div className="flex items-center mb-4 gap-4">
                                <img src={s.image} alt={s.name} className="w-14 h-14 rounded-full border" />
                                <div>
                                    <h4 className="text-lg font-semibold">{s.name}</h4>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">"{s.story}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessStoriesSection;
