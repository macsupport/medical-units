<svelte:head>
  <title>medicalunitconverter.com</title>
  <meta name="description" content="Medical unit conversion calculator, medicalunitconverter.com. Convert US units to International (SI) units easily with this onlne calculator. Easily search for a specific lab test, enter any value and convert the units. For both Human and Veterinary values.">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-255701-18"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-255701-18');
</script>
</svelte:head>




<script>
  import { fade, fly } from 'svelte/transition';
 //import j$ from 'jquery';
//import { onMount } from 'svelte';

//onMount(() => {
//    j$('.test').click(() => {
//        console.log('test');
 //   });
//});





let name = '';

  let units = [{"name":"Alkaline phosphatase","specimen":"Serum","conventionalRange":"30-120","conventionalUnit":"IU/L","factor":"1","siRange":"0.5-2.0","siUnit":"U/L","siValue":"0.5","usValue":"30"},{"name":"Alanine aminotransferase (ALT)","specimen":"Serum","conventionalRange":"10-40","conventionalUnit":"IU/L","factor":"1","siRange":"0.17-0.68","siUnit":"U/L","siValue":"0.17","usValue":"10"},{"name":"Albumin","specimen":"Serum","conventionalRange":"3.5-5.0","conventionalUnit":"g/dL","factor":"10","siRange":"35-50","siUnit":"g/L","siValue":"35","usValue":"3.5"},{"name":"Ammonia (as nitrogen)","specimen":"Serum, Plasma","conventionalRange":"15-45","conventionalUnit":"mcg/dL","factor":"0.5872","siRange":"11-32","siUnit":"µmol/L","siValue":"11","usValue":"15"},{"name":"Amylase","specimen":"Serum","conventionalRange":"27-131","conventionalUnit":"Somogyi units","factor":"1.85","siRange":"0.46-2.23","siUnit":"U/L","siValue":"0.46","usValue":"27"},{"name":"Aspartate aminotransferase (AST)","specimen":"Serum","conventionalRange":"10-30","conventionalUnit":"U/L","factor":"1","siRange":"0.17-0.51","siUnit":"U/L","siValue":"0.17","usValue":"10"},{"name":"Bilirubin, total","specimen":"Serum","conventionalRange":"0.3-1.2","conventionalUnit":"mg/dL","factor":"17.104","siRange":"5.0-21.0","siUnit":"µmol/L","siValue":"5","usValue":"0.3"},{"name":"Bilirubin, direct (conjugated)","specimen":"Serum","conventionalRange":"0.1-0.3","conventionalUnit":"mg/dL","factor":"17.104","siRange":"1.7-5.1","siUnit":"µmol/L","siValue":"1.7","usValue":"0.1"},{"name":"Calcium, ionized","specimen":"Serum","conventionalRange":"4.60-5.08","conventionalUnit":"mg/dL","factor":"0.25","siRange":"1.15-1.27","siUnit":"mmol/L","siValue":"1.15","usValue":"4.6"},{"name":"Calcium, total","specimen":"Serum","conventionalRange":"8.2-10.2","conventionalUnit":"mg/dL","factor":"0.25","siRange":"2.05-2.55","siUnit":"mmol/L","siValue":"2.05","usValue":"8.2"},{"name":"Carbon dioxide (total)","specimen":"Serum, Plasma","conventionalRange":"22-28","conventionalUnit":"mEq/L","factor":"1","siRange":"22-28","siUnit":"mmol/L","siValue":"22-28","usValue":"22"},{"name":"Chloride","specimen":"Serum, Plasma","conventionalRange":"96-106","conventionalUnit":"mEq/L","factor":"1","siRange":"96-106","siUnit":"mmol/L","siValue":"110","usValue":"110"},{"name":"Cholesterol (total)","specimen":"Serum, Plasma","conventionalRange":"<200","conventionalUnit":"mg/dL","factor":"0.0259","siRange":"<5.18","siUnit":"mmol/L","siValue":"3.5","usValue":"135"},{"name":"Copper","specimen":"Serum","conventionalRange":"70-140","conventionalUnit":"µg/dL","factor":"0.157","siRange":"44866","siUnit":"µmol/L","siValue":"44866","usValue":"70"},{"name":"Cortisol","specimen":"Serum, Plasma","conventionalRange":"5-25","conventionalUnit":"mcg/dL","factor":"27.588","siRange":"140-690","siUnit":"nmol/L","siValue":"140","usValue":"5"},{"name":"Creatine kinase (CK)","specimen":"Serum","conventionalRange":"40-150","conventionalUnit":"IU/L","factor":"1","siRange":"0.67-2.5","siUnit":"U/L","siValue":"0.67","usValue":"40"},{"name":"Creatinine","specimen":"Serum, Plasma","conventionalRange":"0.5-1.2","conventionalUnit":"mg/dL","factor":"88.4","siRange":"53-106","siUnit":"µmol/L","siValue":"44","usValue":"0.5"},{"name":"Fibrinogen","specimen":"Plasma","conventionalRange":"200-400","conventionalUnit":"mg/dL","factor":"0.0294","siRange":"5.8-11.8","siUnit":"µmol/L","siValue":"5.8","usValue":"200"},{"name":"Glucose","specimen":"Serum","conventionalRange":"70-110","conventionalUnit":"mg/dL","factor":"0.0555","siRange":"3.9-6.1","siUnit":"mmol/L","siValue":"3.9","usValue":"70"},{"name":"Iron","specimen":"Serum","conventionalRange":"60-150","conventionalUnit":"µg/dL","factor":"0.179","siRange":"10.7-26.9","siUnit":"µmol/L","siValue":"10.7","usValue":"60"},{"name":"Iron-binding capacity","specimen":"Serum","conventionalRange":"250-450","conventionalUnit":"µg/dL","factor":"0.179","siRange":"44.8-80.6","siUnit":"µmol/L","siValue":"45","usValue":"250"},{"name":"Lipase","specimen":"Serum","conventionalRange":"31-186","conventionalUnit":"IU/L","factor":"1","siRange":"0.5-3.2","siUnit":"U/L","siValue":"0.5","usValue":"31"},{"name":"Phosphorus (inorganic)","specimen":"Serum","conventionalRange":"2.3-4.7","conventionalUnit":"mg/dL","factor":"0.323","siRange":"0.74-1.52","siUnit":"mmol/L","siValue":"0.74","usValue":"2.3"},{"name":"Potassium","specimen":"Serum","conventionalRange":"3.5-5.0","conventionalUnit":"mEq/L","factor":"1","siRange":"3.5-5.0","siUnit":"mmol/L","siValue":"3.5","usValue":"3.5"},{"name":"Protein (total)","specimen":"Serum","conventionalRange":"5.4-8.0","conventionalUnit":"g/dL","factor":"10","siRange":"54-80","siUnit":"g/L","siValue":"60","usValue":"6"},{"name":"Prothrombin time (PT)","specimen":"Plasma","conventionalRange":"10-13","conventionalUnit":"s","siRange":"10-13","factor":"1","siValue":"s","usValue":"10"},{"name":"Partial thromboplastin time (PTT)","specimen":"Whole blood","conventionalRange":"25-40","conventionalUnit":"s","factor":"1","siRange":"25-40","siUnit":"s","siValue":"25","usValue":"25"},{"name":"Sodium","specimen":"Serum","conventionalRange":"136-142","conventionalUnit":"mEq/L","factor":"1","siRange":"136-142","siUnit":"mmol/L","siValue":"136","usValue":"136"},{"name":"Triglycerides","specimen":"Serum","conventionalRange":"<160","conventionalUnit":"mcg/dL","factor":"0.0113","siRange":"1.8","siUnit":"mmol/L","siValue":"1.8","usValue":"140"},{"name":"Triiodothyronine, total (T<sub>3</sub>)","specimen":"Serum","conventionalRange":"60-180","conventionalUnit":"mcg/dL","factor":"15.6","siRange":"0.92-2.76","siUnit":"nmol/L","siValue":"0.92","usValue":"60"},{"name":"Thyroxine, free (FT <sub>4</sub> )","specimen":"Serum","conventionalRange":"0.9-2.3","conventionalUnit":"ng/dL","factor":"12.871","siRange":"12-30","siUnit":"pmol/L","siValue":"12","usValue":"0.9"},{"name":"Thyroxine, total (T <sub>4</sub> )","specimen":"Serum","conventionalRange":"5.5-12.5","conventionalUnit":"mcg/dL","factor":"12.871","siRange":"71-160","siUnit":"nmol/L","siValue":"71","usValue":"5.5"},{"name":"Urea nitrogen","specimen":"Serum","conventionalRange":"8-23","conventionalUnit":"mg/dL","factor":"0.357","siRange":"2.9-8.2","siUnit":"mmol/L","siValue":"2.9","usValue":"8"},{"name":"Uric acid","specimen":"Serum","conventionalRange":"4.0-8.0","conventionalUnit":"mg/dL","factor":"0.0595","siRange":"240-480","siUnit":"mmol/L","siValue":"240","usValue":"4"},{"name":"Urine protein/creatinine ratio","specimen":"Serum","conventionalRange":"","conventionalUnit":"g/g","factor":"0.113","siRange":"","siUnit":"g/mml","siValue":"","usValue":""}];
  
   	let prefix = '';
	let i = 0;
  let current = 'veterinary';
  
  function setBothFromSI(value, i) {
    const {factor, siValue} = units[i];
    units[i].siValue = +value;
    units[i].usValue = +(value / factor).toFixed(2);
  }
  function setBothFromUS(value, i) {
    const {factor, usValue} = units[i];
    units[i].usValue = +value;
    units[i].siValue = +(value * factor).toFixed(2);;
  }



	$: filteredUnits = prefix
		? units.filter(unit => {
			const names = `${unit.name}`;
			return names.toLowerCase().startsWith(prefix.toLowerCase());
      
		})
		: units;
$: selected = filteredUnits[i];

import Fa from 'svelte-fa';
import { faFlagUsa, faGlobe, faArrowsAltH, faVial, faCalculator } from '@fortawesome/pro-duotone-svg-icons';
</script>









  <div class="mx-auto  px-1">

  


 <div class="md:w-1/4 mb-3 sm:w-1/3 text-black p-1">Search Units <input placeholder="Unit" class="mt-1 block w-full  text-gray-700 border border-gray-300 rounded-lg py-2 px-2 leading-tight bg-white  focus:outline-none focus:bg-white focus:border-gray-500" type="search" bind:value={prefix}></div>


  {#each filteredUnits as unit, i}
 <div class="border border-gray-300 rounded mb-2">


 <div class="flex flex-wrap md:flex-no-wrap lg:flex-no-wrap px-1  mb-1">
 <div class="w-full md:w-2/5" >
            
               <div class="font-bold text-black text-xl">{unit.name}</div>
             <div class="inline text-gray-700 text-xs"><!-- <Fa class="inline"  secondaryColor="red"  icon={faVial}/> --> <strong>Specimen: </strong> {unit.specimen} </div>
         <div class="inline text-gray-700 text-xs ml-3"><!-- <Fa class="inline"  icon={faCalculator}/> --> <strong>Conversion Factor:</strong>  {unit.factor} </div>
            
  </div>
  <div class="md:w-1/3 w-1/2   h-14 pr-1 pl-1">
  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" for="grid-first-name">
       <Fa class="inline" size="lg" primaryColor="blue" secondaryColor="red" icon={faFlagUsa}/> US Unit
      </label>
               <input class="appearance-none mt-1 block w-full bg-gray-100 text-gray-700 border border-blue-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={unit.usValue} on:input="{e => setBothFromUS(e.target.value, i)}"  type=number placeholder=" US">
<div class="text-gray-700 text-sm">US Range:{unit.conventionalRange} {unit.conventionalUnit}</div>
             </div>

 <div class="md:w-1/3 w-1/2  h-14 pr-1 pl-1">
 <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" for="grid-first-name">
        <Fa class="inline" size="lg" primaryColor="green" secondaryColor="lightblue" icon={faGlobe}/> SI Unit
      </label>
               <input class="appearance-none mt-1 block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={unit.siValue} on:input="{e => setBothFromSI(e.target.value, i)}" type=number placeholder="SI">
<div class="text-gray-700 text-sm">SI Range: {unit.siRange} {unit.siUnit} </div>
             </div>

 
 
 
 </div> 
</div>
{/each}
  
   
   
   

    

  
   </div>
<footer class='w-full text-center border-t border-grey p-4 pin-b'>
            www.medicalunitconverter.com
        </footer>