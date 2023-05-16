import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IappState {
  hiddenNavbar: boolean,
}

const initialState: IappState = {
  hiddenNavbar: true,
}

export const uiStateSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setNavbar(state, action: PayloadAction<boolean>) {
      state.hiddenNavbar = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
    setNavbar,
} = uiStateSlice.actions
export default uiStateSlice.reducer
