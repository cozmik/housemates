import { Test } from '@nestjs/testing';
import { BackendFeatureListingController } from './backend-feature-listing.controller';

describe('BackendFeatureListingController', () => {
  let controller: BackendFeatureListingController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [BackendFeatureListingController],
    }).compile();

    controller = module.get(BackendFeatureListingController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
