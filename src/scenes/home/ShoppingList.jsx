import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Tab, Tabs, useMediaQuery } from '@mui/material';
import Item from '../../components/Items';
import { setItem } from '../../state';

const ShoppingList = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("all");
    const items = useSelector((state) => state.cart.items);
    const isNonMobile = useMediaQuery("(min-width: 600px)");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    async function getItem() {
        const items = await fetch(

            "https://ecomm-f6fw.onrender.com/api/items?populate=image",
            {
                method: "GET",
                headers: {
                    Authorization: "bearer a91a2db41be8ac26ebd468b587ca56ba6753a02fde31ce3143c0a414bdc7ed5698343b3c1f02fd0d23127fffe24c5827b8664a18c79f34682939790519dace995309c2476ae3b7963af6f1080cabab38e1b07e64ea5c49a091bc929ef2d78ce45051adedabde3fd916dbfcae494ce74224394e45834b6e448cdc5ff013680650"
                }

            }
        );

        const itemsJson = await items.json();
        dispatch(setItem(itemsJson.data));
    }

    useEffect(() => {
        getItem();
    }, []);  // eslint disable-line react-hooks/exhaustive-deps

    const topRatedItems = items.filter(
        (item) => item.attributes.category === "topRated"
    );
    const newArrivalsItems = items.filter(
        (item) => item.attributes.category === "newArrivals"
    );

    const bestSellersItems = items.filter(
        (item) => item.attributes.category === "bestSellers"
    );


    return (
        <Box width="80%" margin="80px auto">
            <Typography variant='h3' textAlign="center">
                Our Featured <b>Products</b>
            </Typography>
            <Tabs
                textColor="primary"
                indicatorColor='primary'
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{ sx: { display: isNonMobile ? "black" : "none" } }}
                sx={{
                    m: "25px",
                    "& .MuiTabs-flexXontainer": {
                        flexWrap: "wrap"
                    }
                }}
            >
                <Tab label="All" value="all" />
                <Tab label="New Arrivals" value="newArrivals" />
                <Tab label="Best Sellers" value="bestSellers" />
                <Tab label="Top Rated" value="topRated" />
            </Tabs>
            <Box
                margin="0 auto"
                display="grid"
                gridTemplateColumns="repeat(auto-fill,300px)"
                justifyContent="space-around"
                rowGap="20px"
                columnGap="1.33%"
            >
                {value === "all" &&
                    items.map((item) => (
                        <Item item={item} key={`${item.name}-${item.id}`} />
                    ))}
                {value === "newArrivals" &&
                    newArrivalsItems.map((item) => (
                        <Item item={item} key={`${item.name}-${item.id}`} />
                    ))}
                {value === "bestSellers" &&
                    bestSellersItems.map((item) => (
                        <Item item={item} key={`${item.name}-${item.id}`} />
                    ))}
                {value === "topRated" &&
                    topRatedItems.map((item) => (
                        <Item item={item} key={`${item.name}-${item.id}`} />
                    ))}
            </Box>
        </Box>
    )
}

export default ShoppingList
