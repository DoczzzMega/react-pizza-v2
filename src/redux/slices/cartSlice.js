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
                });
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);

            state.totalCount = state.items.reduce((sum, obj) => {
                return obj.count + sum;
            }, 0);
        },
        minusItem(state, action) {
            const findItem = state.items.find((obj) => {
                return obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size;
            });

            if (findItem && findItem.count > 1) {
                findItem.count--;
            }
        },
        removeItems(state, action) {
            const id = action.payload.id
            state.itemsById[id] = state.itemsById[id].filter(pizza =>  pizza.type !== action.payload.type || pizza.size !== action.payload.size)

            state.items = state.items.filter((obj) => obj.uniqId !== action.payload.uniqId);
        
            if (state.items.length === 0) {
                state.itemsById = {};
                state.totalPrice = 0;
                state.totalCount = 0;
            }
            
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);

            state.totalCount = state.items.reduce((sum, obj) => {
                return obj.count + sum;
            }, 0);
        },
        clearItems(state) {
            state.items = [];
            state.itemsById = {};
            state.totalPrice = 0;
            state.totalCount = 0;
        }
    },
});

export const { addItem, minusItem, removeItems, clearItems } = cartSlice.actions;

export default cartSlice.reducer;