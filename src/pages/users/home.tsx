import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { reservationData } from '../../data/exReservationData'
import { designers } from '../../data/designerData'

function Home() {
    const { reservationDate, placeName, consultationType, reservationTime } = reservationData
    const formattedReservationDate = `${reservationDate.getMonth() + 1}월 ${reservationDate.getDate()}일`
    const days = ['일', '월', '화', '수', '목', '금', '토']
    const dayOfWeek = days[reservationDate.getDay()]

    // 오늘과 예약 날짜 차이를 계산하는 함수
    const getCountdownString = (date: Date): string => {
        const now = new Date()
        const diffTime = date.getTime() - now.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        if (diffDays > 0) return `D-${diffDays}`
        if (diffDays === 0) return 'D-Day'
        return ''
    }

    const countdown = getCountdownString(reservationDate)

    return (
        <HomeContainer>
            {/* 다가오는 예약 섹션 */}
            <UpcomingReservationSection>
                <SectionTitle>다가오는 예약</SectionTitle>
                <ReservationInfo>
                    <StyledLink to="/user/reservation">
                        <ReservationCard>
                            <TitleLine>{placeName}</TitleLine>
                            <InfoBox>
                                {formattedReservationDate} <InfoLine>|</InfoLine>
                                {consultationType} <InfoLine>|</InfoLine>
                                {reservationTime} ({dayOfWeek})
                            </InfoBox>
                            {countdown && <CountdownBadge>{countdown}</CountdownBadge>}
                        </ReservationCard>
                    </StyledLink>
                </ReservationInfo>
            </UpcomingReservationSection>

            <FamousContainer>
                {/* 인기있는 디자이너 섹션 */}
                <SectionTitle>인기있는 디자이너</SectionTitle>
                <HorizontalScrollContainer>
                    {designers.map(designer => (
                        <StyledLink key={designer.id} to="/user/search/payment">
                            <Card key={designer.id}>
                                <CardImage src={designer.profileImage} alt={designer.name} />
                                <CardInfo>
                                    <CardName>{designer.name}</CardName>
                                    <CardDetail>{designer.region}</CardDetail>
                                </CardInfo>
                                <CardInfo>
                                    <CardDetail />
                                    <CardDetail>{designer.specialties.join(', ')}</CardDetail>
                                </CardInfo>
                            </Card>
                        </StyledLink>
                    ))}
                </HorizontalScrollContainer>

                {/* 인기있는 헤어샵 섹션 (예시 - 하드코딩 데이터 사용) */}
                <SectionTitle>인기있는 헤어샵</SectionTitle>
                <HorizontalScrollContainer>
                    {/* 여기에는 헤어샵 데이터를 나열 */}
                    <Card>
                        <CardImage src="https://placehold.co/100x100" alt="헤어샵 A" />
                        <CardName>헤어샵 A</CardName>
                        <CardInfo>서울 강남</CardInfo>
                        <CardInfo>★4.7</CardInfo>
                    </Card>
                    <Card>
                        <CardImage src="https://placehold.co/100x100" alt="헤어샵 B" />
                        <CardName>헤어샵 B</CardName>
                        <CardInfo>서울 강남</CardInfo>
                        <CardInfo>★4.8</CardInfo>
                    </Card>
                    <Card>
                        <CardImage src="https://placehold.co/100x100" alt="헤어샵 C" />
                        <CardName>헤어샵 C</CardName>
                        <CardInfo>서울 강남</CardInfo>
                        <CardInfo>★4.6</CardInfo>
                    </Card>
                </HorizontalScrollContainer>
            </FamousContainer>
        </HomeContainer>
    )
}

export default Home

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const SectionTitle = styled.div`
    font-size: 2.4rem;
    font-weight: bold;
    color: #292929;
    width: 100%;
    display: flex;
`

const UpcomingReservationSection = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    gap: 2rem;
`

const ReservationInfo = styled.div`
    display: flex;
    justify-content: center;
`

// Link 스타일 지정 (텍스트 데코레이션 제거, 컬러 상속)
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`

const ReservationCard = styled.div`
    position: relative;
    background-color: #35376e;
    color: white;
    border-radius: 1rem;
    width: 100%;
    padding: 3rem 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`

const TitleLine = styled.div`
    font-size: 2.4rem;
    font-weight: bold;
`

const InfoBox = styled.div`
    font-size: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
`

const InfoLine = styled.div`
    font-size: 1.6rem;
    padding: 0 1rem;
`

const CountdownBadge = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: transparent;
    color: #fff;
    font-size: 1.4rem;
    font-weight: bold;
    padding: 1rem 2rem;
    border-radius: 1rem;
`

const FamousContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    margin-top: 3rem;
    padding: 2rem;
    gap: 2rem;
`

const HorizontalScrollContainer = styled.div`
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding: 0 1rem;
    width: 100%;
    margin-bottom: 1rem;
    &::-webkit-scrollbar {
        display: none;
    }
`

const Card = styled.div`
    flex: 0 0 auto;
    width: 15rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 1.5rem 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`

const CardImage = styled.img`
    width: 14rem;
    height: 14rem;
    border-radius: 8px;
    object-fit: cover;
`

const CardName = styled.div`
    font-size: 1.6rem;
    font-weight: bold;
    margin-top: 0.5rem;
`

const CardInfo = styled.div`
    display: grid;
    width: 90%;
    grid-template-columns: auto 1fr;
    align-items: baseline;
    justify-items: end;
`

const CardDetail = styled.div`
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.6);
`
