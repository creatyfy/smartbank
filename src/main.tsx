import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

// Registro robusto do Service Worker para PWA (iOS e Android)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });

      // Atualizar o SW quando uma nova versão estiver disponível
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Nova versão disponível - enviar sinal para ativar imediatamente
              newWorker.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        }
      });

      console.log('[PWA] Service Worker registrado com sucesso:', registration.scope);
    } catch (error) {
      console.warn('[PWA] Falha ao registrar Service Worker:', error);
    }
  });

  // Recarregar quando o SW for atualizado (garante que o novo SW seja usado)
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
}
