import { Button, Grid, Typography, TextField, Checkbox, FormControlLabel, Autocomplete } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import * as yup from 'yup'
import NumberFormat from 'react-number-format';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { states } from '../../data/States';


const schema = yup.object().shape({
    cardName: yup
        .string()
        .required('Required'),
    cardNumber: yup
        .string()
        .required('Required')
        .test("len", "Invalid Card Number", val => {
            if (!val) {
                return
            } else {
                //strips phone number of masking characters
                let strippedNum = val.replace(/\D/g, '')
                return strippedNum.length >= 13
            }
        }),
    expiration: yup
        .string()
        .required('Required')
        .test("len", "Invalid Date", val => {
            if (!val) {
                return
            } else {
                //strips phone number of masking characters
                let strippedNum = val.replace(/\D/g, '')
                return strippedNum.length >= 4
            }
        }),
    securityCode: yup
        .string()
        .required('Required')
        .test("len", "Invalid Security Code", val => {
            if (!val) {
                return
            } else {
                //strips phone number of masking characters
                let strippedNum = val.replace(/\D/g, '')
                return strippedNum.length >= 3
            }
        }),
    billingCheck: yup.boolean(),
    billingAddressLine1: yup
        .string()
        .when("billingCheck", {
            is: false,
            then: yup
                .string()
                .required('Required')
        }),

    billingAddressLine2: yup
        .string()
        .when("billingCheck", {
            is: false,
            then: yup
                .string()
        }),
    billingCity: yup
        .string()
        .when("billingCheck", {
            is: false,
            then: yup
                .string()
                .required('Required')
        }),
    billingState: yup
        .string()
        .when("billingCheck", {
            is: false,
            then: yup
                .string()
                .required('Required')
        }),
    billingAreaCode: yup
        .string()
        .when("billingCheck", {
            is: false,
            then: yup
                .string()
                .required('Required')
        }),
});


const BillingForm = ({ onSubmit, defaultValues }) => {


    const isFirstRender = useRef(true);



    useEffect(() => {
        isFirstRender.current = false;
    }, []);


    const { handleSubmit, control, reset, formState: { errors }, getValues, watch } = useForm({
        defaultValues: defaultValues,
        resolver: yupResolver(schema)
    })


    const watchBillingCheck = watch("billingCheck", defaultValues.billingCheck);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid  item xs={12} container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>
                            Payment
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="cardName"
                            control={control}
                            render={({ field }) => <TextField {...field} fullWidth={true} label="Name on card" error={errors.cardName !== undefined} helperText={errors.cardName?.message} required />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="cardNumber"
                            control={control}
                            render={({ field }) => <NumberFormat
                                {...field}
                                mask=" "
                                format="#### #### #### #### ###"
                                label="Card Number"
                                fullWidth={true}
                                error={errors.cardNumber !== undefined}
                                helperText={errors.cardNumber?.message}
                                customInput={TextField}
                                required
                            />}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        < Controller
                            name="expiration"
                            control={control}
                            render={({ field }) => <NumberFormat
                                {...field}
                                mask=" "
                                format="##/##"
                                label="Valid Until"
                                fullWidth={true}
                                error={errors.expiration !== undefined}
                                helperText={errors.expiration?.message}
                                customInput={TextField}
                                required
                            />}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <Controller
                            name="securityCode"
                            control={control}
                            value={defaultValues.state}
                            render={({ field }) => <NumberFormat
                                {...field}
                                mask=" "
                                format="####"
                                label="Security code"
                                fullWidth={true}
                                error={errors.securityCode !== undefined}
                                helperText={errors.securityCode?.message}
                                customInput={TextField}
                                required
                            />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Controller
                                    name="billingCheck"
                                    control={control}
                                    render={({ field }) => <Checkbox
                                        {...field}
                                        defaultChecked={defaultValues.billingCheck}
                                    />}
                                />}
                            label="Use shipping address for billing address"
                        />
                    </Grid>
                </Grid>
                {!watchBillingCheck &&
                    <Grid item container spacing={2} xs={12}>
                        <Grid item xs={12}>
                            <Controller
                                name="billingAddressLine1"
                                control={control}
                                render={({ field }) => <TextField {...field} fullWidth={true} label="Address Line 1" error={errors.billingAddressLine1 !== undefined} helperText={errors.billingAddressLine1?.message} required />}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="billingAddressLine2"
                                control={control}
                                render={({ field }) => <TextField {...field} fullWidth={true} label="Address Line 2" error={errors.billingAddressLine2 !== undefined} helperText={errors.billingAddressLine2?.message} />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="billingCity"
                                control={control}
                                render={({ field }) => <TextField {...field} fullWidth={true} label="City" error={errors.billingCity !== undefined} helperText={errors.billingCity?.message} required />}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Controller
                                control={control}
                                name="billingState"
                                render={({ field: { onChange, value } }) => (
                                    <Autocomplete
                                        onChange={(event, item) => {
                                            onChange(item);
                                        }}
                                        value={value}
                                        options={states}
                                        isOptionEqualToValue={(option, value) => option === value}

                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="State"
                                                variant="outlined"
                                                error={!!errors.item}
                                                helperText={errors.item && "State required"}
                                                required
                                            />
                                        )}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Controller
                                name="billingAreaCode"
                                control={control}
                                render={({ field }) => <NumberFormat
                                    {...field}
                                    mask=" "
                                    format="#####"
                                    label="ZIP Code"
                                    fullWidth={true}
                                    error={errors.billingAreaCode !== undefined}
                                    helperText={errors.billingAreaCode?.message}
                                    customInput={TextField}
                                    required

                                />}
                            />
                        </Grid>
                    </Grid>

                }
                <Grid item xs={12}>
                    <Button fullWidth={false} type="submit">
                        Review Order
                    </Button>
                </Grid>
            </Grid>
        </form >

    )
}


export default BillingForm