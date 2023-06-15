import React from 'react'
import { MemberModalView } from './memberModal.view'
import { IUserProfile } from '../../../../../domain/entities/users/user.entity'


export interface Props {
  member: IUserProfile
}

const MemberModalContainer: React.FC<Props> = (props) => {
  return (
    <div>
      <MemberModalView
        member={props.member}
      />
    </div>
  )
}

export default MemberModalContainer
