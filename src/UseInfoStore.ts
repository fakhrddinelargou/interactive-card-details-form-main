

import {create} from 'zustand'



type Store  = {
    name: string
    cardNumber : string
    month : number
    years : number
    cvc: number
 updateName: (name: string) => void;
  updateCardNumber: (cardNumber: string) => void;
  updateMonth: (month: number) => void;
  updateYears: (years: number) => void;
  updateCvc: (cvc: number) => void;
    

}



export  const useInfoStore = create<Store>((set) => ({
name:"",
cardNumber:"",
month: 0,
years: 0,
cvc:0,
  updateName: (name) => set({ name }),
  updateCardNumber: (cardNumber) => set({ cardNumber }),
  updateMonth: (month) => set({ month }),
  updateYears: (years) => set({ years }),
  updateCvc: (cvc) => set({ cvc }),
}))