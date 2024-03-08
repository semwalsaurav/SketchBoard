import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "@/slice/menuSlice"
import ToolBarReducer from "@/slice/toolbarSlice";
export const store = configureStore({
    reducer:{
        menu : MenuReducer,
        toolbar : ToolBarReducer,
    }
})