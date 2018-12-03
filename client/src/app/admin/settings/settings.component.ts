import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';
import { NotificationType } from "angular2-notifications";

import { IAppState } from '@store';

import { SettingAction } from '@global-reducers/setting.reducer';

import { SettingDispatch } from '@dispatch-classes/setting-dispatch.class';

import { Setting } from '@classes/setting.class';
import { AppNotification } from '@classes/app-notification.class';

import { SettingService } from '@services/setting.service';

import { NotificationSubject } from '@subjects/notification.subject';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
  form:FormGroup;
  isInProgress:boolean;
  setting:Setting;

  constructor(
    private _ngRedux:NgRedux<IAppState>,
    private _formBuilder:FormBuilder,
    private _settingService:SettingService,
    private _notificationSubject:NotificationSubject
  ) {
    this.isInProgress = false;
  }

  ngOnInit() {
    this.buildForm();
    this.watchSettingChange();
  }

  buildForm() {
    this.form = this._formBuilder.group({
      title: '',
      description: ''
    });
  }

  watchSettingChange() {
    this._ngRedux.select<Setting>('setting').subscribe(data => {
      this.setting = data;
      if(this.setting) this.patchForm();
    });
  }

  patchForm() {
    this.form.patchValue({
      title: this.setting.title,
      description: this.setting.description
    });
  }

  onUpdate() {
    let data = new Setting();
    data.title = this.form.value.title;
    data.description = this.form.value.description;

    this._settingService.save(data).subscribe(res => {
      if(res.isSuccess) {
        this._ngRedux.dispatch({ type: SettingAction.update, payload: data } as SettingDispatch);
      }

      let notification = new AppNotification({
        type: res.isSuccess ? NotificationType.Success : NotificationType.Error,
        title: res.isSuccess ? 'Success' : 'Error',
        text: res.isSuccess ? 'Settings updated' : 'Please try later'
      });

      this._notificationSubject.create(notification);
    });
  }

  onCancel() {
    if(this.setting) this.patchForm();
  }
}