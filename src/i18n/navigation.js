import {createSharedPathnamesNavigation} from 'next-intl/navigation';

export const locales = ['en', 'id'];

export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales});
