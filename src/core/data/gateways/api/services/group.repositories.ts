import { store } from "../../../../presentation/presenters/store/store"
// import { setUserList } from "../../../../presentation/presenters/store/reducers/users.reducer"
import { PagedGroupBaseEntity } from "../../../../domain/entities/groups/group-base.entity"
import { setGroupList } from "../../../../presentation/presenters/store/reducers/groups.reducer"


export default class GroupsRepository {
    setGroups(groups: PagedGroupBaseEntity) {
        store.dispatch(setGroupList(groups.getCurrentValues()))
    }
}
