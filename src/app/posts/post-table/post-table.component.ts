import { Component, OnInit, Input, OnDestroy} from '@angular/core';

import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { AuthService } from '../../auth/auth.service';
import { SorterService } from '../sorter.service';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.css']
})
export class PostTableComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: 'First Post', content: 'This is the first post's content' },
  //   { title: 'Second Post', content: 'This is the second post's content' },
  //   { title: 'Third Post', content: 'This is the third post's content' }
  // ];
  title: string;
  _posts: Post[] = [];
  // _posts: any[];
  // private _posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10, 20, 40, 60];
  userIsAuthenticated = false;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

        @Input() get posts(): Post[] {
          return this._posts;
      }

      set posts(value: Post[]) {
          if (value) {
              this.filteredPosts = this._posts = value;
          }
      }

filteredPosts: any[] = [];

constructor(
  public postsService: PostsService,
  private authService: AuthService,
  private sorterService: SorterService
) {}


ngOnInit() {
  this.title = 'Students on Taxi';
  this.isLoading = true;
  this.postsService.getPosts(this.postsPerPage, this.currentPage);
  this.postsSub = this.postsService
    .getPostUpdateListener()
    .subscribe((postData: { posts: Post[]; postCount: number }) => {
      this.isLoading = false;
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
  this.userIsAuthenticated = this.authService.getIsAuth();
  this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
}

onChangedPage(pageData: PageEvent) {
  this.isLoading = true;
  this.currentPage = pageData.pageIndex + 1;
  this.postsPerPage = pageData.pageSize;
  this.postsService.getPosts(this.postsPerPage, this.currentPage);
}

  filter(data: string) {
    if (data) {
        this.filteredPosts = this.posts.filter((post: Post) => {
          return post.title.toLowerCase().indexOf(data.toLocaleLowerCase()) > -1 ||
                 post.grade.toLowerCase().indexOf(data.toLocaleLowerCase()) > -1 ||
                 post.routeNumber.toLowerCase().indexOf(data.toLocaleLowerCase()) > -1 ||
                 post.telephone.toLowerCase().indexOf(data.toLocaleLowerCase()) > -1 ||
                 post.startDate.toLowerCase().indexOf(data.toLocaleLowerCase()) > -1 ||
                 post.endDate.toLowerCase().indexOf(data.toLocaleLowerCase()) > -1 ||
                 post.pickUpTime.toLowerCase().indexOf(data.toLocaleLowerCase()) > -1 ||
                 post.dropOffTime.toLowerCase().indexOf(data.toLocaleLowerCase()) > -1 ||
                 post.pickUpAddress.toLowerCase().indexOf(data.toLocaleLowerCase()) > -1 ||
                 post.schoolLocation.toLowerCase().indexOf(data.toLocaleLowerCase()) > -1 ||
                 post.mustBeMet.toLowerCase().indexOf(data.toLocaleLowerCase()) > -1 ;
        });
    } else {
        this.filteredPosts = this.posts;
    }
  }

  sort(prop: string) {
    this.sorterService.sort(this.filteredPosts, prop);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
