import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon, CrossIcon } from './icon'
import SelectButton from './selectButton.tsx'
import PaymentCaution from './paymentCaution.tsx'
import { useState } from 'react'

interface Props {
    price: number
    onClose: () => void
}

const ModalLayout = styled.div`
    position: absolute;
    top: 0;
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

const Modal = styled.div`
    background-color: #fafcfe;
    padding: 2.4rem 3.2rem;
    border-radius: 1.6rem;
    min-width: 50%;
    max-width: 80%;
`

const ModalContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.4rem;
`

const Layout = styled.div`
    position: absolute;
    top: 5rem;
    left: 0;
    background-color: #ffffff;
    width: 100%;
    height: calc(var(--vh, 1vh) * 100 - 5rem);
    z-index: 20;
    overflow-y: scroll;
`

const BackButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
`

const TitleContainer = styled.div`
    position: sticky;
    top: 0;
    background-color: #ffffff;
    border: 0.1rem solid rgba(217, 217, 217, 0.6);
    display: grid;
    grid-template-columns: 2.4rem 1fr 3.2rem;
    align-items: center;
    justify-items: center;
    padding: 1.6rem;
    z-index: 20;
`

const ContentContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    gap: 2.4rem 0;
    padding: 2.4rem 1.6rem;
    margin-top: 2.4rem;
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

const Rows = styled.div<{ last: boolean }>`
    display: grid;
    grid-template-columns: auto 1fr;
    border-bottom: ${props => (props.last ? '0' : '0.2rem')} solid rgba(217, 217, 217, 0.6);
    gap: 0 1.2rem;
    padding-bottom: ${props => (props.last ? '0' : '2.4rem')};
`

const Title = styled.span`
    font-size: 2.4rem;
    font-weight: bold;
    text-align: center;
    width: 100%;
    padding-left: 1rem;
`

const Label = styled.label`
    font-size: 1.6rem;
    font-weight: bold;
`

const Text = styled.span`
    font-size: 1.6rem;
    text-align: left;
`

const InfoText = styled.span`
    font-size: 1.4rem;
    color: rgba(41, 41, 41, 0.6);
`

function DepositModal({ price, onClose }: Props) {
    const [showSuccess, setShowSuccess] = useState<boolean>(false)
    const [showCancel, setShowCancel] = useState<boolean>(false)
    const navigate = useNavigate()

    return (
        <Layout>
            <TitleContainer>
                <BackButton onClick={() => setShowCancel(true)}>
                    <ChevronLeftIcon width={'1.2rem'} height={'2rem'} fill={'#292929'} />
                </BackButton>
                <Title>실시간 계좌이체</Title>
            </TitleContainer>
            <ContentContainer>
                <Rows last={false}>
                    <Label>예금주명</Label>
                    <Text>김민디</Text>
                </Rows>
                <Rows last={false}>
                    <Label>금융기관</Label>
                    <Text>농협</Text>
                </Rows>
                <Rows last={false}>
                    <Label>계좌번호</Label>
                    <Text>1234-5678-9010</Text>
                </Rows>
                <Rows last={true}>
                    <Label>송금금액</Label>
                    <Text>{price}원</Text>
                </Rows>
            </ContentContainer>
            <ButtonContainer>
                <SelectButton text1={'취소'} text2={'완료'} onClick1={() => setShowCancel(true)} onClick2={() => setShowSuccess(true)} />
            </ButtonContainer>
            {showSuccess && (
                <ModalLayout>
                    <PaymentCaution
                        size={'1.6rem'}
                        status={true}
                        text={'디자이너님이 확인하시면 예약이 완료되요'}
                        onClick={() => {
                            setShowSuccess(false)
                            onClose()
                            navigate('/user/search')
                        }}
                    />
                </ModalLayout>
            )}
            {showCancel && (
                <ModalLayout>
                    <Modal>
                        <BackButtonContainer onClick={() => setShowCancel(false)}>
                            <CrossIcon width={'2rem'} height={'2rem'} fill={'#292929'} />
                        </BackButtonContainer>
                        <ModalContentContainer>
                            <ButtonContainer>
                                <Label>정말 결제를 취소하시겠습니까?</Label>
                                <InfoText>지금까지 저장된 모든 예약 정보가 삭제됩니다</InfoText>
                                <SelectButton
                                    text1={'아니오'}
                                    text2={'예'}
                                    onClick1={() => setShowCancel(false)}
                                    onClick2={() => {
                                        setShowCancel(false)
                                        onClose()
                                    }}
                                />
                            </ButtonContainer>
                        </ModalContentContainer>
                    </Modal>
                </ModalLayout>
            )}
        </Layout>
    )
}

export default DepositModal
