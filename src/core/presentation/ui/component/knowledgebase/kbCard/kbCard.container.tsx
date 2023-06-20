import React from 'react'
import { KnowledgebaseCardView } from './kbCard.view'
import { useAppSelector } from '../../../../presenters/store/hooks'
import { IKnowledgeBase } from '../../../../../domain/entities/knowledgebase/kb.entity'
import { IFormKnowledgebaseFields } from '../../../../../domain/entities/formModels/knowledgebase-form.entity'
import knowledgebaseCardController from './kbCard.controller'

export interface IKnowledgebaseCardContainerModel {
  notes: IKnowledgeBase
}

const KnowledgebaseCardContainer: React.FC<IKnowledgebaseCardContainerModel> = (props) => {

  const controller = new knowledgebaseCardController()
  const formErrors = useAppSelector(state => state.fromKBState.kbErrors);

  const updateKB = (form: IFormKnowledgebaseFields, noteId: number) => {
    controller.updateKnowledgebase(form, noteId)
  }

  const deleteKB = ( noteId: number) => {
    controller.deleteKnowledgebase(noteId)
  }

  return (
    <div>
      <KnowledgebaseCardView
        notes={props.notes}
        updateKB={(form: IFormKnowledgebaseFields, userId: number) => {
          updateKB(form, userId)
        }}
        deleteKB={(userId: number) => {
          deleteKB(userId)
        }}
        formErrors={formErrors}
      />
    </div>
  )
}

export default KnowledgebaseCardContainer
