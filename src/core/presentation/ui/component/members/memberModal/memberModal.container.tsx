import React from 'react'
import { MemberModalView } from './memberModal.view'
import { IUserProfile } from '../../../../../domain/entities/users/user.entity'
import { IFormUserProfileErrors, IFormUserProfileFields } from '../../../../../domain/entities/formModels/user-profile-form.entity'
import memberModalController from './memberModalController'


export interface Props {
  member: IUserProfile,
  onSubmit: (form: IFormUserProfileFields, userId: number) => void
  formErrors: IFormUserProfileErrors
  actionType: string
}

const MemberModalContainer: React.FC<Props> = (props) => {

  const controller = new memberModalController()

  const resetForm = () => {
    controller.resetUserFormErrors()
  }

  return (
    <div>
      <MemberModalView
        member={props.member}
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

export default MemberModalContainer
