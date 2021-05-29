import { CommandDriver } from "../Repositories/Interfaces";
import ApiDriver from "./ApiDriver";

interface CreateRequest {}
interface UpdateRequest {}
interface DeleteRequest {}

export default class FooDriver extends ApiDriver implements CommandDriver {
  private url = 'http://localhost';

  create<E>(data: CreateRequest) {
    console.log('Sending create data', {data});
    return this.postRequest<E, CreateRequest>(this.url, data);
  }

  update<E>(data: UpdateRequest) {
    return this.putRequest<E, UpdateRequest>(this.url, data);
  }

  delete<E>(data: DeleteRequest) {
    return this.deleteRequest<E, DeleteRequest>(this.url, data);
  }
}
