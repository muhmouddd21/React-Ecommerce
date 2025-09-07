
import { TToast } from "src/Types/Toast.types"
import styles from "./styles.module.css"
import { useDispatch } from "react-redux"
import { removeToast } from "@store/Toast/ToastSlice"
const {toastItem} = styles

const ToastItem = ({id,type,title,message}:TToast) => {
    const dispatch =useDispatch()
    const closeToastHandler=()=>{
        dispatch(removeToast(id));
    }
  return (
        <div className={`alert alert-${type} ${toastItem}`}>
            <h5>{title}</h5>
            <p>{message}</p>
            <button type="button" className="btn-close"  onClick={closeToastHandler} />
            <span className="placeholder" style={{width:"100%", height: "0.4rem" }}></span>
        </div>
  )
}

export default ToastItem
