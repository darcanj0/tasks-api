import { Inject, Injectable } from '@nestjs/common';
import { Result } from 'src/utils/result';
import { IUseCase } from 'src/utils/usecase.interface';
import { UpdateTagDto, UpdateTagUsecaseDto } from './update-tag.dto';
import { ITagRepo } from 'src/tag/infra/tag-repository.interface';
import { TagRepository } from 'src/tag/infra/tag-repository';
import {
  INTERNAL_SERVER_ERROR,
  INVALID_TAG_CREATOR,
  INVALID_TAG_NOT_FOUND,
} from 'src/utils/error-messages';

@Injectable()
export class UpdateTagUsecase implements IUseCase<UpdateTagDto, Result<void>> {
  constructor(
    @Inject(TagRepository)
    private readonly tagRepo: ITagRepo,
  ) {}
  async execute(dto: UpdateTagUsecaseDto): Promise<Result<void>> {
    try {
      const { hex, id, title, user } = dto;

      const tag = await this.tagRepo.findTagById(id);
      if (!tag) return Result.fail(INVALID_TAG_NOT_FOUND);

      if (user.id !== tag.creatorId) return Result.fail(INVALID_TAG_CREATOR);

      if (hex) {
        tag.hex = hex;
      }

      if (title) {
        tag.title = title;
      }

      await this.tagRepo.save(tag);

      return Result.ok();
    } catch (error) {
      return Result.fail(INTERNAL_SERVER_ERROR);
    }
  }
}
