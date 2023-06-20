import React from 'react'
import { KnowledgebaseModalView } from './kbModal.view'
import memberModalController from './kbModalController'
import { IKnowledgeBase } from '../../../../../domain/entities/knowledgebase/kb.entity'
import { IFormKnowledgebaseErrors, IFormKnowledgebaseFields } from '../../../../../domain/entities/formModels/knowledgebase-form.entity'


export interface Props {
  notes: IKnowledgeBase,
  onSubmit: (form: IFormKnowledgebaseFields, userId: number) => void
  formErrors: IFormKnowledgebaseErrors
  actionType: string
}

const KnowledgebaseModalContainer: React.FC<Props> = (props) => {

  const controller = new memberModalController()

  const resetForm = () => {
    controller.resetUserFormErrors()
  }

  return (
    <div>
      <KnowledgebaseModalView
        notes={props.notes}
        onSubmit={(form, userID) => {
          props.onSubmit(form, userID)
        }}
        formErrors={props.formErrors}
        resetForm={() => {
          resetForm()
        }}
        actionType={props.actionType}
      />
    </div>
  )
}

export default KnowledgebaseModalContainer
