import { createSlice} from '@reduxjs/toolkit'

export const checkoutSlice = createSlice({
    name: 'counter',
    initialState: {
        shippingCompleted: false,
        billingCompleted: false,
        shippingInfo: 
        {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            areaCode: '',
        },
        billingInfo: {
            billingCheck: true,
            cardName: '',
            cardNumber: '',
            expiration: '',
            billingAddressLine1: '',
            billingAddressLine2: '',
            billingCity: '',
            billingState: '',
            billingAreaCode: '',
        }
    },
    reducers: {
        setShippingCompleted: (state, action) => {
            state.shippingCompleted = (action.payload)
        },
        setBillingCompleted: (state, action) => {
            state.billingCompleted = (action.payload)
        },
        setShippingInfo: (state, action) => {
            state.shippingInfo = action.payload
        },
        setBillingInfo: (state, action) => {
            state.billingInfo = action.payload
        },
    },
})

export const { setShippingCompleted, setBillingCompleted, setShippingInfo, setBillingInfo} = checkoutSlice.actions

export default checkoutSlice.reducer