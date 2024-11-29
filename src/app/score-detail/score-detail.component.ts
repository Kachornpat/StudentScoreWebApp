import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { StudentScoreService } from '../student-score.service';
import { StudentScore } from '../student-score';

@Component({
  selector: 'app-score-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './score-detail.component.html',
  styleUrl: './score-detail.component.css'
})
export class ScoreDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  studentScoreService = inject(StudentScoreService);
  studentId: number = 0;

  studentScoreForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    address: new FormControl(''),
    score: new FormControl(0),
    status: new FormControl(''),
  });

  constructor(private router: Router) {
    this.studentId = Number(this.route.snapshot.params['studentId'])
    this.studentScoreService.getStudentScoreById(this.studentId).then(
      (studentScore: StudentScore[] | undefined) => {
        if (studentScore != undefined)
          this.studentScoreForm.patchValue(studentScore[0]);
      }
    );
  }

  onSubmit() {
    if (this.studentId == 0) {
      this.studentScoreService.addStudentScore(
        this.studentScoreForm.controls.first_name.value ?? '',
        this.studentScoreForm.controls.address.value ?? '',
        this.studentScoreForm.controls.score.value ?? 0,
        this.studentScoreForm.controls.status.value ?? 'active',
      ).then(
        () => { this.router.navigate(['/']); }

      );
    }
    else {
      this.studentScoreService.updateStudentScore(
        this.studentId,
        this.studentScoreForm.controls.first_name.value ?? '',
        this.studentScoreForm.controls.address.value ?? '',
        this.studentScoreForm.controls.score.value ?? 0,
        this.studentScoreForm.controls.status.value ?? 'active'
      ).then(
          () => { this.router.navigate(['/']); }
        );
    }


  }
}
