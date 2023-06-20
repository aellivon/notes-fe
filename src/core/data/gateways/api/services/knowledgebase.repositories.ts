import { PagedKnowledgebaseEntity } from "../../../../domain/entities/knowledgebase/kb.entity"
import { setKBList } from "../../../../presentation/presenters/store/reducers/knowledgebase.reducer"
import { store } from "../../../../presentation/presenters/store/store"

export default class KnowledgebaseRepository {
    setKnowledgebase(users: PagedKnowledgebaseEntity) {
        store.dispatch(setKBList(users.getCurrentValues()))
    }
}
