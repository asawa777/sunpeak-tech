import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
 
// Can be imported from a shared config
const locales = ['en', 'th'];
 
export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  console.log("I18N Request Locale Resolved:", locale);

  // Ensure valid locale
  if (!locale || !locales.includes(locale as any)) {
      locale = 'en'; // Default fallback
  }

  try {
      // Direct fs read for stability
      const fs = await import('fs/promises');
      const path = await import('path');
      const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);
      const fileContents = await fs.readFile(filePath, 'utf8');
      
      return {
        locale,
        messages: JSON.parse(fileContents)
      };
  } catch(e) {
      console.error("Error loading messages in request.ts:", e);
      throw e;
  }
});
