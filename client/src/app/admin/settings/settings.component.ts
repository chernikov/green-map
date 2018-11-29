import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
  form:FormGroup;
  isInProgress:boolean;

  constructor(
    private _formBuilder:FormBuilder
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

  }

  onCancel() {

  }
}