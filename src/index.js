import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { persistStore } from "redux-persist";
import { ThemeProvider, createTheme } from "@mui/material";
import Store from "./Redux/Store/Store";


const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    fontWeightBold: "bold"
  },
  palette: {
    primary: {
      main: "#1482F0",
      // main:"#0F1047"
    },

  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
const persistor = persistStore(Store);

root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
