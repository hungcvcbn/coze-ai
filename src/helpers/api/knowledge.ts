import Api from "./api";


export const addKnowledge = async (data: any) => {
  return await Api({
    url: `/cbot/v1/resources/knowledge`,
    method: 'post',
    data,
  })
}

export const getKnowledge = async (id: string, params?: any) => {
  return await Api({
    url: `/cbot/v1/agents/${id}/knowledge`,
    method: 'get',
    params,
  })
}

export const updateKnowledge = async (id: string, data: any) => {
  return await Api({
    url: `/cbot/v1/resources/knowledge/${id}`,
    method: "put",
    data,
  });
};

export const addKnowledgeIntoAgent = async (id: string, data: any) => {
  return await Api({
    url: `/cbot/v1/agents/${id}/knowledge`,
    method: "post",
    data,
  });
};

export const removeKnowledgeFromAgent = async (id: string, data: any) => {
  return await Api({
    url: `/cbot/v1/agents/${id}/knowledge`,
    method: "delete",
    data,
  });
};
