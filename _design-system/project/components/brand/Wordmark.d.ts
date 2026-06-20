import * as React from 'react';

/**
 * The house marks: GY-NO! product wordmark (heavy/tight) and the VIS MAJOR
 * house mark (light/tracked).
 *
 * @startingPoint section="Brand" subtitle="GY-NO! & VIS MAJOR wordmarks" viewport="700x200"
 */
export interface WordmarkProps {
  /** Which mark to render. @default "gyno" */
  brand?: 'gyno' | 'vismajor';
  /** Cap height / font-size in px. @default 56 */
  size?: number;
  /** Optional tracked-caps sub-line beneath the mark. */
  descriptor?: string;
  /** @default "var(--ink-0)" */
  color?: string;
  /** @default "start" */
  align?: 'start' | 'center';
  style?: React.CSSProperties;
  [key: string]: any;
}

export function Wordmark(props: WordmarkProps): JSX.Element;
