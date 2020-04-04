import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => (
	<div className='ma4 mt0'>
		<Tilt className="Tilt br2 shadow-2 h4 w4" options={{ max : 50 }}>
			<div className="Tilt-inner"><img className='h3 pa4' src={brain} alt='logo' /></div>
		</Tilt>
	</div>
)

export default Logo;