import Image from "next/image";
import React, { useMemo } from "react";
import Iframe from "react-iframe";

export default function MainImage({
    imgSrc: mainImage,
    imgAltText
}) {
    const isVideo = mainImage && mainImage.indexOf('<iframe') !== -1;
    const iframeUrl = useMemo(() => {
        if (!isVideo) return null
        const indexOf = mainImage.indexOf(`src="`) + `src="`.length;
        const endIndexOf = mainImage.indexOf(`"`, indexOf);
        const property = mainImage.substr(indexOf, endIndexOf - indexOf);
        return property
    }, [isVideo, mainImage])

    return (
        <div className="top-banner-wrapper">
            {mainImage && (
                isVideo
                    ? <Iframe
                        className="top-banner"
                        url={iframeUrl}
                        loading='lazy'
                        width="100%"
                        height="100%"
                        display="block"
                        position="relative"

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
                    />)}
        </div>
    )
}
