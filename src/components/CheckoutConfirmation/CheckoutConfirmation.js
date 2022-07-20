import React from "react";
import { useSelector,} from "react-redux";
import { Link, Typography, Badge, Grid, Button } from "@mui/material";
import { setShippingCompleted, setBillingCompleted } from "../../redux/checkoutSlice";
import EditIcon from '@mui/icons-material/Edit';

const CheckoutConfirmation = ({ setValue, setOrderPlaced }) => {





    const shippingInfo = useSelector(state => state.checkout.shippingInfo)

    const billingInfo = useSelector(state => state.checkout.billingInfo)
    return (
        <Grid container spacing={2}>
            <Grid item xs={6} style={{ textAlign: 'left' }}>
                <Typography variant="h4">
                    Shipping
                    <Link
                        style={{ cursor: 'pointer', marginLeft: '15px' }}
                        onClick={() => {
                            setValue(0)
                            setShippingCompleted(false)
                            setBillingCompleted(false)
                        }}>
                        <Badge>
                            <EditIcon />
                        </Badge>
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


            </Grid>
            <Grid item xs={6} style={{ textAlign: 'left' }}>
                <Typography variant="h4">
                    Billing
                    <Link
                        style={{ cursor: 'pointer', marginLeft: '15px' }}
                        onClick={() => {
                            setValue(1)
                            setBillingCompleted(false)
                        }}>
                        <Badge>
                            <EditIcon />
                        </Badge>
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
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'left' }}>
                <Typography variant="h4">
                    Email
                    <Link
                        style={{ cursor: 'pointer', marginLeft: '15px' }}
                        onClick={() => {
                            setValue(0)
                            setShippingCompleted(false)
                            setBillingCompleted(false)
                        }}>
                        <Badge>
                            <EditIcon />
                        </Badge>
                    </Link>
                </Typography>
                <Typography variant="body1">{shippingInfo.email}</Typography>



            </Grid>

            <Grid  item xs={6} style={{ textAlign: 'left' }}>
                <Typography variant="h4">
                    Phone
                    <Link
                        style={{ cursor: 'pointer', marginLeft: '15px' }}
                        onClick={() => {
                            setValue(0)
                            setShippingCompleted(false)
                            setBillingCompleted(false)
                        }}>
                        <Badge>
                            <EditIcon />
                        </Badge>
                    </Link>
                </Typography>
                {shippingInfo.phone.length !== 0 ?  <Typography variant="body1">{shippingInfo.phone}</Typography> : 'N/A'}



            </Grid>
            <Grid item xs={12}>
                    <Button fullWidth={false} onClick={() => {
                        setValue(3)
                        setOrderPlaced(true)
                    }}>
                        Place Order
                    </Button>
                </Grid>
        </Grid>
    )
}

export default CheckoutConfirmation