declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module 'lenis/react' {
  import { ReactNode, ComponentProps } from 'react';
  interface ReactLenisOptions {
    lerp?: number;
    duration?: number;
    smoothWheel?: boolean;
    wheelMultiplier?: number;
    [key: string]: any;
  }
  interface ReactLenisProps {
    root?: boolean;
    options?: ReactLenisOptions;
    children?: ReactNode;
    [key: string]: any;
  }
  export function useLenis(callback?: (lenis: any) => void, deps?: any[]): any;
  const ReactLenis: (props: ReactLenisProps) => JSX.Element;
  export default ReactLenis;
}
