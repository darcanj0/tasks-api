import {
  INVALID_AMMOUNT_TAGS,
  INVALID_TASK_TITLE,
} from 'src/utils/error-messages';
import { Result } from 'src/utils/result';

export interface TaskProps {
  id: string;
  title: string;
  dueDate?: Date;
  tagsIds: string[];
  creatorId: string;
}

export class Task {
  private props: TaskProps;
  private constructor(props: TaskProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get title() {
    return this.props.title;
  }

  changeTitle(newTitle: string): Result<void> {
    const validTitle = Task.validTitle(newTitle);
    if (!validTitle) return Result.fail(INVALID_TASK_TITLE);
    this.props.title = newTitle;
    return Result.ok();
  }

  get creator() {
    return this.props.creatorId;
  }

  get dueDate() {
    return this.props.dueDate;
  }

  set dueDate(newDate: Date) {
    this.props.dueDate = newDate;
  }

  get tags() {
    return this.props.tagsIds;
  }

  addTag(tagId: string): Result<void> {
    const cannotAdd =
      Task.tooManyTags([...this.tags, tagId]) ||
      this.props.tagsIds.some((tag) => tag === tagId);
    if (cannotAdd) return Result.fail(INVALID_AMMOUNT_TAGS);
    this.props.tagsIds.push(tagId);
    return Result.ok();
  }

  public static tooManyTags = (tagsIds: string[]): boolean =>
    tagsIds.length > 5;

  public static validTitle = (title: string): boolean =>
    title.length >= 5 && title.length <= 50;

  public static create(props: TaskProps): Result<Task> {
    const tooManyTags = this.tooManyTags(props.tagsIds);
    if (tooManyTags) return Result.fail(INVALID_AMMOUNT_TAGS);

    return Result.success(new Task(props));
  }
}
