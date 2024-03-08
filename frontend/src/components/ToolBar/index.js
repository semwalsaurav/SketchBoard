import { UseDispatch, useDispatch, useSelector } from 'react-redux'
import { menuClick, actionItemClick } from '@/slice/menuSlice'
import styles from "./index.module.css"
import { changeBrushSize, changeColor } from '@/slice/toolbarSlice';
import { socket } from '@/socket';
const ToolBar=()=>{
    const dispatch = useDispatch();
    const selectedMenuItem=useSelector((state)=>state.menu.activeMenuItem)
    const { size, color}=useSelector((state)=>state.toolbar[selectedMenuItem])
    const showStrockToolBar = ["PENCIL", "RECT"].includes(selectedMenuItem)
    const showBrushToolBAr = ["PENCIL", "ERASER", "RECT"].includes(selectedMenuItem)
    const updateBrushSize=(e)=>{
        dispatch(changeBrushSize({item: selectedMenuItem, size: e.target.value}))
        socket.emit("changeConfig", { color: color, size: e.target.value})
    }

    const updateColor=(newColor)=>{
        dispatch(changeColor({item: selectedMenuItem, color: newColor}))
        socket.emit("changeConfig", { color: newColor, size: size})
    }
    return (
        <div className= {styles.toolbar_container}>
            {showStrockToolBar && <div className={styles.toolbar_item}>
                <h4 className={styles.toolbar_title}>Strock Color</h4>
                <div className={styles.toolbar_colors}>
                    <div className={styles.toolbar_color} style={{backgroundColor:"black"}} onClick={()=>updateColor("black")}></div>
                    <div className={styles.toolbar_color} style={{backgroundColor:"red"}}  onClick={()=>updateColor("red")}></div>
                    <div className={styles.toolbar_color} style={{backgroundColor:"green"}}  onClick={()=>updateColor("green")}></div>
                    <div className={styles.toolbar_color} style={{backgroundColor:"yellow"}}  onClick={()=>updateColor("yellow")}></div>
                    <div className={styles.toolbar_color} style={{backgroundColor:"blue"}} onClick={()=>updateColor("blue")}></div>
                </div>
            </div>}
            {showBrushToolBAr && <div className="toolbar_item">
                <h4 className="toolbar_title">Brush Size</h4>
                <div>
                    <input type="range" max={50} onChange={updateBrushSize} value={size}/>
                </div>
            </div>}
        </div>
    )
}
export default ToolBar;