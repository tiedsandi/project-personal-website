# Multi-Language Feature Implementation

This document explains the multi-language (i18n) feature implementation for English (en) and Indonesian (id) languages.

## Overview

The website now supports two languages:
- **English (en)** - English translation
- **Indonesian (id)** - Indonesian translation (default)

Users can switch between languages using the language switcher in the header.

## Technologies Used

- **next-intl** - A comprehensive internationalization library for Next.js App Router
- **Next.js 14** App Router with dynamic locale routing

## File Structure

```
/workspace/
├── i18n.js                          # i18n configuration
├── middleware.js                    # Locale detection middleware
├── messages/
│   ├── en.json                      # English translations
│   └── id.json                      # Indonesian translations
├── src/
│   ├── app/
│   │   ├── layout.js                # Root layout
│   │   └── [locale]/                # Locale-specific routes
│   │       ├── layout.js            # Locale layout with NextIntlClientProvider
│   │       ├── page.js              # Home page
│   │       └── project/
│   │           └── page.js          # Projects page
│   ├── components/
│   │   ├── LanguageSwitcher.js      # Language switcher component
│   │   ├── Header.js                # Updated with translations
│   │   ├── Footer.js                # New footer component with translations
│   │   ├── Hero.js                  # Updated with translations
│   │   ├── Experience.js            # Updated with translations
│   │   ├── Education.js             # Updated with translations
│   │   ├── Skills.js                # Updated with translations
│   │   ├── Featured.js              # Updated with translations
│   │   └── Card.js                  # Updated to use translated descriptions
│   └── i18n/
│       └── routing.js               # Locale-aware navigation utilities
```

## Key Features

### 1. Automatic Locale Detection
- The middleware automatically detects the user's preferred language
- Default language is Indonesian (id)
- URL structure: `example.com` (Indonesian) or `example.com/en` (English)

### 2. Language Switcher
- Located in the header (top-right corner)
- Allows users to switch between EN and ID
- Preserves the current page when switching languages

### 3. Translated Content

All text content is now translatable, including:
- **Hero Section**: Greeting, tagline, description, and CTA button
- **Experience Section**: Title and job descriptions
- **Education Section**: Title and education details
- **Skills Section**: Title
- **Featured Projects**: Section title and "View All" link
- **Projects Page**: Page title, filter labels, and no results message
- **Project Cards**: All project descriptions
- **Footer**: Copyright notice and social links

### 4. Locale-Aware Routing

All internal links are locale-aware:
- Header logo link
- "View Projects" button
- "View All Projects" link
- Navigation maintains locale context

## Translation Files

### Structure

Each translation file (`messages/en.json` and `messages/id.json`) contains nested objects organized by component:

```json
{
  "header": { ... },
  "hero": { ... },
  "experience": { ... },
  "education": { ... },
  "skills": { ... },
  "featured": { ... },
  "projectPage": { ... },
  "projects": { ... },
  "footer": { ... }
}
```

## Usage in Components

### Example 1: Simple Translation

```jsx
import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations("header");
  
  return <h1>{t("logo")}</h1>;
};
```

### Example 2: Dynamic Values

```jsx
const Footer = () => {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();
  
  return <p>{t("copyright", { year: currentYear })}</p>;
};
```

### Example 3: Nested Keys

```jsx
const Education = () => {
  const t = useTranslations("education");
  
  return (
    <>
      <h3>{t("title")}</h3>
      <p>{t("ppkd.title")}</p>
      <p>{t("ppkd.description")}</p>
    </>
  );
};
```

### Example 4: Locale-Aware Links

```jsx
import { Link } from "@/i18n/routing";

const Header = () => {
  return <Link href="/">Home</Link>;
};
```

## Configuration Files

### i18n.js
Defines available locales and imports translation messages.

### middleware.js
Handles automatic locale detection and routing.

### src/i18n/routing.js
Provides locale-aware navigation utilities (Link, useRouter, etc.).

## Adding New Translations

To add new translations:

1. Add the translation key to both `messages/en.json` and `messages/id.json`
2. Use `useTranslations` hook in your component
3. Call the translation function with your new key

Example:

```json
// messages/en.json
{
  "newSection": {
    "title": "New Section Title"
  }
}

// messages/id.json
{
  "newSection": {
    "title": "Judul Bagian Baru"
  }
}
```

```jsx
// Component
import { useTranslations } from "next-intl";

const NewSection = () => {
  const t = useTranslations("newSection");
  return <h2>{t("title")}</h2>;
};
```

## Testing

All translations have been tested and verified:
- ✅ Build passes successfully
- ✅ Lint checks pass
- ✅ All components render correctly
- ✅ Language switching works seamlessly
- ✅ Locale routing works correctly

## Benefits

1. **SEO-Friendly**: Each language has its own URL
2. **User Experience**: Seamless language switching
3. **Maintainable**: Centralized translation files
4. **Scalable**: Easy to add new languages
5. **Type-Safe**: Full TypeScript support available

## Future Enhancements

Potential improvements:
- Add more languages (e.g., Japanese, Korean, etc.)
- Implement language detection based on browser settings
- Add date/time formatting per locale
- Add number formatting per locale
- Implement RTL support for Arabic/Hebrew

## Support

For questions or issues related to the multi-language feature, please refer to the [next-intl documentation](https://next-intl-docs.vercel.app/).
