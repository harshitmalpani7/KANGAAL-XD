import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#260d20', color: '#fff0f8', fontFamily: 'system-ui, sans-serif' }}>
          <section style={{ maxWidth: 560, padding: 28, borderRadius: 22, border: '1px solid #ff9bce66', background: '#572044aa', boxShadow: '0 20px 60px #0006' }}>
            <h1 style={{ marginTop: 0 }}>KANGAAL XD needs a quick refresh</h1>
            <p>The app hit a rendering error instead of showing a blank screen.</p>
            <pre style={{ whiteSpace: 'pre-wrap', opacity: .8 }}>{String(this.state.error?.message || this.state.error)}</pre>
            <button onClick={() => window.location.reload()} style={{ border: 0, borderRadius: 10, padding: '11px 16px', background: '#f052a0', color: 'white', fontWeight: 700, cursor: 'pointer' }}>Reload KANGAAL XD</button>
          </section>
        </main>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppErrorBoundary><App /></AppErrorBoundary>
  </React.StrictMode>
);
