import React from 'react'
import { DashboardView } from './dashboard.view'
import { useAppSelector } from '../../../presenters/store/hooks';

const DashboardContainer: React.FC = () => {

  // const pagedNotes = useAppSelector(state => state.usersState.users);

  // const requestPaginaton = async ({ pageNumber = 1, url = null }: Params) => {
  //   const controller = new MemberController()
  //   const department = selectedDepartment
  //   await controller.listUsers({ pageNumber, queryString, department, type, status, url })
  // }

  return (
    <div className='h-screen bg-no-repeat bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1497250681960-ef046c08a56e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80)] '>
      <DashboardView
      // pagedNotes={pagedNotes}
      // onPreviousClickEvent={(prev: string) => { requestPaginaton({ url: prev }) }}
      // onPageClickEvent={(pageNumber: number) => { requestPaginaton({ pageNumber: pageNumber }) }}
      // onNextClickEvent={(next: string) => { requestPaginaton({ url: next }) }}
      />
    </div>        
  )
}

export default DashboardContainer
