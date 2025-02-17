import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    padding: 2rem;
`

const Title = styled.h1`
    font-size: 2.4rem;
    font-weight: bold;
`

const ReservationList: React.FC = () => {
    return (
        <Container>
            <Title>예약조회</Title>
            <p>예약 조회 페이지 내용이 여기에 표시됩니다.</p>
        </Container>
    )
}

export default ReservationList
