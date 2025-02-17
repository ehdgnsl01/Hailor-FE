import { useGoogleLogin } from '@react-oauth/google'
import styled from 'styled-components'

import { userStore } from '../store/user.ts'
import { VITE_SERVER_URL } from '../config'
import { GoogleLoginIcon } from './icon'

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
            if (pg_token !== '') {
                fetch(`${VITE_SERVER_URL}/api/v1/payment/kakao-pay/confirm`, {
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
            } else {
                fetch(`${VITE_SERVER_URL}/api/v1/meet`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        reservationId: id,
                        googleAccessToken: codeResponse.access_token,
                    }),
                })
                    .then(response => response.json())
                    .then(() => onClose())
            }
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

export default MakeMeet
