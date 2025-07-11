import axios, { type AxiosInstance } from 'axios';

class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://sky-scrapper.p.rapidapi.com/api/v1',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-key': import.meta.env.VITE_API_KEY,
      },
    });
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  public getAxios(): AxiosInstance {
    return this.axiosInstance;
  }
}

export const apiClient = ApiClient.getInstance().getAxios();
