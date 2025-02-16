import { useMemo, useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { ChevronLeftIcon, CrossIcon } from '../../components/icon'
import RadioButton from '../../components/radioButton.tsx'
import DateSelector from '../../components/dateSelector.tsx'
import TimeSelector from '../../components/timeSelector.tsx'
import { ITime } from '../../types/time.ts'
import DepositModal from '../../components/depositModal.tsx'
import SelectButton from '../../components/selectButton.tsx'

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
    height: 20rem;
    object-fit: cover;
`

const reservationType = ['대면', '비대면']

function Payment() {
    // TODO: add get Data and send data
    const today = new Date()
    const navigate = useNavigate()
    const [step, setStep] = useState<number>(0)
    const [selectedType, setReservationType] = useState<string>('')
    const [date, setDate] = useState<Date>(today)
    const [time, setTime] = useState<string>('')
    const [showDeposit, setShowDeposit] = useState<boolean>(false)
    const [payType, setPayType] = useState<number>(0)

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

    const times: ITime[] = useMemo(() => {
        const result = []
        let current = 10 * 60

        while (current <= 20 * 60) {
            const hours = String(Math.floor(current / 60)).padStart(2, '0')
            const minutes = String(current % 60).padStart(2, '0')
            result.push({
                time: `${hours}:${minutes}`,
                status: true,
            })
            current += 30
        }
        return result
    }, [])

    const back = () => navigate(-1)
    return (
        <>
            <PaymentContainer>
                <TitleContainer>
                    <BackButton onClick={back}>
                        <ChevronLeftIcon width={'1.2rem'} height={'2rem'} fill={'#292929'} />
                    </BackButton>
                    <Title>김민지</Title>
                    <CrossButton onClick={back}>
                        <CrossIcon width={'1.8rem'} height={'1.8rem'} fill={'#292929'} />
                    </CrossButton>
                </TitleContainer>
                <Image src={'https://placehold.co/600x600'} />
                <SubtitleContainer>
                    <Title>예약하기</Title>
                </SubtitleContainer>
                <FormContainer>
                    <RadioButton
                        data={reservationType}
                        selected={selectedType}
                        onClick={(t: string) => {
                            if (step === 0) {
                                setStep(1)
                            }
                            setReservationType(t)
                        }}
                    />
                    {step > 0 && (
                        <DateSelector
                            date={date}
                            hasInformation={true}
                            setDate={(t: Date) => {
                                if (step === 1) {
                                    setStep(2)
                                }
                                setDate(t)
                            }}
                        />
                    )}
                    {step > 1 && (
                        <TimeSelector
                            times={times}
                            selected={time}
                            setTime={(t: string) => {
                                if (step === 2) {
                                    setStep(3)
                                }
                                setTime(t)
                            }}
                        />
                    )}
                    {step > 2 && (
                        <PriceContainer>
                            <Prices>총 230,000</Prices>
                        </PriceContainer>
                    )}
                    {step > 2 && (
                        <SelectButton
                            text1={'계좌이체 결제'}
                            text2={'카카오페이 결제'}
                            onClick1={() => {
                                setPayType(2)
                                setShowDeposit(true)
                            }}
                            onClick2={() => {
                                setPayType(1)
                                navigate('success')
                            }}
                        />
                    )}
                </FormContainer>
            </PaymentContainer>
            <Outlet
                context={{
                    backStatus: payType,
                    closeModal: () => setShowDeposit(false),
                }}
            />
            {showDeposit && <DepositModal price={23000} onClose={() => navigate('cancel')} />}
        </>
    )
}

export default Payment
