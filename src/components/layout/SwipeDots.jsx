import React from "react";

export default function SwipeDots({
    styles,
    maxSteps,
    activeStep
}) {
    return Array.from(Array(maxSteps),
        (_, index) => <div key={index} className={`${styles['stepper-dot']} ${activeStep === index ? styles['active'] : ''}`} />);
}