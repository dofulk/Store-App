
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { ImageListItem, ImageListItemBar, Link, Skeleton } from '@mui/material';
import currency from 'currency.js';
import { styled } from '@mui/system';

const Img = styled('img')({
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
    cursor: 'pointer'

});

const ItemListItem = ({ item }) => {

    const [loaded, setLoaded] = useState(false)
    const [hover, setHover] = useState(false)
    let navigate = useNavigate();

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ImageListItem key={item.code} style={{ display: loaded ? "block" : "none" }}>

                <div style={{
                    backgroundColor: '#ffffff',
                }}
                    onClick={() => navigate(`/Product/${item.code}`)}
                    onMouseOver={() => setHover(true)}
                    onMouseOut={() => setHover(false)}>
                    {hover && item.srcs.length > 1 ?
                        <Img src={item.srcs[1]} alt="//:0" />

                        :
                        <Img src={item.srcs[0]} alt={"img"} onLoad={() => setLoaded(true)} />

                    }

                </div>


                <ImageListItemBar
                    title={<Link color="inherit" underline="hover" style={{ cursor: "pointer" }} onClick={() => navigate(`/Product/${item.code}`)}>{item.title}</Link>}
                    subtitle={<span>{currency(item.price).format()}</span>}
                    position="below"
                >
                </ImageListItemBar>

            </ImageListItem>
            <div style={{ width: '100%', height: '100%', display: loaded ? "none" : "block" }}>
                <Skeleton variant="rectangular" height={300} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </div>
        </div>
    )
}


export default ItemListItem

