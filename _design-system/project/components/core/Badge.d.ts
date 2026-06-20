import * as React from 'react';

/**
 * Tracked-caps marker for descriptors, claims and status.
 *
 * @startingPoint section="Core" subtitle="Tracked-caps badge — solid / outline / plain" viewport="700x140"
 */
export interface BadgeProps {
  children?: React.ReactNode;
  /** @default "outline" */
  variant?: 'solid' | 'outline' | 'plain';
  /** @default "md" */
  size?: 'sm' | 'md';
  [key: string]: any;
}

export function Badge(props: BadgeProps): JSX.Element;
