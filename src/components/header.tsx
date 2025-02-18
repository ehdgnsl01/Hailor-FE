import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
    role?: 'admin' | 'user'
}

const HeaderLayout = styled.header`
    position: sticky;
    display: flex;
    flex-direction: column;
    justify-content: end;
    top: 0;
    width: 100%;
    min-height: 5rem;
    z-index: 9999;
    background-color: #ffffff;
    border-bottom: 0.1rem solid rgba(217, 217, 217, 0.6);
`

const HeaderContent = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: center;
    padding: 0.4rem 0;
`

const AdminContext = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const GradientText = styled.span`
    font-weight: 500;
    font-style: italic;
    font-size: 2.4rem;
    background: linear-gradient(45deg, #292959, #5e58bf);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
`

const AdminTag = styled.span`
    font-size: 1.2rem;
    color: red;
    margin-left: 0.5rem;
`

const BackToUser = styled.div`
    position: absolute;
    right: 1rem;
    top: 0.6rem;
    font-size: 1.2rem;
    background-color: #e6e6e6;
    border-radius: 1.2rem;
    color: rgba(41, 41, 89, 1);
    padding: 1rem 2rem;
`

function Header({ role }: HeaderProps) {
    const navigate = useNavigate()
    return (
        <HeaderLayout>
            <HeaderContent>
                <GradientText>Hailor</GradientText>
                {role === 'admin' && (
                    <AdminContext>
                        <AdminTag>Admin</AdminTag>
                        <BackToUser onClick={() => navigate('/user/mypage')}>나가기</BackToUser>
                    </AdminContext>
                )}
            </HeaderContent>
        </HeaderLayout>
    )
}

export default Header
