import ImageTest from '@/components/test/ImageTest';

export default function TestImagesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Test des Images - PageSpeed Optimizations
        </h1>
        <ImageTest />
      </div>
    </div>
  );
}
