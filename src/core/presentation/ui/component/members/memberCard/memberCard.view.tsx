import { IUserProfile } from '../../../../../domain/entities/users/user.entity'
import MemberModalContainer from '../memberModal/memberModal.container';
import { IFormUserProfileErrors, IFormUserProfileFields } from '../../../../../domain/entities/formModels/user-profile-form.entity';

export interface IMemberCardViewModel {
    member: IUserProfile
    updateUserProfile: (form: IFormUserProfileFields, userId: number) => void
    formErrors: IFormUserProfileErrors
}

export const MemberCardView: React.FC<IMemberCardViewModel> = (props) => {

  return (
    <div className='flex items-center rounded-lg bg-white my-2 xl:my-4 mx-2 px-4 shadow-lg h-24 grid grid-cols-4 sm:grid-cols-4 sm:grid-cols-4 lg:grid-cols-5'>
        <div className='flex items-center col-span-3 sm:col-span-2'>
            <img className="rounded-full h-16 w-16" src={
                `${props.member?.avatarURL ? props.member?.avatarURL : `/logo192.png`}`
            } alt="avatar"/>
            <p className='ml-4 mr-1'>
                { props.member.displayName }
            </p>
        </div>
        <div className='flex items-center justify-center hidden sm:flex'>
            <p className='mr-1'>
                { props.member.department }
            </p>
        </div>
        <div className='flex items-center justify-center hidden lg:flex'>
            <p className='mr-1'>
                { props.member.position }
            </p>
        </div>
        <div className='flex items-center justify-end flex'>
            <MemberModalContainer
                member={props.member}
                onSubmit={(form, userID) => {
                    props.updateUserProfile(form, userID)
                }}
                formErrors={props.formErrors}
            />
        </div>
    </div>
  )
}
