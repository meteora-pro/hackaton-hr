from parse_hh_data import download, parse
from json import dumps


def save_to_file(data, batch_index: int):
    file_name = f"./resumes/{batch_index}_all.json"

    # Создаем новый документ, записываем в него ответ запроса, после закрываем
    f = open(file_name, mode='w', encoding='utf8')
    f.write(dumps(data, ensure_ascii=False))
    f.close()


batch = {}

current_batch_index = 1
i = 1
k = 1
print(f"downloading resume ids")
all_ids = download.resume_ids(1, 1, 0, 1000)
total = len(all_ids)
for id in all_ids:
    print(f"ID: {id} processing {k} of {total}")
    try:
        resumes = download.resume(id)
        batch[id] = parse.resume(resumes)
    except ValueError:
        print(f"Error when parsing ${ValueError}")
    i = i + 1
    k = k + 1
    if i > 100:
        i = 0
        current_batch_index += 1
        save_to_file(batch, current_batch_index)
        batch = {}

