import axios from "axios";

export const URL = process.env.REACT_APP_API_ENTRYPOINT;
const customAxios = axios.create({baseURL: URL})

export default  customAxios;