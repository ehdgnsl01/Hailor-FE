import { useState } from 'react'
import styled from 'styled-components'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getRegions } from '../../api/designer.ts'
import { IRegion } from '../../types/designer.ts'
import { userStore } from '../../store/user.ts'

interface LocationFilterProps {
    initialSelected: IRegion | null
    onConfirm: (selected: IRegion | null) => void
}

// const broadRegions = Object.keys(regionData)

function LocationFilter({ initialSelected, onConfirm }: LocationFilterProps) {
    const [selectedBroad, setSelectedBroad] = useState<string>('서울')
    const [selectedSubs, setSelectedSubs] = useState<IRegion | null>(initialSelected)
    const { getToken } = userStore()
    const { data } = useSuspenseQuery({
        queryKey: ['region'],
        queryFn: () => getRegions(getToken()),
    })

    return (
        <Container>
            <ColumnContainer>
                <LeftColumn>
                    <BroadRegionItem key={'서울'} selected={'서울' === selectedBroad} onClick={() => setSelectedBroad('서울')}>
                        {'서울'}
                    </BroadRegionItem>
                </LeftColumn>
                <RightColumn>
                    {data.map(sub => (
                        <SubRegionItem
                            key={sub.id}
                            selected={selectedSubs !== null && selectedSubs.id === sub.id}
                            onClick={() => {
                                if (selectedSubs !== null && selectedSubs.id === sub.id) {
                                    setSelectedSubs(null)
                                } else {
                                    setSelectedSubs(sub)
                                }
                            }}
                        >
                            {sub.name}
                        </SubRegionItem>
                    ))}
                </RightColumn>
            </ColumnContainer>
            <ConfirmButton onClick={() => onConfirm(selectedSubs)}>{selectedSubs ? `${selectedSubs.name} 선택하기` : '전체지역 보기'}</ConfirmButton>
        </Container>
    )
}

export default LocationFilter

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr auto;
    padding-bottom: 10rem;
`

const ColumnContainer = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    font-size: 1.7rem;
    text-decoration: none;
    user-select: none;
`

const LeftColumn = styled.div`
    border-right: 0.1rem solid #ccc;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 30vh;
`

const RightColumn = styled.div`
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    height: 30vh;
`

const BroadRegionItem = styled.div<{ selected: boolean }>`
    padding: 1.5rem;
    cursor: pointer;
    border-bottom: 0.1rem solid #eee;
    background-color: ${({ selected }) => (selected ? '#D9D9D9' : 'transparent')};
    color: #292929;
    margin-bottom: 0.5rem;
`

const SubRegionItem = styled.div<{ selected: boolean }>`
    padding: 0.9rem;
    cursor: pointer;
    border-bottom: 0.1rem solid #eee;
    background-color: ${({ selected }) => (selected ? '#D9D9D9' : 'transparent')};
    color: #292929;
`

const ConfirmButton = styled.button`
    justify-self: center;
    margin-top: 2rem;
    padding: 1.2rem 1.2rem;
    background-color: #35376e;
    color: #fafcfe;
    border: none;
    border-radius: 3rem;
    cursor: pointer;
    z-index: 2;
    width: 25rem;
    font-size: 1.6rem;
    font-weight: bold;
`
