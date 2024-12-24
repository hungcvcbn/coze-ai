import Api from "./api";

export const login = async (data: any) => {
  return await Api({
    url: `/iam/v1/auth/login`,
    method: 'post',
    data,
  })
}