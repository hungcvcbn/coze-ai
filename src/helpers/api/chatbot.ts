import Api from './api'
export const chat = async (data: any) => {
  return await Api({
    url: `/cbot/v1/chatbots/training-center/chat`,
    method: 'post',
    data,
  })
}
export const getConversationId = async (params: any) => {
  return await Api({
    url: `/cbot/v1/chatbots/training-center`,
    method: 'get',
    params,
  })
}
export const uploadFile = async (data: any, tcode?: any, uploadToken?: any) => {
  return await Api({
    url: `/assets/v1/files/upload?tcode=${tcode}&uploadToken=${uploadToken}`,
    method: 'post', 
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
export const requestUpload = async (id: any, tcode: any, data: any) => {
  return await Api({
    url: `/cbot/v1/resources/knowledge/${id}/upload-file-request?tcode=${tcode}`,
    method: 'post',
    data,
  })
}
