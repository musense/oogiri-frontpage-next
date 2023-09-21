import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import React, { useState } from "react";
import styles from './css/Banner.module.css'
import ReactPlayer from 'react-player/youtube'
import { useAppContext } from "@store/context";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function Banner({ bannerList = [] }) {

    const { state } = useAppContext();
    console.log("🚀 ~ file: Banner.jsx:15 ~ Banner ~ bannerList:", bannerList)
    const [autoPlay, setAutoPlay] = useState(true);
    const [videoClass, setVideoClass] = useState('start');
    const [activeStep, setActiveStep] = useState(0);
    const [light, setLight] = useState(false);

    let maxSteps = bannerList.length

    const checkBannerTypeAndSetState = (step) => {
        setLight(false)
        if (bannerList[step].contentImagePath.indexOf('youtube') !== -1) {
            setVideoClass('start');
            setAutoPlay(false);
        } else {
            setAutoPlay(true);
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => {
            if (prevActiveStep === maxSteps - 1) {
                checkBannerTypeAndSetState(0)
                return 0
            }
            checkBannerTypeAndSetState(prevActiveStep + 1)
            return prevActiveStep + 1
        });
    }

    const handleBack = () => {

        setActiveStep((prevActiveStep) => {
            if (prevActiveStep === 0) {
                checkBannerTypeAndSetState(maxSteps - 1)
                return maxSteps - 1
            }
            checkBannerTypeAndSetState(prevActiveStep - 1);
            return prevActiveStep - 1
        });
    }

    const handleStepChange = (step) => {
        setActiveStep(step);
        checkBannerTypeAndSetState(step);
    };

    return (
        <Box className={styles['index-banner']}>
            <AutoPlaySwipeableViews
                autoplay={autoPlay}
                interval={4000}
                axis={'x'}
                index={activeStep}
                loop={true}
                onChangeIndex={handleStepChange}
                slideClassName={styles['banner']}
            >
                {bannerList.map((step, index) => {
                    return Math.abs(activeStep - index) <= 2 ? (
                        step.contentImagePath.indexOf('youtube') !== -1
                            ? <div key={index} className={`${styles['index-banner-img']} ${styles['player']} ${videoClass === 'start' ? styles['start'] : styles['end']}`}>
                                <a href={step.hyperlink} target="_blank" rel="noopener noreferrer" />
                                <ReactPlayer
                                    url={step.contentImagePath}
                                    playing={true}
                                    muted={state.clientWidth <= 768 ? true : false} // Mute the video
                                    config={{
                                        youtube: {
                                            playerVars: {
                                                showinfo: 0,
                                                controls: 0,
                                                disablekb: 1,
                                                loop: 0,
                                                playsinline: 1,
                                            }
                                        },
                                    }}
                                    width="100%"
                                    height="100%"
                                    light={light}
                                    playIcon={<div />}
                                    onEnded={() => {
                                        setVideoClass('end')
                                        setLight(true)
                                    }}
                                />
                            </div>
                            : <a key={index} href={step.hyperlink} target="_blank" rel="noopener noreferrer">
                                <Box
                                    className={styles['index-banner-img']}
                                    component="img"
                                    src={step.contentImagePath}
                                />
                            </a>
                    ) : null
                })
                }
            </AutoPlaySwipeableViews >
            < Button
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
