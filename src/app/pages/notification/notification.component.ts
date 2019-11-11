import { Component, OnInit, HostListener,EventEmitter } from "@angular/core";
import { GeneralService } from "../../services/general.service";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";
import { Router, ActivatedRoute } from "@angular/router";
import { element } from "protractor";
import { NgxUiLoaderService } from 'ngx-ui-loader'; 

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"]
})

export class NotificationComponent implements OnInit {
  postSearch;
  notifications = [];
  selectedPage;
  // notificationLength;
  loadingPosts;
  refreshing = false;
  loadMore = false;
  last_page;
  userID;
  selectedTab;
  selectedType;
  emit;


  constructor(
    public generalService: GeneralService,
    public snackBar: MatSnackBar,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public ngxService: NgxUiLoaderService
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params["page"]) {
        this.selectedPage = this.notifications.length > 0 ? params["page"] : 1;
      } else {
        this.selectedPage = 1;
      }
    });
  }


  ngOnInit() {
    this.ngxService.start()
    const data2 = {
      token: localStorage.getItem("TOKEN")
    };

    this.generalService.userDetail(data2).subscribe(res => {});
    this.generalService.userDetails.subscribe(res => {
      this.userID = res.data.userdetail.id;
    });
    this.router
      .navigate([
        "/notification",
        {
          page: this.selectedPage
        }
      ])
      .then(() => {
        this.getNotification(this.selectedPage, true);
        this.ngxService.stop()
      });
  }
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    var loadMore = this.loadMore;

    if (pos == max) {
      if (Number(this.selectedPage) < Number(this.last_page)) {
        loadMore = this.loadMore = true;
        this.selectedPage = Number(this.selectedPage) + 1;

        this.router
          .navigate([
            "/notification",
            {
              page: this.selectedPage
            }
          ])
          .then(() => {
            this.getNotification(this.selectedPage, false);
          });
      }
    }
  }

  refresh(refresh) {
    if (this.refreshing == false) {
      this.refreshing = true;
      this.getNotification(refresh.page, refresh.loading);
    }
  }
  refreshPage(p) {
    this.ngxService.start();
    let refresh = {
      tab: this.selectedTab,
      type: this.selectedType,
    //  page: this.notifications[p].current_page,
      loading: false
    };
    this.refresh(refresh);
    
    this.ngxService.stop();
  }

  //Delete single notification
  deleteNotification(id, event){
    const notification_data = {
      notification_id: id,
      token: localStorage.getItem("TOKEN")
    };
    event.stopPropagation();
    this.generalService.deleteNotification(notification_data).subscribe(res => {
      if(res){
       
        this.getNotification(this.selectedPage, true);
      }
    });   
  }

  //Delete all notifications
  deleteAllNotifications(p=1){
    const notification_data = {
      token: localStorage.getItem("TOKEN")
    };
    event.stopPropagation();
    this.generalService.deleteAllNotifications(notification_data).subscribe(res => {
      if(res){
        this.refreshPage(p);
        this.getNotification(this.selectedPage, true);
      }
      
    }); 
    
      
  }
  getNotification(page, loadingPosts) {
    this.loadingPosts = loadingPosts;
    this.selectedPage = this.refreshing ? this.selectedPage : page;
    this.notifications =
      (this.selectedPage && loadingPosts) == 1 ? [] : this.notifications;

    this.router
      .navigate([
        "/notification",
        {
          page: this.selectedPage
        }
      ])
      .then(() => {
        const data = {
          token: localStorage.getItem("TOKEN")
        };
        this.generalService
          .getNotification(data, this.refreshing ? page : this.selectedPage)
          .subscribe(res => {
            if (res) {
              console.log('------->',res)
              this.last_page = res.data.notification.last_page;
              if (this.refreshing) {
                this.notifications.forEach((element, key) => {
                  if (
                    element.current_page == res.data.notification.current_page
                  ) {
                    this.notifications.splice(key, 1, res.data.notification);
                  }
                });
              } else {
                this.notifications.push(res.data.notification);
              }
              this.loadingPosts = false;
              this.refreshing = false;
              this.loadMore = false;
            }
          });
      });
  }

  notificationViewstatus(id, postid, viewstatus) {
    
    if (viewstatus == 0) {
      const data = {
        notification_id: id,
        token: localStorage.getItem("TOKEN")
      };
      this.generalService.notificationViewstatus(data).subscribe(res => {
        if (res) {
          if (res.code == "100") {
            //this.router.navigate(["notification-post/", postid]);
            this.router.navigate(["post/", postid]);
          }
        }
      });
    } else {
      //this.router.navigate(["notification-post/", postid]);
      this.router.navigate(["post/", postid]);
    }
  }
}
