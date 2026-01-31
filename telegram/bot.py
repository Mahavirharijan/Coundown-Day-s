import sys
import json
import requests
from datetime import datetime, timedelta

mode = sys.argv[1] if len(sys.argv) > 1 else "unlock"

with open("data/config.json", encoding="utf-8") as f:
    config = json.load(f)

bot_token = config["telegram"]["botToken"]
chat_id = config["telegram"]["chatId"]

# IST time
now_utc = datetime.utcnow()
now_ist = now_utc + timedelta(hours=5, minutes=30)
today = now_ist.strftime("%Y-%m-%d")

def send_msg(msg):
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    requests.post(url, data={
        "chat_id": chat_id,
        "text": msg,
        "parse_mode": "HTML"
    })

for day in config["days"]:
    if day["date"] == today and day["autoUnlock"]:
        
        # 🔓 MAIN UNLOCK MESSAGE
        if mode == "unlock":
            msg = (
                f"💖 <b>{day['title']}</b>\n\n"
                f"{day['message']}\n\n"
                f"🔗 https://mahavirharijan.github.io/Coundown-Day-s/\n"
                f"🔐 Access Code: <b>{config['SHEMDI']}</b>"
            )
            send_msg(msg)
            break

        # ⏰ REMINDER MESSAGE
        if mode == "reminder":
            msg = (
                f"⏰ Reminder!\n\n"
                f"Today's card <b>{day['title']}</b> is waiting 💕\n"
                f"Open it now 👇\n"
                f"https://mahavirharijan.github.io/Coundown-Day-s/"
            )
            send_msg(msg)
            break
