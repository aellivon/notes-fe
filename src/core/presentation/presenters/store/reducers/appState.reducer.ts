import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface IappState {
  hiddenNavbar: boolean,
  notificationMessage: string
}

const initialState: IappState = {
  hiddenNavbar: true,
  notificationMessage: ''
}

export const uiStateSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setNavbar(state, action: PayloadAction<boolean>) {
      state.hiddenNavbar = action.payload
    },
    setNotificationMessage(state, action: PayloadAction<string>) {
      if (action.payload.includes('Error')){
        toast.error(action.payload)
      } else if (action.payload.includes('Success')) {
        toast.success(action.payload)
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const {
    setNavbar,
    setNotificationMessage
} = uiStateSlice.actions
export default uiStateSlice.reducer
