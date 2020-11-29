
# Ссылки на демки
* [Демо](https://huntu.dev.meteora.pro/)
* [Api-Docs](https://huntu.dev.meteora.pro/api/docs/)

# Как запустить проект
## Необходимое ПО для запуска
1. [Docker](https://www.docker.com/get-started)
1. [NodeJS](https://nodejs.org/en/)
## Запуск
1. Нужен [Docker](https://www.docker.com/get-started) и docker-compose
1. Выполнить команду `npm start up:compose`
1. Первый раз могут довольно долго собираться образы, последующие запуски будут быстрыми
1. После того как все стартует можно смотреть приложение:
    1. [Фронтент](http://localhost:4200)
    1. [Api-Docs](http://localhost:3333/api/docs)

# Используемые технологии
1. Использован один язык для написания backend и frontend - [TypeScript](https://www.typescriptlang.org/)
1. Управление монорепозиторием [Nx](https://nx.dev)
1. Frontend - [Angular](https://angular.io/) ([Ant design](https://ng.ant.design/docs/introduce/en), [State management](https://www.ngxs.io/))
1. Backend ([NodeJs](https://nodejs.org/en/), [NestJs](https://nestjs.com/), [TypeOrm](https://typeorm.io/))
1. База данных [Postgres](https://www.postgresql.org/)
1. Контейниризация [Docker](https://www.docker.com/get-started)
1. Деплой [Kubernetes](https://kubernetes.io/ru/), [Helm](https://helm.sh/), [Gitlab CI/CD](https://docs.gitlab.com/ee/ci/)

# Как запустить в режиме разработки
1. Нужны nodejs, npm, docker
1. Установить зависимости командой `npm i`
1. Настроить коннект к серверу баз данных и создать базу данных
1. Запуск контейнера с базой данных `npm start up:compose`
   1. Остановка контейнера с базой данных `npm start down:compose`
1. Запустить с помощью команды `npm start` (для запуска всех сервисов)
   1. Или для старта бэкенда отдельно `npm run start:api`
   1. Или для старта фронта отдельно`npm run start:fe`

# Структура проекта
1. apps/ - тут лежит основной код сервисов
1. config/ - .env файлы для бэкенд сервисов
1. deploy/ - docker файлы и конфиги для деплоя в kubernetes
1. libs/ - исходных код для общих библиотек в проекте

# Как добавить миграцию
установить tsnode глобально:
`npm i -g ts-node`

Сгенерить миграцию по схеме:
`npm run typeorm -- migration:generate -n MigrationName`

Добавить созданную миграцию в массив с миграциями (all.migations.ts)
