import json
import os
import time

import requests

VACANCIES_ITEMS_PATH = './vacancies/pagination'

files = os.listdir(VACANCIES_ITEMS_PATH)

for fileNum, fl in enumerate(files, start=1):
    if "qa" not in fl:
        continue
    print(f"load data for file {fileNum} of {len(files)} ", end='\r')
    # Открываем, читаем и закрываем файл
    f = open(f"{VACANCIES_ITEMS_PATH}/{fl}", encoding='utf8')
    print(f"read file ${f.name}")
    jsonText = f.read()
    f.close()

    data_chunk = {}
    # Текст файла переводим в справочник
    jsonResponse = json.loads(jsonText)
    items = jsonResponse['items']
    for num, jsonObj in enumerate(items, start=1):
        print(f"Fetch vacancy data {fileNum} of {len(files)} {num} of {len(items)}", end='\r')
        try:
            req = requests.get(jsonObj['url'])
            data = req.content.decode()
            req.close()
            data_chunk[jsonObj['id']] = json.loads(data)
        except:
            print(f"can't fetch {jsonObj['url']}")
        # Создаем файл в формате json с идентификатором вакансии в качестве названия
        # Записываем в него ответ запроса и закрываем файл
    fileName = f"./vacancies/details/{fl}"
    f = open(fileName, mode='w', encoding='utf8')
    f.write(json.dumps(data_chunk, ensure_ascii=False))
    f.close()
