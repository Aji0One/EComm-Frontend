import React from 'react';
import { Box, useMediaQuery, TextField } from '@mui/material';
import { getIn } from 'formik';

const AddressForm = ({
    type,
    errors,
    values,
    handleBlur,
    touched,
    handleChange,
}) => {

    const isNonmobile = useMediaQuery("(min-width:600px)");

    const formattedName = (field) => `${type}.${field}`;

    const formattedError = (field) =>
        Boolean(
            getIn(touched, formattedName(field)) &&
            getIn(errors, formattedName(field))
        )

    const formattedHelper = (field) =>
        getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

    return (
        <Box
            display="grid"
            gap="15px"
            gridTemplateColumns="repeat(4, minmax(0,1fr))"
            sx={{
                "& > div": { gridColumn: isNonmobile ? undefined : "span 4" }
            }}
        >
            <TextField
                fullWidth
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                values={values.firstName}
                name={formattedName("firstName")}
                error={formattedError("firstName")}
                helperText={formattedHelper("firstName")}
                sx={{ gridColumn: "span 2" }}
            />
            <TextField
                fullWidth
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                values={values.lastName}
                name={formattedName("lastName")}
                error={formattedError("lastName")}
                helperText={formattedHelper("lastName")}
                sx={{ gridColumn: "span 2" }}
            />
            <TextField
                fullWidth
                type="text"
                label="Country"
                onBlur={handleBlur}
                onChange={handleChange}
                values={values.country}
                name={formattedName("country")}
                error={formattedError("country")}
                helperText={formattedHelper("country")}
                sx={{ gridColumn: "span 4" }}
            />
            <TextField
                fullWidth
                type="text"
                label="Street Address"
                onBlur={handleBlur}
                onChange={handleChange}
                values={values.street1}
                name={formattedName("street1")}
                error={formattedError("street1")}
                helperText={formattedHelper("street1")}
                sx={{ gridColumn: "span 2" }}
            />
            <TextField
                fullWidth
                type="text"
                label="Street Address 2 (optional)"
                onBlur={handleBlur}
                onChange={handleChange}
                values={values.street2}
                name={formattedName("street2")}
                error={formattedError("street2")}
                helperText={formattedHelper("street2")}
                sx={{ gridColumn: "span 2" }}
            />
            <TextField
                fullWidth
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                values={values.city}
                name={formattedName("city")}
                error={formattedError("city")}
                helperText={formattedHelper("city")}
                sx={{ gridColumn: "span 2" }}
            />
            <TextField
                fullWidth
                type="text"
                label="State"
                onBlur={handleBlur}
                onChange={handleChange}
                values={values.state}
                name={formattedName("state")}
                error={formattedError("state")}
                helperText={formattedHelper("state")}
                sx={{ gridColumn: "1fr" }}
            />
            <TextField
                fullWidth
                type="text"
                label="Zip Code"
                onBlur={handleBlur}
                onChange={handleChange}
                values={values.zipcode}
                name={formattedName("zipcode")}
                error={formattedError("zipcode")}
                helperText={formattedHelper("zipcode")}
                sx={{ gridColumn: "1fr" }}
            />
        </Box>
    )
}

export default AddressForm;
