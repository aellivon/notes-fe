import React from 'react'
import { MemberCardView } from './memberCard.view'

import { IUserProfile } from '../../../../../domain/entities/users/user.entity'

import memberCardController from './memberCard.controller'

import { IFormUserProfileFields } from '../../../../../domain/entities/formModels/user-profile-form.entity'
import { useAppSelector } from '../../../../presenters/store/hooks'


export interface IMemberCardContainerModel {
  member: IUserProfile
}


const MemberCardContainer: React.FC<IMemberCardContainerModel> = (props) => {

  const controller = new memberCardController()
  const formErrors = useAppSelector(state => state.formUserProfileState.userErrors);

  const updateUserProfile = (form: IFormUserProfileFields, userId: number) => {
    controller.updateProfile(form, userId)
  }

  return (
    <div>
      <MemberCardView
        member={props.member}
        updateUserProfile={(form: IFormUserProfileFields, userId: number) => {
          updateUserProfile(form, userId)
        }}
        formErrors={formErrors}
      />
    </div>
  )
}

export default MemberCardContainer
