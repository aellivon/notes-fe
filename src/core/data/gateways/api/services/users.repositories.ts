import { store } from "../../../../presentation/presenters/store/store"
import { setUserList } from "../../../../presentation/presenters/store/reducers/users.reducer"
import { PagedUserListEntity } from "../../../../domain/entities/users/user.entity"


export default class UsersRepository {
    setUsers(users: PagedUserListEntity) {
        store.dispatch(setUserList(users.getCurrentValues()))
    }
}
