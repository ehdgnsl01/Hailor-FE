import { Designer } from './designer.ts'

export interface IPaymentContext {
    backStatus: number
    closeModal: () => void
    reservationId: number
}

export interface ISearchContext {
    designer: Designer
    date: Date
}
