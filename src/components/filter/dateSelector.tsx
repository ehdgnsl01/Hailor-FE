import styled from 'styled-components'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { CalenderIcon } from '../icon'

interface Props {
    date: Date | null
    hasInformation: boolean
    setDate: (d: Date) => void
}

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0.8rem 1.6rem;
    gap: 0.4rem;
`

const InfoText = styled.span`
    font-size: 1.6rem;
    font-weight: bold;
    text-align: left;
`

const CustomCalender = styled(Calendar)`
    background-color: #ffffff;
    align-self: center;
    border: 0;
    width: 100%;
    padding: 2.9rem;
    font-family: inherit;
    font-size: 2rem;

    button {
        cursor: unset;
    }

    .react-calendar__navigation {
        display: grid !important;
        grid-template-columns: 1fr auto auto;
        grid-template-rows: 0;
        align-items: center;
        justify-items: start;
        margin-bottom: 0;
    }

    .react-calendar__navigation__label {
        order: 1;
        padding-left: 1.5rem;
    }

    .react-calendar__navigation__label__labelText {
        color: #4a5660 !important;
    }

    .react-calendar__navigation__prev-button {
        order: 2;
        color: #b5bec6 !important;
        font-size: 2.4rem !important;
    }

    .react-calendar__navigation__next-button {
        order: 3;
        color: #b5bec6 !important;
        font-size: 2.4rem !important;
    }

    .react-calendar__month-view__days {
        display: grid !important;
        grid-template-columns: repeat(7, 1fr);
        align-items: center;
        justify-items: center;
    }

    .react-calendar__year-view__months {
        display: grid !important;
        grid-template-columns: repeat(5, 1fr);
    }

    .react-calendar__year-view__months__month {
        max-width: 7rem !important;
        min-width: 7rem !important;
        height: 7rem;
    }

    .react-calendar__decade-view__years {
        display: grid !important;
        grid-template-columns: repeat(4, 1fr);
    }

    .react-calendar__decade-view__years__year {
        max-width: 9rem !important;
        min-width: 9rem !important;
        height: 9rem;
    }

    .react-calendar__century-view__decades {
        display: grid !important;
        grid-template-columns: repeat(5, 1fr);
        row-gap: 2rem;
    }

    .react-calendar__century-view__decades__decade {
        max-width: 7rem !important;
        min-width: 7rem !important;
        height: 7rem;
    }

    .react-calendar__tile {
        border-radius: 500rem;
        color: #4a5660;
        font-size: 2rem;
        width: 4rem;
        max-width: 4rem;
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .react-calendar__tile--hasActive {
        background: #35376e;
        color: white;
    }

    .react-calendar__tile--active {
        background: #35376e !important;
        color: white !important;
    }

    .react-calendar__tile--now {
        background: #ffffff;
        color: #4a5660;
    }

    .react-calendar__month-view__weekdays__weekday abbr {
        color: #b5bec6;
        font-weight: normal;
        text-decoration: none;
    }

    .react-calendar__navigation__label {
        background-color: #ffffff;
        color: #4a5660;
    }

    .react-calendar__navigation button {
        border: none;
        background: transparent;
        color: inherit;
        font-size: 18px;
        cursor: pointer;
    }

    .react-calendar__month-view__weekdays {
        font-weight: bold;
        color: #2c3e50;
    }
`

const dateConverter = ['일', '월', '화', '수', '목', '금', '토']

function DateSelector({ date, hasInformation, setDate }: Props) {
    const minDate = new Date()
    return (
        <Layout>
            {hasInformation && date ? (
                <InfoContainer>
                    <CalenderIcon width={'2.4rem'} height={'2.5rem'} fill={'#292929'} />
                    <InfoText>{`${date.getMonth() + 1}.${date.getDate()}.(${dateConverter[date.getDay()]})·시간을 선택해 주세요`}</InfoText>
                </InfoContainer>
            ) : (
                <></>
            )}
            <CustomCalender
                value={date}
                defaultActiveStartDate={minDate}
                minDate={minDate}
                onChange={value => setDate(value as Date)}
                calendarType="gregory"
                defaultView="month"
                locale={'ko-KR'}
                formatDay={(locale, date) =>
                    `${date
                        .toLocaleDateString(locale as string)
                        .split('.')[2]
                        .trim()}`
                }
                formatMonth={(locale, date) =>
                    `${date
                        .toLocaleDateString(locale as string)
                        .split('.')[1]
                        .trim()}월`
                }
                formatYear={(locale, date) =>
                    `${date
                        .toLocaleDateString(locale as string)
                        .split('.')[0]
                        .trim()}`
                }
                formatMonthYear={(locale, date) =>
                    `${date
                        .toLocaleDateString(locale as string)
                        .split('.')[1]
                        .trim()}월`
                }
                prev2Label={null}
                next2Label={null}
            />
        </Layout>
    )
}

export default DateSelector
