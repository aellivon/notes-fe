import { Formik, FormikProps, Form } from 'formik'

import { useEffect, useState } from 'react'

import InputContainer from '../../common/input/input.container';

import { ModalContainer } from "../../common/modal/modal.container";
import { HiPencilSquare, HiPlusCircle, HiTrash } from 'react-icons/hi2';
import { IconContext } from 'react-icons'
import { IKnowledgeBase } from '../../../../../domain/entities/knowledgebase/kb.entity';
import { IFormKnowledgebaseErrors, IFormKnowledgebaseFields } from '../../../../../domain/entities/formModels/knowledgebase-form.entity';

export interface Props {
    notes: IKnowledgeBase
    onSubmit: (form: IFormKnowledgebaseFields, userId: number) => void
    resetForm: () => void
    formErrors: IFormKnowledgebaseErrors
    actionType: string
}

export const KnowledgebaseModalView: React.FC<Props> = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [noteID] = useState(props.notes.id)

    const initialValues: IFormKnowledgebaseFields = {
        title: props.notes.title,
        description: props.notes.description,
        isPublic: props.notes.isPublic,
    };
    const [noteValue, setNoteValue] = useState(initialValues)

    useEffect(() => {
        setNoteValue(initialValues)
    }, [props.notes])

    const handleModalToggle = (toChangeInto: boolean) => {
        setModalOpen(toChangeInto)
        setNoteValue(initialValues)
        props.resetForm()
    };

    const createButton =
        (
            <button
                type="button"
                className='flex items-center justifyb-center text-white bg-kbGreenHoverDark hover:bg-kbGreen focus:outline-none focus:ring-4 focus:ring-kbGreenRing font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2'
                onClick={() => handleModalToggle(true)}
            >
                <IconContext.Provider value={{ className: "w-5 h-5 mr-2" }}>
                    <HiPlusCircle />
                </IconContext.Provider>
                Add Note
            </button>
        )


    const updateButton =
        (
            <button
                type="button"
                className='mr-4'
                onClick={() => handleModalToggle(true)}
            >
                <IconContext.Provider value={{ className: "w-5 h-5" }}>
                    <HiPencilSquare />
                </IconContext.Provider>
            </button>
        )


    const deleteButton =
        (
            <button
                type="button"
                className='mr-4'
                onClick={() => handleModalToggle(true)}
            >
                <IconContext.Provider value={{ className: "w-5 h-5" }}>
                    <HiTrash />
                </IconContext.Provider>
            </button>
        )


    const buttonJSX = () => {
        switch (props.actionType) {
            case 'Update':
                return updateButton;
            case 'Delete':
                return deleteButton;
            default:
                return createButton;
        }
    }

    const innerHTML = () => (
        <>
            <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold ml-3 mt-2">{props.actionType} Note</p>
                <div className="modal-close cursor-pointer z-50">
                    <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" onClick={() => handleModalToggle(false)}>
                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                    </svg>
                </div>
            </div>
            <hr className='py-2' />

            <Formik
                enableReinitialize
                initialValues={noteValue}
                onSubmit={async values => {
                    props.resetForm()
                    await props.onSubmit(values, noteID)
                }}
                validate={() => { }}
            >
                {
                    ({ setFieldValue, errors, isSubmitting }: FormikProps<IFormKnowledgebaseFields>) => {
                        // errors = props.formErrors TODO
                        return (
                            <Form>

                                {props.actionType == 'Delete' ?
                                    <div className='h-10vh'>
                                        <span className='text-gray-800 ml-3'>
                                            Are you sure you want to delete this note?
                                        </span>
                                        <div className='border m-3 p-3'>
                                            <p>{props.notes.title}</p>
                                        </div>
                                    </div>
                                    :
                                    <div className='h-40vh hsm:h-50vh hmd:h-55vh hlg:h-60vh hxl:h-65vh'>
                                        <span>
                                            <div>
                                                <InputContainer
                                                    label='Title'
                                                    errors={errors.title}
                                                    onChangeEvent={(event) => {
                                                        setFieldValue("title", event.target.value)
                                                        setNoteValue({
                                                            ...noteValue,
                                                            title: event.target.value
                                                        })
                                                    }}
                                                    value={noteValue.title}
                                                />
                                            </div>
                                            <div>
                                                <InputContainer
                                                    label='Description'
                                                    type="textarea"
                                                    errors={errors.description}
                                                    onChangeEvent={(event) => {
                                                        setFieldValue("description", event.target.value)
                                                        setNoteValue({
                                                            ...noteValue,
                                                            description: event.target.value
                                                        })
                                                    }}
                                                    value={noteValue.description}
                                                />
                                            </div>

                                            <div className="flex items-center mb-4 p-4 justify-end mr-4">
                                                <label className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300">Public Note</label>
                                                <input
                                                    type="checkbox"
                                                    className="w-5 h-5 accent-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    onChange={(event) => {
                                                        setFieldValue("isPublic", event.target.checked)
                                                        setNoteValue({
                                                            ...noteValue,
                                                            isPublic: event.target.checked
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </span>
                                    </div>
                                }

                                <div className="flex justify-end pt-6">
                                    <button disabled={isSubmitting ? true : false}
                                        className={` ${isSubmitting ? "animate-pulse bg-gray-700 " : "bg-kbGreenHoverDark hover:bg-kbGreen focus:ring-4 focus:ring-kbGreenRing"} w-32  shadow-md focus:outline-none mr-5 p-0 rounded-full font-medium text-white d-flex`} type="submit">
                                        <span>
                                            {isSubmitting ? "Submitting..." : `${props.actionType}`}
                                        </span>
                                    </button>
                                    <button type="button" className="modal-close px-4 bg-gray-500 p-3 rounded-full text-white hover:bg-gray-700 w-32 font-medium shadow-sm" onClick={() => { handleModalToggle(false) }}>Close</button>
                                </div>
                            </Form>
                        )
                    }
                }
            </Formik>
        </>
    )

    return (
        <>
            <ModalContainer
                buttonJSX={buttonJSX()}
                innerHTML={innerHTML()}
                modalState={modalOpen}
                toggleModalState={(state) => handleModalToggle(state)}
            />
        </>
    )
}
