// DOM queries

const list = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newChatName = document.querySelector('.new-name');
const selectRoom = document.querySelector('.chat-rooms');
const updateMsg = document.querySelector('.update-msg');

// add a new chat
const username =localStorage.getItem('username');
const chatroom =username?new Chat("general",username):new Chat("general",'Anon');
const ui = new ChatUi(list);



newChatForm.addEventListener('submit' , e=>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then(()=>newChatForm.reset());
});

// update username
newChatName.addEventListener('submit' , e=>{
    e.preventDefault();
    const name = newChatName.name.value.trim();
    chatroom.updateName(name);
    updateMsg.innerHTML =`<p class="updated-name text-center my-2">Name updated to : <span>${name}</span></p>`;
    newChatName.reset();
    setTimeout(() =>updateMsg.innerText='' ,3000); 
});

// loading chat 
chatroom.getChats(data => ui.render(data));

// selecting chat rooms
selectRoom.addEventListener('click', e =>{
    if(e.target.tagName === 'BUTTON'){
        chatroom.updateRoom(e.target.id);
        list.innerHTML ='';
        chatroom.getChats(data => ui.render(data));
    }
});