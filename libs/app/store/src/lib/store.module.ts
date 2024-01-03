import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxsModule} from '@ngxs/store';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {DEVTOOLS_REDUX_CONFIG, LOGGER_CONFIG, OPTIONS_CONFIG, STATES_MODULES} from '../store.config';
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";
import {NgxsFormPluginModule} from "@ngxs/form-plugin";
import {NgxsEmitPluginModule} from "@ngxs-labs/emitter";
import {HttpClientModule} from "@angular/common/http";
import {NgxsSelectSnapshotModule} from "@ngxs-labs/select-snapshot";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgxsStoragePluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    NgxsEmitPluginModule.forRoot(),
    NgxsSelectSnapshotModule.forRoot(),
    NgxsModule.forRoot(STATES_MODULES, OPTIONS_CONFIG),
    NgxsReduxDevtoolsPluginModule.forRoot(DEVTOOLS_REDUX_CONFIG),
    NgxsLoggerPluginModule.forRoot(LOGGER_CONFIG)
  ],
  exports: [NgxsModule]
})
export class StoreModule {}
