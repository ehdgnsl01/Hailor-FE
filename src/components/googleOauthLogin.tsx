import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { useSuspenseQuery } from '@tanstack/react-query'

import { googleClientId, VITE_SEVER_URL } from '../config'
import { getRegisterTerm } from '../api/users.ts'
import { userStore } from '../store/user.ts'

const Modal = styled.div`
    position: absolute;
    top: 5rem;
    left: 0;
    min-height: calc(var(--vh, 1vh) * 100 - 5rem - 7.3rem);
    width: 100%;
    padding: 0 0 calc(env(safe-area-inset-bottom, 0.8rem) + 7.3rem) 0;
    background-color: #f5f5f5;
    overflow-y: scroll;
`

const ContextBox = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border: 0.1rem solid rgba(217, 217, 217, 0.6);
    border-radius: 1.2rem;
    padding: 1.6rem;
    margin: 1.6rem 1.6rem 0 1.6rem;
    gap: 1rem;
`

const Button = styled.div`
    background-color: #35376e;
    color: #ffffff;
    border: 0.1rem solid #292929;
    border-radius: 50rem;
    font-size: 1.6rem;
    font-weight: bold;
    padding: 1.2rem 2.4rem;
    margin: 1.6rem 16rem;
`

const CheckBoxContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.4rem;
    padding-top: 1rem;
`

const Content = styled.iframe`
    font-size: 1.6rem;
    text-align: left;
    color: #000000;
    border: none;
`

const Title = styled.span`
    font-size: 2.4rem;
    font-weight: bold;
    text-align: left;
    color: #292929;
`

const InfoText = styled.span`
    font-size: 1.4rem;
    text-align: left;
    color: rgba(41, 41, 41, 0.6);
`

const CheckBox = styled.div<{ selected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 0.2rem ${props => (props.selected ? '#62A87C' : '#292929')} inset;
    border-radius: 0.6rem;
    width: 2rem;
    height: 2rem;
    color: ${props => (props.selected ? '#62A87C' : '#FFFFFF')} !important;
`

const CheckLabel = styled.label`
    font-size: 1.4rem;
    text-align: left;
`

function Register({ onClick, credential }: { onClick: () => void; credential: string }) {
    const [checks, setCheck] = useState<number>(0)
    const { setToken } = userStore()
    const { data } = useSuspenseQuery({
        queryKey: ['registerTerm'],
        queryFn: () => getRegisterTerm(),
    })

    const minRule = useMemo(() => {
        let result = 0
        data.terms.map(t => (result |= t.isRequired ? 1 << t.id : 0))
        return result
    }, [data])

    const checkClick = (target: number) => {
        const bit = 1 << target
        if ((checks & bit) === bit) {
            setCheck(checks ^ bit)
        } else {
            setCheck(checks | bit)
        }
    }

    return (
        <Modal>
            <ContextBox>
                <Title>안녕하세요, 사용자님!</Title>
                <InfoText>Hailor에 오신 걸 환영해요!</InfoText>
            </ContextBox>
            {data.terms.map(term => (
                <ContextBox key={term.id}>
                    <Title>{term.title}</Title>
                    <Content src={term.contentUrl} />
                </ContextBox>
            ))}
            <ContextBox>
                {data.terms.map(term => (
                    <CheckBoxContainer onClick={() => checkClick(term.id)}>
                        <CheckBox id={`${term.id}`} selected={(checks & (1 << term.id)) === 1 << term.id}>
                            ✔
                        </CheckBox>
                        <CheckLabel htmlFor={`${term.id}`}>[{term.title}] 위 약관에 모두 동의합니다.</CheckLabel>
                    </CheckBoxContainer>
                ))}
            </ContextBox>
            <Button
                onClick={() => {
                    if ((checks & minRule) === minRule) {
                        const agreedTerms = checks
                            .toString(2)
                            .split('')
                            .reverse()
                            .map((bit, index) => (bit === '1' ? index : -1))
                            .filter(index => index !== -1)
                        console.log(credential, agreedTerms)
                        fetch(`${VITE_SEVER_URL}/api/v1/auth/sign-up`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ token: credential, agreedTerms: agreedTerms }),
                        })
                            .then(response => response.json())
                            .then(() => {
                                fetch(`${VITE_SEVER_URL}/api/v1/auth/login`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ token: credential }),
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        setToken(data)
                                        onClick()
                                    })
                            })
                    }
                }}
            >
                시작하기
            </Button>
        </Modal>
    )
}

function GoogleOauthLogin() {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [credential, setCredential] = useState<string>('')
    const { setToken } = userStore()

    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <GoogleLogin
                theme={'outline'}
                onSuccess={credentialResponse => {
                    fetch(`${VITE_SEVER_URL}/api/v1/auth/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token: credentialResponse.credential }),
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.accessToken) {
                                setToken(data)
                            } else {
                                setShowModal(true)
                                setCredential(credentialResponse.credential as string)
                            }
                        })
                }}
                onError={() => {
                    console.log('Login Failed')
                }}
            />
            {showModal && <Register onClick={() => setShowModal(false)} credential={credential} />}
        </GoogleOAuthProvider>
    )
}

export default GoogleOauthLogin
