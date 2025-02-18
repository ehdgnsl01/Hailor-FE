import React, { useEffect } from 'react'
import styled from 'styled-components'
import { userStore } from '../../store/user.ts'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getDesignersAdmin } from '../../api/admin.ts'
import { useInView } from 'react-intersection-observer'
import { IGetDesignerList } from '../../types/designer.ts'

const Container = styled.div`
    padding: 2rem;
`

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
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

const MAX_SIZE = 10

function Designers() {
    const { getToken } = userStore()
    const token = getToken()
    const { ref, inView } = useInView()

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery<IGetDesignerList, Error>({
        queryKey: ['AdminDesigner', token],
        queryFn: ({ pageParam }) => getDesignersAdmin(token, MAX_SIZE, pageParam as number),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage && lastPage.designers.length < MAX_SIZE) {
                return undefined
            }

            const lastId = lastPage.designers[lastPage.designers.length - 1]?.id
            const prevLastId = allPages.length > 1 ? allPages[allPages.length - 2].designers.at(-1)?.id : null

            if (lastId === prevLastId) {
                return undefined
            }

            return lastId
        },
        enabled: !!token,
        staleTime: 0,
        gcTime: 0,
    })

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])

    if (isLoading && !data) {
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
            {data &&
                data.pages.map((page, pageIndex) =>
                    page.designers.map(
                        (designer): React.ReactNode => (
                            <ContentBox key={`${pageIndex}-${designer.id}`}>
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
                    ),
                )}
            <div ref={ref} style={{ height: '1px', background: 'transparent' }}></div>

            {isFetchingNextPage && <ContentSkeleton />}
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
            <Designers />
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
