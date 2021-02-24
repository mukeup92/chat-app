import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import MessageBox from './MessageBox';
import './index.css';


function ChatsSection({socket}) {
	const divRef = useRef();
	const [ messages, setMessages ] = useState([]);
	const [ typer, setTyper ] = useState('');

 	useEffect(() => {
		socket && socket.on('messages', (data) => {
			setMessages(data)
			divRef.current && divRef.current.scrollTo({top: divRef.current.scrollHeight, behaviour: 'smooth'});
		});
		socket && socket.on('typer', (typer) => setTyper(typer))
	}, [socket])// eslint-disable-line

	return (
		<div className="col-8">
			<div className="border chat-section" ref={divRef}>
				{messages.map((chat,  idx) => (<Message key={`${idx}-${chat.nicName}`} chat={chat} />))}
				<div className="typing text-success">{typer && typer !== localStorage.getItem('nicName') && `${typer} is typing...`}</div>
			</div>
			<MessageBox socket={socket} />
		</div>
    )
}

export default ChatsSection;