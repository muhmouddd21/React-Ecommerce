
import { TToast } from "src/Types/Toast.types"
import styles from "./styles.module.css"
import { useDispatch } from "react-redux"
import { removeToast } from "@store/Toast/ToastSlice"
import { useCallback, useEffect, useState } from "react"
const {toastItem} = styles

const ToastItem = ({id,type,title,message}:TToast) => {
    const dispatch =useDispatch()
    const [progressIndicator,setProgressIndicator]=useState(0);
    const progressBar=100;
    const duration =4000;
    const intervalTime =duration/100;


    // remove toast handler
    const closeToastHandler = useCallback(() => {
        dispatch(removeToast(id));

    }, [id, dispatch]);


    useEffect(()=>{
        const timerId =setInterval(()=>{
            setProgressIndicator((prev) =>{
                if(prev < progressBar){
                    return prev +1;
                }
                return prev;
            } )
        })
        return ()=>{
            clearInterval(timerId);
        }
    },[intervalTime])

      //close toast when progress bar is completed
    useEffect(() => {
        if (progressIndicator === 100) {
        closeToastHandler();
        }
    }, [progressIndicator, closeToastHandler]);

  return (
        <div className={`alert alert-${type} ${toastItem}`}>
            <h5>{title}</h5>
            <p>{message}</p>
            <button type="button" className="btn-close"  onClick={closeToastHandler} />
            <span className="placeholder" style={{width:`${progressIndicator}%`, height: "0.3rem",transition:"width 40ms linear" }}></span>
        </div>
  )
}

export default ToastItem
