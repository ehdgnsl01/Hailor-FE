import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { DangerIcon } from './icon'

const NeedLogin: React.FC = () => {
    const navigate = useNavigate()

    return (
        <ContentLayout>
            <IconWrapper>
                <DangerIcon width="10rem" height="10rem" fill="transparent" />
            </IconWrapper>
            <Title>로그인이 필요합니다</Title>
            <Description>
                해당 서비스는 로그인 이후에 사용할 수 있는 기능입니다.
                <br />
                서비스를 이용하기 전에 로그인을 해주세요.
            </Description>
            <ButtonContainer>
                <HomeButton onClick={() => navigate('/user/mypage')}>로그인 하러가기</HomeButton>
            </ButtonContainer>
        </ContentLayout>
    )
}

export default NeedLogin

const ContentLayout = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`

const IconWrapper = styled.div`
    margin-top: 5rem;
    margin-bottom: 2rem;
`

const Title = styled.h1`
    font-size: 2.8rem;
    font-weight: bold;
    margin-bottom: 1rem;
`

const Description = styled.p`
    font-size: 1.6rem;
    color: #555;
    margin-bottom: 2rem;
    line-height: 1.5;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem 0;
`

const HomeButton = styled.button`
    padding: 1.5rem 3rem;
    background-color: #35376e;
    color: #fff;
    border: none;
    border-radius: 2rem;
    font-size: 2rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #292959;
    }
`
