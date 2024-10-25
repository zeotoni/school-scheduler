import { Component } from '@angular/core';
import { Subject } from 'app/models/subject';
import { ScheduleGenerateService } from './../../services/schedule-generate.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  className = '';
  subject = '';
  availability = [];
  weeklyHours = 0;
  nextId = 1;
  tables!: { [key: string]: string[] }[];

  classNameList: { id: number; name: string }[] = [];
  subjectList: Subject[] = [];

  constructor(private scheduleGenerateService: ScheduleGenerateService) {}

  addClassName() {
    if (this.className) {
      this.classNameList.push({
        id: this.nextId++,
        name: this.className,
      });
      this.className = '';
    }
  }

  removeClass(classNameToRemove: { id: number; name: string }) {
    this.classNameList = this.classNameList.filter(
      className => className !== classNameToRemove
    );
  }

  addSubject() {
    if (this.subject && this.weeklyHours > 0) {
      this.subjectList.push({
        name: this.subject,
        weeklyHours: this.weeklyHours,
        availability: this.availability,
      });
      this.subject = '';
      this.weeklyHours = 0;
      this.availability = [];
    }
  }

  removeSubject(subjectToRemove: { name: string; weeklyHours: number }) {
    this.subjectList = this.subjectList.filter(
      subject => subject !== subjectToRemove
    );
  }

  onSubmit() {
    this.classNameList = [
      { id: 1, name: 'Turma A' },
      { id: 2, name: 'Turma B' },
      { id: 3, name: 'Turma C' },
      { id: 4, name: 'Turma D' },
    ];

    this.subjectList = [
      { name: 'História', weeklyHours: 4, availability: [] },
      { name: 'Educação Física', weeklyHours: 3, availability: [] },
      { name: 'Matemática', weeklyHours: 5, availability: [] },
      { name: 'Português', weeklyHours: 5, availability: [] },
      { name: 'Geografia', weeklyHours: 4, availability: [] },
      { name: 'Ciências', weeklyHours: 4, availability: [] },
    ];
    // this.subjectList = [
    //   { name: 'Religião', weeklyHours: 1, availability: [] },
    //   { name: 'E. Orientados', weeklyHours: 4, availability: [] },
    //   { name: 'Projeto de Vida', weeklyHours: 2, availability: [] },
    //   { name: 'Prat. Exp', weeklyHours: 3, availability: [] },
    //   { name: 'Cult. Corp . Mov', weeklyHours: 2, availability: [] },
    //   { name: 'Ling. Artísticas', weeklyHours: 2, availability: [] },
    //   { name: 'Vivencias em Ling.', weeklyHours: 2, availability: [] },
    //   { name: 'Artes', weeklyHours: 2, availability: [] },
    //   { name: 'História', weeklyHours: 4, availability: [] },
    //   { name: 'Educação Física', weeklyHours: 3, availability: [] },
    //   { name: 'Matemática', weeklyHours: 5, availability: [] },
    //   { name: 'Português', weeklyHours: 5, availability: [] },
    //   { name: 'Geografia', weeklyHours: 4, availability: [] },
    //   { name: 'Ciências', weeklyHours: 4, availability: [] },
    //   { name: 'Inglês', weeklyHours: 2, availability: [] },
    // ];

    this.tables = this.scheduleGenerateService.gerarTabelas(
      this.subjectList,
      this.classNameList.length
    );
  }
}
