import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TitleCasePipe } from '@angular/common';

import { NewRescueDialogComponent } from './new-rescue-dialog/new-rescue-dialog.component';
import { NewFosterDialogComponent } from './new-foster-dialog/new-foster-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AnimalDetailDialogComponent } from './animal-detail-dialog/animal-detail-dialog.component';
import { Globals, Animal } from './globals';
import { NewShelterDialogComponent } from './new-shelter-dialog/new-shelter-dialog.component';
import { MyDogsDialogComponent } from './my-dogs-dialog/my-dogs-dialog.component';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'COSMO app';
  public cities: any = [{ name: 'Houston', value: '0' }, { name: 'San Antonio', value: '1' }, { name: 'Dallas', value: '2' }];
  public shelters: any = [{ name: 'BARC', value: '0' }, { name: 'HCAS', value: '1' }];
  selectedCity = '0';
  selectedShelter = '0';
  
  //animals: Array<Animal> = [];
  dataSource = new MatTableDataSource<Animal>(this.global.animals);
  displayedColumns: string[] = ['action', 'imageURL', 'status', 'shelterAnimalID', 'name', 'gender', 'breed', 'weight', 'age'];

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private http: HttpClient, public global: Globals) { }


  ngOnInit() { }

  ngAfterViewInit() { this.getData(); }

  getData() {
    var head = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: head };

      this.http.get("https://v1.nocodeapi.com/casper/airtable/hOIlnPJwPYcZIyyL?tableName=BARC", options).subscribe((res: any) => {
          console.log(res);

          res.records.forEach((el: any) => {
              var tmpAnimal: Animal = { animalID: el.id.trim(), shelterAnimalID: el.fields.ID.trim(), shelterID: 'BARC', name: this.global.capitalize(el.fields.Name.trim()), species: this.global.capitalize(el.fields.Type.trim()), age: this.global.capitalize(el.fields.Age.trim()), breed: this.global.capitalize(el.fields.Breed.trim()), weight: this.global.capitalize(el.fields.Weight.trim().replace('lbs', '').replace('pounds', '')), hwfiv: el.fields['FELV/ FIV or HW Status'], intakeDate: el.fields['Date of intake'], shelterNotes: el.fields.Story.trim(), volunteerNotes: '', volunteerFavorite: false, gender: this.global.capitalize(el.fields.Gender.trim()), imageURL: el.fields['Image URL'][0].url.trim(), imageFile: el.fields['Image URL'][0].filename.trim(), status: 0 };
              this.global.animals.push(tmpAnimal);
          });

          if (this.global.animals.length > 0) {
              this.dataSource = new MatTableDataSource(this.global.animals);
              //this.dataSource = this.animals;
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
          }

          console.log(this.global.animals);
      }, (err: any) => { console.log(err); });
  }

  refresh() {
    this.global.animals = [];
    this.dataSource = new MatTableDataSource(this.global.animals);
    //this.dataSource = this.animals;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    console.log('refreshing');

    this.getData();

  }
   
  newRescueDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { role: 'Rescue Group', rescueName: true, contactName: true };

    const dialogRef = this.dialog.open(NewRescueDialogComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  newFosterDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { role: 'Foster', rescueName: true, contactName: true };

    const dialogRef = this.dialog.open(NewFosterDialogComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

    newShelterDialog() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { role: 'Shelter Account', rescueName: true, contactName: true };

        const dialogRef = this.dialog.open(NewShelterDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }

    myDogsDialog() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { role: 'My Dogs', rescueName: true, contactName: true  };

        const dialogRef = this.dialog.open(MyDogsDialogComponent, dialogConfig);

        dialogRef.afterOpened().subscribe(() => {
            this.getData();
        });
        
    
    }

  tagAnimal(ID: any, name: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { title: 'Please confirm', message: 'Are you sure you want to request the tag for the animal ' + name + ' (' + ID + ')?' };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'accept') {
        this.global.animals.forEach((el: any) => {
          if (el.shelterAnimalID == ID) {
              el.status = 1;
              
            }
           
        });
          
        

        this.dataSource.data = this.global.animals;
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  confirmTagAnimal(ID: any, name: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { title: 'Please confirm', message: 'The tag for the animal ' + name + ' (' + ID + ') was confirmed?' };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'accept') {
        this.global.animals.forEach((el: any) => {
          if (el.shelterAnimalID == ID) {
            el.status = 2;
          }
        });

        this.dataSource.data = this.global.animals;
      }
    });
  }

  animalDetail(info: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = { animalInfo: info };

    const dialogRef = this.dialog.open(AnimalDetailDialogComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });

  }

}
