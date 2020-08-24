<script>
  export let segment;
  
  import Fa from 'svelte-fa';
import { faFlagUsa, faGlobe, faArrowsAltH, faBalanceScale, faInfoCircle, faPaperPlane, faCalculator, faPencilRuler, faDog, faUserMd, faVial} from '@fortawesome/pro-duotone-svg-icons';
  let current = 'Human';
  
</script>
<style>.textShadow{text-shadow:0 2px 2px rgba(0, 0, 0, 0.3)}
.textShadow2{text-shadow:0 2px 2px rgba(0, 0, 0, 0.3)}
</style>


   



<nav class="w-full">
 <!--  <div class="w-full mx-auto rounded-t shadow bg-cover bg-bottom bg-no-repeat h-28" style="background-image: url(static/bg4.jpg)"> -->
  <div class="w-full mx-auto rounded-t shadow bg-teal-500 h-28">
 	<!-- Text shadow utilities will be cool -->
   <div class="mx-auto py-2 text-center">
    <h1 class="font-sans text-xl md:text-2xl textShadow text-white"><Fa class="inline text-gray-600"  primaryColor="gray" secondaryColor="white"  size="lg" icon={faCalculator}/>  Medical Unit Converter</h1>
      <!-- <h2 class="font-sans  text-lg textShadow text-white"> <Fa class="inline textShadow" size="lg" secondaryColor="red"  icon={faVial}/> US Units  <Fa class="inline text-gray-700" size="lg" icon={faArrowsAltH}/> SI Units <Fa class="inline" size="lg"  secondaryColor="red"  icon={faVial}/></h2> -->
    <h3 class="tracking-wide mb-1 textShadow text-white">Easily Convert Medical and Metric Values</h3>
      <div class="flex items-center justify-between py-1">
        


<span class="relative z-0 inline-flex shadow-sm">
  <a href="about" class='relative inline-flex items-center px-2 py-1 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-teal-300 active:text-gray-700 transition ease-in-out duration-150 {segment === "about" ? "bg-teal-300" : ""}'>
   <Fa class="inline-flex   pr-1" size="lg" icon={faInfoCircle}/> About
  </a>
  <a href="legal" class='-ml-px relative inline-flex items-center px-2 py-1 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-teal-300 active:text-gray-700 transition ease-in-out duration-150 {segment === "legal" ? "bg-teal-300" : ""}'>
    <Fa class="inline pr-1" size="lg" icon={faBalanceScale}/> Legal
  </a>
  <a href="mailto:info@vetcalculators.com" class='-ml-px relative inline-flex items-center px-2 py-1 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-teal-300 active:text-gray-700 transition ease-in-out duration-150 {segment === "contact" ? "bg-teal-300" : ""}'>
<Fa class="inline pr-1" size="lg" icon={faPaperPlane}/> Contact
  </a>
  <a href="privacy" class='-ml-px relative inline-flex items-center px-2 py-1 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-teal-300 active:text-gray-700 transition ease-in-out duration-150 {segment === "privacy" ? "bg-teal-300" : ""}'>
<Fa class="inline pr-1" size="lg" icon={faInfoCircle}/> Privacy
  </a>
</span>


        
      </div>
      
    
      </div>
    
    <div class="text-center text-white pb-1">
    
      
  
    </div>
   
  </div>
  
</nav>
<ul class="flex">
  <li class="flex-1 mr-1 ml-1">
    <a class='text-center block border border-white rounded bg-gray-600 hover:bg-teal-500   py-1 px-1 text-white' class:bg-teal-500="{current === 'Human'}"	on:click="{() => current = 'Human'}" href="."><Fa class="inline-flex  text-white pr-1" size="2x" secondaryColor="white"  primaryColor="green" icon={faUserMd}/>  Human</a>
  </li>
  <li class="flex-1 mr-1">
    <a class='text-center block border border-white rounded bg-gray-600 hover:bg-teal-500  py-1 px-1  text-white' class:bg-teal-500="{current === 'Veterinary'}"	on:click="{() => current = 'Veterinary'}" href="vet"><Fa class="inline-flex  text-white pr-1" size="2x" primaryColor="black" icon={faDog}/>  Veterinary</a>
  </li>
  <li class="flex-1 mr-1">
    <a class='text-center block border border-white rounded  bg-gray-600 hover:bg-teal-500  py-1 px-1  text-white' class:bg-teal-500="{current === 'Metric Units'}"	on:click="{() => current = 'Metric Units'}" href="metric"><Fa class="inline-flex  text-white pr-1" size="2x" primaryColor="orange" icon={faPencilRuler}/>  Metric</a>
  </li>
</ul>



