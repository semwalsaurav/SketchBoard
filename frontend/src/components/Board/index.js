import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { menuClick, actionItemClick } from "@/slice/menuSlice";
import { socket } from "@/socket";
const Board=()=>{
    const dispatch = useDispatch();
    const canvasRef=useRef(null);
    const shouldDraw = useRef(false);
    const drawHistory = useRef([]);
    const historyPointer =useRef(0)
    const { activeMenuItem, actionMenuItem} = useSelector((state)=> state.menu)
    const { color, size } = useSelector((state)=> state.toolbar[activeMenuItem])
    console.log("activeMenuItem color ", activeMenuItem, color, size)
    useEffect(()=>{
        if(!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d") 
        if(actionMenuItem === "DOWNLOAD"){
            const url = canvas.toDataURL();
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = "sketch.jpg";
            anchor.click(); 
        } else if(actionMenuItem === "UNDO"){
            if(historyPointer.current === 0){
                return;
            }
            historyPointer.current--;
            const imageData = drawHistory.current[historyPointer.current]
            context.putImageData(imageData, 0, 0)
        }else if(actionMenuItem === "REDO"){
            if(historyPointer.current === drawHistory.current.length - 1){
                return;
            }
            historyPointer.current++;
            const imageData = drawHistory.current[historyPointer.current]
            context.putImageData(imageData, 0, 0)
        }else if(actionMenuItem === "RECT"){
            
        }
        dispatch(actionItemClick(null))
    },[actionMenuItem])

    useEffect(()=>{
        if(!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d") 

        const changeConfig=(color, size)=>{
            context.strokeStyle = color;
            context.lineWidth = size;
        }
        changeConfig(color, size)
        const handleChangeConfig=(config)=>{
            console.log("config ", config)
            changeConfig(config.color, config.size)
        }
        socket.on("changeConfig", handleChangeConfig);
        return ()=>{
            socket.off("changeConfig", handleChangeConfig);
        }
    },[color, size])
    useLayoutEffect(()=>{
        if(!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d") 
        console.log("canvasas ", canvas.getContext)
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const beginDraw=(x,y)=>{
            context.beginPath();
            context.moveTo(x, y);
        }
        const drawLine=(x,y)=>{
            context.lineTo(x, y)
            context.stroke()
        }
        const handleMouseDown=(e)=>{
            shouldDraw.current=true;
            if(actionMenuItem === "RECT"){
                drawRectangle(e.clientX, e.clientY)
            }else{
                beginDraw(e.clientX+10, e.clientY)
                socket.emit('beginPath',{x: e.clientX || e?.touches[0]?.clientX, y: e.clientY || e?.touches[0]?.clientY})
            }
        }

        const handleMouseMove=(e)=>{
            if(!shouldDraw.current) return;
            drawLine(e.clientX || e?.touches[0]?.clientX, e.clientY || e?.touches[0]?.clientY)
            socket.emit('drawLine', {x: e.clientX || e?.touches[0]?.clientX, y: e.clientY || e?.touches[0]?.clientY})
        }
        const handleMouseUp=(e)=>{
            shouldDraw.current=false;
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
            drawHistory.current.push(imageData)
            historyPointer.current = drawHistory.current.length - 1;
        }
        const handleBeginPath=(point)=>{
            console.log("point ",point)
            beginDraw(point.x, point.y)
        }
        const handleDrawLine=(point)=>{
            console.log("point draw ",point)
            drawLine(point.x, point.y)
        }
        canvas.addEventListener('mousedown',handleMouseDown);
        canvas.addEventListener('mousemove',handleMouseMove);
        canvas.addEventListener('mouseup',handleMouseUp);

        canvas.addEventListener('touchstart', handleMouseDown)
        canvas.addEventListener('touchmove', handleMouseMove)
        canvas.addEventListener('touchend', handleMouseUp)

        socket.on("beginPath", handleBeginPath);
        socket.on("drawLine", handleDrawLine);
        return (()=>{
            canvas.removeEventListener('mousedown',handleMouseDown);
            canvas.removeEventListener('mousemove',handleMouseMove);
            canvas.removeEventListener('mouseup',handleMouseUp);
            socket.off("beginPath", handleBeginPath);
            socket.off("drawLine", handleDrawLine);
        })
    },[])
    return (
       <canvas ref={canvasRef}/>
    )
}
export default Board;