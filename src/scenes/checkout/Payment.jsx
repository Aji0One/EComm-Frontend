import React from 'react';
import { TextField, Box, Typography } from '@mui/material';

const Payment = ({ values, touched, errors, handleBlur, handleChange }) => {

    return (
        <Box m="30px 0">
            <Typography sx={{ mb: "15px" }} fontSize="18px">
                Contact Info
            </Typography>
            <TextField
                fullWidth
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                values={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4", marginBottom: "15px" }}
            />
            <TextField
                fullWidth
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                values={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: "span 4" }}
                inputProps={{ maxLength: 10, pattern: new RegExp('/^[6-9][0-9]{9}$/') }}
            />
        </Box>
    )
}

export default Payment
