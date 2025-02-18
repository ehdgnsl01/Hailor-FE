import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { GoogleLoginIcon } from '../../components/icon'
import { userStore } from '../../store/user.ts'
import NeedLogin from '../../components/needLogin.tsx'
import { googleClientId, VITE_SERVER_URL } from '../../config'
import { IReservationFull } from '../../types/reservation.ts'
import { GoogleOAuthProvider } from '@react-oauth/google'
import MakeMeet from '../../components/makeMeet.tsx'
import CancelReservation from '../../components/cancelReservation.tsx'

function ReservationComponent() {
    const [reservations, setReservations] = useState<IReservationFull[]>([])
    const [refetch, setRefetch] = useState<boolean>(false)
    const [isLoading, setLoading] = useState<boolean>(true)
    const { getToken } = userStore()
    const token = getToken()

    useEffect(() => {
        setLoading(true)
        fetch(`${VITE_SERVER_URL}/api/v1/reservation?size=20`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                const res = data as {
                    reservations: IReservationFull[]
                }
                console.log(res)
                const today = new Date()
                const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getDate()}`
                const time = today.getHours() * 60 + today.getMinutes()

                const result = res.reservations
                    .filter(
                        reservation =>
                            (reservation.status === 'RESERVED' || reservation.status === 'CONFIRMED') &&
                            (date !== reservation.date ||
                                (date === reservation.date && time <= (reservation.slot / 2 + 10) * 60 + (reservation.slot % 2 === 0 ? 0 : 30))),
                    )
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() || a.slot - b.slot)
                console.log(result)
                setReservations(result)
                setLoading(false)
            })
    }, [token, refetch])

    // 오늘과 예약 날짜의 차이를 계산하는 함수
    const getCountdownString = (date: string): string => {
        const now = new Date()
        const diffTime = new Date(date).getTime() - now.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        if (diffDays > 0) {
            return `D-${diffDays}`
        } else if (diffDays === 0) {
            return 'D-Day'
        } else {
            return ''
        }
    }

    const convertDate = (date: string): string => {
        const temp = date.split('-')
        return `${temp[1].charAt(0) === '0' ? temp[1].charAt(1) : temp[1]}월 ${temp[2]}일`
    }

    const getDay = (date: string): string => {
        const formatting = ['일', '월', '화', '수', '목', '금', '토']
        return formatting[new Date(date).getDay()]
    }

    if (isLoading) {
        return (
            <PaymentContainer>
                <ImageSkeleton />
                <FormContainer>
                    <InfoBoxSkeleton />
                    <InfoBoxSkeleton />
                    <InfoBoxSkeleton />
                </FormContainer>
            </PaymentContainer>
        )
    } else if (reservations.length === 0) {
        return (
            <NoReservationContainer>
                <NoReservationText>예약하신 일정이 없습니다</NoReservationText>
            </NoReservationContainer>
        )
    }

    return (
        <PaymentContainer>
            <Image src={reservations[0].designer.profileImageURL} />
            <FormContainer>
                <InfoBoxesContainer>
                    {/* 박스 1: 장소, 주소, 디자이너 */}
                    <InfoBox>
                        <InfoItem>
                            <TitleText>{reservations[0].designer.name}</TitleText>
                            <CountdownText>{getCountdownString(reservations[0].date)}</CountdownText>
                        </InfoItem>
                        <InfoItem>
                            <SubText>{reservations[0].designer.shopAddress}</SubText>
                            {/*<SubText>·</SubText>
                            <SubText>{designerName}</SubText>*/}
                        </InfoItem>
                    </InfoBox>
                    {/* 박스 2: 예약일, 요일, 예약시간, 상담 방식 */}
                    <InfoBox>
                        <InfoItem>
                            <TitleText>{convertDate(reservations[0].date)}</TitleText>
                            <SubText>{getDay(reservations[0].date)}</SubText>
                        </InfoItem>
                        <InfoItem>
                            <SubText>{`${10 + Math.floor(reservations[0].slot / 2)}:${String(reservations[0].slot % 2 === 0 ? 0 : 30).padStart(2, '0')}`}</SubText>
                            <SubText>·</SubText>
                            <SubText>{reservations[0].meetingType === 'ONLINE' ? '비대면' : '대면'}</SubText>
                        </InfoItem>
                    </InfoBox>
                    {/* 박스 3: 상담 방식이 비대면이면 구글미트 링크 */}
                    {reservations[0].meetingType === 'ONLINE' && (
                        <InfoBox>
                            <InfoItem>
                                <TitleText>비대면 링크</TitleText>
                                <SubText>구글 미트</SubText>
                            </InfoItem>
                            {reservations[0].googleMeetLink ? (
                                <GoogleMeetLink href={reservations[0].googleMeetLink} target="_blank" rel="noopener noreferrer">
                                    <GoogleLoginIcon width={'2.4rem'} height={'2.4rem'} fill={'none'} />
                                    <GoogleMeetText>비대면 링크 접속하기</GoogleMeetText>
                                </GoogleMeetLink>
                            ) : (
                                <GoogleOAuthProvider clientId={googleClientId}>
                                    <MakeMeet id={reservations[0].id} onClose={() => setRefetch(!refetch)} pg_token={''} />
                                </GoogleOAuthProvider>
                            )}
                        </InfoBox>
                    )}
                    <InfoBox>
                        <GoogleOAuthProvider clientId={googleClientId}>
                            <CancelReservation id={reservations[0].id} onClose={() => setRefetch(!refetch)} />
                        </GoogleOAuthProvider>
                    </InfoBox>
                </InfoBoxesContainer>
            </FormContainer>
        </PaymentContainer>
    )
}

function Reservation() {
    const { getUser } = userStore()
    const user = getUser()

    if (!user.name) {
        return <NeedLogin />
    }

    return <ReservationComponent />
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
    margin-bottom: 10rem;
`

const Image = styled.img`
    width: 100%;
    height: 20rem;
    object-fit: cover;
    object-position: top;
`

const ImageSkeleton = styled.div`
    width: 100%;
    background-color: #e6e6e6;
    height: 20rem;

    animation: pulse 1.5s infinite ease-in-out;
    @keyframes pulse {
        0% {
            opacity: 1;
        }
        25% {
            opacity: 0.8;
        }
        50% {
            opacity: 0.6;
        }
        75% {
            opacity: 0.8;
        }
        100% {
            opacity: 1;
        }
    }
`

const CountdownText = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: #ffffff;
    background-color: #35376e;
    padding: 0 1rem;
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`

const InfoBoxesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    width: 100%;
    margin-top: 2rem;
    justify-content: center;
    align-items: center;
`

const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    border: 0.1rem solid rgba(217, 217, 217, 0.6);
    border-radius: 1.2rem;
    padding: 2rem 1.6rem;
    background-color: #ffffff;
    font-size: 1.6rem;
    width: 85%;
    gap: 1.6rem;
`

const InfoBoxSkeleton = styled.div`
    display: flex;
    flex-direction: column;
    border: 0.1rem solid rgba(217, 217, 217, 0.6);
    border-radius: 1.2rem;
    padding: 2rem 1.6rem;
    background-color: #ffffff;
    font-size: 1.6rem;
    width: 85%;
    gap: 1.6rem;
    height: 7rem;
`

const InfoItem = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
    align-items: baseline;
`

const TitleText = styled.div`
    font-size: 2.4rem;
    font-weight: 700;
`

const SubText = styled.div`
    font-size: 1.4rem;
    color: rgba(41, 41, 41, 0.6);
    margin-right: 0.2rem;
`

const GoogleMeetLink = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem 1.2rem;
    background-color: rgba(55, 55, 110, 1);
    border: 0.1rem solid rgba(41, 41, 89, 1);
    color: #ffffff;
    text-decoration: none;
    font-weight: 700;
    border-radius: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
`

const GoogleMeetText = styled.div`
    font-size: 1.4rem;
    border-left: 1px solid #fff;
    text-decoration: underline;
    padding: 0 1rem;
`
const NoReservationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 5rem;
`

const NoReservationText = styled.div`
    font-size: 2rem;
    color: rgba(55, 55, 110, 1);
    font-weight: bold;
`
