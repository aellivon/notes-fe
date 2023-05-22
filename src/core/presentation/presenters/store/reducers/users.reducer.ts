
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PagedUserListEntity, IPagedUserListInterface } from "../../../../domain/entities/users/user.entity";


interface IUsersState {
  users: IPagedUserListInterface,
}

const initialState: IUsersState = {
  users: new PagedUserListEntity().getCurrentValues(),
}

export const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserList(state, action: PayloadAction<IPagedUserListInterface>) {
      state.users = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setUserList,
} = authSlice.actions
export default authSlice.reducer
