import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'Pet Store - Home',
    data: { breadcrumb: 'Home' },
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/product/product').then((m) => m.Product),
    title: 'Pet Store - Products',
    data: { breadcrumb: 'Products' },
  },
  {
    path: 'our-services',
    loadComponent: () =>
      import('./features/our-services/our-services').then((m) => m.OurServices),
    title: 'Pet Store - Our Services',
    data: { breadcrumb: 'Our Services' },
  },
  {
    path: 'about-us',
    loadComponent: () => import('./features/about/about').then((m) => m.About),
    title: 'Pet Store - About Us',
    data: { breadcrumb: 'About Us' },
  },
];
