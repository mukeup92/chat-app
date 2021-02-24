import React, { useEffect } from 'react';
import ChatsSection from './components/ChatsSection';
import UserSection from './components/UserSection';
import './App.css';

function Main({socket}) {
	useEffect(() => {
		const nicName = localStorage.getItem('nicName');
		if (!nicName) {
			let name = ''
			while (true) {
				if (name) break;
				name = window.prompt('Enter your nick name'); 
			}
			localStorage.setItem('nicName', name);
		}
		socket.emit('join', localStorage.getItem('nicName'));
		window.addEventListener('beforeunload', () => {socket.emit('left', localStorage.getItem('nicName')); socket.emit('not-typing', localStorage.getItem('nicName'))})
		return () => { window.removeEventListener('beforeunload', () => {socket.emit('left', localStorage.getItem('nicName')) })}
	})


	return (
		<div className="row mx-0 mt-2">
			<ChatsSection socket={socket} />
			<UserSection socket={socket} />
		</div>
	);
}

export default Main;