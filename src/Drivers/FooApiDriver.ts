import {FooApiDriverInterface, CreateRequest, UpdateRequest, DeleteRequest} from 'Repositories/FooApiDriverInterface';
import { debuglog } from 'Utils';
import ApiDriver from "./ApiDriver";

export default class FooApiDriver extends ApiDriver implements FooApiDriverInterface {
  private url = 'http://localhost';

  create<E>(data: CreateRequest) {
    debuglog('Sending create data', {data});
    return this.postRequest<E, CreateRequest>(this.url, data);
  }

  update<E>(data: UpdateRequest) {
    return this.putRequest<E, UpdateRequest>(this.url, data);
  }

  delete<E>(data: DeleteRequest) {
    return this.deleteRequest<E, DeleteRequest>(this.url, data);
  }
}
