import * as React from 'react'; // CORREÇÃO: Necessário para React 19 / versões mais recentes de tipagem
import * as ReactDOM from 'react-dom/client'; // CORREÇÃO: Necessário para React 19 / versões mais recentes de tipagem
import App from './App.tsx';

// ESSENCIAL: Importa o CSS para carregar os estilos Tailwind
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)