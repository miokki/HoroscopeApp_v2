import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { HoroscopeForm } from './components/Form/HoroscopeForm';
import { HoroscopeChart } from './components/Chart/HoroscopeChart';
import { ThemeToggle } from './components/ThemeToggle';
import './styles/index.css';

function App() {
  const [horoscopeData, setHoroscopeData] = React.useState(null);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-text">
        <ThemeToggle />
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="form-container">
            <HoroscopeForm onDataReceived={setHoroscopeData} />
          </div>
          {horoscopeData && (
            <div className="mt-8">
              <HoroscopeChart data={horoscopeData} />
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;