
import { Container, Grid, ImageList, ImageListItem, ImageListItemBar, Chip, FormGroup, FormControlLabel, Checkbox, Slider, TextField, InputAdornment, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import './ItemList.css'
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import currency from 'currency.js';
import ItemListItem from '../components/ItemListItem/ItemListItem';
import { SettingsInputAntennaTwoTone } from '@mui/icons-material';
import { color } from '@mui/system';
import NumberFormat from 'react-number-format';




const ItemList = () => {

    const navigate = useNavigate()
    let params = useParams()

    const [categories, setCategories] = useState([])
    const [colors, setColors] = useState([])
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");



    useEffect(() => {
        setCategories([])
        setColors([])
        if (params.tags) {
            let tags = params.tags.split('+')

            for (let tag in tags) {
                let splitTag = tags[tag].split(':')
                switch (splitTag[0]) {
                    case 'Category':
                        console.log(splitTag[1].split('|'))
                        setCategories(splitTag[1].split('|'))
                        break;
                    case 'Color':
                        setColors(splitTag[1].split('|'))
                        break;
                    default:
                        return
                }

            }

        }
    }, [params.tags])


    const items = useSelector(state => state.products.items)

    const changeParams = (newTagName, newTagItems) => {
        let newTags = []
        if (newTagItems.length) {
            newTags.push(newTagName + ':' + newTagItems.join('|'))
        }
        if (categories.length && newTagName !== 'Category') {
            newTags.push('Category:' + categories.join('|'))
        }
        if (colors.length && newTagName !== 'Color') {
            newTags.push('Color:' + colors.join('|'))
        }
        let newParams = newTags.join('+')
        navigate(`/Store/${newParams}`)
    }

    const changeCategory = (event) => {
        if (event.target.checked) {
            let newCategories = [...categories, event.target.name]
            changeParams('Category', newCategories)
        } else {
            let newCategories = categories.filter(tag => tag !== event.target.name)
            changeParams('Category', newCategories)
        }

    }


    const changeColor = (event) => {
        if (event.target.checked) {
            let newColors = [...colors, event.target.name]
            changeParams('Color', newColors)
        } else {
            let newColors = colors.filter(tag => tag !== event.target.name)
            changeParams('Color', newColors)
        }

    }
    const deleteColor = (color) => {
        let newColors = colors.filter(tag => tag !== color)
        changeParams('Color', newColors)
    }

    const deleteCategory = (category) => {
        let newCategory = categories.filter(tag => tag !== category)
        changeParams('Category', newCategory)
    }


    const filterItem = (item) => {
        return (
            !(categories.length && !categories.includes(item.category))
            &&
            !(colors.length && !item.color.some(color => colors.includes(color)))
            &&
            !((min && max) && !(Math.min(parseInt(min), parseInt(max)) < item.price && item.price < Math.max(parseInt(min), parseInt(max))))
            &&
            !((!min && max) && !(item.price < max))
            &&
            !((min && !max) && !(min < item.price))
        )
    }

    const clearPrice = () => {
        setMax("")
        setMin("")
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%'
        }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '20%',
                    padding: '10px',

                }}
            >

                <Typography 
                style={{alignSelf: 'center'}}
                variant="h5"
                >Category</Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox name="Shirts" />} onChange={changeCategory} checked={categories.includes('Shirts')} label="Shirts" />
                    <FormControlLabel control={<Checkbox name="Pants" />} onChange={changeCategory} checked={categories.includes('Pants')} label="Pants" />
                    <FormControlLabel control={<Checkbox name="Jeans" />} onChange={changeCategory} checked={categories.includes('Jeans')} label="Jeans" />
                    <FormControlLabel control={<Checkbox name="Jackets" />} onChange={changeCategory} checked={categories.includes('Jackets')} label="Jackets" />
                </FormGroup>
                <Typography variant="h5">Color</Typography>

                <FormGroup>
                    <FormControlLabel control={<Checkbox name="Red" />} onChange={changeColor} checked={colors.includes('Red')} label="Red" />
                    <FormControlLabel control={<Checkbox name="Orange" />} onChange={changeColor} checked={colors.includes('Orange')} label="Orange" />
                    <FormControlLabel control={<Checkbox name="Yellow" />} onChange={changeColor} checked={colors.includes('Yellow')} label="Yellow" />
                    <FormControlLabel control={<Checkbox name="Green" />} onChange={changeColor} checked={colors.includes('Green')} label="Green" />
                    <FormControlLabel control={<Checkbox name="Blue" />} onChange={changeColor} checked={colors.includes('Blue')} label="Blue" />
                    <FormControlLabel control={<Checkbox name="Purple" />} onChange={changeColor} checked={colors.includes('Purple')} label="Purple" />
                    <FormControlLabel control={<Checkbox name="Brown" />} onChange={changeColor} checked={colors.includes('Brown')} label="Brown" />
                    <FormControlLabel control={<Checkbox name="White" />} onChange={changeColor} checked={colors.includes('White')} label="White" />
                    <FormControlLabel control={<Checkbox name="Grey" />} onChange={changeColor} checked={colors.includes('Grey')} label="Grey" />
                    <FormControlLabel control={<Checkbox name="Black" />} onChange={changeColor} checked={colors.includes('Black')} label="Black" />


                </FormGroup>
                <Typography variant="h5" >Price</Typography>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >

                    <TextField
                        label="Min"
                        value={min}
                        fullWidth={true}
                        onChange={event => setMin(event.target.value)}
                        sx={{
                            width: '50%',
                            margin: '5px'
                        }}
                    /> <TextField
                        label="Max"
                        value={max}
                        fullWidth={true}
                        onChange={event => setMax(event.target.value)}
                        style={{
                            width: '50%',
                            margin: '5px'
                        }}
                    />
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '60%'
            }}
            >
                <div>
                    {categories.map(tag => (
                        <Chip label={tag} onDelete={() => deleteCategory(tag)} key={tag} />
                    ))}
                    {colors.map(tag => (
                        <Chip label={tag} onDelete={() => deleteColor(tag)} key={tag} />
                    ))}
                    {(min && max) && <Chip label={"$" + Math.min(max, min) + "- $" + Math.max(max, min)} onDelete={() => clearPrice()} key="both"></Chip>}
                    {(min && !max) && <Chip label={"$" + min + "+"} onDelete={() => clearPrice()} key="both" />}
                    {(!min && max) && <Chip label={"Up to $" + max} onDelete={() => clearPrice()} key="both" />}
                </div>
                <ImageList sx={{ width: '100%', height: '100%' }} cols={4} gap={10}>
                    {/* Filters out All Items that don't match the current tags */}
                    {items.filter(item => filterItem(item)).map((item) => (
                        <ItemListItem item={item} key={item.code} sx={{ width: '100%', height: '100%' }} />
                    ))}
                </ImageList>
            </div>
        </div>
    )
}


export default ItemList


