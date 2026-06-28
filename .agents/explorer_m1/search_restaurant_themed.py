import os
import json

lottie_dir = r"c:\Users\Akash\Desktop\royal-bar-restaurant\public\lottie"
keywords = [
    # English
    "food", "chef", "cook", "serve", "serving", "restaurant", "burger", "pizza", "wine", "beer", "dining", "bar", "table", 
    "waiter", "kitchen", "eat", "drink", "cup", "plate", "fork", "spoon", "knife", "glass", "bottle", "bowl", "pot", "pan", 
    "coffee", "tea", "baking", "bake", "menu", "delicious", "yummy", "tasty",
    # Spanish
    "comida", "cocinero", "cocinar", "servir", "restaurante", "hamburguesa", "vino", "cerveza", "cenar", "cena", "mesa",
    "camarero", "cocina", "comer", "beber", "taza", "plato", "tenedor", "cuchara", "cuchillo", "vaso", "botella", "bol", "olla",
    "sarten", "cafe", "te", "menu", "delicioso", "sabroso", "bocado"
]

for i in range(1, 13):
    filename = f"anim_{i}.json"
    filepath = os.path.join(lottie_dir, filename)
    if os.path.exists(filepath):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read().lower()
            
            found = []
            for kw in keywords:
                if kw in content:
                    found.append(kw)
            if found:
                print(f"File {filename} matches keywords: {found}")
            else:
                print(f"File {filename} matches no keywords.")
        except Exception as e:
            print(f"Error reading {filename}: {e}")
