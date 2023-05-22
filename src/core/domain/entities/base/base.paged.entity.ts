import { IPagedAPIViewModel } from "../../../data/gateways/api/api.types"


export interface IBasePagedListEntity {
    next: string
    previous: string
    count: number
    currentPageNumber: number
    totalPages: number
}

export interface IPagedListEntity extends IBasePagedListEntity {
    results: any[]
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default class PagedListEntity<T> {
    results: T[] = []
    next = ''
    previous = ''
    currentPageNumber = 0
    totalPages = 1
    count = 0

    setEntity(model: IBasePagedListEntity | IPagedListEntity) {
        this.next = model.next
        this.previous = model.previous
        this.totalPages = model.totalPages
        this.currentPageNumber = model.currentPageNumber
        this.count = model.count
    }

    // setFromApiModel(model: IPagedAPIViewModel<T> | any): void {
    //     this.next = model.next
    //     this.previous = model.previous
    //     this.totalPages = model.total_pages
    //     this.currentPageNumber = model.current_page_number
    //     this.count = model.count
    // }
}
