


import AuthRepository from "../../../data/gateways/api/services/auth.repositories"
import RefreshAPIGateway from "../../../data/gateways/api/services/refresh.gateway"
import { mockAPIResponses } from "../../../data/infra/api-mock"
import { store } from "../../../presentation/presenters/store/store"
import RefreshTokenUseCase from "./refreshToken.usecase"


describe('Refresh Token', () => {
  let useCase: RefreshTokenUseCase
  let gateway: RefreshAPIGateway
  let repo: AuthRepository

  let initialTokens = {
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg3NDA0NTgxLCJpYXQiOjE2ODc0MDA5NzMsImp0aSI6IjgzYWZiMzUwZTdmYjQ5NDA4NjIzMWMyODljZTBjOTE4IiwidXNlcl9pZCI6MX0.2yNqV99_OmqN6NRbgLACq9oXpwc3EPpe8YAeToisEZQ",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4ODAwNTc4MSwiaWF0IjoxNjg3NDAwOTgxLCJqdGkiOiJmZGRmMTc0MzE1NjU0NTlkYWNlZWIyODY5ODFiYTQ4OCIsInVzZXJfaWQiOjF9.pUsU_J1KIXkgcc9am1zjMKZcssGjhSLJGH_VOLvtt-s",
    "access_token_expiration": "2023-06-22T03:29:41.087478Z"
  }


  beforeEach(() => {
    gateway = new RefreshAPIGateway()
    repo = new AuthRepository()
    repo.setUserTokens(gateway.getTokensFromResponse(initialTokens))
  })

  test('execute with invalid errors', async () => {
    const simulatedError = {
        "detail": "Token is invalid or expired",
        "code": "token_not_valid"
    }


    mockAPIResponses(gateway.apiSauce.axiosInstance, true, simulatedError)

    let state = store.getState()
  
    expect(state.authState.tokens.accessToken).toBe(initialTokens.access)
    expect(state.authState.tokens.refreshToken).toBe(initialTokens.refresh)

    useCase = new RefreshTokenUseCase(gateway, repo)
    state = store.getState()
    await useCase.execute({refresh: "ref"})
    state = store.getState()

    expect(state.authState.tokens.accessToken).toBe("")
    expect(state.authState.tokens.refreshToken).toBe("")
  })


  test('execute', async () => {
    const newTokRes = {
      "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg3NDA0ODYyLCJpYXQiOjE2ODc0MDA5NzMsImp0aSI6IjEyNTMwNmMxODQ3MDRjZWY4MTJlNTM3YjY4YTE4ZGJiIiwidXNlcl9pZCI6MX0.1ROxLs-6nOg8A2qY37LkraEZY7tJjhxzWy17xU762sI",
      "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4ODAwNjA2MiwiaWF0IjoxNjg3NDAxMjYyLCJqdGkiOiI5ZDBjZTQyYzJmMTM0YWY5OGZjZDQ1ZmM1MTMxMGFiZSIsInVzZXJfaWQiOjF9.dXZBYsnbQ_a2a5J2BHIMzsiVDFsmliWkzNIRAl8-fjg",
    }

    mockAPIResponses(gateway.apiSauce.axiosInstance, false, newTokRes)

    let state = store.getState()
  
    expect(state.authState.tokens.accessToken).toBe(initialTokens.access)
    expect(state.authState.tokens.refreshToken).toBe(initialTokens.refresh)

    useCase = new RefreshTokenUseCase(gateway, repo)
    state = store.getState()
    await useCase.execute({refresh: "ref"})
    state = store.getState()

    expect(state.authState.tokens.accessToken).toBe(newTokRes.access)
    expect(state.authState.tokens.refreshToken).toBe(newTokRes.refresh)
  })

})
