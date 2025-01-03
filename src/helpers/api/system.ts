import Api from "./api";

export const login = async (data: any) => {
  return await Api({
    url: `/iam/v1/auth/login`,
    method: 'post',
    data,
  })
}

export const getProfile = async () => {
  return await Api({
    url: `/accounts/v1/profile`,
    method: 'get',
  })
}

export const logout = async () => {
  return await Api({
    url: `/iam/v1/auth/logout`,
    method: 'post',
  })
}