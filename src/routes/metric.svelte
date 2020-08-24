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

  let units = [{"usValue":"","siValue":"","usAbbr":"in","conventionalUnit":"inches","factor":"2.54","siUnit":"centimeters","siAbbr":"cm"},{"usValue":"","siValue":"","usAbbr":"ft","conventionalUnit":"feet","factor":"30","siUnit":"centimeters","siAbbr":"cm"},{"usValue":"","siValue":"","usAbbr":"ft","conventionalUnit":"feet","factor":"0.3","siUnit":"meters","siAbbr":"m"},{"usValue":"","siValue":"","usAbbr":"yd","conventionalUnit":"yards","factor":"0.9","siUnit":"meters","siAbbr":"m"},{"usValue":"","siValue":"","usAbbr":"miles","conventionalUnit":"miles","factor":"1.6","siUnit":"kilometers","siAbbr":"km"},{"usValue":"","siValue":"","usAbbr":"sq in","conventionalUnit":"square inches","factor":"6.5","siUnit":"square centimeters","siAbbr":"cm<sup>2</sup>"},{"usValue":"","siValue":"","usAbbr":"sq ft","conventionalUnit":"square feet","factor":"0.09","siUnit":"square meters","siAbbr":"m<sup>2</sup>"},{"usValue":"","siValue":"","usAbbr":"sq yd","conventionalUnit":"square yard","factor":"0.8","siUnit":"square meters","siAbbr":"m<sup>2</sup>"},{"usValue":"","siValue":"","usAbbr":"sq miles","conventionalUnit":"square miles","factor":"2.6","siUnit":"square kilometers","siAbbr":"km<sup>2</sup>"},{"usValue":"","siValue":"","usAbbr":"oz","conventionalUnit":"ounces","factor":"28","siUnit":"grams","siAbbr":"g"},{"usValue":"","siValue":"","usAbbr":"lb","conventionalUnit":"pounds","factor":"0.45","siUnit":"kilograms","siAbbr":"kg"},{"usValue":"","siValue":"","usAbbr":"tsp","conventionalUnit":"teaspoons","factor":"5","siUnit":"milliliters","siAbbr":"mL"},{"usValue":"","siValue":"","usAbbr":"tbsp","conventionalUnit":"tablespoons","factor":"15","siUnit":"milliliters","siAbbr":"mL"},{"usValue":"","siValue":"","usAbbr":"fl oz","conventionalUnit":"fluid ounces","factor":"30","siUnit":"milliliters","siAbbr":"mL"},{"usValue":"","siValue":"","usAbbr":"c","conventionalUnit":"cups","factor":"0.24","siUnit":"liters","siAbbr":"L"},{"usValue":"","siValue":"","usAbbr":"pt","conventionalUnit":"US pints","factor":"0.47","siUnit":"liters","siAbbr":"L"},{"usValue":"","siValue":"","usAbbr":"qt","conventionalUnit":"US quarts","factor":"0.95","siUnit":"liters","siAbbr":"L"},{"usValue":"","siValue":"","usAbbr":"gal","conventionalUnit":"US gallons","factor":"3.8","siUnit":"liters","siAbbr":"L"},{"usValue":"","siValue":"","usAbbr":"cu ft","conventionalUnit":"cubic feet","factor":"0.03","siUnit":"cubic meters","siAbbr":"m<sup>3</sup>"},{"usValue":"","siValue":"","usAbbr":"cu yd","conventionalUnit":"cubic yard","factor":"0.76","siUnit":"cubic meters","siAbbr":"m<sup>3</sup>"}];
  


	let prefix = '';
	let i = 0;
  	let current = 'metric units';
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
			const names = `${unit.conventionalUnit}`;
			return names.toLowerCase().startsWith(prefix.toLowerCase());
      
		})
		: units;
$: selected = filteredUnits[i];

import Fa from 'svelte-fa';
import { faFlagUsa, faGlobe, faArrowsAltH, faVial, faCalculator } from '@fortawesome/pro-duotone-svg-icons';
</script>









  <div class="mx-auto px-1">

  




 <div class="md:w-1/4 mb-3 sm:w-1/3 text-black p-1">Search Units <input placeholder="Unit" class="mt-1 block w-full  text-gray-700 border border-gray-300 rounded-lg py-2 px-2 leading-tight bg-white  focus:outline-none focus:bg-white focus:border-gray-500" type="search" bind:value={prefix}></div>


  {#each filteredUnits as unit, i}
 <div class="border border-gray-300 rounded mb-2">


 <div class="flex flex-wrap md:flex-no-wrap lg:flex-no-wrap px-1  mb-1">
 <div class="w-full md:w-2/5" >
            
              <div class="font-bold text-black text-xl">{unit.conventionalUnit} <Fa class="inline text-gray-700" size="lg" icon={faArrowsAltH}/> {unit.siUnit}</div>
            
         <div class="text-gray-700 text-xs"><!-- <Fa class="inline" size="sm" icon={faCalculator}/> -->  <strong>Conversion Factor:</strong> {unit.factor} </div>
            
  </div>
  <div class="md:w-1/3 w-1/2  h-14 pr-1 pl-1">
  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" for="grid-first-name">
       <Fa class="inline" size="lg" primaryColor="blue" secondaryColor="red" icon={faFlagUsa}/> US Unit 
      </label>
               <input class="appearance-none mt-1 block w-full bg-gray-100 text-gray-700 border border-blue-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="us{i}" value={unit.usValue} on:input="{e => setBothFromUS(e.target.value, i)}"  type=number placeholder=" ">
<div class="text-gray-700 text-sm">{unit.conventionalUnit}</div>
             </div>

 <div class="md:w-1/3 w-1/2  h-14 pr-1 pl-1">
 <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" for="grid-first-name">
        <Fa class="inline" size="lg" primaryColor="green" secondaryColor="lightblue" icon={faGlobe}/> SI Unit 
      </label>
               <input class="appearance-none mt-1 block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="si{i}" value={unit.siValue} on:input="{e => setBothFromSI(e.target.value, i)}" type=number placeholder=" ">
<div class="text-gray-700 text-sm">{unit.siUnit} </div>
             </div>

 
 
 
 </div> 
</div>
{/each}
  
   
   
   

    

  
   </div>
<footer class='w-full text-center border-t border-grey p-4 pin-b'>
            www.medicalunitconverter.com
        </footer>