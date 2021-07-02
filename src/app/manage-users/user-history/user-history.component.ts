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
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})
export class UserHistoryComponent implements OnInit {

  id: String = "";
  name: String = "";

  displayedColumns: string[] = ['category', 'sheetName','sheetLang', 'downloadDate'];
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
    // this.data.id = '60d1a48a8d99f74084adf3d8';
     this._http.get(`${environment.apiUrl}api/download-history/${this.data?.id}`).subscribe((res: any) => {
       console.log(res)
       // users.push(res.data.name)
       
 
       res.data.forEach(element => {
         users.push({ 
           category: element.categoryData.name, 
           sheetName: element.sheetData.name, 
           sheetLang: element.sheetData.language, 
           downloadDate: element.udata.downloadDate
          })
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
