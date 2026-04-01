import { useEffect } from 'react';

export function useThemeColor(color: string) {
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const previousColor = metaThemeColor?.getAttribute('content');

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = color;
      document.head.appendChild(meta);
    }

    return () => {
      if (metaThemeColor && previousColor) {
        metaThemeColor.setAttribute('content', previousColor);
      }
    };
  }, [color]);
}
