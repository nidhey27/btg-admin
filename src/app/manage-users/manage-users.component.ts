import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from './history/history.component';


export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})

export class ManageUsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name','email', 'Registration Date', 'Action'];
  dataSource: MatTableDataSource<UserData>;

  isLoading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _http: HttpClient, public dialog: MatDialog) {
    // let users = Array.from({ length: 100 }, (_, k) => this.createNewUser(k + 1));
    let users = [];

    this._http.get(`${environment.apiUrl}api/user-auth/all-users`).subscribe((res: any) => {
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


  ngOnInit(): void {


  }

  openFormDialog(id, name): void {
    const dialogRef = this.dialog.open(HistoryComponent, {
      width: '100%',
      data: { id, name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}
