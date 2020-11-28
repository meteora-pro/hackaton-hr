import json
import os
import time

import requests

VACANCIES_ITEMS_PATH = './vacancies/details_broken'

files = os.listdir(VACANCIES_ITEMS_PATH)

for fileNum, fl in enumerate(files, start=1):
    print(f"load data for file {fileNum} of {len(files)} ", end='\r')
    # Открываем, читаем и закрываем файл
    f = open(f"{VACANCIES_ITEMS_PATH}/{fl}")
    print(f"read file ${f.name}")
    jsonText = f.read()
    f.close()

    data_chunk = {}
    # Текст файла переводим в справочник
    brokenJson = json.loads(jsonText)
    for num, key in enumerate(brokenJson.keys(), start=1):
        print(f"Fetch vacancy data {fileNum} of {len(files)} {num} of {len(brokenJson)}", end='\r')

        data_chunk[key] = json.loads(brokenJson[key])
        # Создаем файл в формате json с идентификатором вакансии в качестве названия
        # Записываем в него ответ запроса и закрываем файл
    fileName = f"./vacancies/details/{fl.replace('.json.json', '.json')}"
    f = open(fileName, mode='w', encoding='utf8')
    f.write(json.dumps(data_chunk, ensure_ascii=False))
    f.close()
