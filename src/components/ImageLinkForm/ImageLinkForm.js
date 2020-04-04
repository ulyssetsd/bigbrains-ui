import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({defaultInput, onInputChange, onButtonSubmit}) => (
	<div className='ma4'>
		<p className='f3'>
			{'This Magic brain will detect faces in your pictures. Give it a try'}
		</p>
		<div className='pattern pa4 shadow-2 mw8 center'>
			<input type='text' className='f4 pa2 w-70' 
				onChange={onInputChange}
				value={defaultInput}
				/>
			<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-pink pointer' 
				onClick={onButtonSubmit}>Detect</button>
		</div>
	</div>
)

export default ImageLinkForm;