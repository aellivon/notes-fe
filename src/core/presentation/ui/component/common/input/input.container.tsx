import React from 'react'
import { InputView } from './input.view'



export interface IInputContainerModel {
  errors: string | undefined
  onChangeEvent: (event: any) => void
  value: string | undefined
  label: string
}


const InputContainer: React.FC<IInputContainerModel> = (props) => {
  return (
    <InputView
      errors={props.errors}
      onChangeEvent={(event) => {
        props.onChangeEvent(event)
      }}
      value={props.value}
      label={props.label}
    />
  )
}

export default InputContainer
