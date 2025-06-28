'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import logo from '../../public/Assets/4-soles-logo.jpg';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 2500); // redirige después de 2.5s

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#852123]">
      <div className="relative w-[450px] h-[250px] sm:w-[300px] sm:h-[300px]">
        <Image
          src={logo}
          alt="Logo 4 Soles"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
