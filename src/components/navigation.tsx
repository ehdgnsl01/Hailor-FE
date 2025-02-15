import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import * as React from 'react'
import { pages } from './navigationConstants'

export type Page = (typeof pages)[number]

const routes: Record<Page, string> = {
    홈: '/user',
    검색: '/user/search',
    예약: '/user/reservation',
    채팅: '/user/chat',
    마이: '/user/mypage',
}

// public 폴더에 있는 SVG 파일 경로 매핑
const icons: Record<Page, string> = {
    홈: '/홈_네비.svg',
    검색: '/검색_네비.svg',
    예약: '/예약_네비.svg',
    채팅: '/채팅_네비.svg',
    마이: '/마이페이지_네비.svg',
}

const NavigationContainer = styled.nav`
    width: 100%;
    height: 6.5rem;
    background-color: #ffffff;
    border-top: 0.1rem solid #d9d9d9;
    border-radius: 1.2rem 1.2rem 0 0;
    display: grid;
    grid-template-columns: 1.6rem repeat(${pages.length - 1}, 1fr 1fr) 1fr 1.6rem;
    justify-content: space-around;
    align-items: center;
    z-index: 1000;
    padding: 0.8rem 0;
`

const NavItem = styled(Link) <{ position: number }>`
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
    width: 2.5rem; /* 24px = 1.5rem */
    height: 2.5rem;
    background-color: ${({ active }) => (active ? '#35376E' : 'rgba(41, 41, 41, 0.6)')};
    mask: url(${props => props.src}) center / contain no-repeat;
    -webkit-mask: url(${props => props.src}) center / contain no-repeat;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #35376e;
    }
`

const Text = styled.span<{ active: boolean }>`
    font-size: 1.4rem;
    color: ${props => (props.active ? '#35376E' : 'rgba(41, 41, 41, 0.6)')};
`

const Navigation = () => {
    const location = useLocation()

    const handleClick = () => {
        window.scrollTo({ top: 0, left: 0 })
    }

    return (
        <NavigationContainer>
            {pages.map((page, index): React.ReactNode => {
                const to = routes[page]
                const isActive = location.pathname === to
                return (
                    <NavItem key={page} to={to} onClick={handleClick} position={(index + 1) * 2}>
                        <Icon src={icons[page]} active={isActive} />
                        <Text active={isActive}>{page}</Text>
                    </NavItem>
                )
            })}
        </NavigationContainer>
    )
}

export default Navigation
