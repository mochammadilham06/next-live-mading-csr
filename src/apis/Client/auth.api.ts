import axiosInstance from "@live-config/axiosInstance";

const APIAuth = {
  async Login(request: any) {
    try {
      const { data } = await axiosInstance.post("/auth/login", request);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async Register(data: any) {
    try {
      const res = await axiosInstance.post("/auth/register", { objects: data });
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  async GetUserActive(id: any) {
    try {
      const { data } = await axiosInstance.get(`/user/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default APIAuth;
