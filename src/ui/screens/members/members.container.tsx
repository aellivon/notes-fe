import React, { useEffect, useState } from 'react'
import { PagedUserListEntity } from '../../../core/domain/users/user.entity'
import MemberController from './members.controller'
import { MemberView } from './members.view'


const MemberContainer: React.FC = () => {

  const [queryString, setqueryString] = useState("")
  const [department, setDepartment] = useState("")
  const [type, setType] = useState("")
  const [status, setStatus] = useState("")
  const [pagedUsers, setPagedUsers] = useState(new PagedUserListEntity().getCurrentValues())

  useEffect(() => {
    const controller = new MemberController()
    const handleInitalized = async () => {
      const locUsers = await controller.list_users({})
      setPagedUsers(locUsers.data)
    }
    handleInitalized()
  }, [])

  interface Params {
    pageNumber?: number
    url?: string | null,
    queryString?: string
    department?: string
    type?: string
    status?: string
  }

  const requestPaginaton = async ({pageNumber = 1, url = null}: Params) => {
    const controller = new MemberController()
    const locUsers = await controller.list_users({pageNumber, queryString, department, type, status, url})
    setPagedUsers({...locUsers.data})
  }

  const searchBarHit = async () => {
    const params: Params = {pageNumber: 1, url: null, queryString: queryString, department: department, type: type, status: status}
    requestPaginaton(params)
  }

  return (
    <div className='h-screen'>
      <MemberView
        pagedUsers={pagedUsers}
        onPreviousClickEvent={(prev: string) => {requestPaginaton({url: prev})}}
        onPageClickEvent={(pageNumber: number) => {requestPaginaton({pageNumber: pageNumber})}}
        onNextClickEvent={(next: string) => {requestPaginaton({url: next})}}
        onSearchEvent={() => {
          searchBarHit()
        }}
        setqueryString={setqueryString}
        setDepartment={setDepartment}
        setType={setType}
        setStatus={setStatus}
      />
    </div>        
  )
}

export default MemberContainer
