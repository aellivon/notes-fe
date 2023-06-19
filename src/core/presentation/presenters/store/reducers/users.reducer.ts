
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PagedUserListEntity, IPagedUserListInterface, IUserProfile } from "../../../../domain/entities/users/user.entity";


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
    },
    deleteUserList(state, action: PayloadAction<number>){
      const id = action.payload; 
      let prevResults = [...state.users.results]
      prevResults = state.users.results.filter(item => item.id !== id)
      state.users.results = prevResults
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setUserList,
  updateUserList,
  deleteUserList
} = usersSlice.actions
export default usersSlice.reducer
