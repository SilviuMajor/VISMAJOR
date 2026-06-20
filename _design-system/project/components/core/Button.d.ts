import * as React from 'react';

/**
 * Tracked-caps action button in the VIS MAJOR house style. Monochrome only.
 *
 * @startingPoint section="Core" subtitle="Tracked-caps button — primary / secondary / ghost" viewport="700x180"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** Visual style. @default "primary" */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Stretch to container width. @default false */
  full?: boolean;
  /** @default false */
  disabled?: boolean;
  /** Render as a different element, e.g. "a". @default "button" */
  as?: any;
  [key: string]: any;
}

export function Button(props: ButtonProps): JSX.Element;
