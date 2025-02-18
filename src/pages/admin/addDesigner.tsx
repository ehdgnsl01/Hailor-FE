import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getRegions } from '../../api/designer.ts'
import { userStore } from '../../store/user.ts'
import { IPostDesigner, IPostRegion } from '../../types/designer.ts'
import { postDesigner, postRegion } from '../../api/admin.ts'
import { useNavigate } from 'react-router-dom'
import { CrossIcon } from '../../components/icon'

const Container = styled.div`
    padding: 2rem;
`

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100%;
    border: 0.1rem solid rgba(217, 217, 217, 0.6);
    border-radius: 0.8rem;
    background: #ffffff;
    padding: 1.2rem;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`

const Title = styled.h2`
    font-size: 2.4rem;
`

const Input = styled.input`
    padding: 1rem;
    margin: 0.5rem 0;
    border: 0.1rem solid #ccc;
    border-radius: 0.5rem;
    background-color: #ffffff;
    color: #292929;

    ::placeholder {
        color: #292929;
    }
`

const Select = styled.select`
    padding: 1rem;
    margin: 0.5rem 0;
    border: 0.1rem solid #ccc;
    border-radius: 0.5rem;
    background-color: #ffffff;
    color: #292929;
`

const TextArea = styled.textarea`
    padding: 1rem;
    margin: 0.5rem 0;
    border: 0.1rem solid #ccc;
    border-radius: 0.5rem;
    background-color: #ffffff;
    color: #292929;

    ::placeholder {
        color: #292929;
    }
`

const FileInput = styled.input`
    margin: 1rem 0;
`

const Button = styled.button`
    padding: 1rem;
    background: rgba(53, 55, 110, 1);
    color: white;
    border: 0.1rem solid rgba(41, 41, 89, 1);
    border-radius: 0.5rem;
    cursor: pointer;
    &:disabled {
        background: #ccc;
        border: 0.1rem solid #e6e6e6;
        cursor: not-allowed;
    }
    &:hover:enabled {
        background: rgba(41, 41, 89, 1);
    }
`

const ImageText = styled.span`
    text-align: left;
    font-size: 1.6rem;
    font-weight: bold;
`

const RegionContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    justify-content: space-between;
`

const RegionAddButton = styled.button`
    font-size: 1.2rem;
    background: rgba(53, 55, 110, 1);
    color: white;
    border: 0.1rem solid rgba(41, 41, 89, 1);
    border-radius: 0.5rem;
    padding: 0 1rem;
    cursor: pointer;
    &:disabled {
        background: #ccc;
        border: 0.1rem solid #e6e6e6;
        cursor: not-allowed;
    }
    &:hover:enabled {
        background: rgba(41, 41, 89, 1);
    }
`

const Modal = styled.div`
    position: absolute;
    top: 5rem;
    left: 0;
    background: rgba(41, 41, 41, 0.8);
    width: 100%;
    height: calc(var(--vh, 1vh) * 100 - 5rem);
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
    z-index: 500;
`

const ModalBox = styled.div`
    background-color: #fafcfe;
    padding: 2.4rem 3.2rem;
    border-radius: 1.6rem;
    min-width: 50%;
`

const Text = styled.span<{ size: string }>`
    font-size: ${props => props.size};
    font-weight: 600;
    text-align: center;
    white-space: pre-line;
    width: 100%;
`
const BackButtonContainer = styled.div`
    display: flex;
    justify-content: end;
    padding: 1rem 0;
`

interface FormData {
    name: string
    regionId: number
    meetingType: string
    shopAddress: string
    specialization: string
    offlinePrice: number
    onlinePrice: number
    description: string
    photo: File | null
}

function RegionSelect({
    handleChange,
    showModal,
}: {
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
    showModal: () => void
}) {
    const { getToken } = userStore()
    const { data } = useQuery({
        queryKey: ['region'],
        queryFn: () => getRegions(getToken()),
    })

    return (
        <RegionContainer>
            <Select name="regionId" onChange={handleChange}>
                <option value="">지역 선택</option>
                {data &&
                    data.map(region => (
                        <option key={region.id} value={region.id}>
                            {region.name}
                        </option>
                    ))}
            </Select>
            <RegionAddButton onClick={showModal}>지역 추가하기</RegionAddButton>
        </RegionContainer>
    )
}

function DesignerForm({ showModal }: { showModal: () => void }) {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        regionId: 0,
        meetingType: '',
        shopAddress: '',
        specialization: '',
        offlinePrice: 0,
        onlinePrice: 0,
        description: '',
        photo: null,
    })
    const [isFormValid, setFormValid] = useState<boolean>(false)
    const { getToken } = userStore()
    const token = getToken()
    const navigate = useNavigate()

    const mutate = useMutation({
        mutationKey: ['addDesigner'],
        mutationFn: (request: IPostDesigner) => postDesigner(request),
        onSuccess: () => navigate('/admin/designer-list'),
    })

    useEffect(() => {
        setFormValid(Object.values(formData).every(value => value))
    }, [formData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files[0]) {
            setFormData(prev => ({ ...prev, photo: files[0] }))
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isFormValid) {
            console.log('Form Data Submitted:', formData)
            const request: IPostDesigner = {
                body: {
                    request: {
                        name: formData.name,
                        description: formData.description,
                        offlinePrice: formData.offlinePrice,
                        onlinePrice: formData.onlinePrice,
                        regionId: formData.regionId,
                        meetingType: formData.meetingType,
                        shopAddress: formData.shopAddress,
                        specialization: formData.specialization,
                    },
                    profileImage: formData.photo as File,
                },
                secret: {
                    token: token,
                },
            }
            mutate.mutate(request)
        }
    }

    return (
        <FormContainer>
            <Title>디자이너 등록</Title>
            <Form onSubmit={handleSubmit}>
                <Input type="text" name="name" placeholder="이름" onChange={handleChange} />
                <RegionSelect handleChange={handleChange} showModal={showModal} />
                <Input type="text" name="shopAddress" placeholder="주소" onChange={handleChange} />
                <Select name="meetingType" onChange={handleChange}>
                    <option value="">미팅 유형 선택</option>
                    <option value="OFFLINE">대면</option>
                    <option value="ONLINE">비대면</option>
                    <option value="OFFLINE_AND_ONLINE">대면/비대면</option>
                </Select>
                <Select name="specialization" onChange={handleChange}>
                    <option value="">전문 분야 선택</option>
                    <option value="PERM">펌</option>
                    <option value="DYEING">염색</option>
                    <option value="DYEING_BLEACHING">탈염색</option>
                </Select>
                <Input type="number" name="offlinePrice" placeholder="오프라인 가격" onChange={handleChange} />
                <Input type="number" name="onlinePrice" placeholder="온라인 가격" onChange={handleChange} />
                <TextArea name="description" placeholder="설명" rows={3} maxLength={30} onChange={handleChange} />
                <ImageText>프로필 사진 업로드</ImageText>
                <FileInput type="file" onChange={handleFileChange} />
                <Button type="submit" disabled={!isFormValid}>
                    등록하기
                </Button>
            </Form>
        </FormContainer>
    )
}

function AddRegion({ closeModal }: { closeModal: () => void }) {
    const [region, setRegion] = useState<string>('')
    const [isFormValid, setFormValid] = useState<boolean>(false)
    const { getToken } = userStore()
    const token = getToken()

    const queryClient = useQueryClient()

    const mutate = useMutation({
        mutationKey: ['adminRegionAdd'],
        mutationFn: (request: IPostRegion) => postRegion(request),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['region'] })
            closeModal()
        },
    })

    useEffect(() => {
        setFormValid(region.trim() !== '')
    }, [region])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setRegion(value)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isFormValid) {
            console.log('Form Data Submitted:', region)
            const request: IPostRegion = {
                body: {
                    name: region,
                },
                secret: {
                    token: token,
                },
            }
            mutate.mutate(request)
        }
    }

    return (
        <Modal>
            <ModalBox>
                <BackButtonContainer onClick={closeModal}>
                    <CrossIcon width={'2rem'} height={'2rem'} fill={'#292929'} />
                </BackButtonContainer>
                <Form onSubmit={handleSubmit}>
                    <Text size="1.6rem">지역 추가하기</Text>
                    <Input type="text" name="region" placeholder="지역" onChange={handleChange} />
                    <Button type="submit" disabled={!isFormValid}>
                        등록하기
                    </Button>
                </Form>
            </ModalBox>
        </Modal>
    )
}

function AddDesigner() {
    const [showAddRegion, setShowAddRegion] = useState<boolean>(false)
    return (
        <Container>
            <DesignerForm showModal={() => setShowAddRegion(true)} />
            {showAddRegion && <AddRegion closeModal={() => setShowAddRegion(false)} />}
        </Container>
    )
}

export default AddDesigner
