import { Component, OnInit, ViewChild } from '@angular/core';
import { element } from 'protractor';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('countries') countries;
  // @ViewChild('hoverCountry') hoverCountry;
  hoverCountry = "Yoo";
  constructor(
    private _home: HomeService
  ) { }

  selectedCountries:any = [];

  async ngOnInit() {
    console.log('init');
    // (await this._home.getCarousal()).subscribe( (res:any) => {
    //   console.log(res);
      
    // })
    
  }


  async ngAfterViewInit(){
    await this.initMap(this._home); 
  }

  async initMap(map){
    
    async function addCountry(name){
      (await map.addMap(name)).subscribe( (res:any) => {
        console.log(res);
      })
    }

    async function deleteCountry(name){
      (await map.deleteMap(name)).subscribe( (res:any) => {
        console.log(res);
      })
    }

    async function hoverCountry(name){
      this.hoverCountry = "name" 
    }

    console.log(this.countries.nativeElement);

    var countryElements = this.countries.nativeElement.childNodes;
    
    (await map.getMap()).subscribe( (res:any) => {
      console.log(res);
      this.selectedCountries = res.data;

       this.selectedCountries.forEach(element => {
         console.log(element.name);
         for (var i = 0; i < countryCount; i++){
          let country = countryElements[i].getAttribute('data-name');
          if( country == element.name ){
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
      console.log(ct)
      countryElements[fuck].setAttribute('matTooltip',ct);

      countryElements[i].onmouseover = function() {
        this.hoverCountry = this.getAttribute('data-name')
        console.log(this.hoverCountry);
      }
      countryElements[i].onclick = function() {
        alert('yo')
        // alert('You clicked on ' + this.getAttribute('data-name'));
        let cName = this.getAttribute('data-name');
          if( countryElements[fuck].style.fill == 'rgb(70, 83, 84)' ){
            countryElements[fuck].style.fill = "lightgray";
            deleteCountry(cName);
          }else{
            countryElements[fuck].style.fill = "#465354";
            
            addCountry(cName);
          }
          console.log(cName);
          
      }
 
    }
    
    console.log(this.countries.nativeElement);
  }

}
