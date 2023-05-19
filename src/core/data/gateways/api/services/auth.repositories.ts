import { clearUser, setUser } from "../../../../presentation/presenters/store/reducers/auth.reducer"
import { store } from "../../../../presentation/presenters/store/store"
import { IAuthenticatedUserProfile } from "../../../../domain/entities/users/auth/user-profile-auth.entity"


export default class AuthRepository {
    setLoggedInUser(user: IAuthenticatedUserProfile) {
        store.dispatch(setUser(user))
    }

    clearLoggedInUser() {
        store.dispatch(clearUser())
    }
}
