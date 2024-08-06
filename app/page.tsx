// "use client";

// import React, { useState } from 'react';
// import { jsPDF } from 'jspdf';

// const IndexPage: React.FC = () => {
//   const [input, setInput] = useState({
//     location: '',
//     floorCount: 0,
//     personCount: 0,
//     stairWidth: 0,
//     stairDepth: 0,
//     stairType: '',
//     elevatorType: '',
//     hasMachineRoom: false,
//     driveType: '',
//     emergencyDevice: false,
//     stops: 0,
//     // Add more fields as needed
//   });

//   const [output, setOutput] = useState<any>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     if (type === 'checkbox') {
//       const { checked } = e.target as HTMLInputElement;
//       setInput({
//         ...input,
//         [name]: checked,
//       });
//     } else {
//       setInput({
//         ...input,
//         [name]: value,
//       });
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const totalSum = calculateTotalSum(input);
//     const totalRevenue = (totalSum + 40000 + 0.1 * totalSum) * 1.11;
//     const commission = totalRevenue * 0.03;
//     const minQuote = totalRevenue + commission;
//     const maxQuote = minQuote * 1.05 + minQuote;
//     const avgQuote = (minQuote + maxQuote) / 2;

//     setOutput({ totalSum, totalRevenue, minQuote, maxQuote, avgQuote });
//   };

//   const calculateTotalSum = (input: any) => {
//     let totalSum = 0;

//     // Implement the detailed logic as per the provided flowchart
//     // Example logic based on the flowchart
//     if (input.elevatorType === 'Jifran') {
//       if (input.hasMachineRoom) {
//         totalSum += 35000;
//       } else {
//         totalSum += 50000;
//       }
//     } else if (input.elevatorType === 'Delta') {
//       totalSum += 20000;
//     }

//     if (input.driveType) {
//       if (input.driveType === 'Jifran') {
//         totalSum += 35000;
//       } else if (input.driveType === 'Delta') {
//         totalSum += 20000;
//       }
//     }

//     if (input.emergencyDevice) {
//       totalSum += 10000;
//     }

//     // Additional logic for stops and person count
//     if (input.stops >= 1 && input.stops <= 5) {
//       if (input.personCount >= 1 && input.personCount <= 4) {
//         totalSum += 10000;
//       } else if (input.personCount >= 4 && input.personCount <= 6) {
//         totalSum += 15000;
//       }
//     } else if (input.stops >= 5 && input.stops <= 8) {
//       if (input.personCount >= 5 && input.personCount <= 6) {
//         totalSum += 20000;
//       }
//     } else if (input.stops >= 10 && input.stops <= 15) {
//       if (input.personCount >= 12 && input.personCount <= 15) {
//         totalSum += 25000;
//       }
//     }

//     // Implement further detailed conditions as per the flowchart

//     return totalSum;
//   };

//   const generatePDF = (avgQuote: number) => {
//     const doc = new jsPDF();
//     doc.text(`Average Quote: ${avgQuote} LE`, 10, 10);
//     doc.save('quote.pdf');
//   };

//   return (
//     <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4 text-black">Elevator Pricing System</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="location" className="block text-sm font-medium text-black">Location</label>
//           <input type="text" id="location" name="location" value={input.location} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div>
//           <label htmlFor="floorCount" className="block text-sm font-medium text-black">Number of Floors</label>
//           <input type="number" id="floorCount" name="floorCount" value={input.floorCount} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div>
//           <label htmlFor="personCount" className="block text-sm font-medium text-black">Number of Persons</label>
//           <input type="number" id="personCount" name="personCount" value={input.personCount} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div>
//           <label htmlFor="stairWidth" className="block text-sm font-medium text-black">Stair Width</label>
//           <input type="number" id="stairWidth" name="stairWidth" value={input.stairWidth} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div>
//           <label htmlFor="stairDepth" className="block text-sm font-medium text-black">Stair Depth</label>
//           <input type="number" id="stairDepth" name="stairDepth" value={input.stairDepth} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div>
//           <label htmlFor="stairType" className="block text-sm font-medium text-black">Stair Type</label>
//           <input type="text" id="stairType" name="stairType" value={input.stairType} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div>
//           <label htmlFor="elevatorType" className="block text-sm font-medium text-black">Elevator Type</label>
//           <select id="elevatorType" name="elevatorType" value={input.elevatorType} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black">
//             <option value="">Select Type</option>
//             <option value="Jifran">Jifran</option>
//             <option value="Delta">Delta</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="driveType" className="block text-sm font-medium text-black">Drive Type</label>
//           <select id="driveType" name="driveType" value={input.driveType} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black">
//             <option value="">Select Drive Type</option>
//             <option value="Jifran">Jifran</option>
//             <option value="Delta">Delta</option>
//           </select>
//         </div>
//         <div className="flex items-center">
//           <input type="checkbox" id="hasMachineRoom" name="hasMachineRoom" checked={input.hasMachineRoom} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
//           <label htmlFor="hasMachineRoom" className="ml-2 block text-sm font-medium text-black">Has Machine Room</label>
//         </div>
//         <div className="flex items-center">
//           <input type="checkbox" id="emergencyDevice" name="emergencyDevice" checked={input.emergencyDevice} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
//           <label htmlFor="emergencyDevice" className="ml-2 block text-sm font-medium text-black">Emergency Device</label>
//         </div>
//         <div>
//           <label htmlFor="stops" className="block text-sm font-medium text-black">Number of Stops</label>
//           <input type="number" id="stops" name="stops" value={input.stops} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Calculate</button>
//       </form>
//       {output && (
//         <>
//           <Output {...output} />
//           <button onClick={() => generatePDF(output.avgQuote)} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Generate PDF</button>
//         </>
//       )}
//     </div>
//   );
// };

// const Output: React.FC<{ totalSum: number; totalRevenue: number; minQuote: number; maxQuote: number; avgQuote: number }> = ({ totalSum, totalRevenue, minQuote, maxQuote, avgQuote }) => {
//   return (
//     <div className="mt-4 p-4 bg-yellow-100 rounded">
//       <p><strong>Product Sum:</strong> {totalSum} LE</p>
//       <p><strong>Construction:</strong> 40000 LE</p>
//       <p><strong>Transportation:</strong> {0.1 * totalSum} LE</p>
//       <p><strong>Total Revenue:</strong> {totalRevenue} LE</p>
//       <p><strong>Commission:</strong> {0.03 * totalRevenue} LE</p>
//       <p><strong>Minimum Quote:</strong> {minQuote} LE</p>
//       <p><strong>Maximum Quote:</strong> {maxQuote} LE</p>
//       <p><strong>Average Quote:</strong> {avgQuote} LE</p>
//     </div>
//   );
// };

// export default IndexPage;






// "use client";

// import React, { useState } from 'react';
// import { jsPDF } from 'jspdf';

// const IndexPage: React.FC = () => {
//   const [input, setInput] = useState({
//     location: '',
//     floorCount: 0,
//     personCount: 0,
//     stairWidth: 0,
//     stairDepth: 0,
//     stairType: '',
//     elevatorType: '',
//     hasMachineRoom: false,
//     driveType: '',
//     emergencyDevice: false,
//     stops: 0,
//     // Add more fields as needed
//   });

//   const [output, setOutput] = useState<any>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     if (type === 'checkbox') {
//       const { checked } = e.target as HTMLInputElement;
//       setInput({
//         ...input,
//         [name]: checked,
//       });
//     } else {
//       setInput({
//         ...input,
//         [name]: value,
//       });
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const totalSum = calculateTotalSum(input);
//     const totalRevenue = ((totalSum + 40000 + 0.1 * totalSum) * 1.11);
//     const commission = totalRevenue * 0.03;
//     const minQuote = totalRevenue + commission;
//     const maxQuote = minQuote * 1.05 + minQuote;
//     const avgQuote = (minQuote + maxQuote) / 2;

//     setOutput({ totalSum, totalRevenue, minQuote, maxQuote, avgQuote });
//   };

//   const calculateTotalSum = (input: any) => {
//     let totalSum = 0;

//     if (input.elevatorType === 'Jifran' || input.elevatorType === 'Delta') {
//       if (input.hasMachineRoom) {
//         totalSum += 130000;
//       } else {
//         totalSum += 65000;
//       }

//       if (input.emergencyDevice) {
//         totalSum += 10000;
//       }

//       if (input.driveType === 'Jifran') {
//         totalSum += 35000;
//       } else if (input.driveType === 'Delta') {
//         totalSum += 20000;
//       }

//       if (input.stops >= 1 && input.stops <= 5) {
//         if (input.personCount >= 4 && input.personCount <= 7) {
//           totalSum += 125000;
//         } else if (input.personCount >= 2 && input.personCount <= 4) {
//           totalSum += 100000;
//         } else if (input.personCount >= 1 && input.personCount <= 2) {
//           totalSum += 90000;
//         }
//       } else if (input.stops >= 10 && input.stops <= 15) {
//         if (input.personCount >= 12 && input.personCount <= 15) {
//           totalSum += 250000;
//         } else if (input.personCount >= 8 && input.personCount <= 12) {
//           totalSum += 190000;
//         } else if (input.personCount >= 1 && input.personCount <= 4) {
//           totalSum += 110000;
//         }
//       } else if (input.stops >= 5 && input.stops <= 8) {
//         if (input.personCount >= 5 && input.personCount <= 6) {
//           totalSum += 20000;
//         } else if (input.personCount >= 4 && input.personCount <= 6) {
//           totalSum += 15000;
//         }
//       }
//     }

//     return totalSum;
//   };

//   const generatePDF = (avgQuote: number) => {
//     const doc = new jsPDF();
//     doc.text(`Average Quote: ${avgQuote} LE`, 10, 10);
//     doc.save('quote.pdf');
//   };

//   return (
//     <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4 text-black">Elevator Pricing System</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="location" className="block text-sm font-medium text-black">Location</label>
//           <input type="text" id="location" name="location" value={input.location} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div>
//           <label htmlFor="floorCount" className="block text-sm font-medium text-black">Number of Floors</label>
//           <input type="number" id="floorCount" name="floorCount" value={input.floorCount} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div>
//           <label htmlFor="personCount" className="block text-sm font-medium text-black">Number of Persons</label>
//           <input type="number" id="personCount" name="personCount" value={input.personCount} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div>
//           <label htmlFor="stairWidth" className="block text-sm font-medium text-black">Stair Width</label>
//           <input type="number" id="stairWidth" name="stairWidth" value={input.stairWidth} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div>
//           <label htmlFor="stairDepth" className="block text-sm font-medium text-black">Stair Depth</label>
//           <input type="number" id="stairDepth" name="stairDepth" value={input.stairDepth} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div>
//           <label htmlFor="stairType" className="block text-sm font-medium text-black">Stair Type</label>
//           <input type="text" id="stairType" name="stairType" value={input.stairType} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div>
//           <label htmlFor="elevatorType" className="block text-sm font-medium text-black">Elevator Type</label>
//           <select id="elevatorType" name="elevatorType" value={input.elevatorType} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black">
//             <option value="">Select Type</option>
//             <option value="Jifran">Jifran</option>
//             <option value="Delta">Delta</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="driveType" className="block text-sm font-medium text-black">Drive Type</label>
//           <select id="driveType" name="driveType" value={input.driveType} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black">
//             <option value="">Select Drive Type</option>
//             <option value="Jifran">Jifran</option>
//             <option value="Delta">Delta</option>
//           </select>
//         </div>
//         <div className="flex items-center">
//           <input type="checkbox" id="hasMachineRoom" name="hasMachineRoom" checked={input.hasMachineRoom} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
//           <label htmlFor="hasMachineRoom" className="ml-2 block text-sm font-medium text-black">Has Machine Room</label>
//         </div>
//         <div className="flex items-center">
//           <input type="checkbox" id="emergencyDevice" name="emergencyDevice" checked={input.emergencyDevice} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
//           <label htmlFor="emergencyDevice" className="ml-2 block text-sm font-medium text-black">Emergency Device</label>
//         </div>
//         <div>
//           <label htmlFor="stops" className="block text-sm font-medium text-black">Number of Stops</label>
//           <input type="number" id="stops" name="stops" value={input.stops} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Calculate</button>
//       </form>
//       {output && (
//         <>
//           <Output {...output} />
//           <button onClick={() => generatePDF(output.avgQuote)} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Generate PDF</button>
//         </>
//       )}
//     </div>
//   );
// };

// const Output: React.FC<{ totalSum: number; totalRevenue: number; minQuote: number; maxQuote: number; avgQuote: number }> = ({ totalSum, totalRevenue, minQuote, maxQuote, avgQuote }) => {
//   return (
//     <div className="mt-4 p-4 bg-slate-700 rounded">
//       <p><strong>Product Sum:</strong> {totalSum} LE</p>
//       <p><strong>Construction:</strong> 40000 LE</p>
//       <p><strong>Transportation:</strong> {0.1 * totalSum} LE</p>
//       <p><strong>Total Revenue:</strong> {totalRevenue.toFixed(1)} LE</p>
//       <p><strong>Commission:</strong> {(0.03 * totalRevenue).toFixed(1)} LE</p>
//       <p><strong>Minimum Quote:</strong> {minQuote.toFixed(1)} LE</p>
//       <p><strong>Maximum Quote:</strong> {maxQuote.toFixed(1)} LE</p>
//       <p><strong>Average Quote:</strong> {avgQuote.toFixed(1)} LE</p>
//     </div>
//   );
// };

// export default IndexPage;





// "use client";

// import React, { useState } from 'react';
// import { jsPDF } from 'jspdf';

// const IndexPage: React.FC = () => {
//   const [input, setInput] = useState({
//     location: '',
//     emergencyBrake: false,
//     speedLimiter: false,
//     doorLock: false,
//     hasMachineRoom: false,
//     elevatorType: '',
//     hasDriveAndInverter: false,
//     emergencyDevice: false,
//     stops: 0,
//     type: '',
//     floorCount: 0,
//     personCount: 0,
//     stairWidth: 0,
//     stairDepth: 0,
//     stairType: '',
//   });

//   const [output, setOutput] = useState<any>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     if (type === 'checkbox') {
//       const { checked } = e.target as HTMLInputElement;
//       setInput({
//         ...input,
//         [name]: checked,
//       });
//     } else {
//       setInput({
//         ...input,
//         [name]: value,
//       });
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const { totalSum, details } = calculateTotalSum(input);
//     const totalRevenue = (totalSum + 40000 + 0.1 * totalSum) * 1.11;
//     const commission = totalRevenue * 0.03;
//     const minQuote = totalRevenue + commission;
//     const maxQuote = minQuote * 1.05 + minQuote;
//     const avgQuote = (minQuote + maxQuote) / 2;

//     setOutput({ ...input, totalSum, totalRevenue, minQuote, maxQuote, avgQuote, details });
//   };

//   const calculateTotalSum = (input: any) => {
//     let totalSum = 0;
//     let details: { component: string; price: number }[] = [];

//     // Add mandatory components
//     if (input.emergencyBrake) {
//       totalSum += 1000;
//       details.push({ component: 'Emergency Brake', price: 1000 });
//     }
//     if (input.speedLimiter) {
//       totalSum += 4500;
//       details.push({ component: 'Speed Limiter', price: 4500 });
//     }
//     if (input.doorLock) {
//       totalSum += 2500;
//       details.push({ component: 'Door Lock', price: 2500 });
//     }

//     if (input.hasMachineRoom) {
//       totalSum += 13000;
//       details.push({ component: 'Machine Room', price: 13000 });
//     } else {
//       totalSum += 6500;
//       details.push({ component: 'No Machine Room', price: 6500 });
//     }

//     if (input.elevatorType === 'Gearless') {
//       totalSum += 65000;
//       details.push({ component: 'Gearless', price: 65000 });

//       if (input.hasDriveAndInverter) {
//         totalSum += 11000;
//         details.push({ component: 'Drive & Inverter', price: 11000 });
//       }

//       if (input.type === 'Jifran') {
//         totalSum += 35000;
//         details.push({ component: 'Type: Jifran', price: 35000 });
//       } else if (input.type === 'Delta') {
//         totalSum += 20000;
//         details.push({ component: 'Type: Delta', price: 20000 });
//       }

//       // Logic for stops and person count
//       if (input.stops >= 1 && input.stops <= 5) {
//         if (input.personCount >= 4 && input.personCount <= 7) {
//           totalSum += 125000;
//           details.push({ component: '(1-5) Stops & (4-7) Persons', price: 125000 });
//         } else if (input.personCount >= 2 && input.personCount <= 4) {
//           totalSum += 100000;
//           details.push({ component: '(1-5) Stops & (2-4) Persons', price: 100000 });
//         } else if (input.personCount >= 1 && input.personCount <= 2) {
//           totalSum += 90000;
//           details.push({ component: '(1-5) Stops & (1-2) Persons', price: 90000 });
//         }
//       } else if (input.stops >= 10 && input.stops <= 15) {
//         if (input.personCount >= 12 && input.personCount <= 15) {
//           totalSum += 250000;
//           details.push({ component: '(10-15) Stops & (12-15) Persons', price: 250000 });
//         } else if (input.personCount >= 8 && input.personCount <= 12) {
//           totalSum += 190000;
//           details.push({ component: '(10-15) Stops & (8-12) Persons', price: 190000 });
//         } else if (input.personCount >= 1 && input.personCount <= 4) {
//           totalSum += 110000;
//           details.push({ component: '(10-15) Stops & (1-4) Persons', price: 110000 });
//         }
//       } else if (input.stops >= 5 && input.stops <= 8) {
//         if (input.personCount >= 5 && input.personCount <= 6) {
//           totalSum += 20000;
//           details.push({ component: '(5-8) Stops & (5-6) Persons', price: 20000 });
//         } else if (input.personCount >= 4 && input.personCount <= 6) {
//           totalSum += 15000;
//           details.push({ component: '(5-8) Stops & (4-6) Persons', price: 15000 });
//         }
//       }
//     } else if (input.elevatorType === 'Gearbox') {
//       totalSum += 13000;
//       details.push({ component: 'Gearbox', price: 13000 });

//       if (input.hasDriveAndInverter) {
//         totalSum += 11000;
//         details.push({ component: 'Drive & Inverter', price: 11000 });
//       }

//       if (input.type === 'Jifran') {
//         totalSum += 35000;
//         details.push({ component: 'Type: Jifran', price: 35000 });
//       } else if (input.type === 'Delta') {
//         totalSum += 20000;
//         details.push({ component: 'Type: Delta', price: 20000 });
//       }

//       // Logic for stops and person count
//       if (input.stops >= 1 && input.stops <= 5) {
//         if (input.personCount >= 4 && input.personCount <= 7) {
//           totalSum += 125000;
//           details.push({ component: '(1-5) Stops & (4-7) Persons', price: 125000 });
//         } else if (input.personCount >= 2 && input.personCount <= 4) {
//           totalSum += 100000;
//           details.push({ component: '(1-5) Stops & (2-4) Persons', price: 100000 });
//         } else if (input.personCount >= 1 && input.personCount <= 2) {
//           totalSum += 90000;
//           details.push({ component: '(1-5) Stops & (1-2) Persons', price: 90000 });
//         }
//       } else if (input.stops >= 10 && input.stops <= 15) {
//         if (input.personCount >= 12 && input.personCount <= 15) {
//           totalSum += 250000;
//           details.push({ component: '(10-15) Stops & (12-15) Persons', price: 250000 });
//         } else if (input.personCount >= 8 && input.personCount <= 12) {
//           totalSum += 190000;
//           details.push({ component: '(10-15) Stops & (8-12) Persons', price: 190000 });
//         } else if (input.personCount >= 1 && input.personCount <= 4) {
//           totalSum += 110000;
//           details.push({ component: '(10-15) Stops & (1-4) Persons', price: 110000 });
//         }
//       } else if (input.stops >= 5 && input.stops <= 8) {
//         if (input.personCount >= 5 && input.personCount <= 6) {
//           totalSum += 20000;
//           details.push({ component: '(5-8) Stops & (5-6) Persons', price: 20000 });
//         } else if (input.personCount >= 4 && input.personCount <= 6) {
//           totalSum += 15000;
//           details.push({ component: '(5-8) Stops & (4-6) Persons', price: 15000 });
//         }
//       }
//     }

//     return { totalSum, details };
//   };

//   const generatePDF = (avgQuote: number) => {
//     const doc = new jsPDF();
//     doc.text(`Average Quote: ${avgQuote} LE`, 10, 10);
//     doc.save('quote.pdf');
//   };

//   return (
//     <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4 text-black">Elevator Pricing System</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="location" className="block text-sm font-medium text-black">Location</label>
//           <input type="text" id="location" name="location" value={input.location} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div className="flex items-center">
//           <input type="checkbox" id="emergencyBrake" name="emergencyBrake" checked={input.emergencyBrake} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
//           <label htmlFor="emergencyBrake" className="ml-2 block text-sm font-medium text-black">Emergency Brake</label>
//         </div>
//         <div className="flex items-center">
//           <input type="checkbox" id="speedLimiter" name="speedLimiter" checked={input.speedLimiter} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
//           <label htmlFor="speedLimiter" className="ml-2 block text-sm font-medium text-black">Speed Limiter</label>
//         </div>
//         <div className="flex items-center">
//           <input type="checkbox" id="doorLock" name="doorLock" checked={input.doorLock} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
//           <label htmlFor="doorLock" className="ml-2 block text-sm font-medium text-black">Door Lock</label>
//         </div>
//         <div className="flex items-center">
//           <input type="checkbox" id="hasMachineRoom" name="hasMachineRoom" checked={input.hasMachineRoom} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
//           <label htmlFor="hasMachineRoom" className="ml-2 block text-sm font-medium text-black">Has Machine Room</label>
//         </div>
//         <div>
//           <label htmlFor="elevatorType" className="block text-sm font-medium text-black">Elevator Type</label>
//           <select id="elevatorType" name="elevatorType" value={input.elevatorType} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black">
//             <option value="">Select Type</option>
//             <option value="Gearless">Gearless</option>
//             <option value="Gearbox">Gearbox</option>
//           </select>
//         </div>
//         {input.elevatorType && (
//           <div className="flex items-center">
//             <input type="checkbox" id="hasDriveAndInverter" name="hasDriveAndInverter" checked={input.hasDriveAndInverter} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
//             <label htmlFor="hasDriveAndInverter" className="ml-2 block text-sm font-medium text-black">Has Drive and Inverter</label>
//           </div>
//         )}
//         {input.elevatorType && (
//           <div>
//             <label htmlFor="type" className="block text-sm font-medium text-black">Type</label>
//             <select id="type" name="type" value={input.type} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black">
//               <option value="">Select Type</option>
//               <option value="Jifran">Jifran</option>
//               <option value="Delta">Delta</option>
//             </select>
//           </div>
//         )}
//         <div className="flex items-center">
//           <input type="checkbox" id="emergencyDevice" name="emergencyDevice" checked={input.emergencyDevice} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
//           <label htmlFor="emergencyDevice" className="ml-2 block text-sm font-medium text-black">Emergency Device</label>
//         </div>
//         <div>
//           <label htmlFor="stops" className="block text-sm font-medium text-black">Number of Stops</label>
//           <input type="number" id="stops" name="stops" value={input.stops} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div>
//           <label htmlFor="floorCount" className="block text-sm font-medium text-black">Number of Floors</label>
//           <input type="number" id="floorCount" name="floorCount" value={input.floorCount} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div>
//           <label htmlFor="personCount" className="block text-sm font-medium text-black">Number of Persons</label>
//           <input type="number" id="personCount" name="personCount" value={input.personCount} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div>
//           <label htmlFor="stairWidth" className="block text-sm font-medium text-black">Stair Width</label>
//           <input type="number" id="stairWidth" name="stairWidth" value={input.stairWidth} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div>
//           <label htmlFor="stairDepth" className="block text-sm font-medium text-black">Stair Depth</label>
//           <input type="number" id="stairDepth" name="stairDepth" value={input.stairDepth} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div>
//           <label htmlFor="stairType" className="block text-sm font-medium text-black">Stair Type</label>
//           <input type="text" id="stairType" name="stairType" value={input.stairType} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Calculate</button>
//       </form>
//       {output && (
//         <>
//           <Output {...output} />
//           <button onClick={() => generatePDF(output.avgQuote)} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Generate PDF</button>
//         </>
//       )}
//     </div>
//   );
// };

// const Output: React.FC<{ location: string; emergencyBrake: boolean; speedLimiter: boolean; doorLock: boolean; hasMachineRoom: boolean; elevatorType: string; hasDriveAndInverter: boolean; emergencyDevice: boolean; stops: number; type: string; floorCount: number; personCount: number; stairWidth: number; stairDepth: number; stairType: string; totalSum: number; totalRevenue: number; minQuote: number; maxQuote: number; avgQuote: number; details: { component: string; price: number }[] }> = ({ location, emergencyBrake, speedLimiter, doorLock, hasMachineRoom, elevatorType, hasDriveAndInverter, emergencyDevice, stops, type, floorCount, personCount, stairWidth, stairDepth, stairType, totalSum, totalRevenue, minQuote, maxQuote, avgQuote, details }) => {
//   return (
//     <div className="mt-4 p-4 bg-slate-700 rounded text-white">
//       <p><strong>Location:</strong> {location}</p>
//       <p><strong>Emergency Brake:</strong> {emergencyBrake ? 'Yes' : 'No'}</p>
//       <p><strong>Speed Limiter:</strong> {speedLimiter ? 'Yes' : 'No'}</p>
//       <p><strong>Door Lock:</strong> {doorLock ? 'Yes' : 'No'}</p>
//       <p><strong>Has Machine Room:</strong> {hasMachineRoom ? 'Yes' : 'No'}</p>
//       <p><strong>Elevator Type:</strong> {elevatorType}</p>
//       <p><strong>Has Drive and Inverter:</strong> {hasDriveAndInverter ? 'Yes' : 'No'}</p>
//       <p><strong>Emergency Device:</strong> {emergencyDevice ? 'Yes' : 'No'}</p>
//       <p><strong>Number of Stops:</strong> {stops}</p>
//       <p><strong>Type:</strong> {type}</p>
//       <p><strong>Number of Floors:</strong> {floorCount}</p>
//       <p><strong>Number of Persons:</strong> {personCount}</p>
//       <p><strong>Stair Width:</strong> {stairWidth}</p>
//       <p><strong>Stair Depth:</strong> {stairDepth}</p>
//       <p><strong>Stair Type:</strong> {stairType}</p>
//       <hr className="my-4" />
//       <h2 className="text-xl font-bold">Components and Prices</h2>
//       <ul>
//         {details.map((detail, index) => (
//           <li key={index}>{detail.component}: {detail.price} LE</li>
//         ))}
//       </ul>
//       <hr className="my-4" />
//       <p><strong>Product Sum:</strong> {totalSum} LE</p>
//       <p><strong>Construction:</strong> 40000 LE</p>
//       <p><strong>Transportation:</strong> {(0.1 * totalSum).toFixed(1)} LE</p>
//       <p><strong>Total Revenue:</strong> {totalRevenue.toFixed(1)} LE</p>
//       <p><strong>Commission:</strong> {(0.03 * totalRevenue).toFixed(1)} LE</p>
//       <p><strong>Minimum Quote:</strong> {minQuote.toFixed(1)} LE</p>
//       <p><strong>Maximum Quote:</strong> {maxQuote.toFixed(1)} LE</p>
//       <p><strong>Average Quote:</strong> {avgQuote.toFixed(1)} LE</p>
//     </div>
//   );
// };

// export default IndexPage;

































// "use client";

// import React, { useState } from 'react';
// import { jsPDF } from 'jspdf';

// const IndexPage: React.FC = () => {
//   const [input, setInput] = useState({
//     hasMachineRoom: false,
//     elevatorType: '',
//     hasDriveAndInverter: false,
//     emergencyDevice: false,
//     handlingWheel: false,
//     hasPowerCables: true,
//     hasSpeedLimiter: true,
//     hasControlUnit: true,
//     stops: 0,
//     type: '',
//     floorCount: 0,
//     personCount: 0,
//     stairWidth: 0,
//     stairDepth: 0,
//   });

//   const [output, setOutput] = useState<any>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     if (type === 'checkbox') {
//       const { checked } = e.target as HTMLInputElement;
//       setInput((prevInput) => ({
//         ...prevInput,
//         [name]: checked,
//         elevatorType: name === 'hasMachineRoom' ? (checked ? 'Gearbox' : 'Gearless') : prevInput.elevatorType,
//       }));
//     } else {
//       setInput((prevInput) => ({
//         ...prevInput,
//         [name]: value,
//       }));
//     }
//   };
  
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const { totalSum, details } = calculateTotalSum(input);
//     const totalRevenue = (totalSum + 40000 + 0.1 * totalSum) * 1.11;
//     const commission = totalRevenue * 0.03;
//     const minQuote = totalRevenue + commission;
//     const maxQuote = minQuote * 1.05 + minQuote;
//     const avgQuote = (minQuote + maxQuote) / 2;

//     setOutput({ ...input, totalSum, totalRevenue, minQuote, maxQuote, avgQuote, details });
//   };

//   const calculateTotalSum = (input: any) => {
//     let totalSum = 0;
//     let details: { component: string; price: number }[] = [];

//     // Add mandatory components directly
//     totalSum += 1000; // Emergency Brake
//     details.push({ component: 'Power trunking and cables', price: 1000 });
//     input.hasPowerCables = true;
    
//     totalSum += 4500; // Speed Limiter
//     details.push({ component: 'Speed Limiter', price: 4500 });
//     input.hasSpeedLimiter = true;
    
//     totalSum += 2500; // Door Lock
//     details.push({ component: 'Control Unit', price: 25000 });
//     input.hasControlUnit = true;

//     if (input.hasMachineRoom) {
//       totalSum += 13000;
//       details.push({ component: 'Equipments for Gearbox', price: 13000 });
//       input.elevatorType = 'Gearbox';
//     } else {
//       totalSum += 6500;
//       details.push({ component: 'Equipments for Gearless', price: 6500 });
//       input.elevatorType = 'Gearless';
//       input.emergencyDevice = true;
//       input.hasDriveAndInverter = true;
//     }

//     if (input.elevatorType === 'Gearless') {

//       if (input.hasDriveAndInverter) {
//         if (input.type === 'Jifran') {
//           totalSum += 35000;
//           details.push({ component: 'Type: Jifran', price: 35000 });
//         } else if (input.type === 'Delta') {
//           totalSum += 20000;
//           details.push({ component: 'Type: Delta', price: 20000 });
//         }
//       }
      
//       if (input.emergencyDevice) {
//         totalSum += 11000;
//         details.push({ component: 'Emergency Device', price: 11000 });
//       }

//       // Logic for stops and person count
//       calculateStopsAndPersons(input, totalSum, details);

//     } else if (input.elevatorType === 'Gearbox') {

//       totalSum += 1000;
//       details.push({ component: 'Handling Wheel', price: 1000 });

//       if (input.hasDriveAndInverter) {

//         if (input.type === 'Jifran') {
//           totalSum += 35000;
//           details.push({ component: 'Type: Jifran', price: 35000 });
//         } else if (input.type === 'Delta') {
//           totalSum += 20000;
//           details.push({ component: 'Type: Delta', price: 20000 });
//         }
//       }

//       // Logic for stops and person count
//       calculateStopsAndPersons(input, totalSum, details);
//     }

//     return { totalSum, details };
//   };

//   const calculateStopsAndPersons = (input: any, totalSum: number, details: any[]) => {
//     if(input.elevatorType = 'Gearless'){
//       if (input.stops <= 3 && (input.personCount >= 1 && input.personCount <= 2)) { 
//         totalSum += 90000;
//         details.push({ component: '(1-3) Stops & (1-2) Persons 2.8KW', price: 90000 });
//       } else if (input.stops <= 4 && (input.personCount >= 2 && input.personCount <= 4)) {
//         totalSum += 100000;
//         details.push({ component: '(1-4) Stops & (2-4) Persons 3.6 KW', price: 100000 });
//       } else if (input.stops <= 5 && (input.personCount >= 4 && input.personCount <= 7)) {
//         totalSum += 125000;
//         details.push({ component: '(1-5) Stops & (4-7) Persons 5.1 KW', price: 125000 });
//       }
//     }else{
//       if (input.stops <= 5 && (input.personCount >= 1 && input.personCount <= 4)) { 
//         totalSum += 90000;
//         details.push({ component: '(1-5) Stops && (1-4) Persons 8 حصان', price: 100000 });
//       } else if (input.stops <= 5 && (input.personCount >= 4 && input.personCount <= 6)) {
//         totalSum += 105000;
//         details.push({ component: '(1-5) Stops && (4-6) Persons 9 حصان', price: 105000 });
//       } else if (input.stops <= 8 && (input.personCount >= 5 && input.personCount <= 6)) {
//         totalSum += 110000;
//         details.push({ component: '(5-8) Stops && (5-6) Persons 10 حصان', price: 110000 });
//       }else if (input.stops <= 10 && (input.personCount >= 1 && input.personCount <= 4)) {
//         totalSum += 135000;
//         details.push({ component: '(5-10) Stops && (1-4) Persons 12 حصان', price: 135000 });
//       }else if (input.stops <= 15 && (input.personCount >= 8 && input.personCount <= 12)) {
//         totalSum += 165000;
//         details.push({ component: '(10-15) Stops && (8-12) Persons 15 حصان', price: 165000 });
//       }else if (input.stops <= 15 && (input.personCount >= 12 && input.personCount <= 15)) {
//         totalSum += 190000;
//         details.push({ component: '(10-15) Stops && (12-15) Persons 15 حصان', price: 190000 });
//       }else if (input.stops <= 15 && (input.personCount <= 15)) {
//         totalSum += 210000;
//         details.push({ component: '(10-15) Stops && (12-15) Persons 15 حصان', price: 210000 });
//       }
//     }
//   };

//   const generatePDF = (avgQuote: number) => {
//     const doc = new jsPDF();
//     doc.text(`Average Quote: ${avgQuote} LE`, 10, 10);
//     doc.save('quote.pdf');
//   };

//   return (
//     <div className="container mx-auto p-4 bg-gray-100 min-h-screen justify-center items-center">
//       <h1 className="text-2xl font-bold mb-4 text-black">Elevator Pricing System</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="flex items-center">

//           <input type="checkbox" id="hasPowerCables" name="hasPowerCables" checked={input.hasPowerCables} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
//           <label htmlFor="hasPowerCables" className="ml-2 block text-sm font-medium text-black">Has Power Cables</label>

//           <input type="checkbox" id="hasMachineRoom" name="hasMachineRoom" checked={input.hasMachineRoom} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
//           <label htmlFor="hasMachineRoom" className="ml-2 block text-sm font-medium text-black">Has Machine Room</label>
//         </div>
//         <div>
//           <label htmlFor="elevatorType" className="block text-sm font-medium text-black">Elevator Type</label>
//           <input type="text" id="elevatorType" name="elevatorType" value={input.hasMachineRoom ? 'Gearbox' : 'Gearless'} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         {input.elevatorType === 'Gearless' && (
//           <div className="flex items-center">

//             <input type="checkbox" id="emergencyDevice" name="emergencyDevice" checked={input.emergencyDevice} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
//             <label htmlFor="emergencyDevice" className="ml-2 block text-sm font-medium text-black">Emergency Device</label>

//             <input type="checkbox" id="hasDriveAndInverter" name="hasDriveAndInverter" checked={input.hasDriveAndInverter} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
//             <label htmlFor="hasDriveAndInverter" className="ml-2 block text-sm font-medium text-black">Has Drive and Inverter</label>
//           </div>
//         )}
//         {input.elevatorType === 'Gearbox' && (
//           <div className="flex items-center">
//             <input type="checkbox" id="emergencyDevice" name="emergencyDevice" checked={input.emergencyDevice} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
//             <label htmlFor="emergencyDevice" className="ml-2 block text-sm font-medium text-black">Emergency Device</label>

//             <input type="checkbox" id="handlingWheel" name="handlingWheel" checked={input.handlingWheel} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
//             <label htmlFor="handlingWheel" className="ml-2 block text-sm font-medium text-black">Handling Wheel</label>
//           </div>
//         )}
//         {input.elevatorType && (
//           <div>
//             <label htmlFor="type" className="block text-sm font-medium text-black">Type</label>
//             <select id="type" name="type" value={input.type} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black">
//               <option value="">Select Type</option>
//               <option value="Jifran">Jifran</option>
//               <option value="Delta">Delta</option>
//             </select>
//           </div>
//         )}
//         <div>
//           <label htmlFor="stops" className="block text-sm font-medium text-black">Number of Stops</label>
//           <input type="number" id="stops" name="stops" value={input.stops} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div>
//           <label htmlFor="floorCount" className="block text-sm font-medium text-black">Number of Floors</label>
//           <input type="number" id="floorCount" name="floorCount" value={input.floorCount} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div>
//           <label htmlFor="personCount" className="block text-sm font-medium text-black">Number of Persons</label>
//           <input type="number" id="personCount" name="personCount" value={input.personCount} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div>
//           <label htmlFor="stairWidth" className="block text-sm font-medium text-black">Stair Width</label>
//           <input type="number" id="stairWidth" name="stairWidth" value={input.stairWidth} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <div>
//           <label htmlFor="stairDepth" className="block text-sm font-medium text-black">Stair Depth</label>
//           <input type="number" id="stairDepth" name="stairDepth" value={input.stairDepth} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black" />
//         </div>
//         <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Calculate</button>
//       </form>
//       {output && (
//         <>
//           <Output {...output} />
//           <button onClick={() => generatePDF(output.avgQuote)} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Generate PDF</button>
//         </>
//       )}
//     </div>
//   );
// };

// const Output: React.FC<{ location: string; hasMachineRoom: boolean; elevatorType: string; hasDriveAndInverter: boolean; emergencyDevice: boolean; stops: number; type: string; floorCount: number; personCount: number; stairWidth: number; stairDepth: number; stairType: string; totalSum: number; totalRevenue: number; minQuote: number; maxQuote: number; avgQuote: number; details: { component: string; price: number }[] }> = ({ location, hasMachineRoom, elevatorType, hasDriveAndInverter, emergencyDevice, stops, type, floorCount, personCount, stairWidth, stairDepth, stairType, totalSum, totalRevenue, minQuote, maxQuote, avgQuote, details }) => {
//   return (
//     <div className="mt-4 p-4 bg-slate-700 rounded text-white">
//       <p><strong>Has Machine Room:</strong> {hasMachineRoom ? 'Yes' : 'No'}</p>
//       <p><strong>Elevator Type:</strong> {elevatorType}</p>
//       <p><strong>Has Drive and Inverter:</strong> {hasDriveAndInverter ? 'Yes' : 'No'}</p>
//       <p><strong>Emergency Device:</strong> {emergencyDevice ? 'Yes' : 'No'}</p>
//       <p><strong>Number of Stops:</strong> {stops}</p>
//       <p><strong>Type:</strong> {type}</p>
//       <p><strong>Number of Floors:</strong> {floorCount}</p>
//       <p><strong>Number of Persons:</strong> {personCount}</p>
//       <p><strong>Stair Width:</strong> {stairWidth}</p>
//       <p><strong>Stair Depth:</strong> {stairDepth}</p>
//       <hr className="my-4" />
//       <h2 className="text-xl font-bold">Components and Prices</h2>
//       <ul>
//         {details.map((detail, index) => (
//           <li key={index}>{detail.component}: {detail.price} LE</li>
//         ))}
//       </ul>
//       <hr className="my-4" />
//       <p><strong>Product Sum:</strong> {totalSum} LE</p>
//       <p><strong>Construction:</strong> 40000 LE</p>
//       <p><strong>Transportation:</strong> {(0.1 * totalSum).toFixed(1)} LE</p>
//       <p><strong>Total Revenue:</strong> {totalRevenue.toFixed(1)} LE</p>
//       <p><strong>Commission:</strong> {(0.03 * totalRevenue).toFixed(1)} LE</p>
//       <p><strong>Minimum Quote:</strong> {minQuote.toFixed(1)} LE</p>
//       <p><strong>Maximum Quote:</strong> {maxQuote.toFixed(1)} LE</p>
//       <p><strong>Average Quote:</strong> {avgQuote.toFixed(1)} LE</p>
//     </div>
//   );
// };

// export default IndexPage;






'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { jsPDF } from 'jspdf';
import {
  Container,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  MenuItem,
} from '@mui/material';

interface InputState {
  hasMachineRoom: boolean;
  elevatorType: string;
  hasDriveAndInverter: boolean;
  emergencyDevice: boolean;
  handlingWheel: boolean;
  hasPowerCables: boolean;
  hasSpeedLimiter: boolean;
  hasControlUnit: boolean;
  stops: number;
  type: string;
  floorCount: number;
  personCount: number;
  stairWidth: number;
  stairDepth: number;
}

interface OutputDetails {
  component: string;
  price: number;
}

interface OutputState extends InputState {
  totalSum: number;
  totalRevenue: number;
  minQuote: number;
  maxQuote: number;
  avgQuote: number;
  details: OutputDetails[];
}

const IndexPage: React.FC = () => {
  const [input, setInput] = useState<InputState>({
    hasMachineRoom: false,
    elevatorType: '',
    hasDriveAndInverter: false,
    emergencyDevice: false,
    handlingWheel: false,
    hasPowerCables: true,
    hasSpeedLimiter: true,
    hasControlUnit: true,
    stops: 0,
    type: '',
    floorCount: 0,
    personCount: 0,
    stairWidth: 0,
    stairDepth: 0,
  });

  const [output, setOutput] = useState<OutputState | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setInput((prevInput) => ({
        ...prevInput,
        [name]: checked,
        elevatorType: name === 'hasMachineRoom' ? (checked ? 'Gearbox' : 'Gearless') : prevInput.elevatorType,
      }));
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { totalSum, details } = calculateTotalSum(input);
    const totalRevenue = (totalSum + 40000 + 0.1 * totalSum) * 1.11;
    const commission = totalRevenue * 0.03;
    const minQuote = totalRevenue + commission;
    const maxQuote = minQuote * 1.05 + minQuote;
    const avgQuote = (minQuote + maxQuote) / 2;

    setOutput({ ...input, totalSum, totalRevenue, minQuote, maxQuote, avgQuote, details });
  };

  const calculateTotalSum = (input: InputState): { totalSum: number; details: OutputDetails[] } => {
    let totalSum = 0;
    let details: OutputDetails[] = [];

    // Add mandatory components directly
    totalSum += 1000; // Emergency Brake
    details.push({ component: 'Power trunking and cables', price: 1000 });
    input.hasPowerCables = true;
    
    totalSum += 4500; // Speed Limiter
    details.push({ component: 'Speed Limiter', price: 4500 });
    input.hasSpeedLimiter = true;
    
    totalSum += 2500; // Door Lock
    details.push({ component: 'Control Unit', price: 25000 });
    input.hasControlUnit = true;

    if (input.hasMachineRoom) {
      totalSum += 13000;
      details.push({ component: 'Equipments for Gearbox', price: 13000 });
      input.elevatorType = 'Gearbox';
    } else {
      totalSum += 6500;
      details.push({ component: 'Equipments for Gearless', price: 6500 });
      input.elevatorType = 'Gearless';
      input.emergencyDevice = true;
      input.hasDriveAndInverter = true;
    }

    if (input.elevatorType === 'Gearless') {

      if (input.hasDriveAndInverter) {
        if (input.type === 'Jifran') {
          totalSum += 35000;
          details.push({ component: 'Type: Jifran', price: 35000 });
        } else if (input.type === 'Delta') {
          totalSum += 20000;
          details.push({ component: 'Type: Delta', price: 20000 });
        }
      }
      
      if (input.emergencyDevice) {
        totalSum += 11000;
        details.push({ component: 'Emergency Device', price: 11000 });
      }

      // Logic for stops and person count
      calculateStopsAndPersons(input, totalSum, details);

    } else if (input.elevatorType === 'Gearbox') {

      totalSum += 1000;
      details.push({ component: 'Handling Wheel', price: 1000 });

      if (input.hasDriveAndInverter) {

        if (input.type === 'Jifran') {
          totalSum += 35000;
          details.push({ component: 'Type: Jifran', price: 35000 });
        } else if (input.type === 'Delta') {
          totalSum += 20000;
          details.push({ component: 'Type: Delta', price: 20000 });
        }
      }

      // Logic for stops and person count
      calculateStopsAndPersons(input, totalSum, details);
    }

    return { totalSum, details };
  };

  const calculateStopsAndPersons = (input: InputState, totalSum: number, details: OutputDetails[]) => {
    if(input.elevatorType = 'Gearless'){
      if (input.stops <= 3 && (input.personCount >= 1 && input.personCount <= 2)) { 
        totalSum += 90000;
        details.push({ component: '(1-3) Stops & (1-2) Persons 2.8KW', price: 90000 });
      } else if (input.stops <= 4 && (input.personCount >= 2 && input.personCount <= 4)) {
        totalSum += 100000;
        details.push({ component: '(1-4) Stops & (2-4) Persons 3.6 KW', price: 100000 });
      } else if (input.stops <= 5 && (input.personCount >= 4 && input.personCount <= 7)) {
        totalSum += 125000;
        details.push({ component: '(1-5) Stops & (4-7) Persons 5.1 KW', price: 125000 });
      }
    }else{
      if (input.stops <= 5 && (input.personCount >= 1 && input.personCount <= 4)) { 
        totalSum += 90000;
        details.push({ component: '(1-5) Stops && (1-4) Persons 8 حصان', price: 100000 });
      } else if (input.stops <= 5 && (input.personCount >= 4 && input.personCount <= 6)) {
        totalSum += 105000;
        details.push({ component: '(1-5) Stops && (4-6) Persons 9 حصان', price: 105000 });
      } else if (input.stops <= 8 && (input.personCount >= 5 && input.personCount <= 6)) {
        totalSum += 110000;
        details.push({ component: '(5-8) Stops && (5-6) Persons 10 حصان', price: 110000 });
      }else if (input.stops <= 10 && (input.personCount >= 1 && input.personCount <= 4)) {
        totalSum += 135000;
        details.push({ component: '(5-10) Stops && (1-4) Persons 12 حصان', price: 135000 });
      }else if (input.stops <= 15 && (input.personCount >= 8 && input.personCount <= 12)) {
        totalSum += 165000;
        details.push({ component: '(10-15) Stops && (8-12) Persons 15 حصان', price: 165000 });
      }else if (input.stops <= 15 && (input.personCount >= 12 && input.personCount <= 15)) {
        totalSum += 190000;
        details.push({ component: '(10-15) Stops && (12-15) Persons 15 حصان', price: 190000 });
      }else if (input.stops <= 15 && (input.personCount <= 15)) {
        totalSum += 210000;
        details.push({ component: '(10-15) Stops && (12-15) Persons 15 حصان', price: 210000 });
      }
    }
  };

  const generatePDF = (avgQuote: number) => {
    const doc = new jsPDF();
    doc.text(`Average Quote: ${avgQuote} LE`, 10, 10);
    doc.save('quote.pdf');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
      <Typography variant="h4" component="h1" gutterBottom className='text-slate-700'>
        Elevator Pricing System
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <FormControlLabel
            control={<Checkbox checked={input.hasPowerCables} onChange={handleChange} name="hasPowerCables" />}
            label="Has Power Cables"
            className='text-slate-700'
          />
          <FormControlLabel
            control={<Checkbox checked={input.hasMachineRoom} onChange={handleChange} name="hasMachineRoom" />}
            label="Has Machine Room"
            className='text-slate-700'
          />
          <TextField
            label="Elevator Type"
            value={input.hasMachineRoom ? 'Gearbox' : 'Gearless'}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
          {input.elevatorType === 'Gearless' && (
            <>
              <FormControlLabel
                control={<Checkbox checked={input.emergencyDevice} onChange={handleChange} name="emergencyDevice" />}
                label="Emergency Device"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.hasDriveAndInverter} onChange={handleChange} name="hasDriveAndInverter" />}
                label="Has Drive and Inverter"
                className='text-slate-700'
              />
            </>
          )}
          {input.elevatorType === 'Gearbox' && (
            <>
              <FormControlLabel
                control={<Checkbox checked={input.emergencyDevice} onChange={handleChange} name="emergencyDevice" />}
                label="Emergency Device"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.handlingWheel} onChange={handleChange} name="handlingWheel" />}
                label="Handling Wheel"
                className='text-slate-700'
              />
            </>
          )}
          {input.elevatorType && (
            <TextField
              select
              label="Type"
              value={input.type}
              onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
              name="type"
              variant="outlined"
            >
              <MenuItem value="">Select Type</MenuItem>
              <MenuItem value="Jifran">Jifran</MenuItem>
              <MenuItem value="Delta">Delta</MenuItem>
            </TextField>
          )}
          <TextField
            label="Number of Stops"
            type="number"
            name="stops"
            value={input.stops}
            onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
            variant="outlined"
          />
          <TextField
            label="Number of Floors"
            type="number"
            name="floorCount"
            value={input.floorCount}
            onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
            variant="outlined"
          />
          <TextField
            label="Number of Persons"
            type="number"
            name="personCount"
            value={input.personCount}
            onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
            variant="outlined"
          />
          <TextField
            label="Stair Width"
            type="number"
            name="stairWidth"
            value={input.stairWidth}
            onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
            variant="outlined"
          />
          <TextField
            label="Stair Depth"
            type="number"
            name="stairDepth"
            value={input.stairDepth}
            onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary">
            Calculate
          </Button>
        </Box>
      </form>
      {output && (
        <Card variant="outlined" sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Calculation Results
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary={`Has Machine Room: ${output.hasMachineRoom ? 'Yes' : 'No'}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Elevator Type: ${output.elevatorType}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Has Drive and Inverter: ${output.hasDriveAndInverter ? 'Yes' : 'No'}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Emergency Device: ${output.emergencyDevice ? 'Yes' : 'No'}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Number of Stops: ${output.stops}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Type: ${output.type}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Number of Floors: ${output.floorCount}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Number of Persons: ${output.personCount}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Stair Width: ${output.stairWidth}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Stair Depth: ${output.stairDepth}`} />
              </ListItem>
            </List>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" component="h2">
              Components and Prices
            </Typography>
            <List>
              {output.details.map((detail: OutputDetails, index: number) => (
                <ListItem key={index}>
                  <ListItemText primary={`${detail.component}: ${detail.price} LE`} />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" component="h2">
              Summary
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary={`Product Sum: ${output.totalSum} LE`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Construction: 40000 LE`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Transportation: ${(0.1 * output.totalSum).toFixed(1)} LE`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Total Revenue: ${output.totalRevenue.toFixed(1)} LE`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Commission: ${(0.03 * output.totalRevenue).toFixed(1)} LE`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Minimum Quote: ${output.minQuote.toFixed(1)} LE`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Maximum Quote: ${output.maxQuote.toFixed(1)} LE`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Average Quote: ${output.avgQuote.toFixed(1)} LE`} />
              </ListItem>
            </List>
            <Button variant="contained" color="secondary" onClick={() => generatePDF(output.avgQuote)}>
              Generate PDF
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default IndexPage;
