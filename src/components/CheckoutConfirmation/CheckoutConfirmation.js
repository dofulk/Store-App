import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Tab, Tabs, Typography } from "@mui/material";
import { setShippingCompleted, setBillingCompleted} from "../../redux/checkoutSlice";

const CheckoutConfirmation = ({setValue}) => {





    const shippingInfo = useSelector(state => state.checkout.shippingInfo)

    const billingInfo = useSelector(state => state.checkout.billingInfo)
    return (
        <div>
        <div style={{ textAlign: 'left' }}>
            <Typography variant="h4">
                Shipping
                <Link
                style={{ cursor: 'pointer', marginLeft: '15px'}}
                onClick={() => {
                    setValue(0)
                    setShippingCompleted(false)
                    setBillingCompleted(false)
                }} underline="hover">
                    {'Edit'}
                </Link>
            </Typography>
            <Typography variant="body1">
                {shippingInfo.firstName + " " + shippingInfo.lastName}
            </Typography>
            <Typography variant="body1">
                {shippingInfo.addressLine1}
            </Typography>
            {shippingInfo.addressLine2.length !== 0 && <Typography variant="body1">
                {shippingInfo.addressLine2}
            </Typography>}
            <Typography variant="body1">{shippingInfo.city + ", " + shippingInfo.state + ", " + shippingInfo.areaCode}</Typography>
            <Typography variant="body1">{shippingInfo.email}</Typography>
            {shippingInfo.phone.length !== 0 && <Typography variant="body1">{shippingInfo.phone}</Typography>}



        </div>
        <div style={{ textAlign: 'left' }}>
            <Typography variant="h4">
                Billing
                <Link 
                style={{ cursor: 'pointer', marginLeft: '15px'}}
                onClick={() => {
                    setValue(1)
                    setBillingCompleted(false)
                }} underline="hover">
                    {'Edit'}
                </Link>
            </Typography>
            <div>
                <Typography variant="body1">
                    {billingInfo.cardName}
                </Typography>
                <Typography variant="body1">
                    {billingInfo.cardNumber}
                </Typography>
                <Typography>
                    {billingInfo.billingAddressLine1}
                </Typography>
                {billingInfo.billingAddressLine2.length !== 0 && <Typography variant="body1">
                    {billingInfo.billingAddressLine2}
                </Typography>}
                <Typography variant="body1">
                    {billingInfo.billingCity + ", " + billingInfo.billingState + ", " + billingInfo.billingAreaCode}
                </Typography>
            </div>
        </div>
    </div>
    )
}

export default CheckoutConfirmation