import styled from 'styled-components'

import PaymentSuccess from './paymentSuccess.tsx'
import PaymentFailure from './paymentFailure.tsx'
import PaymentCancel from './paymentCancel.tsx'
import Header from '../../components/header.tsx'
import { ChevronLeftIcon, CrossIcon } from '../../components/icon'
import RadioButton from '../../components/buttons/radioButton.tsx'
import DateSelector from '../../components/filter/dateSelector.tsx'
import TimeSelector from '../../components/filter/timeSelector.tsx'
import SelectButton from '../../components/buttons/selectButton.tsx'
import { VITE_SERVER_URL } from '../../config'
import { userStore } from '../../store/user.ts'
import { useEffect, useMemo, useRef, useState } from 'react'
import { IReservationFull } from '../../types/reservation.ts'
import { Designer } from '../../types/designer.ts'
import { ITime } from '../../types/time.ts'
import PaymentCaution from '../../components/payment/paymentCaution.tsx'

const ContentLayout = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding-bottom: calc(env(safe-area-inset-bottom, 0.8rem) + 7.3rem);
`

const TitleContainer = styled.div`
    position: sticky;
    top: 0;
    background-color: #ffffff;
    display: grid;
    grid-template-columns: 2.4rem 1fr 3.2rem;
    align-items: center;
    justify-items: center;
    padding: 0 1.6rem;
    z-index: 20;
`

const Layout = styled.div`
    position: absolute;
    top: 5rem;
    left: 0;
    background: rgba(41, 41, 41, 0.8);
    width: 100%;
    height: calc(var(--vh, 1vh) * 100 - 5rem);
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
    z-index: 500;
`

const SubtitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-items: center;
    border-bottom: 0.1rem solid rgba(217, 217, 217, 0.6);
    padding: 0.8rem 1.6rem 0.8rem 0.6rem;
`

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    gap: 2rem;
    padding: 1.6rem 0;
`

const BackButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
`

const CrossButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    width: 100%;
`

const PriceContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: end;
`

const Title = styled.span`
    font-size: 2.4rem;
    font-weight: bold;
    text-align: left;
    width: 100%;
    padding-left: 1rem;
`

const Prices = styled.span`
    font-size: 1.6rem;
    font-weight: bold;
    text-align: right;
    color: #000000;
    margin-right: 1.6rem;
`

const Image = styled.img`
    width: 100%;
    height: 30rem;
    object-fit: cover;
    object-position: top;
`

const PaymentContainer = styled.div`
    position: absolute;
    top: 5rem;
    left: 0;
    background-color: #ffffff;
    width: 100%;
    height: calc(var(--vh, 1vh) * 100 - 5rem);
    z-index: 20;
    overflow-y: scroll;
`

function PgServer() {
    const resultType = window.location.pathname.split('/')[2]
    const endRef = useRef<HTMLDivElement | null>(null)
    const [reservation, setReservation] = useState<IReservationFull | null>(null)
    const { getToken } = userStore()
    const token = getToken()

    const times: ITime[] = useMemo(() => {
        const result = []
        let current = 10 * 60,
            index = 0

        while (current <= 20 * 60) {
            const hours = String(Math.floor(current / 60)).padStart(2, '0')
            const minutes = String(current % 60).padStart(2, '0')
            result.push({
                time: `${hours}:${minutes}`,
                booked: false,
                index: index,
            })
            current += 30
            index += 1
        }
        return result
    }, [])

    useEffect(() => {
        fetch(`${VITE_SERVER_URL}/api/v1/reservation?size=1`, {
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
                fetch(`${VITE_SERVER_URL}/api/v1/designer?size=1&name=${res.reservations[0].designer.name}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        const temp = data as {
                            designers: Designer[]
                        }
                        const saveData: IReservationFull = {
                            ...res.reservations[0],
                            designer: temp.designers[0],
                        }
                        setReservation(saveData)
                    })
            })
    }, [token])

    useEffect(() => {
        if (endRef.current) {
            endRef.current?.scrollTo({
                top: endRef.current?.scrollHeight,
                behavior: 'smooth',
            })
        }
    }, [reservation])

    if (reservation) {
        return (
            <div>
                <Header />
                <ContentLayout>
                    <PaymentContainer ref={endRef}>
                        <TitleContainer>
                            <BackButton onClick={() => {}}>
                                <ChevronLeftIcon width={'1.2rem'} height={'2rem'} fill={'#292929'} />
                            </BackButton>
                            <Title>{reservation.designer.name}</Title>
                            <CrossButton onClick={() => {}}>
                                <CrossIcon width={'1.8rem'} height={'1.8rem'} fill={'#292929'} />
                            </CrossButton>
                        </TitleContainer>
                        <Image src={reservation.designer.profileImageURL} />
                        <SubtitleContainer>
                            <Title>예약하기</Title>
                        </SubtitleContainer>
                        <FormContainer>
                            <RadioButton
                                data={reservation.designer.meetingType.split('/')}
                                selected={reservation.meetingType === 'OFFLINE' ? '대면' : '비대면'}
                                onClick={() => {}}
                            />
                            <DateSelector date={new Date(reservation.date)} hasInformation={true} setDate={() => {}} />
                            <TimeSelector
                                id={reservation.designer.id}
                                date={reservation.date}
                                times={times}
                                selected={reservation.slot}
                                setTime={() => {}}
                            />
                            <PriceContainer>
                                <Prices>총 {reservation.price.toLocaleString()}원</Prices>
                            </PriceContainer>
                            <SelectButton text1={'계좌이체 결제'} text2={'카카오페이 결제'} onClick1={() => {}} onClick2={() => {}} />
                        </FormContainer>
                    </PaymentContainer>
                </ContentLayout>
                {resultType === 'success' && <PaymentSuccess />}
                {resultType === 'failure' && <PaymentFailure />}
                {resultType === 'cancel' && <PaymentCancel />}
            </div>
        )
    }
    return (
        <Layout>
            <PaymentCaution size={'2.4rem'} status={null} text={'결제가 진행중이에요'} onClick={() => {}} />
        </Layout>
    )
}

export default PgServer
