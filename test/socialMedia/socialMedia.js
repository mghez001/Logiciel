const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const socialMedia = {
  async getPost(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  },
};