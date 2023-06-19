import { Formik, FormikProps, Form } from 'formik'
import Datepicker from "react-tailwindcss-datepicker";

import { useEffect, useState } from 'react'

import { ModalContainer } from "../../common/modal/modal.container";
import { HiPencilSquare, HiPlusCircle, HiTrash, HiXCircle, HiXMark } from 'react-icons/hi2';
import { IconContext } from 'react-icons'
import { IUserProfile } from '../../../../../domain/entities/users/user.entity';
import { IFormUserProfileErrors, IFormUserProfileFields } from '../../../../../domain/entities/formModels/user-profile-form.entity';

import InputContainer from '../../common/input/input.container';

export interface Props {
    member: IUserProfile
    onSubmit: (form: IFormUserProfileFields, userId: number) => void
    formErrors: IFormUserProfileErrors
    resetForm: () => void
    actionType: string
}

export const MemberModalView: React.FC<Props> = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [imgDisplay, setImgDisplay] = useState(props.member.avatarURL ? props.member.avatarURL : "/logo192.png")
    const [memberID] = useState(props.member.id)
    const initialValues: IFormUserProfileFields = {
        avatarURL: undefined,
        firstName: props.member.firstName,
        lastName: props.member.lastName,
        email: props.member.email,
        furiganaFirstName: props.member.furiganaFirstName,
        furiganaLastName: props.member.furiganaLastName,
        position: props.member.position,
        dateJoined: props.member.dateJoined
    };
    const [userProfileValue, setUserProfileValue] = useState(initialValues)

    useEffect(() => {
        setUserProfileValue(initialValues)
    }, [props.member])

    const handleModalToggle = (toChangeInto: boolean) => {
        setModalOpen(toChangeInto)
        setUserProfileValue(initialValues)
        props.resetForm()
    };
    const [dateValue, setDateValue] = useState({
        startDate: props.member?.dateJoined !== null && props.member?.dateJoined !== undefined ? new Date(props.member.dateJoined) : null,
        endDate: props.member?.dateJoined !== null && props.member?.dateJoined !== undefined ? new Date(props.member.dateJoined) : null
    });

    const handleDateValueChange = (newValue: any) => {
        setDateValue(newValue);
    }

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
                Add Member
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
                <p className="text-2xl font-bold ml-3 mt-2">{props.actionType} Member</p>
                <div className="modal-close cursor-pointer z-50">
                    <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" onClick={() => handleModalToggle(false)}>
                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                    </svg>
                </div>
            </div>
            <hr className='py-2' />

            <Formik
                enableReinitialize
                initialValues={userProfileValue}
                onSubmit={async values => {
                    console.log(values);
                    props.resetForm()
                    await props.onSubmit(values, memberID)
                }}
                validate={() => { }}
            >
                {
                    ({ setFieldValue, errors, isSubmitting }: FormikProps<IFormUserProfileFields>) => {
                        errors = props.formErrors
                        return (
                            <Form>

                                {props.actionType == 'Delete' ?
                                    <div className='h-10vh'>
                                        <span className='text-gray-800 ml-3'>
                                            Are you sure you want to delete this user?
                                        </span>
                                        <div className='border m-3 p-3'>
                                            <p>{props.member.firstName} {props.member.lastName}</p>
                                        </div>
                                    </div>
                                    :
                                    <div className='h-40vh hsm:h-50vh hmd:h-55vh hlg:h-60vh hxl:h-65vh'>
                                        <span>

                                            <div className='flex justify-center items-center'>
                                                <img className="rounded-full h-32 w-32 mb-4" src={imgDisplay} alt="avatar" />
                                            </div>
                                            <div className='flex justify-center items-center text-center'>
                                                <input
                                                    id="avatarURL" name="avatarURL" type="file"
                                                    className="text-sm text-grey-500
                                                 file:mr-5 file:py-2 file:px-10
                                                 file:rounded-full file:border-0
                                                 file:text-md file:font-semibold file:text-white pb-2
                                                 hover:file:cursor-pointer hover:file:opacity-80
                                                 file:bg-kbGreenHoverDark file:hover:bg-kbGreen
                                                 file:focus:ring-4 focus:ring-kbGreenRing"
                                                    onChange={(event) => {
                                                        if (event.currentTarget !== null && event?.currentTarget.files !== null) {
                                                            setFieldValue("avatarURL", event?.currentTarget?.files[0]);
                                                            const objectUrl = URL.createObjectURL(event.currentTarget.files[0]);
                                                            setImgDisplay(objectUrl)
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className='flex justify-center items-center text-center w-full'>
                                                {errors.avatarURL !== "" && errors.avatarURL !== undefined && errors.avatarURL.length !== 0 ?
                                                    <div className="flex justify-center items-center text-center w-full">
                                                        <p className="text-red-500 text-xs italic">{errors.avatarURL[0]}</p>
                                                    </div> :
                                                    null
                                                }
                                            </div>
                                            <hr className='py-2 mt-4' />
                                            <div>
                                                <InputContainer
                                                    label='Email'
                                                    errors={errors.email}
                                                    onChangeEvent={(event) => {
                                                        setFieldValue("email", event.target.value)
                                                        setUserProfileValue({
                                                            ...userProfileValue,
                                                            email: event.target.value
                                                        })
                                                    }}
                                                    value={userProfileValue.email}
                                                />
                                            </div>
                                            <div>
                                                <InputContainer
                                                    label='First Name'
                                                    errors={errors.firstName}
                                                    onChangeEvent={(event) => {
                                                        setFieldValue("firstName", event.target.value)
                                                        setUserProfileValue({
                                                            ...userProfileValue,
                                                            firstName: event.target.value
                                                        })
                                                    }}
                                                    value={userProfileValue.firstName}
                                                />
                                            </div>
                                            <div>
                                                <InputContainer
                                                    label='Furigana First Name'
                                                    errors={errors.furiganaFirstName}
                                                    onChangeEvent={(event) => {
                                                        setFieldValue("furiganaFirstName", event.target.value)
                                                        setUserProfileValue({
                                                            ...userProfileValue,
                                                            furiganaFirstName: event.target.value
                                                        })
                                                    }}
                                                    value={userProfileValue.furiganaFirstName}
                                                />
                                            </div>
                                            <div>
                                                <InputContainer
                                                    label='Last Name'
                                                    errors={errors.lastName}
                                                    onChangeEvent={(event) => {
                                                        setFieldValue("lastName", event.target.value)
                                                        setUserProfileValue({
                                                            ...userProfileValue,
                                                            lastName: event.target.value
                                                        })
                                                    }}
                                                    value={userProfileValue.lastName}
                                                />
                                            </div>
                                            <div>
                                                <InputContainer
                                                    label='Furigana Last Name'
                                                    errors={errors.furiganaLastName}
                                                    onChangeEvent={(event) => {
                                                        setFieldValue("furiganaLastName", event.target.value)
                                                        setUserProfileValue({
                                                            ...userProfileValue,
                                                            furiganaLastName: event.target.value
                                                        })
                                                    }}
                                                    value={userProfileValue.furiganaLastName}
                                                />
                                            </div>
                                            <div>
                                                <InputContainer
                                                    label='Position'
                                                    errors={errors.position}
                                                    onChangeEvent={(event) => {
                                                        setFieldValue("position", event.target.value)
                                                        setUserProfileValue({
                                                            ...userProfileValue,
                                                            position: event.target.value
                                                        })
                                                    }}
                                                    value={userProfileValue.position}
                                                />
                                            </div>
                                            <div>
                                                <div className="flex justify-start w-full items-center text-center">
                                                    <label className="block w-1/3 text-gray-700 text-sm font-bold mb-2 mr-4">
                                                        Date Joined
                                                    </label>
                                                    <Datepicker
                                                        toggleClassName="hidden"
                                                        popoverDirection="up"
                                                        containerClassName="relative w-full mr-5 text-gray-700"
                                                        inputClassName={`shadow  appearance-none border ${errors.dateJoined !== "" && errors.dateJoined !== undefined && errors.dateJoined.length !== 0 ? 'border-red-500' : null}  rounded w-full py-2  mr-5 px-4 mr-5 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                                                        useRange={false}
                                                        asSingle={true}
                                                        value={dateValue}
                                                        onChange={(newDateValue: any) => {
                                                            handleDateValueChange(newDateValue)
                                                            setFieldValue("dateJoined", newDateValue.startDate)
                                                            setUserProfileValue({
                                                                ...userProfileValue,
                                                                dateJoined: newDateValue.startDate
                                                            })
                                                        }}
                                                    />
                                                </div>
                                                {errors.dateJoined !== "" && errors.dateJoined !== undefined && errors.dateJoined.length !== 0 ?
                                                    <div className="flex justify-center items-center text-center">
                                                        <div className='w-1/3'></div>
                                                        <p className="w-2/3 text-red-500 text-xs italic">{errors.dateJoined[0]}</p>
                                                    </div> :
                                                    null
                                                }
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
