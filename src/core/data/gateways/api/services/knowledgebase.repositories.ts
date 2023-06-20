import { IFormKnowledgebaseErrors } from "../../../../domain/entities/formModels/knowledgebase-form.entity"
import { IKnowledgeBase, PagedKnowledgebaseEntity } from "../../../../domain/entities/knowledgebase/kb.entity"
import { resetKnowledgebaseErrors, setKnowledgebaseErrors } from "../../../../presentation/presenters/store/reducers/formKB.reducer"
import { deleteKBList, setKBList, updateKBList } from "../../../../presentation/presenters/store/reducers/knowledgebase.reducer"
import { store } from "../../../../presentation/presenters/store/store"

export default class KnowledgebaseRepository {
    setKnowledgebase(kb: PagedKnowledgebaseEntity) {
        store.dispatch(setKBList(kb.getCurrentValues()))
    }

    setKnowledgebaseFormErrors(formError: IFormKnowledgebaseErrors) {
        store.dispatch(setKnowledgebaseErrors(formError))
    }

    updateKnowledgebase(kb: IKnowledgeBase) {
        store.dispatch(updateKBList(kb))
    }

    deleteKnowledgebase(noteID: number) {
        store.dispatch(deleteKBList(noteID))
    }

    resetKnowledgebaseFormErrors() {
        store.dispatch(resetKnowledgebaseErrors())
    }
}
