import axiosInstance from "@live-config/axiosInstance";

const APIComment = {
  async getComment(id: any) {
    try {
      const { data } = await axiosInstance.get(`/comments/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async postComment(request: any) {
    try {
      const { data } = await axiosInstance.post("/comments", request);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default APIComment;
