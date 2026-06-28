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
            
            # Print file name and metadata
            print(f"File: {filename}")
            print(f"  Width: {data.get('w')}, Height: {data.get('h')}, Framerate: {data.get('fr')}, OutPoint: {data.get('op')}")
            
            # Collect all layer names and types
            layers_info = []
            for layer in data.get('layers', []):
                layers_info.append(f"{layer.get('nm')} (type {layer.get('ty')})")
            print(f"  Layers: {layers_info[:15]}")
            
            # Collect asset info
            assets_info = []
            for asset in data.get('assets', []):
                asset_nm = asset.get('nm', '')
                asset_id = asset.get('id', '')
                asset_layers = [l.get('nm') for l in asset.get('layers', [])]
                assets_info.append(f"ID={asset_id}, Name={asset_nm}, Layers={asset_layers[:5]}")
            if assets_info:
                print(f"  Assets: {assets_info[:10]}")
            print("-" * 50)
        except Exception as e:
            print(f"Error {filename}: {e}")
