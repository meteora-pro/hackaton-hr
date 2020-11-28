import pandas as pd

import json
import os

# Библиотека для работы с СУБД
from sqlalchemy import engine as sql

# Модуль для работы с отображением вывода Jupyter
from IPython import display

import collections


def flatten(d, parent_key='', sep='_'):
    items = []
    for k, v in d.items():
        new_key = parent_key + sep + k if parent_key else k
        if isinstance(v, collections.MutableMapping):
            items.extend(flatten(v, new_key, sep=sep).items())
        else:
            items.append((new_key, v))
    return dict(items)


saving_properties = [
    'premium',
    'name',
    'department',
    'has_test',
    'response_letter_required',
    'area_id',
    'area_name',
    'salary_from',
    'salary_to',
    'salary_currency',
    'salary_gross',
    'type_id',
    'type_name',
    'address',
    'response_url',
    'sort_point_distance',
    'employer_id',
    'employer_name',
    'employer_url',
    'employer_alternate_url',
    'employer_logo_urls_original',
    'employer_logo_urls_90',
    'employer_logo_urls_240',
    'employer_vacancies_url',
    'employer_trusted',
    'published_at',
    'created_at',
    'archived',
    'apply_alternate_url',
    'insider_interview',
    'url',
    'alternate_url',
    'relations',
    'snippet_requirement',
    'snippet_responsibility',
    'contacts',
    'schedule_id',
    'schedule_name'
]

# Создаем списки для столбцов таблицы details
IDs = []  # Список идентификаторов вакансий
names = []  # Список наименований вакансий
descriptions = []  # Список описаний вакансий

# Создаем списки для столбцов таблицы skills
skills_vac = []  # Список идентификаторов вакансий
skills_name = []  # Список названий навыков

# В выводе будем отображать прогресс
# Для этого узнаем общее количество файлов, которые надо обработать
# Счетчик обработанных файлов установим в ноль
cnt_docs = len(os.listdir('vacancies/pagination'))
i = 0

# Проходимся по всем файлам в папке details
for fl in os.listdir('vacancies/pagination'):

    # Открываем, читаем и закрываем файл
    f = open('./vacancies/pagination/{}'.format(fl), encoding='utf8')
    jsonText = f.read()
    f.close()

    # Текст файла переводим в справочник
    jsonResponse = json.loads(jsonText)
    for jsonObj in jsonResponse['items']:
        # Заполняем списки для таблиц
        id_vacancy = jsonObj['id']
        if id_vacancy in IDs:
            continue

        IDs.append(id_vacancy)
        names.append(jsonObj['name'])
        descriptions.append(jsonObj['snippet']['responsibility'])

        # Т.к. навыки хранятся в виде массива, то проходимся по нему циклом
        # for skl in jsonObj['key_skills']:
        skills_vac.append(jsonObj['id'])
        skills_name.append(jsonObj['id'])

    # Увеличиваем счетчик обработанных файлов на 1, очищаем вывод ячейки и выводим прогресс
    i += 1
    display.clear_output(wait=True)
    display.display('Готово {} из {}'.format(i, cnt_docs))

# Создадим соединение с БД
eng = sql.create_engine()
conn = eng.connect()

# Создаем пандосовский датафрейм, который затем сохраняем в БД в таблицу details
df = pd.DataFrame({'id': IDs, 'name': names, 'description': descriptions})
df.to_sql('details', conn, schema='public', chunksize=300, if_exists='append', index=False)

# Тоже самое, но для таблицы skills
df = pd.DataFrame({'vacancy': skills_vac, 'skill': skills_name})
df.to_sql('skills', conn, schema='public', chunksize=300, if_exists='append', index=False)

# Закрываем соединение с БД
conn.close()

# Выводим сообщение об окончании программы
display.clear_output(wait=True)
display.display('Вакансии загружены в БД')
