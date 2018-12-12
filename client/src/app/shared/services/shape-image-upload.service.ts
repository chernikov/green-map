import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { FileUploadResponse } from '@classes/file-upload-response.class';

@Injectable({ providedIn: 'root' })
export class ShapeImageUploadService {
  private apiUrl:string = '/api/shape-image-upload';

  constructor(
    private _http:HttpClient
  ) { }

  upload(files:File[]):Observable<FileUploadResponse> {
    let formData = new FormData();
    for(let file of files) formData.append("files", file, file['name']);

    return this._http.post<FileUploadResponse>(this.apiUrl, formData).pipe(map(res => res != null ? FileUploadResponse.fromJS(res) : null));
  }
}
