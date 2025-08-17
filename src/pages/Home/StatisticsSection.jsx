const StatisticsSection = () => {
    return (
        <section className="mt-20">
            <div className="max-w-6xl mx-auto py-10 rounded-2xl bg-base-200">
                <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-accent mb-2">1000+</div>
                        <div className="text-gray-600">Scholarships</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-accent mb-2">5000+</div>
                        <div className="text-gray-600">Students Helped</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-accent mb-2">50+</div>
                        <div className="text-gray-600">Countries</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-accent mb-2">$10M+</div>
                        <div className="text-gray-600">Awarded</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatisticsSection;