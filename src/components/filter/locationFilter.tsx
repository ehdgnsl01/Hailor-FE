import { useState, useEffect } from 'react'
import styled from 'styled-components'
import regionData from '../../data/regionData'

interface LocationFilterProps {
    initialSelected: string[]
    onConfirm: (selected: string[]) => void
}

const broadRegions = Object.keys(regionData)

const LocationFilter: React.FC<LocationFilterProps> = ({ initialSelected, onConfirm }) => {
    const [selectedBroad, setSelectedBroad] = useState<string>(broadRegions[0])
    const [selectedSubs, setSelectedSubs] = useState<string[]>(initialSelected)

    useEffect(() => {
        setSelectedSubs(initialSelected)
    }, [initialSelected])

    const handleBroadClick = (region: string) => {
        setSelectedBroad(region)
    }

    const handleSubClick = (sub: string) => {
        if (selectedSubs.includes(sub)) {
            setSelectedSubs(selectedSubs.filter(item => item !== sub))
        } else {
            setSelectedSubs([...selectedSubs, sub])
        }
    }

    return (
        <Container>
            <ColumnContainer>
                <LeftColumn>
                    {broadRegions.map(region => (
                        <BroadRegionItem key={region} selected={region === selectedBroad} onClick={() => handleBroadClick(region)}>
                            {region}
                        </BroadRegionItem>
                    ))}
                </LeftColumn>
                <RightColumn>
                    {regionData[selectedBroad].map(sub => (
                        <SubRegionItem key={sub} selected={selectedSubs.includes(sub)} onClick={() => handleSubClick(sub)}>
                            {sub}
                        </SubRegionItem>
                    ))}
                </RightColumn>
            </ColumnContainer>
            {selectedSubs.length > 0 && (
                <ConfirmButton onClick={() => onConfirm(selectedSubs)}>
                    {selectedSubs.length === 1 ? `${selectedSubs[0]} 추가하기` : `${selectedSubs[0]} 외 ${selectedSubs.length - 1}곳 추가하기`}
                </ConfirmButton>
            )}
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
    padding-right: 1rem;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 30vh;
`

const RightColumn = styled.div`
    padding-left: 1rem;
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
    margin: 0 auto;
    margin-top: 1rem;
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
