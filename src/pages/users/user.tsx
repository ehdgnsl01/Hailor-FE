import { Outlet } from 'react-router-dom'
import Header from '../../components/header.tsx'
import Navigation from '../../components/navigation.tsx'
import styled from 'styled-components'

const MainLayout = styled.div`
    display: grid;
    grid-template-rows: auto 1fr 8.1rem; /* 6.5 + 0.8*2rem*/
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    /* 헤더, 컨텐츠, 네비게이션 영역: 상단, 중간, 하단 */
`

const ContentLayout = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`

function User() {
    return (
        <MainLayout>
            <Header />
            <ContentLayout id="content-layout">
                {/* 각 페이지 컴포넌트가 이 Outlet에 렌더링 됨 */}
                <Outlet />
            </ContentLayout>
            <Navigation />
        </MainLayout>
    )
}

export default User
