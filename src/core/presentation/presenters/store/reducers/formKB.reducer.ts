
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFormKnowledgebaseErrors } from "../../../../domain/entities/formModels/knowledgebase-form.entity";
import UserEntity from "../../../../domain/entities/users/user.entity";

interface IKnowledgebaseState {
  kbErrors: IFormKnowledgebaseErrors,
}

const initialState: IKnowledgebaseState = {
    kbErrors: {
        nonFieldErrors: "",
        title: "",
        description: "",
        isPublic: false,
        owner: new UserEntity().getCurrentValues().id,
    }
}

export const formKnowledgebase = createSlice({
  name: 'kb',
  initialState,
  reducers: {
    setKnowledgebaseErrors(state, action: PayloadAction<IFormKnowledgebaseErrors>) {
      state.kbErrors = action.payload
    },
    resetKnowledgebaseErrors(state) {
      state.kbErrors = initialState.kbErrors
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  setKnowledgebaseErrors,
  resetKnowledgebaseErrors
} = formKnowledgebase.actions
export default formKnowledgebase.reducer
