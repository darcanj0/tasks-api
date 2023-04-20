import { Inject, Injectable } from '@nestjs/common';
import { Result } from 'src/utils/result';
import { IUseCase } from 'src/utils/usecase.interface';
import { CreateTagDto } from './create-tag.dto';
import { ITagRepo } from 'src/tag/infra/tag-repository.interface';
import { TagRepository } from 'src/tag/infra/tag-repository';
import { v4 as uuidv4 } from 'uuid';
import { Tag } from 'src/tag/domain/tag';

@Injectable()
export class CreateTagUseCase implements IUseCase<CreateTagDto, Result<void>> {
  constructor(
    @Inject(TagRepository)
    private readonly tagRepo: ITagRepo,
  ) {}
  async execute(dto: CreateTagDto): Promise<Result<void>> {
    const createTag = Tag.create({
      ...dto,
      id: uuidv4(),
      creatorId: dto.user.id,
    });

    await this.tagRepo.save(createTag.getResult);

    return Result.ok();
  }
}
