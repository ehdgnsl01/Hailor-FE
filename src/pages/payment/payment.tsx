import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useMutation } from '@tanstack/react-query'

import { ChevronLeftIcon, CrossIcon } from '../../components/icon'
import RadioButton from '../../components/buttons/radioButton.tsx'
import DateSelector from '../../components/filter/dateSelector.tsx'
import TimeSelector from '../../components/filter/timeSelector.tsx'
import DepositModal from '../../components/payment/depositModal.tsx'
import SelectButton from '../../components/buttons/selectButton.tsx'
import { postReservation } from '../../api/reservation.ts'
import PaymentModal from '../../components/payment/paymentModal.tsx'
import { userStore } from '../../store/user.ts'
import { VITE_SERVER_URL } from '../../config'
import { paymentStore } from '../../store/payment.ts'
import { ITime } from '../../types/time.ts'
import { IPostReservation, IReservationFull } from '../../types/reservation.ts'
import { designerStore } from '../../store/designer.ts'

const PaymentContainer = styled.div`
    position: fixed;
    top: 5rem;
    left: 0;
    background-color: #ffffff;
    width: 100%;
    height: calc(var(--vh, 1vh) * 100 - 5rem);
    z-index: 20;
    overflow-y: scroll;
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

function Payment() {
    const { designer, date, face } = designerStore()
    const navigate = useNavigate()
    const { getToken } = userStore()
    const { setReservationId, setReservationType, setPaymentType } = paymentStore()
    const token = getToken()
    const initialFace = face === '대면·비대면' ? '' : face

    const [step, setStep] = useState<number>(0)
    const [selectedType, setType] = useState<string>(initialFace)
    const [selectedDate, setDate] = useState<Date>(date)
    const [timeSlot, setTime] = useState<number>(-1)
    const [showDeposit, setShowDeposit] = useState<boolean>(false)
    const [showPayment, setShowPayment] = useState<boolean>(false)

    const mutate = useMutation({
        mutationFn: (body: IPostReservation) => {
            return postReservation(body)
        },
        onSuccess: async () => {
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
                    console.log(res)
                    setReservationId(res.reservations[0].id)
                    setReservationType(res.reservations[0].meetingType)
                    setPaymentType(res.reservations[0].paymentMethod)
                    if (res.reservations[0].paymentMethod === 'KAKAO_PAY') {
                        setShowPayment(true)
                    }
                })
        },
        retry: 0,
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        // 현재 body의 overflow 값을 저장합니다.
        const originalOverflow = document.body.style.overflow
        // Payment가 나타나면 스크롤을 비활성화합니다.
        document.body.style.overflow = 'hidden'
        return () => {
            // Payment가 사라지면 원래 상태로 복원합니다.
            document.body.style.overflow = originalOverflow
        }
    }, [])

    useEffect(() => {
        const contentLayout = document.getElementById('content-layout')
        if (contentLayout) {
            if (showDeposit) {
                contentLayout.style.overflow = 'scroll'
            } else {
                contentLayout.style.overflow = 'hidden'
            }
        }
    }, [showDeposit])

    // Payment 컴포넌트 내부에서 초기 선택 값에 따라 step을 자동 업데이트하도록 useEffect 추가
    useEffect(() => {
        if (selectedType == '') {
            setStep(0)
        } else if (selectedDate) {
            // 이미 날짜가 있다면 최소 step 2로 설정
            setStep(prev => Math.max(prev, 2))
        } else if (timeSlot !== -1) {
            // 이미 시간 슬롯이 선택되어 있다면 최소 step 3로 설정
            setStep(prev => Math.max(prev, 3))
        } else {
            setStep(0)
        }
    }, [selectedType, selectedDate, timeSlot])

    const times: ITime[] = useMemo(() => {
        const result = []
        let current = 10 * 60,
            index = 0

        while (current < 20 * 60) {
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

    if (designer.name === '') {
        return <></>
    }

    const back = () => navigate(-1)
    return (
        <>
            <PaymentContainer>
                <TitleContainer>
                    <BackButton onClick={back}>
                        <ChevronLeftIcon width={'1.2rem'} height={'2rem'} fill={'#292929'} />
                    </BackButton>
                    <Title>{designer.name}</Title>
                    <CrossButton onClick={back}>
                        <CrossIcon width={'1.8rem'} height={'1.8rem'} fill={'#292929'} />
                    </CrossButton>
                </TitleContainer>
                <Image src={designer.profileImageURL} />
                <SubtitleContainer>
                    <Title>예약하기</Title>
                </SubtitleContainer>
                <FormContainer>
                    <RadioButton
                        data={designer.meetingType.split('/')}
                        selected={selectedType}
                        onClick={(t: string) => {
                            setDate(date)
                            setType(t)
                            setStep(1)
                            setDate(new Date())
                        }}
                    />
                    {step > 0 && (
                        <DateSelector
                            date={selectedDate}
                            hasInformation={true}
                            setDate={(t: Date) => {
                                setTime(-1)
                                setStep(2)
                                setDate(t)
                            }}
                        />
                    )}
                    {step > 1 && (
                        <TimeSelector
                            id={designer.id}
                            date={`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`}
                            times={times}
                            selected={timeSlot}
                            setTime={(t: number) => {
                                setTime(t)
                                setStep(3)
                            }}
                        />
                    )}
                    {step > 2 && (
                        <PriceContainer>
                            <Prices>
                                총 {selectedType === '대면' ? designer.onlinePrice.toLocaleString() : designer.offlinePrice.toLocaleString()}원
                            </Prices>
                        </PriceContainer>
                    )}
                    {step > 2 && (
                        <SelectButton
                            text1={'계좌이체 결제'}
                            text2={'카카오페이 결제'}
                            onClick1={() => setShowDeposit(true)}
                            onClick2={() => {
                                const data: IPostReservation = {
                                    secret: {
                                        token: token,
                                    },
                                    body: {
                                        designerId: designer.id,
                                        reservationDate: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`,
                                        slot: timeSlot,
                                        meetingType: selectedType === '대면' ? 'OFFLINE' : 'ONLINE',
                                        paymentMethod: 'KAKAO_PAY',
                                    },
                                }
                                mutate.mutate(data)
                            }}
                        />
                    )}
                </FormContainer>
            </PaymentContainer>
            {showDeposit && (
                <DepositModal
                    price={23000}
                    onClose={() => {
                        setShowDeposit(false)
                        navigate('/user')
                    }}
                    onSuccess={() => {
                        const data: IPostReservation = {
                            secret: {
                                token: token,
                            },
                            body: {
                                designerId: designer.id,
                                reservationDate: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`,
                                slot: timeSlot,
                                meetingType: selectedType === '대면' ? 'OFFLINE' : 'ONLINE',
                                paymentMethod: 'BANK_TRANSFER',
                            },
                        }
                        mutate.mutate(data)
                    }}
                />
            )}
            {showPayment && <PaymentModal />}
        </>
    )
}

export default Payment
