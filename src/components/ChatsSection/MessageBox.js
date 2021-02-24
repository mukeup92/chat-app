import { useState } from "react";
import React from 'react';

function MessageBox({socket}) {
	const [ message, setMessage ] = useState('');

	const onSend = () => {
		if (!message) return;
		socket.emit('message', {
			nicName: localStorage.getItem('nicName'),
			message,
		})
		setMessage('');
		socket.emit('not-typing', localStorage.getItem('nicName'))
	}

	const onMessageChange = (e) => {
		setMessage(e.target.value)
		if (e.target.value) {
			socket.emit('typing', localStorage.getItem('nicName'))
		}
		else {
			socket.emit('not-typing', localStorage.getItem('nicName'))
		}
	}

	return <div className="row mx-0 mt-1">
		<div className="col-10 px-0 pr-1">
			<textarea className="form-control" value={message} onChange={onMessageChange} placeholder="write something..."/>
		</div>
		<div className="col-2 px-0">
			<button type="button" onClick={onSend} className="btn btn-success send-button w-100">Success</button>
		</div>
	</div>
}

export default MessageBox;