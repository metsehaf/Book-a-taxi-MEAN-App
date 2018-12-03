import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { Post } from './post.model';

const BACKEND_URL = environment.apiUrl + '/posts/';


@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                grade: post.grade,
                routeNumber: post.routeNumber,
                startDate: post.startDate,
                endDate: post.endDate,
                content: post.content,
                telephone: post.telephone,
                pickUpTime: post.pickUpTime,
                dropOffTime: post.dropOffTime,
                pickUpAddress: post.pickUpAddress,
                schoolLocation: post.schoolLocation,
                approvedBy: post.approvedBy,
                mustBeMet: post.mustBeMet,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      grade: string;
      routeNumber: string;
      startDate: string;
      endDate: string;
      content: string;
      telephone: string;
      pickUpTime: string;
      dropOffTime: string;
      pickUpAddress: string;
      schoolLocation: string;
      approvedBy: string;
      mustBeMet: string;
      imagePath: string;
      creator: string;
    }>(BACKEND_URL + id);
  }

  addPost(
    title: string,
    grade: string,
    routeNumber: string,
    startDate: string,
    endDate: string,
    telephone: string,
    pickUpTime: string,
    dropOffTime: string,
    pickUpAddress: string,
    schoolLocation: string,
    approvedBy: string,
    mustBeMet: string,
    content: string,
     image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('grade', grade);
    postData.append('routeNumber', routeNumber);
    postData.append('startDate', startDate);
    postData.append('endDate', endDate);
    postData.append('content', content);
    postData.append('telephone', telephone);
    postData.append('pickUpTime', pickUpTime);
    postData.append('dropOffTime', dropOffTime);
    postData.append('pickUpAddress', pickUpAddress);
    postData.append('schoolLocation', schoolLocation);
    postData.append('approvedBy', approvedBy);
    postData.append('mustBeMet', mustBeMet);
    postData.append('image', image, title);
    this.http
      .post<{ message: string; post: Post }>(
        BACKEND_URL,
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(['/list']);
      });
  }

  updatePost(
    id: string,
    title: string,
    grade: string,
    routeNumber: string,
    startDate: string,
    endDate: string,
    telephone: string,
    pickUpTime: string,
    dropOffTime: string,
    pickUpAddress: string,
    schoolLocation: string,
    approvedBy: string,
    mustBeMet: string,
    content: string,
    image: File | string) {
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('grade', grade);
      postData.append('routeNumber', routeNumber);
      postData.append('startDate', startDate);
      postData.append('endDate', endDate);
      postData.append('content', content);
      postData.append('telephone', telephone);
      postData.append('pickUpTime', pickUpTime);
      postData.append('dropOffTime', dropOffTime);
      postData.append('pickUpAddress', pickUpAddress);
      postData.append('schoolLocation', schoolLocation);
      postData.append('approvedBy', approvedBy);
      postData.append('mustBeMet', mustBeMet);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        grade: grade,
        routeNumber: routeNumber,
        startDate: startDate,
        endDate: endDate,
        content: content,
        telephone: telephone,
        pickUpTime: pickUpTime,
        dropOffTime: dropOffTime,
        pickUpAddress: pickUpAddress,
        schoolLocation: schoolLocation,
        approvedBy: approvedBy,
        mustBeMet: mustBeMet,
        imagePath: image,
        creator: null
      };
    }
    this.http
      .put(BACKEND_URL + id, postData)
      .subscribe(response => {
        this.router.navigate(['/list']);
      });
  }

  deletePost(postId: string) {
    return this.http
      .delete(BACKEND_URL + postId);
  }
}
