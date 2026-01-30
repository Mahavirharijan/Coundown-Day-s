import json
import requests
from datetime import datetime

# Load config
with open("data/config.json", encoding="utf-8") as f:
    config = json.load(f)

bot_token = config["telegram"]["botToken"]
chat_id = config["telegram"]["chatId"]

today = datetime.now().strftime("%Y-%m-%d")
print("Today Date:", today)
print("Bot Token:", bot_token)
print("Chat ID:", chat_id)

def send_msg(msg):
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    data = {
        "chat_id": chat_id,
        "text": msg,
        "parse_mode": "HTML"
    }
    response = requests.post(url, data=data)
    print("Telegram API Response:", response.text)

# Test message (always send once)
send_msg("🔔Reminder!")

# Daily unlock logic
for day in config["days"]:
    print("Checking Day:", day["date"], day["title"])

    if day["date"] == today and day["autoUnlock"]:
        msg = f"Hey Nannu!👩‍❤️‍👨 <b>{day['title']}</b>\n\nSomething special is waiting just for you 💝\nYour Unlock Card is ready, only for my queen 👑\n\n🔗 Link: https://mahavirharijan.github.io/Coundown-Day-s/\n🔐Access Code: SHEMDI\n\nOpen it and see how much you mean to me 🥰\nAlways yours, forever and ever 💕"
        send_msg(msg)
