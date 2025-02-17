import { Designer } from './designer.ts'

export interface IReservation {
    designerId: number
    reservationDate: string
    slot: number
    meetingType: string
    paymentMethod: string
}

export interface IReservationFull {
    id: number
    date: string
    slot: number
    status: string
    paymentMethod: string
    meetingType: string
    googleMeetLink: string | null
    price: number
    designer: Designer
}

export interface IPostReservation {
    body: IReservation
    secret: {
        token: string
    }
}
