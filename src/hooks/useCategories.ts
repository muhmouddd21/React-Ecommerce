import { ThunkGetCategories } from "@store/Categories/CategoriesSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

function useCategories() {

    const dispatch = useAppDispatch();
    const { loading, error, records } = useAppSelector((state) => state.categoriesSlice);
    useEffect(()=>{
        if(!records.length){
            dispatch(ThunkGetCategories())
        }
    },[dispatch,records])

  return {loading,error,records}
}

export default useCategories
