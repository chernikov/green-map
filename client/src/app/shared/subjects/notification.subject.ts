import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { AppNotification } from '@classes/app-notification.class';

@Injectable({ providedIn: 'root' })
export class NotificationSubject {
    subject:Subject<AppNotification>;

    constructor() {
        this.subject = new Subject();
    }

    create(data:AppNotification) {
        this.subject.next(data);
    }

    watch():Observable<AppNotification> {
        return this.subject.asObservable();
    }
}