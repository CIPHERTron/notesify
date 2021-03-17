import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Brightness3, BrightnessHigh } from '@material-ui/icons';

export default function Nav({ setIsLogin }) {
	const [toggle, setToggle] = useState('dark');
	const handleLogout = () => {
		localStorage.clear();
		setIsLogin(false);
	};

	const handleToggle = () => {
		toggle === 'dark' ? setToggle('light') : setToggle('dark');
	};

	return (
		<header>
			<div className='logo'>
				<h1>
					<Link to='/'>Notesify</Link>
				</h1>
			</div>

			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/create'>
						Create Note
					</Link>
				</li>
				<li className="theme" onClick={handleLogout}>
					<Link to='/'>Logout</Link>
				</li>
				<li>
					<i
						className='mode-toggle'
						onClick={
							handleToggle
						}
					>
						{' '}
						{toggle ===
						'dark' ? (
							<Brightness3 style={{fontSize: 35}} />
						) : (
							<BrightnessHigh style={{fontSize: 35}} />
						)}{' '}
					</i>
				</li>
			</ul>
		</header>
	);
}
