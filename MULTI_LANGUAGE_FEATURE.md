# Multi-Language Feature

This project now supports multi-language functionality with English (en) and Indonesian (id) languages.

## Features

- **Language Switcher**: A dropdown component in the header that allows users to switch between English and Indonesian
- **Persistent Language Selection**: The selected language is saved in localStorage and persists across page reloads
- **Comprehensive Translations**: All text content is translated including:
  - Hero section
  - Experience section
  - Education section
  - Skills section
  - Featured projects section
  - Footer

## Implementation Details

### Files Added/Modified

1. **Translation Files**:
   - `src/messages/en.json` - English translations
   - `src/messages/id.json` - Indonesian translations

2. **Context and Hooks**:
   - `src/contexts/LanguageContext.js` - Language state management
   - `src/hooks/useTranslations.js` - Translation hook for components

3. **Components**:
   - `src/components/LanguageSwitcher.js` - Language selection dropdown
   - Updated all existing components to use translations

4. **Configuration**:
   - `src/i18n/request.js` - Next.js internationalization configuration
   - `src/i18n/config.js` - Locale configuration
   - `next.config.mjs` - Updated to support next-intl

### How to Use

1. **Adding New Translations**:
   - Add new keys to both `src/messages/en.json` and `src/messages/id.json`
   - Use the `useTranslations` hook in components to access translations

2. **Using Translations in Components**:
   ```javascript
   import { useTranslations } from '@/hooks/useTranslations';
   
   const MyComponent = () => {
     const { t } = useTranslations();
     
     return <h1>{t('my.section.title')}</h1>;
   };
   ```

3. **Adding New Languages**:
   - Add the new locale to `src/i18n/config.js`
   - Create a new translation file in `src/messages/`
   - Update the `LanguageSwitcher` component to include the new language

### Default Language

The default language is set to Indonesian (id). Users can switch to English using the language switcher in the header.

### Browser Support

The language selection is stored in localStorage, so it will persist across browser sessions for each user.