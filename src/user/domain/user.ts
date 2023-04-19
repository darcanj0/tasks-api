import { ErrorMessages } from 'src/utils/error-messages';
import { Result } from 'src/utils/result';

interface UserProps {
  name: string;
  email: string;
  password: string;
}

export class User {
  name: string;
  email: string;
  password: string;

  private constructor(props: UserProps) {
    const { email, name, password } = props;
    this.email = email;
    this.name = name;
    this.password = password;
  }

  public static isValidName(name: string): boolean {
    const isValid = name.length > 3 && name.length <= 20;
    return isValid;
  }

  public static create(props: UserProps): Result<User, string> {
    if (!this.isValidName(props.name)) {
      return Result.fail(ErrorMessages.INVALID_USER_NAME);
    }

    return Result.success(new User(props));
  }
}
