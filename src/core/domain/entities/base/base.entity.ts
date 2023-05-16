export interface IBaseEntity {
  setFromApiModel: (model: any) => void
}

export interface IBaseDataModel {
  created?: string
  updated?: string
}
