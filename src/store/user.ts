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
        profileImage: '',
    },
    isRefresh: false,
    setToken: token => {
        const user: IUser = jwt.decode(token.accessToken) as IUser
        set({ user })
        // localStorage를 사용하여 토큰과 exp 저장
        localStorage.setItem('accessToken', token.accessToken)
        localStorage.setItem('refreshToken', token.refreshToken)
        localStorage.setItem('exp', `${user.exp}`)
    },
    getToken: () => {
        const exp = parseInt(localStorage.getItem('exp') || '0')
        if (!get().isRefresh && exp - Math.floor(Date.now() / 1000) < 1000) {
            set({ isRefresh: true })
            fetch(`${VITE_SERVER_URL}/api/v1/auth/refresh?token=${localStorage.getItem('refreshToken')}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.refreshToken) {
                        localStorage.setItem('accessToken', data.accessToken)
                        localStorage.setItem('refreshToken', data.refreshToken)
                        const user = jwt.decode(data.accessToken) as IUser
                        localStorage.setItem('exp', `${user.exp}`)
                    }
                })
                .finally(() => set({ isRefresh: false }))
        }
        return localStorage.getItem('accessToken') || ''
    },
    getUser: () => (jwt.decode(localStorage.getItem('accessToken') || '') || {}) as IUser,
}))
