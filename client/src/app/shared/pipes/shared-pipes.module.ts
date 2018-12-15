import { NgModule } from '@angular/core';
import { ImageUploadPreviewPipe } from './image-upload-preview.pipe';

@NgModule({
    imports: [ ],
    declarations: [
        ImageUploadPreviewPipe
    ],
    exports: [
        ImageUploadPreviewPipe
    ]
})

export class SharedPipesModule { }