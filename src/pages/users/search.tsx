import { Outlet } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'

import SearchBox from '../../components/searchBox.tsx'
import FilterButtonContainer from '../../components/buttons/filterButtonContainer.tsx'
import FaceFilter from '../../components/filter/faceFilter.tsx'
import LocationFilter from '../../components/filter/locationFilter.tsx'
import PriceFilter from '../../components/filter/priceFilter.tsx'
import ProfileListComponent from '../../components/profileListComponent.tsx'
import DateSelector from '../../components/filter/dateSelector.tsx'
import { IGetDesignerListFilter, IRegion } from '../../types/designer.ts'
import { CrossIcon } from '../../components/icon'
import { userStore } from '../../store/user.ts'
import NeedLogin from '../../components/needLogin.tsx'

type FilterType = '대면여부' | '위치' | '날짜' | '가격' | null

function Search() {
    const [activeFilter, setActiveFilter] = useState<FilterType>(null)
    const [query, setQuery] = useState<string>('')
    const [faceFilterSelected, setFaceFilterSelected] = useState<string | null>(null)
    const [locationFilterSelected, setLocationFilterSelected] = useState<IRegion | null>(null)
    const [dateFilterSelected, setDateFilterSelected] = useState<Date | null>(null)
    const [priceFilterSelected, setPriceFilterSelected] = useState<{ min: number; max: number } | null>(null)
    const [filter, setFilter] = useState<IGetDesignerListFilter>({ size: 10 })
    const memoFilter = useMemo(() => filter, [filter])
    const { getUser } = userStore()
    const user = getUser()

    //필터 초기화
    const handleReset = () => {
        setFaceFilterSelected(null)
        setLocationFilterSelected(null)
        setDateFilterSelected(null)
        setPriceFilterSelected(null)
        setFilter({ size: 10 })
    }

    useEffect(() => {
        const temp: IGetDesignerListFilter = { size: 10 }
        if (query.trim().length !== 0) {
            temp.name = query
        }
        if (faceFilterSelected) {
            temp.meetingType = faceFilterSelected === '대면' ? 'OFFLINE' : faceFilterSelected === '비대면' ? 'ONLINE' : ''
        }
        if (locationFilterSelected) {
            temp.regionId = locationFilterSelected.id
        }
        if (dateFilterSelected) {
            temp.date = `${dateFilterSelected.getFullYear()}-${String(dateFilterSelected.getMonth() + 1).padStart(2, '0')}-${String(dateFilterSelected.getDate()).padStart(2, '0')}`
        }
        if (priceFilterSelected) {
            temp.priceMin = priceFilterSelected.min
            temp.priceMax = priceFilterSelected.max
        }
        setFilter(temp)
    }, [faceFilterSelected, locationFilterSelected, dateFilterSelected, priceFilterSelected, query])

    const openFilter = (filter: FilterType) => {
        setActiveFilter(filter)
    }

    const closeFilter = () => {
        setActiveFilter(null)
    }

    //모달창 나올시 스크롤 비활성화.
    useEffect(() => {
        if (activeFilter !== null) {
            document.body.style.overflow = 'hidden'
            document.body.style.touchAction = 'none'
        } else {
            document.body.style.overflow = 'auto'
            document.body.style.touchAction = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
            document.body.style.touchAction = 'auto'
        }
    }, [activeFilter])

    if (!user.name) {
        return <NeedLogin />
    }

    return (
        <PageContainer>
            <Outlet />
            <SearchBox onSearch={setQuery} />
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
                            <CloseButton onClick={closeFilter}>
                                <CrossIcon width={'1.4rem'} height={'1.4rem'} fill={'#292929'} />
                            </CloseButton>
                        </PanelHeader>
                        <PanelContent>
                            {activeFilter === '대면여부' && (
                                <FaceFilter
                                    initialSelected={faceFilterSelected}
                                    onConfirm={value => {
                                        closeFilter()
                                        setFaceFilterSelected(value)
                                    }}
                                />
                            )}
                            {activeFilter === '위치' && (
                                <LocationFilter
                                    initialSelected={locationFilterSelected}
                                    onConfirm={(selectedSubs: IRegion | null) => {
                                        closeFilter()
                                        setLocationFilterSelected(selectedSubs)
                                    }}
                                />
                            )}
                            {activeFilter === '날짜' && (
                                <DateSelector date={dateFilterSelected} setDate={setDateFilterSelected} hasInformation={false} />
                            )}
                            {activeFilter === '가격' && (
                                <PriceFilter
                                    initialRange={priceFilterSelected} // priceFilterSelected: {min: number, max: number} | null
                                    onConfirm={range => {
                                        closeFilter()
                                        setPriceFilterSelected(range)
                                    }}
                                />
                            )}
                        </PanelContent>
                    </FilterPanel>
                </Overlay>
            )}
            <ProfileListComponent filter={memoFilter} time={dateFilterSelected || new Date()} />
        </PageContainer>
    )
}

export default Search

const PageContainer = styled.div`
    height: 100%;
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
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    animation: ${fadeIn} 0.3s ease-out;
    overflow: hidden;
`

const FilterPanel = styled.div`
    width: 100%;
    height: calc(env(--vh, 1vh) * 50);
    background-color: #fff;
    border-top-left-radius: 1.6rem;
    border-top-right-radius: 1.6rem;
    animation: ${slideUp} 0.4s ease-out forwards;
    padding: 1.6rem;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
    overflow-y: scroll;
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
