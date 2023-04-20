import { INVALID_USER_NAME } from 'src/utils/error-messages';
import { Result } from 'src/utils/result';

interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class User {
  props: UserProps;

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  changeName(newName: string): Result<void> {
    if (!User.isValidName(newName)) return Result.fail(INVALID_USER_NAME);
    this.props.name = newName;
    return Result.ok();
  }

  get email() {
    return this.props.email;
  }

  set email(newEmail: string) {
    this.props.email = newEmail;
  }

  get password() {
    return this.props.password;
  }

  set password(newPassword: string) {
    this.props.password = newPassword;
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
