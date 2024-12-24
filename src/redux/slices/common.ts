import { RootState } from '../store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CommonState {
  locale: string
  loading: boolean
  toast: {
    duration?: number
    type?: string
    show: boolean
    title?: string
    message: string
  }
}
const initialState: CommonState = {
  locale: 'en-US',
  loading: false,
  toast: {
    duration: 6000,
    type: 'error',
    show: false,
    title: 'Title',
    message: '',
  },
}

export const commonSlices = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading: (state: RootState, action: PayloadAction<any>) => {
      state.loading = action.payload
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
  },
})

// Action creators are generated for each case reducer function
export const {
  setLoading,
  setToast,
} = commonSlices.actions

export default commonSlices.reducer
