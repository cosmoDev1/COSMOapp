import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TitleCasePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { AuthService } from '@auth0/auth0-angular';

import { NewRescueDialogComponent } from '../new-rescue-dialog/new-rescue-dialog.component';
import { NewFosterDialogComponent } from '../new-foster-dialog/new-foster-dialog.component';
import { NewShelterDialogComponent } from '../new-shelter-dialog/new-shelter-dialog.component';
import { NewNetworkerDialogComponent } from '../new-networker-dialog/new-networker-dialog.component';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

import { AnimalDetailDialogComponent } from '../animal-detail-dialog/animal-detail-dialog.component';
import { Globals, Animal } from '../globals';
import { MyAnimalsDialogComponent } from '../my-animals-dialog/my-animals-dialog.component';
import { PleaDialogComponent } from '../plea-dialog/plea-dialog.component';
import { TagDialogComponent } from '../tag-dialog/tag-dialog.component';

@Component({
    selector: 'main-root',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit, OnInit {
    public shelters: any = [{ name: 'BARC', value: '0' }, { name: 'HCAS', value: '1' }];
    selectedCity = '1';
    selectedShelter = '0';
    selectedState = "TX";
    cities: any[] = [];

    dataSource = new MatTableDataSource<Animal>(this.global.animals);
    displayedColumns: string[] = ['action', 'imageURL', 'status', 'shelterAnimalID', 'name', 'gender', 'breed', 'weight', 'age', 'reason', 'outcomeRequest'];

    @ViewChild(MatSort, { static: false }) sort!: MatSort;
    @ViewChild('paginator', { static: true }) paginator!: MatPaginator;

    profileJson: string = '';
    constructor(private dialog: MatDialog, private http: HttpClient, public global: Globals, private title: Title, public auth: AuthService) {
        this.title.setTitle('COSMO - Loading your dashboard');

        this.auth.user$.subscribe((profile) => {
            console.log(profile)
            this.title.setTitle('COSMO - ' + profile!.name);
            this.global.rescueName = profile!.name!;
            this.profileJson = JSON.stringify(profile, null, 2);
        });

        this.auth.getAccessTokenSilently().subscribe((claims: any) => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
            });

        });
    }


    ngOnInit() { }

    ngAfterViewInit() { this.getData(); }

    onStateChange(selectedState: string) {
        console.log("State changed to:", selectedState);

        this.cities = this.global.allCities.filter(city => city.state === selectedState);
        console.log(this.cities);
    }

    getData() {
        var head = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: head };

        //this.http.get('http://localhost:5000/api/cities/protected').subscribe((res: any) => {
        this.http.get(this.global.webserviceBaseUrl + 'cities/protected').subscribe((res: any) => {
            console.log('cities loaded')
            if (res.status == "success") {
                this.global.allCities = res.data;
            }

            //this.http.get('http://localhost:5000/api/states/protected').subscribe((res: any) => {
            this.http.get(this.global.webserviceBaseUrl + 'states/protected').subscribe((res: any) => {
                console.log('states loaded')
                  console.log(res)
                  if (res.status == "success") {
                    this.global.states = res.data;
                    this.onStateChange(this.selectedState);
                }
            });
        });


        //this.http.get('http://localhost:5000/api/animals/protected?testSource=false').subscribe((res: any) => {
        this.http.get(this.global.webserviceBaseUrl + 'animals/protected?testSource=false&shelterId=6').subscribe((res: any) => {
            console.log(res);

            var cats = res.data[0].cats;
            var dogs = res.data[0].dogs;

            cats.forEach((el: any) => {
                var tmpAnimal: Animal = {
                    animalID: el.id,
                    shelterAnimalID: el.id,
                    shelterID: 'BARC',
                    name: this.global.capitalize(el.name),
                    dueOutDate: el.dueOutDate,
                    kennel: el.kennel,
                    weight: this.global.capitalize(el.weight.replace('lbs', '').replace('pounds', '')),
                    condition: el.condition,
                    daysShelter: el.daysShelter,
                    decription: el.decription,
                    gender: this.global.capitalize(el.gender),
                    age: this.global.capitalize(el.age),
                    spayNeuter: el.spayNeuter,
                    breed: this.global.capitalize(el.breed),
                    color: el.color,
                    hwFIVstatus: el.hwFIVstatus,
                    outcomeRequest: el.outcomeRequest,
                    reason: el.reason,
                    evalNotes: el.evalNotes,
                    species: this.global.capitalize('cat'),
                    volunteerNotes: '',
                    volunteerFavorite: false,
                    imageFile: 'https://cosmoapp.org/webservices/PDFdata/' + el.id + '.jpg',
                    status: 0,
                    youtubeLink: '',
                    facebookLink: ''
                };
                this.global.animals.push(tmpAnimal);
            });

            dogs.forEach((el: any) => {
                var tmpAnimal: Animal = {
                    animalID: el.id,
                    shelterAnimalID: el.id,
                    shelterID: 'BARC',
                    name: this.global.capitalize(el.name),
                    dueOutDate: el.dueOutDate,
                    kennel: el.kennel,
                    weight: this.global.capitalize(el.weight.replace('lbs', '').replace('pounds', '')),
                    condition: el.condition,
                    daysShelter: el.daysShelter,
                    decription: el.decription,
                    gender: this.global.capitalize(el.gender),
                    age: this.global.capitalize(el.age),
                    spayNeuter: el.spayNeuter,
                    breed: this.global.capitalize(el.breed),
                    color: el.color,
                    hwFIVstatus: el.hwFIVstatus,
                    outcomeRequest: el.outcomeRequest,
                    reason: el.reason,
                    evalNotes: el.evalNotes,
                    species: this.global.capitalize('dog'),
                    volunteerNotes: '',
                    volunteerFavorite: false,
                    imageFile: 'https://cosmoapp.org/webservices/PDFdata/' + el.id + '.jpg',
                    status: 0,
                    youtubeLink: '',
                    facebookLink: ''
                };
                this.global.animals.push(tmpAnimal);
            });

            //res.records.forEach((el: any) => {
            //    var tmpAnimal: Animal = { animalID: el.id.trim(), shelterAnimalID: el.fields.ID.trim(), shelterID: 'BARC', name: this.global.capitalize(el.fields.Name.trim()), species: this.global.capitalize(el.fields.Type.trim()), age: this.global.capitalize(el.fields.Age.trim()), breed: this.global.capitalize(el.fields.Breed.trim()), weight: this.global.capitalize(el.fields.Weight.trim().replace('lbs', '').replace('pounds', '')), hwfiv: el.fields['FELV/ FIV or HW Status'], intakeDate: el.fields['Date of intake'], shelterNotes: el.fields.Story.trim(), volunteerNotes: '', volunteerFavorite: false, gender: this.global.capitalize(el.fields.Gender.trim()), imageURL: el.fields['Image URL'][0].url.trim(), imageFile: el.fields['Image URL'][0].filename.trim(), status: 0 };
            //    this.global.animals.push(tmpAnimal);
            //});

            if (this.global.animals.length > 0) {
                this.dataSource = new MatTableDataSource(this.global.animals);
                //this.dataSource = this.animals;
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            }

            console.log(this.global.animals);
        });


        //this.http.get("https://v1.nocodeapi.com/casper/airtable/hOIlnPJwPYcZIyyL?tableName=BARC", options).subscribe((res: any) => {
        //this.http.get(this.global.webserviceBaseUrl+'values'+this.global.testSource, options).subscribe((res: any) => {
        //console.log(res);
        //}, (err: any) => { console.log(err); });
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

    newNetworkerDialog() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { role: 'Networker Account' };

        const dialogRef = this.dialog.open(NewNetworkerDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }

    myAnimalsDialog() {
        var tempAnimals = this.global.animals.filter((el) => el.status == 2);
        if (tempAnimals.length < 1) {
            const dialogConfig = new MatDialogConfig();

            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.data = { title: 'Notice', message: 'There are no animals tagged yet.', notification: true };

            const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

            return;
        }
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { role: 'My Dogs', rescueName: true, contactName: true };

        const dialogRef = this.dialog.open(MyAnimalsDialogComponent, dialogConfig);
    }

    myFosterDialog() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { title: 'Notice', message: 'There are no fosters created yet.', notification: true };

        const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

        return;
    }

    tagAnimal(ID: any, name: any) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.width = '900px';
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { title: 'Please confirm', message: 'An email will be sent to the shelter requesting a tag for the animal ' + name + ' (' + ID + ') on your behalf. ', notification: false };

        const dialogRef = this.dialog.open(TagDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((result) => {
            if (result == 'accept') {
                this.global.animals.forEach((el: any) => {
                    if (el.shelterAnimalID == ID) { el.status = 1; }
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
        dialogConfig.data = { title: 'Please confirm', message: 'The tag for the animal ' + name + ' (' + ID + ') was confirmed?', notification: false };

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
        dialogConfig.autoFocus = false;
        dialogConfig.width = '500px';
        dialogConfig.data = { animalInfo: info };

        const dialogRef = this.dialog.open(AnimalDetailDialogComponent, dialogConfig);


        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });

    }



    fosterPlea() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;
        dialogConfig.data = { role: 'My Dogs', rescueName: true, contactName: true };

        const dialogRef = this.dialog.open(PleaDialogComponent, dialogConfig);
    }


    //loginNew() { this.auth.loginWithRedirect(); }

    logout() { this.auth.logout({ logoutParams: { returnTo: document.location.origin } }); }

    call() {

    }

    login() {
        this.auth.loginWithRedirect({
            appState: {
                target: '/',
            },
        });

    }

}
