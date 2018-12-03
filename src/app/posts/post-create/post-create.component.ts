import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { mimeType } from './mime-type.validator';
import { AuthService } from 'src/app/auth/auth.service';



export interface MET {
  value: string;
  viewValue: string;
}

export interface PARENT {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy {
  mets: MET[] = [
    {value: 'Yes', viewValue: 'Yes'},
    {value: 'No', viewValue: 'No'}
  ];

  parents: PARENT[] = [
    {value: 'Mom', viewValue: 'Mom'},
    {value: 'Dad', viewValue: 'Dad'}
  ];

  enteredTitle = '';
  enteredGrade = '';
  enteredContent = '';
  enteredRouteNumber = '';
  enteredStartDate = '';
  enteredEndDate = '';
  enteredTelephone = '';
  enteredPickUpTime = '';
  enteredDropOffTime = '';
  enteredPickUpAddress = '';
  enteredSchoolLocation = '';
  enteredApprovedBy = '';
  enteredMustBeMet = '';
  post: Post;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private postId: string;
  private authStatusSub: Subscription;
  public title = 'Places';
  public addrKeys: string[];
  public addr: object;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute,
    private authService: AuthService,
    private _ngZone: NgZone
  ) {}

   // Method to be invoked everytime we receive a new instance
  // of the address object from the onSelect event emitter.
  setAddress(addrObj) {
    // We are wrapping this in a NgZone to reflect the changes
    // to the object in the DOM.
    this._ngZone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
    });
  }

  ngOnInit() {
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      grade: new FormControl(null, {
        validators: [Validators.required, Validators.max(12), Validators.min(4)]
      }),
      telephone: new FormControl(null),
      pickUpTime: new FormControl(null),
      dropOffTime: new FormControl(null),
      pickUpAddress: new FormControl(null),
      schoolLocation: new FormControl(null),
      routeNumber: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      startDate: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(8)]
      }),
      endDate: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(8)]
      }),
      approvedBy: new FormControl(null),
      mustBeMet: new FormControl(null),
      content: new FormControl(null),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }
      )
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            grade: postData.grade,
            routeNumber: postData.routeNumber,
            startDate: postData.startDate,
            endDate: postData.endDate,
            telephone: postData.telephone,
            pickUpTime: postData.pickUpTime,
            dropOffTime: postData.dropOffTime,
            pickUpAddress: postData.pickUpAddress,
            schoolLocation: postData.schoolLocation,
            approvedBy: postData.approvedBy,
            mustBeMet: postData.mustBeMet,
            content: postData.content,
            imagePath: postData.imagePath,
            creator: postData.creator
          };
          this.form.setValue({
            title: this.post.title,
            grade: this.post.grade,
            telephone: this.post.telephone,
            routeNumber: this.post.routeNumber,
            startDate: this.post.startDate,
            endDate: this.post.endDate,
            pickUpTime: this.post.pickUpTime,
            dropOffTime: this.post.dropOffTime,
            pickUpAddress: this.post.pickUpAddress,
            schoolLocation: this.post.schoolLocation,
            approvedBy: this.post.approvedBy,
            mustBeMet: this.post.mustBeMet,
            content: this.post.content,
            image: this.post.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(
        this.form.value.title,
        this.form.value.grade,
        this.form.value.routeNumber,
        this.form.value.startDate,
        this.form.value.endDate,
        this.form.value.telephone,
        this.form.value.pickUpTime,
        this.form.value.dropOffTime,
        this.form.value.pickUpAddress,
        this.form.value.schoolLocation,
        this.form.value.approvedBy,
        this.form.value.mustBeMet,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.grade,
        this.form.value.routeNumber,
        this.form.value.startDate,
        this.form.value.endDate,
        this.form.value.telephone,
        this.form.value.pickUpTime,
        this.form.value.dropOffTime,
        this.form.value.pickUpAddress,
        this.form.value.schoolLocation,
        this.form.value.approvedBy,
        this.form.value.mustBeMet,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
