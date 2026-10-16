// У page-flip нет своих типов; нужное описано в components/comic-book.tsx
declare module "page-flip" {
  export const PageFlip: new (element: HTMLElement, settings: Record<string, unknown>) => unknown;
}
