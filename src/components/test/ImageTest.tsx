'use client';

import Image from 'next/image';

export default function ImageTest() {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold mb-4">Test des Images</h2>
      
      {/* Image Next.js normale */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Image Next.js normale</h3>
        <Image
          src="/logo.png"
          alt="Logo Uclic"
          width={200}
          height={100}
          className="border rounded"
        />
      </div>

      {/* Image avec lazy loading */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Image avec lazy loading</h3>
        <Image
          src="/heroo.png"
          alt="Hero Image"
          width={400}
          height={300}
          className="border rounded"
          loading="lazy"
        />
      </div>

      {/* Image avec priority */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Image avec priority</h3>
        <Image
          src="/backgroundeffect.png"
          alt="Background Effect"
          width={300}
          height={200}
          className="border rounded"
          priority
        />
      </div>

      {/* Image externe */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Image externe</h3>
        <Image
          src="https://ph-files.imgix.net/uclic-logo.png"
          alt="Uclic Logo External"
          width={200}
          height={100}
          className="border rounded"
          loading="lazy"
        />
      </div>

      {/* Test de scroll */}
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Scroll pour voir les images ci-dessous</p>
      </div>

      {/* Images en bas pour tester le lazy loading */}
      <div className="grid grid-cols-2 gap-4">
        <Image
          src="/logo.png"
          alt="Logo 1"
          width={150}
          height={75}
          className="border rounded"
          loading="lazy"
        />
        <Image
          src="/heroo.png"
          alt="Hero 1"
          width={150}
          height={75}
          className="border rounded"
          loading="lazy"
        />
        <Image
          src="/backgroundeffect.png"
          alt="Background 1"
          width={150}
          height={75}
          className="border rounded"
          loading="lazy"
        />
        <Image
          src="/logo.png"
          alt="Logo 2"
          width={150}
          height={75}
          className="border rounded"
          loading="lazy"
        />
      </div>
    </div>
  );
}
