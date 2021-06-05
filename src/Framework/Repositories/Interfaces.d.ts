// Repository interfaces
export interface ApiResponse<Errors> {
  errors?: Errors;
  message: string;
}

export interface CreateDriver {
  create: <Errors, T = Record<string, unknown>>(
    data: T
  ) => Promise<ApiResponse<Errors>>;
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

export interface IndexDriver {
  index: <Errors, T>(data?: T) => Promise<ApiResponse<Errors>>;
}

export type CommandDriver = CreateDriver & UpdateDriver & DeleteDriver;
export type QueryDriver = GetDriver & IndexDriver;
export type ResourceDriver = CommandDriver & QueryDriver;
