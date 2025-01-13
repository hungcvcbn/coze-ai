import Api from './api'
export const chat = async (data: any) => {
  return await Api({
    url: `/cbot/v1/chatbots/training-center/chat`,
    method: 'post',
    data,
  })
}
