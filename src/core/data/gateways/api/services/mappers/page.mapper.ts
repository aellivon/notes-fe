import { IPagedAPIViewModel } from "../../api.types"


export const setPagedDataBaseAttributes = (initialModel: IPagedAPIViewModel<any>, data: any = {}) => {
    return {
        ...data,
        next: initialModel.next,
        previous: initialModel.previous,
        totalPages: initialModel.total_pages,
        currentPageNumber: initialModel.current_page_number,
        count: initialModel.count
    }
}
