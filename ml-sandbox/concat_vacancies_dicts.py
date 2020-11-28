import json
import os
import time

import requests

VACANCIES_ITEMS_PATH = './vacancies/details'

files = os.listdir(VACANCIES_ITEMS_PATH)
all_data = {}

for fileNum, fl in enumerate(files, start=1):
    print(f"load data for file {fileNum} of {len(files)} ", end='\r')
    # Открываем, читаем и закрываем файл
    f = open(f"{VACANCIES_ITEMS_PATH}/{fl}")
    print(f"read file ${f.name}")
    jsonText = f.read()
    f.close()
    # Текст файла переводим в справочник
    chunkJson = json.loads(jsonText)

    for num, key in enumerate(chunkJson.keys(), start=1):
        print(f"Fetch vacancy data {fileNum} of {len(files)} {num} of {len(chunkJson)}", end='\r')

        all_data[key] = chunkJson[key]
        # Создаем файл в формате json с идентификатором вакансии в качестве названия
        # Записываем в него ответ запроса и закрываем файл
fileName = f"./vacancies/details/all_details.json"
f = open(fileName, mode='w', encoding='utf8')
f.write(json.dumps(all_data, ensure_ascii=False))
f.close()
print('END')
print(f"TOTAL VACANCIES: {len(all_data.keys())}")