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
import { MyFostersDialogComponent } from '../my-fosters-dialog/my-fosters-dialog.component';

import { endWith, timer } from 'rxjs';
import { InviteFosterDialogComponent } from '../invite-foster-dialog/invite-foster-dialog.component';
import { NewTransportDialogComponent } from '../new-transport-dialog/new-transport-dialog.component';
import { TransportDialogComponent } from '../transport-dialog/transport-dialog.component';

import { RequestFoodDialogComponent } from '../request-food-dialog/request-food-dialog.component';
import { BioDialogComponent } from '../bio-dialog/bio-dialog.component';
import { SuppliesRequestComponent } from '../supplies-request/supplies-request.component';


@Component({
    selector: 'main-root',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit, OnInit {
    public shelters: any = [{ name: 'BARC', value: '0' }, { name: 'HCAS', value: '1' }];
    selectedCity = '1';
    selectedShelter = '0';
    selectedState = 'TX';
    cities: any[] = [];
    refreshTimer = timer(0, 300000);
    refreshInProgress: boolean = false;
    myFosters = new MatTableDataSource<any>();

    dataSource = new MatTableDataSource<Animal>(this.global.animals);
    displayedColumns: string[] = ['action', 'imageURL', 'status', 'shelterAnimalID', 'name', 'gender', 'breed', 'weight', 'age', 'reason', 'outcomeRequest', 'dueOutDate'];

    @ViewChild(MatSort, { static: false }) sort!: MatSort;
    @ViewChild('paginator', { static: true }) paginator!: MatPaginator;

    profileJson: string = '';
    constructor(private dialog: MatDialog, private http: HttpClient, public global: Globals, private title: Title, public auth: AuthService) {
        this.title.setTitle('COSMO - Loading your dashboard');

        this.auth.user$.subscribe((profile) => {
            if (profile == null) { this.login(); }
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

        this.global.statesChange.subscribe(res => { this.onStateChange(this.selectedState); });
    }


    ngOnInit() { }

    ngAfterViewInit() {
        if (this.global.registerActive == false) {
            console.log('refresh active');
            const refreshTimerSub = this.refreshTimer.subscribe(val => this.refresh());
        }
    }

    onStateChange(selectedState: string) {
        console.log("State changed to:", selectedState);

        this.cities = this.global.allCities.filter(city => city.state === selectedState);
    }

    getData() {
        var head = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: head };
        this.refreshInProgress = true;

        //testSource=true to force download, false to skip download and use instead pre downloaded file on server
        this.http.get(this.global.webserviceBaseUrl + 'animals/prget?testSource=true&shelterId=6').subscribe((res: any) => {
             console.log(res);
             if (res.status == 'error') {
                      this.global.animalsLoading = false;
                      this.global.animalsError = res.description;
                      console.log('error loading animals');
                      return;
                }

             var cats = res.data[0].cats;
             var dogs = res.data[0].dogs;

             cats.forEach((el: any) => {
                      var tmpAnimal: Animal = {
                            id: el.id,
                            shelterAnimalId: el.shelterAnimalId,
                            shelterId: 6,
                            name: this.global.capitalize(el.name),
                            dueOutDate: el.dueOutDate,
                            kennel: el.kennel,
                            weight: this.global.capitalize(el.weight.replace('lbs', '').replace('pounds', '')),
                            condition: el.condition,
                            daysShelter: el.daysShelter,
                            description: el.description,
                            gender: this.global.capitalize(el.gender),
                            age: this.global.capitalize(el.age),
                            spayNeuter: el.spayNeuter,
                            breed: this.global.capitalize(el.breed),
                            color: el.color,
                            hwFIVstatus: el.hwFIVstatus,
                            outcomeRequest: el.outcomeRequest,
                            reason: el.reason,
                            evalNotes: el.evalNotes,
                            species: this.global.capitalize(el.species),
                            volunteerNotes: el.volunteerNotes,
                            volunteerFavorite: el.volunteerFavorite,
                            imageFile: 'https://cosmoapp.org/webservices/PDFdata/' + el.shelterAnimalId + '.jpg',
                            status: el.status,
                            statusInfo: el.statusInfo,
                            statusDate: el.statusDate,
                            youtubeLink: el.youtubeLink,
                            facebookLink: el.facebookLink,
                            addedDate: el.addedDate
                      };
                      this.global.animals.push(tmpAnimal);
                });

             dogs.forEach((el: any) => {
                      var tmpAnimal: Animal = {
                            id: el.id,
                            shelterAnimalId: el.shelterAnimalId,
                            shelterId: 6,
                            name: this.global.capitalize(el.name),
                            dueOutDate: el.dueOutDate,
                            kennel: el.kennel,
                            weight: this.global.capitalize(el.weight.replace('lbs', '').replace('pounds', '')),
                            condition: el.condition,
                            daysShelter: el.daysShelter,
                            description: el.description,
                            gender: this.global.capitalize(el.gender),
                            age: this.global.capitalize(el.age),
                            spayNeuter: el.spayNeuter,
                            breed: this.global.capitalize(el.breed),
                            color: el.color,
                            hwFIVstatus: el.hwFIVstatus,
                            outcomeRequest: el.outcomeRequest,
                            reason: el.reason,
                            evalNotes: el.evalNotes,
                            species: this.global.capitalize(el.species),
                            volunteerNotes: el.volunteerNotes,
                            volunteerFavorite: el.volunteerFavorite,
                            imageFile: 'https://cosmoapp.org/webservices/PDFdata/' + el.shelterAnimalId + '.jpg',
                            status: el.status,
                            statusInfo: el.statusInfo,
                            statusDate: el.statusDate,
                            youtubeLink: el.youtubeLink,
                            facebookLink: el.facebookLink,
                            addedDate: el.addedDate
                      };
                      this.global.animals.push(tmpAnimal);
                });

             if (this.global.animals.length > 0) {
                this.dataSource = new MatTableDataSource(this.global.animals);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;

                this.dataSource.sortingDataAccessor = (item: any, property) => {
                    switch (property) {
                        case 'dueOutDate': return new Date(item.dueOutDate);
                        default: return item[property];
                    }
                };
             }

            this.global.animalsLoading = false;
            this.refreshInProgress = false;

            console.log(this.global.animals);
        }, (error: any) => {
           this.global.animalsLoading = false;

           const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                width: '450px', data: { title: 'Error', message: error.message }
           });
           dialogRef.afterClosed().subscribe(result => { this.refreshInProgress = false; });
        });

        //this.http.get("https://v1.nocodeapi.com/casper/airtable/hOIlnPJwPYcZIyyL?tableName=BARC", options).subscribe((res: any) => {
    }

    refresh() {
        console.log('refreshing');
        if (this.refreshInProgress) { return; }

        this.global.animals = [];
        this.global.animalsLoading = true;
        this.global.animalsError = "";
        this.dataSource = new MatTableDataSource(this.global.animals);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (item: any, property) => {
            switch (property) {
                case 'dueOutDate': return new Date(item.dueOutDate);
                default: return item[property];
            }
        };

        this.getData();
    }

    newRescueDialog() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { role: 'Rescue Group', rescueName: true, contactName: true };

        const dialogRef = this.dialog.open(NewRescueDialogComponent, dialogConfig);
    }

    newFosterDialog() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { role: 'Foster', rescueName: true, contactName: true };

        const dialogRef = this.dialog.open(NewFosterDialogComponent, dialogConfig);
    }

    newShelterDialog() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { role: 'Shelter Account', rescueName: true, contactName: true };

        const dialogRef = this.dialog.open(NewShelterDialogComponent, dialogConfig);
    }

    newNetworkerDialog() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { role: 'Networker Account' };

        const dialogRef = this.dialog.open(NewNetworkerDialogComponent, dialogConfig);
    }

    newTransportDialog() {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { role: 'Transport Account' };

        const dialogRef = this.dialog.open(NewTransportDialogComponent, dialogConfig);

    }

    myAnimalsDialog() {
        var tempAnimals = this.global.animals.filter((el) => el.status > 99);
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
        dialogConfig.autoFocus = false;

        const dialogRef = this.dialog.open(MyAnimalsDialogComponent, dialogConfig);
    }

    myFosterDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;

        const dialogRef = this.dialog.open(MyFostersDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result.title != '') {
                const dialogConfig = new MatDialogConfig();

                dialogConfig.disableClose = true;
                dialogConfig.autoFocus = false;
                dialogConfig.data = { title: result.title, message: result.data, notification: true };

                const confDialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
            }
        });

    }

    transportDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;

        const dialogRef = this.dialog.open(TransportDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result.title != '') {
                const dialogConfig = new MatDialogConfig();

                dialogConfig.disableClose = true;
                dialogConfig.autoFocus = false;
                dialogConfig.data = { title: result.title, message: result.data, notification: true };

                const confDialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
            }
        });

    }


    tagAnimal(id: any, shelterAnimalId: string, name: string, species: string) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.width = '900px';
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;
        dialogConfig.data = { title: 'Please confirm', name: name, id: id, shelterAnimalId: shelterAnimalId, species: species, message: 'An email will be sent to the shelter requesting a tag for the '+species+' '+ name + ' (' + shelterAnimalId + ') on your behalf. ', notification: false };

        const dialogRef = this.dialog.open(TagDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((result) => {
              if (result.button == 'accept') {
                    this.http.post(this.global.webserviceBaseUrl + 'tag/prpost', result.tagInfo).subscribe((response: any) => {
                          console.log(response);

                          this.dialog.open(ConfirmationDialogComponent, { width: '350px',
                                data: { title: response.status.toUpperCase(), message: response.description }
                          });

                          this.refresh();
                    }, (error: any) => {
                          console.log(error)
                          this.dialog.open(ConfirmationDialogComponent, {
                                width: '350px',
                                data: { title: 'Error', message: error.message }
                          });

                          console.error('There was an error sending the data:', error);
                    });
              }
        });
    }

    confirmTagAnimal(id: any, shelterAnimalId: any, name: any, species: string) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;
        dialogConfig.data = { title: 'Please confirm', message: 'The tag for the ' + species + ' ' + name + ' (' + shelterAnimalId + ') was confirmed?', notification: false };

        const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((result) => {
            if (result == 'accept') {
                var tagInfo = { animalId: id, operationType: 200, operationInfo: "" }

                  this.http.post(this.global.webserviceBaseUrl + 'tag/prpost', tagInfo).subscribe((response: any) => {
                      console.log(response);
                      this.refresh();

                      this.dialog.open(ConfirmationDialogComponent, { width: '350px',
                          data: { title: response.status.toUpperCase(), message: response.description }
                      });
                  }, (error: any) => {
                      this.dialog.open(ConfirmationDialogComponent, {
                          width: '350px',
                          data: { title: 'error', message: error.message }
                      });

                      console.error('There was an error sending the data:', error);
                  });
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

        dialogRef.afterClosed().subscribe((result) => { if (result == 'update') { this.refresh(); }  });
    }

    fosterPlea() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;
        dialogConfig.data = { role: 'My Dogs', rescueName: true, contactName: true };

        const dialogRef = this.dialog.open(PleaDialogComponent, dialogConfig);
    }

    findFoster(id: any) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;

        const dialogRef = this.dialog.open(MyFostersDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((res: any) => {
            if (res.button=='select') {
                var tagInfo = { animalId: id, operationType: 300, operationInfo: res.data }

                this.http.post(this.global.webserviceBaseUrl + 'tag/prpost', tagInfo).subscribe((response: any) => {
                    console.log(response);
                    this.refresh();

                    this.dialog.open(ConfirmationDialogComponent, {
                        width: '350px',
                        data: { title: response.status.toUpperCase(), message: response.description }
                    });
                }, (error: any) => {
                    this.dialog.open(ConfirmationDialogComponent, {
                        width: '350px',
                        data: { title: 'error', message: error.message }
                    });

                    console.error('There was an error sending the data:', error);
                });

                ///show id of foster ONLY WHEN SELECTED. if user clicks cancel button, nothing happens

                //if (result.title != '') {
                //    const dialogConfig = new MatDialogConfig();

                //    dialogConfig.disableClose = true;
                //    dialogConfig.autoFocus = false;
                //    dialogConfig.data = { title: result.title, message: result.data, notification: true };

                //    const confDialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
                //}
                }
            });
    
    }

    inviteFosterDialog() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;
        dialogConfig.width = '500px';
        dialogConfig.data = { title: 'Invite a Foster', message: 'Input an Email' };

        const confDialogRef = this.dialog.open(InviteFosterDialogComponent, dialogConfig);
    }


    //loginNew() { this.auth.loginWithRedirect(); }

    logout() { this.auth.logout({ logoutParams: { returnTo: document.location.origin } }); }

    login() {
        this.auth.loginWithRedirect({
            appState: { target: '/' },
        });

      }

      testing123(){
          //here goes the code to open your dialog
          BioDialogComponent

          const dialogConfig = new MatDialogConfig();

          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.width = '600px';
          const dialogRef = this.dialog.open(BioDialogComponent, dialogConfig);
    }

    testingDaniel() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(RequestFoodDialogComponent, dialogConfig);

    }

    testing1234() {
        //here goes the code to open your dialog
        SuppliesRequestComponent

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '600px';
        const dialogRef = this.dialog.open(SuppliesRequestComponent, dialogConfig);
    }
}
