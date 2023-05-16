import { IBaseEntity } from '../base/base.entity'
import { IGroupBaseModel, IListGroupModel } from '../../../data/gateways/api/api.types'
import PagedListEntity from '../base/base.paged.entity'


export interface IBaseGroupProfile {
  id: number
  name?: string
}

export default class GroupBaseEntity implements IBaseEntity {

  id: number = -1
  name: string = ''

  setFromApiModel(model: IGroupBaseModel | any): void {
    this.id = model.id
    this.name = model.name
  }

  getCurrentValues(): IBaseGroupProfile {
    return {
      id: this.id,
      name: this.name,
    }
  }

  static mock(): GroupBaseEntity {
    const group = new GroupBaseEntity()
    group.name = 'admin'
    return group
  }
}


export interface IPagedGroupBaseEntity {
  results: GroupBaseEntity[]
  next: string
  previous: string
  totalPages: number
  count: number,
  currentPageNumber: number
}

export class PagedGroupBaseEntity extends PagedListEntity<GroupBaseEntity> {

  setFromApiModel(model: IListGroupModel): void {
    super.setFromApiModel(model)
    const results: GroupBaseEntity[] = []
    model.results.forEach(element => {
      const user = new GroupBaseEntity()
      user.setFromApiModel(element)
      results.push(user.getCurrentValues() as GroupBaseEntity)
    });
    this.results = results
  }

  getCurrentValues(): IPagedGroupBaseEntity{
    return {
      results: this.results,
      next: this.next,
      previous: this.previous,
      count: this.count,
      totalPages: this.totalPages,
      currentPageNumber: this.currentPageNumber
    }
  }
}