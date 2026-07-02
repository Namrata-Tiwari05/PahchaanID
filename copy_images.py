import shutil
import os

src_dir = r"C:\Users\sweet\.gemini\antigravity-ide\brain\c17ad451-23cc-4dac-9c4d-8fa3306b9bf9"
dest_dir = r"c:\Users\sweet\PehchanID\PahchaanID\docs\images"

os.makedirs(dest_dir, exist_ok=True)

mapping = {
    "media__1782970684443.png": "landing.png",
    "media__1782970684576.png": "portal-choice.png",
    "media__1782970684544.png": "register.png",
    "media__1782970684613.png": "verification-logs.png",
    "media__1782970684627.png": "instant-checkin.png"
}

for src_name, dest_name in mapping.items():
    src_path = os.path.join(src_dir, src_name)
    dest_path = os.path.join(dest_dir, dest_name)
    if os.path.exists(src_path):
        shutil.copy(src_path, dest_path)
        print(f"Copied {src_name} -> {dest_name}")
    else:
        print(f"Source not found: {src_path}")
