import { createRoot } from 'react-dom/client'
import AppRouter from "@routes/AppRouter";
// styles
import "bootstrap/dist/css/bootstrap.min.css";

import "@styles/global.css";

//axios
import "./services/axios-global.js"

//  redux
import { Provider } from 'react-redux';
import  {store,persistor}  from '@store/index';
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
   
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
            <AppRouter />
            <ReactQueryDevtools />
        </QueryClientProvider>
        </PersistGate>
    </Provider>
)
