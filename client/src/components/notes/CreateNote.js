import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function CreateNote() {
	const [note, setNote] = useState({
		title: '',
		content: '',
		date: '',
	});

	const history = useHistory();

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setNote({ ...note, [name]: value });
	};

	const addNote = async (e) => {
			e.preventDefault();
			try {
					const token = localStorage.getItem('tokenStore');
					if(token) {
							const {title, content, date} = note;
							const newNote = {
									title, content, date
							}

							await axios.post('/api/notes', newNote, {
									headers: {Authorization: token}
							});

							return history.push('/');
					}
			} catch (err) {
					window.location.href = "/";
			}
	}

	return (
		<div className='create-note'>
			<h1>Create Note</h1>

			<form onSubmit={addNote} autoComplete="off">
				<div className='row'>
					<label htmlFor='title'>
						Title
					</label>
					<input
						type='text'
						value={note.title}
						id='title'
						name='title'
						required
						onChange={onChangeInput}
					/>
				</div>
				<div className='row'>
					<label htmlFor='title'>
						Content
					</label>
					<textarea
						type='text'
						value={note.content}
						id='content'
						name='content'
						required
						rows='10'
						onChange={onChangeInput}
					/>
				</div>
				<label htmlFor='title'>
					Date: {note.date}
				</label>
				<div className='row'>
					<input
						type='date'
						id='date'
						name='date'
						onChange={onChangeInput}
					/>
				</div>

				<button type='submit'>Add Note</button>
			</form>
		</div>
	);
}
