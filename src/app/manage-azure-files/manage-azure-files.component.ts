import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ManageAzureFilesService } from '../services/manage-azure-files.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MatDialog } from '@angular/material/dialog';
import { AddEditAzureFilesComponent } from './add-edit-azure-files/add-edit-azure-files.component';
import { AddEditAzureFilesNewComponent } from './add-edit-azure-files-new/add-edit-azure-files-new.component';
@Component({
  selector: 'app-manage-azure-files',
  templateUrl: './manage-azure-files.component.html',
  styleUrls: ['./manage-azure-files.component.scss']
})
export class ManageAzureFilesComponent implements OnInit {

  displayedColumns: string[] = ['index', 'name', 'link', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {

    console.log(filterValue)
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  

  constructor(private files: ManageAzureFilesService, public dialog: MatDialog) { }

  async ngOnInit() {
    (await this.files.getAll()).subscribe((res: any) => {
      this.dataSource = res.data

      console.log(res)
    })
  }

  openFormDialog(type = '', id = ''): void {
    const dialogRef = this.dialog.open(AddEditAzureFilesNewComponent, {
      width: '50%',

      data: { type, id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  async delete(id){

    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'Event will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.value) {
        (await this.files.deleteFile(id)).subscribe((res: any) => {
          if(res.status){
            Swal.fire(
              'Deleted!',
              'Deleted Successfully',
              'success'
            ).then(() => {
              setTimeout(() => { window.location.reload() }, 500);
            })
          }else{
            Swal.fire(
              'Failed to delete!',
              'Unable to delete.',
              'error'
            )
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        )
      }
    })
  }

}
