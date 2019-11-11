import {
  Component,
  OnInit,
  HostListener,
  OnDestroy,
} from '@angular/core';
import {
  GeneralService
} from '../../services/general.service';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { type } from 'os';


@Component({
  selector: 'app-feeds,number-pipe',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css'],
  

})

export class FeedsComponent implements OnInit, OnDestroy {

  userdetails;
  posts = [];
  weeklyExperts = [];
  selectedTab;
  selectedType;
  selectedPage;
  loadingPosts;
  loadMore = false;
  categories = localStorage.getItem('user_details')? JSON.parse(localStorage.getItem('user_details')).usercategory : [];
  categoryName = 'loading...';
  userCategory;
  timer;
  weeklyExpertsLoad;
  refreshing = false;
  last_page;

  constructor(
    public generalService: GeneralService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
    public activatedRoute: ActivatedRoute,
 
  ) {
    
    this.activatedRoute.params.subscribe(params => {
      if (params['tab'] && params['type'] && params['page']) {
        this.selectedTab = params['tab'];
        this.selectedType = params['type'];
        this.selectedPage = this.posts.length > 0 ? params['page'] : 1;
      } else {
        this.selectedTab  = '1';
        this.selectedType = '0';
        this.selectedPage = 1;
      }
    });

    //this.weeklyTopScorerCategory();
   

  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
	
    var loadMore = this.loadMore
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos == max) {
      if (Number(this.selectedPage) < Number(this.last_page)) {
        loadMore = this.loadMore = true;
        this.selectedPage = Number(this.selectedPage) + 1;
        // }
        this.router.navigate(['/feeds', {
          tab: this.selectedTab,
          type: this.selectedType,
          page: this.selectedPage
        }]).then(() => {
          this.getPosts(this.selectedTab, this.selectedType, this.selectedPage, false);
        })
      }
    }    
  }

  ngOnInit() {
    
    if(JSON.parse(localStorage.getItem('USERCATEGORIES')).length == 0){
      this.router.navigate(['/select-categories']);
      return;    
    }
    const data2 = {
      token: localStorage.getItem('TOKEN'),
    }
    this.generalService.userDetail(data2).subscribe((res) => { })
    this.generalService.userDetails.subscribe(res => {
      console.log(res)
      this.categories = res.data.usercategory;
      // this.timer = setInterval(() => {
      //   this.weeklyTopScorerCategory();
      // }, 10000);
      this.weeklyTopScorerCategory();
    })

    

    this.router.navigate(['/feeds', { 
      tab: this.selectedTab,
      type: this.selectedType,
      page: this.selectedPage
    }]).then(() => {
      this.getPosts(this.selectedTab, this.selectedType, this.selectedPage, true);
    });
  }

  postSearch(posts) {
    this.posts = posts
    console.log(this.posts, "posts in feeds");
  }

  refresh(refresh) {
    if (this.refreshing == false) {
      this.refreshing = true;
      this.getPosts(refresh.tab, refresh.type, refresh.page, refresh.loading);
    }
  }

  getPosts(tab, type, page, loadingPosts) {
    this.loadingPosts = loadingPosts;
    this.selectedTab = tab;
    this.selectedType = type;
    this.selectedPage = this.refreshing ? this.selectedPage : page;
    this.posts = (this.selectedPage && loadingPosts) == 1 ? [] : this.posts;
    this.router.navigate(['/feeds', {
      tab: this.selectedTab,
      type: this.selectedType,
      page: this.selectedPage
    }]).then(() => {  
      const data = { 
        filter: this.selectedTab,
        type: this.selectedType,
        token: localStorage.getItem('TOKEN')
      };
      this.generalService.getPost(data, this.refreshing ? page : this.selectedPage).subscribe((res) => {
        if (res) {
          console.log(res);
          this.last_page = res.data.posts.last_page;
          if (this.refreshing) {
            this.posts.forEach((element, key) => {
              if (element.current_page == res.data.posts.current_page) {
                this.posts.splice(key, 1, res.data.posts);
                var event = new Event('post_update');
                window.dispatchEvent(event);
              }
            });
          }
          else {
            this.posts.push(res.data.posts);
          }
          this.loadingPosts = false;
          this.refreshing = false
          this.loadMore = false;
        }
      })
    })
  }

  weeklyTopScorerCategory() {
    
    this.weeklyExpertsLoad = true;
    this.userCategory = this.categories[Math.floor(Math.random() * this.categories.length)];
    
    if (this.userCategory != undefined) {
      
      const data = {
        token: localStorage.getItem('TOKEN'),
        limit: '3',
        category_id: this.userCategory.category_id
      };
      this.generalService.weeklyTopScorerCategory(data).subscribe((res) => {
        if (res) {
          this.weeklyExpertsLoad = false;
          this.categoryName = this.userCategory.categoryname;
          //this.weeklyExperts = res.data.users[this.categoryName];
          
          
          this.weeklyExperts = res.data.users;
        }
      })
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

}
