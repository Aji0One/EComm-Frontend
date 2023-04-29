import React from 'react';
import { Box, Typography } from "@mui/material";
import { shades } from '../../theme';
import { useTheme } from '@emotion/react';

const Footer = () => {
    const { palette: { neutral }, } = useTheme();

    return (
        <Box mt="70px" p="40px" backgroundColor={neutral.light}>
            <Box
                width="80%"
                margin="auto"
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                rowGap="30px"
                columnGap="clamp(20px,30px,40px)"
            >
                <Box
                    width="clamp(20%, 30%, 40%)"
                >
                    <Typography
                        variant='h4'
                        fontWeight="bold"
                        mb="30px"
                        color={shades.secondary[500]}
                    >
                        EComm
                    </Typography>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </div>
                </Box>
                <Box>
                    <Typography variant='h4' fontWeight="bold" mb="30px">
                        About Us
                    </Typography>
                    <Typography mb="30px">Careers</Typography>
                    <Typography mb="30px">Our Stores</Typography>
                    <Typography mb="30px">Terms & Conditions</Typography>
                    <Typography mb="30px">Privacy Policy</Typography>
                </Box>
                <Box>
                    <Typography variant='h4' fontWeight="bold" mb="30px">
                        Customer Care
                    </Typography>
                    <Typography mb="30px">Help Center</Typography>
                    <Typography mb="30px">Track your Order</Typography>
                    <Typography mb="30px">Corporate & Bulk Purchase</Typography>
                    <Typography mb="30px">Returns & Refunds</Typography>
                </Box>
                <Box
                    width="clamp(20%, 25%, 30%)"
                ><Typography variant='h4' fontWeight="bold" mb="30px">
                        Contact Us
                    </Typography>
                    <Typography mb="30px">4th cross street, Anna Salai, Chennai, 600001</Typography>
                    <Typography mb="30px">Email: comeonceagain@gmail.com</Typography>
                    <Typography mb="30px">91- 89794 23904</Typography>

                </Box>
            </Box>

        </Box>
    )
}

export default Footer
