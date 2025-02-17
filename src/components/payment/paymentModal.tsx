import styled from 'styled-components'
import PaymentCaution from '../../components/payment/paymentCaution.tsx'
import { VITE_SERVER_URL } from '../../config'
import { userStore } from '../../store/user.ts'
import { paymentStore } from '../../store/payment.ts'
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

function PaymentModal() {
    const { reservationId } = paymentStore()
    const { getToken } = userStore()
    const token = getToken()

    useEffect(() => {
        fetch(`${VITE_SERVER_URL}/api/v1/payment/kakao-pay`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                reservationId: reservationId,
            }),
        })
            .then(response => response.json())
            .then(data => {
                const res = data as {
                    nextRedirectMobileUrl: string
                    nextRedirectPcUrl: string
                }

                const info = window.navigator.userAgent
                let isMobile = false
                if (info.indexOf('iPhone') > -1 || info.indexOf('Android') > -1 || info.indexOf('iPad') > -1 || info.indexOf('iPod') > -1) {
                    isMobile = true
                }
                const urlToOpen = isMobile ? res.nextRedirectMobileUrl : res.nextRedirectPcUrl
                window.location.replace(urlToOpen)
            })
    }, [token, reservationId])

    return (
        <Layout>
            <PaymentCaution size={'2.4rem'} status={null} text={'결제가 진행중이에요'} onClick={() => {}} />
        </Layout>
    )
}

export default PaymentModal
