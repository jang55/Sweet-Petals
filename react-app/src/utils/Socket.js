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
        // when we recieve a chat, add it into our messages array in state
        if(Number(paramUserId) === Number(data.customer_id)) {
            cb(data.customer_id);
        }
    })
}





export default socket