import {
    SidebarContainer
} from '../../component/common/sidebar/sidebar.container'
import { useAppSelector } from '../../../presenters/store/hooks'
import KnowledgebaseEntity, { IPagedKnowledgebaseInterface } from '../../../../domain/entities/knowledgebase/kb.entity'
import { PaginationContainer } from '../../component/common/pagination/pagination.container'
import { IFormKnowledgebaseErrors, IFormKnowledgebaseFields } from '../../../../domain/entities/formModels/knowledgebase-form.entity'
import { IBreadCrumbItems } from '../../../../domain/entities/breadcrumb-component.entity'
import { ITabItems } from '../../../../domain/entities/active-tab-component.entity'
import { ContentHeaderContainer } from '../../component/common/contentHeader/contentHeader.container'
import KnowledgebaseModalContainer from '../../component/knowledgebase/kbModal/kbModal.container'
import KnowledgebaseCardContainer from '../../component/knowledgebase/kbCard/kbCard.container'


interface KnowledgebaseProps {
    pagedNotes: IPagedKnowledgebaseInterface
    onPageClickEvent: (pageNumber: number) => void
    onNextClickEvent: (url: string) => void
    onPreviousClickEvent: (url: string) => void
    formErrors: IFormKnowledgebaseErrors
    createKnowledgebase: (form: IFormKnowledgebaseFields) => void
}

export const KnowledgebaseView: React.FC<KnowledgebaseProps> = (props) => {

    const currentPage = "knowledge-base"
    const currentPageTitle = "Knowledge Base"
    const highLight = "knowledge-base"
    const emptyNote = new KnowledgebaseEntity().getCurrentValues()

    const breadCrumbs: IBreadCrumbItems[] = [
        {
            name: currentPageTitle,
            to: "/knowledge-base"
        }
    ]

    const tabItems: ITabItems[] = [
        {
            name: currentPageTitle,
            active: true,
            to: "/knowledge-base"
        },
    ]

    const hiddenNavbar = useAppSelector(state => state.appUIState.hiddenNavbar);

    let contentClasses = ""

    if (hiddenNavbar) {
        contentClasses = "ml-10 xl:ml-64 pt-20 xl:pt-0"
    } else {
        contentClasses = "ml-10 md:ml-64 pt-20 xl:pt-0"
    }

    return (
        <>
            <SidebarContainer
                currentPage={currentPage}
                currentPageTitle={currentPageTitle}
                highLight={highLight}
            />
            <div className={`transition-width ease-in-out duration-500 ${contentClasses}`}>
                <ContentHeaderContainer
                    currentPage={currentPage}
                    currentPageTitle={currentPageTitle}
                    tabItems={tabItems}
                    breadCrumbs={breadCrumbs}
                >
                    <KnowledgebaseModalContainer
                        notes={emptyNote}
                        onSubmit={(form) => {
                            props.createKnowledgebase(form)
                        }}
                        formErrors={props.formErrors}
                        actionType='Add'
                    />
                </ContentHeaderContainer>
                <span className='h-40vh hsm:h-60vh hmd:h-65vh hlg:h-70vh hxl:h-75vh overflow-y-scroll block grid grid-cols-4'>
                    {
                        props.pagedNotes.results.map((element) => {
                            return <span key={element.id}>
                                <KnowledgebaseCardContainer
                                    notes={element}
                                />
                            </span>
                        })
                    }
                </span>
                <PaginationContainer
                    currentPageNumber={props.pagedNotes.currentPageNumber}
                    totalPages={props.pagedNotes.totalPages}
                    onPageClickEvent={props.onPageClickEvent}
                    onNextClickEvent={props.onNextClickEvent}
                    onPreviousClickEvent={props.onPreviousClickEvent}
                    previous={props.pagedNotes.previous}
                    next={props.pagedNotes.next}
                />
            </div>

        </>
    );
}