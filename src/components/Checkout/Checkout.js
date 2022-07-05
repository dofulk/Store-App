import { Link, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BillingForm from "../BillingForm/BillingForm";
import ShippingForm from "../ShippingForm/ShippingForm";
import Summary from "../Summary/Summary";
import { setShippingCompleted, setBillingCompleted, setShippingInfo, setBillingInfo } from "../../redux/checkoutSlice";
import CheckoutConfirmation from "../CheckoutConfirmation/CheckoutConfirmation";
import { useNavigate } from "react-router-dom";


const Checkout = () => {

    const dispatch = useDispatch()

    // controls which tab is open
    const [value, setValue] = useState(0);

    const shippingCompleted = useSelector(state => state.checkout.shippingCompleted)

    const billingCompleted = useSelector(state => state.checkout.billingCompleted)



    const shippingInfo = useSelector(state => state.checkout.shippingInfo)

    const billingInfo = useSelector(state => state.checkout.billingInfo)


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div style={{ width: '70%', display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '60%' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Shipping Info"></Tab>
                    <Tab label="Billing Info" disabled={!shippingCompleted}></Tab>
                    <Tab label="Place Order" disabled={!billingCompleted}></Tab>
                </Tabs>
                {value === 0 && <ShippingForm
                    defaultValues={shippingInfo}
                    onSubmit={data => {
                        dispatch(setShippingCompleted(true))
                        setValue(1)
                        dispatch(setShippingInfo({
                            ...shippingInfo,
                            ...data,
                        }))
                    }}
                />}


                {value === 1 && <BillingForm
                    defaultValues={billingInfo}
                    onSubmit={data => {
                        dispatch(setBillingCompleted(true))
                        setValue(2)
                        let billingData = {}

                        // if Billing address !== Shipping address
                        if (data.billingCheck === true) {
                            billingData = {
                                ...data,
                                billingAddressLine1: shippingInfo.addressLine1,
                                billingAddressLine2: shippingInfo.addressLine2,
                                billingAreaCode: shippingInfo.areaCode,
                                billingCity: shippingInfo.city,
                                billingState: shippingInfo.state
                            }
                        } else {
                            billingData = data
                        }
                        dispatch(setBillingInfo({
                            ...billingInfo,
                            ...billingData
                        }))
                    }}
                />}



                {value === 2 &&
               <CheckoutConfirmation setValue={setValue}/>
                }


            </div>
            <div style={{ width: '40%' }}>
                <Summary ></Summary>

            </div>
        </div >
    )
}
export default Checkout