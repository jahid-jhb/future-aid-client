const NewsletterSection = () => {
    return (
        <section className="mt-20">
            <div className="max-w-6xl mx-auto text-center bg-base-200 py-10 rounded-2xl">
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="text-gray-600 mb-8">Subscribe to our newsletter for the latest scholarships and opportunities</p>
                <form className="max-w-md mx-auto flex gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-2 rounded focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="btn btn-accent"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
};

export default NewsletterSection;
