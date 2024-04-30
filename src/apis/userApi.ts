import axiosClient from './axiosClient';

class UserAPI {
  HandleUser = async (
    url: string,
    data?: any,
    method?: 'get' | 'post' | 'put' | 'delete' | 'patch',
  ) => {
    console.log("data", data)
    return await axiosClient(`/users${url}`, {
      method: method ?? 'get',
      data,
    });
  };
}

const userAPI = new UserAPI();
export default userAPI;