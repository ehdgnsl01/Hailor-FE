import React, { useState } from 'react'
import styled from 'styled-components'

interface SearchBoxProps {
    onSearch: (query: string) => void
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    return (
        <Container>
            <Input type="text" placeholder="디자이너를 검색해 보세요." value={query} onChange={handleInputChange} />
            <SearchIconButton onClick={() => onSearch(query)}>
                <MagnifyingGlassIcon />
            </SearchIconButton>
        </Container>
    )
}

export default SearchBox

const Container = styled.div`
    position: relative;
    width: 100%;
`

const Input = styled.input`
    border: 0.1rem solid #d9d9d9;
    border-radius: 50rem;
    background-color: #ffffff;
    color: #292929;
    width: 100%;
    padding: 1.2rem 4rem 1.2rem 2rem; /* 오른쪽에 아이콘 버튼을 위한 공간 확보 */
    font-size: 1.6rem;
    box-sizing: border-box;
`

const SearchIconButton = styled.button`
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    border: none;
    background-color: #fff; /* input 배경색과 동일 */
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.5rem;
`

const MagnifyingGlassIcon = styled.img.attrs({
    src: '/검색돋보기.svg',
    alt: '검색돋보기',
})`
    width: 1.8rem;
    height: 1.8rem;
    opacity: 0.6;
`
