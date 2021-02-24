import React, { useEffect, useState } from 'react';

function UserSection({socket}) {
	const [newName, setNewName] = useState('')
	const [name, setName] = useState('')
	const localName = localStorage.getItem('nicName')

	useEffect(() => {
		setName(localStorage.getItem('nicName')) 
	}, [localName])

	const onSubmit = () =>{
		if (!newName) return;
		socket.emit('change-name', {oldName: localStorage.getItem('nicName'), newName})
		localStorage.setItem('nicName', newName);
		setNewName('')
	}

	return (
		<div className="col-4">
			<div className="row mx-0 mt-3">
				<div className="fs-1">
					Current User
				</div>
			</div>
			<div className="row mx-0 mt-3">
				<div className="text-left fs-3">
					Name :- <span className="text-primary">{name}</span>
				</div>
			</div>
			<div className="row mx-0 mt-3">
				<div className="text-left fs-4">
					Change Name
				</div>
			</div>
			<div className="row mx-3 mt-2">
				<input className="form-control w-75" value={newName} onChange={(e) => setNewName(e.target.value)} />
			</div>
			<div className='row mx-3 mt-2'>
				<button className='btn btn-success w-75' onClick={onSubmit}>
					Submit
				</button>
			</div>
		</div>
	)
}

export default UserSection;