import React, { Component } from 'react';

class Chat extends Component {

    constructor() {
        super();
        this.state = {
            messages: [
                // { id: 0, text: 'Hola, qué tal?' },
                // { id: 1, text: 'Hey, qué más? Todo bien' },
                // { id: 2, text: 'Qué bueno, me alegro!' },
            ]
        }
    }

    componentDidMount() {
        window.firebase.database().ref('messages/').on('value', snap => {
            const currentMessages = snap.val();
            if (currentMessages !== null) {
                this.setState({
                    messages: currentMessages
                });
            }
        });
    }

    addMessage = (e) => {
        e.preventDefault();

        const list = this.state.messages;
        const newMessage = {
            id: list.length,
            text: this.state.message
        }
        // list.push(newMessage);
        window.firebase.database().ref(`messages/${newMessage.id}`).set(newMessage.text);
        this.setState({ message: '' });
    }

    updateMessage = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    render() {

        const { messages } = this.state;
        const messagesList = messages.map((message, i) => {
            return <li key={i}> {message} </li>
        })
        return (<div>
            <ul >
                {messagesList}
            </ul>
            <form onSubmit={this.addMessage}>
                <input
                    onChange={this.updateMessage}
                    value={this.state.message}
                />
            </form>
        </div>
        );
    }
}

export default Chat;