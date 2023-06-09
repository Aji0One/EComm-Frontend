import React, { useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { shades } from "../../theme";
import Shipping from "./Shipping";
import { useSelector } from "react-redux";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(
    "pk_test_51MxxCLSFozBOaqYjTI7FwrsJhejpaedOYP0VZ5a8ObVIxPRPEbkWRlpryNcqz5qd16FqRBWlQWOvOzpujafrsfbi00zowNT8T6"
)

const initialValues = {
    billingAddress: {
        firstName: "",
        lastName: "",
        country: "",
        street1: "",
        street2: "",
        city: "",
        state: "",
        zipcode: "",
    },
    shippingAddress: {
        isSameAddress: true,
        firstName: "",
        lastName: "",
        country: "",
        street1: "",
        street2: "",
        city: "",
        state: "",
        zipcode: "",
    },
    email: "",
    phoneNumber: ""
}

const checkoutSchema = [
    yup.object().shape({
        billingAddress: yup.object().shape({
            firstName: yup.string().required("required"),
            lastName: yup.string().required("required"),
            country: yup.string().required("required"),
            street1: yup.string().required("required"),
            street2: yup.string(),
            city: yup.string().required("required"),
            state: yup.string().required("required"),
            zipcode: yup.string().required("required"),
        }),
        shippingAddress: yup.object().shape({
            isSameAddress: yup.boolean(),
            firstName: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required")
            }),
            lastName: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required")
            }),
            country: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required")
            }),
            street1: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required")
            }),
            street2: yup.string(),
            city: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required")
            }),
            state: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required")
            }),
            zipcode: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required")
            }),
        }),
    }),
    yup.object().shape({
        email: yup.string().required("required"),
        phoneNumber: yup.string().required("required"),
    })
]

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const cart = useSelector((state) => state.cart.cart);
    const isFirstStep = activeStep === 0;
    const isSecondStep = activeStep === 1;

    const handleFormSubmit = async (values, actions) => {
        setActiveStep(activeStep + 1);

        if (isFirstStep && values.shippingAddress.isSameAddress) {
            actions.setFieldValue("shippingAddress", {
                ...values.billingAddress,
                isSameAddress: true,
            })
        }

        if (isSecondStep) {
            makePayment(values);
        }

        actions.setTouched({})
    }

    async function makePayment(values) {
        const stripe = await stripePromise;

        const requestBody = {
            data: {
                userName: [values.billingAddress.firstName, values.billingAddress.lastName].join(" "),
                email: values.email,
                products: cart.map(({ id, count }) => ({
                    id,
                    count,

                }))
            }
        };



        const response = await fetch(" https://ecomm-f6fw.onrender.com/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer a91a2db41be8ac26ebd468b587ca56ba6753a02fde31ce3143c0a414bdc7ed5698343b3c1f02fd0d23127fffe24c5827b8664a18c79f34682939790519dace995309c2476ae3b7963af6f1080cabab38e1b07e64ea5c49a091bc929ef2d78ce45051adedabde3fd916dbfcae494ce74224394e45834b6e448cdc5ff013680650"
            },
            body: JSON.stringify(requestBody),
        });
        const session = await response.json();
        console.log(session);
        await stripe.redirectToCheckout({
            sessionId: session.id,
        });
    }
    return (
        <Box width="80%" m="100px auto">
            <Stepper activeStep={activeStep} sx={{ m: '20px 0' }}>
                <Step>
                    <StepLabel>Billing</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Payment</StepLabel>
                </Step>
            </Stepper>
            <Box>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema[activeStep]}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue,

                    }) => (
                        <form onSubmit={handleSubmit}>
                            {isFirstStep && (<Shipping
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                            />)}
                            {isSecondStep && (<Payment
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                            />)}
                            <Box display="flex" justifyContent="space-between" gap="50px">
                                {isSecondStep && (
                                    <Button
                                        fullWidth
                                        color="primary"
                                        variant='contained'
                                        sx={{
                                            backgroundColor: shades.primary[200],
                                            boxShadow: "none",
                                            color: 'white',
                                            borderRadius: 0,
                                            padding: "15px 40px"
                                        }}
                                        onClick={() => setActiveStep(activeStep - 1)}
                                    >Back</Button>
                                )}
                                <Button
                                    fullWidth
                                    type="submit"
                                    color="primary"
                                    variant='contained'
                                    sx={{
                                        backgroundColor: shades.primary[400],
                                        boxShadow: "none",
                                        color: 'white',
                                        borderRadius: 0,
                                        padding: "15px 40px"
                                    }}
                                >{isFirstStep ? "Next" : "Place Order"}</Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}

export default Checkout;
