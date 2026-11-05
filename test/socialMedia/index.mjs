import { socialMedia } from "./socialMedia.js";

const post = await socialMedia.getPost(100);
console.log(post);