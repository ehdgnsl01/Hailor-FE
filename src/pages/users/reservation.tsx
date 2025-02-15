import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import FilterButtonContainer from '../../components/filterButtonContainer'
import FaceFilter from '../../components/filter/faceFilter'
import LocationFilter from '../../components/filter/locationFilter'
import DateFilter from '../../components/filter/dateFilter'
import PriceFilter from '../../components/filter/priceFilter'
import SearchBox from '../../components/searchBox'
import ProfileListComponent from '../../components/profileListComponent'
import { designers } from '../../data/designerData'

type FilterType = '대면여부' | '위치' | '날짜' | '가격' | null

function Reservation() {
    const [activeFilter, setActiveFilter] = useState<FilterType>(null)
    const [faceFilterSelected, setFaceFilterSelected] = useState<string | null>(null)
    const [locationFilterSelected, setLocationFilterSelected] = useState<string[]>([])
    const [dateFilterSelected, setDateFilterSelected] = useState<Date | null>(null)
    const [priceFilterSelected, setPriceFilterSelected] = useState<{ min: number; max: number } | null>(null)

    //필터 초기화
    const handleReset = () => {
        setFaceFilterSelected('') // 또는 초기값으로, 예: null
        setLocationFilterSelected([])
        setDateFilterSelected(null)
        setPriceFilterSelected(null)
    }

    const openFilter = (filter: FilterType) => {
        setActiveFilter(filter)
    }

    const closeFilter = () => {
        setActiveFilter(null)
    }

    //모달창 나올시 스크롤 비활성화.
    useEffect(() => {
        const contentLayout = document.getElementById('content-layout')
        if (contentLayout) {
            if (activeFilter !== null) {
                contentLayout.style.overflowY = 'hidden'
                contentLayout.style.touchAction = 'none'
            } else {
                contentLayout.style.overflowY = 'scroll'
                contentLayout.style.touchAction = 'auto'
            }
        }
        return () => {
            if (contentLayout) {
                contentLayout.style.overflowY = 'scroll'
                contentLayout.style.touchAction = 'auto'
            }
        }
    }, [activeFilter])

    return (
        <PageContainer>
            <SearchBox onSearch={query => console.log('검색어 전송:', query)} />
            <FilterButtonContainer
                faceFilterSelected={faceFilterSelected}
                locationFilterSelected={locationFilterSelected}
                dateFilterSelected={dateFilterSelected}
                priceFilterSelected={priceFilterSelected}
                onReset={handleReset}
                onOpenFilter={openFilter}
            />

            {activeFilter && (
                <Overlay onClick={closeFilter}>
                    <FilterPanel onClick={e => e.stopPropagation()}>
                        <PanelHeader>
                            <PanelTitle>{activeFilter} 필터</PanelTitle>
                            <CloseButton onClick={closeFilter}>✕</CloseButton>
                        </PanelHeader>
                        <PanelContent>
                            {activeFilter === '대면여부' && (
                                <FaceFilter
                                    initialSelected={faceFilterSelected}
                                    onConfirm={value => {
                                        setFaceFilterSelected(value)
                                        closeFilter()
                                    }}
                                />
                            )}
                            {activeFilter === '위치' && (
                                <LocationFilter
                                    initialSelected={locationFilterSelected}
                                    onConfirm={(selectedSubs: string[]) => {
                                        setLocationFilterSelected(selectedSubs)
                                        closeFilter()
                                    }}
                                />
                            )}
                            {activeFilter === '날짜' && (
                                <DateFilter
                                    initialSelected={dateFilterSelected || undefined}
                                    onConfirm={selectedDate => {
                                        setDateFilterSelected(selectedDate)
                                        closeFilter()
                                    }}
                                />
                            )}
                            {activeFilter === '가격' && (
                                <PriceFilter
                                    initialRange={priceFilterSelected} // priceFilterSelected: {min: number, max: number} | null
                                    onConfirm={range => {
                                        setPriceFilterSelected(range)
                                        closeFilter()
                                    }}
                                />
                            )}
                        </PanelContent>
                    </FilterPanel>
                </Overlay>
            )}

            <ProfileListComponent designers={designers} />
        </PageContainer>
    )
}

export default Reservation

const PageContainer = styled.div`
    position: relative;
    min-height: 100%;
    padding: 3rem 2rem;
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    animation: ${fadeIn} 0.3s ease-out;
`

const FilterPanel = styled.div`
    width: 100%;
    height: 50vh;
    background-color: #fff;
    border-top-left-radius: 1.6rem;
    border-top-right-radius: 1.6rem;
    animation: ${slideUp} 0.4s ease-out forwards;
    padding: 1.6rem;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
`

const PanelHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.6rem;
`

const PanelTitle = styled.h2`
    font-size: 1.8rem;
    margin: 0;
`

const CloseButton = styled.button`
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;
`

const PanelContent = styled.div`
    font-size: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
`
