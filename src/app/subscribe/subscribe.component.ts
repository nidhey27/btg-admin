import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  displayedColumns: string[] = ['id','email','subscribe url'];
  dataSource: MatTableDataSource<UserData>;

  isLoading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _http: HttpClient) {
    // let users = Array.from({ length: 100 }, (_, k) => this.createNewUser(k + 1));
    let users = [];

    this._http.get(`${environment.apiUrl}api/subscribe/get-all`).subscribe((res: any) => {
      console.warn(res)
      // users.push(res.data.name)


      res.data.forEach(element => {
        users.push({ id:element._id, email: element.email ,url:element.url })
      });
      console.log(users)
      // Assign the data to the data source for the table to render
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(users);

      // console.log(this.dataSource._data._value.length)
    })



  }

  ngOnInit(): void {
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
