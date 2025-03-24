import React from 'react';

function LoadData({ name, question }) {
	return (
		<div className='displayRow'>
			<div className='nameCol'>{name}</div>
			<div className='questionCol'>{question}</div>
		</div>
	);
}

export default LoadData;
