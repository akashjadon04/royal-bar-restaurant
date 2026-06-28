import os
import json

public_dir = r"c:\Users\Akash\Desktop\royal-bar-restaurant\public"
lottie_dir = os.path.join(public_dir, "lottie")

def inspect_file(filepath):
    if os.path.exists(filepath):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
            name = data.get('nm', 'no name')
            layers = [layer.get('nm', '') for layer in data.get('layers', [])]
            print(f"File: {os.path.basename(filepath)}")
            print(f"  Name (nm): {name}")
            print(f"  Layers (first 10): {layers[:10]}")
            # check if there are specific keys
            print("-" * 40)
        except Exception as e:
            print(f"Error {filepath}: {e}")

print("=== Base Lottie Files in public/ ===")
for name in ["lottie-cart.json", "lottie-chef.json", "lottie-delivery.json", "lottie-story.json"]:
    inspect_file(os.path.join(public_dir, name))
