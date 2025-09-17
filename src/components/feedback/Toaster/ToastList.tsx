import { useAppSelector } from "@store/hooks";
import ToastItem from "./ToastItem"
import styles from './styles.module.css'
import { AnimatePresence, motion } from "motion/react";
const {toastList} = styles;
const ToastList = () => {

    const { records } = useAppSelector((state) => state.ToastSlice);
  return (

    
      <div className={`${toastList}`}>

      <AnimatePresence>
        {records.map((record) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut" }}
            layout
          >
            <ToastItem
              id={record.id}
              title={record.title}
              type={record.type}
              message={record.message}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      </div>

  



  )
}

export default ToastList
