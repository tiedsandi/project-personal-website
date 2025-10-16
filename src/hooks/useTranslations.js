"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';

export function useTranslations() {
  const { locale } = useLanguage();
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messages = await import(`@/messages/${locale}.json`);
        setMessages(messages.default);
      } catch (error) {
        console.error('Failed to load messages:', error);
        // Fallback to Indonesian if loading fails
        const fallbackMessages = await import(`@/messages/id.json`);
        setMessages(fallbackMessages.default);
      }
    };

    loadMessages();
  }, [locale]);

  const t = (key, params = {}) => {
    if (!messages) return key;

    const keys = key.split('.');
    let value = messages;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return the key if translation not found
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    // Replace parameters in the translation
    return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey] || match;
    });
  };

  return { t, locale };
}