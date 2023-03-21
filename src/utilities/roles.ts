import { UserRole } from '../interfaces/Jwt'

export const isAdmin = (role: UserRole) => role === UserRole.Admin

export const isLibrarian = (role: UserRole) => role === UserRole.Librarian

export const isUser = (role: UserRole) => role === UserRole.User
