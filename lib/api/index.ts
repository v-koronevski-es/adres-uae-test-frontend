import axios, { AxiosError } from 'axios';

const baseURL = `https://run.mocky.io/v3`; // TODO: add .env

export const http = axios.create({
  baseURL,
});
