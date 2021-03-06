import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageUsersComponent } from '../manage-users.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  id: String = "";
  name: String = "";

  displayedColumns: string[] = ['id', 'name','email', 'Registration Date', 'Action'];
  dataSource: MatTableDataSource<UserData>;

  isLoading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private _http: HttpClient,
    public dialogRef: MatDialogRef<ManageUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
     // let users = Array.from({ length: 100 }, (_, k) => this.createNewUser(k + 1));
     let users = [];

     this._http.get(`${environment.apiUrl}api/download-history/${this.data?.id}`).subscribe((res: any) => {
       console.log(res)
       // users.push(res.data.name)
       
 
       res.data.forEach(element => {
         users.push({ id: element._id, name: element.name, reg_date: element.create_date, email: element.email })
       });
       console.log(users)
       // Assign the data to the data source for the table to render
       this.isLoading = false;
       this.dataSource = new MatTableDataSource(users);
 
       // console.log(this.dataSource._data._value.length)
     })
   }

  ngOnInit(): void {
    this.id = this.data?.id;
    this.name = this.data?.name;
    console.log(this.id)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
}
