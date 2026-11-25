import React, { useState } from 'react';
import { Layers } from 'lucide-react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  lazy?: boolean;
  fallbackTitle?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className = '',
  lazy = true,
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#151D32] to-[#0B1020] text-white/80 p-6 text-center ${className}`}
      >
        <div className="w-10 h-10 rounded-lg bg-[#4F8CFF]/15 border border-[#4F8CFF]/30 flex items-center justify-center text-[#4F8CFF] mb-2">
          <Layers className="w-5 h-5" />
        </div>
        <span className="text-sm font-medium text-white/90">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={lazy ? 'lazy' : 'eager'}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
