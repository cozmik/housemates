import { Module } from '@nestjs/common';
import { ApiFeatureSchoolsController } from './api-feature-schools.controller';

@Module({
  controllers: [ApiFeatureSchoolsController],
  providers: [],
  exports: [],
})
export class ApiFeatureSchoolsModule {}
