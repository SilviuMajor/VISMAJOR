import React from 'react';

/**
 * VIS MAJOR — MetalPlate
 * Brushed-aluminium surface used for product bodies, nameplates and
 * material panels. Vertical brushed texture, soft top sheen.
 */
export function MetalPlate({
  children,
  tone = 'aluminium',   // 'aluminium' | 'dark'
  radius = 6,
  sheen = true,
  style = {},
  ...rest
}) {
  const aluminium =
    'repeating-linear-gradient(90deg, rgba(255,255,255,0.42) 0 1px, rgba(255,255,255,0) 1px 2px, rgba(0,0,0,0.05) 2px 3px, rgba(0,0,0,0) 3px 4px),' +
    'linear-gradient(90deg,#83878a 0%,#b4b8ba 12%,#e7e9ea 32%,#fbfcfc 50%,#d2d5d6 66%,#a4a8aa 86%,#7c8083 100%)';
  const dark =
    'linear-gradient(160deg,#2b2a27,#161512 60%,#0d0c0a)';

  return (
    <div
      style={{
        position: 'relative',
        background: tone === 'dark' ? dark : aluminium,
        borderRadius: radius,
        overflow: 'hidden',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
        ...style,
      }}
      {...rest}
    >
      {sheen && (
        <div
          style={{
            position: 'absolute', left: 0, right: 0, top: 0, height: '34%',
            background: tone === 'dark'
              ? 'linear-gradient(180deg, rgba(255,255,255,0.14), transparent)'
              : 'linear-gradient(180deg, rgba(255,255,255,0.55), transparent)',
            pointerEvents: 'none',
          }}
        />
      )}
      {children}
    </div>
  );
}
