import React, { useEffect } from 'react'
import { KnowledgebaseView } from './knowledgebase.view'
import { useAppSelector } from '../../../presenters/store/hooks';
import DashboardController from './knowledgebase.controller';
import { IFormKnowledgebaseFields } from '../../../../domain/entities/formModels/knowledgebase-form.entity';
import KnowledgebaseController from './knowledgebase.controller';

const KnowledgebaseContainer: React.FC = () => {
  const formErrors = useAppSelector(state => state.fromKBState.kbErrors);

  useEffect(() => {
    const controller = new DashboardController()
    const handleInitalized = async () => {
      await controller.listMyKnowledgeBase({})
    }
    handleInitalized()
  }, [])

  const pagedNotes = useAppSelector(state => state.kbState.kb);

  interface Params {
    pageNumber?: number
    url?: string | null,
  }

  const createKB = (form: IFormKnowledgebaseFields) => {
    const controller = new KnowledgebaseController()
    controller.createKnowledgebase(form)
  }

  const requestPaginaton = async ({ pageNumber = 1, url = null }: Params) => {
    const controller = new DashboardController()
    await controller.listMyKnowledgeBase({ pageNumber, url })
  }
  return (
    <div className='h-screen'>
      <KnowledgebaseView
        pagedNotes={pagedNotes}
        onPreviousClickEvent={(prev: string) => { requestPaginaton({ url: prev }) }}
        onPageClickEvent={(pageNumber: number) => { requestPaginaton({ pageNumber: pageNumber }) }}
        onNextClickEvent={(next: string) => { requestPaginaton({ url: next }) }}
        formErrors={formErrors}
        createKnowledgebase={createKB}
      />
    </div>
  )
}

export default KnowledgebaseContainer
