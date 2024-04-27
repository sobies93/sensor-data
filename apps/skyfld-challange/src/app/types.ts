export enum RequestState {
  Idle = 'idle',
  Loading = 'loading',
  Error = 'error',
  Success = 'success',
}

export enum SnackbarLevel {
    Error = 'Error',
    Info = 'Info',
    Success = 'Success',

}

export interface FormErrors {
  humidity: string;
  temperature: string;
}