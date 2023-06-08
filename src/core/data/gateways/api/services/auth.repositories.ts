import { clearUser, setUser, setToken  } from "../../../../presentation/presenters/store/reducers/auth.reducer"
import { store } from "../../../../presentation/presenters/store/store"
import { IAuthenticatedUserProfile } from "../../../../domain/entities/users/auth/user-profile-auth.entity"
import { IAuthenticationTokens } from "../../../../domain/entities/users/auth/user-tokens.entity"

export default class AuthRepository {
    setLoggedInUser(user: IAuthenticatedUserProfile) {
        store.dispatch(setUser(user))
    }

    setUserTokens(tokens: IAuthenticationTokens) {
        store.dispatch(setToken(tokens))
    }

    clearLoggedInUser() {
        store.dispatch(clearUser())
    }
}
