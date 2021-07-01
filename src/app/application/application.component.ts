import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { CareerService } from '../services/career.service';



@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  displayedColumns: string[] = ['jobId', 'fullName', 'email', 'mobileNumber', 'cv', 'coverLetter', 'applicationDate'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private _career: CareerService
  ) { }

  ngOnInit(): void {
    this.getApplication();
  }

  async getApplication(){
    (await this._career.getCareerApplication()).subscribe( (res:any) => {
      console.log(res);
      this.dataSource = res.data
    })
  }

}
