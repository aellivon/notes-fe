
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPagedGroupBaseEntity, PagedGroupBaseEntity } from "../../../../domain/entities/groups/group-base.entity";


interface IGroupState {
  groups: IPagedGroupBaseEntity,
}

const initialState: IGroupState = {
  groups: new PagedGroupBaseEntity().getCurrentValues()
}

export const authSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroupList(state, action: PayloadAction<IPagedGroupBaseEntity>) {
      state.groups = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setGroupList,
} = authSlice.actions
export default authSlice.reducer
