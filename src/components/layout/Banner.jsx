import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import React, { useState, useCallback } from "react";
import { useAppContext } from "@store/context";
import styles from './css/Banner.module.css'
import Link from 'next/link';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function Banner({ bannerList = [] }) {
    const { state } = useAppContext();
    const [activeStep, setActiveStep] = useState(0);

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
                    <div key={index}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Link href={step.hyperlink}>
                                <Box
                                    className={styles['index-banner-img']}
                                    component="img"
                                    src={step.contentImagePath}
                                />
                            </Link>
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                className={styles['stepper']}
                steps={maxSteps}
                activeStep={activeStep}
                backButton={
                    <Button
                        className={styles['banner-icon']}
                        size="small"
                        onClick={handleBack}>
                        <div className={`${styles['banner-icon']} ${styles['prev']}`} />
                    </Button>
                }
                nextButton={
                    <Button
                        className={styles['banner-icon']}
                        size="small"
                        onClick={handleNext}>
                        <div className={`${styles['banner-icon']} ${styles['next']}`} />
                    </Button>
                }
            />
        </Box >
    );
}
