import { IBaseEntity } from '../base/base.entity'
import PagedListEntity from '../base/base.paged.entity'


export interface IBaseGroupProfile {
  id: number
  name?: string
}

export default class GroupBaseEntity implements IBaseEntity {

  id: number = -1
  name: string = ''

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
  results: IBaseGroupProfile[]
  next: string
  previous: string
  totalPages: number
  count: number,
  currentPageNumber: number
}

export class PagedGroupBaseEntity extends PagedListEntity<IBaseGroupProfile> {

  setEntity(model: IPagedGroupBaseEntity): void {
    super.setEntity(model)
    this.results = model.results
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
