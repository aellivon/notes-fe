import React, { useState } from 'react'
import LoginController from './login.controller'
import { LoginScreen } from './login.view'
import { useNavigate } from 'react-router-dom'
import { ILoginFormDataModel } from '../../../../domain/entities/formModels/login-form.entity'
import { useAppSelector } from '../../../presenters/store/hooks'


const LoginFormContainer: React.FC = () => {
  const controller = new LoginController()
  // const presenter = new UserPresenter()success
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('');
  const currentUser = useAppSelector(state => state.authState.user);
  const auth = useAppSelector(state => state.authState.tokens);

  const handleFormSubmit = async (values: ILoginFormDataModel) => {
    await controller.login(values)

    console.log(auth)
    if (auth.accessToken != "") {
      navigate('/dashboard')
    } else {
      setErrorMessage('ユーザー名またはパスワードが無効です。')
    }
  }

  return (
    <LoginScreen
      onSubmit={handleFormSubmit}
      error={errorMessage}
    />
  )
}

export default LoginFormContainer
