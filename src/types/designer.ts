export interface IRegion {
    id: number
    name: string
}

export interface Designer {
    id: number
    name: string
    shopAddress: string
    region: string // ex: "서울전체", "홍대/연남/합정", "강남/청담/압구정", "성수/건대"
    specialization: string
    meetingType: string
    offlinePrice: number
    onlinePrice: number
    description: string
    profileImageURL: string // 이미지 URL
}

export interface IGetDesignerList {
    designers: Designer[]
}

export interface IGetDesignerListFilter {
    size: number
    lastId?: number
    name?: string
    meetingType?: string
    regionId?: number
    date?: string
    priceMin?: number
    priceMax?: number
}

export interface IGetDesignerScheduleResponse {
    date: string
    designer: Designer
    schedule: {
        slot: number[]
    }
}
