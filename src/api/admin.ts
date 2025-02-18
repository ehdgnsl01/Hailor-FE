import { IGetAdminReservations, IPostAdminReservationConfirm, IPostAdminReservationRefund } from '../types/reservation.ts'
import { VITE_SERVER_URL } from '../config'
import { IGetDesignerList, IPostDesigner, IPostRegion } from '../types/designer.ts'

export async function getReservations(token: string, size: number, lastId: number): Promise<IGetAdminReservations> {
    const res = await fetch(`${VITE_SERVER_URL}/api/v1/admin/reservation?size=${size}${`${lastId === 0 ? '' : `&lastId=${lastId}`}`}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })

    if (!res.ok) {
        const data = await res.json()
        throw new Error(JSON.stringify(data))
    }

    return res.json()
}

export async function postReservationRefund(request: IPostAdminReservationRefund): Promise<void> {
    const res = await fetch(`${VITE_SERVER_URL}/api/v1/admin/reservation/${request.uri.id}/refund`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${request.secret.token}`,
        },
    })

    if (!res.ok) {
        const data = await res.json()
        throw new Error(JSON.stringify(data))
    }

    return
}

export async function postReservationConfirm(request: IPostAdminReservationConfirm): Promise<void> {
    const res = await fetch(`${VITE_SERVER_URL}/api/v1/admin/reservation/${request.uri.id}/confirm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${request.secret.token}`,
        },
    })

    if (!res.ok) {
        const data = await res.json()
        throw new Error(JSON.stringify(data))
    }

    return
}

export async function getDesignersAdmin(token: string, size: number, lastId: number): Promise<IGetDesignerList> {
    const res = await fetch(`${VITE_SERVER_URL}/api/v1/admin/designer?size=${size}${`${lastId === 0 ? '' : `&lastId=${lastId}`}`}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })

    if (!res.ok) {
        const data = await res.json()
        throw new Error(JSON.stringify(data))
    }

    return res.json()
}

export async function postDesigner(request: IPostDesigner): Promise<void> {
    const formData = new FormData()

    formData.append('request', new Blob([JSON.stringify(request.body.request)], { type: 'application/json' }))
    formData.append('profileImage', request.body.profileImage)

    const res = await fetch(`${VITE_SERVER_URL}/api/v1/admin/designer`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${request.secret.token}`,
        },
        body: formData,
    } as RequestInit)

    if (!res.ok) {
        const data = await res.json()
        throw new Error(JSON.stringify(data))
    }
}

export async function postRegion(request: IPostRegion): Promise<void> {
    const res = await fetch(`${VITE_SERVER_URL}/api/v1/admin/designer/region`, {
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
}
