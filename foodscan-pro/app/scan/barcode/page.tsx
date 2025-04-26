'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function ScanBarcodePage() {
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [product, setProduct] = useState<null | {
    name: string;
    brand: string;
    image: string;
    nutritionFacts: {
      calories: number;
      proteins: number;
      carbs: number;
      sugars: number;
      fats: number;
      saturatedFats: number;
      fiber: number;
      salt: number;
    };
    ingredients: string;
    nutriscore: string;
  }>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Simuler la reconnaissance d'un code-barres
  const simulateBarcodeScanning = () => {
    const delay = Math.random() * 3000 + 2000; // 2-5 secondes
    
    setTimeout(() => {
      const fakeBarcodes = [
        '3017620422003', // Nutella
        '3175680011480', // Crêpes Whaou
        '3228857000166', // Pain de mie
        '3046920022651', // Chocolat Lindt
        '5449000000996', // Coca-Cola
      ];
      
      const randomBarcode = fakeBarcodes[Math.floor(Math.random() * fakeBarcodes.length)];
      setScannedCode(randomBarcode);
      setIsScanning(false);
    }, delay);
  };
  
  const startCamera = async () => {
    try {
      // Vérifier si l'API MediaDevices est disponible
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('API caméra non supportée par ce navigateur');
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraError(null);
      }
      
      // Dans une application réelle, nous utiliserions une librairie comme 
      // QuaggaJS ou zxing pour scanner des codes-barres
      simulateBarcodeScanning();
      
    } catch (err) {
      console.error("Erreur d'accès à la caméra:", err);
      let errorMessage = "Impossible d'accéder à la caméra. ";
      
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          errorMessage += 'Veuillez autoriser l\'accès à la caméra dans les paramètres du navigateur.';
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          errorMessage += 'Aucune caméra n\'a été détectée sur cet appareil.';
        } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
          errorMessage += 'La caméra est peut-être utilisée par une autre application.';
        } else if (err.name === 'OverconstrainedError') {
          errorMessage += 'Les contraintes demandées ne sont pas supportées par votre caméra.';
        } else {
          errorMessage += err.message || 'Raison inconnue.';
        }
      }
      
      setCameraError(errorMessage);
      setIsScanning(true); // Maintenir le mode scan pour afficher le message d'erreur
    }
  };
  
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      stopCamera();
      setIsScanning(false);
      
      // Simuler le scan d'un code-barres à partir de l'image
      setIsLoading(true);
      setTimeout(() => {
        const fakeBarcodes = [
          '3017620422003', // Nutella
          '3175680011480', // Crêpes Whaou
          '3228857000166', // Pain de mie
          '3046920022651', // Chocolat Lindt
          '5449000000996', // Coca-Cola
        ];
        
        const randomBarcode = fakeBarcodes[Math.floor(Math.random() * fakeBarcodes.length)];
        setScannedCode(randomBarcode);
        setIsLoading(false);
      }, 1500);
      
      // Dans une application réelle, nous utiliserions une librairie pour analyser
      // l'image et extraire le code-barres
    }
  };
  
  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const searchProduct = () => {
    if (!scannedCode) return;
    
    setIsLoading(true);
    
    // Simuler une recherche de produit
    setTimeout(() => {
      const productData = {
        name: "Nutella - Pâte à tartiner aux noisettes et au cacao",
        brand: "Ferrero",
        image: "https://images.openfoodfacts.org/images/products/301/762/042/2003/front_fr.429.400.jpg",
        nutritionFacts: {
          calories: 539,
          proteins: 6.3,
          carbs: 57.5,
          sugars: 56.3,
          fats: 30.9,
          saturatedFats: 10.6,
          fiber: 3.4,
          salt: 0.107,
        },
        ingredients: "Sucre, huile de palme, noisettes 13%, cacao maigre 7,4%, lait écrémé en poudre 6,6%, lactosérum en poudre, émulsifiants : lécithines [soja], vanilline.",
        nutriscore: "E",
      };
      
      setProduct(productData);
      setIsLoading(false);
    }, 1500);
    
    // Dans une véritable application, nous ferions un appel API à OpenFoodFacts
    // const fetchProduct = async () => {
    //   try {
    //     const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${scannedCode}.json`);
    //     const data = await response.json();
    //     
    //     if (data.status === 1) {
    //       // Transformer les données d'OpenFoodFacts en notre format
    //       const productData = {
    //         name: data.product.product_name,
    //         brand: data.product.brands,
    //         image: data.product.image_front_url,
    //         nutritionFacts: {
    //           calories: data.product.nutriments.energy_value,
    //           proteins: data.product.nutriments.proteins,
    //           carbs: data.product.nutriments.carbohydrates,
    //           sugars: data.product.nutriments.sugars,
    //           fats: data.product.nutriments.fat,
    //           saturatedFats: data.product.nutriments["saturated-fat"],
    //           fiber: data.product.nutriments.fiber,
    //           salt: data.product.nutriments.salt,
    //         },
    //         ingredients: data.product.ingredients_text,
    //         nutriscore: data.product.nutriscore_grade,
    //       };
    //       
    //       setProduct(productData);
    //     } else {
    //       // Produit non trouvé
    //       alert("Produit non trouvé. Veuillez réessayer.");
    //     }
    //     
    //     setIsLoading(false);
    //   } catch (error) {
    //     console.error("Erreur lors de la recherche du produit:", error);
    //     alert("Erreur lors de la recherche du produit. Veuillez réessayer.");
    //     setIsLoading(false);
    //   }
    // };
    // 
    // fetchProduct();
  };
  
  const saveProduct = () => {
    // Simulation de sauvegarde dans l'historique
    alert("Produit ajouté à votre historique !");
    // Retour au tableau de bord
    window.location.href = "/dashboard";
  };
  
  const resetScanner = () => {
    setScannedCode(null);
    setProduct(null);
    setIsScanning(true);
    startCamera();
  };
  
  // Lancer la caméra au chargement
  useEffect(() => {
    startCamera();
    
    return () => {
      stopCamera();
    };
  }, []);
  
  // Chercher le produit une fois le code scanné
  useEffect(() => {
    if (scannedCode) {
      searchProduct();
    }
  }, [scannedCode]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <Link
            href="/dashboard"
            className="mr-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold">Scanner un code-barres</h1>
        </div>
        
        {isScanning && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft overflow-hidden mb-6">
            <div className="relative">
              {cameraError ? (
                <div className="p-8 text-center">
                  <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/20 inline-flex mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Problème d'accès à la caméra</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{cameraError}</p>
                  <button
                    onClick={openFilePicker}
                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                  >
                    Sélectionner une image depuis la galerie
                  </button>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-auto"
                    style={{ maxHeight: '60vh' }}
                  ></video>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4/5 max-w-sm h-16 border-2 border-primary-500 relative rounded-lg">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary-500"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary-500"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary-500"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary-500"></div>
                      
                      <div className="absolute inset-0 flex items-center">
                        <div className="h-0.5 bg-primary-500 animate-scan w-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bouton pour sélectionner une image à partir de la galerie */}
                  <div className="absolute bottom-4 right-4">
                    <button
                      onClick={openFilePicker}
                      className="p-3 bg-white dark:bg-gray-700 rounded-full shadow-lg"
                      aria-label="Importer une image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </>
              )}
              
              {/* Input file caché */}
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
              />
            </div>
            
            <div className="p-6 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {cameraError 
                  ? "Utilisez une image contenant un code-barres pour identifier un produit."
                  : "Positionnez le code-barres dans le cadre pour le scanner automatiquement ou importez une image."}
              </p>
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-8 text-center mb-6">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Recherche d'informations sur le produit...</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Code EAN: {scannedCode}</p>
          </div>
        )}
        
        {product && !isLoading && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex flex-col md:flex-row mb-6">
                <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6 flex justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-36 w-auto object-contain"
                  />
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{product.brand}</p>
                  
                  <div className="flex items-center mb-3">
                    <span className="text-sm mr-2">Nutri-Score</span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      product.nutriscore === 'A' ? 'bg-green-500' :
                      product.nutriscore === 'B' ? 'bg-light-green-600' :
                      product.nutriscore === 'C' ? 'bg-yellow-500' :
                      product.nutriscore === 'D' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}>
                      {product.nutriscore.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {product.ingredients}
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-medium mb-3">Valeurs nutritionnelles</h3>
                
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Calories</span>
                    <span className="font-medium">{product.nutritionFacts.calories} kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Protéines</span>
                    <span className="font-medium">{product.nutritionFacts.proteins} g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Glucides</span>
                    <span className="font-medium">{product.nutritionFacts.carbs} g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Dont sucres</span>
                    <span className="font-medium">{product.nutritionFacts.sugars} g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Lipides</span>
                    <span className="font-medium">{product.nutritionFacts.fats} g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Dont saturés</span>
                    <span className="font-medium">{product.nutritionFacts.saturatedFats} g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Fibres</span>
                    <span className="font-medium">{product.nutritionFacts.fiber} g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Sel</span>
                    <span className="font-medium">{product.nutritionFacts.salt} g</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={resetScanner}
                  className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Scanner autre
                </button>
                <button
                  onClick={saveProduct}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  Ajouter au repas
                </button>
              </div>
            </div>
          </div>
        )}
        
        <style jsx>{`
          @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          .animate-scan {
            animation: scan 1.5s linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
} 