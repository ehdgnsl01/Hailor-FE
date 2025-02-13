import styled from 'styled-components'
import GoogleOauthLogin from '../../components/googleOauthLogin.tsx'

const MyPageLayout = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.6rem;
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    background-color: #ffffff;
    border: 0.1rem solid rgba(217, 217, 217, 0.6);
    border-radius: 1.2rem;
    padding: 1.2rem 1.6rem;
    gap: 0.8rem;
`

const Profile = styled.img`
    border-radius: 50rem;
    width: 3.2rem;
    height: 3.2rem;
`
const Text = styled.span`
    font-size: 1.6rem;
    font-weight: bold;
    color: #292929;
`

function MyPage() {
    // TODO: check user login state
    return (
        <MyPageLayout>
            <GoogleOauthLogin />
            {/*TODO: get user info*/}
            <InfoContainer>
                <Profile src={'https://placehold.co/32x32'} />
                <Text>뽀야미</Text>
            </InfoContainer>
        </MyPageLayout>
    )
}

export default MyPage
