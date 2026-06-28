import os
import json

lottie_dir = r"c:\Users\Akash\Desktop\royal-bar-restaurant\public\lottie"

for i in range(1, 13):
    filename = f"anim_{i}.json"
    filepath = os.path.join(lottie_dir, filename)
    if os.path.exists(filepath):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
            assets = data.get('assets', [])
            image_assets = []
            for asset in assets:
                if 'p' in asset and asset['p'].startswith('data:image'):
                    image_assets.append(asset['id'])
            if image_assets:
                print(f"File {filename} has base64 image assets: {image_assets}")
            else:
                print(f"File {filename} has no base64 image assets.")
        except Exception as e:
            print(f"Error {filename}: {e}")
