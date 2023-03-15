import { UserRole } from '../interfaces/Jwt'

export const isUserAdmin = (role: UserRole) => role === UserRole.Admin

export const isUserLibrarian = (role: UserRole) => role === UserRole.Librarian

export const isUserRegularUser = (role: UserRole) => role === UserRole.User
