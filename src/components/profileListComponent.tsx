import React from 'react'
import styled from 'styled-components'
import { Designer } from '../types/designer'
import { Link } from 'react-router-dom'

interface ProfileListComponentProps {
    designers: Designer[]
}

const ProfileListComponent: React.FC<ProfileListComponentProps> = ({ designers }) => {
    return (
        <ListContainer>
            {designers.map(designer => (
                ///payment/${designer.id}
                <StyledLink key={designer.id} to={`payment`}>
                    <ProfileCard key={designer.id}>
                        <ProfileInfo>
                            <TopBox>
                                <NameBox>
                                    <Name>{designer.name}</Name>
                                    <ConsultationType>{designer.consultationType}</ConsultationType>
                                </NameBox>
                                <Specialties>전문 분야: {designer.specialties.join(', ')}</Specialties>
                            </TopBox>
                            <BottomBox>
                                <Region>{designer.region}</Region>
                                <ConsultingFee>컨설팅 금액: {designer.consultingFee.toLocaleString()}원</ConsultingFee>
                            </BottomBox>
                        </ProfileInfo>
                        <ProfileImage src={designer.profileImage} alt={designer.name} />
                    </ProfileCard>
                </StyledLink>
            ))}
        </ListContainer>
    )
}

export default ProfileListComponent

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 2rem;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`

const ProfileCard = styled.div`
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border: 0.1rem solid #e0e0e0;
    border-radius: 0.5rem;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
`

const ProfileImage = styled.img`
    width: 14rem;
    height: 15rem;
    border-radius: 1rem;
    object-fit: cover;
`

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 15rem;
    padding: 0 0.5rem;
`

const TopBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const NameBox = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
`

const Name = styled.h3`
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
`

const Region = styled.div`
    font-size: 1.4rem;
    color: #292929;
`

const BottomBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const Specialties = styled.div`
    font-size: 1.2rem;
    color: #555;
`

const ConsultingFee = styled.div`
    font-size: 1.8rem;
    font-weight: bold;
    color: #35376e;
`

const ConsultationType = styled.div`
    font-size: 1.2rem;
    color: #666;
`
