import sys
import json
import requests
from datetime import datetime, timedelta

# Get mode from command line (default: unlock)
mode = sys.argv[1] if len(sys.argv) > 1 else "unlock"

try:
    # Load config
    with open("data/config.json", encoding="utf-8") as f:
        config = json.load(f)
except FileNotFoundError:
    print("Error: config.json not found in data/ directory.")
    sys.exit(1)
except json.JSONDecodeError:
    print("Error: Invalid JSON in config.json.")
    sys.exit(1)

bot_token = config["telegram"]["botToken"]
chat_id = config["telegram"]["chatId"]
chat_id2 = config["telegram"]["chatId2"]

# Calculate IST time
now_utc = datetime.utcnow()
now_ist = now_utc + timedelta(hours=5, minutes=30)
today = now_ist.strftime("%Y-%m-%d")

print(f"Debug: Current UTC: {now_utc}, IST: {now_ist}, Today: {today}, Mode: {mode}")

def send_msg(msg, debug=False):
    """Send message to both chat IDs. If debug=True, prefix with [DEBUG]."""
    if debug:
        msg = f"[DEBUG] {msg}"
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    try:
        response1 = requests.post(url, data={
            "chat_id": chat_id,
            "text": msg,
            "parse_mode": "HTML"
        })
        response2 = requests.post(url, data={
            "chat_id": chat_id2,
            "text": msg,
            "parse_mode": "HTML"
        })
        if response1.status_code != 200 or response2.status_code != 200:
            print(f"Error sending message: {response1.text} | {response2.text}")
        else:
            print("Message sent successfully.")
    except Exception as e:
        print(f"Error sending message: {e}")

# Send a debug message on startup (optional, for testing)
send_msg(f"Bot started. Mode: {mode}, Today: {today}", debug=True)

# Process days
found_day = False
for day in config["days"]:
    if day["date"] == today and day.get("autoUnlock", False):
        found_day = True
        # print(f"Debug: Processing day {day['date']} - {day['title']}")
        
        # 🔓 MAIN UNLOCK MESSAGE
        if mode == "unlock":
            msg = (
                f"<b>{day['title']}</b>\n\n"
                f"Something special is waiting just for you 💝\n"
                f"Your Unlock Card is ready, only for my queen 👑\n\n"
                f"🔗 https://mahavirharijan.github.io/Coundown-Day-s/\n"
                f"🔐 Access Code: <b>{config['accessCode']}</b>"
            )
            send_msg(msg)
            break

        # ⏰ REMINDER MESSAGE
        elif mode == "reminder":
            msg = (
                f"⏰ Reminder!\n\n"
                f"Today's card <b>{day['title']}</b> is waiting 💕\n"
                f"Open it now 👇\n\n"
                f"🔗 https://mahavirharijan.github.io/Coundown-Day-s/"
            )
            send_msg(msg)
            break

if not found_day:
    print(f"No matching day found for {today} with autoUnlock=True.")
    # Optional: Send a no-match debug message
    # send_msg(f"No event today ({today}).", debug=True)