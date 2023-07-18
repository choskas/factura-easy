import { useState, useEffect } from 'react'

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = typeof window !== 'undefined' && (window as any)
    function getOrientation() {
        const orientation = width > height && width > 800 ? false : true
        return orientation
    }
    return {
        width,
        height,
        isMobile: getOrientation(),
    }
}

export default function useMediaQuery() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowDimensions
}
