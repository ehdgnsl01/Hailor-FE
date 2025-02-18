import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import * as React from 'react'

// User 페이지용
const userPages = ['홈', '검색', '내 예약', '마이'] as const
export type UserPage = (typeof userPages)[number]
const userRoutes: Record<UserPage, string> = {
    홈: '/user',
    검색: '/user/search',
    '내 예약': '/user/reservation',
    마이: '/user/mypage',
}
const userIcons: Record<UserPage, string> = {
    홈: '/홈_네비.svg',
    검색: '/검색_네비.svg',
    '내 예약': '/예약_네비.svg',
    마이: '/마이페이지_네비.svg',
}

// Admin 페이지용
const adminPages = ['예약조회', '디자이너 조회', '디자이너 추가'] as const
export type AdminPage = (typeof adminPages)[number]
const adminRoutes: Record<AdminPage, string> = {
    예약조회: '/admin',
    '디자이너 조회': '/admin/designer-list',
    '디자이너 추가': '/admin/designer-add',
}
const adminIcons: Record<AdminPage, string> = {
    예약조회: '/어드민_예약.svg',
    '디자이너 조회': '/어드민_디자이너.svg',
    '디자이너 추가': '/어드민_추가.svg',
}

interface NavigationProps {
    isAdmin?: boolean
}

interface NavigationContainerProps {
    count: number
}

const NavigationContainer = styled.nav<NavigationContainerProps>`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 6.5rem;
    background-color: #ffffff;
    border-top: 0.1rem solid #d9d9d9;
    border-radius: 1.2rem 1.2rem 0 0;
    display: grid;
    grid-template-columns: 1.6rem repeat(${props => props.count - 1}, 1fr 1fr) 1fr 1.6rem;
    justify-content: space-around;
    align-items: center;
    z-index: 10;
    padding: 0.8rem 0 env(safe-area-inset-bottom, 0.8rem) 0;
`

const NavItem = styled(Link)<{ position: number }>`
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    grid-column: ${props => props.position};
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: inherit;
    gap: 0.8rem;
`

const Icon = styled.div<{ src: string; active: boolean }>`
    width: 2.5rem;
    height: 2.5rem;
    background-color: ${({ active }) => (active ? '#35376E' : 'rgba(41, 41, 41, 0.6)')};
    mask: url(${props => props.src}) center / contain no-repeat;
    -webkit-mask: url(${props => props.src}) center / contain no-repeat;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #35376e;
    }
`

const Text = styled.span<{ active: boolean; isAdmin?: boolean }>`
    font-size: ${({ isAdmin }) => (isAdmin ? '1.4rem' : '1.2rem')};
    color: ${({ active }) => (active ? '#35376E' : 'rgba(41, 41, 41, 0.6)')};
`

const Navigation: React.FC<NavigationProps> = ({ isAdmin = false }) => {
    const location = useLocation()

    if (isAdmin) {
        return (
            <NavigationContainer count={adminPages.length}>
                {adminPages.map((page, index) => {
                    const to = adminRoutes[page]
                    const isActive = location.pathname === to
                    return (
                        <NavItem key={page} to={to} position={(index + 1) * 2}>
                            <Icon src={adminIcons[page]} active={isActive} />
                            <Text active={isActive} isAdmin={true}>
                                {page}
                            </Text>
                        </NavItem>
                    )
                })}
            </NavigationContainer>
        )
    } else {
        return (
            <NavigationContainer count={userPages.length}>
                {userPages.map((page, index) => {
                    const to = userRoutes[page]
                    const isActive = location.pathname === to
                    return (
                        <NavItem key={page} to={to} position={(index + 1) * 2}>
                            <Icon src={userIcons[page]} active={isActive} />
                            <Text active={isActive}>{page}</Text>
                        </NavItem>
                    )
                })}
            </NavigationContainer>
        )
    }
}

export default Navigation
