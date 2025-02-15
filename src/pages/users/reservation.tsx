import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { reservationData } from '../../data/exReservationData'

function Reservation() {
    const [reservationDate, setReservationDate] = useState<Date | null>(null)

    useEffect(() => {
        setReservationDate(reservationData.reservationDate)
    }, [])

    // 오늘과 예약 날짜의 차이를 계산하는 함수
    const getCountdownString = (date: Date): string => {
        const now = new Date()
        const diffTime = date.getTime() - now.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        if (diffDays > 0) {
            return `D-${diffDays}`
        } else if (diffDays === 0) {
            return 'D-Day'
        } else {
            return ''
        }
    }

    const countdown = reservationDate ? getCountdownString(reservationDate) : ''

    // 예약 상세 정보는 reservationData에서 가져옴
    const { placeName, address, designerName, reservationTime, consultationType, googleMeetLink } = reservationData

    const formattedReservationDate = reservationDate ? `${reservationDate.getMonth() + 1}월 ${reservationDate.getDate()}일` : ''
    const days = ['일', '월', '화', '수', '목', '금', '토']
    const dayOfWeek = reservationDate ? days[reservationDate.getDay()] : ''

    return (
        <PaymentContainer>
            <Image src="https://placehold.co/600x600" />
            <FormContainer>
                <InfoBoxesContainer>
                    {/* 박스 1: 장소, 주소, 디자이너 */}
                    <InfoBox>
                        <InfoItem>
                            <CountdownText>{countdown ? countdown : '예약하신 일정이 없습니다.'}</CountdownText>
                            <TitleText>{placeName}</TitleText>
                        </InfoItem>
                        <InfoItem>
                            <SubText>{address}</SubText>
                            <SubText>·</SubText>
                            <SubText>{designerName}</SubText>
                        </InfoItem>
                    </InfoBox>
                    {/* 박스 2: 예약일, 요일, 예약시간, 상담 방식 */}
                    <InfoBox>
                        <InfoItem>
                            <strong>예약일:</strong> {formattedReservationDate} ({dayOfWeek})
                        </InfoItem>
                        <InfoItem>
                            <strong>예약시간:</strong> {reservationTime}
                        </InfoItem>
                        <InfoItem>
                            <strong>상담 방식:</strong> {consultationType}
                        </InfoItem>
                    </InfoBox>
                    {/* 박스 3: 상담 방식이 비대면이면 구글미트 링크 */}
                    {consultationType === '비대면' && googleMeetLink && (
                        <InfoBox>
                            <InfoItem>
                                <strong>비대면 상담 링크:</strong>{' '}
                                <GoogleMeetLink href={googleMeetLink} target="_blank" rel="noopener noreferrer">
                                    구글미트 바로가기
                                </GoogleMeetLink>
                            </InfoItem>
                        </InfoBox>
                    )}
                </InfoBoxesContainer>
            </FormContainer>
        </PaymentContainer>
    )
}

export default Reservation

const PaymentContainer = styled.div`
    position: absolute;
    top: 5rem;
    left: 0;
    width: 100%;
    height: calc(var(--vh, 1vh) * 100 - 5rem);
    overflow-y: scroll;
`

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    width: 100%;
    padding: 1.6rem 0;
`

const Image = styled.img`
    width: 100%;
    height: 20rem;
    object-fit: cover;
`

const CountdownText = styled.div`
    font-size: 2rem;
    font-weight: bold;
    color: #35376e;
    margin: 1rem 0;
`

const InfoBoxesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    margin-top: 2rem;
    justify-content: center;
    align-items: center;
`

const InfoBox = styled.div`
    border: 0.1rem solid #ccc;
    border-radius: 1rem;
    padding: 2rem 1.5rem;
    background-color: #f8f8f8;
    font-size: 1.6rem;
    width: 85%;
`

const InfoItem = styled.div`
    display: flex;
    gap: 1rem;
    align-items: baseline;
`

const TitleText = styled.div`
    font-size: 2.4rem;
    font-weight: bold;
`

const SubText = styled.div`
    font-size: 1.5rem;
    color: rgba(41, 41, 41, 0.6);
    margin-right: 0.5rem;
`

const GoogleMeetLink = styled.a`
    color: #35376e;
    text-decoration: underline;
    font-weight: bold;
`
