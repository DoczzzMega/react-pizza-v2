import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    items: [],
    itemsById: {},
    totalCount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const id = action.payload.id
            
            if (!state.itemsById[id]) {
                state.itemsById[id] = [action.payload];
            } else {
                state.itemsById[id].push(action.payload);
            }

            const findItem = state.items.find((obj) => {
                return obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size;
            });
            
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                    // countById: 0                    

                });
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);

            state.totalCount = state.items.reduce((sum, obj) => {
                return obj.count + sum;
            }, 0);
        },
        removeItem(state, action) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
        },
        clearItems(state) {
            state.items = [];
        }
    },
});

export const { addItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;