import {
  FooApiDriverInterface,
  CreateRequest,
  UpdateRequest,
  DeleteRequest,
} from 'Framework/Repositories/FooApiDriverInterface';
import { debuglog } from 'Utils';
import { postRequest, putRequest, deleteRequest } from './ApiDriver';

export class FooApiDriver implements FooApiDriverInterface {
  private url = 'http://localhost';

  create<E>(data: CreateRequest) {
    debuglog('Sending create data', { data });
    return postRequest<E, CreateRequest>(this.url, data);
  }

  update<E>(data: UpdateRequest) {
    return putRequest<E, UpdateRequest>(this.url, data);
  }

  delete<E>(data: DeleteRequest) {
    return deleteRequest<E, DeleteRequest>(this.url, data);
  }
}
