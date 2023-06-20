import { IBaseEntity } from '../base/base.entity'
import PagedListEntity from '../base/base.paged.entity'
import UserEntity, { IUserProfile } from '../users/user.entity'

export interface IKnowledgeBase {
  id: number
  isActive: boolean
  isPublic: boolean
  title: string
  description: string
  owner: IUserProfile
}

export default class KnowledgebaseEntity implements IBaseEntity {
  id: number = -1
  isActive: boolean = false
  isPublic: boolean = false
  title: string = ''
  description: string = ''
  owner: IUserProfile = new UserEntity().getCurrentValues()

  setEntity(model: IKnowledgeBase) {
    this.id = model.id
    this.isActive = model.isActive
    this.isPublic = model.isPublic
    this.title = model.title
    this.description = model.description
    this.owner = model.owner
  }

  getCurrentValues(): IKnowledgeBase {
    return {
      id: this.id,
      isActive: this.isActive,
      isPublic: this.isPublic,
      title: this.title,
      description: this.description,
      owner: this.owner
    }
  }

  static mock(): KnowledgebaseEntity {
    const user = new KnowledgebaseEntity()
    user.title = 'Title'
    return user
  }
}

export interface IPagedKnowledgebaseInterface {
  results: IKnowledgeBase[]
  next: string
  previous: string
  totalPages: number
  count: number,
  currentPageNumber: number
}

export class PagedKnowledgebaseEntity extends PagedListEntity<IKnowledgeBase> {

  setEntity(model: IPagedKnowledgebaseInterface): void {
    super.setEntity(model)
    this.results = model.results
  }

  getCurrentValues(): IPagedKnowledgebaseInterface{
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
