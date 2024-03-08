import { createSlice } from "@reduxjs/toolkit";
const initialState={
    'PENCIL':{
        color: "black",
        size: 5,
    },
    "ERASER":{
        color: "white",
        size: 3,
    },
    "UNDO":{

    },
    "REDO":{

    },
    "DOWNLOAD": {

    },
    "RECT":  {
        color: "black",
        size: 5,
    },
}
export const  toolbarSlice=createSlice({
    name: "toolbar",
    initialState,
    reducers:{
        changeColor:(state, action)=>{
            state[action.payload.item].color = action.payload.color
        },
        changeBrushSize:(state, action)=>{
            state[action.payload.item].size = action.payload.size
        }
    }
})
export const { changeColor, changeBrushSize } = toolbarSlice.actions;
export default toolbarSlice.reducer