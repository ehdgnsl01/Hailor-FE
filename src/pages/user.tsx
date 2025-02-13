import { Outlet } from 'react-router-dom'
import Header from '../components/header'
import Navigation from '../components/navigation'
import styled from 'styled-components'

const MainLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    /* 헤더, 컨텐츠, 네비게이션 영역: 상단, 중간, 하단 */
`

const ContentLayout = styled.div`
    width: 100%;
    min-height: 100vh;
    margin-top: 3.5rem; /* Header 높이만큼 패딩 추가 */
    margin-bottom: 5rem; /* Footer 높이만큼 패딩 추가 */
`

function User() {
    return (
        <MainLayout>
            <Header />
            <ContentLayout>
                {/* 각 페이지 컴포넌트가 이 Outlet에 렌더링 됨 */}
                <Outlet />
            </ContentLayout>
            <Navigation />
        </MainLayout>
    )
}

export default User
