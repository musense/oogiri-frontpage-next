import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import React, { useState, useCallback } from "react";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        imgPath:
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        imgPath:
            'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    },
    {
        imgPath:
            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
];

export default function Banner() {

    const [activeStep, setActiveStep] = useState(0);

    let maxSteps = images.length

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
        <Box
            className="index-banner"
            sx={{ flexGrow: 1 }}>
            <AutoPlaySwipeableViews
                interval={4000}
                axis={'x'}
                index={activeStep}
                loop={true}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {images.map((step, index) => (
                    <div key={index}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    display: 'block',
                                    width: '100%',
                                    height: '636px',
                                    overflow: 'hidden',
                                    objectFit: 'cover',
                                }}
                                src={step.imgPath}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                className='stepper'
                steps={maxSteps}
                activeStep={activeStep}
                nextButton={
                    <Button
                        className="banner-icon"
                        size="small"
                        onClick={handleNext}>
                        <div className="banner-icon next" />
                    </Button>
                }
                backButton={
                    <Button
                        className="banner-icon"
                        size="small"
                        onClick={handleBack}>
                        <div className="banner-icon prev" />
                    </Button>
                }
            />
        </Box >
    );
}
