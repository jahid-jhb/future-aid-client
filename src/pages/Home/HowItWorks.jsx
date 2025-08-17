const HowItWorks = () => {
    return (
        <section className="mt-20">
            <div className="max-w-6xl mx-auto bg-base-200 py-10 rounded-2xl px-1">
                <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 border-2 border-accent rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl text-accent">1</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Browse Scholarships</h3>
                        <p className="text-gray-600">Explore our extensive database of scholarships matching your profile</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 border-2 border-accent rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl text-accent">2</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Apply Online</h3>
                        <p className="text-gray-600">Submit your applications easily through our platform</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 border-2 border-accent rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl text-accent">3</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Get Support</h3>
                        <p className="text-gray-600">Receive guidance and track your application status</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;