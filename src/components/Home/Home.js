import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { positions } from '@mui/system';

const Img = ({ src, alt, title, onClick }) => {
    const [hover, setHover] = useState(false)


    return (
        <div style={{
            position: 'relative',
            cursor: 'pointer',
            margin: '10px',

        }}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            onClick={onClick}
        >
            <img
                style={{
                    filter: hover ? 'brightness(.8)' : 'brightness(1)',
                }}
                src={src}
                alt={alt}

            />
            <Typography
                variant="h2"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textShadow: '2px 2px 2px black'
                }}
            >{title}</Typography>
        </div>
    )
}

const Home = () => {
    const navigate = useNavigate()
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',

                }}
            >
                <Img
                    src={"https://www.gap.com/Asset_Archive/GPWeb/content/0028/644/302/assets/NEWARRIVALS.jpg"}
                    onClick={() => navigate('/Store')}
                    alt="Jeans"
                    title="Browse the Collection"
                />
                <Img src="https://www.gap.com/Asset_Archive/GPWeb/content/0028/644/302/assets/SHIRTS.jpg" alt="Jeans" title="Shirts" onClick={() => navigate('/Store/Category:Shirts')} />
                <Img src="https://www.gap.com/Asset_Archive/GPWeb/content/0028/644/302/assets/OUTERWEAR.jpg" alt="Jeans" title="Jackets" onClick={() => navigate('/Store/Category:Jackets')} />
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <Img src="https://www.gap.com/Asset_Archive/GPWeb/content/0028/644/302/assets/PANTS.jpg" alt="Jeans" title="Pants" onClick={() => navigate('/Store/Category:Pants')} />
                <Img src="https://www.gap.com/Asset_Archive/GPWeb/content/0028/644/302/assets/JEANS.jpg" alt="Jeans" title="Jeans" onClick={() => navigate('/Store/Category:Jeans')} />
                <Img src="https://www.gap.com/Asset_Archive/GPWeb/content/0028/644/302/assets/OUTERWEAR.jpg" alt="Jeans" onClick={() => navigate('/Store/Category:Jackets')} />
            </div>

        </div>
    )
}



export default Home