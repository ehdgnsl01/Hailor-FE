import { ITime } from '../../types/time.ts'
import styled from 'styled-components'
import { useMemo } from 'react'
import * as React from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { userStore } from '../../store/user.ts'
import { getDesignerSchedule } from '../../api/designer.ts'

interface Props {
    id: number
    date: string
    times: ITime[]
    selected: number
    setTime: (s: number) => void
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
    background-color: ${props => (props.selected ? '#35376e' : props.blocked ? '#D9D9D9' : '#FFFFFF')};
    border: 0.1rem solid ${props => (props.selected ? '#292959' : props.blocked ? 'rgba(217, 217, 217, 0.6)' : 'rgba(217, 217, 217, 0.6)')};
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

function TimeSelector({ id, date, times, selected, setTime }: Props) {
    const { getToken } = userStore()
    const token = getToken()
    const { data } = useSuspenseQuery({
        queryKey: ['designerSchedule', id, date, token],
        queryFn: () => getDesignerSchedule(id, date, token),
        staleTime: 0,
        gcTime: 0,
    })

    const [anteMeridiem, postMeridiem] = useMemo(() => {
        const now = new Date()
        const isToday = date === `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getDate()}`
        const slot = new Set([...data.schedule.slot])
        console.log(isToday, now.getHours() * 60 + now.getMinutes())
        const temp = times.map((t, i) => ({
            ...t,
            booked: slot.has(i) || (isToday && now.getHours() * 60 + now.getMinutes() >= (10 + t.index / 2) * 60 + (t.index % 2 === 0 ? 0 : 30)),
        }))
        const anteMeridiem = temp.filter(({ time }) => parseInt(time.split(':')[0], 10) < 12)
        const postMeridiem = temp.filter(({ time }) => parseInt(time.split(':')[0], 10) >= 12)
        console.log(anteMeridiem, postMeridiem)
        return [anteMeridiem, postMeridiem]
    }, [data, times, date])

    return (
        <Layout>
            <SubTitleContainer>
                <SubTitle>오전</SubTitle>
            </SubTitleContainer>
            <TimeGroupContainer>
                {anteMeridiem.map(
                    (t): React.ReactNode => (
                        <TimeContainer onClick={() => setTime(t.index)} selected={selected === t.index} blocked={t.booked}>
                            <Time selected={selected === t.index}>{t.time}</Time>
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
                        <TimeContainer onClick={() => setTime(t.index)} selected={selected === t.index} blocked={t.booked}>
                            <Time selected={selected === t.index}>{t.time}</Time>
                        </TimeContainer>
                    ),
                )}
            </TimeGroupContainer>
        </Layout>
    )
}

export default TimeSelector
