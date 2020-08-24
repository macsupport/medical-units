'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sirv = _interopDefault(require('sirv'));
var polka = _interopDefault(require('polka'));
var compression = _interopDefault(require('compression'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var proDuotoneSvgIcons = require('@fortawesome/pro-duotone-svg-icons');
var Stream = _interopDefault(require('stream'));
var http = _interopDefault(require('http'));
var Url = _interopDefault(require('url'));
var https = _interopDefault(require('https'));
var zlib = _interopDefault(require('zlib'));

// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [
	{
		title: 'What is Sapper?',
		slug: 'what-is-sapper',
		html: `
			<p>First, you have to know what <a href='https://svelte.dev'>Svelte</a> is. Svelte is a UI framework with a bold new idea: rather than providing a library that you write code with (like React or Vue, for example), it's a compiler that turns your components into highly optimized vanilla JavaScript. If you haven't already read the <a href='https://svelte.dev/blog/frameworks-without-the-framework'>introductory blog post</a>, you should!</p>

			<p>Sapper is a Next.js-style framework (<a href='blog/how-is-sapper-different-from-next'>more on that here</a>) built around Svelte. It makes it embarrassingly easy to create extremely high performance web apps. Out of the box, you get:</p>

			<ul>
				<li>Code-splitting, dynamic imports and hot module replacement, powered by webpack</li>
				<li>Server-side rendering (SSR) with client-side hydration</li>
				<li>Service worker for offline support, and all the PWA bells and whistles</li>
				<li>The nicest development experience you've ever had, or your money back</li>
			</ul>

			<p>It's implemented as Express middleware. Everything is set up and waiting for you to get started, but you keep complete control over the server, service worker, webpack config and everything else, so it's as flexible as you need it to be.</p>
		`
	},

	{
		title: 'How to use Sapper',
		slug: 'how-to-use-sapper',
		html: `
			<h2>Step one</h2>
			<p>Create a new project, using <a href='https://github.com/Rich-Harris/degit'>degit</a>:</p>

			<pre><code>npx degit "sveltejs/sapper-template#rollup" my-app
			cd my-app
			npm install # or yarn!
			npm run dev
			</code></pre>

			<h2>Step two</h2>
			<p>Go to <a href='http://localhost:3000'>localhost:3000</a>. Open <code>my-app</code> in your editor. Edit the files in the <code>src/routes</code> directory or add new ones.</p>

			<h2>Step three</h2>
			<p>...</p>

			<h2>Step four</h2>
			<p>Resist overdone joke formats.</p>
		`
	},

	{
		title: 'Why the name?',
		slug: 'why-the-name',
		html: `
			<p>In war, the soldiers who build bridges, repair roads, clear minefields and conduct demolitions — all under combat conditions — are known as <em>sappers</em>.</p>

			<p>For web developers, the stakes are generally lower than those for combat engineers. But we face our own hostile environment: underpowered devices, poor network connections, and the complexity inherent in front-end engineering. Sapper, which is short for <strong>S</strong>velte <strong>app</strong> mak<strong>er</strong>, is your courageous and dutiful ally.</p>
		`
	},

	{
		title: 'How is Sapper different from Next.js?',
		slug: 'how-is-sapper-different-from-next',
		html: `
			<p><a href='https://github.com/zeit/next.js'>Next.js</a> is a React framework from <a href='https://zeit.co'>Zeit</a>, and is the inspiration for Sapper. There are a few notable differences, however:</p>

			<ul>
				<li>It's powered by <a href='https://svelte.dev'>Svelte</a> instead of React, so it's faster and your apps are smaller</li>
				<li>Instead of route masking, we encode route parameters in filenames. For example, the page you're looking at right now is <code>src/routes/blog/[slug].html</code></li>
				<li>As well as pages (Svelte components, which render on server or client), you can create <em>server routes</em> in your <code>routes</code> directory. These are just <code>.js</code> files that export functions corresponding to HTTP methods, and receive Express <code>request</code> and <code>response</code> objects as arguments. This makes it very easy to, for example, add a JSON API such as the one <a href='blog/how-is-sapper-different-from-next.json'>powering this very page</a></li>
				<li>Links are just <code>&lt;a&gt;</code> elements, rather than framework-specific <code>&lt;Link&gt;</code> components. That means, for example, that <a href='blog/how-can-i-get-involved'>this link right here</a>, despite being inside a blob of HTML, works with the router as you'd expect.</li>
			</ul>
		`
	},

	{
		title: 'How can I get involved?',
		slug: 'how-can-i-get-involved',
		html: `
			<p>We're so glad you asked! Come on over to the <a href='https://github.com/sveltejs/svelte'>Svelte</a> and <a href='https://github.com/sveltejs/sapper'>Sapper</a> repos, and join us in the <a href='https://svelte.dev/chat'>Discord chatroom</a>. Everyone is welcome, especially you!</p>
		`
	}
];

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

const contents = JSON.stringify(posts.map(post => {
	return {
		title: post.title,
		slug: post.slug
	};
}));

function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}

var route_0 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get: get
});

const lookup = new Map();
posts.forEach(post => {
	lookup.set(post.slug, JSON.stringify(post));
});

function get$1(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	if (lookup.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(lookup.get(slug));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}

var route_1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get: get$1
});

function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error(`Function called outside component initialization`);
    return current_component;
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}

/* node_modules/svelte-fa/src/fa.svelte generated by Svelte v3.12.1 */

const Fa = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { class: clazz = '', id = '', style = '', icon, fw = false, flip = false, pull = false, rotate = false, size = false, color, primaryColor, secondaryColor, primaryOpacity = 1, secondaryOpacity = 0.4, swapOpacity = false } = $$props;

let i;
let s;
let transform;

	if ($$props.class === void 0 && $$bindings.class && clazz !== void 0) $$bindings.class(clazz);
	if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
	if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
	if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
	if ($$props.fw === void 0 && $$bindings.fw && fw !== void 0) $$bindings.fw(fw);
	if ($$props.flip === void 0 && $$bindings.flip && flip !== void 0) $$bindings.flip(flip);
	if ($$props.pull === void 0 && $$bindings.pull && pull !== void 0) $$bindings.pull(pull);
	if ($$props.rotate === void 0 && $$bindings.rotate && rotate !== void 0) $$bindings.rotate(rotate);
	if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
	if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
	if ($$props.primaryColor === void 0 && $$bindings.primaryColor && primaryColor !== void 0) $$bindings.primaryColor(primaryColor);
	if ($$props.secondaryColor === void 0 && $$bindings.secondaryColor && secondaryColor !== void 0) $$bindings.secondaryColor(secondaryColor);
	if ($$props.primaryOpacity === void 0 && $$bindings.primaryOpacity && primaryOpacity !== void 0) $$bindings.primaryOpacity(primaryOpacity);
	if ($$props.secondaryOpacity === void 0 && $$bindings.secondaryOpacity && secondaryOpacity !== void 0) $$bindings.secondaryOpacity(secondaryOpacity);
	if ($$props.swapOpacity === void 0 && $$bindings.swapOpacity && swapOpacity !== void 0) $$bindings.swapOpacity(swapOpacity);

	i = (icon && icon.icon) || [0, 0, '', [], ''];
	{
      let float;
      let width;
      const height = '1em';
      let lineHeight;
      let fontSize;
      let textAlign;
      let verticalAlign = '-.125em';
      const overflow = 'visible';
    
      if (fw) {
        textAlign = 'center';
        width = '1.25em';
      }
    
      if (pull) {
        float = pull;
      }
    
      if (size) {
        if (size == 'lg') {
          fontSize = '1.33333em';
          lineHeight = '.75em';
          verticalAlign = '-.225em';
        } else if (size == 'xs') {
          fontSize = '.75em';
        } else if (size == 'sm') {
          fontSize = '.875em';
        } else {
          fontSize = size.replace('x', 'em');
        }
      }
    
      const styleObj = {
        float,
        width,
        height,
        'line-height': lineHeight,
        'font-size': fontSize,
        'text-align': textAlign,
        'vertical-align': verticalAlign,
        overflow,
      };
      let styleStr = '';
      for (const prop in styleObj) {
        if (styleObj[prop]) {
          styleStr += `${prop}:${styleObj[prop]};`;
        }
      }
      s = styleStr + style;
    }
	{
      let t = '';
    
      if (flip) {
        let flipX = 1;
        let flipY = 1;
        if (flip == 'horizontal') {
          flipX = -1;
        } else if (flip == 'vertical') {
          flipY = -1;
        } else {
          flipX = flipY = -1;
        }
        t += ` scale(${flipX} ${flipY})`;
      }
    
      if (rotate) {
        t += ` rotate(${rotate} 0 0)`;
      }
    
      transform = t;
    }

	return `${ i[4] ? `<svg${add_attribute("id", id, 0)}${add_attribute("class", clazz, 0)}${add_attribute("style", s, 0)}${add_attribute("viewBox", `0 0 ${i[0]} ${i[1]}`, 0)} aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg">
	    <g transform="translate(256 256)">
	      <g${add_attribute("transform", transform, 0)}>
	        ${ typeof i[4] == 'string' ? `<path${add_attribute("d", i[4], 0)}${add_attribute("fill", color || primaryColor || 'currentColor', 0)} transform="translate(-256 -256)"></path>` : `<path${add_attribute("d", i[4][0], 0)}${add_attribute("fill", secondaryColor || color || 'currentColor', 0)}${add_attribute("fill-opacity", swapOpacity != false ? primaryOpacity : secondaryOpacity, 0)} transform="translate(-256 -256)"></path>
	          <path${add_attribute("d", i[4][1], 0)}${add_attribute("fill", primaryColor || color || 'currentColor', 0)}${add_attribute("fill-opacity", swapOpacity != false ? secondaryOpacity : primaryOpacity, 0)} transform="translate(-256 -256)"></path>` }
	      </g>
	    </g>
	  </svg>` : `` }`;
});

/* src/routes/index.svelte generated by Svelte v3.12.1 */

const Index = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	

  let units = [{"name":"Acetaminophen","specimen":"Serum, Plasma","conventionalRange":"10-30","conventionalUnit":"µg/mL","factor":"6.614","siRange":"66-200","siUnit":"µmol/L","siValue":"66","usValue":"10"},{"name":"Acetoacetate","specimen":"Serum, Plasma","conventionalRange":"<1","conventionalUnit":"mg/dL","factor":"97.95","siRange":"<100","siUnit":"µmol/L","siValue":"100","usValue":"1"},{"name":"Acetone","specimen":"Serum, Plasma","conventionalRange":"<1.0","conventionalUnit":"mg/dL","factor":"0.172","siRange":"<0.17","siUnit":"mmol/L","siValue":"0.17","usValue":"1.0"},{"name":"Acid phosphatase","specimen":"Serum","conventionalRange":"<5.5","conventionalUnit":"U/L","factor":"16.667","siRange":"<90","siUnit":"nkat/L","siValue":"90","usValue":"5.5"},{"name":"Activated partial thromboplastin time (APTT)","specimen":"Whole blood","conventionalRange":"25-40","conventionalUnit":"s","factor":"1","siRange":"25-40","siUnit":"s","siValue":"25","usValue":"25"},{"name":"Adenosine deaminase","specimen":"Serum","conventionalRange":"11.5-25.0","conventionalUnit":"U/L","factor":"16.667","siRange":"190-420","siUnit":"nkat/L","siValue":"190","usValue":"11.5"},{"name":"Adrenocorticotropic hormone (ACTH)","specimen":"Plasma","conventionalRange":"<120","conventionalUnit":"pg/mL","factor":"0.22","siRange":"<26","siUnit":"pmol/L","siValue":"26","usValue":"120"},{"name":"Alanine","specimen":"Plasma","conventionalRange":"1.87-5.89","conventionalUnit":"mg/dL","factor":"112.2","siRange":"210-661","siUnit":"µmol/L","siValue":"210","usValue":"1.87"},{"name":"Alanine aminotransferase (ALT)","specimen":"Serum","conventionalRange":"10-40","conventionalUnit":"U/L","factor":"0.0167","siRange":"0.17-0.68","siUnit":"µkat/L","siValue":"0.17","usValue":"10"},{"name":"Albumin","specimen":"Serum","conventionalRange":"3.5-5.0","conventionalUnit":"g/dL","factor":"10","siRange":"35-50","siUnit":"g/L","siValue":"35","usValue":"3.5"},{"name":"Alcohol dehydrogenase","specimen":"Serum","conventionalRange":"<2.8","conventionalUnit":"U/L","factor":"16.667","siRange":"<47","siUnit":"nkat/L","siValue":"47","usValue":"2.8"},{"name":"Aldolase","specimen":"Serum","conventionalRange":"1.0-7.5","conventionalUnit":"U/L","factor":"0.0167","siRange":"0.02-0.13","siUnit":"µkat/L","siValue":"0.02","usValue":"1.0"},{"name":"Aldosterone","specimen":"Serum, Plasma","conventionalRange":"2-9","conventionalUnit":"ng/dL","factor":"27.74","siRange":"55-250","siUnit":"pmol/L","siValue":"55","usValue":"2"},{"name":"Alkaline phosphatase","specimen":"Serum","conventionalRange":"30-120","conventionalUnit":"U/L","factor":"0.0167","siRange":"0.5-2.0","siUnit":"µkat/L","siValue":"0.5","usValue":"30"},{"name":"Alprazolam","specimen":"Serum, Plasma","conventionalRange":"10-50","conventionalUnit":"ng/mL","factor":"3.24","siRange":"32-162","siUnit":"nmol/L","siValue":"32","usValue":"10"},{"name":"Amikacin","specimen":"Serum, Plasma","conventionalRange":"20-30","conventionalUnit":"µg/mL","factor":"1.708","siRange":"34-52","siUnit":"µmol/L","siValue":"34","usValue":"20"},{"name":"α-Aminobutyric acid","specimen":"Plasma","conventionalRange":"0.08-0.36","conventionalUnit":"mg/dL","factor":"96.97","siRange":"8-35","siUnit":"µmol/L","siValue":"8","usValue":"0.08"},{"name":"δ-Aminolevulinic acid","specimen":"Serum","conventionalRange":"15-23","conventionalUnit":"µg/dL","factor":"0.0763","siRange":"1.1-8.0","siUnit":"µmol/L","siValue":"1.1","usValue":"15"},{"name":"Amiodarone","specimen":"Serum, Plasma","conventionalRange":"0.5-2.5","conventionalUnit":"µg/mL","factor":"1.55","siRange":"0.8-3.9","siUnit":"µmol/L","siValue":"0.8","usValue":"0.5"},{"name":"Amitriptyline","specimen":"Plasma","conventionalRange":"120-250","conventionalUnit":"ng/mL","factor":"3.605","siRange":"433-903","siUnit":"nmol/L","siValue":"433","usValue":"120"},{"name":"Ammonia (as nitrogen)","specimen":"Serum, Plasma","conventionalRange":"15-45","conventionalUnit":"µg/dL","factor":"0.714","siRange":"11-32","siUnit":"µmol/L","siValue":"11","usValue":"15"},{"name":"Amobarbital","specimen":"Serum","conventionalRange":"1-5","conventionalUnit":"µg/mL","factor":"4.42","siRange":"4-22","siUnit":"µmol/L","siValue":"4","usValue":"1"},{"name":"Amphetamine","specimen":"Serum, Plasma","conventionalRange":"20-30","conventionalUnit":"ng/mL","factor":"7.4","siRange":"148-222","siUnit":"nmol/L","siValue":"148","usValue":"20"},{"name":"Amylase","specimen":"Serum","conventionalRange":"27-131","conventionalUnit":"U/L","factor":"0.0167","siRange":"0.46-2.23","siUnit":"µkat/L","siValue":"0.46","usValue":"27"},{"name":"Androstenedione","specimen":"Serum","conventionalRange":"75-205","conventionalUnit":"ng/dL","factor":"0.0349","siRange":"2.6-7.2","siUnit":"nmol/L","siValue":"2.6","usValue":"75"},{"name":"Angiotensin I","specimen":"Plasma","conventionalRange":"<25","conventionalUnit":"pg/mL","factor":"0.772","siRange":"<15","siUnit":"pmol/L","siValue":"15","usValue":"25"},{"name":"Angiotensin II","specimen":"Plasma","conventionalRange":"10-60","conventionalUnit":"pg/mL","factor":"0.957","siRange":"0.96-58","siUnit":"pmol/L","siValue":"0.96","usValue":"10"},{"name":"Angiotensin-converting enzyme","specimen":"Serum","conventionalRange":"<40","conventionalUnit":"U/L","factor":"16.667","siRange":"<670","siUnit":"nkat/L","siValue":"670","usValue":"40"},{"name":"Anion gap Na+–(Cl- + HCO3-)","specimen":"Serum, Plasma","conventionalRange":"8-16","conventionalUnit":"mEq/L","factor":"1","siRange":"8-16","siUnit":"mmol/L","siValue":"8","usValue":"8"},{"name":"Antidiuretic hormone (ADH)","specimen":"Plasma","conventionalRange":"1-5","conventionalUnit":"pg/mL","factor":"0.923","siRange":"0.9-4.6","siUnit":"pmol/L","siValue":"0.9","usValue":"1"},{"name":"Antithrombin III","specimen":"Plasma","conventionalRange":"21-30","conventionalUnit":"mg/dL","factor":"10","siRange":"210-300","siUnit":"mg/L","siValue":"210","usValue":"21"},{"name":"α1-Antitrypsin","specimen":"Serum","conventionalRange":"78-200","conventionalUnit":"14.5-36.5","factor":"0.184","siRange":"14.5-36.5","siUnit":"µmol/L","siValue":"14.5","usValue":"78"},{"name":"Apolipoprotein A-I","specimen":"Serum","conventionalRange":"80-151","conventionalUnit":"mg/dL","factor":"0.01","siRange":"0.8-1.5","siUnit":"g/L","siValue":"0.8","usValue":"80"},{"name":"Apolipoprotein B","specimen":"Serum, Plasma","conventionalRange":"50-123","conventionalUnit":"mg/dL","factor":"0.01","siRange":"0.5-1.2","siUnit":"g/L","siValue":"0.5","usValue":"50"},{"name":"Arginine","specimen":"Serum","conventionalRange":"0.37-2.40","conventionalUnit":"mg/dL","factor":"57.05","siRange":"21-138","siUnit":"µmol/L","siValue":"21","usValue":"0.37"},{"name":"Arsenic","specimen":"Whole blood","conventionalRange":"2-23","conventionalUnit":"µg/L","factor":"0.0133","siRange":"0.03-0.31","siUnit":"µmol/L","siValue":"0.03","usValue":"2"},{"name":"Asparagine","specimen":"Plasma","conventionalRange":"0.40-0.91","conventionalUnit":"mg/dL","factor":"75.689","siRange":"30-69","siUnit":"µmol/L","siValue":"30","usValue":"0.40"},{"name":"Aspartate aminotransferase (AST)","specimen":"Serum","conventionalRange":"10-30","conventionalUnit":"U/L","factor":"0.0167","siRange":"0.17-0.51","siUnit":"µkat/L","siValue":"0.17","usValue":"10"},{"name":"Aspartic acid","specimen":"Plasma","conventionalRange":"<0.3","conventionalUnit":"mg/dL","factor":"75.13","siRange":"<25","siUnit":"µmol/L","siValue":"25","usValue":"0.3"},{"name":"Atrial natriuretic hormone","specimen":"Plasma","conventionalRange":"20-77","conventionalUnit":"pg/mL","factor":"0.325","siRange":"6.5-2.5","siUnit":"pmol/L","siValue":"6.5","usValue":"20"},{"name":"Base excess","specimen":"Whole blood","conventionalRange":"–2 to 3","conventionalUnit":"mEg/L","factor":"1","siRange":"–2 to 3","siUnit":"mmol/L","siValue":"0","usValue":"0"},{"name":"Bicarbonate","specimen":"Serum","conventionalRange":"21-28","conventionalUnit":"mEq/L","factor":"1","siRange":"21-28","siUnit":"mmol/L","siValue":"21","usValue":"21"},{"name":"Bile acids (total)","specimen":"Serum","conventionalRange":"0.3-2.3","conventionalUnit":"µg/mL","factor":"2.448","siRange":"0.73-5.63","siUnit":"µmol/L","siValue":"0.73","usValue":"0.3"},{"name":"Bilirubin, total","specimen":"Serum","conventionalRange":"0.3-1.2","conventionalUnit":"mg/dL","factor":"17.104","siRange":"5.0-21.0","siUnit":"µmol/L","siValue":"5.0","usValue":"0.3"},{"name":"Bilirubin, direct (conjugated)","specimen":"Serum","conventionalRange":"0.1-0.3","conventionalUnit":"mg/dL","factor":"17.104","siRange":"1.7-5.1","siUnit":"µmol/L","siValue":"1.7","usValue":"0.1"},{"name":"Biotin","specimen":"Serum","conventionalRange":"200-500","conventionalUnit":"pg/mL","factor":"0.00409","siRange":"0.82-2.05","siUnit":"nmol/L","siValue":"0.82","usValue":"200"},{"name":"Bismuth","specimen":"Whole blood","conventionalRange":"1-12","conventionalUnit":"µg/L","factor":"4.785","siRange":"4.8-57.4","siUnit":"nmol/L","siValue":"4.8","usValue":"1"},{"name":"Carbon dioxide, Pco2","specimen":"Arterial blood","conventionalRange":"35-45","conventionalUnit":"mEq/L","factor":"0.133","siRange":"4.7-5.9","siUnit":"kPa","siValue":"4.7","usValue":"35"},{"name":"ph","specimen":"Arterial blood","conventionalRange":"7.35-7.45","conventionalUnit":"","factor":"1","siRange":"7.35-7.45","siUnit":"","siValue":"7.35","usValue":"7.35"},{"name":"Oxygen, Po2","specimen":"Arterial blood","conventionalRange":"80-100","conventionalUnit":"","factor":"0.133","siRange":"11-13","siUnit":"kPa","siValue":"11","usValue":"80"},{"name":"Brain-type natriuretic peptide (BNP)","specimen":"Plasma","conventionalRange":"<167","conventionalUnit":"pg/mL","factor":"1","siRange":"<167","siUnit":"ng/L","siValue":"167","usValue":"167"},{"name":"Bromide (toxic)","specimen":"Serum","conventionalRange":">1250","conventionalUnit":"µg/mL","factor":"0.0125","siRange":">15.6","siUnit":"mmol/L","siValue":"15.6","usValue":"1250"},{"name":"C1 esterase inhibitor","specimen":"Serum","conventionalRange":"12-30","conventionalUnit":"mg/dL","factor":"10","siRange":"120-300","siUnit":"mg/L","siValue":"120","usValue":"12"},{"name":"C3 complement","specimen":"Serum","conventionalRange":"1200-1500","conventionalUnit":"µg/mL","factor":"0.001","siRange":"1.2-1.5","siUnit":"g/L","siValue":"1.2","usValue":"1200"},{"name":"C4 complement","specimen":"Serum","conventionalRange":"350-600","conventionalUnit":"µg/mL","factor":"0.001","siRange":"0.35-0.60","siUnit":"g/L","siValue":"0.35","usValue":"350"},{"name":"Cadmium","specimen":"Whole blood","conventionalRange":"0.3-1.2","conventionalUnit":"µg/L","factor":"8.896","siRange":"2.7-10.7","siUnit":"nmol/L","siValue":"2.7","usValue":"0.3"},{"name":"Caffeine","specimen":"Serum, Plasma","conventionalRange":"3-15","conventionalUnit":"µg/L","factor":"0.515","siRange":"2.5-7.5","siUnit":"µmol/L","siValue":"2.5","usValue":"3"},{"name":"Calcitonin","specimen":"Plasma","conventionalRange":"3-26","conventionalUnit":"pg/mL","factor":"0.292","siRange":"0.8-7.6","siUnit":"pmol/L","siValue":"0.8","usValue":"3"},{"name":"Calcium, ionized","specimen":"Serum","conventionalRange":"4.60-5.08","conventionalUnit":"mg/dL","factor":"0.25","siRange":"1.15-1.27","siUnit":"mmol/L","siValue":"1.15","usValue":"4.60"},{"name":"Calcium, total","specimen":"Serum","conventionalRange":"8.2-10.2","conventionalUnit":"mg/dL","factor":"0.25","siRange":"2.05-2.55","siUnit":"mmol/L","siValue":"2.05","usValue":"8.2"},{"name":"Cancer antigen (CA) 125","specimen":"Serum","conventionalRange":"<35","conventionalUnit":"U/mL","factor":"1","siRange":"<35","siUnit":"kU/L","siValue":"35","usValue":"35"},{"name":"Carbamazepine","specimen":"Serum, Plasma","conventionalRange":"8-12","conventionalUnit":"µg/mL","factor":"4.233","siRange":"34-51","siUnit":"µmol/L","siValue":"34","usValue":"8"},{"name":"Carbon dioxide (total)","specimen":"Serum, Plasma","conventionalRange":"22-28","conventionalUnit":"mEq/L","factor":"1","siRange":"22-28","siUnit":"mmol/L","siValue":"22","usValue":"22"},{"name":"Carboxyhemoglobin, toxic","specimen":"Whole blood","conventionalRange":">20","conventionalUnit":"%","factor":"0.01","siRange":">0.2","siUnit":"Proportion of 1.0","siValue":"0.2","usValue":"20"},{"name":"Carcinoembryonic antigen (CEA)","specimen":"Serum","conventionalRange":"<3.0","conventionalUnit":"µg/L","factor":"1","siRange":"<3.0","siUnit":"µg/L","siValue":"3.0","usValue":"3.0"},{"name":"β-Carotene","specimen":"Serum","conventionalRange":"10-85","conventionalUnit":"µg/dL","factor":"0.01863","siRange":"0.2-1.6","siUnit":"µmol/L","siValue":"0.2","usValue":"10"},{"name":"Carotenoids","specimen":"Serum","conventionalRange":"50-300","conventionalUnit":"µg/dL","factor":"0.01863","siRange":"0.9-5.6","siUnit":"µmol/L","siValue":"0.9","usValue":"50"},{"name":"Ceruloplasmin","specimen":"Serum","conventionalRange":"20-40","conventionalUnit":"mg/dL","factor":"10","siRange":"200-400","siUnit":"mg/L","siValue":"200","usValue":"20"},{"name":"Chloramphenicol","specimen":"Serum","conventionalRange":"10-25","conventionalUnit":"µg/mL","factor":"3.095","siRange":"31-77","siUnit":"µmol/L","siValue":"31","usValue":"10"},{"name":"Chlordiazepoxide","specimen":"Serum, Plasma","conventionalRange":"0.4-3.0","conventionalUnit":"µg/mL","factor":"3.336","siRange":"1.3-10.0","siUnit":"µmol/L","siValue":"1.3","usValue":"0.4"},{"name":"Chloride","specimen":"Serum, Plasma","conventionalRange":"96-106","conventionalUnit":"mEq/L","factor":"1","siRange":"96-106","siUnit":"mmol/L","siValue":"96","usValue":"96"},{"name":"Chlorpromazine","specimen":"Plasma","conventionalRange":"50-300","conventionalUnit":"ng/mL","factor":"3.126","siRange":"157-942","siUnit":"nmol/L","siValue":"157","usValue":"50"},{"name":"Chlorpropamide","specimen":"Plasma","conventionalRange":"75-250","conventionalUnit":"mg/L","factor":"3.61","siRange":"270-900","siUnit":"µmol/L","siValue":"270","usValue":"75"},{"name":"Cholesterol (total) Desirable","specimen":"Serum, Plasma","conventionalRange":"<200","conventionalUnit":"mg/dL","factor":"0.0259","siRange":"<5.18","siUnit":"mmol/L","siValue":"5.18","usValue":"200"},{"name":"Cholesterol (total) Borderline high","specimen":"Serum, Plasma","conventionalRange":"200-239","conventionalUnit":"mg/dL","factor":"0.0259","siRange":"5.18-6.18","siUnit":"mmol/L","siValue":"5.18","usValue":"200"},{"name":"Cholesterol (total) High","specimen":"Serum, Plasma","conventionalRange":"640","conventionalUnit":"mg/dL","factor":"0.0259","siRange":"6.21","siUnit":"mmol/L","siValue":"6.21","usValue":"640"},{"name":"Cholesterol, high-density (HDL) (low level)","specimen":"Serum, Plasma","conventionalRange":"<40","conventionalUnit":"mg/dL","factor":"0.0259","siRange":"<1.03","siUnit":"mmol/L","siValue":"1.03","usValue":"40"},{"name":"Cholesterol, low-density (LDL) (high level)","specimen":"Serum, Plasma","conventionalRange":">160","conventionalUnit":"mg/dL","factor":"0.0259","siRange":"4.144","siUnit":"mmol/L","siValue":"4.144","usValue":"160"},{"name":"Cholinesterase","specimen":"Serum","conventionalRange":"5-12","conventionalUnit":"mg/L","factor":"2.793","siRange":"14-39","siUnit":"nmol/L","siValue":"14","usValue":"5"},{"name":"Chorionic gonadotropin (ß-hCG) (nonpregnant)","specimen":"Serum","conventionalRange":"5","conventionalUnit":"mIU/mL","factor":"1","siRange":"5","siUnit":"IU/L","siValue":"5","usValue":"5"},{"name":"Chromium","specimen":"Whole blood","conventionalRange":"0.7-28.0","conventionalUnit":"µg/L","factor":"19.232","siRange":"13.4-538.6","siUnit":"nmol/L","siValue":"13.4","usValue":"0.7"},{"name":"Citrate","specimen":"Serum","conventionalRange":"1.2-3.0","conventionalUnit":"mg/dL","factor":"52.05","siRange":"60-160","siUnit":"µmol/L","siValue":"60","usValue":"1.2"},{"name":"Citrulline","specimen":"Plasma","conventionalRange":"0.2-1.0","conventionalUnit":"mg/dL","factor":"57.081","siRange":"12-55","siUnit":"µmol/L","siValue":"12","usValue":"0.2"},{"name":"Clonazepam","specimen":"Serum","conventionalRange":"10-50","conventionalUnit":"ng/mL","factor":"0.317","siRange":"0.4-15.8","siUnit":"nmol/L","siValue":"0.4","usValue":"10"},{"name":"Clonidine","specimen":"Serum, Plasma","conventionalRange":"1.0-2.0","conventionalUnit":"ng/mL","factor":"4.35","siRange":"4.4-8.7","siUnit":"nmol/L","siValue":"4.4","usValue":"1.0"},{"name":"Clozapine","specimen":"Serum","conventionalRange":"200-350","conventionalUnit":"ng/mL","factor":"0.003","siRange":"0.6-1.0","siUnit":"µmol/L","siValue":"0.6","usValue":"200"},{"name":"Coagulation factor I","specimen":"Plasma","conventionalRange":"0.15-0.35","conventionalUnit":"g/dL","factor":"29.41","siRange":"4.4-10.3","siUnit":"µmol/L","siValue":"4.4","usValue":"0.15"},{"name":"    (Fibrinogen)","specimen":"Plasma","conventionalRange":"150-350","conventionalUnit":"mg/dL","factor":"g/L","siRange":"1.5-3.5","siUnit":"g/L","siValue":"1.5","usValue":"150"},{"name":"Coagulation factor II (prothrombin)","specimen":"Plasma","conventionalRange":"70-130","conventionalUnit":"%","factor":"0.01","siRange":"0.70-1.30","siUnit":"Proportion of 1.0","siValue":"0.70","usValue":"70"},{"name":"Coagulation factor V","specimen":"Plasma","conventionalRange":"70-130","conventionalUnit":"%","factor":"0.01","siRange":"0.70-1.30","siUnit":"Proportion of 1.0","siValue":"0.70","usValue":"70"},{"name":"Coagulation factor VII","specimen":"Plasma","conventionalRange":"60-140","conventionalUnit":"%","factor":"0.01","siRange":"0.60-1.40","siUnit":"Proportion of 1.0","siValue":"0.60","usValue":"60"},{"name":"Coagulation factor VIII","specimen":"Plasma","conventionalRange":"50-200","conventionalUnit":"%","factor":"0.01","siRange":"0.50-2.00","siUnit":"Proportion of 1.0","siValue":"0.50","usValue":"50"},{"name":"Coagulation factor IX","specimen":"Plasma","conventionalRange":"70-130","conventionalUnit":"%","factor":"0.01","siRange":"0.70-1.30","siUnit":"Proportion of 1.0","siValue":"0.70","usValue":"70"},{"name":"Coagulation factor X","specimen":"Plasma","conventionalRange":"70-130","conventionalUnit":"%","factor":"0.01","siRange":"0.70-1.30","siUnit":"Proportion of 1.0","siValue":"0.70","usValue":"70"},{"name":"Coagulation factor XI","specimen":"Plasma","conventionalRange":"70-130","conventionalUnit":"%","factor":"0.01","siRange":"0.70-1.30","siUnit":"Proportion of 1.0","siValue":"0.70","usValue":"70"},{"name":"Coagulation factor XII","specimen":"Plasma","conventionalRange":"70-130","conventionalUnit":"%","factor":"0.01","siRange":"0.70-1.30","siUnit":"Proportion of 1.0","siValue":"0.70","usValue":"70"},{"name":"Cobalt","specimen":"Serum","conventionalRange":"4.0-10.0","conventionalUnit":"µg/L","factor":"16.968","siRange":"67.9-169.7","siUnit":"nmol/L","siValue":"67.9","usValue":"4.0"},{"name":"Cocaine (toxic)","specimen":"Serum","conventionalRange":">1000","conventionalUnit":"ng/mL","factor":"3.297","siRange":">3300","siUnit":"nmol/L","siValue":"3300","usValue":"1000"},{"name":"Codeine","specimen":"Serum","conventionalRange":"10-100","conventionalUnit":"ng/mL","factor":"3.34","siRange":"33-334","siUnit":"nmol/L","siValue":"33","usValue":"10"},{"name":"Coenzyme Q10 (ubiquinone)","specimen":"Plasma","conventionalRange":"0.5-1.5","conventionalUnit":"µg/mL","factor":"1","siRange":"0.5-1.5","siUnit":"mg/L","siValue":"0.5","usValue":"0.5"},{"name":"Copper","specimen":"Serum","conventionalRange":"70-140","conventionalUnit":"µg/dL","factor":"0.157","siRange":"44866","siUnit":"µmol/L","siValue":"44866","usValue":"70"},{"name":"Coproporphyrin","specimen":"Urine","conventionalRange":"<200","conventionalUnit":"µg/24h","factor":"1.527","siRange":"<300","siUnit":"µmol/d","siValue":"300","usValue":"200"},{"name":"Corticotropin","specimen":"Plasma","conventionalRange":"<120","conventionalUnit":"pg/mL","factor":"0.22","siRange":"<26","siUnit":"pmol/L","siValue":"26","usValue":"120"},{"name":"Cortisol","specimen":"Serum, Plasma","conventionalRange":"5-25","conventionalUnit":"µg/dL","factor":"27.588","siRange":"140-690","siUnit":"nmol/L","siValue":"140","usValue":"5"},{"name":"Cotinine","specimen":"Plasma","conventionalRange":"0-8","conventionalUnit":"µg/L","factor":"5.675","siRange":"0-45","siUnit":"nmol/L","siValue":"0","usValue":"0"},{"name":"C-peptide","specimen":"Serum","conventionalRange":"0.5-2.5","conventionalUnit":"ng/mL","factor":"0.331","siRange":"0.17-0.83","siUnit":"nmol/L","siValue":"0.17","usValue":"0.5"},{"name":"C-reactive protein","specimen":"Serum","conventionalRange":"0.08-3.1","conventionalUnit":"mg/L","factor":"9.524","siRange":"0.76-28.5","siUnit":"nmol/L","siValue":"0.76","usValue":"0.08"},{"name":"Creatine","specimen":"Serum","conventionalRange":"0.1-0.4","conventionalUnit":"mg/dL","factor":"76.25","siRange":"8-31","siUnit":"µmol/L","siValue":"8","usValue":"0.1"},{"name":"Creatine kinase (CK)","specimen":"Serum","conventionalRange":"40-150","conventionalUnit":"U/L","factor":"0.0167","siRange":"0.67-2.5","siUnit":"µkat/L","siValue":"0.67","usValue":"40"},{"name":"Creatine kinase–MB fraction","specimen":"Serum","conventionalRange":"0-7","conventionalUnit":"µg/L","factor":"1","siRange":"0-7","siUnit":"µg/L","siValue":"0","usValue":"0"},{"name":"Creatinine","specimen":"Serum, Plasma","conventionalRange":"0.6-1.2","conventionalUnit":"mg/dL","factor":"88.4","siRange":"53-106","siUnit":"µmol/L","siValue":"53","usValue":"0.6"},{"name":"Creatinine clearance","specimen":"Serum, Plasma","conventionalRange":"75-125","conventionalUnit":"mL/min/1.73m2","factor":"0.0167","siRange":"1.24-2.08","siUnit":"mL/s/m2","siValue":"1.24","usValue":"75"},{"name":"Cyanide (toxic)","specimen":"Whole blood","conventionalRange":">1.0","conventionalUnit":"µg/mL","factor":"23.24","siRange":">23","siUnit":"µmol/L","siValue":"23","usValue":"1.0"},{"name":"Cyclic adenosine monophosphate (cAMP)","specimen":"Plasma","conventionalRange":"4.6-8.6","conventionalUnit":"ng/mL","factor":"3.04","siRange":"14-26","siUnit":"µmol/L","siValue":"14","usValue":"4.6"},{"name":"Cyclosporine","specimen":"Serum","conventionalRange":"100-400","conventionalUnit":"ng/mL","factor":"0.832","siRange":"83-333","siUnit":"nmol/L","siValue":"83","usValue":"100"},{"name":"Cystine","specimen":"Plasma","conventionalRange":"0.40-1.40","conventionalUnit":"mg/dL","factor":"41.615","siRange":"16-60","siUnit":"µmol/L","siValue":"16","usValue":"0.40"},{"name":"D-dimer","specimen":"Plasma","conventionalRange":"<0.5","conventionalUnit":"µg/mL","factor":"5.476","siRange":"<3.0","siUnit":"nmol/L","siValue":"3.0","usValue":"0.5"},{"name":"Dehydroepiandrosterone (DHEA)","specimen":"Serum","conventionalRange":"1.8-12.5","conventionalUnit":"ng/mL","factor":"3.47","siRange":"6.2-43.3","siUnit":"nmol/L","siValue":"6.2","usValue":"1.8"},{"name":"Dehydroepiandrosterone sulfate (DHEA-S)","specimen":"Serum","conventionalRange":"50-450","conventionalUnit":"µg/dL","factor":"0.027","siRange":"1.6-12.2","siUnit":"µmol/L","siValue":"1.6","usValue":"50"},{"name":"Deoxycorticosterone","specimen":"Serum","conventionalRange":"2-19","conventionalUnit":"ng/dL","factor":"0.0303","siRange":"61-576","siUnit":"nmol/L","siValue":"61","usValue":"2"},{"name":"Desipramine","specimen":"Serum, Plasma","conventionalRange":"50-200","conventionalUnit":"ng/mL","factor":"3.754","siRange":"170-700","siUnit":"nmol/L","siValue":"170","usValue":"50"},{"name":"Diazepam","specimen":"Serum, Plasma","conventionalRange":"100-1000","conventionalUnit":"ng/mL","factor":"0.0035","siRange":"0.35-3.51","siUnit":"µmol/L","siValue":"0.35","usValue":"100"},{"name":"Digoxin","specimen":"Plasma","conventionalRange":"0.5-2.0","conventionalUnit":"ng/mL","factor":"1.281","siRange":"0.6-2.6","siUnit":"nmol/L","siValue":"0.6","usValue":"0.5"},{"name":"Diltiazem","specimen":"Serum","conventionalRange":"<200","conventionalUnit":"mg/L","factor":"2.412","siRange":"<480","siUnit":"µmol/L","siValue":"480","usValue":"200"},{"name":"Disopyramide","specimen":"Serum, Plasma","conventionalRange":"2.8-7.0","conventionalUnit":"µg/mL","factor":"2.946","siRange":"8.3-22.0","siUnit":"µmol/L","siValue":"8.3","usValue":"2.8"},{"name":"Dopamine","specimen":"Plasma","conventionalRange":"<87","conventionalUnit":"pg/mL","factor":"6.528","siRange":"<475","siUnit":"pmol/L","siValue":"475","usValue":"87"},{"name":"Doxepin","specimen":"Serum, Plasma","conventionalRange":"30-150","conventionalUnit":"ng/mL","factor":"3.579","siRange":"108-538","siUnit":"nmol/L","siValue":"108","usValue":"30"},{"name":"Albumin Proportion","specimen":"Serum","conventionalRange":"52-65","conventionalUnit":"%","factor":"0.01","siRange":"0.52-0.65","siUnit":"Proportion of 1.0","siValue":"0.52","usValue":"52"},{"name":"α1-Globulin Proportion","specimen":"Serum","conventionalRange":"2.5-5.0","conventionalUnit":"%","factor":"0.01","siRange":"0.025-0.05","siUnit":"Proportion of 1.0","siValue":"0.025","usValue":"2.5"},{"name":"α2-Globulin Proportion","specimen":"Serum","conventionalRange":"7.0-13.0","conventionalUnit":"%","factor":"0.01","siRange":"0.07-0.13","siUnit":"Proportion of 1.0","siValue":"0.07","usValue":"7.0"},{"name":"ß-Globulin Proportion","specimen":"Serum","conventionalRange":"8.0-14.0","conventionalUnit":"%","factor":"0.01","siRange":"0.08-0.14","siUnit":"Proportion of 1.0","siValue":"0.08","usValue":"8.0"},{"name":"γ-Globulin Proportion","specimen":"Serum","conventionalRange":"12.0-22.0","conventionalUnit":"%","factor":"0.01","siRange":"0.12-0.22","siUnit":"Proportion of 1.0","siValue":"0.12","usValue":"12.0"},{"name":"Albumin Concentration","specimen":"Serum","conventionalRange":"3.2-5.6","conventionalUnit":"g/dL","factor":"10","siRange":"32-56","siUnit":"g/L","siValue":"32","usValue":"3.2"},{"name":"α1 -Globulin Concentration","specimen":"Serum","conventionalRange":"0.1-0.4","conventionalUnit":"g/dL","factor":"10","siRange":"1-10","siUnit":"g/L","siValue":"1","usValue":"0.1"},{"name":"α2-Globulin Concentration","specimen":"Serum","conventionalRange":"0.4-1.2","conventionalUnit":"g/dL","factor":"10","siRange":"4-12","siUnit":"g/L","siValue":"4","usValue":"0.4"},{"name":"ß-Globulin Concentration","specimen":"Serum","conventionalRange":"0.5-1.1","conventionalUnit":"g/dL","factor":"10","siRange":"5-11","siUnit":"g/L","siValue":"5","usValue":"0.5"},{"name":"γ-Globulin Concentration","specimen":"Serum","conventionalRange":"0.5-1.6","conventionalUnit":"g/dL","factor":"10","siRange":"5-16","siUnit":"g/L","siValue":"5","usValue":"0.5"},{"name":"Ephedrine (toxic)","specimen":"Serum","conventionalRange":">2","conventionalUnit":"µg/mL","factor":"6.052","siRange":">12.1","siUnit":"µmol/L","siValue":"12.1","usValue":"2"},{"name":"Epinephrine","specimen":"Plasma","conventionalRange":"<60","conventionalUnit":"pg/mL","factor":"5.459","siRange":"<330","siUnit":"pmol/L","siValue":"330","usValue":"60"},{"name":"Erythrocyte sedimentation rate","specimen":"Whole blood","conventionalRange":"0-20","conventionalUnit":"mm/h","factor":"1","siRange":"0-20","siUnit":"mm/h","siValue":"0","usValue":"0"},{"name":"Erythropoietin","specimen":"Serum","conventionalRange":"5-36","conventionalUnit":"IU/L","factor":"1","siRange":"5-36","siUnit":"IU/L","siValue":"5","usValue":"5"},{"name":"Estradiol (E 2 )","specimen":"Serum","conventionalRange":"30-400","conventionalUnit":"pg/mL","factor":"3.671","siRange":"110-1470","siUnit":"pmol/L","siValue":"110","usValue":"30"},{"name":"Estriol (E 3 )","specimen":"Serum","conventionalRange":"5-40","conventionalUnit":"ng/mL","factor":"3.467","siRange":"17.4-138.8","siUnit":"nmol/L","siValue":"17.4","usValue":"5"},{"name":"Estrogens (total)","specimen":"Serum","conventionalRange":"60-400","conventionalUnit":"pg/mL","factor":"1","siRange":"60-400","siUnit":"ng/L","siValue":"60","usValue":"60"},{"name":"Estrone (E 1 )","specimen":"Serum, Plasma","conventionalRange":"1.5-25.0","conventionalUnit":"pg/mL","factor":"3.698","siRange":"5.5-92.5","siUnit":"pmol/L","siValue":"5.5","usValue":"1.5"},{"name":"Ethanol (ethyl alcohol)","specimen":"Serum, whole blood","conventionalRange":"<20","conventionalUnit":"mg/dL","factor":"0.2171","siRange":"<4.3","siUnit":"mmol/L","siValue":"4.3","usValue":"20"},{"name":"Ethchlorvynol (toxic)","specimen":"Serum, Plasma","conventionalRange":">20","conventionalUnit":"µg/mL","factor":"6.915","siRange":">138","siUnit":"µmol/L","siValue":"138","usValue":"20"},{"name":"Ethosuximide","specimen":"Serum","conventionalRange":"40-100","conventionalUnit":"mg/L","factor":"7.084","siRange":"280-700","siUnit":"µmol/L","siValue":"280","usValue":"40"},{"name":"Ethylene glycol (toxic)","specimen":"Serum, Plasma","conventionalRange":">30","conventionalUnit":"mg/dL","factor":"0.1611","siRange":">5","siUnit":"mmol/L","siValue":"5","usValue":"30"},{"name":"Fatty acids (nonesterified)","specimen":"Serum, Plasma","conventionalRange":"8-25","conventionalUnit":"mg/dL","factor":"0.0355","siRange":"0.28-0.89","siUnit":"mmol/L","siValue":"0.28","usValue":"8"},{"name":"Fecal fat (as stearic acid)","specimen":"Stool","conventionalRange":"2-6","conventionalUnit":"g/d","factor":"1","siRange":"2-6","siUnit":"g/24h","siValue":"2","usValue":"2"},{"name":"Fenfluramine","specimen":"Serum","conventionalRange":"0.04-0.30","conventionalUnit":"µg/mL","factor":"4.324","siRange":"0.18-1.30","siUnit":"µmol/L","siValue":"0.18","usValue":"0.04"},{"name":"Fentanyl","specimen":"Serum","conventionalRange":"0.01-0.10","conventionalUnit":"µg/mL","factor":"2.972","siRange":"0.02-0.30","siUnit":"µmol/L","siValue":"0.02","usValue":"0.01"},{"name":"Ferritin","specimen":"Serum","conventionalRange":"15-200","conventionalUnit":"ng/mL","factor":"2.247","siRange":"33-450","siUnit":"pmol/Lng/mL","siValue":"33","usValue":"15"},{"name":"α1-Fetoprotein","specimen":"Serum","conventionalRange":"<10","conventionalUnit":"µg/L","factor":"1","siRange":"<10","siUnit":"µg/L","siValue":"10","usValue":"10"},{"name":"Fibrin degradation products","specimen":"Plasma","conventionalRange":"<10","conventionalUnit":"µg/mL","factor":"1","siRange":"<10","siUnit":"mg/L","siValue":"10","usValue":"10"},{"name":"Fibrinogen","specimen":"Plasma","conventionalRange":"200-400","conventionalUnit":"mg/dL","factor":"0.0294","siRange":"5.8-11.8","siUnit":"µmol/L","siValue":"5.8","usValue":"200"},{"name":"Flecanide","specimen":"Serum, Plasma","conventionalRange":"0.2-1.0","conventionalUnit":"µg/mL","factor":"2.413","siRange":"0.5-2.4","siUnit":"µmol/L","siValue":"0.5","usValue":"0.2"},{"name":"Fluoride","specimen":"Whole blood","conventionalRange":"<0.05","conventionalUnit":"mg/dL","factor":"0.5263","siRange":"<0.027","siUnit":"mmol/L","siValue":"0.027","usValue":"0.05"
},{"name":"Fluoxetine","specimen":"Serum","conventionalRange":"200-1100","conventionalUnit":"ng/mL","factor":"0.00323","siRange":"0.65-3.56","siUnit":"µmol/L","siValue":"0.65","usValue":"200"},{"name":"Flurazepam (toxic)","specimen":"Serum, Plasma","conventionalRange":">0.2","conventionalUnit":"µg/mL","factor":"2.5","siRange":">0.5","siUnit":"µmol/L","siValue":"0.5","usValue":"0.2"},{"name":"Folate (folic acid)","specimen":"Serum","conventionalRange":"3-16","conventionalUnit":"ng/mL","factor":"2.266","siRange":"7-36","siUnit":"nmol/L","siValue":"7","usValue":"3"},{"name":"Follicle-stimulating hormone (FSH)","specimen":"Serum, Plasma","conventionalRange":"1-100","conventionalUnit":"mIU/mL","factor":"1","siRange":"1-100","siUnit":"IU/L","siValue":"1","usValue":"1"},{"name":"Fructosamine","specimen":"Serum","conventionalRange":"36-50","conventionalUnit":"mg/L","factor":"5.581","siRange":"200-280","siUnit":"mmol/L","siValue":"200","usValue":"36"},{"name":"Fructose","specimen":"Serum","conventionalRange":"1-6","conventionalUnit":"mg/dL","factor":"55.506","siRange":"55-335","siUnit":"µmol/L","siValue":"55","usValue":"1"},{"name":"Galactose","specimen":"Serum, Plasma","conventionalRange":"<20","conventionalUnit":"mg/dL","factor":"0.0555","siRange":"<1.10","siUnit":"mmol/L","siValue":"1.10","usValue":"20"},{"name":"Gastrin","specimen":"Serum","conventionalRange":"25-90","conventionalUnit":"pg/mL","factor":"0.481","siRange":"12-45","siUnit":"pmol/L","siValue":"12","usValue":"25"},{"name":"Gentamicin","specimen":"Serum","conventionalRange":"6-10","conventionalUnit":"µg/mL","factor":"2.09","siRange":"12-21","siUnit":"µmol/L","siValue":"12","usValue":"6"},{"name":"Glucagon","specimen":"Plasma","conventionalRange":"20-100","conventionalUnit":"pg/mL","factor":"1","siRange":"20-100","siUnit":"ng/L","siValue":"20","usValue":"20"},{"name":"Glucose","specimen":"Serum","conventionalRange":"70-110","conventionalUnit":"mg/dL","factor":"0.0555","siRange":"3.9-6.1","siUnit":"mmol/L","siValue":"3.9","usValue":"70"},{"name":"Glucose-6-phosphate dehydrogenase","specimen":"Whole blood","conventionalRange":"10-14","conventionalUnit":"U/g hemoglobin","factor":"0.0167","siRange":"0.17-0.24","siUnit":"nkat/g hemoglobin","siValue":"0.17","usValue":"10"},{"name":"Glutamic acid","specimen":"Plasma","conventionalRange":"0.2-2.8","conventionalUnit":"mg/dL","factor":"67.967","siRange":"15-190","siUnit":"µmol/L","siValue":"15","usValue":"0.2"},{"name":"Glutamine","specimen":"Plasma","conventionalRange":"6.1-10.2","conventionalUnit":"mg/dL","factor":"68.423","siRange":"420-700","siUnit":"µmol/L","siValue":"420","usValue":"6.1"},{"name":"γ-Glutamyltransferase (GGT)","specimen":"Serum","conventionalRange":"2-30","conventionalUnit":"U/L","factor":"0.0167","siRange":"0.03-0.51","siUnit":"µkat/L","siValue":"0.03","usValue":"2"},{"name":"Glutethimide","specimen":"Serum","conventionalRange":"2-6","conventionalUnit":"µg/mL","factor":"4.603","siRange":"9-28","siUnit":"µmol/L","siValue":"9","usValue":"2"},{"name":"Glycerol (free)","specimen":"Serum","conventionalRange":"0.3-1.72","conventionalUnit":"mg/dL","factor":"0.1086","siRange":"0.32-0.187","siUnit":"mmol/L","siValue":"0.32","usValue":"0.3"},{"name":"Glycine","specimen":"Plasma","conventionalRange":"0.9-4.2","conventionalUnit":"mg/dL","factor":"133.2","siRange":"120-560","siUnit":"µmol/L","siValue":"120","usValue":"0.9"},{"name":"Gold","specimen":"Serum","conventionalRange":"<10","conventionalUnit":"µg/dL","factor":"50.77","siRange":"<500","siUnit":"nmol/L","siValue":"500","usValue":"10"},{"name":"Growth hormone (GH)","specimen":"Serum","conventionalRange":"0-18","conventionalUnit":"ng/mL","factor":"1","siRange":"0-18","siUnit":"µg/L","siValue":"0","usValue":"0"},{"name":"Haloperidol","specimen":"Serum, Plasma","conventionalRange":"6-24","conventionalUnit":"ng/mL","factor":"2.66","siRange":"16-65","siUnit":"nmol/L","siValue":"16","usValue":"6"},{"name":"Haptoglobin","specimen":"Serum","conventionalRange":"26-185","conventionalUnit":"mg/dL","factor":"10","siRange":"260-1850","siUnit":"mg/L","siValue":"260","usValue":"26"},{"name":"Hematocrit","specimen":"Whole blood","conventionalRange":"41-50","conventionalUnit":"%","factor":"0.01","siRange":"0.41-0.50","siUnit":"Proportion of 1.0","siValue":"0.41","usValue":"41"},{"name":"Hemoglobin","specimen":"Whole blood","conventionalRange":"14.0-17.5","conventionalUnit":"g/dL","factor":"10","siRange":"140-175","siUnit":"g/L","siValue":"140","usValue":"14.0"},{"name":"Mean corpuscular hemoglobin (MCH)","specimen":"Whole blood","conventionalRange":"26-34","conventionalUnit":"pg/cell","factor":"1","siRange":"26-34","siUnit":"pg/cell","siValue":"26","usValue":"26"},{"name":"Mean corpuscular hemoglobin concentration (MCHC)","specimen":"Whole blood","conventionalRange":"33-37","conventionalUnit":"g/dL","factor":"10","siRange":"330-370","siUnit":"g/L","siValue":"330","usValue":"33"},{"name":"Mean corpuscular volume (MCV)","specimen":"Whole blood","conventionalRange":"80-100","conventionalUnit":"µm3","factor":"1","siRange":"80-100","siUnit":"fL","siValue":"80","usValue":"80"},{"name":"Hemoglobin A 1c (glycated hemoglobin)","specimen":"Whole blood","conventionalRange":"4-7","conventionalUnit":"% of total hemoglobin","factor":"0.01","siRange":"0.04-0.07","siUnit":"Proportion of total hemoglobin","siValue":"0.04","usValue":"4"},{"name":"Hemoglobin A 2","specimen":"Whole blood","conventionalRange":"2.0-3.0","conventionalUnit":"%","factor":"0.01","siRange":"0.02-0.03","siUnit":"Proportion of 1.0","siValue":"0.02","usValue":"2.0"},{"name":"Histamine","specimen":"Plasma","conventionalRange":"0.5-1.0","conventionalUnit":"µg/L","factor":"8.997","siRange":"4.5-9.0","siUnit":"nmol/L","siValue":"4.5","usValue":"0.5"},{"name":"Histidine","specimen":"Plasma","conventionalRange":"0.5-1.7","conventionalUnit":"mg/dL","factor":"64.45","siRange":"32-110","siUnit":"µmol/L","siValue":"32","usValue":"0.5"},{"name":"Homocysteine","specimen":"Plasma","conventionalRange":"0.68-2.02","conventionalUnit":"mg/L","factor":"7.397","siRange":"5-15","siUnit":"µmol/L","siValue":"5","usValue":"0.68"},{"name":"Homovanillic acid","specimen":"Urine","conventionalRange":"1.4-8.8","conventionalUnit":"mg/24 h","factor":"5.489","siRange":"8-48","siUnit":"µmol/d","siValue":"8","usValue":"1.4"},{"name":"Hydrocodone","specimen":"Serum","conventionalRange":"<0.02","conventionalUnit":"µg/mL","factor":"3.34","siRange":"<0.06","siUnit":"µmol/L","siValue":"0.06","usValue":"0.02"},{"name":"Hydromorphone","specimen":"Serum","conventionalRange":"0.008-0.032","conventionalUnit":"µg/mL","factor":"3504","siRange":"28-112","siUnit":"nmol/L","siValue":"28","usValue":"0.008"},{"name":"β-Hydroxybutyric acid","specimen":"Plasma","conventionalRange":"<3.0","conventionalUnit":"mg/dL","factor":"96.06","siRange":"<300","siUnit":"µmol/L","siValue":"300","usValue":"3.0"},{"name":"5-Hydroxyindoleacetic acid (5-HIAA)","specimen":"Urine","conventionalRange":"2-6","conventionalUnit":"mg/24h","factor":"5.23","siRange":"10.4-31.2","siUnit":"µmol/d","siValue":"10.4","usValue":"2"},{"name":"Hydroxyproline","specimen":"Plasma","conventionalRange":"<0.55","conventionalUnit":"mg/dL","factor":"76.266","siRange":"<42","siUnit":"µmol/L","siValue":"42","usValue":"0.55"},{"name":"Ibuprofen","specimen":"Serum","conventionalRange":"10-50","conventionalUnit":"µg/mL","factor":"4.848","siRange":"50-243","siUnit":"µmol/L","siValue":"50","usValue":"10"},{"name":"Imipramine","specimen":"Plasma","conventionalRange":"150-250","conventionalUnit":"ng/mL","factor":"3.566","siRange":"536-893","siUnit":"nmol/L","siValue":"536","usValue":"150"},{"name":"Immunoglobulin A (IgA)","specimen":"Serum","conventionalRange":"40-350","conventionalUnit":"mg/dL","factor":"10","siRange":"400-3500","siUnit":"mg/L","siValue":"400","usValue":"40"},{"name":"Immunoglobulin D (IgD)","specimen":"Serum","conventionalRange":"0-8","conventionalUnit":"mg/dL","factor":"10","siRange":"0-80","siUnit":"mg/L","siValue":"0","usValue":"0"},{"name":"Immunoglobulin E (IgE)","specimen":"Serum","conventionalRange":"0-1500","conventionalUnit":"µg/L","factor":"0.001","siRange":"0-1.5","siUnit":"mg/L","siValue":"0","usValue":"0"},{"name":"Immunoglobulin G (IgG)","specimen":"Serum","conventionalRange":"650-1600","conventionalUnit":"mg/dL","factor":"0.01","siRange":"6.5-16.0","siUnit":"g/L","siValue":"6.5","usValue":"650"},{"name":"Immunoglobulin M (IgM)","specimen":"Serum","conventionalRange":"54-300","conventionalUnit":"mg/dL","factor":"10","siRange":"550-3000","siUnit":"mg/L","siValue":"550","usValue":"54"},{"name":"Insulin","specimen":"Serum","conventionalRange":"2.0-20","conventionalUnit":"","factor":"6.945","siRange":"14-140","siUnit":"pmol/L","siValue":"14","usValue":"2.0"},{"name":"Insulinlike growth factor","specimen":"Serum","conventionalRange":"130-450","conventionalUnit":"ng/mL","factor":"0.131","siRange":"18-60","siUnit":"nmol/L","siValue":"18","usValue":"130"},{"name":"Iodine","specimen":"Serum","conventionalRange":"58-77","conventionalUnit":"µg/L","factor":"7.88","siRange":"450-580","siUnit":"nmol/L","siValue":"450","usValue":"58"},{"name":"Iron","specimen":"Serum","conventionalRange":"60-150","conventionalUnit":"µg/dL","factor":"0.179","siRange":"10.7-26.9","siUnit":"µmol/L","siValue":"10.7","usValue":"60"},{"name":"Iron-binding capacity","specimen":"Serum","conventionalRange":"250-450","conventionalUnit":"µg/dL","factor":"0.179","siRange":"44.8-80.6","siUnit":"µmol/L","siValue":"44.8","usValue":"250"},{"name":"Isoleucine","specimen":"Plasma","conventionalRange":"0.5-1.3","conventionalUnit":"mg/dL","factor":"76.236","siRange":"40-100","siUnit":"µmol/L","siValue":"40","usValue":"0.5"},{"name":"Isoniazid","specimen":"Plasma","conventionalRange":"1-7","conventionalUnit":"µg/mL","factor":"7.291","siRange":"7-51","siUnit":"µmol/L","siValue":"7","usValue":"1"},{"name":"Isopropanol (toxic)","specimen":"Serum, Plasma","conventionalRange":">400","conventionalUnit":"mg/L","factor":"0.0166","siRange":">6.64","siUnit":"mmol/L","siValue":"6.64","usValue":"400"},{"name":"Kanamycin","specimen":"Serum, Plasma","conventionalRange":"25-35","conventionalUnit":"µg/mL","factor":"2.08","siRange":"52-72","siUnit":"µmol/L","siValue":"52","usValue":"25"},{"name":"Ketamine","specimen":"Serum","conventionalRange":"0.2-6.3","conventionalUnit":"µg/mL","factor":"4.206","siRange":"0.8-26","siUnit":"µmol/L","siValue":"0.8","usValue":"0.2"},{"name":"17-Ketosteroids","specimen":"Urine","conventionalRange":"3-12","conventionalUnit":"mg/24h","factor":"3.33","siRange":"10-42","siUnit":"µmol/d","siValue":"10","usValue":"3"},{"name":"Lactate","specimen":"Plasma","conventionalRange":"5.0-15","conventionalUnit":"mg/dL","factor":"0.111","siRange":"0.6-1.7","siUnit":"mmol/L","siValue":"0.6","usValue":"5.0"},{"name":"Lactate dehydrogenase (LDH)","specimen":"Serum","conventionalRange":"100-200","conventionalUnit":"U/L","factor":"0.0167","siRange":"1.7-3.4","siUnit":"µkat/L","siValue":"1.7","usValue":"100"},{"name":"LD1","specimen":"Serum","conventionalRange":"17-27","conventionalUnit":"%","factor":"0.01","siRange":"0.17-0.27","siUnit":"Proportion of 1.0","siValue":"0.17","usValue":"17"},{"name":"LD2","specimen":"Serum","conventionalRange":"27-37","conventionalUnit":"%","factor":"0.01","siRange":"0.27-0.37","siUnit":"Proportion of 1.0","siValue":"0.27","usValue":"27"},{"name":"LD3","specimen":"Serum","conventionalRange":"18-25","conventionalUnit":"%","factor":"0.01","siRange":"0.18-0.25","siUnit":"Proportion of 1.0","siValue":"0.18","usValue":"18"},{"name":"LD4","specimen":"Serum","conventionalRange":"3-8","conventionalUnit":"%","factor":"0.01","siRange":"0.03-0.08","siUnit":"Proportion of 1.0","siValue":"0.03","usValue":"3"},{"name":"LD5","specimen":"Serum","conventionalRange":"0-5","conventionalUnit":"%","factor":"0.01","siRange":"0-0.05","siUnit":"Proportion of 1.0","siValue":"0","usValue":"0"},{"name":"Lead","specimen":"Serum","conventionalRange":"<10-20","conventionalUnit":"µg/dL","factor":"0.0483","siRange":"<0.5-1.0","siUnit":"µmol/L","siValue":"<0.5","usValue":"<10"},{"name":"Leucine","specimen":"Plasma","conventionalRange":"1.0-2.3","conventionalUnit":"mg/dL","factor":"76.237","siRange":"75-175","siUnit":"µmol/L","siValue":"75","usValue":"1.0"},{"name":"Lidocaine","specimen":"Serum, Plasma","conventionalRange":"1.5-6.0","conventionalUnit":"µg/mL","factor":"4.267","siRange":"6.4-25.6","siUnit":"µmol/L","siValue":"6.4","usValue":"1.5"},{"name":"Lipase","specimen":"Serum","conventionalRange":"31-186","conventionalUnit":"U/L","factor":"0.0167","siRange":"0.5-3.2","siUnit":"µkat/L","siValue":"0.5","usValue":"31"},{"name":"Lipoprotein(a) [Lp(a)]","specimen":"Serum","conventionalRange":"10-30","conventionalUnit":"mg/dL","factor":"0.0357","siRange":"0.35-1.0","siUnit":"µmol/L","siValue":"0.35","usValue":"10"},{"name":"Lithium","specimen":"Serum","conventionalRange":"0.6-1.2","conventionalUnit":"mEq/L","factor":"1","siRange":"0.6-1.2","siUnit":"mmol/L","siValue":"0.6","usValue":"0.6"},{"name":"Lorazepam","specimen":"Serum","conventionalRange":"50-240","conventionalUnit":"ng/mL","factor":"3.114","siRange":"156-746","siUnit":"nmol/L","siValue":"156","usValue":"50"},{"name":"Luteinizing hormone (LH)","specimen":"Serum, Plasma","conventionalRange":"1-104","conventionalUnit":"mIU/mL","factor":"1","siRange":"1-104","siUnit":"IU/L","siValue":"1","usValue":"1"},{"name":"Lycopene","specimen":"Serum","conventionalRange":"0.15-0.25","conventionalUnit":"mg/L","factor":"1.863","siRange":"0.28-0.46","siUnit":"µmol/L","siValue":"0.28","usValue":"0.15"},{"name":"Lysergic acid diethylamide","specimen":"Serum","conventionalRange":"<0.004","conventionalUnit":"µg/mL","factor":"3726","siRange":"<15","siUnit":"nmol/L","siValue":"15","usValue":"0.004"},{"name":"Lysine","specimen":"Plasma","conventionalRange":"1.2-3.5","conventionalUnit":"mg/dL","factor":"68.404","siRange":"80-240","siUnit":"µmol/L","siValue":"80","usValue":"1.2"},{"name":"Lysozyme","specimen":"Serum, Plasma","conventionalRange":"0.4-1.3","conventionalUnit":"mg/dL","factor":"10","siRange":"4-13","siUnit":"mg/L","siValue":"4","usValue":"0.4"},{"name":"Magnesium","specimen":"Serum","conventionalRange":"1.3-2.1","conventionalUnit":"mEq/L","factor":"0.5","siRange":"0.65-1.05","siUnit":"mmol/L","siValue":"0.65","usValue":"1.3"},{"name":"Manganese","specimen":"Whole blood","conventionalRange":"10-12","conventionalUnit":"µg/L","factor":"18.202","siRange":"182-218","siUnit":"nmol/L","siValue":"182","usValue":"10"},{"name":"Maprotiline","specimen":"Plasma","conventionalRange":"200-600","conventionalUnit":"ng/mL","factor":"1","siRange":"200-600","siUnit":"µg/L","siValue":"200","usValue":"200"},{"name":"Melatonin","specimen":"Serum","conventionalRange":"10-15","conventionalUnit":"","factor":"4.305","siRange":"45-66","siUnit":"pmol/L","siValue":"45","usValue":"10"},{"name":"Meperidine","specimen":"Serum, Plasma","conventionalRange":"400-700","conventionalUnit":"ng/mL","factor":"4.043","siRange":"1620-2830","siUnit":"nmol/L","siValue":"1620","usValue":"400"},{"name":"Mercury","specimen":"Serum","conventionalRange":"<5","conventionalUnit":"µg/L","factor":"4.985","siRange":"<25","siUnit":"nmol/L","siValue":"25","usValue":"5"},{"name":"Metanephrine (total)","specimen":"Urine","conventionalRange":"<1.0","conventionalUnit":"mg/24h","factor":"5.07","siRange":"<5","siUnit":"µmol/d","siValue":"5","usValue":"1.0"},{"name":"Metformin","specimen":"Serum","conventionalRange":"1-4","conventionalUnit":"µg/mL","factor":"7.742","siRange":"8-30","siUnit":"µmol/L","siValue":"8","usValue":"1"},{"name":"Methadone","specimen":"Serum, Plasma","conventionalRange":"100-400","conventionalUnit":"ng/mL","factor":"0.00323","siRange":"0.32-1.29","siUnit":"µmol/L","siValue":"0.32","usValue":"100"},{"name":"Methamphetamine","specimen":"Serum","conventionalRange":"0.01-0.05","conventionalUnit":"µg/mL","factor":"6.7","siRange":"0.07-0.34","siUnit":"µmol/L","siValue":"0.07","usValue":"0.01"},{"name":"Methanol","specimen":"Plasma","conventionalRange":"<200","conventionalUnit":"µg/mL","factor":"0.0312","siRange":"<6.2","siUnit":"mmol/L","siValue":"6.2","usValue":"200"},{"name":"Methaqualone","specimen":"Serum, Plasma","conventionalRange":"2-3","conventionalUnit":"µg/mL","factor":"4","siRange":"8-12","siUnit":"µmol/L","siValue":"8","usValue":"2"},{"name":"Methemoglobin","specimen":"Whole blood","conventionalRange":"<0.24","conventionalUnit":"g/dL","factor":"155","siRange":"<37.2","siUnit":"µmol/L","siValue":"37.2","usValue":"0.24"},{"name":"Methemoglobin","specimen":"Whole blood","conventionalRange":"<1.0","conventionalUnit":"% of total hemoglobin","factor":"0.01","siRange":"<0.01","siUnit":"Proportion of total hemoglobin","siValue":"0.01","usValue":"1.0"},{"name":"Methicillin","specimen":"Serum","conventionalRange":"8-25","conventionalUnit":"mg/L","factor":"2.636","siRange":"22-66","siUnit":"µmol/L","siValue":"22","usValue":"8"},{"name":"Methionine","specimen":"Plasma","conventionalRange":"0.1-0.6","conventionalUnit":"mg/dL","factor":"67.02","siRange":"6-40","siUnit":"µmol/L","siValue":"6","usValue":"0.1"},{"name":"Methotrexate","specimen":"Serum, Plasma","conventionalRange":"0.04-0.36","conventionalUnit":"mg/L","factor":"2200","siRange":"90-790","siUnit":"nmol/L","siValue":"90","usValue":"0.04"},{"name":"Methyldopa","specimen":"Plasma","conventionalRange":"1-5","conventionalUnit":"µg/mL","factor":"4.735","siRange":"5.0-25","siUnit":"µmol/L","siValue":"5.0","usValue":"1"},{"name":"Metoprolol","specimen":"Serum, Plasma","conventionalRange":"75-200","conventionalUnit":"ng/mL","factor":"3.74","siRange":"281-748","siUnit":"nmol/L","siValue":"281","usValue":"75"},{"name":"2 -Microglobulin","specimen":"Serum","conventionalRange":"1.2-2.8","conventionalUnit":"mg/L","factor":"1","siRange":"1.2-2.8","siUnit":"mg/L","siValue":"1.2","usValue":"1.2"},{"name":"Morphine","specimen":"Serum, Plasma","conventionalRange":"10-80","conventionalUnit":"ng/mL","factor":"3.504","siRange":"35-280","siUnit":"nmol/L","siValue":"35","usValue":"10"},{"name":"Myoglobin","specimen":"Serum","conventionalRange":"19-92","conventionalUnit":"µg/L","factor":"0.0571","siRange":"1.0-5.3","siUnit":"nmol/L","siValue":"1.0","usValue":"19"},{"name":"Naproxen","specimen":"Serum","conventionalRange":"26-70","conventionalUnit":"µg/mL","factor":"4.343","siRange":"115-300","siUnit":"µmol/L","siValue":"115","usValue":"26"},{"name":"Niacin (nicotinic acid)","specimen":"Urine","conventionalRange":"2.4-6.4","conventionalUnit":"mg/24h","factor":"7.3","siRange":"17.5-46.7","siUnit":"µmol/d","siValue":"17.5","usValue":"2.4"},{"name":"Nickel","specimen":"Whole blood","conventionalRange":"1.0-28.0","conventionalUnit":"µg/L","factor":"17.033","siRange":"17-476","siUnit":"nmol/L","siValue":"17","usValue":"1.0"},{"name":"Nicotine","specimen":"Plasma","conventionalRange":"0.01-0.05","conventionalUnit":"mg/L","factor":"6.164","siRange":"0.062-0.308","siUnit":"µmol/L","siValue":"0.062","usValue":"0.01"},{"name":"Nitrogen (nonprotein)","specimen":"Serum","conventionalRange":"20-35","conventionalUnit":"mg/dL","factor":"0.714","siRange":"14.3-25.0","siUnit":"mmol/L","siValue":"14.3","usValue":"20"},{"name":"Nitroprusside (as thiocyanate)","specimen":"","conventionalRange":"6-29","conventionalUnit":"µg/L","factor":"17.2","siRange":"103-500","siUnit":"µmol/L","siValue":"103","usValue":"6"},{"name":"Norepinephrine","specimen":"Plasma","conventionalRange":"110-410","conventionalUnit":"pg/mL","factor":"5.911","siRange":"650-2423","siUnit":"pmol/L","siValue":"650","usValue":"110"},{"name":"Nortriptyline","specimen":"Serum, Plasma","conventionalRange":"50-150","conventionalUnit":"ng/mL","factor":"3.797","siRange":"190-570","siUnit":"nmol/L","siValue":"190","usValue":"50"},{"name":"Ornithine","specimen":"Plasma","conventionalRange":"0.4-1.4","conventionalUnit":"mg/dL","factor":"75.666","siRange":"30-106","siUnit":"µmol/L","siValue":"30","usValue":"0.4"},{"name":"Osmolality","specimen":"Serum","conventionalRange":"275-295","conventionalUnit":"mOsm/kg","factor":"1","siRange":"275-295","siUnit":"mmol/kg","siValue":"275","usValue":"275"},{"name":"Osteocalcin","specimen":"Serum","conventionalRange":"3.0-13.0","conventionalUnit":"ng/mL","factor":"1","siRange":"3.0-13.0","siUnit":"µg/L","siValue":"3.0","usValue":"3.0"},{"name":"Oxalate","specimen":"Serum","conventionalRange":"1.0-2.4","conventionalUnit":"","factor":"11.107","siRange":"11-27","siUnit":"µmol/L","siValue":"11","usValue":"1.0"},{"name":"Oxazepam","specimen":"Serum, Plasma","conventionalRange":"0.2-1.4","conventionalUnit":"µg/mL","factor":"3.487","siRange":"0.7-4.9","siUnit":"µmol/L","siValue":"0.7","usValue":"0.2"},{"name":"Oxycodone","specimen":"Serum","conventionalRange":"10-100","conventionalUnit":"ng/mL","factor":"3.171","siRange":"32-317","siUnit":"nmol/L","siValue":"32","usValue":"10"},{"name":"Oxygen, partial pressure (Po 2 )","specimen":"Arterial blood","conventionalRange":"80-100","conventionalUnit":"mm Hg","factor":"0.133","siRange":"11-13","siUnit":"kPa","siValue":"11","usValue":"80"},{"name":"Paraquat","specimen":"Whole blood","conventionalRange":"0.1-1.6","conventionalUnit":"µg/mL","factor":"5.369","siRange":"0.5-8.5","siUnit":"µmol/L","siValue":"0.5","usValue":"0.1"},{"name":"Parathyroid hormone","specimen":"Serum","conventionalRange":"10-65","conventionalUnit":"pg/mL","factor":"1","siRange":"10-65","siUnit":"ng/L","siValue":"10","usValue":"10"},{"name":"Pentobarbital","specimen":"Serum, Plasma","conventionalRange":"1-5","conventionalUnit":"µg/mL","factor":"4.439","siRange":"4.0-22","siUnit":"µmol/L","siValue":"4.0","usValue":"1"},{"name":"Pepsinogen","specimen":"Serum","conventionalRange":"28-100","conventionalUnit":"ng/mL","factor":"1","siRange":"28-100","siUnit":"µg/L","siValue":"28","usValue":"28"},{"name":"Phencyclidine (toxic)","specimen":"Serum, Plasma","conventionalRange":"90-800","conventionalUnit":"ng/mL","factor":"4.109","siRange":"370-3288","siUnit":"nmol/L","siValue":"370","usValue":"90"},{"name":"Phenobarbital","specimen":"Serum, Plasma","conventionalRange":"15-40","conventionalUnit":"µg/mL","factor":"4.31","siRange":"65-172","siUnit":"µmol/L","siValue":"65","usValue":"15"},{"name":"Phenylalanine","specimen":"Plasma","conventionalRange":"0.6-1.5","conventionalUnit":"mg/dL","factor":"60.544","siRange":"35-90","siUnit":"µmol/L","siValue":"35","usValue":"0.6"},{"name":"Phenylpropanolamine","specimen":"Serum","conventionalRange":"0.05-0.10","conventionalUnit":"µg/mL","factor":"6613","siRange":"330-660","siUnit":"nmol/L","siValue":"330","usValue":"0.05"},{"name":"Phenytoin","specimen":"Serum, Plasma","conventionalRange":"10-20","conventionalUnit":"mg/L","factor":"3.968","siRange":"40-79","siUnit":"µmol/L","siValue":"40","usValue":"10"},{"name":"Phosphorus (inorganic)","specimen":"Serum","conventionalRange":"2.3-4.7","conventionalUnit":"mg/dL","factor":"0.323","siRange":"0.74-1.52","siUnit":"mmol/L","siValue":"0.74","usValue":"2.3"},{"name":"Placental lactogen","specimen":"Serum","conventionalRange":"0.5-1.1","conventionalUnit":"µg/mL","factor":"46.296","siRange":"23-509","siUnit":"nmol/L","siValue":"23","usValue":"0.5"},{"name":"Plasminogen (antigenic)","specimen":"Plasma","conventionalRange":"10-20","conventionalUnit":"mg/dL","factor":"0.113","siRange":"1.1-2.2","siUnit":"µmol/L","siValue":"1.1","usValue":"10"},{"name":"Plasminogen activator inhibitor","specimen":"Plasma","conventionalRange":"4-40","conventionalUnit":"ng/mL","factor":"19.231","siRange":"75-750","siUnit":"pmol/L","siValue":"75","usValue":"4"},{"name":"platelet","specimen":"Whole blood","conventionalRange":"150-350","conventionalUnit":"","factor":"1","siRange":"150-350","siUnit":"×109/L","siValue":"150","usValue":"150"},{"name":"Porphyrins (total)","specimen":"Urine","conventionalRange":"20-120","conventionalUnit":"µg/L","factor":"1.203","siRange":"25-144","siUnit":"nmol/L","siValue":"25","usValue":"20"},{"name":"Potassium","specimen":"Serum","conventionalRange":"3.5-5.0","conventionalUnit":"mEq/L","factor":"1","siRange":"3.5-5.0","siUnit":"mmol/L","siValue":"3.5","usValue":"3.5"},{"name":"Prealbumin","specimen":"Serum","conventionalRange":"19.5-35.8","conventionalUnit":"mg/dL","factor":"10","siRange":"195-358","siUnit":"mg/L","siValue":"195","usValue":"19.5"},{"name":"Pregnanediol","specimen":"Urine","conventionalRange":"<2.6","conventionalUnit":"","factor":"3.12","siRange":"<8","siUnit":"µmol/d","siValue":"8","usValue":"2.6"},{"name":"Pregnanetriol","specimen":"Urine","conventionalRange":"<2.5","conventionalUnit":"","factor":"2.972","siRange":"<7.5","siUnit":"µmol/d","siValue":"7.5","usValue":"2.5"},{"name":"Primidone","specimen":"Serum, Plasma","conventionalRange":"5-12","conventionalUnit":"µg/mL","factor":"4.582","siRange":"23-55","siUnit":"µmol/L","siValue":"23","usValue":"5"},{"name":"Procainamide","specimen":"Serum, Plasma","conventionalRange":"4-10","conventionalUnit":"µg/mL","factor":"4.25","siRange":"17-42","siUnit":"µmol/L","siValue":"17","usValue":"4"},{"name":"Progesterone","specimen":"Serum","conventionalRange":"0.15-25","conventionalUnit":"ng/mL","factor":"3.18","siRange":"0.5-79.5","siUnit":"nmol/L","siValue":"0.5","usValue":"0.15"},{"name":"Prolactin","specimen":"Serum","conventionalRange":"3.8-23.2","conventionalUnit":"µg/L","factor":"43.478","siRange":"165-1010","siUnit":"pmol/L","siValue":"165","usValue":"3.8"},{"name":"Proline","specimen":"Plasma","conventionalRange":"1.2-3.9","conventionalUnit":"mg/dL","factor":"86.858","siRange":"104-340","siUnit":"µmol/L","siValue":"104","usValue":"1.2"},{"name":"Propoxyphene","specimen":"Plasma","conventionalRange":"0.1-0.4","conventionalUnit":"µg/mL","factor":"2.946","siRange":"0.3-1.2","siUnit":"µmol/L","siValue":"0.3","usValue":"0.1"},{"name":"Propranolol","specimen":"Serum","conventionalRange":"50-100","conventionalUnit":"ng/mL","factor":"3.856","siRange":"193-386","siUnit":"nmol/L","siValue":"193","usValue":"50"},{"name":"Prostate-specific antigen","specimen":"Serum","conventionalRange":"<4.0","conventionalUnit":"µg/L","factor":"1","siRange":"<4.0","siUnit":"µg/L","siValue":"4.0","usValue":"4.0"},{"name":"Protein (total)","specimen":"Serum","conventionalRange":"6.0-8.0","conventionalUnit":"g/dL","factor":"10","siRange":"60-80","siUnit":"g/L","siValue":"60","usValue":"6.0"},{"name":"Prothrombin time (PT)","specimen":"Plasma","conventionalRange":"10-13","conventionalUnit":"s","factor":"1","siRange":"10-13","siUnit":"s","siValue":"10","usValue":"10"},{"name":"Protoporphyrin","specimen":"Serum, Plasma","conventionalRange":"15-150","conventionalUnit":"µg/dL","factor":"0.0178","siRange":"0.27-0.89","siUnit":"µmol/L","siValue":"0.27","usValue":"15"},{"name":"Protriptyline","specimen":"Serum, Plasma","conventionalRange":"70-250","conventionalUnit":"µg/dL","factor":"3.787","siRange":"266-950","siUnit":"nmol/L","siValue":"266","usValue":"70"},{"name":"Pyruvate","specimen":"Plasma","conventionalRange":"0.5-1.5","conventionalUnit":"mg/dL","factor":"113.56","siRange":"60-170","siUnit":"µmol/L","siValue":"60","usValue":"0.5"},{"name":"Quinidine","specimen":"Serum","conventionalRange":"2.0-5.0","conventionalUnit":"µg/mL","factor":"3.082","siRange":"6.2-15.4","siUnit":"µmol/L","siValue":"6.2","usValue":"2.0"},{"name":"Red blood cell count","specimen":"Whole blood","conventionalRange":"3.9-5.5","conventionalUnit":"","factor":"1","siRange":"3.9-5.5","siUnit":"×1012/L","siValue":"3.9","usValue":"3.9"},{"name":"Renin","specimen":"Plasma","conventionalRange":"30-40","conventionalUnit":"pg/mL","factor":"0.0237","siRange":"0.7-1.0","siUnit":"pmol/L","siValue":"0.7","usValue":"30"},{"name":"Reticulocyte count","specimen":"Whole blood","conventionalRange":"25-75","conventionalUnit":"","factor":"1","siRange":"25-75","siUnit":"×109/L","siValue":"25","usValue":"25"},{"name":"Reticulocyte count","specimen":"Whole blood","conventionalRange":"0.5-1.5","conventionalUnit":"","factor":"0.01","siRange":"0.005-0.015","siUnit":"Proportion of red blood cells","siValue":"0.005","usValue":"0.5"},{"name":"Rifampin","specimen":"Serum","conventionalRange":"4-40","conventionalUnit":"mg/L","factor":"1.215","siRange":"5-49","siUnit":"µmol/L","siValue":"5","usValue":"4"},{"name":"Salicylates","specimen":"Serum, Plasma","conventionalRange":"150-300","conventionalUnit":"µg/mL","factor":"7.24","siRange":"1086-2172","siUnit":"µmol/L","siValue":"1086","usValue":"150"},{"name":"Selenium","specimen":"Serum, Plasma","conventionalRange":"58-234","conventionalUnit":"µg/L","factor":"0.0127","siRange":"0.74-2.97","siUnit":"µmol/L","siValue":"0.74","usValue":"58"},{"name":"Serine","specimen":"Plasma","conventionalRange":"0.7-2.0","conventionalUnit":"mg/dL","factor":"95.156","siRange":"65-193","siUnit":"µmol/L","siValue":"65","usValue":"0.7"},{"name":"Serotonin (5-hydroxytryptamine)","specimen":"Whole blood","conventionalRange":"50-200","conventionalUnit":"ng/mL","factor":"0.00568","siRange":"0.28-1.14","siUnit":"µmol/L","siValue":"0.28","usValue":"50"},{"name":"Sex hormone-binding globulin","specimen":"Serum","conventionalRange":"1.5-2.0","conventionalUnit":"µg/mL","factor":"8.896","siRange":"13-17","siUnit":"nmol/L","siValue":"13","usValue":"1.5"},{"name":"Sodium","specimen":"Serum","conventionalRange":"136-142","conventionalUnit":"mEq/L","factor":"1","siRange":"136-142","siUnit":"mmol/L","siValue":"136","usValue":"136"},{"name":"Somatomedin C (Insulinlike growth factor)","specimen":"Serum","conventionalRange":"130-450","conventionalUnit":"ng/mL","factor":"0.131","siRange":"18-60","siUnit":"nmol/L","siValue":"18","usValue":"130"},{"name":"Somatostatin","specimen":"Plasma","conventionalRange":"<25","conventionalUnit":"pg/mL","factor":"0.611","siRange":"<15","siUnit":"pmol/L","siValue":"15","usValue":"25"},{"name":"Streptomycin","specimen":"Serum","conventionalRange":"7-50","conventionalUnit":"mg/L","factor":"1.719","siRange":"12-86","siUnit":"µmol/L","siValue":"12","usValue":"7"},{"name":"Strychnine","specimen":"Whole blood","conventionalRange":"<0.5","conventionalUnit":"mg/L","factor":"2.99","siRange":"<1.5","siUnit":"µmol/L","siValue":"1.5","usValue":"0.5"},{"name":"Substance P","specimen":"Plasma","conventionalRange":"<240","conventionalUnit":"pg/mL","factor":"0.742","siRange":"<180","siUnit":"pmol/L","siValue":"180","usValue":"240"},{"name":"Sulfate","specimen":"Serum","conventionalRange":"10-32","conventionalUnit":"mg/L","factor":"31.188","siRange":"310-990","siUnit":"µmol/L","siValue":"310","usValue":"10"},{"name":"Sulfmethemoglobin","specimen":"Whole blood","conventionalRange":"<1.0","conventionalUnit":"% of total hemoglobin","factor":"0.01","siRange":"<0.010","siUnit":"Proportion of total hemoglobin","siValue":"0.010","usValue":"1.0"},{"name":"Taurine","specimen":"Plasma","conventionalRange":"0.3-2.1","conventionalUnit":"mg/dL","factor":"79.91","siRange":"24-168","siUnit":"µmol/L","siValue":"24","usValue":"0.3"},{"name":"Testosterone","specimen":"Serum","conventionalRange":"300-1200","conventionalUnit":"ng/dL","factor":"0.0347","siRange":"10.4-41.6","siUnit":"nmol/L","siValue":"10.4","usValue":"300"},{"name":"Tetrahydrocannabinol","specimen":"Serum","conventionalRange":"<0.20","conventionalUnit":"µg/mL","factor":"3.18","siRange":"<0.60","siUnit":"µmol/L","siValue":"0.60","usValue":"0.20"},{"name":"Theophylline","specimen":"Serum, Plasma","conventionalRange":"10-20","conventionalUnit":"µg/mL","factor":"5.55","siRange":"56-111","siUnit":"µmol/L","siValue":"56","usValue":"10"},{"name":"Thiopental","specimen":"Serum, Plasma","conventionalRange":"1-5","conventionalUnit":"µg/mL","factor":"4.144","siRange":"4.1-20.7","siUnit":"µmol/L","siValue":"4.1","usValue":"1"},{"name":"Thioridazine","specimen":"Serum, Plasma","conventionalRange":"1.0-1.5","conventionalUnit":"µg/mL","factor":"2.699","siRange":"2.7-4.1","siUnit":"µmol/L","siValue":"2.7","usValue":"1.0"},{"name":"Threonine","specimen":"Plasma","conventionalRange":"0.9-2.5","conventionalUnit":"mg/dL","factor":"84","siRange":"75-210","siUnit":"µmol/L","siValue":"75","usValue":"0.9"},{"name":"Thrombin time","specimen":"Plasma","conventionalRange":"16-24","conventionalUnit":"s","factor":"1","siRange":"16-24","siUnit":"s","siValue":"16","usValue":"16"},{"name":"Thyroglobulin","specimen":"Serum","conventionalRange":"3-42","conventionalUnit":"ng/mL","factor":"1","siRange":"3-42","siUnit":"µg/L","siValue":"3","usValue":"3"},{"name":"Thyrotropin","specimen":"Serum","conventionalRange":"0.4-4.2","conventionalUnit":"ng/mL","factor":"1","siRange":"0.4-4.2","siUnit":"mIU/L","siValue":"0.4","usValue":"0.4"},{"name":"Thyroxine, free (FT 4 )","specimen":"Serum","conventionalRange":"0.9-2.3","conventionalUnit":"ng/dL","factor":"12.871","siRange":"12-30","siUnit":"pmol/L","siValue":"12","usValue":"0.9"},{"name":"Thyroxine, total (T 4 )","specimen":"Serum","conventionalRange":"5.5-12.5","conventionalUnit":"µg/dL","factor":"12.871","siRange":"71-160","siUnit":"nmol/L","siValue":"71","usValue":"5.5"},{"name":"Thyroxine-binding globulin","specimen":"Serum","conventionalRange":"16.0-24.0","conventionalUnit":"µg/mL","factor":"17.094","siRange":"206-309","siUnit":"nmol/L","siValue":"206","usValue":"16.0"},{"name":"Tissue plasminogen activator","specimen":"Plasma","conventionalRange":"<0.04","conventionalUnit":"IU/mL","factor":"1000","siRange":"<40","siUnit":"IU/L","siValue":"40","usValue":"0.04"},{"name":"Tobramycin","specimen":"Serum, Plasma","conventionalRange":"5-10","conventionalUnit":"µg/mL","factor":"2.139","siRange":"10-21","siUnit":"µmol/L","siValue":"10","usValue":"5"},{"name":"Tocainide","specimen":"Serum","conventionalRange":"4-10","conventionalUnit":"µg/mL","factor":"5.201","siRange":"21-52","siUnit":"µmol/L","siValue":"21","usValue":"4"},{"name":"Tolbutamide","specimen":"Serum","conventionalRange":"80-240","conventionalUnit":"µg/mL","factor":"3.7","siRange":"296-888","siUnit":"µmol/L","siValue":"296","usValue":"80"},{"name":"Transferrin","specimen":"Serum","conventionalRange":"200-400","conventionalUnit":"mg/dL","factor":"0.123","siRange":"2.5-5.0","siUnit":"µmol/L","siValue":"2.5","usValue":"200"},{"name":"Triglycerides","specimen":"Serum","conventionalRange":"<160","conventionalUnit":"mg/dL","factor":"0.0113","siRange":"1.8","siUnit":"mmol/L","siValue":"1.8","usValue":"160"},{"name":"Triiodothyronine, free (FT3)","specimen":"Serum","conventionalRange":"130-450","conventionalUnit":"","factor":"0.0154","siRange":"2.0-7.0","siUnit":"pmol/L","siValue":"2.0","usValue":"130"},{"name":"Triiodothyronine, total (T3)","specimen":"Serum","conventionalRange":"60-180","conventionalUnit":"ng/dL","factor":"0.0154","siRange":"0.92-2.76","siUnit":"nmol/L","siValue":"0.92","usValue":"60"},{"name":"Troponin I","specimen":"Serum","conventionalRange":"0-0.4","conventionalUnit":"ng/mL","factor":"1","siRange":"0-0.4","siUnit":"µg/L","siValue":"0","usValue":"0"},{"name":"Troponin T","specimen":"Serum","conventionalRange":"0-0.1","conventionalUnit":"ng/mL","factor":"1","siRange":"0-0.1","siUnit":"µg/L","siValue":"0","usValue":"0"},{"name":"Tryptophan","specimen":"Plasma","conventionalRange":"0.5-1.5","conventionalUnit":"mg/dL","factor":"48.967","siRange":"25-73","siUnit":"µmol/L","siValue":"25","usValue":"0.5"},{"name":"Tyrosine","specimen":"Plasma","conventionalRange":"0.4-1.6","conventionalUnit":"mg/dL","factor":"55.19","siRange":"20-90","siUnit":"µmol/L","siValue":"20","usValue":"0.4"},{"name":"Urea nitrogen","specimen":"Serum","conventionalRange":"8-23","conventionalUnit":"mg/dL","factor":"0.357","siRange":"2.9-8.2","siUnit":"mmol/L","siValue":"2.9","usValue":"8"},{"name":"Uric acid","specimen":"Serum","conventionalRange":"4.0-8.0","conventionalUnit":"mg/dL","factor":"59.485","siRange":"240-480","siUnit":"µmol/L","siValue":"240","usValue":"4.0"},{"name":"Urobilinogen","specimen":"Urine","conventionalRange":"1-3.5","conventionalUnit":"mg/24h","factor":"1.7","siRange":"1.7-5.9","siUnit":"µmol/d","siValue":"1.7","usValue":"1"},{"name":"Valine","specimen":"Plasma","conventionalRange":"1.7-3.7","conventionalUnit":"mg/dL","factor":"85.361","siRange":"145-315","siUnit":"µmol/L","siValue":"145","usValue":"1.7"},{"name":"Valproic acid","specimen":"Serum, Plasma","conventionalRange":"50-100","conventionalUnit":"µg/mL","factor":"6.934","siRange":"346-693","siUnit":"µmol/L","siValue":"346","usValue":"50"},{"name":"Vancomycin","specimen":"Serum, Plasma","conventionalRange":"20-40","conventionalUnit":"µg/mL","factor":"0.69","siRange":"14-28","siUnit":"µmol/L","siValue":"14","usValue":"20"},{"name":"Vanillylmandelic acid (VMA)","specimen":"Urine","conventionalRange":"2.1-7.6","conventionalUnit":"mg/24h","factor":"5.046","siRange":"11-38","siUnit":"µmol/d","siValue":"11","usValue":"2.1"},{"name":"Vasoactive intestinal polypeptide","specimen":"Plasma","conventionalRange":"<50","conventionalUnit":"pg/mL","factor":"0.296","siRange":"<15","siUnit":"pmol/L","siValue":"15","usValue":"50"},{"name":"Vasopressin","specimen":"Plasma","conventionalRange":"1.5-2.0","conventionalUnit":"pg/mL","factor":"0.923","siRange":"1.0-2.0","siUnit":"pmol/L","siValue":"1.0","usValue":"1.5"},{"name":"Verapamil","specimen":"Serum, Plasma","conventionalRange":"100-500","conventionalUnit":"ng/mL","factor":"2.2","siRange":"220-1100","siUnit":"nmol/L","siValue":"220","usValue":"100"},{"name":"Vitamin A (retinol)","specimen":"Serum","conventionalRange":"30-80","conventionalUnit":"µg/dL","factor":"0.0349","siRange":"1.05-2.80","siUnit":"µmol/L","siValue":"1.05","usValue":"30"},{"name":"vitaminb1","specimen":"Serum","conventionalRange":"0-2","conventionalUnit":"µg/dL","factor":"29.6","siRange":"0-75","siUnit":"nmol/L","siValue":"0","usValue":"0"},{"name":"vitaminb2","specimen":"Serum","conventionalRange":"4-24","conventionalUnit":"µg/dL","factor":"26.6","siRange":"106-638","siUnit":"nmol/L","siValue":"106","usValue":"4"},{"name":"Vitamin B3","specimen":"Whole blood","conventionalRange":"0.2-1.8","conventionalUnit":"µg/mL","factor":"4.56","siRange":"0.9-8.2","siUnit":"µmol/L","siValue":"0.9","usValue":"0.2"},{"name":"vitaminb6","specimen":"Plasma","conventionalRange":"5-30","conventionalUnit":"ng/mL","factor":"4.046","siRange":"20-121","siUnit":"nmol/L","siValue":"20","usValue":"5"},{"name":"Vitamin B12","specimen":"Serum","conventionalRange":"160-950","conventionalUnit":"pg/mL","factor":"0.7378","siRange":"118-701","siUnit":"pmol/L","siValue":"118","usValue":"160"},{"name":"vitaminc","specimen":"Serum","conventionalRange":"0.4-1.5","conventionalUnit":"mg/dL","factor":"56.78","siRange":"23-85","siUnit":"µmol/L","siValue":"23","usValue":"0.4"},{"name":"vitamind","specimen":"Serum","conventionalRange":"25-45","conventionalUnit":"pg/mL","factor":"2.6","siRange":"60-108","siUnit":"pmol/L","siValue":"60","usValue":"25"},{"name":"Vitamin D (25-hydroxyvitamin D)","specimen":"Plasma","conventionalRange":"14-60","conventionalUnit":"ng/mL","factor":"2.496","siRange":"35-150","siUnit":"nmol/L","siValue":"35","usValue":"14"},{"name":"vitamine","specimen":"Serum","conventionalRange":"5-18","conventionalUnit":"µg/mL","factor":"2.32","siRange":"12-42","siUnit":"µmol/L","siValue":"12","usValue":"5"},{"name":"Vitamin K","specimen":"Serum","conventionalRange":"0.13-1.19","conventionalUnit":"ng/mL","factor":"2.22","siRange":"0.29-2.64","siUnit":"nmol/L","siValue":"0.29","usValue":"0.13"},{"name":"Warfarin","specimen":"Serum, Plasma","conventionalRange":"1.0-10","conventionalUnit":"µg/mL","factor":"3.247","siRange":"3.2-32.4","siUnit":"µmol/L","siValue":"3.2","usValue":"1.0"},{"name":"White Blood Cell","specimen":"Whole blood","conventionalRange":"4500-11000","conventionalUnit":"","factor":"0.001","siRange":"4.5-11.0","siUnit":"×109/L","siValue":"4.5","usValue":"4500"},{"name":"Neutrophils-segmented","specimen":"Whole blood","conventionalRange":"1800-7800","conventionalUnit":"","factor":"0.001","siRange":"1.8-7.8","siUnit":"×109/L","siValue":"1.8","usValue":"1800"},{"name":"Neutrophils-bands","specimen":"Whole blood","conventionalRange":"0-700","conventionalUnit":"","factor":"0.001","siRange":"0-0.70","siUnit":"×109/L","siValue":"0","usValue":"0"},{"name":"Lymphocytes","specimen":"Whole blood","conventionalRange":"1000-4800","conventionalUnit":"","factor":"0.001","siRange":"1.0-4.8","siUnit":"×109/L","siValue":"1.0","usValue":"1000"},{"name":"Monocytes","specimen":"Whole blood","conventionalRange":"0-800","conventionalUnit":"","factor":"0.001","siRange":"0-0.80","siUnit":"×109/L","siValue":"0","usValue":"0"},{"name":"Eosinophils","specimen":"Whole blood","conventionalRange":"0-450","conventionalUnit":"","factor":"0.001","siRange":"0-0.45","siUnit":"×109/L","siValue":"0","usValue":"0"},{"name":"Basophils %","specimen":"Whole blood","conventionalRange":"0-200","conventionalUnit":"","factor":"0.001","siRange":"0-0.20","siUnit":"×109/L","siValue":"0","usValue":"0"},{"name":"Neutrophils-segmented %","specimen":"Whole blood","conventionalRange":"56","conventionalUnit":"%","factor":"0.01","siRange":"0.56","siUnit":"Proportion of 1.0","siValue":"0.56","usValue":"56"},{"name":"Neutrophils-bands %","specimen":"Whole blood","conventionalRange":"3","conventionalUnit":"%","factor":"0.01","siRange":"0.03","siUnit":"Proportion of 1.0","siValue":"0.03","usValue":"3"},{"name":"Lymphocytes %","specimen":"Whole blood","conventionalRange":"34","conventionalUnit":"%","factor":"0.01","siRange":"0.34","siUnit":"Proportion of 1.0","siValue":"0.34","usValue":"34"},{"name":"Monocytes %","specimen":"Whole blood","conventionalRange":"4","conventionalUnit":"%","factor":"0.01","siRange":"0.04","siUnit":"Proportion of 1.0","siValue":"0.04","usValue":"4"},{"name":"Eosinophils %","specimen":"Whole blood","conventionalRange":"2.7","conventionalUnit":"%","factor":"0.01","siRange":"0.027","siUnit":"Proportion of 1.0","siValue":"0.027","usValue":"2.7"},{"name":"Basophils %","specimen":"Whole blood","conventionalRange":"0.3","conventionalUnit":"%","factor":"0.01","siRange":"0.003","siUnit":"Proportion of 1.0","siValue":"0.003","usValue":"0.3"},{"name":"Zidovudine","specimen":"Serum, Plasma","conventionalRange":"0.15-0.27","conventionalUnit":"µg/mL","factor":"3.7","siRange":"0.56-1.01","siUnit":"µmol/L","siValue":"0.56","usValue":"0.15"},{"name":"Zinc","specimen":"Serum","conventionalRange":"75-120","conventionalUnit":"µg/dL","factor":"0.153","siRange":"11.5-18.5","siUnit":"µmol/L","siValue":"11.5","usValue":"75"}];
  

 	let prefix = '';

	let filteredUnits =  units;

	return `${($$result.head += `<title>medicalunitconverter.com</title><meta name="description" content="Medical unit conversion calculator, medicalunitconverter.com. Convert US units to International (SI) units easily with this onlne calculator. Easily search for a specific lab test, enter any value and convert the units. For both Human and Veterinary values."><script async src="https://www.googletagmanager.com/gtag/js?id=UA-255701-18"></script><script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());

	  gtag('config', 'UA-255701-18');
	</script>`, "")}














	  <div class="container mx-auto  px-1">

	  


	 <div class="md:w-1/4 mb-3 sm:w-1/3 text-black p-1">Search Units <input placeholder="Unit" class="mt-1 block w-full  text-gray-700 border border-gray-300 rounded-lg py-2 px-2 leading-tight bg-white  focus:outline-none focus:bg-white focus:border-gray-500" type="search"${add_attribute("value", prefix, 1)}></div>


	  ${each(filteredUnits, (unit, i) => `<div class="border border-gray-300 rounded mb-2">


	 <div class="flex flex-wrap md:flex-no-wrap lg:flex-no-wrap px-1  mb-1">
	 <div class="w-full md:w-2/5">
	            
	              <div class="font-bold text-black ">${escape(unit.name)}</div>
	             <div class="text-gray-700 text-md">${validate_component(Fa, 'Fa').$$render($$result, {
		class: "inline",
		secondaryColor: "red",
		icon: proDuotoneSvgIcons.faVial
	}, {}, {})}  Specimen: ${escape(unit.specimen)} </div>
	         <div class="text-gray-700 text-sm">${validate_component(Fa, 'Fa').$$render($$result, { class: "inline", icon: proDuotoneSvgIcons.faCalculator }, {}, {})}  Conversion Factor: ${escape(unit.factor)} </div>
	            
	  </div>
	  <div class="md:w-1/3 w-1/2   h-14 pr-1 pl-1">
	  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" for="grid-first-name">
	       ${validate_component(Fa, 'Fa').$$render($$result, {
		class: "inline",
		size: "lg",
		primaryColor: "blue",
		secondaryColor: "red",
		icon: proDuotoneSvgIcons.faFlagUsa
	}, {}, {})} US
	      </label>
	               <input class="appearance-none mt-1 block w-full bg-blue-100 text-gray-700 border border-blue-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"${add_attribute("value", unit.usValue, 0)} type="number" placeholder=" US">
	<div class="text-gray-700 text-sm">US Range:${escape(unit.conventionalRange)} ${escape(unit.conventionalUnit)}</div>
	             </div>

	 <div class="md:w-1/3 w-1/2   h-14 pr-1 pl-1">
	 <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" for="grid-first-name">
	        ${validate_component(Fa, 'Fa').$$render($$result, {
		class: "inline",
		size: "lg",
		primaryColor: "green",
		secondaryColor: "lightblue",
		icon: proDuotoneSvgIcons.faGlobe
	}, {}, {})} International
	      </label>
	               <input class="appearance-none mt-1 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"${add_attribute("value", unit.siValue, 0)} type="number" placeholder="SI">
	<div class="text-gray-700 text-sm">SI Range: ${escape(unit.siRange)} ${escape(unit.siUnit)} </div>
	             </div>

	 
	 
	 
	 </div> 
	</div>`)}
	  
	   
	   
	   

	    

	  
	   </div>
	<footer class="w-full text-center border-t border-grey p-4 pin-b">
	            www.medicalunitconverter.com
	        </footer>`;
});

/* src/routes/contact.svelte generated by Svelte v3.12.1 */

const Contact = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `${($$result.head += `<title>About</title>`, "")}

	<h1>Contact</h1>

	<p>This is the 'about' page. There's not much here.</p>

	<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
	  <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"></path></svg>
	  <span>Download</span>
	</button>

	<footer class="w-full text-center border-t border-grey p-4 pin-b">
	            www.medicalunitconverter.com
	        </footer>`;
});

/* src/routes/metric.svelte generated by Svelte v3.12.1 */

const Metric = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	

  let units = [{"usValue":"","siValue":"","usAbbr":"in","conventionalUnit":"inches","factor":"2.54","siUnit":"centimeters","siAbbr":"cm"},{"usValue":"","siValue":"","usAbbr":"ft","conventionalUnit":"feet","factor":"30","siUnit":"centimeters","siAbbr":"cm"},{"usValue":"","siValue":"","usAbbr":"ft","conventionalUnit":"feet","factor":"0.3","siUnit":"meters","siAbbr":"m"},{"usValue":"","siValue":"","usAbbr":"yd","conventionalUnit":"yards","factor":"0.9","siUnit":"meters","siAbbr":"m"},{"usValue":"","siValue":"","usAbbr":"miles","conventionalUnit":"miles","factor":"1.6","siUnit":"kilometers","siAbbr":"km"},{"usValue":"","siValue":"","usAbbr":"sq in","conventionalUnit":"square inches","factor":"6.5","siUnit":"square centimeters","siAbbr":"cm<sup>2</sup>"},{"usValue":"","siValue":"","usAbbr":"sq ft","conventionalUnit":"square feet","factor":"0.09","siUnit":"square meters","siAbbr":"m<sup>2</sup>"},{"usValue":"","siValue":"","usAbbr":"sq yd","conventionalUnit":"square yard","factor":"0.8","siUnit":"square meters","siAbbr":"m<sup>2</sup>"},{"usValue":"","siValue":"","usAbbr":"sq miles","conventionalUnit":"square miles","factor":"2.6","siUnit":"square kilometers","siAbbr":"km<sup>2</sup>"},{"usValue":"","siValue":"","usAbbr":"oz","conventionalUnit":"ounces","factor":"28","siUnit":"grams","siAbbr":"g"},{"usValue":"","siValue":"","usAbbr":"lb","conventionalUnit":"pounds","factor":"0.45","siUnit":"kilograms","siAbbr":"kg"},{"usValue":"","siValue":"","usAbbr":"tsp","conventionalUnit":"teaspoons","factor":"5","siUnit":"milliliters","siAbbr":"mL"},{"usValue":"","siValue":"","usAbbr":"tbsp","conventionalUnit":"tablespoons","factor":"15","siUnit":"milliliters","siAbbr":"mL"},{"usValue":"","siValue":"","usAbbr":"fl oz","conventionalUnit":"fluid ounces","factor":"30","siUnit":"milliliters","siAbbr":"mL"},{"usValue":"","siValue":"","usAbbr":"c","conventionalUnit":"cups","factor":"0.24","siUnit":"liters","siAbbr":"L"},{"usValue":"","siValue":"","usAbbr":"pt","conventionalUnit":"US pints","factor":"0.47","siUnit":"liters","siAbbr":"L"},{"usValue":"","siValue":"","usAbbr":"qt","conventionalUnit":"US quarts","factor":"0.95","siUnit":"liters","siAbbr":"L"},{"usValue":"","siValue":"","usAbbr":"gal","conventionalUnit":"US gallons","factor":"3.8","siUnit":"liters","siAbbr":"L"},{"usValue":"","siValue":"","usAbbr":"cu ft","conventionalUnit":"cubic feet","factor":"0.03","siUnit":"cubic meters","siAbbr":"m<sup>3</sup>"},{"usValue":"","siValue":"","usAbbr":"cu yd","conventionalUnit":"cubic yard","factor":"0.76","siUnit":"cubic meters","siAbbr":"m<sup>3</sup>"}];
  


	let prefix = '';

	let filteredUnits =  units;

	return `${($$result.head += `<title>medicalunitconverter.com</title><meta name="description" content="Medical unit conversion calculator, medicalunitconverter.com. Convert US units to International (SI) units easily with this onlne calculator. Easily search for a specific lab test, enter any value and convert the units. For both Human and Veterinary values."><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><script async src="https://www.googletagmanager.com/gtag/js?id=UA-255701-18"></script><script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());

	  gtag('config', 'UA-255701-18');
	</script>`, "")}














	  <div class="container mx-1  px-1">

	  




	 <div class="md:w-1/4 mb-3 sm:w-1/3 text-black p-1">Search Units <input placeholder="Unit" class="mt-1 block w-full  text-gray-700 border border-gray-300 rounded-lg py-2 px-2 leading-tight bg-white  focus:outline-none focus:bg-white focus:border-gray-500" type="search"${add_attribute("value", prefix, 1)}></div>


	  ${each(filteredUnits, (unit, i) => `<div class="border border-gray-300 rounded mb-2">


	 <div class="flex flex-wrap md:flex-no-wrap lg:flex-no-wrap px-1  mb-1">
	 <div class="w-full md:w-2/5">
	            
	              <div class="font-bold text-black text-lg">${escape(unit.conventionalUnit)} ${validate_component(Fa, 'Fa').$$render($$result, {
		class: "inline text-gray-700",
		size: "lg",
		icon: proDuotoneSvgIcons.faArrowsAltH
	}, {}, {})} ${escape(unit.siUnit)}</div>
	            
	         <div class="text-gray-700 text-md">${validate_component(Fa, 'Fa').$$render($$result, {
		class: "inline",
		size: "sm",
		icon: proDuotoneSvgIcons.faCalculator
	}, {}, {})}  Conversion Factor: ${escape(unit.factor)} </div>
	            
	  </div>
	  <div class="md:w-1/3 w-1/2  h-14 pr-1 pl-1">
	  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" for="grid-first-name">
	       ${validate_component(Fa, 'Fa').$$render($$result, {
		class: "inline",
		size: "lg",
		primaryColor: "blue",
		secondaryColor: "red",
		icon: proDuotoneSvgIcons.faFlagUsa
	}, {}, {})} US 
	      </label>
	               <input class="appearance-none mt-1 block w-full bg-blue-100 text-gray-700 border border-blue-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="us${escape(i)}"${add_attribute("value", unit.usValue, 0)} type="number" placeholder=" ">
	<div class="text-gray-700 text-sm">${escape(unit.conventionalUnit)}</div>
	             </div>

	 <div class="md:w-1/3 w-1/2  h-14 pr-1 pl-1">
	 <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" for="grid-first-name">
	        ${validate_component(Fa, 'Fa').$$render($$result, {
		class: "inline",
		size: "lg",
		primaryColor: "green",
		secondaryColor: "lightblue",
		icon: proDuotoneSvgIcons.faGlobe
	}, {}, {})} International 
	      </label>
	               <input class="appearance-none mt-1 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="si${escape(i)}"${add_attribute("value", unit.siValue, 0)} type="number" placeholder=" ">
	<div class="text-gray-700 text-sm">${escape(unit.siUnit)} </div>
	             </div>

	 
	 
	 
	 </div> 
	</div>`)}
	  
	   
	   
	   

	    

	  
	   </div>
	<footer class="w-full text-center border-t border-grey p-4 pin-b">
	            www.medicalunitconverter.com
	        </footer>`;
});

/* src/routes/about.svelte generated by Svelte v3.12.1 */

const About = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `${($$result.head += `<title>About Unit Conversion</title>`, "")}

	<h1 class="text-3xl mb-2">About Unit Conversion</h1>
	<p class="mb-">The Système Internationale d’Unites (SI), or the International System of Units was recommended for use in the health professions by the World Health Assembly in 1977. This system is slowly being adopted in the United States and many journals now require its use.</p>
	<p class="mb-2">Medical Unit Converter easily converts  between US and International Human and Veterinary Medical lab values and Metric values. Enter a value in either the US or International input area and it will immediately be converted. Easily search for individual lab tests by typing in the name of the test. </p>
	<p class=""> The laboratory values and reference ranges are provided for illustration only and are not intended to be comprehensive or definitive. Each laboratory determines its own values, and reference ranges are highly method dependent.</p>
	 Sources: 
	 <p class="font-bold">Human References</p>
	 <ol style="list-style-type: decimal;">
		 <li> Kratz A, Ferraro M, Sluss PM, Lewandrowski KB. Laboratory reference values. N Engl J Med. 2004;351(15):1548-1563</li>
		 <li> Young DS, Huth EJ. SI Units for Clinical Measurement. Philadelphia, PA: American College of Physicians; 1998</li>
		 <li> Henry JB, ed. Clinical Diagnosis and Management by Laboratory Methods. 20th ed. Philadelphia, PA: WB Saunders; 2001</li>
		 <li>Kasper DL, Braunwald E, Fauci AS, et al, eds. Harrison's Principles of Internal Medicine, 16th ed. New York, NY: McGraw Hill; 2004</li>
		 <li>Goldman L, Ausiello D. Cecil Textbook of Medicine. 22nd ed. Philadelphia, PA: WB Saunders; 2004</li>
	 </ol>
	 <p class="font-bold">Veterinary References</p>
	 <ol style="list-style-type: decimal;">
		 <li>Latimer KS, Duncan &amp; Prasse’s Veterinary Laboratory Medicine: Clinical Pathology, 5th Ed., Wiley-Blackwell, 2011</li>
		 <li>Kaneko JJ, Harvey JW, Bruss ML, Clinical Biochemistry of Domestic Animals, 6th Ed., Academic Press, 2008</li>

	 </ol>
	 <footer class="w-full text-center border-t border-grey p-4 pin-b">
	            www.medicalunitconverter.com
	        </footer>`;
});

/* src/routes/legal.svelte generated by Svelte v3.12.1 */

const Legal = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `${($$result.head += `<title>About</title>`, "")}

	<h1 class="md:text-3xl mb-2">Legal Notices and Disclaimer
	</h1>

	<p>All information contained in and produced by medicalunitconverter.com is provided for educational purposes only. This information should not be used for the diagnosis or treatment of any health problem or disease. THIS INFORMATION IS NOT INTENDED TO REPLACE CLINICAL JUDGMENT OR GUIDE INDIVIDUAL PATIENT CARE in any manner. The User is hereby notified that the information contained herein may not meet the user's needs. The User is advised that, although the information is derived from medical research and literature we cannot guarantee its correctness, comprehensiveness or currency. The User of this software assumes sole responsibility for any decisions made or actions taken based on the information contained in medicalunitconverter.com calculators. Neither Vetcalculators LLC, the system's authors nor any other party involved in the preparation, publication or distribution of medicalunitconverter.com shall be liable for any special, consequential, or exemplary damages resulting in whole or part from any User's use of or reliance upon this system and the information contained within. Vetcalculators LLC disclaims all warranties regarding such information whether express or implied, including any warranty as to the quality, accuracy, currency or suitability of this information for any particular purpose. Vetcalculators LLC and the system's authors, developers and distributors assume no responsibility for any erroneous results due to defects in the system. ACCESS TO AND USE OF THE VETCALCULATORS LLC MEDICAL UNIT CONVERTER IS PROVIDED WITHOUT WARRANTY OF MERCHANTABILITY OR FITNESS FOR ANY PARTICULAR PURPOSE OR ANY OTHER WARRANTY, EXPRESS OR IMPLIED. In no event shall Vetcalculators LLC be liable for special, direct, indirect or consequential damages, charges, claims, costs, demands, losses fees or expenses of any nature or kind arising from use of the Vetcalculators LLC calculators. By using medicalunitconverter.com, documentation and/or any software found therein, the User agrees to abide by United States and International copyright laws and all other applicable laws involving copyright.</p>

	<footer class="w-full text-center border-t border-grey p-4 pin-b">
	            www.medicalunitconverter.com
	        </footer>`;
});

/* src/routes/blog/index.svelte generated by Svelte v3.12.1 */

const css = {
	code: "ul.svelte-1frg2tf{margin:0 0 1em 0;line-height:1.5}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n\\texport function preload({ params, query }) {\\n\\t\\treturn this.fetch(`blog.json`).then(r => r.json()).then(posts => {\\n\\t\\t\\treturn { posts };\\n\\t\\t});\\n\\t}\\n</script>\\n\\n<script>\\n\\texport let posts;\\n</script>\\n\\n<style>\\n\\tul {\\n\\t\\tmargin: 0 0 1em 0;\\n\\t\\tline-height: 1.5;\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>Blog</title>\\n</svelte:head>\\n\\n<h1>Recent posts</h1>\\n\\n<ul>\\n\\t{#each posts as post}\\n\\t\\t<!-- we're using the non-standard `rel=prefetch` attribute to\\n\\t\\t\\t\\ttell Sapper to load the data for the page as soon as\\n\\t\\t\\t\\tthe user hovers over the link or taps it, instead of\\n\\t\\t\\t\\twaiting for the 'click' event -->\\n\\t\\t<li><a rel='prefetch' href='blog/{post.slug}'>{post.title}</a></li>\\n\\t{/each}\\n</ul>\"],\"names\":[],\"mappings\":\"AAaC,EAAE,eAAC,CAAC,AACH,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACjB,WAAW,CAAE,GAAG,AACjB,CAAC\"}"
};

function preload({ params, query }) {
	return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
		return { posts };
	});
}

const Index$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { posts } = $$props;

	if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0) $$bindings.posts(posts);

	$$result.css.add(css);

	return `${($$result.head += `<title>Blog</title>`, "")}

	<h1>Recent posts</h1>

	<ul class="svelte-1frg2tf">
		${each(posts, (post) => `
			<li><a rel="prefetch" href="blog/${escape(post.slug)}">${escape(post.title)}</a></li>`)}
	</ul>`;
});

/* src/routes/blog/[slug].svelte generated by Svelte v3.12.1 */

const css$1 = {
	code: ".content.svelte-gnxal1 h2{font-size:1.4em;font-weight:500}.content.svelte-gnxal1 pre{background-color:#f9f9f9;box-shadow:inset 1px 1px 5px rgba(0,0,0,0.05);padding:0.5em;border-radius:2px;overflow-x:auto}.content.svelte-gnxal1 pre code{background-color:transparent;padding:0}.content.svelte-gnxal1 ul{line-height:1.5}.content.svelte-gnxal1 li{margin:0 0 0.5em 0}",
	map: "{\"version\":3,\"file\":\"[slug].svelte\",\"sources\":[\"[slug].svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n\\texport async function preload({ params, query }) {\\n\\t\\t// the `slug` parameter is available because\\n\\t\\t// this file is called [slug].svelte\\n\\t\\tconst res = await this.fetch(`blog/${params.slug}.json`);\\n\\t\\tconst data = await res.json();\\n\\n\\t\\tif (res.status === 200) {\\n\\t\\t\\treturn { post: data };\\n\\t\\t} else {\\n\\t\\t\\tthis.error(res.status, data.message);\\n\\t\\t}\\n\\t}\\n</script>\\n\\n<script>\\n\\texport let post;\\n</script>\\n\\n<style>\\n\\t/*\\n\\t\\tBy default, CSS is locally scoped to the component,\\n\\t\\tand any unused styles are dead-code-eliminated.\\n\\t\\tIn this page, Svelte can't know which elements are\\n\\t\\tgoing to appear inside the {{{post.html}}} block,\\n\\t\\tso we have to use the :global(...) modifier to target\\n\\t\\tall elements inside .content\\n\\t*/\\n\\t.content :global(h2) {\\n\\t\\tfont-size: 1.4em;\\n\\t\\tfont-weight: 500;\\n\\t}\\n\\n\\t.content :global(pre) {\\n\\t\\tbackground-color: #f9f9f9;\\n\\t\\tbox-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);\\n\\t\\tpadding: 0.5em;\\n\\t\\tborder-radius: 2px;\\n\\t\\toverflow-x: auto;\\n\\t}\\n\\n\\t.content :global(pre) :global(code) {\\n\\t\\tbackground-color: transparent;\\n\\t\\tpadding: 0;\\n\\t}\\n\\n\\t.content :global(ul) {\\n\\t\\tline-height: 1.5;\\n\\t}\\n\\n\\t.content :global(li) {\\n\\t\\tmargin: 0 0 0.5em 0;\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>{post.title}</title>\\n</svelte:head>\\n\\n<h1>{post.title}</h1>\\n\\n<div class='content'>\\n\\t{@html post.html}\\n</div>\\n\"],\"names\":[],\"mappings\":\"AA4BC,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,GAAG,AAAE,CAAC,AACtB,gBAAgB,CAAE,OAAO,CACzB,UAAU,CAAE,KAAK,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAC9C,OAAO,CAAE,KAAK,CACd,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,GAAG,AAAC,CAAC,AAAQ,IAAI,AAAE,CAAC,AACpC,gBAAgB,CAAE,WAAW,CAC7B,OAAO,CAAE,CAAC,AACX,CAAC,AAED,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC\"}"
};

async function preload$1({ params, query }) {
	// the `slug` parameter is available because
	// this file is called [slug].svelte
	const res = await this.fetch(`blog/${params.slug}.json`);
	const data = await res.json();

	if (res.status === 200) {
		return { post: data };
	} else {
		this.error(res.status, data.message);
	}
}

const Slug = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { post } = $$props;

	if ($$props.post === void 0 && $$bindings.post && post !== void 0) $$bindings.post(post);

	$$result.css.add(css$1);

	return `${($$result.head += `<title>${escape(post.title)}</title>`, "")}

	<h1>${escape(post.title)}</h1>

	<div class="content svelte-gnxal1">
		${post.html}
	</div>`;
});

/* src/routes/vet.svelte generated by Svelte v3.12.1 */

const Vet = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	

  let units = [{"name":"Alkaline phosphatase","specimen":"Serum","conventionalRange":"30-120","conventionalUnit":"IU/L","factor":"1","siRange":"0.5-2.0","siUnit":"U/L","siValue":"0.5","usValue":"30"},{"name":"Alanine aminotransferase (ALT)","specimen":"Serum","conventionalRange":"10-40","conventionalUnit":"IU/L","factor":"1","siRange":"0.17-0.68","siUnit":"U/L","siValue":"0.17","usValue":"10"},{"name":"Albumin","specimen":"Serum","conventionalRange":"3.5-5.0","conventionalUnit":"g/dL","factor":"10","siRange":"35-50","siUnit":"g/L","siValue":"35","usValue":"3.5"},{"name":"Ammonia (as nitrogen)","specimen":"Serum, Plasma","conventionalRange":"15-45","conventionalUnit":"mcg/dL","factor":"0.5872","siRange":"11-32","siUnit":"µmol/L","siValue":"11","usValue":"15"},{"name":"Amylase","specimen":"Serum","conventionalRange":"27-131","conventionalUnit":"Somogyi units","factor":"1.85","siRange":"0.46-2.23","siUnit":"U/L","siValue":"0.46","usValue":"27"},{"name":"Aspartate aminotransferase (AST)","specimen":"Serum","conventionalRange":"10-30","conventionalUnit":"U/L","factor":"1","siRange":"0.17-0.51","siUnit":"U/L","siValue":"0.17","usValue":"10"},{"name":"Bilirubin, total","specimen":"Serum","conventionalRange":"0.3-1.2","conventionalUnit":"mg/dL","factor":"17.104","siRange":"5.0-21.0","siUnit":"µmol/L","siValue":"5","usValue":"0.3"},{"name":"Bilirubin, direct (conjugated)","specimen":"Serum","conventionalRange":"0.1-0.3","conventionalUnit":"mg/dL","factor":"17.104","siRange":"1.7-5.1","siUnit":"µmol/L","siValue":"1.7","usValue":"0.1"},{"name":"Calcium, ionized","specimen":"Serum","conventionalRange":"4.60-5.08","conventionalUnit":"mg/dL","factor":"0.25","siRange":"1.15-1.27","siUnit":"mmol/L","siValue":"1.15","usValue":"4.6"},{"name":"Calcium, total","specimen":"Serum","conventionalRange":"8.2-10.2","conventionalUnit":"mg/dL","factor":"0.25","siRange":"2.05-2.55","siUnit":"mmol/L","siValue":"2.05","usValue":"8.2"},{"name":"Carbon dioxide (total)","specimen":"Serum, Plasma","conventionalRange":"22-28","conventionalUnit":"mEq/L","factor":"1","siRange":"22-28","siUnit":"mmol/L","siValue":"22-28","usValue":"22"},{"name":"Chloride","specimen":"Serum, Plasma","conventionalRange":"96-106","conventionalUnit":"mEq/L","factor":"1","siRange":"96-106","siUnit":"mmol/L","siValue":"110","usValue":"110"},{"name":"Cholesterol (total)","specimen":"Serum, Plasma","conventionalRange":"<200","conventionalUnit":"mg/dL","factor":"0.0259","siRange":"<5.18","siUnit":"mmol/L","siValue":"3.5","usValue":"135"},{"name":"Copper","specimen":"Serum","conventionalRange":"70-140","conventionalUnit":"µg/dL","factor":"0.157","siRange":"44866","siUnit":"µmol/L","siValue":"44866","usValue":"70"},{"name":"Cortisol","specimen":"Serum, Plasma","conventionalRange":"5-25","conventionalUnit":"mcg/dL","factor":"27.588","siRange":"140-690","siUnit":"nmol/L","siValue":"140","usValue":"5"},{"name":"Creatine kinase (CK)","specimen":"Serum","conventionalRange":"40-150","conventionalUnit":"IU/L","factor":"1","siRange":"0.67-2.5","siUnit":"U/L","siValue":"0.67","usValue":"40"},{"name":"Creatinine","specimen":"Serum, Plasma","conventionalRange":"0.5-1.2","conventionalUnit":"mg/dL","factor":"88.4","siRange":"53-106","siUnit":"µmol/L","siValue":"44","usValue":"0.5"},{"name":"Fibrinogen","specimen":"Plasma","conventionalRange":"200-400","conventionalUnit":"mg/dL","factor":"0.0294","siRange":"5.8-11.8","siUnit":"µmol/L","siValue":"5.8","usValue":"200"},{"name":"Glucose","specimen":"Serum","conventionalRange":"70-110","conventionalUnit":"mg/dL","factor":"0.0555","siRange":"3.9-6.1","siUnit":"mmol/L","siValue":"3.9","usValue":"70"},{"name":"Iron","specimen":"Serum","conventionalRange":"60-150","conventionalUnit":"µg/dL","factor":"0.179","siRange":"10.7-26.9","siUnit":"µmol/L","siValue":"10.7","usValue":"60"},{"name":"Iron-binding capacity","specimen":"Serum","conventionalRange":"250-450","conventionalUnit":"µg/dL","factor":"0.179","siRange":"44.8-80.6","siUnit":"µmol/L","siValue":"45","usValue":"250"},{"name":"Lipase","specimen":"Serum","conventionalRange":"31-186","conventionalUnit":"IU/L","factor":"1","siRange":"0.5-3.2","siUnit":"U/L","siValue":"0.5","usValue":"31"},{"name":"Phosphorus (inorganic)","specimen":"Serum","conventionalRange":"2.3-4.7","conventionalUnit":"mg/dL","factor":"0.323","siRange":"0.74-1.52","siUnit":"mmol/L","siValue":"0.74","usValue":"2.3"},{"name":"Potassium","specimen":"Serum","conventionalRange":"3.5-5.0","conventionalUnit":"mEq/L","factor":"1","siRange":"3.5-5.0","siUnit":"mmol/L","siValue":"3.5","usValue":"3.5"},{"name":"Protein (total)","specimen":"Serum","conventionalRange":"5.4-8.0","conventionalUnit":"g/dL","factor":"10","siRange":"54-80","siUnit":"g/L","siValue":"60","usValue":"6"},{"name":"Prothrombin time (PT)","specimen":"Plasma","conventionalRange":"10-13","conventionalUnit":"s","siRange":"10-13","factor":"1","siValue":"s","usValue":"10"},{"name":"Partial thromboplastin time (PTT)","specimen":"Whole blood","conventionalRange":"25-40","conventionalUnit":"s","factor":"1","siRange":"25-40","siUnit":"s","siValue":"25","usValue":"25"},{"name":"Sodium","specimen":"Serum","conventionalRange":"136-142","conventionalUnit":"mEq/L","factor":"1","siRange":"136-142","siUnit":"mmol/L","siValue":"136","usValue":"136"},{"name":"Triglycerides","specimen":"Serum","conventionalRange":"<160","conventionalUnit":"mcg/dL","factor":"0.0113","siRange":"1.8","siUnit":"mmol/L","siValue":"1.8","usValue":"140"},{"name":"Triiodothyronine, total (T<sub>3</sub>)","specimen":"Serum","conventionalRange":"60-180","conventionalUnit":"mcg/dL","factor":"15.6","siRange":"0.92-2.76","siUnit":"nmol/L","siValue":"0.92","usValue":"60"},{"name":"Thyroxine, free (FT <sub>4</sub> )","specimen":"Serum","conventionalRange":"0.9-2.3","conventionalUnit":"ng/dL","factor":"12.871","siRange":"12-30","siUnit":"pmol/L","siValue":"12","usValue":"0.9"},{"name":"Thyroxine, total (T <sub>4</sub> )","specimen":"Serum","conventionalRange":"5.5-12.5","conventionalUnit":"mcg/dL","factor":"12.871","siRange":"71-160","siUnit":"nmol/L","siValue":"71","usValue":"5.5"},{"name":"Urea nitrogen","specimen":"Serum","conventionalRange":"8-23","conventionalUnit":"mg/dL","factor":"0.357","siRange":"2.9-8.2","siUnit":"mmol/L","siValue":"2.9","usValue":"8"},{"name":"Uric acid","specimen":"Serum","conventionalRange":"4.0-8.0","conventionalUnit":"mg/dL","factor":"0.0595","siRange":"240-480","siUnit":"mmol/L","siValue":"240","usValue":"4"},{"name":"Urine protein/creatinine ratio","specimen":"Serum","conventionalRange":"","conventionalUnit":"g/g","factor":"0.113","siRange":"","siUnit":"g/mml","siValue":"","usValue":""}];
  
   	let prefix = '';

	let filteredUnits =  units;

	return `${($$result.head += `<title>medicalunitconverter.com</title><meta name="description" content="Medical unit conversion calculator, medicalunitconverter.com. Convert US units to International (SI) units easily with this onlne calculator. Easily search for a specific lab test, enter any value and convert the units. For both Human and Veterinary values."><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><script async src="https://www.googletagmanager.com/gtag/js?id=UA-255701-18"></script><script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());

	  gtag('config', 'UA-255701-18');
	</script>`, "")}














	  <div class="container mx-auto  px-1">

	  


	 <div class="md:w-1/4 mb-3 sm:w-1/3 text-black p-1">Search Units <input placeholder="Unit" class="mt-1 block w-full  text-gray-700 border border-gray-300 rounded-lg py-2 px-2 leading-tight bg-white  focus:outline-none focus:bg-white focus:border-gray-500" type="search"${add_attribute("value", prefix, 1)}></div>


	  ${each(filteredUnits, (unit, i) => `<div class="border border-gray-300 rounded mb-2">


	 <div class="flex flex-wrap md:flex-no-wrap lg:flex-no-wrap px-1  mb-1">
	 <div class="w-full md:w-2/5">
	            
	              <div class="font-bold text-black ">${escape(unit.name)}</div>
	             <div class="text-gray-700 text-md">${validate_component(Fa, 'Fa').$$render($$result, {
		class: "inline",
		secondaryColor: "red",
		icon: proDuotoneSvgIcons.faVial
	}, {}, {})}  Specimen: ${escape(unit.specimen)} </div>
	         <div class="text-gray-700 text-sm">${validate_component(Fa, 'Fa').$$render($$result, { class: "inline", icon: proDuotoneSvgIcons.faCalculator }, {}, {})}  Conversion Factor: ${escape(unit.factor)} </div>
	            
	  </div>
	  <div class="md:w-1/3 w-1/2   h-14 pr-1 pl-1">
	  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" for="grid-first-name">
	       ${validate_component(Fa, 'Fa').$$render($$result, {
		class: "inline",
		size: "lg",
		primaryColor: "blue",
		secondaryColor: "red",
		icon: proDuotoneSvgIcons.faFlagUsa
	}, {}, {})} US
	      </label>
	               <input class="appearance-none mt-1 block w-full bg-blue-100 text-gray-700 border border-blue-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"${add_attribute("value", unit.usValue, 0)} type="number" placeholder=" US">
	<div class="text-gray-700 text-sm">US Range:${escape(unit.conventionalRange)} ${escape(unit.conventionalUnit)}</div>
	             </div>

	 <div class="md:w-1/3 w-1/2  h-14 pr-1 pl-1">
	 <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" for="grid-first-name">
	        ${validate_component(Fa, 'Fa').$$render($$result, {
		class: "inline",
		size: "lg",
		primaryColor: "green",
		secondaryColor: "lightblue",
		icon: proDuotoneSvgIcons.faGlobe
	}, {}, {})} International
	      </label>
	               <input class="appearance-none mt-1 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"${add_attribute("value", unit.siValue, 0)} type="number" placeholder="SI">
	<div class="text-gray-700 text-sm">SI Range: ${escape(unit.siRange)} ${escape(unit.siUnit)} </div>
	             </div>

	 
	 
	 
	 </div> 
	</div>`)}
	  
	   
	   
	   

	    

	  
	   </div>
	<footer class="w-full text-center border-t border-grey p-4 pin-b">
	            www.medicalunitconverter.com
	        </footer>`;
});

/* src/components/Nav.svelte generated by Svelte v3.12.1 */

const css$2 = {
	code: ".textShadow.svelte-1n44rxm{text-shadow:0 2px 5px rgba(0, 0, 0, 0.5)}.textShadow2.svelte-1n44rxm{text-shadow:0 2px 2px rgba(0, 0, 0, 0.5)}",
	map: "{\"version\":3,\"file\":\"Nav.svelte\",\"sources\":[\"Nav.svelte\"],\"sourcesContent\":[\"<script>\\n  export let segment;\\n  \\n  import Fa from 'svelte-fa';\\nimport { faFlagUsa, faGlobe, faArrowsAltH, faBalanceScale, faInfoCircle, faPaperPlane, faCalculator, faPencilRuler, faDog, faUserMd, faVial} from '@fortawesome/pro-duotone-svg-icons';\\n  let current = 'Human';\\n  \\n</script>\\n<style>.textShadow{text-shadow:0 2px 5px rgba(0, 0, 0, 0.5)}\\n.textShadow2{text-shadow:0 2px 2px rgba(0, 0, 0, 0.5)}\\n</style>\\n\\n\\n   \\n\\n\\n\\n<nav class=\\\"w-full\\\">\\n  <div class=\\\"container w-full mx-auto rounded-t shadow bg-cover bg-center h-48\\\" style=\\\"background-image: url(static/bg3.jpg)\\\">\\n \\t<!-- Text shadow utilities will be cool -->\\n   <div class=\\\"container mx-auto px-1\\\">\\n      <div class=\\\"flex items-center justify-between py-1\\\">\\n        <div class=\\\"text-xl flex flex-wrap\\\">\\n         \\n        </div>\\n\\n        \\n\\n        <div class=\\\" sm:flex sm:items-center\\\">\\n       <ul class=\\\"list-reset flex\\\">\\n        <li><a href=\\\"about\\\" class='shadow bg-blue-500 hover:bg-blue-700 text-sm text-white py-1 px-1 rounded inline-flex items-center mr-1 {segment === \\\"about\\\" ? \\\"bg-blue-700\\\" : \\\"\\\"}'><Fa class=\\\"inline-flex  text-white pr-1\\\" size=\\\"lg\\\" icon={faInfoCircle}/> About</a></li>\\n        <li><a href=\\\"legal\\\" class='shadow bg-blue-500 hover:bg-blue-700 text-sm  text-white py-1 px-1 inline-flex items-center mr-1 rounded {segment === \\\"legal\\\" ? \\\"bg-blue-700\\\" : \\\"\\\"}'><Fa class=\\\"inline  text-white pr-1\\\" size=\\\"lg\\\" icon={faBalanceScale}/> Legal</a></li>\\n        <li><a href=\\\"mailto:info@vetcalculators.com\\\" class='shadow bg-blue-500 text-sm hover:bg-blue-700  text-white py-1 px-1 inline-flex items-center rounded {segment === \\\"contact\\\" ? \\\"bg-blue-700\\\" : \\\"\\\"}'><Fa class=\\\"inline text-white pr-1\\\" size=\\\"lg\\\" icon={faPaperPlane}/> Contact</a></li>\\n      </ul>\\n        </div>\\n\\n        \\n      </div>\\n      \\n    \\n      </div>\\n    \\n    <div class=\\\"text-center text-white pb-1\\\">\\n    <h1 class=\\\"font-sans  md:text-2xl textShadow\\\"><Fa class=\\\"inline text-gray-600 \\\"  primaryColor=\\\"blue\\\" secondaryColor=\\\"white\\\"  size=\\\"lg\\\" icon={faCalculator}/>  Medical Unit Converter</h1>\\n      <h2 class=\\\"font-sans  text-2xl textShadow\\\"> <Fa class=\\\"inline textShadow\\\" size=\\\"lg\\\" secondaryColor=\\\"red\\\"  icon={faVial}/> US Units  <Fa class=\\\"inline text-gray-700\\\" size=\\\"lg\\\" icon={faArrowsAltH}/> SI Units <Fa class=\\\"inline\\\" size=\\\"lg\\\"  secondaryColor=\\\"red\\\"  icon={faVial}/></h2>\\n    <h3 class=\\\"tracking-wide mt-2 mb-4 textShadow\\\">Easily Convert Medical and Metric Values</h3>\\n      \\n  \\n    </div>\\n   \\n  </div>\\n  \\n</nav>\\n<ul class=\\\"flex\\\">\\n  <li class=\\\"flex-1 mr-1 ml-1\\\">\\n    <a class='text-center block border border-white rounded bg-gray-700 hover:bg-blue-700   py-2 px-1 text-white' class:bg-blue-700=\\\"{current === 'Human'}\\\"\\ton:click=\\\"{() => current = 'Human'}\\\" href=\\\".\\\"><Fa class=\\\"inline-flex  text-white pr-1\\\" size=\\\"lg\\\" icon={faUserMd}/>  Human</a>\\n  </li>\\n  <li class=\\\"flex-1 mr-1\\\">\\n    <a class='text-center block border border-white rounded bg-gray-700 hover:bg-blue-700  py-2 px-1  text-white' class:bg-blue-700=\\\"{current === 'Veterinary'}\\\"\\ton:click=\\\"{() => current = 'Veterinary'}\\\" href=\\\"vet\\\"><Fa class=\\\"inline-flex  text-white pr-1\\\" size=\\\"lg\\\" icon={faDog}/>  Veterinary</a>\\n  </li>\\n  <li class=\\\"flex-1 mr-1\\\">\\n    <a class='text-center block border border-white rounded  bg-gray-700 hover:bg-blue-700  py-2 px-1  text-white' class:bg-blue-700=\\\"{current === 'Metric Units'}\\\"\\ton:click=\\\"{() => current = 'Metric Units'}\\\" href=\\\"metric\\\"><Fa class=\\\"inline-flex  text-white pr-1\\\" size=\\\"lg\\\" icon={faPencilRuler}/>  Metric</a>\\n  </li>\\n</ul>\\n\\n\\n\\n\"],\"names\":[],\"mappings\":\"AAQO,0BAAW,CAAC,YAAY,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,AAC5D,2BAAY,CAAC,YAAY,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC\"}"
};

const Nav = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;

	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);

	$$result.css.add(css$2);

	return `<nav class="w-full">
	  <div class="container w-full mx-auto rounded-t shadow bg-cover bg-center h-48" style="background-image: url(static/bg3.jpg)">
	 
	   <div class="container mx-auto px-1">
	      <div class="flex items-center justify-between py-1">
	        <div class="text-xl flex flex-wrap">
	         
	        </div>

	        

	        <div class=" sm:flex sm:items-center">
	       <ul class="list-reset flex">
	        <li><a href="about" class="shadow bg-blue-500 hover:bg-blue-700 text-sm text-white py-1 px-1 rounded inline-flex items-center mr-1 ${escape(segment === "about" ? "bg-blue-700" : "")} svelte-1n44rxm">${validate_component(Fa, 'Fa').$$render($$result, {
		class: "inline-flex  text-white pr-1",
		size: "lg",
		icon: proDuotoneSvgIcons.faInfoCircle
	}, {}, {})} About</a></li>
	        <li><a href="legal" class="shadow bg-blue-500 hover:bg-blue-700 text-sm  text-white py-1 px-1 inline-flex items-center mr-1 rounded ${escape(segment === "legal" ? "bg-blue-700" : "")} svelte-1n44rxm">${validate_component(Fa, 'Fa').$$render($$result, {
		class: "inline  text-white pr-1",
		size: "lg",
		icon: proDuotoneSvgIcons.faBalanceScale
	}, {}, {})} Legal</a></li>
	        <li><a href="mailto:info@vetcalculators.com" class="shadow bg-blue-500 text-sm hover:bg-blue-700  text-white py-1 px-1 inline-flex items-center rounded ${escape(segment === "contact" ? "bg-blue-700" : "")} svelte-1n44rxm">${validate_component(Fa, 'Fa').$$render($$result, {
		class: "inline text-white pr-1",
		size: "lg",
		icon: proDuotoneSvgIcons.faPaperPlane
	}, {}, {})} Contact</a></li>
	      </ul>
	        </div>

	        
	      </div>
	      
	    
	      </div>
	    
	    <div class="text-center text-white pb-1">
	    <h1 class="font-sans  md:text-2xl textShadow svelte-1n44rxm">${validate_component(Fa, 'Fa').$$render($$result, {
		class: "inline text-gray-600 ",
		primaryColor: "blue",
		secondaryColor: "white",
		size: "lg",
		icon: proDuotoneSvgIcons.faCalculator
	}, {}, {})}  Medical Unit Converter</h1>
	      <h2 class="font-sans  text-2xl textShadow svelte-1n44rxm"> ${validate_component(Fa, 'Fa').$$render($$result, {
		class: "inline textShadow",
		size: "lg",
		secondaryColor: "red",
		icon: proDuotoneSvgIcons.faVial
	}, {}, {})} US Units  ${validate_component(Fa, 'Fa').$$render($$result, {
		class: "inline text-gray-700",
		size: "lg",
		icon: proDuotoneSvgIcons.faArrowsAltH
	}, {}, {})} SI Units ${validate_component(Fa, 'Fa').$$render($$result, {
		class: "inline",
		size: "lg",
		secondaryColor: "red",
		icon: proDuotoneSvgIcons.faVial
	}, {}, {})}</h2>
	    <h3 class="tracking-wide mt-2 mb-4 textShadow svelte-1n44rxm">Easily Convert Medical and Metric Values</h3>
	      
	  
	    </div>
	   
	  </div>
	  
	</nav>
	<ul class="flex">
	  <li class="flex-1 mr-1 ml-1">
	    <a class="${[`text-center block border border-white rounded bg-gray-700 hover:bg-blue-700   py-2 px-1 text-white`,  "bg-blue-700" ].join(' ').trim() }" href=".">${validate_component(Fa, 'Fa').$$render($$result, {
		class: "inline-flex  text-white pr-1",
		size: "lg",
		icon: proDuotoneSvgIcons.faUserMd
	}, {}, {})}  Human</a>
	  </li>
	  <li class="flex-1 mr-1">
	    <a class="${[`text-center block border border-white rounded bg-gray-700 hover:bg-blue-700  py-2 px-1  text-white`,  ""].join(' ').trim() }" href="vet">${validate_component(Fa, 'Fa').$$render($$result, {
		class: "inline-flex  text-white pr-1",
		size: "lg",
		icon: proDuotoneSvgIcons.faDog
	}, {}, {})}  Veterinary</a>
	  </li>
	  <li class="flex-1 mr-1">
	    <a class="${[`text-center block border border-white rounded  bg-gray-700 hover:bg-blue-700  py-2 px-1  text-white`,  ""].join(' ').trim() }" href="metric">${validate_component(Fa, 'Fa').$$render($$result, {
		class: "inline-flex  text-white pr-1",
		size: "lg",
		icon: proDuotoneSvgIcons.faPencilRuler
	}, {}, {})}  Metric</a>
	  </li>
	</ul>`;
});

/* src/routes/_layout.svelte generated by Svelte v3.12.1 */

const css$3 = {
	code: "main.svelte-1jakvlc{position:relative;max-width:60em;background-color:white;padding:0.5em;margin:0 auto;box-sizing:border-box}",
	map: "{\"version\":3,\"file\":\"_layout.svelte\",\"sources\":[\"_layout.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport Nav from '../components/Nav.svelte';\\n\\n\\texport let segment;\\n</script>\\n\\n<style>\\n\\tmain {\\n\\t\\tposition: relative;\\n\\t\\tmax-width: 60em;\\n\\t\\tbackground-color: white;\\n\\t\\tpadding: 0.5em;\\n\\t\\tmargin: 0 auto;\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n</style>\\n\\n<Nav {segment}/>\\n\\n<main>\\n\\t<slot></slot>\\n</main>\"],\"names\":[],\"mappings\":\"AAOC,IAAI,eAAC,CAAC,AACL,QAAQ,CAAE,QAAQ,CAClB,SAAS,CAAE,IAAI,CACf,gBAAgB,CAAE,KAAK,CACvB,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,UAAU,CAAE,UAAU,AACvB,CAAC\"}"
};

const Layout = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;

	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);

	$$result.css.add(css$3);

	return `${validate_component(Nav, 'Nav').$$render($$result, { segment: segment }, {}, {})}

	<main class="svelte-1jakvlc">
		${$$slots.default ? $$slots.default({}) : ``}
	</main>`;
});

/* src/routes/_error.svelte generated by Svelte v3.12.1 */

const css$4 = {
	code: "h1.svelte-8od9u6,p.svelte-8od9u6{margin:0 auto}h1.svelte-8od9u6{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-8od9u6{margin:1em auto}@media(min-width: 480px){h1.svelte-8od9u6{font-size:4em}}",
	map: "{\"version\":3,\"file\":\"_error.svelte\",\"sources\":[\"_error.svelte\"],\"sourcesContent\":[\"<script>\\n\\texport let status;\\n\\texport let error;\\n\\n\\tconst dev = undefined === 'development';\\n</script>\\n\\n<style>\\n\\th1, p {\\n\\t\\tmargin: 0 auto;\\n\\t}\\n\\n\\th1 {\\n\\t\\tfont-size: 2.8em;\\n\\t\\tfont-weight: 700;\\n\\t\\tmargin: 0 0 0.5em 0;\\n\\t}\\n\\n\\tp {\\n\\t\\tmargin: 1em auto;\\n\\t}\\n\\n\\t@media (min-width: 480px) {\\n\\t\\th1 {\\n\\t\\t\\tfont-size: 4em;\\n\\t\\t}\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>{status}</title>\\n</svelte:head>\\n\\n<h1>{status}</h1>\\n\\n<p>{error.message}</p>\\n\\n{#if dev && error.stack}\\n\\t<pre>{error.stack}</pre>\\n{/if}\\n\"],\"names\":[],\"mappings\":\"AAQC,gBAAE,CAAE,CAAC,cAAC,CAAC,AACN,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC,AAED,CAAC,cAAC,CAAC,AACF,MAAM,CAAE,GAAG,CAAC,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,GAAG,AACf,CAAC,AACF,CAAC\"}"
};

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { status, error } = $$props;

	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);

	$$result.css.add(css$4);

	return `${($$result.head += `<title>${escape(status)}</title>`, "")}

	<h1 class="svelte-8od9u6">${escape(status)}</h1>

	<p class="svelte-8od9u6">${escape(error.message)}</p>

	${  `` }`;
});

// This file is generated by Sapper — do not edit it!

const d = decodeURIComponent;

const manifest = {
	server_routes: [
		{
			// blog/index.json.js
			pattern: /^\/blog.json$/,
			handlers: route_0,
			params: () => ({})
		},

		{
			// blog/[slug].json.js
			pattern: /^\/blog\/([^\/]+?).json$/,
			handlers: route_1,
			params: match => ({ slug: d(match[1]) })
		}
	],

	pages: [
		{
			// index.svelte
			pattern: /^\/$/,
			parts: [
				{ name: "index", file: "index.svelte", component: Index }
			]
		},

		{
			// contact.svelte
			pattern: /^\/contact\/?$/,
			parts: [
				{ name: "contact", file: "contact.svelte", component: Contact }
			]
		},

		{
			// metric.svelte
			pattern: /^\/metric\/?$/,
			parts: [
				{ name: "metric", file: "metric.svelte", component: Metric }
			]
		},

		{
			// about.svelte
			pattern: /^\/about\/?$/,
			parts: [
				{ name: "about", file: "about.svelte", component: About }
			]
		},

		{
			// legal.svelte
			pattern: /^\/legal\/?$/,
			parts: [
				{ name: "legal", file: "legal.svelte", component: Legal }
			]
		},

		{
			// blog/index.svelte
			pattern: /^\/blog\/?$/,
			parts: [
				{ name: "blog", file: "blog/index.svelte", component: Index$1, preload: preload }
			]
		},

		{
			// blog/[slug].svelte
			pattern: /^\/blog\/([^\/]+?)\/?$/,
			parts: [
				null,
				{ name: "blog_$slug", file: "blog/[slug].svelte", component: Slug, preload: preload$1, params: match => ({ slug: d(match[1]) }) }
			]
		},

		{
			// vet.svelte
			pattern: /^\/vet\/?$/,
			parts: [
				{ name: "vet", file: "vet.svelte", component: Vet }
			]
		}
	],

	root: Layout,
	root_preload: () => {},
	error: Error$1
};

const build_dir = "__sapper__/build";

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

const CONTEXT_KEY = {};

/* src/node_modules/@sapper/internal/App.svelte generated by Svelte v3.12.1 */

const App = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	

	let { stores, error, status, segments, level0, level1 = null } = $$props;

	setContext(CONTEXT_KEY, stores);

	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.segments === void 0 && $$bindings.segments && segments !== void 0) $$bindings.segments(segments);
	if ($$props.level0 === void 0 && $$bindings.level0 && level0 !== void 0) $$bindings.level0(level0);
	if ($$props.level1 === void 0 && $$bindings.level1 && level1 !== void 0) $$bindings.level1(level1);

	return `


	${validate_component(Layout, 'Layout').$$render($$result, Object.assign({ segment: segments[0] }, level0.props), {}, {
		default: () => `
		${ error ? `${validate_component(Error$1, 'Error').$$render($$result, { error: error, status: status }, {}, {})}` : `${validate_component(((level1.component) || missing_component), 'svelte:component').$$render($$result, Object.assign(level1.props), {}, {})}` }
	`
	})}`;
});

function get_server_route_handler(routes) {
	async function handle_route(route, req, res, next) {
		req.params = route.params(route.pattern.exec(req.path));

		const method = req.method.toLowerCase();
		// 'delete' cannot be exported from a module because it is a keyword,
		// so check for 'del' instead
		const method_export = method === 'delete' ? 'del' : method;
		const handle_method = route.handlers[method_export];
		if (handle_method) {
			if (process.env.SAPPER_EXPORT) {
				const { write, end, setHeader } = res;
				const chunks = [];
				const headers = {};

				// intercept data so that it can be exported
				res.write = function(chunk) {
					chunks.push(Buffer.from(chunk));
					write.apply(res, arguments);
				};

				res.setHeader = function(name, value) {
					headers[name.toLowerCase()] = value;
					setHeader.apply(res, arguments);
				};

				res.end = function(chunk) {
					if (chunk) chunks.push(Buffer.from(chunk));
					end.apply(res, arguments);

					process.send({
						__sapper__: true,
						event: 'file',
						url: req.url,
						method: req.method,
						status: res.statusCode,
						type: headers['content-type'],
						body: Buffer.concat(chunks).toString()
					});
				};
			}

			const handle_next = (err) => {
				if (err) {
					res.statusCode = 500;
					res.end(err.message);
				} else {
					process.nextTick(next);
				}
			};

			try {
				await handle_method(req, res, handle_next);
			} catch (err) {
				console.error(err);
				handle_next(err);
			}
		} else {
			// no matching handler for method
			process.nextTick(next);
		}
	}

	return function find_route(req, res, next) {
		for (const route of routes) {
			if (route.pattern.test(req.path)) {
				handle_route(route, req, res, next);
				return;
			}
		}

		next();
	};
}

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

var parse_1 = parse;
var serialize_1 = serialize;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

var cookie = {
	parse: parse_1,
	serialize: serialize_1
};

var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\0': '\\0',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function devalue(value) {
    var counts = new Map();
    function walk(thing) {
        if (typeof thing === 'function') {
            throw new Error("Cannot stringify a function");
        }
        if (counts.has(thing)) {
            counts.set(thing, counts.get(thing) + 1);
            return;
        }
        counts.set(thing, 1);
        if (!isPrimitive(thing)) {
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Date':
                case 'RegExp':
                    return;
                case 'Array':
                    thing.forEach(walk);
                    break;
                case 'Set':
                case 'Map':
                    Array.from(thing).forEach(walk);
                    break;
                default:
                    var proto = Object.getPrototypeOf(thing);
                    if (proto !== Object.prototype &&
                        proto !== null &&
                        Object.getOwnPropertyNames(proto).sort().join('\0') !== objectProtoOwnPropertyNames) {
                        throw new Error("Cannot stringify arbitrary non-POJOs");
                    }
                    if (Object.getOwnPropertySymbols(thing).length > 0) {
                        throw new Error("Cannot stringify POJOs with symbolic keys");
                    }
                    Object.keys(thing).forEach(function (key) { return walk(thing[key]); });
            }
        }
    }
    walk(value);
    var names = new Map();
    Array.from(counts)
        .filter(function (entry) { return entry[1] > 1; })
        .sort(function (a, b) { return b[1] - a[1]; })
        .forEach(function (entry, i) {
        names.set(entry[0], getName(i));
    });
    function stringify(thing) {
        if (names.has(thing)) {
            return names.get(thing);
        }
        if (isPrimitive(thing)) {
            return stringifyPrimitive(thing);
        }
        var type = getType(thing);
        switch (type) {
            case 'Number':
            case 'String':
            case 'Boolean':
                return "Object(" + stringify(thing.valueOf()) + ")";
            case 'RegExp':
                return thing.toString();
            case 'Date':
                return "new Date(" + thing.getTime() + ")";
            case 'Array':
                var members = thing.map(function (v, i) { return i in thing ? stringify(v) : ''; });
                var tail = thing.length === 0 || (thing.length - 1 in thing) ? '' : ',';
                return "[" + members.join(',') + tail + "]";
            case 'Set':
            case 'Map':
                return "new " + type + "([" + Array.from(thing).map(stringify).join(',') + "])";
            default:
                var obj = "{" + Object.keys(thing).map(function (key) { return safeKey(key) + ":" + stringify(thing[key]); }).join(',') + "}";
                var proto = Object.getPrototypeOf(thing);
                if (proto === null) {
                    return Object.keys(thing).length > 0
                        ? "Object.assign(Object.create(null)," + obj + ")"
                        : "Object.create(null)";
                }
                return obj;
        }
    }
    var str = stringify(value);
    if (names.size) {
        var params_1 = [];
        var statements_1 = [];
        var values_1 = [];
        names.forEach(function (name, thing) {
            params_1.push(name);
            if (isPrimitive(thing)) {
                values_1.push(stringifyPrimitive(thing));
                return;
            }
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                    values_1.push("Object(" + stringify(thing.valueOf()) + ")");
                    break;
                case 'RegExp':
                    values_1.push(thing.toString());
                    break;
                case 'Date':
                    values_1.push("new Date(" + thing.getTime() + ")");
                    break;
                case 'Array':
                    values_1.push("Array(" + thing.length + ")");
                    thing.forEach(function (v, i) {
                        statements_1.push(name + "[" + i + "]=" + stringify(v));
                    });
                    break;
                case 'Set':
                    values_1.push("new Set");
                    statements_1.push(name + "." + Array.from(thing).map(function (v) { return "add(" + stringify(v) + ")"; }).join('.'));
                    break;
                case 'Map':
                    values_1.push("new Map");
                    statements_1.push(name + "." + Array.from(thing).map(function (_a) {
                        var k = _a[0], v = _a[1];
                        return "set(" + stringify(k) + ", " + stringify(v) + ")";
                    }).join('.'));
                    break;
                default:
                    values_1.push(Object.getPrototypeOf(thing) === null ? 'Object.create(null)' : '{}');
                    Object.keys(thing).forEach(function (key) {
                        statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
                    });
            }
        });
        statements_1.push("return " + str);
        return "(function(" + params_1.join(',') + "){" + statements_1.join(';') + "}(" + values_1.join(',') + "))";
    }
    else {
        return str;
    }
}
function getName(num) {
    var name = '';
    do {
        name = chars[num % chars.length] + name;
        num = ~~(num / chars.length) - 1;
    } while (num >= 0);
    return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
    return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
    if (typeof thing === 'string')
        return stringifyString(thing);
    if (thing === void 0)
        return 'void 0';
    if (thing === 0 && 1 / thing < 0)
        return '-0';
    var str = String(thing);
    if (typeof thing === 'number')
        return str.replace(/^(-)?0\./, '$1.');
    return str;
}
function getType(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
    return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
    return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
    var result = '"';
    for (var i = 0; i < str.length; i += 1) {
        var char = str.charAt(i);
        var code = char.charCodeAt(0);
        if (char === '"') {
            result += '\\"';
        }
        else if (char in escaped$1) {
            result += escaped$1[char];
        }
        else if (code >= 0xd800 && code <= 0xdfff) {
            var next = str.charCodeAt(i + 1);
            // If this is the beginning of a [high, low] surrogate pair,
            // add the next two characters, otherwise escape
            if (code <= 0xdbff && (next >= 0xdc00 && next <= 0xdfff)) {
                result += char + str[++i];
            }
            else {
                result += "\\u" + code.toString(16).toUpperCase();
            }
        }
        else {
            result += char;
        }
    }
    result += '"';
    return result;
}

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream.PassThrough;
const resolve_url = Url.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

function get_page_handler(
	manifest,
	session_getter
) {
	const get_build_info =  (assets => () => assets)(JSON.parse(fs.readFileSync(path.join(build_dir, 'build.json'), 'utf-8')));

	const template =  (str => () => str)(read_template(build_dir));

	const has_service_worker = fs.existsSync(path.join(build_dir, 'service-worker.js'));

	const { server_routes, pages } = manifest;
	const error_route = manifest.error;

	function bail(req, res, err) {
		console.error(err);

		const message =  'Internal server error';

		res.statusCode = 500;
		res.end(`<pre>${message}</pre>`);
	}

	function handle_error(req, res, statusCode, error) {
		handle_page({
			pattern: null,
			parts: [
				{ name: null, component: error_route }
			]
		}, req, res, statusCode, error || new Error('Unknown error in preload function'));
	}

	async function handle_page(page, req, res, status = 200, error = null) {
		const is_service_worker_index = req.path === '/service-worker-index.html';
		const build_info




 = get_build_info();

		res.setHeader('Content-Type', 'text/html');
		res.setHeader('Cache-Control',  'max-age=600');

		// preload main.js and current route
		// TODO detect other stuff we can preload? images, CSS, fonts?
		let preloaded_chunks = Array.isArray(build_info.assets.main) ? build_info.assets.main : [build_info.assets.main];
		if (!error && !is_service_worker_index) {
			page.parts.forEach(part => {
				if (!part) return;

				// using concat because it could be a string or an array. thanks webpack!
				preloaded_chunks = preloaded_chunks.concat(build_info.assets[part.name]);
			});
		}

		if (build_info.bundler === 'rollup') {
			// TODO add dependencies and CSS
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map(file => `<${req.baseUrl}/client/${file}>;rel="modulepreload"`)
				.join(', ');

			res.setHeader('Link', link);
		} else {
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map((file) => {
					const as = /\.css$/.test(file) ? 'style' : 'script';
					return `<${req.baseUrl}/client/${file}>;rel="preload";as="${as}"`;
				})
				.join(', ');

			res.setHeader('Link', link);
		}

		const session = session_getter(req, res);

		let redirect;
		let preload_error;

		const preload_context = {
			redirect: (statusCode, location) => {
				if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
					throw new Error(`Conflicting redirects`);
				}
				location = location.replace(/^\//g, ''); // leading slash (only)
				redirect = { statusCode, location };
			},
			error: (statusCode, message) => {
				preload_error = { statusCode, message };
			},
			fetch: (url, opts) => {
				const parsed = new Url.URL(url, `http://127.0.0.1:${process.env.PORT}${req.baseUrl ? req.baseUrl + '/' :''}`);

				if (opts) {
					opts = Object.assign({}, opts);

					const include_cookies = (
						opts.credentials === 'include' ||
						opts.credentials === 'same-origin' && parsed.origin === `http://127.0.0.1:${process.env.PORT}`
					);

					if (include_cookies) {
						opts.headers = Object.assign({}, opts.headers);

						const cookies = Object.assign(
							{},
							cookie.parse(req.headers.cookie || ''),
							cookie.parse(opts.headers.cookie || '')
						);

						const set_cookie = res.getHeader('Set-Cookie');
						(Array.isArray(set_cookie) ? set_cookie : [set_cookie]).forEach(str => {
							const match = /([^=]+)=([^;]+)/.exec(str);
							if (match) cookies[match[1]] = match[2];
						});

						const str = Object.keys(cookies)
							.map(key => `${key}=${cookies[key]}`)
							.join('; ');

						opts.headers.cookie = str;
					}
				}

				return fetch(parsed.href, opts);
			}
		};

		let preloaded;
		let match;
		let params;

		try {
			const root_preloaded = manifest.root_preload
				? manifest.root_preload.call(preload_context, {
					host: req.headers.host,
					path: req.path,
					query: req.query,
					params: {}
				}, session)
				: {};

			match = error ? null : page.pattern.exec(req.path);


			let toPreload = [root_preloaded];
			if (!is_service_worker_index) {
				toPreload = toPreload.concat(page.parts.map(part => {
					if (!part) return null;

					// the deepest level is used below, to initialise the store
					params = part.params ? part.params(match) : {};

					return part.preload
						? part.preload.call(preload_context, {
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}, session)
						: {};
				}));
			}

			preloaded = await Promise.all(toPreload);
		} catch (err) {
			if (error) {
				return bail(req, res, err)
			}

			preload_error = { statusCode: 500, message: err };
			preloaded = []; // appease TypeScript
		}

		try {
			if (redirect) {
				const location = Url.resolve((req.baseUrl || '') + '/', redirect.location);

				res.statusCode = redirect.statusCode;
				res.setHeader('Location', location);
				res.end();

				return;
			}

			if (preload_error) {
				handle_error(req, res, preload_error.statusCode, preload_error.message);
				return;
			}

			const segments = req.path.split('/').filter(Boolean);

			// TODO make this less confusing
			const layout_segments = [segments[0]];
			let l = 1;

			page.parts.forEach((part, i) => {
				layout_segments[l] = segments[i + 1];
				if (!part) return null;
				l++;
			});

			const props = {
				stores: {
					page: {
						subscribe: writable({
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}).subscribe
					},
					preloading: {
						subscribe: writable(null).subscribe
					},
					session: writable(session)
				},
				segments: layout_segments,
				status: error ? status : 200,
				error: error ? error instanceof Error ? error : { message: error } : null,
				level0: {
					props: preloaded[0]
				},
				level1: {
					segment: segments[0],
					props: {}
				}
			};

			if (!is_service_worker_index) {
				let l = 1;
				for (let i = 0; i < page.parts.length; i += 1) {
					const part = page.parts[i];
					if (!part) continue;

					props[`level${l++}`] = {
						component: part.component,
						props: preloaded[i + 1] || {},
						segment: segments[i]
					};
				}
			}

			const { html, head, css } = App.render(props);

			const serialized = {
				preloaded: `[${preloaded.map(data => try_serialize(data)).join(',')}]`,
				session: session && try_serialize(session, err => {
					throw new Error(`Failed to serialize session data: ${err.message}`);
				}),
				error: error && try_serialize(props.error)
			};

			let script = `__SAPPER__={${[
				error && `error:${serialized.error},status:${status}`,
				`baseUrl:"${req.baseUrl}"`,
				serialized.preloaded && `preloaded:${serialized.preloaded}`,
				serialized.session && `session:${serialized.session}`
			].filter(Boolean).join(',')}};`;

			if (has_service_worker) {
				script += `if('serviceWorker' in navigator)navigator.serviceWorker.register('${req.baseUrl}/service-worker.js');`;
			}

			const file = [].concat(build_info.assets.main).filter(file => file && /\.js$/.test(file))[0];
			const main = `${req.baseUrl}/client/${file}`;

			if (build_info.bundler === 'rollup') {
				if (build_info.legacy_assets) {
					const legacy_main = `${req.baseUrl}/client/legacy/${build_info.legacy_assets.main}`;
					script += `(function(){try{eval("async function x(){}");var main="${main}"}catch(e){main="${legacy_main}"};var s=document.createElement("script");try{new Function("if(0)import('')")();s.src=main;s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main",main);}document.head.appendChild(s);}());`;
				} else {
					script += `var s=document.createElement("script");try{new Function("if(0)import('')")();s.src="${main}";s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main","${main}")}document.head.appendChild(s)`;
				}
			} else {
				script += `</script><script src="${main}">`;
			}

			let styles;

			// TODO make this consistent across apps
			// TODO embed build_info in placeholder.ts
			if (build_info.css && build_info.css.main) {
				const css_chunks = new Set();
				if (build_info.css.main) css_chunks.add(build_info.css.main);
				page.parts.forEach(part => {
					if (!part) return;
					const css_chunks_for_part = build_info.css.chunks[part.file];

					if (css_chunks_for_part) {
						css_chunks_for_part.forEach(file => {
							css_chunks.add(file);
						});
					}
				});

				styles = Array.from(css_chunks)
					.map(href => `<link rel="stylesheet" href="client/${href}">`)
					.join('');
			} else {
				styles = (css && css.code ? `<style>${css.code}</style>` : '');
			}

			// users can set a CSP nonce using res.locals.nonce
			const nonce_attr = (res.locals && res.locals.nonce) ? ` nonce="${res.locals.nonce}"` : '';

			const body = template()
				.replace('%sapper.base%', () => `<base href="${req.baseUrl}/">`)
				.replace('%sapper.scripts%', () => `<script${nonce_attr}>${script}</script>`)
				.replace('%sapper.html%', () => html)
				.replace('%sapper.head%', () => `<noscript id='sapper-head-start'></noscript>${head}<noscript id='sapper-head-end'></noscript>`)
				.replace('%sapper.styles%', () => styles);

			res.statusCode = status;
			res.end(body);
		} catch(err) {
			if (error) {
				bail(req, res, err);
			} else {
				handle_error(req, res, 500, err);
			}
		}
	}

	return function find_route(req, res, next) {
		if (req.path === '/service-worker-index.html') {
			const homePage = pages.find(page => page.pattern.test('/'));
			handle_page(homePage, req, res);
			return;
		}

		for (const page of pages) {
			if (page.pattern.test(req.path)) {
				handle_page(page, req, res);
				return;
			}
		}

		handle_error(req, res, 404, 'Not found');
	};
}

function read_template(dir = build_dir) {
	return fs.readFileSync(`${dir}/template.html`, 'utf-8');
}

function try_serialize(data, fail) {
	try {
		return devalue(data);
	} catch (err) {
		if (fail) fail(err);
		return null;
	}
}

var mime_raw = "application/andrew-inset\t\t\tez\napplication/applixware\t\t\t\taw\napplication/atom+xml\t\t\t\tatom\napplication/atomcat+xml\t\t\t\tatomcat\napplication/atomsvc+xml\t\t\t\tatomsvc\napplication/ccxml+xml\t\t\t\tccxml\napplication/cdmi-capability\t\t\tcdmia\napplication/cdmi-container\t\t\tcdmic\napplication/cdmi-domain\t\t\t\tcdmid\napplication/cdmi-object\t\t\t\tcdmio\napplication/cdmi-queue\t\t\t\tcdmiq\napplication/cu-seeme\t\t\t\tcu\napplication/davmount+xml\t\t\tdavmount\napplication/docbook+xml\t\t\t\tdbk\napplication/dssc+der\t\t\t\tdssc\napplication/dssc+xml\t\t\t\txdssc\napplication/ecmascript\t\t\t\tecma\napplication/emma+xml\t\t\t\temma\napplication/epub+zip\t\t\t\tepub\napplication/exi\t\t\t\t\texi\napplication/font-tdpfr\t\t\t\tpfr\napplication/gml+xml\t\t\t\tgml\napplication/gpx+xml\t\t\t\tgpx\napplication/gxf\t\t\t\t\tgxf\napplication/hyperstudio\t\t\t\tstk\napplication/inkml+xml\t\t\t\tink inkml\napplication/ipfix\t\t\t\tipfix\napplication/java-archive\t\t\tjar\napplication/java-serialized-object\t\tser\napplication/java-vm\t\t\t\tclass\napplication/javascript\t\t\t\tjs\napplication/json\t\t\t\tjson map\napplication/jsonml+json\t\t\t\tjsonml\napplication/lost+xml\t\t\t\tlostxml\napplication/mac-binhex40\t\t\thqx\napplication/mac-compactpro\t\t\tcpt\napplication/mads+xml\t\t\t\tmads\napplication/marc\t\t\t\tmrc\napplication/marcxml+xml\t\t\t\tmrcx\napplication/mathematica\t\t\t\tma nb mb\napplication/mathml+xml\t\t\t\tmathml\napplication/mbox\t\t\t\tmbox\napplication/mediaservercontrol+xml\t\tmscml\napplication/metalink+xml\t\t\tmetalink\napplication/metalink4+xml\t\t\tmeta4\napplication/mets+xml\t\t\t\tmets\napplication/mods+xml\t\t\t\tmods\napplication/mp21\t\t\t\tm21 mp21\napplication/mp4\t\t\t\t\tmp4s\napplication/msword\t\t\t\tdoc dot\napplication/mxf\t\t\t\t\tmxf\napplication/octet-stream\tbin dms lrf mar so dist distz pkg bpk dump elc deploy\napplication/oda\t\t\t\t\toda\napplication/oebps-package+xml\t\t\topf\napplication/ogg\t\t\t\t\togx\napplication/omdoc+xml\t\t\t\tomdoc\napplication/onenote\t\t\t\tonetoc onetoc2 onetmp onepkg\napplication/oxps\t\t\t\toxps\napplication/patch-ops-error+xml\t\t\txer\napplication/pdf\t\t\t\t\tpdf\napplication/pgp-encrypted\t\t\tpgp\napplication/pgp-signature\t\t\tasc sig\napplication/pics-rules\t\t\t\tprf\napplication/pkcs10\t\t\t\tp10\napplication/pkcs7-mime\t\t\t\tp7m p7c\napplication/pkcs7-signature\t\t\tp7s\napplication/pkcs8\t\t\t\tp8\napplication/pkix-attr-cert\t\t\tac\napplication/pkix-cert\t\t\t\tcer\napplication/pkix-crl\t\t\t\tcrl\napplication/pkix-pkipath\t\t\tpkipath\napplication/pkixcmp\t\t\t\tpki\napplication/pls+xml\t\t\t\tpls\napplication/postscript\t\t\t\tai eps ps\napplication/prs.cww\t\t\t\tcww\napplication/pskc+xml\t\t\t\tpskcxml\napplication/rdf+xml\t\t\t\trdf\napplication/reginfo+xml\t\t\t\trif\napplication/relax-ng-compact-syntax\t\trnc\napplication/resource-lists+xml\t\t\trl\napplication/resource-lists-diff+xml\t\trld\napplication/rls-services+xml\t\t\trs\napplication/rpki-ghostbusters\t\t\tgbr\napplication/rpki-manifest\t\t\tmft\napplication/rpki-roa\t\t\t\troa\napplication/rsd+xml\t\t\t\trsd\napplication/rss+xml\t\t\t\trss\napplication/rtf\t\t\t\t\trtf\napplication/sbml+xml\t\t\t\tsbml\napplication/scvp-cv-request\t\t\tscq\napplication/scvp-cv-response\t\t\tscs\napplication/scvp-vp-request\t\t\tspq\napplication/scvp-vp-response\t\t\tspp\napplication/sdp\t\t\t\t\tsdp\napplication/set-payment-initiation\t\tsetpay\napplication/set-registration-initiation\t\tsetreg\napplication/shf+xml\t\t\t\tshf\napplication/smil+xml\t\t\t\tsmi smil\napplication/sparql-query\t\t\trq\napplication/sparql-results+xml\t\t\tsrx\napplication/srgs\t\t\t\tgram\napplication/srgs+xml\t\t\t\tgrxml\napplication/sru+xml\t\t\t\tsru\napplication/ssdl+xml\t\t\t\tssdl\napplication/ssml+xml\t\t\t\tssml\napplication/tei+xml\t\t\t\ttei teicorpus\napplication/thraud+xml\t\t\t\ttfi\napplication/timestamped-data\t\t\ttsd\napplication/vnd.3gpp.pic-bw-large\t\tplb\napplication/vnd.3gpp.pic-bw-small\t\tpsb\napplication/vnd.3gpp.pic-bw-var\t\t\tpvb\napplication/vnd.3gpp2.tcap\t\t\ttcap\napplication/vnd.3m.post-it-notes\t\tpwn\napplication/vnd.accpac.simply.aso\t\taso\napplication/vnd.accpac.simply.imp\t\timp\napplication/vnd.acucobol\t\t\tacu\napplication/vnd.acucorp\t\t\t\tatc acutc\napplication/vnd.adobe.air-application-installer-package+zip\tair\napplication/vnd.adobe.formscentral.fcdt\t\tfcdt\napplication/vnd.adobe.fxp\t\t\tfxp fxpl\napplication/vnd.adobe.xdp+xml\t\t\txdp\napplication/vnd.adobe.xfdf\t\t\txfdf\napplication/vnd.ahead.space\t\t\tahead\napplication/vnd.airzip.filesecure.azf\t\tazf\napplication/vnd.airzip.filesecure.azs\t\tazs\napplication/vnd.amazon.ebook\t\t\tazw\napplication/vnd.americandynamics.acc\t\tacc\napplication/vnd.amiga.ami\t\t\tami\napplication/vnd.android.package-archive\t\tapk\napplication/vnd.anser-web-certificate-issue-initiation\tcii\napplication/vnd.anser-web-funds-transfer-initiation\tfti\napplication/vnd.antix.game-component\t\tatx\napplication/vnd.apple.installer+xml\t\tmpkg\napplication/vnd.apple.mpegurl\t\t\tm3u8\napplication/vnd.aristanetworks.swi\t\tswi\napplication/vnd.astraea-software.iota\t\tiota\napplication/vnd.audiograph\t\t\taep\napplication/vnd.blueice.multipass\t\tmpm\napplication/vnd.bmi\t\t\t\tbmi\napplication/vnd.businessobjects\t\t\trep\napplication/vnd.chemdraw+xml\t\t\tcdxml\napplication/vnd.chipnuts.karaoke-mmd\t\tmmd\napplication/vnd.cinderella\t\t\tcdy\napplication/vnd.claymore\t\t\tcla\napplication/vnd.cloanto.rp9\t\t\trp9\napplication/vnd.clonk.c4group\t\t\tc4g c4d c4f c4p c4u\napplication/vnd.cluetrust.cartomobile-config\t\tc11amc\napplication/vnd.cluetrust.cartomobile-config-pkg\tc11amz\napplication/vnd.commonspace\t\t\tcsp\napplication/vnd.contact.cmsg\t\t\tcdbcmsg\napplication/vnd.cosmocaller\t\t\tcmc\napplication/vnd.crick.clicker\t\t\tclkx\napplication/vnd.crick.clicker.keyboard\t\tclkk\napplication/vnd.crick.clicker.palette\t\tclkp\napplication/vnd.crick.clicker.template\t\tclkt\napplication/vnd.crick.clicker.wordbank\t\tclkw\napplication/vnd.criticaltools.wbs+xml\t\twbs\napplication/vnd.ctc-posml\t\t\tpml\napplication/vnd.cups-ppd\t\t\tppd\napplication/vnd.curl.car\t\t\tcar\napplication/vnd.curl.pcurl\t\t\tpcurl\napplication/vnd.dart\t\t\t\tdart\napplication/vnd.data-vision.rdz\t\t\trdz\napplication/vnd.dece.data\t\t\tuvf uvvf uvd uvvd\napplication/vnd.dece.ttml+xml\t\t\tuvt uvvt\napplication/vnd.dece.unspecified\t\tuvx uvvx\napplication/vnd.dece.zip\t\t\tuvz uvvz\napplication/vnd.denovo.fcselayout-link\t\tfe_launch\napplication/vnd.dna\t\t\t\tdna\napplication/vnd.dolby.mlp\t\t\tmlp\napplication/vnd.dpgraph\t\t\t\tdpg\napplication/vnd.dreamfactory\t\t\tdfac\napplication/vnd.ds-keypoint\t\t\tkpxx\napplication/vnd.dvb.ait\t\t\t\tait\napplication/vnd.dvb.service\t\t\tsvc\napplication/vnd.dynageo\t\t\t\tgeo\napplication/vnd.ecowin.chart\t\t\tmag\napplication/vnd.enliven\t\t\t\tnml\napplication/vnd.epson.esf\t\t\tesf\napplication/vnd.epson.msf\t\t\tmsf\napplication/vnd.epson.quickanime\t\tqam\napplication/vnd.epson.salt\t\t\tslt\napplication/vnd.epson.ssf\t\t\tssf\napplication/vnd.eszigno3+xml\t\t\tes3 et3\napplication/vnd.ezpix-album\t\t\tez2\napplication/vnd.ezpix-package\t\t\tez3\napplication/vnd.fdf\t\t\t\tfdf\napplication/vnd.fdsn.mseed\t\t\tmseed\napplication/vnd.fdsn.seed\t\t\tseed dataless\napplication/vnd.flographit\t\t\tgph\napplication/vnd.fluxtime.clip\t\t\tftc\napplication/vnd.framemaker\t\t\tfm frame maker book\napplication/vnd.frogans.fnc\t\t\tfnc\napplication/vnd.frogans.ltf\t\t\tltf\napplication/vnd.fsc.weblaunch\t\t\tfsc\napplication/vnd.fujitsu.oasys\t\t\toas\napplication/vnd.fujitsu.oasys2\t\t\toa2\napplication/vnd.fujitsu.oasys3\t\t\toa3\napplication/vnd.fujitsu.oasysgp\t\t\tfg5\napplication/vnd.fujitsu.oasysprs\t\tbh2\napplication/vnd.fujixerox.ddd\t\t\tddd\napplication/vnd.fujixerox.docuworks\t\txdw\napplication/vnd.fujixerox.docuworks.binder\txbd\napplication/vnd.fuzzysheet\t\t\tfzs\napplication/vnd.genomatix.tuxedo\t\ttxd\napplication/vnd.geogebra.file\t\t\tggb\napplication/vnd.geogebra.tool\t\t\tggt\napplication/vnd.geometry-explorer\t\tgex gre\napplication/vnd.geonext\t\t\t\tgxt\napplication/vnd.geoplan\t\t\t\tg2w\napplication/vnd.geospace\t\t\tg3w\napplication/vnd.gmx\t\t\t\tgmx\napplication/vnd.google-earth.kml+xml\t\tkml\napplication/vnd.google-earth.kmz\t\tkmz\napplication/vnd.grafeq\t\t\t\tgqf gqs\napplication/vnd.groove-account\t\t\tgac\napplication/vnd.groove-help\t\t\tghf\napplication/vnd.groove-identity-message\t\tgim\napplication/vnd.groove-injector\t\t\tgrv\napplication/vnd.groove-tool-message\t\tgtm\napplication/vnd.groove-tool-template\t\ttpl\napplication/vnd.groove-vcard\t\t\tvcg\napplication/vnd.hal+xml\t\t\t\thal\napplication/vnd.handheld-entertainment+xml\tzmm\napplication/vnd.hbci\t\t\t\thbci\napplication/vnd.hhe.lesson-player\t\tles\napplication/vnd.hp-hpgl\t\t\t\thpgl\napplication/vnd.hp-hpid\t\t\t\thpid\napplication/vnd.hp-hps\t\t\t\thps\napplication/vnd.hp-jlyt\t\t\t\tjlt\napplication/vnd.hp-pcl\t\t\t\tpcl\napplication/vnd.hp-pclxl\t\t\tpclxl\napplication/vnd.hydrostatix.sof-data\t\tsfd-hdstx\napplication/vnd.ibm.minipay\t\t\tmpy\napplication/vnd.ibm.modcap\t\t\tafp listafp list3820\napplication/vnd.ibm.rights-management\t\tirm\napplication/vnd.ibm.secure-container\t\tsc\napplication/vnd.iccprofile\t\t\ticc icm\napplication/vnd.igloader\t\t\tigl\napplication/vnd.immervision-ivp\t\t\tivp\napplication/vnd.immervision-ivu\t\t\tivu\napplication/vnd.insors.igm\t\t\tigm\napplication/vnd.intercon.formnet\t\txpw xpx\napplication/vnd.intergeo\t\t\ti2g\napplication/vnd.intu.qbo\t\t\tqbo\napplication/vnd.intu.qfx\t\t\tqfx\napplication/vnd.ipunplugged.rcprofile\t\trcprofile\napplication/vnd.irepository.package+xml\t\tirp\napplication/vnd.is-xpr\t\t\t\txpr\napplication/vnd.isac.fcs\t\t\tfcs\napplication/vnd.jam\t\t\t\tjam\napplication/vnd.jcp.javame.midlet-rms\t\trms\napplication/vnd.jisp\t\t\t\tjisp\napplication/vnd.joost.joda-archive\t\tjoda\napplication/vnd.kahootz\t\t\t\tktz ktr\napplication/vnd.kde.karbon\t\t\tkarbon\napplication/vnd.kde.kchart\t\t\tchrt\napplication/vnd.kde.kformula\t\t\tkfo\napplication/vnd.kde.kivio\t\t\tflw\napplication/vnd.kde.kontour\t\t\tkon\napplication/vnd.kde.kpresenter\t\t\tkpr kpt\napplication/vnd.kde.kspread\t\t\tksp\napplication/vnd.kde.kword\t\t\tkwd kwt\napplication/vnd.kenameaapp\t\t\thtke\napplication/vnd.kidspiration\t\t\tkia\napplication/vnd.kinar\t\t\t\tkne knp\napplication/vnd.koan\t\t\t\tskp skd skt skm\napplication/vnd.kodak-descriptor\t\tsse\napplication/vnd.las.las+xml\t\t\tlasxml\napplication/vnd.llamagraphics.life-balance.desktop\tlbd\napplication/vnd.llamagraphics.life-balance.exchange+xml\tlbe\napplication/vnd.lotus-1-2-3\t\t\t123\napplication/vnd.lotus-approach\t\t\tapr\napplication/vnd.lotus-freelance\t\t\tpre\napplication/vnd.lotus-notes\t\t\tnsf\napplication/vnd.lotus-organizer\t\t\torg\napplication/vnd.lotus-screencam\t\t\tscm\napplication/vnd.lotus-wordpro\t\t\tlwp\napplication/vnd.macports.portpkg\t\tportpkg\napplication/vnd.mcd\t\t\t\tmcd\napplication/vnd.medcalcdata\t\t\tmc1\napplication/vnd.mediastation.cdkey\t\tcdkey\napplication/vnd.mfer\t\t\t\tmwf\napplication/vnd.mfmp\t\t\t\tmfm\napplication/vnd.micrografx.flo\t\t\tflo\napplication/vnd.micrografx.igx\t\t\tigx\napplication/vnd.mif\t\t\t\tmif\napplication/vnd.mobius.daf\t\t\tdaf\napplication/vnd.mobius.dis\t\t\tdis\napplication/vnd.mobius.mbk\t\t\tmbk\napplication/vnd.mobius.mqy\t\t\tmqy\napplication/vnd.mobius.msl\t\t\tmsl\napplication/vnd.mobius.plc\t\t\tplc\napplication/vnd.mobius.txf\t\t\ttxf\napplication/vnd.mophun.application\t\tmpn\napplication/vnd.mophun.certificate\t\tmpc\napplication/vnd.mozilla.xul+xml\t\t\txul\napplication/vnd.ms-artgalry\t\t\tcil\napplication/vnd.ms-cab-compressed\t\tcab\napplication/vnd.ms-excel\t\t\txls xlm xla xlc xlt xlw\napplication/vnd.ms-excel.addin.macroenabled.12\t\txlam\napplication/vnd.ms-excel.sheet.binary.macroenabled.12\txlsb\napplication/vnd.ms-excel.sheet.macroenabled.12\t\txlsm\napplication/vnd.ms-excel.template.macroenabled.12\txltm\napplication/vnd.ms-fontobject\t\t\teot\napplication/vnd.ms-htmlhelp\t\t\tchm\napplication/vnd.ms-ims\t\t\t\tims\napplication/vnd.ms-lrm\t\t\t\tlrm\napplication/vnd.ms-officetheme\t\t\tthmx\napplication/vnd.ms-pki.seccat\t\t\tcat\napplication/vnd.ms-pki.stl\t\t\tstl\napplication/vnd.ms-powerpoint\t\t\tppt pps pot\napplication/vnd.ms-powerpoint.addin.macroenabled.12\t\tppam\napplication/vnd.ms-powerpoint.presentation.macroenabled.12\tpptm\napplication/vnd.ms-powerpoint.slide.macroenabled.12\t\tsldm\napplication/vnd.ms-powerpoint.slideshow.macroenabled.12\t\tppsm\napplication/vnd.ms-powerpoint.template.macroenabled.12\t\tpotm\napplication/vnd.ms-project\t\t\tmpp mpt\napplication/vnd.ms-word.document.macroenabled.12\tdocm\napplication/vnd.ms-word.template.macroenabled.12\tdotm\napplication/vnd.ms-works\t\t\twps wks wcm wdb\napplication/vnd.ms-wpl\t\t\t\twpl\napplication/vnd.ms-xpsdocument\t\t\txps\napplication/vnd.mseq\t\t\t\tmseq\napplication/vnd.musician\t\t\tmus\napplication/vnd.muvee.style\t\t\tmsty\napplication/vnd.mynfc\t\t\t\ttaglet\napplication/vnd.neurolanguage.nlu\t\tnlu\napplication/vnd.nitf\t\t\t\tntf nitf\napplication/vnd.noblenet-directory\t\tnnd\napplication/vnd.noblenet-sealer\t\t\tnns\napplication/vnd.noblenet-web\t\t\tnnw\napplication/vnd.nokia.n-gage.data\t\tngdat\napplication/vnd.nokia.n-gage.symbian.install\tn-gage\napplication/vnd.nokia.radio-preset\t\trpst\napplication/vnd.nokia.radio-presets\t\trpss\napplication/vnd.novadigm.edm\t\t\tedm\napplication/vnd.novadigm.edx\t\t\tedx\napplication/vnd.novadigm.ext\t\t\text\napplication/vnd.oasis.opendocument.chart\t\todc\napplication/vnd.oasis.opendocument.chart-template\totc\napplication/vnd.oasis.opendocument.database\t\todb\napplication/vnd.oasis.opendocument.formula\t\todf\napplication/vnd.oasis.opendocument.formula-template\todft\napplication/vnd.oasis.opendocument.graphics\t\todg\napplication/vnd.oasis.opendocument.graphics-template\totg\napplication/vnd.oasis.opendocument.image\t\todi\napplication/vnd.oasis.opendocument.image-template\toti\napplication/vnd.oasis.opendocument.presentation\t\todp\napplication/vnd.oasis.opendocument.presentation-template\totp\napplication/vnd.oasis.opendocument.spreadsheet\t\tods\napplication/vnd.oasis.opendocument.spreadsheet-template\tots\napplication/vnd.oasis.opendocument.text\t\t\todt\napplication/vnd.oasis.opendocument.text-master\t\todm\napplication/vnd.oasis.opendocument.text-template\tott\napplication/vnd.oasis.opendocument.text-web\t\toth\napplication/vnd.olpc-sugar\t\t\txo\napplication/vnd.oma.dd2+xml\t\t\tdd2\napplication/vnd.openofficeorg.extension\t\toxt\napplication/vnd.openxmlformats-officedocument.presentationml.presentation\tpptx\napplication/vnd.openxmlformats-officedocument.presentationml.slide\tsldx\napplication/vnd.openxmlformats-officedocument.presentationml.slideshow\tppsx\napplication/vnd.openxmlformats-officedocument.presentationml.template\tpotx\napplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet\txlsx\napplication/vnd.openxmlformats-officedocument.spreadsheetml.template\txltx\napplication/vnd.openxmlformats-officedocument.wordprocessingml.document\tdocx\napplication/vnd.openxmlformats-officedocument.wordprocessingml.template\tdotx\napplication/vnd.osgeo.mapguide.package\t\tmgp\napplication/vnd.osgi.dp\t\t\t\tdp\napplication/vnd.osgi.subsystem\t\t\tesa\napplication/vnd.palm\t\t\t\tpdb pqa oprc\napplication/vnd.pawaafile\t\t\tpaw\napplication/vnd.pg.format\t\t\tstr\napplication/vnd.pg.osasli\t\t\tei6\napplication/vnd.picsel\t\t\t\tefif\napplication/vnd.pmi.widget\t\t\twg\napplication/vnd.pocketlearn\t\t\tplf\napplication/vnd.powerbuilder6\t\t\tpbd\napplication/vnd.previewsystems.box\t\tbox\napplication/vnd.proteus.magazine\t\tmgz\napplication/vnd.publishare-delta-tree\t\tqps\napplication/vnd.pvi.ptid1\t\t\tptid\napplication/vnd.quark.quarkxpress\t\tqxd qxt qwd qwt qxl qxb\napplication/vnd.realvnc.bed\t\t\tbed\napplication/vnd.recordare.musicxml\t\tmxl\napplication/vnd.recordare.musicxml+xml\t\tmusicxml\napplication/vnd.rig.cryptonote\t\t\tcryptonote\napplication/vnd.rim.cod\t\t\t\tcod\napplication/vnd.rn-realmedia\t\t\trm\napplication/vnd.rn-realmedia-vbr\t\trmvb\napplication/vnd.route66.link66+xml\t\tlink66\napplication/vnd.sailingtracker.track\t\tst\napplication/vnd.seemail\t\t\t\tsee\napplication/vnd.sema\t\t\t\tsema\napplication/vnd.semd\t\t\t\tsemd\napplication/vnd.semf\t\t\t\tsemf\napplication/vnd.shana.informed.formdata\t\tifm\napplication/vnd.shana.informed.formtemplate\titp\napplication/vnd.shana.informed.interchange\tiif\napplication/vnd.shana.informed.package\t\tipk\napplication/vnd.simtech-mindmapper\t\ttwd twds\napplication/vnd.smaf\t\t\t\tmmf\napplication/vnd.smart.teacher\t\t\tteacher\napplication/vnd.solent.sdkm+xml\t\t\tsdkm sdkd\napplication/vnd.spotfire.dxp\t\t\tdxp\napplication/vnd.spotfire.sfs\t\t\tsfs\napplication/vnd.stardivision.calc\t\tsdc\napplication/vnd.stardivision.draw\t\tsda\napplication/vnd.stardivision.impress\t\tsdd\napplication/vnd.stardivision.math\t\tsmf\napplication/vnd.stardivision.writer\t\tsdw vor\napplication/vnd.stardivision.writer-global\tsgl\napplication/vnd.stepmania.package\t\tsmzip\napplication/vnd.stepmania.stepchart\t\tsm\napplication/vnd.sun.xml.calc\t\t\tsxc\napplication/vnd.sun.xml.calc.template\t\tstc\napplication/vnd.sun.xml.draw\t\t\tsxd\napplication/vnd.sun.xml.draw.template\t\tstd\napplication/vnd.sun.xml.impress\t\t\tsxi\napplication/vnd.sun.xml.impress.template\tsti\napplication/vnd.sun.xml.math\t\t\tsxm\napplication/vnd.sun.xml.writer\t\t\tsxw\napplication/vnd.sun.xml.writer.global\t\tsxg\napplication/vnd.sun.xml.writer.template\t\tstw\napplication/vnd.sus-calendar\t\t\tsus susp\napplication/vnd.svd\t\t\t\tsvd\napplication/vnd.symbian.install\t\t\tsis sisx\napplication/vnd.syncml+xml\t\t\txsm\napplication/vnd.syncml.dm+wbxml\t\t\tbdm\napplication/vnd.syncml.dm+xml\t\t\txdm\napplication/vnd.tao.intent-module-archive\ttao\napplication/vnd.tcpdump.pcap\t\t\tpcap cap dmp\napplication/vnd.tmobile-livetv\t\t\ttmo\napplication/vnd.trid.tpt\t\t\ttpt\napplication/vnd.triscape.mxs\t\t\tmxs\napplication/vnd.trueapp\t\t\t\ttra\napplication/vnd.ufdl\t\t\t\tufd ufdl\napplication/vnd.uiq.theme\t\t\tutz\napplication/vnd.umajin\t\t\t\tumj\napplication/vnd.unity\t\t\t\tunityweb\napplication/vnd.uoml+xml\t\t\tuoml\napplication/vnd.vcx\t\t\t\tvcx\napplication/vnd.visio\t\t\t\tvsd vst vss vsw\napplication/vnd.visionary\t\t\tvis\napplication/vnd.vsf\t\t\t\tvsf\napplication/vnd.wap.wbxml\t\t\twbxml\napplication/vnd.wap.wmlc\t\t\twmlc\napplication/vnd.wap.wmlscriptc\t\t\twmlsc\napplication/vnd.webturbo\t\t\twtb\napplication/vnd.wolfram.player\t\t\tnbp\napplication/vnd.wordperfect\t\t\twpd\napplication/vnd.wqd\t\t\t\twqd\napplication/vnd.wt.stf\t\t\t\tstf\napplication/vnd.xara\t\t\t\txar\napplication/vnd.xfdl\t\t\t\txfdl\napplication/vnd.yamaha.hv-dic\t\t\thvd\napplication/vnd.yamaha.hv-script\t\thvs\napplication/vnd.yamaha.hv-voice\t\t\thvp\napplication/vnd.yamaha.openscoreformat\t\t\tosf\napplication/vnd.yamaha.openscoreformat.osfpvg+xml\tosfpvg\napplication/vnd.yamaha.smaf-audio\t\tsaf\napplication/vnd.yamaha.smaf-phrase\t\tspf\napplication/vnd.yellowriver-custom-menu\t\tcmp\napplication/vnd.zul\t\t\t\tzir zirz\napplication/vnd.zzazz.deck+xml\t\t\tzaz\napplication/voicexml+xml\t\t\tvxml\napplication/wasm\t\t\t\twasm\napplication/widget\t\t\t\twgt\napplication/winhlp\t\t\t\thlp\napplication/wsdl+xml\t\t\t\twsdl\napplication/wspolicy+xml\t\t\twspolicy\napplication/x-7z-compressed\t\t\t7z\napplication/x-abiword\t\t\t\tabw\napplication/x-ace-compressed\t\t\tace\napplication/x-apple-diskimage\t\t\tdmg\napplication/x-authorware-bin\t\t\taab x32 u32 vox\napplication/x-authorware-map\t\t\taam\napplication/x-authorware-seg\t\t\taas\napplication/x-bcpio\t\t\t\tbcpio\napplication/x-bittorrent\t\t\ttorrent\napplication/x-blorb\t\t\t\tblb blorb\napplication/x-bzip\t\t\t\tbz\napplication/x-bzip2\t\t\t\tbz2 boz\napplication/x-cbr\t\t\t\tcbr cba cbt cbz cb7\napplication/x-cdlink\t\t\t\tvcd\napplication/x-cfs-compressed\t\t\tcfs\napplication/x-chat\t\t\t\tchat\napplication/x-chess-pgn\t\t\t\tpgn\napplication/x-conference\t\t\tnsc\napplication/x-cpio\t\t\t\tcpio\napplication/x-csh\t\t\t\tcsh\napplication/x-debian-package\t\t\tdeb udeb\napplication/x-dgc-compressed\t\t\tdgc\napplication/x-director\t\t\tdir dcr dxr cst cct cxt w3d fgd swa\napplication/x-doom\t\t\t\twad\napplication/x-dtbncx+xml\t\t\tncx\napplication/x-dtbook+xml\t\t\tdtb\napplication/x-dtbresource+xml\t\t\tres\napplication/x-dvi\t\t\t\tdvi\napplication/x-envoy\t\t\t\tevy\napplication/x-eva\t\t\t\teva\napplication/x-font-bdf\t\t\t\tbdf\napplication/x-font-ghostscript\t\t\tgsf\napplication/x-font-linux-psf\t\t\tpsf\napplication/x-font-pcf\t\t\t\tpcf\napplication/x-font-snf\t\t\t\tsnf\napplication/x-font-type1\t\t\tpfa pfb pfm afm\napplication/x-freearc\t\t\t\tarc\napplication/x-futuresplash\t\t\tspl\napplication/x-gca-compressed\t\t\tgca\napplication/x-glulx\t\t\t\tulx\napplication/x-gnumeric\t\t\t\tgnumeric\napplication/x-gramps-xml\t\t\tgramps\napplication/x-gtar\t\t\t\tgtar\napplication/x-hdf\t\t\t\thdf\napplication/x-install-instructions\t\tinstall\napplication/x-iso9660-image\t\t\tiso\napplication/x-java-jnlp-file\t\t\tjnlp\napplication/x-latex\t\t\t\tlatex\napplication/x-lzh-compressed\t\t\tlzh lha\napplication/x-mie\t\t\t\tmie\napplication/x-mobipocket-ebook\t\t\tprc mobi\napplication/x-ms-application\t\t\tapplication\napplication/x-ms-shortcut\t\t\tlnk\napplication/x-ms-wmd\t\t\t\twmd\napplication/x-ms-wmz\t\t\t\twmz\napplication/x-ms-xbap\t\t\t\txbap\napplication/x-msaccess\t\t\t\tmdb\napplication/x-msbinder\t\t\t\tobd\napplication/x-mscardfile\t\t\tcrd\napplication/x-msclip\t\t\t\tclp\napplication/x-msdownload\t\t\texe dll com bat msi\napplication/x-msmediaview\t\t\tmvb m13 m14\napplication/x-msmetafile\t\t\twmf wmz emf emz\napplication/x-msmoney\t\t\t\tmny\napplication/x-mspublisher\t\t\tpub\napplication/x-msschedule\t\t\tscd\napplication/x-msterminal\t\t\ttrm\napplication/x-mswrite\t\t\t\twri\napplication/x-netcdf\t\t\t\tnc cdf\napplication/x-nzb\t\t\t\tnzb\napplication/x-pkcs12\t\t\t\tp12 pfx\napplication/x-pkcs7-certificates\t\tp7b spc\napplication/x-pkcs7-certreqresp\t\t\tp7r\napplication/x-rar-compressed\t\t\trar\napplication/x-research-info-systems\t\tris\napplication/x-sh\t\t\t\tsh\napplication/x-shar\t\t\t\tshar\napplication/x-shockwave-flash\t\t\tswf\napplication/x-silverlight-app\t\t\txap\napplication/x-sql\t\t\t\tsql\napplication/x-stuffit\t\t\t\tsit\napplication/x-stuffitx\t\t\t\tsitx\napplication/x-subrip\t\t\t\tsrt\napplication/x-sv4cpio\t\t\t\tsv4cpio\napplication/x-sv4crc\t\t\t\tsv4crc\napplication/x-t3vm-image\t\t\tt3\napplication/x-tads\t\t\t\tgam\napplication/x-tar\t\t\t\ttar\napplication/x-tcl\t\t\t\ttcl\napplication/x-tex\t\t\t\ttex\napplication/x-tex-tfm\t\t\t\ttfm\napplication/x-texinfo\t\t\t\ttexinfo texi\napplication/x-tgif\t\t\t\tobj\napplication/x-ustar\t\t\t\tustar\napplication/x-wais-source\t\t\tsrc\napplication/x-x509-ca-cert\t\t\tder crt\napplication/x-xfig\t\t\t\tfig\napplication/x-xliff+xml\t\t\t\txlf\napplication/x-xpinstall\t\t\t\txpi\napplication/x-xz\t\t\t\txz\napplication/x-zmachine\t\t\t\tz1 z2 z3 z4 z5 z6 z7 z8\napplication/xaml+xml\t\t\t\txaml\napplication/xcap-diff+xml\t\t\txdf\napplication/xenc+xml\t\t\t\txenc\napplication/xhtml+xml\t\t\t\txhtml xht\napplication/xml\t\t\t\t\txml xsl\napplication/xml-dtd\t\t\t\tdtd\napplication/xop+xml\t\t\t\txop\napplication/xproc+xml\t\t\t\txpl\napplication/xslt+xml\t\t\t\txslt\napplication/xspf+xml\t\t\t\txspf\napplication/xv+xml\t\t\t\tmxml xhvml xvml xvm\napplication/yang\t\t\t\tyang\napplication/yin+xml\t\t\t\tyin\napplication/zip\t\t\t\t\tzip\naudio/adpcm\t\t\t\t\tadp\naudio/basic\t\t\t\t\tau snd\naudio/midi\t\t\t\t\tmid midi kar rmi\naudio/mp4\t\t\t\t\tm4a mp4a\naudio/mpeg\t\t\t\t\tmpga mp2 mp2a mp3 m2a m3a\naudio/ogg\t\t\t\t\toga ogg spx\naudio/s3m\t\t\t\t\ts3m\naudio/silk\t\t\t\t\tsil\naudio/vnd.dece.audio\t\t\t\tuva uvva\naudio/vnd.digital-winds\t\t\t\teol\naudio/vnd.dra\t\t\t\t\tdra\naudio/vnd.dts\t\t\t\t\tdts\naudio/vnd.dts.hd\t\t\t\tdtshd\naudio/vnd.lucent.voice\t\t\t\tlvp\naudio/vnd.ms-playready.media.pya\t\tpya\naudio/vnd.nuera.ecelp4800\t\t\tecelp4800\naudio/vnd.nuera.ecelp7470\t\t\tecelp7470\naudio/vnd.nuera.ecelp9600\t\t\tecelp9600\naudio/vnd.rip\t\t\t\t\trip\naudio/webm\t\t\t\t\tweba\naudio/x-aac\t\t\t\t\taac\naudio/x-aiff\t\t\t\t\taif aiff aifc\naudio/x-caf\t\t\t\t\tcaf\naudio/x-flac\t\t\t\t\tflac\naudio/x-matroska\t\t\t\tmka\naudio/x-mpegurl\t\t\t\t\tm3u\naudio/x-ms-wax\t\t\t\t\twax\naudio/x-ms-wma\t\t\t\t\twma\naudio/x-pn-realaudio\t\t\t\tram ra\naudio/x-pn-realaudio-plugin\t\t\trmp\naudio/x-wav\t\t\t\t\twav\naudio/xm\t\t\t\t\txm\nchemical/x-cdx\t\t\t\t\tcdx\nchemical/x-cif\t\t\t\t\tcif\nchemical/x-cmdf\t\t\t\t\tcmdf\nchemical/x-cml\t\t\t\t\tcml\nchemical/x-csml\t\t\t\t\tcsml\nchemical/x-xyz\t\t\t\t\txyz\nfont/collection\t\t\t\t\tttc\nfont/otf\t\t\t\t\totf\nfont/ttf\t\t\t\t\tttf\nfont/woff\t\t\t\t\twoff\nfont/woff2\t\t\t\t\twoff2\nimage/bmp\t\t\t\t\tbmp\nimage/cgm\t\t\t\t\tcgm\nimage/g3fax\t\t\t\t\tg3\nimage/gif\t\t\t\t\tgif\nimage/ief\t\t\t\t\tief\nimage/jpeg\t\t\t\t\tjpeg jpg jpe\nimage/ktx\t\t\t\t\tktx\nimage/png\t\t\t\t\tpng\nimage/prs.btif\t\t\t\t\tbtif\nimage/sgi\t\t\t\t\tsgi\nimage/svg+xml\t\t\t\t\tsvg svgz\nimage/tiff\t\t\t\t\ttiff tif\nimage/vnd.adobe.photoshop\t\t\tpsd\nimage/vnd.dece.graphic\t\t\t\tuvi uvvi uvg uvvg\nimage/vnd.djvu\t\t\t\t\tdjvu djv\nimage/vnd.dvb.subtitle\t\t\t\tsub\nimage/vnd.dwg\t\t\t\t\tdwg\nimage/vnd.dxf\t\t\t\t\tdxf\nimage/vnd.fastbidsheet\t\t\t\tfbs\nimage/vnd.fpx\t\t\t\t\tfpx\nimage/vnd.fst\t\t\t\t\tfst\nimage/vnd.fujixerox.edmics-mmr\t\t\tmmr\nimage/vnd.fujixerox.edmics-rlc\t\t\trlc\nimage/vnd.ms-modi\t\t\t\tmdi\nimage/vnd.ms-photo\t\t\t\twdp\nimage/vnd.net-fpx\t\t\t\tnpx\nimage/vnd.wap.wbmp\t\t\t\twbmp\nimage/vnd.xiff\t\t\t\t\txif\nimage/webp\t\t\t\t\twebp\nimage/x-3ds\t\t\t\t\t3ds\nimage/x-cmu-raster\t\t\t\tras\nimage/x-cmx\t\t\t\t\tcmx\nimage/x-freehand\t\t\t\tfh fhc fh4 fh5 fh7\nimage/x-icon\t\t\t\t\tico\nimage/x-mrsid-image\t\t\t\tsid\nimage/x-pcx\t\t\t\t\tpcx\nimage/x-pict\t\t\t\t\tpic pct\nimage/x-portable-anymap\t\t\t\tpnm\nimage/x-portable-bitmap\t\t\t\tpbm\nimage/x-portable-graymap\t\t\tpgm\nimage/x-portable-pixmap\t\t\t\tppm\nimage/x-rgb\t\t\t\t\trgb\nimage/x-tga\t\t\t\t\ttga\nimage/x-xbitmap\t\t\t\t\txbm\nimage/x-xpixmap\t\t\t\t\txpm\nimage/x-xwindowdump\t\t\t\txwd\nmessage/rfc822\t\t\t\t\teml mime\nmodel/iges\t\t\t\t\tigs iges\nmodel/mesh\t\t\t\t\tmsh mesh silo\nmodel/vnd.collada+xml\t\t\t\tdae\nmodel/vnd.dwf\t\t\t\t\tdwf\nmodel/vnd.gdl\t\t\t\t\tgdl\nmodel/vnd.gtw\t\t\t\t\tgtw\nmodel/vnd.mts\t\t\t\t\tmts\nmodel/vnd.vtu\t\t\t\t\tvtu\nmodel/vrml\t\t\t\t\twrl vrml\nmodel/x3d+binary\t\t\t\tx3db x3dbz\nmodel/x3d+vrml\t\t\t\t\tx3dv x3dvz\nmodel/x3d+xml\t\t\t\t\tx3d x3dz\ntext/cache-manifest\t\t\t\tappcache\ntext/calendar\t\t\t\t\tics ifb\ntext/css\t\t\t\t\tcss\ntext/csv\t\t\t\t\tcsv\ntext/html\t\t\t\t\thtml htm\ntext/n3\t\t\t\t\t\tn3\ntext/plain\t\t\t\t\ttxt text conf def list log in\ntext/prs.lines.tag\t\t\t\tdsc\ntext/richtext\t\t\t\t\trtx\ntext/sgml\t\t\t\t\tsgml sgm\ntext/tab-separated-values\t\t\ttsv\ntext/troff\t\t\t\t\tt tr roff man me ms\ntext/turtle\t\t\t\t\tttl\ntext/uri-list\t\t\t\t\turi uris urls\ntext/vcard\t\t\t\t\tvcard\ntext/vnd.curl\t\t\t\t\tcurl\ntext/vnd.curl.dcurl\t\t\t\tdcurl\ntext/vnd.curl.mcurl\t\t\t\tmcurl\ntext/vnd.curl.scurl\t\t\t\tscurl\ntext/vnd.dvb.subtitle\t\t\t\tsub\ntext/vnd.fly\t\t\t\t\tfly\ntext/vnd.fmi.flexstor\t\t\t\tflx\ntext/vnd.graphviz\t\t\t\tgv\ntext/vnd.in3d.3dml\t\t\t\t3dml\ntext/vnd.in3d.spot\t\t\t\tspot\ntext/vnd.sun.j2me.app-descriptor\t\tjad\ntext/vnd.wap.wml\t\t\t\twml\ntext/vnd.wap.wmlscript\t\t\t\twmls\ntext/x-asm\t\t\t\t\ts asm\ntext/x-c\t\t\t\t\tc cc cxx cpp h hh dic\ntext/x-fortran\t\t\t\t\tf for f77 f90\ntext/x-java-source\t\t\t\tjava\ntext/x-nfo\t\t\t\t\tnfo\ntext/x-opml\t\t\t\t\topml\ntext/x-pascal\t\t\t\t\tp pas\ntext/x-setext\t\t\t\t\tetx\ntext/x-sfv\t\t\t\t\tsfv\ntext/x-uuencode\t\t\t\t\tuu\ntext/x-vcalendar\t\t\t\tvcs\ntext/x-vcard\t\t\t\t\tvcf\nvideo/3gpp\t\t\t\t\t3gp\nvideo/3gpp2\t\t\t\t\t3g2\nvideo/h261\t\t\t\t\th261\nvideo/h263\t\t\t\t\th263\nvideo/h264\t\t\t\t\th264\nvideo/jpeg\t\t\t\t\tjpgv\nvideo/jpm\t\t\t\t\tjpm jpgm\nvideo/mj2\t\t\t\t\tmj2 mjp2\nvideo/mp4\t\t\t\t\tmp4 mp4v mpg4\nvideo/mpeg\t\t\t\t\tmpeg mpg mpe m1v m2v\nvideo/ogg\t\t\t\t\togv\nvideo/quicktime\t\t\t\t\tqt mov\nvideo/vnd.dece.hd\t\t\t\tuvh uvvh\nvideo/vnd.dece.mobile\t\t\t\tuvm uvvm\nvideo/vnd.dece.pd\t\t\t\tuvp uvvp\nvideo/vnd.dece.sd\t\t\t\tuvs uvvs\nvideo/vnd.dece.video\t\t\t\tuvv uvvv\nvideo/vnd.dvb.file\t\t\t\tdvb\nvideo/vnd.fvt\t\t\t\t\tfvt\nvideo/vnd.mpegurl\t\t\t\tmxu m4u\nvideo/vnd.ms-playready.media.pyv\t\tpyv\nvideo/vnd.uvvu.mp4\t\t\t\tuvu uvvu\nvideo/vnd.vivo\t\t\t\t\tviv\nvideo/webm\t\t\t\t\twebm\nvideo/x-f4v\t\t\t\t\tf4v\nvideo/x-fli\t\t\t\t\tfli\nvideo/x-flv\t\t\t\t\tflv\nvideo/x-m4v\t\t\t\t\tm4v\nvideo/x-matroska\t\t\t\tmkv mk3d mks\nvideo/x-mng\t\t\t\t\tmng\nvideo/x-ms-asf\t\t\t\t\tasf asx\nvideo/x-ms-vob\t\t\t\t\tvob\nvideo/x-ms-wm\t\t\t\t\twm\nvideo/x-ms-wmv\t\t\t\t\twmv\nvideo/x-ms-wmx\t\t\t\t\twmx\nvideo/x-ms-wvx\t\t\t\t\twvx\nvideo/x-msvideo\t\t\t\t\tavi\nvideo/x-sgi-movie\t\t\t\tmovie\nvideo/x-smv\t\t\t\t\tsmv\nx-conference/x-cooltalk\t\t\t\tice\n";

const map = new Map();

mime_raw.split('\n').forEach((row) => {
	const match = /(.+?)\t+(.+)/.exec(row);
	if (!match) return;

	const type = match[1];
	const extensions = match[2].split(' ');

	extensions.forEach(ext => {
		map.set(ext, type);
	});
});

function lookup$1(file) {
	const match = /\.([^\.]+)$/.exec(file);
	return match && map.get(match[1]);
}

function middleware(opts


 = {}) {
	const { session, ignore } = opts;

	let emitted_basepath = false;

	return compose_handlers(ignore, [
		(req, res, next) => {
			if (req.baseUrl === undefined) {
				let { originalUrl } = req;
				if (req.url === '/' && originalUrl[originalUrl.length - 1] !== '/') {
					originalUrl += '/';
				}

				req.baseUrl = originalUrl
					? originalUrl.slice(0, -req.url.length)
					: '';
			}

			if (!emitted_basepath && process.send) {
				process.send({
					__sapper__: true,
					event: 'basepath',
					basepath: req.baseUrl
				});

				emitted_basepath = true;
			}

			if (req.path === undefined) {
				req.path = req.url.replace(/\?.*/, '');
			}

			next();
		},

		fs.existsSync(path.join(build_dir, 'service-worker.js')) && serve({
			pathname: '/service-worker.js',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		fs.existsSync(path.join(build_dir, 'service-worker.js.map')) && serve({
			pathname: '/service-worker.js.map',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		serve({
			prefix: '/client/',
			cache_control:  'max-age=31536000, immutable'
		}),

		get_server_route_handler(manifest.server_routes),

		get_page_handler(manifest, session || noop$1)
	].filter(Boolean));
}

function compose_handlers(ignore, handlers) {
	const total = handlers.length;

	function nth_handler(n, req, res, next) {
		if (n >= total) {
			return next();
		}

		handlers[n](req, res, () => nth_handler(n+1, req, res, next));
	}

	return !ignore
		? (req, res, next) => nth_handler(0, req, res, next)
		: (req, res, next) => {
			if (should_ignore(req.path, ignore)) {
				next();
			} else {
				nth_handler(0, req, res, next);
			}
		};
}

function should_ignore(uri, val) {
	if (Array.isArray(val)) return val.some(x => should_ignore(uri, x));
	if (val instanceof RegExp) return val.test(uri);
	if (typeof val === 'function') return val(uri);
	return uri.startsWith(val.charCodeAt(0) === 47 ? val : `/${val}`);
}

function serve({ prefix, pathname, cache_control }



) {
	const filter = pathname
		? (req) => req.path === pathname
		: (req) => req.path.startsWith(prefix);

	const cache = new Map();

	const read =  (file) => (cache.has(file) ? cache : cache.set(file, fs.readFileSync(path.resolve(build_dir, file)))).get(file);

	return (req, res, next) => {
		if (filter(req)) {
			const type = lookup$1(req.path);

			try {
				const file = decodeURIComponent(req.path.slice(1));
				const data = read(file);

				res.setHeader('Content-Type', type);
				res.setHeader('Cache-Control', cache_control);
				res.end(data);
			} catch (err) {
				res.statusCode = 404;
				res.end('not found');
			}
		} else {
			next();
		}
	};
}

function noop$1(){}

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
