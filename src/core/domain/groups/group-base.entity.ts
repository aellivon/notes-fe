// import { IBaseEntity } from '../base/base.entity'
// import { IGroupModel } from '../api/api.types'


export interface IBaseGroupProfile {
  id: number
  name?: string
}

// export default class GroupBaseEntity implements IBaseEntity {

//   id: number = -1
//   name: string = ''

//   setFromApiModel(model: IGroupModel | any): void {
//     this.id = model.id
//     this.name = model.name
//   }

//   getCurrentValues(): IBaseGroupProfile {
//     return {
//       id: this.id,
//       name: this.name,
//     }
//   }

//   static mock(): GroupBaseEntity {
//     const group = new GroupBaseEntity()
//     group.name = 'admin'
//     return group
//   }
// }
