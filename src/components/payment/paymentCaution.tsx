import styled from 'styled-components'
import { useEffect } from 'react'
import { PropagateLoader } from 'react-spinners'
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'

import { googleClientId, VITE_SEVER_URL } from '../../config'
import { FailureIcon, GoogleLoginIcon, SuccessIcon } from '../icon'
import { paymentStore } from '../../store/payment.ts'
import { userStore } from '../../store/user.ts'

interface Props {
    status: boolean | null
    text: string
    onClick: () => void
    size: string
}

const Modal = styled.div`
    background-color: #fafcfe;
    padding: 2.4rem 3.2rem;
    border-radius: 1.6rem;
    min-width: 50%;
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.4rem;
`

const StatusImage = styled.div`
    margin: 2rem;
`

const Text = styled.span<{ size: string }>`
    font-size: ${props => props.size};
    font-weight: 600;
    text-align: center;
    white-space: pre-line;
    width: 100%;
`

const GoogleMeetButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem 1.2rem;
    background-color: #35376e;
    color: #ffffff;
    text-decoration: none;
    font-weight: bold;
    border-radius: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #292959;
    }
`

const GoogleMeetText = styled.span`
    font-size: 1.6rem;
    border-left: 1px solid #fff;
    padding: 0 1rem;
`

function MakeMeet({ id, onClose, pg_token }: { id: number; onClose: () => void; pg_token: string }) {
    const { getToken } = userStore()
    const token = getToken()
    const onClick = useGoogleLogin({
        scope: 'https://www.googleapis.com/auth/calendar.app.created https://www.googleapis.com/auth/calendar.calendarlist.readonly',
        onSuccess: codeResponse => {
            console.log(codeResponse.access_token)
            fetch(`${VITE_SEVER_URL}/api/v1/payment/kakao-pay/confirm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    reservationId: id,
                    googleAccessToken: codeResponse.access_token,
                    pgToken: pg_token,
                }),
            })
                .then(response => response.json())
                .then(() => onClose())
        },
        onError: errorResponse => {
            console.log(errorResponse)
        },
    })

    return (
        <div>
            <GoogleMeetButton onClick={() => onClick()}>
                <GoogleLoginIcon width={'2.4rem'} height={'2.4rem'} fill={'none'} />
                <GoogleMeetText>구글 미팅 만들기</GoogleMeetText>
            </GoogleMeetButton>
        </div>
    )
}

function PaymentCaution({ status, text, onClick, size }: Props) {
    const { getReservationId, getReservationType, getPaymentType, pg_token } = paymentStore()
    const reservationId = getReservationId()
    const reservationType = getReservationType()
    const paymentType = getPaymentType()
    useEffect(() => {
        if (status != true || !(reservationType === 'OFFLINE' && paymentType === 'KAKAO_PAY')) {
            setTimeout(() => onClick(), 2000)
        }
    }, [status, reservationType, paymentType, onClick])

    return (
        <Modal>
            <ContentContainer>
                <StatusImage>
                    {status === true ? (
                        <SuccessIcon width={'8.3rem'} height={'8.3rem'} fill={''} />
                    ) : status === false ? (
                        <FailureIcon width={'8.3rem'} height={'8.3rem'} fill={''} />
                    ) : (
                        <PropagateLoader color={'#35376E'} loading={true} size={'2rem'} />
                    )}
                </StatusImage>
                <Text size={size}>{text}</Text>
                {status === true && reservationType === 'ONLINE' && paymentType === 'KAKAO_PAY' && (
                    <GoogleOAuthProvider clientId={googleClientId}>
                        <MakeMeet id={reservationId} onClose={onClick} pg_token={pg_token} />
                    </GoogleOAuthProvider>
                )}
            </ContentContainer>
        </Modal>
    )
}

export default PaymentCaution
