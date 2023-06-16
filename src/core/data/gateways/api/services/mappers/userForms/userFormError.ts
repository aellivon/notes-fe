import { IFormUserProfileErrors } from "../../../../../../domain/entities/formModels/user-profile-form.entity"
import { IUserProfileError } from "../../../api.types"



export const mapUserFormError = (initialModel: IUserProfileError | any): IFormUserProfileErrors => {
    return {
        nonFieldErrors: initialModel.non_field_errors,
        avatarURL: initialModel.avatar_url,
        firstName: initialModel.first_name,
        lastName: initialModel.last_name,
        email: initialModel.email,
        furiganaFirstName: initialModel.furigana_fname,
        furiganaLastName: initialModel.furigana_lname,
        position: initialModel.position,
        dateJoined: initialModel.date_joined
    }
}
