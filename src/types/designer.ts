export interface Designer {
    id: number
    name: string
    region: string // ex: "서울전체", "홍대/연남/합정", "강남/청담/압구정", "성수/건대"
    hairShopAddress: string
    profileImage: string // 이미지 URL
    specialties: string[] // ex: ["컷", "펌", "염색", "탈염색"]
    consultingFee: number
    introduction: string
    consultationType: '화상 가능' | '대면 가능' | '화상, 대면 둘다 가능'
}
