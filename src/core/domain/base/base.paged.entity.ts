import { IPagedAPIViewModel } from "../api/api.types"

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default class PagedListEntity<T> {
    results: T[] = []
    next = ''
    previous = ''
    currentPageNumber = 0
    totalPages = 1
    count = 0

    setFromApiModel(model: IPagedAPIViewModel<T> | any): void {
        this.next = model.next
        this.previous = model.previous
        this.totalPages = model.total_pages
        this.currentPageNumber = model.current_page_number
        this.count = model.count
    }
}
  
export interface IPagedListEntity {
    results: any[]
    next: string
    previous: string
    count: number
    current_page_number: number
}
