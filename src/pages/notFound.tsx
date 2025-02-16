import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { DangerIcon } from '../components/icon'
import Header from '../components/header'

const NotFound: React.FC = () => {
    const navigate = useNavigate()

    return (
        <Container>
            <Header />
            <ContentLayout>
                <IconWrapper>
                    <DangerIcon width="10rem" height="10rem" fill="transparent" />
                </IconWrapper>
                <Title>페이지를 찾을 수 없습니다.</Title>
                <Description>
                    입력하신 페이지 주소가 잘못 입력되었거나,
                    <br />
                    변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
                    <br />
                    입력하신 페이지 주소를 다시 한번 확인해 주세요.
                </Description>
                <ButtonContainer>
                    <HomeButton onClick={() => navigate('/')}>Hailor 홈</HomeButton>
                    <BackButton onClick={() => navigate(-1)}>이전 페이지</BackButton>
                </ButtonContainer>
            </ContentLayout>
        </Container>
    )
}

export default NotFound

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100%;
    min-height: 100%;
`

const ContentLayout = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    border-radius: 0.5rem;
    font-size: 2rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #292959;
    }
`

const BackButton = styled(HomeButton)`
    background-color: transparent;
    color: rgba(0, 0, 0, 0.6);
    &:hover {
        background-color: #f0f0f0;
    }
`
