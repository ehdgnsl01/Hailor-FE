import { Designer } from '../types/designer' // 타입이 별도의 파일에 있다면 이렇게 import

export const designers: Designer[] = [
    {
        id: 1,
        name: '윈터',
        region: '서울전체',
        hairShopAddress: '서울 강남구 역삼동 123-45',
        profileImage: '/윈터 사진.webp',
        specialties: ['컷', '염색'],
        consultingFee: 50000,
        introduction: '고객 맞춤 스타일을 제공합니다.',
        consultationType: '대면 가능',
    },
    {
        id: 2,
        name: '카리나',
        region: '홍대/연남/합정',
        hairShopAddress: '서울 마포구 서교동 67-89',
        profileImage: '/카리나 사진.jpg',
        specialties: ['펌', '탈염색'],
        consultingFee: 60000,
        introduction: '트렌디한 스타일을 제안합니다.',
        consultationType: '화상, 대면 둘다 가능',
    },
    // ... 추가 디자이너 데이터를 여기에 추가
]
