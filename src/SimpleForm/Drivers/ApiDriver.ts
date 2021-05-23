/* eslint-disable class-methods-use-this */

import {ApiResponse} from '../Repositories/Interfaces';

export default class ApiDriver {
  protected async postRequest<Errors, T>(url: string, data?: T) {
    return this.sendRequest<Errors, T>('POST', url, data);
  }

  protected async putRequest<Errors, T>(url: string, data?: T) {
    return this.sendRequest<Errors, T>('PUT', url, data);
  }

  protected async deleteRequest<Errors, T>(url: string, data?: T) {
    return this.sendRequest<Errors, T>('DELETE', url, data);
  }

  protected async getRequest<Errors, T>(url: string, data?: T) {
    return this.sendRequest<Errors, T>('GET', url, data);
  }

  private async sendRequest<Errors, T>(method: string, url: string, data?: T) {
    const body = JSON.stringify(data);
    const response = await fetch(url, {method, body});

    return response.json() as Promise<ApiResponse<Errors>>;
  }
}
