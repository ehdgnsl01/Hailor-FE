import * as jwt from 'jsonwebtoken'
import { create } from 'zustand/react'
import { VITE_SERVER_URL } from '../config'
import { IToken, IUser } from '../types/users.ts'

interface UserStore {
    user: IUser
    isRefresh: boolean
    setToken: (token: IToken) => void
    getToken: () => string
    getUser: () => IUser
}

export const userStore = create<UserStore>((set, get) => ({
    user: {
        email: '',
        userId: '',
        name: '',
        role: '',
        exp: 0,
    },
    isRefresh: false,
    setToken: token => {
        const user: IUser = jwt.decode(token.accessToken) as IUser
        set({ user })

        sessionStorage.setItem('accessToken', token.accessToken)
        sessionStorage.setItem('refreshToken', token.refreshToken)
        sessionStorage.setItem('exp', `${user.exp}`)
    },
    getToken: () => {
        const exp = parseInt(sessionStorage.getItem('exp') || '0')
        if (!get().isRefresh && exp - Math.floor(Date.now() / 1000) < 1000) {
            set({ isRefresh: true })
            fetch(`${VITE_SERVER_URL}/api/v1/auth/refresh?token=${sessionStorage.getItem('refreshToken')}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.refreshToken) {
                        sessionStorage.setItem('accessToken', data.accessToken)
                        sessionStorage.setItem('refreshToken', data.refreshToken)
                        const user = jwt.decode(data.accessToken) as IUser
                        sessionStorage.setItem('exp', `${user.exp}`)
                    }
                })
                .finally(() => set({ isRefresh: false }))
        }
        return sessionStorage.getItem('accessToken') || ''
    },
    getUser: () => (jwt.decode(sessionStorage.getItem('accessToken') || '') || {}) as IUser,
}))
