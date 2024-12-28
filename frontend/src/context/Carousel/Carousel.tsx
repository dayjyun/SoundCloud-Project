import React from "react";
import { useEffect, useState } from "react"
import "./Carousel.scss"

export const Carousel = ({ images, context }: { images: string, context: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((currentIndex) => (currentIndex++) % images.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [images.length])

    const handleImageDot = (index) => {
        setCurrentIndex(index)
    }

    return (
        <div className={context}>
        </div>
    )
}
