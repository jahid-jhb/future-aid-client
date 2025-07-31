import React from 'react';
import Banner from './Banner';
import TopScholarships from './TopScholarships';
import ReviewSlider from '../../components/ReviewSlider';
import TopCategoriesSection from './TopCategoriesSection';
import SuccessStoriesSection from './SuccessStoriesSection';

const Home = () => {
    return (
        <div>
            <Banner />
            <TopScholarships />
            <TopCategoriesSection />
            <SuccessStoriesSection />
        </div>
    );
};

export default Home;
