import { create } from 'zustand/react'

interface IPaymentStore {
    reservationId: number
    reservationType: string
    paymentType: string
    pg_token: string
    setReservationId: (reservationId: number) => void
    setReservationType: (reservationType: string) => void
    setPaymentType: (paymentType: string) => void
    setPgToken: (token: string) => void
    getReservationId: () => number
    getReservationType: () => string
    getPaymentType: () => string
}

export const paymentStore = create<IPaymentStore>(set => ({
    reservationId: -1,
    reservationType: '',
    paymentType: '',
    pg_token: '',
    setReservationType: reservationType => {
        set({ reservationType: reservationType })
        sessionStorage.setItem('reservationType', reservationType)
    },
    setReservationId: reservationId => {
        set({ reservationId: reservationId })
        sessionStorage.setItem('reservationId', `${reservationId}`)
    },
    setPaymentType: paymentType => {
        set({ paymentType: paymentType })
        sessionStorage.setItem('paymentType', `${paymentType}`)
    },
    setPgToken: token => set({ pg_token: token }),
    getReservationId: () => parseInt(sessionStorage.getItem('reservationId') || '-1'),
    getReservationType: () => sessionStorage.getItem('reservationType') || '',
    getPaymentType: () => sessionStorage.getItem('paymentType') || '',
}))
