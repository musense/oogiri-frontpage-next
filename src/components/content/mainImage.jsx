import Image from "next/image";
import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player/youtube'

export default function MainImage({
    imgSrc: mainImage,
    imgAltText
}) {
    const [isVideo, setIsVideo] = useState(false);
    useEffect(() => {
        if (!mainImage) return
        if (mainImage.indexOf('youtube') === -1) return
        setIsVideo(true)

    }, [mainImage]);

    return mainImage && <div className="top-banner-wrapper">
        {isVideo
            ? <ReactPlayer
                url={mainImage}
                playing={false}
                loop={false}
                muted={true}
                width={822}
                height={463}
            />
            : <Image
                className="top-banner"
                src={mainImage}
                width={822}
                height={463}
                alt={imgAltText}
                style={{
                    objectFit: "cover",
                    objectPosition: "50% 50%"
                }}
            />}
    </div>
}
