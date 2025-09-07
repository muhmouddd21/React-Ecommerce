import { combineReducers, configureStore } from '@reduxjs/toolkit'
import categoriesSlice from '@store/Categories/CategoriesSlice'
import  ProductsSlice  from '@store/Products/ProductsSlice'
import wishlistSlice from '@store/Wishlist/wishlistSlice'
import cartSlice from '@store/Cart/CartSlice'
import AuthSlice from '@store/Auth/authSlice'
import OrderSlice from '@store/Order/OrderSlice'
import { persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
  import { setStore } from '@services/axios-global';



const rootPersistConfig ={
  key:'root',
  storage,
  whitelist:['cart','auth']
}

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
};

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist:['items']
}
const wishListPersistConfig = {
  key: 'wishlist',
  storage,
  whitelist:['itemsId']
}

const rootReducers =combineReducers(
  {
    categoriesSlice,
    ProductsSlice,
    OrderSlice,
    AuthSlice:persistReducer(authPersistConfig,AuthSlice),
    wishlistSlice:persistReducer(wishListPersistConfig, wishlistSlice),
    cartSlice:persistReducer(cartPersistConfig, cartSlice)
  })

const persistedReducer = persistReducer(rootPersistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
const persistor = persistStore(store);
setStore(store);
export type AppStore = typeof store;
export {store,persistor};

