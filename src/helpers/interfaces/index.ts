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