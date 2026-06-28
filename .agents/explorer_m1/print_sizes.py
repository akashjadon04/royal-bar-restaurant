import os

public_dir = r"c:\Users\Akash\Desktop\royal-bar-restaurant\public"
lottie_dir = os.path.join(public_dir, "lottie")

print("=== public/lottie/ ===")
for i in range(1, 13):
    filename = f"anim_{i}.json"
    filepath = os.path.join(lottie_dir, filename)
    if os.path.exists(filepath):
        print(f"{filename}: {os.path.getsize(filepath)} bytes")
    else:
        print(f"{filename}: NOT FOUND")

print("\n=== public/ ===")
for name in ["lottie-cart.json", "lottie-chef.json", "lottie-delivery.json", "lottie-story.json", "animation.json"]:
    filepath = os.path.join(public_dir, name)
    if os.path.exists(filepath):
        print(f"{name}: {os.path.getsize(filepath)} bytes")
    else:
        print(f"{name}: NOT FOUND")
