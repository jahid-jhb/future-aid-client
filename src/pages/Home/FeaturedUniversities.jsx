const FeaturedUniversities = () => {
    const universities = [
        {
            name: "Harvard University",
            logo: "/harvard.png"
        },
        {
            name: "Stanford University",
            logo: "/stanford.png"
        },
        {
            name: "MIT",
            logo: "/mit.png"
        },
        {
            name: "Oxford University",
            logo: "/oxford.png"
        },
        {
            name: "Cambridge University",
            logo: "/cambridge.png"
        },
        {
            name: "Yale University",
            logo: "/yale.png"
        },
        {
            name: "Princeton University",
            logo: "/Princeton.png"
        },
        {
            name: "Columbia University",
            logo: "/columbia.png"
        }
    ];

    return (
        <section className="mt-20">
            <div className="max-w-6xl mx-auto bg-base-200 py-10 rounded-2xl">
                <h2 className="text-3xl font-bold text-center mb-12">Featured Universities</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {universities.map((uni, index) => (
                        <div key={index} className="flex items-center justify-center">
                            <img
                                src={uni.logo}
                                alt={uni.name}
                                className="h-20 object-contain grayscale hover:grayscale-0 transition duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedUniversities;
