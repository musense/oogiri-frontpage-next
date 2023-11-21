import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import React, { useState, useEffect, useCallback } from "react";
import styles from './css/Banner.module.css'
import { useAppContext } from "@store/context";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import YoutubePlayer from "@components/VideoPlayer/YoutubePlayer"
import SwipeDots from "./SwipeDots"
import Image from 'next/image'

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

  const checkBannerTypeAndSetState = useCallback((step) => {
    setLight(false)
    if (bannerList[step].contentImagePath?.indexOf('youtube') !== -1) {
      setVideoClass('start');
      setAutoPlay(false);
    } else {
      setVideoClass('');
      setAutoPlay(true);
    }
  }, [bannerList])

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep === maxSteps - 1) {
        checkBannerTypeAndSetState(0)
        return 0
      }
      checkBannerTypeAndSetState(prevActiveStep + 1)
      return prevActiveStep + 1
    });
  }, [checkBannerTypeAndSetState, maxSteps])

  const handleBack = useCallback(() => {

    setActiveStep((prevActiveStep) => {
      if (prevActiveStep === 0) {
        checkBannerTypeAndSetState(maxSteps - 1)
        return maxSteps - 1
      }
      checkBannerTypeAndSetState(prevActiveStep - 1);
      return prevActiveStep - 1
    });
  }, [checkBannerTypeAndSetState, maxSteps])

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
        {
          bannerList.map((step, index) => (
            step.contentImagePath?.indexOf('youtube') !== -1
              ? <YoutubePlayerBannerWrapper
                key={index}
                index={index}
                step={step}
                activeStep={activeStep}
                mute={mute}
                light={light}
                setLight={setLight}
                setAutoPlay={setAutoPlay}
              />
              : <ImageBannerWrapper
                key={index}
                step={step}
              />
          ))
        }
      </AutoPlaySwipeableViews >

      <InnerPrevButton handleBack={handleBack} />

      <div className={styles['stepper-dots']}>
        <InnerSwipeDots
          styles={styles}
          maxSteps={maxSteps}
          activeStep={activeStep}
        />
      </div>

      <InnerNextButton handleNext={handleNext} />

      {videoClass === 'start' && <div className={`${styles['mute-icon']}`}>
        <InnerMuteIconButton
          mute={mute}
          setMute={setMute}
        />

      </div>}

    </Box >
  );
}

const InnerSwipeDots = React.memo(SwipeDots)
const InnerMuteIconButton = React.memo(MuteIconButton)
const InnerPrevButton = React.memo(PrevButton)
const InnerNextButton = React.memo(NextButton)


function ImageBannerWrapper({
  step
}) {

  const image = <Image
    alt=''
    className={styles['index-banner-img']}
    src={step.contentImagePath}
    fill
  />
  return <BannerWrapper hyperlink={step.hyperlink}>
    {image}
  </BannerWrapper>;
}

function YoutubePlayerBannerWrapper({
  index,
  step,
  activeStep,
  mute,
  light,
  setLight,
  setAutoPlay
}) {
  const youtubePlayer = <YoutubePlayer
    loop={false}
    step={step}
    playing={activeStep === index}
    mute={mute}
    light={light}
    setLight={setLight}
    setAutoPlay={setAutoPlay} />
  return <BannerWrapper hyperlink={step.hyperlink}>
    {youtubePlayer}
  </BannerWrapper>;
}

function BannerWrapper({ hyperlink, children }) {
  return <div className={`${styles['index-banner-wrapper']}`}>
    {hyperlink && <a href={hyperlink} target="_blank" rel="noopener noreferrer" />}
    {children}
  </div>;
}

function MuteIconButton({
  mute,
  setMute
}) {
  return mute
    ? <VolumeOffIcon
      sx={{
        color: '#fff',
        fontSize: 30,
      }}
      onClick={() => setMute(false)} />
    : <VolumeUpIcon
      sx={{
        color: '#fff',
        fontSize: 30,
      }}
      onClick={() => setMute(true)} />;
}

function NextButton({ handleNext }) {
  return <Button
    className={`${styles['banner-icon']} ${styles['next']}`}
    size="small"
    onClick={handleNext} />;
}

function PrevButton({ handleBack }) {
  return <Button
    className={`${styles['banner-icon']} ${styles['prev']}`}
    size="small"
    onClick={handleBack} />;
}
