import { Component } from '@angular/core';

@Component({
  selector: 'meteora-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  isCollapsed = false;
  navList = [
    {
      icon: 'form',
      link: '/vacancies/create',
      title: 'Создать вакансию',
    },
    {
      icon: 'audit',
      link: '/vacancies',
      title: 'Вакансии',
    },
    {
      icon: 'team',
      link: '/candidates/list',
      title: 'Кандидаты',
    },
    {
      icon: 'plus',
      link: '/candidates/create',
      title: 'Добавить кандидата',
    },
  ]
}
