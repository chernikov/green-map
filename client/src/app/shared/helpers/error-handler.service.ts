import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(error) {
    console.log(error);
 }
}