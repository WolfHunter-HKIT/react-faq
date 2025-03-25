// Core imports
import './App.css';
import { useEffect, useState } from 'react';

// Component imports
import SendForm from './components/sendForm.js';

// Database imports
import { db } from './configs/firebase.conf.js';
import {
	collection,
	getDocs,
	query,
} from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js';
import LoadData from './components/loadData.js';

function App() {
	const [rows, setRow] = useState([]);
	const [nameInput, setNameInput] = useState('');
	const [emailInput, setEmailInput] = useState('');
	const [questionInput, setQuestionInput] = useState('');

	const [fetchComplete, setFetchStatus] = useState(false);
	const [databaseList, setDatabaseList] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const querySnapshot = await getDocs(query(collection(db, 'questions')));
				const items = [];

				if (querySnapshot.size === 0) {
					return;
				}

				// setDatabaseList(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

				await querySnapshot.forEach((doc) => {
					items.push({
						id: doc.id,
						...doc.data(),
					});
				});
				setDatabaseList(items);
				setFetchStatus(true);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
		return console.log('Initialization complete.');
	}, []);

	useEffect(() => {
		const loadData = () => {
			console.log(databaseList, 'Load Data func');
			let d = 0;
			for (let i = rows.length; i < databaseList.length; i++) {
				setRow([
					...rows,
					<LoadData
						key={i}
						name={databaseList[d].name}
						question={databaseList[d++].question}
					/>,
				]);
				console.log(databaseList[d], i);
			}
			// databaseList.forEach((item) => {
			// 	console.log(rows.length, databaseList.length);
			// 	setRow([
			// 		...rows,
			// 		<LoadData key={rows.length} name={item.name} question={item.question} />,
			// 	]);
			// });
		};
		loadData();
	}, [fetchComplete]);

	const addRow = (e) => {
		e.preventDefault();
		setRow([
			...rows,
			<SendForm
				key={rows.length}
				name={nameInput}
				email={emailInput}
				question={questionInput}
			/>,
		]);

		setNameInput('');
		setEmailInput('');
		setQuestionInput('');
	};

	const handleNameInput = (e) => {
		setNameInput(e.target.value);
	};
	const handleEmailInput = (e) => {
		setEmailInput(e.target.value);
	};
	const handleQuestionInput = (e) => {
		setQuestionInput(e.target.value);
	};

	return (
		<div>
			<form action='' onSubmit={addRow}>
				<label htmlFor='name'>Name*</label>
				<input
					type='text'
					name='name'
					id='nameInput'
					placeholder='Enter name'
					value={nameInput}
					onChange={handleNameInput}
					required
				/>
				<label htmlFor='email'>Email address*</label>
				<input
					type='email'
					name='email'
					id='emailInput'
					placeholder='Enter email'
					value={emailInput}
					onChange={handleEmailInput}
					required
				/>
				<label htmlFor='question'>Question*</label>
				<textarea
					name='question'
					id='questionInput'
					placeholder='Enter your question'
					value={questionInput}
					onChange={handleQuestionInput}
					required
				/>
				<button type='submit'>Send</button>
			</form>

			<div id='questionDisplay'>
				<div className='displayRow'>
					<div className='nameCol'>Client Name</div>
					<div className='questionCol'>Client Question</div>
				</div>
				{rows}
			</div>
		</div>
	);
}

export default App;
