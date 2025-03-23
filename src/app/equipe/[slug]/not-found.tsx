import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        Membre non trouvé
      </h1>
      <p className="text-lg md:text-xl text-black/60 dark:text-white/60 mb-8 text-center">
        Désolé, nous n&apos;avons pas trouvé le membre de l&apos;équipe que vous recherchez.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 rounded-full bg-primary text-black font-medium transition-all duration-300 hover:bg-primary/80"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
} 