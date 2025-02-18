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

export interface IAdminReservation extends IReservationFull {
    user: {
        id: number
        name: string
        email: string
    }
}

export interface IPostReservation {
    body: IReservation
    secret: {
        token: string
    }
}

export interface IGetAdminReservations {
    reservations: IAdminReservation[]
}

export interface IPostAdminReservationRefund {
    uri: {
        id: number
    }
    secret: {
        token: string
    }
}

export interface IPostAdminReservationConfirm {
    uri: {
        id: number
    }
    secret: {
        token: string
    }
}
