import { createRoot } from 'react-dom/client'
import AppRouter from "@routes/AppRouter";
// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";


//axios
import "./services/axios-global.js"

//  redux
import { Provider } from 'react-redux';
import  {store,persistor}  from '@store/index';
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
        </PersistGate>
    </Provider>
)
