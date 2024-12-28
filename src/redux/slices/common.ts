import { RootState } from '../store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CommonState {
  locale: string
  firstLoading: boolean
  toast: {
    duration?: number
    type?: string
    show: boolean
    title?: string
    message: string
  },
  profile: any,
  fetchData: Function
}
const initialState: CommonState = {
  locale: 'en-US',
  firstLoading: true,
  toast: {
    duration: 6000,
    type: 'error',
    show: false,
    title: 'Title',
    message: '',
  },
  profile: {},
  fetchData: () => {}
}

export const commonSlices = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setFirstLoading: (state: RootState, action: PayloadAction<any>) => {
      state.firstLoading = action.payload
    },
    setToast: (
      state,
      action: PayloadAction<{
        type?: string
        title?: string
        duration?: number
        show: boolean
        message: string
      }>
    ) => {
      state.toast = action.payload
    },
    setProfile: (state: RootState, action: PayloadAction<any>) => {
      state.profile = action.payload
    },
    setFetchData: (state: RootState, action: PayloadAction<Function>) => {
      state.fetchData = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setFirstLoading,
  setToast,
  setProfile,
  setFetchData
} = commonSlices.actions

export default commonSlices.reducer
