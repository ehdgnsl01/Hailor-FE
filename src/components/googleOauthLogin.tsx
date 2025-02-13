import { GoogleLoginIcon } from './icon'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border: 0.1rem solid rgba(217, 217, 217, 0.6);
    border-radius: 1.2rem;
    padding: 1.2rem;
    gap: 0.8rem;
`

const Text = styled.span`
    font-size: 1.6rem;
    font-weight: bold;
    color: #292929;
`

function GoogleOauthLogin() {
    // TODO: add oauth login logic
    return (
        <Container>
            <GoogleLoginIcon width={'3.2rem'} height={'3.2rem'} fill={'none'} />
            <Text>구글로 로그인하기</Text>
        </Container>
    )
}

export default GoogleOauthLogin
