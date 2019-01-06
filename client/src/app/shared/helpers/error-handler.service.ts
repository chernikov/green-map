import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import * as ErrorStackParser from 'error-stack-parser';

import { StabilityService } from '@services/stability.service';
import { StabilityItem } from '@classes/stability-item.class';
import { StabilityErrorType } from '@enums/stability.enum';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService implements ErrorHandler {

  constructor(
    private _stabilityService:StabilityService
  ) { }

  handleError(error) {
    if(error.name != "HttpErrorResponse") {
      let errorStacks = ErrorStackParser.parse(error);

      let data = new StabilityItem({
        url: window.location.href,
        message: error.message ? error.message : error.toString(),
        functionName: errorStacks && errorStacks.length ? errorStacks[0].functionName : null,
        type: StabilityErrorType.webApp,
        addedDate: new Date
      });
  
      let jwtToken = localStorage.getItem('authToken');
      if(jwtToken) data.jwtToken = jwtToken;
  
      this._stabilityService.save(data).subscribe();
    }
  }
}