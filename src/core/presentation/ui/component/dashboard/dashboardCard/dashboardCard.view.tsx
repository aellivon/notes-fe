import { IKnowledgeBase } from '../../../../../domain/entities/knowledgebase/kb.entity';

export interface IDashboardCardViewModel {
    kb: IKnowledgeBase
}

export const DashboardCardView: React.FC<IDashboardCardViewModel> = (props) => {
    return (
        <>
            <div className='w-full mt-3'>
                <a href="#" className="w-full block max-w-sm p-6 bg-white bg-opacity-70 border border-gray rounded-lg shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-ellipsis truncate">{
                        props.kb.title}</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400 text-ellipsis overflow-hidden">{props.kb.description}</p>
                </a>
            </div>
        </>
    )
}