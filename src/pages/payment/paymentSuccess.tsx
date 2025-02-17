import styled from 'styled-components'
import PaymentCaution from '../../components/payment/paymentCaution.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { VITE_SERVER_URL } from '../../config'
import { paymentStore } from '../../store/payment.ts'
import { userStore } from '../../store/user.ts'
import { useEffect } from 'react'

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

function PaymentSuccess() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { getReservationId, getReservationType, setPgToken } = paymentStore()
    const { getToken } = userStore()

    const token = getToken()
    const pg_token = searchParams.get('pg_token')
    const reservationId = getReservationId()
    const reservationType = getReservationType()
    useEffect(() => {
        setPgToken(pg_token || '')
    }, [pg_token, setPgToken])

    const onClick = () => {
        if (pg_token && reservationType === 'OFFLINE') {
            fetch(`${VITE_SERVER_URL}/api/v1/payment/kakao-pay/confirm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    reservationId: reservationId,
                    pgToken: pg_token,
                }),
            }).then(() => {
                navigate('/user')
            })
        } else {
            navigate('/user')
        }
    }

    return (
        <Layout>
            <PaymentCaution
                size={'2.4rem'}
                status={true}
                text={pg_token && reservationType === 'OFFLINE' ? '결제에 성공했어요' : '비대면 절차를 완료하면 결제가 완료돼요'}
                onClick={() => {
                    onClick()
                }}
            />
        </Layout>
    )
}

export default PaymentSuccess
