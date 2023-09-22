import React from "react";
import ReactPlayer from 'react-player/youtube'

export default function YoutubePlayer({
    loop,
    step,
    playing,
    mute,
    light,
    setLight
}) {

    return <ReactPlayer
        url={step.contentImagePath}
        playing={playing}
        loop={loop}
        muted={mute} // Mute the video in order to autoplay on mobile devices
        volume={0.8}
        controls={false}
        playbackRate={1.0}
        config={{
            youtube: {
                playerVars: {
                    showinfo: 0,
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
        onPlay={() => {
            setLight(false)
            console.log("🚀 ~ file: Banner.jsx:110 ~ ReactPlayer onPlay!!!");
        }}
        onPause={() => {
            console.log("🚀 ~ file: Banner.jsx:110 ~ ReactPlayer onPause!!!");
        }}
        onEnded={() => {
            console.log("🚀 ~ file: Banner.jsx:110 ~ ReactPlayer onEnded!!!");
            setLight(true);
        }} />;
}
