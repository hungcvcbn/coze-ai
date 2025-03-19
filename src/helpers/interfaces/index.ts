import { Dayjs } from "dayjs"

export interface FormError {
  show: boolean
  message: string
}
export interface SelectOption {
  value?: string | number
  label: string
  disabled?: boolean
  extraData?: any
}

export type IDayInCalendar = {
  date: Dayjs
  dayOfMonth: number
  isNextMonth?: boolean
  isPreviousMonth?: boolean
  eventList?: any[]
  isBeforeDate?: boolean | null
  isAfterDate?: boolean | null
}