import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  className = '';
  subject = '';
  weeklyHours = 0;
  nextId = 1;

  classNameList: { id: number; name: string }[] = [];
  subjectList: { name: string; weeklyHours: number }[] = [];

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
      });
      this.subject = '';
      this.weeklyHours = 0;
    }
  }

  removeSubject(subjectToRemove: { name: string; weeklyHours: number }) {
    this.subjectList = this.subjectList.filter(
      subject => subject !== subjectToRemove
    );
  }

  onSubmit() {
    const data = {
      classes: this.classNameList,
      subjects: this.subjectList,
    };

    console.log(data);
  }
}
