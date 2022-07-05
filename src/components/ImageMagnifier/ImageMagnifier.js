import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';


const ImageMagnifier = ({ src,  magnifierHeight = 400, magnifierWidth = 300, zoomLevel = 1.7 }) => {


    const [showMagnifier, setShowMagnifier] = useState(false);
    
    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
    const [[x, y], setXY] = useState([0, 0]);
    const [loaded, setLoaded] = useState(false)
    

    return (
        <div
            style={{
                position: 'relative',
            }}
        >

            <img
                src={src}
                style={{
                    display: loaded ? "block" : "none",
                    maxWidth: '100%',
                    height: 'auto',
                    cursor: 'none',
                }}
                alt={"img"}
                onLoad={() => setLoaded(true)}
                onMouseEnter={(e) => {
                    // update image size and turn-on magnifier
                    const elem = e.currentTarget;
                    const { width, height } = elem.getBoundingClientRect();
                    setSize([width, height]);

                    setShowMagnifier(true);
                }}
                onMouseLeave={() => {
                    setShowMagnifier(false);
                }}

                onMouseMove={(e) => {
                    // update cursor position
                    const elem = e.currentTarget;
                    const { top, left } = elem.getBoundingClientRect();

                    // calculate cursor position on the image
                    const x = e.pageX - left - window.pageXOffset;
                    const y = e.pageY - top - window.pageYOffset;
                    setXY([x, y]);
                }}
            />
            <Box
                sx={{
                    display: showMagnifier && loaded ? "" : "none",
                    position: "absolute",
                    zIndex: '2',

                    // prevent magnifier blocks the mousemove event of img
                    pointerEvents: "none",
                    // set size of magnifier
                    height: `${magnifierHeight}px`,
                    width: `${magnifierWidth}px`,
                    // move element center to cursor pos
                    top: `${y - magnifierHeight / 2}px`,
                    left: `${x - magnifierWidth / 2}px`,
                    opacity: "1", // reduce opacity so you can verify position
                    border: "1px solid lightgray",
                    backgroundColor: "background.paper",
                    backgroundImage: `url('${src}')`,
                    backgroundRepeat: "no-repeat",

                    //calculate zoomed image size
                    backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel
                        }px`,

                    //calculate position of zoomed image.
                    backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
                    backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
                }}
            />
            <Skeleton sx={{display: loaded ? "none" : "block"}} height={1000}></Skeleton>
        </div>
    )
}


export default ImageMagnifier