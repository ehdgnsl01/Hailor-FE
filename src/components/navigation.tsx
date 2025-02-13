import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

export const pages = ['홈', '검색', '예약', '채팅', '마이페이지'] as const
export type Page = (typeof pages)[number]

const routes: Record<Page, string> = {
    홈: '/',
    검색: '/search',
    예약: '/reservation',
    채팅: '/chat',
    마이페이지: '/mypage',
}

// public 폴더에 있는 SVG 파일 경로 매핑
const icons: Record<Page, string> = {
    홈: '/홈_네비.svg',
    검색: '/검색_네비.svg',
    예약: '/예약_네비.svg',
    채팅: '/채팅_네비.svg',
    마이페이지: '/마이페이지_네비.svg',
}

const NavigationContainer = styled.nav`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3.75rem; /* 60px = 60/16 = 3.75rem */
    background-color: #ffffff;
    border-top: 0.063rem solid #e0e0e0; /* 1px = 1/16 ≈ 0.063rem */
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 1000;

    /* 데스크탑/태블릿 환경 스타일 (768px = 48rem, 500px = 31.25rem, 10px = 0.625rem) */
    @media (min-width: 48rem) {
        width: 31.25rem;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 0.625rem 0.625rem 0 0;
    }
`

const NavItem = styled(Link) <{ active: boolean }>`
    text-decoration: none;
    background: none;
    border: none;
    flex: 1;
    cursor: pointer;
    padding: 0.3125rem; /* 5px = 5/16 ≈ 0.3125rem */
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: inherit;
    color: inherit;
`

const Icon = styled.div<{ src: string; active: boolean }>`
    width: 1.5rem; /* 24px = 1.5rem */
    height: 1.5rem;
    background-color: ${({ active }) => (active ? '#35376E' : 'rgba(41, 41, 41, 0.6)')};
    mask: url(${props => props.src}) center / contain no-repeat;
    -webkit-mask: url(${props => props.src}) center / contain no-repeat;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #35376e;
    }
`

const Navigation = () => {
    const location = useLocation()

    const handleClick = () => {
        window.scrollTo({ top: 0, left: 0 });
    };

    return (
        <NavigationContainer>
            {pages.map(page => {
                const to = routes[page]
                const isActive = location.pathname === to
                return (
                    <NavItem key={page} active={isActive} to={to} onClick={handleClick}>
                        <Icon src={icons[page]} active={isActive} />
                    </NavItem>
                )
            })}
        </NavigationContainer>
    )
}

export default Navigation
