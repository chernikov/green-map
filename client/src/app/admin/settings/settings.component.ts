import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Setting } from '@classes/setting.class';

import { SettingService } from '@services/setting.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
  form:FormGroup;
  isInProgress:boolean;

  constructor(
    private _formBuilder:FormBuilder,
    private _settingService:SettingService
  ) {
    this.isInProgress = false;
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this._formBuilder.group({
      title: '',
      description: ''
    });
  }

  onUpdate() {
    let data = new Setting();
    data.title = this.form.value.title;
    data.description = this.form.value.description;

    this._settingService.save(data).subscribe(res => {
      console.log(res);
    });
  }

  onCancel() {

  }
}