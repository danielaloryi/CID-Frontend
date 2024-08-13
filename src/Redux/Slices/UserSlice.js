import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    },

    reducers: {
        Add_User: (state, action) => {
            state.user = action.payload;
        },

        ClearUser: (state, action) => {
            state.user = null;
        },
    },
});

export const { Add_User, ClearUser } = userSlice.actions;
// Selector to get dispatched Data
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;