export interface ITerms {
    id: number
    title: string
    isRequired: true
    contentUrl: string
}

export interface IUser {
    email: string
    userId: string
    name: string
    role: string
    exp: number
    profileImage: string
}

export interface IToken {
    accessToken: string
    refreshToken: string
}

export interface IRegisterResponse {
    terms: ITerms[]
}
