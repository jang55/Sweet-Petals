// import the socket
import { io } from 'socket.io-client';
// outside of your component, initialize the socket variable
let socket = io()


export function chatUpdateEmitter(data) {
    socket.emit("chat", {
        message_id: data["id"],
        message: data["message"],
        admin_id: data["admin_id"],
        customer_id: data["customer_id"],
        sender: data["sender"],
    });
}

export function handleChatUpdate(cb, paramUserId) {
    socket.on("chat_response", (data) => {
        // when we recieve a chat, dispatch customer messages
        if(Number(paramUserId) === Number(data.customer_id)) {
            cb(data.customer_id);
        }
    })
}

export function messageListEmitter() {
    socket.emit("message_list", {});
}

export function handleMessageListUpdate(cb) {
    socket.on("message_list_response", (data) => {
        // when we recieve a chat, dispatch call message list messages
        cb()
    })
}

export default socket