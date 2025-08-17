import React from 'react';
import { CiDark, CiLight } from 'react-icons/ci';

const ToggleButton = ({ data }) => {

    const { darkMode, setDarkMode } = data;

    return (
        <>
            <button onClick={() => setDarkMode(!darkMode)} className='rounded-full transition-all cursor-pointer'>
                {
                    darkMode ?
                        <CiLight size={32} /> :
                        <CiDark size={32} />
                }
            </button>
        </>
    );
};

export default ToggleButton;
