import { PaginationView } from './pagination.view';


export interface IPaginationContainerViewModel {
  currentPageNumber: number
  totalPages: number
  onPageClickEvent: (pageNumber: number) => void
  onNextClickEvent: (url: string) => void
  onPreviousClickEvent: (url: string) => void
  next: string
  previous: string
}

export const PaginationContainer: React.FC<IPaginationContainerViewModel> = (props) => {

  return (
    <PaginationView
      currentPageNumber={props.currentPageNumber}
      totalPages={props.totalPages}
      onPageClickEvent={props.onPageClickEvent}
      onNextClickEvent={props.onNextClickEvent}
      onPreviousClickEvent={props.onPreviousClickEvent}
      next={props.next}
      previous={props.previous}
    />
  )
}
