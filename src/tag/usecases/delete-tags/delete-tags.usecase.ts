import { Inject, Injectable } from '@nestjs/common';
import { TagRepository } from 'src/tag/infra/tag-repository';
import { ITagRepo } from 'src/tag/infra/tag-repository.interface';
import {
  INTERNAL_SERVER_ERROR,
  INVALID_TAG_DELETION,
} from 'src/utils/error-messages';
import { Result } from 'src/utils/result';
import { IUseCase } from 'src/utils/usecase.interface';
import { DeleteTagsUsecaseDto } from './delete-tags.dto';

@Injectable()
export class DeleteTagsUsecase
  implements IUseCase<DeleteTagsUsecaseDto, Result<void>>
{
  constructor(
    @Inject(TagRepository)
    private readonly tagRepo: ITagRepo,
  ) {}
  async execute(dto: DeleteTagsUsecaseDto): Promise<Result<void>> {
    try {
      const { tagsIds, user } = dto;

      const tags = await this.tagRepo.findTagsByIds(tagsIds);

      const invalidDelete =
        tags.some((tag) => !tag.isCreator(user.id)) ||
        tagsIds.length !== tags.length;

      if (invalidDelete) return Result.fail(INVALID_TAG_DELETION);

      const owned = tags.filter((tag) => tag.isCreator(user.id));

      await this.tagRepo.deleteMany(owned);

      return Result.ok();
    } catch (error) {
      return Result.fail(INTERNAL_SERVER_ERROR);
    }
  }
}
