// src/data/exReservationData.ts

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

// 예약 정보가 없는 경우를 나타내는 빈 예약 데이터
export const emptyReservationData: ReservationData = {
    reservationDate: new Date(), // 예약 정보가 없으므로 현재 날짜를 기본값으로 사용 (또는 new Date(0) 등으로 설정 가능)
    placeName: '',
    address: '',
    designerName: '',
    reservationTime: '',
    consultationType: '대면', // 기본값 (필요에 따라 변경 가능)
    // googleMeetLink는 없으므로 생략
}
