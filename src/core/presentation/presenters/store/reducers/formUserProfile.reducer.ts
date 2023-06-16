
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PagedUserListEntity, IPagedUserListInterface } from "../../../../domain/entities/users/user.entity";
import { IFormUserProfileErrors } from "../../../../domain/entities/formModels/user-profile-form.entity";

interface IUsersState {
  userErrors: IFormUserProfileErrors,
}

const initialState: IUsersState = {
    userErrors: {
        nonFieldErrors: "",
        avatarURL: "",
        firstName: "",
        lastName: "",
        email: "",
        furiganaFirstName: "",
        furiganaLastName: "",
        position: "",
        dateJoined: ""
    }
}

export const formUserProfile = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserProfileErrors(state, action: PayloadAction<IFormUserProfileErrors>) {
      state.userErrors = action.payload
    },
    resetUserProfileErrors(state) {
      state.userErrors = initialState.userErrors
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  setUserProfileErrors,
  resetUserProfileErrors
} = formUserProfile.actions
export default formUserProfile.reducer
