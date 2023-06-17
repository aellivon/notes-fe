
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PagedUserListEntity, IPagedUserListInterface, IUserProfile } from "../../../../domain/entities/users/user.entity";
import { stat } from "fs";


interface IUsersState {
  users: IPagedUserListInterface,
}

const initialState: IUsersState = {
  users: new PagedUserListEntity().getCurrentValues(),
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserList(state, action: PayloadAction<IPagedUserListInterface>) {
      state.users = action.payload
    },
    updateUserList(state, action: PayloadAction<IUserProfile>) {
      const updatedUser = action.payload
      var elementPos = state.users.results.map(function(x) {return x.id; }).indexOf(updatedUser.id);
      let toUpdateUsers = [...state.users.results]
      toUpdateUsers[elementPos] = action.payload
      state.users.results = [...toUpdateUsers]
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  setUserList,
  updateUserList
} = usersSlice.actions
export default usersSlice.reducer
