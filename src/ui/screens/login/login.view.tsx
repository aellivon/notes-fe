import {
  Formik,
  Form,
  Field,
} from 'formik';


export interface ILoginFormDataModel {
  username: string;
  password: string;
}

interface ILoginFormViewModel {
  onSubmit: (form: ILoginFormDataModel) => void
  error?: string
}

export const LoginScreen:React.FC<ILoginFormViewModel> = (props) => {
  const initialValues: ILoginFormDataModel = { username: '', password: '' };

  return (
    <div className="flex flex-wrap h-screen">
      <div className="w-full sm:w-8/12 md:w-5/12 px-4">
        <div className="w-full">
          <div className="md:p-12 md:mx-6">
            <div className="text-center">
              <img
                className="mx-auto w-48"
                src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
                alt="logo"
              />
              <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">Sunny Tool</h4>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={async values => {
                  await props.onSubmit(values)
                }}
            >
              <Form className="">
                <p className="mb-4">Please login to your account</p>
                <p className="">{props.error}</p>
                <div className="mb-4">  
                  <label htmlFor="username" className="">Username</label>
                  <Field type="text" name="username" id="username" 
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="">パスワード</label>
                  <Field type="password" name="password" id="password" autoComplete="on" required
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div className="text-center pt-1 mb-12 pb-1">
                  <button
                    className="inline-block px-6 py-2.5 font-medium text-xs bg-blue-500 hover:bg-blue-700 leading-tight uppercase rounded shadow-md text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                    type="submit"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    Log in
                  </button>
                  <a className="text-gray-500" href="#!">Forgot password?</a>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <div className="w-0 sm:w-4/12 md:w-7/12 bg-[url('https://images.unsplash.com/photo-1675151638871-81d2e9acf61c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3NzA0OTYzNA&ixlib=rb-4.0.3&q=80&w=1080')] bg-no-repeat bg-cover bg-center"></div>
    </div>
  );
}