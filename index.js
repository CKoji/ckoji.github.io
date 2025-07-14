import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

// --- SVG Icon Components ---

const CoffeeBeanIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 0c-1.657 0-3 2.686-3 6s1.343 6 3 6" />
  </svg>
);

const WaterDropIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-4.418 0-8 3.582-8 8 0 4.418 8 11.75 8 11.75s8-7.332 8-11.75c0-4.418-3.582-8-8-8z" />
  </svg>
);

const BeakerIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v2a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm0 4v10a2 2 0 002 2h12a2 2 0 002-2V8M8 12h8m-4 4h.01" />
    </svg>
);


// --- Main Application Component ---

function App() {
  const [coffeeGrams, setCoffeeGrams] = useState(20);
  const [numPours, setNumPours] = useState(3);


  const waterPerPour = useMemo(() => coffeeGrams * 3, [coffeeGrams]);
  const finalQuantity = useMemo(() => waterPerPour * numPours, [waterPerPour, numPours]);

  const handleCoffeeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setCoffeeGrams(isNaN(value) || value < 0 ? 0 : value);
  };

  const handlePoursChange = (e) => {
    setNumPours(parseInt(e.target.value, 10));
  };
  

  return (
    <main className="bg-amber-50/50 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-amber-900 tracking-tight">
              Perfect Pour Calculator
          </h1>
          <p className="mt-3 text-base sm:text-lg text-amber-700">
              Craft your ideal pour-over coffee with precision.
          </p>
      </div>

      <div className="mt-8 w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-200/50">
          <div className="p-6 sm:p-8">
              {/* --- Settings Section --- */}
              <div className="space-y-6">
                  <div>
                      <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Brew Settings</h2>
                      <div className="space-y-4">
                        {/* Coffee Grounds Input */}
                        <div>
                            <label htmlFor="coffeeGrams" className="block text-sm font-medium text-gray-600">
                                Coffee Grounds (grams)
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <CoffeeBeanIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    type="number"
                                    id="coffeeGrams"
                                    name="coffeeGrams"
                                    value={coffeeGrams}
                                    onChange={handleCoffeeChange}
                                    className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                                    placeholder="e.g., 20"
                                    min="0"
                                />
                            </div>
                        </div>

                        {/* Number of Pours Select */}
                        <div>
                            <label htmlFor="numPours" className="block text-sm font-medium text-gray-600">
                                Number of Pours
                            </label>
                            <select
                                id="numPours"
                                name="numPours"
                                value={numPours}
                                onChange={handlePoursChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
                            >
                                {[1, 2, 3, 4, 5].map(p => (
                                    <option key={p} value={p}>{p} Pour{p > 1 ? 's' : ''}</option>
                                ))}
                            </select>
                        </div>
                      </div>
                  </div>
              </div>

              {/* --- Results Section --- */}
              <div className="space-y-4 pt-6 mt-6 border-t border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Brew Results</h2>

                  {/* Water per Pour */}
                  <div className="flex items-center justify-between bg-amber-50 p-4 rounded-lg">
                      <div className="flex items-center">
                          <WaterDropIcon className="h-6 w-6 text-amber-600" aria-hidden="true" />
                          <p className="ml-3 font-medium text-gray-800">Water per Pour</p>
                      </div>
                      <p className="text-xl font-bold text-amber-900">
                          {waterPerPour}<span className="text-sm font-normal ml-1">g</span>
                      </p>
                  </div>

                  {/* Final Quantity */}
                  <div className="flex items-center justify-between bg-amber-50 p-4 rounded-lg">
                       <div className="flex items-center">
                          <BeakerIcon className="h-6 w-6 text-amber-600" aria-hidden="true" />
                          <p className="ml-3 font-medium text-gray-800">Final Coffee Quantity</p>
                      </div>
                      <p className="text-xl font-bold text-amber-900">
                          {finalQuantity}<span className="text-sm font-normal ml-1">g</span>
                      </p>
                  </div>
              </div>
          </div>
      </div>
       <footer className="mt-8 text-center text-sm text-amber-800/60">
            <p>Happy Brewing!</p>
        </footer>
    </main>
  );
}

// --- Mount Application to DOM ---

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
