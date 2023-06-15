import { Formik, FormikProps, Form, FormikErrors } from 'formik'


import { useState } from 'react'

import { ModalContainer } from "../../common/modal/modal.container";
import { HiPencilSquare } from 'react-icons/hi2';
import { IconContext } from 'react-icons'
import { IUserProfile } from '../../../../../domain/entities/users/user.entity';

export interface Props {
    member: IUserProfile
}

export interface IProfileFields {
    avatarURL: File | undefined
}  


export const MemberModalView: React.FC<Props> = (props) => {

    const [modalOpen, setModalOpen] = useState(true);
    const [imgDisplay, setImgDisplay] = useState(props.member.avatarURL)
    const handleModalToggle = (toChangeInto: boolean) => {
        setModalOpen(toChangeInto)
        console.log(toChangeInto)
    };
    const initialValues: IProfileFields = { avatarURL: undefined };


    const buttonJSX = () => (
        <button 
            type="button"
            className='mr-4'
            onClick={() => handleModalToggle(true)}
        >
            <IconContext.Provider value={{ className:"w-5 h-5" }}>
                <HiPencilSquare/>
            </IconContext.Provider>
            {/*  */}
        </button>
    )

    const innerHTML = () => (
        <>
            <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Update User</p>
                <div className="modal-close cursor-pointer z-50">
                <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" onClick={() => handleModalToggle(false)}>
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
                </div>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={values => {
                    console.log(values)
                }}
                validate={() => {}}
            >
                {/* 'id', 'first_name', 'last_name', 'email', 'furigana_lname', 'furigana_fname',
            'position', 'avatar_url', 'date_joined', 'display_name' */}
                {
                    ({ handleChange, setFieldValue, handleSubmit, values, errors, isSubmitting }: FormikProps<IProfileFields>) => {
                        return (
                            <Form>
                                <div className='flex justify-center items-center'>
                                    <img className="rounded-full h-32 w-32 mb-4" src={imgDisplay} alt="avatar" />
                                </div>
                                <div className='flex justify-center items-center text-center'>
                                    <input id="avatar_url" name="avatarURL" type="file" 
                                            className="text-sm text-grey-500
                                                file:mr-5 file:py-2 file:px-10
                                                file:rounded-full file:border-0
                                                file:text-md file:font-semibold file:text-white pb-2
                                                file:bg-gradient-to-r file:from-blue-600 file:to-blue-600
                                                hover:file:cursor-pointer hover:file:opacity-80"
                                            onChange={(event) => {
                                                if (event.currentTarget !== null && event?.currentTarget.files  !== null) {
                                                    setFieldValue("avatarURL", event?.currentTarget?.files[0]);
                                                    const objectUrl = URL.createObjectURL(event.currentTarget.files[0]);
                                                    setImgDisplay(objectUrl)
                                                }
                                            }}
                                    />
                                </div>
                                <hr className='py-2'/>
                                <div className="mb-2">
                                    <div className="flex justify-center w-full items-center text-center">
                                        <label className="block w-1/3 text-gray-700 text-sm font-bold mb-2 mr-5">
                                            First Name
                                        </label>
                                        <input 
                                            className="shadow w-3/4 appearance-none border border-red-500 rounded w-full py-2 px-4 mr-5 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" 
                                        />
                                    </div>
                                    <div className="flex justify-center items-center text-center">
                                        <div className='w-1/3'></div>
                                        <p className="w-2/3 text-red-500 text-xs italic">Please choose a password.</p>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <div className="flex justify-center w-full items-center text-center">
                                        <label className="block w-1/3 text-gray-700 text-sm font-bold mb-2 mr-5">
                                            Furigana First Name
                                        </label>
                                        <input 
                                            className="shadow w-3/4 appearance-none border border-red-500 rounded w-full py-2 px-4 mr-5 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" 
                                        />
                                    </div>
                                    <div className="flex justify-center items-center text-center">
                                        <div className='w-1/3'></div>
                                        <p className="w-2/3 text-red-500 text-xs italic">Please choose a password.</p>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <div className="flex justify-center w-full items-center text-center">
                                        <label className="block w-1/3 text-gray-700 text-sm font-bold mb-2 mr-5">
                                            Last Name
                                        </label>
                                        <input 
                                            className="shadow w-3/4 appearance-none border border-red-500 rounded w-full py-2 px-4 mr-5 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" 
                                        />
                                    </div>
                                    <div className="flex justify-center items-center text-center">
                                        <div className='w-1/3'></div>
                                        <p className="w-2/3 text-red-500 text-xs italic">Please choose a password.</p>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <div className="flex justify-center w-full items-center text-center">
                                        <label className="block w-1/3 text-gray-700 text-sm font-bold mb-2 mr-5">
                                            Furigana Last Name
                                        </label>
                                        <input 
                                            className="shadow w-3/4 appearance-none border border-red-500 rounded w-full py-2 px-4 mr-5 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" 
                                        />
                                    </div>
                                    <div className="flex justify-center items-center text-center">
                                        <div className='w-1/3'></div>
                                        <p className="w-2/3 text-red-500 text-xs italic">Please choose a password.</p>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <div className="flex justify-center w-full items-center text-center">
                                        <label className="block w-1/3 text-gray-700 text-sm font-bold mb-2 mr-5">
                                            Position
                                        </label>
                                        <input 
                                            className="shadow w-3/4 appearance-none border border-red-500 rounded w-full py-2 px-4 mr-5 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" 
                                        />
                                    </div>
                                    <div className="flex justify-center items-center text-center">
                                        <div className='w-1/3'></div>
                                        <p className="w-2/3 text-red-500 text-xs italic">Please choose a password.</p>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <div className="flex justify-center w-full items-center text-center">
                                        <label className="block w-1/3 text-gray-700 text-sm font-bold mb-2 mr-5">
                                            Date Joined
                                        </label>
                                        <input 
                                            className="shadow w-3/4 appearance-none border border-red-500 rounded w-full py-2 px-4 mr-5 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" 
                                        />
                                    </div>
                                    <div className="flex justify-center items-center text-center">
                                        <div className='w-1/3'></div>
                                        <p className="w-2/3 text-red-500 text-xs italic">Please choose a password.</p>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-6">
                                    <button className="px-4 mr-5 bg-blue-700 p-0 rounded-lg text-white hover:bg-blue-900" type="button">
                                        Sign In
                                    </button>
                                    <button className="modal-close px-4 bg-gray-500 p-3 rounded-lg text-white hover:bg-gray-700" onClick={() => {handleModalToggle(false)}}>Close</button>
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
