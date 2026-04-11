import { useEffect } from 'react';

export function useMeta(title: string, description?: string, ogImage?: string) {
  useEffect(() => {
    document.title = title;

    const set = (selector: string, value: string, attr = 'content') => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    set('meta[name="description"]', description || '');
    set('meta[property="og:title"]', title);
    set('meta[name="twitter:title"]', title);

    if (description) {
      set('meta[property="og:description"]', description);
      set('meta[name="twitter:description"]', description);
    }

    if (ogImage) {
      set('meta[property="og:image"]', ogImage);
      set('meta[name="twitter:image"]', ogImage);
    }
  }, [title, description, ogImage]);
}
