import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import React, { useState, useEffect } from "react";
import styles from './css/Banner.module.css'
import { useAppContext } from "@store/context";
import { white } from '@mui/material/colors';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import YoutubePlayer from "@components/VideoPlayer/YoutubePlayer"
import SwipeDots from "./SwipeDots"

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function Banner({ bannerList = [] }) {

    const { state } = useAppContext();
    console.log("🚀 ~ file: Banner.jsx:15 ~ Banner ~ bannerList:", bannerList)
    const [autoPlay, setAutoPlay] = useState(true);
    const maxSteps = bannerList.length
    const [mute, setMute] = useState(false);
    const [videoClass, setVideoClass] = useState('');
    const [activeStep, setActiveStep] = useState(0);
    const [light, setLight] = useState(false);

    useEffect(() => {
        if (state.clientWidth <= 768) {
            setMute(true)
            return
        }
        setMute(false)
    }, [state.clientWidth]);

    const checkBannerTypeAndSetState = (step) => {
        setLight(false)
        if (bannerList[step].contentImagePath?.indexOf('youtube') !== -1) {
            setVideoClass('start');
            setAutoPlay(false);
        } else {
            setVideoClass('');
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
                {bannerList.map((step, index) => (
                    step.contentImagePath?.indexOf('youtube') !== -1
                        ? <div key={index} className={`${styles['index-banner-img']}`}>
                            <a href={step.hyperlink} target="_blank" rel="noopener noreferrer" />
                            <YoutubePlayer
                                loop={true}
                                step={step}
                                playing={activeStep === index}
                                mute={mute}
                                light={false}
                                setLight={setLight}
                            />
                        </div>
                        : <a key={index} href={step.hyperlink} target="_blank" rel="noopener noreferrer">
                            <Box
                                className={styles['index-banner-img']}
                                component="img"
                                src={step.contentImagePath}
                            />
                        </a>
                ))}
            </AutoPlaySwipeableViews >
            < Button
                className={`${styles['banner-icon']} ${styles['prev']}`}
                size="small"
                onClick={handleBack}
            />

            <div className={styles['stepper-dots']}>
                <SwipeDots
                    styles={styles}
                    maxSteps={maxSteps}
                    activeStep={activeStep}
                />
            </div>

            <Button
                className={`${styles['banner-icon']} ${styles['next']}`}
                size="small"
                onClick={handleNext}
            />
            {videoClass === 'start' && <div className={`${styles['mute-icon']}`}>
                {
                    mute
                        ? <VolumeOffIcon
                            sx={{
                                color: '#fff',
                                fontSize: 30,
                            }}
                            onClick={() => setMute(false)}
                        />
                        : <VolumeUpIcon
                            sx={{
                                color: '#fff',
                                fontSize: 30,
                            }}
                            onClick={() => setMute(true)}
                        />
                }
            </div>}
        </Box >
    );


}
