import { useAppSelector } from "@store/hooks";
import ToastItem from "./ToastItem"
import styles from './styles.module.css'
const {toastList} = styles;
const ToastList = () => {

    const { records } = useAppSelector((state) => state.ToastSlice);
  return (

    
        <div className={`${toastList}`}>

        {records.map((record) => (
            <ToastItem
              id={record.id}
              title={record.title}
              type={record.type}
              message={record.message}
            />
        ))}

        </div>

  



  )
}

export default ToastList
