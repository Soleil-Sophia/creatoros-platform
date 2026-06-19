import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '../config/site';

export function useMeta(title: string, description?: string, ogImage?: string) {
  const { pathname } = useLocation();

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
      // Social scrapers require absolute URLs — resolve relative paths against SITE_URL.
      const absoluteOgImage = ogImage.startsWith('http')
        ? ogImage
        : `${SITE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;
      set('meta[property="og:image"]', absoluteOgImage);
      set('meta[name="twitter:image"]', absoluteOgImage);
    }

    // Canonical URL and og:url — updated per page
    const pageUrl = `${SITE_URL}${pathname}`;
    set('meta[property="og:url"]', pageUrl);

    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = pageUrl;
    } else {
      const link = document.createElement('link') as HTMLLinkElement;
      link.rel = 'canonical';
      link.href = pageUrl;
      document.head.appendChild(link);
    }
  }, [title, description, ogImage, pathname]);
}
