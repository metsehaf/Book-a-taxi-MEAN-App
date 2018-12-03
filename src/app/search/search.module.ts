import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchComponent} from './search.component';
import { AngularMaterialModule } from '../angular-material.module';
import { MatAutocompleteModule } from '@angular/material';


@NgModule({
  declarations: [
   SearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule,
    MatAutocompleteModule
  ]
})
export class SearchModule {}
