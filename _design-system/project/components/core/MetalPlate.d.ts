import * as React from 'react';

/**
 * Brushed-aluminium surface for product bodies, nameplates and material panels.
 *
 * @startingPoint section="Brand" subtitle="Brushed-metal surface — aluminium / dark" viewport="700x220"
 */
export interface MetalPlateProps {
  children?: React.ReactNode;
  /** Material tone. @default "aluminium" */
  tone?: 'aluminium' | 'dark';
  /** Corner radius in px. @default 6 */
  radius?: number;
  /** Show the top sheen highlight. @default true */
  sheen?: boolean;
  style?: React.CSSProperties;
  [key: string]: any;
}

export function MetalPlate(props: MetalPlateProps): JSX.Element;
