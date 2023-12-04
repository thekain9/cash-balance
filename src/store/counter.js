// Import the necessary function from the Redux Toolkit library
import { createSlice } from "@reduxjs/toolkit";

// Create a slice for the counter with initial state
export const counterSlice = createSlice({
    name: "counter", // Name of the slice

    initialState: {
        value: 0, // Initial state value for the counter
    },

    // Reducer functions for various actions
    reducers: {
        // Reducer function for withdrawing from the balance
        withdraw: (state, action) => {
            state.value -= action.payload; // Decrease the balance by the action payload
        },

        // Reducer function for depositing to the balance
        deposit: (state, action) => {
            state.value += action.payload; // Increase the balance by the action payload
        },

        // Reducer function for adding interest to the balance
        addInterest: (state) => {
            state.value = parseFloat((state.value * 1.05).toFixed(2)); // Increase by 5% and round to 2 decimals
        },
        
        charges: (state) => {
            state.value = parseFloat((state.value * 0.85).toFixed(2)); // Decrease by 15% and round to 2 decimals
        },
    },
});

// Export individual action creators
export const { withdraw, deposit, addInterest, charges } =
    counterSlice.actions;

// Export the reducer function for the counter slice
export default counterSlice.reducer;
