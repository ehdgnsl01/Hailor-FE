import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { InfiniteData, QueryObserverResult, RefetchOptions, useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { getReservations, postReservationConfirm, postReservationRefund } from '../../api/admin.ts'
import { userStore } from '../../store/user.ts'
import { IGetAdminReservations, IPostAdminReservationConfirm, IPostAdminReservationRefund } from '../../types/reservation.ts'
import { CrossIcon } from '../../components/icon'
import SelectButton from '../../components/buttons/selectButton.tsx'

const Container = styled.div`
    padding: 2rem;
`

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
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

const MAX_SIZE = 10
type StatusType = 'RESERVED' | 'CONFIRMED' | 'FINISHED' | 'CANCELED' | 'NEED_REFUND' | 'REFUNDED'
const mapStatus: Record<StatusType, string> = {
    RESERVED: '예약(미결제)',
    CONFIRMED: '결제 완료',
    FINISHED: '종료',
    CANCELED: '취소',
    NEED_REFUND: '환불 요청',
    REFUNDED: '환불 완료',
}

const ModalLayout = styled.div<{ top: string; left: string }>`
    position: absolute;
    top: ${props => props.top};
    left: ${props => props.left};
    background: rgba(41, 41, 41, 0.8);
    width: 100%;
    height: calc(var(--vh, 1vh) * 100);
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
    z-index: 500;
`

const Modal = styled.div`
    background-color: #fafcfe;
    padding: 2.4rem 3.2rem 0 3.2rem;
    border-radius: 1.6rem;
    min-width: 50%;
    max-width: 70%;
`

const ModalContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.4rem;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    margin-top: 3rem;
`

const BackButtonContainer = styled.div`
    display: flex;
    justify-content: end;
`

const Label = styled.label`
    font-size: 1.6rem;
    font-weight: bold;
`

function RefundModal({
    refetch,
    closeModal,
    id,
    isOpen,
}: {
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<InfiniteData<IGetAdminReservations>, Error>>
    closeModal: () => void
    id: number
    isOpen: boolean
}) {
    const [position, setPosition] = useState('0')
    const { getToken } = userStore()
    const token = getToken()
    const refund = useMutation({
        mutationKey: ['reservationRefund', 'admin'],
        mutationFn: (request: IPostAdminReservationRefund) => postReservationRefund(request),
        onSuccess: async () => {
            await refetch()
        },
    })

    useEffect(() => {
        if (isOpen) {
            setPosition(`${window.scrollY}px`)
            const originalOverflow = document.body.style.overflow
            document.body.style.overflow = 'hidden'
            return () => {
                document.body.style.overflow = originalOverflow
            }
        }
    }, [isOpen])

    return (
        <ModalLayout top={position} left={'0'}>
            <Modal>
                <BackButtonContainer onClick={closeModal}>
                    <CrossIcon width={'2rem'} height={'2rem'} fill={'#292929'} />
                </BackButtonContainer>
                <ModalContentContainer>
                    <ButtonContainer>
                        <Label>환불 승인하기</Label>
                        <SelectButton
                            text1={'아니오'}
                            text2={'예'}
                            onClick1={closeModal}
                            onClick2={() => {
                                const request: IPostAdminReservationRefund = {
                                    uri: {
                                        id: id,
                                    },
                                    secret: {
                                        token: token,
                                    },
                                }
                                refund.mutate(request)
                                closeModal()
                            }}
                        />
                    </ButtonContainer>
                </ModalContentContainer>
            </Modal>
        </ModalLayout>
    )
}

function Reservations() {
    const { getToken } = userStore()
    const token = getToken()
    const { ref, inView } = useInView()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [refundId, setRefundId] = useState<number>(-1)

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isLoading } = useInfiniteQuery<IGetAdminReservations, Error>({
        queryKey: ['AdminReservations', token],
        queryFn: ({ pageParam }) => getReservations(token, MAX_SIZE, pageParam as number),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.reservations.length < MAX_SIZE) {
                return undefined
            }

            const lastId = lastPage.reservations[lastPage.reservations.length - 1]?.id
            const prevLastId = allPages.length > 1 ? allPages[allPages.length - 2].reservations.at(-1)?.id : null

            if (lastId === prevLastId) {
                return undefined
            }

            return lastId
        },
        enabled: !!token,
        staleTime: 0,
        gcTime: 0,
    })

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])

    const confirm = useMutation({
        mutationKey: ['reservationConfirm', 'admin'],
        mutationFn: (request: IPostAdminReservationConfirm) => postReservationConfirm(request),
        onSuccess: async () => {
            await refetch()
        },
    })

    if (isLoading && !data) {
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
            {showModal && <RefundModal refetch={refetch} closeModal={() => setShowModal(false)} id={refundId} isOpen={showModal} />}
            {data &&
                data.pages.map((page, pageIndex) =>
                    page.reservations.map(
                        (res): React.ReactNode => (
                            <ContentBox key={`${pageIndex}-${res.id}`}>
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
                                        <SubTitle>예약금:</SubTitle> {res.price.toLocaleString()}원
                                    </ContentText>
                                    <ContentText>
                                        <SubTitle>결제:</SubTitle> {`${res.paymentMethod === 'KAKAO_PAY' ? '카카오페이' : '계좌이체'}`}
                                    </ContentText>
                                    <ContentText>
                                        <SubTitle>타입:</SubTitle> {res.meetingType === 'ONLINE' ? '비대면' : '대면'}
                                    </ContentText>
                                    <ContentText>
                                        <SubTitle>상태:</SubTitle> <Status>{mapStatus[res.status as StatusType]}</Status>
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
                                            setRefundId(res.id)
                                            setShowModal(true)
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
                    ),
                )}
            <div ref={ref} style={{ height: '1px', background: 'transparent' }}></div>
            {isFetchingNextPage && <ContentSkeleton />}
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
            <Reservations />
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
