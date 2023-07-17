import axiosInstance from "@live-config/axiosInstance";

const APIContent = {
  async getContent() {
    try {
      const { data } = await axiosInstance.get("/content");
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async getContentById(user_id: string | null) {
    try {
      const { data } = await axiosInstance.get(`/content/${user_id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async postContent(requst: any) {
    try {
      const { data } = await axiosInstance.post("/content", {
        objects: requst,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async updateContent(id: string, request: any) {
    try {
      const { data } = await axiosInstance.put(`/content/${id}`, request);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async deleteContent(id: string) {
    try {
      const res = await axiosInstance.delete(`/content/${id}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};

export default APIContent;
