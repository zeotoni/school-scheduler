import { Injectable } from '@angular/core';
import { Subject } from './../models/subject';

@Injectable({
  providedIn: 'root',
})
export class ScheduleGenerateService {
  shuffle(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  gerarTabelas(
    subjects: Subject[],
    numTabelas: number
  ): { [key: string]: string[] }[] {
    const tabelas: { [key: string]: string[] }[] = [];

    const tabelaBase = this.gerarHorarioBase(subjects)[0];

    for (let i = 0; i < numTabelas; i++) {
      const novoHorario: { [key: string]: string[] } = {
        Segunda: [],
        Terça: [],
        Quarta: [],
        Quinta: [],
        Sexta: [],
      };

      Object.keys(novoHorario).forEach(dia => {
        novoHorario[dia].push(...this.shuffle(tabelaBase[dia]));
      });

      const novissimoHorario = this.gerarHorarioDistinto(novoHorario, tabelas);
      tabelas.push(novissimoHorario);
    }

    return tabelas;
  }

  gerarHorarioDistinto(
    horario: { [key: string]: string[] },
    tabelas: { [key: string]: string[] }[]
  ): { [key: string]: string[] } {
    const diasDaSemana = Object.keys(horario); // Assume que todos têm os mesmos dias
    let horarioValido = false;

    while (!horarioValido) {
      horarioValido = true;
      // Itera pelos dias da semana
      for (const dia of diasDaSemana) {
        const numPeriodos = horario[dia].length; // Quantidade de períodos em cada dia
        // Itera por cada período (posição)
        for (let i = 0; i < numPeriodos; i++) {
          const primeiroItem = horario[dia][i]; // Item no primeiro horário
          // Compara o item em cada horário subsequente
          for (let j = 0; j < tabelas.length; j++) {
            if (tabelas[j][dia][i] === primeiroItem) {
              this.shuffle(horario[dia]);
              horarioValido = false; // Ainda há conflito, então o horário não é válido
              break; // Sai do loop para esse dia e reembaralha
            }
          }
          if (!horarioValido) break;
        }
        if (!horarioValido) break;
      }
    }
    return horario;
  }

  gerarHorarioBase(subjects: Subject[]): { [key: string]: string[] }[] {
    const horarios: { [key: string]: string[] }[] = [];

    let horarioValido = false;

    while (!horarioValido) {
      // Inicializa o horário vazio para cada tentativa
      const horario: { [key: string]: string[] } = {
        Segunda: [],
        Terça: [],
        Quarta: [],
        Quinta: [],
        Sexta: [],
      };

      const hasSpace = (dia: string, subjectName: string) => {
        return horario[dia].length < 5 && !horario[dia].includes(subjectName);
      };

      subjects.forEach(subj => {
        let hoursToAllocate = subj.weeklyHours;
        let attempts = 0;

        // Enquanto a matéria não for completamente alocada
        while (hoursToAllocate > 0 && attempts < 100) {
          const dias = this.escolherDiasAleatorios(hoursToAllocate);

          dias.forEach(dia => {
            if (hasSpace(dia, subj.name)) {
              horario[dia].push(subj.name);
              hoursToAllocate--;
            }
          });

          attempts++;
        }
      });

      horarios.push(horario);

      // Validação: verificar se o horário está completo (5 dias com 5 matérias)
      horarioValido = Object.keys(horario).every(
        dia => horario[dia].length === 5
      );

      // Se o horário não for válido, removemos o último para tentar novamente
      if (!horarioValido) {
        horarios.pop();
      }

      Object.keys(horario).forEach(dia => {
        this.shuffle(horario[dia]); // Embaralha o array original
      });
    }

    return horarios;
  }

  escolherDiasAleatorios(horas: number): string[] {
    const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
    const diasEscolhidos: string[] = [];

    while (diasEscolhidos.length < horas) {
      const dia = dias[Math.floor(Math.random() * dias.length)];

      // Garante que o dia não seja escolhido mais de uma vez
      if (!diasEscolhidos.includes(dia)) {
        diasEscolhidos.push(dia);
      }
    }

    return diasEscolhidos;
  }
}
