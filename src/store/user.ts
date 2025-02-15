import * as jwt from 'jsonwebtoken'
import { create } from 'zustand/react'
import { VITE_SERVER_URL } from '../config'
import { IToken, IUser } from '../types/users.ts'

interface UserStore {
    user: IUser
    setToken: (token: IToken) => void
    refresh: () => void
    getToken: () => IToken
    getUser: () => IUser
}

export const userStore = create<UserStore>(set => ({
    user: {
        email: '',
        userId: '',
        name: '',
        role: '',
        exp: 0,
    },
    setToken: token => {
        const user: IUser = jwt.decode(token.accessToken) as IUser
        set({ user })
        sessionStorage.setItem('accessToken', token.accessToken)
        sessionStorage.setItem('refreshToken', token.refreshToken)
    },
    refresh: () => {
        fetch(`${VITE_SERVER_URL}/api/v1/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: sessionStorage.getItem('refreshToken') }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    },
    getToken: () => {
        return {
            accessToken: sessionStorage.getItem('accessToken') || '',
            refreshToken: sessionStorage.getItem('refreshToken') || '',
        }
    },
    getUser: () => (jwt.decode(sessionStorage.getItem('accessToken') || '') || {}) as IUser,
}))
