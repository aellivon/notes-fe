import { useEffect, useState } from "react"

export interface IPaginationViewModel {
  currentPageNumber: number
  totalPages: number
  previous: string
  next: string
  onPageClickEvent: (page: number) => void
  onNextClickEvent: (url: string) => void
  onPreviousClickEvent: (url: string) => void
}
export const PaginationView: React.FC<IPaginationViewModel> = (props) => {

  const range = (size:number, startAt:number = 0):ReadonlyArray<number> => {
      return Array.from(Array(3).keys()).map(i => i + startAt);
  }


  const getEllipsisFormula = (current_page: number, max_page: number, window=1, ellipsis="...") => {
    console.log(current_page)
    console.log(max_page)
    const ellipsisSet = new Set(range(window + 2));
    range(current_page + window + 1, current_page - window).forEach(element => {
      ellipsisSet.add(element)
    })
    range(max_page + 1, max_page - window).forEach(element => {
      ellipsisSet.add(element)
    })
    const sortedArray = new Int32Array(Array.from(ellipsisSet)).sort();

    const filteredSortedArray = sortedArray.filter((element) => element >= 1 && element <= max_page)
    const paginationWithDots: any[] = []
    filteredSortedArray.forEach((element, i) => {
        let lookAhead = null
        if(i + 1 < filteredSortedArray.length){
          lookAhead = i + 1
        }

        if (lookAhead !== null) {
          const diff = filteredSortedArray[lookAhead] - element
          if (diff >= 2) {
            paginationWithDots.push(element)
            paginationWithDots.push(ellipsis)
          } else {
            paginationWithDots.push(element)
          }
        } else {
          paginationWithDots.push(element)
        }
    });
    return paginationWithDots
  }

  const [paginationSet, SetPaginationSet] = useState<any[]>([])

  useEffect(() => {
    SetPaginationSet(getEllipsisFormula(props.currentPageNumber, props.totalPages))
  }, [props.currentPageNumber, props.totalPages])

  return (
    <>
      <span className='flex justify-center'>
          <div className='flex bg-white mb-5 bg-white mt-3 xl:mt-4 mx-2 px-4 shadow-lg justify-center'>
              <nav aria-label="Pagination" className="flex items-center text-gray-600 rounded">
                  {
                    props.previous !== "" && props.previous !== undefined && props.previous !== null ? 
                      <a onClick={() => props.onPreviousClickEvent(props.previous)} className="cursor-pointer p-2 mr-4 rounded hover:bg-gray-100">
                        <svg xmlns="http://www.w3.orcenterg/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                      </a>
                    : null
                  }
                  { paginationSet.map((element, index) => {
                      if (element === "...") {
                        return <a onClick={() => {}} key={index} className="px-4 py-2 rounded hover:bg-gray-100 hidden md:block"> {element} </a>
                      } else if (element === props.currentPageNumber) {
                        return <a onClick={() => props.onPageClickEvent(element)} key={index} className="px-4 py-2 rounded bg-gray-200 text-gray-900 font-medium hover:bg-gray-100"> { element } </a>
                      } else {
                        return <a onClick={() => props.onPageClickEvent(element)} key={index} className="hidden md:block cursor-pointer px-4 py-2 rounded hover:bg-gray-100"> {element} </a>    
                      }
                  })}
                  {
                    props.next !== "" && props.next !== undefined && props.next !== null ? 
                      <a onClick={() => props.onNextClickEvent(props.next)} className="cursor-pointer p-2 ml-4 rounded hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    : null
                  }
              </nav>
          </div>
      </span>
    </>
  )
}
