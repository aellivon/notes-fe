import React, { useEffect, useState } from 'react'
import { PagedUserListEntity } from '../../../../domain/entities/users/user.entity'
import MemberController from './members.controller'
import { MemberView } from './members.view'
import { PagedGroupBaseEntity } from '../../../../domain/entities/groups/group-base.entity'
import { useAppSelector } from '../../../presenters/store/hooks'


const MemberContainer: React.FC = () => {

  const [queryString, setqueryString] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("*")
  const [type, setType] = useState("*")
  const [status, setStatus] = useState("active")

  useEffect(() => {
    const controller = new MemberController()
    const handleInitalized = async () => {
      await controller.listUsers({})
      await controller.listDepartments({})
    }
    handleInitalized()
  }, [])

  const pagedUsers = useAppSelector(state => state.usersState.users);
  const departments = useAppSelector(state => state.groupState.groups);

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
    const department = selectedDepartment
    await controller.listUsers({pageNumber, queryString, department, type, status, url})
  }

  const searchBarHit = async () => {
    const params: Params = {pageNumber: 1, url: null, queryString: queryString, department: selectedDepartment, type: type, status: status}
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
        departments={departments}
        selectedDepartment={selectedDepartment}
        setqueryString={setqueryString}
        setDepartment={setSelectedDepartment}
        setType={setType}
        setStatus={setStatus}
      />
    </div>
  )
}

export default MemberContainer
