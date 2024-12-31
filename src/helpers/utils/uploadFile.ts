// import { createUploadUrl } from '@/api/uploadFile'

export const validateImageFile = (file: File | null) => {
  if (!file) throw new Error('Không tìm thấy file')
  // Kiểm tra xem file có phải là ảnh không
  console.log(file.type)

  const validImageTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!validImageTypes.includes(file.type)) {
    throw new Error('Chỉ có thể tải lên file ảnh (định dạng .jpg, .png)')
  }
  const fileSizeInMB = file?.size / (1024 * 1024)
  const maxSizeInMB = 10
  if (fileSizeInMB > maxSizeInMB) {
    throw new Error(
      `File không được lớn hơn ${maxSizeInMB}MB. File của bạn có kích thước ${fileSizeInMB.toFixed(2)}MB.`
    )
  }
  return true
}

const uploadToGoogleStorage = async (file: File, uploadUrl: string, headers: any) => {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const binaryData = new Uint8Array(arrayBuffer)

    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': file.type,
      },
      body: binaryData,
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    return response
  } catch (error) {
    console.error('Error uploading to Google Storage:', error)
    throw error
  }
}

// export const getUrlFile = async (file: any, uploadFolder: string, showMessage?: any) => {
//   try {
//     const { data } = await createUploadUrl(
//       {
//         originalFileName: file.name,
//         contentType: file.type,
//         size: file.size.toString(),
//       },
//       uploadFolder
//     )
//     if (data?.url) {
//       const { headers, uploadUrl, url } = data
//       await uploadToGoogleStorage(file, uploadUrl, headers)
//       return url.replaceAll(' ', '')
//     }
//   } catch (error: any) {
//     console.error(error?.data?.message)
//     if (showMessage) showMessage(error?.data?.message || error?.message)
//   }
// }
