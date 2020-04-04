import React from 'react';

const FaceRecognition = ({sourceImage, boxs}) => (
	<div className='tc'>
		<div id='faceImageContainer' className='relative center' style={{width:'fit-content', height:'fit-content'}}>
			<img id='faceImage' className='mw-80' src={sourceImage} alt='Link not working, try something else'/>
			{
				boxs.map((box, i) => (
						<div className='ba bw1 b--white absolute' key={i} style={{
							top: (box.top_row * 100)+'%', 
							left: (box.left_col * 100)+'%', 
							bottom: ((1 - box.bottom_row) * 100)+'%', 
							right: ((1 - box.right_col) * 100)+'%'
						}}></div>
				))
			}
		</div>
	</div>
)

export default FaceRecognition;