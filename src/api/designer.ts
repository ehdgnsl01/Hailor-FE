import { VITE_SEVER_URL } from '../config'
import { IGetDesignerList, IGetDesignerListFilter, IGetDesignerScheduleResponse, IRegion } from '../types/designer.ts'

export async function getRegions(token: string): Promise<IRegion[]> {
    const res = await fetch(`${VITE_SEVER_URL}/api/v1/designer/regions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })

    if (!res.ok) {
        return {} as IRegion[]
    }
    return res.json()
}

export async function getDesigners(filter: IGetDesignerListFilter, token: string): Promise<IGetDesignerList> {
    const query = new URLSearchParams(Object.fromEntries(Object.entries(filter).map(([key, value]) => [key, String(value)])))
    const res = await fetch(`${VITE_SEVER_URL}/api/v1/designer?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
    if (!res.ok) {
        return {} as IGetDesignerList
    }
    return res.json()
}

export async function getDesignerSchedule(id: number, date: string, token: string): Promise<IGetDesignerScheduleResponse> {
    const res = await fetch(`${VITE_SEVER_URL}/api/v1/designer/${id}/schedule?date=${date}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
    if (!res.ok) {
        return {} as IGetDesignerScheduleResponse
    }
    return res.json()
}
