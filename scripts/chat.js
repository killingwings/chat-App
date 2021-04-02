class Chat{
    constructor(room,username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }

    async addChat(message){

        let now = new Date();
        // create js object
        let chat ={ 
            message,
            room: this.room,
            username: this.username,
            created_at : firebase.firestore.Timestamp.fromDate(now)
        };

        const response = await this.chats.add(chat);
        return response;
    }
    getChats(callback) {
        this.unsub=this.chats
        .where('room', "==", this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === "added"){
                    callback(change.doc.data());
                }
            });   
        });
    }
    updateRoom(room){
        this.room = room;
        if(this.unsub){
            this.unsub();
        }
    }
    updateName(username){
        this.username = username;
        localStorage.setItem('username', username);
    }
    
}


// const chatroom = new Chat('gaming','Veer Singh');

// chatroom.addChat('Hi i am veer').then(()=>{
//     console.log("chat added");
// });
// chatroom.getChats((data)=>{
//     console.log(data);
// })