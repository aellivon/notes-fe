
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import UserProfileAuthEntity from "../../../../domain/entities/users/auth/user-profile-auth.entity";
import UserAuthEntity, { IAuthenticationTokens } from "../../../../domain/entities/users/auth/user-tokens.entity";
import { IAuthenticatedUserProfile } from "../../../../domain/entities/users/auth/user-profile-auth.entity";


interface IAuthState {
  user: IAuthenticatedUserProfile,
  tokens: IAuthenticationTokens
}

const initialState: IAuthState = {
  user: new UserProfileAuthEntity().getCurrentValues(),
  tokens: new UserAuthEntity().getCurrentValues()
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IAuthenticatedUserProfile>) {
      state.user = action.payload
    },
    setToken(state, action: PayloadAction<IAuthenticationTokens>) {
      state.tokens = action.payload
    },
    clearUser(state) {
      state.user = new UserProfileAuthEntity().getCurrentValues()
      state.tokens = new UserAuthEntity().getCurrentValues()
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  setUser,
  clearUser,
  setToken
} = authSlice.actions
export default authSlice.reducer
