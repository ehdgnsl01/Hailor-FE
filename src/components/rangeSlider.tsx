import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface Props {
    initMin: number
    initMax: number
    min: number
    max: number
    step: number
    priceCap: number
    onConfirm: (range: { min: number; max: number }) => void
}

export default function RangeSlider({ initMin, initMax, min, max, step, priceCap, onConfirm }: Props) {
    const [minValue, setMinValue] = useState(initMin)
    const [maxValue, setMaxValue] = useState(initMax)
    const progressRef = useRef<HTMLDivElement>(null)

    const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        if (value <= maxValue - priceCap) {
            setMinValue(value)
        } else {
            setMinValue(maxValue - priceCap)
        }
    }

    const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        if (value >= max) {
            setMaxValue(max)
        } else if (value >= minValue + priceCap) {
            setMaxValue(value)
        } else {
            setMaxValue(minValue + priceCap)
        }
    }

    const handleMinRange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        if (value <= maxValue - priceCap) {
            setMinValue(value)
        }
    }

    const handleMaxRange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        if (value >= minValue + priceCap) {
            setMaxValue(value)
        }
    }

    useEffect(() => {
        if (!progressRef.current) return
        progressRef.current.style.left = `${(minValue / max) * 100}%`
        progressRef.current.style.right = `${100 - (maxValue / max) * 100}%`
    }, [minValue, maxValue, max])

    return (
        <ContainerWrapper>
            <SliderWrapper>
                <SliderTrack aria-label="slider">
                    <Progress ref={progressRef} aria-label="progress" />
                </SliderTrack>
                <RangeInputs aria-label="range-input">
                    <RangeInput aria-label="min-price" type="range" min={min} step={step} max={max} value={minValue} onChange={handleMinRange} />
                    <RangeInput aria-label="max-price" type="range" min={min} step={step} max={max} value={maxValue} onChange={handleMaxRange} />
                </RangeInputs>
            </SliderWrapper>

            <PriceInputs>
                <InputGroup>
                    <NumberInput type="number" id="min-price" min={min} step={step} max={max - priceCap} value={minValue} onChange={handleMinInput} />
                    <Label htmlFor="min-price">원부터 </Label>
                </InputGroup>
                <Dash> </Dash>
                <InputGroup>
                    <NumberInput type="number" id="max-price" min={min + priceCap} step={step} max={max} value={maxValue} onChange={handleMaxInput} />
                    <Label htmlFor="max-price">원까지 </Label>
                </InputGroup>
            </PriceInputs>

            <ConfirmButton onClick={() => onConfirm({ min: minValue, max: maxValue })}>
                {minValue.toLocaleString()}원 ~ {maxValue.toLocaleString()}원 선택하기
            </ConfirmButton>
        </ContainerWrapper>
    )
}

const ContainerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5rem;
`

const PriceInputs = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 90%;
    padding: 0 5%;
    gap: 0.5rem;
`

const InputGroup = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
    flex: 1;
`

const Label = styled.label`
    font-weight: bold;
    flex-shrink: 0;
    font-size: 1.4rem;
    color: rgba(41, 41, 41, 0.4);
`

const NumberInput = styled.input`
    width: 100%;
    padding: 0.5rem;
    font-size: 2rem;
    border: 0.0625rem solid #d1d5db;
    border-radius: 0.375rem;
    box-sizing: border-box;
    outline: none;
    background-color: transparent;
    color: #292929;
    &:focus {
        border-color: transparent;
        box-shadow: 0 0 0 0.5rem rgba(100, 116, 139, 0.5);
    }
`

const Dash = styled.div`
    margin: 0 1rem;
    font-size: 1.5rem;
    font-weight: 600;
`

const SliderWrapper = styled.div`
    margin-top: 1rem;
`

const SliderTrack = styled.div`
    position: relative;
    height: 0.5rem;
    border-radius: 0.125rem;
    background-color: #cbd5e1;
`

const Progress = styled.div`
    position: absolute;
    height: 100%;
    border-radius: 0.375rem;
    background-color: #64748b;
`

const RangeInputs = styled.div`
    position: relative;
`

const RangeInput = styled.input`
    pointer-events: none;
    position: absolute;
    left: -0.25rem;
    right: 0;
    top: -0.5rem;
    width: 100%;
    height: 0rem;
    appearance: none;
    background: transparent;
    outline: none;

    &::-webkit-slider-thumb {
        pointer-events: auto;
        height: 2rem;
        width: 2rem;
        cursor: grab;
        -webkit-appearance: none;
        appearance: none;
        border-radius: 9999px;
        background-color: #1e293b;
    }
    &::-webkit-slider-thumb:active {
        cursor: grabbing;
    }
`

const ConfirmButton = styled.button`
    margin: 0 auto;
    margin-top: 1rem;
    padding: 1.6rem 1.6rem;
    background-color: #35376e;
    color: #fafcfe;
    border: none;
    border-radius: 50rem;
    cursor: pointer;
    z-index: 2;
    width: 30rem;
    font-size: 1.6rem;
    font-weight: bold;
`
