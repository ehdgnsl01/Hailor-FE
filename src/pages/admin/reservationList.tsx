import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getReservations, postReservationConfirm, postReservationRefund } from '../../api/admin.ts'
import { userStore } from '../../store/user.ts'
import { IAdminReservation, IPostAdminReservationConfirm, IPostAdminReservationRefund } from '../../types/reservation.ts'

const Container = styled.div`
    padding: 2rem;
`

const ListContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
    overflow-y: scroll;
    padding: 1.5rem 0;
    gap: 1rem;
`
/*
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`

const Button = styled.div<{ none: boolean }>`
    background-color: ${props => (props.none ? '#D9D9D9' : 'rgba(53, 55, 110, 1)')};
    border: 0.1rem solid ${props => (props.none ? 'rgba(217, 217, 217, 0.6)' : 'rgba(41, 41, 89, 1)')};
    border-radius: 1.2rem;
    padding: 1.2rem 1.2rem;
    color: ${props => (props.none ? 'rgba(53, 55, 110, 1)' : '#ffffff')};
`
 */

const ContentBox = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding: 1rem;
    border: 0.1rem solid #e0e0e0;
    border-radius: 0.5rem;
    background-color: #fff;
    justify-content: space-between;
`

const ContentSkeleton = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding: 1rem;
    border: 0.1rem solid #e0e0e0;
    border-radius: 0.5rem;
    background-color: #fff;
    justify-content: space-between;
    height: 12rem;
    animation: pulse 1.5s infinite ease-in-out;

    @keyframes pulse {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.9;
        }
        100% {
            opacity: 1;
        }
    }
`

const TitleContentBox = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding: 1rem;
    color: #ffffff;
    border: 0.1rem solid #e0e0e0;
    border-radius: 0.5rem;
    background-color: rgba(53, 55, 110, 1);
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
`

const SubContentBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
`

const ContentText = styled.div`
    display: block;
    word-break: break-all;
    text-align: left;
    font-size: 1.3rem;
`

const TitleText = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`

const Status = styled.span`
    color: #d10000;
`

const ChangeStatusButton = styled.div`
    background-color: rgba(53, 55, 110, 1);
    border: 0.1rem solid rgba(41, 41, 89, 1);
    border-radius: 1.2rem;
    padding: 1rem 0;
    color: #ffffff;
    grid-column: span 3;
    font-size: 1.4rem;
`

const SubTitle = styled.span`
    font-weight: bold;
`

const MAX_SIZE = 500

function Reservations({ size, current, setEnd }: { size: number; current: number; setEnd: (e: number) => void }) {
    const [reservations, setReservations] = useState<IAdminReservation[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isRefetched, setRefetched] = useState<boolean>(false)
    const { getToken } = userStore()
    const token = getToken()
    const { data, refetch } = useQuery({
        queryKey: ['AdminReservation', size, current],
        queryFn: () => {
            setLoading(true)
            const data = getReservations(token, size, current)
            setTimeout(() => setLoading(false), 300)
            return data
        },
        enabled: !!token,
    })

    const refund = useMutation({
        mutationKey: ['reservationRefund', 'admin'],
        mutationFn: (request: IPostAdminReservationRefund) => postReservationRefund(request),
        onSuccess: async () => {
            await refetch()
            setRefetched(true)
        },
    })

    const confirm = useMutation({
        mutationKey: ['reservationConfirm', 'admin'],
        mutationFn: (request: IPostAdminReservationConfirm) => postReservationConfirm(request),
        onSuccess: async () => {
            await refetch()
            setRefetched(true)
        },
    })

    useEffect(() => {
        if (data) {
            if (isRefetched || reservations.length === 0) {
                setReservations(data.reservations)
                setRefetched(false)
            } else {
                let i = 0
                const result: IAdminReservation[] = []
                for (i = 0; i < data.reservations.length; i++) {
                    if (!reservations.some(before => before.id === data.reservations[i].id)) {
                        result.push(data.reservations[i])
                    }
                }
                if (result.length === 0) {
                    setEnd(current)
                } else {
                    setReservations(result)
                }
            }
        }
    }, [data, refetch])

    if (isLoading) {
        return (
            <ListContainer>
                <ContentSkeleton />
                <ContentSkeleton />
                <ContentSkeleton />
                <ContentSkeleton />
                <ContentSkeleton />
                <ContentSkeleton />
            </ListContainer>
        )
    }

    return (
        <ListContainer>
            {reservations.length > 0 &&
                reservations.map(
                    (res): React.ReactNode => (
                        <ContentBox>
                            <SubContentBox>
                                <ContentText>
                                    <SubTitle>예약 ID:</SubTitle> {res.id}
                                </ContentText>
                                <ContentText>
                                    <SubTitle>예약일:</SubTitle> {res.date}
                                </ContentText>
                                <ContentText>
                                    <SubTitle>예약시간:</SubTitle>{' '}
                                    {`${Math.floor(res.slot / 2) + 10}:${String(res.slot % 2 === 0 ? 0 : 30).padStart(2, '0')}`}
                                </ContentText>
                                <ContentText>
                                    <SubTitle>예약금:</SubTitle> {res.price}원
                                </ContentText>
                                <ContentText>
                                    <SubTitle>결제:</SubTitle> {`${res.paymentMethod === 'KAKAO_PAY' ? '카카오페이' : '계좌이체'}`}
                                </ContentText>
                                <ContentText>
                                    <SubTitle>타입:</SubTitle> {res.meetingType === 'ONLINE' ? '비대면' : '대면'}
                                </ContentText>
                                <ContentText>
                                    <SubTitle>상태:</SubTitle> <Status>{res.status}</Status>
                                </ContentText>
                            </SubContentBox>
                            <SubContentBox>
                                <ContentText>
                                    <SubTitle>ID:</SubTitle> {res.user.id}
                                </ContentText>
                                <ContentText>
                                    <SubTitle>이름:</SubTitle> {res.user.name}
                                </ContentText>
                                <ContentText>
                                    <SubTitle>email:</SubTitle> {res.user.email}
                                </ContentText>
                            </SubContentBox>
                            <SubContentBox>
                                <ContentText>
                                    <SubTitle>ID:</SubTitle> {res.designer.id}
                                </ContentText>
                                <ContentText>
                                    <SubTitle>이름:</SubTitle> {res.designer.name}
                                </ContentText>
                                <ContentText>
                                    <SubTitle>지역:</SubTitle> {res.designer.region}
                                </ContentText>
                                <ContentText>
                                    <SubTitle>주소:</SubTitle> {res.designer.shopAddress}
                                </ContentText>
                            </SubContentBox>
                            {res.status === 'NEED_REFUND' && (
                                <ChangeStatusButton
                                    onClick={() => {
                                        const request: IPostAdminReservationRefund = {
                                            uri: {
                                                id: res.id,
                                            },
                                            secret: {
                                                token: token,
                                            },
                                        }
                                        refund.mutate(request)
                                    }}
                                >
                                    환불하기
                                </ChangeStatusButton>
                            )}
                            {res.status === 'RESERVED' && res.paymentMethod === 'BANK_TRANSFER' && (
                                <ChangeStatusButton
                                    onClick={() => {
                                        const request: IPostAdminReservationConfirm = {
                                            uri: {
                                                id: res.id,
                                            },
                                            secret: {
                                                token: token,
                                            },
                                        }
                                        confirm.mutate(request)
                                    }}
                                >
                                    입금 확인하기
                                </ChangeStatusButton>
                            )}
                        </ContentBox>
                    ),
                )}
        </ListContainer>
    )
}

const ReservationList: React.FC = () => {
    //const [current, setCurrent] = useState<number>(MAX_SIZE + 1)
    //const [end, setEnd] = useState<number | null >(null)

    return (
        <Container>
            {/*<ButtonContainer>
                <Button
                    none={current === MAX_SIZE + 1}
                    onClick={() => {
                        if (current > MAX_SIZE) {
                            setCurrent(current - MAX_SIZE)
                        }
                    }}
                >
                    이전 페이지
                </Button>
                <Button
                    none={end !== null ? current > end : false}
                    onClick={() => {
                        if (end === null || current < end) {
                            setCurrent(current + MAX_SIZE)
                        }
                    }}
                >
                    다음 페이지
                </Button>
            </ButtonContainer>*/}
            <TitleContentBox>
                <TitleText>예약 정보</TitleText>
                <TitleText>예약자 정보</TitleText>
                <TitleText>디자이너 정보</TitleText>
            </TitleContentBox>
            <Reservations size={MAX_SIZE} current={MAX_SIZE + 1} setEnd={(e: number) => console.log(e)} />
            {/*<ButtonContainer>
                <Button
                    none={current === MAX_SIZE + 1}
                    onClick={() => {
                        if (current > MAX_SIZE) {
                            setCurrent(current - MAX_SIZE)
                        }
                    }}
                >
                    이전 페이지
                </Button>
                <Button
                    none={end !== null ? current > end : false}
                    onClick={() => {
                        if (end === null || current < end) {
                            setCurrent(current + MAX_SIZE)
                        }
                    }}
                >
                    다음 페이지
                </Button>
            </ButtonContainer>*/}
        </Container>
    )
}

export default ReservationList
