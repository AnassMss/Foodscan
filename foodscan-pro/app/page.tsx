import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary-950 dark:text-primary-50">
                Optimisez votre nutrition
              </h1>
              <p className="mx-auto max-w-[700px] text-lg md:text-xl text-gray-600 dark:text-gray-400">
                Scannez vos aliments, suivez vos repas, et recevez des recommandations personnalisées 
                pour améliorer vos performances sportives.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/auth/register"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary-600 px-8 text-sm font-medium text-white shadow-lg transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-700"
              >
                Commencer gratuitement
              </Link>
              <Link
                href="/about"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-8 text-sm font-medium shadow transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400"
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Fonctionnalités principales</h2>
            <p className="max-w-[800px] text-gray-500 dark:text-gray-400 md:text-xl">
              Notre application intelligente pour une alimentation saine adaptée à vos objectifs sportifs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-primary-50 dark:bg-gray-800 shadow-soft">
              <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary-600 dark:text-primary-400"
                >
                  <path d="M15 8a5 5 0 0 1 3 4"></path>
                  <path d="M9 8a5 5 0 0 0-3 4"></path>
                  <path d="M3 8v4.343a2 2 0 0 0 .586 1.414l4.414 4.414a1 1 0 0 0 1.414 0l2.586-2.586"></path>
                  <path d="m21 8-4.414 4.414a1 1 0 0 1-1.414 0L12.586 9.8a1 1 0 0 0-1.414 0l-2.586 2.586a1 1 0 0 1-1.414 0L3 8"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Scan de codes-barres</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Scannez n'importe quel produit alimentaire pour obtenir ses informations nutritionnelles détaillées.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-primary-50 dark:bg-gray-800 shadow-soft">
              <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary-600 dark:text-primary-400"
                >
                  <path d="M4 5h16"></path>
                  <path d="M4 12h16"></path>
                  <path d="M4 19h16"></path>
                  <path d="M2 2v20"></path>
                  <path d="M22 2v20"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Analyse de repas</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Prenez une photo de votre repas et laissez notre IA analyser sa composition nutritionnelle.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-primary-50 dark:bg-gray-800 shadow-soft">
              <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary-600 dark:text-primary-400"
                >
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Conseils personnalisés</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Recevez des recommandations de recettes et des conseils sportifs adaptés à vos besoins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-primary-600 dark:bg-primary-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white">
                Prêt à améliorer votre nutrition ?
              </h2>
              <p className="mx-auto max-w-[700px] text-lg md:text-xl text-primary-100">
                Rejoignez des milliers de sportifs qui optimisent leur alimentation avec FoodScan Pro.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <Link
                href="/auth/register"
                className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-white text-primary-600 font-medium shadow-lg transition-colors hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              >
                Commencer maintenant
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 