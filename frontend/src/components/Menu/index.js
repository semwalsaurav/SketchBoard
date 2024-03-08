import { UseDispatch, useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEraser, faRotateLeft, faRotateRight, faDownload,  } from '@fortawesome/free-solid-svg-icons'
import styles from "./index.module.css"
import { menuClick, actionItemClick } from '@/slice/menuSlice'

const Menu=()=>{
    const dispatch = useDispatch();
    const { activeMenuItem, actionMenuItem } = useSelector((state)=>state.menu)
    const handleClickMenu = (itemName)=>{
        dispatch(menuClick(itemName))
    }
    const handleClickAction=(itemName)=>{
        dispatch(actionItemClick(itemName))
    }
    return (
        <div className={styles.menu_container}>
            <div className={styles.icon_wrapper} onClick={()=>{handleClickMenu("PENCIL")}} >
                <FontAwesomeIcon className={styles.icon} icon={faPencil} />
            </div>
            <div className={styles.icon_wrapper} onClick={()=>{handleClickMenu("ERASER")}} >
                <FontAwesomeIcon icon={faEraser} />
            </div>
            <div className={styles.icon_wrapper} onClick={()=>{handleClickAction("UNDO")}} >
                <FontAwesomeIcon icon={faRotateLeft} />
            </div>
            <div className={styles.icon_wrapper} onClick={()=>{handleClickAction("REDO")}}>
                <FontAwesomeIcon icon={faRotateRight} />
            </div>
            <div className={styles.icon_wrapper} onClick={()=>{handleClickAction("DOWNLOAD")}} >
                <FontAwesomeIcon icon={faDownload} />
            </div>
            {/* <div className={styles.icon_wrapper} onClick={()=>{handleClickMenu("RECT")}} >
                |_|
            </div> */}
        </div>
    )
}
export default Menu;