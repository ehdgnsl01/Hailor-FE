import { IRegisterResponse } from '../types/users.ts'
import { VITE_SEVER_URL } from '../config'

export async function getRegisterTerm(): Promise<IRegisterResponse> {
    const res = await fetch(`${VITE_SEVER_URL}/api/v1/terms`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!res.ok) {
        return {} as IRegisterResponse
    }
    return res.json()
}
