import { IFormKnowledgebaseErrors } from "../../../../../domain/entities/formModels/knowledgebase-form.entity"
import { IKnowledgebaseError } from "../../api.types"

export const mapKnowledgebaseFormError = (initialModel: IKnowledgebaseError | any): IFormKnowledgebaseErrors => {
    return {
        nonFieldErrors: initialModel.non_field_errors,
        title: initialModel.title,
        description: initialModel.description,
    }
}
