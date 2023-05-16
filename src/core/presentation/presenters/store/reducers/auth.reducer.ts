
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import UserProfileAuthEntity from "../../../../domain/entities/users/auth/user-profile-auth.entity";
import { IUserProfile } from "../../../../domain/entities/users/auth/user-profile-auth.entity";


interface IAuthState {
  user: IUserProfile,
}

const initialState: IAuthState = {
  user: new UserProfileAuthEntity().getCurrentValues(),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUserProfile>) {
      state.user = action.payload
    },
    clearUser(state) {
      state.user = new UserProfileAuthEntity().getCurrentValues()
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  setUser,
  clearUser
} = authSlice.actions
export default authSlice.reducer
