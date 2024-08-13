import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userReducer from "../Slices/UserSlice";
// import studentReducer from "../Slice/StudentsDataSlice";

const persistConfig = {
    key: "root",
    storage,
};

const reducers = combineReducers({
    user: userReducer,
    // student: studentReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
});