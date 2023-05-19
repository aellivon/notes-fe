
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import UserProfileAuthEntity from "../../../../domain/entities/users/auth/user-profile-auth.entity";
import { IAuthenticatedUserProfile } from "../../../../domain/entities/users/auth/user-profile-auth.entity";


interface IAuthState {
  user: IAuthenticatedUserProfile,
}

const initialState: IAuthState = {
  user: new UserProfileAuthEntity().getCurrentValues(),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IAuthenticatedUserProfile>) {
      state.user = action.payload
    },
    setToken(state, action: PayloadAction<IAuthenticatedUserProfile>) {
      let user = {...state.user}
      // UserProfileAuthEntity()
      // user.setTokens()
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
