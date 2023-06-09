import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, Button, Tabs, Tab } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from '../../theme';
import { addToCart } from "../../state";
import { useParams } from "react-router-dom";
import Item from "../../components/Items";

const ItemDetails = () => {
    const dispatch = useDispatch();
    const { itemId } = useParams();
    const [value, setValue] = useState("description");
    const [count, setCount] = useState(1);
    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    async function getItem() {
        const item = await fetch(
            ` https://ecomm-f6fw.onrender.com/api/items/${itemId}?populate=image`,
            {
                method: "GET",
                headers: {
                    Authorization: "bearer a91a2db41be8ac26ebd468b587ca56ba6753a02fde31ce3143c0a414bdc7ed5698343b3c1f02fd0d23127fffe24c5827b8664a18c79f34682939790519dace995309c2476ae3b7963af6f1080cabab38e1b07e64ea5c49a091bc929ef2d78ce45051adedabde3fd916dbfcae494ce74224394e45834b6e448cdc5ff013680650"
                }
            }
        );

        const itemJson = await item.json();
        setItem(itemJson.data);

    }

    async function getItems() {
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
        setItems(itemsJson.data);
    }

    useEffect(() => {
        getItem();
        getItems();
    }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <Box width="80%" m="80px auto">
            <Box display="felx" flexWrap="wrap" columnGap="40px">
                {/* Images */}
                <Box flex='1 1 40%' mb="40px">
                    <img
                        alt={item?.name}
                        width="100%"
                        height="100%"
                        src={` ${item?.attributes?.image?.data?.attributes?.url}`}
                        style={{ objectFit: "Contain" }}
                    />
                </Box>

                {/* Actions */}
                <Box flex='1 1 50%' mb='40px'>
                    <Box display="flex" justifyContent="space-between">
                        <Box>Home/Item</Box>
                        <Box>Prev Next</Box>
                    </Box>

                    <Box m="65px 0 25px 0">
                        <Typography variant='h3'>{item?.attributes?.name}</Typography>
                        <Typography>${item?.attributes?.price}</Typography>
                        <Typography sx={{ mt: "20px" }}>
                            {item?.attributes?.londDescription}
                        </Typography>
                    </Box>
                    {/* count and button */}
                    <Box display="flex" alignItems="center" minHeight="50px">
                        <Box display="flex" alignItems="center" border={`1.5px solid ${shades.neutral[300]}`} mr="20px" p="2px 5px">
                            <IconButton
                                onClick={() => setCount(Math.max(count - 1, 1))}
                            >
                                <RemoveIcon />
                            </IconButton>
                            <Typography sx={{ p: "0 5px" }}>{count}</Typography>
                            <IconButton
                                onClick={() => setCount(Math.max(count + 1))}
                            >
                                <AddIcon />
                            </IconButton>
                        </Box>
                        <Button sx={{
                            backgroundColor: "#222222",
                            color: 'white',
                            borderRadius: 0,
                            minWidth: "150px",
                            padding: "10px 40px"
                        }}
                            onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
                        >
                            Add to Cart
                        </Button>
                    </Box>

                    <Box>
                        <Box m="20px 0 5px 0" display="flex">
                            <FavoriteBorderOutlinedIcon />
                            <Typography sx={{ ml: "5px" }}>Add to Wishlist</Typography>

                        </Box>
                        <Typography>Categories: {item?.attributes?.category}</Typography>
                    </Box>

                </Box>
            </Box>

            {/* Information */}
            <Box m="20px 0">
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Description" value="description" />
                    <Tab label="Review" value="review" />
                </Tabs>
            </Box>

            <Box display="flex" flexWrap="wrap" gap="15px">
                {value === "description" && (
                    <div>{item?.attributes?.longDescription}</div>
                )}
                {
                    value === "reviews" && <div>reviews</div>
                }

            </Box>

            {/* Related Items */}
            <Box mt="50px" width="100%">
                <Typography variant='h3' fontWeight="bold">
                    Related Products
                </Typography>
                <Box
                    mt="20px"
                    display="flex"
                    flexWrap="wrap"
                    columnGap="1.33%"
                    justifyContent="space-between"
                >
                    {items.slice(0, 4).map((item, i) => (
                        <Item key={`${item.name}-${i}`} item={item} />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default ItemDetails
