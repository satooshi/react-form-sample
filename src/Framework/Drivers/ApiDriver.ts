import { ApiResponse } from '../Repositories/Interfaces';

async function sendRequest<Errors, T>(method: string, url: string, data?: T) {
  const body = JSON.stringify(data);

  try {
    const response = await fetch(url, { body, method });

    return response.json() as Promise<ApiResponse<Errors>>;
  } catch (e) {
    console.error(e);
    return {} as Promise<ApiResponse<Errors>>;
  }
}

export async function postRequest<Errors, T>(url: string, data?: T) {
  return sendRequest<Errors, T>('POST', url, data);
}

export async function putRequest<Errors, T>(url: string, data?: T) {
  return sendRequest<Errors, T>('PUT', url, data);
}

export async function deleteRequest<Errors, T>(url: string, data?: T) {
  return sendRequest<Errors, T>('DELETE', url, data);
}

export async function getRequest<Errors, T>(url: string, data?: T) {
  return sendRequest<Errors, T>('GET', url, data);
}
