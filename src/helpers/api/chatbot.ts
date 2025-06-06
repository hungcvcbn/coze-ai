import Api from './api'
export const chat = async (data: any) => {
  return await Api({
    url: `/cbot/v1/chatbots/training-center/chat`,
    method: 'post',
    data,
    // headers: {
    //   'Content-Type': 'application/json',
    //   'model': 'GEMINI',
    // },
  })
}
export const getConversationId = async (params: any) => {
  return await Api({
    url: `/cbot/v1/chatbots/training-center`,
    method: 'get',
    params,
  })
}
export const uploadFile = async (data: any, uploadToken?: any) => {
  return await Api({
    url: `/assets/v1/files/upload?uploadToken=${encodeURIComponent(uploadToken)}`,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
export const requestUpload = async (id: any, data: any) => {
  return await Api({
    url: `/cbot/v1/resources/knowledge/${id}/add-file-resource`,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  
}
export const loadConversation = async (data: any) => {
  return await Api({
    url: `/cbot/v1/chatbots/training-center/load-conversation`,
    method: 'post',
    data,
  })
}
export const getListPlatformPublish = async (id: any) => {
  return await Api({
    url: `/cbot/v1/agents/${id}/publish`,
    method: 'get',
  })
}
export const publishAgent = async (id: any, data: any) => {
  return await Api({
    url: `/cbot/v1/agents/${id}/publish`,
    method: 'post',
    data,
  })
}
export const getListPlatformConfig = async (id: any) => {
  return await Api({
    url: `/cbot/v1/agents/${id}/publish/config-options`,
    method: 'get',
  })
}
export const getChatExperience = async (id: any) => {
  return await Api({
    url: `/cbot/v1/agents/${id}/chat-experiences`,
    method: 'get',
  })
}

export const getAvailableModels = async (id: any) => {
  return await Api({
    url: `/cbot/v1/agents/${id}/available-models`,
    method: 'get',
  })
}
