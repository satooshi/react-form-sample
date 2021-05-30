import {ApiResponse} from 'Framework';

type CheckValue = 'C1' | 'C2' | 'C3' | 'C4';
type RadioValue = 'R1' | 'R2' | 'R3';
type SelectValue = 'S1' | 'S2'| 'S3';

export interface CreateRequest {
  text1: string;
  text2: string;
  textArea: string;
  checkList: CheckValue[];
  radioList: RadioValue;
  select: SelectValue;
  switch: boolean;
  inlineRadio: RadioValue;
  inlineCheck: CheckValue[];
}

export interface UpdateRequest {}
export interface DeleteRequest {}

export interface FooApiDriverInterface implements CommandDriver {
  create: <E>(data: CreateRequest) => Promise<ApiResponse<E>>;
}
