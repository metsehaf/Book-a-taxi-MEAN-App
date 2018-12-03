import { Component, OnInit } from '@angular/core';
import {Student, IStudentResponse} from './search.class';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataService} from './search.service';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';


@Component({
  selector: 'app-my-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.css' ]
})
export class SearchComponent implements OnInit {
  filteredstudents: Student[] = [];
  studentsForm: FormGroup;
  isLoading = false;
  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit() {
    this.studentsForm = this.fb.group({
      studentInput: null
    });

      this.studentsForm
      .get('studentInput')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.dataService.search({name: value}, 1)
        .pipe(
          finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(students => this.filteredstudents = students.results);
  }

  displayFn(student: Student) {
    if (student) { return student.name; }
  }
}
