import { createSlice, nanoid } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'counter',
    initialState: {
        items: []
    },
    reducers: {
        addItem: {
            reducer: (state, action) => {
                let index = state.items.findIndex(item => (
                    item.product.code === action.payload.product.code
                ))
                if (index !== -1) {
                    state.items[index].quantity = state.items[index].quantity + action.payload.quantity
                } else {
                    state.items.push(action.payload)
                }

            }
        },
        removeItem: {
            reducer: (state, action) => {

                state.items = state.items.filter((item) => item.product.code !== action.payload)
            }
        },
        changeQuantity: {
            reducer: (state, action) => {
                
                let index = state.items.findIndex(item => (
                    item.product.code === action.payload.product.code
                ))
                if (index !== -1) {
                    state.items[index].quantity = action.payload.quantity
                }
            }
        }

    },
})

export const { addItem, removeItem, changeQuantity } = cartSlice.actions

export default cartSlice.reducer