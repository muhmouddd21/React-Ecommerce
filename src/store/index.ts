import { configureStore } from '@reduxjs/toolkit'
import categoriesSlice from '@store/Categories/CategoriesSlice'
import  ProductsSlice  from '@store/Products/ProductsSlice'
import cartSlice from '@store/Cart/CartSlice'
const store = configureStore({
  reducer: {categoriesSlice,ProductsSlice,cartSlice}
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;

