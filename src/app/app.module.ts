// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'ngx-rating';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule ,MatNativeDateModule} from '@angular/material';
import { MatInputModule } from '@angular/material';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from "angular-6-social-login";
import {
  MatDialogModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTooltipModule
} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { ImageCropperModule } from 'ngx-image-cropper';
import { DeviceDetectorModule } from 'ngx-device-detector';



// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { SelectCategoriesComponent } from "./pages/select-categories/select-categories.component";
import { FeedsComponent } from './pages/feeds/feeds.component';
import { ShareComponent } from './components/share/share.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { VerifyForgetPasswordComponent } from './pages/verify-forget-password/verify-forget-password.component';
import { UpdateNewPasswordComponent } from './pages/update-new-password/update-new-password.component';
import { GetInviteUserListComponent } from './components/get-invite-user-list/get-invite-user-list.component';
import { OtpDialogBoxComponent } from './components/otp-dialog-box/otp-dialog-box.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { HelpComponent } from './pages/help/help.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideBarLeftComponent } from './components/side-bar-left/side-bar-left.component';
import { SideBarRightComponent } from './components/side-bar-right/side-bar-right.component';
import { FeedPostsComponent } from './components/feed-posts/feed-posts.component';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';


// Pipes
import { TimeAgoPipe } from 'time-ago-pipe';
import { LinkyModule } from 'angular-linky';


// Services
import { UserService } from './services/user.service';
import { GeneralService } from './services/general.service';
import { ResponseHandlingService } from './services/response.handling.service';
import { AuthGuardService } from './services/auth.guard.service';
import { RegisterComponent } from './pages/register/register.component';
import { JobHistoryComponent } from './pages/job-history/job-history.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { AddWorkDetailComponent } from './pages/add-work-detail/add-work-detail.component';
import { ReportComponent } from './components/report/report.component';
import { FollowersComponent } from './pages/followers/followers.component';
import { ExpertPopupComponent } from './components/expert-popup/expert-popup.component';
import { AcceptRejectFollowComponent } from './pages/accept-reject-follow/accept-reject-follow.component';
import { ExpertProfileComponent } from './pages/expert-profile/expert-profile.component';
import { SavePostsComponent } from './pages/save-posts/save-posts.component';
import { ViewSaveImageComponent } from './pages/view-save-image/view-save-image.component';
import { ConfirmationDialogBoxComponent } from './components/confirmation-dialog-box/confirmation-dialog-box.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { GetNameDialogBoxComponent } from './components/get-name-dialog-box/get-name-dialog-box.component';
import { AddGroupMemberComponent } from './pages/add-group-member/add-group-member.component';
import { UserSettingComponent } from './pages/user-setting/user-setting.component';
import { UserAccountSettingComponent } from './pages/user-account-setting/user-account-setting.component';
import { WinnersComponent } from './pages/winners/winners.component';
import { ExpertReviewComponent } from './components/expert-review/expert-review.component';
import { SponsorChatReviewComponent } from './components/sponsor-chat-review/sponsor-chat-review.component';
import { MessageComponent } from './pages/message/message.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { RatingDialogBoxComponent } from './components/rating-dialog-box/rating-dialog-box.component';
import { ExpertChatComponent } from './pages/expert-chat/expert-chat.component';
import { EarnPointsComponent } from './pages/earn-points/earn-points.component';
import { ProgressBarPopupComponent } from './components/progress-bar-popup/progress-bar-popup.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NotificationPostComponent } from './pages/notification-post/notification-post.component';
import { CategoryPostComponent } from './pages/category-post/category-post.component';
import { SearchPostComponent } from './pages/search-post/search-post.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import {PointEarnedComponent} from './pages/point-earned/point-earned.component';


import {SanitizeHtmlPipe} from './pipes/sanitizehtml.pipe';
import {NotificationStringFormatPipe} from './pipes/notificationStringFormat.pipe';

import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION } from  'ngx-ui-loader';

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("534503717061764")
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        //provider: new GoogleLoginProvider("1033079640476-32qmhp2auofcls4s1dfh2uflmk06j9oh.apps.googleusercontent.com")
        provider: new GoogleLoginProvider("261560833481-e2kh86d2ou7rh3gbobqaa2okt17bd60g.apps.googleusercontent.com")
      },
      // {
      //   id: LinkedinLoginProvider.PROVIDER_ID,
      //   provider: new LinkedinLoginProvider("1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com")
      // },
    ]
  );
  return config;
}

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#fff !important',
  fgsColor: '#fff !important',
  bgsPosition: POSITION.centerCenter,
  fgsPosition: POSITION.centerCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce,
  fgsType: SPINNER.rectangleBounce,
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
};


@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'Infra Zone' }),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RatingModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatNativeDateModule ,
    MatInputModule,
    SocialLoginModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDatepickerModule,
    InfiniteScrollModule,
    GooglePlaceModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    LinkyModule,
    ImageCropperModule,
    DeviceDetectorModule.forRoot(),
    
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    ProfileComponent,
    VerifyComponent,
    SelectCategoriesComponent,
    FeedsComponent,
    RegisterComponent,
    AboutUsComponent,
    TimeAgoPipe,
    ShareComponent,
    ForgetPasswordComponent,
    VerifyForgetPasswordComponent,
    UpdateNewPasswordComponent,
    GetInviteUserListComponent,
    OtpDialogBoxComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    ContactUsComponent,
    HelpComponent,
    MyProfileComponent,
    FooterComponent,
    SideBarLeftComponent,
    SideBarRightComponent,
    FeedPostsComponent,
    ViewProfileComponent,
    AddPostComponent,
    JobHistoryComponent,
    NotificationComponent,
    AddWorkDetailComponent,
    ReportComponent,
    FollowersComponent,
    ExpertPopupComponent,
    AcceptRejectFollowComponent,
    ExpertProfileComponent,
    SavePostsComponent,   
    ImageCropperComponent,
    ViewSaveImageComponent,
    ConfirmationDialogBoxComponent,
    GroupsComponent,
    GetNameDialogBoxComponent,
    AddGroupMemberComponent,
    UserSettingComponent,
    UserAccountSettingComponent,
    WinnersComponent,
    ExpertReviewComponent,
    SponsorChatReviewComponent,
    MessageComponent,
    EditCategoryComponent,
    EditProfileComponent,
    RatingDialogBoxComponent,
    ExpertChatComponent,
    PointEarnedComponent,
    EarnPointsComponent,
    ProgressBarPopupComponent,
    NotificationPostComponent,
    CategoryPostComponent,
    SearchPostComponent,
    FavoritesComponent,
    SearchResultsComponent,
    SanitizeHtmlPipe,
    NotificationStringFormatPipe
  ],
  entryComponents: [
    ShareComponent,
    OtpDialogBoxComponent,
    ReportComponent,
    ExpertPopupComponent,
    ConfirmationDialogBoxComponent,
    GetNameDialogBoxComponent,
    RatingDialogBoxComponent,
    ProgressBarPopupComponent,
    ImageCropperComponent,
  ],
  providers: [UserService, GeneralService, ResponseHandlingService, AuthGuardService, {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }, MatDatepickerModule
],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string)
     {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId = ${appId}`);
    localStorage.setItem('APP_ID', appId);
    localStorage.setItem('PLATFORM_ID', platform);
  }
}
