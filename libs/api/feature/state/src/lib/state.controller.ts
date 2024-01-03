import {Controller, Get, Param} from "@nestjs/common";
import {ApiParam, ApiTags} from "@nestjs/swagger";
import {StateService} from "./state.service";

@Controller('states')
@ApiTags('states')
export class StateController {
  constructor(private readonly stateService: StateService) {
  }

  @Get()
  async getStates() {
    return this.stateService.states.getValue();
  }

  @Get(':id')
  @ApiParam({name: 'id', example: 'lagos'})
  async getStateLga(@Param() param: any) {
    return this.stateService.getLGA(param.id);
  }
}
