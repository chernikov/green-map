import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class RedirectToPolygonSubject {
    subject:Subject<string>;

    constructor() {
        this.subject = new Subject();
    }

    set(id:string) {
        this.subject.next(id);
    }

    watch() {
        return this.subject.asObservable();
    }
}