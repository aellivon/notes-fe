
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IKnowledgeBase, IPagedKnowledgebaseInterface, PagedKnowledgebaseEntity } from "../../../../domain/entities/knowledgebase/kb.entity";

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
    updateKBList(state, action: PayloadAction<IKnowledgeBase>) {
      const updatedNote = action.payload
      var elementPos = state.kb.results.map(function(x) {return x.id; }).indexOf(updatedNote.id);
      let toUpdateUsers = [...state.kb.results]
      toUpdateUsers[elementPos] = action.payload
      state.kb.results = [...toUpdateUsers]
    },
    deleteKBList(state, action: PayloadAction<number>){
      const id = action.payload; 
      let prevResults = [...state.kb.results]
      prevResults = state.kb.results.filter(item => item.id !== id)
      state.kb.results = prevResults
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setKBList,
  updateKBList,
  deleteKBList,
} = kbSlice.actions
export default kbSlice.reducer
