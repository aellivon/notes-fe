import React, { useState } from 'react'
import LoginController from './login.controller'
import { LoginScreen } from './login.view'
import { useNavigate } from 'react-router-dom'
import { ILoginFormDataModel } from '../../core/domain/login-form.entity'

const LoginFormContainer: React.FC = () => {
  const controller = new LoginController()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (values: ILoginFormDataModel) => {
    const response = await controller.login(values)
    if (response.success) {
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
