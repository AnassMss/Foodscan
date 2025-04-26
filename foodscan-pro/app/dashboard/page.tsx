'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState({
    name: 'Utilisateur',
    stats: {
      calories: 2100,
      protein: 120,
      carbs: 250,
      fat: 70,
    }
  });

  // Simuler le chargement des données utilisateur
  useEffect(() => {
    // Dans une application réelle, cela serait remplacé par un appel API
    setTimeout(() => {
      setUser({
        name: 'Thomas Dubois',
        stats: {
          calories: 2350,
          protein: 145,
          carbs: 220,
          fat: 65,
        }
      });
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Tableau de bord</h1>

      {/* Carte de bienvenue */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl p-6 text-white shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-2">Bienvenue, {user.name} 👋</h2>
        <p className="opacity-90">Suivez vos repas et atteignez vos objectifs nutritionnels dès aujourd'hui.</p>
      </div>

      {/* Statistiques nutritionnelles */}
      <h2 className="text-xl font-semibold mb-4">Résumé journalier</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-soft">
          <div className="text-sm text-gray-500 dark:text-gray-400">Calories</div>
          <div className="text-2xl font-bold">{user.stats.calories} <span className="text-sm">kcal</span></div>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="bg-primary-500 h-full rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-soft">
          <div className="text-sm text-gray-500 dark:text-gray-400">Protéines</div>
          <div className="text-2xl font-bold">{user.stats.protein} <span className="text-sm">g</span></div>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-soft">
          <div className="text-sm text-gray-500 dark:text-gray-400">Glucides</div>
          <div className="text-2xl font-bold">{user.stats.carbs} <span className="text-sm">g</span></div>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-soft">
          <div className="text-sm text-gray-500 dark:text-gray-400">Lipides</div>
          <div className="text-2xl font-bold">{user.stats.fat} <span className="text-sm">g</span></div>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="bg-yellow-500 h-full rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link 
          href="/scan/photo"
          className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-soft hover:shadow-md transition-shadow"
        >
          <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/20 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-sm font-medium">Scan photo</span>
        </Link>
        <Link 
          href="/scan/barcode"
          className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-soft hover:shadow-md transition-shadow"
        >
          <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/20 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <span className="text-sm font-medium">Scan code-barres</span>
        </Link>
        <Link 
          href="/meals/add"
          className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-soft hover:shadow-md transition-shadow"
        >
          <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/20 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <span className="text-sm font-medium">Ajouter repas</span>
        </Link>
        <Link 
          href="/recipes"
          className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-soft hover:shadow-md transition-shadow"
        >
          <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/20 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span className="text-sm font-medium">Voir recettes</span>
        </Link>
      </div>

      {/* Section en construction - Historique des repas */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center mb-8">
        <div className="inline-block p-3 rounded-full bg-gray-200 dark:bg-gray-700 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">Historique des repas</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Cette section est en cours de développement et sera bientôt disponible.</p>
      </div>
    </div>
  );
} 