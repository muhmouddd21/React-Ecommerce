
import { TToast } from "src/Types/Toast.types"
import styles from "./styles.module.css"
import { useDispatch } from "react-redux"
import { removeToast } from "@store/Toast/ToastSlice"

import { useCallback, useEffect, useState } from "react"
const {toastItem} = styles

const ToastItem = ({id,type,title,message}:TToast) => {
    const dispatch =useDispatch()
    const [progressIndicator,setProgressIndicator]=useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const progressBar=100;
    const duration =4000;
    const intervalTime =duration/100;


    // remove toast handler
    const closeToastHandler = useCallback(() => {
        dispatch(removeToast(id));

    }, [id, dispatch]);


    useEffect(() => {
        let timerId =0;
        if (!isHovered && progressIndicator < progressBar) {
            timerId = setInterval(() => {
                setProgressIndicator((prev) => prev + 1);
            }, intervalTime);
        }

        // Clean up the timer on component unmount or state change
        return () => {
            clearInterval(timerId);
        };
    }, [isHovered, progressIndicator, progressBar, intervalTime]);

      //close toast when progress bar is completed
    useEffect(() => {
        if (progressIndicator === 100) {
        closeToastHandler();
        }
    }, [progressIndicator, closeToastHandler]);



  return (
        <div className={`alert alert-${type} ${toastItem}`}
             onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        >
            <h5>{title}</h5>
            <p>{message}</p>
            <button type="button" className="btn-close"  onClick={closeToastHandler} />
            <span className="placeholder" style={{width:`${progressIndicator}%`, height: "0.3rem",transition:"width 40ms linear" }}></span>
        </div>
  )
}

export default ToastItem
