import { NotificationType } from "angular2-notifications";

export class AppNotification implements IAppNotification {
    type:NotificationType;
    title:string;
    text:string;

    constructor(data?: IAppNotification) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
}

export interface IAppNotification {
    type:NotificationType;
    title:string;
    text:string;
}