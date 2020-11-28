import json
import os

VACANCIES_ITEMS_PATH = './resumes'

files = os.listdir(VACANCIES_ITEMS_PATH)
all_resumes = {}

for fileNum, fl in enumerate(files, start=1):
    print(f"load data for file {fileNum} of {len(files)} ", end='\r')
    # Открываем, читаем и закрываем файл
    f = open(f"{VACANCIES_ITEMS_PATH}/{fl}")
    print(f"read file ${f.name}")
    jsonText = f.read()
    f.close()
    chunkJson = json.loads(jsonText)
    if isinstance(chunkJson, dict):
        for num, key in enumerate(chunkJson.keys(), start=1):
            all_resumes[key] = chunkJson[key]
    else:
        print(f"file {fl} is not contain dict")

fileName = f"./resumes/all_details.json"
f = open(fileName, mode='w', encoding='utf8')
f.write(json.dumps(all_resumes, ensure_ascii=False))
f.close()

print(f"TOTAL RESUMES: {len(all_resumes.keys())}")
