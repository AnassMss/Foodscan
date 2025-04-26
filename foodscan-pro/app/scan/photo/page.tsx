'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function ScanPhotoPage() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [results, setResults] = useState<null | {
    name: string;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
  }>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageDataUrl);
      stopCamera();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setCapturedImage(event.target.result);
          stopCamera(); // Arrêter la caméra si elle était active
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setResults(null);
    startCamera();
  };

  const analyzePhoto = () => {
    setIsAnalyzing(true);
    
    // Simulation d'une analyse d'IA avec plusieurs possibilités
    setTimeout(() => {
      // Simuler la détection de différents aliments
      // Dans un vrai système, l'IA analyserait l'image et détecterait le contenu réel
      const foodItems = [
        {
          name: "Pomme",
          calories: 52,
          proteins: 0.3,
          carbs: 14,
          fats: 0.2
        },
        {
          name: "Banane",
          calories: 89,
          proteins: 1.1,
          carbs: 23,
          fats: 0.3
        },
        {
          name: "Salade César au poulet",
          calories: 350,
          proteins: 25,
          carbs: 15,
          fats: 22
        },
        {
          name: "Steak",
          calories: 271,
          proteins: 26,
          carbs: 0,
          fats: 18
        },
        {
          name: "Pâtes bolognaise",
          calories: 385,
          proteins: 15,
          carbs: 52,
          fats: 12
        }
      ];
      
      // Pour cette démo, on va détecter systématiquement la pomme
      // Dans une application réelle, nous utiliserions l'IA pour identifier le vrai contenu
      setResults(foodItems[0]); // Pomme
      
      setIsAnalyzing(false);
    }, 2000);
    
    // Dans une application réelle, on enverrait l'image au backend:
    // const sendImageToBackend = async () => {
    //   try {
    //     const response = await fetch('/api/analyze-food', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ imageData: capturedImage }),
    //     });
    //     
    //     const data = await response.json();
    //     setResults(data);
    //     setIsAnalyzing(false);
    //   } catch (error) {
    //     console.error('Erreur d\'analyse:', error);
    //     setIsAnalyzing(false);
    //   }
    // };
    // 
    // sendImageToBackend();
  };

  const saveResults = () => {
    // Simulation de sauvegarde dans l'historique
    alert("Repas ajouté à votre historique !");
    // Retour au tableau de bord
    window.location.href = "/dashboard";
  };

  // Démarrer la caméra au chargement
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

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
          <h1 className="text-2xl font-bold">Scanner un repas</h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft overflow-hidden mb-6">
          {!capturedImage ? (
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
                    className="w-full h-auto rounded-t-xl"
                    style={{ maxHeight: '60vh' }}
                  ></video>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-6">
                    <button
                      onClick={openFilePicker}
                      className="p-4 bg-white dark:bg-gray-700 rounded-full shadow-lg"
                      aria-label="Choisir une image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button
                      onClick={capturePhoto}
                      className="p-4 bg-white dark:bg-gray-700 rounded-full shadow-lg"
                    >
                      <div className="h-12 w-12 rounded-full border-4 border-primary-500 flex items-center justify-center">
                        <div className="h-10 w-10 rounded-full bg-primary-500"></div>
                      </div>
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
          ) : (
            <div>
              <div className="relative">
                <img 
                  src={capturedImage} 
                  alt="Repas capturé" 
                  className="w-full h-auto" 
                  style={{ maxHeight: '60vh' }}
                />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mb-2"></div>
                      <p>Analyse en cours...</p>
                    </div>
                  </div>
                )}
              </div>
              
              {results ? (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">{results.name}</h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Calories</div>
                      <div className="text-lg font-bold">{results.calories} kcal</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Protéines</div>
                      <div className="text-lg font-bold">{results.proteins} g</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Glucides</div>
                      <div className="text-lg font-bold">{results.carbs} g</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Lipides</div>
                      <div className="text-lg font-bold">{results.fats} g</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button 
                      onClick={retakePhoto}
                      className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Reprendre
                    </button>
                    <button 
                      onClick={saveResults}
                      className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 flex space-x-4">
                  <button 
                    onClick={retakePhoto}
                    className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Reprendre
                  </button>
                  <button 
                    onClick={analyzePhoto}
                    className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                  >
                    Analyser
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Prenez une photo claire de votre repas ou importez une image pour obtenir une analyse nutritionnelle précise.
        </p>
      </div>
      
      {/* Canvas caché pour la capture photo */}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
} 