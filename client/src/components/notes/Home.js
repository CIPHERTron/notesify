import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import axios from 'axios';

export default function Home() {
	const [notes, setNotes] = useState([]);
	const [token, setToken] = useState('');

	const getNotes = async (token) => {
		const res = await axios.get('api/notes', {
			headers: { Authorization: token },
		});
		// console.log(res);
		setNotes(res.data);
	};

 const handleDelete = async (id) => {
  // console.log(id);
  try {
   if(token) {
    await axios.delete(`api/notes/${id}`, {
     headers: {Authorization: token}
    })
    getNotes(token)
   }
  } catch (error) {
   window.location.href="/";
  }
 }

	useEffect(() => {
		const token = localStorage.getItem('tokenStore');
		setToken(token);
		if (token) {
			getNotes(token);
		}
	}, []);

	return (
		<div className='note-wrapper'>
			{notes.map(note => (
    <div className='card' key={note._id}>
					<h3 title={note.title}>
      {note.title}
					</h3>
					<div className='text-wrapper'>
						<p> {note.content} </p>
					</div>
					<p className='date'> {format(note.date, 'en_US')}	</p>
					<div className='card-footer'>
						{note.name}
     <Link to={`edit/${note._id}`}>
							Edit
						</Link>
					</div>
					<button onClick={() => handleDelete(note._id)} className='close'>
						X
					</button>
				</div>
   ))}
		</div>
	);
}
