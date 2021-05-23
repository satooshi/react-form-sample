export type ApiResponse<Errors> = {
  message: string;
  errors?: Errors;
}

export interface CreateDriver {
  create: <Errors, T>(data: T) => Promise<ApiResponse<Errors>>;
}

export interface UpdateDriver {
  update: <Errors, T>(data: T) => Promise<ApiResponse<Errors>>;
}

export interface DeleteDriver {
  delete: <Errors, T>(data: T) => Promise<ApiResponse<Errors>>;
}

export interface GetDriver {
  get: <Errors, T>(data?: T) => Promise<ApiResponse<Errors>>;
}

export type CommandDriver = CreateDriver & UpdateDriver & DeleteDriver;
export type QueryDriver = GetDriver;
export type ResourceDriver = CommandDriver & QueryDriver;
