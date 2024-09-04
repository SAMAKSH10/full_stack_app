import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <div className="h-screen w-screen bg-gradient-to-br from-black to-white">
    <App />
  </div>
);
