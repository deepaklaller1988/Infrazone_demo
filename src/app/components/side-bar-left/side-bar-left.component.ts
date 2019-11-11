import { Component, OnInit, Input, HostListener,EventEmitter } from '@angular/core';
import { Router, NavigationEnd , ActivatedRoute  } from '@angular/router';
import { GeneralService } from '../../services/general.service';
import { ResponseHandlingService } from '../../services/response.handling.service';
import {ConfirmationDialogBoxComponent} from '../../components/confirmation-dialog-box/confirmation-dialog-box.component';
import {MatDialog} from '@angular/material';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { style } from '@angular/animations';
import { NgxUiLoaderService } from 'ngx-ui-loader'; 
import { ImageCropperComponent } from '../image-cropper/image-cropper.component'

@Component({
  selector: 'app-side-bar-left',
  templateUrl: './side-bar-left.component.html',
  styleUrls: ['./side-bar-left.component.css'],
  
})
export class SideBarLeftComponent implements OnInit {
  url;
  loading=100;
  total_earned_points=0;
  userdetails;
  profileComplete;
  seletedFile: File;
  document = document;
  userCity;
  userName;
  userImage;
  userDesignation;
  userOrganization;
  usercategory;
  selectedType;
  selectedTab;
  selectedFile;
  lastScrollTop: number = 0;
  count= 0;
	get_top_of_left_for_fixed = 0;
 
  @HostListener("window:scroll", ['$event'])
  onWindowScroll($event) {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    let left_bar = document.getElementsByClassName("left-bar")[0];
    let Middle_bar = document.getElementsByClassName("middle-bar")[0];
    let left_bar_height = left_bar.clientHeight;
    var middle_bar_height = Middle_bar.clientHeight;
    let Wheight = window.innerHeight;
    let new_left_height = left_bar_height - Wheight;
    let st = window.scrollY;
    let Right_bar = document.getElementsByClassName("right-bar")[0];
    let Right_bar_height = Right_bar.clientHeight;
    let dir = '';

    var set_top_on_left = document.getElementsByClassName('left-set')[0];
    if(left_bar_height > Right_bar_height){
      Middle_bar['style'].minHeight = left_bar_height+'px';
    }else{  
      Middle_bar['style'].minHeight = Right_bar_height+'px'; 
    }
    if(Wheight > left_bar_height+95){
      
      //left_bar.classList.add('sticky-top-left-bar')
      //Middle_bar.classList.add('sticky-top-middle-bar')
    }else{

      if(st == 0 ){
        left_bar.classList.remove('sticky-top-left-bar')
        //Middle_bar.classList.remove('sticky-top-middle-bar')

      }else{
        if(document.documentElement.scrollTop  >= new_left_height && window.outerWidth > 1024){
          // if(!left_bar.classList.contains('sticky-left-bar') && !Middle_bar.classList.contains('sticky-middle-bar')){
        
            if (st > this.lastScrollTop) {
                //down               
                left_bar.classList.remove('sticky-top-left-bar')               
                if(set_top_on_left['style'].top == "auto"){  
                  if(left_bar_height+95 <= st){                                    
                    let set_top = this.lastScrollTop;
                    set_top_on_left['style'].top = set_top +'px';
                    this.get_top_of_left_for_fixed = set_top; 
                  }else{                   
                    left_bar.classList.add('sticky-left-bar')                   
                  }
                }else{                 
                  let actual_top_left = set_top_on_left['style'].top.replace("px", "");                  
                  let plus_left = parseInt(actual_top_left)+ left_bar_height-530;  
                  if(actual_top_left > 0 ){
                    if(actual_top_left >= st)
                    {
                      left_bar.classList.add('sticky-left-bar')
                    }
                    if(st >= plus_left){
                      left_bar.classList.add('sticky-left-bar')
                    }
                  }
                }
                if(middle_bar_height > st){
                  Middle_bar.classList.add('sticky-middle-bar')
                }
                this.count= 0;
                
            } else {
                //up                
                left_bar.classList.remove('sticky-left-bar') 
                Middle_bar.classList.remove('sticky-middle-bar')   
                
                if( left_bar.classList.contains('sticky-top-left-bar')){                  
                  document.getElementsByClassName('left-bar')[0]['style'].top = 'auto';
                }

                if(this.count == 0){
                  if(this.lastScrollTop > 0){                  
                    let set_top:number = 0;
                    let vset_top :number = 0;                       
                    vset_top =  this.lastScrollTop - left_bar_height + 530;  
                    set_top = vset_top;
                    if(left_bar['style'].bottom){
                      //let footer_area = document.getElementsByClassName("footer_pennel")[0];
                     // footer_area['style'].marginTop = '100px';
                      set_top = set_top - left_bar['style'].bottom.replace("px", "") - 30;  
                      set_top_on_left['style'].top = set_top +'px';
                      this.get_top_of_left_for_fixed = set_top;      
                    }else{
                      set_top_on_left['style'].top = set_top +'px';
                      this.get_top_of_left_for_fixed = set_top; 
                    }                   
                  } else{
                    //set_top_on_left['style'].top = 0;  
                  } 
                }
                                
                if(this.get_top_of_left_for_fixed >= st){
                 
                  left_bar.classList.add('sticky-top-left-bar') 
                  set_top_on_left['style'].top = 'auto';
                  left_bar['style'].bottom = null;
                }
                this.count = 1;         
            }
            this.lastScrollTop = st;
          //}
        }else{
       
          left_bar.classList.remove('sticky-left-bar')
          Middle_bar.classList.remove('sticky-middle-bar')
          set_top_on_left['style'].top = "auto";
        }
      }
      
    }
    
  }

  scrollHandler(event) {
    
    console.debug("Scroll Event");
  }
  constructor(
    public router: Router, 
    public ngxService: NgxUiLoaderService,
    public generalService: GeneralService, 
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar 
       )
        {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = this.router.url;

        this.url = this.url.split(";")[0];  
    
      }    
    }); 
    // Get the total earned points 
    const data = {
      token: localStorage.getItem('TOKEN')
    }
    this.generalService.getTotalEarnedPoints(data).subscribe(res => {
      if(res){
        this.total_earned_points=res.userpoints;
       
      }     
    })
    this.generalService.userDetails.subscribe(res => {
      if(res){
        this.usercategory =  res.data.usercategory.length;
      }     
    })
  }
  ngOnInit() {
  
    this.generalService.userDetails.subscribe(res => {
       if(res){
        this.userdetails = res.data.userdetail
        this.userImage = res.data.userdetail.user_profile.image
        this.userDesignation = res.data.userdetail.user_profile.designation
        this.userOrganization=res.data.userdetail.user_profile.organisation;
        this.userCity = res.data.userdetail.city
         this.userName = res.data.userdetail.username
         this.profileComplete = res.data.userdetail.profile_completed;
         localStorage.setItem('user_details', JSON.stringify(res.data));
       }      
     })
	  let left_bar = document.getElementsByClassName("left-bar")[0];
    let Middle_bar = document.getElementsByClassName("middle-bar")[0];
    let left_bar_height = left_bar.clientHeight;
    let Wheight = window.innerHeight;

    if(Wheight > left_bar_height+95){
      left_bar.classList.add('sticky-top-left-bar')
      document.getElementsByClassName('left-bar')[0]['style'].top = 'auto';
      //Middle_bar.classList.add('sticky-top-middle-bar')
      //Middle_bar.classList.add('sticky-top-middle-bar')
    }
     console.log(' this.userName-->',  this.userName);

  }
   openNav(){
     let ResponsiveClass = document.getElementsByClassName("left-bar")[0];
     if(!ResponsiveClass.classList.contains('left-bar-mobile')){
       ResponsiveClass.classList.add("left-bar-mobile")
     }
   }

  closeNav(){
    let ResponsiveClass = document.getElementsByClassName("left-bar")[0];
    if(ResponsiveClass.classList.contains('left-bar-mobile')){
    ResponsiveClass.classList.remove('left-bar-mobile')
    }
  }
  

   onImageChange(event,p){
    const dialogRef = this.dialog.open(ImageCropperComponent, {
      data: {
        square:true,
        event: event
      }
     
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedFile = result;
      console.log(result);
      this.imageChangeFunction(result,p)

    });

  }
    imageChangeFunction(result,p){
     this.seletedFile = result;
    // this.seletedFile = event.target.files[0]
     const data = {
       token : localStorage.getItem('TOKEN'),
       image :this.seletedFile 
     }

     let formData:FormData = new FormData ();
     formData.append('image',this.seletedFile)
     formData.append('token',localStorage.getItem('TOKEN'))
     this.generalService.updateProfileImage(formData).subscribe((res)=>{
       if(res){
         if(res.code == 100){
           const data2 ={
             token:localStorage.getItem('TOKEN')
            }
             this.generalService.userDetail(data2).subscribe((res)=>{
              
             })
             this.snackBar.open('Profile Image Uploaded Successfully', '', {
              duration: 3000
            });
           }
         }
       })


      }
    
    
//set loder//
refreshPage(p) {
  this.ngxService.start();
  let refresh = {
    tab: this.selectedTab,
    type: this.selectedType,
    loading: false
  };
   this.ngxService.stop();
}

//close loder//

  lastScroll(){
      let value = window.scrollY;
      console.log('lastScroll',value);
      return value;
  
  }
}




































