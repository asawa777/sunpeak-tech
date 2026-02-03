'use client';

import {usePathname, useRouter} from 'next/navigation';
import {motion, AnimatePresence} from 'framer-motion';

export default function LanguageSwitch() {
  const pathname = usePathname();
  const router = useRouter();

  // Simple heuristic: if path starts with /th, it's Thai. Otherwise English.
  const currentLocale = pathname.startsWith('/th') ? 'th' : 'en';

  const switchLocale = (locale: 'en' | 'th') => {
    // Current path: /en/about or /about (if default prefix hidden) or /th/about
    // We need to handle this robustly.
    // However, for this specific task, let's assume standard next-intl behavior.
    // If we are at /th/about and switch to 'en', we want /en/about (or /about if default is hidden).
    
    // A simple approach for this codebase:
    // Split by '/'
    const segments = pathname.split('/');
    // segments[0] is empty string ""
    // segments[1] might be 'en', 'th', or part of route if default locale doesn't show prefix
    
    if (segments[1] === 'en' || segments[1] === 'th') {
        segments[1] = locale;
    } else {
        // If no locale in path (e.g. /about), implies default 'en'
        if (locale === 'th') {
            segments.splice(1, 0, 'th');
        } else {
            // switching to en, but we are already implicitly en. Do nothing or explicit.
            // middleware will handle standardized paths.
            // usually better to just replace logic.
        }
    }
    
    // Actually, the user prompt provided a specific implementation:
    // const switchLocale = (locale: 'en' | 'th') => {
    //   const segments = pathname.split('/');
    //   segments[1] = locale;
    //   router.push(segments.join('/'));
    // };
    // This assumes segments[1] IS the locale. If default locale is hidden, this might break.
    // But let's stick closer to the user's provided snippet but make it slightly safer for hidden defaults if configured.
    // Since `next-intl` default config usually redirects / to /en or hides it, let's assume middleware enforces prefixes or we handle it.
    // Given the prompt: "segments[1] = locale" suggests they expect /en/... structure.
    
    let newPath = pathname;
    if (currentLocale === 'en' && locale === 'th') {
        // /about -> /th/about (if en is hidden) OR /en/about -> /th/about
        if (pathname.startsWith('/en')) {
            newPath = pathname.replace(/^\/en/, '/th');
        } else {
            newPath = `/th${pathname}`;
        }
    } else if (currentLocale === 'th' && locale === 'en') {
        // /th/about -> /en/about
        newPath = pathname.replace(/^\/th/, '/en');
    }
    
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2 mr-4">
      {['en', 'th'].map((lang) => (
        <button
          key={lang}
          onClick={() => switchLocale(lang as 'en' | 'th')}
          className={`relative bg-none border-none text-[13px] font-medium px-2 py-1 cursor-pointer transition-colors ${currentLocale === lang ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <AnimatePresence mode="wait">
            {currentLocale === lang && (
              <motion.span
                layoutId="lang-indicator"
                className="absolute inset-0 rounded-md bg-blue-500/20 -z-10"
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>
          {lang === 'en' ? 'EN' : 'ไทย'}
        </button>
      ))}
    </div>
  );
}
