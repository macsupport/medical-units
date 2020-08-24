import{S as n,i as e,s as a,e as i,t,a as o,c as s,b as l,g as r,d as c,f as u,h as m,l as g,m as f,o as d,p,z as v,q as U,r as h,u as V,v as R,I as L,G as b,J as S,F as y}from"./index.11d084f4.js";import{F as w,d as x,c as $,j as I,k as E}from"./index.es.dc330263.js";function C(n,e,a){const i=Object.create(n);return i.unit=e[a],i.i=a,i}function P(n){var e,a,L,b,S,y,C,P,T,A,D,F,k,j,_,B,q,z,G,N,O,M,W,H,J,K,Q,X,Y,Z,nn,en,an,tn,on,sn,ln,rn,cn,un,mn,gn,fn=n.unit.name+"",dn=n.unit.specimen+"",pn=n.unit.factor+"",vn=n.unit.conventionalRange+"",Un=n.unit.conventionalUnit+"",hn=n.unit.siRange+"",Vn=n.unit.siUnit+"",Rn=new w({props:{class:"inline",secondaryColor:"red",icon:x}}),Ln=new w({props:{class:"inline",icon:$}}),bn=new w({props:{class:"inline",size:"lg",primaryColor:"blue",secondaryColor:"red",icon:I}});function Sn(...e){return n.input_handler(n,...e)}var yn=new w({props:{class:"inline",size:"lg",primaryColor:"green",secondaryColor:"lightblue",icon:E}});function wn(...e){return n.input_handler_1(n,...e)}return{c(){e=i("div"),a=i("div"),L=i("div"),b=i("div"),S=t(fn),y=o(),C=i("div"),Rn.$$.fragment.c(),P=t("  Specimen: "),T=t(dn),A=o(),D=i("div"),Ln.$$.fragment.c(),F=t("  Conversion Factor: "),k=t(pn),j=o(),_=i("div"),B=i("label"),bn.$$.fragment.c(),q=t(" US"),z=o(),G=i("input"),O=o(),M=i("div"),W=t("US Range:"),H=t(vn),J=o(),K=t(Un),Q=o(),X=i("div"),Y=i("label"),yn.$$.fragment.c(),Z=t(" International"),nn=o(),en=i("input"),tn=o(),on=i("div"),sn=t("SI Range: "),ln=t(hn),rn=o(),cn=t(Vn),un=o(),this.h()},l(n){e=s(n,"DIV",{class:!0},!1);var i=l(e);a=s(i,"DIV",{class:!0},!1);var t=l(a);L=s(t,"DIV",{class:!0},!1);var o=l(L);b=s(o,"DIV",{class:!0},!1);var m=l(b);S=r(m,fn),m.forEach(c),y=u(o),C=s(o,"DIV",{class:!0},!1);var g=l(C);Rn.$$.fragment.l(g),P=r(g,"  Specimen: "),T=r(g,dn),g.forEach(c),A=u(o),D=s(o,"DIV",{class:!0},!1);var f=l(D);Ln.$$.fragment.l(f),F=r(f,"  Conversion Factor: "),k=r(f,pn),f.forEach(c),o.forEach(c),j=u(t),_=s(t,"DIV",{class:!0},!1);var d=l(_);B=s(d,"LABEL",{class:!0,for:!0},!1);var p=l(B);bn.$$.fragment.l(p),q=r(p," US"),p.forEach(c),z=u(d),G=s(d,"INPUT",{class:!0,value:!0,type:!0,placeholder:!0},!1),l(G).forEach(c),O=u(d),M=s(d,"DIV",{class:!0},!1);var v=l(M);W=r(v,"US Range:"),H=r(v,vn),J=u(v),K=r(v,Un),v.forEach(c),d.forEach(c),Q=u(t),X=s(t,"DIV",{class:!0},!1);var U=l(X);Y=s(U,"LABEL",{class:!0,for:!0},!1);var h=l(Y);yn.$$.fragment.l(h),Z=r(h," International"),h.forEach(c),nn=u(U),en=s(U,"INPUT",{class:!0,value:!0,type:!0,placeholder:!0},!1),l(en).forEach(c),tn=u(U),on=s(U,"DIV",{class:!0},!1);var V=l(on);sn=r(V,"SI Range: "),ln=r(V,hn),rn=u(V),cn=r(V,Vn),V.forEach(c),U.forEach(c),t.forEach(c),un=u(i),i.forEach(c),this.h()},h(){m(b,"class","font-bold text-black "),m(C,"class","text-gray-700 text-md"),m(D,"class","text-gray-700 text-sm"),m(L,"class","w-full md:w-2/5"),m(B,"class","block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"),m(B,"for","grid-first-name"),m(G,"class","appearance-none mt-1 block w-full bg-blue-100 text-gray-700 border border-blue-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"),G.value=N=n.unit.usValue,m(G,"type","number"),m(G,"placeholder"," US"),m(M,"class","text-gray-700 text-sm"),m(_,"class","md:w-1/3 w-1/2   h-14 pr-1 pl-1"),m(Y,"class","block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"),m(Y,"for","grid-first-name"),m(en,"class","appearance-none mt-1 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"),en.value=an=n.unit.siValue,m(en,"type","number"),m(en,"placeholder","SI"),m(on,"class","text-gray-700 text-sm"),m(X,"class","md:w-1/3 w-1/2  h-14 pr-1 pl-1"),m(a,"class","flex flex-wrap md:flex-no-wrap lg:flex-no-wrap px-1  mb-1"),m(e,"class","border border-gray-300 rounded mb-2"),gn=[g(G,"input",Sn),g(en,"input",wn)]},m(n,i){f(n,e,i),d(e,a),d(a,L),d(L,b),d(b,S),d(L,y),d(L,C),p(Rn,C,null),d(C,P),d(C,T),d(L,A),d(L,D),p(Ln,D,null),d(D,F),d(D,k),d(a,j),d(a,_),d(_,B),p(bn,B,null),d(B,q),d(_,z),d(_,G),d(_,O),d(_,M),d(M,W),d(M,H),d(M,J),d(M,K),d(a,Q),d(a,X),d(X,Y),p(yn,Y,null),d(Y,Z),d(X,nn),d(X,en),d(X,tn),d(X,on),d(on,sn),d(on,ln),d(on,rn),d(on,cn),d(e,un),mn=!0},p(e,a){n=a,mn&&!e.filteredUnits||fn===(fn=n.unit.name+"")||v(S,fn),mn&&!e.filteredUnits||dn===(dn=n.unit.specimen+"")||v(T,dn),mn&&!e.filteredUnits||pn===(pn=n.unit.factor+"")||v(k,pn),mn&&!e.filteredUnits||N===(N=n.unit.usValue)||(G.value=N),mn&&!e.filteredUnits||vn===(vn=n.unit.conventionalRange+"")||v(H,vn),mn&&!e.filteredUnits||Un===(Un=n.unit.conventionalUnit+"")||v(K,Un),mn&&!e.filteredUnits||an===(an=n.unit.siValue)||(en.value=an),mn&&!e.filteredUnits||hn===(hn=n.unit.siRange+"")||v(ln,hn),mn&&!e.filteredUnits||Vn===(Vn=n.unit.siUnit+"")||v(cn,Vn)},i(n){mn||(U(Rn.$$.fragment,n),U(Ln.$$.fragment,n),U(bn.$$.fragment,n),U(yn.$$.fragment,n),mn=!0)},o(n){h(Rn.$$.fragment,n),h(Ln.$$.fragment,n),h(bn.$$.fragment,n),h(yn.$$.fragment,n),mn=!1},d(n){n&&c(e),V(Rn),V(Ln),V(bn),V(yn),R(gn)}}}function T(n){var e,a,p,v,V,R,w,x,$,I,E,T,A,D,F,k;let j=n.filteredUnits,_=[];for(let e=0;e<j.length;e+=1)_[e]=P(C(n,j,e));const B=n=>h(_[n],1,1,()=>{_[n]=null});return{c(){e=i("meta"),a=i("script"),p=i("script"),v=i("script"),V=t("window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n\n  gtag('config', 'UA-255701-18');"),R=o(),w=i("div"),x=i("div"),$=t("Search Units "),I=i("input"),E=o();for(let n=0;n<_.length;n+=1)_[n].c();T=o(),A=i("footer"),D=t("www.medicalunitconverter.com"),this.h()},l(n){e=s(n,"META",{name:!0,content:!0},!1),l(e).forEach(c),a=s(n,"SCRIPT",{async:!0,src:!0},!1),l(a).forEach(c),p=s(n,"SCRIPT",{async:!0,src:!0},!1),l(p).forEach(c),v=s(n,"SCRIPT",{},!1);var i=l(v);V=r(i,"window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n\n  gtag('config', 'UA-255701-18');"),i.forEach(c),R=u(n),w=s(n,"DIV",{class:!0},!1);var t=l(w);x=s(t,"DIV",{class:!0},!1);var o=l(x);$=r(o,"Search Units "),I=s(o,"INPUT",{placeholder:!0,class:!0,type:!0},!1),l(I).forEach(c),o.forEach(c),E=u(t);for(let n=0;n<_.length;n+=1)_[n].l(t);t.forEach(c),T=u(n),A=s(n,"FOOTER",{class:!0},!1);var m=l(A);D=r(m,"www.medicalunitconverter.com"),m.forEach(c),this.h()},h(){document.title="medicalunitconverter.com",m(e,"name","description"),m(e,"content","Medical unit conversion calculator, medicalunitconverter.com. Convert US units to International (SI) units easily with this onlne calculator. Easily search for a specific lab test, enter any value and convert the units. For both Human and Veterinary values."),a.async=!0,m(a,"src","https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"),p.async=!0,m(p,"src","https://www.googletagmanager.com/gtag/js?id=UA-255701-18"),m(I,"placeholder","Unit"),m(I,"class","mt-1 block w-full  text-gray-700 border border-gray-300 rounded-lg py-2 px-2 leading-tight bg-white  focus:outline-none focus:bg-white focus:border-gray-500"),m(I,"type","search"),m(x,"class","md:w-1/4 mb-3 sm:w-1/3 text-black p-1"),m(w,"class","container mx-auto  px-1"),m(A,"class","w-full text-center border-t border-grey p-4 pin-b"),k=g(I,"input",n.input_input_handler)},m(i,t){d(document.head,e),d(document.head,a),d(document.head,p),d(document.head,v),d(v,V),f(i,R,t),f(i,w,t),d(w,x),d(x,$),d(x,I),L(I,n.prefix),d(w,E);for(let n=0;n<_.length;n+=1)_[n].m(w,null);f(i,T,t),f(i,A,t),d(A,D),F=!0},p(n,e){if(n.prefix&&L(I,e.prefix),n.filteredUnits||n.faGlobe||n.faFlagUsa||n.faCalculator||n.faVial){let a;for(j=e.filteredUnits,a=0;a<j.length;a+=1){const i=C(e,j,a);_[a]?(_[a].p(n,i),U(_[a],1)):(_[a]=P(i),_[a].c(),U(_[a],1),_[a].m(w,null))}for(y(),a=j.length;a<_.length;a+=1)B(a);b()}},i(n){if(!F){for(let n=0;n<j.length;n+=1)U(_[n]);F=!0}},o(n){_=_.filter(Boolean);for(let n=0;n<_.length;n+=1)h(_[n]);F=!1},d(n){c(e),c(a),c(p),c(v),n&&(c(R),c(w)),S(_,n),n&&(c(T),c(A)),k()}}}let A=0;function D(n,e,a){let i=[{name:"Alkaline phosphatase",specimen:"Serum",conventionalRange:"30-120",conventionalUnit:"IU/L",factor:"1",siRange:"0.5-2.0",siUnit:"U/L",siValue:"0.5",usValue:"30"},{name:"Alanine aminotransferase (ALT)",specimen:"Serum",conventionalRange:"10-40",conventionalUnit:"IU/L",factor:"1",siRange:"0.17-0.68",siUnit:"U/L",siValue:"0.17",usValue:"10"},{name:"Albumin",specimen:"Serum",conventionalRange:"3.5-5.0",conventionalUnit:"g/dL",factor:"10",siRange:"35-50",siUnit:"g/L",siValue:"35",usValue:"3.5"},{name:"Ammonia (as nitrogen)",specimen:"Serum, Plasma",conventionalRange:"15-45",conventionalUnit:"mcg/dL",factor:"0.5872",siRange:"11-32",siUnit:"µmol/L",siValue:"11",usValue:"15"},{name:"Amylase",specimen:"Serum",conventionalRange:"27-131",conventionalUnit:"Somogyi units",factor:"1.85",siRange:"0.46-2.23",siUnit:"U/L",siValue:"0.46",usValue:"27"},{name:"Aspartate aminotransferase (AST)",specimen:"Serum",conventionalRange:"10-30",conventionalUnit:"U/L",factor:"1",siRange:"0.17-0.51",siUnit:"U/L",siValue:"0.17",usValue:"10"},{name:"Bilirubin, total",specimen:"Serum",conventionalRange:"0.3-1.2",conventionalUnit:"mg/dL",factor:"17.104",siRange:"5.0-21.0",siUnit:"µmol/L",siValue:"5",usValue:"0.3"},{name:"Bilirubin, direct (conjugated)",specimen:"Serum",conventionalRange:"0.1-0.3",conventionalUnit:"mg/dL",factor:"17.104",siRange:"1.7-5.1",siUnit:"µmol/L",siValue:"1.7",usValue:"0.1"},{name:"Calcium, ionized",specimen:"Serum",conventionalRange:"4.60-5.08",conventionalUnit:"mg/dL",factor:"0.25",siRange:"1.15-1.27",siUnit:"mmol/L",siValue:"1.15",usValue:"4.6"},{name:"Calcium, total",specimen:"Serum",conventionalRange:"8.2-10.2",conventionalUnit:"mg/dL",factor:"0.25",siRange:"2.05-2.55",siUnit:"mmol/L",siValue:"2.05",usValue:"8.2"},{name:"Carbon dioxide (total)",specimen:"Serum, Plasma",conventionalRange:"22-28",conventionalUnit:"mEq/L",factor:"1",siRange:"22-28",siUnit:"mmol/L",siValue:"22-28",usValue:"22"},{name:"Chloride",specimen:"Serum, Plasma",conventionalRange:"96-106",conventionalUnit:"mEq/L",factor:"1",siRange:"96-106",siUnit:"mmol/L",siValue:"110",usValue:"110"},{name:"Cholesterol (total)",specimen:"Serum, Plasma",conventionalRange:"<200",conventionalUnit:"mg/dL",factor:"0.0259",siRange:"<5.18",siUnit:"mmol/L",siValue:"3.5",usValue:"135"},{name:"Copper",specimen:"Serum",conventionalRange:"70-140",conventionalUnit:"µg/dL",factor:"0.157",siRange:"44866",siUnit:"µmol/L",siValue:"44866",usValue:"70"},{name:"Cortisol",specimen:"Serum, Plasma",conventionalRange:"5-25",conventionalUnit:"mcg/dL",factor:"27.588",siRange:"140-690",siUnit:"nmol/L",siValue:"140",usValue:"5"},{name:"Creatine kinase (CK)",specimen:"Serum",conventionalRange:"40-150",conventionalUnit:"IU/L",factor:"1",siRange:"0.67-2.5",siUnit:"U/L",siValue:"0.67",usValue:"40"},{name:"Creatinine",specimen:"Serum, Plasma",conventionalRange:"0.5-1.2",conventionalUnit:"mg/dL",factor:"88.4",siRange:"53-106",siUnit:"µmol/L",siValue:"44",usValue:"0.5"},{name:"Fibrinogen",specimen:"Plasma",conventionalRange:"200-400",conventionalUnit:"mg/dL",factor:"0.0294",siRange:"5.8-11.8",siUnit:"µmol/L",siValue:"5.8",usValue:"200"},{name:"Glucose",specimen:"Serum",conventionalRange:"70-110",conventionalUnit:"mg/dL",factor:"0.0555",siRange:"3.9-6.1",siUnit:"mmol/L",siValue:"3.9",usValue:"70"},{name:"Iron",specimen:"Serum",conventionalRange:"60-150",conventionalUnit:"µg/dL",factor:"0.179",siRange:"10.7-26.9",siUnit:"µmol/L",siValue:"10.7",usValue:"60"},{name:"Iron-binding capacity",specimen:"Serum",conventionalRange:"250-450",conventionalUnit:"µg/dL",factor:"0.179",siRange:"44.8-80.6",siUnit:"µmol/L",siValue:"45",usValue:"250"},{name:"Lipase",specimen:"Serum",conventionalRange:"31-186",conventionalUnit:"IU/L",factor:"1",siRange:"0.5-3.2",siUnit:"U/L",siValue:"0.5",usValue:"31"},{name:"Phosphorus (inorganic)",specimen:"Serum",conventionalRange:"2.3-4.7",conventionalUnit:"mg/dL",factor:"0.323",siRange:"0.74-1.52",siUnit:"mmol/L",siValue:"0.74",usValue:"2.3"},{name:"Potassium",specimen:"Serum",conventionalRange:"3.5-5.0",conventionalUnit:"mEq/L",factor:"1",siRange:"3.5-5.0",siUnit:"mmol/L",siValue:"3.5",usValue:"3.5"},{name:"Protein (total)",specimen:"Serum",conventionalRange:"5.4-8.0",conventionalUnit:"g/dL",factor:"10",siRange:"54-80",siUnit:"g/L",siValue:"60",usValue:"6"},{name:"Prothrombin time (PT)",specimen:"Plasma",conventionalRange:"10-13",conventionalUnit:"s",siRange:"10-13",factor:"1",siValue:"s",usValue:"10"},{name:"Partial thromboplastin time (PTT)",specimen:"Whole blood",conventionalRange:"25-40",conventionalUnit:"s",factor:"1",siRange:"25-40",siUnit:"s",siValue:"25",usValue:"25"},{name:"Sodium",specimen:"Serum",conventionalRange:"136-142",conventionalUnit:"mEq/L",factor:"1",siRange:"136-142",siUnit:"mmol/L",siValue:"136",usValue:"136"},{name:"Triglycerides",specimen:"Serum",conventionalRange:"<160",conventionalUnit:"mcg/dL",factor:"0.0113",siRange:"1.8",siUnit:"mmol/L",siValue:"1.8",usValue:"140"},{name:"Triiodothyronine, total (T<sub>3</sub>)",specimen:"Serum",conventionalRange:"60-180",conventionalUnit:"mcg/dL",factor:"15.6",siRange:"0.92-2.76",siUnit:"nmol/L",siValue:"0.92",usValue:"60"},{name:"Thyroxine, free (FT <sub>4</sub> )",specimen:"Serum",conventionalRange:"0.9-2.3",conventionalUnit:"ng/dL",factor:"12.871",siRange:"12-30",siUnit:"pmol/L",siValue:"12",usValue:"0.9"},{name:"Thyroxine, total (T <sub>4</sub> )",specimen:"Serum",conventionalRange:"5.5-12.5",conventionalUnit:"mcg/dL",factor:"12.871",siRange:"71-160",siUnit:"nmol/L",siValue:"71",usValue:"5.5"},{name:"Urea nitrogen",specimen:"Serum",conventionalRange:"8-23",conventionalUnit:"mg/dL",factor:"0.357",siRange:"2.9-8.2",siUnit:"mmol/L",siValue:"2.9",usValue:"8"},{name:"Uric acid",specimen:"Serum",conventionalRange:"4.0-8.0",conventionalUnit:"mg/dL",factor:"0.0595",siRange:"240-480",siUnit:"mmol/L",siValue:"240",usValue:"4"},{name:"Urine protein/creatinine ratio",specimen:"Serum",conventionalRange:"",conventionalUnit:"g/g",factor:"0.113",siRange:"",siUnit:"g/mml",siValue:"",usValue:""}],t="";function o(n,e){const{factor:t,siValue:o}=i[e];a("units",i[e].siValue=+n,i),a("units",i[e].usValue=+(n/t).toFixed(2),i)}function s(n,e){const{factor:t,usValue:o}=i[e];a("units",i[e].usValue=+n,i),a("units",i[e].siValue=+(n*t).toFixed(2),i)}let l,r;return n.$$.update=((n={prefix:1,units:1,filteredUnits:1,i:1})=>{(n.prefix||n.units)&&a("filteredUnits",l=t?i.filter(n=>{return`${n.name}`.toLowerCase().startsWith(t.toLowerCase())}):i),(n.filteredUnits||n.i)&&(r=l[A])}),{prefix:t,setBothFromSI:o,setBothFromUS:s,filteredUnits:l,input_input_handler:function(){t=this.value,a("prefix",t)},input_handler:({i:n},e)=>s(e.target.value,n),input_handler_1:({i:n},e)=>o(e.target.value,n)}}export default class extends n{constructor(n){super(),e(this,n,D,T,a,[])}}