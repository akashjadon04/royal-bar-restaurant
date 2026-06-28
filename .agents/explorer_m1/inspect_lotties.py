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
            
            # Print basic info
            name = data.get('nm', 'no name')
            # Let's collect layer names
            layers = [layer.get('nm', '') for layer in data.get('layers', [])]
            # assets layer names
            assets_layers = []
            for asset in data.get('assets', []):
                if 'layers' in asset:
                    assets_layers.extend([l.get('nm', '') for l in asset['layers']])
            
            print(f"File: {filename}")
            print(f"  Name (nm): {name}")
            print(f"  Layers (first 10): {layers[:10]}")
            if assets_layers:
                print(f"  Asset Layers (first 10): {assets_layers[:10]}")
            print("-" * 40)
        except Exception as e:
            print(f"Error reading {filename}: {e}")
