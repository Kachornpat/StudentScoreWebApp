import { Injectable } from '@angular/core';
import { StudentScore } from './student-score';

@Injectable({
  providedIn: 'root'
})
export class StudentScoreService {

  readonly baseUrl = "http://localhost:8080";

  constructor() { }

  async getAllStudentScore(): Promise<StudentScore[]> {
    const data = await fetch(`${this.baseUrl}/score/getScores`);
    return await data.json() ?? [];
  }

  async getStudentScoreById(id: number): Promise<StudentScore[] | undefined> {
    const data = await fetch(`${this.baseUrl}/score/getScoreById/${id}`);
    return await data.json() ?? [];
  }

  async updateStudentScore(id: number, firstName: string, address: string, remark: number, status: string) {
    const res = await fetch(`${this.baseUrl}/score/updateStudentScore`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify({
          id: id,
          first_name: firstName,
          last_name: '',
          address: address,
          status: status,
          score: remark
        }
        )
      })
    return await res.json() ?? {};

  }

  async addStudentScore(firstName: string, address: string, remark: number, status: string) {
    const res = await fetch(`${this.baseUrl}/score/addStudentScore`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          first_name: firstName,
          last_name: '',
          address: address,
          status: status,
          score: remark
        }
        )
      })
    return await res.json() ?? {};
  }

  async deleteStudentScore(id: number) {
    const res = await fetch(`${this.baseUrl}/student/delete/${id}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "DELETE",
      })
    return await res.json() ?? {};
  }

}
