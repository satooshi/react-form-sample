import { ApiResponse } from './Interfaces';

type CheckValue = 'C1' | 'C2' | 'C3' | 'C4';
type RadioValue = 'R1' | 'R2' | 'R3';
type SelectValue = 'S1' | 'S2' | 'S3';

export interface CreateRequest {
  checkList: CheckValue[];
  inlineCheck: CheckValue[];
  inlineRadio: RadioValue;
  radioList: RadioValue;
  select: SelectValue;
  switch: boolean;
  text1: string;
  text2: string;
  textArea: string;
}

export interface UpdateRequest extends Partial<CreateRequest> {
  id: string;
}

export interface DeleteRequest {
  id: string;
}

export interface FooApiDriverInterface {
  create: <E>(data: CreateRequest) => Promise<ApiResponse<E>>;
}
