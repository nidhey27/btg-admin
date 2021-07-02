import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventsComponent } from '../events.component';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-add-edit-events',
  templateUrl: './add-edit-events.component.html',
  styleUrls: ['./add-edit-events.component.scss']
})
export class AddEditEventsComponent implements OnInit {
  type: string;
  id: string;
  getData: any = [];
  isLoading: boolean = true;
  eventsForm: any;
  submit: boolean = false;
  errorMsg: string = "";
  successMsg: string = "";
  constructor(
    public dialogRef: MatDialogRef<EventsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _event: EventsService
  ) { }

  ngOnInit(): void {
    this.type = this.data?.type;
    this.id = this.data?.id;
    this.isLoading = false;

    this.eventsForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      type: ['', [Validators.required]],
      venue: ['', [Validators.required]],
      url: ['', [Validators.required]],
      description: ['']
    });

    if(this.id){
      this.getSingleNews();
    }
  }

  async addForm() {
    if (this.eventsForm.invalid) {
      return;
    }
    
    this.submit = true;
    
      await (await (this._event.addEVent(this.eventsForm.value))).subscribe((response: any) => {
        if (response?.status) {
          this.errorMsg = "";

          this.successMsg = response?.message;
          this.submit = false;
          console.log(response)
          setTimeout(() => { window.location.reload() }, 1000)

        } else {
          this.submit = false;
          this.successMsg = "";
          this.errorMsg = response.message;
        }
      },(error: any) => {

      })
  }

  async editForm() {
    if (this.eventsForm.invalid) {
      return;
    }

    this.submit = true;
      console.log(this.eventsForm.value);
      
      await (await (this._event.editEvent(this.id, this.eventsForm.value))).subscribe((response: any) => {
        if (response?.status) {
          this.errorMsg = "";

          this.successMsg = response?.message;
          this.submit = false;
          console.log(response)
          setTimeout(() => { window.location.reload() }, 1000)

        } else {
          this.submit = false;
          this.successMsg = "";
          this.errorMsg = response.message;
        }this.id
      },(error: any) => {

      })
  }


  async getSingleNews(){
    (await (this._event.getSingleEvent(this.id))).subscribe( (res:any) => {
      console.log(res);
      this.eventsForm.setValue({
        name: res.data.name,
        start_date: res.data.start_date,
        end_date: res.data.end_date,
        type: res.data.type,
        venue: res.data.venue,
        url: res.data.url,
        description: res.data.description
      })
      console.log(this.eventsForm.value)
    })
  }

}
