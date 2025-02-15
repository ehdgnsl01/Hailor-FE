export interface ReservationData {
    reservationDate: Date
    placeName: string
    address: string
    designerName: string
    reservationTime: string
    consultationType: '대면' | '비대면' | '화상, 대면 둘다 가능'
    googleMeetLink?: string // 상담 방식이 비대면인 경우 사용
}

export const reservationData: ReservationData = {
    // 예시 예약 날짜: 현재 연도 기준 2월 20일
    reservationDate: new Date(new Date().getFullYear(), 1, 20),
    placeName: 'ABC Hair Salon',
    address: '서울 강남구 역삼동 123-45',
    designerName: '윈터',
    reservationTime: '14:00',
    consultationType: '비대면',
    googleMeetLink: 'https://meet.google.com/abc-defg-hij',
}
