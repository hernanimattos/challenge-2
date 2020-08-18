import React, { useEffect, useState } from 'react';
import api from './services/api';
import './styles.css';

function App() {
	const [repositories, setRepositorie] = useState([]);
	useEffect(() => {
		api.get('repositories').then((resp) => {
			const { data } = resp;
			setRepositorie(data);
		});
	}, []);
	async function handleAddRepository() {
		// TODO
		const { data: repo } = await api.post('repositories');
		setRepositorie([...repositories, repo]);
	}

	async function handleRemoveRepository(id) {
		// TODO
		await api.delete(`repositories/${id}`);

		setRepositorie(repositories.filter((repo) => repo.id !== id));
	}

	return (
		<div>
			<ul data-testid="repository-list">
				{repositories.map((repo) => {
					return (
						<li key={repo.id}>
							{repo.title}
							<button onClick={() => handleRemoveRepository(repo.id)}>
								Remover
							</button>
						</li>
					);
				})}
			</ul>

			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	);
}

export default App;
