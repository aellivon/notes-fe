import { ModalView } from './modal.view'

export interface IModalContainer {
    buttonJSX: React.ReactNode;
    innerHTML: React.ReactNode;
    modalState: boolean
    toggleModalState: (state: boolean) => void
}

export const ModalContainer: React.FC<IModalContainer> = (props) => {
  return (
    <>
      <ModalView
        buttonJSX={props.buttonJSX}
        innerHTML={props.innerHTML}
        modalState={props.modalState}
        toggleModalState={(state) => props.toggleModalState(state)}
      />
    </>
  )
}
