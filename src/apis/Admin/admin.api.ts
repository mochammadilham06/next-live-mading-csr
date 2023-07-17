import axiosInstance from "@live-config/axiosInstance";

const APIAdmin = {
  async GetAllContent() {
    try {
      const { data } = await axiosInstance.get("/post");
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async GetAllUsers() {
    try {
      const { data } = await axiosInstance.get("/cms/user");
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async UpdateValidation(id: any, request: any) {
    console.log(request);
    try {
      const res = await axiosInstance.put(`/post/${id}`, {
        validation: request,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  async UpdateUser(id: any, request: any) {
    try {
      const { data } = await axiosInstance.put(`/cms/user/${id}`, request);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async DeleteUser(id: any) {
    try {
      const res = await axiosInstance.delete(`/cms/user/${id}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};

export default APIAdmin;
