import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { element } from 'protractor';
import { HomeService } from '../services/home.service';
import { AddComponent } from './add/add.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CarasoulEditComponent } from '../carasoul-edit/carasoul-edit.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeCarasoul: any = [];
  formData = new FormData();

  isLoading:boolean=true;
  carData:any = {}
  @ViewChild('countries') countries;
  // @ViewChild('hoverCountry') hoverCountry;
  hoverCountry = "Yoo";
  constructor(
    private _home: HomeService,
    public dialog: MatDialog
  ) { }

  selectedCountries: any = [];

  openFormDialog(type = '', id = ''): void {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '50%',

      data: { type, id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  async ngOnInit() {

    (await this._home.getCarousal()).subscribe((res: any) => {
      // console.log(res)
      this.isLoading = false;
      this.homeCarasoul = res.data
    })

    window.scroll(0, 0)
    console.log('init');
    // (await this._home.getCarousal()).subscribe( (res:any) => {
    //   console.log(res);

    // })

  }

  onKey(data) {
    let val = data.target.innerHTML
    let key = data.target.getAttribute('data-fieldName')
    this.carData[key] = val;

    

   
  }

  update(type:any , id:any){
    
 
    this.carData.type = type;
    console.log(this.carData);
 
  
    if(type == 1 || type==2 || type==3){
  
    
      this._home.editBanner(id , this.carData).then((res) => {
        res.subscribe((resp:any) => {
          console.log(resp);
          
          if (resp?.status) {
            Swal.fire('Hurray', resp.message, 'success').then(() => {
              window.location.reload()
            })
          }
        })
      })
    }
    
  
  }

  openUpdate(type:number , id:string){
    const dialogRef = this.dialog.open(CarasoulEditComponent, {
      width: '50%',

      data: { type, id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  async ngAfterViewInit() {
    await this.initMap(this._home);
  }

  async initMap(map) {

    async function addCountry(name) {
      (await map.addMap(name)).subscribe((res: any) => {
        console.log(res);
      })
    }

    async function deleteCountry(name) {
      (await map.deleteMap(name)).subscribe((res: any) => {
        console.log(res);
      })
    }

    async function hoverCountry(name) {
      this.hoverCountry = "name"
    }

    console.log(this.countries.nativeElement);

    var countryElements = this.countries.nativeElement.childNodes;

    (await map.getMap()).subscribe((res: any) => {
      console.log(res);
      // this.isLoading = false;
      this.selectedCountries = res.data;

      this.selectedCountries.forEach(element => {
        //  console.log(element.name);
        for (var i = 0; i < countryCount; i++) {
          let country = countryElements[i].getAttribute('data-name');
          if (country == element.name) {
            countryElements[i].style.fill = "#465354";
          }
        }
      });

      console.log(this.selectedCountries);

    })
    var countryCount = countryElements.length;


    for (var i = 0; i < countryCount; i++) {
      let fuck = i;
      let ct = countryElements[fuck].getAttribute('data-name');
      // console.log(ct)
      countryElements[fuck].setAttribute('matTooltip', ct);

      countryElements[i].onmouseover = function () {
        this.hoverCountry = this.getAttribute('data-name')
        // console.log(this.hoverCountry);
      }
      countryElements[i].onclick = function () {
        // alert('yo')
        // alert('You clicked on ' + this.getAttribute('data-name'));
        let cName = this.getAttribute('data-name');
        if (countryElements[fuck].style.fill == 'rgb(70, 83, 84)') {
          countryElements[fuck].style.fill = "lightgray";
          deleteCountry(cName);
        } else {
          countryElements[fuck].style.fill = "#465354";

          addCountry(cName);
        }
        console.log(cName);

      }

    }

    console.log(this.countries.nativeElement);
  }

}
