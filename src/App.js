import { useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api.js';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCEP] = useState('');

  async function handleSearch(){
    
    if(input === ''){
      alert("Preencha com algum CEP!");
      return;
    }

    try{

      // eslint-disable-next-line no-template-curly-in-string
      var finalApi = input + '/json';
      const response = await api.get(finalApi);
      setCEP(response.data)
      setInput("")
    }catch{
      alert("Ops... erro ao buscar aqui...")
      setInput("")
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite seu cep..."
        value={input}
        onChange={(e) => setInput(e.target.value) }
        />

      <button className="buttonSearch" onClick={handleSearch}>
        <FiSearch size={25} color="FFF" />
      </button>

      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          {Object.keys(cep.complemento).length > 0 && (
            <span>Complemento: {cep.complemento}</span>
          )}
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>

        </main>
      )}

    </div>
  );
}

export default App;
