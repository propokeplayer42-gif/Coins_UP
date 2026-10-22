import './App.css';
import { BrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { AutorProvider } from './contex/AutorProvider';
import { FavoritosProvider } from './contex/FavoritosProvider';

function App() {
  return (
    <BrowserRouter>
      <AutorProvider>
        <FavoritosProvider>
          <Layout />
        </FavoritosProvider>
      </AutorProvider>
    </BrowserRouter>
  );
}

export default App;