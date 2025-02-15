import React from 'react'
import styled from 'styled-components'
import RangeSlider from '../rangeSlider'

interface PriceRange {
    min: number
    max: number
}

interface PriceFilterProps {
    onConfirm: (range: PriceRange) => void
    initialRange?: PriceRange | null
}

const PriceFilter: React.FC<PriceFilterProps> = ({ onConfirm, initialRange }) => {
    return (
        <Container>
            <RangeSlider
                initMin={initialRange ? initialRange.min : 10000}
                initMax={initialRange ? initialRange.max : 50000}
                min={0}
                max={300000}
                step={10000}
                priceCap={10000}
                onConfirm={onConfirm}
            />
        </Container>
    )
}

export default PriceFilter

const Container = styled.div`
    padding: 1rem;
    width: 90%;
    max-width: 400px;
`
