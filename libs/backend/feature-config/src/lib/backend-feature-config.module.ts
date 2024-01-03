import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {appConfiguration, mongoConfiguration} from "@housemates/backend/utils-config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfiguration,
        mongoConfiguration
      ]
    })]
})
export class BackendFeatureConfigModule {
}
