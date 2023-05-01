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

            "https://ecommbe.onrender.com/api/items?populate=image",
            {
                method: "GET",
                headers: {
                    Authorization: "bearer de3f2831f9db24c1360798e87d5b5f632a97366b0cdf06d93145edd148e5e96416dee6c8ecca706e1ccf1fd71294af302a78482884b240d3429189e7f22d0e41e738be01cd83599a6289adc262d640ec06d79ebe96b281a8ed7bfe555978a04e15239e7a391ded17ab9a2a0167579ab1ca7c92f121f65c0becf1770ee6a726e4"
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
