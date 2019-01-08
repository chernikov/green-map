import { Injectable, ErrorHandler, Inject, PLATFORM_ID } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

import * as ErrorStackParser from 'error-stack-parser';

import { StabilityErrorType } from '@enums/stability.enum';

import { StabilityItem } from '@classes/stability-item.class';

import { StabilityService } from '@services/stability.service';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService implements ErrorHandler {
  isClient:boolean;

  constructor(
    private _stabilityService:StabilityService,
    @Inject(PLATFORM_ID) _platformId
  ) {
    this.isClient = isPlatformBrowser(_platformId);
  }

  handleError(error) {
    if(this.isClient && error.name != "HttpErrorResponse") {
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