import { Designer } from '../types/designer.ts'
import { create } from 'zustand/react'

interface DesignerStore {
    designer: Designer
    date: Date
    face: string
    setDesigner: (designer: Designer) => void
    setDate: (date: Date) => void
    setFace: (face: string) => void
}

export const designerStore = create<DesignerStore>(set => ({
    designer: {
        id: 0,
        name: '',
        shopAddress: '',
        region: '',
        profileImageURL: '',
        specialization: '',
        offlinePrice: 0,
        onlinePrice: 0,
        description: '',
        meetingType: '',
    },
    date: new Date(),
    setDate: (date: Date) => set({ date: date }),
    setDesigner: (designer: Designer) => set({ designer: designer }),
    face: '',
    setFace: (face: string) => set({ face }),
}))
