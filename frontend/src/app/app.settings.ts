import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class Settings {

  static get Api() { return environment.api; }
  static get BaseHref() { return environment.baseHref; }
  static get Prefix() { return environment.prefix; }

}
