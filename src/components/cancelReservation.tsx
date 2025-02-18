import { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import styled from 'styled-components'

import { userStore } from '../store/user.ts'
import { VITE_SERVER_URL } from '../config'
import { CrossIcon } from './icon'
import SelectButton from './buttons/selectButton.tsx'

const GoogleMeetButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem 1.2rem;
    background-color: #ff4d4d;
    color: #ffffff;
    text-decoration: none;
    font-weight: bold;
    border-radius: 1rem;
    cursor: pointer;
`

const GoogleMeetText = styled.span`
    font-size: 1.6rem;
    padding: 0 1rem;
`

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

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    margin-top: 3rem;
`

const ModalContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.4rem;
`

const Label = styled.label`
    font-size: 1.6rem;
    font-weight: bold;
`

const InfoText = styled.span`
    font-size: 1.4rem;
    color: rgba(41, 41, 41, 0.6);
`

const BackButtonContainer = styled.div`
    display: flex;
    justify-content: end;
`

function CancelReservation({ id, onClose, type }: { id: number; onClose: () => void; type: string }) {
    const { getToken } = userStore()
    const [showModal, setShowModal] = useState<boolean>(false)
    const token = getToken()
    const googleLogin = useGoogleLogin({
        scope: 'https://www.googleapis.com/auth/calendar.app.created https://www.googleapis.com/auth/calendar.calendarlist.readonly',
        onSuccess: codeResponse => {
            console.log(codeResponse)
            fetch(`${VITE_SERVER_URL}/api/v1/reservation/{id}?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    googleAccessToken: codeResponse.access_token,
                }),
            }).then(() => onClose())
        },
        onError: errorResponse => {
            console.log(errorResponse)
        },
    })

    const onClick = () => {
        if (type === 'ONLINE') {
            googleLogin()
        } else {
            fetch(`${VITE_SERVER_URL}/api/v1/reservation/{id}?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    googleAccessToken: 'string',
                }),
            }).then(() => onClose())
        }
    }

    return (
        <div>
            <GoogleMeetButton onClick={() => setShowModal(true)}>
                <GoogleMeetText>예약 취소하기</GoogleMeetText>
            </GoogleMeetButton>
            {showModal && (
                <ModalLayout>
                    <Modal>
                        <BackButtonContainer onClick={() => setShowModal(false)}>
                            <CrossIcon width={'2rem'} height={'2rem'} fill={'#292929'} />
                        </BackButtonContainer>
                        <ModalContentContainer>
                            <ButtonContainer>
                                <Label>정말 결제를 취소하시겠습니까?</Label>
                                <InfoText>지금까지 저장된 모든 예약 정보가 삭제됩니다</InfoText>
                                <SelectButton
                                    text1={'아니오'}
                                    text2={'예'}
                                    onClick1={() => setShowModal(false)}
                                    onClick2={() => {
                                        setShowModal(false)
                                        onClick()
                                    }}
                                />
                            </ButtonContainer>
                        </ModalContentContainer>
                    </Modal>
                </ModalLayout>
            )}
        </div>
    )
}

export default CancelReservation
