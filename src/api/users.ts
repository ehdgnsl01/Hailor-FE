import { IRegisterResponse } from '../types/users.ts'
import { VITE_SERVER_URL } from '../config'

export async function getRegisterTerm(): Promise<IRegisterResponse> {
    const res = await fetch(`${VITE_SERVER_URL}/api/v1/terms`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!res.ok) {
        throw new Error(`code: ${res.status}`)
    }
    return res.json()
}
