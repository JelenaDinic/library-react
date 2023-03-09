import { AxiosResponse } from 'axios'

import AuthResponse from '../interfaces/AuthResponse'
import LoginCredentials from '../interfaces/LoginCredentials'
import { baseAxios } from './api.service'

export const getLogin = (loginCredentials : LoginCredentials): Promise<AxiosResponse<AuthResponse>> => baseAxios.post<AuthResponse>('/Auth/login', loginCredentials)
