import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { ManageDatasheetsService } from '../services/manage-datasheets.service';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-manage-data-sheets',
  templateUrl: './manage-data-sheets.component.html',
  styleUrls: ['./manage-data-sheets.component.scss']
})
export class ManageDataSheetsComponent implements OnInit {

  @ViewChild('tabGroup') tabGroup;
  pdfURL = '';
  id: String = '';
  pName: String = '';
  categories: any = [];
  dataSheets: any = [];
  constructor(private _activatedRoute: ActivatedRoute, private _dataSheet: ManageDatasheetsService
    , public dialog: MatDialog) { }

  showPDF(url) {
    this.pdfURL = url
  }
  async ngOnInit() {
    window.scroll(0, 0)
    // Get id
    this._activatedRoute.params.subscribe(params => {
      this.id = params['id']
      this.pName = params['name']
    });

    (await this._dataSheet.getCategories(this.id)).subscribe((res: any) => {
      console.log(res)
      this.categories = res?.data
    })


  }

  // ngAfterViewInit() {
  //   console.log('afterViewInit => ', this.tabGroup.selectedIndex);
  // }
  async tabChanged(tabChangeEvent: MatTabChangeEvent) {
    // console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);

    // console.log(this.categories[tabChangeEvent.index])
    let parentId = this.categories[tabChangeEvent.index].parentId
    let categoryId = this.categories[tabChangeEvent.index]._id

      ; (await this._dataSheet.getDataSheets(parentId, categoryId)).subscribe((res: any) => {
        // console.log(res)
        this.dataSheets = res.data
      })
  }

  deleteCat() {
    alert('clicked')
  }

  openFormDialog(type, cat, pid, cid = ''): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '50%',

      data: { type, cat, pid, cid }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}
