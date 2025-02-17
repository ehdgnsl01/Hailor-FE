import { IPostReservation } from '../types/reservation.ts'
import { VITE_SERVER_URL } from '../config'

export async function postReservation(request: IPostReservation): Promise<void> {
    const res = await fetch(`${VITE_SERVER_URL}/api/v1/reservation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${request.secret.token}`,
        },
        body: JSON.stringify(request.body),
    })
    if (!res.ok) {
        const data = await res.json()
        throw new Error(JSON.stringify(data))
    }
    return
}
