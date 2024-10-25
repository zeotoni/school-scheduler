import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.scss'],
})
export class ScheduleTableComponent {
  @Input() scheduleList: { [key: string]: string[] }[] = [];
  @Input() classNameList: { id: number; name: string }[] = [];

  // getHorarios(tabela: any[]): any[][] {
  //   const numHorarios = 9;
  //   const horarios = [];

  //   // Itera pelos 9 horários e organiza as matérias em cada horário para os dias da semana
  //   for (let i = 0; i < numHorarios; i++) {
  //     const row = [];
  //     for (let j = 0; j < 5; j++) {
  //       row.push(tabela[i + j * numHorarios]);
  //     }
  //     horarios.push(row);
  //   }

  //   return horarios;
  // }

  // getTransposedSchedule(tabela: string[][]): string[][] {
  //   // Verificar se o array 'tabela' está definido e tem dados
  //   if (!tabela || tabela.length === 0 || tabela[0].length === 0) {
  //     return [];
  //   }

  //   // Transpor o array se os dados estiverem disponíveis
  //   return tabela[0].map((_, colIndex) => tabela.map(row => row[colIndex]));
  // }

  // getTransposedSchedule(schedule: { [key: string]: string[] }): string[] {
  //   const transposed: string[][] = [];
  //   const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  //   diasDaSemana.forEach(dia => {
  //     const materias = schedule.map(tabela => tabela[dia] || []);
  //     transposed.push(materias.flat());
  //   });

  //   return transposed;
  // }
}
