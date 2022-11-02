[![Tests](https://github.com/verdant-yucca/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/verdant-yucca/express-mesto-gha/actions/workflows/tests-13-sprint.yml) 
[![Tests](https://github.com/verdant-yucca/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/verdant-yucca/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Руководство по установке
Шаг 1: Клонируем удалённый репозиторий  
`git clone git@github.com:verdant-yucca/express-mesto-gha.git`

Шаг 2 Создаём package.json  
`npm init --yes`

Шаг 3: Устанавливаем необходимые пакеты  
`npm i express`  
`npm i body-parser`  
`npm i mongoose`  
`npm i nodemon`

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
