import os
import json

lottie_dir = r"c:\Users\Akash\Desktop\royal-bar-restaurant\public\lottie"

def find_text_in_dict(d):
    texts = []
    if isinstance(d, dict):
        if 't' in d and isinstance(d['t'], str) and len(d['t']) > 1:
            # Check if it looks like text document
            texts.append(d['t'])
        for k, v in d.items():
            texts.extend(find_text_in_dict(v))
    elif isinstance(d, list):
        for item in d:
            texts.extend(find_text_in_dict(item))
    return texts

for i in range(1, 13):
    filename = f"anim_{i}.json"
    filepath = os.path.join(lottie_dir, filename)
    if os.path.exists(filepath):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
            texts = find_text_in_dict(data)
            # filter duplicates
            texts = list(set(texts))
            if texts:
                print(f"File {filename} has texts: {texts}")
        except Exception as e:
            print(f"Error {filename}: {e}")
