import styled from 'styled-components'
import PaymentCaution from '../../components/paymentCaution.tsx'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { IPaymentContext } from '../../types/paymentContext.ts'

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

function PaymentCancel() {
    const { backStatus, closeModal } = useOutletContext<IPaymentContext>()
    const navigate = useNavigate()
    return (
        <Layout>
            <PaymentCaution
                size={'2.4rem'}
                status={false}
                text={'결제를 취소했어요'}
                onClick={() => {
                    if (backStatus === 2) {
                        closeModal()
                    }
                    navigate(-backStatus)
                }}
            />
        </Layout>
    )
}

export default PaymentCancel
