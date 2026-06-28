import os
import json
import re

lottie_dir = r"c:\Users\Akash\Desktop\royal-bar-restaurant\public\lottie"
keywords = [
    "food", "chef", "cook", "serve", "serving", "restaurant", "burger", "pizza", "wine", "beer", "dining", "bar", "table", 
    "waiter", "kitchen", "eat", "drink", "cup", "plate", "fork", "spoon", "knife", "glass", "bottle", "bowl", "pot", "pan", 
    "coffee", "tea", "baking", "bake", "menu", "delicious", "yummy", "tasty",
    "comida", "cocinero", "cocinar", "servir", "restaurante", "hamburguesa", "vino", "cerveza", "cenar", "cena", "mesa",
    "camarero", "cocina", "comer", "beber", "taza", "plato", "tenedor", "cuchara", "cuchillo", "vaso", "botella", "bol", "olla",
    "sarten", "cafe", "te", "menu", "delicioso", "sabroso", "bocado"
]

# compile word boundary regex for keywords
patterns = [re.compile(rf"\b{kw}\b", re.IGNORECASE) for kw in keywords]

def search_value(val, filepath):
    matches = []
    if isinstance(val, str):
        for kw, pat in zip(keywords, patterns):
            if pat.search(val):
                matches.append(kw)
    elif isinstance(val, dict):
        for k, v in val.items():
            matches.extend(search_value(k, filepath))
            matches.extend(search_value(v, filepath))
    elif isinstance(val, list):
        for item in val:
            matches.extend(search_value(item, filepath))
    return matches

for i in range(1, 13):
    filename = f"anim_{i}.json"
    filepath = os.path.join(lottie_dir, filename)
    if os.path.exists(filepath):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
            matches = search_value(data, filepath)
            matches = list(set(matches))
            if matches:
                print(f"File {filename} matches: {matches}")
            else:
                print(f"File {filename}: no matches.")
        except Exception as e:
            print(f"Error {filename}: {e}")
