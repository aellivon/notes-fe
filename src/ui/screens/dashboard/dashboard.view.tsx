import {
    Formik,
    Form,
} from 'formik';
  
interface DashboardProps {
    onLogout: () => void
}
  
export const DashboardView:React.FC<DashboardProps> = (props) => {
    const initialValues: any = { username: '', password: '' }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async values => {
                props.onLogout()
            }}
        >
        <Form className="">
            <div className="text-center pt-1 mb-12 pb-1">
            <button
                className="inline-block px-6 py-2.5 font-medium text-xs bg-blue-500 hover:bg-blue-700 leading-tight uppercase rounded shadow-md text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                type="submit"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
            >
                Log Out
            </button>
            </div>
        </Form>
        </Formik>
    );
}