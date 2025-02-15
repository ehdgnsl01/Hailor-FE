import { ITime } from '../types/time.ts'
import styled from 'styled-components'
import { useMemo } from 'react'
import * as React from 'react'

interface Props {
    times: ITime[]
    selected: string
    setTime: (s: string) => void
}

const Layout = styled.div`
    width: 100%;
`

const TimeGroupContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.8rem 2rem;
    padding: 0.4rem 1.6rem;
`

const SubTitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-items: center;
    padding: 1.6rem 1.6rem 0.4rem 1.6rem;
`

const TimeContainer = styled.div<{ selected: boolean; blocked: boolean }>`
    align-items: center;
    justify-items: center;
    background-color: ${props => (props.blocked ? '#D9D9D9' : props.selected ? '#35376e' : '#FFFFFF')};
    border: 0.1rem solid ${props => (props.blocked ? 'rgba(217, 217, 217, 0.6)' : props.selected ? '#292959' : 'rgba(217, 217, 217, 0.6)')};
    border-radius: 0.8rem;
    padding: 1.2rem 2rem;
    pointer-events: ${props => (props.blocked ? 'none' : 'auto')};
`

const SubTitle = styled.span`
    text-align: left;
    width: 100%;
    font-size: 1.4rem;
    color: #000000;
`

const Time = styled.span<{ selected: boolean }>`
    font-size: 1.4rem;
    color: ${props => (props.selected ? '#FFFFFF' : '#292929')};
`

function TimeSelector({ times, selected, setTime }: Props) {
    const [anteMeridiem, postMeridiem] = useMemo(() => {
        const anteMeridiem = times.filter(({ time }) => parseInt(time.split(':')[0], 10) < 12)
        const postMeridiem = times.filter(({ time }) => parseInt(time.split(':')[0], 10) > 12)
        return [anteMeridiem, postMeridiem]
    }, [times])

    return (
        <Layout>
            <SubTitleContainer>
                <SubTitle>오전</SubTitle>
            </SubTitleContainer>
            <TimeGroupContainer>
                {anteMeridiem.map(
                    (t): React.ReactNode => (
                        <TimeContainer onClick={() => setTime(t.time)} selected={selected === t.time} blocked={!t.status}>
                            <Time selected={selected === t.time}>{t.time}</Time>
                        </TimeContainer>
                    ),
                )}
            </TimeGroupContainer>
            <SubTitleContainer>
                <SubTitle>오후</SubTitle>
            </SubTitleContainer>
            <TimeGroupContainer>
                {postMeridiem.map(
                    (t): React.ReactNode => (
                        <TimeContainer onClick={() => setTime(t.time)} selected={selected === t.time} blocked={!t.status}>
                            <Time selected={selected === t.time}>{t.time}</Time>
                        </TimeContainer>
                    ),
                )}
            </TimeGroupContainer>
        </Layout>
    )
}

export default TimeSelector
