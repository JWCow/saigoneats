import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

const sizes = {
  sm: { height: 32, width: 32 },
  md: { height: 40, width: 40 },
  lg: { height: 48, width: 48 },
  xl: { height: 64, width: 64 },
  '2xl': { height: 80, width: 80 },
  '3xl': { height: 96, width: 96 },
};

export default function Logo({ className, showText = true, size = 'md' }: LogoProps) {
  const { height, width } = sizes[size];
  
  return (
    <Link href="/" className={cn('flex items-center', className)}>
      <div className="relative flex items-center justify-center h-full w-full">
        <Image
          src="/logo.png"
          alt="SaigonEats Logo"
          height={height}
          width={width}
          className="object-contain w-full h-full scale-125"
          priority
          style={{ maxWidth: 'none' }}
        />
      </div>
      {showText && (
        <div className="flex items-center font-heading font-bold text-xl tracking-tight">
          <span className="text-gray-900">Saigon</span>
          <span className="text-orange-600">Eats</span>
        </div>
      )}
    </Link>
  );
} 