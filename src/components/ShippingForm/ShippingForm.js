import { Button, Grid, Typography, TextField, Autocomplete } from '@mui/material';
import React, { useState } from 'react';
import * as yup from 'yup'
import NumberFormat from 'react-number-format';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { states } from '../../data/States';


const schema = yup.object().shape({

    firstName: yup
        .string()
        .required('Required'),
    lastName: yup
        .string()
        .required('Required'),
    addressLine1: yup
        .string()
        .required('Required'),
    addressLine2: yup
        .string(),
    email: yup
        .string()
        .email('Invalid email')
        .required('Required'),
    phone: yup
        .lazy(value => {
            if (value === "") {
                return yup.string().notRequired()
            } else {
                return yup
                    .string()
                    .test("len", "Invalid Phone Number", val => {
                        if (!val) {
                            return
                        } else {
                            //strips phone number of masking characters
                            let strippedNum = val.replace(/\D/g, '')
                            return strippedNum.length === 10
                        }
                    })
            }
        }),
    city: yup
        .string()
        .required('Required'),
    state: yup
        .string()
        .required('Required'),
    areaCode: yup
        .string()
        .required('Required'),
});

const ShippingForm = ({ onSubmit, defaultValues }) => {



    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: defaultValues,
        resolver: yupResolver(schema)
    })



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography>
                        Address
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => <TextField {...field} fullWidth={true} label="First Name" error={errors.firstName !== undefined} helperText={errors.firstName?.message} required />}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => <TextField {...field} fullWidth={true} label="Last Name" error={errors.lastName !== undefined} helperText={errors.lastName?.message} required />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="addressLine1"
                        control={control}
                        render={({ field }) => <TextField {...field} fullWidth={true} label="Address Line 1" error={errors.addressLine1 !== undefined} helperText={errors.addressLine1?.message} required />}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Controller
                        name="addressLine2"
                        control={control}
                        render={({ field }) => <TextField {...field} fullWidth={true} label="Address Line 2" error={errors.addressLine2 !== undefined} helperText={errors.addressLine2?.message} />}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="city"
                        control={control}
                        render={({ field }) => <TextField {...field} fullWidth={true} label="City" error={errors.city !== undefined} helperText={errors.city?.message} required />}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controller
                        control={control}
                        name="state"
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
                        name="areaCode"
                        control={control}
                        render={({ field }) => <NumberFormat
                            {...field}
                            mask=" "
                            format="#####"
                            label="ZIP Code"
                            fullWidth={true}
                            error={errors.areaCode !== undefined}
                            helperText={errors.areaCode?.message}
                            customInput={TextField}
                            required
                        />}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography>
                        Contact
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => <TextField {...field} fullWidth={true} label="Email" error={errors.email !== undefined} helperText={errors.email?.message} required />}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => <NumberFormat
                            {...field}
                            mask=" "
                            format="(###) ###-####"
                            label="Phone"
                            fullWidth={true}
                            error={errors.phone !== undefined}
                            helperText={errors.phone?.message}
                            customInput={TextField}

                        />}
                    />
                </Grid>
            </Grid>
            <Button fullWidth={true} type="submit">
                Continue To Payment
            </Button>

        </form >

    )
}


export default ShippingForm