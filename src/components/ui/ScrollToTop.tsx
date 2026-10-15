import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Lazy routes render after navigation, so wait (up to ~2s) for the anchor target to exist.
    let id: string;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      id = hash.slice(1);
    }
    let frame = 0;
    let attempts = 0;
    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView();
      else if (attempts++ < 120) frame = requestAnimationFrame(scrollToTarget);
    };
    scrollToTarget();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
