import { Injectable } from '@nestjs/common';
import { AppConfig } from './app.config';

export interface ServerVersionInfo {
  version: string;
}

@Injectable()
export class AppService {
  getVersion(): ServerVersionInfo {
    return { version: AppConfig.release };
  }
}
