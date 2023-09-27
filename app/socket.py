from flask_socketio import SocketIO, emit, join_room, leave_room, close_room
from flask_login import current_user
import os

# # create your SocketIO instance
# socketio = SocketIO()

# configure cors_allowed_origins
if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "https://sweet-petals.onrender.com/",
        "https://sweet-petals.onrender.com/",
    ]
else:
    origins = "*"


# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)



# handle chat messages when message_update event is emitted from the frontend
@socketio.on("chat")
def handle_chat(data):
    # print("**************************SEND_MESSAGE DATA START**************************")
    # print(data)
    # print("**************************SEND_MESSAGE DATA END**************************")
    emit(
        "chat_response",
        {
            "message_id": data.get("message_id", None),
            "message": data.get("message", None),
            "admin_id": data["admin_id"],
            "customer_id": data["customer_id"],
            "sender": data["sender"],
        },
        # broadcast=False,
        # will connect to all connected users when true
        broadcast=True,
    )
