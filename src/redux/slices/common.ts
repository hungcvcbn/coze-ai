import { getProfile } from '@/helpers/api/system'
import { RootState } from '../store'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export const asyncGetAccountProfile = createAsyncThunk('auth/getAccountProfile', async (_, thunkAPI) => {
  const controller = new AbortController()

  try {
    thunkAPI.signal.addEventListener('abort', () => {
      controller.abort()
    })

    const response = await getProfile()

    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
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
  triggerTime: number | null
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
  triggerTime: null
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
    setTriggerTime: (state: RootState, action: PayloadAction<number>) => {
      state.triggerTime = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(asyncGetAccountProfile.fulfilled, (state, action) => {
      state.profile = action.payload
    })
    builder.addCase(asyncGetAccountProfile.rejected, (state) => {
      state.profile = {}
    })
  },
})
export const selectAccountProfile = (state: RootState) => state.common.profile
// Action creators are generated for each case reducer function
export const {
  setFirstLoading,
  setToast,
  setProfile,
  setTriggerTime
} = commonSlices.actions

export default commonSlices.reducer
