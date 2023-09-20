import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import React, { useState, useCallback } from "react";
import { useAppContext } from "@store/context";
import styles from './css/Banner.module.css'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function Banner({ bannerList = [] }) {
    console.log("🚀 ~ file: Banner.jsx:15 ~ Banner ~ bannerList:", bannerList)
    const { state } = useAppContext();
    const [activeStep, setActiveStep] = useState(0);
    console.log("🚀 ~ file: Banner.jsx:17 ~ Banner ~ activeStep:", activeStep)

    let maxSteps = bannerList.length

    const handleNext = useCallback(() => {
        setActiveStep((prevActiveStep) => {
            if (prevActiveStep === maxSteps - 1) return 0
            return prevActiveStep + 1
        });
    }, [maxSteps, setActiveStep]);

    const handleBack = useCallback(() => {
        setActiveStep((prevActiveStep) => {
            if (prevActiveStep === 0) return maxSteps - 1
            return prevActiveStep - 1
        });
    }, [maxSteps, setActiveStep]);

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Box className={styles['index-banner']}>
            <AutoPlaySwipeableViews
                interval={4000}
                axis={'x'}
                index={activeStep}
                loop={true}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {bannerList.map((step, index) => (
                    <a key={index} href={step.hyperlink} target="_blank" rel="noopener noreferrer">
                        <div >
                            {Math.abs(activeStep - index) <= 2 ? (
                                <Box
                                    className={styles['index-banner-img']}
                                    component="img"
                                    src={step.contentImagePath}
                                />
                            ) : null}
                        </div>
                    </a>
                ))}
            </AutoPlaySwipeableViews>
            {/* <div> */}
            <Button
                className={`${styles['banner-icon']} ${styles['prev']}`}
                size="small"
                onClick={handleBack}
            />

            <div className={styles['stepper-dots']}>
                {bannerList.map((step, index) => (
                    <div key={index} className={`${styles['stepper-dot']} ${activeStep === index ? styles['active'] : ''}`} />
                ))}
            </div>

            <Button
                className={`${styles['banner-icon']} ${styles['next']}`}
                size="small"
                onClick={handleNext}
            />

        </Box >
    );
}
