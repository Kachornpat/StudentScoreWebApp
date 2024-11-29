import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faPenToSquare, faTrash, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { StudentScoreService } from '../student-score.service';
import { StudentScore } from '../student-score';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [DecimalPipe]
})
export class HomeComponent {

  studentScoreService: StudentScoreService = inject(StudentScoreService);
  title = 'Students Details';

  faEye = faEye;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faEyeSlash = faEyeSlash;

  filter = new FormControl('', { nonNullable: true });

  studentScoreList: StudentScore[] | undefined;
  filterStudentScoreList: StudentScore[] | undefined;

  constructor() {
    this.getStudentScore();
  }

  getStudentScore() {
    this.studentScoreService.getAllStudentScore().then(
      (studentScoreList: StudentScore[]) => {
        this.studentScoreList = studentScoreList;
        this.filterStudentScoreList = studentScoreList;
      }
    );
  }

  filterList(search: string) {
    if (!search) this.filterStudentScoreList = this.studentScoreList;
    else {
      this.filterStudentScoreList = this.studentScoreList?.filter(
        studentScore =>
          studentScore?.first_name.toLowerCase().includes(search.toLowerCase()) ||
          studentScore?.address.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  deleteScore(id: number) {
    this.studentScoreService.deleteStudentScore(id).then(() => { this.getStudentScore(); });

  }


}
