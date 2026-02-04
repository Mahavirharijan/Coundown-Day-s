import sys
import json
import requests
from datetime import datetime, timedelta, time

mode = sys.argv[1] if len(sys.argv) > 1 else "unlock"

with open("data/config.json", encoding="utf-8") as f:
    config = json.load(f)

bot_token = config["telegram"]["botToken"]
chat_id = config["telegram"]["chatId"]
chat_id2 = config["telegram"]["chatId2"]

# Calculate IST time
now_utc = datetime.utcnow()
now_ist = now_utc + timedelta(hours=5, minutes=30)
today = now_ist.strftime("%Y-%m-%d")
current_time = now_ist.time()
reminder_time = time(*map(int, config["reminderTime"].split(":")))  # 9:00 AM


def send_msg(msg):
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    requests.post(url, data={
        "chat_id": chat_id,
        "text": msg,
        "parse_mode": "HTML"
    })
    requests.post(url, data={
        "chat_id": chat_id2,
        "text": msg,
        "parse_mode": "HTML"
    })

for day in config["days"]:
    if day["date"] == today:
        # 🔓 MAIN UNLOCK MESSAGE
        match mode:

            case "unlock" if day["autoUnlock"]:
                msg = (
                    f"<b>{day['title']}</b>\n\n"
                    f"Something special is waiting just for you 💝\n"
                    f"Your Unlock Card is ready, only for my queen 👑\n\n"
                    f"🔗 https://mahavirharijan.github.io/Coundown-Day-s/\n"
                    f"🔐 Access Code: <b>{config['accessCode']}</b>"
                )
                send_msg(msg)

            case "reminder":
                msg = (
                    f"⏰ Reminder!\n\n"
                    f"I know you're excited for tomorrow's card 😍\n"
                    f"Just wait a little… the card will open at <b>12:00 am</b> 🕛\n\n"
                    f"Be ready 👇\n\n"
                    f"🔗 https://mahavirharijan.github.io/Coundown-Day-s/"
                )
                send_msg(msg)

            case "unlock" if current_time >= reminder_time:
                msg = (
                    f"⏰ Reminder!\n\n"
                    f"I know you're excited for tomorrow's card 😍\n"
                    f"Just wait a little… the card will open at <b>12:00 am</b> 🕛\n\n"
                    f"Be ready 👇\n\n"
                    f"🔗 https://mahavirharijan.github.io/Coundown-Day-s/"
                )
                send_msg(msg)

            case _:
                print("No matching mode")


