import { Component, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';
import { GeneralService } from './services/general.service'
import { ConfirmationDialogBoxComponent } from './components/confirmation-dialog-box/confirmation-dialog-box.component';
import { MatDialog } from '@angular/material';
import { ResponseHandlingService } from './services/response.handling.service';


//import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {



  environment = environment.production;
  previousUrl: string;
  currentUrl: string;
  trigger;
  dialogRef;


  constructor(
    public GeneralService: GeneralService,
    public dialog: MatDialog,
    public responseHandlingService: ResponseHandlingService,
    private router: Router,
  
  ) {
  
    console.log('is environment production:- ' + this.environment);
    this.responseHandlingService.APIerror.subscribe(res=>{
      console.log(res);
      if (res) {
        const dialogRef = this.dialog.open(ConfirmationDialogBoxComponent, {
          data: {
            heading: 'Server not Reachable',
  
            content: 'Server not Reachable',
            done: 'OK',
            cancel: 'CANCEL'
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
        });
      }
    })

    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;        
        let ar1 = this.previousUrl.split(';');
        let ar2 = this.currentUrl.split(';');
        if(ar1[0] != ar2[0]){
          window.scrollTo(0, 0);
        }
      }
    });
  }



}

 


