export interface IModalView {
  buttonJSX: React.ReactNode;
  innerHTML: React.ReactNode;
  modalState: boolean;
  toggleModalState: (state: boolean) => void
}

export const ModalView: React.FC<IModalView> = (props) => {

  return (
    <>
      { props.buttonJSX }
      <div className={`modal ${props.modalState ? 'modal-active': 'opacity-0 pointer-events-none'} fixed w-full h-full top-0 left-0 flex items-center justify-center`}>
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50 overflow-y"></div>
        <div className="modal-container bg-white w-11/12 md:max-w-xl mx-auto rounded shadow-lg z-50 overflow-y-auto mt-32 xl:mt-0">
          <div className="modal-content py-4 text-left px-2">
            { props.innerHTML }
          </div>
        </div>
      </div>
    </>
  )
}
