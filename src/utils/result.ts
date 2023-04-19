import { IErrorMessage } from './error-messages';

interface ResultProps<K> {
  isSuccess: boolean;
  isFailure: boolean;
  error?: IErrorMessage;
  getResult?: K;
}

export class Result<K> {
  private success: boolean;
  private failure: boolean;
  private errorValue?: IErrorMessage;
  private result?: K;

  private constructor(props: ResultProps<K>) {
    this.failure = props.isFailure;
    this.success = props.isSuccess;
    this.errorValue = props.error;
    this.result = props.getResult;
  }

  get isSuccess(): boolean {
    return this.success;
  }

  get isFailure(): boolean {
    return this.failure;
  }

  get error(): IErrorMessage | null {
    if (!this.errorValue) return null;
    return this.errorValue;
  }

  get getResult(): K | null {
    if (!this.result) return null;
    return this.result;
  }

  public static ok<K>() {
    return new Result<K>({
      isFailure: false,
      isSuccess: true,
    });
  }

  public static fail<K>(error: IErrorMessage) {
    return new Result<K>({
      isFailure: true,
      isSuccess: false,
      error,
    });
  }

  public static success<K>(value: K) {
    return new Result<K>({
      isSuccess: true,
      isFailure: false,
      getResult: value,
    });
  }
}
