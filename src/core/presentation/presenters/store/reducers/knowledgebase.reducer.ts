
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPagedKnowledgebaseInterface, PagedKnowledgebaseEntity } from "../../../../domain/entities/knowledgebase/kb.entity";

interface IKnowledgebaseState {
  kb: IPagedKnowledgebaseInterface,
}

const initialState: IKnowledgebaseState = {
  kb: new PagedKnowledgebaseEntity().getCurrentValues(),
}

export const kbSlice = createSlice({
  name: 'kb',
  initialState,
  reducers: {
    setKBList(state, action: PayloadAction<IPagedKnowledgebaseInterface>) {
      state.kb = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setKBList,
} = kbSlice.actions
export default kbSlice.reducer
