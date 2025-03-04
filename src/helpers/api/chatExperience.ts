import Api from "./api";


export const updateChatExperience = async (id: any, data: any) => {
  return await Api({
    url: `/cbot/v1/agents/${id}/chat-experiences`,
    method: 'put',
    data,
  })
}

export const getChatExperience = async (id: any) => {
  return await Api({
    url: `/cbot/v1/agents/${id}/chat-experiences`,
    method: 'get',
  })
}