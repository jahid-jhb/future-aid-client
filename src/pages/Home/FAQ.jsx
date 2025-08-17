import React, { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How do I apply for scholarships?",
            answer: "Browse our scholarship listings, select the ones you're eligible for, and click 'Apply Now'. Follow the application instructions and submit required documents through our platform."
        },
        {
            question: "What documents do I need?",
            answer: "Typically, you'll need academic transcripts, letters of recommendation, a personal statement, and proof of eligibility. Specific requirements vary by scholarship."
        },
        {
            question: "Are the scholarships verified?",
            answer: "Yes, all scholarships on our platform are verified and come from trusted institutions and organizations."
        },
        {
            question: "How long does the process take?",
            answer: "The application process varies by scholarship, but typically takes 2-4 weeks from submission to decision."
        }
    ];

    return (
        <section className="mt-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border rounded-lg overflow-hidden"
                        >
                            <button
                                className="w-full px-6 py-4 text-left font-semibold flex justify-between items-center hover:bg-gray-50"
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            >
                                {faq.question}
                                <span className="text-blue-600">
                                    {activeIndex === index ? '−' : '+'}
                                </span>
                            </button>
                            {activeIndex === index && (
                                <div className="px-6 py-4 bg-gray-50">
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;