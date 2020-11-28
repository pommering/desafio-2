import React,{ useState, useEffect } from "react";
import api from "./services/api.js";
import Api from "./services/api.js";


import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    Api.get('repositories').then(response => {
      setRepositories(response.data)
    });
  }, []);
  

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: 'teste',
      url:'teste.com',
      techs:['react','html','jquery']
    });

    const repository = response.data;

    setRepositories([...repositories,repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie =>(
          <li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
