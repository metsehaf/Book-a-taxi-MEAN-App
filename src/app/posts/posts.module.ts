import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostListComponent} from './post-list/post-list.component';
import {PostTableComponent } from './post-table/post-table.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { GooglePlacesDirective } from '../google-places.directive';
import { FilterTextboxComponent } from './post-table/filter-textbox.component';
import { AngularMaterialModule } from '../angular-material.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent,
    PostTableComponent,
    GooglePlacesDirective,
    FilterTextboxComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule,
    SharedModule
  ]
})
export class PostsModule {}
