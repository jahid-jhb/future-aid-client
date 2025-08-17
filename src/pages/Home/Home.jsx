import React from 'react';
import Banner from './Banner';
import TopScholarships from './TopScholarships';
import StatisticsSection from './StatisticsSection';
import HowItWorks from './HowItWorks';
import FeaturedUniversities from './FeaturedUniversities';
import SuccessStories from './SuccessStories';
import FAQ from './FAQ';
import ReviewSlider from '../../components/ReviewSlider';
import NewsletterSection from './NewsletterSection';

const Home = () => {
    return (
        <div>
            <Banner />
            <StatisticsSection />
            <TopScholarships />
            <HowItWorks />
            <FeaturedUniversities />
            <SuccessStories />
            {/* <ReviewSlider /> */}
            <FAQ />
            <NewsletterSection />
        </div>
    );
};

export default Home;
