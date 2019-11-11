import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { SelectCategoriesComponent } from "./pages/select-categories/select-categories.component";
import { ProfileComponent } from './pages/profile/profile.component';
import { FeedsComponent } from './pages/feeds/feeds.component';
import { AuthGuardService } from './services/auth.guard.service';
import { RegisterComponent } from './pages/register/register.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { VerifyForgetPasswordComponent } from './pages/verify-forget-password/verify-forget-password.component';
import { UpdateNewPasswordComponent } from './pages/update-new-password/update-new-password.component';
import { GetInviteUserListComponent } from './components/get-invite-user-list/get-invite-user-list.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { HelpComponent } from './pages/help/help.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import { FeedPostsComponent } from './components/feed-posts/feed-posts.component';
import { JobHistoryComponent } from './pages/job-history/job-history.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { AddWorkDetailComponent } from './pages/add-work-detail/add-work-detail.component';
import { FollowersComponent } from './pages/followers/followers.component';
import { ExpertPopupComponent } from './components/expert-popup/expert-popup.component';
import { AcceptRejectFollowComponent } from './pages/accept-reject-follow/accept-reject-follow.component';
import { ExpertProfileComponent } from './pages/expert-profile/expert-profile.component';
import { SavePostsComponent } from './pages/save-posts/save-posts.component';
import { ViewSaveImageComponent } from './pages/view-save-image/view-save-image.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { AddGroupMemberComponent } from './pages/add-group-member/add-group-member.component';
import { UserSettingComponent } from './pages/user-setting/user-setting.component';
import { UserAccountSettingComponent } from './pages/user-account-setting/user-account-setting.component';
import { WinnersComponent } from './pages/winners/winners.component';
import { MessageComponent } from './pages/message/message.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ExpertChatComponent } from './pages/expert-chat/expert-chat.component';
import { NotificationPostComponent } from './pages/notification-post/notification-post.component';
import { CategoryPostComponent } from './pages/category-post/category-post.component';
import { SearchPostComponent } from './pages/search-post/search-post.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { EarnPointsComponent } from './pages/earn-points/earn-points.component';
import { Server } from 'tls';

import {PointEarnedComponent} from './pages/point-earned/point-earned.component';






const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },

  //------before login routes------//
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuardService] },
  { path: 'logout', component: LogoutComponent },
  { path: 'forget-password', component: ForgetPasswordComponent, canActivate: [AuthGuardService] },

  //------After login routes------//
  { path: 'verify/:phoneNumber', component: VerifyComponent, canActivate: [AuthGuardService] },
  { path: 'select-categories', component: SelectCategoriesComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'feeds', component: FeedsComponent, canActivate: [AuthGuardService] },
  { path: 'feeds/:tab/:type/:page', component: FeedsComponent, canActivate: [AuthGuardService] },
  { path: 'view-profile', component: ViewProfileComponent, canActivate: [AuthGuardService] },
  { path: 'view-profile/:tab/:type/:page/:id', component: ViewProfileComponent, canActivate: [AuthGuardService] },

  { path: 'verify-forget-password/:phoneEmail', component: VerifyForgetPasswordComponent, canActivate: [AuthGuardService] },
  { path: 'update-new-password/:user_id', component: UpdateNewPasswordComponent, canActivate: [AuthGuardService] },
  { path: 'get-invite-user/:postId', component: GetInviteUserListComponent, canActivate: [AuthGuardService] },
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'view-profile/:id', component: ViewProfileComponent },
  { path: 'feed-posts', component: FeedPostsComponent },
  { path: 'job-histroy/:id/:type', component: JobHistoryComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'add-work-detail', component: AddWorkDetailComponent },
  { path: 'followers', component: FollowersComponent },
  { path: 'accept-reject-follow', component: AcceptRejectFollowComponent },
  { path: 'expert-profile', component: ExpertProfileComponent },
  { path: 'save-posts/:imgUrl', component: SavePostsComponent },
  { path: 'save-posts', component: SavePostsComponent },
  { path: 'view-save-image/:folder', component: ViewSaveImageComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'groups/:id', component: GroupsComponent },
  { path: 'add-group-members', component: AddGroupMemberComponent },
  { path: 'add-group-members/:id', component: AddGroupMemberComponent },
  { path: 'user-setting', component: UserSettingComponent },
  { path: 'user-account-setting', component: UserAccountSettingComponent },
  { path: 'winners', component: WinnersComponent },
  { path: 'message', component: MessageComponent },
  { path: 'edit-category', component: EditCategoryComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'expert-chat', component: ExpertChatComponent },
  { path: 'earn-points', component: EarnPointsComponent },
  { path: 'point-earned', component:PointEarnedComponent},

  // { path: 'notification-post', component: NotificationPostComponent },
  // { path: 'notification-post/:tab/:type/:page/:id', component: NotificationPostComponent, canActivate: [AuthGuardService] },
  // { path: 'notification-post/:id', component: NotificationPostComponent },

  { path: 'post', component: NotificationPostComponent },
  { path: 'post/:tab/:type/:page/:id', component: NotificationPostComponent, canActivate: [AuthGuardService] },
  { path: 'post/:id', component: NotificationPostComponent },
  { path: 'category-post', component: CategoryPostComponent },
  { path: 'category-post/:id', component: CategoryPostComponent },

  // { path: 'search-post', component: SearchPostComponent },
  // { path: 'search-post/:content', component: SearchPostComponent },
  // { path: 'search-post/:tab/:type/:page/:content', component: SearchPostComponent },
  { path: 'search-results', component: SearchResultsComponent,canActivate: [AuthGuardService] },
  { path: 'search-results/:tab/:page/:search', component: SearchResultsComponent, canActivate: [AuthGuardService] },




  //------Public routes------//
  // { path: 'home', component: HomeComponent },
  { path: 'about_us', component: AboutUsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'help', component: HelpComponent },
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
