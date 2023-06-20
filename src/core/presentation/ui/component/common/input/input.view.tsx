import React from 'react'

export interface Props {
    errors: string | undefined
    onChangeEvent: (event: any) => void
    value: string | undefined
    label: string
    type?: string
}

export const InputView: React.FC<Props> = (props) => {

    return (
        <span>
            <div className="flex justify-start w-full items-center text-center">
                <label className="block w-1/3 text-gray-700 text-sm font-bold mb-2 mr-5">
                    {props.label}
                </label>
                {props.type === 'textarea' ?
                    <textarea
                        rows={20}
                        className={
                            `shadow w-3/4 appearance-none border 
                    ${props.errors !== "" && props.errors !== undefined && props.errors.length !== 0 ? 'border-red-500' : null} 
                    rounded w-full py-2 px-4 mr-5 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`
                        }
                        value={props.value}
                        onChange={(event) => {
                            props.onChangeEvent(event)
                        }}
                    /> :
                    <input
                        className={
                            `shadow w-3/4 appearance-none border 
                ${props.errors !== "" && props.errors !== undefined && props.errors.length !== 0 ? 'border-red-500' : null} 
                rounded w-full py-2 px-4 mr-5 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`
                        }
                        type="text"
                        value={props.value}
                        onChange={(event) => {
                            props.onChangeEvent(event)
                        }}
                    />
                }
            </div>
            {props.errors !== "" && props.errors !== undefined && props.errors.length !== 0 ?
                <div className="flex justify-center items-center text-center">
                    <div className='w-1/3'></div>
                    <p className="w-2/3 text-red-500 text-xs italic">{props.errors[0]}</p>
                </div> :
                null
            }
        </span>
    )
}
