# Библиотека для работы с HTTP-запросами. Будем использовать ее для обращения к API HH
import requests

# Пакет для удобной работы с данными в формате json
import json

# Модуль для работы со значением времени
import time

# Модуль для работы с операционной системой. Будем использовать для работы с файлами
import os


def getPage(text: str, page=0):
    """
    Создаем метод для получения страницы со списком вакансий.
    Аргументы:
        page - Индекс страницы, начинается с 0. Значение по умолчанию 0, т.е. первая страница
    """

    # Справочник для параметров GET-запроса
    params = {
        'text': text,
        'specialization': 1,
        'schedule': 'fullDay',
        # 'search_period': 1,
        'no_magic': 1,
        'only_with_salary': True,
        'page': page,  # Индекс страницы поиска на HH
        'per_page': 100  # Кол-во вакансий на 1 странице
    }

    req = requests.get('https://api.hh.ru/vacancies', params)  # Посылаем запрос к API
    data = req.content.decode()  # Декодируем его ответ, чтобы Кириллица отображалась корректно
    req.close()
    return data


# key_words = ['Frontend', 'Backend', 'Product', 'Data', 'Designer', 'Devops', 'System administrator']
key_words = ['Тестиров']
# Считываем первые 2000 вакансий
for key_word in key_words:
    for page in range(0, 20):
        print(f"load page for {key_word} {page} of 20")
        try:
            # Преобразуем текст ответа запроса в справочник Python
            jsObj = json.loads(getPage(key_word, page))

            # Сохраняем файлы в папку {путь до текущего документа со скриптом}\details\pagination
            # Определяем количество файлов в папке для сохранения документа с ответом запроса
            # Полученное значение используем для формирования имени документа
            nextFileName = f"./vacancies/pagination/{key_word.lower().replace(' ', '_')}_{page}.json"

            # Создаем новый документ, записываем в него ответ запроса, после закрываем
            f = open(nextFileName, mode='w', encoding='utf8')
            f.write(json.dumps(jsObj, ensure_ascii=False))
            f.close()

            # Проверка на последнюю страницу, если вакансий меньше 2000
            if (jsObj['pages'] - page) <= 1:
                break

            # Необязательная задержка, но чтобы не нагружать сервисы hh, оставим. 5 сек мы может подождать
            time.sleep(0.25)
        except ValueError:
            print(f"Error ${ValueError}")

print('Старницы поиска собраны')
