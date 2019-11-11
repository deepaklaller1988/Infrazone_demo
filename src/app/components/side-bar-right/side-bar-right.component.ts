import { Component, OnInit,Input,HostListener, AfterViewInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';
@Component({
  selector: 'app-side-bar-right',
  templateUrl: './side-bar-right.component.html',
  styleUrls: ['./side-bar-right.component.css'] 
})

export class SideBarRightComponent implements OnInit, AfterViewInit {
  userData;
  usercategory;
  option;
  lastScrollTop: number = 0;
  count= 0;
	get_top_of_right_for_fixed = 0;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    let Right_bar = document.getElementsByClassName("right-bar")[0];
    let Right_bar_height = Right_bar.clientHeight;
    let Wheight = window.innerHeight;
    let new_Right_height = Right_bar_height -Wheight;
    let st = window.pageYOffset;
    let set_top_on_right = document.getElementsByClassName('right-set')[0];
    
    if(Wheight > Right_bar_height+95){
      Right_bar.classList.add('sticky-top-right-bar')
      Right_bar['style'].top = 'auto';

    }else{
      if(st == 0 ){
        Right_bar.classList.remove('sticky-top-right-bar')
      }else{
        if(document.documentElement.scrollTop >= new_Right_height && window.outerWidth > 1024){
        
          // if(!Right_bar.classList.contains('sticky-Right-bar')){
          //   Right_bar.classList.add('sticky-Right-bar') 
          //   }
          if (st > this.lastScrollTop) {
            //down
            
            Right_bar.classList.remove('sticky-top-right-bar');
            if(set_top_on_right['style'].top == "auto"){
            
              if(Right_bar_height+95 >= st){
                Right_bar.classList.add('sticky-Right-bar')
              }
              if(Right_bar_height+95 <= st){                                    
                let set_top = this.lastScrollTop;
                set_top_on_right['style'].top = set_top +'px';
                this.get_top_of_right_for_fixed = set_top; 
              }
            }else{
              
              let actual_top = set_top_on_right['style'].top.replace("px", "");
              let plus = parseInt(actual_top)+ Right_bar_height - 530;
             
              if(actual_top > 0 ){
                if(actual_top >= st)
                {
                  Right_bar.classList.add('sticky-Right-bar')
                }
                if(st >= plus){
                  Right_bar.classList.add('sticky-Right-bar')
                }
              }
            }
            this.count= 0;  
          }
          else{
            //up
            Right_bar.classList.remove('sticky-Right-bar');

            if( Right_bar.classList.contains('sticky-top-right-bar')){                  
              document.getElementsByClassName('right-bar')[0]['style'].top = 'auto';
            }

            if(this.count == 0){
              if(this.lastScrollTop > 0){
               
                let set_top:number =0;
                let vset_top :number =0;                
                vset_top =  this.lastScrollTop - Right_bar_height+530; 
                set_top = vset_top;
                if(Right_bar['style'].bottom){               
                  set_top = set_top - Right_bar['style'].bottom.replace("px", "") - 30;  
                  set_top_on_right['style'].top = set_top +'px';
                  this.get_top_of_right_for_fixed = set_top;      
                }else{
                  set_top_on_right['style'].top = set_top +'px';
                  this.get_top_of_right_for_fixed = set_top; 
                }                
              } else{
                //set_top_on_left['style'].top = 0;  
              } 
            }
            if(this.get_top_of_right_for_fixed){
              if(this.get_top_of_right_for_fixed >= st){
               set_top_on_right['style'].top = 'auto';
                Right_bar.classList.add('sticky-top-right-bar') 
                Right_bar['style'].bottom = null;
              
              }
            }
          
            this.count = 1;    
          }
          this.lastScrollTop = st;   
        }
        else{
          Right_bar.classList.remove('sticky-Right-bar')
          set_top_on_right['style'].top = "auto";
          
          //Right_bar.classList.remove('sticky-top-right-bar')
        }
      }
    }
  }

  constructor(public generalService: GeneralService,) { 
    this.generalService.userDetails.subscribe(res => { 
      if(res){
        this.usercategory =  res.data.usercategory;
      }     
    }) 
  }

  ngOnInit() {

    //setTimeout(function(){ 
     
    //}, 2000);
    document.getElementsByClassName('right-bar')[0]['style'].top = 'auto';
	  
  }
 
  openFeedsOption(i) {
    if (this.option == i) {
      this.option = undefined;
    } else {
      this.option = i
    }
  }

  ngAfterViewInit(){
    let Right_bar = document.getElementsByClassName("right-bar")[0];
    let Wheight = window.innerHeight;
    let Right_bar_height = Right_bar.clientHeight;
    let set_top_on_right = document.getElementsByClassName('right-set')[0];
    
    if(Wheight > Right_bar_height+95){
      Right_bar.classList.add('sticky-top-right-bar')
      set_top_on_right['style'].top = "auto";
      
    }
    
  }
}
