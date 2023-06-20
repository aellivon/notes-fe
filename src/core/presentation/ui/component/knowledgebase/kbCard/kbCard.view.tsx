import KnowledgebaseModalContainer from '../kbModal/kbModal.container';
import { IKnowledgeBase } from '../../../../../domain/entities/knowledgebase/kb.entity';
import { IFormKnowledgebaseErrors, IFormKnowledgebaseFields } from '../../../../../domain/entities/formModels/knowledgebase-form.entity';

export interface IKnowledgebaseCardViewModel {
    notes: IKnowledgeBase
    updateKB: (form: IFormKnowledgebaseFields, userId: number) => void
    deleteKB: (userId: number) => void
    formErrors: IFormKnowledgebaseErrors
}

export const KnowledgebaseCardView: React.FC<IKnowledgebaseCardViewModel> = (props) => {

    return (

        <div className='w-full mt-3 p-3'>
            <button className="w-full max-h-96 h-96 block max-w-sm p-6 text-ellipsis overflow-hidden bg-green-100/40 bg-opacity-70 border border-gray rounded-lg shadow-lg hover:bg-green-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 link-button">
                <div className='flex items-center justify-end flex'>
                    <span className='text-kbGreen mr-3'>
                        <KnowledgebaseModalContainer
                            notes={props.notes}
                            onSubmit={(form, userID) => {
                                props.updateKB(form, userID)
                            }}
                            formErrors={props.formErrors}
                            actionType='Update'
                        />
                    </span>
                    <span className='text-red-500'>
                        <KnowledgebaseModalContainer
                            notes={props.notes}
                            onSubmit={(form, userID) => {
                                props.deleteKB(userID)
                            }}
                            formErrors={props.formErrors}
                            actionType='Delete'
                        />
                    </span>

                </div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-ellipsis truncate">{
                    props.notes.title}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 text-ellipsis overflow-hidden">{props.notes.description}</p>
            </button>
        </div>

    )
}
