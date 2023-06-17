import { store } from "../../../../presentation/presenters/store/store"
import { setUserList, updateUserList } from "../../../../presentation/presenters/store/reducers/users.reducer"
import { setUserProfileErrors, resetUserProfileErrors } from "../../../../presentation/presenters/store/reducers/formUserProfile.reducer"
import { IUserProfile, PagedUserListEntity } from "../../../../domain/entities/users/user.entity"
import { IFormUserProfileErrors } from "../../../../domain/entities/formModels/user-profile-form.entity"


export default class UsersRepository {
    setUsers(users: PagedUserListEntity) {
        store.dispatch(setUserList(users.getCurrentValues()))
    }

    setUserFormErrors(formError: IFormUserProfileErrors) {
        store.dispatch(setUserProfileErrors(formError))
    }

    updateUser(user: IUserProfile) {
        store.dispatch(updateUserList(user))
    }

    resetUserFormErrors() {
        store.dispatch(resetUserProfileErrors())
    }
}
