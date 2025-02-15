import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { generateDate } from './generateDate'

interface DateFilterProps {
    initialSelected?: Date
    onConfirm: (selectedDate: Date) => void
}

const DateFilter: React.FC<DateFilterProps> = ({ initialSelected, onConfirm }) => {
    const [currentDate, setCurrentDate] = useState(dayjs())
    const [records, setRecords] = useState<{ currentMonth: boolean; date: dayjs.Dayjs }[]>([])
    const [selectedDay, setSelectedDay] = useState<dayjs.Dayjs | null>(initialSelected ? dayjs(initialSelected) : null)

    useEffect(() => {
        const arrayOfDate = generateDate(currentDate)
        setRecords(arrayOfDate)
    }, [currentDate])

    // 초기 선택값이 바뀌면 selectedDay 업데이트
    useEffect(() => {
        if (initialSelected) {
            setSelectedDay(dayjs(initialSelected))
        }
    }, [initialSelected])

    const prevMonth = () => {
        setCurrentDate(prev => prev.add(-1, 'month'))
    }

    const nextMonth = () => {
        setCurrentDate(prev => prev.add(1, 'month'))
    }

    const handleDateClick = (record: { currentMonth: boolean; date: dayjs.Dayjs }) => {
        if (record.currentMonth) {
            setSelectedDay(record.date)
            onConfirm(record.date.toDate())
        }
    }

    return (
        <CalendarWrapper>
            <CalendarHeader>
                <MonthYear>
                    {currentDate.year()}년 {currentDate.month() + 1}월
                </MonthYear>
                <NavWrapper>
                    <NavButton onClick={prevMonth}>{`<`}</NavButton>
                    <NavButton onClick={nextMonth}>{`>`}</NavButton>
                </NavWrapper>
            </CalendarHeader>
            <WeekDays>
                {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
                    <WeekDay key={i}>{d}</WeekDay>
                ))}
            </WeekDays>
            <DayContainer>
                {records.map((record, idx) => (
                    <DateLabel
                        key={idx}
                        $currentMonth={record.currentMonth}
                        $selected={selectedDay ? record.date.isSame(selectedDay, 'day') : false}
                        onClick={() => handleDateClick(record)}
                    >
                        {record.date.date()}
                    </DateLabel>
                ))}
            </DayContainer>
        </CalendarWrapper>
    )
}

export default DateFilter

/* Styled Components */

const CalendarWrapper = styled.div`
    width: 90%;
    max-width: 400px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
`

const MonthYear = styled.div`
    font-size: 1.8rem;
    font-weight: bold;
    padding-left: 1rem;
`

const NavWrapper = styled.div``

const NavButton = styled.button`
    font-size: 1.6rem;
    background: none;
    border: none;
    cursor: pointer;
`

const WeekDays = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
`

const WeekDay = styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 1.4rem;
`

const DayContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    overflow-y: auto;
    height: 20rem;
`

interface DateLabelProps {
    $currentMonth: boolean
    $selected: boolean
}

const DateLabel = styled.div<DateLabelProps>`
    text-align: center;
    padding: 0.8rem;
    cursor: pointer;
    border-radius: 1rem;
    background: ${({ $selected }) => ($selected ? '#35376e' : 'transparent')};
    color: ${({ $selected, $currentMonth }) => ($selected ? '#fff' : $currentMonth ? '#292929' : '#aaa')};
    font-size: 1.6rem;
`
