import * as yup from 'yup'

// Set the locale globally
yup.setLocale({
  mixed: {
    required: 'Trường này là bắt buộc.',
    notType: 'Không đúng định dạng.',
  },
  string: {
    email: 'Không đúng định dạng email.',
    min: ({ min }) => `Tối thiểu ${min} ký tự.`,
    max: ({ max }) => `Tối đa ${max} ký tự.`,
  },
  number: { min: ({ min }) => `Tối thiểu ${min}.`, max: ({ max }) => `Tối đa ${max}.`, positive: 'Phải là số dương' },
})

export default yup
