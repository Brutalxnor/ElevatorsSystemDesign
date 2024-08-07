
'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
  FormControl,
  InputLabel,
  Select,
  Grid,
} from '@mui/material';
import { Build, DoorFront, Stairs, Cabin } from '@mui/icons-material'; // Import icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface InputState {

    // Machine

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
  coreComponent: string;
  componentA?: boolean; // Add optional components for the new sections
  componentB?: boolean;
  componentC?: boolean;
  
  // Stairwell
  hasClipers:true;
  hasNailPole:true;
  hasFreeService:true;
  hasFingerMagnet:true;
  hasPartsBox:true;
  hasMagneticCell:true;
  hasStringPull:true;
  hasPartsBoxSbortena:true;
  hasNailPoleWeight:true;
  hasNailFlanch:true;
  hasBufferZipper:true;
  hasPoles:true,
  strokeLength: number;
  speedControllerString?: string;
  cableControllerString?: true;
  healtyNail?: true;
  healtyNailWeight?: true;
  fixingPoleWeight:true;
  stringPuller:true;
  hangerType?: string;


  // Cabin
  isWood:false;
  isStainlessteel:false;
  isPanorama:false;
  weightChair:false;
  internalRequirementBox:true;
  cabinLight:true;
  serviceBox:true;
  turkishCamPart:true;
  mazyezBundle:true;
  camKnobs:true;
  photoCell:true;
  zahrWeight:true;


    // Door
  isAutomatic:false;
  isHalfAutomatic:false;
  doorAssembelyAccessories:true;
  doorAccessories:true;
  doorHealtyNail:true;
  doorKnob:true;
  tolomba:true;
  outerIntercome:true;

  automaticType?:string,
  halfAutomaticType?:string,
  localElectrostaticSize?:string,
  turkishImportedSize?:string
  localPanoramaSize?:string;
  localSuperPanoramaSize?:string;
  italianSilkomInternalSize?:string;
  italianSilkomExternalSize?:string;
  turkishHasInternalSize?:string;
  turkishHasExternalSize?:string;
  chineeseSilkomInternalSize?:string;
  chineeseSilkomExternalSize?:string;
  fermotorInternalSize?:string;
  fermotorExternalSize?:string;


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

    //Machine
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

    //Stairwell
    hasClipers:true,
    hasNailPole:true,
    hasFreeService:true,
    hasFingerMagnet:true,
    hasPartsBox:true,
    hasMagneticCell:true,
    hasStringPull:true,
    hasPartsBoxSbortena:true,
    hasNailPoleWeight:true,
    hasNailFlanch:true,
    hasBufferZipper:true,
    hasPoles:true,
    hangerType: '',
    strokeLength: 1,
    cableControllerString: true,
    fixingPoleWeight:true,
    healtyNail: true,
    healtyNailWeight: true,
    stringPuller:true,

  // Cabin
    isWood:false,
    isStainlessteel:false,
    isPanorama:false,
    weightChair:false,
    internalRequirementBox:true,
    cabinLight:true,
    serviceBox:true,
    turkishCamPart:true,
    mazyezBundle:true,
    camKnobs:true,
    photoCell:true,
    zahrWeight:true,


    // Door
    isAutomatic:false,
    isHalfAutomatic:false,
    doorAssembelyAccessories:true,
    doorAccessories:true,
    doorHealtyNail:true,
    doorKnob:true,
    tolomba:true,
    outerIntercome:true,

    automaticType:'',
    halfAutomaticType:'',
    localElectrostaticSize:'',
    turkishImportedSize:'',
    localPanoramaSize:'',
    localSuperPanoramaSize:'',
    italianSilkomInternalSize:'',
    italianSilkomExternalSize:'',
    turkishHasInternalSize:'',
    turkishHasExternalSize:'',
    chineeseSilkomInternalSize:'',
    chineeseSilkomExternalSize:'',
    fermotorInternalSize:'',
    fermotorExternalSize:'',



    coreComponent: '', // Initialize coreComponent
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
    if(input.hasPowerCables){

      totalSum += 1000; // Emergency Brake
      details.push({ component: 'Power trunking and cables', price: 1000 });
    }
    if(input.hasSpeedLimiter){

      totalSum += 4500; // Speed Limiter
      details.push({ component: 'Speed Limiter', price: 4500 });
    }
    if(input.hasControlUnit){

      totalSum += 2500; // Door Lock
      details.push({ component: 'Control Unit', price: 25000 });
    }

    calculateStopsAndPersons(input, totalSum, details);
    totalSum += calculateStairwellProducts(input, totalSum, details);
    totalSum += calculateCabin(input, totalSum, details);
    totalSum += calculateDoors(input, totalSum, details);

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

    if (input.emergencyDevice) {
      totalSum += 11000;
      details.push({ component: 'Emergency Device', price: 11000 });
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
    }

    return { totalSum, details };
  };

  const calculateStopsAndPersons = (input: InputState, totalSum: number, details: OutputDetails[]) => {
    if(input.elevatorType === 'Gearless'){
      if (input.stops <= 3 && (input.personCount >= 1 && input.personCount <= 2)) { 
        totalSum += 90000;
        details.push({ component: '(1-3) Stops & (1-2) Persons 2.8KW', price: 90000 });
      } else if (input.stops <= 4 && (input.personCount >= 2 && input.personCount <= 4)) {
        totalSum += 100000;
        details.push({ component: '(1-4) Stops & (2-4) Persons 3.6 KW', price: 100000 });
      } else if (input.stops <= 5 && (input.personCount >= 4 && input.personCount <= 7)) {
        totalSum += 125000;
        details.push({ component: '(1-5) Stops & (4-7) Persons 5.1 KW', price: 125000 });
      } else {
        // Handle additional stops and persons for Gearless
      }
    } else if(input.elevatorType === 'Gearbox'){
      if (input.stops <= 5 && (input.personCount >= 1 && input.personCount <= 4)) { 
        totalSum += 90000;
        details.push({ component: '(1-5) Stops && (1-4) Persons 8 HP', price: 100000 });
      } else if (input.stops <= 5 && (input.personCount >= 4 && input.personCount <= 6)) {
        totalSum += 105000;
        details.push({ component: '(1-5) Stops && (4-6) Persons 9 HP', price: 105000 });
      } else if (input.stops <= 8 && (input.personCount >= 5 && input.personCount <= 6)) {
        totalSum += 110000;
        details.push({ component: '(5-8) Stops && (5-6) Persons 10 HP', price: 110000 });
      } else if (input.stops <= 10 && (input.personCount >= 1 && input.personCount <= 4)) {
        totalSum += 135000;
        details.push({ component: '(5-10) Stops && (1-4) Persons 12 HP', price: 135000 });
      } else if (input.stops <= 15 && (input.personCount >= 8 && input.personCount <= 12)) {
        totalSum += 165000;
        details.push({ component: '(10-15) Stops && (8-12) Persons 15 HP', price: 165000 });
      } else if (input.stops <= 15 && (input.personCount >= 12 && input.personCount <= 15)) {
        totalSum += 190000;
        details.push({ component: '(10-15) Stops && (12-15) Persons 15 HP', price: 190000 });
      } else if (input.stops <= 15 && (input.personCount <= 15)) {
        totalSum += 210000;
        details.push({ component: '(10-15) Stops && (12-15) Persons 15 HP', price: 210000 });
      }
    }
  };

  const calculateStairwellProducts = (input: InputState, totalSum: number, details: OutputDetails[]) =>{

    let stairwellTotal = 0;

    if(input.hasClipers){
      stairwellTotal += 600; 
      details.push({ component: 'Clippers', price: 600 });
    }
    if(input.hasNailPole){
      stairwellTotal += 800; 
      details.push({ component: 'Nail Pole', price: 800 });
    }
    if(input.hasFreeService){
      stairwellTotal += 6000; 
      details.push({ component: 'Free Service', price: 6000 });
    }
    if(input.hasFingerMagnet){
      stairwellTotal += 600; 
      details.push({ component: 'Finger Magnet', price: 600 });
    } 
    if (input.hasPartsBox) {
      stairwellTotal += 800;
      details.push({ component: 'Box Parts', price: 800 });
    }
    
    if (input.hasMagneticCell) {
      stairwellTotal += 300;
      details.push({ component: 'Magnetic Cell', price: 300 });
    }
    
    if (input.hasStringPull) {
      stairwellTotal += 4500;
      details.push({ component: 'String Pull', price: 4500 });
    }
    
    if (input.hasPartsBoxSbortena) {
      stairwellTotal += 200;
      details.push({ component: 'Parts Box Sbortena', price: 200 });
    }
    
    if (input.hasNailPoleWeight) {
      stairwellTotal += 800;
      details.push({ component: 'Nail Pole Weight', price: 800 });
    }
    
    if (input.hasNailFlanch) {
      stairwellTotal += 800;
      details.push({ component: 'Nail Flanch', price: 800 });
    }
    
    if (input.hasBufferZipper) {
      stairwellTotal += 800;
      details.push({ component: 'Buffer Zipper', price: 800 });
    }

    if(input.hasPoles){
      const sum = approximateToNearestFive(input.strokeLength * 2);
      if (input.hangerType === "direct") {
        stairwellTotal += 800 * sum;
        details.push({ component: 'Direct Hanger Pole', price: 800 * sum });
      } else if (input.hangerType === "2:1") {
        stairwellTotal += 800 * sum;
        details.push({ component: '2:1 Hanger Pole', price: 800 * sum });
      } else if (input.hangerType === "fork") {
        stairwellTotal += 1400 * sum;
        details.push({ component: 'Fork Hanger Pole', price: 1400 * sum });
      }
    }
    
    if (input.cableControllerString) {
      stairwellTotal += input.strokeLength * 2 * 20;
      details.push({ component: 'Cable String Controller', price: input.strokeLength * 2 * 20 });
    }
    
    if (input.fixingPoleWeight) {
      stairwellTotal += input.stops * 10 * 30;
      details.push({ component: 'Fixing Pole Weight', price: input.stops * 10 * 30 });
    }
    
    if (input.healtyNail) {
      stairwellTotal += input.stops * 10 * 10;
      details.push({ component: 'Healty Nail', price: input.stops * 10 * 10 });
    }
    
    if (input.healtyNailWeight) {
      stairwellTotal += input.strokeLength * 10 * 30;
      details.push({ component: 'Healty Nail Weight', price: input.strokeLength * 10 * 30 });
    }
    

    if(input.stringPuller){
      let stringPullerSum = approximateToNearestFive(input.strokeLength * 2);
      if (input.hangerType === "direct") {
        stairwellTotal += (4 * 2 * input.strokeLength);
        details.push({ component: 'String Puller', price: (4 * 2 * input.strokeLength) });
      } else if (input.hangerType === "2:1") {
        stairwellTotal += (9 * 2 * input.strokeLength);
        details.push({ component: 'String Puller', price: (9 * 2 * input.strokeLength) });
      } else if (input.hangerType === "fork") {
        stairwellTotal += 9 * 2 * input.strokeLength;
        details.push({ component: 'String Puller', price: (9 * 2 * input.strokeLength)});
      }
    }
    
    return stairwellTotal;
  };



  const calculateCabin = (input: InputState, totalSum: number, details: OutputDetails[]) =>{

    let cabinTotal = 0;
    if(input.isWood){
      cabinTotal += 60000; 
      details.push({ component: 'Wood', price: 60000 });
    }
    if(input.isStainlessteel){
      cabinTotal += 55000; 
      details.push({ component: 'Stainlessteel', price: 55000 });
    }
    if(input.isPanorama){
      cabinTotal += 65000; 
      details.push({ component: 'Panorama', price: 65000 });
    }    


    if(input.weightChair){
      cabinTotal += 3000; 
      details.push({ component: 'Panorama', price: 3000 });
    }
    
    if(input.internalRequirementBox){
      cabinTotal += 4000; 
      details.push({ component: 'Internal RequirementBox', price: 4000 });
    }

    if(input.cabinLight){
      cabinTotal += 500; 
      details.push({ component: 'Cabin Light', price: 500 });
    }

    
    if(input.serviceBox){
      cabinTotal += 300; 
      details.push({ component: 'Service Box', price: 500 });
    }

    if(input.turkishCamPart){
      cabinTotal += 300; 
      details.push({ component: 'Turkish Cam Part', price: 200 });
    }

    if(input.mazyezBundle){
      cabinTotal += 500; 
      details.push({ component: 'Mazyez Bundle', price: 200 });
    }

    if(input.camKnobs){
      cabinTotal += 4100; 
      details.push({ component: 'Cam Knobs', price: 4100 });
    }

    if(input.photoCell){
      cabinTotal += 2000; 
      details.push({ component: 'Photo Cell', price: 2000 });
    }

    if(input.zahrWeight){
      cabinTotal += (input.personCount*80*1.5*5); 
      details.push({ component: 'zahrWeight', price: (input.personCount*80*1.5*5) });
    }

    return cabinTotal;
  };



  const calculateDoors = (input: InputState, totalSum: number, details: OutputDetails[]) =>{

    let doorsTotal = 0;

    if(input.isHalfAutomatic){

      if(input.doorAssembelyAccessories){
        doorsTotal += (input.stops*500);
        details.push({ component: 'Door Assembely Accessories', price: (input.stops*500) });
      }
      
      if(input.doorAccessories){
        doorsTotal += (input.stops*50);
        details.push({ component: 'Door Accessories', price: (input.stops*50) });
      }

      if(input.doorHealtyNail){
        doorsTotal += (input.stops*10*8);
        details.push({ component: 'Door Healty Nail', price: (input.stops*10*8) });
      }

      if(input.doorKnob){
        doorsTotal += (input.stops*1500);
        details.push({ component: 'Door Knob', price: (input.stops*1500) });
      }

      if(input.tolomba){
        doorsTotal += (input.stops*800);
        details.push({ component: 'tolomba', price: (input.stops*800) });
      }

      if(input.outerIntercome){
        doorsTotal += 500;
        details.push({ component: 'Outer Intercome', price: 500 });
      }


      if(input.localElectrostaticSize === "localElectrostaticSize60"){
        doorsTotal += 3500;
        details.push({ component: 'localElectrostaticSize60', price: 3500 });
      }

      if(input.localElectrostaticSize === "localElectrostaticSize70"){
        doorsTotal += 3500;
        details.push({ component: 'localElectrostaticSize70', price: 3500 });
      }

      if(input.localElectrostaticSize === "localElectrostaticSize80"){
        doorsTotal += 4500;
        details.push({ component: 'localElectrostaticSize80', price: 4500 });
      }

      if(input.localElectrostaticSize === "localElectrostaticSize90"){
        doorsTotal += 6000;
        details.push({ component: 'localElectrostaticSize90', price: 6000 });
      }

      if(input.localElectrostaticSize === "localElectrostaticSize120"){
        doorsTotal += 8000;
        details.push({ component: 'localElectrostaticSize120', price: 8000 });
      }


      if(input.turkishImportedSize === "turkishImportSize70"){
        doorsTotal += 5000;
        details.push({ component: 'turkishImportSize70', price: 5000 });
      }

      if(input.turkishImportedSize === "turkishImportSize80"){
        doorsTotal += 6000;
        details.push({ component: 'turkishImportSize80', price: 6000 });
      }

      if(input.turkishImportedSize === "turkishImportSize90"){
        doorsTotal += 7000;
        details.push({ component: 'turkishImportSize90', price: 7000 });
      }

      if(input.turkishImportedSize === "turkishImportSize120"){
        doorsTotal += 8000;
        details.push({ component: 'turkishImportSize120', price: 8000 });
      }


      if(input.localPanoramaSize === "localPanoramaSize70"){
        doorsTotal += 9000;
        details.push({ component: 'localPanoramaSize70', price: 9000 });
      }
      if(input.localPanoramaSize === "localPanoramaSize80"){
        doorsTotal += 10000;
        details.push({ component: 'localPanoramaSize80', price: 10000 });
      }
      if(input.localPanoramaSize === "localPanoramaSize90"){
        doorsTotal += 11000;
        details.push({ component: 'localPanoramaSize90', price: 11000 });
      }


      if(input.localSuperPanoramaSize === "localSuperPanoramaSize70"){
        doorsTotal += 15000;
        details.push({ component: 'localSuperPanoramaSize70', price: 15000 });
      }
      if(input.localSuperPanoramaSize === "localSuperPanoramaSize80"){
        doorsTotal += 20000;
        details.push({ component: 'localSuperPanoramaSize80', price: 20000 });
      }
      if(input.localSuperPanoramaSize === "localSuperPanoramaSize90"){
        doorsTotal += 22000;
        details.push({ component: 'localSuperPanoramaSize90', price: 22000 });
      }


    }else if(input.isAutomatic){


      ///// Fix Prices
      ///// Fix Prices
      ///// Fix Prices
      ///// Fix Prices
      ///// Fix Prices

      if(input.italianSilkomInternalSize === "italianSilkomInternalSize70"){
        if(input.italianSilkomExternalSize === 'italianSilkomExternalSize70'){
          doorsTotal += 15000;
          doorsTotal += 30000;
          details.push({ component: 'italianSilkomInternalSize70', price: 15000 });
          details.push({ component: 'italianSilkomExternalSize70', price: 30000 });
        }
      }
      if(input.italianSilkomInternalSize === "italianSilkomInternalSize80"){
        if(input.italianSilkomExternalSize === 'italianSilkomExternalSize80'){
          doorsTotal += 20000;
          doorsTotal += 40000;
          details.push({ component: 'italianSilkomInternalSize80', price: 20000 });
          details.push({ component: 'italianSilkomExternalSize80', price: 40000 });
        }
      }
      if(input.italianSilkomInternalSize === "italianSilkomInternalSize90"){
        if(input.italianSilkomExternalSize === 'italianSilkomExternalSize90'){
          doorsTotal += 22000;
          doorsTotal += 44000;
          details.push({ component: 'italianSilkomInternalSize90', price: 15000 });
          details.push({ component: 'italianSilkomExternalSize90', price: 44000 });
        }
      }


      if(input.turkishHasInternalSize === "turkishHasInternalSize70"){
        if(input.turkishHasExternalSize === 'turkishHasExternalSize70'){
          doorsTotal += 40000;
          doorsTotal += 25000;
          details.push({ component: 'turkishHasInternalSize70', price: 40000 });
          details.push({ component: 'turkishHasExternalSize70', price: 25000 });
        }
      }
      if(input.turkishHasInternalSize === "turkishHasInternalSize80"){
        if(input.turkishHasExternalSize === 'turkishHasExternalSize80'){
          doorsTotal += 45000;
          doorsTotal += 25000;
          details.push({ component: 'turkishHasInternalSize80', price: 45000 });
          details.push({ component: 'turkishHasExternalSize80', price: 25000 });
        }
      }
      if(input.turkishHasInternalSize === "turkishHasInternalSize90"){
        if(input.turkishHasExternalSize === 'turkishHasExternalSize90'){
          doorsTotal += 35000;
          doorsTotal += 50000;
          details.push({ component: 'turkishHasInternalSize90', price: 35000 });
          details.push({ component: 'turkishHasExternalSize90', price: 50000 });
        }
      }


      if(input.fermotorInternalSize === "fermotorInternalSize70"){
        if(input.fermotorExternalSize === 'fermotorExternalSize70'){
          doorsTotal += 55000;
          doorsTotal += 27000;
          details.push({ component: 'fermotorInternalSize80', price: 55000 });
          details.push({ component: 'fermotorExternalSize70', price: 27000 });
        }
      }
      if(input.fermotorInternalSize === "fermotorInternalSize80"){
        if(input.fermotorExternalSize === 'fermotorExternalSize80'){
          doorsTotal += 60000;
          doorsTotal += 30000;
          details.push({ component: 'fermotorInternalSize80', price: 60000 });
          details.push({ component: 'fermotorExternalSize80', price: 30000 });
        }
      }
      if(input.fermotorInternalSize === "fermotorInternalSize90"){
        if(input.fermotorExternalSize === 'fermotorExternalSize90'){
          doorsTotal += 38000;
          doorsTotal += 45000;
          details.push({ component: 'fermotorInternalSize90', price: 38000 });
          details.push({ component: 'fermotorExternalSize90', price: 45000 });
        }
      }


      if(input.chineeseSilkomInternalSize === "chineeseSilkomInternalSize70"){
        if(input.chineeseSilkomExternalSize === 'chineeseSilkomExternalSize70'){
          doorsTotal += 55000;
          doorsTotal += 27000;
          details.push({ component: 'chineeseSilkomInternalSize70', price: 55000 });
          details.push({ component: 'chineeseSilkomExternalSize70', price: 27000 });
        }
      }
      if(input.chineeseSilkomInternalSize === "chineeseSilkomInternalSize80"){
        if(input.chineeseSilkomExternalSize === 'chineeseSilkomExternalSize80'){
          doorsTotal += 60000;
          doorsTotal += 30000;
          details.push({ component: 'chineeseSilkomInternalSize80', price: 60000 });
          details.push({ component: 'chineeseSilkomExternalSize80', price: 30000 });
        }
      }
      if(input.chineeseSilkomInternalSize === "chineeseSilkomInternalSize90"){
        if(input.chineeseSilkomExternalSize === 'chineeseSilkomExternalSize90'){
          doorsTotal += 38000;
          doorsTotal += 45000;
          details.push({ component: 'chineeseSilkomInternalSize90', price: 38000 });
          details.push({ component: 'chineeseSilkomExternalSize90', price: 45000 });
        }
      }

    }
    return doorsTotal;
  };


  const approximateToNearestFive = (num:number) => {
    return Math.round(num / 5) * 5;
  };


// Function to convert image to base64
const getBase64ImageFromURL = async (url: string): Promise<string> => {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const generatePDF = async (output: OutputState) => {
  const doc = new jsPDF();

  // Load the template image
  const imgData = await getBase64ImageFromURL('/quoteFrom.png'); // Ensure the correct path and extension

  // Add the template to the PDF
  doc.addImage(imgData, 'PNG', 0, 0, 210, 297); // Adjust dimensions if needed

  // Add elevator type
  doc.setFontSize(16);
  doc.text(`Elevator Type: ${output.elevatorType}`, 105, 50, { align: 'center' });

  // Add client's name and address to the right
  doc.setFontSize(14);
  doc.text(`Client Name: Nour El Dein`, 180, 60, { align: 'right' });
  doc.text(`Client Address: Tagmoa 5th`, 180, 70, { align: 'right' });

  // Add table
  const body = [
    ['Maximum Load (KG)', output.personCount * 80],
    ['Stroke Length (Meters)', output.strokeLength],
    ['Stops', output.stops],
    ['Hanger Type', output.hangerType],
    [{ content: `Price (LE): ${output.avgQuote.toFixed(1)}`, styles: { fontStyle: 'italic', fontSize: 14, fontWeight: 'bold' } }],
  ];

  (doc as any).autoTable({
    startY: 90,
    head: [['Component', 'Value']],
    body: body,
    theme: 'grid',
    headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
    bodyStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
    styles: { halign: 'center' },
    didDrawCell: (data: any) => {
      if (data.column.dataKey === 'Price (LE)') {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bolditalic');
      }
    },
  });

  // Save the PDF
  doc.save('quote.pdf');
};
  

return (
  <Container maxWidth="md" sx={{ mt: 4, backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
    <Typography variant="h4" component="h1" gutterBottom className='text-slate-700'>
      Elevator Pricing System
    </Typography>
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={3}>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Machine</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
              <FormControlLabel
                control={<Checkbox checked={input.hasPowerCables} onChange={handleChange} name="hasPowerCables" />}
                label="Power Cables"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.hasControlUnit} onChange={handleChange} name="hasControlUnit" />}
                label="Control Unit"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.hasSpeedLimiter} onChange={handleChange} name="hasSpeedLimiter" />}
                label="Speed Limiter"
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
              <FormControlLabel
                control={<Checkbox checked={input.hasDriveAndInverter} onChange={handleChange} name="hasDriveAndInverter" />}
                label="Has Drive and Inverter"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.emergencyDevice} onChange={handleChange} name="emergencyDevice" />}
                label="Emergency Device"
                className='text-slate-700'
              />
              <TextField
                label="Number of Stops"
                type="number"
                name="stops"
                value={input.stops}
                onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                variant="outlined"
                inputProps={{ min: 1, max: 5 }}
              />
              <TextField
                label="Person Count"
                type="number"
                name="personCount"
                value={input.personCount}
                onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                variant="outlined"
                inputProps={{ min: 1, max: 5 }}
              />
              {input.elevatorType === 'Gearless' && (
                <>
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
                  <TextField
                    label="Person Count"
                    type="number"
                    name="personCount"
                    value={input.personCount}
                    onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                    variant="outlined"
                    inputProps={{ min: 1, max: 15 }}
                  />
                  {input.hasDriveAndInverter && (
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
                    inputProps={{ min: 1, max: 15 }}
                  />
                </>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>


        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Doors</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
              <FormControlLabel
                control={<Checkbox checked={input.isAutomatic} onChange={handleChange} name="isAutomatic" />}
                label="Automatic"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.isHalfAutomatic} onChange={handleChange} name="isHalfAutomatic" />}
                label="Half Automatic"
                className='text-slate-700'
              />
              {input.isHalfAutomatic && (
                <>
                  <FormControlLabel
                    control={<Checkbox checked={input.doorAssembelyAccessories} onChange={handleChange} name="doorAssembelyAccessories" />}
                    label="Door Assembely Accessories"
                    className='text-slate-700'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={input.doorAccessories} onChange={handleChange} name="doorAccessories" />}
                    label="Door Accessories"
                    className='text-slate-700'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={input.doorHealtyNail} onChange={handleChange} name="doorHealtyNail" />}
                    label="Door Healty Nail"
                    className='text-slate-700'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={input.doorKnob} onChange={handleChange} name="doorKnob" />}
                    label="Door Knob"
                    className='text-slate-700'
                  />

                  <FormControlLabel
                    control={<Checkbox checked={input.tolomba} onChange={handleChange} name="tolomba" />}
                    label="Tolomba"
                    className='text-slate-700'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={input.outerIntercome} onChange={handleChange} name="outerIntercome" />}
                    label="Outer Intercome"
                    className='text-slate-700'
                  />

                  <TextField
                    select
                    label="Half Automatic Type"
                    value={input.halfAutomaticType}
                    onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                    name="halfAutomaticType"
                    variant="outlined"
                  >
                    <MenuItem value="">Select Type</MenuItem>
                    <MenuItem value="localElectrostatic">Local Electrostatic</MenuItem>
                    <MenuItem value="turkishImport">Turkish Import</MenuItem>
                    <MenuItem value="localPanorama">Local Panorama</MenuItem>
                    <MenuItem value="localSuperPanorama">Local Super Panorama</MenuItem>
                  </TextField>
                
                </>
              )}

              {(input.halfAutomaticType === 'localElectrostatic') &&(
                  <TextField
                  select
                  label="Local Electrostatic Size"
                  value={input.localElectrostaticSize}
                  onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                  name="localElectrostaticSize"
                  variant="outlined"
                >
                  <MenuItem value="">Select Type</MenuItem>
                  <MenuItem value="localElectrostaticSize60">Size 60</MenuItem>
                  <MenuItem value="localElectrostaticSize70">Size 70</MenuItem>
                  <MenuItem value="localElectrostaticSize80">Size 80</MenuItem>
                  <MenuItem value="localElectrostaticSize90">Size 90</MenuItem>
                  <MenuItem value="localElectrostaticSize120">Size 120</MenuItem>
                </TextField>
              )}

              {(input.halfAutomaticType === 'turkishImport') &&(
                  <TextField
                  select
                  label="Turkish Imported Size"
                  value={input.turkishImportedSize}
                  onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                  name="turkishImportedSize"
                  variant="outlined"
                >
                  <MenuItem value="">Select Type</MenuItem>
                  <MenuItem value="turkishImportSize70">Size 70</MenuItem>
                  <MenuItem value="turkishImportSize80">Size 80</MenuItem>
                  <MenuItem value="turkishImportSize90">Size 90</MenuItem>
                  <MenuItem value="turkishImportSize120">Size 120</MenuItem>
                </TextField>
              )}

              {(input.halfAutomaticType === 'localPanorama') &&(
                  <TextField
                  select
                  label="Local Panorama Size"
                  value={input.localPanoramaSize}
                  onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                  name="localPanoramaSize"
                  variant="outlined"
                >
                  <MenuItem value="">Select Type</MenuItem>
                  <MenuItem value="localPanoramaSize70">Size 70</MenuItem>
                  <MenuItem value="localPanoramaSize80">Size 80</MenuItem>
                  <MenuItem value="localPanoramaSize90">Size 90</MenuItem>
                </TextField>
              )}

              {(input.halfAutomaticType === 'localSuperPanorama') &&(
                  <TextField
                  select
                  label="Local Super Panorama Size"
                  value={input.localSuperPanoramaSize}
                  onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                  name="localSuperPanoramaSize"
                  variant="outlined"
                >
                  <MenuItem value="">Select Type</MenuItem>
                  <MenuItem value="localSuperPanoramaSize70">Size 70</MenuItem>
                  <MenuItem value="localSuperPanoramaSize80">Size 80</MenuItem>
                  <MenuItem value="localSuperPanoramaSize90">Size 90</MenuItem>
                </TextField>
              )}

              {input.isAutomatic && (
                <>
                  <TextField
                    select
                    label="Automatic Type"
                    value={input.automaticType}
                    onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                    name="automaticType"
                    variant="outlined"
                  >
                    <MenuItem value="">Select Type</MenuItem>
                    <MenuItem value="italianSilkom">Italian Silkom</MenuItem>
                    <MenuItem value="turkishHas">Turkish Has</MenuItem>
                    <MenuItem value="fermotor">Fermotor</MenuItem>
                    <MenuItem value="chineeseSilkom">Chineese Silkom</MenuItem>
                  </TextField>
                </>
              )}

              {(input.automaticType === 'italianSilkom') && (
                <>
                  <TextField
                    select
                    label="Italian Silkom Internal Size"
                    value={input.italianSilkomInternalSize}
                    onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                    name="italianSilkomInternalSize"
                    variant="outlined"
                  >
                    <MenuItem value="">Select Type</MenuItem>
                    <MenuItem value="italianSilkomInternalSize70">Size 70</MenuItem>
                    <MenuItem value="italianSilkomInternalSize80">Size 80</MenuItem>
                    <MenuItem value="italianSilkomInternalSize90">Size 90</MenuItem>
                  </TextField>

                  <TextField
                    select
                    label="Italian Silkom External Size"
                    value={input.italianSilkomExternalSize}
                    onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                    name="italianSilkomExternalSize"
                    variant="outlined"
                  >
                    <MenuItem value="">Select Type</MenuItem>
                    <MenuItem value="italianSilkomExternalSize70">Size 70</MenuItem>
                    <MenuItem value="italianSilkomExternalSize80">Size 80</MenuItem>
                    <MenuItem value="italianSilkomExternalSize90">Size 90</MenuItem>
                  </TextField>
                </>
              )}


              {(input.automaticType === 'turkishHas') && (
                <>
                  <TextField
                    select
                    label="Turkish Has Internal Size"
                    value={input.turkishHasInternalSize}
                    onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                    name="turkishHasInternalSize"
                    variant="outlined"
                  >
                    <MenuItem value="">Select Type</MenuItem>
                    <MenuItem value="turkishHasInternalSize70">Size 70</MenuItem>
                    <MenuItem value="turkishHasInternalSize80">Size 80</MenuItem>
                    <MenuItem value="turkishHasInternalSize90">Size 90</MenuItem>
                  </TextField>

                  <TextField
                    select
                    label="Turkish Has External Size"
                    value={input.turkishHasExternalSize}
                    onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                    name="turkishHasExternalSize"
                    variant="outlined"
                  >
                    <MenuItem value="">Select Type</MenuItem>
                    <MenuItem value="turkishHasExternalSize70">Size 70</MenuItem>
                    <MenuItem value="turkishHasExternalSize80">Size 80</MenuItem>
                    <MenuItem value="turkishHasExternalSize90">Size 90</MenuItem>
                  </TextField>
                </>
              )}

              {(input.automaticType === 'fermotor') && (
                <>
                  <TextField
                    select
                    label="Fermotor Internal Size"
                    value={input.fermotorInternalSize}
                    onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                    name="fermotorInternalSize"
                    variant="outlined"
                  >
                    <MenuItem value="">Select Type</MenuItem>
                    <MenuItem value="fermotorInternalSize70">Size 70</MenuItem>
                    <MenuItem value="fermotorInternalSize80">Size 80</MenuItem>
                    <MenuItem value="fermotorInternalSize90">Size 90</MenuItem>
                  </TextField>

                  <TextField
                    select
                    label="Fermotor External Size"
                    value={input.fermotorExternalSize}
                    onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                    name="fermotorExternalSize"
                    variant="outlined"
                  >
                    <MenuItem value="">Select Type</MenuItem>
                    <MenuItem value="fermotorExternalSize70">Size 70</MenuItem>
                    <MenuItem value="fermotorExternalSize80">Size 80</MenuItem>
                    <MenuItem value="fermotorExternalSize90">Size 90</MenuItem>
                  </TextField>
                </>
              )}

              {(input.automaticType === 'chineeseSilkom') && (
                <>
                  <TextField
                    select
                    label="Chineese Silkom Internal Size"
                    value={input.chineeseSilkomInternalSize}
                    onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                    name="chineeseSilkomInternalSize"
                    variant="outlined"
                  >
                    <MenuItem value="">Select Type</MenuItem>
                    <MenuItem value="chineeseSilkomInternalSize70">Size 70</MenuItem>
                    <MenuItem value="chineeseSilkomInternalSize80">Size 80</MenuItem>
                    <MenuItem value="chineeseSilkomInternalSize90">Size 90</MenuItem>
                  </TextField>

                  <TextField
                    select
                    label="Chineese Silkom External Size"
                    value={input.chineeseSilkomExternalSize}
                    onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                    name="chineeseSilkomExternalSize"
                    variant="outlined"
                  >
                    <MenuItem value="">Select Type</MenuItem>
                    <MenuItem value="chineeseSilkomExternalSize70">Size 70</MenuItem>
                    <MenuItem value="chineeseSilkomExternalSize80">Size 80</MenuItem>
                    <MenuItem value="chineeseSilkomExternalSize90">Size 90</MenuItem>
                  </TextField>
                </>
              )}

              <TextField
                label="Number of Stops"
                type="number"
                name="stops"
                value={input.stops}
                onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                variant="outlined"
                inputProps={{ min: 1, max: 15 }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Stairwell</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
              <FormControlLabel
                control={<Checkbox checked={input.hasClipers} onChange={handleChange} name="hasClipers" />}
                label="Clipers"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.hasNailPole} onChange={handleChange} name="hasNailPole" />}
                label="Nail Pole"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.hasFreeService} onChange={handleChange} name="hasFreeService" />}
                label="Free Service"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.hasFingerMagnet} onChange={handleChange} name="hasFingerMagnet" />}
                label="Finger Magnet"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.hasPartsBox} onChange={handleChange} name="hasPartsBox" />}
                label="Box Parts"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.hasMagneticCell} onChange={handleChange} name="hasMagneticCell" />}
                label="Magnetic Cell"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.hasStringPull} onChange={handleChange} name="hasStringPull" />}
                label="String Pull"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.hasPartsBoxSbortena} onChange={handleChange} name="hasPartsBoxSbortena" />}
                label="Parts Box Sbortena"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.hasNailPoleWeight} onChange={handleChange} name="hasNailPoleWeight" />}
                label="Nail Pole Weight"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.hasNailFlanch} onChange={handleChange} name="hasNailFlanch" />}
                label="Nail Flanch"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.hasBufferZipper} onChange={handleChange} name="hasBufferZipper" />}
                label="Buffer Zipper"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.hasPoles} onChange={handleChange} name="hasPoles" />}
                label="Poles"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.cableControllerString} onChange={handleChange} name="cableControllerString" />}
                label="Cable Controller String"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.fixingPoleWeight} onChange={handleChange} name="fixingPoleWeight" />}
                label="Fixing Pole Weight"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.healtyNail} onChange={handleChange} name="healtyNail" />}
                label="Healty Nail"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.healtyNailWeight} onChange={handleChange} name="healtyNailWeight" />}
                label="Healty Nail Weight"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.stringPuller} onChange={handleChange} name="stringPuller" />}
                label="String Puller"
                className='text-slate-700'
              />
              <TextField
                label="Stroke Length"
                type="number"
                name="strokeLength"
                value={input.strokeLength || 0}
                onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                variant="outlined"
              />
              <TextField
                select
                label="Type of Hanger"
                name="hangerType"
                value={input.hangerType || ''}
                onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                variant="outlined"
              >
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="direct">Direct</MenuItem>
                <MenuItem value="2:1">2:1</MenuItem>
                <MenuItem value="fork">Fork</MenuItem>
              </TextField>
              <TextField
                label="Number of Stops"
                type="number"
                name="stops"
                value={input.stops}
                onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                variant="outlined"
                inputProps={{ min: 1, max: 5 }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Cabin</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
              <FormControlLabel
                control={<Checkbox checked={input.isWood} onChange={handleChange} name="isWood" />}
                label="Wood"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.isStainlessteel} onChange={handleChange} name="isStainlessteel" />}
                label="Stainlessteel"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.isPanorama} onChange={handleChange} name="isPanorama" />}
                label="Panorama"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.weightChair} onChange={handleChange} name="weightChair" />}
                label="Weight Chair"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.internalRequirementBox} onChange={handleChange} name="internalRequirementBox" />}
                label="Internal Requirement Box"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.cabinLight} onChange={handleChange} name="cabinLight" />}
                label="Cabin Light"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.serviceBox} onChange={handleChange} name="serviceBox" />}
                label="Service Box"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.turkishCamPart} onChange={handleChange} name="turkishCamPart" />}
                label="Turkish Cam Part"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.mazyezBundle} onChange={handleChange} name="mazyezBundle" />}
                label="Mazyez Bundle"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.photoCell} onChange={handleChange} name="photoCell" />}
                label="Photo Cell"
                className='text-slate-700'
              />
              <FormControlLabel
                control={<Checkbox checked={input.zahrWeight} onChange={handleChange} name="zahrWeight" />}
                label="Zahr Weight"
                className='text-slate-700'
              />
              <TextField
                label="Person Count"
                type="number"
                name="personCount"
                value={input.personCount}
                onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement | HTMLSelectElement>)}
                variant="outlined"
                inputProps={{ min: 1, max: 15 }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

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
              <ListItemText primary={`Inverter Type: ${output.type}`} />
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
          <Grid container spacing={2}>
            {output.details.map((detail: OutputDetails, index: number) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ListItem>
                  <ListItemText primary={`${detail.component}: ${detail.price} LE`} />
                </ListItem>
              </Grid>
            ))}
          </Grid>

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
          <Button variant="contained" color="secondary" onClick={() => generatePDF(output)}>
              Generate PDF
          </Button>
        </CardContent>
      </Card>
    )}
  </Container>
);
};


export default IndexPage;
