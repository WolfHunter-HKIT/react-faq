import React from 'react';

import {
	collection,
	doc,
	setDoc,
} from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js';
import { db } from '../configs/firebase.conf.js';

function SendForm({ name, email, question }) {
	setDoc(doc(collection(db, 'questions')), {
		name: name,
		email: email,
		question: question,
	});

	return (
		<div className='displayRow'>
			<div className='nameCol'>{name}</div>
			<div className='questionCol'>{question}</div>
		</div>
	);
}

export default SendForm;
