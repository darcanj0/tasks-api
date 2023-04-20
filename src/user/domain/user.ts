import { INVALID_USER_NAME } from 'src/utils/error-messages';
import { Result } from 'src/utils/result';

interface UserProps {
  name: string;
  email: string;
  password: string;
}

export class User {
  private props: UserProps;

  get name() {
    return this.props.name;
  }

  set name(newName: string) {
    this.props.name = newName;
  }

  get email() {
    return this.props.email;
  }

  set email(newEmail: string) {
    this.props.email = newEmail;
  }

  private constructor(props: UserProps) {
    this.props = props;
  }

  public static isValidName(name: string): boolean {
    const isValid = name.length > 3 && name.length <= 20;
    return isValid;
  }

  public static create(props: UserProps): Result<User> {
    if (!this.isValidName(props.name)) {
      return Result.fail(INVALID_USER_NAME);
    }

    return Result.success(new User(props));
  }
}
