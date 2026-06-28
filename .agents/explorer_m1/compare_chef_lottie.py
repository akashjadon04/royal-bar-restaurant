import os
import hashlib

public_dir = r"c:\Users\Akash\Desktop\royal-bar-restaurant\public"
lottie_dir = os.path.join(public_dir, "lottie")

chef_path = os.path.join(public_dir, "lottie-chef.json")
if os.path.exists(chef_path):
    with open(chef_path, 'rb') as f:
        chef_hash = hashlib.md5(f.read()).hexdigest()
    print(f"lottie-chef.json hash: {chef_hash}")
else:
    chef_hash = None
    print("lottie-chef.json not found!")

for i in range(1, 13):
    filename = f"anim_{i}.json"
    filepath = os.path.join(lottie_dir, filename)
    if os.path.exists(filepath):
        with open(filepath, 'rb') as f:
            h = hashlib.md5(f.read()).hexdigest()
        print(f"anim_{i}.json hash: {h}")
        if chef_hash and h == chef_hash:
            print(f"===> MATCH FOUND: anim_{i}.json is identical to lottie-chef.json")
