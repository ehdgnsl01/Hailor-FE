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

function PaymentFailure() {
    const navigate = useNavigate()
    const { backStatus, closeModal } = useOutletContext<IPaymentContext>()
    return (
        <Layout>
            <PaymentCaution
                size={'2.4rem'}
                status={false}
                text={'결제에 실패했어요'}
                onClick={() => {
                    if (backStatus === 2) {
                        closeModal()
                    }
                    navigate(-1)
                }}
            />
        </Layout>
    )
}

export default PaymentFailure
