import React from 'react';

const ErrorAlert = ({errorMessage}) => (
	<div className="mw8 center br2 ba b--dark-red bg-washed-red dark-red pa3 mt3" >
		{ errorMessage }
	</div>
)

export default ErrorAlert;