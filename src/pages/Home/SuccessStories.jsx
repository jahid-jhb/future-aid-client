import React from 'react';

const SuccessStories = () => {
    return (
        <section className="mt-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Story 1 */}
                    <div className="bg-base-300 p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <img
                                src="/success1.png"
                                alt="Student 1"
                                className="w-16 h-16 rounded-full object-cover mr-4"
                            />
                            <div>
                                <h3 className="font-semibold">Sarah Johnson</h3>
                                <p className="text-sm text-gray-600">Harvard University</p>
                            </div>
                        </div>
                        <p className="text-gray-600">
                            "FutureAid helped me secure a full scholarship at Harvard.
                            Their platform made the application process seamless!"
                        </p>
                    </div>

                    {/* Story 2 */}
                    <div className="bg-base-300 p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <img
                                src="/success2.png"
                                alt="Student 2"
                                className="w-16 h-16 rounded-full object-cover mr-4"
                            />
                            <div>
                                <h3 className="font-semibold">Michael Chen</h3>
                                <p className="text-sm text-gray-600">MIT</p>
                            </div>
                        </div>
                        <p className="text-gray-600">
                            "I found my dream scholarship through FutureAid.
                            Now I'm studying Computer Science at MIT!"
                        </p>
                    </div>

                    {/* Story 3 */}
                    <div className="bg-base-300 p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <img
                                src="/success3.png"
                                alt="Student 3"
                                className="w-16 h-16 rounded-full object-cover mr-4"
                            />
                            <div>
                                <h3 className="font-semibold">Emma Davis</h3>
                                <p className="text-sm text-gray-600">Oxford University</p>
                            </div>
                        </div>
                        <p className="text-gray-600">
                            "The guidance and support from FutureAid were invaluable.
                            I'm now pursuing my PhD at Oxford!"
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SuccessStories;
