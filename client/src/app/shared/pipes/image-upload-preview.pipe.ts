import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Observer } from "rxjs";

@Pipe({ name: 'imageUploadPreview' })

export class ImageUploadPreviewPipe implements PipeTransform {
    transform(value:File | string):Observable<string> {
        return Observable.create((observer:Observer<any>) => {

            if(value instanceof File) {
                if(value && (value.type === "image/png" || value.type === "image/jpeg" || value.type === "image/jpg")) {
                    const reader = new FileReader();
                    reader.readAsDataURL(value);
                    reader.onload = () => {
                        observer.next(reader.result);
                        observer.complete();
                    }
                } else {
                    observer.complete();
                }
            } else {
                observer.next(value);
                observer.complete();
            }
        });
    }
}