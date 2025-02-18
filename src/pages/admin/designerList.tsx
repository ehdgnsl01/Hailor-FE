import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { userStore } from '../../store/user.ts'
import { useQuery } from '@tanstack/react-query'
import { getDesignersAdmin } from '../../api/admin.ts'
import { Designer } from '../../types/designer.ts'

const Container = styled.div`
    padding: 2rem;
`

const ListContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
    overflow-y: scroll;
    padding: 1.5rem 0;
    gap: 1rem;
`
/*
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`

const Button = styled.div<{ none: boolean }>`
    background-color: ${props => (props.none ? '#D9D9D9' : 'rgba(53, 55, 110, 1)')};
    border: 0.1rem solid ${props => (props.none ? 'rgba(217, 217, 217, 0.6)' : 'rgba(41, 41, 89, 1)')};
    border-radius: 1.2rem;
    padding: 1.2rem 1.2rem;
    color: ${props => (props.none ? 'rgba(53, 55, 110, 1)' : '#ffffff')};
`
 */

const ContentBox = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2rem;
    padding: 1rem;
    border: 0.1rem solid #e0e0e0;
    border-radius: 0.5rem;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
`

const ContentSkeleton = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding: 1rem;
    border: 0.1rem solid #e0e0e0;
    border-radius: 0.5rem;
    background-color: #fff;
    justify-content: space-between;
    height: 12rem;
    animation: pulse 1.5s infinite ease-in-out;

    @keyframes pulse {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.9;
        }
        100% {
            opacity: 1;
        }
    }
`

const SubContentBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
`

const ContentText = styled.div`
    display: block;
    word-break: break-all;
    text-align: left;
    font-size: 1.3rem;
`

const Descriptions = styled.div`
    display: block;
    word-break: break-all;
    color: #666666;
    text-align: left;
    padding-top: 1rem;
`

const SubTitle = styled.span`
    font-weight: bold;
`

const Image = styled.img`
    width: 15rem;
    height: 18rem;
    border-radius: 1rem;
    object-fit: cover;
`

const MAX_SIZE = 100

function Designers({ size, current, setEnd }: { size: number; current: number; setEnd: (e: number) => void }) {
    const [designers, setDesigners] = useState<Designer[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)
    const { getToken } = userStore()
    const token = getToken()
    const { data, refetch } = useQuery({
        queryKey: ['AdminDesigner', size, current],
        queryFn: () => {
            setLoading(true)
            const data = getDesignersAdmin(token, size, current)
            setTimeout(() => setLoading(false), 300)
            return data
        },
        enabled: !!token,
        staleTime: 1000 * 60 * 0.5,
        gcTime: 1000 * 60 * 0.5,
    })

    useEffect(() => {
        if (data) {
            if (designers.length === 0) {
                setDesigners(data.designers)
            } else {
                let i = 0
                const result: Designer[] = []
                for (i = 0; i < data.designers.length; i++) {
                    if (!designers.some(before => before.id === data.designers[0].id)) {
                        result.push(data.designers[i])
                    }
                }
                if (result.length === 0) {
                    setEnd(current)
                } else {
                    setDesigners(result)
                }
            }
        }
    }, [data, refetch])

    if (isLoading) {
        return (
            <ListContainer>
                <ContentSkeleton />
                <ContentSkeleton />
                <ContentSkeleton />
                <ContentSkeleton />
                <ContentSkeleton />
                <ContentSkeleton />
            </ListContainer>
        )
    }

    return (
        <ListContainer>
            {designers.length > 0 &&
                designers.map(
                    (designer): React.ReactNode => (
                        <ContentBox>
                            <SubContentBox>
                                <Image src={designer.profileImageURL} />
                            </SubContentBox>
                            <SubContentBox>
                                <ContentText>
                                    <SubTitle>ID:</SubTitle> {designer.id}
                                </ContentText>
                                <ContentText>
                                    <SubTitle>이름:</SubTitle> {designer.name}
                                </ContentText>
                                <ContentText>
                                    <SubTitle>지역:</SubTitle> {designer.region}
                                </ContentText>
                                <ContentText>
                                    <SubTitle>샵주소:</SubTitle> {designer.shopAddress}
                                </ContentText>
                                <ContentText>
                                    <SubTitle>전문분야:</SubTitle> {designer.specialization}
                                </ContentText>
                                <ContentText>
                                    <SubTitle>가능한 컨설팅:</SubTitle> {designer.meetingType}
                                </ContentText>
                                <ContentText>
                                    <SubTitle>대면:</SubTitle> {designer.onlinePrice}원 <SubTitle>비대면:</SubTitle> {designer.offlinePrice}원
                                </ContentText>
                                <Descriptions>{designer.description}</Descriptions>
                            </SubContentBox>
                        </ContentBox>
                    ),
                )}
        </ListContainer>
    )
}

const DesignerList: React.FC = () => {
    //const [current, setCurrent] = useState<number>(MAX_SIZE + 1)
    //const [end, setEnd] = useState<number | null >(null)

    return (
        <Container>
            {/*<ButtonContainer>
                <Button
                    none={current === MAX_SIZE + 1}
                    onClick={() => {
                        if (current > MAX_SIZE) {
                            setCurrent(current - MAX_SIZE)
                        }
                    }}
                >
                    이전 페이지
                </Button>
                <Button
                    none={end !== null ? current === end - MAX_SIZE : false}
                    onClick={() => {
                        if (end === null || current < end) {
                            setCurrent(current + MAX_SIZE)
                        }
                    }}
                >
                    다음 페이지
                </Button>
            </ButtonContainer>*/}
            <Designers size={MAX_SIZE} current={MAX_SIZE + 1} setEnd={(e: number) => console.log(e)} />
            {/*<ButtonContainer>
                <Button
                    none={current === MAX_SIZE + 1}
                    onClick={() => {
                        if (current > MAX_SIZE) {
                            setCurrent(current - MAX_SIZE)
                        }
                    }}
                >
                    이전 페이지
                </Button>
                <Button
                    none={end !== null ? current === end - MAX_SIZE : false}
                    onClick={() => {
                        if (end === null || current < end) {
                            setCurrent(current + MAX_SIZE)
                        }
                    }}
                >
                    다음 페이지
                </Button>
            </ButtonContainer>*/}
        </Container>
    )
}

export default DesignerList
