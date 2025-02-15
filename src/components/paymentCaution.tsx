import styled from 'styled-components'
import { CrossIcon, FailureIcon, SuccessIcon } from './icon'

interface Props {
    status: boolean
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

const BackButtonContainer = styled.div`
    display: flex;
    justify-content: end;
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
    return (
        <Modal>
            <BackButtonContainer onClick={onClick}>
                <CrossIcon width={'2rem'} height={'2rem'} fill={'#292929'} />
            </BackButtonContainer>
            <ContentContainer>
                <StatusImage>
                    {status ? (
                        <SuccessIcon width={'8.3rem'} height={'8.3rem'} fill={''} />
                    ) : (
                        <FailureIcon width={'8.3rem'} height={'8.3rem'} fill={''} />
                    )}
                </StatusImage>
                <Text size={size}>{text}</Text>
            </ContentContainer>
        </Modal>
    )
}

export default PaymentCaution
