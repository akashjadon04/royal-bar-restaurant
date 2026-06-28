import os
import json

lottie_dir = r"c:\Users\Akash\Desktop\royal-bar-restaurant\public\lottie"

def dump_file_layers(filename):
    filepath = os.path.join(lottie_dir, filename)
    if os.path.exists(filepath):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
            print(f"=== {filename} ===")
            layers = [layer.get('nm', '') for layer in data.get('layers', [])]
            print("Layers:", layers)
            assets = []
            for asset in data.get('assets', []):
                asset_name = asset.get('id', '')
                asset_layers = [l.get('nm', '') for l in asset.get('layers', [])]
                if asset_layers:
                    assets.append((asset_name, asset_layers))
            if assets:
                print("Assets:")
                for a_id, a_lays in assets:
                    print(f"  {a_id}: {a_lays}")
            print()
        except Exception as e:
            print(f"Error {filename}: {e}")

for i in [6, 7, 8, 12]:
    dump_file_layers(f"anim_{i}.json")
