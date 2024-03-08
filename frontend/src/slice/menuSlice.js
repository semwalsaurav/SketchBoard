import { createSlice } from "@reduxjs/toolkit";
import { MENU_ITEMS } from "@/constants";
const initialState={
    activeMenuItem: MENU_ITEMS.PENCIL,
    actionMenuItem: null,
}
export const menuSlice = createSlice({
    name:"menu",
    initialState:initialState,
    reducers:{
        menuClick:(state, action)=>{
            state.activeMenuItem=action.payload
        },
        actionItemClick:(state, action)=>{
            state.actionMenuItem = action.payload
        }
    }
})
export const { menuClick, actionItemClick } = menuSlice.actions;
export default menuSlice.reducer