import { combineReducers, configureStore } from '@reduxjs/toolkit'
import categoriesSlice from '@store/Categories/CategoriesSlice'
import  ProductsSlice  from '@store/Products/ProductsSlice'
import wishlistSlice from '@store/Wishlist/wishlistSlice'
import cartSlice from '@store/Cart/CartSlice'
import AuthSlice from '@store/Auth/authSlice'
import { persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const cartPersistConfig = {
  key: 'cart',
  storage,
  whiteList:['items']
}
const wishListPersistConfig = {
  key: 'wishlist',
  storage,
  whiteList:['itemsId']
}

const rootReducers =combineReducers(
  {
    categoriesSlice,
    ProductsSlice,
    AuthSlice,
    wishlistSlice:persistReducer(wishListPersistConfig, wishlistSlice),
    cartSlice:persistReducer(cartPersistConfig, cartSlice)
  })

const store = configureStore({
  reducer: rootReducers,
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
export {store,persistor};

