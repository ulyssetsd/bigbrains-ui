import React from 'react';

const Rank = ({name, entries}) => (
	<div>
		<div className='white f3'>
			{ `${name}, your current faces count is...` }
		</div>
		<div className='white f1'>
			{ entries }
		</div>
	</div>
)

export default Rank;