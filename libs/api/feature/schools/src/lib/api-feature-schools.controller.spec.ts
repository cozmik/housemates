import { Test } from '@nestjs/testing';
import { ApiFeatureSchoolsController } from './api-feature-schools.controller';

describe('ApiFeatureSchoolsController', () => {
  let controller: ApiFeatureSchoolsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiFeatureSchoolsController],
    }).compile();

    controller = module.get(ApiFeatureSchoolsController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
