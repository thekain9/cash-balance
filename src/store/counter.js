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
            state.value *= 1.05; // Increase the balance by 5% (multiply by 1.05)
        },

        // Reducer function for applying charges to the balance
        charges: (state) => {
            state.value *= 0.85; // Decrease the balance by 15% (multiply by 0.85)
        },
    },
});

// Export individual action creators
export const { withdraw, deposit, addInterest, charges } =
    counterSlice.actions;

// Export the reducer function for the counter slice
export default counterSlice.reducer;
