import styled from 'styled-components'
import { useEffect } from 'react'
import { PropagateLoader } from 'react-spinners'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { googleClientId } from '../../config'
import { FailureIcon, SuccessIcon } from '../icon'
import { paymentStore } from '../../store/payment.ts'
import MakeMeet from '../makeMeet.tsx'

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
