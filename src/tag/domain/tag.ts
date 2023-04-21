import { Result } from 'src/utils/result';

export interface TagProps {
  id: string;
  creatorId: string;
  hex: string;
  title: string;
}

export class Tag {
  private props: TagProps;

  private constructor(props: TagProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get creatorId() {
    return this.props.creatorId;
  }

  isCreator(creatorId: string) {
    return creatorId === this.props.creatorId;
  }

  get hex() {
    return this.props.hex;
  }

  set hex(newColor: string) {
    this.props.hex = newColor;
  }

  get title() {
    return this.props.title;
  }

  set title(newTitle: string) {
    this.props.title = newTitle;
  }

  public static create(props: TagProps) {
    return Result.success(new Tag(props));
  }
}
