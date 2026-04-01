import { useEffect } from 'react';

export type BankType = 'smartbank' | 'nubank' | 'santander' | 'inter' | 'mercadopago' | 'itau' | 'bradesco';

const bankMeta: Record<BankType, { name: string; icon: string; themeColor: string }> = {
  smartbank: {
    name: 'Smartbank',
    icon: 'https://images.dualite.app/d52f60de-2692-4885-8c36-cb03ccdd56d7/icon-96ba4374-20d4-45c6-ad59-9e436d21027e.webp',
    themeColor: '#D9385E',
  },
  nubank: { name: 'Nubank', icon: 'https://github.com/nubank.png', themeColor: '#8A05BE' },
  santander: { name: 'Santander', icon: 'https://www.google.com/s2/favicons?domain=santander.com.br&sz=256', themeColor: '#EC0000' },
  inter: { name: 'Inter', icon: 'https://www.google.com/s2/favicons?domain=bancointer.com.br&sz=256', themeColor: '#FF7A00' },
  mercadopago: { name: 'Mercado Pago', icon: 'https://www.google.com/s2/favicons?domain=mercadopago.com.br&sz=256', themeColor: '#009EE3' },
  itau: { name: 'Itaú', icon: 'https://images.dualite.app/d52f60de-2692-4885-8c36-cb03ccdd56d7/asset-cf457b12-f8ae-4fc5-9b06-93bc68304e05.webp', themeColor: '#EC7000' },
  bradesco: { name: 'Bradesco', icon: 'https://www.google.com/s2/favicons?domain=bradesco.com.br&sz=256', themeColor: '#cc092f' },
};

export function useBankManifest(bank: BankType) {
  useEffect(() => {
    const meta = bankMeta[bank];
    if (!meta) return;

    // Atualiza título e metatags visuais apenas — NÃO sobrescreve o manifest
    document.title = meta.name;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };

    const setTheme = (color: string) => {
      let el = document.querySelector('meta[name="theme-color"]');
      if (!el) { el = document.createElement('meta'); el.setAttribute('name', 'theme-color'); document.head.appendChild(el); }
      el.setAttribute('content', color);
    };

    setMeta('apple-mobile-web-app-title', meta.name);
    setMeta('application-name', meta.name);
    setTheme(meta.themeColor);

    let appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
    if (!appleIcon) { appleIcon = document.createElement('link'); appleIcon.setAttribute('rel', 'apple-touch-icon'); document.head.appendChild(appleIcon); }
    appleIcon.setAttribute('href', meta.icon);

    // NÃO altera o link[rel="manifest"] — deixa o /manifest.json estático funcionar
  }, [bank]);
}
