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
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
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
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
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

/* node_modules/svelte-fa/src/fa.svelte generated by Svelte v3.24.1 */

const Fa = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { class: clazz = "" } = $$props;
	let { id = "" } = $$props;
	let { style = "" } = $$props;
	let { icon } = $$props;
	let { fw = false } = $$props;
	let { flip = false } = $$props;
	let { pull = false } = $$props;
	let { rotate = false } = $$props;
	let { size = false } = $$props;
	let { color = "" } = $$props;
	let { primaryColor = "" } = $$props;
	let { secondaryColor = "" } = $$props;
	let { primaryOpacity = 1 } = $$props;
	let { secondaryOpacity = 0.4 } = $$props;
	let { swapOpacity = false } = $$props;
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
	i = icon && icon.icon || [0, 0, "", [], ""];

	 {
		{
			let float;
			let width;
			const height = "1em";
			let lineHeight;
			let fontSize;
			let textAlign;
			let verticalAlign = "-.125em";
			const overflow = "visible";

			if (fw) {
				textAlign = "center";
				width = "1.25em";
			}

			if (pull) {
				float = pull;
			}

			if (size) {
				if (size == "lg") {
					fontSize = "1.33333em";
					lineHeight = ".75em";
					verticalAlign = "-.225em";
				} else if (size == "xs") {
					fontSize = ".75em";
				} else if (size == "sm") {
					fontSize = ".875em";
				} else {
					fontSize = size.replace("x", "em");
				}
			}

			const styleObj = {
				float,
				width,
				height,
				"line-height": lineHeight,
				"font-size": fontSize,
				"text-align": textAlign,
				"vertical-align": verticalAlign,
				overflow
			};

			let styleStr = "";

			for (const prop in styleObj) {
				if (styleObj[prop]) {
					styleStr += `${prop}:${styleObj[prop]};`;
				}
			}

			s = styleStr + style;
		}
	}

	 {
		{
			let t = "";

			if (flip) {
				let flipX = 1;
				let flipY = 1;

				if (flip == "horizontal") {
					flipX = -1;
				} else if (flip == "vertical") {
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
	}

	return `${i[4]
	? `<svg${add_attribute("id", id, 0)}${add_attribute("class", clazz, 0)}${add_attribute("style", s, 0)}${add_attribute("viewBox", `0 0 ${i[0]} ${i[1]}`, 0)} aria-hidden="${"true"}" role="${"img"}" xmlns="${"http://www.w3.org/2000/svg"}"><g transform="${"translate(256 256)"}"><g${add_attribute("transform", transform, 0)}>${typeof i[4] == "string"
		? `<path${add_attribute("d", i[4], 0)}${add_attribute("fill", color || primaryColor || "currentColor", 0)} transform="${"translate(-256 -256)"}"></path>`
		: `<path${add_attribute("d", i[4][0], 0)}${add_attribute("fill", secondaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? primaryOpacity : secondaryOpacity, 0)} transform="${"translate(-256 -256)"}"></path>
          <path${add_attribute("d", i[4][1], 0)}${add_attribute("fill", primaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? secondaryOpacity : primaryOpacity, 0)} transform="${"translate(-256 -256)"}"></path>`}</g></g></svg>`
	: ``}`;
});

/* src/routes/index.svelte generated by Svelte v3.24.1 */

const Routes = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {

	let units = [
		{
			"name": "Acetaminophen",
			"specimen": "Serum, Plasma",
			"conventionalRange": "10-30",
			"conventionalUnit": "µg/mL",
			"factor": "6.614",
			"siRange": "66-200",
			"siUnit": "µmol/L",
			"siValue": "66",
			"usValue": "10"
		},
		{
			"name": "Acetoacetate",
			"specimen": "Serum, Plasma",
			"conventionalRange": "<1",
			"conventionalUnit": "mg/dL",
			"factor": "97.95",
			"siRange": "<100",
			"siUnit": "µmol/L",
			"siValue": "100",
			"usValue": "1"
		},
		{
			"name": "Acetone",
			"specimen": "Serum, Plasma",
			"conventionalRange": "<1.0",
			"conventionalUnit": "mg/dL",
			"factor": "0.172",
			"siRange": "<0.17",
			"siUnit": "mmol/L",
			"siValue": "0.17",
			"usValue": "1.0"
		},
		{
			"name": "Acid phosphatase",
			"specimen": "Serum",
			"conventionalRange": "<5.5",
			"conventionalUnit": "U/L",
			"factor": "16.667",
			"siRange": "<90",
			"siUnit": "nkat/L",
			"siValue": "90",
			"usValue": "5.5"
		},
		{
			"name": "Activated partial thromboplastin time (APTT)",
			"specimen": "Whole blood",
			"conventionalRange": "25-40",
			"conventionalUnit": "s",
			"factor": "1",
			"siRange": "25-40",
			"siUnit": "s",
			"siValue": "25",
			"usValue": "25"
		},
		{
			"name": "Adenosine deaminase",
			"specimen": "Serum",
			"conventionalRange": "11.5-25.0",
			"conventionalUnit": "U/L",
			"factor": "16.667",
			"siRange": "190-420",
			"siUnit": "nkat/L",
			"siValue": "190",
			"usValue": "11.5"
		},
		{
			"name": "Adrenocorticotropic hormone (ACTH)",
			"specimen": "Plasma",
			"conventionalRange": "<120",
			"conventionalUnit": "pg/mL",
			"factor": "0.22",
			"siRange": "<26",
			"siUnit": "pmol/L",
			"siValue": "26",
			"usValue": "120"
		},
		{
			"name": "Alanine",
			"specimen": "Plasma",
			"conventionalRange": "1.87-5.89",
			"conventionalUnit": "mg/dL",
			"factor": "112.2",
			"siRange": "210-661",
			"siUnit": "µmol/L",
			"siValue": "210",
			"usValue": "1.87"
		},
		{
			"name": "Alanine aminotransferase (ALT)",
			"specimen": "Serum",
			"conventionalRange": "10-40",
			"conventionalUnit": "U/L",
			"factor": "0.0167",
			"siRange": "0.17-0.68",
			"siUnit": "µkat/L",
			"siValue": "0.17",
			"usValue": "10"
		},
		{
			"name": "Albumin",
			"specimen": "Serum",
			"conventionalRange": "3.5-5.0",
			"conventionalUnit": "g/dL",
			"factor": "10",
			"siRange": "35-50",
			"siUnit": "g/L",
			"siValue": "35",
			"usValue": "3.5"
		},
		{
			"name": "Alcohol dehydrogenase",
			"specimen": "Serum",
			"conventionalRange": "<2.8",
			"conventionalUnit": "U/L",
			"factor": "16.667",
			"siRange": "<47",
			"siUnit": "nkat/L",
			"siValue": "47",
			"usValue": "2.8"
		},
		{
			"name": "Aldolase",
			"specimen": "Serum",
			"conventionalRange": "1.0-7.5",
			"conventionalUnit": "U/L",
			"factor": "0.0167",
			"siRange": "0.02-0.13",
			"siUnit": "µkat/L",
			"siValue": "0.02",
			"usValue": "1.0"
		},
		{
			"name": "Aldosterone",
			"specimen": "Serum, Plasma",
			"conventionalRange": "2-9",
			"conventionalUnit": "ng/dL",
			"factor": "27.74",
			"siRange": "55-250",
			"siUnit": "pmol/L",
			"siValue": "55",
			"usValue": "2"
		},
		{
			"name": "Alkaline phosphatase",
			"specimen": "Serum",
			"conventionalRange": "30-120",
			"conventionalUnit": "U/L",
			"factor": "0.0167",
			"siRange": "0.5-2.0",
			"siUnit": "µkat/L",
			"siValue": "0.5",
			"usValue": "30"
		},
		{
			"name": "Alprazolam",
			"specimen": "Serum, Plasma",
			"conventionalRange": "10-50",
			"conventionalUnit": "ng/mL",
			"factor": "3.24",
			"siRange": "32-162",
			"siUnit": "nmol/L",
			"siValue": "32",
			"usValue": "10"
		},
		{
			"name": "Amikacin",
			"specimen": "Serum, Plasma",
			"conventionalRange": "20-30",
			"conventionalUnit": "µg/mL",
			"factor": "1.708",
			"siRange": "34-52",
			"siUnit": "µmol/L",
			"siValue": "34",
			"usValue": "20"
		},
		{
			"name": "α-Aminobutyric acid",
			"specimen": "Plasma",
			"conventionalRange": "0.08-0.36",
			"conventionalUnit": "mg/dL",
			"factor": "96.97",
			"siRange": "8-35",
			"siUnit": "µmol/L",
			"siValue": "8",
			"usValue": "0.08"
		},
		{
			"name": "δ-Aminolevulinic acid",
			"specimen": "Serum",
			"conventionalRange": "15-23",
			"conventionalUnit": "µg/dL",
			"factor": "0.0763",
			"siRange": "1.1-8.0",
			"siUnit": "µmol/L",
			"siValue": "1.1",
			"usValue": "15"
		},
		{
			"name": "Amiodarone",
			"specimen": "Serum, Plasma",
			"conventionalRange": "0.5-2.5",
			"conventionalUnit": "µg/mL",
			"factor": "1.55",
			"siRange": "0.8-3.9",
			"siUnit": "µmol/L",
			"siValue": "0.8",
			"usValue": "0.5"
		},
		{
			"name": "Amitriptyline",
			"specimen": "Plasma",
			"conventionalRange": "120-250",
			"conventionalUnit": "ng/mL",
			"factor": "3.605",
			"siRange": "433-903",
			"siUnit": "nmol/L",
			"siValue": "433",
			"usValue": "120"
		},
		{
			"name": "Ammonia (as nitrogen)",
			"specimen": "Serum, Plasma",
			"conventionalRange": "15-45",
			"conventionalUnit": "µg/dL",
			"factor": "0.714",
			"siRange": "11-32",
			"siUnit": "µmol/L",
			"siValue": "11",
			"usValue": "15"
		},
		{
			"name": "Amobarbital",
			"specimen": "Serum",
			"conventionalRange": "1-5",
			"conventionalUnit": "µg/mL",
			"factor": "4.42",
			"siRange": "4-22",
			"siUnit": "µmol/L",
			"siValue": "4",
			"usValue": "1"
		},
		{
			"name": "Amphetamine",
			"specimen": "Serum, Plasma",
			"conventionalRange": "20-30",
			"conventionalUnit": "ng/mL",
			"factor": "7.4",
			"siRange": "148-222",
			"siUnit": "nmol/L",
			"siValue": "148",
			"usValue": "20"
		},
		{
			"name": "Amylase",
			"specimen": "Serum",
			"conventionalRange": "27-131",
			"conventionalUnit": "U/L",
			"factor": "0.0167",
			"siRange": "0.46-2.23",
			"siUnit": "µkat/L",
			"siValue": "0.46",
			"usValue": "27"
		},
		{
			"name": "Androstenedione",
			"specimen": "Serum",
			"conventionalRange": "75-205",
			"conventionalUnit": "ng/dL",
			"factor": "0.0349",
			"siRange": "2.6-7.2",
			"siUnit": "nmol/L",
			"siValue": "2.6",
			"usValue": "75"
		},
		{
			"name": "Angiotensin I",
			"specimen": "Plasma",
			"conventionalRange": "<25",
			"conventionalUnit": "pg/mL",
			"factor": "0.772",
			"siRange": "<15",
			"siUnit": "pmol/L",
			"siValue": "15",
			"usValue": "25"
		},
		{
			"name": "Angiotensin II",
			"specimen": "Plasma",
			"conventionalRange": "10-60",
			"conventionalUnit": "pg/mL",
			"factor": "0.957",
			"siRange": "0.96-58",
			"siUnit": "pmol/L",
			"siValue": "0.96",
			"usValue": "10"
		},
		{
			"name": "Angiotensin-converting enzyme",
			"specimen": "Serum",
			"conventionalRange": "<40",
			"conventionalUnit": "U/L",
			"factor": "16.667",
			"siRange": "<670",
			"siUnit": "nkat/L",
			"siValue": "670",
			"usValue": "40"
		},
		{
			"name": "Anion gap Na+–(Cl- + HCO3-)",
			"specimen": "Serum, Plasma",
			"conventionalRange": "8-16",
			"conventionalUnit": "mEq/L",
			"factor": "1",
			"siRange": "8-16",
			"siUnit": "mmol/L",
			"siValue": "8",
			"usValue": "8"
		},
		{
			"name": "Antidiuretic hormone (ADH)",
			"specimen": "Plasma",
			"conventionalRange": "1-5",
			"conventionalUnit": "pg/mL",
			"factor": "0.923",
			"siRange": "0.9-4.6",
			"siUnit": "pmol/L",
			"siValue": "0.9",
			"usValue": "1"
		},
		{
			"name": "Antithrombin III",
			"specimen": "Plasma",
			"conventionalRange": "21-30",
			"conventionalUnit": "mg/dL",
			"factor": "10",
			"siRange": "210-300",
			"siUnit": "mg/L",
			"siValue": "210",
			"usValue": "21"
		},
		{
			"name": "α1-Antitrypsin",
			"specimen": "Serum",
			"conventionalRange": "78-200",
			"conventionalUnit": "14.5-36.5",
			"factor": "0.184",
			"siRange": "14.5-36.5",
			"siUnit": "µmol/L",
			"siValue": "14.5",
			"usValue": "78"
		},
		{
			"name": "Apolipoprotein A-I",
			"specimen": "Serum",
			"conventionalRange": "80-151",
			"conventionalUnit": "mg/dL",
			"factor": "0.01",
			"siRange": "0.8-1.5",
			"siUnit": "g/L",
			"siValue": "0.8",
			"usValue": "80"
		},
		{
			"name": "Apolipoprotein B",
			"specimen": "Serum, Plasma",
			"conventionalRange": "50-123",
			"conventionalUnit": "mg/dL",
			"factor": "0.01",
			"siRange": "0.5-1.2",
			"siUnit": "g/L",
			"siValue": "0.5",
			"usValue": "50"
		},
		{
			"name": "Arginine",
			"specimen": "Serum",
			"conventionalRange": "0.37-2.40",
			"conventionalUnit": "mg/dL",
			"factor": "57.05",
			"siRange": "21-138",
			"siUnit": "µmol/L",
			"siValue": "21",
			"usValue": "0.37"
		},
		{
			"name": "Arsenic",
			"specimen": "Whole blood",
			"conventionalRange": "2-23",
			"conventionalUnit": "µg/L",
			"factor": "0.0133",
			"siRange": "0.03-0.31",
			"siUnit": "µmol/L",
			"siValue": "0.03",
			"usValue": "2"
		},
		{
			"name": "Asparagine",
			"specimen": "Plasma",
			"conventionalRange": "0.40-0.91",
			"conventionalUnit": "mg/dL",
			"factor": "75.689",
			"siRange": "30-69",
			"siUnit": "µmol/L",
			"siValue": "30",
			"usValue": "0.40"
		},
		{
			"name": "Aspartate aminotransferase (AST)",
			"specimen": "Serum",
			"conventionalRange": "10-30",
			"conventionalUnit": "U/L",
			"factor": "0.0167",
			"siRange": "0.17-0.51",
			"siUnit": "µkat/L",
			"siValue": "0.17",
			"usValue": "10"
		},
		{
			"name": "Aspartic acid",
			"specimen": "Plasma",
			"conventionalRange": "<0.3",
			"conventionalUnit": "mg/dL",
			"factor": "75.13",
			"siRange": "<25",
			"siUnit": "µmol/L",
			"siValue": "25",
			"usValue": "0.3"
		},
		{
			"name": "Atrial natriuretic hormone",
			"specimen": "Plasma",
			"conventionalRange": "20-77",
			"conventionalUnit": "pg/mL",
			"factor": "0.325",
			"siRange": "6.5-2.5",
			"siUnit": "pmol/L",
			"siValue": "6.5",
			"usValue": "20"
		},
		{
			"name": "Base excess",
			"specimen": "Whole blood",
			"conventionalRange": "–2 to 3",
			"conventionalUnit": "mEg/L",
			"factor": "1",
			"siRange": "–2 to 3",
			"siUnit": "mmol/L",
			"siValue": "0",
			"usValue": "0"
		},
		{
			"name": "Bicarbonate",
			"specimen": "Serum",
			"conventionalRange": "21-28",
			"conventionalUnit": "mEq/L",
			"factor": "1",
			"siRange": "21-28",
			"siUnit": "mmol/L",
			"siValue": "21",
			"usValue": "21"
		},
		{
			"name": "Bile acids (total)",
			"specimen": "Serum",
			"conventionalRange": "0.3-2.3",
			"conventionalUnit": "µg/mL",
			"factor": "2.448",
			"siRange": "0.73-5.63",
			"siUnit": "µmol/L",
			"siValue": "0.73",
			"usValue": "0.3"
		},
		{
			"name": "Bilirubin, total",
			"specimen": "Serum",
			"conventionalRange": "0.3-1.2",
			"conventionalUnit": "mg/dL",
			"factor": "17.104",
			"siRange": "5.0-21.0",
			"siUnit": "µmol/L",
			"siValue": "5.0",
			"usValue": "0.3"
		},
		{
			"name": "Bilirubin, direct (conjugated)",
			"specimen": "Serum",
			"conventionalRange": "0.1-0.3",
			"conventionalUnit": "mg/dL",
			"factor": "17.104",
			"siRange": "1.7-5.1",
			"siUnit": "µmol/L",
			"siValue": "1.7",
			"usValue": "0.1"
		},
		{
			"name": "Biotin",
			"specimen": "Serum",
			"conventionalRange": "200-500",
			"conventionalUnit": "pg/mL",
			"factor": "0.00409",
			"siRange": "0.82-2.05",
			"siUnit": "nmol/L",
			"siValue": "0.82",
			"usValue": "200"
		},
		{
			"name": "Bismuth",
			"specimen": "Whole blood",
			"conventionalRange": "1-12",
			"conventionalUnit": "µg/L",
			"factor": "4.785",
			"siRange": "4.8-57.4",
			"siUnit": "nmol/L",
			"siValue": "4.8",
			"usValue": "1"
		},
		{
			"name": "Carbon dioxide, Pco2",
			"specimen": "Arterial blood",
			"conventionalRange": "35-45",
			"conventionalUnit": "mEq/L",
			"factor": "0.133",
			"siRange": "4.7-5.9",
			"siUnit": "kPa",
			"siValue": "4.7",
			"usValue": "35"
		},
		{
			"name": "ph",
			"specimen": "Arterial blood",
			"conventionalRange": "7.35-7.45",
			"conventionalUnit": "",
			"factor": "1",
			"siRange": "7.35-7.45",
			"siUnit": "",
			"siValue": "7.35",
			"usValue": "7.35"
		},
		{
			"name": "Oxygen, Po2",
			"specimen": "Arterial blood",
			"conventionalRange": "80-100",
			"conventionalUnit": "",
			"factor": "0.133",
			"siRange": "11-13",
			"siUnit": "kPa",
			"siValue": "11",
			"usValue": "80"
		},
		{
			"name": "Brain-type natriuretic peptide (BNP)",
			"specimen": "Plasma",
			"conventionalRange": "<167",
			"conventionalUnit": "pg/mL",
			"factor": "1",
			"siRange": "<167",
			"siUnit": "ng/L",
			"siValue": "167",
			"usValue": "167"
		},
		{
			"name": "Bromide (toxic)",
			"specimen": "Serum",
			"conventionalRange": ">1250",
			"conventionalUnit": "µg/mL",
			"factor": "0.0125",
			"siRange": ">15.6",
			"siUnit": "mmol/L",
			"siValue": "15.6",
			"usValue": "1250"
		},
		{
			"name": "C1 esterase inhibitor",
			"specimen": "Serum",
			"conventionalRange": "12-30",
			"conventionalUnit": "mg/dL",
			"factor": "10",
			"siRange": "120-300",
			"siUnit": "mg/L",
			"siValue": "120",
			"usValue": "12"
		},
		{
			"name": "C3 complement",
			"specimen": "Serum",
			"conventionalRange": "1200-1500",
			"conventionalUnit": "µg/mL",
			"factor": "0.001",
			"siRange": "1.2-1.5",
			"siUnit": "g/L",
			"siValue": "1.2",
			"usValue": "1200"
		},
		{
			"name": "C4 complement",
			"specimen": "Serum",
			"conventionalRange": "350-600",
			"conventionalUnit": "µg/mL",
			"factor": "0.001",
			"siRange": "0.35-0.60",
			"siUnit": "g/L",
			"siValue": "0.35",
			"usValue": "350"
		},
		{
			"name": "Cadmium",
			"specimen": "Whole blood",
			"conventionalRange": "0.3-1.2",
			"conventionalUnit": "µg/L",
			"factor": "8.896",
			"siRange": "2.7-10.7",
			"siUnit": "nmol/L",
			"siValue": "2.7",
			"usValue": "0.3"
		},
		{
			"name": "Caffeine",
			"specimen": "Serum, Plasma",
			"conventionalRange": "3-15",
			"conventionalUnit": "µg/L",
			"factor": "0.515",
			"siRange": "2.5-7.5",
			"siUnit": "µmol/L",
			"siValue": "2.5",
			"usValue": "3"
		},
		{
			"name": "Calcitonin",
			"specimen": "Plasma",
			"conventionalRange": "3-26",
			"conventionalUnit": "pg/mL",
			"factor": "0.292",
			"siRange": "0.8-7.6",
			"siUnit": "pmol/L",
			"siValue": "0.8",
			"usValue": "3"
		},
		{
			"name": "Calcium, ionized",
			"specimen": "Serum",
			"conventionalRange": "4.60-5.08",
			"conventionalUnit": "mg/dL",
			"factor": "0.25",
			"siRange": "1.15-1.27",
			"siUnit": "mmol/L",
			"siValue": "1.15",
			"usValue": "4.60"
		},
		{
			"name": "Calcium, total",
			"specimen": "Serum",
			"conventionalRange": "8.2-10.2",
			"conventionalUnit": "mg/dL",
			"factor": "0.25",
			"siRange": "2.05-2.55",
			"siUnit": "mmol/L",
			"siValue": "2.05",
			"usValue": "8.2"
		},
		{
			"name": "Cancer antigen (CA) 125",
			"specimen": "Serum",
			"conventionalRange": "<35",
			"conventionalUnit": "U/mL",
			"factor": "1",
			"siRange": "<35",
			"siUnit": "kU/L",
			"siValue": "35",
			"usValue": "35"
		},
		{
			"name": "Carbamazepine",
			"specimen": "Serum, Plasma",
			"conventionalRange": "8-12",
			"conventionalUnit": "µg/mL",
			"factor": "4.233",
			"siRange": "34-51",
			"siUnit": "µmol/L",
			"siValue": "34",
			"usValue": "8"
		},
		{
			"name": "Carbon dioxide (total)",
			"specimen": "Serum, Plasma",
			"conventionalRange": "22-28",
			"conventionalUnit": "mEq/L",
			"factor": "1",
			"siRange": "22-28",
			"siUnit": "mmol/L",
			"siValue": "22",
			"usValue": "22"
		},
		{
			"name": "Carboxyhemoglobin, toxic",
			"specimen": "Whole blood",
			"conventionalRange": ">20",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": ">0.2",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.2",
			"usValue": "20"
		},
		{
			"name": "Carcinoembryonic antigen (CEA)",
			"specimen": "Serum",
			"conventionalRange": "<3.0",
			"conventionalUnit": "µg/L",
			"factor": "1",
			"siRange": "<3.0",
			"siUnit": "µg/L",
			"siValue": "3.0",
			"usValue": "3.0"
		},
		{
			"name": "β-Carotene",
			"specimen": "Serum",
			"conventionalRange": "10-85",
			"conventionalUnit": "µg/dL",
			"factor": "0.01863",
			"siRange": "0.2-1.6",
			"siUnit": "µmol/L",
			"siValue": "0.2",
			"usValue": "10"
		},
		{
			"name": "Carotenoids",
			"specimen": "Serum",
			"conventionalRange": "50-300",
			"conventionalUnit": "µg/dL",
			"factor": "0.01863",
			"siRange": "0.9-5.6",
			"siUnit": "µmol/L",
			"siValue": "0.9",
			"usValue": "50"
		},
		{
			"name": "Ceruloplasmin",
			"specimen": "Serum",
			"conventionalRange": "20-40",
			"conventionalUnit": "mg/dL",
			"factor": "10",
			"siRange": "200-400",
			"siUnit": "mg/L",
			"siValue": "200",
			"usValue": "20"
		},
		{
			"name": "Chloramphenicol",
			"specimen": "Serum",
			"conventionalRange": "10-25",
			"conventionalUnit": "µg/mL",
			"factor": "3.095",
			"siRange": "31-77",
			"siUnit": "µmol/L",
			"siValue": "31",
			"usValue": "10"
		},
		{
			"name": "Chlordiazepoxide",
			"specimen": "Serum, Plasma",
			"conventionalRange": "0.4-3.0",
			"conventionalUnit": "µg/mL",
			"factor": "3.336",
			"siRange": "1.3-10.0",
			"siUnit": "µmol/L",
			"siValue": "1.3",
			"usValue": "0.4"
		},
		{
			"name": "Chloride",
			"specimen": "Serum, Plasma",
			"conventionalRange": "96-106",
			"conventionalUnit": "mEq/L",
			"factor": "1",
			"siRange": "96-106",
			"siUnit": "mmol/L",
			"siValue": "96",
			"usValue": "96"
		},
		{
			"name": "Chlorpromazine",
			"specimen": "Plasma",
			"conventionalRange": "50-300",
			"conventionalUnit": "ng/mL",
			"factor": "3.126",
			"siRange": "157-942",
			"siUnit": "nmol/L",
			"siValue": "157",
			"usValue": "50"
		},
		{
			"name": "Chlorpropamide",
			"specimen": "Plasma",
			"conventionalRange": "75-250",
			"conventionalUnit": "mg/L",
			"factor": "3.61",
			"siRange": "270-900",
			"siUnit": "µmol/L",
			"siValue": "270",
			"usValue": "75"
		},
		{
			"name": "Cholesterol (total) Desirable",
			"specimen": "Serum, Plasma",
			"conventionalRange": "<200",
			"conventionalUnit": "mg/dL",
			"factor": "0.0259",
			"siRange": "<5.18",
			"siUnit": "mmol/L",
			"siValue": "5.18",
			"usValue": "200"
		},
		{
			"name": "Cholesterol (total) Borderline high",
			"specimen": "Serum, Plasma",
			"conventionalRange": "200-239",
			"conventionalUnit": "mg/dL",
			"factor": "0.0259",
			"siRange": "5.18-6.18",
			"siUnit": "mmol/L",
			"siValue": "5.18",
			"usValue": "200"
		},
		{
			"name": "Cholesterol (total) High",
			"specimen": "Serum, Plasma",
			"conventionalRange": "640",
			"conventionalUnit": "mg/dL",
			"factor": "0.0259",
			"siRange": "6.21",
			"siUnit": "mmol/L",
			"siValue": "6.21",
			"usValue": "640"
		},
		{
			"name": "Cholesterol, high-density (HDL) (low level)",
			"specimen": "Serum, Plasma",
			"conventionalRange": "<40",
			"conventionalUnit": "mg/dL",
			"factor": "0.0259",
			"siRange": "<1.03",
			"siUnit": "mmol/L",
			"siValue": "1.03",
			"usValue": "40"
		},
		{
			"name": "Cholesterol, low-density (LDL) (high level)",
			"specimen": "Serum, Plasma",
			"conventionalRange": ">160",
			"conventionalUnit": "mg/dL",
			"factor": "0.0259",
			"siRange": "4.144",
			"siUnit": "mmol/L",
			"siValue": "4.144",
			"usValue": "160"
		},
		{
			"name": "Cholinesterase",
			"specimen": "Serum",
			"conventionalRange": "5-12",
			"conventionalUnit": "mg/L",
			"factor": "2.793",
			"siRange": "14-39",
			"siUnit": "nmol/L",
			"siValue": "14",
			"usValue": "5"
		},
		{
			"name": "Chorionic gonadotropin (ß-hCG) (nonpregnant)",
			"specimen": "Serum",
			"conventionalRange": "5",
			"conventionalUnit": "mIU/mL",
			"factor": "1",
			"siRange": "5",
			"siUnit": "IU/L",
			"siValue": "5",
			"usValue": "5"
		},
		{
			"name": "Chromium",
			"specimen": "Whole blood",
			"conventionalRange": "0.7-28.0",
			"conventionalUnit": "µg/L",
			"factor": "19.232",
			"siRange": "13.4-538.6",
			"siUnit": "nmol/L",
			"siValue": "13.4",
			"usValue": "0.7"
		},
		{
			"name": "Citrate",
			"specimen": "Serum",
			"conventionalRange": "1.2-3.0",
			"conventionalUnit": "mg/dL",
			"factor": "52.05",
			"siRange": "60-160",
			"siUnit": "µmol/L",
			"siValue": "60",
			"usValue": "1.2"
		},
		{
			"name": "Citrulline",
			"specimen": "Plasma",
			"conventionalRange": "0.2-1.0",
			"conventionalUnit": "mg/dL",
			"factor": "57.081",
			"siRange": "12-55",
			"siUnit": "µmol/L",
			"siValue": "12",
			"usValue": "0.2"
		},
		{
			"name": "Clonazepam",
			"specimen": "Serum",
			"conventionalRange": "10-50",
			"conventionalUnit": "ng/mL",
			"factor": "0.317",
			"siRange": "0.4-15.8",
			"siUnit": "nmol/L",
			"siValue": "0.4",
			"usValue": "10"
		},
		{
			"name": "Clonidine",
			"specimen": "Serum, Plasma",
			"conventionalRange": "1.0-2.0",
			"conventionalUnit": "ng/mL",
			"factor": "4.35",
			"siRange": "4.4-8.7",
			"siUnit": "nmol/L",
			"siValue": "4.4",
			"usValue": "1.0"
		},
		{
			"name": "Clozapine",
			"specimen": "Serum",
			"conventionalRange": "200-350",
			"conventionalUnit": "ng/mL",
			"factor": "0.003",
			"siRange": "0.6-1.0",
			"siUnit": "µmol/L",
			"siValue": "0.6",
			"usValue": "200"
		},
		{
			"name": "Coagulation factor I",
			"specimen": "Plasma",
			"conventionalRange": "0.15-0.35",
			"conventionalUnit": "g/dL",
			"factor": "29.41",
			"siRange": "4.4-10.3",
			"siUnit": "µmol/L",
			"siValue": "4.4",
			"usValue": "0.15"
		},
		{
			"name": "    (Fibrinogen)",
			"specimen": "Plasma",
			"conventionalRange": "150-350",
			"conventionalUnit": "mg/dL",
			"factor": "g/L",
			"siRange": "1.5-3.5",
			"siUnit": "g/L",
			"siValue": "1.5",
			"usValue": "150"
		},
		{
			"name": "Coagulation factor II (prothrombin)",
			"specimen": "Plasma",
			"conventionalRange": "70-130",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.70-1.30",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.70",
			"usValue": "70"
		},
		{
			"name": "Coagulation factor V",
			"specimen": "Plasma",
			"conventionalRange": "70-130",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.70-1.30",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.70",
			"usValue": "70"
		},
		{
			"name": "Coagulation factor VII",
			"specimen": "Plasma",
			"conventionalRange": "60-140",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.60-1.40",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.60",
			"usValue": "60"
		},
		{
			"name": "Coagulation factor VIII",
			"specimen": "Plasma",
			"conventionalRange": "50-200",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.50-2.00",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.50",
			"usValue": "50"
		},
		{
			"name": "Coagulation factor IX",
			"specimen": "Plasma",
			"conventionalRange": "70-130",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.70-1.30",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.70",
			"usValue": "70"
		},
		{
			"name": "Coagulation factor X",
			"specimen": "Plasma",
			"conventionalRange": "70-130",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.70-1.30",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.70",
			"usValue": "70"
		},
		{
			"name": "Coagulation factor XI",
			"specimen": "Plasma",
			"conventionalRange": "70-130",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.70-1.30",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.70",
			"usValue": "70"
		},
		{
			"name": "Coagulation factor XII",
			"specimen": "Plasma",
			"conventionalRange": "70-130",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.70-1.30",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.70",
			"usValue": "70"
		},
		{
			"name": "Cobalt",
			"specimen": "Serum",
			"conventionalRange": "4.0-10.0",
			"conventionalUnit": "µg/L",
			"factor": "16.968",
			"siRange": "67.9-169.7",
			"siUnit": "nmol/L",
			"siValue": "67.9",
			"usValue": "4.0"
		},
		{
			"name": "Cocaine (toxic)",
			"specimen": "Serum",
			"conventionalRange": ">1000",
			"conventionalUnit": "ng/mL",
			"factor": "3.297",
			"siRange": ">3300",
			"siUnit": "nmol/L",
			"siValue": "3300",
			"usValue": "1000"
		},
		{
			"name": "Codeine",
			"specimen": "Serum",
			"conventionalRange": "10-100",
			"conventionalUnit": "ng/mL",
			"factor": "3.34",
			"siRange": "33-334",
			"siUnit": "nmol/L",
			"siValue": "33",
			"usValue": "10"
		},
		{
			"name": "Coenzyme Q10 (ubiquinone)",
			"specimen": "Plasma",
			"conventionalRange": "0.5-1.5",
			"conventionalUnit": "µg/mL",
			"factor": "1",
			"siRange": "0.5-1.5",
			"siUnit": "mg/L",
			"siValue": "0.5",
			"usValue": "0.5"
		},
		{
			"name": "Copper",
			"specimen": "Serum",
			"conventionalRange": "70-140",
			"conventionalUnit": "µg/dL",
			"factor": "0.157",
			"siRange": "44866",
			"siUnit": "µmol/L",
			"siValue": "44866",
			"usValue": "70"
		},
		{
			"name": "Coproporphyrin",
			"specimen": "Urine",
			"conventionalRange": "<200",
			"conventionalUnit": "µg/24h",
			"factor": "1.527",
			"siRange": "<300",
			"siUnit": "µmol/d",
			"siValue": "300",
			"usValue": "200"
		},
		{
			"name": "Corticotropin",
			"specimen": "Plasma",
			"conventionalRange": "<120",
			"conventionalUnit": "pg/mL",
			"factor": "0.22",
			"siRange": "<26",
			"siUnit": "pmol/L",
			"siValue": "26",
			"usValue": "120"
		},
		{
			"name": "Cortisol",
			"specimen": "Serum, Plasma",
			"conventionalRange": "5-25",
			"conventionalUnit": "µg/dL",
			"factor": "27.588",
			"siRange": "140-690",
			"siUnit": "nmol/L",
			"siValue": "140",
			"usValue": "5"
		},
		{
			"name": "Cotinine",
			"specimen": "Plasma",
			"conventionalRange": "0-8",
			"conventionalUnit": "µg/L",
			"factor": "5.675",
			"siRange": "0-45",
			"siUnit": "nmol/L",
			"siValue": "0",
			"usValue": "0"
		},
		{
			"name": "C-peptide",
			"specimen": "Serum",
			"conventionalRange": "0.5-2.5",
			"conventionalUnit": "ng/mL",
			"factor": "0.331",
			"siRange": "0.17-0.83",
			"siUnit": "nmol/L",
			"siValue": "0.17",
			"usValue": "0.5"
		},
		{
			"name": "C-reactive protein",
			"specimen": "Serum",
			"conventionalRange": "0.08-3.1",
			"conventionalUnit": "mg/L",
			"factor": "9.524",
			"siRange": "0.76-28.5",
			"siUnit": "nmol/L",
			"siValue": "0.76",
			"usValue": "0.08"
		},
		{
			"name": "Creatine",
			"specimen": "Serum",
			"conventionalRange": "0.1-0.4",
			"conventionalUnit": "mg/dL",
			"factor": "76.25",
			"siRange": "8-31",
			"siUnit": "µmol/L",
			"siValue": "8",
			"usValue": "0.1"
		},
		{
			"name": "Creatine kinase (CK)",
			"specimen": "Serum",
			"conventionalRange": "40-150",
			"conventionalUnit": "U/L",
			"factor": "0.0167",
			"siRange": "0.67-2.5",
			"siUnit": "µkat/L",
			"siValue": "0.67",
			"usValue": "40"
		},
		{
			"name": "Creatine kinase–MB fraction",
			"specimen": "Serum",
			"conventionalRange": "0-7",
			"conventionalUnit": "µg/L",
			"factor": "1",
			"siRange": "0-7",
			"siUnit": "µg/L",
			"siValue": "0",
			"usValue": "0"
		},
		{
			"name": "Creatinine",
			"specimen": "Serum, Plasma",
			"conventionalRange": "0.6-1.2",
			"conventionalUnit": "mg/dL",
			"factor": "88.4",
			"siRange": "53-106",
			"siUnit": "µmol/L",
			"siValue": "53",
			"usValue": "0.6"
		},
		{
			"name": "Creatinine clearance",
			"specimen": "Serum, Plasma",
			"conventionalRange": "75-125",
			"conventionalUnit": "mL/min/1.73m2",
			"factor": "0.0167",
			"siRange": "1.24-2.08",
			"siUnit": "mL/s/m2",
			"siValue": "1.24",
			"usValue": "75"
		},
		{
			"name": "Cyanide (toxic)",
			"specimen": "Whole blood",
			"conventionalRange": ">1.0",
			"conventionalUnit": "µg/mL",
			"factor": "23.24",
			"siRange": ">23",
			"siUnit": "µmol/L",
			"siValue": "23",
			"usValue": "1.0"
		},
		{
			"name": "Cyclic adenosine monophosphate (cAMP)",
			"specimen": "Plasma",
			"conventionalRange": "4.6-8.6",
			"conventionalUnit": "ng/mL",
			"factor": "3.04",
			"siRange": "14-26",
			"siUnit": "µmol/L",
			"siValue": "14",
			"usValue": "4.6"
		},
		{
			"name": "Cyclosporine",
			"specimen": "Serum",
			"conventionalRange": "100-400",
			"conventionalUnit": "ng/mL",
			"factor": "0.832",
			"siRange": "83-333",
			"siUnit": "nmol/L",
			"siValue": "83",
			"usValue": "100"
		},
		{
			"name": "Cystine",
			"specimen": "Plasma",
			"conventionalRange": "0.40-1.40",
			"conventionalUnit": "mg/dL",
			"factor": "41.615",
			"siRange": "16-60",
			"siUnit": "µmol/L",
			"siValue": "16",
			"usValue": "0.40"
		},
		{
			"name": "D-dimer",
			"specimen": "Plasma",
			"conventionalRange": "<0.5",
			"conventionalUnit": "µg/mL",
			"factor": "5.476",
			"siRange": "<3.0",
			"siUnit": "nmol/L",
			"siValue": "3.0",
			"usValue": "0.5"
		},
		{
			"name": "Dehydroepiandrosterone (DHEA)",
			"specimen": "Serum",
			"conventionalRange": "1.8-12.5",
			"conventionalUnit": "ng/mL",
			"factor": "3.47",
			"siRange": "6.2-43.3",
			"siUnit": "nmol/L",
			"siValue": "6.2",
			"usValue": "1.8"
		},
		{
			"name": "Dehydroepiandrosterone sulfate (DHEA-S)",
			"specimen": "Serum",
			"conventionalRange": "50-450",
			"conventionalUnit": "µg/dL",
			"factor": "0.027",
			"siRange": "1.6-12.2",
			"siUnit": "µmol/L",
			"siValue": "1.6",
			"usValue": "50"
		},
		{
			"name": "Deoxycorticosterone",
			"specimen": "Serum",
			"conventionalRange": "2-19",
			"conventionalUnit": "ng/dL",
			"factor": "0.0303",
			"siRange": "61-576",
			"siUnit": "nmol/L",
			"siValue": "61",
			"usValue": "2"
		},
		{
			"name": "Desipramine",
			"specimen": "Serum, Plasma",
			"conventionalRange": "50-200",
			"conventionalUnit": "ng/mL",
			"factor": "3.754",
			"siRange": "170-700",
			"siUnit": "nmol/L",
			"siValue": "170",
			"usValue": "50"
		},
		{
			"name": "Diazepam",
			"specimen": "Serum, Plasma",
			"conventionalRange": "100-1000",
			"conventionalUnit": "ng/mL",
			"factor": "0.0035",
			"siRange": "0.35-3.51",
			"siUnit": "µmol/L",
			"siValue": "0.35",
			"usValue": "100"
		},
		{
			"name": "Digoxin",
			"specimen": "Plasma",
			"conventionalRange": "0.5-2.0",
			"conventionalUnit": "ng/mL",
			"factor": "1.281",
			"siRange": "0.6-2.6",
			"siUnit": "nmol/L",
			"siValue": "0.6",
			"usValue": "0.5"
		},
		{
			"name": "Diltiazem",
			"specimen": "Serum",
			"conventionalRange": "<200",
			"conventionalUnit": "mg/L",
			"factor": "2.412",
			"siRange": "<480",
			"siUnit": "µmol/L",
			"siValue": "480",
			"usValue": "200"
		},
		{
			"name": "Disopyramide",
			"specimen": "Serum, Plasma",
			"conventionalRange": "2.8-7.0",
			"conventionalUnit": "µg/mL",
			"factor": "2.946",
			"siRange": "8.3-22.0",
			"siUnit": "µmol/L",
			"siValue": "8.3",
			"usValue": "2.8"
		},
		{
			"name": "Dopamine",
			"specimen": "Plasma",
			"conventionalRange": "<87",
			"conventionalUnit": "pg/mL",
			"factor": "6.528",
			"siRange": "<475",
			"siUnit": "pmol/L",
			"siValue": "475",
			"usValue": "87"
		},
		{
			"name": "Doxepin",
			"specimen": "Serum, Plasma",
			"conventionalRange": "30-150",
			"conventionalUnit": "ng/mL",
			"factor": "3.579",
			"siRange": "108-538",
			"siUnit": "nmol/L",
			"siValue": "108",
			"usValue": "30"
		},
		{
			"name": "Albumin Proportion",
			"specimen": "Serum",
			"conventionalRange": "52-65",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.52-0.65",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.52",
			"usValue": "52"
		},
		{
			"name": "α1-Globulin Proportion",
			"specimen": "Serum",
			"conventionalRange": "2.5-5.0",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.025-0.05",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.025",
			"usValue": "2.5"
		},
		{
			"name": "α2-Globulin Proportion",
			"specimen": "Serum",
			"conventionalRange": "7.0-13.0",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.07-0.13",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.07",
			"usValue": "7.0"
		},
		{
			"name": "ß-Globulin Proportion",
			"specimen": "Serum",
			"conventionalRange": "8.0-14.0",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.08-0.14",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.08",
			"usValue": "8.0"
		},
		{
			"name": "γ-Globulin Proportion",
			"specimen": "Serum",
			"conventionalRange": "12.0-22.0",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.12-0.22",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.12",
			"usValue": "12.0"
		},
		{
			"name": "Albumin Concentration",
			"specimen": "Serum",
			"conventionalRange": "3.2-5.6",
			"conventionalUnit": "g/dL",
			"factor": "10",
			"siRange": "32-56",
			"siUnit": "g/L",
			"siValue": "32",
			"usValue": "3.2"
		},
		{
			"name": "α1 -Globulin Concentration",
			"specimen": "Serum",
			"conventionalRange": "0.1-0.4",
			"conventionalUnit": "g/dL",
			"factor": "10",
			"siRange": "1-10",
			"siUnit": "g/L",
			"siValue": "1",
			"usValue": "0.1"
		},
		{
			"name": "α2-Globulin Concentration",
			"specimen": "Serum",
			"conventionalRange": "0.4-1.2",
			"conventionalUnit": "g/dL",
			"factor": "10",
			"siRange": "4-12",
			"siUnit": "g/L",
			"siValue": "4",
			"usValue": "0.4"
		},
		{
			"name": "ß-Globulin Concentration",
			"specimen": "Serum",
			"conventionalRange": "0.5-1.1",
			"conventionalUnit": "g/dL",
			"factor": "10",
			"siRange": "5-11",
			"siUnit": "g/L",
			"siValue": "5",
			"usValue": "0.5"
		},
		{
			"name": "γ-Globulin Concentration",
			"specimen": "Serum",
			"conventionalRange": "0.5-1.6",
			"conventionalUnit": "g/dL",
			"factor": "10",
			"siRange": "5-16",
			"siUnit": "g/L",
			"siValue": "5",
			"usValue": "0.5"
		},
		{
			"name": "Ephedrine (toxic)",
			"specimen": "Serum",
			"conventionalRange": ">2",
			"conventionalUnit": "µg/mL",
			"factor": "6.052",
			"siRange": ">12.1",
			"siUnit": "µmol/L",
			"siValue": "12.1",
			"usValue": "2"
		},
		{
			"name": "Epinephrine",
			"specimen": "Plasma",
			"conventionalRange": "<60",
			"conventionalUnit": "pg/mL",
			"factor": "5.459",
			"siRange": "<330",
			"siUnit": "pmol/L",
			"siValue": "330",
			"usValue": "60"
		},
		{
			"name": "Erythrocyte sedimentation rate",
			"specimen": "Whole blood",
			"conventionalRange": "0-20",
			"conventionalUnit": "mm/h",
			"factor": "1",
			"siRange": "0-20",
			"siUnit": "mm/h",
			"siValue": "0",
			"usValue": "0"
		},
		{
			"name": "Erythropoietin",
			"specimen": "Serum",
			"conventionalRange": "5-36",
			"conventionalUnit": "IU/L",
			"factor": "1",
			"siRange": "5-36",
			"siUnit": "IU/L",
			"siValue": "5",
			"usValue": "5"
		},
		{
			"name": "Estradiol (E 2 )",
			"specimen": "Serum",
			"conventionalRange": "30-400",
			"conventionalUnit": "pg/mL",
			"factor": "3.671",
			"siRange": "110-1470",
			"siUnit": "pmol/L",
			"siValue": "110",
			"usValue": "30"
		},
		{
			"name": "Estriol (E 3 )",
			"specimen": "Serum",
			"conventionalRange": "5-40",
			"conventionalUnit": "ng/mL",
			"factor": "3.467",
			"siRange": "17.4-138.8",
			"siUnit": "nmol/L",
			"siValue": "17.4",
			"usValue": "5"
		},
		{
			"name": "Estrogens (total)",
			"specimen": "Serum",
			"conventionalRange": "60-400",
			"conventionalUnit": "pg/mL",
			"factor": "1",
			"siRange": "60-400",
			"siUnit": "ng/L",
			"siValue": "60",
			"usValue": "60"
		},
		{
			"name": "Estrone (E 1 )",
			"specimen": "Serum, Plasma",
			"conventionalRange": "1.5-25.0",
			"conventionalUnit": "pg/mL",
			"factor": "3.698",
			"siRange": "5.5-92.5",
			"siUnit": "pmol/L",
			"siValue": "5.5",
			"usValue": "1.5"
		},
		{
			"name": "Ethanol (ethyl alcohol)",
			"specimen": "Serum, whole blood",
			"conventionalRange": "<20",
			"conventionalUnit": "mg/dL",
			"factor": "0.2171",
			"siRange": "<4.3",
			"siUnit": "mmol/L",
			"siValue": "4.3",
			"usValue": "20"
		},
		{
			"name": "Ethchlorvynol (toxic)",
			"specimen": "Serum, Plasma",
			"conventionalRange": ">20",
			"conventionalUnit": "µg/mL",
			"factor": "6.915",
			"siRange": ">138",
			"siUnit": "µmol/L",
			"siValue": "138",
			"usValue": "20"
		},
		{
			"name": "Ethosuximide",
			"specimen": "Serum",
			"conventionalRange": "40-100",
			"conventionalUnit": "mg/L",
			"factor": "7.084",
			"siRange": "280-700",
			"siUnit": "µmol/L",
			"siValue": "280",
			"usValue": "40"
		},
		{
			"name": "Ethylene glycol (toxic)",
			"specimen": "Serum, Plasma",
			"conventionalRange": ">30",
			"conventionalUnit": "mg/dL",
			"factor": "0.1611",
			"siRange": ">5",
			"siUnit": "mmol/L",
			"siValue": "5",
			"usValue": "30"
		},
		{
			"name": "Fatty acids (nonesterified)",
			"specimen": "Serum, Plasma",
			"conventionalRange": "8-25",
			"conventionalUnit": "mg/dL",
			"factor": "0.0355",
			"siRange": "0.28-0.89",
			"siUnit": "mmol/L",
			"siValue": "0.28",
			"usValue": "8"
		},
		{
			"name": "Fecal fat (as stearic acid)",
			"specimen": "Stool",
			"conventionalRange": "2-6",
			"conventionalUnit": "g/d",
			"factor": "1",
			"siRange": "2-6",
			"siUnit": "g/24h",
			"siValue": "2",
			"usValue": "2"
		},
		{
			"name": "Fenfluramine",
			"specimen": "Serum",
			"conventionalRange": "0.04-0.30",
			"conventionalUnit": "µg/mL",
			"factor": "4.324",
			"siRange": "0.18-1.30",
			"siUnit": "µmol/L",
			"siValue": "0.18",
			"usValue": "0.04"
		},
		{
			"name": "Fentanyl",
			"specimen": "Serum",
			"conventionalRange": "0.01-0.10",
			"conventionalUnit": "µg/mL",
			"factor": "2.972",
			"siRange": "0.02-0.30",
			"siUnit": "µmol/L",
			"siValue": "0.02",
			"usValue": "0.01"
		},
		{
			"name": "Ferritin",
			"specimen": "Serum",
			"conventionalRange": "15-200",
			"conventionalUnit": "ng/mL",
			"factor": "2.247",
			"siRange": "33-450",
			"siUnit": "pmol/Lng/mL",
			"siValue": "33",
			"usValue": "15"
		},
		{
			"name": "α1-Fetoprotein",
			"specimen": "Serum",
			"conventionalRange": "<10",
			"conventionalUnit": "µg/L",
			"factor": "1",
			"siRange": "<10",
			"siUnit": "µg/L",
			"siValue": "10",
			"usValue": "10"
		},
		{
			"name": "Fibrin degradation products",
			"specimen": "Plasma",
			"conventionalRange": "<10",
			"conventionalUnit": "µg/mL",
			"factor": "1",
			"siRange": "<10",
			"siUnit": "mg/L",
			"siValue": "10",
			"usValue": "10"
		},
		{
			"name": "Fibrinogen",
			"specimen": "Plasma",
			"conventionalRange": "200-400",
			"conventionalUnit": "mg/dL",
			"factor": "0.0294",
			"siRange": "5.8-11.8",
			"siUnit": "µmol/L",
			"siValue": "5.8",
			"usValue": "200"
		},
		{
			"name": "Flecanide",
			"specimen": "Serum, Plasma",
			"conventionalRange": "0.2-1.0",
			"conventionalUnit": "µg/mL",
			"factor": "2.413",
			"siRange": "0.5-2.4",
			"siUnit": "µmol/L",
			"siValue": "0.5",
			"usValue": "0.2"
		},
		{
			"name": "Fluoride",
			"specimen": "Whole blood",
			"conventionalRange": "<0.05",
			"conventionalUnit": "mg/dL",
			"factor": "0.5263",
			"siRange": "<0.027",
			"siUnit": "mmol/L",
			"siValue": "0.027",
			"usValue": "0.05"
		},
		{
			"name": "Fluoxetine",
			"specimen": "Serum",
			"conventionalRange": "200-1100",
			"conventionalUnit": "ng/mL",
			"factor": "0.00323",
			"siRange": "0.65-3.56",
			"siUnit": "µmol/L",
			"siValue": "0.65",
			"usValue": "200"
		},
		{
			"name": "Flurazepam (toxic)",
			"specimen": "Serum, Plasma",
			"conventionalRange": ">0.2",
			"conventionalUnit": "µg/mL",
			"factor": "2.5",
			"siRange": ">0.5",
			"siUnit": "µmol/L",
			"siValue": "0.5",
			"usValue": "0.2"
		},
		{
			"name": "Folate (folic acid)",
			"specimen": "Serum",
			"conventionalRange": "3-16",
			"conventionalUnit": "ng/mL",
			"factor": "2.266",
			"siRange": "7-36",
			"siUnit": "nmol/L",
			"siValue": "7",
			"usValue": "3"
		},
		{
			"name": "Follicle-stimulating hormone (FSH)",
			"specimen": "Serum, Plasma",
			"conventionalRange": "1-100",
			"conventionalUnit": "mIU/mL",
			"factor": "1",
			"siRange": "1-100",
			"siUnit": "IU/L",
			"siValue": "1",
			"usValue": "1"
		},
		{
			"name": "Fructosamine",
			"specimen": "Serum",
			"conventionalRange": "36-50",
			"conventionalUnit": "mg/L",
			"factor": "5.581",
			"siRange": "200-280",
			"siUnit": "mmol/L",
			"siValue": "200",
			"usValue": "36"
		},
		{
			"name": "Fructose",
			"specimen": "Serum",
			"conventionalRange": "1-6",
			"conventionalUnit": "mg/dL",
			"factor": "55.506",
			"siRange": "55-335",
			"siUnit": "µmol/L",
			"siValue": "55",
			"usValue": "1"
		},
		{
			"name": "Galactose",
			"specimen": "Serum, Plasma",
			"conventionalRange": "<20",
			"conventionalUnit": "mg/dL",
			"factor": "0.0555",
			"siRange": "<1.10",
			"siUnit": "mmol/L",
			"siValue": "1.10",
			"usValue": "20"
		},
		{
			"name": "Gastrin",
			"specimen": "Serum",
			"conventionalRange": "25-90",
			"conventionalUnit": "pg/mL",
			"factor": "0.481",
			"siRange": "12-45",
			"siUnit": "pmol/L",
			"siValue": "12",
			"usValue": "25"
		},
		{
			"name": "Gentamicin",
			"specimen": "Serum",
			"conventionalRange": "6-10",
			"conventionalUnit": "µg/mL",
			"factor": "2.09",
			"siRange": "12-21",
			"siUnit": "µmol/L",
			"siValue": "12",
			"usValue": "6"
		},
		{
			"name": "Glucagon",
			"specimen": "Plasma",
			"conventionalRange": "20-100",
			"conventionalUnit": "pg/mL",
			"factor": "1",
			"siRange": "20-100",
			"siUnit": "ng/L",
			"siValue": "20",
			"usValue": "20"
		},
		{
			"name": "Glucose",
			"specimen": "Serum",
			"conventionalRange": "70-110",
			"conventionalUnit": "mg/dL",
			"factor": "0.0555",
			"siRange": "3.9-6.1",
			"siUnit": "mmol/L",
			"siValue": "3.9",
			"usValue": "70"
		},
		{
			"name": "Glucose-6-phosphate dehydrogenase",
			"specimen": "Whole blood",
			"conventionalRange": "10-14",
			"conventionalUnit": "U/g hemoglobin",
			"factor": "0.0167",
			"siRange": "0.17-0.24",
			"siUnit": "nkat/g hemoglobin",
			"siValue": "0.17",
			"usValue": "10"
		},
		{
			"name": "Glutamic acid",
			"specimen": "Plasma",
			"conventionalRange": "0.2-2.8",
			"conventionalUnit": "mg/dL",
			"factor": "67.967",
			"siRange": "15-190",
			"siUnit": "µmol/L",
			"siValue": "15",
			"usValue": "0.2"
		},
		{
			"name": "Glutamine",
			"specimen": "Plasma",
			"conventionalRange": "6.1-10.2",
			"conventionalUnit": "mg/dL",
			"factor": "68.423",
			"siRange": "420-700",
			"siUnit": "µmol/L",
			"siValue": "420",
			"usValue": "6.1"
		},
		{
			"name": "γ-Glutamyltransferase (GGT)",
			"specimen": "Serum",
			"conventionalRange": "2-30",
			"conventionalUnit": "U/L",
			"factor": "0.0167",
			"siRange": "0.03-0.51",
			"siUnit": "µkat/L",
			"siValue": "0.03",
			"usValue": "2"
		},
		{
			"name": "Glutethimide",
			"specimen": "Serum",
			"conventionalRange": "2-6",
			"conventionalUnit": "µg/mL",
			"factor": "4.603",
			"siRange": "9-28",
			"siUnit": "µmol/L",
			"siValue": "9",
			"usValue": "2"
		},
		{
			"name": "Glycerol (free)",
			"specimen": "Serum",
			"conventionalRange": "0.3-1.72",
			"conventionalUnit": "mg/dL",
			"factor": "0.1086",
			"siRange": "0.32-0.187",
			"siUnit": "mmol/L",
			"siValue": "0.32",
			"usValue": "0.3"
		},
		{
			"name": "Glycine",
			"specimen": "Plasma",
			"conventionalRange": "0.9-4.2",
			"conventionalUnit": "mg/dL",
			"factor": "133.2",
			"siRange": "120-560",
			"siUnit": "µmol/L",
			"siValue": "120",
			"usValue": "0.9"
		},
		{
			"name": "Gold",
			"specimen": "Serum",
			"conventionalRange": "<10",
			"conventionalUnit": "µg/dL",
			"factor": "50.77",
			"siRange": "<500",
			"siUnit": "nmol/L",
			"siValue": "500",
			"usValue": "10"
		},
		{
			"name": "Growth hormone (GH)",
			"specimen": "Serum",
			"conventionalRange": "0-18",
			"conventionalUnit": "ng/mL",
			"factor": "1",
			"siRange": "0-18",
			"siUnit": "µg/L",
			"siValue": "0",
			"usValue": "0"
		},
		{
			"name": "Haloperidol",
			"specimen": "Serum, Plasma",
			"conventionalRange": "6-24",
			"conventionalUnit": "ng/mL",
			"factor": "2.66",
			"siRange": "16-65",
			"siUnit": "nmol/L",
			"siValue": "16",
			"usValue": "6"
		},
		{
			"name": "Haptoglobin",
			"specimen": "Serum",
			"conventionalRange": "26-185",
			"conventionalUnit": "mg/dL",
			"factor": "10",
			"siRange": "260-1850",
			"siUnit": "mg/L",
			"siValue": "260",
			"usValue": "26"
		},
		{
			"name": "Hematocrit",
			"specimen": "Whole blood",
			"conventionalRange": "41-50",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.41-0.50",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.41",
			"usValue": "41"
		},
		{
			"name": "Hemoglobin",
			"specimen": "Whole blood",
			"conventionalRange": "14.0-17.5",
			"conventionalUnit": "g/dL",
			"factor": "10",
			"siRange": "140-175",
			"siUnit": "g/L",
			"siValue": "140",
			"usValue": "14.0"
		},
		{
			"name": "Mean corpuscular hemoglobin (MCH)",
			"specimen": "Whole blood",
			"conventionalRange": "26-34",
			"conventionalUnit": "pg/cell",
			"factor": "1",
			"siRange": "26-34",
			"siUnit": "pg/cell",
			"siValue": "26",
			"usValue": "26"
		},
		{
			"name": "Mean corpuscular hemoglobin concentration (MCHC)",
			"specimen": "Whole blood",
			"conventionalRange": "33-37",
			"conventionalUnit": "g/dL",
			"factor": "10",
			"siRange": "330-370",
			"siUnit": "g/L",
			"siValue": "330",
			"usValue": "33"
		},
		{
			"name": "Mean corpuscular volume (MCV)",
			"specimen": "Whole blood",
			"conventionalRange": "80-100",
			"conventionalUnit": "µm3",
			"factor": "1",
			"siRange": "80-100",
			"siUnit": "fL",
			"siValue": "80",
			"usValue": "80"
		},
		{
			"name": "Hemoglobin A 1c (glycated hemoglobin)",
			"specimen": "Whole blood",
			"conventionalRange": "4-7",
			"conventionalUnit": "% of total hemoglobin",
			"factor": "0.01",
			"siRange": "0.04-0.07",
			"siUnit": "Proportion of total hemoglobin",
			"siValue": "0.04",
			"usValue": "4"
		},
		{
			"name": "Hemoglobin A 2",
			"specimen": "Whole blood",
			"conventionalRange": "2.0-3.0",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.02-0.03",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.02",
			"usValue": "2.0"
		},
		{
			"name": "Histamine",
			"specimen": "Plasma",
			"conventionalRange": "0.5-1.0",
			"conventionalUnit": "µg/L",
			"factor": "8.997",
			"siRange": "4.5-9.0",
			"siUnit": "nmol/L",
			"siValue": "4.5",
			"usValue": "0.5"
		},
		{
			"name": "Histidine",
			"specimen": "Plasma",
			"conventionalRange": "0.5-1.7",
			"conventionalUnit": "mg/dL",
			"factor": "64.45",
			"siRange": "32-110",
			"siUnit": "µmol/L",
			"siValue": "32",
			"usValue": "0.5"
		},
		{
			"name": "Homocysteine",
			"specimen": "Plasma",
			"conventionalRange": "0.68-2.02",
			"conventionalUnit": "mg/L",
			"factor": "7.397",
			"siRange": "5-15",
			"siUnit": "µmol/L",
			"siValue": "5",
			"usValue": "0.68"
		},
		{
			"name": "Homovanillic acid",
			"specimen": "Urine",
			"conventionalRange": "1.4-8.8",
			"conventionalUnit": "mg/24 h",
			"factor": "5.489",
			"siRange": "8-48",
			"siUnit": "µmol/d",
			"siValue": "8",
			"usValue": "1.4"
		},
		{
			"name": "Hydrocodone",
			"specimen": "Serum",
			"conventionalRange": "<0.02",
			"conventionalUnit": "µg/mL",
			"factor": "3.34",
			"siRange": "<0.06",
			"siUnit": "µmol/L",
			"siValue": "0.06",
			"usValue": "0.02"
		},
		{
			"name": "Hydromorphone",
			"specimen": "Serum",
			"conventionalRange": "0.008-0.032",
			"conventionalUnit": "µg/mL",
			"factor": "3504",
			"siRange": "28-112",
			"siUnit": "nmol/L",
			"siValue": "28",
			"usValue": "0.008"
		},
		{
			"name": "β-Hydroxybutyric acid",
			"specimen": "Plasma",
			"conventionalRange": "<3.0",
			"conventionalUnit": "mg/dL",
			"factor": "96.06",
			"siRange": "<300",
			"siUnit": "µmol/L",
			"siValue": "300",
			"usValue": "3.0"
		},
		{
			"name": "5-Hydroxyindoleacetic acid (5-HIAA)",
			"specimen": "Urine",
			"conventionalRange": "2-6",
			"conventionalUnit": "mg/24h",
			"factor": "5.23",
			"siRange": "10.4-31.2",
			"siUnit": "µmol/d",
			"siValue": "10.4",
			"usValue": "2"
		},
		{
			"name": "Hydroxyproline",
			"specimen": "Plasma",
			"conventionalRange": "<0.55",
			"conventionalUnit": "mg/dL",
			"factor": "76.266",
			"siRange": "<42",
			"siUnit": "µmol/L",
			"siValue": "42",
			"usValue": "0.55"
		},
		{
			"name": "Ibuprofen",
			"specimen": "Serum",
			"conventionalRange": "10-50",
			"conventionalUnit": "µg/mL",
			"factor": "4.848",
			"siRange": "50-243",
			"siUnit": "µmol/L",
			"siValue": "50",
			"usValue": "10"
		},
		{
			"name": "Imipramine",
			"specimen": "Plasma",
			"conventionalRange": "150-250",
			"conventionalUnit": "ng/mL",
			"factor": "3.566",
			"siRange": "536-893",
			"siUnit": "nmol/L",
			"siValue": "536",
			"usValue": "150"
		},
		{
			"name": "Immunoglobulin A (IgA)",
			"specimen": "Serum",
			"conventionalRange": "40-350",
			"conventionalUnit": "mg/dL",
			"factor": "10",
			"siRange": "400-3500",
			"siUnit": "mg/L",
			"siValue": "400",
			"usValue": "40"
		},
		{
			"name": "Immunoglobulin D (IgD)",
			"specimen": "Serum",
			"conventionalRange": "0-8",
			"conventionalUnit": "mg/dL",
			"factor": "10",
			"siRange": "0-80",
			"siUnit": "mg/L",
			"siValue": "0",
			"usValue": "0"
		},
		{
			"name": "Immunoglobulin E (IgE)",
			"specimen": "Serum",
			"conventionalRange": "0-1500",
			"conventionalUnit": "µg/L",
			"factor": "0.001",
			"siRange": "0-1.5",
			"siUnit": "mg/L",
			"siValue": "0",
			"usValue": "0"
		},
		{
			"name": "Immunoglobulin G (IgG)",
			"specimen": "Serum",
			"conventionalRange": "650-1600",
			"conventionalUnit": "mg/dL",
			"factor": "0.01",
			"siRange": "6.5-16.0",
			"siUnit": "g/L",
			"siValue": "6.5",
			"usValue": "650"
		},
		{
			"name": "Immunoglobulin M (IgM)",
			"specimen": "Serum",
			"conventionalRange": "54-300",
			"conventionalUnit": "mg/dL",
			"factor": "10",
			"siRange": "550-3000",
			"siUnit": "mg/L",
			"siValue": "550",
			"usValue": "54"
		},
		{
			"name": "Insulin",
			"specimen": "Serum",
			"conventionalRange": "2.0-20",
			"conventionalUnit": "",
			"factor": "6.945",
			"siRange": "14-140",
			"siUnit": "pmol/L",
			"siValue": "14",
			"usValue": "2.0"
		},
		{
			"name": "Insulinlike growth factor",
			"specimen": "Serum",
			"conventionalRange": "130-450",
			"conventionalUnit": "ng/mL",
			"factor": "0.131",
			"siRange": "18-60",
			"siUnit": "nmol/L",
			"siValue": "18",
			"usValue": "130"
		},
		{
			"name": "Iodine",
			"specimen": "Serum",
			"conventionalRange": "58-77",
			"conventionalUnit": "µg/L",
			"factor": "7.88",
			"siRange": "450-580",
			"siUnit": "nmol/L",
			"siValue": "450",
			"usValue": "58"
		},
		{
			"name": "Iron",
			"specimen": "Serum",
			"conventionalRange": "60-150",
			"conventionalUnit": "µg/dL",
			"factor": "0.179",
			"siRange": "10.7-26.9",
			"siUnit": "µmol/L",
			"siValue": "10.7",
			"usValue": "60"
		},
		{
			"name": "Iron-binding capacity",
			"specimen": "Serum",
			"conventionalRange": "250-450",
			"conventionalUnit": "µg/dL",
			"factor": "0.179",
			"siRange": "44.8-80.6",
			"siUnit": "µmol/L",
			"siValue": "44.8",
			"usValue": "250"
		},
		{
			"name": "Isoleucine",
			"specimen": "Plasma",
			"conventionalRange": "0.5-1.3",
			"conventionalUnit": "mg/dL",
			"factor": "76.236",
			"siRange": "40-100",
			"siUnit": "µmol/L",
			"siValue": "40",
			"usValue": "0.5"
		},
		{
			"name": "Isoniazid",
			"specimen": "Plasma",
			"conventionalRange": "1-7",
			"conventionalUnit": "µg/mL",
			"factor": "7.291",
			"siRange": "7-51",
			"siUnit": "µmol/L",
			"siValue": "7",
			"usValue": "1"
		},
		{
			"name": "Isopropanol (toxic)",
			"specimen": "Serum, Plasma",
			"conventionalRange": ">400",
			"conventionalUnit": "mg/L",
			"factor": "0.0166",
			"siRange": ">6.64",
			"siUnit": "mmol/L",
			"siValue": "6.64",
			"usValue": "400"
		},
		{
			"name": "Kanamycin",
			"specimen": "Serum, Plasma",
			"conventionalRange": "25-35",
			"conventionalUnit": "µg/mL",
			"factor": "2.08",
			"siRange": "52-72",
			"siUnit": "µmol/L",
			"siValue": "52",
			"usValue": "25"
		},
		{
			"name": "Ketamine",
			"specimen": "Serum",
			"conventionalRange": "0.2-6.3",
			"conventionalUnit": "µg/mL",
			"factor": "4.206",
			"siRange": "0.8-26",
			"siUnit": "µmol/L",
			"siValue": "0.8",
			"usValue": "0.2"
		},
		{
			"name": "17-Ketosteroids",
			"specimen": "Urine",
			"conventionalRange": "3-12",
			"conventionalUnit": "mg/24h",
			"factor": "3.33",
			"siRange": "10-42",
			"siUnit": "µmol/d",
			"siValue": "10",
			"usValue": "3"
		},
		{
			"name": "Lactate",
			"specimen": "Plasma",
			"conventionalRange": "5.0-15",
			"conventionalUnit": "mg/dL",
			"factor": "0.111",
			"siRange": "0.6-1.7",
			"siUnit": "mmol/L",
			"siValue": "0.6",
			"usValue": "5.0"
		},
		{
			"name": "Lactate dehydrogenase (LDH)",
			"specimen": "Serum",
			"conventionalRange": "100-200",
			"conventionalUnit": "U/L",
			"factor": "0.0167",
			"siRange": "1.7-3.4",
			"siUnit": "µkat/L",
			"siValue": "1.7",
			"usValue": "100"
		},
		{
			"name": "LD1",
			"specimen": "Serum",
			"conventionalRange": "17-27",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.17-0.27",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.17",
			"usValue": "17"
		},
		{
			"name": "LD2",
			"specimen": "Serum",
			"conventionalRange": "27-37",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.27-0.37",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.27",
			"usValue": "27"
		},
		{
			"name": "LD3",
			"specimen": "Serum",
			"conventionalRange": "18-25",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.18-0.25",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.18",
			"usValue": "18"
		},
		{
			"name": "LD4",
			"specimen": "Serum",
			"conventionalRange": "3-8",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.03-0.08",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.03",
			"usValue": "3"
		},
		{
			"name": "LD5",
			"specimen": "Serum",
			"conventionalRange": "0-5",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0-0.05",
			"siUnit": "Proportion of 1.0",
			"siValue": "0",
			"usValue": "0"
		},
		{
			"name": "Lead",
			"specimen": "Serum",
			"conventionalRange": "<10-20",
			"conventionalUnit": "µg/dL",
			"factor": "0.0483",
			"siRange": "<0.5-1.0",
			"siUnit": "µmol/L",
			"siValue": "<0.5",
			"usValue": "<10"
		},
		{
			"name": "Leucine",
			"specimen": "Plasma",
			"conventionalRange": "1.0-2.3",
			"conventionalUnit": "mg/dL",
			"factor": "76.237",
			"siRange": "75-175",
			"siUnit": "µmol/L",
			"siValue": "75",
			"usValue": "1.0"
		},
		{
			"name": "Lidocaine",
			"specimen": "Serum, Plasma",
			"conventionalRange": "1.5-6.0",
			"conventionalUnit": "µg/mL",
			"factor": "4.267",
			"siRange": "6.4-25.6",
			"siUnit": "µmol/L",
			"siValue": "6.4",
			"usValue": "1.5"
		},
		{
			"name": "Lipase",
			"specimen": "Serum",
			"conventionalRange": "31-186",
			"conventionalUnit": "U/L",
			"factor": "0.0167",
			"siRange": "0.5-3.2",
			"siUnit": "µkat/L",
			"siValue": "0.5",
			"usValue": "31"
		},
		{
			"name": "Lipoprotein(a) [Lp(a)]",
			"specimen": "Serum",
			"conventionalRange": "10-30",
			"conventionalUnit": "mg/dL",
			"factor": "0.0357",
			"siRange": "0.35-1.0",
			"siUnit": "µmol/L",
			"siValue": "0.35",
			"usValue": "10"
		},
		{
			"name": "Lithium",
			"specimen": "Serum",
			"conventionalRange": "0.6-1.2",
			"conventionalUnit": "mEq/L",
			"factor": "1",
			"siRange": "0.6-1.2",
			"siUnit": "mmol/L",
			"siValue": "0.6",
			"usValue": "0.6"
		},
		{
			"name": "Lorazepam",
			"specimen": "Serum",
			"conventionalRange": "50-240",
			"conventionalUnit": "ng/mL",
			"factor": "3.114",
			"siRange": "156-746",
			"siUnit": "nmol/L",
			"siValue": "156",
			"usValue": "50"
		},
		{
			"name": "Luteinizing hormone (LH)",
			"specimen": "Serum, Plasma",
			"conventionalRange": "1-104",
			"conventionalUnit": "mIU/mL",
			"factor": "1",
			"siRange": "1-104",
			"siUnit": "IU/L",
			"siValue": "1",
			"usValue": "1"
		},
		{
			"name": "Lycopene",
			"specimen": "Serum",
			"conventionalRange": "0.15-0.25",
			"conventionalUnit": "mg/L",
			"factor": "1.863",
			"siRange": "0.28-0.46",
			"siUnit": "µmol/L",
			"siValue": "0.28",
			"usValue": "0.15"
		},
		{
			"name": "Lysergic acid diethylamide",
			"specimen": "Serum",
			"conventionalRange": "<0.004",
			"conventionalUnit": "µg/mL",
			"factor": "3726",
			"siRange": "<15",
			"siUnit": "nmol/L",
			"siValue": "15",
			"usValue": "0.004"
		},
		{
			"name": "Lysine",
			"specimen": "Plasma",
			"conventionalRange": "1.2-3.5",
			"conventionalUnit": "mg/dL",
			"factor": "68.404",
			"siRange": "80-240",
			"siUnit": "µmol/L",
			"siValue": "80",
			"usValue": "1.2"
		},
		{
			"name": "Lysozyme",
			"specimen": "Serum, Plasma",
			"conventionalRange": "0.4-1.3",
			"conventionalUnit": "mg/dL",
			"factor": "10",
			"siRange": "4-13",
			"siUnit": "mg/L",
			"siValue": "4",
			"usValue": "0.4"
		},
		{
			"name": "Magnesium",
			"specimen": "Serum",
			"conventionalRange": "1.3-2.1",
			"conventionalUnit": "mEq/L",
			"factor": "0.5",
			"siRange": "0.65-1.05",
			"siUnit": "mmol/L",
			"siValue": "0.65",
			"usValue": "1.3"
		},
		{
			"name": "Manganese",
			"specimen": "Whole blood",
			"conventionalRange": "10-12",
			"conventionalUnit": "µg/L",
			"factor": "18.202",
			"siRange": "182-218",
			"siUnit": "nmol/L",
			"siValue": "182",
			"usValue": "10"
		},
		{
			"name": "Maprotiline",
			"specimen": "Plasma",
			"conventionalRange": "200-600",
			"conventionalUnit": "ng/mL",
			"factor": "1",
			"siRange": "200-600",
			"siUnit": "µg/L",
			"siValue": "200",
			"usValue": "200"
		},
		{
			"name": "Melatonin",
			"specimen": "Serum",
			"conventionalRange": "10-15",
			"conventionalUnit": "",
			"factor": "4.305",
			"siRange": "45-66",
			"siUnit": "pmol/L",
			"siValue": "45",
			"usValue": "10"
		},
		{
			"name": "Meperidine",
			"specimen": "Serum, Plasma",
			"conventionalRange": "400-700",
			"conventionalUnit": "ng/mL",
			"factor": "4.043",
			"siRange": "1620-2830",
			"siUnit": "nmol/L",
			"siValue": "1620",
			"usValue": "400"
		},
		{
			"name": "Mercury",
			"specimen": "Serum",
			"conventionalRange": "<5",
			"conventionalUnit": "µg/L",
			"factor": "4.985",
			"siRange": "<25",
			"siUnit": "nmol/L",
			"siValue": "25",
			"usValue": "5"
		},
		{
			"name": "Metanephrine (total)",
			"specimen": "Urine",
			"conventionalRange": "<1.0",
			"conventionalUnit": "mg/24h",
			"factor": "5.07",
			"siRange": "<5",
			"siUnit": "µmol/d",
			"siValue": "5",
			"usValue": "1.0"
		},
		{
			"name": "Metformin",
			"specimen": "Serum",
			"conventionalRange": "1-4",
			"conventionalUnit": "µg/mL",
			"factor": "7.742",
			"siRange": "8-30",
			"siUnit": "µmol/L",
			"siValue": "8",
			"usValue": "1"
		},
		{
			"name": "Methadone",
			"specimen": "Serum, Plasma",
			"conventionalRange": "100-400",
			"conventionalUnit": "ng/mL",
			"factor": "0.00323",
			"siRange": "0.32-1.29",
			"siUnit": "µmol/L",
			"siValue": "0.32",
			"usValue": "100"
		},
		{
			"name": "Methamphetamine",
			"specimen": "Serum",
			"conventionalRange": "0.01-0.05",
			"conventionalUnit": "µg/mL",
			"factor": "6.7",
			"siRange": "0.07-0.34",
			"siUnit": "µmol/L",
			"siValue": "0.07",
			"usValue": "0.01"
		},
		{
			"name": "Methanol",
			"specimen": "Plasma",
			"conventionalRange": "<200",
			"conventionalUnit": "µg/mL",
			"factor": "0.0312",
			"siRange": "<6.2",
			"siUnit": "mmol/L",
			"siValue": "6.2",
			"usValue": "200"
		},
		{
			"name": "Methaqualone",
			"specimen": "Serum, Plasma",
			"conventionalRange": "2-3",
			"conventionalUnit": "µg/mL",
			"factor": "4",
			"siRange": "8-12",
			"siUnit": "µmol/L",
			"siValue": "8",
			"usValue": "2"
		},
		{
			"name": "Methemoglobin",
			"specimen": "Whole blood",
			"conventionalRange": "<0.24",
			"conventionalUnit": "g/dL",
			"factor": "155",
			"siRange": "<37.2",
			"siUnit": "µmol/L",
			"siValue": "37.2",
			"usValue": "0.24"
		},
		{
			"name": "Methemoglobin",
			"specimen": "Whole blood",
			"conventionalRange": "<1.0",
			"conventionalUnit": "% of total hemoglobin",
			"factor": "0.01",
			"siRange": "<0.01",
			"siUnit": "Proportion of total hemoglobin",
			"siValue": "0.01",
			"usValue": "1.0"
		},
		{
			"name": "Methicillin",
			"specimen": "Serum",
			"conventionalRange": "8-25",
			"conventionalUnit": "mg/L",
			"factor": "2.636",
			"siRange": "22-66",
			"siUnit": "µmol/L",
			"siValue": "22",
			"usValue": "8"
		},
		{
			"name": "Methionine",
			"specimen": "Plasma",
			"conventionalRange": "0.1-0.6",
			"conventionalUnit": "mg/dL",
			"factor": "67.02",
			"siRange": "6-40",
			"siUnit": "µmol/L",
			"siValue": "6",
			"usValue": "0.1"
		},
		{
			"name": "Methotrexate",
			"specimen": "Serum, Plasma",
			"conventionalRange": "0.04-0.36",
			"conventionalUnit": "mg/L",
			"factor": "2200",
			"siRange": "90-790",
			"siUnit": "nmol/L",
			"siValue": "90",
			"usValue": "0.04"
		},
		{
			"name": "Methyldopa",
			"specimen": "Plasma",
			"conventionalRange": "1-5",
			"conventionalUnit": "µg/mL",
			"factor": "4.735",
			"siRange": "5.0-25",
			"siUnit": "µmol/L",
			"siValue": "5.0",
			"usValue": "1"
		},
		{
			"name": "Metoprolol",
			"specimen": "Serum, Plasma",
			"conventionalRange": "75-200",
			"conventionalUnit": "ng/mL",
			"factor": "3.74",
			"siRange": "281-748",
			"siUnit": "nmol/L",
			"siValue": "281",
			"usValue": "75"
		},
		{
			"name": "2 -Microglobulin",
			"specimen": "Serum",
			"conventionalRange": "1.2-2.8",
			"conventionalUnit": "mg/L",
			"factor": "1",
			"siRange": "1.2-2.8",
			"siUnit": "mg/L",
			"siValue": "1.2",
			"usValue": "1.2"
		},
		{
			"name": "Morphine",
			"specimen": "Serum, Plasma",
			"conventionalRange": "10-80",
			"conventionalUnit": "ng/mL",
			"factor": "3.504",
			"siRange": "35-280",
			"siUnit": "nmol/L",
			"siValue": "35",
			"usValue": "10"
		},
		{
			"name": "Myoglobin",
			"specimen": "Serum",
			"conventionalRange": "19-92",
			"conventionalUnit": "µg/L",
			"factor": "0.0571",
			"siRange": "1.0-5.3",
			"siUnit": "nmol/L",
			"siValue": "1.0",
			"usValue": "19"
		},
		{
			"name": "Naproxen",
			"specimen": "Serum",
			"conventionalRange": "26-70",
			"conventionalUnit": "µg/mL",
			"factor": "4.343",
			"siRange": "115-300",
			"siUnit": "µmol/L",
			"siValue": "115",
			"usValue": "26"
		},
		{
			"name": "Niacin (nicotinic acid)",
			"specimen": "Urine",
			"conventionalRange": "2.4-6.4",
			"conventionalUnit": "mg/24h",
			"factor": "7.3",
			"siRange": "17.5-46.7",
			"siUnit": "µmol/d",
			"siValue": "17.5",
			"usValue": "2.4"
		},
		{
			"name": "Nickel",
			"specimen": "Whole blood",
			"conventionalRange": "1.0-28.0",
			"conventionalUnit": "µg/L",
			"factor": "17.033",
			"siRange": "17-476",
			"siUnit": "nmol/L",
			"siValue": "17",
			"usValue": "1.0"
		},
		{
			"name": "Nicotine",
			"specimen": "Plasma",
			"conventionalRange": "0.01-0.05",
			"conventionalUnit": "mg/L",
			"factor": "6.164",
			"siRange": "0.062-0.308",
			"siUnit": "µmol/L",
			"siValue": "0.062",
			"usValue": "0.01"
		},
		{
			"name": "Nitrogen (nonprotein)",
			"specimen": "Serum",
			"conventionalRange": "20-35",
			"conventionalUnit": "mg/dL",
			"factor": "0.714",
			"siRange": "14.3-25.0",
			"siUnit": "mmol/L",
			"siValue": "14.3",
			"usValue": "20"
		},
		{
			"name": "Nitroprusside (as thiocyanate)",
			"specimen": "",
			"conventionalRange": "6-29",
			"conventionalUnit": "µg/L",
			"factor": "17.2",
			"siRange": "103-500",
			"siUnit": "µmol/L",
			"siValue": "103",
			"usValue": "6"
		},
		{
			"name": "Norepinephrine",
			"specimen": "Plasma",
			"conventionalRange": "110-410",
			"conventionalUnit": "pg/mL",
			"factor": "5.911",
			"siRange": "650-2423",
			"siUnit": "pmol/L",
			"siValue": "650",
			"usValue": "110"
		},
		{
			"name": "Nortriptyline",
			"specimen": "Serum, Plasma",
			"conventionalRange": "50-150",
			"conventionalUnit": "ng/mL",
			"factor": "3.797",
			"siRange": "190-570",
			"siUnit": "nmol/L",
			"siValue": "190",
			"usValue": "50"
		},
		{
			"name": "Ornithine",
			"specimen": "Plasma",
			"conventionalRange": "0.4-1.4",
			"conventionalUnit": "mg/dL",
			"factor": "75.666",
			"siRange": "30-106",
			"siUnit": "µmol/L",
			"siValue": "30",
			"usValue": "0.4"
		},
		{
			"name": "Osmolality",
			"specimen": "Serum",
			"conventionalRange": "275-295",
			"conventionalUnit": "mOsm/kg",
			"factor": "1",
			"siRange": "275-295",
			"siUnit": "mmol/kg",
			"siValue": "275",
			"usValue": "275"
		},
		{
			"name": "Osteocalcin",
			"specimen": "Serum",
			"conventionalRange": "3.0-13.0",
			"conventionalUnit": "ng/mL",
			"factor": "1",
			"siRange": "3.0-13.0",
			"siUnit": "µg/L",
			"siValue": "3.0",
			"usValue": "3.0"
		},
		{
			"name": "Oxalate",
			"specimen": "Serum",
			"conventionalRange": "1.0-2.4",
			"conventionalUnit": "",
			"factor": "11.107",
			"siRange": "11-27",
			"siUnit": "µmol/L",
			"siValue": "11",
			"usValue": "1.0"
		},
		{
			"name": "Oxazepam",
			"specimen": "Serum, Plasma",
			"conventionalRange": "0.2-1.4",
			"conventionalUnit": "µg/mL",
			"factor": "3.487",
			"siRange": "0.7-4.9",
			"siUnit": "µmol/L",
			"siValue": "0.7",
			"usValue": "0.2"
		},
		{
			"name": "Oxycodone",
			"specimen": "Serum",
			"conventionalRange": "10-100",
			"conventionalUnit": "ng/mL",
			"factor": "3.171",
			"siRange": "32-317",
			"siUnit": "nmol/L",
			"siValue": "32",
			"usValue": "10"
		},
		{
			"name": "Oxygen, partial pressure (Po 2 )",
			"specimen": "Arterial blood",
			"conventionalRange": "80-100",
			"conventionalUnit": "mm Hg",
			"factor": "0.133",
			"siRange": "11-13",
			"siUnit": "kPa",
			"siValue": "11",
			"usValue": "80"
		},
		{
			"name": "Paraquat",
			"specimen": "Whole blood",
			"conventionalRange": "0.1-1.6",
			"conventionalUnit": "µg/mL",
			"factor": "5.369",
			"siRange": "0.5-8.5",
			"siUnit": "µmol/L",
			"siValue": "0.5",
			"usValue": "0.1"
		},
		{
			"name": "Parathyroid hormone",
			"specimen": "Serum",
			"conventionalRange": "10-65",
			"conventionalUnit": "pg/mL",
			"factor": "1",
			"siRange": "10-65",
			"siUnit": "ng/L",
			"siValue": "10",
			"usValue": "10"
		},
		{
			"name": "Pentobarbital",
			"specimen": "Serum, Plasma",
			"conventionalRange": "1-5",
			"conventionalUnit": "µg/mL",
			"factor": "4.439",
			"siRange": "4.0-22",
			"siUnit": "µmol/L",
			"siValue": "4.0",
			"usValue": "1"
		},
		{
			"name": "Pepsinogen",
			"specimen": "Serum",
			"conventionalRange": "28-100",
			"conventionalUnit": "ng/mL",
			"factor": "1",
			"siRange": "28-100",
			"siUnit": "µg/L",
			"siValue": "28",
			"usValue": "28"
		},
		{
			"name": "Phencyclidine (toxic)",
			"specimen": "Serum, Plasma",
			"conventionalRange": "90-800",
			"conventionalUnit": "ng/mL",
			"factor": "4.109",
			"siRange": "370-3288",
			"siUnit": "nmol/L",
			"siValue": "370",
			"usValue": "90"
		},
		{
			"name": "Phenobarbital",
			"specimen": "Serum, Plasma",
			"conventionalRange": "15-40",
			"conventionalUnit": "µg/mL",
			"factor": "4.31",
			"siRange": "65-172",
			"siUnit": "µmol/L",
			"siValue": "65",
			"usValue": "15"
		},
		{
			"name": "Phenylalanine",
			"specimen": "Plasma",
			"conventionalRange": "0.6-1.5",
			"conventionalUnit": "mg/dL",
			"factor": "60.544",
			"siRange": "35-90",
			"siUnit": "µmol/L",
			"siValue": "35",
			"usValue": "0.6"
		},
		{
			"name": "Phenylpropanolamine",
			"specimen": "Serum",
			"conventionalRange": "0.05-0.10",
			"conventionalUnit": "µg/mL",
			"factor": "6613",
			"siRange": "330-660",
			"siUnit": "nmol/L",
			"siValue": "330",
			"usValue": "0.05"
		},
		{
			"name": "Phenytoin",
			"specimen": "Serum, Plasma",
			"conventionalRange": "10-20",
			"conventionalUnit": "mg/L",
			"factor": "3.968",
			"siRange": "40-79",
			"siUnit": "µmol/L",
			"siValue": "40",
			"usValue": "10"
		},
		{
			"name": "Phosphorus (inorganic)",
			"specimen": "Serum",
			"conventionalRange": "2.3-4.7",
			"conventionalUnit": "mg/dL",
			"factor": "0.323",
			"siRange": "0.74-1.52",
			"siUnit": "mmol/L",
			"siValue": "0.74",
			"usValue": "2.3"
		},
		{
			"name": "Placental lactogen",
			"specimen": "Serum",
			"conventionalRange": "0.5-1.1",
			"conventionalUnit": "µg/mL",
			"factor": "46.296",
			"siRange": "23-509",
			"siUnit": "nmol/L",
			"siValue": "23",
			"usValue": "0.5"
		},
		{
			"name": "Plasminogen (antigenic)",
			"specimen": "Plasma",
			"conventionalRange": "10-20",
			"conventionalUnit": "mg/dL",
			"factor": "0.113",
			"siRange": "1.1-2.2",
			"siUnit": "µmol/L",
			"siValue": "1.1",
			"usValue": "10"
		},
		{
			"name": "Plasminogen activator inhibitor",
			"specimen": "Plasma",
			"conventionalRange": "4-40",
			"conventionalUnit": "ng/mL",
			"factor": "19.231",
			"siRange": "75-750",
			"siUnit": "pmol/L",
			"siValue": "75",
			"usValue": "4"
		},
		{
			"name": "platelet",
			"specimen": "Whole blood",
			"conventionalRange": "150-350",
			"conventionalUnit": "",
			"factor": "1",
			"siRange": "150-350",
			"siUnit": "×109/L",
			"siValue": "150",
			"usValue": "150"
		},
		{
			"name": "Porphyrins (total)",
			"specimen": "Urine",
			"conventionalRange": "20-120",
			"conventionalUnit": "µg/L",
			"factor": "1.203",
			"siRange": "25-144",
			"siUnit": "nmol/L",
			"siValue": "25",
			"usValue": "20"
		},
		{
			"name": "Potassium",
			"specimen": "Serum",
			"conventionalRange": "3.5-5.0",
			"conventionalUnit": "mEq/L",
			"factor": "1",
			"siRange": "3.5-5.0",
			"siUnit": "mmol/L",
			"siValue": "3.5",
			"usValue": "3.5"
		},
		{
			"name": "Prealbumin",
			"specimen": "Serum",
			"conventionalRange": "19.5-35.8",
			"conventionalUnit": "mg/dL",
			"factor": "10",
			"siRange": "195-358",
			"siUnit": "mg/L",
			"siValue": "195",
			"usValue": "19.5"
		},
		{
			"name": "Pregnanediol",
			"specimen": "Urine",
			"conventionalRange": "<2.6",
			"conventionalUnit": "",
			"factor": "3.12",
			"siRange": "<8",
			"siUnit": "µmol/d",
			"siValue": "8",
			"usValue": "2.6"
		},
		{
			"name": "Pregnanetriol",
			"specimen": "Urine",
			"conventionalRange": "<2.5",
			"conventionalUnit": "",
			"factor": "2.972",
			"siRange": "<7.5",
			"siUnit": "µmol/d",
			"siValue": "7.5",
			"usValue": "2.5"
		},
		{
			"name": "Primidone",
			"specimen": "Serum, Plasma",
			"conventionalRange": "5-12",
			"conventionalUnit": "µg/mL",
			"factor": "4.582",
			"siRange": "23-55",
			"siUnit": "µmol/L",
			"siValue": "23",
			"usValue": "5"
		},
		{
			"name": "Procainamide",
			"specimen": "Serum, Plasma",
			"conventionalRange": "4-10",
			"conventionalUnit": "µg/mL",
			"factor": "4.25",
			"siRange": "17-42",
			"siUnit": "µmol/L",
			"siValue": "17",
			"usValue": "4"
		},
		{
			"name": "Progesterone",
			"specimen": "Serum",
			"conventionalRange": "0.15-25",
			"conventionalUnit": "ng/mL",
			"factor": "3.18",
			"siRange": "0.5-79.5",
			"siUnit": "nmol/L",
			"siValue": "0.5",
			"usValue": "0.15"
		},
		{
			"name": "Prolactin",
			"specimen": "Serum",
			"conventionalRange": "3.8-23.2",
			"conventionalUnit": "µg/L",
			"factor": "43.478",
			"siRange": "165-1010",
			"siUnit": "pmol/L",
			"siValue": "165",
			"usValue": "3.8"
		},
		{
			"name": "Proline",
			"specimen": "Plasma",
			"conventionalRange": "1.2-3.9",
			"conventionalUnit": "mg/dL",
			"factor": "86.858",
			"siRange": "104-340",
			"siUnit": "µmol/L",
			"siValue": "104",
			"usValue": "1.2"
		},
		{
			"name": "Propoxyphene",
			"specimen": "Plasma",
			"conventionalRange": "0.1-0.4",
			"conventionalUnit": "µg/mL",
			"factor": "2.946",
			"siRange": "0.3-1.2",
			"siUnit": "µmol/L",
			"siValue": "0.3",
			"usValue": "0.1"
		},
		{
			"name": "Propranolol",
			"specimen": "Serum",
			"conventionalRange": "50-100",
			"conventionalUnit": "ng/mL",
			"factor": "3.856",
			"siRange": "193-386",
			"siUnit": "nmol/L",
			"siValue": "193",
			"usValue": "50"
		},
		{
			"name": "Prostate-specific antigen",
			"specimen": "Serum",
			"conventionalRange": "<4.0",
			"conventionalUnit": "µg/L",
			"factor": "1",
			"siRange": "<4.0",
			"siUnit": "µg/L",
			"siValue": "4.0",
			"usValue": "4.0"
		},
		{
			"name": "Protein (total)",
			"specimen": "Serum",
			"conventionalRange": "6.0-8.0",
			"conventionalUnit": "g/dL",
			"factor": "10",
			"siRange": "60-80",
			"siUnit": "g/L",
			"siValue": "60",
			"usValue": "6.0"
		},
		{
			"name": "Prothrombin time (PT)",
			"specimen": "Plasma",
			"conventionalRange": "10-13",
			"conventionalUnit": "s",
			"factor": "1",
			"siRange": "10-13",
			"siUnit": "s",
			"siValue": "10",
			"usValue": "10"
		},
		{
			"name": "Protoporphyrin",
			"specimen": "Serum, Plasma",
			"conventionalRange": "15-150",
			"conventionalUnit": "µg/dL",
			"factor": "0.0178",
			"siRange": "0.27-0.89",
			"siUnit": "µmol/L",
			"siValue": "0.27",
			"usValue": "15"
		},
		{
			"name": "Protriptyline",
			"specimen": "Serum, Plasma",
			"conventionalRange": "70-250",
			"conventionalUnit": "µg/dL",
			"factor": "3.787",
			"siRange": "266-950",
			"siUnit": "nmol/L",
			"siValue": "266",
			"usValue": "70"
		},
		{
			"name": "Pyruvate",
			"specimen": "Plasma",
			"conventionalRange": "0.5-1.5",
			"conventionalUnit": "mg/dL",
			"factor": "113.56",
			"siRange": "60-170",
			"siUnit": "µmol/L",
			"siValue": "60",
			"usValue": "0.5"
		},
		{
			"name": "Quinidine",
			"specimen": "Serum",
			"conventionalRange": "2.0-5.0",
			"conventionalUnit": "µg/mL",
			"factor": "3.082",
			"siRange": "6.2-15.4",
			"siUnit": "µmol/L",
			"siValue": "6.2",
			"usValue": "2.0"
		},
		{
			"name": "Red blood cell count",
			"specimen": "Whole blood",
			"conventionalRange": "3.9-5.5",
			"conventionalUnit": "",
			"factor": "1",
			"siRange": "3.9-5.5",
			"siUnit": "×1012/L",
			"siValue": "3.9",
			"usValue": "3.9"
		},
		{
			"name": "Renin",
			"specimen": "Plasma",
			"conventionalRange": "30-40",
			"conventionalUnit": "pg/mL",
			"factor": "0.0237",
			"siRange": "0.7-1.0",
			"siUnit": "pmol/L",
			"siValue": "0.7",
			"usValue": "30"
		},
		{
			"name": "Reticulocyte count",
			"specimen": "Whole blood",
			"conventionalRange": "25-75",
			"conventionalUnit": "",
			"factor": "1",
			"siRange": "25-75",
			"siUnit": "×109/L",
			"siValue": "25",
			"usValue": "25"
		},
		{
			"name": "Reticulocyte count",
			"specimen": "Whole blood",
			"conventionalRange": "0.5-1.5",
			"conventionalUnit": "",
			"factor": "0.01",
			"siRange": "0.005-0.015",
			"siUnit": "Proportion of red blood cells",
			"siValue": "0.005",
			"usValue": "0.5"
		},
		{
			"name": "Rifampin",
			"specimen": "Serum",
			"conventionalRange": "4-40",
			"conventionalUnit": "mg/L",
			"factor": "1.215",
			"siRange": "5-49",
			"siUnit": "µmol/L",
			"siValue": "5",
			"usValue": "4"
		},
		{
			"name": "Salicylates",
			"specimen": "Serum, Plasma",
			"conventionalRange": "150-300",
			"conventionalUnit": "µg/mL",
			"factor": "7.24",
			"siRange": "1086-2172",
			"siUnit": "µmol/L",
			"siValue": "1086",
			"usValue": "150"
		},
		{
			"name": "Selenium",
			"specimen": "Serum, Plasma",
			"conventionalRange": "58-234",
			"conventionalUnit": "µg/L",
			"factor": "0.0127",
			"siRange": "0.74-2.97",
			"siUnit": "µmol/L",
			"siValue": "0.74",
			"usValue": "58"
		},
		{
			"name": "Serine",
			"specimen": "Plasma",
			"conventionalRange": "0.7-2.0",
			"conventionalUnit": "mg/dL",
			"factor": "95.156",
			"siRange": "65-193",
			"siUnit": "µmol/L",
			"siValue": "65",
			"usValue": "0.7"
		},
		{
			"name": "Serotonin (5-hydroxytryptamine)",
			"specimen": "Whole blood",
			"conventionalRange": "50-200",
			"conventionalUnit": "ng/mL",
			"factor": "0.00568",
			"siRange": "0.28-1.14",
			"siUnit": "µmol/L",
			"siValue": "0.28",
			"usValue": "50"
		},
		{
			"name": "Sex hormone-binding globulin",
			"specimen": "Serum",
			"conventionalRange": "1.5-2.0",
			"conventionalUnit": "µg/mL",
			"factor": "8.896",
			"siRange": "13-17",
			"siUnit": "nmol/L",
			"siValue": "13",
			"usValue": "1.5"
		},
		{
			"name": "Sodium",
			"specimen": "Serum",
			"conventionalRange": "136-142",
			"conventionalUnit": "mEq/L",
			"factor": "1",
			"siRange": "136-142",
			"siUnit": "mmol/L",
			"siValue": "136",
			"usValue": "136"
		},
		{
			"name": "Somatomedin C (Insulinlike growth factor)",
			"specimen": "Serum",
			"conventionalRange": "130-450",
			"conventionalUnit": "ng/mL",
			"factor": "0.131",
			"siRange": "18-60",
			"siUnit": "nmol/L",
			"siValue": "18",
			"usValue": "130"
		},
		{
			"name": "Somatostatin",
			"specimen": "Plasma",
			"conventionalRange": "<25",
			"conventionalUnit": "pg/mL",
			"factor": "0.611",
			"siRange": "<15",
			"siUnit": "pmol/L",
			"siValue": "15",
			"usValue": "25"
		},
		{
			"name": "Streptomycin",
			"specimen": "Serum",
			"conventionalRange": "7-50",
			"conventionalUnit": "mg/L",
			"factor": "1.719",
			"siRange": "12-86",
			"siUnit": "µmol/L",
			"siValue": "12",
			"usValue": "7"
		},
		{
			"name": "Strychnine",
			"specimen": "Whole blood",
			"conventionalRange": "<0.5",
			"conventionalUnit": "mg/L",
			"factor": "2.99",
			"siRange": "<1.5",
			"siUnit": "µmol/L",
			"siValue": "1.5",
			"usValue": "0.5"
		},
		{
			"name": "Substance P",
			"specimen": "Plasma",
			"conventionalRange": "<240",
			"conventionalUnit": "pg/mL",
			"factor": "0.742",
			"siRange": "<180",
			"siUnit": "pmol/L",
			"siValue": "180",
			"usValue": "240"
		},
		{
			"name": "Sulfate",
			"specimen": "Serum",
			"conventionalRange": "10-32",
			"conventionalUnit": "mg/L",
			"factor": "31.188",
			"siRange": "310-990",
			"siUnit": "µmol/L",
			"siValue": "310",
			"usValue": "10"
		},
		{
			"name": "Sulfmethemoglobin",
			"specimen": "Whole blood",
			"conventionalRange": "<1.0",
			"conventionalUnit": "% of total hemoglobin",
			"factor": "0.01",
			"siRange": "<0.010",
			"siUnit": "Proportion of total hemoglobin",
			"siValue": "0.010",
			"usValue": "1.0"
		},
		{
			"name": "Taurine",
			"specimen": "Plasma",
			"conventionalRange": "0.3-2.1",
			"conventionalUnit": "mg/dL",
			"factor": "79.91",
			"siRange": "24-168",
			"siUnit": "µmol/L",
			"siValue": "24",
			"usValue": "0.3"
		},
		{
			"name": "Testosterone",
			"specimen": "Serum",
			"conventionalRange": "300-1200",
			"conventionalUnit": "ng/dL",
			"factor": "0.0347",
			"siRange": "10.4-41.6",
			"siUnit": "nmol/L",
			"siValue": "10.4",
			"usValue": "300"
		},
		{
			"name": "Tetrahydrocannabinol",
			"specimen": "Serum",
			"conventionalRange": "<0.20",
			"conventionalUnit": "µg/mL",
			"factor": "3.18",
			"siRange": "<0.60",
			"siUnit": "µmol/L",
			"siValue": "0.60",
			"usValue": "0.20"
		},
		{
			"name": "Theophylline",
			"specimen": "Serum, Plasma",
			"conventionalRange": "10-20",
			"conventionalUnit": "µg/mL",
			"factor": "5.55",
			"siRange": "56-111",
			"siUnit": "µmol/L",
			"siValue": "56",
			"usValue": "10"
		},
		{
			"name": "Thiopental",
			"specimen": "Serum, Plasma",
			"conventionalRange": "1-5",
			"conventionalUnit": "µg/mL",
			"factor": "4.144",
			"siRange": "4.1-20.7",
			"siUnit": "µmol/L",
			"siValue": "4.1",
			"usValue": "1"
		},
		{
			"name": "Thioridazine",
			"specimen": "Serum, Plasma",
			"conventionalRange": "1.0-1.5",
			"conventionalUnit": "µg/mL",
			"factor": "2.699",
			"siRange": "2.7-4.1",
			"siUnit": "µmol/L",
			"siValue": "2.7",
			"usValue": "1.0"
		},
		{
			"name": "Threonine",
			"specimen": "Plasma",
			"conventionalRange": "0.9-2.5",
			"conventionalUnit": "mg/dL",
			"factor": "84",
			"siRange": "75-210",
			"siUnit": "µmol/L",
			"siValue": "75",
			"usValue": "0.9"
		},
		{
			"name": "Thrombin time",
			"specimen": "Plasma",
			"conventionalRange": "16-24",
			"conventionalUnit": "s",
			"factor": "1",
			"siRange": "16-24",
			"siUnit": "s",
			"siValue": "16",
			"usValue": "16"
		},
		{
			"name": "Thyroglobulin",
			"specimen": "Serum",
			"conventionalRange": "3-42",
			"conventionalUnit": "ng/mL",
			"factor": "1",
			"siRange": "3-42",
			"siUnit": "µg/L",
			"siValue": "3",
			"usValue": "3"
		},
		{
			"name": "Thyrotropin",
			"specimen": "Serum",
			"conventionalRange": "0.4-4.2",
			"conventionalUnit": "ng/mL",
			"factor": "1",
			"siRange": "0.4-4.2",
			"siUnit": "mIU/L",
			"siValue": "0.4",
			"usValue": "0.4"
		},
		{
			"name": "Thyroxine, free (FT 4 )",
			"specimen": "Serum",
			"conventionalRange": "0.9-2.3",
			"conventionalUnit": "ng/dL",
			"factor": "12.871",
			"siRange": "12-30",
			"siUnit": "pmol/L",
			"siValue": "12",
			"usValue": "0.9"
		},
		{
			"name": "Thyroxine, total (T 4 )",
			"specimen": "Serum",
			"conventionalRange": "5.5-12.5",
			"conventionalUnit": "µg/dL",
			"factor": "12.871",
			"siRange": "71-160",
			"siUnit": "nmol/L",
			"siValue": "71",
			"usValue": "5.5"
		},
		{
			"name": "Thyroxine-binding globulin",
			"specimen": "Serum",
			"conventionalRange": "16.0-24.0",
			"conventionalUnit": "µg/mL",
			"factor": "17.094",
			"siRange": "206-309",
			"siUnit": "nmol/L",
			"siValue": "206",
			"usValue": "16.0"
		},
		{
			"name": "Tissue plasminogen activator",
			"specimen": "Plasma",
			"conventionalRange": "<0.04",
			"conventionalUnit": "IU/mL",
			"factor": "1000",
			"siRange": "<40",
			"siUnit": "IU/L",
			"siValue": "40",
			"usValue": "0.04"
		},
		{
			"name": "Tobramycin",
			"specimen": "Serum, Plasma",
			"conventionalRange": "5-10",
			"conventionalUnit": "µg/mL",
			"factor": "2.139",
			"siRange": "10-21",
			"siUnit": "µmol/L",
			"siValue": "10",
			"usValue": "5"
		},
		{
			"name": "Tocainide",
			"specimen": "Serum",
			"conventionalRange": "4-10",
			"conventionalUnit": "µg/mL",
			"factor": "5.201",
			"siRange": "21-52",
			"siUnit": "µmol/L",
			"siValue": "21",
			"usValue": "4"
		},
		{
			"name": "Tolbutamide",
			"specimen": "Serum",
			"conventionalRange": "80-240",
			"conventionalUnit": "µg/mL",
			"factor": "3.7",
			"siRange": "296-888",
			"siUnit": "µmol/L",
			"siValue": "296",
			"usValue": "80"
		},
		{
			"name": "Transferrin",
			"specimen": "Serum",
			"conventionalRange": "200-400",
			"conventionalUnit": "mg/dL",
			"factor": "0.123",
			"siRange": "2.5-5.0",
			"siUnit": "µmol/L",
			"siValue": "2.5",
			"usValue": "200"
		},
		{
			"name": "Triglycerides",
			"specimen": "Serum",
			"conventionalRange": "<160",
			"conventionalUnit": "mg/dL",
			"factor": "0.0113",
			"siRange": "1.8",
			"siUnit": "mmol/L",
			"siValue": "1.8",
			"usValue": "160"
		},
		{
			"name": "Triiodothyronine, free (FT3)",
			"specimen": "Serum",
			"conventionalRange": "130-450",
			"conventionalUnit": "",
			"factor": "0.0154",
			"siRange": "2.0-7.0",
			"siUnit": "pmol/L",
			"siValue": "2.0",
			"usValue": "130"
		},
		{
			"name": "Triiodothyronine, total (T3)",
			"specimen": "Serum",
			"conventionalRange": "60-180",
			"conventionalUnit": "ng/dL",
			"factor": "0.0154",
			"siRange": "0.92-2.76",
			"siUnit": "nmol/L",
			"siValue": "0.92",
			"usValue": "60"
		},
		{
			"name": "Troponin I",
			"specimen": "Serum",
			"conventionalRange": "0-0.4",
			"conventionalUnit": "ng/mL",
			"factor": "1",
			"siRange": "0-0.4",
			"siUnit": "µg/L",
			"siValue": "0",
			"usValue": "0"
		},
		{
			"name": "Troponin T",
			"specimen": "Serum",
			"conventionalRange": "0-0.1",
			"conventionalUnit": "ng/mL",
			"factor": "1",
			"siRange": "0-0.1",
			"siUnit": "µg/L",
			"siValue": "0",
			"usValue": "0"
		},
		{
			"name": "Tryptophan",
			"specimen": "Plasma",
			"conventionalRange": "0.5-1.5",
			"conventionalUnit": "mg/dL",
			"factor": "48.967",
			"siRange": "25-73",
			"siUnit": "µmol/L",
			"siValue": "25",
			"usValue": "0.5"
		},
		{
			"name": "Tyrosine",
			"specimen": "Plasma",
			"conventionalRange": "0.4-1.6",
			"conventionalUnit": "mg/dL",
			"factor": "55.19",
			"siRange": "20-90",
			"siUnit": "µmol/L",
			"siValue": "20",
			"usValue": "0.4"
		},
		{
			"name": "Urea nitrogen",
			"specimen": "Serum",
			"conventionalRange": "8-23",
			"conventionalUnit": "mg/dL",
			"factor": "0.357",
			"siRange": "2.9-8.2",
			"siUnit": "mmol/L",
			"siValue": "2.9",
			"usValue": "8"
		},
		{
			"name": "Uric acid",
			"specimen": "Serum",
			"conventionalRange": "4.0-8.0",
			"conventionalUnit": "mg/dL",
			"factor": "59.485",
			"siRange": "240-480",
			"siUnit": "µmol/L",
			"siValue": "240",
			"usValue": "4.0"
		},
		{
			"name": "Urobilinogen",
			"specimen": "Urine",
			"conventionalRange": "1-3.5",
			"conventionalUnit": "mg/24h",
			"factor": "1.7",
			"siRange": "1.7-5.9",
			"siUnit": "µmol/d",
			"siValue": "1.7",
			"usValue": "1"
		},
		{
			"name": "Valine",
			"specimen": "Plasma",
			"conventionalRange": "1.7-3.7",
			"conventionalUnit": "mg/dL",
			"factor": "85.361",
			"siRange": "145-315",
			"siUnit": "µmol/L",
			"siValue": "145",
			"usValue": "1.7"
		},
		{
			"name": "Valproic acid",
			"specimen": "Serum, Plasma",
			"conventionalRange": "50-100",
			"conventionalUnit": "µg/mL",
			"factor": "6.934",
			"siRange": "346-693",
			"siUnit": "µmol/L",
			"siValue": "346",
			"usValue": "50"
		},
		{
			"name": "Vancomycin",
			"specimen": "Serum, Plasma",
			"conventionalRange": "20-40",
			"conventionalUnit": "µg/mL",
			"factor": "0.69",
			"siRange": "14-28",
			"siUnit": "µmol/L",
			"siValue": "14",
			"usValue": "20"
		},
		{
			"name": "Vanillylmandelic acid (VMA)",
			"specimen": "Urine",
			"conventionalRange": "2.1-7.6",
			"conventionalUnit": "mg/24h",
			"factor": "5.046",
			"siRange": "11-38",
			"siUnit": "µmol/d",
			"siValue": "11",
			"usValue": "2.1"
		},
		{
			"name": "Vasoactive intestinal polypeptide",
			"specimen": "Plasma",
			"conventionalRange": "<50",
			"conventionalUnit": "pg/mL",
			"factor": "0.296",
			"siRange": "<15",
			"siUnit": "pmol/L",
			"siValue": "15",
			"usValue": "50"
		},
		{
			"name": "Vasopressin",
			"specimen": "Plasma",
			"conventionalRange": "1.5-2.0",
			"conventionalUnit": "pg/mL",
			"factor": "0.923",
			"siRange": "1.0-2.0",
			"siUnit": "pmol/L",
			"siValue": "1.0",
			"usValue": "1.5"
		},
		{
			"name": "Verapamil",
			"specimen": "Serum, Plasma",
			"conventionalRange": "100-500",
			"conventionalUnit": "ng/mL",
			"factor": "2.2",
			"siRange": "220-1100",
			"siUnit": "nmol/L",
			"siValue": "220",
			"usValue": "100"
		},
		{
			"name": "Vitamin A (retinol)",
			"specimen": "Serum",
			"conventionalRange": "30-80",
			"conventionalUnit": "µg/dL",
			"factor": "0.0349",
			"siRange": "1.05-2.80",
			"siUnit": "µmol/L",
			"siValue": "1.05",
			"usValue": "30"
		},
		{
			"name": "vitaminb1",
			"specimen": "Serum",
			"conventionalRange": "0-2",
			"conventionalUnit": "µg/dL",
			"factor": "29.6",
			"siRange": "0-75",
			"siUnit": "nmol/L",
			"siValue": "0",
			"usValue": "0"
		},
		{
			"name": "vitaminb2",
			"specimen": "Serum",
			"conventionalRange": "4-24",
			"conventionalUnit": "µg/dL",
			"factor": "26.6",
			"siRange": "106-638",
			"siUnit": "nmol/L",
			"siValue": "106",
			"usValue": "4"
		},
		{
			"name": "Vitamin B3",
			"specimen": "Whole blood",
			"conventionalRange": "0.2-1.8",
			"conventionalUnit": "µg/mL",
			"factor": "4.56",
			"siRange": "0.9-8.2",
			"siUnit": "µmol/L",
			"siValue": "0.9",
			"usValue": "0.2"
		},
		{
			"name": "vitaminb6",
			"specimen": "Plasma",
			"conventionalRange": "5-30",
			"conventionalUnit": "ng/mL",
			"factor": "4.046",
			"siRange": "20-121",
			"siUnit": "nmol/L",
			"siValue": "20",
			"usValue": "5"
		},
		{
			"name": "Vitamin B12",
			"specimen": "Serum",
			"conventionalRange": "160-950",
			"conventionalUnit": "pg/mL",
			"factor": "0.7378",
			"siRange": "118-701",
			"siUnit": "pmol/L",
			"siValue": "118",
			"usValue": "160"
		},
		{
			"name": "vitaminc",
			"specimen": "Serum",
			"conventionalRange": "0.4-1.5",
			"conventionalUnit": "mg/dL",
			"factor": "56.78",
			"siRange": "23-85",
			"siUnit": "µmol/L",
			"siValue": "23",
			"usValue": "0.4"
		},
		{
			"name": "vitamind",
			"specimen": "Serum",
			"conventionalRange": "25-45",
			"conventionalUnit": "pg/mL",
			"factor": "2.6",
			"siRange": "60-108",
			"siUnit": "pmol/L",
			"siValue": "60",
			"usValue": "25"
		},
		{
			"name": "Vitamin D (25-hydroxyvitamin D)",
			"specimen": "Plasma",
			"conventionalRange": "14-60",
			"conventionalUnit": "ng/mL",
			"factor": "2.496",
			"siRange": "35-150",
			"siUnit": "nmol/L",
			"siValue": "35",
			"usValue": "14"
		},
		{
			"name": "vitamine",
			"specimen": "Serum",
			"conventionalRange": "5-18",
			"conventionalUnit": "µg/mL",
			"factor": "2.32",
			"siRange": "12-42",
			"siUnit": "µmol/L",
			"siValue": "12",
			"usValue": "5"
		},
		{
			"name": "Vitamin K",
			"specimen": "Serum",
			"conventionalRange": "0.13-1.19",
			"conventionalUnit": "ng/mL",
			"factor": "2.22",
			"siRange": "0.29-2.64",
			"siUnit": "nmol/L",
			"siValue": "0.29",
			"usValue": "0.13"
		},
		{
			"name": "Warfarin",
			"specimen": "Serum, Plasma",
			"conventionalRange": "1.0-10",
			"conventionalUnit": "µg/mL",
			"factor": "3.247",
			"siRange": "3.2-32.4",
			"siUnit": "µmol/L",
			"siValue": "3.2",
			"usValue": "1.0"
		},
		{
			"name": "White Blood Cell",
			"specimen": "Whole blood",
			"conventionalRange": "4500-11000",
			"conventionalUnit": "",
			"factor": "0.001",
			"siRange": "4.5-11.0",
			"siUnit": "×109/L",
			"siValue": "4.5",
			"usValue": "4500"
		},
		{
			"name": "Neutrophils-segmented",
			"specimen": "Whole blood",
			"conventionalRange": "1800-7800",
			"conventionalUnit": "",
			"factor": "0.001",
			"siRange": "1.8-7.8",
			"siUnit": "×109/L",
			"siValue": "1.8",
			"usValue": "1800"
		},
		{
			"name": "Neutrophils-bands",
			"specimen": "Whole blood",
			"conventionalRange": "0-700",
			"conventionalUnit": "",
			"factor": "0.001",
			"siRange": "0-0.70",
			"siUnit": "×109/L",
			"siValue": "0",
			"usValue": "0"
		},
		{
			"name": "Lymphocytes",
			"specimen": "Whole blood",
			"conventionalRange": "1000-4800",
			"conventionalUnit": "",
			"factor": "0.001",
			"siRange": "1.0-4.8",
			"siUnit": "×109/L",
			"siValue": "1.0",
			"usValue": "1000"
		},
		{
			"name": "Monocytes",
			"specimen": "Whole blood",
			"conventionalRange": "0-800",
			"conventionalUnit": "",
			"factor": "0.001",
			"siRange": "0-0.80",
			"siUnit": "×109/L",
			"siValue": "0",
			"usValue": "0"
		},
		{
			"name": "Eosinophils",
			"specimen": "Whole blood",
			"conventionalRange": "0-450",
			"conventionalUnit": "",
			"factor": "0.001",
			"siRange": "0-0.45",
			"siUnit": "×109/L",
			"siValue": "0",
			"usValue": "0"
		},
		{
			"name": "Basophils %",
			"specimen": "Whole blood",
			"conventionalRange": "0-200",
			"conventionalUnit": "",
			"factor": "0.001",
			"siRange": "0-0.20",
			"siUnit": "×109/L",
			"siValue": "0",
			"usValue": "0"
		},
		{
			"name": "Neutrophils-segmented %",
			"specimen": "Whole blood",
			"conventionalRange": "56",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.56",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.56",
			"usValue": "56"
		},
		{
			"name": "Neutrophils-bands %",
			"specimen": "Whole blood",
			"conventionalRange": "3",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.03",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.03",
			"usValue": "3"
		},
		{
			"name": "Lymphocytes %",
			"specimen": "Whole blood",
			"conventionalRange": "34",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.34",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.34",
			"usValue": "34"
		},
		{
			"name": "Monocytes %",
			"specimen": "Whole blood",
			"conventionalRange": "4",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.04",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.04",
			"usValue": "4"
		},
		{
			"name": "Eosinophils %",
			"specimen": "Whole blood",
			"conventionalRange": "2.7",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.027",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.027",
			"usValue": "2.7"
		},
		{
			"name": "Basophils %",
			"specimen": "Whole blood",
			"conventionalRange": "0.3",
			"conventionalUnit": "%",
			"factor": "0.01",
			"siRange": "0.003",
			"siUnit": "Proportion of 1.0",
			"siValue": "0.003",
			"usValue": "0.3"
		},
		{
			"name": "Zidovudine",
			"specimen": "Serum, Plasma",
			"conventionalRange": "0.15-0.27",
			"conventionalUnit": "µg/mL",
			"factor": "3.7",
			"siRange": "0.56-1.01",
			"siUnit": "µmol/L",
			"siValue": "0.56",
			"usValue": "0.15"
		},
		{
			"name": "Zinc",
			"specimen": "Serum",
			"conventionalRange": "75-120",
			"conventionalUnit": "µg/dL",
			"factor": "0.153",
			"siRange": "11.5-18.5",
			"siUnit": "µmol/L",
			"siValue": "11.5",
			"usValue": "75"
		}
	];

	let prefix = "";

	let filteredUnits =  units;

	return `${($$result.head += `${($$result.title = `<title>medicalunitconverter.com</title>`, "")}<meta name="${"description"}" content="${"Medical unit conversion calculator, medicalunitconverter.com. Convert US units to International (SI) units easily with this onlne calculator. Easily search for a specific lab test, enter any value and convert the units. For both Human and Veterinary values."}"><script async src="${"https://www.googletagmanager.com/gtag/js?id=UA-255701-18"}"></script><script>window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-255701-18');
</script>`, "")}














  <div class="${"mx-auto  px-1"}"><div class="${"md:w-1/4 mb-2 sm:w-1/3 text-black p-1"}">Search Units <input placeholder="${"Unit"}" class="${"mt-1 block w-full  text-gray-700 border border-gray-300 rounded-lg py-2 px-2 leading-tight bg-white  focus:outline-none focus:bg-white focus:border-gray-500"}" type="${"search"}"${add_attribute("value", prefix, 1)}></div>


  ${each(filteredUnits, (unit, i) => `<div class="${"border border-gray-300 rounded mb-2"}"><div class="${"flex flex-wrap md:flex-no-wrap lg:flex-no-wrap px-1  mb-1"}"><div class="${"w-full md:w-2/5"}"><div class="${"font-bold text-black text-xl"}">${escape(unit.name)}</div>
             <div class="${"inline text-gray-700 text-xs"}"> <strong>Specimen: </strong> ${escape(unit.specimen)}</div>
         <div class="${"inline text-gray-700 text-xs ml-3"}"> <strong>Conversion Factor:</strong>  ${escape(unit.factor)} </div></div>
  <div class="${"md:w-1/3 w-1/2 h-14 pr-1 pl-1"}"><label class="${"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"}" for="${"grid-first-name"}">${validate_component(Fa, "Fa").$$render(
		$$result,
		{
			class: "inline",
			size: "lg",
			primaryColor: "blue",
			secondaryColor: "red",
			icon: proDuotoneSvgIcons.faFlagUsa
		},
		{},
		{}
	)} US Unit
      </label>
               <input class="${"appearance-none mt-1 block w-full bg-gray-100 text-gray-700 border border-blue-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"}"${add_attribute("value", unit.usValue, 0)} type="${"number"}" placeholder="${" US"}">
<div class="${"text-gray-700 text-sm"}">US Range:${escape(unit.conventionalRange)} ${escape(unit.conventionalUnit)}</div></div>

 <div class="${"md:w-1/3 w-1/2   h-14 pr-1 pl-1"}"><label class="${"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"}" for="${"grid-first-name"}">${validate_component(Fa, "Fa").$$render(
		$$result,
		{
			class: "inline",
			size: "lg",
			primaryColor: "green",
			secondaryColor: "lightblue",
			icon: proDuotoneSvgIcons.faGlobe
		},
		{},
		{}
	)} SI Unit
      </label>
               <input class="${"appearance-none mt-1 block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"}"${add_attribute("value", unit.siValue, 0)} type="${"number"}" placeholder="${"SI"}">
<div class="${"text-gray-700 text-sm"}">SI Range: ${escape(unit.siRange)} ${escape(unit.siUnit)}</div>
             </div></div> 
</div>`)}</div>
<footer class="${"w-full text-center border-t border-grey p-4 pin-b"}">www.medicalunitconverter.com
        </footer>`;
});

/* src/routes/contact.svelte generated by Svelte v3.24.1 */

const Contact = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `${($$result.head += `${($$result.title = `<title>About</title>`, "")}`, "")}

<h1>Contact</h1>

<p>This is the &#39;about&#39; page. There&#39;s not much here.</p>

<button class="${"bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"}"><svg class="${"fill-current w-4 h-4 mr-2"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}"><path d="${"M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"}"></path></svg>
  <span>Download</span></button>

<footer class="${"w-full text-center border-t border-grey p-4 pin-b"}">www.medicalunitconverter.com
        </footer>`;
});

/* src/routes/privacy.svelte generated by Svelte v3.24.1 */

const Privacy = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `${($$result.head += `${($$result.title = `<title>Privacy</title>`, "")}`, "")}

<h1 class="${"md:text-3xl mb-2"}">Privacy Policy
</h1>

<p>Vetcalculators built the Medical Unit Converter App as a Commercial app. This SERVICE is provided by Vetcalculators and Namram, Inc. and is intended for use as is.
                  </p> <p>This page is used to inform website visitors regarding my policies with the collection, use, and
                    disclosure of Personal Information if anyone decided to use my Service.
                  </p> <p>If you choose to use my Service, then you agree to the collection and use of information in relation
                    to this policy. The Personal Information that I collect is used for providing and improving the
                    Service. I will not use or share your information with anyone except as described
                    in this Privacy Policy.
                  </p> <p>The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible
                    at Vetcalculators unless otherwise defined in this Privacy Policy.
                  </p> <p><strong>Information Collection and Use</strong></p> <p>For a better experience, while using our Service, I may require you to provide us with certain
                    personally identifiable information, including but not limited to none. The information that I request is retained on your device and is not collected by me in any way
                  </p> <p>The app does use third party services that may collect information used to identify you.</p>  <p><strong>Log Data</strong></p> <p>I want to inform you that whenever you use my Service, in a case of an
                    error in the app I collect data and information (through third party products) on your phone
                    called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address,
                    device name, operating system version, the configuration of the app when utilizing my Service,
                    the time and date of your use of the Service, and other statistics.
                  </p> <p><strong>Cookies</strong></p> <p>Cookies are files with small amount of data that is commonly used an anonymous unique identifier. These
                    are sent to your browser from the website that you visit and are stored on your device internal memory.
                  </p> <p>This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries
                    that use “cookies” to collection information and to improve their services. You have the option to either
                    accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to
                    refuse our cookies, you may not be able to use some portions of this Service.
                  </p> <p><strong>Service Providers</strong></p> <p>I may employ third-party companies and individuals due to the following reasons:</p> <ul><li>To facilitate our Service;</li> <li>To provide the Service on our behalf;</li> <li>To perform Service-related services; or</li> <li>To assist us in analyzing how our Service is used.</li></ul> <p>I want to inform users of this Service that these third parties have access to your
                    Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they
                    are obligated not to disclose or use the information for any other purpose.
                  </p> <p><strong>Security</strong></p> <p>I value your trust in providing us your Personal Information, thus we are striving
                    to use commercially acceptable means of protecting it. But remember that no method of transmission over
                    the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee
                    its absolute security.
                  </p> <p><strong>Links to Other Sites</strong></p> <p>This Service may contain links to other sites. If you click on a third-party link, you will be directed
                    to that site. Note that these external sites are not operated by me. Therefore, I strongly
                    advise you to review the Privacy Policy of these websites. I have no control over
                    and assume no responsibility for the content, privacy policies, or practices of any third-party sites
                    or services.
                  </p> <p><strong>Children’s Privacy</strong></p> <p>These Services do not address anyone under the age of 13. I do not knowingly collect
                    personally identifiable information from children under 13. In the case I discover that a child
                    under 13 has provided me with personal information, I immediately delete this from
                    our servers. If you are a parent or guardian and you are aware that your child has provided us with personal
                    information, please contact me so that I will be able to do necessary actions.
                  </p> <p><strong>Changes to This Privacy Policy</strong></p> <p>I may update our Privacy Policy from time to time. Thus, you are advised to review
                    this page periodically for any changes. I will notify you of any changes by posting
                    the new Privacy Policy on this page. These changes are effective immediately after they are posted on
                    this page.
                  </p> <p><strong>Contact Us</strong></p> <p>If you have any questions or suggestions about my Privacy Policy, do not hesitate to <a href="${"mailto:info@vetcalculators.com"}" title="${"contact"}">Contact</a>.
                  </p> 

<footer class="${"w-full text-center border-t border-grey p-4 pin-b"}">www.medicalunitconverter.com
        </footer>`;
});

/* src/routes/metric.svelte generated by Svelte v3.24.1 */

const Metric = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {

	let units = [
		{
			"usValue": "",
			"siValue": "",
			"usAbbr": "in",
			"conventionalUnit": "inches",
			"factor": "2.54",
			"siUnit": "centimeters",
			"siAbbr": "cm"
		},
		{
			"usValue": "",
			"siValue": "",
			"usAbbr": "ft",
			"conventionalUnit": "feet",
			"factor": "30",
			"siUnit": "centimeters",
			"siAbbr": "cm"
		},
		{
			"usValue": "",
			"siValue": "",
			"usAbbr": "ft",
			"conventionalUnit": "feet",
			"factor": "0.3",
			"siUnit": "meters",
			"siAbbr": "m"
		},
		{
			"usValue": "",
			"siValue": "",
			"usAbbr": "yd",
			"conventionalUnit": "yards",
			"factor": "0.9",
			"siUnit": "meters",
			"siAbbr": "m"
		},
		{
			"usValue": "",
			"siValue": "",
			"usAbbr": "miles",
			"conventionalUnit": "miles",
			"factor": "1.6",
			"siUnit": "kilometers",
			"siAbbr": "km"
		},
		{
			"usValue": "",
			"siValue": "",
			"usAbbr": "sq in",
			"conventionalUnit": "square inches",
			"factor": "6.5",
			"siUnit": "square centimeters",
			"siAbbr": "cm<sup>2</sup>"
		},
		{
			"usValue": "",
			"siValue": "",
			"usAbbr": "sq ft",
			"conventionalUnit": "square feet",
			"factor": "0.09",
			"siUnit": "square meters",
			"siAbbr": "m<sup>2</sup>"
		},
		{
			"usValue": "",
			"siValue": "",
			"usAbbr": "sq yd",
			"conventionalUnit": "square yard",
			"factor": "0.8",
			"siUnit": "square meters",
			"siAbbr": "m<sup>2</sup>"
		},
		{
			"usValue": "",
			"siValue": "",
			"usAbbr": "sq miles",
			"conventionalUnit": "square miles",
			"factor": "2.6",
			"siUnit": "square kilometers",
			"siAbbr": "km<sup>2</sup>"
		},
		{
			"usValue": "",
			"siValue": "",
			"usAbbr": "oz",
			"conventionalUnit": "ounces",
			"factor": "28",
			"siUnit": "grams",
			"siAbbr": "g"
		},
		{
			"usValue": "",
			"siValue": "",
			"usAbbr": "lb",
			"conventionalUnit": "pounds",
			"factor": "0.45",
			"siUnit": "kilograms",
			"siAbbr": "kg"
		},
		{
			"usValue": "",
			"siValue": "",
			"usAbbr": "tsp",
			"conventionalUnit": "teaspoons",
			"factor": "5",
			"siUnit": "milliliters",
			"siAbbr": "mL"
		},
		{
			"usValue": "",
			"siValue": "",
			"usAbbr": "tbsp",
			"conventionalUnit": "tablespoons",
			"factor": "15",
			"siUnit": "milliliters",
			"siAbbr": "mL"
		},
		{
			"usValue": "",
			"siValue": "",
			"usAbbr": "fl oz",
			"conventionalUnit": "fluid ounces",
			"factor": "30",
			"siUnit": "milliliters",
			"siAbbr": "mL"
		},
		{
			"usValue": "",
			"siValue": "",
			"usAbbr": "c",
			"conventionalUnit": "cups",
			"factor": "0.24",
			"siUnit": "liters",
			"siAbbr": "L"
		},
		{
			"usValue": "",
			"siValue": "",
			"usAbbr": "pt",
			"conventionalUnit": "US pints",
			"factor": "0.47",
			"siUnit": "liters",
			"siAbbr": "L"
		},
		{
			"usValue": "",
			"siValue": "",
			"usAbbr": "qt",
			"conventionalUnit": "US quarts",
			"factor": "0.95",
			"siUnit": "liters",
			"siAbbr": "L"
		},
		{
			"usValue": "",
			"siValue": "",
			"usAbbr": "gal",
			"conventionalUnit": "US gallons",
			"factor": "3.8",
			"siUnit": "liters",
			"siAbbr": "L"
		},
		{
			"usValue": "",
			"siValue": "",
			"usAbbr": "cu ft",
			"conventionalUnit": "cubic feet",
			"factor": "0.03",
			"siUnit": "cubic meters",
			"siAbbr": "m<sup>3</sup>"
		},
		{
			"usValue": "",
			"siValue": "",
			"usAbbr": "cu yd",
			"conventionalUnit": "cubic yard",
			"factor": "0.76",
			"siUnit": "cubic meters",
			"siAbbr": "m<sup>3</sup>"
		}
	];

	let prefix = "";

	let filteredUnits =  units;

	return `${($$result.head += `${($$result.title = `<title>medicalunitconverter.com</title>`, "")}<meta name="${"description"}" content="${"Medical unit conversion calculator, medicalunitconverter.com. Convert US units to International (SI) units easily with this onlne calculator. Easily search for a specific lab test, enter any value and convert the units. For both Human and Veterinary values."}"><script async src="${"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"}"></script><script async src="${"https://www.googletagmanager.com/gtag/js?id=UA-255701-18"}"></script><script>window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-255701-18');
</script>`, "")}














  <div class="${"mx-auto px-1"}"><div class="${"md:w-1/4 mb-3 sm:w-1/3 text-black p-1"}">Search Units <input placeholder="${"Unit"}" class="${"mt-1 block w-full  text-gray-700 border border-gray-300 rounded-lg py-2 px-2 leading-tight bg-white  focus:outline-none focus:bg-white focus:border-gray-500"}" type="${"search"}"${add_attribute("value", prefix, 1)}></div>


  ${each(filteredUnits, (unit, i) => `<div class="${"border border-gray-300 rounded mb-2"}"><div class="${"flex flex-wrap md:flex-no-wrap lg:flex-no-wrap px-1  mb-1"}"><div class="${"w-full md:w-2/5"}"><div class="${"font-bold text-black text-xl"}">${escape(unit.conventionalUnit)} ${validate_component(Fa, "Fa").$$render(
		$$result,
		{
			class: "inline text-gray-700",
			size: "lg",
			icon: proDuotoneSvgIcons.faArrowsAltH
		},
		{},
		{}
	)} ${escape(unit.siUnit)}</div>
            
         <div class="${"text-gray-700 text-xs"}">  <strong>Conversion Factor:</strong> ${escape(unit.factor)} </div></div>
  <div class="${"md:w-1/3 w-1/2  h-14 pr-1 pl-1"}"><label class="${"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"}" for="${"grid-first-name"}">${validate_component(Fa, "Fa").$$render(
		$$result,
		{
			class: "inline",
			size: "lg",
			primaryColor: "blue",
			secondaryColor: "red",
			icon: proDuotoneSvgIcons.faFlagUsa
		},
		{},
		{}
	)} US Unit 
      </label>
               <input class="${"appearance-none mt-1 block w-full bg-gray-100 text-gray-700 border border-blue-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"}" name="${"us" + escape(i)}"${add_attribute("value", unit.usValue, 0)} type="${"number"}" placeholder="${" "}">
<div class="${"text-gray-700 text-sm"}">${escape(unit.conventionalUnit)}</div></div>

 <div class="${"md:w-1/3 w-1/2  h-14 pr-1 pl-1"}"><label class="${"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"}" for="${"grid-first-name"}">${validate_component(Fa, "Fa").$$render(
		$$result,
		{
			class: "inline",
			size: "lg",
			primaryColor: "green",
			secondaryColor: "lightblue",
			icon: proDuotoneSvgIcons.faGlobe
		},
		{},
		{}
	)} SI Unit 
      </label>
               <input class="${"appearance-none mt-1 block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"}" name="${"si" + escape(i)}"${add_attribute("value", unit.siValue, 0)} type="${"number"}" placeholder="${" "}">
<div class="${"text-gray-700 text-sm"}">${escape(unit.siUnit)}</div>
             </div></div> 
</div>`)}</div>
<footer class="${"w-full text-center border-t border-grey p-4 pin-b"}">www.medicalunitconverter.com
        </footer>`;
});

/* src/routes/about.svelte generated by Svelte v3.24.1 */

const About = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `${($$result.head += `${($$result.title = `<title>About Unit Conversion</title>`, "")}`, "")}

<h1 class="${"text-3xl mb-2"}">About Unit Conversion</h1>
<p class="${"mb-"}">The Système Internationale d’Unites (SI), or the International System of Units was recommended for use in the health professions by the World Health Assembly in 1977. This system is slowly being adopted in the United States and many journals now require its use.</p>
<p class="${"mb-2"}">Medical Unit Converter easily converts  between US and International Human and Veterinary Medical lab values and Metric values. Enter a value in either the US or International input area and it will immediately be converted. Easily search for individual lab tests by typing in the name of the test. </p>
<p class="${""}">The laboratory values and reference ranges are provided for illustration only and are not intended to be comprehensive or definitive. Each laboratory determines its own values, and reference ranges are highly method dependent.</p>
 Sources: 
 <p class="${"font-bold"}">Human References</p>	
 <ol style="${"list-style-type: decimal;"}"><li>Kratz A, Ferraro M, Sluss PM, Lewandrowski KB. Laboratory reference values. N Engl J Med. 2004;351(15):1548-1563</li>
	 <li>Young DS, Huth EJ. SI Units for Clinical Measurement. Philadelphia, PA: American College of Physicians; 1998</li>
	 <li>Henry JB, ed. Clinical Diagnosis and Management by Laboratory Methods. 20th ed. Philadelphia, PA: WB Saunders; 2001</li>
	 <li>Kasper DL, Braunwald E, Fauci AS, et al, eds. Harrison&#39;s Principles of Internal Medicine, 16th ed. New York, NY: McGraw Hill; 2004</li>
	 <li>Goldman L, Ausiello D. Cecil Textbook of Medicine. 22nd ed. Philadelphia, PA: WB Saunders; 2004</li></ol>
 <p class="${"font-bold"}">Veterinary References</p>
 <ol style="${"list-style-type: decimal;"}"><li>Latimer KS, Duncan &amp; Prasse’s Veterinary Laboratory Medicine: Clinical Pathology, 5th Ed., Wiley-Blackwell, 2011</li>
	 <li>Kaneko JJ, Harvey JW, Bruss ML, Clinical Biochemistry of Domestic Animals, 6th Ed., Academic Press, 2008</li></ol>
 <footer class="${"w-full text-center border-t border-grey p-4 pin-b"}">www.medicalunitconverter.com
        </footer>`;
});

/* src/routes/legal.svelte generated by Svelte v3.24.1 */

const Legal = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `${($$result.head += `${($$result.title = `<title>About</title>`, "")}`, "")}

<h1 class="${"md:text-3xl mb-2"}">Legal Notices and Disclaimer
</h1>

<p>All information contained in and produced by medicalunitconverter.com is provided for educational purposes only. This information should not be used for the diagnosis or treatment of any health problem or disease. THIS INFORMATION IS NOT INTENDED TO REPLACE CLINICAL JUDGMENT OR GUIDE INDIVIDUAL PATIENT CARE in any manner. The User is hereby notified that the information contained herein may not meet the user&#39;s needs. The User is advised that, although the information is derived from medical research and literature we cannot guarantee its correctness, comprehensiveness or currency. The User of this software assumes sole responsibility for any decisions made or actions taken based on the information contained in medicalunitconverter.com calculators. Neither Vetcalculators LLC, the system&#39;s authors nor any other party involved in the preparation, publication or distribution of medicalunitconverter.com shall be liable for any special, consequential, or exemplary damages resulting in whole or part from any User&#39;s use of or reliance upon this system and the information contained within. Vetcalculators LLC disclaims all warranties regarding such information whether express or implied, including any warranty as to the quality, accuracy, currency or suitability of this information for any particular purpose. Vetcalculators LLC and the system&#39;s authors, developers and distributors assume no responsibility for any erroneous results due to defects in the system. ACCESS TO AND USE OF THE VETCALCULATORS LLC MEDICAL UNIT CONVERTER IS PROVIDED WITHOUT WARRANTY OF MERCHANTABILITY OR FITNESS FOR ANY PARTICULAR PURPOSE OR ANY OTHER WARRANTY, EXPRESS OR IMPLIED. In no event shall Vetcalculators LLC be liable for special, direct, indirect or consequential damages, charges, claims, costs, demands, losses fees or expenses of any nature or kind arising from use of the Vetcalculators LLC calculators. By using medicalunitconverter.com, documentation and/or any software found therein, the User agrees to abide by United States and International copyright laws and all other applicable laws involving copyright.</p>

<footer class="${"w-full text-center border-t border-grey p-4 pin-b"}">www.medicalunitconverter.com
        </footer>`;
});

/* src/routes/blog/index.svelte generated by Svelte v3.24.1 */

const css = {
	code: "ul.svelte-1frg2tf{margin:0 0 1em 0;line-height:1.5}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n\\texport function preload({ params, query }) {\\n\\t\\treturn this.fetch(`blog.json`).then(r => r.json()).then(posts => {\\n\\t\\t\\treturn { posts };\\n\\t\\t});\\n\\t}\\n</script>\\n\\n<script>\\n\\texport let posts;\\n</script>\\n\\n<style>\\n\\tul {\\n\\t\\tmargin: 0 0 1em 0;\\n\\t\\tline-height: 1.5;\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>Blog</title>\\n</svelte:head>\\n\\n<h1>Recent posts</h1>\\n\\n<ul>\\n\\t{#each posts as post}\\n\\t\\t<!-- we're using the non-standard `rel=prefetch` attribute to\\n\\t\\t\\t\\ttell Sapper to load the data for the page as soon as\\n\\t\\t\\t\\tthe user hovers over the link or taps it, instead of\\n\\t\\t\\t\\twaiting for the 'click' event -->\\n\\t\\t<li><a rel='prefetch' href='blog/{post.slug}'>{post.title}</a></li>\\n\\t{/each}\\n</ul>\"],\"names\":[],\"mappings\":\"AAaC,EAAE,eAAC,CAAC,AACH,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACjB,WAAW,CAAE,GAAG,AACjB,CAAC\"}"
};

function preload({ params, query }) {
	return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
		return { posts };
	});
}

const Blog = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { posts } = $$props;
	if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0) $$bindings.posts(posts);
	$$result.css.add(css);

	return `${($$result.head += `${($$result.title = `<title>Blog</title>`, "")}`, "")}

<h1>Recent posts</h1>

<ul class="${"svelte-1frg2tf"}">${each(posts, post => `
		<li><a rel="${"prefetch"}" href="${"blog/" + escape(post.slug)}">${escape(post.title)}</a></li>`)}</ul>`;
});

/* src/routes/blog/[slug].svelte generated by Svelte v3.24.1 */

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

const U5Bslugu5D = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { post } = $$props;
	if ($$props.post === void 0 && $$bindings.post && post !== void 0) $$bindings.post(post);
	$$result.css.add(css$1);

	return `${($$result.head += `${($$result.title = `<title>${escape(post.title)}</title>`, "")}`, "")}

<h1>${escape(post.title)}</h1>

<div class="${"content svelte-gnxal1"}">${post.html}</div>`;
});

/* src/routes/vet.svelte generated by Svelte v3.24.1 */

const Vet = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {

	let units = [
		{
			"name": "Alkaline phosphatase",
			"specimen": "Serum",
			"conventionalRange": "30-120",
			"conventionalUnit": "IU/L",
			"factor": "1",
			"siRange": "0.5-2.0",
			"siUnit": "U/L",
			"siValue": "0.5",
			"usValue": "30"
		},
		{
			"name": "Alanine aminotransferase (ALT)",
			"specimen": "Serum",
			"conventionalRange": "10-40",
			"conventionalUnit": "IU/L",
			"factor": "1",
			"siRange": "0.17-0.68",
			"siUnit": "U/L",
			"siValue": "0.17",
			"usValue": "10"
		},
		{
			"name": "Albumin",
			"specimen": "Serum",
			"conventionalRange": "3.5-5.0",
			"conventionalUnit": "g/dL",
			"factor": "10",
			"siRange": "35-50",
			"siUnit": "g/L",
			"siValue": "35",
			"usValue": "3.5"
		},
		{
			"name": "Ammonia (as nitrogen)",
			"specimen": "Serum, Plasma",
			"conventionalRange": "15-45",
			"conventionalUnit": "mcg/dL",
			"factor": "0.5872",
			"siRange": "11-32",
			"siUnit": "µmol/L",
			"siValue": "11",
			"usValue": "15"
		},
		{
			"name": "Amylase",
			"specimen": "Serum",
			"conventionalRange": "27-131",
			"conventionalUnit": "Somogyi units",
			"factor": "1.85",
			"siRange": "0.46-2.23",
			"siUnit": "U/L",
			"siValue": "0.46",
			"usValue": "27"
		},
		{
			"name": "Aspartate aminotransferase (AST)",
			"specimen": "Serum",
			"conventionalRange": "10-30",
			"conventionalUnit": "U/L",
			"factor": "1",
			"siRange": "0.17-0.51",
			"siUnit": "U/L",
			"siValue": "0.17",
			"usValue": "10"
		},
		{
			"name": "Bilirubin, total",
			"specimen": "Serum",
			"conventionalRange": "0.3-1.2",
			"conventionalUnit": "mg/dL",
			"factor": "17.104",
			"siRange": "5.0-21.0",
			"siUnit": "µmol/L",
			"siValue": "5",
			"usValue": "0.3"
		},
		{
			"name": "Bilirubin, direct (conjugated)",
			"specimen": "Serum",
			"conventionalRange": "0.1-0.3",
			"conventionalUnit": "mg/dL",
			"factor": "17.104",
			"siRange": "1.7-5.1",
			"siUnit": "µmol/L",
			"siValue": "1.7",
			"usValue": "0.1"
		},
		{
			"name": "Calcium, ionized",
			"specimen": "Serum",
			"conventionalRange": "4.60-5.08",
			"conventionalUnit": "mg/dL",
			"factor": "0.25",
			"siRange": "1.15-1.27",
			"siUnit": "mmol/L",
			"siValue": "1.15",
			"usValue": "4.6"
		},
		{
			"name": "Calcium, total",
			"specimen": "Serum",
			"conventionalRange": "8.2-10.2",
			"conventionalUnit": "mg/dL",
			"factor": "0.25",
			"siRange": "2.05-2.55",
			"siUnit": "mmol/L",
			"siValue": "2.05",
			"usValue": "8.2"
		},
		{
			"name": "Carbon dioxide (total)",
			"specimen": "Serum, Plasma",
			"conventionalRange": "22-28",
			"conventionalUnit": "mEq/L",
			"factor": "1",
			"siRange": "22-28",
			"siUnit": "mmol/L",
			"siValue": "22-28",
			"usValue": "22"
		},
		{
			"name": "Chloride",
			"specimen": "Serum, Plasma",
			"conventionalRange": "96-106",
			"conventionalUnit": "mEq/L",
			"factor": "1",
			"siRange": "96-106",
			"siUnit": "mmol/L",
			"siValue": "110",
			"usValue": "110"
		},
		{
			"name": "Cholesterol (total)",
			"specimen": "Serum, Plasma",
			"conventionalRange": "<200",
			"conventionalUnit": "mg/dL",
			"factor": "0.0259",
			"siRange": "<5.18",
			"siUnit": "mmol/L",
			"siValue": "3.5",
			"usValue": "135"
		},
		{
			"name": "Copper",
			"specimen": "Serum",
			"conventionalRange": "70-140",
			"conventionalUnit": "µg/dL",
			"factor": "0.157",
			"siRange": "44866",
			"siUnit": "µmol/L",
			"siValue": "44866",
			"usValue": "70"
		},
		{
			"name": "Cortisol",
			"specimen": "Serum, Plasma",
			"conventionalRange": "5-25",
			"conventionalUnit": "mcg/dL",
			"factor": "27.588",
			"siRange": "140-690",
			"siUnit": "nmol/L",
			"siValue": "140",
			"usValue": "5"
		},
		{
			"name": "Creatine kinase (CK)",
			"specimen": "Serum",
			"conventionalRange": "40-150",
			"conventionalUnit": "IU/L",
			"factor": "1",
			"siRange": "0.67-2.5",
			"siUnit": "U/L",
			"siValue": "0.67",
			"usValue": "40"
		},
		{
			"name": "Creatinine",
			"specimen": "Serum, Plasma",
			"conventionalRange": "0.5-1.2",
			"conventionalUnit": "mg/dL",
			"factor": "88.4",
			"siRange": "53-106",
			"siUnit": "µmol/L",
			"siValue": "44",
			"usValue": "0.5"
		},
		{
			"name": "Fibrinogen",
			"specimen": "Plasma",
			"conventionalRange": "200-400",
			"conventionalUnit": "mg/dL",
			"factor": "0.0294",
			"siRange": "5.8-11.8",
			"siUnit": "µmol/L",
			"siValue": "5.8",
			"usValue": "200"
		},
		{
			"name": "Glucose",
			"specimen": "Serum",
			"conventionalRange": "70-110",
			"conventionalUnit": "mg/dL",
			"factor": "0.0555",
			"siRange": "3.9-6.1",
			"siUnit": "mmol/L",
			"siValue": "3.9",
			"usValue": "70"
		},
		{
			"name": "Iron",
			"specimen": "Serum",
			"conventionalRange": "60-150",
			"conventionalUnit": "µg/dL",
			"factor": "0.179",
			"siRange": "10.7-26.9",
			"siUnit": "µmol/L",
			"siValue": "10.7",
			"usValue": "60"
		},
		{
			"name": "Iron-binding capacity",
			"specimen": "Serum",
			"conventionalRange": "250-450",
			"conventionalUnit": "µg/dL",
			"factor": "0.179",
			"siRange": "44.8-80.6",
			"siUnit": "µmol/L",
			"siValue": "45",
			"usValue": "250"
		},
		{
			"name": "Lipase",
			"specimen": "Serum",
			"conventionalRange": "31-186",
			"conventionalUnit": "IU/L",
			"factor": "1",
			"siRange": "0.5-3.2",
			"siUnit": "U/L",
			"siValue": "0.5",
			"usValue": "31"
		},
		{
			"name": "Phosphorus (inorganic)",
			"specimen": "Serum",
			"conventionalRange": "2.3-4.7",
			"conventionalUnit": "mg/dL",
			"factor": "0.323",
			"siRange": "0.74-1.52",
			"siUnit": "mmol/L",
			"siValue": "0.74",
			"usValue": "2.3"
		},
		{
			"name": "Potassium",
			"specimen": "Serum",
			"conventionalRange": "3.5-5.0",
			"conventionalUnit": "mEq/L",
			"factor": "1",
			"siRange": "3.5-5.0",
			"siUnit": "mmol/L",
			"siValue": "3.5",
			"usValue": "3.5"
		},
		{
			"name": "Protein (total)",
			"specimen": "Serum",
			"conventionalRange": "5.4-8.0",
			"conventionalUnit": "g/dL",
			"factor": "10",
			"siRange": "54-80",
			"siUnit": "g/L",
			"siValue": "60",
			"usValue": "6"
		},
		{
			"name": "Prothrombin time (PT)",
			"specimen": "Plasma",
			"conventionalRange": "10-13",
			"conventionalUnit": "s",
			"siRange": "10-13",
			"factor": "1",
			"siValue": "s",
			"usValue": "10"
		},
		{
			"name": "Partial thromboplastin time (PTT)",
			"specimen": "Whole blood",
			"conventionalRange": "25-40",
			"conventionalUnit": "s",
			"factor": "1",
			"siRange": "25-40",
			"siUnit": "s",
			"siValue": "25",
			"usValue": "25"
		},
		{
			"name": "Sodium",
			"specimen": "Serum",
			"conventionalRange": "136-142",
			"conventionalUnit": "mEq/L",
			"factor": "1",
			"siRange": "136-142",
			"siUnit": "mmol/L",
			"siValue": "136",
			"usValue": "136"
		},
		{
			"name": "Triglycerides",
			"specimen": "Serum",
			"conventionalRange": "<160",
			"conventionalUnit": "mcg/dL",
			"factor": "0.0113",
			"siRange": "1.8",
			"siUnit": "mmol/L",
			"siValue": "1.8",
			"usValue": "140"
		},
		{
			"name": "Triiodothyronine, total (T<sub>3</sub>)",
			"specimen": "Serum",
			"conventionalRange": "60-180",
			"conventionalUnit": "mcg/dL",
			"factor": "15.6",
			"siRange": "0.92-2.76",
			"siUnit": "nmol/L",
			"siValue": "0.92",
			"usValue": "60"
		},
		{
			"name": "Thyroxine, free (FT <sub>4</sub> )",
			"specimen": "Serum",
			"conventionalRange": "0.9-2.3",
			"conventionalUnit": "ng/dL",
			"factor": "12.871",
			"siRange": "12-30",
			"siUnit": "pmol/L",
			"siValue": "12",
			"usValue": "0.9"
		},
		{
			"name": "Thyroxine, total (T <sub>4</sub> )",
			"specimen": "Serum",
			"conventionalRange": "5.5-12.5",
			"conventionalUnit": "mcg/dL",
			"factor": "12.871",
			"siRange": "71-160",
			"siUnit": "nmol/L",
			"siValue": "71",
			"usValue": "5.5"
		},
		{
			"name": "Urea nitrogen",
			"specimen": "Serum",
			"conventionalRange": "8-23",
			"conventionalUnit": "mg/dL",
			"factor": "0.357",
			"siRange": "2.9-8.2",
			"siUnit": "mmol/L",
			"siValue": "2.9",
			"usValue": "8"
		},
		{
			"name": "Uric acid",
			"specimen": "Serum",
			"conventionalRange": "4.0-8.0",
			"conventionalUnit": "mg/dL",
			"factor": "0.0595",
			"siRange": "240-480",
			"siUnit": "mmol/L",
			"siValue": "240",
			"usValue": "4"
		},
		{
			"name": "Urine protein/creatinine ratio",
			"specimen": "Serum",
			"conventionalRange": "",
			"conventionalUnit": "g/g",
			"factor": "0.113",
			"siRange": "",
			"siUnit": "g/mml",
			"siValue": "",
			"usValue": ""
		}
	];

	let prefix = "";

	let filteredUnits =  units;

	return `${($$result.head += `${($$result.title = `<title>medicalunitconverter.com</title>`, "")}<meta name="${"description"}" content="${"Medical unit conversion calculator, medicalunitconverter.com. Convert US units to International (SI) units easily with this onlne calculator. Easily search for a specific lab test, enter any value and convert the units. For both Human and Veterinary values."}"><script async src="${"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"}"></script><script async src="${"https://www.googletagmanager.com/gtag/js?id=UA-255701-18"}"></script><script>window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-255701-18');
</script>`, "")}














  <div class="${"mx-auto  px-1"}"><div class="${"md:w-1/4 mb-3 sm:w-1/3 text-black p-1"}">Search Units <input placeholder="${"Unit"}" class="${"mt-1 block w-full  text-gray-700 border border-gray-300 rounded-lg py-2 px-2 leading-tight bg-white  focus:outline-none focus:bg-white focus:border-gray-500"}" type="${"search"}"${add_attribute("value", prefix, 1)}></div>


  ${each(filteredUnits, (unit, i) => `<div class="${"border border-gray-300 rounded mb-2"}"><div class="${"flex flex-wrap md:flex-no-wrap lg:flex-no-wrap px-1  mb-1"}"><div class="${"w-full md:w-2/5"}"><div class="${"font-bold text-black text-xl"}">${escape(unit.name)}</div>
             <div class="${"inline text-gray-700 text-xs"}"> <strong>Specimen: </strong> ${escape(unit.specimen)}</div>
         <div class="${"inline text-gray-700 text-xs ml-3"}"> <strong>Conversion Factor:</strong>  ${escape(unit.factor)} </div></div>
  <div class="${"md:w-1/3 w-1/2   h-14 pr-1 pl-1"}"><label class="${"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"}" for="${"grid-first-name"}">${validate_component(Fa, "Fa").$$render(
		$$result,
		{
			class: "inline",
			size: "lg",
			primaryColor: "blue",
			secondaryColor: "red",
			icon: proDuotoneSvgIcons.faFlagUsa
		},
		{},
		{}
	)} US Unit
      </label>
               <input class="${"appearance-none mt-1 block w-full bg-gray-100 text-gray-700 border border-blue-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"}"${add_attribute("value", unit.usValue, 0)} type="${"number"}" placeholder="${" US"}">
<div class="${"text-gray-700 text-sm"}">US Range:${escape(unit.conventionalRange)} ${escape(unit.conventionalUnit)}</div></div>

 <div class="${"md:w-1/3 w-1/2  h-14 pr-1 pl-1"}"><label class="${"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"}" for="${"grid-first-name"}">${validate_component(Fa, "Fa").$$render(
		$$result,
		{
			class: "inline",
			size: "lg",
			primaryColor: "green",
			secondaryColor: "lightblue",
			icon: proDuotoneSvgIcons.faGlobe
		},
		{},
		{}
	)} SI Unit
      </label>
               <input class="${"appearance-none mt-1 block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"}"${add_attribute("value", unit.siValue, 0)} type="${"number"}" placeholder="${"SI"}">
<div class="${"text-gray-700 text-sm"}">SI Range: ${escape(unit.siRange)} ${escape(unit.siUnit)}</div>
             </div></div> 
</div>`)}</div>
<footer class="${"w-full text-center border-t border-grey p-4 pin-b"}">www.medicalunitconverter.com
        </footer>`;
});

/* src/components/Nav.svelte generated by Svelte v3.24.1 */

const css$2 = {
	code: ".textShadow.svelte-1gdbd81{text-shadow:0 2px 2px rgba(0, 0, 0, 0.3)}",
	map: "{\"version\":3,\"file\":\"Nav.svelte\",\"sources\":[\"Nav.svelte\"],\"sourcesContent\":[\"<script>\\n  export let segment;\\n  \\n  import Fa from 'svelte-fa';\\nimport { faFlagUsa, faGlobe, faArrowsAltH, faBalanceScale, faInfoCircle, faPaperPlane, faCalculator, faPencilRuler, faDog, faUserMd, faVial} from '@fortawesome/pro-duotone-svg-icons';\\n  let current = 'Human';\\n  \\n</script>\\n<style>.textShadow{text-shadow:0 2px 2px rgba(0, 0, 0, 0.3)}\\n.textShadow2{text-shadow:0 2px 2px rgba(0, 0, 0, 0.3)}\\n</style>\\n\\n\\n   \\n\\n\\n\\n<nav class=\\\"w-full\\\">\\n <!--  <div class=\\\"w-full mx-auto rounded-t shadow bg-cover bg-bottom bg-no-repeat h-28\\\" style=\\\"background-image: url(static/bg4.jpg)\\\"> -->\\n  <div class=\\\"w-full mx-auto rounded-t shadow bg-teal-500 h-28\\\">\\n \\t<!-- Text shadow utilities will be cool -->\\n   <div class=\\\"mx-auto py-2 text-center\\\">\\n    <h1 class=\\\"font-sans text-xl md:text-2xl textShadow text-white\\\"><Fa class=\\\"inline text-gray-600\\\"  primaryColor=\\\"gray\\\" secondaryColor=\\\"white\\\"  size=\\\"lg\\\" icon={faCalculator}/>  Medical Unit Converter</h1>\\n      <!-- <h2 class=\\\"font-sans  text-lg textShadow text-white\\\"> <Fa class=\\\"inline textShadow\\\" size=\\\"lg\\\" secondaryColor=\\\"red\\\"  icon={faVial}/> US Units  <Fa class=\\\"inline text-gray-700\\\" size=\\\"lg\\\" icon={faArrowsAltH}/> SI Units <Fa class=\\\"inline\\\" size=\\\"lg\\\"  secondaryColor=\\\"red\\\"  icon={faVial}/></h2> -->\\n    <h3 class=\\\"tracking-wide mb-1 textShadow text-white\\\">Easily Convert Medical and Metric Values</h3>\\n      <div class=\\\"flex items-center justify-between py-1\\\">\\n        \\n\\n\\n<span class=\\\"relative z-0 inline-flex shadow-sm\\\">\\n  <a href=\\\"about\\\" class='relative inline-flex items-center px-2 py-1 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-teal-300 active:text-gray-700 transition ease-in-out duration-150 {segment === \\\"about\\\" ? \\\"bg-teal-300\\\" : \\\"\\\"}'>\\n   <Fa class=\\\"inline-flex   pr-1\\\" size=\\\"lg\\\" icon={faInfoCircle}/> About\\n  </a>\\n  <a href=\\\"legal\\\" class='-ml-px relative inline-flex items-center px-2 py-1 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-teal-300 active:text-gray-700 transition ease-in-out duration-150 {segment === \\\"legal\\\" ? \\\"bg-teal-300\\\" : \\\"\\\"}'>\\n    <Fa class=\\\"inline pr-1\\\" size=\\\"lg\\\" icon={faBalanceScale}/> Legal\\n  </a>\\n  <a href=\\\"mailto:info@vetcalculators.com\\\" class='-ml-px relative inline-flex items-center px-2 py-1 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-teal-300 active:text-gray-700 transition ease-in-out duration-150 {segment === \\\"contact\\\" ? \\\"bg-teal-300\\\" : \\\"\\\"}'>\\n<Fa class=\\\"inline pr-1\\\" size=\\\"lg\\\" icon={faPaperPlane}/> Contact\\n  </a>\\n  <a href=\\\"privacy\\\" class='-ml-px relative inline-flex items-center px-2 py-1 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-teal-300 active:text-gray-700 transition ease-in-out duration-150 {segment === \\\"privacy\\\" ? \\\"bg-teal-300\\\" : \\\"\\\"}'>\\n<Fa class=\\\"inline pr-1\\\" size=\\\"lg\\\" icon={faInfoCircle}/> Privacy\\n  </a>\\n</span>\\n\\n\\n        \\n      </div>\\n      \\n    \\n      </div>\\n    \\n    <div class=\\\"text-center text-white pb-1\\\">\\n    \\n      \\n  \\n    </div>\\n   \\n  </div>\\n  \\n</nav>\\n<ul class=\\\"flex\\\">\\n  <li class=\\\"flex-1 mr-1 ml-1\\\">\\n    <a class='text-center block border border-white rounded bg-gray-600 hover:bg-teal-500   py-1 px-1 text-white' class:bg-teal-500=\\\"{current === 'Human'}\\\"\\ton:click=\\\"{() => current = 'Human'}\\\" href=\\\".\\\"><Fa class=\\\"inline-flex  text-white pr-1\\\" size=\\\"2x\\\" secondaryColor=\\\"white\\\"  primaryColor=\\\"green\\\" icon={faUserMd}/>  Human</a>\\n  </li>\\n  <li class=\\\"flex-1 mr-1\\\">\\n    <a class='text-center block border border-white rounded bg-gray-600 hover:bg-teal-500  py-1 px-1  text-white' class:bg-teal-500=\\\"{current === 'Veterinary'}\\\"\\ton:click=\\\"{() => current = 'Veterinary'}\\\" href=\\\"vet\\\"><Fa class=\\\"inline-flex  text-white pr-1\\\" size=\\\"2x\\\" primaryColor=\\\"black\\\" icon={faDog}/>  Veterinary</a>\\n  </li>\\n  <li class=\\\"flex-1 mr-1\\\">\\n    <a class='text-center block border border-white rounded  bg-gray-600 hover:bg-teal-500  py-1 px-1  text-white' class:bg-teal-500=\\\"{current === 'Metric Units'}\\\"\\ton:click=\\\"{() => current = 'Metric Units'}\\\" href=\\\"metric\\\"><Fa class=\\\"inline-flex  text-white pr-1\\\" size=\\\"2x\\\" primaryColor=\\\"orange\\\" icon={faPencilRuler}/>  Metric</a>\\n  </li>\\n</ul>\\n\\n\\n\\n\"],\"names\":[],\"mappings\":\"AAQO,0BAAW,CAAC,YAAY,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC\"}"
};

const Nav = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$2);

	return `<nav class="${"w-full"}">
  <div class="${"w-full mx-auto rounded-t shadow bg-teal-500 h-28"}">
   <div class="${"mx-auto py-2 text-center"}"><h1 class="${"font-sans text-xl md:text-2xl textShadow text-white svelte-1gdbd81"}">${validate_component(Fa, "Fa").$$render(
		$$result,
		{
			class: "inline text-gray-600",
			primaryColor: "gray",
			secondaryColor: "white",
			size: "lg",
			icon: proDuotoneSvgIcons.faCalculator
		},
		{},
		{}
	)}  Medical Unit Converter</h1>
      
    <h3 class="${"tracking-wide mb-1 textShadow text-white svelte-1gdbd81"}">Easily Convert Medical and Metric Values</h3>
      <div class="${"flex items-center justify-between py-1"}"><span class="${"relative z-0 inline-flex shadow-sm"}"><a href="${"about"}" class="${"relative inline-flex items-center px-2 py-1 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-teal-300 active:text-gray-700 transition ease-in-out duration-150 " + escape(segment === "about" ? "bg-teal-300" : "")}">${validate_component(Fa, "Fa").$$render(
		$$result,
		{
			class: "inline-flex   pr-1",
			size: "lg",
			icon: proDuotoneSvgIcons.faInfoCircle
		},
		{},
		{}
	)} About
  </a>
  <a href="${"legal"}" class="${"-ml-px relative inline-flex items-center px-2 py-1 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-teal-300 active:text-gray-700 transition ease-in-out duration-150 " + escape(segment === "legal" ? "bg-teal-300" : "")}">${validate_component(Fa, "Fa").$$render(
		$$result,
		{
			class: "inline pr-1",
			size: "lg",
			icon: proDuotoneSvgIcons.faBalanceScale
		},
		{},
		{}
	)} Legal
  </a>
  <a href="${"mailto:info@vetcalculators.com"}" class="${"-ml-px relative inline-flex items-center px-2 py-1 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-teal-300 active:text-gray-700 transition ease-in-out duration-150 " + escape(segment === "contact" ? "bg-teal-300" : "")}">${validate_component(Fa, "Fa").$$render(
		$$result,
		{
			class: "inline pr-1",
			size: "lg",
			icon: proDuotoneSvgIcons.faPaperPlane
		},
		{},
		{}
	)} Contact
  </a>
  <a href="${"privacy"}" class="${"-ml-px relative inline-flex items-center px-2 py-1 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-teal-300 active:text-gray-700 transition ease-in-out duration-150 " + escape(segment === "privacy" ? "bg-teal-300" : "")}">${validate_component(Fa, "Fa").$$render(
		$$result,
		{
			class: "inline pr-1",
			size: "lg",
			icon: proDuotoneSvgIcons.faInfoCircle
		},
		{},
		{}
	)} Privacy
  </a></span></div></div>
    
    <div class="${"text-center text-white pb-1"}"></div></div></nav>
<ul class="${"flex"}"><li class="${"flex-1 mr-1 ml-1"}"><a class="${[
		"text-center block border border-white rounded bg-gray-600 hover:bg-teal-500   py-1 px-1 text-white",
		 "bg-teal-500" 
	].join(" ").trim()}" href="${"."}">${validate_component(Fa, "Fa").$$render(
		$$result,
		{
			class: "inline-flex  text-white pr-1",
			size: "2x",
			secondaryColor: "white",
			primaryColor: "green",
			icon: proDuotoneSvgIcons.faUserMd
		},
		{},
		{}
	)}  Human</a></li>
  <li class="${"flex-1 mr-1"}"><a class="${[
		"text-center block border border-white rounded bg-gray-600 hover:bg-teal-500  py-1 px-1  text-white",
		 ""
	].join(" ").trim()}" href="${"vet"}">${validate_component(Fa, "Fa").$$render(
		$$result,
		{
			class: "inline-flex  text-white pr-1",
			size: "2x",
			primaryColor: "black",
			icon: proDuotoneSvgIcons.faDog
		},
		{},
		{}
	)}  Veterinary</a></li>
  <li class="${"flex-1 mr-1"}"><a class="${[
		"text-center block border border-white rounded  bg-gray-600 hover:bg-teal-500  py-1 px-1  text-white",
		 ""
	].join(" ").trim()}" href="${"metric"}">${validate_component(Fa, "Fa").$$render(
		$$result,
		{
			class: "inline-flex  text-white pr-1",
			size: "2x",
			primaryColor: "orange",
			icon: proDuotoneSvgIcons.faPencilRuler
		},
		{},
		{}
	)}  Metric</a></li></ul>`;
});

/* src/routes/_layout.svelte generated by Svelte v3.24.1 */

const css$3 = {
	code: "main.svelte-1jakvlc{position:relative;max-width:60em;background-color:white;padding:0.5em;margin:0 auto;box-sizing:border-box}",
	map: "{\"version\":3,\"file\":\"_layout.svelte\",\"sources\":[\"_layout.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport Nav from '../components/Nav.svelte';\\n\\n\\texport let segment;\\n</script>\\n\\n<style>\\n\\tmain {\\n\\t\\tposition: relative;\\n\\t\\tmax-width: 60em;\\n\\t\\tbackground-color: white;\\n\\t\\tpadding: 0.5em;\\n\\t\\tmargin: 0 auto;\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n</style>\\n\\n<Nav {segment}/>\\n\\n<main>\\n\\t<slot></slot>\\n</main>\"],\"names\":[],\"mappings\":\"AAOC,IAAI,eAAC,CAAC,AACL,QAAQ,CAAE,QAAQ,CAClB,SAAS,CAAE,IAAI,CACf,gBAAgB,CAAE,KAAK,CACvB,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,UAAU,CAAE,UAAU,AACvB,CAAC\"}"
};

const Layout = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$3);

	return `${validate_component(Nav, "Nav").$$render($$result, { segment }, {}, {})}

<main class="${"svelte-1jakvlc"}">${$$slots.default ? $$slots.default({}) : ``}</main>`;
});

/* src/routes/_error.svelte generated by Svelte v3.24.1 */

const css$4 = {
	code: "h1.svelte-8od9u6,p.svelte-8od9u6{margin:0 auto}h1.svelte-8od9u6{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-8od9u6{margin:1em auto}@media(min-width: 480px){h1.svelte-8od9u6{font-size:4em}}",
	map: "{\"version\":3,\"file\":\"_error.svelte\",\"sources\":[\"_error.svelte\"],\"sourcesContent\":[\"<script>\\n\\texport let status;\\n\\texport let error;\\n\\n\\tconst dev = \\\"development\\\" === 'development';\\n</script>\\n\\n<style>\\n\\th1, p {\\n\\t\\tmargin: 0 auto;\\n\\t}\\n\\n\\th1 {\\n\\t\\tfont-size: 2.8em;\\n\\t\\tfont-weight: 700;\\n\\t\\tmargin: 0 0 0.5em 0;\\n\\t}\\n\\n\\tp {\\n\\t\\tmargin: 1em auto;\\n\\t}\\n\\n\\t@media (min-width: 480px) {\\n\\t\\th1 {\\n\\t\\t\\tfont-size: 4em;\\n\\t\\t}\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>{status}</title>\\n</svelte:head>\\n\\n<h1>{status}</h1>\\n\\n<p>{error.message}</p>\\n\\n{#if dev && error.stack}\\n\\t<pre>{error.stack}</pre>\\n{/if}\\n\"],\"names\":[],\"mappings\":\"AAQC,gBAAE,CAAE,CAAC,cAAC,CAAC,AACN,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC,AAED,CAAC,cAAC,CAAC,AACF,MAAM,CAAE,GAAG,CAAC,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,GAAG,AACf,CAAC,AACF,CAAC\"}"
};

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { status } = $$props;
	let { error } = $$props;
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	$$result.css.add(css$4);

	return `${($$result.head += `${($$result.title = `<title>${escape(status)}</title>`, "")}`, "")}

<h1 class="${"svelte-8od9u6"}">${escape(status)}</h1>

<p class="${"svelte-8od9u6"}">${escape(error.message)}</p>

${ error.stack
	? `<pre>${escape(error.stack)}</pre>`
	: ``}`;
});

// This file is generated by Sapper — do not edit it!

const d = decodeURIComponent;

const manifest = {
	server_routes: [
		{
			// blog/index.json.js
			pattern: /^\/blog\.json$/,
			handlers: route_0,
			params: () => ({})
		},

		{
			// blog/[slug].json.js
			pattern: /^\/blog\/([^\/]+?)\.json$/,
			handlers: route_1,
			params: match => ({ slug: d(match[1]) })
		}
	],

	pages: [
		{
			// index.svelte
			pattern: /^\/$/,
			parts: [
				{ name: "index", file: "index.svelte", component: Routes }
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
			// privacy.svelte
			pattern: /^\/privacy\/?$/,
			parts: [
				{ name: "privacy", file: "privacy.svelte", component: Privacy }
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
				{ name: "blog", file: "blog/index.svelte", component: Blog, preload: preload }
			]
		},

		{
			// blog/[slug].svelte
			pattern: /^\/blog\/([^\/]+?)\/?$/,
			parts: [
				null,
				{ name: "blog_$slug", file: "blog/[slug].svelte", component: U5Bslugu5D, preload: preload$1, params: match => ({ slug: d(match[1]) }) }
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

const build_dir = "__sapper__/dev";

const src_dir = "src";

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

/* src/node_modules/@sapper/internal/App.svelte generated by Svelte v3.24.1 */

const App = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	let { notify } = $$props;
	afterUpdate(notify);
	setContext(CONTEXT_KEY, stores);
	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.segments === void 0 && $$bindings.segments && segments !== void 0) $$bindings.segments(segments);
	if ($$props.level0 === void 0 && $$bindings.level0 && level0 !== void 0) $$bindings.level0(level0);
	if ($$props.level1 === void 0 && $$bindings.level1 && level1 !== void 0) $$bindings.level1(level1);
	if ($$props.notify === void 0 && $$bindings.notify && notify !== void 0) $$bindings.notify(notify);

	return `


${validate_component(Layout, "Layout").$$render($$result, Object.assign({ segment: segments[0] }, level0.props), {}, {
		default: () => `${error
		? `${validate_component(Error$1, "Error").$$render($$result, { error, status }, {}, {})}`
		: `${validate_component(level1.component || missing_component, "svelte:component").$$render($$result, Object.assign(level1.props), {}, {})}`}`
	})}`;
});

/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */
function Mime() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);

  for (var i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }

  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * If a type declares an extension that has already been defined, an error will
 * be thrown.  To suppress this error and force the extension to be associated
 * with the new type, pass `force`=true.  Alternatively, you may prefix the
 * extension with "*" to map the type to extension, without mapping the
 * extension to the type.
 *
 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
 *
 *
 * @param map (Object) type definitions
 * @param force (Boolean) if true, force overriding of existing definitions
 */
Mime.prototype.define = function(typeMap, force) {
  for (var type in typeMap) {
    var extensions = typeMap[type].map(function(t) {return t.toLowerCase()});
    type = type.toLowerCase();

    for (var i = 0; i < extensions.length; i++) {
      var ext = extensions[i];

      // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.
      if (ext[0] == '*') {
        continue;
      }

      if (!force && (ext in this._types)) {
        throw new Error(
          'Attempt to change mapping for "' + ext +
          '" extension from "' + this._types[ext] + '" to "' + type +
          '". Pass `force=true` to allow this, otherwise remove "' + ext +
          '" from the list of extensions for "' + type + '".'
        );
      }

      this._types[ext] = type;
    }

    // Use first extension as default
    if (force || !this._extensions[type]) {
      var ext = extensions[0];
      this._extensions[type] = (ext[0] != '*') ? ext : ext.substr(1);
    }
  }
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.getType = function(path) {
  path = String(path);
  var last = path.replace(/^.*[/\\]/, '').toLowerCase();
  var ext = last.replace(/^.*\./, '').toLowerCase();

  var hasPath = last.length < path.length;
  var hasDot = ext.length < last.length - 1;

  return (hasDot || !hasPath) && this._types[ext] || null;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};

var Mime_1 = Mime;

var standard = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomsvc+xml":["atomsvc"],"application/bdoc":["bdoc"],"application/ccxml+xml":["ccxml"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma","es"],"application/emma+xml":["emma"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/patch-ops-error+xml":["xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-diff+xml":["xdf"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/ktx":["ktx"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};

var lite = new Mime_1(standard);

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
	const get_build_info =  () => JSON.parse(fs.readFileSync(path.join(build_dir, 'build.json'), 'utf-8'))
		;

	const template =  () => read_template(src_dir)
		;

	const has_service_worker = fs.existsSync(path.join(build_dir, 'service-worker.js'));

	const { server_routes, pages } = manifest;
	const error_route = manifest.error;

	function bail(req, res, err) {
		console.error(err);

		const message =  escape_html(err.message) ;

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
		res.setHeader('Cache-Control',  'no-cache' );

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

		let session;
		try {
			session = await session_getter(req, res);
		} catch (err) {
			return bail(req, res, err);
		}

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

				opts = Object.assign({}, opts);

				const include_credentials = (
					opts.credentials === 'include' ||
					opts.credentials !== 'omit' && parsed.origin === `http://127.0.0.1:${process.env.PORT}`
				);

				if (include_credentials) {
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

					if (!opts.headers.authorization && req.headers.authorization) {
						opts.headers.authorization = req.headers.authorization;
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
				error: error && serialize_error(props.error)
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

// Ensure we return something truthy so the client will not re-render the page over the error
function serialize_error(error) {
	if (!error) return null;
	let serialized = try_serialize(error);
	if (!serialized) {
		const { name, message, stack } = error ;
		serialized = try_serialize({ name, message, stack });
	}
	if (!serialized) {
		serialized = '{}';
	}
	return serialized;
}

function escape_html(html) {
	const chars = {
		'"' : 'quot',
		"'": '#39',
		'&': 'amp',
		'<' : 'lt',
		'>' : 'gt'
	};

	return html.replace(/["'&<>]/g, c => `&${chars[c]};`);
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
			cache_control:  'no-cache' 
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

	const read =  (file) => fs.readFileSync(path.join(build_dir, file))
		;

	return (req, res, next) => {
		if (filter(req)) {
			const type = lite.getType(req.path);

			try {
				const file = path.posix.normalize(decodeURIComponent(req.path));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL2Jsb2cvX3Bvc3RzLmpzIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9ibG9nL2luZGV4Lmpzb24uanMiLCIuLi8uLi8uLi9zcmMvcm91dGVzL2Jsb2cvW3NsdWddLmpzb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3ZlbHRlL2ludGVybmFsL2luZGV4Lm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdmVsdGUtZmEvc3JjL2ZhLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvaW5kZXguc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9tZXRyaWMuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9ibG9nL2luZGV4LnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvYmxvZy9bc2x1Z10uc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy92ZXQuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvTmF2LnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvX2xheW91dC5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvcm91dGVzL19lcnJvci5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvbm9kZV9tb2R1bGVzL0BzYXBwZXIvaW50ZXJuYWwvbWFuaWZlc3Qtc2VydmVyLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3RvcmUvaW5kZXgubWpzIiwiLi4vLi4vLi4vc3JjL25vZGVfbW9kdWxlcy9Ac2FwcGVyL2ludGVybmFsL3NoYXJlZC5tanMiLCIuLi8uLi8uLi9zcmMvbm9kZV9tb2R1bGVzL0BzYXBwZXIvaW50ZXJuYWwvQXBwLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9ub2RlX21vZHVsZXMvQHNhcHBlci9zZXJ2ZXIubWpzIiwiLi4vLi4vLi4vc3JjL3NlcnZlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBPcmRpbmFyaWx5LCB5b3UnZCBnZW5lcmF0ZSB0aGlzIGRhdGEgZnJvbSBtYXJrZG93biBmaWxlcyBpbiB5b3VyXG4vLyByZXBvLCBvciBmZXRjaCB0aGVtIGZyb20gYSBkYXRhYmFzZSBvZiBzb21lIGtpbmQuIEJ1dCBpbiBvcmRlciB0b1xuLy8gYXZvaWQgdW5uZWNlc3NhcnkgZGVwZW5kZW5jaWVzIGluIHRoZSBzdGFydGVyIHRlbXBsYXRlLCBhbmQgaW4gdGhlXG4vLyBzZXJ2aWNlIG9mIG9idmlvdXNuZXNzLCB3ZSdyZSBqdXN0IGdvaW5nIHRvIGxlYXZlIGl0IGhlcmUuXG5cbi8vIFRoaXMgZmlsZSBpcyBjYWxsZWQgYF9wb3N0cy5qc2AgcmF0aGVyIHRoYW4gYHBvc3RzLmpzYCwgYmVjYXVzZVxuLy8gd2UgZG9uJ3Qgd2FudCB0byBjcmVhdGUgYW4gYC9ibG9nL3Bvc3RzYCByb3V0ZSDigJQgdGhlIGxlYWRpbmdcbi8vIHVuZGVyc2NvcmUgdGVsbHMgU2FwcGVyIG5vdCB0byBkbyB0aGF0LlxuXG5jb25zdCBwb3N0cyA9IFtcblx0e1xuXHRcdHRpdGxlOiAnV2hhdCBpcyBTYXBwZXI/Jyxcblx0XHRzbHVnOiAnd2hhdC1pcy1zYXBwZXInLFxuXHRcdGh0bWw6IGBcblx0XHRcdDxwPkZpcnN0LCB5b3UgaGF2ZSB0byBrbm93IHdoYXQgPGEgaHJlZj0naHR0cHM6Ly9zdmVsdGUuZGV2Jz5TdmVsdGU8L2E+IGlzLiBTdmVsdGUgaXMgYSBVSSBmcmFtZXdvcmsgd2l0aCBhIGJvbGQgbmV3IGlkZWE6IHJhdGhlciB0aGFuIHByb3ZpZGluZyBhIGxpYnJhcnkgdGhhdCB5b3Ugd3JpdGUgY29kZSB3aXRoIChsaWtlIFJlYWN0IG9yIFZ1ZSwgZm9yIGV4YW1wbGUpLCBpdCdzIGEgY29tcGlsZXIgdGhhdCB0dXJucyB5b3VyIGNvbXBvbmVudHMgaW50byBoaWdobHkgb3B0aW1pemVkIHZhbmlsbGEgSmF2YVNjcmlwdC4gSWYgeW91IGhhdmVuJ3QgYWxyZWFkeSByZWFkIHRoZSA8YSBocmVmPSdodHRwczovL3N2ZWx0ZS5kZXYvYmxvZy9mcmFtZXdvcmtzLXdpdGhvdXQtdGhlLWZyYW1ld29yayc+aW50cm9kdWN0b3J5IGJsb2cgcG9zdDwvYT4sIHlvdSBzaG91bGQhPC9wPlxuXG5cdFx0XHQ8cD5TYXBwZXIgaXMgYSBOZXh0LmpzLXN0eWxlIGZyYW1ld29yayAoPGEgaHJlZj0nYmxvZy9ob3ctaXMtc2FwcGVyLWRpZmZlcmVudC1mcm9tLW5leHQnPm1vcmUgb24gdGhhdCBoZXJlPC9hPikgYnVpbHQgYXJvdW5kIFN2ZWx0ZS4gSXQgbWFrZXMgaXQgZW1iYXJyYXNzaW5nbHkgZWFzeSB0byBjcmVhdGUgZXh0cmVtZWx5IGhpZ2ggcGVyZm9ybWFuY2Ugd2ViIGFwcHMuIE91dCBvZiB0aGUgYm94LCB5b3UgZ2V0OjwvcD5cblxuXHRcdFx0PHVsPlxuXHRcdFx0XHQ8bGk+Q29kZS1zcGxpdHRpbmcsIGR5bmFtaWMgaW1wb3J0cyBhbmQgaG90IG1vZHVsZSByZXBsYWNlbWVudCwgcG93ZXJlZCBieSB3ZWJwYWNrPC9saT5cblx0XHRcdFx0PGxpPlNlcnZlci1zaWRlIHJlbmRlcmluZyAoU1NSKSB3aXRoIGNsaWVudC1zaWRlIGh5ZHJhdGlvbjwvbGk+XG5cdFx0XHRcdDxsaT5TZXJ2aWNlIHdvcmtlciBmb3Igb2ZmbGluZSBzdXBwb3J0LCBhbmQgYWxsIHRoZSBQV0EgYmVsbHMgYW5kIHdoaXN0bGVzPC9saT5cblx0XHRcdFx0PGxpPlRoZSBuaWNlc3QgZGV2ZWxvcG1lbnQgZXhwZXJpZW5jZSB5b3UndmUgZXZlciBoYWQsIG9yIHlvdXIgbW9uZXkgYmFjazwvbGk+XG5cdFx0XHQ8L3VsPlxuXG5cdFx0XHQ8cD5JdCdzIGltcGxlbWVudGVkIGFzIEV4cHJlc3MgbWlkZGxld2FyZS4gRXZlcnl0aGluZyBpcyBzZXQgdXAgYW5kIHdhaXRpbmcgZm9yIHlvdSB0byBnZXQgc3RhcnRlZCwgYnV0IHlvdSBrZWVwIGNvbXBsZXRlIGNvbnRyb2wgb3ZlciB0aGUgc2VydmVyLCBzZXJ2aWNlIHdvcmtlciwgd2VicGFjayBjb25maWcgYW5kIGV2ZXJ5dGhpbmcgZWxzZSwgc28gaXQncyBhcyBmbGV4aWJsZSBhcyB5b3UgbmVlZCBpdCB0byBiZS48L3A+XG5cdFx0YFxuXHR9LFxuXG5cdHtcblx0XHR0aXRsZTogJ0hvdyB0byB1c2UgU2FwcGVyJyxcblx0XHRzbHVnOiAnaG93LXRvLXVzZS1zYXBwZXInLFxuXHRcdGh0bWw6IGBcblx0XHRcdDxoMj5TdGVwIG9uZTwvaDI+XG5cdFx0XHQ8cD5DcmVhdGUgYSBuZXcgcHJvamVjdCwgdXNpbmcgPGEgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL1JpY2gtSGFycmlzL2RlZ2l0Jz5kZWdpdDwvYT46PC9wPlxuXG5cdFx0XHQ8cHJlPjxjb2RlPm5weCBkZWdpdCBcInN2ZWx0ZWpzL3NhcHBlci10ZW1wbGF0ZSNyb2xsdXBcIiBteS1hcHBcblx0XHRcdGNkIG15LWFwcFxuXHRcdFx0bnBtIGluc3RhbGwgIyBvciB5YXJuIVxuXHRcdFx0bnBtIHJ1biBkZXZcblx0XHRcdDwvY29kZT48L3ByZT5cblxuXHRcdFx0PGgyPlN0ZXAgdHdvPC9oMj5cblx0XHRcdDxwPkdvIHRvIDxhIGhyZWY9J2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCc+bG9jYWxob3N0OjMwMDA8L2E+LiBPcGVuIDxjb2RlPm15LWFwcDwvY29kZT4gaW4geW91ciBlZGl0b3IuIEVkaXQgdGhlIGZpbGVzIGluIHRoZSA8Y29kZT5zcmMvcm91dGVzPC9jb2RlPiBkaXJlY3Rvcnkgb3IgYWRkIG5ldyBvbmVzLjwvcD5cblxuXHRcdFx0PGgyPlN0ZXAgdGhyZWU8L2gyPlxuXHRcdFx0PHA+Li4uPC9wPlxuXG5cdFx0XHQ8aDI+U3RlcCBmb3VyPC9oMj5cblx0XHRcdDxwPlJlc2lzdCBvdmVyZG9uZSBqb2tlIGZvcm1hdHMuPC9wPlxuXHRcdGBcblx0fSxcblxuXHR7XG5cdFx0dGl0bGU6ICdXaHkgdGhlIG5hbWU/Jyxcblx0XHRzbHVnOiAnd2h5LXRoZS1uYW1lJyxcblx0XHRodG1sOiBgXG5cdFx0XHQ8cD5JbiB3YXIsIHRoZSBzb2xkaWVycyB3aG8gYnVpbGQgYnJpZGdlcywgcmVwYWlyIHJvYWRzLCBjbGVhciBtaW5lZmllbGRzIGFuZCBjb25kdWN0IGRlbW9saXRpb25zIOKAlCBhbGwgdW5kZXIgY29tYmF0IGNvbmRpdGlvbnMg4oCUIGFyZSBrbm93biBhcyA8ZW0+c2FwcGVyczwvZW0+LjwvcD5cblxuXHRcdFx0PHA+Rm9yIHdlYiBkZXZlbG9wZXJzLCB0aGUgc3Rha2VzIGFyZSBnZW5lcmFsbHkgbG93ZXIgdGhhbiB0aG9zZSBmb3IgY29tYmF0IGVuZ2luZWVycy4gQnV0IHdlIGZhY2Ugb3VyIG93biBob3N0aWxlIGVudmlyb25tZW50OiB1bmRlcnBvd2VyZWQgZGV2aWNlcywgcG9vciBuZXR3b3JrIGNvbm5lY3Rpb25zLCBhbmQgdGhlIGNvbXBsZXhpdHkgaW5oZXJlbnQgaW4gZnJvbnQtZW5kIGVuZ2luZWVyaW5nLiBTYXBwZXIsIHdoaWNoIGlzIHNob3J0IGZvciA8c3Ryb25nPlM8L3N0cm9uZz52ZWx0ZSA8c3Ryb25nPmFwcDwvc3Ryb25nPiBtYWs8c3Ryb25nPmVyPC9zdHJvbmc+LCBpcyB5b3VyIGNvdXJhZ2VvdXMgYW5kIGR1dGlmdWwgYWxseS48L3A+XG5cdFx0YFxuXHR9LFxuXG5cdHtcblx0XHR0aXRsZTogJ0hvdyBpcyBTYXBwZXIgZGlmZmVyZW50IGZyb20gTmV4dC5qcz8nLFxuXHRcdHNsdWc6ICdob3ctaXMtc2FwcGVyLWRpZmZlcmVudC1mcm9tLW5leHQnLFxuXHRcdGh0bWw6IGBcblx0XHRcdDxwPjxhIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS96ZWl0L25leHQuanMnPk5leHQuanM8L2E+IGlzIGEgUmVhY3QgZnJhbWV3b3JrIGZyb20gPGEgaHJlZj0naHR0cHM6Ly96ZWl0LmNvJz5aZWl0PC9hPiwgYW5kIGlzIHRoZSBpbnNwaXJhdGlvbiBmb3IgU2FwcGVyLiBUaGVyZSBhcmUgYSBmZXcgbm90YWJsZSBkaWZmZXJlbmNlcywgaG93ZXZlcjo8L3A+XG5cblx0XHRcdDx1bD5cblx0XHRcdFx0PGxpPkl0J3MgcG93ZXJlZCBieSA8YSBocmVmPSdodHRwczovL3N2ZWx0ZS5kZXYnPlN2ZWx0ZTwvYT4gaW5zdGVhZCBvZiBSZWFjdCwgc28gaXQncyBmYXN0ZXIgYW5kIHlvdXIgYXBwcyBhcmUgc21hbGxlcjwvbGk+XG5cdFx0XHRcdDxsaT5JbnN0ZWFkIG9mIHJvdXRlIG1hc2tpbmcsIHdlIGVuY29kZSByb3V0ZSBwYXJhbWV0ZXJzIGluIGZpbGVuYW1lcy4gRm9yIGV4YW1wbGUsIHRoZSBwYWdlIHlvdSdyZSBsb29raW5nIGF0IHJpZ2h0IG5vdyBpcyA8Y29kZT5zcmMvcm91dGVzL2Jsb2cvW3NsdWddLmh0bWw8L2NvZGU+PC9saT5cblx0XHRcdFx0PGxpPkFzIHdlbGwgYXMgcGFnZXMgKFN2ZWx0ZSBjb21wb25lbnRzLCB3aGljaCByZW5kZXIgb24gc2VydmVyIG9yIGNsaWVudCksIHlvdSBjYW4gY3JlYXRlIDxlbT5zZXJ2ZXIgcm91dGVzPC9lbT4gaW4geW91ciA8Y29kZT5yb3V0ZXM8L2NvZGU+IGRpcmVjdG9yeS4gVGhlc2UgYXJlIGp1c3QgPGNvZGU+LmpzPC9jb2RlPiBmaWxlcyB0aGF0IGV4cG9ydCBmdW5jdGlvbnMgY29ycmVzcG9uZGluZyB0byBIVFRQIG1ldGhvZHMsIGFuZCByZWNlaXZlIEV4cHJlc3MgPGNvZGU+cmVxdWVzdDwvY29kZT4gYW5kIDxjb2RlPnJlc3BvbnNlPC9jb2RlPiBvYmplY3RzIGFzIGFyZ3VtZW50cy4gVGhpcyBtYWtlcyBpdCB2ZXJ5IGVhc3kgdG8sIGZvciBleGFtcGxlLCBhZGQgYSBKU09OIEFQSSBzdWNoIGFzIHRoZSBvbmUgPGEgaHJlZj0nYmxvZy9ob3ctaXMtc2FwcGVyLWRpZmZlcmVudC1mcm9tLW5leHQuanNvbic+cG93ZXJpbmcgdGhpcyB2ZXJ5IHBhZ2U8L2E+PC9saT5cblx0XHRcdFx0PGxpPkxpbmtzIGFyZSBqdXN0IDxjb2RlPiZsdDthJmd0OzwvY29kZT4gZWxlbWVudHMsIHJhdGhlciB0aGFuIGZyYW1ld29yay1zcGVjaWZpYyA8Y29kZT4mbHQ7TGluayZndDs8L2NvZGU+IGNvbXBvbmVudHMuIFRoYXQgbWVhbnMsIGZvciBleGFtcGxlLCB0aGF0IDxhIGhyZWY9J2Jsb2cvaG93LWNhbi1pLWdldC1pbnZvbHZlZCc+dGhpcyBsaW5rIHJpZ2h0IGhlcmU8L2E+LCBkZXNwaXRlIGJlaW5nIGluc2lkZSBhIGJsb2Igb2YgSFRNTCwgd29ya3Mgd2l0aCB0aGUgcm91dGVyIGFzIHlvdSdkIGV4cGVjdC48L2xpPlxuXHRcdFx0PC91bD5cblx0XHRgXG5cdH0sXG5cblx0e1xuXHRcdHRpdGxlOiAnSG93IGNhbiBJIGdldCBpbnZvbHZlZD8nLFxuXHRcdHNsdWc6ICdob3ctY2FuLWktZ2V0LWludm9sdmVkJyxcblx0XHRodG1sOiBgXG5cdFx0XHQ8cD5XZSdyZSBzbyBnbGFkIHlvdSBhc2tlZCEgQ29tZSBvbiBvdmVyIHRvIHRoZSA8YSBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vc3ZlbHRlanMvc3ZlbHRlJz5TdmVsdGU8L2E+IGFuZCA8YSBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vc3ZlbHRlanMvc2FwcGVyJz5TYXBwZXI8L2E+IHJlcG9zLCBhbmQgam9pbiB1cyBpbiB0aGUgPGEgaHJlZj0naHR0cHM6Ly9zdmVsdGUuZGV2L2NoYXQnPkRpc2NvcmQgY2hhdHJvb208L2E+LiBFdmVyeW9uZSBpcyB3ZWxjb21lLCBlc3BlY2lhbGx5IHlvdSE8L3A+XG5cdFx0YFxuXHR9XG5dO1xuXG5wb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuXHRwb3N0Lmh0bWwgPSBwb3N0Lmh0bWwucmVwbGFjZSgvXlxcdHszfS9nbSwgJycpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHBvc3RzO1xuIiwiaW1wb3J0IHBvc3RzIGZyb20gJy4vX3Bvc3RzLmpzJztcblxuY29uc3QgY29udGVudHMgPSBKU09OLnN0cmluZ2lmeShwb3N0cy5tYXAocG9zdCA9PiB7XG5cdHJldHVybiB7XG5cdFx0dGl0bGU6IHBvc3QudGl0bGUsXG5cdFx0c2x1ZzogcG9zdC5zbHVnXG5cdH07XG59KSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXQocmVxLCByZXMpIHtcblx0cmVzLndyaXRlSGVhZCgyMDAsIHtcblx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdH0pO1xuXG5cdHJlcy5lbmQoY29udGVudHMpO1xufSIsImltcG9ydCBwb3N0cyBmcm9tICcuL19wb3N0cy5qcyc7XG5cbmNvbnN0IGxvb2t1cCA9IG5ldyBNYXAoKTtcbnBvc3RzLmZvckVhY2gocG9zdCA9PiB7XG5cdGxvb2t1cC5zZXQocG9zdC5zbHVnLCBKU09OLnN0cmluZ2lmeShwb3N0KSk7XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldChyZXEsIHJlcywgbmV4dCkge1xuXHQvLyB0aGUgYHNsdWdgIHBhcmFtZXRlciBpcyBhdmFpbGFibGUgYmVjYXVzZVxuXHQvLyB0aGlzIGZpbGUgaXMgY2FsbGVkIFtzbHVnXS5qc29uLmpzXG5cdGNvbnN0IHsgc2x1ZyB9ID0gcmVxLnBhcmFtcztcblxuXHRpZiAobG9va3VwLmhhcyhzbHVnKSkge1xuXHRcdHJlcy53cml0ZUhlYWQoMjAwLCB7XG5cdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0fSk7XG5cblx0XHRyZXMuZW5kKGxvb2t1cC5nZXQoc2x1ZykpO1xuXHR9IGVsc2Uge1xuXHRcdHJlcy53cml0ZUhlYWQoNDA0LCB7XG5cdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0fSk7XG5cblx0XHRyZXMuZW5kKEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdG1lc3NhZ2U6IGBOb3QgZm91bmRgXG5cdFx0fSkpO1xuXHR9XG59XG4iLCJmdW5jdGlvbiBub29wKCkgeyB9XG5jb25zdCBpZGVudGl0eSA9IHggPT4geDtcbmZ1bmN0aW9uIGFzc2lnbih0YXIsIHNyYykge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBmb3IgKGNvbnN0IGsgaW4gc3JjKVxuICAgICAgICB0YXJba10gPSBzcmNba107XG4gICAgcmV0dXJuIHRhcjtcbn1cbmZ1bmN0aW9uIGlzX3Byb21pc2UodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIGFkZF9sb2NhdGlvbihlbGVtZW50LCBmaWxlLCBsaW5lLCBjb2x1bW4sIGNoYXIpIHtcbiAgICBlbGVtZW50Ll9fc3ZlbHRlX21ldGEgPSB7XG4gICAgICAgIGxvYzogeyBmaWxlLCBsaW5lLCBjb2x1bW4sIGNoYXIgfVxuICAgIH07XG59XG5mdW5jdGlvbiBydW4oZm4pIHtcbiAgICByZXR1cm4gZm4oKTtcbn1cbmZ1bmN0aW9uIGJsYW5rX29iamVjdCgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShudWxsKTtcbn1cbmZ1bmN0aW9uIHJ1bl9hbGwoZm5zKSB7XG4gICAgZm5zLmZvckVhY2gocnVuKTtcbn1cbmZ1bmN0aW9uIGlzX2Z1bmN0aW9uKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIHNhZmVfbm90X2VxdWFsKGEsIGIpIHtcbiAgICByZXR1cm4gYSAhPSBhID8gYiA9PSBiIDogYSAhPT0gYiB8fCAoKGEgJiYgdHlwZW9mIGEgPT09ICdvYmplY3QnKSB8fCB0eXBlb2YgYSA9PT0gJ2Z1bmN0aW9uJyk7XG59XG5mdW5jdGlvbiBub3RfZXF1YWwoYSwgYikge1xuICAgIHJldHVybiBhICE9IGEgPyBiID09IGIgOiBhICE9PSBiO1xufVxuZnVuY3Rpb24gaXNfZW1wdHkob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVfc3RvcmUoc3RvcmUsIG5hbWUpIHtcbiAgICBpZiAoc3RvcmUgIT0gbnVsbCAmJiB0eXBlb2Ygc3RvcmUuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJyR7bmFtZX0nIGlzIG5vdCBhIHN0b3JlIHdpdGggYSAnc3Vic2NyaWJlJyBtZXRob2RgKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzdWJzY3JpYmUoc3RvcmUsIC4uLmNhbGxiYWNrcykge1xuICAgIGlmIChzdG9yZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBub29wO1xuICAgIH1cbiAgICBjb25zdCB1bnN1YiA9IHN0b3JlLnN1YnNjcmliZSguLi5jYWxsYmFja3MpO1xuICAgIHJldHVybiB1bnN1Yi51bnN1YnNjcmliZSA/ICgpID0+IHVuc3ViLnVuc3Vic2NyaWJlKCkgOiB1bnN1Yjtcbn1cbmZ1bmN0aW9uIGdldF9zdG9yZV92YWx1ZShzdG9yZSkge1xuICAgIGxldCB2YWx1ZTtcbiAgICBzdWJzY3JpYmUoc3RvcmUsIF8gPT4gdmFsdWUgPSBfKSgpO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIGNvbXBvbmVudF9zdWJzY3JpYmUoY29tcG9uZW50LCBzdG9yZSwgY2FsbGJhY2spIHtcbiAgICBjb21wb25lbnQuJCQub25fZGVzdHJveS5wdXNoKHN1YnNjcmliZShzdG9yZSwgY2FsbGJhY2spKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9zbG90KGRlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZm4pIHtcbiAgICBpZiAoZGVmaW5pdGlvbikge1xuICAgICAgICBjb25zdCBzbG90X2N0eCA9IGdldF9zbG90X2NvbnRleHQoZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBmbik7XG4gICAgICAgIHJldHVybiBkZWZpbml0aW9uWzBdKHNsb3RfY3R4KTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRfc2xvdF9jb250ZXh0KGRlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZm4pIHtcbiAgICByZXR1cm4gZGVmaW5pdGlvblsxXSAmJiBmblxuICAgICAgICA/IGFzc2lnbigkJHNjb3BlLmN0eC5zbGljZSgpLCBkZWZpbml0aW9uWzFdKGZuKGN0eCkpKVxuICAgICAgICA6ICQkc2NvcGUuY3R4O1xufVxuZnVuY3Rpb24gZ2V0X3Nsb3RfY2hhbmdlcyhkZWZpbml0aW9uLCAkJHNjb3BlLCBkaXJ0eSwgZm4pIHtcbiAgICBpZiAoZGVmaW5pdGlvblsyXSAmJiBmbikge1xuICAgICAgICBjb25zdCBsZXRzID0gZGVmaW5pdGlvblsyXShmbihkaXJ0eSkpO1xuICAgICAgICBpZiAoJCRzY29wZS5kaXJ0eSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbGV0cztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGxldHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBjb25zdCBtZXJnZWQgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IGxlbiA9IE1hdGgubWF4KCQkc2NvcGUuZGlydHkubGVuZ3RoLCBsZXRzLmxlbmd0aCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgbWVyZ2VkW2ldID0gJCRzY29wZS5kaXJ0eVtpXSB8IGxldHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2VkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkJHNjb3BlLmRpcnR5IHwgbGV0cztcbiAgICB9XG4gICAgcmV0dXJuICQkc2NvcGUuZGlydHk7XG59XG5mdW5jdGlvbiB1cGRhdGVfc2xvdChzbG90LCBzbG90X2RlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZGlydHksIGdldF9zbG90X2NoYW5nZXNfZm4sIGdldF9zbG90X2NvbnRleHRfZm4pIHtcbiAgICBjb25zdCBzbG90X2NoYW5nZXMgPSBnZXRfc2xvdF9jaGFuZ2VzKHNsb3RfZGVmaW5pdGlvbiwgJCRzY29wZSwgZGlydHksIGdldF9zbG90X2NoYW5nZXNfZm4pO1xuICAgIGlmIChzbG90X2NoYW5nZXMpIHtcbiAgICAgICAgY29uc3Qgc2xvdF9jb250ZXh0ID0gZ2V0X3Nsb3RfY29udGV4dChzbG90X2RlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZ2V0X3Nsb3RfY29udGV4dF9mbik7XG4gICAgICAgIHNsb3QucChzbG90X2NvbnRleHQsIHNsb3RfY2hhbmdlcyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZXhjbHVkZV9pbnRlcm5hbF9wcm9wcyhwcm9wcykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3QgayBpbiBwcm9wcylcbiAgICAgICAgaWYgKGtbMF0gIT09ICckJylcbiAgICAgICAgICAgIHJlc3VsdFtrXSA9IHByb3BzW2tdO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBjb21wdXRlX3Jlc3RfcHJvcHMocHJvcHMsIGtleXMpIHtcbiAgICBjb25zdCByZXN0ID0ge307XG4gICAga2V5cyA9IG5ldyBTZXQoa2V5cyk7XG4gICAgZm9yIChjb25zdCBrIGluIHByb3BzKVxuICAgICAgICBpZiAoIWtleXMuaGFzKGspICYmIGtbMF0gIT09ICckJylcbiAgICAgICAgICAgIHJlc3Rba10gPSBwcm9wc1trXTtcbiAgICByZXR1cm4gcmVzdDtcbn1cbmZ1bmN0aW9uIG9uY2UoZm4pIHtcbiAgICBsZXQgcmFuID0gZmFsc2U7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgIGlmIChyYW4pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHJhbiA9IHRydWU7XG4gICAgICAgIGZuLmNhbGwodGhpcywgLi4uYXJncyk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIG51bGxfdG9fZW1wdHkodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG59XG5mdW5jdGlvbiBzZXRfc3RvcmVfdmFsdWUoc3RvcmUsIHJldCwgdmFsdWUgPSByZXQpIHtcbiAgICBzdG9yZS5zZXQodmFsdWUpO1xuICAgIHJldHVybiByZXQ7XG59XG5jb25zdCBoYXNfcHJvcCA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xuZnVuY3Rpb24gYWN0aW9uX2Rlc3Ryb3llcihhY3Rpb25fcmVzdWx0KSB7XG4gICAgcmV0dXJuIGFjdGlvbl9yZXN1bHQgJiYgaXNfZnVuY3Rpb24oYWN0aW9uX3Jlc3VsdC5kZXN0cm95KSA/IGFjdGlvbl9yZXN1bHQuZGVzdHJveSA6IG5vb3A7XG59XG5cbmNvbnN0IGlzX2NsaWVudCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xubGV0IG5vdyA9IGlzX2NsaWVudFxuICAgID8gKCkgPT4gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpXG4gICAgOiAoKSA9PiBEYXRlLm5vdygpO1xubGV0IHJhZiA9IGlzX2NsaWVudCA/IGNiID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZShjYikgOiBub29wO1xuLy8gdXNlZCBpbnRlcm5hbGx5IGZvciB0ZXN0aW5nXG5mdW5jdGlvbiBzZXRfbm93KGZuKSB7XG4gICAgbm93ID0gZm47XG59XG5mdW5jdGlvbiBzZXRfcmFmKGZuKSB7XG4gICAgcmFmID0gZm47XG59XG5cbmNvbnN0IHRhc2tzID0gbmV3IFNldCgpO1xuZnVuY3Rpb24gcnVuX3Rhc2tzKG5vdykge1xuICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgIGlmICghdGFzay5jKG5vdykpIHtcbiAgICAgICAgICAgIHRhc2tzLmRlbGV0ZSh0YXNrKTtcbiAgICAgICAgICAgIHRhc2suZigpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHRhc2tzLnNpemUgIT09IDApXG4gICAgICAgIHJhZihydW5fdGFza3MpO1xufVxuLyoqXG4gKiBGb3IgdGVzdGluZyBwdXJwb3NlcyBvbmx5IVxuICovXG5mdW5jdGlvbiBjbGVhcl9sb29wcygpIHtcbiAgICB0YXNrcy5jbGVhcigpO1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHRhc2sgdGhhdCBydW5zIG9uIGVhY2ggcmFmIGZyYW1lXG4gKiB1bnRpbCBpdCByZXR1cm5zIGEgZmFsc3kgdmFsdWUgb3IgaXMgYWJvcnRlZFxuICovXG5mdW5jdGlvbiBsb29wKGNhbGxiYWNrKSB7XG4gICAgbGV0IHRhc2s7XG4gICAgaWYgKHRhc2tzLnNpemUgPT09IDApXG4gICAgICAgIHJhZihydW5fdGFza3MpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHByb21pc2U6IG5ldyBQcm9taXNlKGZ1bGZpbGwgPT4ge1xuICAgICAgICAgICAgdGFza3MuYWRkKHRhc2sgPSB7IGM6IGNhbGxiYWNrLCBmOiBmdWxmaWxsIH0pO1xuICAgICAgICB9KSxcbiAgICAgICAgYWJvcnQoKSB7XG4gICAgICAgICAgICB0YXNrcy5kZWxldGUodGFzayk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBhcHBlbmQodGFyZ2V0LCBub2RlKSB7XG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKG5vZGUpO1xufVxuZnVuY3Rpb24gaW5zZXJ0KHRhcmdldCwgbm9kZSwgYW5jaG9yKSB7XG4gICAgdGFyZ2V0Lmluc2VydEJlZm9yZShub2RlLCBhbmNob3IgfHwgbnVsbCk7XG59XG5mdW5jdGlvbiBkZXRhY2gobm9kZSkge1xuICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbn1cbmZ1bmN0aW9uIGRlc3Ryb3lfZWFjaChpdGVyYXRpb25zLCBkZXRhY2hpbmcpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZXJhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGl0ZXJhdGlvbnNbaV0pXG4gICAgICAgICAgICBpdGVyYXRpb25zW2ldLmQoZGV0YWNoaW5nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBlbGVtZW50KG5hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKTtcbn1cbmZ1bmN0aW9uIGVsZW1lbnRfaXMobmFtZSwgaXMpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lLCB7IGlzIH0pO1xufVxuZnVuY3Rpb24gb2JqZWN0X3dpdGhvdXRfcHJvcGVydGllcyhvYmosIGV4Y2x1ZGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGsgaW4gb2JqKSB7XG4gICAgICAgIGlmIChoYXNfcHJvcChvYmosIGspXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAmJiBleGNsdWRlLmluZGV4T2YoaykgPT09IC0xKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB0YXJnZXRba10gPSBvYmpba107XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbmZ1bmN0aW9uIHN2Z19lbGVtZW50KG5hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIG5hbWUpO1xufVxuZnVuY3Rpb24gdGV4dChkYXRhKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRhdGEpO1xufVxuZnVuY3Rpb24gc3BhY2UoKSB7XG4gICAgcmV0dXJuIHRleHQoJyAnKTtcbn1cbmZ1bmN0aW9uIGVtcHR5KCkge1xuICAgIHJldHVybiB0ZXh0KCcnKTtcbn1cbmZ1bmN0aW9uIGxpc3Rlbihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucykge1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgcmV0dXJuICgpID0+IG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG59XG5mdW5jdGlvbiBwcmV2ZW50X2RlZmF1bHQoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG59XG5mdW5jdGlvbiBzdG9wX3Byb3BhZ2F0aW9uKGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHNlbGYoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcylcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG59XG5mdW5jdGlvbiBhdHRyKG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICBlbHNlIGlmIChub2RlLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpICE9PSB2YWx1ZSlcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBzZXRfYXR0cmlidXRlcyhub2RlLCBhdHRyaWJ1dGVzKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMobm9kZS5fX3Byb3RvX18pO1xuICAgIGZvciAoY29uc3Qga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXNba2V5XSA9PSBudWxsKSB7XG4gICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5jc3NUZXh0ID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ19fdmFsdWUnKSB7XG4gICAgICAgICAgICBub2RlLnZhbHVlID0gbm9kZVtrZXldID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0b3JzW2tleV0gJiYgZGVzY3JpcHRvcnNba2V5XS5zZXQpIHtcbiAgICAgICAgICAgIG5vZGVba2V5XSA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGF0dHIobm9kZSwga2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0X3N2Z19hdHRyaWJ1dGVzKG5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGF0dHIobm9kZSwga2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNldF9jdXN0b21fZWxlbWVudF9kYXRhKG5vZGUsIHByb3AsIHZhbHVlKSB7XG4gICAgaWYgKHByb3AgaW4gbm9kZSkge1xuICAgICAgICBub2RlW3Byb3BdID0gdmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhdHRyKG5vZGUsIHByb3AsIHZhbHVlKTtcbiAgICB9XG59XG5mdW5jdGlvbiB4bGlua19hdHRyKG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICBub2RlLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgYXR0cmlidXRlLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBnZXRfYmluZGluZ19ncm91cF92YWx1ZShncm91cCwgX192YWx1ZSwgY2hlY2tlZCkge1xuICAgIGNvbnN0IHZhbHVlID0gbmV3IFNldCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGdyb3VwW2ldLmNoZWNrZWQpXG4gICAgICAgICAgICB2YWx1ZS5hZGQoZ3JvdXBbaV0uX192YWx1ZSk7XG4gICAgfVxuICAgIGlmICghY2hlY2tlZCkge1xuICAgICAgICB2YWx1ZS5kZWxldGUoX192YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBBcnJheS5mcm9tKHZhbHVlKTtcbn1cbmZ1bmN0aW9uIHRvX251bWJlcih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gJycgPyB1bmRlZmluZWQgOiArdmFsdWU7XG59XG5mdW5jdGlvbiB0aW1lX3Jhbmdlc190b19hcnJheShyYW5nZXMpIHtcbiAgICBjb25zdCBhcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGFycmF5LnB1c2goeyBzdGFydDogcmFuZ2VzLnN0YXJ0KGkpLCBlbmQ6IHJhbmdlcy5lbmQoaSkgfSk7XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbn1cbmZ1bmN0aW9uIGNoaWxkcmVuKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpO1xufVxuZnVuY3Rpb24gY2xhaW1fZWxlbWVudChub2RlcywgbmFtZSwgYXR0cmlidXRlcywgc3ZnKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICAgIGlmIChub2RlLm5vZGVOYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgICBsZXQgaiA9IDA7XG4gICAgICAgICAgICBjb25zdCByZW1vdmUgPSBbXTtcbiAgICAgICAgICAgIHdoaWxlIChqIDwgbm9kZS5hdHRyaWJ1dGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG5vZGUuYXR0cmlidXRlc1tqKytdO1xuICAgICAgICAgICAgICAgIGlmICghYXR0cmlidXRlc1thdHRyaWJ1dGUubmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlLnB1c2goYXR0cmlidXRlLm5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcmVtb3ZlLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUocmVtb3ZlW2tdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBub2Rlcy5zcGxpY2UoaSwgMSlbMF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN2ZyA/IHN2Z19lbGVtZW50KG5hbWUpIDogZWxlbWVudChuYW1lKTtcbn1cbmZ1bmN0aW9uIGNsYWltX3RleHQobm9kZXMsIGRhdGEpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgIG5vZGUuZGF0YSA9ICcnICsgZGF0YTtcbiAgICAgICAgICAgIHJldHVybiBub2Rlcy5zcGxpY2UoaSwgMSlbMF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRleHQoZGF0YSk7XG59XG5mdW5jdGlvbiBjbGFpbV9zcGFjZShub2Rlcykge1xuICAgIHJldHVybiBjbGFpbV90ZXh0KG5vZGVzLCAnICcpO1xufVxuZnVuY3Rpb24gc2V0X2RhdGEodGV4dCwgZGF0YSkge1xuICAgIGRhdGEgPSAnJyArIGRhdGE7XG4gICAgaWYgKHRleHQud2hvbGVUZXh0ICE9PSBkYXRhKVxuICAgICAgICB0ZXh0LmRhdGEgPSBkYXRhO1xufVxuZnVuY3Rpb24gc2V0X2lucHV0X3ZhbHVlKGlucHV0LCB2YWx1ZSkge1xuICAgIGlucHV0LnZhbHVlID0gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG59XG5mdW5jdGlvbiBzZXRfaW5wdXRfdHlwZShpbnB1dCwgdHlwZSkge1xuICAgIHRyeSB7XG4gICAgICAgIGlucHV0LnR5cGUgPSB0eXBlO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgfVxufVxuZnVuY3Rpb24gc2V0X3N0eWxlKG5vZGUsIGtleSwgdmFsdWUsIGltcG9ydGFudCkge1xuICAgIG5vZGUuc3R5bGUuc2V0UHJvcGVydHkoa2V5LCB2YWx1ZSwgaW1wb3J0YW50ID8gJ2ltcG9ydGFudCcgOiAnJyk7XG59XG5mdW5jdGlvbiBzZWxlY3Rfb3B0aW9uKHNlbGVjdCwgdmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdC5vcHRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHNlbGVjdC5vcHRpb25zW2ldO1xuICAgICAgICBpZiAob3B0aW9uLl9fdmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gc2VsZWN0X29wdGlvbnMoc2VsZWN0LCB2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gc2VsZWN0Lm9wdGlvbnNbaV07XG4gICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IH52YWx1ZS5pbmRleE9mKG9wdGlvbi5fX3ZhbHVlKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzZWxlY3RfdmFsdWUoc2VsZWN0KSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRfb3B0aW9uID0gc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJzpjaGVja2VkJykgfHwgc2VsZWN0Lm9wdGlvbnNbMF07XG4gICAgcmV0dXJuIHNlbGVjdGVkX29wdGlvbiAmJiBzZWxlY3RlZF9vcHRpb24uX192YWx1ZTtcbn1cbmZ1bmN0aW9uIHNlbGVjdF9tdWx0aXBsZV92YWx1ZShzZWxlY3QpIHtcbiAgICByZXR1cm4gW10ubWFwLmNhbGwoc2VsZWN0LnF1ZXJ5U2VsZWN0b3JBbGwoJzpjaGVja2VkJyksIG9wdGlvbiA9PiBvcHRpb24uX192YWx1ZSk7XG59XG4vLyB1bmZvcnR1bmF0ZWx5IHRoaXMgY2FuJ3QgYmUgYSBjb25zdGFudCBhcyB0aGF0IHdvdWxkbid0IGJlIHRyZWUtc2hha2VhYmxlXG4vLyBzbyB3ZSBjYWNoZSB0aGUgcmVzdWx0IGluc3RlYWRcbmxldCBjcm9zc29yaWdpbjtcbmZ1bmN0aW9uIGlzX2Nyb3Nzb3JpZ2luKCkge1xuICAgIGlmIChjcm9zc29yaWdpbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNyb3Nzb3JpZ2luID0gZmFsc2U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnBhcmVudCkge1xuICAgICAgICAgICAgICAgIHZvaWQgd2luZG93LnBhcmVudC5kb2N1bWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNyb3Nzb3JpZ2luID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3Jvc3NvcmlnaW47XG59XG5mdW5jdGlvbiBhZGRfcmVzaXplX2xpc3RlbmVyKG5vZGUsIGZuKSB7XG4gICAgY29uc3QgY29tcHV0ZWRfc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgIGNvbnN0IHpfaW5kZXggPSAocGFyc2VJbnQoY29tcHV0ZWRfc3R5bGUuekluZGV4KSB8fCAwKSAtIDE7XG4gICAgaWYgKGNvbXB1dGVkX3N0eWxlLnBvc2l0aW9uID09PSAnc3RhdGljJykge1xuICAgICAgICBub2RlLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICB9XG4gICAgY29uc3QgaWZyYW1lID0gZWxlbWVudCgnaWZyYW1lJyk7XG4gICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgZGlzcGxheTogYmxvY2s7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBsZWZ0OiAwOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyBgICtcbiAgICAgICAgYG92ZXJmbG93OiBoaWRkZW47IGJvcmRlcjogMDsgb3BhY2l0eTogMDsgcG9pbnRlci1ldmVudHM6IG5vbmU7IHotaW5kZXg6ICR7el9pbmRleH07YCk7XG4gICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIGlmcmFtZS50YWJJbmRleCA9IC0xO1xuICAgIGNvbnN0IGNyb3Nzb3JpZ2luID0gaXNfY3Jvc3NvcmlnaW4oKTtcbiAgICBsZXQgdW5zdWJzY3JpYmU7XG4gICAgaWYgKGNyb3Nzb3JpZ2luKSB7XG4gICAgICAgIGlmcmFtZS5zcmMgPSBgZGF0YTp0ZXh0L2h0bWwsPHNjcmlwdD5vbnJlc2l6ZT1mdW5jdGlvbigpe3BhcmVudC5wb3N0TWVzc2FnZSgwLCcqJyl9PC9zY3JpcHQ+YDtcbiAgICAgICAgdW5zdWJzY3JpYmUgPSBsaXN0ZW4od2luZG93LCAnbWVzc2FnZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gaWZyYW1lLmNvbnRlbnRXaW5kb3cpXG4gICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZnJhbWUuc3JjID0gJ2Fib3V0OmJsYW5rJztcbiAgICAgICAgaWZyYW1lLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlID0gbGlzdGVuKGlmcmFtZS5jb250ZW50V2luZG93LCAncmVzaXplJywgZm4pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBhcHBlbmQobm9kZSwgaWZyYW1lKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoY3Jvc3NvcmlnaW4pIHtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodW5zdWJzY3JpYmUgJiYgaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZGV0YWNoKGlmcmFtZSk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHRvZ2dsZV9jbGFzcyhlbGVtZW50LCBuYW1lLCB0b2dnbGUpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdFt0b2dnbGUgPyAnYWRkJyA6ICdyZW1vdmUnXShuYW1lKTtcbn1cbmZ1bmN0aW9uIGN1c3RvbV9ldmVudCh0eXBlLCBkZXRhaWwpIHtcbiAgICBjb25zdCBlID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgZS5pbml0Q3VzdG9tRXZlbnQodHlwZSwgZmFsc2UsIGZhbHNlLCBkZXRhaWwpO1xuICAgIHJldHVybiBlO1xufVxuZnVuY3Rpb24gcXVlcnlfc2VsZWN0b3JfYWxsKHNlbGVjdG9yLCBwYXJlbnQgPSBkb2N1bWVudC5ib2R5KSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20ocGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbn1cbmNsYXNzIEh0bWxUYWcge1xuICAgIGNvbnN0cnVjdG9yKGFuY2hvciA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5hID0gYW5jaG9yO1xuICAgICAgICB0aGlzLmUgPSB0aGlzLm4gPSBudWxsO1xuICAgIH1cbiAgICBtKGh0bWwsIHRhcmdldCwgYW5jaG9yID0gbnVsbCkge1xuICAgICAgICBpZiAoIXRoaXMuZSkge1xuICAgICAgICAgICAgdGhpcy5lID0gZWxlbWVudCh0YXJnZXQubm9kZU5hbWUpO1xuICAgICAgICAgICAgdGhpcy50ID0gdGFyZ2V0O1xuICAgICAgICAgICAgdGhpcy5oKGh0bWwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaShhbmNob3IpO1xuICAgIH1cbiAgICBoKGh0bWwpIHtcbiAgICAgICAgdGhpcy5lLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgIHRoaXMubiA9IEFycmF5LmZyb20odGhpcy5lLmNoaWxkTm9kZXMpO1xuICAgIH1cbiAgICBpKGFuY2hvcikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubi5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaW5zZXJ0KHRoaXMudCwgdGhpcy5uW2ldLCBhbmNob3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHAoaHRtbCkge1xuICAgICAgICB0aGlzLmQoKTtcbiAgICAgICAgdGhpcy5oKGh0bWwpO1xuICAgICAgICB0aGlzLmkodGhpcy5hKTtcbiAgICB9XG4gICAgZCgpIHtcbiAgICAgICAgdGhpcy5uLmZvckVhY2goZGV0YWNoKTtcbiAgICB9XG59XG5cbmNvbnN0IGFjdGl2ZV9kb2NzID0gbmV3IFNldCgpO1xubGV0IGFjdGl2ZSA9IDA7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZGFya3NreWFwcC9zdHJpbmctaGFzaC9ibG9iL21hc3Rlci9pbmRleC5qc1xuZnVuY3Rpb24gaGFzaChzdHIpIHtcbiAgICBsZXQgaGFzaCA9IDUzODE7XG4gICAgbGV0IGkgPSBzdHIubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pXG4gICAgICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSBeIHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBoYXNoID4+PiAwO1xufVxuZnVuY3Rpb24gY3JlYXRlX3J1bGUobm9kZSwgYSwgYiwgZHVyYXRpb24sIGRlbGF5LCBlYXNlLCBmbiwgdWlkID0gMCkge1xuICAgIGNvbnN0IHN0ZXAgPSAxNi42NjYgLyBkdXJhdGlvbjtcbiAgICBsZXQga2V5ZnJhbWVzID0gJ3tcXG4nO1xuICAgIGZvciAobGV0IHAgPSAwOyBwIDw9IDE7IHAgKz0gc3RlcCkge1xuICAgICAgICBjb25zdCB0ID0gYSArIChiIC0gYSkgKiBlYXNlKHApO1xuICAgICAgICBrZXlmcmFtZXMgKz0gcCAqIDEwMCArIGAleyR7Zm4odCwgMSAtIHQpfX1cXG5gO1xuICAgIH1cbiAgICBjb25zdCBydWxlID0ga2V5ZnJhbWVzICsgYDEwMCUgeyR7Zm4oYiwgMSAtIGIpfX1cXG59YDtcbiAgICBjb25zdCBuYW1lID0gYF9fc3ZlbHRlXyR7aGFzaChydWxlKX1fJHt1aWR9YDtcbiAgICBjb25zdCBkb2MgPSBub2RlLm93bmVyRG9jdW1lbnQ7XG4gICAgYWN0aXZlX2RvY3MuYWRkKGRvYyk7XG4gICAgY29uc3Qgc3R5bGVzaGVldCA9IGRvYy5fX3N2ZWx0ZV9zdHlsZXNoZWV0IHx8IChkb2MuX19zdmVsdGVfc3R5bGVzaGVldCA9IGRvYy5oZWFkLmFwcGVuZENoaWxkKGVsZW1lbnQoJ3N0eWxlJykpLnNoZWV0KTtcbiAgICBjb25zdCBjdXJyZW50X3J1bGVzID0gZG9jLl9fc3ZlbHRlX3J1bGVzIHx8IChkb2MuX19zdmVsdGVfcnVsZXMgPSB7fSk7XG4gICAgaWYgKCFjdXJyZW50X3J1bGVzW25hbWVdKSB7XG4gICAgICAgIGN1cnJlbnRfcnVsZXNbbmFtZV0gPSB0cnVlO1xuICAgICAgICBzdHlsZXNoZWV0Lmluc2VydFJ1bGUoYEBrZXlmcmFtZXMgJHtuYW1lfSAke3J1bGV9YCwgc3R5bGVzaGVldC5jc3NSdWxlcy5sZW5ndGgpO1xuICAgIH1cbiAgICBjb25zdCBhbmltYXRpb24gPSBub2RlLnN0eWxlLmFuaW1hdGlvbiB8fCAnJztcbiAgICBub2RlLnN0eWxlLmFuaW1hdGlvbiA9IGAke2FuaW1hdGlvbiA/IGAke2FuaW1hdGlvbn0sIGAgOiBgYH0ke25hbWV9ICR7ZHVyYXRpb259bXMgbGluZWFyICR7ZGVsYXl9bXMgMSBib3RoYDtcbiAgICBhY3RpdmUgKz0gMTtcbiAgICByZXR1cm4gbmFtZTtcbn1cbmZ1bmN0aW9uIGRlbGV0ZV9ydWxlKG5vZGUsIG5hbWUpIHtcbiAgICBjb25zdCBwcmV2aW91cyA9IChub2RlLnN0eWxlLmFuaW1hdGlvbiB8fCAnJykuc3BsaXQoJywgJyk7XG4gICAgY29uc3QgbmV4dCA9IHByZXZpb3VzLmZpbHRlcihuYW1lXG4gICAgICAgID8gYW5pbSA9PiBhbmltLmluZGV4T2YobmFtZSkgPCAwIC8vIHJlbW92ZSBzcGVjaWZpYyBhbmltYXRpb25cbiAgICAgICAgOiBhbmltID0+IGFuaW0uaW5kZXhPZignX19zdmVsdGUnKSA9PT0gLTEgLy8gcmVtb3ZlIGFsbCBTdmVsdGUgYW5pbWF0aW9uc1xuICAgICk7XG4gICAgY29uc3QgZGVsZXRlZCA9IHByZXZpb3VzLmxlbmd0aCAtIG5leHQubGVuZ3RoO1xuICAgIGlmIChkZWxldGVkKSB7XG4gICAgICAgIG5vZGUuc3R5bGUuYW5pbWF0aW9uID0gbmV4dC5qb2luKCcsICcpO1xuICAgICAgICBhY3RpdmUgLT0gZGVsZXRlZDtcbiAgICAgICAgaWYgKCFhY3RpdmUpXG4gICAgICAgICAgICBjbGVhcl9ydWxlcygpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNsZWFyX3J1bGVzKCkge1xuICAgIHJhZigoKSA9PiB7XG4gICAgICAgIGlmIChhY3RpdmUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGFjdGl2ZV9kb2NzLmZvckVhY2goZG9jID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlc2hlZXQgPSBkb2MuX19zdmVsdGVfc3R5bGVzaGVldDtcbiAgICAgICAgICAgIGxldCBpID0gc3R5bGVzaGVldC5jc3NSdWxlcy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKVxuICAgICAgICAgICAgICAgIHN0eWxlc2hlZXQuZGVsZXRlUnVsZShpKTtcbiAgICAgICAgICAgIGRvYy5fX3N2ZWx0ZV9ydWxlcyA9IHt9O1xuICAgICAgICB9KTtcbiAgICAgICAgYWN0aXZlX2RvY3MuY2xlYXIoKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlX2FuaW1hdGlvbihub2RlLCBmcm9tLCBmbiwgcGFyYW1zKSB7XG4gICAgaWYgKCFmcm9tKVxuICAgICAgICByZXR1cm4gbm9vcDtcbiAgICBjb25zdCB0byA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKGZyb20ubGVmdCA9PT0gdG8ubGVmdCAmJiBmcm9tLnJpZ2h0ID09PSB0by5yaWdodCAmJiBmcm9tLnRvcCA9PT0gdG8udG9wICYmIGZyb20uYm90dG9tID09PSB0by5ib3R0b20pXG4gICAgICAgIHJldHVybiBub29wO1xuICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIFxuICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogc2hvdWxkIHRoaXMgYmUgc2VwYXJhdGVkIGZyb20gZGVzdHJ1Y3R1cmluZz8gT3Igc3RhcnQvZW5kIGFkZGVkIHRvIHB1YmxpYyBhcGkgYW5kIGRvY3VtZW50YXRpb24/XG4gICAgc3RhcnQ6IHN0YXJ0X3RpbWUgPSBub3coKSArIGRlbGF5LCBcbiAgICAvLyBAdHMtaWdub3JlIHRvZG86XG4gICAgZW5kID0gc3RhcnRfdGltZSArIGR1cmF0aW9uLCB0aWNrID0gbm9vcCwgY3NzIH0gPSBmbihub2RlLCB7IGZyb20sIHRvIH0sIHBhcmFtcyk7XG4gICAgbGV0IHJ1bm5pbmcgPSB0cnVlO1xuICAgIGxldCBzdGFydGVkID0gZmFsc2U7XG4gICAgbGV0IG5hbWU7XG4gICAgZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgIGlmIChjc3MpIHtcbiAgICAgICAgICAgIG5hbWUgPSBjcmVhdGVfcnVsZShub2RlLCAwLCAxLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRlbGF5KSB7XG4gICAgICAgICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICBpZiAoY3NzKVxuICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSwgbmFtZSk7XG4gICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgbG9vcChub3cgPT4ge1xuICAgICAgICBpZiAoIXN0YXJ0ZWQgJiYgbm93ID49IHN0YXJ0X3RpbWUpIHtcbiAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydGVkICYmIG5vdyA+PSBlbmQpIHtcbiAgICAgICAgICAgIHRpY2soMSwgMCk7XG4gICAgICAgICAgICBzdG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFydW5uaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHAgPSBub3cgLSBzdGFydF90aW1lO1xuICAgICAgICAgICAgY29uc3QgdCA9IDAgKyAxICogZWFzaW5nKHAgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICB0aWNrKHQsIDEgLSB0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgICBzdGFydCgpO1xuICAgIHRpY2soMCwgMSk7XG4gICAgcmV0dXJuIHN0b3A7XG59XG5mdW5jdGlvbiBmaXhfcG9zaXRpb24obm9kZSkge1xuICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICBpZiAoc3R5bGUucG9zaXRpb24gIT09ICdhYnNvbHV0ZScgJiYgc3R5bGUucG9zaXRpb24gIT09ICdmaXhlZCcpIHtcbiAgICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBzdHlsZTtcbiAgICAgICAgY29uc3QgYSA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIG5vZGUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICBub2RlLnN0eWxlLndpZHRoID0gd2lkdGg7XG4gICAgICAgIG5vZGUuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBhZGRfdHJhbnNmb3JtKG5vZGUsIGEpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFkZF90cmFuc2Zvcm0obm9kZSwgYSkge1xuICAgIGNvbnN0IGIgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmIChhLmxlZnQgIT09IGIubGVmdCB8fCBhLnRvcCAhPT0gYi50b3ApIHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBzdHlsZS50cmFuc2Zvcm0gPT09ICdub25lJyA/ICcnIDogc3R5bGUudHJhbnNmb3JtO1xuICAgICAgICBub2RlLnN0eWxlLnRyYW5zZm9ybSA9IGAke3RyYW5zZm9ybX0gdHJhbnNsYXRlKCR7YS5sZWZ0IC0gYi5sZWZ0fXB4LCAke2EudG9wIC0gYi50b3B9cHgpYDtcbiAgICB9XG59XG5cbmxldCBjdXJyZW50X2NvbXBvbmVudDtcbmZ1bmN0aW9uIHNldF9jdXJyZW50X2NvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICBjdXJyZW50X2NvbXBvbmVudCA9IGNvbXBvbmVudDtcbn1cbmZ1bmN0aW9uIGdldF9jdXJyZW50X2NvbXBvbmVudCgpIHtcbiAgICBpZiAoIWN1cnJlbnRfY29tcG9uZW50KVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZ1bmN0aW9uIGNhbGxlZCBvdXRzaWRlIGNvbXBvbmVudCBpbml0aWFsaXphdGlvbmApO1xuICAgIHJldHVybiBjdXJyZW50X2NvbXBvbmVudDtcbn1cbmZ1bmN0aW9uIGJlZm9yZVVwZGF0ZShmbikge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmJlZm9yZV91cGRhdGUucHVzaChmbik7XG59XG5mdW5jdGlvbiBvbk1vdW50KGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQub25fbW91bnQucHVzaChmbik7XG59XG5mdW5jdGlvbiBhZnRlclVwZGF0ZShmbikge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmFmdGVyX3VwZGF0ZS5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIG9uRGVzdHJveShmbikge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLm9uX2Rlc3Ryb3kucHVzaChmbik7XG59XG5mdW5jdGlvbiBjcmVhdGVFdmVudERpc3BhdGNoZXIoKSB7XG4gICAgY29uc3QgY29tcG9uZW50ID0gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCk7XG4gICAgcmV0dXJuICh0eXBlLCBkZXRhaWwpID0+IHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gY29tcG9uZW50LiQkLmNhbGxiYWNrc1t0eXBlXTtcbiAgICAgICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICAgICAgLy8gVE9ETyBhcmUgdGhlcmUgc2l0dWF0aW9ucyB3aGVyZSBldmVudHMgY291bGQgYmUgZGlzcGF0Y2hlZFxuICAgICAgICAgICAgLy8gaW4gYSBzZXJ2ZXIgKG5vbi1ET00pIGVudmlyb25tZW50P1xuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBjdXN0b21fZXZlbnQodHlwZSwgZGV0YWlsKTtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5zbGljZSgpLmZvckVhY2goZm4gPT4ge1xuICAgICAgICAgICAgICAgIGZuLmNhbGwoY29tcG9uZW50LCBldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBzZXRDb250ZXh0KGtleSwgY29udGV4dCkge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQuc2V0KGtleSwgY29udGV4dCk7XG59XG5mdW5jdGlvbiBnZXRDb250ZXh0KGtleSkge1xuICAgIHJldHVybiBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5jb250ZXh0LmdldChrZXkpO1xufVxuLy8gVE9ETyBmaWd1cmUgb3V0IGlmIHdlIHN0aWxsIHdhbnQgdG8gc3VwcG9ydFxuLy8gc2hvcnRoYW5kIGV2ZW50cywgb3IgaWYgd2Ugd2FudCB0byBpbXBsZW1lbnRcbi8vIGEgcmVhbCBidWJibGluZyBtZWNoYW5pc21cbmZ1bmN0aW9uIGJ1YmJsZShjb21wb25lbnQsIGV2ZW50KSB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gY29tcG9uZW50LiQkLmNhbGxiYWNrc1tldmVudC50eXBlXTtcbiAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgIGNhbGxiYWNrcy5zbGljZSgpLmZvckVhY2goZm4gPT4gZm4oZXZlbnQpKTtcbiAgICB9XG59XG5cbmNvbnN0IGRpcnR5X2NvbXBvbmVudHMgPSBbXTtcbmNvbnN0IGludHJvcyA9IHsgZW5hYmxlZDogZmFsc2UgfTtcbmNvbnN0IGJpbmRpbmdfY2FsbGJhY2tzID0gW107XG5jb25zdCByZW5kZXJfY2FsbGJhY2tzID0gW107XG5jb25zdCBmbHVzaF9jYWxsYmFja3MgPSBbXTtcbmNvbnN0IHJlc29sdmVkX3Byb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbmxldCB1cGRhdGVfc2NoZWR1bGVkID0gZmFsc2U7XG5mdW5jdGlvbiBzY2hlZHVsZV91cGRhdGUoKSB7XG4gICAgaWYgKCF1cGRhdGVfc2NoZWR1bGVkKSB7XG4gICAgICAgIHVwZGF0ZV9zY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgICByZXNvbHZlZF9wcm9taXNlLnRoZW4oZmx1c2gpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHRpY2soKSB7XG4gICAgc2NoZWR1bGVfdXBkYXRlKCk7XG4gICAgcmV0dXJuIHJlc29sdmVkX3Byb21pc2U7XG59XG5mdW5jdGlvbiBhZGRfcmVuZGVyX2NhbGxiYWNrKGZuKSB7XG4gICAgcmVuZGVyX2NhbGxiYWNrcy5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIGFkZF9mbHVzaF9jYWxsYmFjayhmbikge1xuICAgIGZsdXNoX2NhbGxiYWNrcy5wdXNoKGZuKTtcbn1cbmxldCBmbHVzaGluZyA9IGZhbHNlO1xuY29uc3Qgc2Vlbl9jYWxsYmFja3MgPSBuZXcgU2V0KCk7XG5mdW5jdGlvbiBmbHVzaCgpIHtcbiAgICBpZiAoZmx1c2hpbmcpXG4gICAgICAgIHJldHVybjtcbiAgICBmbHVzaGluZyA9IHRydWU7XG4gICAgZG8ge1xuICAgICAgICAvLyBmaXJzdCwgY2FsbCBiZWZvcmVVcGRhdGUgZnVuY3Rpb25zXG4gICAgICAgIC8vIGFuZCB1cGRhdGUgY29tcG9uZW50c1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpcnR5X2NvbXBvbmVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IGRpcnR5X2NvbXBvbmVudHNbaV07XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIHVwZGF0ZShjb21wb25lbnQuJCQpO1xuICAgICAgICB9XG4gICAgICAgIGRpcnR5X2NvbXBvbmVudHMubGVuZ3RoID0gMDtcbiAgICAgICAgd2hpbGUgKGJpbmRpbmdfY2FsbGJhY2tzLmxlbmd0aClcbiAgICAgICAgICAgIGJpbmRpbmdfY2FsbGJhY2tzLnBvcCgpKCk7XG4gICAgICAgIC8vIHRoZW4sIG9uY2UgY29tcG9uZW50cyBhcmUgdXBkYXRlZCwgY2FsbFxuICAgICAgICAvLyBhZnRlclVwZGF0ZSBmdW5jdGlvbnMuIFRoaXMgbWF5IGNhdXNlXG4gICAgICAgIC8vIHN1YnNlcXVlbnQgdXBkYXRlcy4uLlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcl9jYWxsYmFja3MubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrID0gcmVuZGVyX2NhbGxiYWNrc1tpXTtcbiAgICAgICAgICAgIGlmICghc2Vlbl9jYWxsYmFja3MuaGFzKGNhbGxiYWNrKSkge1xuICAgICAgICAgICAgICAgIC8vIC4uLnNvIGd1YXJkIGFnYWluc3QgaW5maW5pdGUgbG9vcHNcbiAgICAgICAgICAgICAgICBzZWVuX2NhbGxiYWNrcy5hZGQoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyX2NhbGxiYWNrcy5sZW5ndGggPSAwO1xuICAgIH0gd2hpbGUgKGRpcnR5X2NvbXBvbmVudHMubGVuZ3RoKTtcbiAgICB3aGlsZSAoZmx1c2hfY2FsbGJhY2tzLmxlbmd0aCkge1xuICAgICAgICBmbHVzaF9jYWxsYmFja3MucG9wKCkoKTtcbiAgICB9XG4gICAgdXBkYXRlX3NjaGVkdWxlZCA9IGZhbHNlO1xuICAgIGZsdXNoaW5nID0gZmFsc2U7XG4gICAgc2Vlbl9jYWxsYmFja3MuY2xlYXIoKTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZSgkJCkge1xuICAgIGlmICgkJC5mcmFnbWVudCAhPT0gbnVsbCkge1xuICAgICAgICAkJC51cGRhdGUoKTtcbiAgICAgICAgcnVuX2FsbCgkJC5iZWZvcmVfdXBkYXRlKTtcbiAgICAgICAgY29uc3QgZGlydHkgPSAkJC5kaXJ0eTtcbiAgICAgICAgJCQuZGlydHkgPSBbLTFdO1xuICAgICAgICAkJC5mcmFnbWVudCAmJiAkJC5mcmFnbWVudC5wKCQkLmN0eCwgZGlydHkpO1xuICAgICAgICAkJC5hZnRlcl91cGRhdGUuZm9yRWFjaChhZGRfcmVuZGVyX2NhbGxiYWNrKTtcbiAgICB9XG59XG5cbmxldCBwcm9taXNlO1xuZnVuY3Rpb24gd2FpdCgpIHtcbiAgICBpZiAoIXByb21pc2UpIHtcbiAgICAgICAgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICBwcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcHJvbWlzZSA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cbmZ1bmN0aW9uIGRpc3BhdGNoKG5vZGUsIGRpcmVjdGlvbiwga2luZCkge1xuICAgIG5vZGUuZGlzcGF0Y2hFdmVudChjdXN0b21fZXZlbnQoYCR7ZGlyZWN0aW9uID8gJ2ludHJvJyA6ICdvdXRybyd9JHtraW5kfWApKTtcbn1cbmNvbnN0IG91dHJvaW5nID0gbmV3IFNldCgpO1xubGV0IG91dHJvcztcbmZ1bmN0aW9uIGdyb3VwX291dHJvcygpIHtcbiAgICBvdXRyb3MgPSB7XG4gICAgICAgIHI6IDAsXG4gICAgICAgIGM6IFtdLFxuICAgICAgICBwOiBvdXRyb3MgLy8gcGFyZW50IGdyb3VwXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNoZWNrX291dHJvcygpIHtcbiAgICBpZiAoIW91dHJvcy5yKSB7XG4gICAgICAgIHJ1bl9hbGwob3V0cm9zLmMpO1xuICAgIH1cbiAgICBvdXRyb3MgPSBvdXRyb3MucDtcbn1cbmZ1bmN0aW9uIHRyYW5zaXRpb25faW4oYmxvY2ssIGxvY2FsKSB7XG4gICAgaWYgKGJsb2NrICYmIGJsb2NrLmkpIHtcbiAgICAgICAgb3V0cm9pbmcuZGVsZXRlKGJsb2NrKTtcbiAgICAgICAgYmxvY2suaShsb2NhbCk7XG4gICAgfVxufVxuZnVuY3Rpb24gdHJhbnNpdGlvbl9vdXQoYmxvY2ssIGxvY2FsLCBkZXRhY2gsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGJsb2NrICYmIGJsb2NrLm8pIHtcbiAgICAgICAgaWYgKG91dHJvaW5nLmhhcyhibG9jaykpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIG91dHJvaW5nLmFkZChibG9jayk7XG4gICAgICAgIG91dHJvcy5jLnB1c2goKCkgPT4ge1xuICAgICAgICAgICAgb3V0cm9pbmcuZGVsZXRlKGJsb2NrKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGlmIChkZXRhY2gpXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrLmQoMSk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGJsb2NrLm8obG9jYWwpO1xuICAgIH1cbn1cbmNvbnN0IG51bGxfdHJhbnNpdGlvbiA9IHsgZHVyYXRpb246IDAgfTtcbmZ1bmN0aW9uIGNyZWF0ZV9pbl90cmFuc2l0aW9uKG5vZGUsIGZuLCBwYXJhbXMpIHtcbiAgICBsZXQgY29uZmlnID0gZm4obm9kZSwgcGFyYW1zKTtcbiAgICBsZXQgcnVubmluZyA9IGZhbHNlO1xuICAgIGxldCBhbmltYXRpb25fbmFtZTtcbiAgICBsZXQgdGFzaztcbiAgICBsZXQgdWlkID0gMDtcbiAgICBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgICAgICBpZiAoYW5pbWF0aW9uX25hbWUpXG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBhbmltYXRpb25fbmFtZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdvKCkge1xuICAgICAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCB0aWNrID0gbm9vcCwgY3NzIH0gPSBjb25maWcgfHwgbnVsbF90cmFuc2l0aW9uO1xuICAgICAgICBpZiAoY3NzKVxuICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCAwLCAxLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzLCB1aWQrKyk7XG4gICAgICAgIHRpY2soMCwgMSk7XG4gICAgICAgIGNvbnN0IHN0YXJ0X3RpbWUgPSBub3coKSArIGRlbGF5O1xuICAgICAgICBjb25zdCBlbmRfdGltZSA9IHN0YXJ0X3RpbWUgKyBkdXJhdGlvbjtcbiAgICAgICAgaWYgKHRhc2spXG4gICAgICAgICAgICB0YXNrLmFib3J0KCk7XG4gICAgICAgIHJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IGRpc3BhdGNoKG5vZGUsIHRydWUsICdzdGFydCcpKTtcbiAgICAgICAgdGFzayA9IGxvb3Aobm93ID0+IHtcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBlbmRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICB0aWNrKDEsIDApO1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCB0cnVlLCAnZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBzdGFydF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBlYXNpbmcoKG5vdyAtIHN0YXJ0X3RpbWUpIC8gZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aWNrKHQsIDEgLSB0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcnVubmluZztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGxldCBzdGFydGVkID0gZmFsc2U7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQoKSB7XG4gICAgICAgICAgICBpZiAoc3RhcnRlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlKTtcbiAgICAgICAgICAgIGlmIChpc19mdW5jdGlvbihjb25maWcpKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnID0gY29uZmlnKCk7XG4gICAgICAgICAgICAgICAgd2FpdCgpLnRoZW4oZ28pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ28oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaW52YWxpZGF0ZSgpIHtcbiAgICAgICAgICAgIHN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW5kKCkge1xuICAgICAgICAgICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9vdXRfdHJhbnNpdGlvbihub2RlLCBmbiwgcGFyYW1zKSB7XG4gICAgbGV0IGNvbmZpZyA9IGZuKG5vZGUsIHBhcmFtcyk7XG4gICAgbGV0IHJ1bm5pbmcgPSB0cnVlO1xuICAgIGxldCBhbmltYXRpb25fbmFtZTtcbiAgICBjb25zdCBncm91cCA9IG91dHJvcztcbiAgICBncm91cC5yICs9IDE7XG4gICAgZnVuY3Rpb24gZ28oKSB7XG4gICAgICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIHRpY2sgPSBub29wLCBjc3MgfSA9IGNvbmZpZyB8fCBudWxsX3RyYW5zaXRpb247XG4gICAgICAgIGlmIChjc3MpXG4gICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIDEsIDAsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MpO1xuICAgICAgICBjb25zdCBzdGFydF90aW1lID0gbm93KCkgKyBkZWxheTtcbiAgICAgICAgY29uc3QgZW5kX3RpbWUgPSBzdGFydF90aW1lICsgZHVyYXRpb247XG4gICAgICAgIGFkZF9yZW5kZXJfY2FsbGJhY2soKCkgPT4gZGlzcGF0Y2gobm9kZSwgZmFsc2UsICdzdGFydCcpKTtcbiAgICAgICAgbG9vcChub3cgPT4ge1xuICAgICAgICAgICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAobm93ID49IGVuZF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpY2soMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vZGUsIGZhbHNlLCAnZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghLS1ncm91cC5yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIHdpbGwgcmVzdWx0IGluIGBlbmQoKWAgYmVpbmcgY2FsbGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc28gd2UgZG9uJ3QgbmVlZCB0byBjbGVhbiB1cCBoZXJlXG4gICAgICAgICAgICAgICAgICAgICAgICBydW5fYWxsKGdyb3VwLmMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBzdGFydF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBlYXNpbmcoKG5vdyAtIHN0YXJ0X3RpbWUpIC8gZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aWNrKDEgLSB0LCB0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcnVubmluZztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChpc19mdW5jdGlvbihjb25maWcpKSB7XG4gICAgICAgIHdhaXQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGNvbmZpZyA9IGNvbmZpZygpO1xuICAgICAgICAgICAgZ28oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnbygpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBlbmQocmVzZXQpIHtcbiAgICAgICAgICAgIGlmIChyZXNldCAmJiBjb25maWcudGljaykge1xuICAgICAgICAgICAgICAgIGNvbmZpZy50aWNrKDEsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5pbWF0aW9uX25hbWUpXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIGFuaW1hdGlvbl9uYW1lKTtcbiAgICAgICAgICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlX2JpZGlyZWN0aW9uYWxfdHJhbnNpdGlvbihub2RlLCBmbiwgcGFyYW1zLCBpbnRybykge1xuICAgIGxldCBjb25maWcgPSBmbihub2RlLCBwYXJhbXMpO1xuICAgIGxldCB0ID0gaW50cm8gPyAwIDogMTtcbiAgICBsZXQgcnVubmluZ19wcm9ncmFtID0gbnVsbDtcbiAgICBsZXQgcGVuZGluZ19wcm9ncmFtID0gbnVsbDtcbiAgICBsZXQgYW5pbWF0aW9uX25hbWUgPSBudWxsO1xuICAgIGZ1bmN0aW9uIGNsZWFyX2FuaW1hdGlvbigpIHtcbiAgICAgICAgaWYgKGFuaW1hdGlvbl9uYW1lKVxuICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSwgYW5pbWF0aW9uX25hbWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbml0KHByb2dyYW0sIGR1cmF0aW9uKSB7XG4gICAgICAgIGNvbnN0IGQgPSBwcm9ncmFtLmIgLSB0O1xuICAgICAgICBkdXJhdGlvbiAqPSBNYXRoLmFicyhkKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGE6IHQsXG4gICAgICAgICAgICBiOiBwcm9ncmFtLmIsXG4gICAgICAgICAgICBkLFxuICAgICAgICAgICAgZHVyYXRpb24sXG4gICAgICAgICAgICBzdGFydDogcHJvZ3JhbS5zdGFydCxcbiAgICAgICAgICAgIGVuZDogcHJvZ3JhbS5zdGFydCArIGR1cmF0aW9uLFxuICAgICAgICAgICAgZ3JvdXA6IHByb2dyYW0uZ3JvdXBcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ28oYikge1xuICAgICAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCB0aWNrID0gbm9vcCwgY3NzIH0gPSBjb25maWcgfHwgbnVsbF90cmFuc2l0aW9uO1xuICAgICAgICBjb25zdCBwcm9ncmFtID0ge1xuICAgICAgICAgICAgc3RhcnQ6IG5vdygpICsgZGVsYXksXG4gICAgICAgICAgICBiXG4gICAgICAgIH07XG4gICAgICAgIGlmICghYikge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB0b2RvOiBpbXByb3ZlIHR5cGluZ3NcbiAgICAgICAgICAgIHByb2dyYW0uZ3JvdXAgPSBvdXRyb3M7XG4gICAgICAgICAgICBvdXRyb3MuciArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0pIHtcbiAgICAgICAgICAgIHBlbmRpbmdfcHJvZ3JhbSA9IHByb2dyYW07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBpZiB0aGlzIGlzIGFuIGludHJvLCBhbmQgdGhlcmUncyBhIGRlbGF5LCB3ZSBuZWVkIHRvIGRvXG4gICAgICAgICAgICAvLyBhbiBpbml0aWFsIHRpY2sgYW5kL29yIGFwcGx5IENTUyBhbmltYXRpb24gaW1tZWRpYXRlbHlcbiAgICAgICAgICAgIGlmIChjc3MpIHtcbiAgICAgICAgICAgICAgICBjbGVhcl9hbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIHQsIGIsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGIpXG4gICAgICAgICAgICAgICAgdGljaygwLCAxKTtcbiAgICAgICAgICAgIHJ1bm5pbmdfcHJvZ3JhbSA9IGluaXQocHJvZ3JhbSwgZHVyYXRpb24pO1xuICAgICAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiBkaXNwYXRjaChub2RlLCBiLCAnc3RhcnQnKSk7XG4gICAgICAgICAgICBsb29wKG5vdyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBlbmRpbmdfcHJvZ3JhbSAmJiBub3cgPiBwZW5kaW5nX3Byb2dyYW0uc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gaW5pdChwZW5kaW5nX3Byb2dyYW0sIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgcGVuZGluZ19wcm9ncmFtID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgcnVubmluZ19wcm9ncmFtLmIsICdzdGFydCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3NzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhcl9hbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgdCwgcnVubmluZ19wcm9ncmFtLmIsIHJ1bm5pbmdfcHJvZ3JhbS5kdXJhdGlvbiwgMCwgZWFzaW5nLCBjb25maWcuY3NzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocnVubmluZ19wcm9ncmFtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub3cgPj0gcnVubmluZ19wcm9ncmFtLmVuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGljayh0ID0gcnVubmluZ19wcm9ncmFtLmIsIDEgLSB0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vZGUsIHJ1bm5pbmdfcHJvZ3JhbS5iLCAnZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBlbmRpbmdfcHJvZ3JhbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlJ3JlIGRvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnVubmluZ19wcm9ncmFtLmIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW50cm8g4oCUIHdlIGNhbiB0aWR5IHVwIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3V0cm8g4oCUIG5lZWRzIHRvIGJlIGNvb3JkaW5hdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghLS1ydW5uaW5nX3Byb2dyYW0uZ3JvdXAucilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bl9hbGwocnVubmluZ19wcm9ncmFtLmdyb3VwLmMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bm5pbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobm93ID49IHJ1bm5pbmdfcHJvZ3JhbS5zdGFydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcCA9IG5vdyAtIHJ1bm5pbmdfcHJvZ3JhbS5zdGFydDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQgPSBydW5uaW5nX3Byb2dyYW0uYSArIHJ1bm5pbmdfcHJvZ3JhbS5kICogZWFzaW5nKHAgLyBydW5uaW5nX3Byb2dyYW0uZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGljayh0LCAxIC0gdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhKHJ1bm5pbmdfcHJvZ3JhbSB8fCBwZW5kaW5nX3Byb2dyYW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcnVuKGIpIHtcbiAgICAgICAgICAgIGlmIChpc19mdW5jdGlvbihjb25maWcpKSB7XG4gICAgICAgICAgICAgICAgd2FpdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZyA9IGNvbmZpZygpO1xuICAgICAgICAgICAgICAgICAgICBnbyhiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdvKGIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbmQoKSB7XG4gICAgICAgICAgICBjbGVhcl9hbmltYXRpb24oKTtcbiAgICAgICAgICAgIHJ1bm5pbmdfcHJvZ3JhbSA9IHBlbmRpbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfcHJvbWlzZShwcm9taXNlLCBpbmZvKSB7XG4gICAgY29uc3QgdG9rZW4gPSBpbmZvLnRva2VuID0ge307XG4gICAgZnVuY3Rpb24gdXBkYXRlKHR5cGUsIGluZGV4LCBrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmIChpbmZvLnRva2VuICE9PSB0b2tlbilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaW5mby5yZXNvbHZlZCA9IHZhbHVlO1xuICAgICAgICBsZXQgY2hpbGRfY3R4ID0gaW5mby5jdHg7XG4gICAgICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2hpbGRfY3R4ID0gY2hpbGRfY3R4LnNsaWNlKCk7XG4gICAgICAgICAgICBjaGlsZF9jdHhba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJsb2NrID0gdHlwZSAmJiAoaW5mby5jdXJyZW50ID0gdHlwZSkoY2hpbGRfY3R4KTtcbiAgICAgICAgbGV0IG5lZWRzX2ZsdXNoID0gZmFsc2U7XG4gICAgICAgIGlmIChpbmZvLmJsb2NrKSB7XG4gICAgICAgICAgICBpZiAoaW5mby5ibG9ja3MpIHtcbiAgICAgICAgICAgICAgICBpbmZvLmJsb2Nrcy5mb3JFYWNoKChibG9jaywgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gaW5kZXggJiYgYmxvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwX291dHJvcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbl9vdXQoYmxvY2ssIDEsIDEsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvLmJsb2Nrc1tpXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrX291dHJvcygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbmZvLmJsb2NrLmQoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBibG9jay5jKCk7XG4gICAgICAgICAgICB0cmFuc2l0aW9uX2luKGJsb2NrLCAxKTtcbiAgICAgICAgICAgIGJsb2NrLm0oaW5mby5tb3VudCgpLCBpbmZvLmFuY2hvcik7XG4gICAgICAgICAgICBuZWVkc19mbHVzaCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaW5mby5ibG9jayA9IGJsb2NrO1xuICAgICAgICBpZiAoaW5mby5ibG9ja3MpXG4gICAgICAgICAgICBpbmZvLmJsb2Nrc1tpbmRleF0gPSBibG9jaztcbiAgICAgICAgaWYgKG5lZWRzX2ZsdXNoKSB7XG4gICAgICAgICAgICBmbHVzaCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChpc19wcm9taXNlKHByb21pc2UpKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfY29tcG9uZW50ID0gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCk7XG4gICAgICAgIHByb21pc2UudGhlbih2YWx1ZSA9PiB7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY3VycmVudF9jb21wb25lbnQpO1xuICAgICAgICAgICAgdXBkYXRlKGluZm8udGhlbiwgMSwgaW5mby52YWx1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KG51bGwpO1xuICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY3VycmVudF9jb21wb25lbnQpO1xuICAgICAgICAgICAgdXBkYXRlKGluZm8uY2F0Y2gsIDIsIGluZm8uZXJyb3IsIGVycm9yKTtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChudWxsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGlmIHdlIHByZXZpb3VzbHkgaGFkIGEgdGhlbi9jYXRjaCBibG9jaywgZGVzdHJveSBpdFxuICAgICAgICBpZiAoaW5mby5jdXJyZW50ICE9PSBpbmZvLnBlbmRpbmcpIHtcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLnBlbmRpbmcsIDApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmIChpbmZvLmN1cnJlbnQgIT09IGluZm8udGhlbikge1xuICAgICAgICAgICAgdXBkYXRlKGluZm8udGhlbiwgMSwgaW5mby52YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpbmZvLnJlc29sdmVkID0gcHJvbWlzZTtcbiAgICB9XG59XG5cbmNvbnN0IGdsb2JhbHMgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICA/IHdpbmRvd1xuICAgIDogdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnXG4gICAgICAgID8gZ2xvYmFsVGhpc1xuICAgICAgICA6IGdsb2JhbCk7XG5cbmZ1bmN0aW9uIGRlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIGJsb2NrLmQoMSk7XG4gICAgbG9va3VwLmRlbGV0ZShibG9jay5rZXkpO1xufVxuZnVuY3Rpb24gb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIHRyYW5zaXRpb25fb3V0KGJsb2NrLCAxLCAxLCAoKSA9PiB7XG4gICAgICAgIGxvb2t1cC5kZWxldGUoYmxvY2sua2V5KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGZpeF9hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG4gICAgYmxvY2suZigpO1xuICAgIGRlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCk7XG59XG5mdW5jdGlvbiBmaXhfYW5kX291dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICBibG9jay5mKCk7XG4gICAgb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCk7XG59XG5mdW5jdGlvbiB1cGRhdGVfa2V5ZWRfZWFjaChvbGRfYmxvY2tzLCBkaXJ0eSwgZ2V0X2tleSwgZHluYW1pYywgY3R4LCBsaXN0LCBsb29rdXAsIG5vZGUsIGRlc3Ryb3ksIGNyZWF0ZV9lYWNoX2Jsb2NrLCBuZXh0LCBnZXRfY29udGV4dCkge1xuICAgIGxldCBvID0gb2xkX2Jsb2Nrcy5sZW5ndGg7XG4gICAgbGV0IG4gPSBsaXN0Lmxlbmd0aDtcbiAgICBsZXQgaSA9IG87XG4gICAgY29uc3Qgb2xkX2luZGV4ZXMgPSB7fTtcbiAgICB3aGlsZSAoaS0tKVxuICAgICAgICBvbGRfaW5kZXhlc1tvbGRfYmxvY2tzW2ldLmtleV0gPSBpO1xuICAgIGNvbnN0IG5ld19ibG9ja3MgPSBbXTtcbiAgICBjb25zdCBuZXdfbG9va3VwID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IGRlbHRhcyA9IG5ldyBNYXAoKTtcbiAgICBpID0gbjtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkX2N0eCA9IGdldF9jb250ZXh0KGN0eCwgbGlzdCwgaSk7XG4gICAgICAgIGNvbnN0IGtleSA9IGdldF9rZXkoY2hpbGRfY3R4KTtcbiAgICAgICAgbGV0IGJsb2NrID0gbG9va3VwLmdldChrZXkpO1xuICAgICAgICBpZiAoIWJsb2NrKSB7XG4gICAgICAgICAgICBibG9jayA9IGNyZWF0ZV9lYWNoX2Jsb2NrKGtleSwgY2hpbGRfY3R4KTtcbiAgICAgICAgICAgIGJsb2NrLmMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkeW5hbWljKSB7XG4gICAgICAgICAgICBibG9jay5wKGNoaWxkX2N0eCwgZGlydHkpO1xuICAgICAgICB9XG4gICAgICAgIG5ld19sb29rdXAuc2V0KGtleSwgbmV3X2Jsb2Nrc1tpXSA9IGJsb2NrKTtcbiAgICAgICAgaWYgKGtleSBpbiBvbGRfaW5kZXhlcylcbiAgICAgICAgICAgIGRlbHRhcy5zZXQoa2V5LCBNYXRoLmFicyhpIC0gb2xkX2luZGV4ZXNba2V5XSkpO1xuICAgIH1cbiAgICBjb25zdCB3aWxsX21vdmUgPSBuZXcgU2V0KCk7XG4gICAgY29uc3QgZGlkX21vdmUgPSBuZXcgU2V0KCk7XG4gICAgZnVuY3Rpb24gaW5zZXJ0KGJsb2NrKSB7XG4gICAgICAgIHRyYW5zaXRpb25faW4oYmxvY2ssIDEpO1xuICAgICAgICBibG9jay5tKG5vZGUsIG5leHQpO1xuICAgICAgICBsb29rdXAuc2V0KGJsb2NrLmtleSwgYmxvY2spO1xuICAgICAgICBuZXh0ID0gYmxvY2suZmlyc3Q7XG4gICAgICAgIG4tLTtcbiAgICB9XG4gICAgd2hpbGUgKG8gJiYgbikge1xuICAgICAgICBjb25zdCBuZXdfYmxvY2sgPSBuZXdfYmxvY2tzW24gLSAxXTtcbiAgICAgICAgY29uc3Qgb2xkX2Jsb2NrID0gb2xkX2Jsb2Nrc1tvIC0gMV07XG4gICAgICAgIGNvbnN0IG5ld19rZXkgPSBuZXdfYmxvY2sua2V5O1xuICAgICAgICBjb25zdCBvbGRfa2V5ID0gb2xkX2Jsb2NrLmtleTtcbiAgICAgICAgaWYgKG5ld19ibG9jayA9PT0gb2xkX2Jsb2NrKSB7XG4gICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgICAgICBuZXh0ID0gbmV3X2Jsb2NrLmZpcnN0O1xuICAgICAgICAgICAgby0tO1xuICAgICAgICAgICAgbi0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFuZXdfbG9va3VwLmhhcyhvbGRfa2V5KSkge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIG9sZCBibG9ja1xuICAgICAgICAgICAgZGVzdHJveShvbGRfYmxvY2ssIGxvb2t1cCk7XG4gICAgICAgICAgICBvLS07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIWxvb2t1cC5oYXMobmV3X2tleSkgfHwgd2lsbF9tb3ZlLmhhcyhuZXdfa2V5KSkge1xuICAgICAgICAgICAgaW5zZXJ0KG5ld19ibG9jayk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGlkX21vdmUuaGFzKG9sZF9rZXkpKSB7XG4gICAgICAgICAgICBvLS07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVsdGFzLmdldChuZXdfa2V5KSA+IGRlbHRhcy5nZXQob2xkX2tleSkpIHtcbiAgICAgICAgICAgIGRpZF9tb3ZlLmFkZChuZXdfa2V5KTtcbiAgICAgICAgICAgIGluc2VydChuZXdfYmxvY2spO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgd2lsbF9tb3ZlLmFkZChvbGRfa2V5KTtcbiAgICAgICAgICAgIG8tLTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB3aGlsZSAoby0tKSB7XG4gICAgICAgIGNvbnN0IG9sZF9ibG9jayA9IG9sZF9ibG9ja3Nbb107XG4gICAgICAgIGlmICghbmV3X2xvb2t1cC5oYXMob2xkX2Jsb2NrLmtleSkpXG4gICAgICAgICAgICBkZXN0cm95KG9sZF9ibG9jaywgbG9va3VwKTtcbiAgICB9XG4gICAgd2hpbGUgKG4pXG4gICAgICAgIGluc2VydChuZXdfYmxvY2tzW24gLSAxXSk7XG4gICAgcmV0dXJuIG5ld19ibG9ja3M7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZV9lYWNoX2tleXMoY3R4LCBsaXN0LCBnZXRfY29udGV4dCwgZ2V0X2tleSkge1xuICAgIGNvbnN0IGtleXMgPSBuZXcgU2V0KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGdldF9rZXkoZ2V0X2NvbnRleHQoY3R4LCBsaXN0LCBpKSk7XG4gICAgICAgIGlmIChrZXlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBoYXZlIGR1cGxpY2F0ZSBrZXlzIGluIGEga2V5ZWQgZWFjaGApO1xuICAgICAgICB9XG4gICAgICAgIGtleXMuYWRkKGtleSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRfc3ByZWFkX3VwZGF0ZShsZXZlbHMsIHVwZGF0ZXMpIHtcbiAgICBjb25zdCB1cGRhdGUgPSB7fTtcbiAgICBjb25zdCB0b19udWxsX291dCA9IHt9O1xuICAgIGNvbnN0IGFjY291bnRlZF9mb3IgPSB7ICQkc2NvcGU6IDEgfTtcbiAgICBsZXQgaSA9IGxldmVscy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICBjb25zdCBvID0gbGV2ZWxzW2ldO1xuICAgICAgICBjb25zdCBuID0gdXBkYXRlc1tpXTtcbiAgICAgICAgaWYgKG4pIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG8pIHtcbiAgICAgICAgICAgICAgICBpZiAoIShrZXkgaW4gbikpXG4gICAgICAgICAgICAgICAgICAgIHRvX251bGxfb3V0W2tleV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbikge1xuICAgICAgICAgICAgICAgIGlmICghYWNjb3VudGVkX2ZvcltrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVtrZXldID0gbltrZXldO1xuICAgICAgICAgICAgICAgICAgICBhY2NvdW50ZWRfZm9yW2tleV0gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldmVsc1tpXSA9IG47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvKSB7XG4gICAgICAgICAgICAgICAgYWNjb3VudGVkX2ZvcltrZXldID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0b19udWxsX291dCkge1xuICAgICAgICBpZiAoIShrZXkgaW4gdXBkYXRlKSlcbiAgICAgICAgICAgIHVwZGF0ZVtrZXldID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gdXBkYXRlO1xufVxuZnVuY3Rpb24gZ2V0X3NwcmVhZF9vYmplY3Qoc3ByZWFkX3Byb3BzKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBzcHJlYWRfcHJvcHMgPT09ICdvYmplY3QnICYmIHNwcmVhZF9wcm9wcyAhPT0gbnVsbCA/IHNwcmVhZF9wcm9wcyA6IHt9O1xufVxuXG4vLyBzb3VyY2U6IGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2luZGljZXMuaHRtbFxuY29uc3QgYm9vbGVhbl9hdHRyaWJ1dGVzID0gbmV3IFNldChbXG4gICAgJ2FsbG93ZnVsbHNjcmVlbicsXG4gICAgJ2FsbG93cGF5bWVudHJlcXVlc3QnLFxuICAgICdhc3luYycsXG4gICAgJ2F1dG9mb2N1cycsXG4gICAgJ2F1dG9wbGF5JyxcbiAgICAnY2hlY2tlZCcsXG4gICAgJ2NvbnRyb2xzJyxcbiAgICAnZGVmYXVsdCcsXG4gICAgJ2RlZmVyJyxcbiAgICAnZGlzYWJsZWQnLFxuICAgICdmb3Jtbm92YWxpZGF0ZScsXG4gICAgJ2hpZGRlbicsXG4gICAgJ2lzbWFwJyxcbiAgICAnbG9vcCcsXG4gICAgJ211bHRpcGxlJyxcbiAgICAnbXV0ZWQnLFxuICAgICdub21vZHVsZScsXG4gICAgJ25vdmFsaWRhdGUnLFxuICAgICdvcGVuJyxcbiAgICAncGxheXNpbmxpbmUnLFxuICAgICdyZWFkb25seScsXG4gICAgJ3JlcXVpcmVkJyxcbiAgICAncmV2ZXJzZWQnLFxuICAgICdzZWxlY3RlZCdcbl0pO1xuXG5jb25zdCBpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3RlciA9IC9bXFxzJ1wiPi89XFx1e0ZERDB9LVxcdXtGREVGfVxcdXtGRkZFfVxcdXtGRkZGfVxcdXsxRkZGRX1cXHV7MUZGRkZ9XFx1ezJGRkZFfVxcdXsyRkZGRn1cXHV7M0ZGRkV9XFx1ezNGRkZGfVxcdXs0RkZGRX1cXHV7NEZGRkZ9XFx1ezVGRkZFfVxcdXs1RkZGRn1cXHV7NkZGRkV9XFx1ezZGRkZGfVxcdXs3RkZGRX1cXHV7N0ZGRkZ9XFx1ezhGRkZFfVxcdXs4RkZGRn1cXHV7OUZGRkV9XFx1ezlGRkZGfVxcdXtBRkZGRX1cXHV7QUZGRkZ9XFx1e0JGRkZFfVxcdXtCRkZGRn1cXHV7Q0ZGRkV9XFx1e0NGRkZGfVxcdXtERkZGRX1cXHV7REZGRkZ9XFx1e0VGRkZFfVxcdXtFRkZGRn1cXHV7RkZGRkV9XFx1e0ZGRkZGfVxcdXsxMEZGRkV9XFx1ezEwRkZGRn1dL3U7XG4vLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zeW50YXguaHRtbCNhdHRyaWJ1dGVzLTJcbi8vIGh0dHBzOi8vaW5mcmEuc3BlYy53aGF0d2cub3JnLyNub25jaGFyYWN0ZXJcbmZ1bmN0aW9uIHNwcmVhZChhcmdzLCBjbGFzc2VzX3RvX2FkZCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LCAuLi5hcmdzKTtcbiAgICBpZiAoY2xhc3Nlc190b19hZGQpIHtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMuY2xhc3MgPT0gbnVsbCkge1xuICAgICAgICAgICAgYXR0cmlidXRlcy5jbGFzcyA9IGNsYXNzZXNfdG9fYWRkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXR0cmlidXRlcy5jbGFzcyArPSAnICcgKyBjbGFzc2VzX3RvX2FkZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3RyID0gJyc7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgaWYgKGludmFsaWRfYXR0cmlidXRlX25hbWVfY2hhcmFjdGVyLnRlc3QobmFtZSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXR0cmlidXRlc1tuYW1lXTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKVxuICAgICAgICAgICAgc3RyICs9IFwiIFwiICsgbmFtZTtcbiAgICAgICAgZWxzZSBpZiAoYm9vbGVhbl9hdHRyaWJ1dGVzLmhhcyhuYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUpXG4gICAgICAgICAgICAgICAgc3RyICs9IFwiIFwiICsgbmFtZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdHIgKz0gYCAke25hbWV9PVwiJHtTdHJpbmcodmFsdWUpLnJlcGxhY2UoL1wiL2csICcmIzM0OycpLnJlcGxhY2UoLycvZywgJyYjMzk7Jyl9XCJgO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHN0cjtcbn1cbmNvbnN0IGVzY2FwZWQgPSB7XG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgXCInXCI6ICcmIzM5OycsXG4gICAgJyYnOiAnJmFtcDsnLFxuICAgICc8JzogJyZsdDsnLFxuICAgICc+JzogJyZndDsnXG59O1xuZnVuY3Rpb24gZXNjYXBlKGh0bWwpIHtcbiAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoL1tcIicmPD5dL2csIG1hdGNoID0+IGVzY2FwZWRbbWF0Y2hdKTtcbn1cbmZ1bmN0aW9uIGVhY2goaXRlbXMsIGZuKSB7XG4gICAgbGV0IHN0ciA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgc3RyICs9IGZuKGl0ZW1zW2ldLCBpKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cbmNvbnN0IG1pc3NpbmdfY29tcG9uZW50ID0ge1xuICAgICQkcmVuZGVyOiAoKSA9PiAnJ1xufTtcbmZ1bmN0aW9uIHZhbGlkYXRlX2NvbXBvbmVudChjb21wb25lbnQsIG5hbWUpIHtcbiAgICBpZiAoIWNvbXBvbmVudCB8fCAhY29tcG9uZW50LiQkcmVuZGVyKSB7XG4gICAgICAgIGlmIChuYW1lID09PSAnc3ZlbHRlOmNvbXBvbmVudCcpXG4gICAgICAgICAgICBuYW1lICs9ICcgdGhpcz17Li4ufSc7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgPCR7bmFtZX0+IGlzIG5vdCBhIHZhbGlkIFNTUiBjb21wb25lbnQuIFlvdSBtYXkgbmVlZCB0byByZXZpZXcgeW91ciBidWlsZCBjb25maWcgdG8gZW5zdXJlIHRoYXQgZGVwZW5kZW5jaWVzIGFyZSBjb21waWxlZCwgcmF0aGVyIHRoYW4gaW1wb3J0ZWQgYXMgcHJlLWNvbXBpbGVkIG1vZHVsZXNgKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbn1cbmZ1bmN0aW9uIGRlYnVnKGZpbGUsIGxpbmUsIGNvbHVtbiwgdmFsdWVzKSB7XG4gICAgY29uc29sZS5sb2coYHtAZGVidWd9ICR7ZmlsZSA/IGZpbGUgKyAnICcgOiAnJ30oJHtsaW5lfToke2NvbHVtbn0pYCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKHZhbHVlcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIHJldHVybiAnJztcbn1cbmxldCBvbl9kZXN0cm95O1xuZnVuY3Rpb24gY3JlYXRlX3Nzcl9jb21wb25lbnQoZm4pIHtcbiAgICBmdW5jdGlvbiAkJHJlbmRlcihyZXN1bHQsIHByb3BzLCBiaW5kaW5ncywgc2xvdHMpIHtcbiAgICAgICAgY29uc3QgcGFyZW50X2NvbXBvbmVudCA9IGN1cnJlbnRfY29tcG9uZW50O1xuICAgICAgICBjb25zdCAkJCA9IHtcbiAgICAgICAgICAgIG9uX2Rlc3Ryb3ksXG4gICAgICAgICAgICBjb250ZXh0OiBuZXcgTWFwKHBhcmVudF9jb21wb25lbnQgPyBwYXJlbnRfY29tcG9uZW50LiQkLmNvbnRleHQgOiBbXSksXG4gICAgICAgICAgICAvLyB0aGVzZSB3aWxsIGJlIGltbWVkaWF0ZWx5IGRpc2NhcmRlZFxuICAgICAgICAgICAgb25fbW91bnQ6IFtdLFxuICAgICAgICAgICAgYmVmb3JlX3VwZGF0ZTogW10sXG4gICAgICAgICAgICBhZnRlcl91cGRhdGU6IFtdLFxuICAgICAgICAgICAgY2FsbGJhY2tzOiBibGFua19vYmplY3QoKVxuICAgICAgICB9O1xuICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoeyAkJCB9KTtcbiAgICAgICAgY29uc3QgaHRtbCA9IGZuKHJlc3VsdCwgcHJvcHMsIGJpbmRpbmdzLCBzbG90cyk7XG4gICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChwYXJlbnRfY29tcG9uZW50KTtcbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHJlbmRlcjogKHByb3BzID0ge30sIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgICAgICAgICAgb25fZGVzdHJveSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geyB0aXRsZTogJycsIGhlYWQ6ICcnLCBjc3M6IG5ldyBTZXQoKSB9O1xuICAgICAgICAgICAgY29uc3QgaHRtbCA9ICQkcmVuZGVyKHJlc3VsdCwgcHJvcHMsIHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgIHJ1bl9hbGwob25fZGVzdHJveSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGh0bWwsXG4gICAgICAgICAgICAgICAgY3NzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IEFycmF5LmZyb20ocmVzdWx0LmNzcykubWFwKGNzcyA9PiBjc3MuY29kZSkuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIG1hcDogbnVsbCAvLyBUT0RPXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoZWFkOiByZXN1bHQudGl0bGUgKyByZXN1bHQuaGVhZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgJCRyZW5kZXJcbiAgICB9O1xufVxuZnVuY3Rpb24gYWRkX2F0dHJpYnV0ZShuYW1lLCB2YWx1ZSwgYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IChib29sZWFuICYmICF2YWx1ZSkpXG4gICAgICAgIHJldHVybiAnJztcbiAgICByZXR1cm4gYCAke25hbWV9JHt2YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogYD0ke3R5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyBKU09OLnN0cmluZ2lmeShlc2NhcGUodmFsdWUpKSA6IGBcIiR7dmFsdWV9XCJgfWB9YDtcbn1cbmZ1bmN0aW9uIGFkZF9jbGFzc2VzKGNsYXNzZXMpIHtcbiAgICByZXR1cm4gY2xhc3NlcyA/IGAgY2xhc3M9XCIke2NsYXNzZXN9XCJgIDogYGA7XG59XG5cbmZ1bmN0aW9uIGJpbmQoY29tcG9uZW50LCBuYW1lLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGluZGV4ID0gY29tcG9uZW50LiQkLnByb3BzW25hbWVdO1xuICAgIGlmIChpbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbXBvbmVudC4kJC5ib3VuZFtpbmRleF0gPSBjYWxsYmFjaztcbiAgICAgICAgY2FsbGJhY2soY29tcG9uZW50LiQkLmN0eFtpbmRleF0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZV9jb21wb25lbnQoYmxvY2spIHtcbiAgICBibG9jayAmJiBibG9jay5jKCk7XG59XG5mdW5jdGlvbiBjbGFpbV9jb21wb25lbnQoYmxvY2ssIHBhcmVudF9ub2Rlcykge1xuICAgIGJsb2NrICYmIGJsb2NrLmwocGFyZW50X25vZGVzKTtcbn1cbmZ1bmN0aW9uIG1vdW50X2NvbXBvbmVudChjb21wb25lbnQsIHRhcmdldCwgYW5jaG9yKSB7XG4gICAgY29uc3QgeyBmcmFnbWVudCwgb25fbW91bnQsIG9uX2Rlc3Ryb3ksIGFmdGVyX3VwZGF0ZSB9ID0gY29tcG9uZW50LiQkO1xuICAgIGZyYWdtZW50ICYmIGZyYWdtZW50Lm0odGFyZ2V0LCBhbmNob3IpO1xuICAgIC8vIG9uTW91bnQgaGFwcGVucyBiZWZvcmUgdGhlIGluaXRpYWwgYWZ0ZXJVcGRhdGVcbiAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3X29uX2Rlc3Ryb3kgPSBvbl9tb3VudC5tYXAocnVuKS5maWx0ZXIoaXNfZnVuY3Rpb24pO1xuICAgICAgICBpZiAob25fZGVzdHJveSkge1xuICAgICAgICAgICAgb25fZGVzdHJveS5wdXNoKC4uLm5ld19vbl9kZXN0cm95KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIEVkZ2UgY2FzZSAtIGNvbXBvbmVudCB3YXMgZGVzdHJveWVkIGltbWVkaWF0ZWx5LFxuICAgICAgICAgICAgLy8gbW9zdCBsaWtlbHkgYXMgYSByZXN1bHQgb2YgYSBiaW5kaW5nIGluaXRpYWxpc2luZ1xuICAgICAgICAgICAgcnVuX2FsbChuZXdfb25fZGVzdHJveSk7XG4gICAgICAgIH1cbiAgICAgICAgY29tcG9uZW50LiQkLm9uX21vdW50ID0gW107XG4gICAgfSk7XG4gICAgYWZ0ZXJfdXBkYXRlLmZvckVhY2goYWRkX3JlbmRlcl9jYWxsYmFjayk7XG59XG5mdW5jdGlvbiBkZXN0cm95X2NvbXBvbmVudChjb21wb25lbnQsIGRldGFjaGluZykge1xuICAgIGNvbnN0ICQkID0gY29tcG9uZW50LiQkO1xuICAgIGlmICgkJC5mcmFnbWVudCAhPT0gbnVsbCkge1xuICAgICAgICBydW5fYWxsKCQkLm9uX2Rlc3Ryb3kpO1xuICAgICAgICAkJC5mcmFnbWVudCAmJiAkJC5mcmFnbWVudC5kKGRldGFjaGluZyk7XG4gICAgICAgIC8vIFRPRE8gbnVsbCBvdXQgb3RoZXIgcmVmcywgaW5jbHVkaW5nIGNvbXBvbmVudC4kJCAoYnV0IG5lZWQgdG9cbiAgICAgICAgLy8gcHJlc2VydmUgZmluYWwgc3RhdGU/KVxuICAgICAgICAkJC5vbl9kZXN0cm95ID0gJCQuZnJhZ21lbnQgPSBudWxsO1xuICAgICAgICAkJC5jdHggPSBbXTtcbiAgICB9XG59XG5mdW5jdGlvbiBtYWtlX2RpcnR5KGNvbXBvbmVudCwgaSkge1xuICAgIGlmIChjb21wb25lbnQuJCQuZGlydHlbMF0gPT09IC0xKSB7XG4gICAgICAgIGRpcnR5X2NvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuICAgICAgICBzY2hlZHVsZV91cGRhdGUoKTtcbiAgICAgICAgY29tcG9uZW50LiQkLmRpcnR5LmZpbGwoMCk7XG4gICAgfVxuICAgIGNvbXBvbmVudC4kJC5kaXJ0eVsoaSAvIDMxKSB8IDBdIHw9ICgxIDw8IChpICUgMzEpKTtcbn1cbmZ1bmN0aW9uIGluaXQoY29tcG9uZW50LCBvcHRpb25zLCBpbnN0YW5jZSwgY3JlYXRlX2ZyYWdtZW50LCBub3RfZXF1YWwsIHByb3BzLCBkaXJ0eSA9IFstMV0pIHtcbiAgICBjb25zdCBwYXJlbnRfY29tcG9uZW50ID0gY3VycmVudF9jb21wb25lbnQ7XG4gICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgY29uc3QgcHJvcF92YWx1ZXMgPSBvcHRpb25zLnByb3BzIHx8IHt9O1xuICAgIGNvbnN0ICQkID0gY29tcG9uZW50LiQkID0ge1xuICAgICAgICBmcmFnbWVudDogbnVsbCxcbiAgICAgICAgY3R4OiBudWxsLFxuICAgICAgICAvLyBzdGF0ZVxuICAgICAgICBwcm9wcyxcbiAgICAgICAgdXBkYXRlOiBub29wLFxuICAgICAgICBub3RfZXF1YWwsXG4gICAgICAgIGJvdW5kOiBibGFua19vYmplY3QoKSxcbiAgICAgICAgLy8gbGlmZWN5Y2xlXG4gICAgICAgIG9uX21vdW50OiBbXSxcbiAgICAgICAgb25fZGVzdHJveTogW10sXG4gICAgICAgIGJlZm9yZV91cGRhdGU6IFtdLFxuICAgICAgICBhZnRlcl91cGRhdGU6IFtdLFxuICAgICAgICBjb250ZXh0OiBuZXcgTWFwKHBhcmVudF9jb21wb25lbnQgPyBwYXJlbnRfY29tcG9uZW50LiQkLmNvbnRleHQgOiBbXSksXG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgZWxzZVxuICAgICAgICBjYWxsYmFja3M6IGJsYW5rX29iamVjdCgpLFxuICAgICAgICBkaXJ0eSxcbiAgICAgICAgc2tpcF9ib3VuZDogZmFsc2VcbiAgICB9O1xuICAgIGxldCByZWFkeSA9IGZhbHNlO1xuICAgICQkLmN0eCA9IGluc3RhbmNlXG4gICAgICAgID8gaW5zdGFuY2UoY29tcG9uZW50LCBwcm9wX3ZhbHVlcywgKGksIHJldCwgLi4ucmVzdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSByZXN0Lmxlbmd0aCA/IHJlc3RbMF0gOiByZXQ7XG4gICAgICAgICAgICBpZiAoJCQuY3R4ICYmIG5vdF9lcXVhbCgkJC5jdHhbaV0sICQkLmN0eFtpXSA9IHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICghJCQuc2tpcF9ib3VuZCAmJiAkJC5ib3VuZFtpXSlcbiAgICAgICAgICAgICAgICAgICAgJCQuYm91bmRbaV0odmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChyZWFkeSlcbiAgICAgICAgICAgICAgICAgICAgbWFrZV9kaXJ0eShjb21wb25lbnQsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSlcbiAgICAgICAgOiBbXTtcbiAgICAkJC51cGRhdGUoKTtcbiAgICByZWFkeSA9IHRydWU7XG4gICAgcnVuX2FsbCgkJC5iZWZvcmVfdXBkYXRlKTtcbiAgICAvLyBgZmFsc2VgIGFzIGEgc3BlY2lhbCBjYXNlIG9mIG5vIERPTSBjb21wb25lbnRcbiAgICAkJC5mcmFnbWVudCA9IGNyZWF0ZV9mcmFnbWVudCA/IGNyZWF0ZV9mcmFnbWVudCgkJC5jdHgpIDogZmFsc2U7XG4gICAgaWYgKG9wdGlvbnMudGFyZ2V0KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmh5ZHJhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzID0gY2hpbGRyZW4ob3B0aW9ucy50YXJnZXQpO1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50Lmwobm9kZXMpO1xuICAgICAgICAgICAgbm9kZXMuZm9yRWFjaChkZXRhY2gpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50LmMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5pbnRybylcbiAgICAgICAgICAgIHRyYW5zaXRpb25faW4oY29tcG9uZW50LiQkLmZyYWdtZW50KTtcbiAgICAgICAgbW91bnRfY29tcG9uZW50KGNvbXBvbmVudCwgb3B0aW9ucy50YXJnZXQsIG9wdGlvbnMuYW5jaG9yKTtcbiAgICAgICAgZmx1c2goKTtcbiAgICB9XG4gICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHBhcmVudF9jb21wb25lbnQpO1xufVxubGV0IFN2ZWx0ZUVsZW1lbnQ7XG5pZiAodHlwZW9mIEhUTUxFbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgU3ZlbHRlRWxlbWVudCA9IGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogaW1wcm92ZSB0eXBpbmdzXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLiQkLnNsb3R0ZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIHRvZG86IGltcHJvdmUgdHlwaW5nc1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy4kJC5zbG90dGVkW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyLCBfb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzW2F0dHJdID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgJGRlc3Ryb3koKSB7XG4gICAgICAgICAgICBkZXN0cm95X2NvbXBvbmVudCh0aGlzLCAxKTtcbiAgICAgICAgICAgIHRoaXMuJGRlc3Ryb3kgPSBub29wO1xuICAgICAgICB9XG4gICAgICAgICRvbih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgLy8gVE9ETyBzaG91bGQgdGhpcyBkZWxlZ2F0ZSB0byBhZGRFdmVudExpc3RlbmVyP1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdIHx8ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSA9IFtdKSk7XG4gICAgICAgICAgICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAkc2V0KCQkcHJvcHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLiQkc2V0ICYmICFpc19lbXB0eSgkJHByb3BzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJCQuc2tpcF9ib3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy4kJHNldCgkJHByb3BzKTtcbiAgICAgICAgICAgICAgICB0aGlzLiQkLnNraXBfYm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5jbGFzcyBTdmVsdGVDb21wb25lbnQge1xuICAgICRkZXN0cm95KCkge1xuICAgICAgICBkZXN0cm95X2NvbXBvbmVudCh0aGlzLCAxKTtcbiAgICAgICAgdGhpcy4kZGVzdHJveSA9IG5vb3A7XG4gICAgfVxuICAgICRvbih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBjYWxsYmFja3MgPSAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gfHwgKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdID0gW10pKTtcbiAgICAgICAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBjYWxsYmFja3MuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAkc2V0KCQkcHJvcHMpIHtcbiAgICAgICAgaWYgKHRoaXMuJCRzZXQgJiYgIWlzX2VtcHR5KCQkcHJvcHMpKSB7XG4gICAgICAgICAgICB0aGlzLiQkLnNraXBfYm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kJHNldCgkJHByb3BzKTtcbiAgICAgICAgICAgIHRoaXMuJCQuc2tpcF9ib3VuZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaF9kZXYodHlwZSwgZGV0YWlsKSB7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjdXN0b21fZXZlbnQodHlwZSwgT2JqZWN0LmFzc2lnbih7IHZlcnNpb246ICczLjI0LjEnIH0sIGRldGFpbCkpKTtcbn1cbmZ1bmN0aW9uIGFwcGVuZF9kZXYodGFyZ2V0LCBub2RlKSB7XG4gICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NSW5zZXJ0XCIsIHsgdGFyZ2V0LCBub2RlIH0pO1xuICAgIGFwcGVuZCh0YXJnZXQsIG5vZGUpO1xufVxuZnVuY3Rpb24gaW5zZXJ0X2Rldih0YXJnZXQsIG5vZGUsIGFuY2hvcikge1xuICAgIGRpc3BhdGNoX2RldihcIlN2ZWx0ZURPTUluc2VydFwiLCB7IHRhcmdldCwgbm9kZSwgYW5jaG9yIH0pO1xuICAgIGluc2VydCh0YXJnZXQsIG5vZGUsIGFuY2hvcik7XG59XG5mdW5jdGlvbiBkZXRhY2hfZGV2KG5vZGUpIHtcbiAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01SZW1vdmVcIiwgeyBub2RlIH0pO1xuICAgIGRldGFjaChub2RlKTtcbn1cbmZ1bmN0aW9uIGRldGFjaF9iZXR3ZWVuX2RldihiZWZvcmUsIGFmdGVyKSB7XG4gICAgd2hpbGUgKGJlZm9yZS5uZXh0U2libGluZyAmJiBiZWZvcmUubmV4dFNpYmxpbmcgIT09IGFmdGVyKSB7XG4gICAgICAgIGRldGFjaF9kZXYoYmVmb3JlLm5leHRTaWJsaW5nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBkZXRhY2hfYmVmb3JlX2RldihhZnRlcikge1xuICAgIHdoaWxlIChhZnRlci5wcmV2aW91c1NpYmxpbmcpIHtcbiAgICAgICAgZGV0YWNoX2RldihhZnRlci5wcmV2aW91c1NpYmxpbmcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRldGFjaF9hZnRlcl9kZXYoYmVmb3JlKSB7XG4gICAgd2hpbGUgKGJlZm9yZS5uZXh0U2libGluZykge1xuICAgICAgICBkZXRhY2hfZGV2KGJlZm9yZS5uZXh0U2libGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gbGlzdGVuX2Rldihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucywgaGFzX3ByZXZlbnRfZGVmYXVsdCwgaGFzX3N0b3BfcHJvcGFnYXRpb24pIHtcbiAgICBjb25zdCBtb2RpZmllcnMgPSBvcHRpb25zID09PSB0cnVlID8gW1wiY2FwdHVyZVwiXSA6IG9wdGlvbnMgPyBBcnJheS5mcm9tKE9iamVjdC5rZXlzKG9wdGlvbnMpKSA6IFtdO1xuICAgIGlmIChoYXNfcHJldmVudF9kZWZhdWx0KVxuICAgICAgICBtb2RpZmllcnMucHVzaCgncHJldmVudERlZmF1bHQnKTtcbiAgICBpZiAoaGFzX3N0b3BfcHJvcGFnYXRpb24pXG4gICAgICAgIG1vZGlmaWVycy5wdXNoKCdzdG9wUHJvcGFnYXRpb24nKTtcbiAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01BZGRFdmVudExpc3RlbmVyXCIsIHsgbm9kZSwgZXZlbnQsIGhhbmRsZXIsIG1vZGlmaWVycyB9KTtcbiAgICBjb25zdCBkaXNwb3NlID0gbGlzdGVuKG5vZGUsIGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01SZW1vdmVFdmVudExpc3RlbmVyXCIsIHsgbm9kZSwgZXZlbnQsIGhhbmRsZXIsIG1vZGlmaWVycyB9KTtcbiAgICAgICAgZGlzcG9zZSgpO1xuICAgIH07XG59XG5mdW5jdGlvbiBhdHRyX2Rldihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NUmVtb3ZlQXR0cmlidXRlXCIsIHsgbm9kZSwgYXR0cmlidXRlIH0pO1xuICAgIGVsc2VcbiAgICAgICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NU2V0QXR0cmlidXRlXCIsIHsgbm9kZSwgYXR0cmlidXRlLCB2YWx1ZSB9KTtcbn1cbmZ1bmN0aW9uIHByb3BfZGV2KG5vZGUsIHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIG5vZGVbcHJvcGVydHldID0gdmFsdWU7XG4gICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NU2V0UHJvcGVydHlcIiwgeyBub2RlLCBwcm9wZXJ0eSwgdmFsdWUgfSk7XG59XG5mdW5jdGlvbiBkYXRhc2V0X2Rldihub2RlLCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICBub2RlLmRhdGFzZXRbcHJvcGVydHldID0gdmFsdWU7XG4gICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NU2V0RGF0YXNldFwiLCB7IG5vZGUsIHByb3BlcnR5LCB2YWx1ZSB9KTtcbn1cbmZ1bmN0aW9uIHNldF9kYXRhX2Rldih0ZXh0LCBkYXRhKSB7XG4gICAgZGF0YSA9ICcnICsgZGF0YTtcbiAgICBpZiAodGV4dC53aG9sZVRleHQgPT09IGRhdGEpXG4gICAgICAgIHJldHVybjtcbiAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01TZXREYXRhXCIsIHsgbm9kZTogdGV4dCwgZGF0YSB9KTtcbiAgICB0ZXh0LmRhdGEgPSBkYXRhO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVfZWFjaF9hcmd1bWVudChhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ3N0cmluZycgJiYgIShhcmcgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgJ2xlbmd0aCcgaW4gYXJnKSkge1xuICAgICAgICBsZXQgbXNnID0gJ3sjZWFjaH0gb25seSBpdGVyYXRlcyBvdmVyIGFycmF5LWxpa2Ugb2JqZWN0cy4nO1xuICAgICAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBhcmcgJiYgU3ltYm9sLml0ZXJhdG9yIGluIGFyZykge1xuICAgICAgICAgICAgbXNnICs9ICcgWW91IGNhbiB1c2UgYSBzcHJlYWQgdG8gY29udmVydCB0aGlzIGl0ZXJhYmxlIGludG8gYW4gYXJyYXkuJztcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG59XG5mdW5jdGlvbiB2YWxpZGF0ZV9zbG90cyhuYW1lLCBzbG90LCBrZXlzKSB7XG4gICAgZm9yIChjb25zdCBzbG90X2tleSBvZiBPYmplY3Qua2V5cyhzbG90KSkge1xuICAgICAgICBpZiAoIX5rZXlzLmluZGV4T2Yoc2xvdF9rZXkpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYDwke25hbWV9PiByZWNlaXZlZCBhbiB1bmV4cGVjdGVkIHNsb3QgXCIke3Nsb3Rfa2V5fVwiLmApO1xuICAgICAgICB9XG4gICAgfVxufVxuY2xhc3MgU3ZlbHRlQ29tcG9uZW50RGV2IGV4dGVuZHMgU3ZlbHRlQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucyB8fCAoIW9wdGlvbnMudGFyZ2V0ICYmICFvcHRpb25zLiQkaW5saW5lKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAndGFyZ2V0JyBpcyBhIHJlcXVpcmVkIG9wdGlvbmApO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuICAgICRkZXN0cm95KCkge1xuICAgICAgICBzdXBlci4kZGVzdHJveSgpO1xuICAgICAgICB0aGlzLiRkZXN0cm95ID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBDb21wb25lbnQgd2FzIGFscmVhZHkgZGVzdHJveWVkYCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgICB9O1xuICAgIH1cbiAgICAkY2FwdHVyZV9zdGF0ZSgpIHsgfVxuICAgICRpbmplY3Rfc3RhdGUoKSB7IH1cbn1cbmZ1bmN0aW9uIGxvb3BfZ3VhcmQodGltZW91dCkge1xuICAgIGNvbnN0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoRGF0ZS5ub3coKSAtIHN0YXJ0ID4gdGltZW91dCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbmZpbml0ZSBsb29wIGRldGVjdGVkYCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgeyBIdG1sVGFnLCBTdmVsdGVDb21wb25lbnQsIFN2ZWx0ZUNvbXBvbmVudERldiwgU3ZlbHRlRWxlbWVudCwgYWN0aW9uX2Rlc3Ryb3llciwgYWRkX2F0dHJpYnV0ZSwgYWRkX2NsYXNzZXMsIGFkZF9mbHVzaF9jYWxsYmFjaywgYWRkX2xvY2F0aW9uLCBhZGRfcmVuZGVyX2NhbGxiYWNrLCBhZGRfcmVzaXplX2xpc3RlbmVyLCBhZGRfdHJhbnNmb3JtLCBhZnRlclVwZGF0ZSwgYXBwZW5kLCBhcHBlbmRfZGV2LCBhc3NpZ24sIGF0dHIsIGF0dHJfZGV2LCBiZWZvcmVVcGRhdGUsIGJpbmQsIGJpbmRpbmdfY2FsbGJhY2tzLCBibGFua19vYmplY3QsIGJ1YmJsZSwgY2hlY2tfb3V0cm9zLCBjaGlsZHJlbiwgY2xhaW1fY29tcG9uZW50LCBjbGFpbV9lbGVtZW50LCBjbGFpbV9zcGFjZSwgY2xhaW1fdGV4dCwgY2xlYXJfbG9vcHMsIGNvbXBvbmVudF9zdWJzY3JpYmUsIGNvbXB1dGVfcmVzdF9wcm9wcywgY3JlYXRlRXZlbnREaXNwYXRjaGVyLCBjcmVhdGVfYW5pbWF0aW9uLCBjcmVhdGVfYmlkaXJlY3Rpb25hbF90cmFuc2l0aW9uLCBjcmVhdGVfY29tcG9uZW50LCBjcmVhdGVfaW5fdHJhbnNpdGlvbiwgY3JlYXRlX291dF90cmFuc2l0aW9uLCBjcmVhdGVfc2xvdCwgY3JlYXRlX3Nzcl9jb21wb25lbnQsIGN1cnJlbnRfY29tcG9uZW50LCBjdXN0b21fZXZlbnQsIGRhdGFzZXRfZGV2LCBkZWJ1ZywgZGVzdHJveV9ibG9jaywgZGVzdHJveV9jb21wb25lbnQsIGRlc3Ryb3lfZWFjaCwgZGV0YWNoLCBkZXRhY2hfYWZ0ZXJfZGV2LCBkZXRhY2hfYmVmb3JlX2RldiwgZGV0YWNoX2JldHdlZW5fZGV2LCBkZXRhY2hfZGV2LCBkaXJ0eV9jb21wb25lbnRzLCBkaXNwYXRjaF9kZXYsIGVhY2gsIGVsZW1lbnQsIGVsZW1lbnRfaXMsIGVtcHR5LCBlc2NhcGUsIGVzY2FwZWQsIGV4Y2x1ZGVfaW50ZXJuYWxfcHJvcHMsIGZpeF9hbmRfZGVzdHJveV9ibG9jaywgZml4X2FuZF9vdXRyb19hbmRfZGVzdHJveV9ibG9jaywgZml4X3Bvc2l0aW9uLCBmbHVzaCwgZ2V0Q29udGV4dCwgZ2V0X2JpbmRpbmdfZ3JvdXBfdmFsdWUsIGdldF9jdXJyZW50X2NvbXBvbmVudCwgZ2V0X3Nsb3RfY2hhbmdlcywgZ2V0X3Nsb3RfY29udGV4dCwgZ2V0X3NwcmVhZF9vYmplY3QsIGdldF9zcHJlYWRfdXBkYXRlLCBnZXRfc3RvcmVfdmFsdWUsIGdsb2JhbHMsIGdyb3VwX291dHJvcywgaGFuZGxlX3Byb21pc2UsIGhhc19wcm9wLCBpZGVudGl0eSwgaW5pdCwgaW5zZXJ0LCBpbnNlcnRfZGV2LCBpbnRyb3MsIGludmFsaWRfYXR0cmlidXRlX25hbWVfY2hhcmFjdGVyLCBpc19jbGllbnQsIGlzX2Nyb3Nzb3JpZ2luLCBpc19lbXB0eSwgaXNfZnVuY3Rpb24sIGlzX3Byb21pc2UsIGxpc3RlbiwgbGlzdGVuX2RldiwgbG9vcCwgbG9vcF9ndWFyZCwgbWlzc2luZ19jb21wb25lbnQsIG1vdW50X2NvbXBvbmVudCwgbm9vcCwgbm90X2VxdWFsLCBub3csIG51bGxfdG9fZW1wdHksIG9iamVjdF93aXRob3V0X3Byb3BlcnRpZXMsIG9uRGVzdHJveSwgb25Nb3VudCwgb25jZSwgb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2ssIHByZXZlbnRfZGVmYXVsdCwgcHJvcF9kZXYsIHF1ZXJ5X3NlbGVjdG9yX2FsbCwgcmFmLCBydW4sIHJ1bl9hbGwsIHNhZmVfbm90X2VxdWFsLCBzY2hlZHVsZV91cGRhdGUsIHNlbGVjdF9tdWx0aXBsZV92YWx1ZSwgc2VsZWN0X29wdGlvbiwgc2VsZWN0X29wdGlvbnMsIHNlbGVjdF92YWx1ZSwgc2VsZiwgc2V0Q29udGV4dCwgc2V0X2F0dHJpYnV0ZXMsIHNldF9jdXJyZW50X2NvbXBvbmVudCwgc2V0X2N1c3RvbV9lbGVtZW50X2RhdGEsIHNldF9kYXRhLCBzZXRfZGF0YV9kZXYsIHNldF9pbnB1dF90eXBlLCBzZXRfaW5wdXRfdmFsdWUsIHNldF9ub3csIHNldF9yYWYsIHNldF9zdG9yZV92YWx1ZSwgc2V0X3N0eWxlLCBzZXRfc3ZnX2F0dHJpYnV0ZXMsIHNwYWNlLCBzcHJlYWQsIHN0b3BfcHJvcGFnYXRpb24sIHN1YnNjcmliZSwgc3ZnX2VsZW1lbnQsIHRleHQsIHRpY2ssIHRpbWVfcmFuZ2VzX3RvX2FycmF5LCB0b19udW1iZXIsIHRvZ2dsZV9jbGFzcywgdHJhbnNpdGlvbl9pbiwgdHJhbnNpdGlvbl9vdXQsIHVwZGF0ZV9rZXllZF9lYWNoLCB1cGRhdGVfc2xvdCwgdmFsaWRhdGVfY29tcG9uZW50LCB2YWxpZGF0ZV9lYWNoX2FyZ3VtZW50LCB2YWxpZGF0ZV9lYWNoX2tleXMsIHZhbGlkYXRlX3Nsb3RzLCB2YWxpZGF0ZV9zdG9yZSwgeGxpbmtfYXR0ciB9O1xuIiwiPHNjcmlwdD5cbmxldCBjbGF6eiA9ICcnO1xuZXhwb3J0IHsgY2xhenogYXMgY2xhc3MgfTtcbmV4cG9ydCBsZXQgaWQgPSAnJztcbmV4cG9ydCBsZXQgc3R5bGUgPSAnJztcblxuZXhwb3J0IGxldCBpY29uO1xuZXhwb3J0IGxldCBmdyA9IGZhbHNlO1xuZXhwb3J0IGxldCBmbGlwID0gZmFsc2U7XG5leHBvcnQgbGV0IHB1bGwgPSBmYWxzZTtcbmV4cG9ydCBsZXQgcm90YXRlID0gZmFsc2U7XG5leHBvcnQgbGV0IHNpemUgPSBmYWxzZTtcbmV4cG9ydCBsZXQgY29sb3IgPSAnJztcblxuLy8gRHVvdG9uZSBJY29uc1xuZXhwb3J0IGxldCBwcmltYXJ5Q29sb3IgPSAnJztcbmV4cG9ydCBsZXQgc2Vjb25kYXJ5Q29sb3IgPSAnJztcbmV4cG9ydCBsZXQgcHJpbWFyeU9wYWNpdHkgPSAxO1xuZXhwb3J0IGxldCBzZWNvbmRhcnlPcGFjaXR5ID0gMC40O1xuZXhwb3J0IGxldCBzd2FwT3BhY2l0eSA9IGZhbHNlO1xuXG5sZXQgaTtcbmxldCBzO1xubGV0IHRyYW5zZm9ybTtcblxuJDogaSA9IChpY29uICYmIGljb24uaWNvbikgfHwgWzAsIDAsICcnLCBbXSwgJyddO1xuXG4kOiB7XG4gIGxldCBmbG9hdDtcbiAgbGV0IHdpZHRoO1xuICBjb25zdCBoZWlnaHQgPSAnMWVtJztcbiAgbGV0IGxpbmVIZWlnaHQ7XG4gIGxldCBmb250U2l6ZTtcbiAgbGV0IHRleHRBbGlnbjtcbiAgbGV0IHZlcnRpY2FsQWxpZ24gPSAnLS4xMjVlbSc7XG4gIGNvbnN0IG92ZXJmbG93ID0gJ3Zpc2libGUnO1xuXG4gIGlmIChmdykge1xuICAgIHRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHdpZHRoID0gJzEuMjVlbSc7XG4gIH1cblxuICBpZiAocHVsbCkge1xuICAgIGZsb2F0ID0gcHVsbDtcbiAgfVxuXG4gIGlmIChzaXplKSB7XG4gICAgaWYgKHNpemUgPT0gJ2xnJykge1xuICAgICAgZm9udFNpemUgPSAnMS4zMzMzM2VtJztcbiAgICAgIGxpbmVIZWlnaHQgPSAnLjc1ZW0nO1xuICAgICAgdmVydGljYWxBbGlnbiA9ICctLjIyNWVtJztcbiAgICB9IGVsc2UgaWYgKHNpemUgPT0gJ3hzJykge1xuICAgICAgZm9udFNpemUgPSAnLjc1ZW0nO1xuICAgIH0gZWxzZSBpZiAoc2l6ZSA9PSAnc20nKSB7XG4gICAgICBmb250U2l6ZSA9ICcuODc1ZW0nO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb250U2l6ZSA9IHNpemUucmVwbGFjZSgneCcsICdlbScpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHN0eWxlT2JqID0ge1xuICAgIGZsb2F0LFxuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICAnbGluZS1oZWlnaHQnOiBsaW5lSGVpZ2h0LFxuICAgICdmb250LXNpemUnOiBmb250U2l6ZSxcbiAgICAndGV4dC1hbGlnbic6IHRleHRBbGlnbixcbiAgICAndmVydGljYWwtYWxpZ24nOiB2ZXJ0aWNhbEFsaWduLFxuICAgIG92ZXJmbG93LFxuICB9O1xuICBsZXQgc3R5bGVTdHIgPSAnJztcbiAgZm9yIChjb25zdCBwcm9wIGluIHN0eWxlT2JqKSB7XG4gICAgaWYgKHN0eWxlT2JqW3Byb3BdKSB7XG4gICAgICBzdHlsZVN0ciArPSBgJHtwcm9wfToke3N0eWxlT2JqW3Byb3BdfTtgO1xuICAgIH1cbiAgfVxuICBzID0gc3R5bGVTdHIgKyBzdHlsZTtcbn1cblxuJDoge1xuICBsZXQgdCA9ICcnO1xuXG4gIGlmIChmbGlwKSB7XG4gICAgbGV0IGZsaXBYID0gMTtcbiAgICBsZXQgZmxpcFkgPSAxO1xuICAgIGlmIChmbGlwID09ICdob3Jpem9udGFsJykge1xuICAgICAgZmxpcFggPSAtMTtcbiAgICB9IGVsc2UgaWYgKGZsaXAgPT0gJ3ZlcnRpY2FsJykge1xuICAgICAgZmxpcFkgPSAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmxpcFggPSBmbGlwWSA9IC0xO1xuICAgIH1cbiAgICB0ICs9IGAgc2NhbGUoJHtmbGlwWH0gJHtmbGlwWX0pYDtcbiAgfVxuXG4gIGlmIChyb3RhdGUpIHtcbiAgICB0ICs9IGAgcm90YXRlKCR7cm90YXRlfSAwIDApYDtcbiAgfVxuXG4gIHRyYW5zZm9ybSA9IHQ7XG59XG48L3NjcmlwdD5cblxueyNpZiBpWzRdfVxuICA8c3ZnXG4gICAgaWQ9e2lkfVxuICAgIGNsYXNzPXtjbGF6en1cbiAgICBzdHlsZT17c31cbiAgICB2aWV3Qm94PXtgMCAwICR7aVswXX0gJHtpWzFdfWB9XG4gICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICByb2xlPVwiaW1nXCJcbiAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgPlxuICAgIDxnXG4gICAgICB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMjU2IDI1NilcIlxuICAgID5cbiAgICAgIDxnIHt0cmFuc2Zvcm19PlxuICAgICAgICB7I2lmIHR5cGVvZiBpWzRdID09ICdzdHJpbmcnfVxuICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICBkPXtpWzRdfVxuICAgICAgICAgICAgZmlsbD17Y29sb3IgfHwgcHJpbWFyeUNvbG9yIHx8ICdjdXJyZW50Q29sb3InfVxuICAgICAgICAgICAgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC0yNTYgLTI1NilcIlxuICAgICAgICAgIC8+XG4gICAgICAgIHs6ZWxzZX1cbiAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgZD17aVs0XVswXX1cbiAgICAgICAgICAgIGZpbGw9e3NlY29uZGFyeUNvbG9yIHx8IGNvbG9yIHx8ICdjdXJyZW50Q29sb3InfVxuICAgICAgICAgICAgZmlsbC1vcGFjaXR5PXtzd2FwT3BhY2l0eSAhPSBmYWxzZSA/IHByaW1hcnlPcGFjaXR5IDogc2Vjb25kYXJ5T3BhY2l0eX1cbiAgICAgICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtMjU2IC0yNTYpXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICBkPXtpWzRdWzFdfVxuICAgICAgICAgICAgZmlsbD17cHJpbWFyeUNvbG9yIHx8IGNvbG9yIHx8ICdjdXJyZW50Q29sb3InfVxuICAgICAgICAgICAgZmlsbC1vcGFjaXR5PXtzd2FwT3BhY2l0eSAhPSBmYWxzZSA/IHNlY29uZGFyeU9wYWNpdHkgOiBwcmltYXJ5T3BhY2l0eX1cbiAgICAgICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtMjU2IC0yNTYpXCJcbiAgICAgICAgICAvPlxuICAgICAgICB7L2lmfVxuICAgICAgPC9nPlxuICAgIDwvZz5cbiAgPC9zdmc+XG57L2lmfVxuIiwiPHN2ZWx0ZTpoZWFkPlxuICA8dGl0bGU+bWVkaWNhbHVuaXRjb252ZXJ0ZXIuY29tPC90aXRsZT5cbiAgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD1cIk1lZGljYWwgdW5pdCBjb252ZXJzaW9uIGNhbGN1bGF0b3IsIG1lZGljYWx1bml0Y29udmVydGVyLmNvbS4gQ29udmVydCBVUyB1bml0cyB0byBJbnRlcm5hdGlvbmFsIChTSSkgdW5pdHMgZWFzaWx5IHdpdGggdGhpcyBvbmxuZSBjYWxjdWxhdG9yLiBFYXNpbHkgc2VhcmNoIGZvciBhIHNwZWNpZmljIGxhYiB0ZXN0LCBlbnRlciBhbnkgdmFsdWUgYW5kIGNvbnZlcnQgdGhlIHVuaXRzLiBGb3IgYm90aCBIdW1hbiBhbmQgVmV0ZXJpbmFyeSB2YWx1ZXMuXCI+XG4gIFxuXG48IS0tIEdsb2JhbCBzaXRlIHRhZyAoZ3RhZy5qcykgLSBHb29nbGUgQW5hbHl0aWNzIC0tPlxuPHNjcmlwdCBhc3luYyBzcmM9XCJodHRwczovL3d3dy5nb29nbGV0YWdtYW5hZ2VyLmNvbS9ndGFnL2pzP2lkPVVBLTI1NTcwMS0xOFwiPjwvc2NyaXB0PlxuPHNjcmlwdD5cbiAgd2luZG93LmRhdGFMYXllciA9IHdpbmRvdy5kYXRhTGF5ZXIgfHwgW107XG4gIGZ1bmN0aW9uIGd0YWcoKXtkYXRhTGF5ZXIucHVzaChhcmd1bWVudHMpO31cbiAgZ3RhZygnanMnLCBuZXcgRGF0ZSgpKTtcblxuICBndGFnKCdjb25maWcnLCAnVUEtMjU1NzAxLTE4Jyk7XG48L3NjcmlwdD5cbjwvc3ZlbHRlOmhlYWQ+XG5cblxuXG5cbjxzY3JpcHQ+XG4gIGltcG9ydCB7IGZhZGUsIGZseSB9IGZyb20gJ3N2ZWx0ZS90cmFuc2l0aW9uJztcbiAvL2ltcG9ydCBqJCBmcm9tICdqcXVlcnknO1xuLy9pbXBvcnQgeyBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJztcblxuLy9vbk1vdW50KCgpID0+IHtcbi8vICAgIGokKCcudGVzdCcpLmNsaWNrKCgpID0+IHtcbi8vICAgICAgICBjb25zb2xlLmxvZygndGVzdCcpO1xuIC8vICAgfSk7XG4vL30pO1xuXG5cbmxldCBzdGFydDtcbmxldCBlbmQ7XG5cbmxldCBuYW1lID0gJyc7XG5cbiAgbGV0IHVuaXRzID0gW3tcIm5hbWVcIjpcIkFjZXRhbWlub3BoZW5cIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMTAtMzBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9tTFwiLFwiZmFjdG9yXCI6XCI2LjYxNFwiLFwic2lSYW5nZVwiOlwiNjYtMjAwXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjY2XCIsXCJ1c1ZhbHVlXCI6XCIxMFwifSx7XCJuYW1lXCI6XCJBY2V0b2FjZXRhdGVcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiPDFcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjk3Ljk1XCIsXCJzaVJhbmdlXCI6XCI8MTAwXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjEwMFwiLFwidXNWYWx1ZVwiOlwiMVwifSx7XCJuYW1lXCI6XCJBY2V0b25lXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjwxLjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjAuMTcyXCIsXCJzaVJhbmdlXCI6XCI8MC4xN1wiLFwic2lVbml0XCI6XCJtbW9sL0xcIixcInNpVmFsdWVcIjpcIjAuMTdcIixcInVzVmFsdWVcIjpcIjEuMFwifSx7XCJuYW1lXCI6XCJBY2lkIHBob3NwaGF0YXNlXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI8NS41XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJVL0xcIixcImZhY3RvclwiOlwiMTYuNjY3XCIsXCJzaVJhbmdlXCI6XCI8OTBcIixcInNpVW5pdFwiOlwibmthdC9MXCIsXCJzaVZhbHVlXCI6XCI5MFwiLFwidXNWYWx1ZVwiOlwiNS41XCJ9LHtcIm5hbWVcIjpcIkFjdGl2YXRlZCBwYXJ0aWFsIHRocm9tYm9wbGFzdGluIHRpbWUgKEFQVFQpXCIsXCJzcGVjaW1lblwiOlwiV2hvbGUgYmxvb2RcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIyNS00MFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwic1wiLFwiZmFjdG9yXCI6XCIxXCIsXCJzaVJhbmdlXCI6XCIyNS00MFwiLFwic2lVbml0XCI6XCJzXCIsXCJzaVZhbHVlXCI6XCIyNVwiLFwidXNWYWx1ZVwiOlwiMjVcIn0se1wibmFtZVwiOlwiQWRlbm9zaW5lIGRlYW1pbmFzZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMTEuNS0yNS4wXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJVL0xcIixcImZhY3RvclwiOlwiMTYuNjY3XCIsXCJzaVJhbmdlXCI6XCIxOTAtNDIwXCIsXCJzaVVuaXRcIjpcIm5rYXQvTFwiLFwic2lWYWx1ZVwiOlwiMTkwXCIsXCJ1c1ZhbHVlXCI6XCIxMS41XCJ9LHtcIm5hbWVcIjpcIkFkcmVub2NvcnRpY290cm9waWMgaG9ybW9uZSAoQUNUSClcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI8MTIwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJwZy9tTFwiLFwiZmFjdG9yXCI6XCIwLjIyXCIsXCJzaVJhbmdlXCI6XCI8MjZcIixcInNpVW5pdFwiOlwicG1vbC9MXCIsXCJzaVZhbHVlXCI6XCIyNlwiLFwidXNWYWx1ZVwiOlwiMTIwXCJ9LHtcIm5hbWVcIjpcIkFsYW5pbmVcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxLjg3LTUuODlcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjExMi4yXCIsXCJzaVJhbmdlXCI6XCIyMTAtNjYxXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjIxMFwiLFwidXNWYWx1ZVwiOlwiMS44N1wifSx7XCJuYW1lXCI6XCJBbGFuaW5lIGFtaW5vdHJhbnNmZXJhc2UgKEFMVClcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjEwLTQwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJVL0xcIixcImZhY3RvclwiOlwiMC4wMTY3XCIsXCJzaVJhbmdlXCI6XCIwLjE3LTAuNjhcIixcInNpVW5pdFwiOlwiwrVrYXQvTFwiLFwic2lWYWx1ZVwiOlwiMC4xN1wiLFwidXNWYWx1ZVwiOlwiMTBcIn0se1wibmFtZVwiOlwiQWxidW1pblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMy41LTUuMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiZy9kTFwiLFwiZmFjdG9yXCI6XCIxMFwiLFwic2lSYW5nZVwiOlwiMzUtNTBcIixcInNpVW5pdFwiOlwiZy9MXCIsXCJzaVZhbHVlXCI6XCIzNVwiLFwidXNWYWx1ZVwiOlwiMy41XCJ9LHtcIm5hbWVcIjpcIkFsY29ob2wgZGVoeWRyb2dlbmFzZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiPDIuOFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiVS9MXCIsXCJmYWN0b3JcIjpcIjE2LjY2N1wiLFwic2lSYW5nZVwiOlwiPDQ3XCIsXCJzaVVuaXRcIjpcIm5rYXQvTFwiLFwic2lWYWx1ZVwiOlwiNDdcIixcInVzVmFsdWVcIjpcIjIuOFwifSx7XCJuYW1lXCI6XCJBbGRvbGFzZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMS4wLTcuNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiVS9MXCIsXCJmYWN0b3JcIjpcIjAuMDE2N1wiLFwic2lSYW5nZVwiOlwiMC4wMi0wLjEzXCIsXCJzaVVuaXRcIjpcIsK1a2F0L0xcIixcInNpVmFsdWVcIjpcIjAuMDJcIixcInVzVmFsdWVcIjpcIjEuMFwifSx7XCJuYW1lXCI6XCJBbGRvc3Rlcm9uZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIyLTlcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm5nL2RMXCIsXCJmYWN0b3JcIjpcIjI3Ljc0XCIsXCJzaVJhbmdlXCI6XCI1NS0yNTBcIixcInNpVW5pdFwiOlwicG1vbC9MXCIsXCJzaVZhbHVlXCI6XCI1NVwiLFwidXNWYWx1ZVwiOlwiMlwifSx7XCJuYW1lXCI6XCJBbGthbGluZSBwaG9zcGhhdGFzZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMzAtMTIwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJVL0xcIixcImZhY3RvclwiOlwiMC4wMTY3XCIsXCJzaVJhbmdlXCI6XCIwLjUtMi4wXCIsXCJzaVVuaXRcIjpcIsK1a2F0L0xcIixcInNpVmFsdWVcIjpcIjAuNVwiLFwidXNWYWx1ZVwiOlwiMzBcIn0se1wibmFtZVwiOlwiQWxwcmF6b2xhbVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxMC01MFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibmcvbUxcIixcImZhY3RvclwiOlwiMy4yNFwiLFwic2lSYW5nZVwiOlwiMzItMTYyXCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMzJcIixcInVzVmFsdWVcIjpcIjEwXCJ9LHtcIm5hbWVcIjpcIkFtaWthY2luXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjIwLTMwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvbUxcIixcImZhY3RvclwiOlwiMS43MDhcIixcInNpUmFuZ2VcIjpcIjM0LTUyXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjM0XCIsXCJ1c1ZhbHVlXCI6XCIyMFwifSx7XCJuYW1lXCI6XCLOsS1BbWlub2J1dHlyaWMgYWNpZFwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuMDgtMC4zNlwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvZExcIixcImZhY3RvclwiOlwiOTYuOTdcIixcInNpUmFuZ2VcIjpcIjgtMzVcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiOFwiLFwidXNWYWx1ZVwiOlwiMC4wOFwifSx7XCJuYW1lXCI6XCLOtC1BbWlub2xldnVsaW5pYyBhY2lkXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxNS0yM1wiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL2RMXCIsXCJmYWN0b3JcIjpcIjAuMDc2M1wiLFwic2lSYW5nZVwiOlwiMS4xLTguMFwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxLjFcIixcInVzVmFsdWVcIjpcIjE1XCJ9LHtcIm5hbWVcIjpcIkFtaW9kYXJvbmVcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC41LTIuNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjEuNTVcIixcInNpUmFuZ2VcIjpcIjAuOC0zLjlcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMC44XCIsXCJ1c1ZhbHVlXCI6XCIwLjVcIn0se1wibmFtZVwiOlwiQW1pdHJpcHR5bGluZVwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjEyMC0yNTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm5nL21MXCIsXCJmYWN0b3JcIjpcIjMuNjA1XCIsXCJzaVJhbmdlXCI6XCI0MzMtOTAzXCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiNDMzXCIsXCJ1c1ZhbHVlXCI6XCIxMjBcIn0se1wibmFtZVwiOlwiQW1tb25pYSAoYXMgbml0cm9nZW4pXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjE1LTQ1XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvZExcIixcImZhY3RvclwiOlwiMC43MTRcIixcInNpUmFuZ2VcIjpcIjExLTMyXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjExXCIsXCJ1c1ZhbHVlXCI6XCIxNVwifSx7XCJuYW1lXCI6XCJBbW9iYXJiaXRhbFwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMS01XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvbUxcIixcImZhY3RvclwiOlwiNC40MlwiLFwic2lSYW5nZVwiOlwiNC0yMlwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCI0XCIsXCJ1c1ZhbHVlXCI6XCIxXCJ9LHtcIm5hbWVcIjpcIkFtcGhldGFtaW5lXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjIwLTMwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJuZy9tTFwiLFwiZmFjdG9yXCI6XCI3LjRcIixcInNpUmFuZ2VcIjpcIjE0OC0yMjJcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxNDhcIixcInVzVmFsdWVcIjpcIjIwXCJ9LHtcIm5hbWVcIjpcIkFteWxhc2VcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjI3LTEzMVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiVS9MXCIsXCJmYWN0b3JcIjpcIjAuMDE2N1wiLFwic2lSYW5nZVwiOlwiMC40Ni0yLjIzXCIsXCJzaVVuaXRcIjpcIsK1a2F0L0xcIixcInNpVmFsdWVcIjpcIjAuNDZcIixcInVzVmFsdWVcIjpcIjI3XCJ9LHtcIm5hbWVcIjpcIkFuZHJvc3RlbmVkaW9uZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNzUtMjA1XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJuZy9kTFwiLFwiZmFjdG9yXCI6XCIwLjAzNDlcIixcInNpUmFuZ2VcIjpcIjIuNi03LjJcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCIyLjZcIixcInVzVmFsdWVcIjpcIjc1XCJ9LHtcIm5hbWVcIjpcIkFuZ2lvdGVuc2luIElcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI8MjVcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcInBnL21MXCIsXCJmYWN0b3JcIjpcIjAuNzcyXCIsXCJzaVJhbmdlXCI6XCI8MTVcIixcInNpVW5pdFwiOlwicG1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxNVwiLFwidXNWYWx1ZVwiOlwiMjVcIn0se1wibmFtZVwiOlwiQW5naW90ZW5zaW4gSUlcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxMC02MFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwicGcvbUxcIixcImZhY3RvclwiOlwiMC45NTdcIixcInNpUmFuZ2VcIjpcIjAuOTYtNThcIixcInNpVW5pdFwiOlwicG1vbC9MXCIsXCJzaVZhbHVlXCI6XCIwLjk2XCIsXCJ1c1ZhbHVlXCI6XCIxMFwifSx7XCJuYW1lXCI6XCJBbmdpb3RlbnNpbi1jb252ZXJ0aW5nIGVuenltZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiPDQwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJVL0xcIixcImZhY3RvclwiOlwiMTYuNjY3XCIsXCJzaVJhbmdlXCI6XCI8NjcwXCIsXCJzaVVuaXRcIjpcIm5rYXQvTFwiLFwic2lWYWx1ZVwiOlwiNjcwXCIsXCJ1c1ZhbHVlXCI6XCI0MFwifSx7XCJuYW1lXCI6XCJBbmlvbiBnYXAgTmEr4oCTKENsLSArIEhDTzMtKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI4LTE2XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtRXEvTFwiLFwiZmFjdG9yXCI6XCIxXCIsXCJzaVJhbmdlXCI6XCI4LTE2XCIsXCJzaVVuaXRcIjpcIm1tb2wvTFwiLFwic2lWYWx1ZVwiOlwiOFwiLFwidXNWYWx1ZVwiOlwiOFwifSx7XCJuYW1lXCI6XCJBbnRpZGl1cmV0aWMgaG9ybW9uZSAoQURIKVwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjEtNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwicGcvbUxcIixcImZhY3RvclwiOlwiMC45MjNcIixcInNpUmFuZ2VcIjpcIjAuOS00LjZcIixcInNpVW5pdFwiOlwicG1vbC9MXCIsXCJzaVZhbHVlXCI6XCIwLjlcIixcInVzVmFsdWVcIjpcIjFcIn0se1wibmFtZVwiOlwiQW50aXRocm9tYmluIElJSVwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjIxLTMwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCIxMFwiLFwic2lSYW5nZVwiOlwiMjEwLTMwMFwiLFwic2lVbml0XCI6XCJtZy9MXCIsXCJzaVZhbHVlXCI6XCIyMTBcIixcInVzVmFsdWVcIjpcIjIxXCJ9LHtcIm5hbWVcIjpcIs6xMS1BbnRpdHJ5cHNpblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNzgtMjAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCIxNC41LTM2LjVcIixcImZhY3RvclwiOlwiMC4xODRcIixcInNpUmFuZ2VcIjpcIjE0LjUtMzYuNVwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxNC41XCIsXCJ1c1ZhbHVlXCI6XCI3OFwifSx7XCJuYW1lXCI6XCJBcG9saXBvcHJvdGVpbiBBLUlcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjgwLTE1MVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvZExcIixcImZhY3RvclwiOlwiMC4wMVwiLFwic2lSYW5nZVwiOlwiMC44LTEuNVwiLFwic2lVbml0XCI6XCJnL0xcIixcInNpVmFsdWVcIjpcIjAuOFwiLFwidXNWYWx1ZVwiOlwiODBcIn0se1wibmFtZVwiOlwiQXBvbGlwb3Byb3RlaW4gQlwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI1MC0xMjNcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjAuMDFcIixcInNpUmFuZ2VcIjpcIjAuNS0xLjJcIixcInNpVW5pdFwiOlwiZy9MXCIsXCJzaVZhbHVlXCI6XCIwLjVcIixcInVzVmFsdWVcIjpcIjUwXCJ9LHtcIm5hbWVcIjpcIkFyZ2luaW5lXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLjM3LTIuNDBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjU3LjA1XCIsXCJzaVJhbmdlXCI6XCIyMS0xMzhcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMjFcIixcInVzVmFsdWVcIjpcIjAuMzdcIn0se1wibmFtZVwiOlwiQXJzZW5pY1wiLFwic3BlY2ltZW5cIjpcIldob2xlIGJsb29kXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMi0yM1wiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL0xcIixcImZhY3RvclwiOlwiMC4wMTMzXCIsXCJzaVJhbmdlXCI6XCIwLjAzLTAuMzFcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMC4wM1wiLFwidXNWYWx1ZVwiOlwiMlwifSx7XCJuYW1lXCI6XCJBc3BhcmFnaW5lXCIsXCJzcGVjaW1lblwiOlwiUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC40MC0wLjkxXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCI3NS42ODlcIixcInNpUmFuZ2VcIjpcIjMwLTY5XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjMwXCIsXCJ1c1ZhbHVlXCI6XCIwLjQwXCJ9LHtcIm5hbWVcIjpcIkFzcGFydGF0ZSBhbWlub3RyYW5zZmVyYXNlIChBU1QpXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxMC0zMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiVS9MXCIsXCJmYWN0b3JcIjpcIjAuMDE2N1wiLFwic2lSYW5nZVwiOlwiMC4xNy0wLjUxXCIsXCJzaVVuaXRcIjpcIsK1a2F0L0xcIixcInNpVmFsdWVcIjpcIjAuMTdcIixcInVzVmFsdWVcIjpcIjEwXCJ9LHtcIm5hbWVcIjpcIkFzcGFydGljIGFjaWRcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI8MC4zXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCI3NS4xM1wiLFwic2lSYW5nZVwiOlwiPDI1XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjI1XCIsXCJ1c1ZhbHVlXCI6XCIwLjNcIn0se1wibmFtZVwiOlwiQXRyaWFsIG5hdHJpdXJldGljIGhvcm1vbmVcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIyMC03N1wiLFwiY29udmVudGlvbmFsVW5pdFwiOlwicGcvbUxcIixcImZhY3RvclwiOlwiMC4zMjVcIixcInNpUmFuZ2VcIjpcIjYuNS0yLjVcIixcInNpVW5pdFwiOlwicG1vbC9MXCIsXCJzaVZhbHVlXCI6XCI2LjVcIixcInVzVmFsdWVcIjpcIjIwXCJ9LHtcIm5hbWVcIjpcIkJhc2UgZXhjZXNzXCIsXCJzcGVjaW1lblwiOlwiV2hvbGUgYmxvb2RcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCLigJMyIHRvIDNcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1FZy9MXCIsXCJmYWN0b3JcIjpcIjFcIixcInNpUmFuZ2VcIjpcIuKAkzIgdG8gM1wiLFwic2lVbml0XCI6XCJtbW9sL0xcIixcInNpVmFsdWVcIjpcIjBcIixcInVzVmFsdWVcIjpcIjBcIn0se1wibmFtZVwiOlwiQmljYXJib25hdGVcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjIxLTI4XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtRXEvTFwiLFwiZmFjdG9yXCI6XCIxXCIsXCJzaVJhbmdlXCI6XCIyMS0yOFwiLFwic2lVbml0XCI6XCJtbW9sL0xcIixcInNpVmFsdWVcIjpcIjIxXCIsXCJ1c1ZhbHVlXCI6XCIyMVwifSx7XCJuYW1lXCI6XCJCaWxlIGFjaWRzICh0b3RhbClcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuMy0yLjNcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9tTFwiLFwiZmFjdG9yXCI6XCIyLjQ0OFwiLFwic2lSYW5nZVwiOlwiMC43My01LjYzXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjAuNzNcIixcInVzVmFsdWVcIjpcIjAuM1wifSx7XCJuYW1lXCI6XCJCaWxpcnViaW4sIHRvdGFsXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLjMtMS4yXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCIxNy4xMDRcIixcInNpUmFuZ2VcIjpcIjUuMC0yMS4wXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjUuMFwiLFwidXNWYWx1ZVwiOlwiMC4zXCJ9LHtcIm5hbWVcIjpcIkJpbGlydWJpbiwgZGlyZWN0IChjb25qdWdhdGVkKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC4xLTAuM1wiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvZExcIixcImZhY3RvclwiOlwiMTcuMTA0XCIsXCJzaVJhbmdlXCI6XCIxLjctNS4xXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjEuN1wiLFwidXNWYWx1ZVwiOlwiMC4xXCJ9LHtcIm5hbWVcIjpcIkJpb3RpblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMjAwLTUwMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwicGcvbUxcIixcImZhY3RvclwiOlwiMC4wMDQwOVwiLFwic2lSYW5nZVwiOlwiMC44Mi0yLjA1XCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMC44MlwiLFwidXNWYWx1ZVwiOlwiMjAwXCJ9LHtcIm5hbWVcIjpcIkJpc211dGhcIixcInNwZWNpbWVuXCI6XCJXaG9sZSBibG9vZFwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjEtMTJcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9MXCIsXCJmYWN0b3JcIjpcIjQuNzg1XCIsXCJzaVJhbmdlXCI6XCI0LjgtNTcuNFwiLFwic2lVbml0XCI6XCJubW9sL0xcIixcInNpVmFsdWVcIjpcIjQuOFwiLFwidXNWYWx1ZVwiOlwiMVwifSx7XCJuYW1lXCI6XCJDYXJib24gZGlveGlkZSwgUGNvMlwiLFwic3BlY2ltZW5cIjpcIkFydGVyaWFsIGJsb29kXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMzUtNDVcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1FcS9MXCIsXCJmYWN0b3JcIjpcIjAuMTMzXCIsXCJzaVJhbmdlXCI6XCI0LjctNS45XCIsXCJzaVVuaXRcIjpcImtQYVwiLFwic2lWYWx1ZVwiOlwiNC43XCIsXCJ1c1ZhbHVlXCI6XCIzNVwifSx7XCJuYW1lXCI6XCJwaFwiLFwic3BlY2ltZW5cIjpcIkFydGVyaWFsIGJsb29kXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNy4zNS03LjQ1XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJcIixcImZhY3RvclwiOlwiMVwiLFwic2lSYW5nZVwiOlwiNy4zNS03LjQ1XCIsXCJzaVVuaXRcIjpcIlwiLFwic2lWYWx1ZVwiOlwiNy4zNVwiLFwidXNWYWx1ZVwiOlwiNy4zNVwifSx7XCJuYW1lXCI6XCJPeHlnZW4sIFBvMlwiLFwic3BlY2ltZW5cIjpcIkFydGVyaWFsIGJsb29kXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiODAtMTAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJcIixcImZhY3RvclwiOlwiMC4xMzNcIixcInNpUmFuZ2VcIjpcIjExLTEzXCIsXCJzaVVuaXRcIjpcImtQYVwiLFwic2lWYWx1ZVwiOlwiMTFcIixcInVzVmFsdWVcIjpcIjgwXCJ9LHtcIm5hbWVcIjpcIkJyYWluLXR5cGUgbmF0cml1cmV0aWMgcGVwdGlkZSAoQk5QKVwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjwxNjdcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcInBnL21MXCIsXCJmYWN0b3JcIjpcIjFcIixcInNpUmFuZ2VcIjpcIjwxNjdcIixcInNpVW5pdFwiOlwibmcvTFwiLFwic2lWYWx1ZVwiOlwiMTY3XCIsXCJ1c1ZhbHVlXCI6XCIxNjdcIn0se1wibmFtZVwiOlwiQnJvbWlkZSAodG94aWMpXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI+MTI1MFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjAuMDEyNVwiLFwic2lSYW5nZVwiOlwiPjE1LjZcIixcInNpVW5pdFwiOlwibW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxNS42XCIsXCJ1c1ZhbHVlXCI6XCIxMjUwXCJ9LHtcIm5hbWVcIjpcIkMxIGVzdGVyYXNlIGluaGliaXRvclwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMTItMzBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjEwXCIsXCJzaVJhbmdlXCI6XCIxMjAtMzAwXCIsXCJzaVVuaXRcIjpcIm1nL0xcIixcInNpVmFsdWVcIjpcIjEyMFwiLFwidXNWYWx1ZVwiOlwiMTJcIn0se1wibmFtZVwiOlwiQzMgY29tcGxlbWVudFwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMTIwMC0xNTAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvbUxcIixcImZhY3RvclwiOlwiMC4wMDFcIixcInNpUmFuZ2VcIjpcIjEuMi0xLjVcIixcInNpVW5pdFwiOlwiZy9MXCIsXCJzaVZhbHVlXCI6XCIxLjJcIixcInVzVmFsdWVcIjpcIjEyMDBcIn0se1wibmFtZVwiOlwiQzQgY29tcGxlbWVudFwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMzUwLTYwMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjAuMDAxXCIsXCJzaVJhbmdlXCI6XCIwLjM1LTAuNjBcIixcInNpVW5pdFwiOlwiZy9MXCIsXCJzaVZhbHVlXCI6XCIwLjM1XCIsXCJ1c1ZhbHVlXCI6XCIzNTBcIn0se1wibmFtZVwiOlwiQ2FkbWl1bVwiLFwic3BlY2ltZW5cIjpcIldob2xlIGJsb29kXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC4zLTEuMlwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL0xcIixcImZhY3RvclwiOlwiOC44OTZcIixcInNpUmFuZ2VcIjpcIjIuNy0xMC43XCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMi43XCIsXCJ1c1ZhbHVlXCI6XCIwLjNcIn0se1wibmFtZVwiOlwiQ2FmZmVpbmVcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMy0xNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL0xcIixcImZhY3RvclwiOlwiMC41MTVcIixcInNpUmFuZ2VcIjpcIjIuNS03LjVcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMi41XCIsXCJ1c1ZhbHVlXCI6XCIzXCJ9LHtcIm5hbWVcIjpcIkNhbGNpdG9uaW5cIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIzLTI2XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJwZy9tTFwiLFwiZmFjdG9yXCI6XCIwLjI5MlwiLFwic2lSYW5nZVwiOlwiMC44LTcuNlwiLFwic2lVbml0XCI6XCJwbW9sL0xcIixcInNpVmFsdWVcIjpcIjAuOFwiLFwidXNWYWx1ZVwiOlwiM1wifSx7XCJuYW1lXCI6XCJDYWxjaXVtLCBpb25pemVkXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI0LjYwLTUuMDhcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjAuMjVcIixcInNpUmFuZ2VcIjpcIjEuMTUtMS4yN1wiLFwic2lVbml0XCI6XCJtbW9sL0xcIixcInNpVmFsdWVcIjpcIjEuMTVcIixcInVzVmFsdWVcIjpcIjQuNjBcIn0se1wibmFtZVwiOlwiQ2FsY2l1bSwgdG90YWxcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjguMi0xMC4yXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCIwLjI1XCIsXCJzaVJhbmdlXCI6XCIyLjA1LTIuNTVcIixcInNpVW5pdFwiOlwibW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIyLjA1XCIsXCJ1c1ZhbHVlXCI6XCI4LjJcIn0se1wibmFtZVwiOlwiQ2FuY2VyIGFudGlnZW4gKENBKSAxMjVcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjwzNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiVS9tTFwiLFwiZmFjdG9yXCI6XCIxXCIsXCJzaVJhbmdlXCI6XCI8MzVcIixcInNpVW5pdFwiOlwia1UvTFwiLFwic2lWYWx1ZVwiOlwiMzVcIixcInVzVmFsdWVcIjpcIjM1XCJ9LHtcIm5hbWVcIjpcIkNhcmJhbWF6ZXBpbmVcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiOC0xMlwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjQuMjMzXCIsXCJzaVJhbmdlXCI6XCIzNC01MVwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIzNFwiLFwidXNWYWx1ZVwiOlwiOFwifSx7XCJuYW1lXCI6XCJDYXJib24gZGlveGlkZSAodG90YWwpXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjIyLTI4XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtRXEvTFwiLFwiZmFjdG9yXCI6XCIxXCIsXCJzaVJhbmdlXCI6XCIyMi0yOFwiLFwic2lVbml0XCI6XCJtbW9sL0xcIixcInNpVmFsdWVcIjpcIjIyXCIsXCJ1c1ZhbHVlXCI6XCIyMlwifSx7XCJuYW1lXCI6XCJDYXJib3h5aGVtb2dsb2JpbiwgdG94aWNcIixcInNwZWNpbWVuXCI6XCJXaG9sZSBibG9vZFwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIj4yMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiJVwiLFwiZmFjdG9yXCI6XCIwLjAxXCIsXCJzaVJhbmdlXCI6XCI+MC4yXCIsXCJzaVVuaXRcIjpcIlByb3BvcnRpb24gb2YgMS4wXCIsXCJzaVZhbHVlXCI6XCIwLjJcIixcInVzVmFsdWVcIjpcIjIwXCJ9LHtcIm5hbWVcIjpcIkNhcmNpbm9lbWJyeW9uaWMgYW50aWdlbiAoQ0VBKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiPDMuMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL0xcIixcImZhY3RvclwiOlwiMVwiLFwic2lSYW5nZVwiOlwiPDMuMFwiLFwic2lVbml0XCI6XCLCtWcvTFwiLFwic2lWYWx1ZVwiOlwiMy4wXCIsXCJ1c1ZhbHVlXCI6XCIzLjBcIn0se1wibmFtZVwiOlwizrItQ2Fyb3RlbmVcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjEwLTg1XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvZExcIixcImZhY3RvclwiOlwiMC4wMTg2M1wiLFwic2lSYW5nZVwiOlwiMC4yLTEuNlwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIwLjJcIixcInVzVmFsdWVcIjpcIjEwXCJ9LHtcIm5hbWVcIjpcIkNhcm90ZW5vaWRzXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI1MC0zMDBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9kTFwiLFwiZmFjdG9yXCI6XCIwLjAxODYzXCIsXCJzaVJhbmdlXCI6XCIwLjktNS42XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjAuOVwiLFwidXNWYWx1ZVwiOlwiNTBcIn0se1wibmFtZVwiOlwiQ2VydWxvcGxhc21pblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMjAtNDBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjEwXCIsXCJzaVJhbmdlXCI6XCIyMDAtNDAwXCIsXCJzaVVuaXRcIjpcIm1nL0xcIixcInNpVmFsdWVcIjpcIjIwMFwiLFwidXNWYWx1ZVwiOlwiMjBcIn0se1wibmFtZVwiOlwiQ2hsb3JhbXBoZW5pY29sXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxMC0yNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjMuMDk1XCIsXCJzaVJhbmdlXCI6XCIzMS03N1wiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIzMVwiLFwidXNWYWx1ZVwiOlwiMTBcIn0se1wibmFtZVwiOlwiQ2hsb3JkaWF6ZXBveGlkZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLjQtMy4wXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvbUxcIixcImZhY3RvclwiOlwiMy4zMzZcIixcInNpUmFuZ2VcIjpcIjEuMy0xMC4wXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjEuM1wiLFwidXNWYWx1ZVwiOlwiMC40XCJ9LHtcIm5hbWVcIjpcIkNobG9yaWRlXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjk2LTEwNlwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibUVxL0xcIixcImZhY3RvclwiOlwiMVwiLFwic2lSYW5nZVwiOlwiOTYtMTA2XCIsXCJzaVVuaXRcIjpcIm1tb2wvTFwiLFwic2lWYWx1ZVwiOlwiOTZcIixcInVzVmFsdWVcIjpcIjk2XCJ9LHtcIm5hbWVcIjpcIkNobG9ycHJvbWF6aW5lXCIsXCJzcGVjaW1lblwiOlwiUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNTAtMzAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJuZy9tTFwiLFwiZmFjdG9yXCI6XCIzLjEyNlwiLFwic2lSYW5nZVwiOlwiMTU3LTk0MlwiLFwic2lVbml0XCI6XCJubW9sL0xcIixcInNpVmFsdWVcIjpcIjE1N1wiLFwidXNWYWx1ZVwiOlwiNTBcIn0se1wibmFtZVwiOlwiQ2hsb3Jwcm9wYW1pZGVcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI3NS0yNTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL0xcIixcImZhY3RvclwiOlwiMy42MVwiLFwic2lSYW5nZVwiOlwiMjcwLTkwMFwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIyNzBcIixcInVzVmFsdWVcIjpcIjc1XCJ9LHtcIm5hbWVcIjpcIkNob2xlc3Rlcm9sICh0b3RhbCkgRGVzaXJhYmxlXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjwyMDBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjAuMDI1OVwiLFwic2lSYW5nZVwiOlwiPDUuMThcIixcInNpVW5pdFwiOlwibW1vbC9MXCIsXCJzaVZhbHVlXCI6XCI1LjE4XCIsXCJ1c1ZhbHVlXCI6XCIyMDBcIn0se1wibmFtZVwiOlwiQ2hvbGVzdGVyb2wgKHRvdGFsKSBCb3JkZXJsaW5lIGhpZ2hcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMjAwLTIzOVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvZExcIixcImZhY3RvclwiOlwiMC4wMjU5XCIsXCJzaVJhbmdlXCI6XCI1LjE4LTYuMThcIixcInNpVW5pdFwiOlwibW1vbC9MXCIsXCJzaVZhbHVlXCI6XCI1LjE4XCIsXCJ1c1ZhbHVlXCI6XCIyMDBcIn0se1wibmFtZVwiOlwiQ2hvbGVzdGVyb2wgKHRvdGFsKSBIaWdoXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjY0MFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvZExcIixcImZhY3RvclwiOlwiMC4wMjU5XCIsXCJzaVJhbmdlXCI6XCI2LjIxXCIsXCJzaVVuaXRcIjpcIm1tb2wvTFwiLFwic2lWYWx1ZVwiOlwiNi4yMVwiLFwidXNWYWx1ZVwiOlwiNjQwXCJ9LHtcIm5hbWVcIjpcIkNob2xlc3Rlcm9sLCBoaWdoLWRlbnNpdHkgKEhETCkgKGxvdyBsZXZlbClcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiPDQwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCIwLjAyNTlcIixcInNpUmFuZ2VcIjpcIjwxLjAzXCIsXCJzaVVuaXRcIjpcIm1tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMS4wM1wiLFwidXNWYWx1ZVwiOlwiNDBcIn0se1wibmFtZVwiOlwiQ2hvbGVzdGVyb2wsIGxvdy1kZW5zaXR5IChMREwpIChoaWdoIGxldmVsKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI+MTYwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCIwLjAyNTlcIixcInNpUmFuZ2VcIjpcIjQuMTQ0XCIsXCJzaVVuaXRcIjpcIm1tb2wvTFwiLFwic2lWYWx1ZVwiOlwiNC4xNDRcIixcInVzVmFsdWVcIjpcIjE2MFwifSx7XCJuYW1lXCI6XCJDaG9saW5lc3RlcmFzZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNS0xMlwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvTFwiLFwiZmFjdG9yXCI6XCIyLjc5M1wiLFwic2lSYW5nZVwiOlwiMTQtMzlcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxNFwiLFwidXNWYWx1ZVwiOlwiNVwifSx7XCJuYW1lXCI6XCJDaG9yaW9uaWMgZ29uYWRvdHJvcGluICjDny1oQ0cpIChub25wcmVnbmFudClcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjVcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1JVS9tTFwiLFwiZmFjdG9yXCI6XCIxXCIsXCJzaVJhbmdlXCI6XCI1XCIsXCJzaVVuaXRcIjpcIklVL0xcIixcInNpVmFsdWVcIjpcIjVcIixcInVzVmFsdWVcIjpcIjVcIn0se1wibmFtZVwiOlwiQ2hyb21pdW1cIixcInNwZWNpbWVuXCI6XCJXaG9sZSBibG9vZFwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuNy0yOC4wXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvTFwiLFwiZmFjdG9yXCI6XCIxOS4yMzJcIixcInNpUmFuZ2VcIjpcIjEzLjQtNTM4LjZcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxMy40XCIsXCJ1c1ZhbHVlXCI6XCIwLjdcIn0se1wibmFtZVwiOlwiQ2l0cmF0ZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMS4yLTMuMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvZExcIixcImZhY3RvclwiOlwiNTIuMDVcIixcInNpUmFuZ2VcIjpcIjYwLTE2MFwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCI2MFwiLFwidXNWYWx1ZVwiOlwiMS4yXCJ9LHtcIm5hbWVcIjpcIkNpdHJ1bGxpbmVcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLjItMS4wXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCI1Ny4wODFcIixcInNpUmFuZ2VcIjpcIjEyLTU1XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjEyXCIsXCJ1c1ZhbHVlXCI6XCIwLjJcIn0se1wibmFtZVwiOlwiQ2xvbmF6ZXBhbVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMTAtNTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm5nL21MXCIsXCJmYWN0b3JcIjpcIjAuMzE3XCIsXCJzaVJhbmdlXCI6XCIwLjQtMTUuOFwiLFwic2lVbml0XCI6XCJubW9sL0xcIixcInNpVmFsdWVcIjpcIjAuNFwiLFwidXNWYWx1ZVwiOlwiMTBcIn0se1wibmFtZVwiOlwiQ2xvbmlkaW5lXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjEuMC0yLjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm5nL21MXCIsXCJmYWN0b3JcIjpcIjQuMzVcIixcInNpUmFuZ2VcIjpcIjQuNC04LjdcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCI0LjRcIixcInVzVmFsdWVcIjpcIjEuMFwifSx7XCJuYW1lXCI6XCJDbG96YXBpbmVcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjIwMC0zNTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm5nL21MXCIsXCJmYWN0b3JcIjpcIjAuMDAzXCIsXCJzaVJhbmdlXCI6XCIwLjYtMS4wXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjAuNlwiLFwidXNWYWx1ZVwiOlwiMjAwXCJ9LHtcIm5hbWVcIjpcIkNvYWd1bGF0aW9uIGZhY3RvciBJXCIsXCJzcGVjaW1lblwiOlwiUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC4xNS0wLjM1XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJnL2RMXCIsXCJmYWN0b3JcIjpcIjI5LjQxXCIsXCJzaVJhbmdlXCI6XCI0LjQtMTAuM1wiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCI0LjRcIixcInVzVmFsdWVcIjpcIjAuMTVcIn0se1wibmFtZVwiOlwiICAgIChGaWJyaW5vZ2VuKVwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjE1MC0zNTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcImcvTFwiLFwic2lSYW5nZVwiOlwiMS41LTMuNVwiLFwic2lVbml0XCI6XCJnL0xcIixcInNpVmFsdWVcIjpcIjEuNVwiLFwidXNWYWx1ZVwiOlwiMTUwXCJ9LHtcIm5hbWVcIjpcIkNvYWd1bGF0aW9uIGZhY3RvciBJSSAocHJvdGhyb21iaW4pXCIsXCJzcGVjaW1lblwiOlwiUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNzAtMTMwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCIlXCIsXCJmYWN0b3JcIjpcIjAuMDFcIixcInNpUmFuZ2VcIjpcIjAuNzAtMS4zMFwiLFwic2lVbml0XCI6XCJQcm9wb3J0aW9uIG9mIDEuMFwiLFwic2lWYWx1ZVwiOlwiMC43MFwiLFwidXNWYWx1ZVwiOlwiNzBcIn0se1wibmFtZVwiOlwiQ29hZ3VsYXRpb24gZmFjdG9yIFZcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI3MC0xMzBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIiVcIixcImZhY3RvclwiOlwiMC4wMVwiLFwic2lSYW5nZVwiOlwiMC43MC0xLjMwXCIsXCJzaVVuaXRcIjpcIlByb3BvcnRpb24gb2YgMS4wXCIsXCJzaVZhbHVlXCI6XCIwLjcwXCIsXCJ1c1ZhbHVlXCI6XCI3MFwifSx7XCJuYW1lXCI6XCJDb2FndWxhdGlvbiBmYWN0b3IgVklJXCIsXCJzcGVjaW1lblwiOlwiUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNjAtMTQwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCIlXCIsXCJmYWN0b3JcIjpcIjAuMDFcIixcInNpUmFuZ2VcIjpcIjAuNjAtMS40MFwiLFwic2lVbml0XCI6XCJQcm9wb3J0aW9uIG9mIDEuMFwiLFwic2lWYWx1ZVwiOlwiMC42MFwiLFwidXNWYWx1ZVwiOlwiNjBcIn0se1wibmFtZVwiOlwiQ29hZ3VsYXRpb24gZmFjdG9yIFZJSUlcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI1MC0yMDBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIiVcIixcImZhY3RvclwiOlwiMC4wMVwiLFwic2lSYW5nZVwiOlwiMC41MC0yLjAwXCIsXCJzaVVuaXRcIjpcIlByb3BvcnRpb24gb2YgMS4wXCIsXCJzaVZhbHVlXCI6XCIwLjUwXCIsXCJ1c1ZhbHVlXCI6XCI1MFwifSx7XCJuYW1lXCI6XCJDb2FndWxhdGlvbiBmYWN0b3IgSVhcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI3MC0xMzBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIiVcIixcImZhY3RvclwiOlwiMC4wMVwiLFwic2lSYW5nZVwiOlwiMC43MC0xLjMwXCIsXCJzaVVuaXRcIjpcIlByb3BvcnRpb24gb2YgMS4wXCIsXCJzaVZhbHVlXCI6XCIwLjcwXCIsXCJ1c1ZhbHVlXCI6XCI3MFwifSx7XCJuYW1lXCI6XCJDb2FndWxhdGlvbiBmYWN0b3IgWFwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjcwLTEzMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiJVwiLFwiZmFjdG9yXCI6XCIwLjAxXCIsXCJzaVJhbmdlXCI6XCIwLjcwLTEuMzBcIixcInNpVW5pdFwiOlwiUHJvcG9ydGlvbiBvZiAxLjBcIixcInNpVmFsdWVcIjpcIjAuNzBcIixcInVzVmFsdWVcIjpcIjcwXCJ9LHtcIm5hbWVcIjpcIkNvYWd1bGF0aW9uIGZhY3RvciBYSVwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjcwLTEzMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiJVwiLFwiZmFjdG9yXCI6XCIwLjAxXCIsXCJzaVJhbmdlXCI6XCIwLjcwLTEuMzBcIixcInNpVW5pdFwiOlwiUHJvcG9ydGlvbiBvZiAxLjBcIixcInNpVmFsdWVcIjpcIjAuNzBcIixcInVzVmFsdWVcIjpcIjcwXCJ9LHtcIm5hbWVcIjpcIkNvYWd1bGF0aW9uIGZhY3RvciBYSUlcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI3MC0xMzBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIiVcIixcImZhY3RvclwiOlwiMC4wMVwiLFwic2lSYW5nZVwiOlwiMC43MC0xLjMwXCIsXCJzaVVuaXRcIjpcIlByb3BvcnRpb24gb2YgMS4wXCIsXCJzaVZhbHVlXCI6XCIwLjcwXCIsXCJ1c1ZhbHVlXCI6XCI3MFwifSx7XCJuYW1lXCI6XCJDb2JhbHRcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjQuMC0xMC4wXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvTFwiLFwiZmFjdG9yXCI6XCIxNi45NjhcIixcInNpUmFuZ2VcIjpcIjY3LjktMTY5LjdcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCI2Ny45XCIsXCJ1c1ZhbHVlXCI6XCI0LjBcIn0se1wibmFtZVwiOlwiQ29jYWluZSAodG94aWMpXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI+MTAwMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibmcvbUxcIixcImZhY3RvclwiOlwiMy4yOTdcIixcInNpUmFuZ2VcIjpcIj4zMzAwXCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMzMwMFwiLFwidXNWYWx1ZVwiOlwiMTAwMFwifSx7XCJuYW1lXCI6XCJDb2RlaW5lXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxMC0xMDBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm5nL21MXCIsXCJmYWN0b3JcIjpcIjMuMzRcIixcInNpUmFuZ2VcIjpcIjMzLTMzNFwiLFwic2lVbml0XCI6XCJubW9sL0xcIixcInNpVmFsdWVcIjpcIjMzXCIsXCJ1c1ZhbHVlXCI6XCIxMFwifSx7XCJuYW1lXCI6XCJDb2VuenltZSBRMTAgKHViaXF1aW5vbmUpXCIsXCJzcGVjaW1lblwiOlwiUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC41LTEuNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjFcIixcInNpUmFuZ2VcIjpcIjAuNS0xLjVcIixcInNpVW5pdFwiOlwibWcvTFwiLFwic2lWYWx1ZVwiOlwiMC41XCIsXCJ1c1ZhbHVlXCI6XCIwLjVcIn0se1wibmFtZVwiOlwiQ29wcGVyXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI3MC0xNDBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9kTFwiLFwiZmFjdG9yXCI6XCIwLjE1N1wiLFwic2lSYW5nZVwiOlwiNDQ4NjZcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiNDQ4NjZcIixcInVzVmFsdWVcIjpcIjcwXCJ9LHtcIm5hbWVcIjpcIkNvcHJvcG9ycGh5cmluXCIsXCJzcGVjaW1lblwiOlwiVXJpbmVcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI8MjAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvMjRoXCIsXCJmYWN0b3JcIjpcIjEuNTI3XCIsXCJzaVJhbmdlXCI6XCI8MzAwXCIsXCJzaVVuaXRcIjpcIsK1bW9sL2RcIixcInNpVmFsdWVcIjpcIjMwMFwiLFwidXNWYWx1ZVwiOlwiMjAwXCJ9LHtcIm5hbWVcIjpcIkNvcnRpY290cm9waW5cIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI8MTIwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJwZy9tTFwiLFwiZmFjdG9yXCI6XCIwLjIyXCIsXCJzaVJhbmdlXCI6XCI8MjZcIixcInNpVW5pdFwiOlwicG1vbC9MXCIsXCJzaVZhbHVlXCI6XCIyNlwiLFwidXNWYWx1ZVwiOlwiMTIwXCJ9LHtcIm5hbWVcIjpcIkNvcnRpc29sXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjUtMjVcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9kTFwiLFwiZmFjdG9yXCI6XCIyNy41ODhcIixcInNpUmFuZ2VcIjpcIjE0MC02OTBcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxNDBcIixcInVzVmFsdWVcIjpcIjVcIn0se1wibmFtZVwiOlwiQ290aW5pbmVcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLThcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9MXCIsXCJmYWN0b3JcIjpcIjUuNjc1XCIsXCJzaVJhbmdlXCI6XCIwLTQ1XCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMFwiLFwidXNWYWx1ZVwiOlwiMFwifSx7XCJuYW1lXCI6XCJDLXBlcHRpZGVcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuNS0yLjVcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm5nL21MXCIsXCJmYWN0b3JcIjpcIjAuMzMxXCIsXCJzaVJhbmdlXCI6XCIwLjE3LTAuODNcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCIwLjE3XCIsXCJ1c1ZhbHVlXCI6XCIwLjVcIn0se1wibmFtZVwiOlwiQy1yZWFjdGl2ZSBwcm90ZWluXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLjA4LTMuMVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvTFwiLFwiZmFjdG9yXCI6XCI5LjUyNFwiLFwic2lSYW5nZVwiOlwiMC43Ni0yOC41XCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMC43NlwiLFwidXNWYWx1ZVwiOlwiMC4wOFwifSx7XCJuYW1lXCI6XCJDcmVhdGluZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC4xLTAuNFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvZExcIixcImZhY3RvclwiOlwiNzYuMjVcIixcInNpUmFuZ2VcIjpcIjgtMzFcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiOFwiLFwidXNWYWx1ZVwiOlwiMC4xXCJ9LHtcIm5hbWVcIjpcIkNyZWF0aW5lIGtpbmFzZSAoQ0spXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI0MC0xNTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIlUvTFwiLFwiZmFjdG9yXCI6XCIwLjAxNjdcIixcInNpUmFuZ2VcIjpcIjAuNjctMi41XCIsXCJzaVVuaXRcIjpcIsK1a2F0L0xcIixcInNpVmFsdWVcIjpcIjAuNjdcIixcInVzVmFsdWVcIjpcIjQwXCJ9LHtcIm5hbWVcIjpcIkNyZWF0aW5lIGtpbmFzZeKAk01CIGZyYWN0aW9uXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLTdcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9MXCIsXCJmYWN0b3JcIjpcIjFcIixcInNpUmFuZ2VcIjpcIjAtN1wiLFwic2lVbml0XCI6XCLCtWcvTFwiLFwic2lWYWx1ZVwiOlwiMFwiLFwidXNWYWx1ZVwiOlwiMFwifSx7XCJuYW1lXCI6XCJDcmVhdGluaW5lXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuNi0xLjJcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjg4LjRcIixcInNpUmFuZ2VcIjpcIjUzLTEwNlwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCI1M1wiLFwidXNWYWx1ZVwiOlwiMC42XCJ9LHtcIm5hbWVcIjpcIkNyZWF0aW5pbmUgY2xlYXJhbmNlXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjc1LTEyNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibUwvbWluLzEuNzNtMlwiLFwiZmFjdG9yXCI6XCIwLjAxNjdcIixcInNpUmFuZ2VcIjpcIjEuMjQtMi4wOFwiLFwic2lVbml0XCI6XCJtTC9zL20yXCIsXCJzaVZhbHVlXCI6XCIxLjI0XCIsXCJ1c1ZhbHVlXCI6XCI3NVwifSx7XCJuYW1lXCI6XCJDeWFuaWRlICh0b3hpYylcIixcInNwZWNpbWVuXCI6XCJXaG9sZSBibG9vZFwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIj4xLjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9tTFwiLFwiZmFjdG9yXCI6XCIyMy4yNFwiLFwic2lSYW5nZVwiOlwiPjIzXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjIzXCIsXCJ1c1ZhbHVlXCI6XCIxLjBcIn0se1wibmFtZVwiOlwiQ3ljbGljIGFkZW5vc2luZSBtb25vcGhvc3BoYXRlIChjQU1QKVwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjQuNi04LjZcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm5nL21MXCIsXCJmYWN0b3JcIjpcIjMuMDRcIixcInNpUmFuZ2VcIjpcIjE0LTI2XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjE0XCIsXCJ1c1ZhbHVlXCI6XCI0LjZcIn0se1wibmFtZVwiOlwiQ3ljbG9zcG9yaW5lXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxMDAtNDAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJuZy9tTFwiLFwiZmFjdG9yXCI6XCIwLjgzMlwiLFwic2lSYW5nZVwiOlwiODMtMzMzXCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiODNcIixcInVzVmFsdWVcIjpcIjEwMFwifSx7XCJuYW1lXCI6XCJDeXN0aW5lXCIsXCJzcGVjaW1lblwiOlwiUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC40MC0xLjQwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCI0MS42MTVcIixcInNpUmFuZ2VcIjpcIjE2LTYwXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjE2XCIsXCJ1c1ZhbHVlXCI6XCIwLjQwXCJ9LHtcIm5hbWVcIjpcIkQtZGltZXJcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI8MC41XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvbUxcIixcImZhY3RvclwiOlwiNS40NzZcIixcInNpUmFuZ2VcIjpcIjwzLjBcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCIzLjBcIixcInVzVmFsdWVcIjpcIjAuNVwifSx7XCJuYW1lXCI6XCJEZWh5ZHJvZXBpYW5kcm9zdGVyb25lIChESEVBKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMS44LTEyLjVcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm5nL21MXCIsXCJmYWN0b3JcIjpcIjMuNDdcIixcInNpUmFuZ2VcIjpcIjYuMi00My4zXCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiNi4yXCIsXCJ1c1ZhbHVlXCI6XCIxLjhcIn0se1wibmFtZVwiOlwiRGVoeWRyb2VwaWFuZHJvc3Rlcm9uZSBzdWxmYXRlIChESEVBLVMpXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI1MC00NTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9kTFwiLFwiZmFjdG9yXCI6XCIwLjAyN1wiLFwic2lSYW5nZVwiOlwiMS42LTEyLjJcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMS42XCIsXCJ1c1ZhbHVlXCI6XCI1MFwifSx7XCJuYW1lXCI6XCJEZW94eWNvcnRpY29zdGVyb25lXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIyLTE5XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJuZy9kTFwiLFwiZmFjdG9yXCI6XCIwLjAzMDNcIixcInNpUmFuZ2VcIjpcIjYxLTU3NlwiLFwic2lVbml0XCI6XCJubW9sL0xcIixcInNpVmFsdWVcIjpcIjYxXCIsXCJ1c1ZhbHVlXCI6XCIyXCJ9LHtcIm5hbWVcIjpcIkRlc2lwcmFtaW5lXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjUwLTIwMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibmcvbUxcIixcImZhY3RvclwiOlwiMy43NTRcIixcInNpUmFuZ2VcIjpcIjE3MC03MDBcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxNzBcIixcInVzVmFsdWVcIjpcIjUwXCJ9LHtcIm5hbWVcIjpcIkRpYXplcGFtXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjEwMC0xMDAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJuZy9tTFwiLFwiZmFjdG9yXCI6XCIwLjAwMzVcIixcInNpUmFuZ2VcIjpcIjAuMzUtMy41MVwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIwLjM1XCIsXCJ1c1ZhbHVlXCI6XCIxMDBcIn0se1wibmFtZVwiOlwiRGlnb3hpblwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuNS0yLjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm5nL21MXCIsXCJmYWN0b3JcIjpcIjEuMjgxXCIsXCJzaVJhbmdlXCI6XCIwLjYtMi42XCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMC42XCIsXCJ1c1ZhbHVlXCI6XCIwLjVcIn0se1wibmFtZVwiOlwiRGlsdGlhemVtXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI8MjAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9MXCIsXCJmYWN0b3JcIjpcIjIuNDEyXCIsXCJzaVJhbmdlXCI6XCI8NDgwXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjQ4MFwiLFwidXNWYWx1ZVwiOlwiMjAwXCJ9LHtcIm5hbWVcIjpcIkRpc29weXJhbWlkZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIyLjgtNy4wXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvbUxcIixcImZhY3RvclwiOlwiMi45NDZcIixcInNpUmFuZ2VcIjpcIjguMy0yMi4wXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjguM1wiLFwidXNWYWx1ZVwiOlwiMi44XCJ9LHtcIm5hbWVcIjpcIkRvcGFtaW5lXCIsXCJzcGVjaW1lblwiOlwiUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiPDg3XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJwZy9tTFwiLFwiZmFjdG9yXCI6XCI2LjUyOFwiLFwic2lSYW5nZVwiOlwiPDQ3NVwiLFwic2lVbml0XCI6XCJwbW9sL0xcIixcInNpVmFsdWVcIjpcIjQ3NVwiLFwidXNWYWx1ZVwiOlwiODdcIn0se1wibmFtZVwiOlwiRG94ZXBpblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIzMC0xNTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm5nL21MXCIsXCJmYWN0b3JcIjpcIjMuNTc5XCIsXCJzaVJhbmdlXCI6XCIxMDgtNTM4XCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMTA4XCIsXCJ1c1ZhbHVlXCI6XCIzMFwifSx7XCJuYW1lXCI6XCJBbGJ1bWluIFByb3BvcnRpb25cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjUyLTY1XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCIlXCIsXCJmYWN0b3JcIjpcIjAuMDFcIixcInNpUmFuZ2VcIjpcIjAuNTItMC42NVwiLFwic2lVbml0XCI6XCJQcm9wb3J0aW9uIG9mIDEuMFwiLFwic2lWYWx1ZVwiOlwiMC41MlwiLFwidXNWYWx1ZVwiOlwiNTJcIn0se1wibmFtZVwiOlwizrExLUdsb2J1bGluIFByb3BvcnRpb25cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjIuNS01LjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIiVcIixcImZhY3RvclwiOlwiMC4wMVwiLFwic2lSYW5nZVwiOlwiMC4wMjUtMC4wNVwiLFwic2lVbml0XCI6XCJQcm9wb3J0aW9uIG9mIDEuMFwiLFwic2lWYWx1ZVwiOlwiMC4wMjVcIixcInVzVmFsdWVcIjpcIjIuNVwifSx7XCJuYW1lXCI6XCLOsTItR2xvYnVsaW4gUHJvcG9ydGlvblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNy4wLTEzLjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIiVcIixcImZhY3RvclwiOlwiMC4wMVwiLFwic2lSYW5nZVwiOlwiMC4wNy0wLjEzXCIsXCJzaVVuaXRcIjpcIlByb3BvcnRpb24gb2YgMS4wXCIsXCJzaVZhbHVlXCI6XCIwLjA3XCIsXCJ1c1ZhbHVlXCI6XCI3LjBcIn0se1wibmFtZVwiOlwiw58tR2xvYnVsaW4gUHJvcG9ydGlvblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiOC4wLTE0LjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIiVcIixcImZhY3RvclwiOlwiMC4wMVwiLFwic2lSYW5nZVwiOlwiMC4wOC0wLjE0XCIsXCJzaVVuaXRcIjpcIlByb3BvcnRpb24gb2YgMS4wXCIsXCJzaVZhbHVlXCI6XCIwLjA4XCIsXCJ1c1ZhbHVlXCI6XCI4LjBcIn0se1wibmFtZVwiOlwizrMtR2xvYnVsaW4gUHJvcG9ydGlvblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMTIuMC0yMi4wXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCIlXCIsXCJmYWN0b3JcIjpcIjAuMDFcIixcInNpUmFuZ2VcIjpcIjAuMTItMC4yMlwiLFwic2lVbml0XCI6XCJQcm9wb3J0aW9uIG9mIDEuMFwiLFwic2lWYWx1ZVwiOlwiMC4xMlwiLFwidXNWYWx1ZVwiOlwiMTIuMFwifSx7XCJuYW1lXCI6XCJBbGJ1bWluIENvbmNlbnRyYXRpb25cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjMuMi01LjZcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcImcvZExcIixcImZhY3RvclwiOlwiMTBcIixcInNpUmFuZ2VcIjpcIjMyLTU2XCIsXCJzaVVuaXRcIjpcImcvTFwiLFwic2lWYWx1ZVwiOlwiMzJcIixcInVzVmFsdWVcIjpcIjMuMlwifSx7XCJuYW1lXCI6XCLOsTEgLUdsb2J1bGluIENvbmNlbnRyYXRpb25cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuMS0wLjRcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcImcvZExcIixcImZhY3RvclwiOlwiMTBcIixcInNpUmFuZ2VcIjpcIjEtMTBcIixcInNpVW5pdFwiOlwiZy9MXCIsXCJzaVZhbHVlXCI6XCIxXCIsXCJ1c1ZhbHVlXCI6XCIwLjFcIn0se1wibmFtZVwiOlwizrEyLUdsb2J1bGluIENvbmNlbnRyYXRpb25cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuNC0xLjJcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcImcvZExcIixcImZhY3RvclwiOlwiMTBcIixcInNpUmFuZ2VcIjpcIjQtMTJcIixcInNpVW5pdFwiOlwiZy9MXCIsXCJzaVZhbHVlXCI6XCI0XCIsXCJ1c1ZhbHVlXCI6XCIwLjRcIn0se1wibmFtZVwiOlwiw58tR2xvYnVsaW4gQ29uY2VudHJhdGlvblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC41LTEuMVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiZy9kTFwiLFwiZmFjdG9yXCI6XCIxMFwiLFwic2lSYW5nZVwiOlwiNS0xMVwiLFwic2lVbml0XCI6XCJnL0xcIixcInNpVmFsdWVcIjpcIjVcIixcInVzVmFsdWVcIjpcIjAuNVwifSx7XCJuYW1lXCI6XCLOsy1HbG9idWxpbiBDb25jZW50cmF0aW9uXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLjUtMS42XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJnL2RMXCIsXCJmYWN0b3JcIjpcIjEwXCIsXCJzaVJhbmdlXCI6XCI1LTE2XCIsXCJzaVVuaXRcIjpcImcvTFwiLFwic2lWYWx1ZVwiOlwiNVwiLFwidXNWYWx1ZVwiOlwiMC41XCJ9LHtcIm5hbWVcIjpcIkVwaGVkcmluZSAodG94aWMpXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI+MlwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjYuMDUyXCIsXCJzaVJhbmdlXCI6XCI+MTIuMVwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxMi4xXCIsXCJ1c1ZhbHVlXCI6XCIyXCJ9LHtcIm5hbWVcIjpcIkVwaW5lcGhyaW5lXCIsXCJzcGVjaW1lblwiOlwiUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiPDYwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJwZy9tTFwiLFwiZmFjdG9yXCI6XCI1LjQ1OVwiLFwic2lSYW5nZVwiOlwiPDMzMFwiLFwic2lVbml0XCI6XCJwbW9sL0xcIixcInNpVmFsdWVcIjpcIjMzMFwiLFwidXNWYWx1ZVwiOlwiNjBcIn0se1wibmFtZVwiOlwiRXJ5dGhyb2N5dGUgc2VkaW1lbnRhdGlvbiByYXRlXCIsXCJzcGVjaW1lblwiOlwiV2hvbGUgYmxvb2RcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLTIwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtbS9oXCIsXCJmYWN0b3JcIjpcIjFcIixcInNpUmFuZ2VcIjpcIjAtMjBcIixcInNpVW5pdFwiOlwibW0vaFwiLFwic2lWYWx1ZVwiOlwiMFwiLFwidXNWYWx1ZVwiOlwiMFwifSx7XCJuYW1lXCI6XCJFcnl0aHJvcG9pZXRpblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNS0zNlwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiSVUvTFwiLFwiZmFjdG9yXCI6XCIxXCIsXCJzaVJhbmdlXCI6XCI1LTM2XCIsXCJzaVVuaXRcIjpcIklVL0xcIixcInNpVmFsdWVcIjpcIjVcIixcInVzVmFsdWVcIjpcIjVcIn0se1wibmFtZVwiOlwiRXN0cmFkaW9sIChFIDIgKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMzAtNDAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJwZy9tTFwiLFwiZmFjdG9yXCI6XCIzLjY3MVwiLFwic2lSYW5nZVwiOlwiMTEwLTE0NzBcIixcInNpVW5pdFwiOlwicG1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxMTBcIixcInVzVmFsdWVcIjpcIjMwXCJ9LHtcIm5hbWVcIjpcIkVzdHJpb2wgKEUgMyApXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI1LTQwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJuZy9tTFwiLFwiZmFjdG9yXCI6XCIzLjQ2N1wiLFwic2lSYW5nZVwiOlwiMTcuNC0xMzguOFwiLFwic2lVbml0XCI6XCJubW9sL0xcIixcInNpVmFsdWVcIjpcIjE3LjRcIixcInVzVmFsdWVcIjpcIjVcIn0se1wibmFtZVwiOlwiRXN0cm9nZW5zICh0b3RhbClcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjYwLTQwMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwicGcvbUxcIixcImZhY3RvclwiOlwiMVwiLFwic2lSYW5nZVwiOlwiNjAtNDAwXCIsXCJzaVVuaXRcIjpcIm5nL0xcIixcInNpVmFsdWVcIjpcIjYwXCIsXCJ1c1ZhbHVlXCI6XCI2MFwifSx7XCJuYW1lXCI6XCJFc3Ryb25lIChFIDEgKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxLjUtMjUuMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwicGcvbUxcIixcImZhY3RvclwiOlwiMy42OThcIixcInNpUmFuZ2VcIjpcIjUuNS05Mi41XCIsXCJzaVVuaXRcIjpcInBtb2wvTFwiLFwic2lWYWx1ZVwiOlwiNS41XCIsXCJ1c1ZhbHVlXCI6XCIxLjVcIn0se1wibmFtZVwiOlwiRXRoYW5vbCAoZXRoeWwgYWxjb2hvbClcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgd2hvbGUgYmxvb2RcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI8MjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjAuMjE3MVwiLFwic2lSYW5nZVwiOlwiPDQuM1wiLFwic2lVbml0XCI6XCJtbW9sL0xcIixcInNpVmFsdWVcIjpcIjQuM1wiLFwidXNWYWx1ZVwiOlwiMjBcIn0se1wibmFtZVwiOlwiRXRoY2hsb3J2eW5vbCAodG94aWMpXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIj4yMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjYuOTE1XCIsXCJzaVJhbmdlXCI6XCI+MTM4XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjEzOFwiLFwidXNWYWx1ZVwiOlwiMjBcIn0se1wibmFtZVwiOlwiRXRob3N1eGltaWRlXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI0MC0xMDBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL0xcIixcImZhY3RvclwiOlwiNy4wODRcIixcInNpUmFuZ2VcIjpcIjI4MC03MDBcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMjgwXCIsXCJ1c1ZhbHVlXCI6XCI0MFwifSx7XCJuYW1lXCI6XCJFdGh5bGVuZSBnbHljb2wgKHRveGljKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI+MzBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjAuMTYxMVwiLFwic2lSYW5nZVwiOlwiPjVcIixcInNpVW5pdFwiOlwibW1vbC9MXCIsXCJzaVZhbHVlXCI6XCI1XCIsXCJ1c1ZhbHVlXCI6XCIzMFwifSx7XCJuYW1lXCI6XCJGYXR0eSBhY2lkcyAobm9uZXN0ZXJpZmllZClcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiOC0yNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvZExcIixcImZhY3RvclwiOlwiMC4wMzU1XCIsXCJzaVJhbmdlXCI6XCIwLjI4LTAuODlcIixcInNpVW5pdFwiOlwibW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIwLjI4XCIsXCJ1c1ZhbHVlXCI6XCI4XCJ9LHtcIm5hbWVcIjpcIkZlY2FsIGZhdCAoYXMgc3RlYXJpYyBhY2lkKVwiLFwic3BlY2ltZW5cIjpcIlN0b29sXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMi02XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJnL2RcIixcImZhY3RvclwiOlwiMVwiLFwic2lSYW5nZVwiOlwiMi02XCIsXCJzaVVuaXRcIjpcImcvMjRoXCIsXCJzaVZhbHVlXCI6XCIyXCIsXCJ1c1ZhbHVlXCI6XCIyXCJ9LHtcIm5hbWVcIjpcIkZlbmZsdXJhbWluZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC4wNC0wLjMwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvbUxcIixcImZhY3RvclwiOlwiNC4zMjRcIixcInNpUmFuZ2VcIjpcIjAuMTgtMS4zMFwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIwLjE4XCIsXCJ1c1ZhbHVlXCI6XCIwLjA0XCJ9LHtcIm5hbWVcIjpcIkZlbnRhbnlsXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLjAxLTAuMTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9tTFwiLFwiZmFjdG9yXCI6XCIyLjk3MlwiLFwic2lSYW5nZVwiOlwiMC4wMi0wLjMwXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjAuMDJcIixcInVzVmFsdWVcIjpcIjAuMDFcIn0se1wibmFtZVwiOlwiRmVycml0aW5cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjE1LTIwMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibmcvbUxcIixcImZhY3RvclwiOlwiMi4yNDdcIixcInNpUmFuZ2VcIjpcIjMzLTQ1MFwiLFwic2lVbml0XCI6XCJwbW9sL0xuZy9tTFwiLFwic2lWYWx1ZVwiOlwiMzNcIixcInVzVmFsdWVcIjpcIjE1XCJ9LHtcIm5hbWVcIjpcIs6xMS1GZXRvcHJvdGVpblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiPDEwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvTFwiLFwiZmFjdG9yXCI6XCIxXCIsXCJzaVJhbmdlXCI6XCI8MTBcIixcInNpVW5pdFwiOlwiwrVnL0xcIixcInNpVmFsdWVcIjpcIjEwXCIsXCJ1c1ZhbHVlXCI6XCIxMFwifSx7XCJuYW1lXCI6XCJGaWJyaW4gZGVncmFkYXRpb24gcHJvZHVjdHNcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI8MTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9tTFwiLFwiZmFjdG9yXCI6XCIxXCIsXCJzaVJhbmdlXCI6XCI8MTBcIixcInNpVW5pdFwiOlwibWcvTFwiLFwic2lWYWx1ZVwiOlwiMTBcIixcInVzVmFsdWVcIjpcIjEwXCJ9LHtcIm5hbWVcIjpcIkZpYnJpbm9nZW5cIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIyMDAtNDAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCIwLjAyOTRcIixcInNpUmFuZ2VcIjpcIjUuOC0xMS44XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjUuOFwiLFwidXNWYWx1ZVwiOlwiMjAwXCJ9LHtcIm5hbWVcIjpcIkZsZWNhbmlkZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLjItMS4wXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvbUxcIixcImZhY3RvclwiOlwiMi40MTNcIixcInNpUmFuZ2VcIjpcIjAuNS0yLjRcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMC41XCIsXCJ1c1ZhbHVlXCI6XCIwLjJcIn0se1wibmFtZVwiOlwiRmx1b3JpZGVcIixcInNwZWNpbWVuXCI6XCJXaG9sZSBibG9vZFwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjwwLjA1XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCIwLjUyNjNcIixcInNpUmFuZ2VcIjpcIjwwLjAyN1wiLFwic2lVbml0XCI6XCJtbW9sL0xcIixcInNpVmFsdWVcIjpcIjAuMDI3XCIsXCJ1c1ZhbHVlXCI6XCIwLjA1XCJcbn0se1wibmFtZVwiOlwiRmx1b3hldGluZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMjAwLTExMDBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm5nL21MXCIsXCJmYWN0b3JcIjpcIjAuMDAzMjNcIixcInNpUmFuZ2VcIjpcIjAuNjUtMy41NlwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIwLjY1XCIsXCJ1c1ZhbHVlXCI6XCIyMDBcIn0se1wibmFtZVwiOlwiRmx1cmF6ZXBhbSAodG94aWMpXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIj4wLjJcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9tTFwiLFwiZmFjdG9yXCI6XCIyLjVcIixcInNpUmFuZ2VcIjpcIj4wLjVcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMC41XCIsXCJ1c1ZhbHVlXCI6XCIwLjJcIn0se1wibmFtZVwiOlwiRm9sYXRlIChmb2xpYyBhY2lkKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMy0xNlwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibmcvbUxcIixcImZhY3RvclwiOlwiMi4yNjZcIixcInNpUmFuZ2VcIjpcIjctMzZcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCI3XCIsXCJ1c1ZhbHVlXCI6XCIzXCJ9LHtcIm5hbWVcIjpcIkZvbGxpY2xlLXN0aW11bGF0aW5nIGhvcm1vbmUgKEZTSClcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMS0xMDBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1JVS9tTFwiLFwiZmFjdG9yXCI6XCIxXCIsXCJzaVJhbmdlXCI6XCIxLTEwMFwiLFwic2lVbml0XCI6XCJJVS9MXCIsXCJzaVZhbHVlXCI6XCIxXCIsXCJ1c1ZhbHVlXCI6XCIxXCJ9LHtcIm5hbWVcIjpcIkZydWN0b3NhbWluZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMzYtNTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL0xcIixcImZhY3RvclwiOlwiNS41ODFcIixcInNpUmFuZ2VcIjpcIjIwMC0yODBcIixcInNpVW5pdFwiOlwibW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIyMDBcIixcInVzVmFsdWVcIjpcIjM2XCJ9LHtcIm5hbWVcIjpcIkZydWN0b3NlXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxLTZcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjU1LjUwNlwiLFwic2lSYW5nZVwiOlwiNTUtMzM1XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjU1XCIsXCJ1c1ZhbHVlXCI6XCIxXCJ9LHtcIm5hbWVcIjpcIkdhbGFjdG9zZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI8MjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjAuMDU1NVwiLFwic2lSYW5nZVwiOlwiPDEuMTBcIixcInNpVW5pdFwiOlwibW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxLjEwXCIsXCJ1c1ZhbHVlXCI6XCIyMFwifSx7XCJuYW1lXCI6XCJHYXN0cmluXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIyNS05MFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwicGcvbUxcIixcImZhY3RvclwiOlwiMC40ODFcIixcInNpUmFuZ2VcIjpcIjEyLTQ1XCIsXCJzaVVuaXRcIjpcInBtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMTJcIixcInVzVmFsdWVcIjpcIjI1XCJ9LHtcIm5hbWVcIjpcIkdlbnRhbWljaW5cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjYtMTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9tTFwiLFwiZmFjdG9yXCI6XCIyLjA5XCIsXCJzaVJhbmdlXCI6XCIxMi0yMVwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxMlwiLFwidXNWYWx1ZVwiOlwiNlwifSx7XCJuYW1lXCI6XCJHbHVjYWdvblwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjIwLTEwMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwicGcvbUxcIixcImZhY3RvclwiOlwiMVwiLFwic2lSYW5nZVwiOlwiMjAtMTAwXCIsXCJzaVVuaXRcIjpcIm5nL0xcIixcInNpVmFsdWVcIjpcIjIwXCIsXCJ1c1ZhbHVlXCI6XCIyMFwifSx7XCJuYW1lXCI6XCJHbHVjb3NlXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI3MC0xMTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjAuMDU1NVwiLFwic2lSYW5nZVwiOlwiMy45LTYuMVwiLFwic2lVbml0XCI6XCJtbW9sL0xcIixcInNpVmFsdWVcIjpcIjMuOVwiLFwidXNWYWx1ZVwiOlwiNzBcIn0se1wibmFtZVwiOlwiR2x1Y29zZS02LXBob3NwaGF0ZSBkZWh5ZHJvZ2VuYXNlXCIsXCJzcGVjaW1lblwiOlwiV2hvbGUgYmxvb2RcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxMC0xNFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiVS9nIGhlbW9nbG9iaW5cIixcImZhY3RvclwiOlwiMC4wMTY3XCIsXCJzaVJhbmdlXCI6XCIwLjE3LTAuMjRcIixcInNpVW5pdFwiOlwibmthdC9nIGhlbW9nbG9iaW5cIixcInNpVmFsdWVcIjpcIjAuMTdcIixcInVzVmFsdWVcIjpcIjEwXCJ9LHtcIm5hbWVcIjpcIkdsdXRhbWljIGFjaWRcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLjItMi44XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCI2Ny45NjdcIixcInNpUmFuZ2VcIjpcIjE1LTE5MFwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxNVwiLFwidXNWYWx1ZVwiOlwiMC4yXCJ9LHtcIm5hbWVcIjpcIkdsdXRhbWluZVwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjYuMS0xMC4yXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCI2OC40MjNcIixcInNpUmFuZ2VcIjpcIjQyMC03MDBcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiNDIwXCIsXCJ1c1ZhbHVlXCI6XCI2LjFcIn0se1wibmFtZVwiOlwizrMtR2x1dGFteWx0cmFuc2ZlcmFzZSAoR0dUKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMi0zMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiVS9MXCIsXCJmYWN0b3JcIjpcIjAuMDE2N1wiLFwic2lSYW5nZVwiOlwiMC4wMy0wLjUxXCIsXCJzaVVuaXRcIjpcIsK1a2F0L0xcIixcInNpVmFsdWVcIjpcIjAuMDNcIixcInVzVmFsdWVcIjpcIjJcIn0se1wibmFtZVwiOlwiR2x1dGV0aGltaWRlXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIyLTZcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9tTFwiLFwiZmFjdG9yXCI6XCI0LjYwM1wiLFwic2lSYW5nZVwiOlwiOS0yOFwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCI5XCIsXCJ1c1ZhbHVlXCI6XCIyXCJ9LHtcIm5hbWVcIjpcIkdseWNlcm9sIChmcmVlKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC4zLTEuNzJcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjAuMTA4NlwiLFwic2lSYW5nZVwiOlwiMC4zMi0wLjE4N1wiLFwic2lVbml0XCI6XCJtbW9sL0xcIixcInNpVmFsdWVcIjpcIjAuMzJcIixcInVzVmFsdWVcIjpcIjAuM1wifSx7XCJuYW1lXCI6XCJHbHljaW5lXCIsXCJzcGVjaW1lblwiOlwiUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC45LTQuMlwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvZExcIixcImZhY3RvclwiOlwiMTMzLjJcIixcInNpUmFuZ2VcIjpcIjEyMC01NjBcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMTIwXCIsXCJ1c1ZhbHVlXCI6XCIwLjlcIn0se1wibmFtZVwiOlwiR29sZFwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiPDEwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvZExcIixcImZhY3RvclwiOlwiNTAuNzdcIixcInNpUmFuZ2VcIjpcIjw1MDBcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCI1MDBcIixcInVzVmFsdWVcIjpcIjEwXCJ9LHtcIm5hbWVcIjpcIkdyb3d0aCBob3Jtb25lIChHSClcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAtMThcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm5nL21MXCIsXCJmYWN0b3JcIjpcIjFcIixcInNpUmFuZ2VcIjpcIjAtMThcIixcInNpVW5pdFwiOlwiwrVnL0xcIixcInNpVmFsdWVcIjpcIjBcIixcInVzVmFsdWVcIjpcIjBcIn0se1wibmFtZVwiOlwiSGFsb3Blcmlkb2xcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNi0yNFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibmcvbUxcIixcImZhY3RvclwiOlwiMi42NlwiLFwic2lSYW5nZVwiOlwiMTYtNjVcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxNlwiLFwidXNWYWx1ZVwiOlwiNlwifSx7XCJuYW1lXCI6XCJIYXB0b2dsb2JpblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMjYtMTg1XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCIxMFwiLFwic2lSYW5nZVwiOlwiMjYwLTE4NTBcIixcInNpVW5pdFwiOlwibWcvTFwiLFwic2lWYWx1ZVwiOlwiMjYwXCIsXCJ1c1ZhbHVlXCI6XCIyNlwifSx7XCJuYW1lXCI6XCJIZW1hdG9jcml0XCIsXCJzcGVjaW1lblwiOlwiV2hvbGUgYmxvb2RcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI0MS01MFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiJVwiLFwiZmFjdG9yXCI6XCIwLjAxXCIsXCJzaVJhbmdlXCI6XCIwLjQxLTAuNTBcIixcInNpVW5pdFwiOlwiUHJvcG9ydGlvbiBvZiAxLjBcIixcInNpVmFsdWVcIjpcIjAuNDFcIixcInVzVmFsdWVcIjpcIjQxXCJ9LHtcIm5hbWVcIjpcIkhlbW9nbG9iaW5cIixcInNwZWNpbWVuXCI6XCJXaG9sZSBibG9vZFwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjE0LjAtMTcuNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiZy9kTFwiLFwiZmFjdG9yXCI6XCIxMFwiLFwic2lSYW5nZVwiOlwiMTQwLTE3NVwiLFwic2lVbml0XCI6XCJnL0xcIixcInNpVmFsdWVcIjpcIjE0MFwiLFwidXNWYWx1ZVwiOlwiMTQuMFwifSx7XCJuYW1lXCI6XCJNZWFuIGNvcnB1c2N1bGFyIGhlbW9nbG9iaW4gKE1DSClcIixcInNwZWNpbWVuXCI6XCJXaG9sZSBibG9vZFwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjI2LTM0XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJwZy9jZWxsXCIsXCJmYWN0b3JcIjpcIjFcIixcInNpUmFuZ2VcIjpcIjI2LTM0XCIsXCJzaVVuaXRcIjpcInBnL2NlbGxcIixcInNpVmFsdWVcIjpcIjI2XCIsXCJ1c1ZhbHVlXCI6XCIyNlwifSx7XCJuYW1lXCI6XCJNZWFuIGNvcnB1c2N1bGFyIGhlbW9nbG9iaW4gY29uY2VudHJhdGlvbiAoTUNIQylcIixcInNwZWNpbWVuXCI6XCJXaG9sZSBibG9vZFwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjMzLTM3XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJnL2RMXCIsXCJmYWN0b3JcIjpcIjEwXCIsXCJzaVJhbmdlXCI6XCIzMzAtMzcwXCIsXCJzaVVuaXRcIjpcImcvTFwiLFwic2lWYWx1ZVwiOlwiMzMwXCIsXCJ1c1ZhbHVlXCI6XCIzM1wifSx7XCJuYW1lXCI6XCJNZWFuIGNvcnB1c2N1bGFyIHZvbHVtZSAoTUNWKVwiLFwic3BlY2ltZW5cIjpcIldob2xlIGJsb29kXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiODAtMTAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtW0zXCIsXCJmYWN0b3JcIjpcIjFcIixcInNpUmFuZ2VcIjpcIjgwLTEwMFwiLFwic2lVbml0XCI6XCJmTFwiLFwic2lWYWx1ZVwiOlwiODBcIixcInVzVmFsdWVcIjpcIjgwXCJ9LHtcIm5hbWVcIjpcIkhlbW9nbG9iaW4gQSAxYyAoZ2x5Y2F0ZWQgaGVtb2dsb2JpbilcIixcInNwZWNpbWVuXCI6XCJXaG9sZSBibG9vZFwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjQtN1wiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiJSBvZiB0b3RhbCBoZW1vZ2xvYmluXCIsXCJmYWN0b3JcIjpcIjAuMDFcIixcInNpUmFuZ2VcIjpcIjAuMDQtMC4wN1wiLFwic2lVbml0XCI6XCJQcm9wb3J0aW9uIG9mIHRvdGFsIGhlbW9nbG9iaW5cIixcInNpVmFsdWVcIjpcIjAuMDRcIixcInVzVmFsdWVcIjpcIjRcIn0se1wibmFtZVwiOlwiSGVtb2dsb2JpbiBBIDJcIixcInNwZWNpbWVuXCI6XCJXaG9sZSBibG9vZFwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjIuMC0zLjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIiVcIixcImZhY3RvclwiOlwiMC4wMVwiLFwic2lSYW5nZVwiOlwiMC4wMi0wLjAzXCIsXCJzaVVuaXRcIjpcIlByb3BvcnRpb24gb2YgMS4wXCIsXCJzaVZhbHVlXCI6XCIwLjAyXCIsXCJ1c1ZhbHVlXCI6XCIyLjBcIn0se1wibmFtZVwiOlwiSGlzdGFtaW5lXCIsXCJzcGVjaW1lblwiOlwiUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC41LTEuMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL0xcIixcImZhY3RvclwiOlwiOC45OTdcIixcInNpUmFuZ2VcIjpcIjQuNS05LjBcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCI0LjVcIixcInVzVmFsdWVcIjpcIjAuNVwifSx7XCJuYW1lXCI6XCJIaXN0aWRpbmVcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLjUtMS43XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCI2NC40NVwiLFwic2lSYW5nZVwiOlwiMzItMTEwXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjMyXCIsXCJ1c1ZhbHVlXCI6XCIwLjVcIn0se1wibmFtZVwiOlwiSG9tb2N5c3RlaW5lXCIsXCJzcGVjaW1lblwiOlwiUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC42OC0yLjAyXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9MXCIsXCJmYWN0b3JcIjpcIjcuMzk3XCIsXCJzaVJhbmdlXCI6XCI1LTE1XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjVcIixcInVzVmFsdWVcIjpcIjAuNjhcIn0se1wibmFtZVwiOlwiSG9tb3ZhbmlsbGljIGFjaWRcIixcInNwZWNpbWVuXCI6XCJVcmluZVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjEuNC04LjhcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nLzI0IGhcIixcImZhY3RvclwiOlwiNS40ODlcIixcInNpUmFuZ2VcIjpcIjgtNDhcIixcInNpVW5pdFwiOlwiwrVtb2wvZFwiLFwic2lWYWx1ZVwiOlwiOFwiLFwidXNWYWx1ZVwiOlwiMS40XCJ9LHtcIm5hbWVcIjpcIkh5ZHJvY29kb25lXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI8MC4wMlwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjMuMzRcIixcInNpUmFuZ2VcIjpcIjwwLjA2XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjAuMDZcIixcInVzVmFsdWVcIjpcIjAuMDJcIn0se1wibmFtZVwiOlwiSHlkcm9tb3JwaG9uZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC4wMDgtMC4wMzJcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9tTFwiLFwiZmFjdG9yXCI6XCIzNTA0XCIsXCJzaVJhbmdlXCI6XCIyOC0xMTJcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCIyOFwiLFwidXNWYWx1ZVwiOlwiMC4wMDhcIn0se1wibmFtZVwiOlwizrItSHlkcm94eWJ1dHlyaWMgYWNpZFwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjwzLjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjk2LjA2XCIsXCJzaVJhbmdlXCI6XCI8MzAwXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjMwMFwiLFwidXNWYWx1ZVwiOlwiMy4wXCJ9LHtcIm5hbWVcIjpcIjUtSHlkcm94eWluZG9sZWFjZXRpYyBhY2lkICg1LUhJQUEpXCIsXCJzcGVjaW1lblwiOlwiVXJpbmVcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIyLTZcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nLzI0aFwiLFwiZmFjdG9yXCI6XCI1LjIzXCIsXCJzaVJhbmdlXCI6XCIxMC40LTMxLjJcIixcInNpVW5pdFwiOlwiwrVtb2wvZFwiLFwic2lWYWx1ZVwiOlwiMTAuNFwiLFwidXNWYWx1ZVwiOlwiMlwifSx7XCJuYW1lXCI6XCJIeWRyb3h5cHJvbGluZVwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjwwLjU1XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCI3Ni4yNjZcIixcInNpUmFuZ2VcIjpcIjw0MlwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCI0MlwiLFwidXNWYWx1ZVwiOlwiMC41NVwifSx7XCJuYW1lXCI6XCJJYnVwcm9mZW5cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjEwLTUwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvbUxcIixcImZhY3RvclwiOlwiNC44NDhcIixcInNpUmFuZ2VcIjpcIjUwLTI0M1wiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCI1MFwiLFwidXNWYWx1ZVwiOlwiMTBcIn0se1wibmFtZVwiOlwiSW1pcHJhbWluZVwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjE1MC0yNTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm5nL21MXCIsXCJmYWN0b3JcIjpcIjMuNTY2XCIsXCJzaVJhbmdlXCI6XCI1MzYtODkzXCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiNTM2XCIsXCJ1c1ZhbHVlXCI6XCIxNTBcIn0se1wibmFtZVwiOlwiSW1tdW5vZ2xvYnVsaW4gQSAoSWdBKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNDAtMzUwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCIxMFwiLFwic2lSYW5nZVwiOlwiNDAwLTM1MDBcIixcInNpVW5pdFwiOlwibWcvTFwiLFwic2lWYWx1ZVwiOlwiNDAwXCIsXCJ1c1ZhbHVlXCI6XCI0MFwifSx7XCJuYW1lXCI6XCJJbW11bm9nbG9idWxpbiBEIChJZ0QpXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLThcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjEwXCIsXCJzaVJhbmdlXCI6XCIwLTgwXCIsXCJzaVVuaXRcIjpcIm1nL0xcIixcInNpVmFsdWVcIjpcIjBcIixcInVzVmFsdWVcIjpcIjBcIn0se1wibmFtZVwiOlwiSW1tdW5vZ2xvYnVsaW4gRSAoSWdFKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC0xNTAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvTFwiLFwiZmFjdG9yXCI6XCIwLjAwMVwiLFwic2lSYW5nZVwiOlwiMC0xLjVcIixcInNpVW5pdFwiOlwibWcvTFwiLFwic2lWYWx1ZVwiOlwiMFwiLFwidXNWYWx1ZVwiOlwiMFwifSx7XCJuYW1lXCI6XCJJbW11bm9nbG9idWxpbiBHIChJZ0cpXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI2NTAtMTYwMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvZExcIixcImZhY3RvclwiOlwiMC4wMVwiLFwic2lSYW5nZVwiOlwiNi41LTE2LjBcIixcInNpVW5pdFwiOlwiZy9MXCIsXCJzaVZhbHVlXCI6XCI2LjVcIixcInVzVmFsdWVcIjpcIjY1MFwifSx7XCJuYW1lXCI6XCJJbW11bm9nbG9idWxpbiBNIChJZ00pXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI1NC0zMDBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjEwXCIsXCJzaVJhbmdlXCI6XCI1NTAtMzAwMFwiLFwic2lVbml0XCI6XCJtZy9MXCIsXCJzaVZhbHVlXCI6XCI1NTBcIixcInVzVmFsdWVcIjpcIjU0XCJ9LHtcIm5hbWVcIjpcIkluc3VsaW5cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjIuMC0yMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiXCIsXCJmYWN0b3JcIjpcIjYuOTQ1XCIsXCJzaVJhbmdlXCI6XCIxNC0xNDBcIixcInNpVW5pdFwiOlwicG1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxNFwiLFwidXNWYWx1ZVwiOlwiMi4wXCJ9LHtcIm5hbWVcIjpcIkluc3VsaW5saWtlIGdyb3d0aCBmYWN0b3JcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjEzMC00NTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm5nL21MXCIsXCJmYWN0b3JcIjpcIjAuMTMxXCIsXCJzaVJhbmdlXCI6XCIxOC02MFwiLFwic2lVbml0XCI6XCJubW9sL0xcIixcInNpVmFsdWVcIjpcIjE4XCIsXCJ1c1ZhbHVlXCI6XCIxMzBcIn0se1wibmFtZVwiOlwiSW9kaW5lXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI1OC03N1wiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL0xcIixcImZhY3RvclwiOlwiNy44OFwiLFwic2lSYW5nZVwiOlwiNDUwLTU4MFwiLFwic2lVbml0XCI6XCJubW9sL0xcIixcInNpVmFsdWVcIjpcIjQ1MFwiLFwidXNWYWx1ZVwiOlwiNThcIn0se1wibmFtZVwiOlwiSXJvblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNjAtMTUwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvZExcIixcImZhY3RvclwiOlwiMC4xNzlcIixcInNpUmFuZ2VcIjpcIjEwLjctMjYuOVwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxMC43XCIsXCJ1c1ZhbHVlXCI6XCI2MFwifSx7XCJuYW1lXCI6XCJJcm9uLWJpbmRpbmcgY2FwYWNpdHlcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjI1MC00NTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9kTFwiLFwiZmFjdG9yXCI6XCIwLjE3OVwiLFwic2lSYW5nZVwiOlwiNDQuOC04MC42XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjQ0LjhcIixcInVzVmFsdWVcIjpcIjI1MFwifSx7XCJuYW1lXCI6XCJJc29sZXVjaW5lXCIsXCJzcGVjaW1lblwiOlwiUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC41LTEuM1wiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvZExcIixcImZhY3RvclwiOlwiNzYuMjM2XCIsXCJzaVJhbmdlXCI6XCI0MC0xMDBcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiNDBcIixcInVzVmFsdWVcIjpcIjAuNVwifSx7XCJuYW1lXCI6XCJJc29uaWF6aWRcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxLTdcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9tTFwiLFwiZmFjdG9yXCI6XCI3LjI5MVwiLFwic2lSYW5nZVwiOlwiNy01MVwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCI3XCIsXCJ1c1ZhbHVlXCI6XCIxXCJ9LHtcIm5hbWVcIjpcIklzb3Byb3Bhbm9sICh0b3hpYylcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiPjQwMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvTFwiLFwiZmFjdG9yXCI6XCIwLjAxNjZcIixcInNpUmFuZ2VcIjpcIj42LjY0XCIsXCJzaVVuaXRcIjpcIm1tb2wvTFwiLFwic2lWYWx1ZVwiOlwiNi42NFwiLFwidXNWYWx1ZVwiOlwiNDAwXCJ9LHtcIm5hbWVcIjpcIkthbmFteWNpblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIyNS0zNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjIuMDhcIixcInNpUmFuZ2VcIjpcIjUyLTcyXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjUyXCIsXCJ1c1ZhbHVlXCI6XCIyNVwifSx7XCJuYW1lXCI6XCJLZXRhbWluZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC4yLTYuM1wiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjQuMjA2XCIsXCJzaVJhbmdlXCI6XCIwLjgtMjZcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMC44XCIsXCJ1c1ZhbHVlXCI6XCIwLjJcIn0se1wibmFtZVwiOlwiMTctS2V0b3N0ZXJvaWRzXCIsXCJzcGVjaW1lblwiOlwiVXJpbmVcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIzLTEyXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy8yNGhcIixcImZhY3RvclwiOlwiMy4zM1wiLFwic2lSYW5nZVwiOlwiMTAtNDJcIixcInNpVW5pdFwiOlwiwrVtb2wvZFwiLFwic2lWYWx1ZVwiOlwiMTBcIixcInVzVmFsdWVcIjpcIjNcIn0se1wibmFtZVwiOlwiTGFjdGF0ZVwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjUuMC0xNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvZExcIixcImZhY3RvclwiOlwiMC4xMTFcIixcInNpUmFuZ2VcIjpcIjAuNi0xLjdcIixcInNpVW5pdFwiOlwibW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIwLjZcIixcInVzVmFsdWVcIjpcIjUuMFwifSx7XCJuYW1lXCI6XCJMYWN0YXRlIGRlaHlkcm9nZW5hc2UgKExESClcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjEwMC0yMDBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIlUvTFwiLFwiZmFjdG9yXCI6XCIwLjAxNjdcIixcInNpUmFuZ2VcIjpcIjEuNy0zLjRcIixcInNpVW5pdFwiOlwiwrVrYXQvTFwiLFwic2lWYWx1ZVwiOlwiMS43XCIsXCJ1c1ZhbHVlXCI6XCIxMDBcIn0se1wibmFtZVwiOlwiTEQxXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxNy0yN1wiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiJVwiLFwiZmFjdG9yXCI6XCIwLjAxXCIsXCJzaVJhbmdlXCI6XCIwLjE3LTAuMjdcIixcInNpVW5pdFwiOlwiUHJvcG9ydGlvbiBvZiAxLjBcIixcInNpVmFsdWVcIjpcIjAuMTdcIixcInVzVmFsdWVcIjpcIjE3XCJ9LHtcIm5hbWVcIjpcIkxEMlwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMjctMzdcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIiVcIixcImZhY3RvclwiOlwiMC4wMVwiLFwic2lSYW5nZVwiOlwiMC4yNy0wLjM3XCIsXCJzaVVuaXRcIjpcIlByb3BvcnRpb24gb2YgMS4wXCIsXCJzaVZhbHVlXCI6XCIwLjI3XCIsXCJ1c1ZhbHVlXCI6XCIyN1wifSx7XCJuYW1lXCI6XCJMRDNcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjE4LTI1XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCIlXCIsXCJmYWN0b3JcIjpcIjAuMDFcIixcInNpUmFuZ2VcIjpcIjAuMTgtMC4yNVwiLFwic2lVbml0XCI6XCJQcm9wb3J0aW9uIG9mIDEuMFwiLFwic2lWYWx1ZVwiOlwiMC4xOFwiLFwidXNWYWx1ZVwiOlwiMThcIn0se1wibmFtZVwiOlwiTEQ0XCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIzLThcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIiVcIixcImZhY3RvclwiOlwiMC4wMVwiLFwic2lSYW5nZVwiOlwiMC4wMy0wLjA4XCIsXCJzaVVuaXRcIjpcIlByb3BvcnRpb24gb2YgMS4wXCIsXCJzaVZhbHVlXCI6XCIwLjAzXCIsXCJ1c1ZhbHVlXCI6XCIzXCJ9LHtcIm5hbWVcIjpcIkxENVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC01XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCIlXCIsXCJmYWN0b3JcIjpcIjAuMDFcIixcInNpUmFuZ2VcIjpcIjAtMC4wNVwiLFwic2lVbml0XCI6XCJQcm9wb3J0aW9uIG9mIDEuMFwiLFwic2lWYWx1ZVwiOlwiMFwiLFwidXNWYWx1ZVwiOlwiMFwifSx7XCJuYW1lXCI6XCJMZWFkXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI8MTAtMjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9kTFwiLFwiZmFjdG9yXCI6XCIwLjA0ODNcIixcInNpUmFuZ2VcIjpcIjwwLjUtMS4wXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjwwLjVcIixcInVzVmFsdWVcIjpcIjwxMFwifSx7XCJuYW1lXCI6XCJMZXVjaW5lXCIsXCJzcGVjaW1lblwiOlwiUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMS4wLTIuM1wiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvZExcIixcImZhY3RvclwiOlwiNzYuMjM3XCIsXCJzaVJhbmdlXCI6XCI3NS0xNzVcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiNzVcIixcInVzVmFsdWVcIjpcIjEuMFwifSx7XCJuYW1lXCI6XCJMaWRvY2FpbmVcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMS41LTYuMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjQuMjY3XCIsXCJzaVJhbmdlXCI6XCI2LjQtMjUuNlwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCI2LjRcIixcInVzVmFsdWVcIjpcIjEuNVwifSx7XCJuYW1lXCI6XCJMaXBhc2VcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjMxLTE4NlwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiVS9MXCIsXCJmYWN0b3JcIjpcIjAuMDE2N1wiLFwic2lSYW5nZVwiOlwiMC41LTMuMlwiLFwic2lVbml0XCI6XCLCtWthdC9MXCIsXCJzaVZhbHVlXCI6XCIwLjVcIixcInVzVmFsdWVcIjpcIjMxXCJ9LHtcIm5hbWVcIjpcIkxpcG9wcm90ZWluKGEpIFtMcChhKV1cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjEwLTMwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCIwLjAzNTdcIixcInNpUmFuZ2VcIjpcIjAuMzUtMS4wXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjAuMzVcIixcInVzVmFsdWVcIjpcIjEwXCJ9LHtcIm5hbWVcIjpcIkxpdGhpdW1cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuNi0xLjJcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1FcS9MXCIsXCJmYWN0b3JcIjpcIjFcIixcInNpUmFuZ2VcIjpcIjAuNi0xLjJcIixcInNpVW5pdFwiOlwibW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIwLjZcIixcInVzVmFsdWVcIjpcIjAuNlwifSx7XCJuYW1lXCI6XCJMb3JhemVwYW1cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjUwLTI0MFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibmcvbUxcIixcImZhY3RvclwiOlwiMy4xMTRcIixcInNpUmFuZ2VcIjpcIjE1Ni03NDZcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxNTZcIixcInVzVmFsdWVcIjpcIjUwXCJ9LHtcIm5hbWVcIjpcIkx1dGVpbml6aW5nIGhvcm1vbmUgKExIKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxLTEwNFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibUlVL21MXCIsXCJmYWN0b3JcIjpcIjFcIixcInNpUmFuZ2VcIjpcIjEtMTA0XCIsXCJzaVVuaXRcIjpcIklVL0xcIixcInNpVmFsdWVcIjpcIjFcIixcInVzVmFsdWVcIjpcIjFcIn0se1wibmFtZVwiOlwiTHljb3BlbmVcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuMTUtMC4yNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvTFwiLFwiZmFjdG9yXCI6XCIxLjg2M1wiLFwic2lSYW5nZVwiOlwiMC4yOC0wLjQ2XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjAuMjhcIixcInVzVmFsdWVcIjpcIjAuMTVcIn0se1wibmFtZVwiOlwiTHlzZXJnaWMgYWNpZCBkaWV0aHlsYW1pZGVcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjwwLjAwNFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjM3MjZcIixcInNpUmFuZ2VcIjpcIjwxNVwiLFwic2lVbml0XCI6XCJubW9sL0xcIixcInNpVmFsdWVcIjpcIjE1XCIsXCJ1c1ZhbHVlXCI6XCIwLjAwNFwifSx7XCJuYW1lXCI6XCJMeXNpbmVcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxLjItMy41XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCI2OC40MDRcIixcInNpUmFuZ2VcIjpcIjgwLTI0MFwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCI4MFwiLFwidXNWYWx1ZVwiOlwiMS4yXCJ9LHtcIm5hbWVcIjpcIkx5c296eW1lXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuNC0xLjNcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjEwXCIsXCJzaVJhbmdlXCI6XCI0LTEzXCIsXCJzaVVuaXRcIjpcIm1nL0xcIixcInNpVmFsdWVcIjpcIjRcIixcInVzVmFsdWVcIjpcIjAuNFwifSx7XCJuYW1lXCI6XCJNYWduZXNpdW1cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjEuMy0yLjFcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1FcS9MXCIsXCJmYWN0b3JcIjpcIjAuNVwiLFwic2lSYW5nZVwiOlwiMC42NS0xLjA1XCIsXCJzaVVuaXRcIjpcIm1tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMC42NVwiLFwidXNWYWx1ZVwiOlwiMS4zXCJ9LHtcIm5hbWVcIjpcIk1hbmdhbmVzZVwiLFwic3BlY2ltZW5cIjpcIldob2xlIGJsb29kXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMTAtMTJcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9MXCIsXCJmYWN0b3JcIjpcIjE4LjIwMlwiLFwic2lSYW5nZVwiOlwiMTgyLTIxOFwiLFwic2lVbml0XCI6XCJubW9sL0xcIixcInNpVmFsdWVcIjpcIjE4MlwiLFwidXNWYWx1ZVwiOlwiMTBcIn0se1wibmFtZVwiOlwiTWFwcm90aWxpbmVcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIyMDAtNjAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJuZy9tTFwiLFwiZmFjdG9yXCI6XCIxXCIsXCJzaVJhbmdlXCI6XCIyMDAtNjAwXCIsXCJzaVVuaXRcIjpcIsK1Zy9MXCIsXCJzaVZhbHVlXCI6XCIyMDBcIixcInVzVmFsdWVcIjpcIjIwMFwifSx7XCJuYW1lXCI6XCJNZWxhdG9uaW5cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjEwLTE1XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJcIixcImZhY3RvclwiOlwiNC4zMDVcIixcInNpUmFuZ2VcIjpcIjQ1LTY2XCIsXCJzaVVuaXRcIjpcInBtb2wvTFwiLFwic2lWYWx1ZVwiOlwiNDVcIixcInVzVmFsdWVcIjpcIjEwXCJ9LHtcIm5hbWVcIjpcIk1lcGVyaWRpbmVcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNDAwLTcwMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibmcvbUxcIixcImZhY3RvclwiOlwiNC4wNDNcIixcInNpUmFuZ2VcIjpcIjE2MjAtMjgzMFwiLFwic2lVbml0XCI6XCJubW9sL0xcIixcInNpVmFsdWVcIjpcIjE2MjBcIixcInVzVmFsdWVcIjpcIjQwMFwifSx7XCJuYW1lXCI6XCJNZXJjdXJ5XCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI8NVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL0xcIixcImZhY3RvclwiOlwiNC45ODVcIixcInNpUmFuZ2VcIjpcIjwyNVwiLFwic2lVbml0XCI6XCJubW9sL0xcIixcInNpVmFsdWVcIjpcIjI1XCIsXCJ1c1ZhbHVlXCI6XCI1XCJ9LHtcIm5hbWVcIjpcIk1ldGFuZXBocmluZSAodG90YWwpXCIsXCJzcGVjaW1lblwiOlwiVXJpbmVcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI8MS4wXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy8yNGhcIixcImZhY3RvclwiOlwiNS4wN1wiLFwic2lSYW5nZVwiOlwiPDVcIixcInNpVW5pdFwiOlwiwrVtb2wvZFwiLFwic2lWYWx1ZVwiOlwiNVwiLFwidXNWYWx1ZVwiOlwiMS4wXCJ9LHtcIm5hbWVcIjpcIk1ldGZvcm1pblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMS00XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvbUxcIixcImZhY3RvclwiOlwiNy43NDJcIixcInNpUmFuZ2VcIjpcIjgtMzBcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiOFwiLFwidXNWYWx1ZVwiOlwiMVwifSx7XCJuYW1lXCI6XCJNZXRoYWRvbmVcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMTAwLTQwMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibmcvbUxcIixcImZhY3RvclwiOlwiMC4wMDMyM1wiLFwic2lSYW5nZVwiOlwiMC4zMi0xLjI5XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjAuMzJcIixcInVzVmFsdWVcIjpcIjEwMFwifSx7XCJuYW1lXCI6XCJNZXRoYW1waGV0YW1pbmVcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuMDEtMC4wNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjYuN1wiLFwic2lSYW5nZVwiOlwiMC4wNy0wLjM0XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjAuMDdcIixcInVzVmFsdWVcIjpcIjAuMDFcIn0se1wibmFtZVwiOlwiTWV0aGFub2xcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI8MjAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvbUxcIixcImZhY3RvclwiOlwiMC4wMzEyXCIsXCJzaVJhbmdlXCI6XCI8Ni4yXCIsXCJzaVVuaXRcIjpcIm1tb2wvTFwiLFwic2lWYWx1ZVwiOlwiNi4yXCIsXCJ1c1ZhbHVlXCI6XCIyMDBcIn0se1wibmFtZVwiOlwiTWV0aGFxdWFsb25lXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjItM1wiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjRcIixcInNpUmFuZ2VcIjpcIjgtMTJcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiOFwiLFwidXNWYWx1ZVwiOlwiMlwifSx7XCJuYW1lXCI6XCJNZXRoZW1vZ2xvYmluXCIsXCJzcGVjaW1lblwiOlwiV2hvbGUgYmxvb2RcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI8MC4yNFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiZy9kTFwiLFwiZmFjdG9yXCI6XCIxNTVcIixcInNpUmFuZ2VcIjpcIjwzNy4yXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjM3LjJcIixcInVzVmFsdWVcIjpcIjAuMjRcIn0se1wibmFtZVwiOlwiTWV0aGVtb2dsb2JpblwiLFwic3BlY2ltZW5cIjpcIldob2xlIGJsb29kXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiPDEuMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiJSBvZiB0b3RhbCBoZW1vZ2xvYmluXCIsXCJmYWN0b3JcIjpcIjAuMDFcIixcInNpUmFuZ2VcIjpcIjwwLjAxXCIsXCJzaVVuaXRcIjpcIlByb3BvcnRpb24gb2YgdG90YWwgaGVtb2dsb2JpblwiLFwic2lWYWx1ZVwiOlwiMC4wMVwiLFwidXNWYWx1ZVwiOlwiMS4wXCJ9LHtcIm5hbWVcIjpcIk1ldGhpY2lsbGluXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI4LTI1XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9MXCIsXCJmYWN0b3JcIjpcIjIuNjM2XCIsXCJzaVJhbmdlXCI6XCIyMi02NlwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIyMlwiLFwidXNWYWx1ZVwiOlwiOFwifSx7XCJuYW1lXCI6XCJNZXRoaW9uaW5lXCIsXCJzcGVjaW1lblwiOlwiUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC4xLTAuNlwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvZExcIixcImZhY3RvclwiOlwiNjcuMDJcIixcInNpUmFuZ2VcIjpcIjYtNDBcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiNlwiLFwidXNWYWx1ZVwiOlwiMC4xXCJ9LHtcIm5hbWVcIjpcIk1ldGhvdHJleGF0ZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLjA0LTAuMzZcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL0xcIixcImZhY3RvclwiOlwiMjIwMFwiLFwic2lSYW5nZVwiOlwiOTAtNzkwXCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiOTBcIixcInVzVmFsdWVcIjpcIjAuMDRcIn0se1wibmFtZVwiOlwiTWV0aHlsZG9wYVwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjEtNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjQuNzM1XCIsXCJzaVJhbmdlXCI6XCI1LjAtMjVcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiNS4wXCIsXCJ1c1ZhbHVlXCI6XCIxXCJ9LHtcIm5hbWVcIjpcIk1ldG9wcm9sb2xcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNzUtMjAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJuZy9tTFwiLFwiZmFjdG9yXCI6XCIzLjc0XCIsXCJzaVJhbmdlXCI6XCIyODEtNzQ4XCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMjgxXCIsXCJ1c1ZhbHVlXCI6XCI3NVwifSx7XCJuYW1lXCI6XCIyIC1NaWNyb2dsb2J1bGluXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxLjItMi44XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9MXCIsXCJmYWN0b3JcIjpcIjFcIixcInNpUmFuZ2VcIjpcIjEuMi0yLjhcIixcInNpVW5pdFwiOlwibWcvTFwiLFwic2lWYWx1ZVwiOlwiMS4yXCIsXCJ1c1ZhbHVlXCI6XCIxLjJcIn0se1wibmFtZVwiOlwiTW9ycGhpbmVcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMTAtODBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm5nL21MXCIsXCJmYWN0b3JcIjpcIjMuNTA0XCIsXCJzaVJhbmdlXCI6XCIzNS0yODBcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCIzNVwiLFwidXNWYWx1ZVwiOlwiMTBcIn0se1wibmFtZVwiOlwiTXlvZ2xvYmluXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxOS05MlwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL0xcIixcImZhY3RvclwiOlwiMC4wNTcxXCIsXCJzaVJhbmdlXCI6XCIxLjAtNS4zXCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMS4wXCIsXCJ1c1ZhbHVlXCI6XCIxOVwifSx7XCJuYW1lXCI6XCJOYXByb3hlblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMjYtNzBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9tTFwiLFwiZmFjdG9yXCI6XCI0LjM0M1wiLFwic2lSYW5nZVwiOlwiMTE1LTMwMFwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxMTVcIixcInVzVmFsdWVcIjpcIjI2XCJ9LHtcIm5hbWVcIjpcIk5pYWNpbiAobmljb3RpbmljIGFjaWQpXCIsXCJzcGVjaW1lblwiOlwiVXJpbmVcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIyLjQtNi40XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy8yNGhcIixcImZhY3RvclwiOlwiNy4zXCIsXCJzaVJhbmdlXCI6XCIxNy41LTQ2LjdcIixcInNpVW5pdFwiOlwiwrVtb2wvZFwiLFwic2lWYWx1ZVwiOlwiMTcuNVwiLFwidXNWYWx1ZVwiOlwiMi40XCJ9LHtcIm5hbWVcIjpcIk5pY2tlbFwiLFwic3BlY2ltZW5cIjpcIldob2xlIGJsb29kXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMS4wLTI4LjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9MXCIsXCJmYWN0b3JcIjpcIjE3LjAzM1wiLFwic2lSYW5nZVwiOlwiMTctNDc2XCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMTdcIixcInVzVmFsdWVcIjpcIjEuMFwifSx7XCJuYW1lXCI6XCJOaWNvdGluZVwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuMDEtMC4wNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvTFwiLFwiZmFjdG9yXCI6XCI2LjE2NFwiLFwic2lSYW5nZVwiOlwiMC4wNjItMC4zMDhcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMC4wNjJcIixcInVzVmFsdWVcIjpcIjAuMDFcIn0se1wibmFtZVwiOlwiTml0cm9nZW4gKG5vbnByb3RlaW4pXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIyMC0zNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvZExcIixcImZhY3RvclwiOlwiMC43MTRcIixcInNpUmFuZ2VcIjpcIjE0LjMtMjUuMFwiLFwic2lVbml0XCI6XCJtbW9sL0xcIixcInNpVmFsdWVcIjpcIjE0LjNcIixcInVzVmFsdWVcIjpcIjIwXCJ9LHtcIm5hbWVcIjpcIk5pdHJvcHJ1c3NpZGUgKGFzIHRoaW9jeWFuYXRlKVwiLFwic3BlY2ltZW5cIjpcIlwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjYtMjlcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9MXCIsXCJmYWN0b3JcIjpcIjE3LjJcIixcInNpUmFuZ2VcIjpcIjEwMy01MDBcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMTAzXCIsXCJ1c1ZhbHVlXCI6XCI2XCJ9LHtcIm5hbWVcIjpcIk5vcmVwaW5lcGhyaW5lXCIsXCJzcGVjaW1lblwiOlwiUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMTEwLTQxMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwicGcvbUxcIixcImZhY3RvclwiOlwiNS45MTFcIixcInNpUmFuZ2VcIjpcIjY1MC0yNDIzXCIsXCJzaVVuaXRcIjpcInBtb2wvTFwiLFwic2lWYWx1ZVwiOlwiNjUwXCIsXCJ1c1ZhbHVlXCI6XCIxMTBcIn0se1wibmFtZVwiOlwiTm9ydHJpcHR5bGluZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI1MC0xNTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm5nL21MXCIsXCJmYWN0b3JcIjpcIjMuNzk3XCIsXCJzaVJhbmdlXCI6XCIxOTAtNTcwXCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMTkwXCIsXCJ1c1ZhbHVlXCI6XCI1MFwifSx7XCJuYW1lXCI6XCJPcm5pdGhpbmVcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLjQtMS40XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCI3NS42NjZcIixcInNpUmFuZ2VcIjpcIjMwLTEwNlwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIzMFwiLFwidXNWYWx1ZVwiOlwiMC40XCJ9LHtcIm5hbWVcIjpcIk9zbW9sYWxpdHlcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjI3NS0yOTVcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1Pc20va2dcIixcImZhY3RvclwiOlwiMVwiLFwic2lSYW5nZVwiOlwiMjc1LTI5NVwiLFwic2lVbml0XCI6XCJtbW9sL2tnXCIsXCJzaVZhbHVlXCI6XCIyNzVcIixcInVzVmFsdWVcIjpcIjI3NVwifSx7XCJuYW1lXCI6XCJPc3Rlb2NhbGNpblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMy4wLTEzLjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm5nL21MXCIsXCJmYWN0b3JcIjpcIjFcIixcInNpUmFuZ2VcIjpcIjMuMC0xMy4wXCIsXCJzaVVuaXRcIjpcIsK1Zy9MXCIsXCJzaVZhbHVlXCI6XCIzLjBcIixcInVzVmFsdWVcIjpcIjMuMFwifSx7XCJuYW1lXCI6XCJPeGFsYXRlXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxLjAtMi40XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJcIixcImZhY3RvclwiOlwiMTEuMTA3XCIsXCJzaVJhbmdlXCI6XCIxMS0yN1wiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxMVwiLFwidXNWYWx1ZVwiOlwiMS4wXCJ9LHtcIm5hbWVcIjpcIk94YXplcGFtXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuMi0xLjRcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9tTFwiLFwiZmFjdG9yXCI6XCIzLjQ4N1wiLFwic2lSYW5nZVwiOlwiMC43LTQuOVwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIwLjdcIixcInVzVmFsdWVcIjpcIjAuMlwifSx7XCJuYW1lXCI6XCJPeHljb2RvbmVcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjEwLTEwMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibmcvbUxcIixcImZhY3RvclwiOlwiMy4xNzFcIixcInNpUmFuZ2VcIjpcIjMyLTMxN1wiLFwic2lVbml0XCI6XCJubW9sL0xcIixcInNpVmFsdWVcIjpcIjMyXCIsXCJ1c1ZhbHVlXCI6XCIxMFwifSx7XCJuYW1lXCI6XCJPeHlnZW4sIHBhcnRpYWwgcHJlc3N1cmUgKFBvIDIgKVwiLFwic3BlY2ltZW5cIjpcIkFydGVyaWFsIGJsb29kXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiODAtMTAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtbSBIZ1wiLFwiZmFjdG9yXCI6XCIwLjEzM1wiLFwic2lSYW5nZVwiOlwiMTEtMTNcIixcInNpVW5pdFwiOlwia1BhXCIsXCJzaVZhbHVlXCI6XCIxMVwiLFwidXNWYWx1ZVwiOlwiODBcIn0se1wibmFtZVwiOlwiUGFyYXF1YXRcIixcInNwZWNpbWVuXCI6XCJXaG9sZSBibG9vZFwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuMS0xLjZcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9tTFwiLFwiZmFjdG9yXCI6XCI1LjM2OVwiLFwic2lSYW5nZVwiOlwiMC41LTguNVwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIwLjVcIixcInVzVmFsdWVcIjpcIjAuMVwifSx7XCJuYW1lXCI6XCJQYXJhdGh5cm9pZCBob3Jtb25lXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxMC02NVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwicGcvbUxcIixcImZhY3RvclwiOlwiMVwiLFwic2lSYW5nZVwiOlwiMTAtNjVcIixcInNpVW5pdFwiOlwibmcvTFwiLFwic2lWYWx1ZVwiOlwiMTBcIixcInVzVmFsdWVcIjpcIjEwXCJ9LHtcIm5hbWVcIjpcIlBlbnRvYmFyYml0YWxcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMS01XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvbUxcIixcImZhY3RvclwiOlwiNC40MzlcIixcInNpUmFuZ2VcIjpcIjQuMC0yMlwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCI0LjBcIixcInVzVmFsdWVcIjpcIjFcIn0se1wibmFtZVwiOlwiUGVwc2lub2dlblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMjgtMTAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJuZy9tTFwiLFwiZmFjdG9yXCI6XCIxXCIsXCJzaVJhbmdlXCI6XCIyOC0xMDBcIixcInNpVW5pdFwiOlwiwrVnL0xcIixcInNpVmFsdWVcIjpcIjI4XCIsXCJ1c1ZhbHVlXCI6XCIyOFwifSx7XCJuYW1lXCI6XCJQaGVuY3ljbGlkaW5lICh0b3hpYylcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiOTAtODAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJuZy9tTFwiLFwiZmFjdG9yXCI6XCI0LjEwOVwiLFwic2lSYW5nZVwiOlwiMzcwLTMyODhcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCIzNzBcIixcInVzVmFsdWVcIjpcIjkwXCJ9LHtcIm5hbWVcIjpcIlBoZW5vYmFyYml0YWxcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMTUtNDBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9tTFwiLFwiZmFjdG9yXCI6XCI0LjMxXCIsXCJzaVJhbmdlXCI6XCI2NS0xNzJcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiNjVcIixcInVzVmFsdWVcIjpcIjE1XCJ9LHtcIm5hbWVcIjpcIlBoZW55bGFsYW5pbmVcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLjYtMS41XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCI2MC41NDRcIixcInNpUmFuZ2VcIjpcIjM1LTkwXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjM1XCIsXCJ1c1ZhbHVlXCI6XCIwLjZcIn0se1wibmFtZVwiOlwiUGhlbnlscHJvcGFub2xhbWluZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC4wNS0wLjEwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvbUxcIixcImZhY3RvclwiOlwiNjYxM1wiLFwic2lSYW5nZVwiOlwiMzMwLTY2MFwiLFwic2lVbml0XCI6XCJubW9sL0xcIixcInNpVmFsdWVcIjpcIjMzMFwiLFwidXNWYWx1ZVwiOlwiMC4wNVwifSx7XCJuYW1lXCI6XCJQaGVueXRvaW5cIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMTAtMjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL0xcIixcImZhY3RvclwiOlwiMy45NjhcIixcInNpUmFuZ2VcIjpcIjQwLTc5XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjQwXCIsXCJ1c1ZhbHVlXCI6XCIxMFwifSx7XCJuYW1lXCI6XCJQaG9zcGhvcnVzIChpbm9yZ2FuaWMpXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIyLjMtNC43XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCIwLjMyM1wiLFwic2lSYW5nZVwiOlwiMC43NC0xLjUyXCIsXCJzaVVuaXRcIjpcIm1tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMC43NFwiLFwidXNWYWx1ZVwiOlwiMi4zXCJ9LHtcIm5hbWVcIjpcIlBsYWNlbnRhbCBsYWN0b2dlblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC41LTEuMVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjQ2LjI5NlwiLFwic2lSYW5nZVwiOlwiMjMtNTA5XCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMjNcIixcInVzVmFsdWVcIjpcIjAuNVwifSx7XCJuYW1lXCI6XCJQbGFzbWlub2dlbiAoYW50aWdlbmljKVwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjEwLTIwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCIwLjExM1wiLFwic2lSYW5nZVwiOlwiMS4xLTIuMlwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxLjFcIixcInVzVmFsdWVcIjpcIjEwXCJ9LHtcIm5hbWVcIjpcIlBsYXNtaW5vZ2VuIGFjdGl2YXRvciBpbmhpYml0b3JcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI0LTQwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJuZy9tTFwiLFwiZmFjdG9yXCI6XCIxOS4yMzFcIixcInNpUmFuZ2VcIjpcIjc1LTc1MFwiLFwic2lVbml0XCI6XCJwbW9sL0xcIixcInNpVmFsdWVcIjpcIjc1XCIsXCJ1c1ZhbHVlXCI6XCI0XCJ9LHtcIm5hbWVcIjpcInBsYXRlbGV0XCIsXCJzcGVjaW1lblwiOlwiV2hvbGUgYmxvb2RcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxNTAtMzUwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJcIixcImZhY3RvclwiOlwiMVwiLFwic2lSYW5nZVwiOlwiMTUwLTM1MFwiLFwic2lVbml0XCI6XCLDlzEwOS9MXCIsXCJzaVZhbHVlXCI6XCIxNTBcIixcInVzVmFsdWVcIjpcIjE1MFwifSx7XCJuYW1lXCI6XCJQb3JwaHlyaW5zICh0b3RhbClcIixcInNwZWNpbWVuXCI6XCJVcmluZVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjIwLTEyMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL0xcIixcImZhY3RvclwiOlwiMS4yMDNcIixcInNpUmFuZ2VcIjpcIjI1LTE0NFwiLFwic2lVbml0XCI6XCJubW9sL0xcIixcInNpVmFsdWVcIjpcIjI1XCIsXCJ1c1ZhbHVlXCI6XCIyMFwifSx7XCJuYW1lXCI6XCJQb3Rhc3NpdW1cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjMuNS01LjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1FcS9MXCIsXCJmYWN0b3JcIjpcIjFcIixcInNpUmFuZ2VcIjpcIjMuNS01LjBcIixcInNpVW5pdFwiOlwibW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIzLjVcIixcInVzVmFsdWVcIjpcIjMuNVwifSx7XCJuYW1lXCI6XCJQcmVhbGJ1bWluXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxOS41LTM1LjhcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjEwXCIsXCJzaVJhbmdlXCI6XCIxOTUtMzU4XCIsXCJzaVVuaXRcIjpcIm1nL0xcIixcInNpVmFsdWVcIjpcIjE5NVwiLFwidXNWYWx1ZVwiOlwiMTkuNVwifSx7XCJuYW1lXCI6XCJQcmVnbmFuZWRpb2xcIixcInNwZWNpbWVuXCI6XCJVcmluZVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjwyLjZcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIlwiLFwiZmFjdG9yXCI6XCIzLjEyXCIsXCJzaVJhbmdlXCI6XCI8OFwiLFwic2lVbml0XCI6XCLCtW1vbC9kXCIsXCJzaVZhbHVlXCI6XCI4XCIsXCJ1c1ZhbHVlXCI6XCIyLjZcIn0se1wibmFtZVwiOlwiUHJlZ25hbmV0cmlvbFwiLFwic3BlY2ltZW5cIjpcIlVyaW5lXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiPDIuNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiXCIsXCJmYWN0b3JcIjpcIjIuOTcyXCIsXCJzaVJhbmdlXCI6XCI8Ny41XCIsXCJzaVVuaXRcIjpcIsK1bW9sL2RcIixcInNpVmFsdWVcIjpcIjcuNVwiLFwidXNWYWx1ZVwiOlwiMi41XCJ9LHtcIm5hbWVcIjpcIlByaW1pZG9uZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI1LTEyXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvbUxcIixcImZhY3RvclwiOlwiNC41ODJcIixcInNpUmFuZ2VcIjpcIjIzLTU1XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjIzXCIsXCJ1c1ZhbHVlXCI6XCI1XCJ9LHtcIm5hbWVcIjpcIlByb2NhaW5hbWlkZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI0LTEwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvbUxcIixcImZhY3RvclwiOlwiNC4yNVwiLFwic2lSYW5nZVwiOlwiMTctNDJcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMTdcIixcInVzVmFsdWVcIjpcIjRcIn0se1wibmFtZVwiOlwiUHJvZ2VzdGVyb25lXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLjE1LTI1XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJuZy9tTFwiLFwiZmFjdG9yXCI6XCIzLjE4XCIsXCJzaVJhbmdlXCI6XCIwLjUtNzkuNVwiLFwic2lVbml0XCI6XCJubW9sL0xcIixcInNpVmFsdWVcIjpcIjAuNVwiLFwidXNWYWx1ZVwiOlwiMC4xNVwifSx7XCJuYW1lXCI6XCJQcm9sYWN0aW5cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjMuOC0yMy4yXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvTFwiLFwiZmFjdG9yXCI6XCI0My40NzhcIixcInNpUmFuZ2VcIjpcIjE2NS0xMDEwXCIsXCJzaVVuaXRcIjpcInBtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMTY1XCIsXCJ1c1ZhbHVlXCI6XCIzLjhcIn0se1wibmFtZVwiOlwiUHJvbGluZVwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjEuMi0zLjlcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjg2Ljg1OFwiLFwic2lSYW5nZVwiOlwiMTA0LTM0MFwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxMDRcIixcInVzVmFsdWVcIjpcIjEuMlwifSx7XCJuYW1lXCI6XCJQcm9wb3h5cGhlbmVcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLjEtMC40XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvbUxcIixcImZhY3RvclwiOlwiMi45NDZcIixcInNpUmFuZ2VcIjpcIjAuMy0xLjJcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMC4zXCIsXCJ1c1ZhbHVlXCI6XCIwLjFcIn0se1wibmFtZVwiOlwiUHJvcHJhbm9sb2xcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjUwLTEwMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibmcvbUxcIixcImZhY3RvclwiOlwiMy44NTZcIixcInNpUmFuZ2VcIjpcIjE5My0zODZcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxOTNcIixcInVzVmFsdWVcIjpcIjUwXCJ9LHtcIm5hbWVcIjpcIlByb3N0YXRlLXNwZWNpZmljIGFudGlnZW5cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjw0LjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9MXCIsXCJmYWN0b3JcIjpcIjFcIixcInNpUmFuZ2VcIjpcIjw0LjBcIixcInNpVW5pdFwiOlwiwrVnL0xcIixcInNpVmFsdWVcIjpcIjQuMFwiLFwidXNWYWx1ZVwiOlwiNC4wXCJ9LHtcIm5hbWVcIjpcIlByb3RlaW4gKHRvdGFsKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNi4wLTguMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiZy9kTFwiLFwiZmFjdG9yXCI6XCIxMFwiLFwic2lSYW5nZVwiOlwiNjAtODBcIixcInNpVW5pdFwiOlwiZy9MXCIsXCJzaVZhbHVlXCI6XCI2MFwiLFwidXNWYWx1ZVwiOlwiNi4wXCJ9LHtcIm5hbWVcIjpcIlByb3Rocm9tYmluIHRpbWUgKFBUKVwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjEwLTEzXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJzXCIsXCJmYWN0b3JcIjpcIjFcIixcInNpUmFuZ2VcIjpcIjEwLTEzXCIsXCJzaVVuaXRcIjpcInNcIixcInNpVmFsdWVcIjpcIjEwXCIsXCJ1c1ZhbHVlXCI6XCIxMFwifSx7XCJuYW1lXCI6XCJQcm90b3BvcnBoeXJpblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxNS0xNTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9kTFwiLFwiZmFjdG9yXCI6XCIwLjAxNzhcIixcInNpUmFuZ2VcIjpcIjAuMjctMC44OVwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIwLjI3XCIsXCJ1c1ZhbHVlXCI6XCIxNVwifSx7XCJuYW1lXCI6XCJQcm90cmlwdHlsaW5lXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjcwLTI1MFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL2RMXCIsXCJmYWN0b3JcIjpcIjMuNzg3XCIsXCJzaVJhbmdlXCI6XCIyNjYtOTUwXCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMjY2XCIsXCJ1c1ZhbHVlXCI6XCI3MFwifSx7XCJuYW1lXCI6XCJQeXJ1dmF0ZVwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuNS0xLjVcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjExMy41NlwiLFwic2lSYW5nZVwiOlwiNjAtMTcwXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjYwXCIsXCJ1c1ZhbHVlXCI6XCIwLjVcIn0se1wibmFtZVwiOlwiUXVpbmlkaW5lXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIyLjAtNS4wXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvbUxcIixcImZhY3RvclwiOlwiMy4wODJcIixcInNpUmFuZ2VcIjpcIjYuMi0xNS40XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjYuMlwiLFwidXNWYWx1ZVwiOlwiMi4wXCJ9LHtcIm5hbWVcIjpcIlJlZCBibG9vZCBjZWxsIGNvdW50XCIsXCJzcGVjaW1lblwiOlwiV2hvbGUgYmxvb2RcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIzLjktNS41XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJcIixcImZhY3RvclwiOlwiMVwiLFwic2lSYW5nZVwiOlwiMy45LTUuNVwiLFwic2lVbml0XCI6XCLDlzEwMTIvTFwiLFwic2lWYWx1ZVwiOlwiMy45XCIsXCJ1c1ZhbHVlXCI6XCIzLjlcIn0se1wibmFtZVwiOlwiUmVuaW5cIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIzMC00MFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwicGcvbUxcIixcImZhY3RvclwiOlwiMC4wMjM3XCIsXCJzaVJhbmdlXCI6XCIwLjctMS4wXCIsXCJzaVVuaXRcIjpcInBtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMC43XCIsXCJ1c1ZhbHVlXCI6XCIzMFwifSx7XCJuYW1lXCI6XCJSZXRpY3Vsb2N5dGUgY291bnRcIixcInNwZWNpbWVuXCI6XCJXaG9sZSBibG9vZFwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjI1LTc1XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJcIixcImZhY3RvclwiOlwiMVwiLFwic2lSYW5nZVwiOlwiMjUtNzVcIixcInNpVW5pdFwiOlwiw5cxMDkvTFwiLFwic2lWYWx1ZVwiOlwiMjVcIixcInVzVmFsdWVcIjpcIjI1XCJ9LHtcIm5hbWVcIjpcIlJldGljdWxvY3l0ZSBjb3VudFwiLFwic3BlY2ltZW5cIjpcIldob2xlIGJsb29kXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC41LTEuNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiXCIsXCJmYWN0b3JcIjpcIjAuMDFcIixcInNpUmFuZ2VcIjpcIjAuMDA1LTAuMDE1XCIsXCJzaVVuaXRcIjpcIlByb3BvcnRpb24gb2YgcmVkIGJsb29kIGNlbGxzXCIsXCJzaVZhbHVlXCI6XCIwLjAwNVwiLFwidXNWYWx1ZVwiOlwiMC41XCJ9LHtcIm5hbWVcIjpcIlJpZmFtcGluXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI0LTQwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9MXCIsXCJmYWN0b3JcIjpcIjEuMjE1XCIsXCJzaVJhbmdlXCI6XCI1LTQ5XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjVcIixcInVzVmFsdWVcIjpcIjRcIn0se1wibmFtZVwiOlwiU2FsaWN5bGF0ZXNcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMTUwLTMwMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjcuMjRcIixcInNpUmFuZ2VcIjpcIjEwODYtMjE3MlwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxMDg2XCIsXCJ1c1ZhbHVlXCI6XCIxNTBcIn0se1wibmFtZVwiOlwiU2VsZW5pdW1cIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNTgtMjM0XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvTFwiLFwiZmFjdG9yXCI6XCIwLjAxMjdcIixcInNpUmFuZ2VcIjpcIjAuNzQtMi45N1wiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIwLjc0XCIsXCJ1c1ZhbHVlXCI6XCI1OFwifSx7XCJuYW1lXCI6XCJTZXJpbmVcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLjctMi4wXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCI5NS4xNTZcIixcInNpUmFuZ2VcIjpcIjY1LTE5M1wiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCI2NVwiLFwidXNWYWx1ZVwiOlwiMC43XCJ9LHtcIm5hbWVcIjpcIlNlcm90b25pbiAoNS1oeWRyb3h5dHJ5cHRhbWluZSlcIixcInNwZWNpbWVuXCI6XCJXaG9sZSBibG9vZFwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjUwLTIwMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibmcvbUxcIixcImZhY3RvclwiOlwiMC4wMDU2OFwiLFwic2lSYW5nZVwiOlwiMC4yOC0xLjE0XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjAuMjhcIixcInVzVmFsdWVcIjpcIjUwXCJ9LHtcIm5hbWVcIjpcIlNleCBob3Jtb25lLWJpbmRpbmcgZ2xvYnVsaW5cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjEuNS0yLjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9tTFwiLFwiZmFjdG9yXCI6XCI4Ljg5NlwiLFwic2lSYW5nZVwiOlwiMTMtMTdcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxM1wiLFwidXNWYWx1ZVwiOlwiMS41XCJ9LHtcIm5hbWVcIjpcIlNvZGl1bVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMTM2LTE0MlwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibUVxL0xcIixcImZhY3RvclwiOlwiMVwiLFwic2lSYW5nZVwiOlwiMTM2LTE0MlwiLFwic2lVbml0XCI6XCJtbW9sL0xcIixcInNpVmFsdWVcIjpcIjEzNlwiLFwidXNWYWx1ZVwiOlwiMTM2XCJ9LHtcIm5hbWVcIjpcIlNvbWF0b21lZGluIEMgKEluc3VsaW5saWtlIGdyb3d0aCBmYWN0b3IpXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxMzAtNDUwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJuZy9tTFwiLFwiZmFjdG9yXCI6XCIwLjEzMVwiLFwic2lSYW5nZVwiOlwiMTgtNjBcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxOFwiLFwidXNWYWx1ZVwiOlwiMTMwXCJ9LHtcIm5hbWVcIjpcIlNvbWF0b3N0YXRpblwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjwyNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwicGcvbUxcIixcImZhY3RvclwiOlwiMC42MTFcIixcInNpUmFuZ2VcIjpcIjwxNVwiLFwic2lVbml0XCI6XCJwbW9sL0xcIixcInNpVmFsdWVcIjpcIjE1XCIsXCJ1c1ZhbHVlXCI6XCIyNVwifSx7XCJuYW1lXCI6XCJTdHJlcHRvbXljaW5cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjctNTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL0xcIixcImZhY3RvclwiOlwiMS43MTlcIixcInNpUmFuZ2VcIjpcIjEyLTg2XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjEyXCIsXCJ1c1ZhbHVlXCI6XCI3XCJ9LHtcIm5hbWVcIjpcIlN0cnljaG5pbmVcIixcInNwZWNpbWVuXCI6XCJXaG9sZSBibG9vZFwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjwwLjVcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL0xcIixcImZhY3RvclwiOlwiMi45OVwiLFwic2lSYW5nZVwiOlwiPDEuNVwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxLjVcIixcInVzVmFsdWVcIjpcIjAuNVwifSx7XCJuYW1lXCI6XCJTdWJzdGFuY2UgUFwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjwyNDBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcInBnL21MXCIsXCJmYWN0b3JcIjpcIjAuNzQyXCIsXCJzaVJhbmdlXCI6XCI8MTgwXCIsXCJzaVVuaXRcIjpcInBtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMTgwXCIsXCJ1c1ZhbHVlXCI6XCIyNDBcIn0se1wibmFtZVwiOlwiU3VsZmF0ZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMTAtMzJcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL0xcIixcImZhY3RvclwiOlwiMzEuMTg4XCIsXCJzaVJhbmdlXCI6XCIzMTAtOTkwXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjMxMFwiLFwidXNWYWx1ZVwiOlwiMTBcIn0se1wibmFtZVwiOlwiU3VsZm1ldGhlbW9nbG9iaW5cIixcInNwZWNpbWVuXCI6XCJXaG9sZSBibG9vZFwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjwxLjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIiUgb2YgdG90YWwgaGVtb2dsb2JpblwiLFwiZmFjdG9yXCI6XCIwLjAxXCIsXCJzaVJhbmdlXCI6XCI8MC4wMTBcIixcInNpVW5pdFwiOlwiUHJvcG9ydGlvbiBvZiB0b3RhbCBoZW1vZ2xvYmluXCIsXCJzaVZhbHVlXCI6XCIwLjAxMFwiLFwidXNWYWx1ZVwiOlwiMS4wXCJ9LHtcIm5hbWVcIjpcIlRhdXJpbmVcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLjMtMi4xXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCI3OS45MVwiLFwic2lSYW5nZVwiOlwiMjQtMTY4XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjI0XCIsXCJ1c1ZhbHVlXCI6XCIwLjNcIn0se1wibmFtZVwiOlwiVGVzdG9zdGVyb25lXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIzMDAtMTIwMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibmcvZExcIixcImZhY3RvclwiOlwiMC4wMzQ3XCIsXCJzaVJhbmdlXCI6XCIxMC40LTQxLjZcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxMC40XCIsXCJ1c1ZhbHVlXCI6XCIzMDBcIn0se1wibmFtZVwiOlwiVGV0cmFoeWRyb2Nhbm5hYmlub2xcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjwwLjIwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvbUxcIixcImZhY3RvclwiOlwiMy4xOFwiLFwic2lSYW5nZVwiOlwiPDAuNjBcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMC42MFwiLFwidXNWYWx1ZVwiOlwiMC4yMFwifSx7XCJuYW1lXCI6XCJUaGVvcGh5bGxpbmVcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMTAtMjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9tTFwiLFwiZmFjdG9yXCI6XCI1LjU1XCIsXCJzaVJhbmdlXCI6XCI1Ni0xMTFcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiNTZcIixcInVzVmFsdWVcIjpcIjEwXCJ9LHtcIm5hbWVcIjpcIlRoaW9wZW50YWxcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMS01XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvbUxcIixcImZhY3RvclwiOlwiNC4xNDRcIixcInNpUmFuZ2VcIjpcIjQuMS0yMC43XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjQuMVwiLFwidXNWYWx1ZVwiOlwiMVwifSx7XCJuYW1lXCI6XCJUaGlvcmlkYXppbmVcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMS4wLTEuNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjIuNjk5XCIsXCJzaVJhbmdlXCI6XCIyLjctNC4xXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjIuN1wiLFwidXNWYWx1ZVwiOlwiMS4wXCJ9LHtcIm5hbWVcIjpcIlRocmVvbmluZVwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuOS0yLjVcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjg0XCIsXCJzaVJhbmdlXCI6XCI3NS0yMTBcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiNzVcIixcInVzVmFsdWVcIjpcIjAuOVwifSx7XCJuYW1lXCI6XCJUaHJvbWJpbiB0aW1lXCIsXCJzcGVjaW1lblwiOlwiUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMTYtMjRcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcInNcIixcImZhY3RvclwiOlwiMVwiLFwic2lSYW5nZVwiOlwiMTYtMjRcIixcInNpVW5pdFwiOlwic1wiLFwic2lWYWx1ZVwiOlwiMTZcIixcInVzVmFsdWVcIjpcIjE2XCJ9LHtcIm5hbWVcIjpcIlRoeXJvZ2xvYnVsaW5cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjMtNDJcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm5nL21MXCIsXCJmYWN0b3JcIjpcIjFcIixcInNpUmFuZ2VcIjpcIjMtNDJcIixcInNpVW5pdFwiOlwiwrVnL0xcIixcInNpVmFsdWVcIjpcIjNcIixcInVzVmFsdWVcIjpcIjNcIn0se1wibmFtZVwiOlwiVGh5cm90cm9waW5cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuNC00LjJcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm5nL21MXCIsXCJmYWN0b3JcIjpcIjFcIixcInNpUmFuZ2VcIjpcIjAuNC00LjJcIixcInNpVW5pdFwiOlwibUlVL0xcIixcInNpVmFsdWVcIjpcIjAuNFwiLFwidXNWYWx1ZVwiOlwiMC40XCJ9LHtcIm5hbWVcIjpcIlRoeXJveGluZSwgZnJlZSAoRlQgNCApXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLjktMi4zXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJuZy9kTFwiLFwiZmFjdG9yXCI6XCIxMi44NzFcIixcInNpUmFuZ2VcIjpcIjEyLTMwXCIsXCJzaVVuaXRcIjpcInBtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMTJcIixcInVzVmFsdWVcIjpcIjAuOVwifSx7XCJuYW1lXCI6XCJUaHlyb3hpbmUsIHRvdGFsIChUIDQgKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNS41LTEyLjVcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9kTFwiLFwiZmFjdG9yXCI6XCIxMi44NzFcIixcInNpUmFuZ2VcIjpcIjcxLTE2MFwiLFwic2lVbml0XCI6XCJubW9sL0xcIixcInNpVmFsdWVcIjpcIjcxXCIsXCJ1c1ZhbHVlXCI6XCI1LjVcIn0se1wibmFtZVwiOlwiVGh5cm94aW5lLWJpbmRpbmcgZ2xvYnVsaW5cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjE2LjAtMjQuMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjE3LjA5NFwiLFwic2lSYW5nZVwiOlwiMjA2LTMwOVwiLFwic2lVbml0XCI6XCJubW9sL0xcIixcInNpVmFsdWVcIjpcIjIwNlwiLFwidXNWYWx1ZVwiOlwiMTYuMFwifSx7XCJuYW1lXCI6XCJUaXNzdWUgcGxhc21pbm9nZW4gYWN0aXZhdG9yXCIsXCJzcGVjaW1lblwiOlwiUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiPDAuMDRcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIklVL21MXCIsXCJmYWN0b3JcIjpcIjEwMDBcIixcInNpUmFuZ2VcIjpcIjw0MFwiLFwic2lVbml0XCI6XCJJVS9MXCIsXCJzaVZhbHVlXCI6XCI0MFwiLFwidXNWYWx1ZVwiOlwiMC4wNFwifSx7XCJuYW1lXCI6XCJUb2JyYW15Y2luXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjUtMTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9tTFwiLFwiZmFjdG9yXCI6XCIyLjEzOVwiLFwic2lSYW5nZVwiOlwiMTAtMjFcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMTBcIixcInVzVmFsdWVcIjpcIjVcIn0se1wibmFtZVwiOlwiVG9jYWluaWRlXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI0LTEwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvbUxcIixcImZhY3RvclwiOlwiNS4yMDFcIixcInNpUmFuZ2VcIjpcIjIxLTUyXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjIxXCIsXCJ1c1ZhbHVlXCI6XCI0XCJ9LHtcIm5hbWVcIjpcIlRvbGJ1dGFtaWRlXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI4MC0yNDBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9tTFwiLFwiZmFjdG9yXCI6XCIzLjdcIixcInNpUmFuZ2VcIjpcIjI5Ni04ODhcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMjk2XCIsXCJ1c1ZhbHVlXCI6XCI4MFwifSx7XCJuYW1lXCI6XCJUcmFuc2ZlcnJpblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMjAwLTQwMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvZExcIixcImZhY3RvclwiOlwiMC4xMjNcIixcInNpUmFuZ2VcIjpcIjIuNS01LjBcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMi41XCIsXCJ1c1ZhbHVlXCI6XCIyMDBcIn0se1wibmFtZVwiOlwiVHJpZ2x5Y2VyaWRlc1wiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiPDE2MFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvZExcIixcImZhY3RvclwiOlwiMC4wMTEzXCIsXCJzaVJhbmdlXCI6XCIxLjhcIixcInNpVW5pdFwiOlwibW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxLjhcIixcInVzVmFsdWVcIjpcIjE2MFwifSx7XCJuYW1lXCI6XCJUcmlpb2RvdGh5cm9uaW5lLCBmcmVlIChGVDMpXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxMzAtNDUwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJcIixcImZhY3RvclwiOlwiMC4wMTU0XCIsXCJzaVJhbmdlXCI6XCIyLjAtNy4wXCIsXCJzaVVuaXRcIjpcInBtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMi4wXCIsXCJ1c1ZhbHVlXCI6XCIxMzBcIn0se1wibmFtZVwiOlwiVHJpaW9kb3RoeXJvbmluZSwgdG90YWwgKFQzKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNjAtMTgwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJuZy9kTFwiLFwiZmFjdG9yXCI6XCIwLjAxNTRcIixcInNpUmFuZ2VcIjpcIjAuOTItMi43NlwiLFwic2lVbml0XCI6XCJubW9sL0xcIixcInNpVmFsdWVcIjpcIjAuOTJcIixcInVzVmFsdWVcIjpcIjYwXCJ9LHtcIm5hbWVcIjpcIlRyb3BvbmluIElcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAtMC40XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJuZy9tTFwiLFwiZmFjdG9yXCI6XCIxXCIsXCJzaVJhbmdlXCI6XCIwLTAuNFwiLFwic2lVbml0XCI6XCLCtWcvTFwiLFwic2lWYWx1ZVwiOlwiMFwiLFwidXNWYWx1ZVwiOlwiMFwifSx7XCJuYW1lXCI6XCJUcm9wb25pbiBUXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLTAuMVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibmcvbUxcIixcImZhY3RvclwiOlwiMVwiLFwic2lSYW5nZVwiOlwiMC0wLjFcIixcInNpVW5pdFwiOlwiwrVnL0xcIixcInNpVmFsdWVcIjpcIjBcIixcInVzVmFsdWVcIjpcIjBcIn0se1wibmFtZVwiOlwiVHJ5cHRvcGhhblwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuNS0xLjVcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjQ4Ljk2N1wiLFwic2lSYW5nZVwiOlwiMjUtNzNcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMjVcIixcInVzVmFsdWVcIjpcIjAuNVwifSx7XCJuYW1lXCI6XCJUeXJvc2luZVwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuNC0xLjZcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjU1LjE5XCIsXCJzaVJhbmdlXCI6XCIyMC05MFwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIyMFwiLFwidXNWYWx1ZVwiOlwiMC40XCJ9LHtcIm5hbWVcIjpcIlVyZWEgbml0cm9nZW5cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjgtMjNcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjAuMzU3XCIsXCJzaVJhbmdlXCI6XCIyLjktOC4yXCIsXCJzaVVuaXRcIjpcIm1tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMi45XCIsXCJ1c1ZhbHVlXCI6XCI4XCJ9LHtcIm5hbWVcIjpcIlVyaWMgYWNpZFwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNC4wLTguMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvZExcIixcImZhY3RvclwiOlwiNTkuNDg1XCIsXCJzaVJhbmdlXCI6XCIyNDAtNDgwXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjI0MFwiLFwidXNWYWx1ZVwiOlwiNC4wXCJ9LHtcIm5hbWVcIjpcIlVyb2JpbGlub2dlblwiLFwic3BlY2ltZW5cIjpcIlVyaW5lXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMS0zLjVcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nLzI0aFwiLFwiZmFjdG9yXCI6XCIxLjdcIixcInNpUmFuZ2VcIjpcIjEuNy01LjlcIixcInNpVW5pdFwiOlwiwrVtb2wvZFwiLFwic2lWYWx1ZVwiOlwiMS43XCIsXCJ1c1ZhbHVlXCI6XCIxXCJ9LHtcIm5hbWVcIjpcIlZhbGluZVwiLFwic3BlY2ltZW5cIjpcIlBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjEuNy0zLjdcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjg1LjM2MVwiLFwic2lSYW5nZVwiOlwiMTQ1LTMxNVwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxNDVcIixcInVzVmFsdWVcIjpcIjEuN1wifSx7XCJuYW1lXCI6XCJWYWxwcm9pYyBhY2lkXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjUwLTEwMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjYuOTM0XCIsXCJzaVJhbmdlXCI6XCIzNDYtNjkzXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjM0NlwiLFwidXNWYWx1ZVwiOlwiNTBcIn0se1wibmFtZVwiOlwiVmFuY29teWNpblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIyMC00MFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjAuNjlcIixcInNpUmFuZ2VcIjpcIjE0LTI4XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjE0XCIsXCJ1c1ZhbHVlXCI6XCIyMFwifSx7XCJuYW1lXCI6XCJWYW5pbGx5bG1hbmRlbGljIGFjaWQgKFZNQSlcIixcInNwZWNpbWVuXCI6XCJVcmluZVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjIuMS03LjZcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nLzI0aFwiLFwiZmFjdG9yXCI6XCI1LjA0NlwiLFwic2lSYW5nZVwiOlwiMTEtMzhcIixcInNpVW5pdFwiOlwiwrVtb2wvZFwiLFwic2lWYWx1ZVwiOlwiMTFcIixcInVzVmFsdWVcIjpcIjIuMVwifSx7XCJuYW1lXCI6XCJWYXNvYWN0aXZlIGludGVzdGluYWwgcG9seXBlcHRpZGVcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI8NTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcInBnL21MXCIsXCJmYWN0b3JcIjpcIjAuMjk2XCIsXCJzaVJhbmdlXCI6XCI8MTVcIixcInNpVW5pdFwiOlwicG1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxNVwiLFwidXNWYWx1ZVwiOlwiNTBcIn0se1wibmFtZVwiOlwiVmFzb3ByZXNzaW5cIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxLjUtMi4wXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJwZy9tTFwiLFwiZmFjdG9yXCI6XCIwLjkyM1wiLFwic2lSYW5nZVwiOlwiMS4wLTIuMFwiLFwic2lVbml0XCI6XCJwbW9sL0xcIixcInNpVmFsdWVcIjpcIjEuMFwiLFwidXNWYWx1ZVwiOlwiMS41XCJ9LHtcIm5hbWVcIjpcIlZlcmFwYW1pbFwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxMDAtNTAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJuZy9tTFwiLFwiZmFjdG9yXCI6XCIyLjJcIixcInNpUmFuZ2VcIjpcIjIyMC0xMTAwXCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMjIwXCIsXCJ1c1ZhbHVlXCI6XCIxMDBcIn0se1wibmFtZVwiOlwiVml0YW1pbiBBIChyZXRpbm9sKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMzAtODBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9kTFwiLFwiZmFjdG9yXCI6XCIwLjAzNDlcIixcInNpUmFuZ2VcIjpcIjEuMDUtMi44MFwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxLjA1XCIsXCJ1c1ZhbHVlXCI6XCIzMFwifSx7XCJuYW1lXCI6XCJ2aXRhbWluYjFcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAtMlwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL2RMXCIsXCJmYWN0b3JcIjpcIjI5LjZcIixcInNpUmFuZ2VcIjpcIjAtNzVcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCIwXCIsXCJ1c1ZhbHVlXCI6XCIwXCJ9LHtcIm5hbWVcIjpcInZpdGFtaW5iMlwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNC0yNFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL2RMXCIsXCJmYWN0b3JcIjpcIjI2LjZcIixcInNpUmFuZ2VcIjpcIjEwNi02MzhcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxMDZcIixcInVzVmFsdWVcIjpcIjRcIn0se1wibmFtZVwiOlwiVml0YW1pbiBCM1wiLFwic3BlY2ltZW5cIjpcIldob2xlIGJsb29kXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC4yLTEuOFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjQuNTZcIixcInNpUmFuZ2VcIjpcIjAuOS04LjJcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMC45XCIsXCJ1c1ZhbHVlXCI6XCIwLjJcIn0se1wibmFtZVwiOlwidml0YW1pbmI2XCIsXCJzcGVjaW1lblwiOlwiUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNS0zMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibmcvbUxcIixcImZhY3RvclwiOlwiNC4wNDZcIixcInNpUmFuZ2VcIjpcIjIwLTEyMVwiLFwic2lVbml0XCI6XCJubW9sL0xcIixcInNpVmFsdWVcIjpcIjIwXCIsXCJ1c1ZhbHVlXCI6XCI1XCJ9LHtcIm5hbWVcIjpcIlZpdGFtaW4gQjEyXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxNjAtOTUwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJwZy9tTFwiLFwiZmFjdG9yXCI6XCIwLjczNzhcIixcInNpUmFuZ2VcIjpcIjExOC03MDFcIixcInNpVW5pdFwiOlwicG1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxMThcIixcInVzVmFsdWVcIjpcIjE2MFwifSx7XCJuYW1lXCI6XCJ2aXRhbWluY1wiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC40LTEuNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvZExcIixcImZhY3RvclwiOlwiNTYuNzhcIixcInNpUmFuZ2VcIjpcIjIzLTg1XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjIzXCIsXCJ1c1ZhbHVlXCI6XCIwLjRcIn0se1wibmFtZVwiOlwidml0YW1pbmRcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjI1LTQ1XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJwZy9tTFwiLFwiZmFjdG9yXCI6XCIyLjZcIixcInNpUmFuZ2VcIjpcIjYwLTEwOFwiLFwic2lVbml0XCI6XCJwbW9sL0xcIixcInNpVmFsdWVcIjpcIjYwXCIsXCJ1c1ZhbHVlXCI6XCIyNVwifSx7XCJuYW1lXCI6XCJWaXRhbWluIEQgKDI1LWh5ZHJveHl2aXRhbWluIEQpXCIsXCJzcGVjaW1lblwiOlwiUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMTQtNjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm5nL21MXCIsXCJmYWN0b3JcIjpcIjIuNDk2XCIsXCJzaVJhbmdlXCI6XCIzNS0xNTBcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCIzNVwiLFwidXNWYWx1ZVwiOlwiMTRcIn0se1wibmFtZVwiOlwidml0YW1pbmVcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjUtMThcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9tTFwiLFwiZmFjdG9yXCI6XCIyLjMyXCIsXCJzaVJhbmdlXCI6XCIxMi00MlwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxMlwiLFwidXNWYWx1ZVwiOlwiNVwifSx7XCJuYW1lXCI6XCJWaXRhbWluIEtcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuMTMtMS4xOVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibmcvbUxcIixcImZhY3RvclwiOlwiMi4yMlwiLFwic2lSYW5nZVwiOlwiMC4yOS0yLjY0XCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMC4yOVwiLFwidXNWYWx1ZVwiOlwiMC4xM1wifSx7XCJuYW1lXCI6XCJXYXJmYXJpblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxLjAtMTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9tTFwiLFwiZmFjdG9yXCI6XCIzLjI0N1wiLFwic2lSYW5nZVwiOlwiMy4yLTMyLjRcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMy4yXCIsXCJ1c1ZhbHVlXCI6XCIxLjBcIn0se1wibmFtZVwiOlwiV2hpdGUgQmxvb2QgQ2VsbFwiLFwic3BlY2ltZW5cIjpcIldob2xlIGJsb29kXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNDUwMC0xMTAwMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiXCIsXCJmYWN0b3JcIjpcIjAuMDAxXCIsXCJzaVJhbmdlXCI6XCI0LjUtMTEuMFwiLFwic2lVbml0XCI6XCLDlzEwOS9MXCIsXCJzaVZhbHVlXCI6XCI0LjVcIixcInVzVmFsdWVcIjpcIjQ1MDBcIn0se1wibmFtZVwiOlwiTmV1dHJvcGhpbHMtc2VnbWVudGVkXCIsXCJzcGVjaW1lblwiOlwiV2hvbGUgYmxvb2RcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxODAwLTc4MDBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIlwiLFwiZmFjdG9yXCI6XCIwLjAwMVwiLFwic2lSYW5nZVwiOlwiMS44LTcuOFwiLFwic2lVbml0XCI6XCLDlzEwOS9MXCIsXCJzaVZhbHVlXCI6XCIxLjhcIixcInVzVmFsdWVcIjpcIjE4MDBcIn0se1wibmFtZVwiOlwiTmV1dHJvcGhpbHMtYmFuZHNcIixcInNwZWNpbWVuXCI6XCJXaG9sZSBibG9vZFwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAtNzAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJcIixcImZhY3RvclwiOlwiMC4wMDFcIixcInNpUmFuZ2VcIjpcIjAtMC43MFwiLFwic2lVbml0XCI6XCLDlzEwOS9MXCIsXCJzaVZhbHVlXCI6XCIwXCIsXCJ1c1ZhbHVlXCI6XCIwXCJ9LHtcIm5hbWVcIjpcIkx5bXBob2N5dGVzXCIsXCJzcGVjaW1lblwiOlwiV2hvbGUgYmxvb2RcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxMDAwLTQ4MDBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIlwiLFwiZmFjdG9yXCI6XCIwLjAwMVwiLFwic2lSYW5nZVwiOlwiMS4wLTQuOFwiLFwic2lVbml0XCI6XCLDlzEwOS9MXCIsXCJzaVZhbHVlXCI6XCIxLjBcIixcInVzVmFsdWVcIjpcIjEwMDBcIn0se1wibmFtZVwiOlwiTW9ub2N5dGVzXCIsXCJzcGVjaW1lblwiOlwiV2hvbGUgYmxvb2RcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLTgwMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiXCIsXCJmYWN0b3JcIjpcIjAuMDAxXCIsXCJzaVJhbmdlXCI6XCIwLTAuODBcIixcInNpVW5pdFwiOlwiw5cxMDkvTFwiLFwic2lWYWx1ZVwiOlwiMFwiLFwidXNWYWx1ZVwiOlwiMFwifSx7XCJuYW1lXCI6XCJFb3Npbm9waGlsc1wiLFwic3BlY2ltZW5cIjpcIldob2xlIGJsb29kXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMC00NTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIlwiLFwiZmFjdG9yXCI6XCIwLjAwMVwiLFwic2lSYW5nZVwiOlwiMC0wLjQ1XCIsXCJzaVVuaXRcIjpcIsOXMTA5L0xcIixcInNpVmFsdWVcIjpcIjBcIixcInVzVmFsdWVcIjpcIjBcIn0se1wibmFtZVwiOlwiQmFzb3BoaWxzICVcIixcInNwZWNpbWVuXCI6XCJXaG9sZSBibG9vZFwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAtMjAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJcIixcImZhY3RvclwiOlwiMC4wMDFcIixcInNpUmFuZ2VcIjpcIjAtMC4yMFwiLFwic2lVbml0XCI6XCLDlzEwOS9MXCIsXCJzaVZhbHVlXCI6XCIwXCIsXCJ1c1ZhbHVlXCI6XCIwXCJ9LHtcIm5hbWVcIjpcIk5ldXRyb3BoaWxzLXNlZ21lbnRlZCAlXCIsXCJzcGVjaW1lblwiOlwiV2hvbGUgYmxvb2RcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI1NlwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiJVwiLFwiZmFjdG9yXCI6XCIwLjAxXCIsXCJzaVJhbmdlXCI6XCIwLjU2XCIsXCJzaVVuaXRcIjpcIlByb3BvcnRpb24gb2YgMS4wXCIsXCJzaVZhbHVlXCI6XCIwLjU2XCIsXCJ1c1ZhbHVlXCI6XCI1NlwifSx7XCJuYW1lXCI6XCJOZXV0cm9waGlscy1iYW5kcyAlXCIsXCJzcGVjaW1lblwiOlwiV2hvbGUgYmxvb2RcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIzXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCIlXCIsXCJmYWN0b3JcIjpcIjAuMDFcIixcInNpUmFuZ2VcIjpcIjAuMDNcIixcInNpVW5pdFwiOlwiUHJvcG9ydGlvbiBvZiAxLjBcIixcInNpVmFsdWVcIjpcIjAuMDNcIixcInVzVmFsdWVcIjpcIjNcIn0se1wibmFtZVwiOlwiTHltcGhvY3l0ZXMgJVwiLFwic3BlY2ltZW5cIjpcIldob2xlIGJsb29kXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMzRcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIiVcIixcImZhY3RvclwiOlwiMC4wMVwiLFwic2lSYW5nZVwiOlwiMC4zNFwiLFwic2lVbml0XCI6XCJQcm9wb3J0aW9uIG9mIDEuMFwiLFwic2lWYWx1ZVwiOlwiMC4zNFwiLFwidXNWYWx1ZVwiOlwiMzRcIn0se1wibmFtZVwiOlwiTW9ub2N5dGVzICVcIixcInNwZWNpbWVuXCI6XCJXaG9sZSBibG9vZFwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjRcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIiVcIixcImZhY3RvclwiOlwiMC4wMVwiLFwic2lSYW5nZVwiOlwiMC4wNFwiLFwic2lVbml0XCI6XCJQcm9wb3J0aW9uIG9mIDEuMFwiLFwic2lWYWx1ZVwiOlwiMC4wNFwiLFwidXNWYWx1ZVwiOlwiNFwifSx7XCJuYW1lXCI6XCJFb3Npbm9waGlscyAlXCIsXCJzcGVjaW1lblwiOlwiV2hvbGUgYmxvb2RcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIyLjdcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIiVcIixcImZhY3RvclwiOlwiMC4wMVwiLFwic2lSYW5nZVwiOlwiMC4wMjdcIixcInNpVW5pdFwiOlwiUHJvcG9ydGlvbiBvZiAxLjBcIixcInNpVmFsdWVcIjpcIjAuMDI3XCIsXCJ1c1ZhbHVlXCI6XCIyLjdcIn0se1wibmFtZVwiOlwiQmFzb3BoaWxzICVcIixcInNwZWNpbWVuXCI6XCJXaG9sZSBibG9vZFwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuM1wiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiJVwiLFwiZmFjdG9yXCI6XCIwLjAxXCIsXCJzaVJhbmdlXCI6XCIwLjAwM1wiLFwic2lVbml0XCI6XCJQcm9wb3J0aW9uIG9mIDEuMFwiLFwic2lWYWx1ZVwiOlwiMC4wMDNcIixcInVzVmFsdWVcIjpcIjAuM1wifSx7XCJuYW1lXCI6XCJaaWRvdnVkaW5lXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuMTUtMC4yN1wiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL21MXCIsXCJmYWN0b3JcIjpcIjMuN1wiLFwic2lSYW5nZVwiOlwiMC41Ni0xLjAxXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjAuNTZcIixcInVzVmFsdWVcIjpcIjAuMTVcIn0se1wibmFtZVwiOlwiWmluY1wiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNzUtMTIwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvZExcIixcImZhY3RvclwiOlwiMC4xNTNcIixcInNpUmFuZ2VcIjpcIjExLjUtMTguNVwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxMS41XCIsXCJ1c1ZhbHVlXCI6XCI3NVwifV07XG4gIFxuXG4gXHRsZXQgcHJlZml4ID0gJyc7XG5cdGxldCBpID0gMDtcbiAgbGV0IGN1cnJlbnQgPSAnSHVtYW4nO1xuICBcbiAgZnVuY3Rpb24gc2V0Qm90aEZyb21TSSh2YWx1ZSwgaSkge1xuICAgIGNvbnN0IHtmYWN0b3IsIHNpVmFsdWV9ID0gdW5pdHNbaV07XG4gICAgdW5pdHNbaV0uc2lWYWx1ZSA9ICt2YWx1ZTtcbiAgICB1bml0c1tpXS51c1ZhbHVlID0gKyh2YWx1ZSAvIGZhY3RvcikudG9GaXhlZCgyKTtcbiAgfVxuICBmdW5jdGlvbiBzZXRCb3RoRnJvbVVTKHZhbHVlLCBpKSB7XG4gICAgY29uc3Qge2ZhY3RvciwgdXNWYWx1ZX0gPSB1bml0c1tpXTtcbiAgICB1bml0c1tpXS51c1ZhbHVlID0gK3ZhbHVlO1xuICAgIHVuaXRzW2ldLnNpVmFsdWUgPSArKHZhbHVlICogZmFjdG9yKS50b0ZpeGVkKDIpOztcbiAgfVxuXG5cdCQ6IGZpbHRlcmVkVW5pdHMgPSBwcmVmaXhcblx0XHQ/IHVuaXRzLmZpbHRlcih1bml0ID0+IHtcblx0XHRcdGNvbnN0IG5hbWVzID0gYCR7dW5pdC5uYW1lfWA7XG5cdFx0XHRyZXR1cm4gbmFtZXMudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKHByZWZpeC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIFxuXHRcdH0pXG5cdFx0OiB1bml0cztcbiQ6IHNlbGVjdGVkID0gZmlsdGVyZWRVbml0c1tpXTtcblxuaW1wb3J0IEZhIGZyb20gJ3N2ZWx0ZS1mYSc7XG5pbXBvcnQgeyBmYUZsYWdVc2EsIGZhR2xvYmUsIGZhQXJyb3dzQWx0SCwgZmFWaWFsLCBmYUNhbGN1bGF0b3IgfSBmcm9tICdAZm9ydGF3ZXNvbWUvcHJvLWR1b3RvbmUtc3ZnLWljb25zJztcbjwvc2NyaXB0PlxuXG5cblxuXG5cblxuXG5cblxuICA8ZGl2IGNsYXNzPVwibXgtYXV0byAgcHgtMVwiPlxuXG4gIFxuXG5cbiA8ZGl2IGNsYXNzPVwibWQ6dy0xLzQgbWItMiBzbTp3LTEvMyB0ZXh0LWJsYWNrIHAtMVwiPlNlYXJjaCBVbml0cyA8aW5wdXQgcGxhY2Vob2xkZXI9XCJVbml0XCIgY2xhc3M9XCJtdC0xIGJsb2NrIHctZnVsbCAgdGV4dC1ncmF5LTcwMCBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgcHktMiBweC0yIGxlYWRpbmctdGlnaHQgYmctd2hpdGUgIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpiZy13aGl0ZSBmb2N1czpib3JkZXItZ3JheS01MDBcIiB0eXBlPVwic2VhcmNoXCIgYmluZDp2YWx1ZT17cHJlZml4fT48L2Rpdj5cblxuXG4gIHsjZWFjaCBmaWx0ZXJlZFVuaXRzIGFzIHVuaXQsIGl9XG4gPGRpdiBjbGFzcz1cImJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZCBtYi0yXCI+XG5cblxuIDxkaXYgY2xhc3M9XCJmbGV4IGZsZXgtd3JhcCBtZDpmbGV4LW5vLXdyYXAgbGc6ZmxleC1uby13cmFwIHB4LTEgIG1iLTFcIj5cbiA8ZGl2IGNsYXNzPVwidy1mdWxsIG1kOnctMi81XCIgPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb250LWJvbGQgdGV4dC1ibGFjayB0ZXh0LXhsXCI+e3VuaXQubmFtZX08L2Rpdj5cbiAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5saW5lIHRleHQtZ3JheS03MDAgdGV4dC14c1wiPjwhLS0gPEZhIGNsYXNzPVwiaW5saW5lXCIgIHNlY29uZGFyeUNvbG9yPVwicmVkXCIgIGljb249e2ZhVmlhbH0vPiAtLT4gPHN0cm9uZz5TcGVjaW1lbjogPC9zdHJvbmc+IHt1bml0LnNwZWNpbWVufSA8L2Rpdj5cbiAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmxpbmUgdGV4dC1ncmF5LTcwMCB0ZXh0LXhzIG1sLTNcIj48IS0tIDxGYSBjbGFzcz1cImlubGluZVwiICBpY29uPXtmYUNhbGN1bGF0b3J9Lz4gLS0+IDxzdHJvbmc+Q29udmVyc2lvbiBGYWN0b3I6PC9zdHJvbmc+ICB7dW5pdC5mYWN0b3J9IDwvZGl2PlxuICAgICAgICAgICAgXG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwibWQ6dy0xLzMgdy0xLzIgaC0xNCBwci0xIHBsLTFcIj5cbiAgPGxhYmVsIGNsYXNzPVwiYmxvY2sgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGUgdGV4dC1ncmF5LTcwMCB0ZXh0LXhzIGZvbnQtYm9sZCBtYi0xXCIgZm9yPVwiZ3JpZC1maXJzdC1uYW1lXCI+XG4gICAgICAgPEZhIGNsYXNzPVwiaW5saW5lXCIgc2l6ZT1cImxnXCIgcHJpbWFyeUNvbG9yPVwiYmx1ZVwiIHNlY29uZGFyeUNvbG9yPVwicmVkXCIgaWNvbj17ZmFGbGFnVXNhfS8+IFVTIFVuaXRcbiAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJhcHBlYXJhbmNlLW5vbmUgbXQtMSBibG9jayB3LWZ1bGwgYmctZ3JheS0xMDAgdGV4dC1ncmF5LTcwMCBib3JkZXIgYm9yZGVyLWJsdWUtMjAwIHJvdW5kZWQgcHktMiBweC0yIGxlYWRpbmctdGlnaHQgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJnLXdoaXRlIGZvY3VzOmJvcmRlci1ncmF5LTUwMFwiIHZhbHVlPXt1bml0LnVzVmFsdWV9IG9uOmlucHV0PVwie2UgPT4gc2V0Qm90aEZyb21VUyhlLnRhcmdldC52YWx1ZSwgaSl9XCIgIHR5cGU9bnVtYmVyIHBsYWNlaG9sZGVyPVwiIFVTXCI+XG48ZGl2IGNsYXNzPVwidGV4dC1ncmF5LTcwMCB0ZXh0LXNtXCI+VVMgUmFuZ2U6e3VuaXQuY29udmVudGlvbmFsUmFuZ2V9IHt1bml0LmNvbnZlbnRpb25hbFVuaXR9PC9kaXY+XG4gICAgICAgICAgICAgPC9kaXY+XG5cbiA8ZGl2IGNsYXNzPVwibWQ6dy0xLzMgdy0xLzIgICBoLTE0IHByLTEgcGwtMVwiPlxuIDxsYWJlbCBjbGFzcz1cImJsb2NrIHVwcGVyY2FzZSB0cmFja2luZy13aWRlIHRleHQtZ3JheS03MDAgdGV4dC14cyBmb250LWJvbGQgbWItMVwiIGZvcj1cImdyaWQtZmlyc3QtbmFtZVwiPlxuICAgICAgICA8RmEgY2xhc3M9XCJpbmxpbmVcIiBzaXplPVwibGdcIiBwcmltYXJ5Q29sb3I9XCJncmVlblwiIHNlY29uZGFyeUNvbG9yPVwibGlnaHRibHVlXCIgaWNvbj17ZmFHbG9iZX0vPiBTSSBVbml0XG4gICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiYXBwZWFyYW5jZS1ub25lIG10LTEgYmxvY2sgdy1mdWxsIGJnLWdyYXktMTAwIHRleHQtZ3JheS03MDAgYm9yZGVyIGJvcmRlci1ncmF5LTIwMCByb3VuZGVkIHB5LTIgcHgtMiBsZWFkaW5nLXRpZ2h0IGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpiZy13aGl0ZSBmb2N1czpib3JkZXItZ3JheS01MDBcIiB2YWx1ZT17dW5pdC5zaVZhbHVlfSBvbjppbnB1dD1cIntlID0+IHNldEJvdGhGcm9tU0koZS50YXJnZXQudmFsdWUsIGkpfVwiIHR5cGU9bnVtYmVyIHBsYWNlaG9sZGVyPVwiU0lcIj5cbjxkaXYgY2xhc3M9XCJ0ZXh0LWdyYXktNzAwIHRleHQtc21cIj5TSSBSYW5nZToge3VuaXQuc2lSYW5nZX0ge3VuaXQuc2lVbml0fSA8L2Rpdj5cbiAgICAgICAgICAgICA8L2Rpdj5cblxuIFxuIFxuIFxuIDwvZGl2PiBcbjwvZGl2Plxuey9lYWNofVxuICBcbiAgIFxuXG4gICBcblxuICAgIFxuXG4gIFxuICAgPC9kaXY+XG48Zm9vdGVyIGNsYXNzPSd3LWZ1bGwgdGV4dC1jZW50ZXIgYm9yZGVyLXQgYm9yZGVyLWdyZXkgcC00IHBpbi1iJz5cbiAgICAgICAgICAgIHd3dy5tZWRpY2FsdW5pdGNvbnZlcnRlci5jb21cbiAgICAgICAgPC9mb290ZXI+IiwiPHN2ZWx0ZTpoZWFkPlxuICA8dGl0bGU+bWVkaWNhbHVuaXRjb252ZXJ0ZXIuY29tPC90aXRsZT5cbiAgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD1cIk1lZGljYWwgdW5pdCBjb252ZXJzaW9uIGNhbGN1bGF0b3IsIG1lZGljYWx1bml0Y29udmVydGVyLmNvbS4gQ29udmVydCBVUyB1bml0cyB0byBJbnRlcm5hdGlvbmFsIChTSSkgdW5pdHMgZWFzaWx5IHdpdGggdGhpcyBvbmxuZSBjYWxjdWxhdG9yLiBFYXNpbHkgc2VhcmNoIGZvciBhIHNwZWNpZmljIGxhYiB0ZXN0LCBlbnRlciBhbnkgdmFsdWUgYW5kIGNvbnZlcnQgdGhlIHVuaXRzLiBGb3IgYm90aCBIdW1hbiBhbmQgVmV0ZXJpbmFyeSB2YWx1ZXMuXCI+XG4gICAgPHNjcmlwdCBhc3luYyBzcmM9XCJodHRwczovL3BhZ2VhZDIuZ29vZ2xlc3luZGljYXRpb24uY29tL3BhZ2VhZC9qcy9hZHNieWdvb2dsZS5qc1wiPjwvc2NyaXB0PlxuXG48IS0tIEdsb2JhbCBzaXRlIHRhZyAoZ3RhZy5qcykgLSBHb29nbGUgQW5hbHl0aWNzIC0tPlxuPHNjcmlwdCBhc3luYyBzcmM9XCJodHRwczovL3d3dy5nb29nbGV0YWdtYW5hZ2VyLmNvbS9ndGFnL2pzP2lkPVVBLTI1NTcwMS0xOFwiPjwvc2NyaXB0PlxuPHNjcmlwdD5cbiAgd2luZG93LmRhdGFMYXllciA9IHdpbmRvdy5kYXRhTGF5ZXIgfHwgW107XG4gIGZ1bmN0aW9uIGd0YWcoKXtkYXRhTGF5ZXIucHVzaChhcmd1bWVudHMpO31cbiAgZ3RhZygnanMnLCBuZXcgRGF0ZSgpKTtcblxuICBndGFnKCdjb25maWcnLCAnVUEtMjU1NzAxLTE4Jyk7XG48L3NjcmlwdD5cbjwvc3ZlbHRlOmhlYWQ+XG5cblxuXG5cbjxzY3JpcHQ+XG4gIGltcG9ydCB7IGZhZGUsIGZseSB9IGZyb20gJ3N2ZWx0ZS90cmFuc2l0aW9uJztcbiAvL2ltcG9ydCBqJCBmcm9tICdqcXVlcnknO1xuLy9pbXBvcnQgeyBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJztcblxuLy9vbk1vdW50KCgpID0+IHtcbi8vICAgIGokKCcudGVzdCcpLmNsaWNrKCgpID0+IHtcbi8vICAgICAgICBjb25zb2xlLmxvZygndGVzdCcpO1xuIC8vICAgfSk7XG4vL30pO1xuXG5cblxuXG5cbmxldCBuYW1lID0gJyc7XG5cbiAgbGV0IHVuaXRzID0gW3tcInVzVmFsdWVcIjpcIlwiLFwic2lWYWx1ZVwiOlwiXCIsXCJ1c0FiYnJcIjpcImluXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJpbmNoZXNcIixcImZhY3RvclwiOlwiMi41NFwiLFwic2lVbml0XCI6XCJjZW50aW1ldGVyc1wiLFwic2lBYmJyXCI6XCJjbVwifSx7XCJ1c1ZhbHVlXCI6XCJcIixcInNpVmFsdWVcIjpcIlwiLFwidXNBYmJyXCI6XCJmdFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiZmVldFwiLFwiZmFjdG9yXCI6XCIzMFwiLFwic2lVbml0XCI6XCJjZW50aW1ldGVyc1wiLFwic2lBYmJyXCI6XCJjbVwifSx7XCJ1c1ZhbHVlXCI6XCJcIixcInNpVmFsdWVcIjpcIlwiLFwidXNBYmJyXCI6XCJmdFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiZmVldFwiLFwiZmFjdG9yXCI6XCIwLjNcIixcInNpVW5pdFwiOlwibWV0ZXJzXCIsXCJzaUFiYnJcIjpcIm1cIn0se1widXNWYWx1ZVwiOlwiXCIsXCJzaVZhbHVlXCI6XCJcIixcInVzQWJiclwiOlwieWRcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcInlhcmRzXCIsXCJmYWN0b3JcIjpcIjAuOVwiLFwic2lVbml0XCI6XCJtZXRlcnNcIixcInNpQWJiclwiOlwibVwifSx7XCJ1c1ZhbHVlXCI6XCJcIixcInNpVmFsdWVcIjpcIlwiLFwidXNBYmJyXCI6XCJtaWxlc1wiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWlsZXNcIixcImZhY3RvclwiOlwiMS42XCIsXCJzaVVuaXRcIjpcImtpbG9tZXRlcnNcIixcInNpQWJiclwiOlwia21cIn0se1widXNWYWx1ZVwiOlwiXCIsXCJzaVZhbHVlXCI6XCJcIixcInVzQWJiclwiOlwic3EgaW5cIixcImNvbnZlbnRpb25hbFVuaXRcIjpcInNxdWFyZSBpbmNoZXNcIixcImZhY3RvclwiOlwiNi41XCIsXCJzaVVuaXRcIjpcInNxdWFyZSBjZW50aW1ldGVyc1wiLFwic2lBYmJyXCI6XCJjbTxzdXA+Mjwvc3VwPlwifSx7XCJ1c1ZhbHVlXCI6XCJcIixcInNpVmFsdWVcIjpcIlwiLFwidXNBYmJyXCI6XCJzcSBmdFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwic3F1YXJlIGZlZXRcIixcImZhY3RvclwiOlwiMC4wOVwiLFwic2lVbml0XCI6XCJzcXVhcmUgbWV0ZXJzXCIsXCJzaUFiYnJcIjpcIm08c3VwPjI8L3N1cD5cIn0se1widXNWYWx1ZVwiOlwiXCIsXCJzaVZhbHVlXCI6XCJcIixcInVzQWJiclwiOlwic3EgeWRcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcInNxdWFyZSB5YXJkXCIsXCJmYWN0b3JcIjpcIjAuOFwiLFwic2lVbml0XCI6XCJzcXVhcmUgbWV0ZXJzXCIsXCJzaUFiYnJcIjpcIm08c3VwPjI8L3N1cD5cIn0se1widXNWYWx1ZVwiOlwiXCIsXCJzaVZhbHVlXCI6XCJcIixcInVzQWJiclwiOlwic3EgbWlsZXNcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcInNxdWFyZSBtaWxlc1wiLFwiZmFjdG9yXCI6XCIyLjZcIixcInNpVW5pdFwiOlwic3F1YXJlIGtpbG9tZXRlcnNcIixcInNpQWJiclwiOlwia208c3VwPjI8L3N1cD5cIn0se1widXNWYWx1ZVwiOlwiXCIsXCJzaVZhbHVlXCI6XCJcIixcInVzQWJiclwiOlwib3pcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm91bmNlc1wiLFwiZmFjdG9yXCI6XCIyOFwiLFwic2lVbml0XCI6XCJncmFtc1wiLFwic2lBYmJyXCI6XCJnXCJ9LHtcInVzVmFsdWVcIjpcIlwiLFwic2lWYWx1ZVwiOlwiXCIsXCJ1c0FiYnJcIjpcImxiXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJwb3VuZHNcIixcImZhY3RvclwiOlwiMC40NVwiLFwic2lVbml0XCI6XCJraWxvZ3JhbXNcIixcInNpQWJiclwiOlwia2dcIn0se1widXNWYWx1ZVwiOlwiXCIsXCJzaVZhbHVlXCI6XCJcIixcInVzQWJiclwiOlwidHNwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJ0ZWFzcG9vbnNcIixcImZhY3RvclwiOlwiNVwiLFwic2lVbml0XCI6XCJtaWxsaWxpdGVyc1wiLFwic2lBYmJyXCI6XCJtTFwifSx7XCJ1c1ZhbHVlXCI6XCJcIixcInNpVmFsdWVcIjpcIlwiLFwidXNBYmJyXCI6XCJ0YnNwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJ0YWJsZXNwb29uc1wiLFwiZmFjdG9yXCI6XCIxNVwiLFwic2lVbml0XCI6XCJtaWxsaWxpdGVyc1wiLFwic2lBYmJyXCI6XCJtTFwifSx7XCJ1c1ZhbHVlXCI6XCJcIixcInNpVmFsdWVcIjpcIlwiLFwidXNBYmJyXCI6XCJmbCBvelwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiZmx1aWQgb3VuY2VzXCIsXCJmYWN0b3JcIjpcIjMwXCIsXCJzaVVuaXRcIjpcIm1pbGxpbGl0ZXJzXCIsXCJzaUFiYnJcIjpcIm1MXCJ9LHtcInVzVmFsdWVcIjpcIlwiLFwic2lWYWx1ZVwiOlwiXCIsXCJ1c0FiYnJcIjpcImNcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcImN1cHNcIixcImZhY3RvclwiOlwiMC4yNFwiLFwic2lVbml0XCI6XCJsaXRlcnNcIixcInNpQWJiclwiOlwiTFwifSx7XCJ1c1ZhbHVlXCI6XCJcIixcInNpVmFsdWVcIjpcIlwiLFwidXNBYmJyXCI6XCJwdFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiVVMgcGludHNcIixcImZhY3RvclwiOlwiMC40N1wiLFwic2lVbml0XCI6XCJsaXRlcnNcIixcInNpQWJiclwiOlwiTFwifSx7XCJ1c1ZhbHVlXCI6XCJcIixcInNpVmFsdWVcIjpcIlwiLFwidXNBYmJyXCI6XCJxdFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiVVMgcXVhcnRzXCIsXCJmYWN0b3JcIjpcIjAuOTVcIixcInNpVW5pdFwiOlwibGl0ZXJzXCIsXCJzaUFiYnJcIjpcIkxcIn0se1widXNWYWx1ZVwiOlwiXCIsXCJzaVZhbHVlXCI6XCJcIixcInVzQWJiclwiOlwiZ2FsXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJVUyBnYWxsb25zXCIsXCJmYWN0b3JcIjpcIjMuOFwiLFwic2lVbml0XCI6XCJsaXRlcnNcIixcInNpQWJiclwiOlwiTFwifSx7XCJ1c1ZhbHVlXCI6XCJcIixcInNpVmFsdWVcIjpcIlwiLFwidXNBYmJyXCI6XCJjdSBmdFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiY3ViaWMgZmVldFwiLFwiZmFjdG9yXCI6XCIwLjAzXCIsXCJzaVVuaXRcIjpcImN1YmljIG1ldGVyc1wiLFwic2lBYmJyXCI6XCJtPHN1cD4zPC9zdXA+XCJ9LHtcInVzVmFsdWVcIjpcIlwiLFwic2lWYWx1ZVwiOlwiXCIsXCJ1c0FiYnJcIjpcImN1IHlkXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJjdWJpYyB5YXJkXCIsXCJmYWN0b3JcIjpcIjAuNzZcIixcInNpVW5pdFwiOlwiY3ViaWMgbWV0ZXJzXCIsXCJzaUFiYnJcIjpcIm08c3VwPjM8L3N1cD5cIn1dO1xuICBcblxuXG5cdGxldCBwcmVmaXggPSAnJztcblx0bGV0IGkgPSAwO1xuICBcdGxldCBjdXJyZW50ID0gJ21ldHJpYyB1bml0cyc7XG4gIGZ1bmN0aW9uIHNldEJvdGhGcm9tU0kodmFsdWUsIGkpIHtcbiAgICBjb25zdCB7ZmFjdG9yLCBzaVZhbHVlfSA9IHVuaXRzW2ldO1xuICAgIHVuaXRzW2ldLnNpVmFsdWUgPSArdmFsdWU7XG4gICAgdW5pdHNbaV0udXNWYWx1ZSA9ICsodmFsdWUgLyBmYWN0b3IpLnRvRml4ZWQoMik7XG4gIH1cbiAgZnVuY3Rpb24gc2V0Qm90aEZyb21VUyh2YWx1ZSwgaSkge1xuICAgIGNvbnN0IHtmYWN0b3IsIHVzVmFsdWV9ID0gdW5pdHNbaV07XG4gICAgdW5pdHNbaV0udXNWYWx1ZSA9ICt2YWx1ZTtcbiAgICB1bml0c1tpXS5zaVZhbHVlID0gKyh2YWx1ZSAqIGZhY3RvcikudG9GaXhlZCgyKTs7XG4gIH1cblxuIFxuXG5cdCQ6IGZpbHRlcmVkVW5pdHMgPSBwcmVmaXhcblx0XHQ/IHVuaXRzLmZpbHRlcih1bml0ID0+IHtcblx0XHRcdGNvbnN0IG5hbWVzID0gYCR7dW5pdC5jb252ZW50aW9uYWxVbml0fWA7XG5cdFx0XHRyZXR1cm4gbmFtZXMudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKHByZWZpeC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIFxuXHRcdH0pXG5cdFx0OiB1bml0cztcbiQ6IHNlbGVjdGVkID0gZmlsdGVyZWRVbml0c1tpXTtcblxuaW1wb3J0IEZhIGZyb20gJ3N2ZWx0ZS1mYSc7XG5pbXBvcnQgeyBmYUZsYWdVc2EsIGZhR2xvYmUsIGZhQXJyb3dzQWx0SCwgZmFWaWFsLCBmYUNhbGN1bGF0b3IgfSBmcm9tICdAZm9ydGF3ZXNvbWUvcHJvLWR1b3RvbmUtc3ZnLWljb25zJztcbjwvc2NyaXB0PlxuXG5cblxuXG5cblxuXG5cblxuICA8ZGl2IGNsYXNzPVwibXgtYXV0byBweC0xXCI+XG5cbiAgXG5cblxuXG5cbiA8ZGl2IGNsYXNzPVwibWQ6dy0xLzQgbWItMyBzbTp3LTEvMyB0ZXh0LWJsYWNrIHAtMVwiPlNlYXJjaCBVbml0cyA8aW5wdXQgcGxhY2Vob2xkZXI9XCJVbml0XCIgY2xhc3M9XCJtdC0xIGJsb2NrIHctZnVsbCAgdGV4dC1ncmF5LTcwMCBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgcHktMiBweC0yIGxlYWRpbmctdGlnaHQgYmctd2hpdGUgIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpiZy13aGl0ZSBmb2N1czpib3JkZXItZ3JheS01MDBcIiB0eXBlPVwic2VhcmNoXCIgYmluZDp2YWx1ZT17cHJlZml4fT48L2Rpdj5cblxuXG4gIHsjZWFjaCBmaWx0ZXJlZFVuaXRzIGFzIHVuaXQsIGl9XG4gPGRpdiBjbGFzcz1cImJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZCBtYi0yXCI+XG5cblxuIDxkaXYgY2xhc3M9XCJmbGV4IGZsZXgtd3JhcCBtZDpmbGV4LW5vLXdyYXAgbGc6ZmxleC1uby13cmFwIHB4LTEgIG1iLTFcIj5cbiA8ZGl2IGNsYXNzPVwidy1mdWxsIG1kOnctMi81XCIgPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb250LWJvbGQgdGV4dC1ibGFjayB0ZXh0LXhsXCI+e3VuaXQuY29udmVudGlvbmFsVW5pdH0gPEZhIGNsYXNzPVwiaW5saW5lIHRleHQtZ3JheS03MDBcIiBzaXplPVwibGdcIiBpY29uPXtmYUFycm93c0FsdEh9Lz4ge3VuaXQuc2lVbml0fTwvZGl2PlxuICAgICAgICAgICAgXG4gICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1ncmF5LTcwMCB0ZXh0LXhzXCI+PCEtLSA8RmEgY2xhc3M9XCJpbmxpbmVcIiBzaXplPVwic21cIiBpY29uPXtmYUNhbGN1bGF0b3J9Lz4gLS0+ICA8c3Ryb25nPkNvbnZlcnNpb24gRmFjdG9yOjwvc3Ryb25nPiB7dW5pdC5mYWN0b3J9IDwvZGl2PlxuICAgICAgICAgICAgXG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwibWQ6dy0xLzMgdy0xLzIgIGgtMTQgcHItMSBwbC0xXCI+XG4gIDxsYWJlbCBjbGFzcz1cImJsb2NrIHVwcGVyY2FzZSB0cmFja2luZy13aWRlIHRleHQtZ3JheS03MDAgdGV4dC14cyBmb250LWJvbGQgbWItMVwiIGZvcj1cImdyaWQtZmlyc3QtbmFtZVwiPlxuICAgICAgIDxGYSBjbGFzcz1cImlubGluZVwiIHNpemU9XCJsZ1wiIHByaW1hcnlDb2xvcj1cImJsdWVcIiBzZWNvbmRhcnlDb2xvcj1cInJlZFwiIGljb249e2ZhRmxhZ1VzYX0vPiBVUyBVbml0IFxuICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImFwcGVhcmFuY2Utbm9uZSBtdC0xIGJsb2NrIHctZnVsbCBiZy1ncmF5LTEwMCB0ZXh0LWdyYXktNzAwIGJvcmRlciBib3JkZXItYmx1ZS0yMDAgcm91bmRlZCBweS0yIHB4LTIgbGVhZGluZy10aWdodCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ymctd2hpdGUgZm9jdXM6Ym9yZGVyLWdyYXktNTAwXCIgbmFtZT1cInVze2l9XCIgdmFsdWU9e3VuaXQudXNWYWx1ZX0gb246aW5wdXQ9XCJ7ZSA9PiBzZXRCb3RoRnJvbVVTKGUudGFyZ2V0LnZhbHVlLCBpKX1cIiAgdHlwZT1udW1iZXIgcGxhY2Vob2xkZXI9XCIgXCI+XG48ZGl2IGNsYXNzPVwidGV4dC1ncmF5LTcwMCB0ZXh0LXNtXCI+e3VuaXQuY29udmVudGlvbmFsVW5pdH08L2Rpdj5cbiAgICAgICAgICAgICA8L2Rpdj5cblxuIDxkaXYgY2xhc3M9XCJtZDp3LTEvMyB3LTEvMiAgaC0xNCBwci0xIHBsLTFcIj5cbiA8bGFiZWwgY2xhc3M9XCJibG9jayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZSB0ZXh0LWdyYXktNzAwIHRleHQteHMgZm9udC1ib2xkIG1iLTFcIiBmb3I9XCJncmlkLWZpcnN0LW5hbWVcIj5cbiAgICAgICAgPEZhIGNsYXNzPVwiaW5saW5lXCIgc2l6ZT1cImxnXCIgcHJpbWFyeUNvbG9yPVwiZ3JlZW5cIiBzZWNvbmRhcnlDb2xvcj1cImxpZ2h0Ymx1ZVwiIGljb249e2ZhR2xvYmV9Lz4gU0kgVW5pdCBcbiAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJhcHBlYXJhbmNlLW5vbmUgbXQtMSBibG9jayB3LWZ1bGwgYmctZ3JheS0xMDAgdGV4dC1ncmF5LTcwMCBib3JkZXIgYm9yZGVyLWdyYXktMjAwIHJvdW5kZWQgcHktMiBweC0yIGxlYWRpbmctdGlnaHQgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJnLXdoaXRlIGZvY3VzOmJvcmRlci1ncmF5LTUwMFwiIG5hbWU9XCJzaXtpfVwiIHZhbHVlPXt1bml0LnNpVmFsdWV9IG9uOmlucHV0PVwie2UgPT4gc2V0Qm90aEZyb21TSShlLnRhcmdldC52YWx1ZSwgaSl9XCIgdHlwZT1udW1iZXIgcGxhY2Vob2xkZXI9XCIgXCI+XG48ZGl2IGNsYXNzPVwidGV4dC1ncmF5LTcwMCB0ZXh0LXNtXCI+e3VuaXQuc2lVbml0fSA8L2Rpdj5cbiAgICAgICAgICAgICA8L2Rpdj5cblxuIFxuIFxuIFxuIDwvZGl2PiBcbjwvZGl2Plxuey9lYWNofVxuICBcbiAgIFxuICAgXG4gICBcblxuICAgIFxuXG4gIFxuICAgPC9kaXY+XG48Zm9vdGVyIGNsYXNzPSd3LWZ1bGwgdGV4dC1jZW50ZXIgYm9yZGVyLXQgYm9yZGVyLWdyZXkgcC00IHBpbi1iJz5cbiAgICAgICAgICAgIHd3dy5tZWRpY2FsdW5pdGNvbnZlcnRlci5jb21cbiAgICAgICAgPC9mb290ZXI+IiwiPHNjcmlwdCBjb250ZXh0PVwibW9kdWxlXCI+XG5cdGV4cG9ydCBmdW5jdGlvbiBwcmVsb2FkKHsgcGFyYW1zLCBxdWVyeSB9KSB7XG5cdFx0cmV0dXJuIHRoaXMuZmV0Y2goYGJsb2cuanNvbmApLnRoZW4ociA9PiByLmpzb24oKSkudGhlbihwb3N0cyA9PiB7XG5cdFx0XHRyZXR1cm4geyBwb3N0cyB9O1xuXHRcdH0pO1xuXHR9XG48L3NjcmlwdD5cblxuPHNjcmlwdD5cblx0ZXhwb3J0IGxldCBwb3N0cztcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cdHVsIHtcblx0XHRtYXJnaW46IDAgMCAxZW0gMDtcblx0XHRsaW5lLWhlaWdodDogMS41O1xuXHR9XG48L3N0eWxlPlxuXG48c3ZlbHRlOmhlYWQ+XG5cdDx0aXRsZT5CbG9nPC90aXRsZT5cbjwvc3ZlbHRlOmhlYWQ+XG5cbjxoMT5SZWNlbnQgcG9zdHM8L2gxPlxuXG48dWw+XG5cdHsjZWFjaCBwb3N0cyBhcyBwb3N0fVxuXHRcdDwhLS0gd2UncmUgdXNpbmcgdGhlIG5vbi1zdGFuZGFyZCBgcmVsPXByZWZldGNoYCBhdHRyaWJ1dGUgdG9cblx0XHRcdFx0dGVsbCBTYXBwZXIgdG8gbG9hZCB0aGUgZGF0YSBmb3IgdGhlIHBhZ2UgYXMgc29vbiBhc1xuXHRcdFx0XHR0aGUgdXNlciBob3ZlcnMgb3ZlciB0aGUgbGluayBvciB0YXBzIGl0LCBpbnN0ZWFkIG9mXG5cdFx0XHRcdHdhaXRpbmcgZm9yIHRoZSAnY2xpY2snIGV2ZW50IC0tPlxuXHRcdDxsaT48YSByZWw9J3ByZWZldGNoJyBocmVmPSdibG9nL3twb3N0LnNsdWd9Jz57cG9zdC50aXRsZX08L2E+PC9saT5cblx0ey9lYWNofVxuPC91bD4iLCI8c2NyaXB0IGNvbnRleHQ9XCJtb2R1bGVcIj5cblx0ZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByZWxvYWQoeyBwYXJhbXMsIHF1ZXJ5IH0pIHtcblx0XHQvLyB0aGUgYHNsdWdgIHBhcmFtZXRlciBpcyBhdmFpbGFibGUgYmVjYXVzZVxuXHRcdC8vIHRoaXMgZmlsZSBpcyBjYWxsZWQgW3NsdWddLnN2ZWx0ZVxuXHRcdGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuZmV0Y2goYGJsb2cvJHtwYXJhbXMuc2x1Z30uanNvbmApO1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuXG5cdFx0aWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xuXHRcdFx0cmV0dXJuIHsgcG9zdDogZGF0YSB9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmVycm9yKHJlcy5zdGF0dXMsIGRhdGEubWVzc2FnZSk7XG5cdFx0fVxuXHR9XG48L3NjcmlwdD5cblxuPHNjcmlwdD5cblx0ZXhwb3J0IGxldCBwb3N0O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblx0Lypcblx0XHRCeSBkZWZhdWx0LCBDU1MgaXMgbG9jYWxseSBzY29wZWQgdG8gdGhlIGNvbXBvbmVudCxcblx0XHRhbmQgYW55IHVudXNlZCBzdHlsZXMgYXJlIGRlYWQtY29kZS1lbGltaW5hdGVkLlxuXHRcdEluIHRoaXMgcGFnZSwgU3ZlbHRlIGNhbid0IGtub3cgd2hpY2ggZWxlbWVudHMgYXJlXG5cdFx0Z29pbmcgdG8gYXBwZWFyIGluc2lkZSB0aGUge3t7cG9zdC5odG1sfX19IGJsb2NrLFxuXHRcdHNvIHdlIGhhdmUgdG8gdXNlIHRoZSA6Z2xvYmFsKC4uLikgbW9kaWZpZXIgdG8gdGFyZ2V0XG5cdFx0YWxsIGVsZW1lbnRzIGluc2lkZSAuY29udGVudFxuXHQqL1xuXHQuY29udGVudCA6Z2xvYmFsKGgyKSB7XG5cdFx0Zm9udC1zaXplOiAxLjRlbTtcblx0XHRmb250LXdlaWdodDogNTAwO1xuXHR9XG5cblx0LmNvbnRlbnQgOmdsb2JhbChwcmUpIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xuXHRcdGJveC1zaGFkb3c6IGluc2V0IDFweCAxcHggNXB4IHJnYmEoMCwwLDAsMC4wNSk7XG5cdFx0cGFkZGluZzogMC41ZW07XG5cdFx0Ym9yZGVyLXJhZGl1czogMnB4O1xuXHRcdG92ZXJmbG93LXg6IGF1dG87XG5cdH1cblxuXHQuY29udGVudCA6Z2xvYmFsKHByZSkgOmdsb2JhbChjb2RlKSB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cdFx0cGFkZGluZzogMDtcblx0fVxuXG5cdC5jb250ZW50IDpnbG9iYWwodWwpIHtcblx0XHRsaW5lLWhlaWdodDogMS41O1xuXHR9XG5cblx0LmNvbnRlbnQgOmdsb2JhbChsaSkge1xuXHRcdG1hcmdpbjogMCAwIDAuNWVtIDA7XG5cdH1cbjwvc3R5bGU+XG5cbjxzdmVsdGU6aGVhZD5cblx0PHRpdGxlPntwb3N0LnRpdGxlfTwvdGl0bGU+XG48L3N2ZWx0ZTpoZWFkPlxuXG48aDE+e3Bvc3QudGl0bGV9PC9oMT5cblxuPGRpdiBjbGFzcz0nY29udGVudCc+XG5cdHtAaHRtbCBwb3N0Lmh0bWx9XG48L2Rpdj5cbiIsIjxzdmVsdGU6aGVhZD5cbiAgPHRpdGxlPm1lZGljYWx1bml0Y29udmVydGVyLmNvbTwvdGl0bGU+XG4gIDxtZXRhIG5hbWU9XCJkZXNjcmlwdGlvblwiIGNvbnRlbnQ9XCJNZWRpY2FsIHVuaXQgY29udmVyc2lvbiBjYWxjdWxhdG9yLCBtZWRpY2FsdW5pdGNvbnZlcnRlci5jb20uIENvbnZlcnQgVVMgdW5pdHMgdG8gSW50ZXJuYXRpb25hbCAoU0kpIHVuaXRzIGVhc2lseSB3aXRoIHRoaXMgb25sbmUgY2FsY3VsYXRvci4gRWFzaWx5IHNlYXJjaCBmb3IgYSBzcGVjaWZpYyBsYWIgdGVzdCwgZW50ZXIgYW55IHZhbHVlIGFuZCBjb252ZXJ0IHRoZSB1bml0cy4gRm9yIGJvdGggSHVtYW4gYW5kIFZldGVyaW5hcnkgdmFsdWVzLlwiPlxuICAgIDxzY3JpcHQgYXN5bmMgc3JjPVwiaHR0cHM6Ly9wYWdlYWQyLmdvb2dsZXN5bmRpY2F0aW9uLmNvbS9wYWdlYWQvanMvYWRzYnlnb29nbGUuanNcIj48L3NjcmlwdD5cblxuPCEtLSBHbG9iYWwgc2l0ZSB0YWcgKGd0YWcuanMpIC0gR29vZ2xlIEFuYWx5dGljcyAtLT5cbjxzY3JpcHQgYXN5bmMgc3JjPVwiaHR0cHM6Ly93d3cuZ29vZ2xldGFnbWFuYWdlci5jb20vZ3RhZy9qcz9pZD1VQS0yNTU3MDEtMThcIj48L3NjcmlwdD5cbjxzY3JpcHQ+XG4gIHdpbmRvdy5kYXRhTGF5ZXIgPSB3aW5kb3cuZGF0YUxheWVyIHx8IFtdO1xuICBmdW5jdGlvbiBndGFnKCl7ZGF0YUxheWVyLnB1c2goYXJndW1lbnRzKTt9XG4gIGd0YWcoJ2pzJywgbmV3IERhdGUoKSk7XG5cbiAgZ3RhZygnY29uZmlnJywgJ1VBLTI1NTcwMS0xOCcpO1xuPC9zY3JpcHQ+XG48L3N2ZWx0ZTpoZWFkPlxuXG5cblxuXG48c2NyaXB0PlxuICBpbXBvcnQgeyBmYWRlLCBmbHkgfSBmcm9tICdzdmVsdGUvdHJhbnNpdGlvbic7XG4gLy9pbXBvcnQgaiQgZnJvbSAnanF1ZXJ5Jztcbi8vaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gJ3N2ZWx0ZSc7XG5cbi8vb25Nb3VudCgoKSA9PiB7XG4vLyAgICBqJCgnLnRlc3QnKS5jbGljaygoKSA9PiB7XG4vLyAgICAgICAgY29uc29sZS5sb2coJ3Rlc3QnKTtcbiAvLyAgIH0pO1xuLy99KTtcblxuXG5cblxuXG5sZXQgbmFtZSA9ICcnO1xuXG4gIGxldCB1bml0cyA9IFt7XCJuYW1lXCI6XCJBbGthbGluZSBwaG9zcGhhdGFzZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMzAtMTIwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJJVS9MXCIsXCJmYWN0b3JcIjpcIjFcIixcInNpUmFuZ2VcIjpcIjAuNS0yLjBcIixcInNpVW5pdFwiOlwiVS9MXCIsXCJzaVZhbHVlXCI6XCIwLjVcIixcInVzVmFsdWVcIjpcIjMwXCJ9LHtcIm5hbWVcIjpcIkFsYW5pbmUgYW1pbm90cmFuc2ZlcmFzZSAoQUxUKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMTAtNDBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIklVL0xcIixcImZhY3RvclwiOlwiMVwiLFwic2lSYW5nZVwiOlwiMC4xNy0wLjY4XCIsXCJzaVVuaXRcIjpcIlUvTFwiLFwic2lWYWx1ZVwiOlwiMC4xN1wiLFwidXNWYWx1ZVwiOlwiMTBcIn0se1wibmFtZVwiOlwiQWxidW1pblwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMy41LTUuMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiZy9kTFwiLFwiZmFjdG9yXCI6XCIxMFwiLFwic2lSYW5nZVwiOlwiMzUtNTBcIixcInNpVW5pdFwiOlwiZy9MXCIsXCJzaVZhbHVlXCI6XCIzNVwiLFwidXNWYWx1ZVwiOlwiMy41XCJ9LHtcIm5hbWVcIjpcIkFtbW9uaWEgKGFzIG5pdHJvZ2VuKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxNS00NVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWNnL2RMXCIsXCJmYWN0b3JcIjpcIjAuNTg3MlwiLFwic2lSYW5nZVwiOlwiMTEtMzJcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMTFcIixcInVzVmFsdWVcIjpcIjE1XCJ9LHtcIm5hbWVcIjpcIkFteWxhc2VcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjI3LTEzMVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiU29tb2d5aSB1bml0c1wiLFwiZmFjdG9yXCI6XCIxLjg1XCIsXCJzaVJhbmdlXCI6XCIwLjQ2LTIuMjNcIixcInNpVW5pdFwiOlwiVS9MXCIsXCJzaVZhbHVlXCI6XCIwLjQ2XCIsXCJ1c1ZhbHVlXCI6XCIyN1wifSx7XCJuYW1lXCI6XCJBc3BhcnRhdGUgYW1pbm90cmFuc2ZlcmFzZSAoQVNUKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMTAtMzBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIlUvTFwiLFwiZmFjdG9yXCI6XCIxXCIsXCJzaVJhbmdlXCI6XCIwLjE3LTAuNTFcIixcInNpVW5pdFwiOlwiVS9MXCIsXCJzaVZhbHVlXCI6XCIwLjE3XCIsXCJ1c1ZhbHVlXCI6XCIxMFwifSx7XCJuYW1lXCI6XCJCaWxpcnViaW4sIHRvdGFsXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLjMtMS4yXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCIxNy4xMDRcIixcInNpUmFuZ2VcIjpcIjUuMC0yMS4wXCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjVcIixcInVzVmFsdWVcIjpcIjAuM1wifSx7XCJuYW1lXCI6XCJCaWxpcnViaW4sIGRpcmVjdCAoY29uanVnYXRlZClcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuMS0wLjNcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjE3LjEwNFwiLFwic2lSYW5nZVwiOlwiMS43LTUuMVwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCIxLjdcIixcInVzVmFsdWVcIjpcIjAuMVwifSx7XCJuYW1lXCI6XCJDYWxjaXVtLCBpb25pemVkXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI0LjYwLTUuMDhcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjAuMjVcIixcInNpUmFuZ2VcIjpcIjEuMTUtMS4yN1wiLFwic2lVbml0XCI6XCJtbW9sL0xcIixcInNpVmFsdWVcIjpcIjEuMTVcIixcInVzVmFsdWVcIjpcIjQuNlwifSx7XCJuYW1lXCI6XCJDYWxjaXVtLCB0b3RhbFwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiOC4yLTEwLjJcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjAuMjVcIixcInNpUmFuZ2VcIjpcIjIuMDUtMi41NVwiLFwic2lVbml0XCI6XCJtbW9sL0xcIixcInNpVmFsdWVcIjpcIjIuMDVcIixcInVzVmFsdWVcIjpcIjguMlwifSx7XCJuYW1lXCI6XCJDYXJib24gZGlveGlkZSAodG90YWwpXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjIyLTI4XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtRXEvTFwiLFwiZmFjdG9yXCI6XCIxXCIsXCJzaVJhbmdlXCI6XCIyMi0yOFwiLFwic2lVbml0XCI6XCJtbW9sL0xcIixcInNpVmFsdWVcIjpcIjIyLTI4XCIsXCJ1c1ZhbHVlXCI6XCIyMlwifSx7XCJuYW1lXCI6XCJDaGxvcmlkZVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI5Ni0xMDZcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1FcS9MXCIsXCJmYWN0b3JcIjpcIjFcIixcInNpUmFuZ2VcIjpcIjk2LTEwNlwiLFwic2lVbml0XCI6XCJtbW9sL0xcIixcInNpVmFsdWVcIjpcIjExMFwiLFwidXNWYWx1ZVwiOlwiMTEwXCJ9LHtcIm5hbWVcIjpcIkNob2xlc3Rlcm9sICh0b3RhbClcIixcInNwZWNpbWVuXCI6XCJTZXJ1bSwgUGxhc21hXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiPDIwMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvZExcIixcImZhY3RvclwiOlwiMC4wMjU5XCIsXCJzaVJhbmdlXCI6XCI8NS4xOFwiLFwic2lVbml0XCI6XCJtbW9sL0xcIixcInNpVmFsdWVcIjpcIjMuNVwiLFwidXNWYWx1ZVwiOlwiMTM1XCJ9LHtcIm5hbWVcIjpcIkNvcHBlclwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNzAtMTQwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCLCtWcvZExcIixcImZhY3RvclwiOlwiMC4xNTdcIixcInNpUmFuZ2VcIjpcIjQ0ODY2XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjQ0ODY2XCIsXCJ1c1ZhbHVlXCI6XCI3MFwifSx7XCJuYW1lXCI6XCJDb3J0aXNvbFwiLFwic3BlY2ltZW5cIjpcIlNlcnVtLCBQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI1LTI1XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtY2cvZExcIixcImZhY3RvclwiOlwiMjcuNTg4XCIsXCJzaVJhbmdlXCI6XCIxNDAtNjkwXCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMTQwXCIsXCJ1c1ZhbHVlXCI6XCI1XCJ9LHtcIm5hbWVcIjpcIkNyZWF0aW5lIGtpbmFzZSAoQ0spXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI0MC0xNTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIklVL0xcIixcImZhY3RvclwiOlwiMVwiLFwic2lSYW5nZVwiOlwiMC42Ny0yLjVcIixcInNpVW5pdFwiOlwiVS9MXCIsXCJzaVZhbHVlXCI6XCIwLjY3XCIsXCJ1c1ZhbHVlXCI6XCI0MFwifSx7XCJuYW1lXCI6XCJDcmVhdGluaW5lXCIsXCJzcGVjaW1lblwiOlwiU2VydW0sIFBsYXNtYVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjAuNS0xLjJcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjg4LjRcIixcInNpUmFuZ2VcIjpcIjUzLTEwNlwiLFwic2lVbml0XCI6XCLCtW1vbC9MXCIsXCJzaVZhbHVlXCI6XCI0NFwiLFwidXNWYWx1ZVwiOlwiMC41XCJ9LHtcIm5hbWVcIjpcIkZpYnJpbm9nZW5cIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIyMDAtNDAwXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCIwLjAyOTRcIixcInNpUmFuZ2VcIjpcIjUuOC0xMS44XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjUuOFwiLFwidXNWYWx1ZVwiOlwiMjAwXCJ9LHtcIm5hbWVcIjpcIkdsdWNvc2VcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjcwLTExMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWcvZExcIixcImZhY3RvclwiOlwiMC4wNTU1XCIsXCJzaVJhbmdlXCI6XCIzLjktNi4xXCIsXCJzaVVuaXRcIjpcIm1tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMy45XCIsXCJ1c1ZhbHVlXCI6XCI3MFwifSx7XCJuYW1lXCI6XCJJcm9uXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI2MC0xNTBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIsK1Zy9kTFwiLFwiZmFjdG9yXCI6XCIwLjE3OVwiLFwic2lSYW5nZVwiOlwiMTAuNy0yNi45XCIsXCJzaVVuaXRcIjpcIsK1bW9sL0xcIixcInNpVmFsdWVcIjpcIjEwLjdcIixcInVzVmFsdWVcIjpcIjYwXCJ9LHtcIm5hbWVcIjpcIklyb24tYmluZGluZyBjYXBhY2l0eVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMjUwLTQ1MFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiwrVnL2RMXCIsXCJmYWN0b3JcIjpcIjAuMTc5XCIsXCJzaVJhbmdlXCI6XCI0NC44LTgwLjZcIixcInNpVW5pdFwiOlwiwrVtb2wvTFwiLFwic2lWYWx1ZVwiOlwiNDVcIixcInVzVmFsdWVcIjpcIjI1MFwifSx7XCJuYW1lXCI6XCJMaXBhc2VcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjMxLTE4NlwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiSVUvTFwiLFwiZmFjdG9yXCI6XCIxXCIsXCJzaVJhbmdlXCI6XCIwLjUtMy4yXCIsXCJzaVVuaXRcIjpcIlUvTFwiLFwic2lWYWx1ZVwiOlwiMC41XCIsXCJ1c1ZhbHVlXCI6XCIzMVwifSx7XCJuYW1lXCI6XCJQaG9zcGhvcnVzIChpbm9yZ2FuaWMpXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIyLjMtNC43XCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCIwLjMyM1wiLFwic2lSYW5nZVwiOlwiMC43NC0xLjUyXCIsXCJzaVVuaXRcIjpcIm1tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMC43NFwiLFwidXNWYWx1ZVwiOlwiMi4zXCJ9LHtcIm5hbWVcIjpcIlBvdGFzc2l1bVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiMy41LTUuMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibUVxL0xcIixcImZhY3RvclwiOlwiMVwiLFwic2lSYW5nZVwiOlwiMy41LTUuMFwiLFwic2lVbml0XCI6XCJtbW9sL0xcIixcInNpVmFsdWVcIjpcIjMuNVwiLFwidXNWYWx1ZVwiOlwiMy41XCJ9LHtcIm5hbWVcIjpcIlByb3RlaW4gKHRvdGFsKVwiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiNS40LTguMFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiZy9kTFwiLFwiZmFjdG9yXCI6XCIxMFwiLFwic2lSYW5nZVwiOlwiNTQtODBcIixcInNpVW5pdFwiOlwiZy9MXCIsXCJzaVZhbHVlXCI6XCI2MFwiLFwidXNWYWx1ZVwiOlwiNlwifSx7XCJuYW1lXCI6XCJQcm90aHJvbWJpbiB0aW1lIChQVClcIixcInNwZWNpbWVuXCI6XCJQbGFzbWFcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxMC0xM1wiLFwiY29udmVudGlvbmFsVW5pdFwiOlwic1wiLFwic2lSYW5nZVwiOlwiMTAtMTNcIixcImZhY3RvclwiOlwiMVwiLFwic2lWYWx1ZVwiOlwic1wiLFwidXNWYWx1ZVwiOlwiMTBcIn0se1wibmFtZVwiOlwiUGFydGlhbCB0aHJvbWJvcGxhc3RpbiB0aW1lIChQVFQpXCIsXCJzcGVjaW1lblwiOlwiV2hvbGUgYmxvb2RcIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIyNS00MFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwic1wiLFwiZmFjdG9yXCI6XCIxXCIsXCJzaVJhbmdlXCI6XCIyNS00MFwiLFwic2lVbml0XCI6XCJzXCIsXCJzaVZhbHVlXCI6XCIyNVwiLFwidXNWYWx1ZVwiOlwiMjVcIn0se1wibmFtZVwiOlwiU29kaXVtXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIxMzYtMTQyXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtRXEvTFwiLFwiZmFjdG9yXCI6XCIxXCIsXCJzaVJhbmdlXCI6XCIxMzYtMTQyXCIsXCJzaVVuaXRcIjpcIm1tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMTM2XCIsXCJ1c1ZhbHVlXCI6XCIxMzZcIn0se1wibmFtZVwiOlwiVHJpZ2x5Y2VyaWRlc1wiLFwic3BlY2ltZW5cIjpcIlNlcnVtXCIsXCJjb252ZW50aW9uYWxSYW5nZVwiOlwiPDE2MFwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWNnL2RMXCIsXCJmYWN0b3JcIjpcIjAuMDExM1wiLFwic2lSYW5nZVwiOlwiMS44XCIsXCJzaVVuaXRcIjpcIm1tb2wvTFwiLFwic2lWYWx1ZVwiOlwiMS44XCIsXCJ1c1ZhbHVlXCI6XCIxNDBcIn0se1wibmFtZVwiOlwiVHJpaW9kb3RoeXJvbmluZSwgdG90YWwgKFQ8c3ViPjM8L3N1Yj4pXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI2MC0xODBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1jZy9kTFwiLFwiZmFjdG9yXCI6XCIxNS42XCIsXCJzaVJhbmdlXCI6XCIwLjkyLTIuNzZcIixcInNpVW5pdFwiOlwibm1vbC9MXCIsXCJzaVZhbHVlXCI6XCIwLjkyXCIsXCJ1c1ZhbHVlXCI6XCI2MFwifSx7XCJuYW1lXCI6XCJUaHlyb3hpbmUsIGZyZWUgKEZUIDxzdWI+NDwvc3ViPiApXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCIwLjktMi4zXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJuZy9kTFwiLFwiZmFjdG9yXCI6XCIxMi44NzFcIixcInNpUmFuZ2VcIjpcIjEyLTMwXCIsXCJzaVVuaXRcIjpcInBtb2wvTFwiLFwic2lWYWx1ZVwiOlwiMTJcIixcInVzVmFsdWVcIjpcIjAuOVwifSx7XCJuYW1lXCI6XCJUaHlyb3hpbmUsIHRvdGFsIChUIDxzdWI+NDwvc3ViPiApXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI1LjUtMTIuNVwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwibWNnL2RMXCIsXCJmYWN0b3JcIjpcIjEyLjg3MVwiLFwic2lSYW5nZVwiOlwiNzEtMTYwXCIsXCJzaVVuaXRcIjpcIm5tb2wvTFwiLFwic2lWYWx1ZVwiOlwiNzFcIixcInVzVmFsdWVcIjpcIjUuNVwifSx7XCJuYW1lXCI6XCJVcmVhIG5pdHJvZ2VuXCIsXCJzcGVjaW1lblwiOlwiU2VydW1cIixcImNvbnZlbnRpb25hbFJhbmdlXCI6XCI4LTIzXCIsXCJjb252ZW50aW9uYWxVbml0XCI6XCJtZy9kTFwiLFwiZmFjdG9yXCI6XCIwLjM1N1wiLFwic2lSYW5nZVwiOlwiMi45LTguMlwiLFwic2lVbml0XCI6XCJtbW9sL0xcIixcInNpVmFsdWVcIjpcIjIuOVwiLFwidXNWYWx1ZVwiOlwiOFwifSx7XCJuYW1lXCI6XCJVcmljIGFjaWRcIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIjQuMC04LjBcIixcImNvbnZlbnRpb25hbFVuaXRcIjpcIm1nL2RMXCIsXCJmYWN0b3JcIjpcIjAuMDU5NVwiLFwic2lSYW5nZVwiOlwiMjQwLTQ4MFwiLFwic2lVbml0XCI6XCJtbW9sL0xcIixcInNpVmFsdWVcIjpcIjI0MFwiLFwidXNWYWx1ZVwiOlwiNFwifSx7XCJuYW1lXCI6XCJVcmluZSBwcm90ZWluL2NyZWF0aW5pbmUgcmF0aW9cIixcInNwZWNpbWVuXCI6XCJTZXJ1bVwiLFwiY29udmVudGlvbmFsUmFuZ2VcIjpcIlwiLFwiY29udmVudGlvbmFsVW5pdFwiOlwiZy9nXCIsXCJmYWN0b3JcIjpcIjAuMTEzXCIsXCJzaVJhbmdlXCI6XCJcIixcInNpVW5pdFwiOlwiZy9tbWxcIixcInNpVmFsdWVcIjpcIlwiLFwidXNWYWx1ZVwiOlwiXCJ9XTtcbiAgXG4gICBcdGxldCBwcmVmaXggPSAnJztcblx0bGV0IGkgPSAwO1xuICBsZXQgY3VycmVudCA9ICd2ZXRlcmluYXJ5JztcbiAgXG4gIGZ1bmN0aW9uIHNldEJvdGhGcm9tU0kodmFsdWUsIGkpIHtcbiAgICBjb25zdCB7ZmFjdG9yLCBzaVZhbHVlfSA9IHVuaXRzW2ldO1xuICAgIHVuaXRzW2ldLnNpVmFsdWUgPSArdmFsdWU7XG4gICAgdW5pdHNbaV0udXNWYWx1ZSA9ICsodmFsdWUgLyBmYWN0b3IpLnRvRml4ZWQoMik7XG4gIH1cbiAgZnVuY3Rpb24gc2V0Qm90aEZyb21VUyh2YWx1ZSwgaSkge1xuICAgIGNvbnN0IHtmYWN0b3IsIHVzVmFsdWV9ID0gdW5pdHNbaV07XG4gICAgdW5pdHNbaV0udXNWYWx1ZSA9ICt2YWx1ZTtcbiAgICB1bml0c1tpXS5zaVZhbHVlID0gKyh2YWx1ZSAqIGZhY3RvcikudG9GaXhlZCgyKTs7XG4gIH1cblxuXG5cblx0JDogZmlsdGVyZWRVbml0cyA9IHByZWZpeFxuXHRcdD8gdW5pdHMuZmlsdGVyKHVuaXQgPT4ge1xuXHRcdFx0Y29uc3QgbmFtZXMgPSBgJHt1bml0Lm5hbWV9YDtcblx0XHRcdHJldHVybiBuYW1lcy50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgocHJlZml4LnRvTG93ZXJDYXNlKCkpO1xuICAgICAgXG5cdFx0fSlcblx0XHQ6IHVuaXRzO1xuJDogc2VsZWN0ZWQgPSBmaWx0ZXJlZFVuaXRzW2ldO1xuXG5pbXBvcnQgRmEgZnJvbSAnc3ZlbHRlLWZhJztcbmltcG9ydCB7IGZhRmxhZ1VzYSwgZmFHbG9iZSwgZmFBcnJvd3NBbHRILCBmYVZpYWwsIGZhQ2FsY3VsYXRvciB9IGZyb20gJ0Bmb3J0YXdlc29tZS9wcm8tZHVvdG9uZS1zdmctaWNvbnMnO1xuPC9zY3JpcHQ+XG5cblxuXG5cblxuXG5cblxuXG4gIDxkaXYgY2xhc3M9XCJteC1hdXRvICBweC0xXCI+XG5cbiAgXG5cblxuIDxkaXYgY2xhc3M9XCJtZDp3LTEvNCBtYi0zIHNtOnctMS8zIHRleHQtYmxhY2sgcC0xXCI+U2VhcmNoIFVuaXRzIDxpbnB1dCBwbGFjZWhvbGRlcj1cIlVuaXRcIiBjbGFzcz1cIm10LTEgYmxvY2sgdy1mdWxsICB0ZXh0LWdyYXktNzAwIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyBweS0yIHB4LTIgbGVhZGluZy10aWdodCBiZy13aGl0ZSAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJnLXdoaXRlIGZvY3VzOmJvcmRlci1ncmF5LTUwMFwiIHR5cGU9XCJzZWFyY2hcIiBiaW5kOnZhbHVlPXtwcmVmaXh9PjwvZGl2PlxuXG5cbiAgeyNlYWNoIGZpbHRlcmVkVW5pdHMgYXMgdW5pdCwgaX1cbiA8ZGl2IGNsYXNzPVwiYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkIG1iLTJcIj5cblxuXG4gPGRpdiBjbGFzcz1cImZsZXggZmxleC13cmFwIG1kOmZsZXgtbm8td3JhcCBsZzpmbGV4LW5vLXdyYXAgcHgtMSAgbWItMVwiPlxuIDxkaXYgY2xhc3M9XCJ3LWZ1bGwgbWQ6dy0yLzVcIiA+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb250LWJvbGQgdGV4dC1ibGFjayB0ZXh0LXhsXCI+e3VuaXQubmFtZX08L2Rpdj5cbiAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5saW5lIHRleHQtZ3JheS03MDAgdGV4dC14c1wiPjwhLS0gPEZhIGNsYXNzPVwiaW5saW5lXCIgIHNlY29uZGFyeUNvbG9yPVwicmVkXCIgIGljb249e2ZhVmlhbH0vPiAtLT4gPHN0cm9uZz5TcGVjaW1lbjogPC9zdHJvbmc+IHt1bml0LnNwZWNpbWVufSA8L2Rpdj5cbiAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmxpbmUgdGV4dC1ncmF5LTcwMCB0ZXh0LXhzIG1sLTNcIj48IS0tIDxGYSBjbGFzcz1cImlubGluZVwiICBpY29uPXtmYUNhbGN1bGF0b3J9Lz4gLS0+IDxzdHJvbmc+Q29udmVyc2lvbiBGYWN0b3I6PC9zdHJvbmc+ICB7dW5pdC5mYWN0b3J9IDwvZGl2PlxuICAgICAgICAgICAgXG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwibWQ6dy0xLzMgdy0xLzIgICBoLTE0IHByLTEgcGwtMVwiPlxuICA8bGFiZWwgY2xhc3M9XCJibG9jayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZSB0ZXh0LWdyYXktNzAwIHRleHQteHMgZm9udC1ib2xkIG1iLTFcIiBmb3I9XCJncmlkLWZpcnN0LW5hbWVcIj5cbiAgICAgICA8RmEgY2xhc3M9XCJpbmxpbmVcIiBzaXplPVwibGdcIiBwcmltYXJ5Q29sb3I9XCJibHVlXCIgc2Vjb25kYXJ5Q29sb3I9XCJyZWRcIiBpY29uPXtmYUZsYWdVc2F9Lz4gVVMgVW5pdFxuICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImFwcGVhcmFuY2Utbm9uZSBtdC0xIGJsb2NrIHctZnVsbCBiZy1ncmF5LTEwMCB0ZXh0LWdyYXktNzAwIGJvcmRlciBib3JkZXItYmx1ZS0yMDAgcm91bmRlZCBweS0yIHB4LTIgbGVhZGluZy10aWdodCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ymctd2hpdGUgZm9jdXM6Ym9yZGVyLWdyYXktNTAwXCIgdmFsdWU9e3VuaXQudXNWYWx1ZX0gb246aW5wdXQ9XCJ7ZSA9PiBzZXRCb3RoRnJvbVVTKGUudGFyZ2V0LnZhbHVlLCBpKX1cIiAgdHlwZT1udW1iZXIgcGxhY2Vob2xkZXI9XCIgVVNcIj5cbjxkaXYgY2xhc3M9XCJ0ZXh0LWdyYXktNzAwIHRleHQtc21cIj5VUyBSYW5nZTp7dW5pdC5jb252ZW50aW9uYWxSYW5nZX0ge3VuaXQuY29udmVudGlvbmFsVW5pdH08L2Rpdj5cbiAgICAgICAgICAgICA8L2Rpdj5cblxuIDxkaXYgY2xhc3M9XCJtZDp3LTEvMyB3LTEvMiAgaC0xNCBwci0xIHBsLTFcIj5cbiA8bGFiZWwgY2xhc3M9XCJibG9jayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZSB0ZXh0LWdyYXktNzAwIHRleHQteHMgZm9udC1ib2xkIG1iLTFcIiBmb3I9XCJncmlkLWZpcnN0LW5hbWVcIj5cbiAgICAgICAgPEZhIGNsYXNzPVwiaW5saW5lXCIgc2l6ZT1cImxnXCIgcHJpbWFyeUNvbG9yPVwiZ3JlZW5cIiBzZWNvbmRhcnlDb2xvcj1cImxpZ2h0Ymx1ZVwiIGljb249e2ZhR2xvYmV9Lz4gU0kgVW5pdFxuICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImFwcGVhcmFuY2Utbm9uZSBtdC0xIGJsb2NrIHctZnVsbCBiZy1ncmF5LTEwMCB0ZXh0LWdyYXktNzAwIGJvcmRlciBib3JkZXItZ3JheS0yMDAgcm91bmRlZCBweS0yIHB4LTIgbGVhZGluZy10aWdodCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ymctd2hpdGUgZm9jdXM6Ym9yZGVyLWdyYXktNTAwXCIgdmFsdWU9e3VuaXQuc2lWYWx1ZX0gb246aW5wdXQ9XCJ7ZSA9PiBzZXRCb3RoRnJvbVNJKGUudGFyZ2V0LnZhbHVlLCBpKX1cIiB0eXBlPW51bWJlciBwbGFjZWhvbGRlcj1cIlNJXCI+XG48ZGl2IGNsYXNzPVwidGV4dC1ncmF5LTcwMCB0ZXh0LXNtXCI+U0kgUmFuZ2U6IHt1bml0LnNpUmFuZ2V9IHt1bml0LnNpVW5pdH0gPC9kaXY+XG4gICAgICAgICAgICAgPC9kaXY+XG5cbiBcbiBcbiBcbiA8L2Rpdj4gXG48L2Rpdj5cbnsvZWFjaH1cbiAgXG4gICBcbiAgIFxuICAgXG5cbiAgICBcblxuICBcbiAgIDwvZGl2PlxuPGZvb3RlciBjbGFzcz0ndy1mdWxsIHRleHQtY2VudGVyIGJvcmRlci10IGJvcmRlci1ncmV5IHAtNCBwaW4tYic+XG4gICAgICAgICAgICB3d3cubWVkaWNhbHVuaXRjb252ZXJ0ZXIuY29tXG4gICAgICAgIDwvZm9vdGVyPiIsIjxzY3JpcHQ+XG4gIGV4cG9ydCBsZXQgc2VnbWVudDtcbiAgXG4gIGltcG9ydCBGYSBmcm9tICdzdmVsdGUtZmEnO1xuaW1wb3J0IHsgZmFGbGFnVXNhLCBmYUdsb2JlLCBmYUFycm93c0FsdEgsIGZhQmFsYW5jZVNjYWxlLCBmYUluZm9DaXJjbGUsIGZhUGFwZXJQbGFuZSwgZmFDYWxjdWxhdG9yLCBmYVBlbmNpbFJ1bGVyLCBmYURvZywgZmFVc2VyTWQsIGZhVmlhbH0gZnJvbSAnQGZvcnRhd2Vzb21lL3Byby1kdW90b25lLXN2Zy1pY29ucyc7XG4gIGxldCBjdXJyZW50ID0gJ0h1bWFuJztcbiAgXG48L3NjcmlwdD5cbjxzdHlsZT4udGV4dFNoYWRvd3t0ZXh0LXNoYWRvdzowIDJweCAycHggcmdiYSgwLCAwLCAwLCAwLjMpfVxuLnRleHRTaGFkb3cye3RleHQtc2hhZG93OjAgMnB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMyl9XG48L3N0eWxlPlxuXG5cbiAgIFxuXG5cblxuPG5hdiBjbGFzcz1cInctZnVsbFwiPlxuIDwhLS0gIDxkaXYgY2xhc3M9XCJ3LWZ1bGwgbXgtYXV0byByb3VuZGVkLXQgc2hhZG93IGJnLWNvdmVyIGJnLWJvdHRvbSBiZy1uby1yZXBlYXQgaC0yOFwiIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKHN0YXRpYy9iZzQuanBnKVwiPiAtLT5cbiAgPGRpdiBjbGFzcz1cInctZnVsbCBteC1hdXRvIHJvdW5kZWQtdCBzaGFkb3cgYmctdGVhbC01MDAgaC0yOFwiPlxuIFx0PCEtLSBUZXh0IHNoYWRvdyB1dGlsaXRpZXMgd2lsbCBiZSBjb29sIC0tPlxuICAgPGRpdiBjbGFzcz1cIm14LWF1dG8gcHktMiB0ZXh0LWNlbnRlclwiPlxuICAgIDxoMSBjbGFzcz1cImZvbnQtc2FucyB0ZXh0LXhsIG1kOnRleHQtMnhsIHRleHRTaGFkb3cgdGV4dC13aGl0ZVwiPjxGYSBjbGFzcz1cImlubGluZSB0ZXh0LWdyYXktNjAwXCIgIHByaW1hcnlDb2xvcj1cImdyYXlcIiBzZWNvbmRhcnlDb2xvcj1cIndoaXRlXCIgIHNpemU9XCJsZ1wiIGljb249e2ZhQ2FsY3VsYXRvcn0vPiAgTWVkaWNhbCBVbml0IENvbnZlcnRlcjwvaDE+XG4gICAgICA8IS0tIDxoMiBjbGFzcz1cImZvbnQtc2FucyAgdGV4dC1sZyB0ZXh0U2hhZG93IHRleHQtd2hpdGVcIj4gPEZhIGNsYXNzPVwiaW5saW5lIHRleHRTaGFkb3dcIiBzaXplPVwibGdcIiBzZWNvbmRhcnlDb2xvcj1cInJlZFwiICBpY29uPXtmYVZpYWx9Lz4gVVMgVW5pdHMgIDxGYSBjbGFzcz1cImlubGluZSB0ZXh0LWdyYXktNzAwXCIgc2l6ZT1cImxnXCIgaWNvbj17ZmFBcnJvd3NBbHRIfS8+IFNJIFVuaXRzIDxGYSBjbGFzcz1cImlubGluZVwiIHNpemU9XCJsZ1wiICBzZWNvbmRhcnlDb2xvcj1cInJlZFwiICBpY29uPXtmYVZpYWx9Lz48L2gyPiAtLT5cbiAgICA8aDMgY2xhc3M9XCJ0cmFja2luZy13aWRlIG1iLTEgdGV4dFNoYWRvdyB0ZXh0LXdoaXRlXCI+RWFzaWx5IENvbnZlcnQgTWVkaWNhbCBhbmQgTWV0cmljIFZhbHVlczwvaDM+XG4gICAgICA8ZGl2IGNsYXNzPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB5LTFcIj5cbiAgICAgICAgXG5cblxuPHNwYW4gY2xhc3M9XCJyZWxhdGl2ZSB6LTAgaW5saW5lLWZsZXggc2hhZG93LXNtXCI+XG4gIDxhIGhyZWY9XCJhYm91dFwiIGNsYXNzPSdyZWxhdGl2ZSBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgcHgtMiBweS0xIHJvdW5kZWQtbC1tZCBib3JkZXIgYm9yZGVyLWdyYXktMzAwIGJnLXdoaXRlIHRleHQtc20gbGVhZGluZy01IGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgaG92ZXI6dGV4dC1ncmF5LTUwMCBmb2N1czp6LTEwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItYmx1ZS0zMDAgZm9jdXM6c2hhZG93LW91dGxpbmUtYmx1ZSBhY3RpdmU6YmctdGVhbC0zMDAgYWN0aXZlOnRleHQtZ3JheS03MDAgdHJhbnNpdGlvbiBlYXNlLWluLW91dCBkdXJhdGlvbi0xNTAge3NlZ21lbnQgPT09IFwiYWJvdXRcIiA/IFwiYmctdGVhbC0zMDBcIiA6IFwiXCJ9Jz5cbiAgIDxGYSBjbGFzcz1cImlubGluZS1mbGV4ICAgcHItMVwiIHNpemU9XCJsZ1wiIGljb249e2ZhSW5mb0NpcmNsZX0vPiBBYm91dFxuICA8L2E+XG4gIDxhIGhyZWY9XCJsZWdhbFwiIGNsYXNzPSctbWwtcHggcmVsYXRpdmUgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIHB4LTIgcHktMSBib3JkZXIgYm9yZGVyLWdyYXktMzAwIGJnLXdoaXRlIHRleHQtc20gbGVhZGluZy01IGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgaG92ZXI6dGV4dC1ncmF5LTUwMCBmb2N1czp6LTEwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItYmx1ZS0zMDAgZm9jdXM6c2hhZG93LW91dGxpbmUtYmx1ZSBhY3RpdmU6YmctdGVhbC0zMDAgYWN0aXZlOnRleHQtZ3JheS03MDAgdHJhbnNpdGlvbiBlYXNlLWluLW91dCBkdXJhdGlvbi0xNTAge3NlZ21lbnQgPT09IFwibGVnYWxcIiA/IFwiYmctdGVhbC0zMDBcIiA6IFwiXCJ9Jz5cbiAgICA8RmEgY2xhc3M9XCJpbmxpbmUgcHItMVwiIHNpemU9XCJsZ1wiIGljb249e2ZhQmFsYW5jZVNjYWxlfS8+IExlZ2FsXG4gIDwvYT5cbiAgPGEgaHJlZj1cIm1haWx0bzppbmZvQHZldGNhbGN1bGF0b3JzLmNvbVwiIGNsYXNzPSctbWwtcHggcmVsYXRpdmUgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIHB4LTIgcHktMSByb3VuZGVkLXItbWQgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCBiZy13aGl0ZSB0ZXh0LXNtIGxlYWRpbmctNSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIGhvdmVyOnRleHQtZ3JheS01MDAgZm9jdXM6ei0xMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLWJsdWUtMzAwIGZvY3VzOnNoYWRvdy1vdXRsaW5lLWJsdWUgYWN0aXZlOmJnLXRlYWwtMzAwIGFjdGl2ZTp0ZXh0LWdyYXktNzAwIHRyYW5zaXRpb24gZWFzZS1pbi1vdXQgZHVyYXRpb24tMTUwIHtzZWdtZW50ID09PSBcImNvbnRhY3RcIiA/IFwiYmctdGVhbC0zMDBcIiA6IFwiXCJ9Jz5cbjxGYSBjbGFzcz1cImlubGluZSBwci0xXCIgc2l6ZT1cImxnXCIgaWNvbj17ZmFQYXBlclBsYW5lfS8+IENvbnRhY3RcbiAgPC9hPlxuICA8YSBocmVmPVwicHJpdmFjeVwiIGNsYXNzPSctbWwtcHggcmVsYXRpdmUgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIHB4LTIgcHktMSByb3VuZGVkLXItbWQgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCBiZy13aGl0ZSB0ZXh0LXNtIGxlYWRpbmctNSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIGhvdmVyOnRleHQtZ3JheS01MDAgZm9jdXM6ei0xMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLWJsdWUtMzAwIGZvY3VzOnNoYWRvdy1vdXRsaW5lLWJsdWUgYWN0aXZlOmJnLXRlYWwtMzAwIGFjdGl2ZTp0ZXh0LWdyYXktNzAwIHRyYW5zaXRpb24gZWFzZS1pbi1vdXQgZHVyYXRpb24tMTUwIHtzZWdtZW50ID09PSBcInByaXZhY3lcIiA/IFwiYmctdGVhbC0zMDBcIiA6IFwiXCJ9Jz5cbjxGYSBjbGFzcz1cImlubGluZSBwci0xXCIgc2l6ZT1cImxnXCIgaWNvbj17ZmFJbmZvQ2lyY2xlfS8+IFByaXZhY3lcbiAgPC9hPlxuPC9zcGFuPlxuXG5cbiAgICAgICAgXG4gICAgICA8L2Rpdj5cbiAgICAgIFxuICAgIFxuICAgICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cInRleHQtY2VudGVyIHRleHQtd2hpdGUgcGItMVwiPlxuICAgIFxuICAgICAgXG4gIFxuICAgIDwvZGl2PlxuICAgXG4gIDwvZGl2PlxuICBcbjwvbmF2PlxuPHVsIGNsYXNzPVwiZmxleFwiPlxuICA8bGkgY2xhc3M9XCJmbGV4LTEgbXItMSBtbC0xXCI+XG4gICAgPGEgY2xhc3M9J3RleHQtY2VudGVyIGJsb2NrIGJvcmRlciBib3JkZXItd2hpdGUgcm91bmRlZCBiZy1ncmF5LTYwMCBob3ZlcjpiZy10ZWFsLTUwMCAgIHB5LTEgcHgtMSB0ZXh0LXdoaXRlJyBjbGFzczpiZy10ZWFsLTUwMD1cIntjdXJyZW50ID09PSAnSHVtYW4nfVwiXHRvbjpjbGljaz1cInsoKSA9PiBjdXJyZW50ID0gJ0h1bWFuJ31cIiBocmVmPVwiLlwiPjxGYSBjbGFzcz1cImlubGluZS1mbGV4ICB0ZXh0LXdoaXRlIHByLTFcIiBzaXplPVwiMnhcIiBzZWNvbmRhcnlDb2xvcj1cIndoaXRlXCIgIHByaW1hcnlDb2xvcj1cImdyZWVuXCIgaWNvbj17ZmFVc2VyTWR9Lz4gIEh1bWFuPC9hPlxuICA8L2xpPlxuICA8bGkgY2xhc3M9XCJmbGV4LTEgbXItMVwiPlxuICAgIDxhIGNsYXNzPSd0ZXh0LWNlbnRlciBibG9jayBib3JkZXIgYm9yZGVyLXdoaXRlIHJvdW5kZWQgYmctZ3JheS02MDAgaG92ZXI6YmctdGVhbC01MDAgIHB5LTEgcHgtMSAgdGV4dC13aGl0ZScgY2xhc3M6YmctdGVhbC01MDA9XCJ7Y3VycmVudCA9PT0gJ1ZldGVyaW5hcnknfVwiXHRvbjpjbGljaz1cInsoKSA9PiBjdXJyZW50ID0gJ1ZldGVyaW5hcnknfVwiIGhyZWY9XCJ2ZXRcIj48RmEgY2xhc3M9XCJpbmxpbmUtZmxleCAgdGV4dC13aGl0ZSBwci0xXCIgc2l6ZT1cIjJ4XCIgcHJpbWFyeUNvbG9yPVwiYmxhY2tcIiBpY29uPXtmYURvZ30vPiAgVmV0ZXJpbmFyeTwvYT5cbiAgPC9saT5cbiAgPGxpIGNsYXNzPVwiZmxleC0xIG1yLTFcIj5cbiAgICA8YSBjbGFzcz0ndGV4dC1jZW50ZXIgYmxvY2sgYm9yZGVyIGJvcmRlci13aGl0ZSByb3VuZGVkICBiZy1ncmF5LTYwMCBob3ZlcjpiZy10ZWFsLTUwMCAgcHktMSBweC0xICB0ZXh0LXdoaXRlJyBjbGFzczpiZy10ZWFsLTUwMD1cIntjdXJyZW50ID09PSAnTWV0cmljIFVuaXRzJ31cIlx0b246Y2xpY2s9XCJ7KCkgPT4gY3VycmVudCA9ICdNZXRyaWMgVW5pdHMnfVwiIGhyZWY9XCJtZXRyaWNcIj48RmEgY2xhc3M9XCJpbmxpbmUtZmxleCAgdGV4dC13aGl0ZSBwci0xXCIgc2l6ZT1cIjJ4XCIgcHJpbWFyeUNvbG9yPVwib3JhbmdlXCIgaWNvbj17ZmFQZW5jaWxSdWxlcn0vPiAgTWV0cmljPC9hPlxuICA8L2xpPlxuPC91bD5cblxuXG5cbiIsIjxzY3JpcHQ+XG5cdGltcG9ydCBOYXYgZnJvbSAnLi4vY29tcG9uZW50cy9OYXYuc3ZlbHRlJztcblxuXHRleHBvcnQgbGV0IHNlZ21lbnQ7XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXHRtYWluIHtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0bWF4LXdpZHRoOiA2MGVtO1xuXHRcdGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuXHRcdHBhZGRpbmc6IDAuNWVtO1xuXHRcdG1hcmdpbjogMCBhdXRvO1xuXHRcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdH1cbjwvc3R5bGU+XG5cbjxOYXYge3NlZ21lbnR9Lz5cblxuPG1haW4+XG5cdDxzbG90Pjwvc2xvdD5cbjwvbWFpbj4iLCI8c2NyaXB0PlxuXHRleHBvcnQgbGV0IHN0YXR1cztcblx0ZXhwb3J0IGxldCBlcnJvcjtcblxuXHRjb25zdCBkZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jztcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cdGgxLCBwIHtcblx0XHRtYXJnaW46IDAgYXV0bztcblx0fVxuXG5cdGgxIHtcblx0XHRmb250LXNpemU6IDIuOGVtO1xuXHRcdGZvbnQtd2VpZ2h0OiA3MDA7XG5cdFx0bWFyZ2luOiAwIDAgMC41ZW0gMDtcblx0fVxuXG5cdHAge1xuXHRcdG1hcmdpbjogMWVtIGF1dG87XG5cdH1cblxuXHRAbWVkaWEgKG1pbi13aWR0aDogNDgwcHgpIHtcblx0XHRoMSB7XG5cdFx0XHRmb250LXNpemU6IDRlbTtcblx0XHR9XG5cdH1cbjwvc3R5bGU+XG5cbjxzdmVsdGU6aGVhZD5cblx0PHRpdGxlPntzdGF0dXN9PC90aXRsZT5cbjwvc3ZlbHRlOmhlYWQ+XG5cbjxoMT57c3RhdHVzfTwvaDE+XG5cbjxwPntlcnJvci5tZXNzYWdlfTwvcD5cblxueyNpZiBkZXYgJiYgZXJyb3Iuc3RhY2t9XG5cdDxwcmU+e2Vycm9yLnN0YWNrfTwvcHJlPlxuey9pZn1cbiIsIi8vIFRoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgU2FwcGVyIOKAlCBkbyBub3QgZWRpdCBpdCFcbmltcG9ydCAqIGFzIHJvdXRlXzAgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9ibG9nL2luZGV4Lmpzb24uanNcIjtcbmltcG9ydCAqIGFzIHJvdXRlXzEgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9ibG9nL1tzbHVnXS5qc29uLmpzXCI7XG5pbXBvcnQgY29tcG9uZW50XzAgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9pbmRleC5zdmVsdGVcIjtcbmltcG9ydCBjb21wb25lbnRfMSBmcm9tIFwiLi4vLi4vLi4vcm91dGVzL2NvbnRhY3Quc3ZlbHRlXCI7XG5pbXBvcnQgY29tcG9uZW50XzIgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9wcml2YWN5LnN2ZWx0ZVwiO1xuaW1wb3J0IGNvbXBvbmVudF8zIGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvbWV0cmljLnN2ZWx0ZVwiO1xuaW1wb3J0IGNvbXBvbmVudF80IGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvYWJvdXQuc3ZlbHRlXCI7XG5pbXBvcnQgY29tcG9uZW50XzUgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9sZWdhbC5zdmVsdGVcIjtcbmltcG9ydCBjb21wb25lbnRfNiwgeyBwcmVsb2FkIGFzIHByZWxvYWRfNiB9IGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvYmxvZy9pbmRleC5zdmVsdGVcIjtcbmltcG9ydCBjb21wb25lbnRfNywgeyBwcmVsb2FkIGFzIHByZWxvYWRfNyB9IGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvYmxvZy9bc2x1Z10uc3ZlbHRlXCI7XG5pbXBvcnQgY29tcG9uZW50XzggZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy92ZXQuc3ZlbHRlXCI7XG5pbXBvcnQgcm9vdCBmcm9tIFwiLi4vLi4vLi4vcm91dGVzL19sYXlvdXQuc3ZlbHRlXCI7XG5pbXBvcnQgZXJyb3IgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9fZXJyb3Iuc3ZlbHRlXCI7XG5cbmNvbnN0IGQgPSBkZWNvZGVVUklDb21wb25lbnQ7XG5cbmV4cG9ydCBjb25zdCBtYW5pZmVzdCA9IHtcblx0c2VydmVyX3JvdXRlczogW1xuXHRcdHtcblx0XHRcdC8vIGJsb2cvaW5kZXguanNvbi5qc1xuXHRcdFx0cGF0dGVybjogL15cXC9ibG9nXFwuanNvbiQvLFxuXHRcdFx0aGFuZGxlcnM6IHJvdXRlXzAsXG5cdFx0XHRwYXJhbXM6ICgpID0+ICh7fSlcblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0Ly8gYmxvZy9bc2x1Z10uanNvbi5qc1xuXHRcdFx0cGF0dGVybjogL15cXC9ibG9nXFwvKFteXFwvXSs/KVxcLmpzb24kLyxcblx0XHRcdGhhbmRsZXJzOiByb3V0ZV8xLFxuXHRcdFx0cGFyYW1zOiBtYXRjaCA9PiAoeyBzbHVnOiBkKG1hdGNoWzFdKSB9KVxuXHRcdH1cblx0XSxcblxuXHRwYWdlczogW1xuXHRcdHtcblx0XHRcdC8vIGluZGV4LnN2ZWx0ZVxuXHRcdFx0cGF0dGVybjogL15cXC8kLyxcblx0XHRcdHBhcnRzOiBbXG5cdFx0XHRcdHsgbmFtZTogXCJpbmRleFwiLCBmaWxlOiBcImluZGV4LnN2ZWx0ZVwiLCBjb21wb25lbnQ6IGNvbXBvbmVudF8wIH1cblx0XHRcdF1cblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0Ly8gY29udGFjdC5zdmVsdGVcblx0XHRcdHBhdHRlcm46IC9eXFwvY29udGFjdFxcLz8kLyxcblx0XHRcdHBhcnRzOiBbXG5cdFx0XHRcdHsgbmFtZTogXCJjb250YWN0XCIsIGZpbGU6IFwiY29udGFjdC5zdmVsdGVcIiwgY29tcG9uZW50OiBjb21wb25lbnRfMSB9XG5cdFx0XHRdXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdC8vIHByaXZhY3kuc3ZlbHRlXG5cdFx0XHRwYXR0ZXJuOiAvXlxcL3ByaXZhY3lcXC8/JC8sXG5cdFx0XHRwYXJ0czogW1xuXHRcdFx0XHR7IG5hbWU6IFwicHJpdmFjeVwiLCBmaWxlOiBcInByaXZhY3kuc3ZlbHRlXCIsIGNvbXBvbmVudDogY29tcG9uZW50XzIgfVxuXHRcdFx0XVxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHQvLyBtZXRyaWMuc3ZlbHRlXG5cdFx0XHRwYXR0ZXJuOiAvXlxcL21ldHJpY1xcLz8kLyxcblx0XHRcdHBhcnRzOiBbXG5cdFx0XHRcdHsgbmFtZTogXCJtZXRyaWNcIiwgZmlsZTogXCJtZXRyaWMuc3ZlbHRlXCIsIGNvbXBvbmVudDogY29tcG9uZW50XzMgfVxuXHRcdFx0XVxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHQvLyBhYm91dC5zdmVsdGVcblx0XHRcdHBhdHRlcm46IC9eXFwvYWJvdXRcXC8/JC8sXG5cdFx0XHRwYXJ0czogW1xuXHRcdFx0XHR7IG5hbWU6IFwiYWJvdXRcIiwgZmlsZTogXCJhYm91dC5zdmVsdGVcIiwgY29tcG9uZW50OiBjb21wb25lbnRfNCB9XG5cdFx0XHRdXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdC8vIGxlZ2FsLnN2ZWx0ZVxuXHRcdFx0cGF0dGVybjogL15cXC9sZWdhbFxcLz8kLyxcblx0XHRcdHBhcnRzOiBbXG5cdFx0XHRcdHsgbmFtZTogXCJsZWdhbFwiLCBmaWxlOiBcImxlZ2FsLnN2ZWx0ZVwiLCBjb21wb25lbnQ6IGNvbXBvbmVudF81IH1cblx0XHRcdF1cblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0Ly8gYmxvZy9pbmRleC5zdmVsdGVcblx0XHRcdHBhdHRlcm46IC9eXFwvYmxvZ1xcLz8kLyxcblx0XHRcdHBhcnRzOiBbXG5cdFx0XHRcdHsgbmFtZTogXCJibG9nXCIsIGZpbGU6IFwiYmxvZy9pbmRleC5zdmVsdGVcIiwgY29tcG9uZW50OiBjb21wb25lbnRfNiwgcHJlbG9hZDogcHJlbG9hZF82IH1cblx0XHRcdF1cblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0Ly8gYmxvZy9bc2x1Z10uc3ZlbHRlXG5cdFx0XHRwYXR0ZXJuOiAvXlxcL2Jsb2dcXC8oW15cXC9dKz8pXFwvPyQvLFxuXHRcdFx0cGFydHM6IFtcblx0XHRcdFx0bnVsbCxcblx0XHRcdFx0eyBuYW1lOiBcImJsb2dfJHNsdWdcIiwgZmlsZTogXCJibG9nL1tzbHVnXS5zdmVsdGVcIiwgY29tcG9uZW50OiBjb21wb25lbnRfNywgcHJlbG9hZDogcHJlbG9hZF83LCBwYXJhbXM6IG1hdGNoID0+ICh7IHNsdWc6IGQobWF0Y2hbMV0pIH0pIH1cblx0XHRcdF1cblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0Ly8gdmV0LnN2ZWx0ZVxuXHRcdFx0cGF0dGVybjogL15cXC92ZXRcXC8/JC8sXG5cdFx0XHRwYXJ0czogW1xuXHRcdFx0XHR7IG5hbWU6IFwidmV0XCIsIGZpbGU6IFwidmV0LnN2ZWx0ZVwiLCBjb21wb25lbnQ6IGNvbXBvbmVudF84IH1cblx0XHRcdF1cblx0XHR9XG5cdF0sXG5cblx0cm9vdCxcblx0cm9vdF9wcmVsb2FkOiAoKSA9PiB7fSxcblx0ZXJyb3Jcbn07XG5cbmV4cG9ydCBjb25zdCBidWlsZF9kaXIgPSBcIl9fc2FwcGVyX18vZGV2XCI7XG5cbmV4cG9ydCBjb25zdCBzcmNfZGlyID0gXCJzcmNcIjtcblxuZXhwb3J0IGNvbnN0IGRldiA9IHRydWU7IiwiaW1wb3J0IHsgbm9vcCwgc2FmZV9ub3RfZXF1YWwsIHN1YnNjcmliZSwgcnVuX2FsbCwgaXNfZnVuY3Rpb24gfSBmcm9tICcuLi9pbnRlcm5hbCc7XG5leHBvcnQgeyBnZXRfc3RvcmVfdmFsdWUgYXMgZ2V0IH0gZnJvbSAnLi4vaW50ZXJuYWwnO1xuXG5jb25zdCBzdWJzY3JpYmVyX3F1ZXVlID0gW107XG4vKipcbiAqIENyZWF0ZXMgYSBgUmVhZGFibGVgIHN0b3JlIHRoYXQgYWxsb3dzIHJlYWRpbmcgYnkgc3Vic2NyaXB0aW9uLlxuICogQHBhcmFtIHZhbHVlIGluaXRpYWwgdmFsdWVcbiAqIEBwYXJhbSB7U3RhcnRTdG9wTm90aWZpZXJ9c3RhcnQgc3RhcnQgYW5kIHN0b3Agbm90aWZpY2F0aW9ucyBmb3Igc3Vic2NyaXB0aW9uc1xuICovXG5mdW5jdGlvbiByZWFkYWJsZSh2YWx1ZSwgc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdWJzY3JpYmU6IHdyaXRhYmxlKHZhbHVlLCBzdGFydCkuc3Vic2NyaWJlLFxuICAgIH07XG59XG4vKipcbiAqIENyZWF0ZSBhIGBXcml0YWJsZWAgc3RvcmUgdGhhdCBhbGxvd3MgYm90aCB1cGRhdGluZyBhbmQgcmVhZGluZyBieSBzdWJzY3JpcHRpb24uXG4gKiBAcGFyYW0geyo9fXZhbHVlIGluaXRpYWwgdmFsdWVcbiAqIEBwYXJhbSB7U3RhcnRTdG9wTm90aWZpZXI9fXN0YXJ0IHN0YXJ0IGFuZCBzdG9wIG5vdGlmaWNhdGlvbnMgZm9yIHN1YnNjcmlwdGlvbnNcbiAqL1xuZnVuY3Rpb24gd3JpdGFibGUodmFsdWUsIHN0YXJ0ID0gbm9vcCkge1xuICAgIGxldCBzdG9wO1xuICAgIGNvbnN0IHN1YnNjcmliZXJzID0gW107XG4gICAgZnVuY3Rpb24gc2V0KG5ld192YWx1ZSkge1xuICAgICAgICBpZiAoc2FmZV9ub3RfZXF1YWwodmFsdWUsIG5ld192YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gbmV3X3ZhbHVlO1xuICAgICAgICAgICAgaWYgKHN0b3ApIHsgLy8gc3RvcmUgaXMgcmVhZHlcbiAgICAgICAgICAgICAgICBjb25zdCBydW5fcXVldWUgPSAhc3Vic2NyaWJlcl9xdWV1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJzY3JpYmVycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzID0gc3Vic2NyaWJlcnNbaV07XG4gICAgICAgICAgICAgICAgICAgIHNbMV0oKTtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlcl9xdWV1ZS5wdXNoKHMsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJ1bl9xdWV1ZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YnNjcmliZXJfcXVldWUubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXJfcXVldWVbaV1bMF0oc3Vic2NyaWJlcl9xdWV1ZVtpICsgMV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXJfcXVldWUubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlKGZuKSB7XG4gICAgICAgIHNldChmbih2YWx1ZSkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzdWJzY3JpYmUocnVuLCBpbnZhbGlkYXRlID0gbm9vcCkge1xuICAgICAgICBjb25zdCBzdWJzY3JpYmVyID0gW3J1biwgaW52YWxpZGF0ZV07XG4gICAgICAgIHN1YnNjcmliZXJzLnB1c2goc3Vic2NyaWJlcik7XG4gICAgICAgIGlmIChzdWJzY3JpYmVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHN0b3AgPSBzdGFydChzZXQpIHx8IG5vb3A7XG4gICAgICAgIH1cbiAgICAgICAgcnVuKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc3Vic2NyaWJlcnMuaW5kZXhPZihzdWJzY3JpYmVyKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN1YnNjcmliZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHN0b3AoKTtcbiAgICAgICAgICAgICAgICBzdG9wID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgc2V0LCB1cGRhdGUsIHN1YnNjcmliZSB9O1xufVxuZnVuY3Rpb24gZGVyaXZlZChzdG9yZXMsIGZuLCBpbml0aWFsX3ZhbHVlKSB7XG4gICAgY29uc3Qgc2luZ2xlID0gIUFycmF5LmlzQXJyYXkoc3RvcmVzKTtcbiAgICBjb25zdCBzdG9yZXNfYXJyYXkgPSBzaW5nbGVcbiAgICAgICAgPyBbc3RvcmVzXVxuICAgICAgICA6IHN0b3JlcztcbiAgICBjb25zdCBhdXRvID0gZm4ubGVuZ3RoIDwgMjtcbiAgICByZXR1cm4gcmVhZGFibGUoaW5pdGlhbF92YWx1ZSwgKHNldCkgPT4ge1xuICAgICAgICBsZXQgaW5pdGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgICAgICBsZXQgcGVuZGluZyA9IDA7XG4gICAgICAgIGxldCBjbGVhbnVwID0gbm9vcDtcbiAgICAgICAgY29uc3Qgc3luYyA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmIChwZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZm4oc2luZ2xlID8gdmFsdWVzWzBdIDogdmFsdWVzLCBzZXQpO1xuICAgICAgICAgICAgaWYgKGF1dG8pIHtcbiAgICAgICAgICAgICAgICBzZXQocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsZWFudXAgPSBpc19mdW5jdGlvbihyZXN1bHQpID8gcmVzdWx0IDogbm9vcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdW5zdWJzY3JpYmVycyA9IHN0b3Jlc19hcnJheS5tYXAoKHN0b3JlLCBpKSA9PiBzdWJzY3JpYmUoc3RvcmUsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdmFsdWVzW2ldID0gdmFsdWU7XG4gICAgICAgICAgICBwZW5kaW5nICY9IH4oMSA8PCBpKTtcbiAgICAgICAgICAgIGlmIChpbml0ZWQpIHtcbiAgICAgICAgICAgICAgICBzeW5jKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHBlbmRpbmcgfD0gKDEgPDwgaSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgaW5pdGVkID0gdHJ1ZTtcbiAgICAgICAgc3luYygpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgICAgIHJ1bl9hbGwodW5zdWJzY3JpYmVycyk7XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgIH07XG4gICAgfSk7XG59XG5cbmV4cG9ydCB7IGRlcml2ZWQsIHJlYWRhYmxlLCB3cml0YWJsZSB9O1xuIiwiaW1wb3J0IHsgd3JpdGFibGUgfSBmcm9tICdzdmVsdGUvc3RvcmUnO1xuXG5leHBvcnQgY29uc3QgQ09OVEVYVF9LRVkgPSB7fTtcblxuZXhwb3J0IGNvbnN0IHByZWxvYWQgPSAoKSA9PiAoe30pOyIsIjwhLS0gVGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBieSBTYXBwZXIg4oCUIGRvIG5vdCBlZGl0IGl0ISAtLT5cbjxzY3JpcHQ+XG5cdGltcG9ydCB7IHNldENvbnRleHQsIGFmdGVyVXBkYXRlIH0gZnJvbSAnc3ZlbHRlJztcblx0aW1wb3J0IHsgQ09OVEVYVF9LRVkgfSBmcm9tICcuL3NoYXJlZCc7XG5cdGltcG9ydCBMYXlvdXQgZnJvbSAnLi4vLi4vLi4vcm91dGVzL19sYXlvdXQuc3ZlbHRlJztcblx0aW1wb3J0IEVycm9yIGZyb20gJy4uLy4uLy4uL3JvdXRlcy9fZXJyb3Iuc3ZlbHRlJztcblxuXHRleHBvcnQgbGV0IHN0b3Jlcztcblx0ZXhwb3J0IGxldCBlcnJvcjtcblx0ZXhwb3J0IGxldCBzdGF0dXM7XG5cdGV4cG9ydCBsZXQgc2VnbWVudHM7XG5cdGV4cG9ydCBsZXQgbGV2ZWwwO1xuXHRleHBvcnQgbGV0IGxldmVsMSA9IG51bGw7XG5cdGV4cG9ydCBsZXQgbm90aWZ5O1xuXG5cdGFmdGVyVXBkYXRlKG5vdGlmeSk7XG5cdHNldENvbnRleHQoQ09OVEVYVF9LRVksIHN0b3Jlcyk7XG48L3NjcmlwdD5cblxuPExheW91dCBzZWdtZW50PVwie3NlZ21lbnRzWzBdfVwiIHsuLi5sZXZlbDAucHJvcHN9PlxuXHR7I2lmIGVycm9yfVxuXHRcdDxFcnJvciB7ZXJyb3J9IHtzdGF0dXN9Lz5cblx0ezplbHNlfVxuXHRcdDxzdmVsdGU6Y29tcG9uZW50IHRoaXM9XCJ7bGV2ZWwxLmNvbXBvbmVudH1cIiB7Li4ubGV2ZWwxLnByb3BzfS8+XG5cdHsvaWZ9XG48L0xheW91dD4iLCJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBkZXYsIGJ1aWxkX2Rpciwgc3JjX2RpciwgbWFuaWZlc3QgfSBmcm9tICcuL2ludGVybmFsL21hbmlmZXN0LXNlcnZlcic7XG5pbXBvcnQgeyB3cml0YWJsZSB9IGZyb20gJ3N2ZWx0ZS9zdG9yZSc7XG5pbXBvcnQgU3RyZWFtIGZyb20gJ3N0cmVhbSc7XG5pbXBvcnQgaHR0cCBmcm9tICdodHRwJztcbmltcG9ydCBVcmwgZnJvbSAndXJsJztcbmltcG9ydCBodHRwcyBmcm9tICdodHRwcyc7XG5pbXBvcnQgemxpYiBmcm9tICd6bGliJztcbmltcG9ydCBBcHAgZnJvbSAnLi9pbnRlcm5hbC9BcHAuc3ZlbHRlJztcblxuLyoqXG4gKiBAcGFyYW0gdHlwZU1hcCBbT2JqZWN0XSBNYXAgb2YgTUlNRSB0eXBlIC0+IEFycmF5W2V4dGVuc2lvbnNdXG4gKiBAcGFyYW0gLi4uXG4gKi9cbmZ1bmN0aW9uIE1pbWUoKSB7XG4gIHRoaXMuX3R5cGVzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdGhpcy5fZXh0ZW5zaW9ucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB0aGlzLmRlZmluZShhcmd1bWVudHNbaV0pO1xuICB9XG5cbiAgdGhpcy5kZWZpbmUgPSB0aGlzLmRlZmluZS5iaW5kKHRoaXMpO1xuICB0aGlzLmdldFR5cGUgPSB0aGlzLmdldFR5cGUuYmluZCh0aGlzKTtcbiAgdGhpcy5nZXRFeHRlbnNpb24gPSB0aGlzLmdldEV4dGVuc2lvbi5iaW5kKHRoaXMpO1xufVxuXG4vKipcbiAqIERlZmluZSBtaW1ldHlwZSAtPiBleHRlbnNpb24gbWFwcGluZ3MuICBFYWNoIGtleSBpcyBhIG1pbWUtdHlwZSB0aGF0IG1hcHNcbiAqIHRvIGFuIGFycmF5IG9mIGV4dGVuc2lvbnMgYXNzb2NpYXRlZCB3aXRoIHRoZSB0eXBlLiAgVGhlIGZpcnN0IGV4dGVuc2lvbiBpc1xuICogdXNlZCBhcyB0aGUgZGVmYXVsdCBleHRlbnNpb24gZm9yIHRoZSB0eXBlLlxuICpcbiAqIGUuZy4gbWltZS5kZWZpbmUoeydhdWRpby9vZ2cnLCBbJ29nYScsICdvZ2cnLCAnc3B4J119KTtcbiAqXG4gKiBJZiBhIHR5cGUgZGVjbGFyZXMgYW4gZXh0ZW5zaW9uIHRoYXQgaGFzIGFscmVhZHkgYmVlbiBkZWZpbmVkLCBhbiBlcnJvciB3aWxsXG4gKiBiZSB0aHJvd24uICBUbyBzdXBwcmVzcyB0aGlzIGVycm9yIGFuZCBmb3JjZSB0aGUgZXh0ZW5zaW9uIHRvIGJlIGFzc29jaWF0ZWRcbiAqIHdpdGggdGhlIG5ldyB0eXBlLCBwYXNzIGBmb3JjZWA9dHJ1ZS4gIEFsdGVybmF0aXZlbHksIHlvdSBtYXkgcHJlZml4IHRoZVxuICogZXh0ZW5zaW9uIHdpdGggXCIqXCIgdG8gbWFwIHRoZSB0eXBlIHRvIGV4dGVuc2lvbiwgd2l0aG91dCBtYXBwaW5nIHRoZVxuICogZXh0ZW5zaW9uIHRvIHRoZSB0eXBlLlxuICpcbiAqIGUuZy4gbWltZS5kZWZpbmUoeydhdWRpby93YXYnLCBbJ3dhdiddfSwgeydhdWRpby94LXdhdicsIFsnKndhdiddfSk7XG4gKlxuICpcbiAqIEBwYXJhbSBtYXAgKE9iamVjdCkgdHlwZSBkZWZpbml0aW9uc1xuICogQHBhcmFtIGZvcmNlIChCb29sZWFuKSBpZiB0cnVlLCBmb3JjZSBvdmVycmlkaW5nIG9mIGV4aXN0aW5nIGRlZmluaXRpb25zXG4gKi9cbk1pbWUucHJvdG90eXBlLmRlZmluZSA9IGZ1bmN0aW9uKHR5cGVNYXAsIGZvcmNlKSB7XG4gIGZvciAodmFyIHR5cGUgaW4gdHlwZU1hcCkge1xuICAgIHZhciBleHRlbnNpb25zID0gdHlwZU1hcFt0eXBlXS5tYXAoZnVuY3Rpb24odCkge3JldHVybiB0LnRvTG93ZXJDYXNlKCl9KTtcbiAgICB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHRlbnNpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZXh0ID0gZXh0ZW5zaW9uc1tpXTtcblxuICAgICAgLy8gJyonIHByZWZpeCA9IG5vdCB0aGUgcHJlZmVycmVkIHR5cGUgZm9yIHRoaXMgZXh0ZW5zaW9uLiAgU28gZml4dXAgdGhlXG4gICAgICAvLyBleHRlbnNpb24sIGFuZCBza2lwIGl0LlxuICAgICAgaWYgKGV4dFswXSA9PSAnKicpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghZm9yY2UgJiYgKGV4dCBpbiB0aGlzLl90eXBlcykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdBdHRlbXB0IHRvIGNoYW5nZSBtYXBwaW5nIGZvciBcIicgKyBleHQgK1xuICAgICAgICAgICdcIiBleHRlbnNpb24gZnJvbSBcIicgKyB0aGlzLl90eXBlc1tleHRdICsgJ1wiIHRvIFwiJyArIHR5cGUgK1xuICAgICAgICAgICdcIi4gUGFzcyBgZm9yY2U9dHJ1ZWAgdG8gYWxsb3cgdGhpcywgb3RoZXJ3aXNlIHJlbW92ZSBcIicgKyBleHQgK1xuICAgICAgICAgICdcIiBmcm9tIHRoZSBsaXN0IG9mIGV4dGVuc2lvbnMgZm9yIFwiJyArIHR5cGUgKyAnXCIuJ1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl90eXBlc1tleHRdID0gdHlwZTtcbiAgICB9XG5cbiAgICAvLyBVc2UgZmlyc3QgZXh0ZW5zaW9uIGFzIGRlZmF1bHRcbiAgICBpZiAoZm9yY2UgfHwgIXRoaXMuX2V4dGVuc2lvbnNbdHlwZV0pIHtcbiAgICAgIHZhciBleHQgPSBleHRlbnNpb25zWzBdO1xuICAgICAgdGhpcy5fZXh0ZW5zaW9uc1t0eXBlXSA9IChleHRbMF0gIT0gJyonKSA/IGV4dCA6IGV4dC5zdWJzdHIoMSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIExvb2t1cCBhIG1pbWUgdHlwZSBiYXNlZCBvbiBleHRlbnNpb25cbiAqL1xuTWltZS5wcm90b3R5cGUuZ2V0VHlwZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgcGF0aCA9IFN0cmluZyhwYXRoKTtcbiAgdmFyIGxhc3QgPSBwYXRoLnJlcGxhY2UoL14uKlsvXFxcXF0vLCAnJykudG9Mb3dlckNhc2UoKTtcbiAgdmFyIGV4dCA9IGxhc3QucmVwbGFjZSgvXi4qXFwuLywgJycpLnRvTG93ZXJDYXNlKCk7XG5cbiAgdmFyIGhhc1BhdGggPSBsYXN0Lmxlbmd0aCA8IHBhdGgubGVuZ3RoO1xuICB2YXIgaGFzRG90ID0gZXh0Lmxlbmd0aCA8IGxhc3QubGVuZ3RoIC0gMTtcblxuICByZXR1cm4gKGhhc0RvdCB8fCAhaGFzUGF0aCkgJiYgdGhpcy5fdHlwZXNbZXh0XSB8fCBudWxsO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gZmlsZSBleHRlbnNpb24gYXNzb2NpYXRlZCB3aXRoIGEgbWltZSB0eXBlXG4gKi9cbk1pbWUucHJvdG90eXBlLmdldEV4dGVuc2lvbiA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdHlwZSA9IC9eXFxzKihbXjtcXHNdKikvLnRlc3QodHlwZSkgJiYgUmVnRXhwLiQxO1xuICByZXR1cm4gdHlwZSAmJiB0aGlzLl9leHRlbnNpb25zW3R5cGUudG9Mb3dlckNhc2UoKV0gfHwgbnVsbDtcbn07XG5cbnZhciBNaW1lXzEgPSBNaW1lO1xuXG52YXIgc3RhbmRhcmQgPSB7XCJhcHBsaWNhdGlvbi9hbmRyZXctaW5zZXRcIjpbXCJlelwiXSxcImFwcGxpY2F0aW9uL2FwcGxpeHdhcmVcIjpbXCJhd1wiXSxcImFwcGxpY2F0aW9uL2F0b20reG1sXCI6W1wiYXRvbVwiXSxcImFwcGxpY2F0aW9uL2F0b21jYXQreG1sXCI6W1wiYXRvbWNhdFwiXSxcImFwcGxpY2F0aW9uL2F0b21zdmMreG1sXCI6W1wiYXRvbXN2Y1wiXSxcImFwcGxpY2F0aW9uL2Jkb2NcIjpbXCJiZG9jXCJdLFwiYXBwbGljYXRpb24vY2N4bWwreG1sXCI6W1wiY2N4bWxcIl0sXCJhcHBsaWNhdGlvbi9jZG1pLWNhcGFiaWxpdHlcIjpbXCJjZG1pYVwiXSxcImFwcGxpY2F0aW9uL2NkbWktY29udGFpbmVyXCI6W1wiY2RtaWNcIl0sXCJhcHBsaWNhdGlvbi9jZG1pLWRvbWFpblwiOltcImNkbWlkXCJdLFwiYXBwbGljYXRpb24vY2RtaS1vYmplY3RcIjpbXCJjZG1pb1wiXSxcImFwcGxpY2F0aW9uL2NkbWktcXVldWVcIjpbXCJjZG1pcVwiXSxcImFwcGxpY2F0aW9uL2N1LXNlZW1lXCI6W1wiY3VcIl0sXCJhcHBsaWNhdGlvbi9kYXNoK3htbFwiOltcIm1wZFwiXSxcImFwcGxpY2F0aW9uL2Rhdm1vdW50K3htbFwiOltcImRhdm1vdW50XCJdLFwiYXBwbGljYXRpb24vZG9jYm9vayt4bWxcIjpbXCJkYmtcIl0sXCJhcHBsaWNhdGlvbi9kc3NjK2RlclwiOltcImRzc2NcIl0sXCJhcHBsaWNhdGlvbi9kc3NjK3htbFwiOltcInhkc3NjXCJdLFwiYXBwbGljYXRpb24vZWNtYXNjcmlwdFwiOltcImVjbWFcIixcImVzXCJdLFwiYXBwbGljYXRpb24vZW1tYSt4bWxcIjpbXCJlbW1hXCJdLFwiYXBwbGljYXRpb24vZXB1Yit6aXBcIjpbXCJlcHViXCJdLFwiYXBwbGljYXRpb24vZXhpXCI6W1wiZXhpXCJdLFwiYXBwbGljYXRpb24vZm9udC10ZHBmclwiOltcInBmclwiXSxcImFwcGxpY2F0aW9uL2dlbytqc29uXCI6W1wiZ2VvanNvblwiXSxcImFwcGxpY2F0aW9uL2dtbCt4bWxcIjpbXCJnbWxcIl0sXCJhcHBsaWNhdGlvbi9ncHgreG1sXCI6W1wiZ3B4XCJdLFwiYXBwbGljYXRpb24vZ3hmXCI6W1wiZ3hmXCJdLFwiYXBwbGljYXRpb24vZ3ppcFwiOltcImd6XCJdLFwiYXBwbGljYXRpb24vaGpzb25cIjpbXCJoanNvblwiXSxcImFwcGxpY2F0aW9uL2h5cGVyc3R1ZGlvXCI6W1wic3RrXCJdLFwiYXBwbGljYXRpb24vaW5rbWwreG1sXCI6W1wiaW5rXCIsXCJpbmttbFwiXSxcImFwcGxpY2F0aW9uL2lwZml4XCI6W1wiaXBmaXhcIl0sXCJhcHBsaWNhdGlvbi9qYXZhLWFyY2hpdmVcIjpbXCJqYXJcIixcIndhclwiLFwiZWFyXCJdLFwiYXBwbGljYXRpb24vamF2YS1zZXJpYWxpemVkLW9iamVjdFwiOltcInNlclwiXSxcImFwcGxpY2F0aW9uL2phdmEtdm1cIjpbXCJjbGFzc1wiXSxcImFwcGxpY2F0aW9uL2phdmFzY3JpcHRcIjpbXCJqc1wiLFwibWpzXCJdLFwiYXBwbGljYXRpb24vanNvblwiOltcImpzb25cIixcIm1hcFwiXSxcImFwcGxpY2F0aW9uL2pzb241XCI6W1wianNvbjVcIl0sXCJhcHBsaWNhdGlvbi9qc29ubWwranNvblwiOltcImpzb25tbFwiXSxcImFwcGxpY2F0aW9uL2xkK2pzb25cIjpbXCJqc29ubGRcIl0sXCJhcHBsaWNhdGlvbi9sb3N0K3htbFwiOltcImxvc3R4bWxcIl0sXCJhcHBsaWNhdGlvbi9tYWMtYmluaGV4NDBcIjpbXCJocXhcIl0sXCJhcHBsaWNhdGlvbi9tYWMtY29tcGFjdHByb1wiOltcImNwdFwiXSxcImFwcGxpY2F0aW9uL21hZHMreG1sXCI6W1wibWFkc1wiXSxcImFwcGxpY2F0aW9uL21hbmlmZXN0K2pzb25cIjpbXCJ3ZWJtYW5pZmVzdFwiXSxcImFwcGxpY2F0aW9uL21hcmNcIjpbXCJtcmNcIl0sXCJhcHBsaWNhdGlvbi9tYXJjeG1sK3htbFwiOltcIm1yY3hcIl0sXCJhcHBsaWNhdGlvbi9tYXRoZW1hdGljYVwiOltcIm1hXCIsXCJuYlwiLFwibWJcIl0sXCJhcHBsaWNhdGlvbi9tYXRobWwreG1sXCI6W1wibWF0aG1sXCJdLFwiYXBwbGljYXRpb24vbWJveFwiOltcIm1ib3hcIl0sXCJhcHBsaWNhdGlvbi9tZWRpYXNlcnZlcmNvbnRyb2wreG1sXCI6W1wibXNjbWxcIl0sXCJhcHBsaWNhdGlvbi9tZXRhbGluayt4bWxcIjpbXCJtZXRhbGlua1wiXSxcImFwcGxpY2F0aW9uL21ldGFsaW5rNCt4bWxcIjpbXCJtZXRhNFwiXSxcImFwcGxpY2F0aW9uL21ldHMreG1sXCI6W1wibWV0c1wiXSxcImFwcGxpY2F0aW9uL21vZHMreG1sXCI6W1wibW9kc1wiXSxcImFwcGxpY2F0aW9uL21wMjFcIjpbXCJtMjFcIixcIm1wMjFcIl0sXCJhcHBsaWNhdGlvbi9tcDRcIjpbXCJtcDRzXCIsXCJtNHBcIl0sXCJhcHBsaWNhdGlvbi9tc3dvcmRcIjpbXCJkb2NcIixcImRvdFwiXSxcImFwcGxpY2F0aW9uL214ZlwiOltcIm14ZlwiXSxcImFwcGxpY2F0aW9uL24tcXVhZHNcIjpbXCJucVwiXSxcImFwcGxpY2F0aW9uL24tdHJpcGxlc1wiOltcIm50XCJdLFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCI6W1wiYmluXCIsXCJkbXNcIixcImxyZlwiLFwibWFyXCIsXCJzb1wiLFwiZGlzdFwiLFwiZGlzdHpcIixcInBrZ1wiLFwiYnBrXCIsXCJkdW1wXCIsXCJlbGNcIixcImRlcGxveVwiLFwiZXhlXCIsXCJkbGxcIixcImRlYlwiLFwiZG1nXCIsXCJpc29cIixcImltZ1wiLFwibXNpXCIsXCJtc3BcIixcIm1zbVwiLFwiYnVmZmVyXCJdLFwiYXBwbGljYXRpb24vb2RhXCI6W1wib2RhXCJdLFwiYXBwbGljYXRpb24vb2VicHMtcGFja2FnZSt4bWxcIjpbXCJvcGZcIl0sXCJhcHBsaWNhdGlvbi9vZ2dcIjpbXCJvZ3hcIl0sXCJhcHBsaWNhdGlvbi9vbWRvYyt4bWxcIjpbXCJvbWRvY1wiXSxcImFwcGxpY2F0aW9uL29uZW5vdGVcIjpbXCJvbmV0b2NcIixcIm9uZXRvYzJcIixcIm9uZXRtcFwiLFwib25lcGtnXCJdLFwiYXBwbGljYXRpb24vb3hwc1wiOltcIm94cHNcIl0sXCJhcHBsaWNhdGlvbi9wYXRjaC1vcHMtZXJyb3IreG1sXCI6W1wieGVyXCJdLFwiYXBwbGljYXRpb24vcGRmXCI6W1wicGRmXCJdLFwiYXBwbGljYXRpb24vcGdwLWVuY3J5cHRlZFwiOltcInBncFwiXSxcImFwcGxpY2F0aW9uL3BncC1zaWduYXR1cmVcIjpbXCJhc2NcIixcInNpZ1wiXSxcImFwcGxpY2F0aW9uL3BpY3MtcnVsZXNcIjpbXCJwcmZcIl0sXCJhcHBsaWNhdGlvbi9wa2NzMTBcIjpbXCJwMTBcIl0sXCJhcHBsaWNhdGlvbi9wa2NzNy1taW1lXCI6W1wicDdtXCIsXCJwN2NcIl0sXCJhcHBsaWNhdGlvbi9wa2NzNy1zaWduYXR1cmVcIjpbXCJwN3NcIl0sXCJhcHBsaWNhdGlvbi9wa2NzOFwiOltcInA4XCJdLFwiYXBwbGljYXRpb24vcGtpeC1hdHRyLWNlcnRcIjpbXCJhY1wiXSxcImFwcGxpY2F0aW9uL3BraXgtY2VydFwiOltcImNlclwiXSxcImFwcGxpY2F0aW9uL3BraXgtY3JsXCI6W1wiY3JsXCJdLFwiYXBwbGljYXRpb24vcGtpeC1wa2lwYXRoXCI6W1wicGtpcGF0aFwiXSxcImFwcGxpY2F0aW9uL3BraXhjbXBcIjpbXCJwa2lcIl0sXCJhcHBsaWNhdGlvbi9wbHMreG1sXCI6W1wicGxzXCJdLFwiYXBwbGljYXRpb24vcG9zdHNjcmlwdFwiOltcImFpXCIsXCJlcHNcIixcInBzXCJdLFwiYXBwbGljYXRpb24vcHNrYyt4bWxcIjpbXCJwc2tjeG1sXCJdLFwiYXBwbGljYXRpb24vcmFtbCt5YW1sXCI6W1wicmFtbFwiXSxcImFwcGxpY2F0aW9uL3JkZit4bWxcIjpbXCJyZGZcIixcIm93bFwiXSxcImFwcGxpY2F0aW9uL3JlZ2luZm8reG1sXCI6W1wicmlmXCJdLFwiYXBwbGljYXRpb24vcmVsYXgtbmctY29tcGFjdC1zeW50YXhcIjpbXCJybmNcIl0sXCJhcHBsaWNhdGlvbi9yZXNvdXJjZS1saXN0cyt4bWxcIjpbXCJybFwiXSxcImFwcGxpY2F0aW9uL3Jlc291cmNlLWxpc3RzLWRpZmYreG1sXCI6W1wicmxkXCJdLFwiYXBwbGljYXRpb24vcmxzLXNlcnZpY2VzK3htbFwiOltcInJzXCJdLFwiYXBwbGljYXRpb24vcnBraS1naG9zdGJ1c3RlcnNcIjpbXCJnYnJcIl0sXCJhcHBsaWNhdGlvbi9ycGtpLW1hbmlmZXN0XCI6W1wibWZ0XCJdLFwiYXBwbGljYXRpb24vcnBraS1yb2FcIjpbXCJyb2FcIl0sXCJhcHBsaWNhdGlvbi9yc2QreG1sXCI6W1wicnNkXCJdLFwiYXBwbGljYXRpb24vcnNzK3htbFwiOltcInJzc1wiXSxcImFwcGxpY2F0aW9uL3J0ZlwiOltcInJ0ZlwiXSxcImFwcGxpY2F0aW9uL3NibWwreG1sXCI6W1wic2JtbFwiXSxcImFwcGxpY2F0aW9uL3NjdnAtY3YtcmVxdWVzdFwiOltcInNjcVwiXSxcImFwcGxpY2F0aW9uL3NjdnAtY3YtcmVzcG9uc2VcIjpbXCJzY3NcIl0sXCJhcHBsaWNhdGlvbi9zY3ZwLXZwLXJlcXVlc3RcIjpbXCJzcHFcIl0sXCJhcHBsaWNhdGlvbi9zY3ZwLXZwLXJlc3BvbnNlXCI6W1wic3BwXCJdLFwiYXBwbGljYXRpb24vc2RwXCI6W1wic2RwXCJdLFwiYXBwbGljYXRpb24vc2V0LXBheW1lbnQtaW5pdGlhdGlvblwiOltcInNldHBheVwiXSxcImFwcGxpY2F0aW9uL3NldC1yZWdpc3RyYXRpb24taW5pdGlhdGlvblwiOltcInNldHJlZ1wiXSxcImFwcGxpY2F0aW9uL3NoZit4bWxcIjpbXCJzaGZcIl0sXCJhcHBsaWNhdGlvbi9zaWV2ZVwiOltcInNpdlwiLFwic2lldmVcIl0sXCJhcHBsaWNhdGlvbi9zbWlsK3htbFwiOltcInNtaVwiLFwic21pbFwiXSxcImFwcGxpY2F0aW9uL3NwYXJxbC1xdWVyeVwiOltcInJxXCJdLFwiYXBwbGljYXRpb24vc3BhcnFsLXJlc3VsdHMreG1sXCI6W1wic3J4XCJdLFwiYXBwbGljYXRpb24vc3Jnc1wiOltcImdyYW1cIl0sXCJhcHBsaWNhdGlvbi9zcmdzK3htbFwiOltcImdyeG1sXCJdLFwiYXBwbGljYXRpb24vc3J1K3htbFwiOltcInNydVwiXSxcImFwcGxpY2F0aW9uL3NzZGwreG1sXCI6W1wic3NkbFwiXSxcImFwcGxpY2F0aW9uL3NzbWwreG1sXCI6W1wic3NtbFwiXSxcImFwcGxpY2F0aW9uL3RlaSt4bWxcIjpbXCJ0ZWlcIixcInRlaWNvcnB1c1wiXSxcImFwcGxpY2F0aW9uL3RocmF1ZCt4bWxcIjpbXCJ0ZmlcIl0sXCJhcHBsaWNhdGlvbi90aW1lc3RhbXBlZC1kYXRhXCI6W1widHNkXCJdLFwiYXBwbGljYXRpb24vdm9pY2V4bWwreG1sXCI6W1widnhtbFwiXSxcImFwcGxpY2F0aW9uL3dhc21cIjpbXCJ3YXNtXCJdLFwiYXBwbGljYXRpb24vd2lkZ2V0XCI6W1wid2d0XCJdLFwiYXBwbGljYXRpb24vd2luaGxwXCI6W1wiaGxwXCJdLFwiYXBwbGljYXRpb24vd3NkbCt4bWxcIjpbXCJ3c2RsXCJdLFwiYXBwbGljYXRpb24vd3Nwb2xpY3kreG1sXCI6W1wid3Nwb2xpY3lcIl0sXCJhcHBsaWNhdGlvbi94YW1sK3htbFwiOltcInhhbWxcIl0sXCJhcHBsaWNhdGlvbi94Y2FwLWRpZmYreG1sXCI6W1wieGRmXCJdLFwiYXBwbGljYXRpb24veGVuYyt4bWxcIjpbXCJ4ZW5jXCJdLFwiYXBwbGljYXRpb24veGh0bWwreG1sXCI6W1wieGh0bWxcIixcInhodFwiXSxcImFwcGxpY2F0aW9uL3htbFwiOltcInhtbFwiLFwieHNsXCIsXCJ4c2RcIixcInJuZ1wiXSxcImFwcGxpY2F0aW9uL3htbC1kdGRcIjpbXCJkdGRcIl0sXCJhcHBsaWNhdGlvbi94b3AreG1sXCI6W1wieG9wXCJdLFwiYXBwbGljYXRpb24veHByb2MreG1sXCI6W1wieHBsXCJdLFwiYXBwbGljYXRpb24veHNsdCt4bWxcIjpbXCJ4c2x0XCJdLFwiYXBwbGljYXRpb24veHNwZit4bWxcIjpbXCJ4c3BmXCJdLFwiYXBwbGljYXRpb24veHYreG1sXCI6W1wibXhtbFwiLFwieGh2bWxcIixcInh2bWxcIixcInh2bVwiXSxcImFwcGxpY2F0aW9uL3lhbmdcIjpbXCJ5YW5nXCJdLFwiYXBwbGljYXRpb24veWluK3htbFwiOltcInlpblwiXSxcImFwcGxpY2F0aW9uL3ppcFwiOltcInppcFwiXSxcImF1ZGlvLzNncHBcIjpbXCIqM2dwcFwiXSxcImF1ZGlvL2FkcGNtXCI6W1wiYWRwXCJdLFwiYXVkaW8vYmFzaWNcIjpbXCJhdVwiLFwic25kXCJdLFwiYXVkaW8vbWlkaVwiOltcIm1pZFwiLFwibWlkaVwiLFwia2FyXCIsXCJybWlcIl0sXCJhdWRpby9tcDNcIjpbXCIqbXAzXCJdLFwiYXVkaW8vbXA0XCI6W1wibTRhXCIsXCJtcDRhXCJdLFwiYXVkaW8vbXBlZ1wiOltcIm1wZ2FcIixcIm1wMlwiLFwibXAyYVwiLFwibXAzXCIsXCJtMmFcIixcIm0zYVwiXSxcImF1ZGlvL29nZ1wiOltcIm9nYVwiLFwib2dnXCIsXCJzcHhcIl0sXCJhdWRpby9zM21cIjpbXCJzM21cIl0sXCJhdWRpby9zaWxrXCI6W1wic2lsXCJdLFwiYXVkaW8vd2F2XCI6W1wid2F2XCJdLFwiYXVkaW8vd2F2ZVwiOltcIip3YXZcIl0sXCJhdWRpby93ZWJtXCI6W1wid2ViYVwiXSxcImF1ZGlvL3htXCI6W1wieG1cIl0sXCJmb250L2NvbGxlY3Rpb25cIjpbXCJ0dGNcIl0sXCJmb250L290ZlwiOltcIm90ZlwiXSxcImZvbnQvdHRmXCI6W1widHRmXCJdLFwiZm9udC93b2ZmXCI6W1wid29mZlwiXSxcImZvbnQvd29mZjJcIjpbXCJ3b2ZmMlwiXSxcImltYWdlL2FjZXNcIjpbXCJleHJcIl0sXCJpbWFnZS9hcG5nXCI6W1wiYXBuZ1wiXSxcImltYWdlL2JtcFwiOltcImJtcFwiXSxcImltYWdlL2NnbVwiOltcImNnbVwiXSxcImltYWdlL2RpY29tLXJsZVwiOltcImRybGVcIl0sXCJpbWFnZS9lbWZcIjpbXCJlbWZcIl0sXCJpbWFnZS9maXRzXCI6W1wiZml0c1wiXSxcImltYWdlL2czZmF4XCI6W1wiZzNcIl0sXCJpbWFnZS9naWZcIjpbXCJnaWZcIl0sXCJpbWFnZS9oZWljXCI6W1wiaGVpY1wiXSxcImltYWdlL2hlaWMtc2VxdWVuY2VcIjpbXCJoZWljc1wiXSxcImltYWdlL2hlaWZcIjpbXCJoZWlmXCJdLFwiaW1hZ2UvaGVpZi1zZXF1ZW5jZVwiOltcImhlaWZzXCJdLFwiaW1hZ2UvaWVmXCI6W1wiaWVmXCJdLFwiaW1hZ2UvamxzXCI6W1wiamxzXCJdLFwiaW1hZ2UvanAyXCI6W1wianAyXCIsXCJqcGcyXCJdLFwiaW1hZ2UvanBlZ1wiOltcImpwZWdcIixcImpwZ1wiLFwianBlXCJdLFwiaW1hZ2UvanBtXCI6W1wianBtXCJdLFwiaW1hZ2UvanB4XCI6W1wianB4XCIsXCJqcGZcIl0sXCJpbWFnZS9qeHJcIjpbXCJqeHJcIl0sXCJpbWFnZS9rdHhcIjpbXCJrdHhcIl0sXCJpbWFnZS9wbmdcIjpbXCJwbmdcIl0sXCJpbWFnZS9zZ2lcIjpbXCJzZ2lcIl0sXCJpbWFnZS9zdmcreG1sXCI6W1wic3ZnXCIsXCJzdmd6XCJdLFwiaW1hZ2UvdDM4XCI6W1widDM4XCJdLFwiaW1hZ2UvdGlmZlwiOltcInRpZlwiLFwidGlmZlwiXSxcImltYWdlL3RpZmYtZnhcIjpbXCJ0ZnhcIl0sXCJpbWFnZS93ZWJwXCI6W1wid2VicFwiXSxcImltYWdlL3dtZlwiOltcIndtZlwiXSxcIm1lc3NhZ2UvZGlzcG9zaXRpb24tbm90aWZpY2F0aW9uXCI6W1wiZGlzcG9zaXRpb24tbm90aWZpY2F0aW9uXCJdLFwibWVzc2FnZS9nbG9iYWxcIjpbXCJ1OG1zZ1wiXSxcIm1lc3NhZ2UvZ2xvYmFsLWRlbGl2ZXJ5LXN0YXR1c1wiOltcInU4ZHNuXCJdLFwibWVzc2FnZS9nbG9iYWwtZGlzcG9zaXRpb24tbm90aWZpY2F0aW9uXCI6W1widThtZG5cIl0sXCJtZXNzYWdlL2dsb2JhbC1oZWFkZXJzXCI6W1widThoZHJcIl0sXCJtZXNzYWdlL3JmYzgyMlwiOltcImVtbFwiLFwibWltZVwiXSxcIm1vZGVsLzNtZlwiOltcIjNtZlwiXSxcIm1vZGVsL2dsdGYranNvblwiOltcImdsdGZcIl0sXCJtb2RlbC9nbHRmLWJpbmFyeVwiOltcImdsYlwiXSxcIm1vZGVsL2lnZXNcIjpbXCJpZ3NcIixcImlnZXNcIl0sXCJtb2RlbC9tZXNoXCI6W1wibXNoXCIsXCJtZXNoXCIsXCJzaWxvXCJdLFwibW9kZWwvc3RsXCI6W1wic3RsXCJdLFwibW9kZWwvdnJtbFwiOltcIndybFwiLFwidnJtbFwiXSxcIm1vZGVsL3gzZCtiaW5hcnlcIjpbXCIqeDNkYlwiLFwieDNkYnpcIl0sXCJtb2RlbC94M2QrZmFzdGluZm9zZXRcIjpbXCJ4M2RiXCJdLFwibW9kZWwveDNkK3ZybWxcIjpbXCIqeDNkdlwiLFwieDNkdnpcIl0sXCJtb2RlbC94M2QreG1sXCI6W1wieDNkXCIsXCJ4M2R6XCJdLFwibW9kZWwveDNkLXZybWxcIjpbXCJ4M2R2XCJdLFwidGV4dC9jYWNoZS1tYW5pZmVzdFwiOltcImFwcGNhY2hlXCIsXCJtYW5pZmVzdFwiXSxcInRleHQvY2FsZW5kYXJcIjpbXCJpY3NcIixcImlmYlwiXSxcInRleHQvY29mZmVlc2NyaXB0XCI6W1wiY29mZmVlXCIsXCJsaXRjb2ZmZWVcIl0sXCJ0ZXh0L2Nzc1wiOltcImNzc1wiXSxcInRleHQvY3N2XCI6W1wiY3N2XCJdLFwidGV4dC9odG1sXCI6W1wiaHRtbFwiLFwiaHRtXCIsXCJzaHRtbFwiXSxcInRleHQvamFkZVwiOltcImphZGVcIl0sXCJ0ZXh0L2pzeFwiOltcImpzeFwiXSxcInRleHQvbGVzc1wiOltcImxlc3NcIl0sXCJ0ZXh0L21hcmtkb3duXCI6W1wibWFya2Rvd25cIixcIm1kXCJdLFwidGV4dC9tYXRobWxcIjpbXCJtbWxcIl0sXCJ0ZXh0L21keFwiOltcIm1keFwiXSxcInRleHQvbjNcIjpbXCJuM1wiXSxcInRleHQvcGxhaW5cIjpbXCJ0eHRcIixcInRleHRcIixcImNvbmZcIixcImRlZlwiLFwibGlzdFwiLFwibG9nXCIsXCJpblwiLFwiaW5pXCJdLFwidGV4dC9yaWNodGV4dFwiOltcInJ0eFwiXSxcInRleHQvcnRmXCI6W1wiKnJ0ZlwiXSxcInRleHQvc2dtbFwiOltcInNnbWxcIixcInNnbVwiXSxcInRleHQvc2hleFwiOltcInNoZXhcIl0sXCJ0ZXh0L3NsaW1cIjpbXCJzbGltXCIsXCJzbG1cIl0sXCJ0ZXh0L3N0eWx1c1wiOltcInN0eWx1c1wiLFwic3R5bFwiXSxcInRleHQvdGFiLXNlcGFyYXRlZC12YWx1ZXNcIjpbXCJ0c3ZcIl0sXCJ0ZXh0L3Ryb2ZmXCI6W1widFwiLFwidHJcIixcInJvZmZcIixcIm1hblwiLFwibWVcIixcIm1zXCJdLFwidGV4dC90dXJ0bGVcIjpbXCJ0dGxcIl0sXCJ0ZXh0L3VyaS1saXN0XCI6W1widXJpXCIsXCJ1cmlzXCIsXCJ1cmxzXCJdLFwidGV4dC92Y2FyZFwiOltcInZjYXJkXCJdLFwidGV4dC92dHRcIjpbXCJ2dHRcIl0sXCJ0ZXh0L3htbFwiOltcIip4bWxcIl0sXCJ0ZXh0L3lhbWxcIjpbXCJ5YW1sXCIsXCJ5bWxcIl0sXCJ2aWRlby8zZ3BwXCI6W1wiM2dwXCIsXCIzZ3BwXCJdLFwidmlkZW8vM2dwcDJcIjpbXCIzZzJcIl0sXCJ2aWRlby9oMjYxXCI6W1wiaDI2MVwiXSxcInZpZGVvL2gyNjNcIjpbXCJoMjYzXCJdLFwidmlkZW8vaDI2NFwiOltcImgyNjRcIl0sXCJ2aWRlby9qcGVnXCI6W1wianBndlwiXSxcInZpZGVvL2pwbVwiOltcIipqcG1cIixcImpwZ21cIl0sXCJ2aWRlby9tajJcIjpbXCJtajJcIixcIm1qcDJcIl0sXCJ2aWRlby9tcDJ0XCI6W1widHNcIl0sXCJ2aWRlby9tcDRcIjpbXCJtcDRcIixcIm1wNHZcIixcIm1wZzRcIl0sXCJ2aWRlby9tcGVnXCI6W1wibXBlZ1wiLFwibXBnXCIsXCJtcGVcIixcIm0xdlwiLFwibTJ2XCJdLFwidmlkZW8vb2dnXCI6W1wib2d2XCJdLFwidmlkZW8vcXVpY2t0aW1lXCI6W1wicXRcIixcIm1vdlwiXSxcInZpZGVvL3dlYm1cIjpbXCJ3ZWJtXCJdfTtcblxudmFyIGxpdGUgPSBuZXcgTWltZV8xKHN0YW5kYXJkKTtcblxuZnVuY3Rpb24gZ2V0X3NlcnZlcl9yb3V0ZV9oYW5kbGVyKHJvdXRlcykge1xuXHRhc3luYyBmdW5jdGlvbiBoYW5kbGVfcm91dGUocm91dGUsIHJlcSwgcmVzLCBuZXh0KSB7XG5cdFx0cmVxLnBhcmFtcyA9IHJvdXRlLnBhcmFtcyhyb3V0ZS5wYXR0ZXJuLmV4ZWMocmVxLnBhdGgpKTtcblxuXHRcdGNvbnN0IG1ldGhvZCA9IHJlcS5tZXRob2QudG9Mb3dlckNhc2UoKTtcblx0XHQvLyAnZGVsZXRlJyBjYW5ub3QgYmUgZXhwb3J0ZWQgZnJvbSBhIG1vZHVsZSBiZWNhdXNlIGl0IGlzIGEga2V5d29yZCxcblx0XHQvLyBzbyBjaGVjayBmb3IgJ2RlbCcgaW5zdGVhZFxuXHRcdGNvbnN0IG1ldGhvZF9leHBvcnQgPSBtZXRob2QgPT09ICdkZWxldGUnID8gJ2RlbCcgOiBtZXRob2Q7XG5cdFx0Y29uc3QgaGFuZGxlX21ldGhvZCA9IHJvdXRlLmhhbmRsZXJzW21ldGhvZF9leHBvcnRdO1xuXHRcdGlmIChoYW5kbGVfbWV0aG9kKSB7XG5cdFx0XHRpZiAocHJvY2Vzcy5lbnYuU0FQUEVSX0VYUE9SVCkge1xuXHRcdFx0XHRjb25zdCB7IHdyaXRlLCBlbmQsIHNldEhlYWRlciB9ID0gcmVzO1xuXHRcdFx0XHRjb25zdCBjaHVua3MgPSBbXTtcblx0XHRcdFx0Y29uc3QgaGVhZGVycyA9IHt9O1xuXG5cdFx0XHRcdC8vIGludGVyY2VwdCBkYXRhIHNvIHRoYXQgaXQgY2FuIGJlIGV4cG9ydGVkXG5cdFx0XHRcdHJlcy53cml0ZSA9IGZ1bmN0aW9uKGNodW5rKSB7XG5cdFx0XHRcdFx0Y2h1bmtzLnB1c2goQnVmZmVyLmZyb20oY2h1bmspKTtcblx0XHRcdFx0XHR3cml0ZS5hcHBseShyZXMsIGFyZ3VtZW50cyk7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0cmVzLnNldEhlYWRlciA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG5cdFx0XHRcdFx0aGVhZGVyc1tuYW1lLnRvTG93ZXJDYXNlKCldID0gdmFsdWU7XG5cdFx0XHRcdFx0c2V0SGVhZGVyLmFwcGx5KHJlcywgYXJndW1lbnRzKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRyZXMuZW5kID0gZnVuY3Rpb24oY2h1bmspIHtcblx0XHRcdFx0XHRpZiAoY2h1bmspIGNodW5rcy5wdXNoKEJ1ZmZlci5mcm9tKGNodW5rKSk7XG5cdFx0XHRcdFx0ZW5kLmFwcGx5KHJlcywgYXJndW1lbnRzKTtcblxuXHRcdFx0XHRcdHByb2Nlc3Muc2VuZCh7XG5cdFx0XHRcdFx0XHRfX3NhcHBlcl9fOiB0cnVlLFxuXHRcdFx0XHRcdFx0ZXZlbnQ6ICdmaWxlJyxcblx0XHRcdFx0XHRcdHVybDogcmVxLnVybCxcblx0XHRcdFx0XHRcdG1ldGhvZDogcmVxLm1ldGhvZCxcblx0XHRcdFx0XHRcdHN0YXR1czogcmVzLnN0YXR1c0NvZGUsXG5cdFx0XHRcdFx0XHR0eXBlOiBoZWFkZXJzWydjb250ZW50LXR5cGUnXSxcblx0XHRcdFx0XHRcdGJvZHk6IEJ1ZmZlci5jb25jYXQoY2h1bmtzKS50b1N0cmluZygpXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGhhbmRsZV9uZXh0ID0gKGVycikgPT4ge1xuXHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0cmVzLnN0YXR1c0NvZGUgPSA1MDA7XG5cdFx0XHRcdFx0cmVzLmVuZChlcnIubWVzc2FnZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cHJvY2Vzcy5uZXh0VGljayhuZXh0KTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0YXdhaXQgaGFuZGxlX21ldGhvZChyZXEsIHJlcywgaGFuZGxlX25leHQpO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0XHRcdFx0aGFuZGxlX25leHQoZXJyKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gbm8gbWF0Y2hpbmcgaGFuZGxlciBmb3IgbWV0aG9kXG5cdFx0XHRwcm9jZXNzLm5leHRUaWNrKG5leHQpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBmdW5jdGlvbiBmaW5kX3JvdXRlKHJlcSwgcmVzLCBuZXh0KSB7XG5cdFx0Zm9yIChjb25zdCByb3V0ZSBvZiByb3V0ZXMpIHtcblx0XHRcdGlmIChyb3V0ZS5wYXR0ZXJuLnRlc3QocmVxLnBhdGgpKSB7XG5cdFx0XHRcdGhhbmRsZV9yb3V0ZShyb3V0ZSwgcmVxLCByZXMsIG5leHQpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bmV4dCgpO1xuXHR9O1xufVxuXG4vKiFcbiAqIGNvb2tpZVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBSb21hbiBTaHR5bG1hblxuICogQ29weXJpZ2h0KGMpIDIwMTUgRG91Z2xhcyBDaHJpc3RvcGhlciBXaWxzb25cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKiBAcHVibGljXG4gKi9cblxudmFyIHBhcnNlXzEgPSBwYXJzZTtcbnZhciBzZXJpYWxpemVfMSA9IHNlcmlhbGl6ZTtcblxuLyoqXG4gKiBNb2R1bGUgdmFyaWFibGVzLlxuICogQHByaXZhdGVcbiAqL1xuXG52YXIgZGVjb2RlID0gZGVjb2RlVVJJQ29tcG9uZW50O1xudmFyIGVuY29kZSA9IGVuY29kZVVSSUNvbXBvbmVudDtcbnZhciBwYWlyU3BsaXRSZWdFeHAgPSAvOyAqLztcblxuLyoqXG4gKiBSZWdFeHAgdG8gbWF0Y2ggZmllbGQtY29udGVudCBpbiBSRkMgNzIzMCBzZWMgMy4yXG4gKlxuICogZmllbGQtY29udGVudCA9IGZpZWxkLXZjaGFyIFsgMSooIFNQIC8gSFRBQiApIGZpZWxkLXZjaGFyIF1cbiAqIGZpZWxkLXZjaGFyICAgPSBWQ0hBUiAvIG9icy10ZXh0XG4gKiBvYnMtdGV4dCAgICAgID0gJXg4MC1GRlxuICovXG5cbnZhciBmaWVsZENvbnRlbnRSZWdFeHAgPSAvXltcXHUwMDA5XFx1MDAyMC1cXHUwMDdlXFx1MDA4MC1cXHUwMGZmXSskLztcblxuLyoqXG4gKiBQYXJzZSBhIGNvb2tpZSBoZWFkZXIuXG4gKlxuICogUGFyc2UgdGhlIGdpdmVuIGNvb2tpZSBoZWFkZXIgc3RyaW5nIGludG8gYW4gb2JqZWN0XG4gKiBUaGUgb2JqZWN0IGhhcyB0aGUgdmFyaW91cyBjb29raWVzIGFzIGtleXMobmFtZXMpID0+IHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAqIEByZXR1cm4ge29iamVjdH1cbiAqIEBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZShzdHIsIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgc3RyIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgfVxuXG4gIHZhciBvYmogPSB7fTtcbiAgdmFyIG9wdCA9IG9wdGlvbnMgfHwge307XG4gIHZhciBwYWlycyA9IHN0ci5zcGxpdChwYWlyU3BsaXRSZWdFeHApO1xuICB2YXIgZGVjID0gb3B0LmRlY29kZSB8fCBkZWNvZGU7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwYWlyID0gcGFpcnNbaV07XG4gICAgdmFyIGVxX2lkeCA9IHBhaXIuaW5kZXhPZignPScpO1xuXG4gICAgLy8gc2tpcCB0aGluZ3MgdGhhdCBkb24ndCBsb29rIGxpa2Uga2V5PXZhbHVlXG4gICAgaWYgKGVxX2lkeCA8IDApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBrZXkgPSBwYWlyLnN1YnN0cigwLCBlcV9pZHgpLnRyaW0oKTtcbiAgICB2YXIgdmFsID0gcGFpci5zdWJzdHIoKytlcV9pZHgsIHBhaXIubGVuZ3RoKS50cmltKCk7XG5cbiAgICAvLyBxdW90ZWQgdmFsdWVzXG4gICAgaWYgKCdcIicgPT0gdmFsWzBdKSB7XG4gICAgICB2YWwgPSB2YWwuc2xpY2UoMSwgLTEpO1xuICAgIH1cblxuICAgIC8vIG9ubHkgYXNzaWduIG9uY2VcbiAgICBpZiAodW5kZWZpbmVkID09IG9ialtrZXldKSB7XG4gICAgICBvYmpba2V5XSA9IHRyeURlY29kZSh2YWwsIGRlYyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBTZXJpYWxpemUgZGF0YSBpbnRvIGEgY29va2llIGhlYWRlci5cbiAqXG4gKiBTZXJpYWxpemUgdGhlIGEgbmFtZSB2YWx1ZSBwYWlyIGludG8gYSBjb29raWUgc3RyaW5nIHN1aXRhYmxlIGZvclxuICogaHR0cCBoZWFkZXJzLiBBbiBvcHRpb25hbCBvcHRpb25zIG9iamVjdCBzcGVjaWZpZWQgY29va2llIHBhcmFtZXRlcnMuXG4gKlxuICogc2VyaWFsaXplKCdmb28nLCAnYmFyJywgeyBodHRwT25seTogdHJ1ZSB9KVxuICogICA9PiBcImZvbz1iYXI7IGh0dHBPbmx5XCJcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbFxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICogQHJldHVybiB7c3RyaW5nfVxuICogQHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShuYW1lLCB2YWwsIG9wdGlvbnMpIHtcbiAgdmFyIG9wdCA9IG9wdGlvbnMgfHwge307XG4gIHZhciBlbmMgPSBvcHQuZW5jb2RlIHx8IGVuY29kZTtcblxuICBpZiAodHlwZW9mIGVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBlbmNvZGUgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgaWYgKCFmaWVsZENvbnRlbnRSZWdFeHAudGVzdChuYW1lKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FyZ3VtZW50IG5hbWUgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgdmFyIHZhbHVlID0gZW5jKHZhbCk7XG5cbiAgaWYgKHZhbHVlICYmICFmaWVsZENvbnRlbnRSZWdFeHAudGVzdCh2YWx1ZSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCB2YWwgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgdmFyIHN0ciA9IG5hbWUgKyAnPScgKyB2YWx1ZTtcblxuICBpZiAobnVsbCAhPSBvcHQubWF4QWdlKSB7XG4gICAgdmFyIG1heEFnZSA9IG9wdC5tYXhBZ2UgLSAwO1xuICAgIGlmIChpc05hTihtYXhBZ2UpKSB0aHJvdyBuZXcgRXJyb3IoJ21heEFnZSBzaG91bGQgYmUgYSBOdW1iZXInKTtcbiAgICBzdHIgKz0gJzsgTWF4LUFnZT0nICsgTWF0aC5mbG9vcihtYXhBZ2UpO1xuICB9XG5cbiAgaWYgKG9wdC5kb21haW4pIHtcbiAgICBpZiAoIWZpZWxkQ29udGVudFJlZ0V4cC50ZXN0KG9wdC5kb21haW4pKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gZG9tYWluIGlzIGludmFsaWQnKTtcbiAgICB9XG5cbiAgICBzdHIgKz0gJzsgRG9tYWluPScgKyBvcHQuZG9tYWluO1xuICB9XG5cbiAgaWYgKG9wdC5wYXRoKSB7XG4gICAgaWYgKCFmaWVsZENvbnRlbnRSZWdFeHAudGVzdChvcHQucGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBwYXRoIGlzIGludmFsaWQnKTtcbiAgICB9XG5cbiAgICBzdHIgKz0gJzsgUGF0aD0nICsgb3B0LnBhdGg7XG4gIH1cblxuICBpZiAob3B0LmV4cGlyZXMpIHtcbiAgICBpZiAodHlwZW9mIG9wdC5leHBpcmVzLnRvVVRDU3RyaW5nICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gZXhwaXJlcyBpcyBpbnZhbGlkJyk7XG4gICAgfVxuXG4gICAgc3RyICs9ICc7IEV4cGlyZXM9JyArIG9wdC5leHBpcmVzLnRvVVRDU3RyaW5nKCk7XG4gIH1cblxuICBpZiAob3B0Lmh0dHBPbmx5KSB7XG4gICAgc3RyICs9ICc7IEh0dHBPbmx5JztcbiAgfVxuXG4gIGlmIChvcHQuc2VjdXJlKSB7XG4gICAgc3RyICs9ICc7IFNlY3VyZSc7XG4gIH1cblxuICBpZiAob3B0LnNhbWVTaXRlKSB7XG4gICAgdmFyIHNhbWVTaXRlID0gdHlwZW9mIG9wdC5zYW1lU2l0ZSA9PT0gJ3N0cmluZydcbiAgICAgID8gb3B0LnNhbWVTaXRlLnRvTG93ZXJDYXNlKCkgOiBvcHQuc2FtZVNpdGU7XG5cbiAgICBzd2l0Y2ggKHNhbWVTaXRlKSB7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHN0ciArPSAnOyBTYW1lU2l0ZT1TdHJpY3QnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xheCc6XG4gICAgICAgIHN0ciArPSAnOyBTYW1lU2l0ZT1MYXgnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3N0cmljdCc6XG4gICAgICAgIHN0ciArPSAnOyBTYW1lU2l0ZT1TdHJpY3QnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ25vbmUnOlxuICAgICAgICBzdHIgKz0gJzsgU2FtZVNpdGU9Tm9uZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIHNhbWVTaXRlIGlzIGludmFsaWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RyO1xufVxuXG4vKipcbiAqIFRyeSBkZWNvZGluZyBhIHN0cmluZyB1c2luZyBhIGRlY29kaW5nIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGRlY29kZVxuICogQHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiB0cnlEZWNvZGUoc3RyLCBkZWNvZGUpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlKHN0cik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG5cbnZhciBjb29raWUgPSB7XG5cdHBhcnNlOiBwYXJzZV8xLFxuXHRzZXJpYWxpemU6IHNlcmlhbGl6ZV8xXG59O1xuXG52YXIgY2hhcnMgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWl8kJztcbnZhciB1bnNhZmVDaGFycyA9IC9bPD5cXGJcXGZcXG5cXHJcXHRcXDBcXHUyMDI4XFx1MjAyOV0vZztcbnZhciByZXNlcnZlZCA9IC9eKD86ZG98aWZ8aW58Zm9yfGludHxsZXR8bmV3fHRyeXx2YXJ8Ynl0ZXxjYXNlfGNoYXJ8ZWxzZXxlbnVtfGdvdG98bG9uZ3x0aGlzfHZvaWR8d2l0aHxhd2FpdHxicmVha3xjYXRjaHxjbGFzc3xjb25zdHxmaW5hbHxmbG9hdHxzaG9ydHxzdXBlcnx0aHJvd3x3aGlsZXx5aWVsZHxkZWxldGV8ZG91YmxlfGV4cG9ydHxpbXBvcnR8bmF0aXZlfHJldHVybnxzd2l0Y2h8dGhyb3dzfHR5cGVvZnxib29sZWFufGRlZmF1bHR8ZXh0ZW5kc3xmaW5hbGx5fHBhY2thZ2V8cHJpdmF0ZXxhYnN0cmFjdHxjb250aW51ZXxkZWJ1Z2dlcnxmdW5jdGlvbnx2b2xhdGlsZXxpbnRlcmZhY2V8cHJvdGVjdGVkfHRyYW5zaWVudHxpbXBsZW1lbnRzfGluc3RhbmNlb2Z8c3luY2hyb25pemVkKSQvO1xudmFyIGVzY2FwZWQgPSB7XG4gICAgJzwnOiAnXFxcXHUwMDNDJyxcbiAgICAnPic6ICdcXFxcdTAwM0UnLFxuICAgICcvJzogJ1xcXFx1MDAyRicsXG4gICAgJ1xcXFwnOiAnXFxcXFxcXFwnLFxuICAgICdcXGInOiAnXFxcXGInLFxuICAgICdcXGYnOiAnXFxcXGYnLFxuICAgICdcXG4nOiAnXFxcXG4nLFxuICAgICdcXHInOiAnXFxcXHInLFxuICAgICdcXHQnOiAnXFxcXHQnLFxuICAgICdcXDAnOiAnXFxcXDAnLFxuICAgICdcXHUyMDI4JzogJ1xcXFx1MjAyOCcsXG4gICAgJ1xcdTIwMjknOiAnXFxcXHUyMDI5J1xufTtcbnZhciBvYmplY3RQcm90b093blByb3BlcnR5TmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPYmplY3QucHJvdG90eXBlKS5zb3J0KCkuam9pbignXFwwJyk7XG5mdW5jdGlvbiBkZXZhbHVlKHZhbHVlKSB7XG4gICAgdmFyIGNvdW50cyA9IG5ldyBNYXAoKTtcbiAgICBmdW5jdGlvbiB3YWxrKHRoaW5nKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBzdHJpbmdpZnkgYSBmdW5jdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY291bnRzLmhhcyh0aGluZykpIHtcbiAgICAgICAgICAgIGNvdW50cy5zZXQodGhpbmcsIGNvdW50cy5nZXQodGhpbmcpICsgMSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY291bnRzLnNldCh0aGluZywgMSk7XG4gICAgICAgIGlmICghaXNQcmltaXRpdmUodGhpbmcpKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IGdldFR5cGUodGhpbmcpO1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnTnVtYmVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICdTdHJpbmcnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0RhdGUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1JlZ0V4cCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJheSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaW5nLmZvckVhY2god2Fsayk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1NldCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnTWFwJzpcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGluZykuZm9yRWFjaCh3YWxrKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3RvICE9PSBPYmplY3QucHJvdG90eXBlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm90byAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvdG8pLnNvcnQoKS5qb2luKCdcXDAnKSAhPT0gb2JqZWN0UHJvdG9Pd25Qcm9wZXJ0eU5hbWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgc3RyaW5naWZ5IGFyYml0cmFyeSBub24tUE9KT3NcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGhpbmcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBzdHJpbmdpZnkgUE9KT3Mgd2l0aCBzeW1ib2xpYyBrZXlzXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaW5nKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHdhbGsodGhpbmdba2V5XSk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHdhbGsodmFsdWUpO1xuICAgIHZhciBuYW1lcyA9IG5ldyBNYXAoKTtcbiAgICBBcnJheS5mcm9tKGNvdW50cylcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoZW50cnkpIHsgcmV0dXJuIGVudHJ5WzFdID4gMTsgfSlcbiAgICAgICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGJbMV0gLSBhWzFdOyB9KVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoZW50cnksIGkpIHtcbiAgICAgICAgbmFtZXMuc2V0KGVudHJ5WzBdLCBnZXROYW1lKGkpKTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBzdHJpbmdpZnkodGhpbmcpIHtcbiAgICAgICAgaWYgKG5hbWVzLmhhcyh0aGluZykpIHtcbiAgICAgICAgICAgIHJldHVybiBuYW1lcy5nZXQodGhpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1ByaW1pdGl2ZSh0aGluZykpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmdpZnlQcmltaXRpdmUodGhpbmcpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0eXBlID0gZ2V0VHlwZSh0aGluZyk7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnTnVtYmVyJzpcbiAgICAgICAgICAgIGNhc2UgJ1N0cmluZyc6XG4gICAgICAgICAgICBjYXNlICdCb29sZWFuJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJPYmplY3QoXCIgKyBzdHJpbmdpZnkodGhpbmcudmFsdWVPZigpKSArIFwiKVwiO1xuICAgICAgICAgICAgY2FzZSAnUmVnRXhwJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpbmcudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGNhc2UgJ0RhdGUnOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIm5ldyBEYXRlKFwiICsgdGhpbmcuZ2V0VGltZSgpICsgXCIpXCI7XG4gICAgICAgICAgICBjYXNlICdBcnJheSc6XG4gICAgICAgICAgICAgICAgdmFyIG1lbWJlcnMgPSB0aGluZy5tYXAoZnVuY3Rpb24gKHYsIGkpIHsgcmV0dXJuIGkgaW4gdGhpbmcgPyBzdHJpbmdpZnkodikgOiAnJzsgfSk7XG4gICAgICAgICAgICAgICAgdmFyIHRhaWwgPSB0aGluZy5sZW5ndGggPT09IDAgfHwgKHRoaW5nLmxlbmd0aCAtIDEgaW4gdGhpbmcpID8gJycgOiAnLCc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiW1wiICsgbWVtYmVycy5qb2luKCcsJykgKyB0YWlsICsgXCJdXCI7XG4gICAgICAgICAgICBjYXNlICdTZXQnOlxuICAgICAgICAgICAgY2FzZSAnTWFwJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJuZXcgXCIgKyB0eXBlICsgXCIoW1wiICsgQXJyYXkuZnJvbSh0aGluZykubWFwKHN0cmluZ2lmeSkuam9pbignLCcpICsgXCJdKVwiO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0gXCJ7XCIgKyBPYmplY3Qua2V5cyh0aGluZykubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHNhZmVLZXkoa2V5KSArIFwiOlwiICsgc3RyaW5naWZ5KHRoaW5nW2tleV0pOyB9KS5qb2luKCcsJykgKyBcIn1cIjtcbiAgICAgICAgICAgICAgICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpbmcpO1xuICAgICAgICAgICAgICAgIGlmIChwcm90byA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpbmcpLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXCJPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUobnVsbCksXCIgKyBvYmogKyBcIilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOiBcIk9iamVjdC5jcmVhdGUobnVsbClcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgc3RyID0gc3RyaW5naWZ5KHZhbHVlKTtcbiAgICBpZiAobmFtZXMuc2l6ZSkge1xuICAgICAgICB2YXIgcGFyYW1zXzEgPSBbXTtcbiAgICAgICAgdmFyIHN0YXRlbWVudHNfMSA9IFtdO1xuICAgICAgICB2YXIgdmFsdWVzXzEgPSBbXTtcbiAgICAgICAgbmFtZXMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSwgdGhpbmcpIHtcbiAgICAgICAgICAgIHBhcmFtc18xLnB1c2gobmFtZSk7XG4gICAgICAgICAgICBpZiAoaXNQcmltaXRpdmUodGhpbmcpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaChzdHJpbmdpZnlQcmltaXRpdmUodGhpbmcpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdHlwZSA9IGdldFR5cGUodGhpbmcpO1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnTnVtYmVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICdTdHJpbmcnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNfMS5wdXNoKFwiT2JqZWN0KFwiICsgc3RyaW5naWZ5KHRoaW5nLnZhbHVlT2YoKSkgKyBcIilcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1JlZ0V4cCc6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc18xLnB1c2godGhpbmcudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0RhdGUnOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNfMS5wdXNoKFwibmV3IERhdGUoXCIgKyB0aGluZy5nZXRUaW1lKCkgKyBcIilcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0FycmF5JzpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaChcIkFycmF5KFwiICsgdGhpbmcubGVuZ3RoICsgXCIpXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGluZy5mb3JFYWNoKGZ1bmN0aW9uICh2LCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnRzXzEucHVzaChuYW1lICsgXCJbXCIgKyBpICsgXCJdPVwiICsgc3RyaW5naWZ5KHYpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1NldCc6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc18xLnB1c2goXCJuZXcgU2V0XCIpO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnRzXzEucHVzaChuYW1lICsgXCIuXCIgKyBBcnJheS5mcm9tKHRoaW5nKS5tYXAoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFwiYWRkKFwiICsgc3RyaW5naWZ5KHYpICsgXCIpXCI7IH0pLmpvaW4oJy4nKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ01hcCc6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc18xLnB1c2goXCJuZXcgTWFwXCIpO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnRzXzEucHVzaChuYW1lICsgXCIuXCIgKyBBcnJheS5mcm9tKHRoaW5nKS5tYXAoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgayA9IF9hWzBdLCB2ID0gX2FbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzZXQoXCIgKyBzdHJpbmdpZnkoaykgKyBcIiwgXCIgKyBzdHJpbmdpZnkodikgKyBcIilcIjtcbiAgICAgICAgICAgICAgICAgICAgfSkuam9pbignLicpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaChPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpbmcpID09PSBudWxsID8gJ09iamVjdC5jcmVhdGUobnVsbCknIDogJ3t9Jyk7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaW5nKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHNfMS5wdXNoKFwiXCIgKyBuYW1lICsgc2FmZVByb3Aoa2V5KSArIFwiPVwiICsgc3RyaW5naWZ5KHRoaW5nW2tleV0pKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzdGF0ZW1lbnRzXzEucHVzaChcInJldHVybiBcIiArIHN0cik7XG4gICAgICAgIHJldHVybiBcIihmdW5jdGlvbihcIiArIHBhcmFtc18xLmpvaW4oJywnKSArIFwiKXtcIiArIHN0YXRlbWVudHNfMS5qb2luKCc7JykgKyBcIn0oXCIgKyB2YWx1ZXNfMS5qb2luKCcsJykgKyBcIikpXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldE5hbWUobnVtKSB7XG4gICAgdmFyIG5hbWUgPSAnJztcbiAgICBkbyB7XG4gICAgICAgIG5hbWUgPSBjaGFyc1tudW0gJSBjaGFycy5sZW5ndGhdICsgbmFtZTtcbiAgICAgICAgbnVtID0gfn4obnVtIC8gY2hhcnMubGVuZ3RoKSAtIDE7XG4gICAgfSB3aGlsZSAobnVtID49IDApO1xuICAgIHJldHVybiByZXNlcnZlZC50ZXN0KG5hbWUpID8gbmFtZSArIFwiX1wiIDogbmFtZTtcbn1cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKHRoaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdCh0aGluZykgIT09IHRoaW5nO1xufVxuZnVuY3Rpb24gc3RyaW5naWZ5UHJpbWl0aXZlKHRoaW5nKSB7XG4gICAgaWYgKHR5cGVvZiB0aGluZyA9PT0gJ3N0cmluZycpXG4gICAgICAgIHJldHVybiBzdHJpbmdpZnlTdHJpbmcodGhpbmcpO1xuICAgIGlmICh0aGluZyA9PT0gdm9pZCAwKVxuICAgICAgICByZXR1cm4gJ3ZvaWQgMCc7XG4gICAgaWYgKHRoaW5nID09PSAwICYmIDEgLyB0aGluZyA8IDApXG4gICAgICAgIHJldHVybiAnLTAnO1xuICAgIHZhciBzdHIgPSBTdHJpbmcodGhpbmcpO1xuICAgIGlmICh0eXBlb2YgdGhpbmcgPT09ICdudW1iZXInKVxuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL14oLSk/MFxcLi8sICckMS4nKTtcbiAgICByZXR1cm4gc3RyO1xufVxuZnVuY3Rpb24gZ2V0VHlwZSh0aGluZykge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpbmcpLnNsaWNlKDgsIC0xKTtcbn1cbmZ1bmN0aW9uIGVzY2FwZVVuc2FmZUNoYXIoYykge1xuICAgIHJldHVybiBlc2NhcGVkW2NdIHx8IGM7XG59XG5mdW5jdGlvbiBlc2NhcGVVbnNhZmVDaGFycyhzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UodW5zYWZlQ2hhcnMsIGVzY2FwZVVuc2FmZUNoYXIpO1xufVxuZnVuY3Rpb24gc2FmZUtleShrZXkpIHtcbiAgICByZXR1cm4gL15bXyRhLXpBLVpdW18kYS16QS1aMC05XSokLy50ZXN0KGtleSkgPyBrZXkgOiBlc2NhcGVVbnNhZmVDaGFycyhKU09OLnN0cmluZ2lmeShrZXkpKTtcbn1cbmZ1bmN0aW9uIHNhZmVQcm9wKGtleSkge1xuICAgIHJldHVybiAvXltfJGEtekEtWl1bXyRhLXpBLVowLTldKiQvLnRlc3Qoa2V5KSA/IFwiLlwiICsga2V5IDogXCJbXCIgKyBlc2NhcGVVbnNhZmVDaGFycyhKU09OLnN0cmluZ2lmeShrZXkpKSArIFwiXVwiO1xufVxuZnVuY3Rpb24gc3RyaW5naWZ5U3RyaW5nKHN0cikge1xuICAgIHZhciByZXN1bHQgPSAnXCInO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHZhciBjaGFyID0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgdmFyIGNvZGUgPSBjaGFyLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIGlmIChjaGFyID09PSAnXCInKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gJ1xcXFxcIic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hhciBpbiBlc2NhcGVkKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gZXNjYXBlZFtjaGFyXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2RlID49IDB4ZDgwMCAmJiBjb2RlIDw9IDB4ZGZmZikge1xuICAgICAgICAgICAgdmFyIG5leHQgPSBzdHIuY2hhckNvZGVBdChpICsgMSk7XG4gICAgICAgICAgICAvLyBJZiB0aGlzIGlzIHRoZSBiZWdpbm5pbmcgb2YgYSBbaGlnaCwgbG93XSBzdXJyb2dhdGUgcGFpcixcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgbmV4dCB0d28gY2hhcmFjdGVycywgb3RoZXJ3aXNlIGVzY2FwZVxuICAgICAgICAgICAgaWYgKGNvZGUgPD0gMHhkYmZmICYmIChuZXh0ID49IDB4ZGMwMCAmJiBuZXh0IDw9IDB4ZGZmZikpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gY2hhciArIHN0clsrK2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiXFxcXHVcIiArIGNvZGUudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gY2hhcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQgKz0gJ1wiJztcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBCYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vdG1wdmFyL2pzZG9tL2Jsb2IvYWE4NWIyYWJmMDc3NjZmZjdiZjVjMWY2ZGFhZmIzNzI2ZjJmMmRiNS9saWIvanNkb20vbGl2aW5nL2Jsb2IuanNcblxuLy8gZml4IGZvciBcIlJlYWRhYmxlXCIgaXNuJ3QgYSBuYW1lZCBleHBvcnQgaXNzdWVcbmNvbnN0IFJlYWRhYmxlID0gU3RyZWFtLlJlYWRhYmxlO1xuXG5jb25zdCBCVUZGRVIgPSBTeW1ib2woJ2J1ZmZlcicpO1xuY29uc3QgVFlQRSA9IFN5bWJvbCgndHlwZScpO1xuXG5jbGFzcyBCbG9iIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpc1tUWVBFXSA9ICcnO1xuXG5cdFx0Y29uc3QgYmxvYlBhcnRzID0gYXJndW1lbnRzWzBdO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSBhcmd1bWVudHNbMV07XG5cblx0XHRjb25zdCBidWZmZXJzID0gW107XG5cdFx0bGV0IHNpemUgPSAwO1xuXG5cdFx0aWYgKGJsb2JQYXJ0cykge1xuXHRcdFx0Y29uc3QgYSA9IGJsb2JQYXJ0cztcblx0XHRcdGNvbnN0IGxlbmd0aCA9IE51bWJlcihhLmxlbmd0aCk7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSBhW2ldO1xuXHRcdFx0XHRsZXQgYnVmZmVyO1xuXHRcdFx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEJ1ZmZlcikge1xuXHRcdFx0XHRcdGJ1ZmZlciA9IGVsZW1lbnQ7XG5cdFx0XHRcdH0gZWxzZSBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KGVsZW1lbnQpKSB7XG5cdFx0XHRcdFx0YnVmZmVyID0gQnVmZmVyLmZyb20oZWxlbWVudC5idWZmZXIsIGVsZW1lbnQuYnl0ZU9mZnNldCwgZWxlbWVudC5ieXRlTGVuZ3RoKTtcblx0XHRcdFx0fSBlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcblx0XHRcdFx0XHRidWZmZXIgPSBCdWZmZXIuZnJvbShlbGVtZW50KTtcblx0XHRcdFx0fSBlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgQmxvYikge1xuXHRcdFx0XHRcdGJ1ZmZlciA9IGVsZW1lbnRbQlVGRkVSXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRidWZmZXIgPSBCdWZmZXIuZnJvbSh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgPyBlbGVtZW50IDogU3RyaW5nKGVsZW1lbnQpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzaXplICs9IGJ1ZmZlci5sZW5ndGg7XG5cdFx0XHRcdGJ1ZmZlcnMucHVzaChidWZmZXIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXNbQlVGRkVSXSA9IEJ1ZmZlci5jb25jYXQoYnVmZmVycyk7XG5cblx0XHRsZXQgdHlwZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy50eXBlICE9PSB1bmRlZmluZWQgJiYgU3RyaW5nKG9wdGlvbnMudHlwZSkudG9Mb3dlckNhc2UoKTtcblx0XHRpZiAodHlwZSAmJiAhL1teXFx1MDAyMC1cXHUwMDdFXS8udGVzdCh0eXBlKSkge1xuXHRcdFx0dGhpc1tUWVBFXSA9IHR5cGU7XG5cdFx0fVxuXHR9XG5cdGdldCBzaXplKCkge1xuXHRcdHJldHVybiB0aGlzW0JVRkZFUl0ubGVuZ3RoO1xuXHR9XG5cdGdldCB0eXBlKCkge1xuXHRcdHJldHVybiB0aGlzW1RZUEVdO1xuXHR9XG5cdHRleHQoKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzW0JVRkZFUl0udG9TdHJpbmcoKSk7XG5cdH1cblx0YXJyYXlCdWZmZXIoKSB7XG5cdFx0Y29uc3QgYnVmID0gdGhpc1tCVUZGRVJdO1xuXHRcdGNvbnN0IGFiID0gYnVmLmJ1ZmZlci5zbGljZShidWYuYnl0ZU9mZnNldCwgYnVmLmJ5dGVPZmZzZXQgKyBidWYuYnl0ZUxlbmd0aCk7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhYik7XG5cdH1cblx0c3RyZWFtKCkge1xuXHRcdGNvbnN0IHJlYWRhYmxlID0gbmV3IFJlYWRhYmxlKCk7XG5cdFx0cmVhZGFibGUuX3JlYWQgPSBmdW5jdGlvbiAoKSB7fTtcblx0XHRyZWFkYWJsZS5wdXNoKHRoaXNbQlVGRkVSXSk7XG5cdFx0cmVhZGFibGUucHVzaChudWxsKTtcblx0XHRyZXR1cm4gcmVhZGFibGU7XG5cdH1cblx0dG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuICdbb2JqZWN0IEJsb2JdJztcblx0fVxuXHRzbGljZSgpIHtcblx0XHRjb25zdCBzaXplID0gdGhpcy5zaXplO1xuXG5cdFx0Y29uc3Qgc3RhcnQgPSBhcmd1bWVudHNbMF07XG5cdFx0Y29uc3QgZW5kID0gYXJndW1lbnRzWzFdO1xuXHRcdGxldCByZWxhdGl2ZVN0YXJ0LCByZWxhdGl2ZUVuZDtcblx0XHRpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmVsYXRpdmVTdGFydCA9IDA7XG5cdFx0fSBlbHNlIGlmIChzdGFydCA8IDApIHtcblx0XHRcdHJlbGF0aXZlU3RhcnQgPSBNYXRoLm1heChzaXplICsgc3RhcnQsIDApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZWxhdGl2ZVN0YXJ0ID0gTWF0aC5taW4oc3RhcnQsIHNpemUpO1xuXHRcdH1cblx0XHRpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJlbGF0aXZlRW5kID0gc2l6ZTtcblx0XHR9IGVsc2UgaWYgKGVuZCA8IDApIHtcblx0XHRcdHJlbGF0aXZlRW5kID0gTWF0aC5tYXgoc2l6ZSArIGVuZCwgMCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbGF0aXZlRW5kID0gTWF0aC5taW4oZW5kLCBzaXplKTtcblx0XHR9XG5cdFx0Y29uc3Qgc3BhbiA9IE1hdGgubWF4KHJlbGF0aXZlRW5kIC0gcmVsYXRpdmVTdGFydCwgMCk7XG5cblx0XHRjb25zdCBidWZmZXIgPSB0aGlzW0JVRkZFUl07XG5cdFx0Y29uc3Qgc2xpY2VkQnVmZmVyID0gYnVmZmVyLnNsaWNlKHJlbGF0aXZlU3RhcnQsIHJlbGF0aXZlU3RhcnQgKyBzcGFuKTtcblx0XHRjb25zdCBibG9iID0gbmV3IEJsb2IoW10sIHsgdHlwZTogYXJndW1lbnRzWzJdIH0pO1xuXHRcdGJsb2JbQlVGRkVSXSA9IHNsaWNlZEJ1ZmZlcjtcblx0XHRyZXR1cm4gYmxvYjtcblx0fVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhCbG9iLnByb3RvdHlwZSwge1xuXHRzaXplOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0dHlwZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHNsaWNlOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShCbG9iLnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG5cdHZhbHVlOiAnQmxvYicsXG5cdHdyaXRhYmxlOiBmYWxzZSxcblx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdGNvbmZpZ3VyYWJsZTogdHJ1ZVxufSk7XG5cbi8qKlxuICogZmV0Y2gtZXJyb3IuanNcbiAqXG4gKiBGZXRjaEVycm9yIGludGVyZmFjZSBmb3Igb3BlcmF0aW9uYWwgZXJyb3JzXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgRmV0Y2hFcnJvciBpbnN0YW5jZVxuICpcbiAqIEBwYXJhbSAgIFN0cmluZyAgICAgIG1lc3NhZ2UgICAgICBFcnJvciBtZXNzYWdlIGZvciBodW1hblxuICogQHBhcmFtICAgU3RyaW5nICAgICAgdHlwZSAgICAgICAgIEVycm9yIHR5cGUgZm9yIG1hY2hpbmVcbiAqIEBwYXJhbSAgIFN0cmluZyAgICAgIHN5c3RlbUVycm9yICBGb3IgTm9kZS5qcyBzeXN0ZW0gZXJyb3JcbiAqIEByZXR1cm4gIEZldGNoRXJyb3JcbiAqL1xuZnVuY3Rpb24gRmV0Y2hFcnJvcihtZXNzYWdlLCB0eXBlLCBzeXN0ZW1FcnJvcikge1xuICBFcnJvci5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuXG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgLy8gd2hlbiBlcnIudHlwZSBpcyBgc3lzdGVtYCwgZXJyLmNvZGUgY29udGFpbnMgc3lzdGVtIGVycm9yIGNvZGVcbiAgaWYgKHN5c3RlbUVycm9yKSB7XG4gICAgdGhpcy5jb2RlID0gdGhpcy5lcnJubyA9IHN5c3RlbUVycm9yLmNvZGU7XG4gIH1cblxuICAvLyBoaWRlIGN1c3RvbSBlcnJvciBpbXBsZW1lbnRhdGlvbiBkZXRhaWxzIGZyb20gZW5kLXVzZXJzXG4gIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xufVxuXG5GZXRjaEVycm9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKTtcbkZldGNoRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRmV0Y2hFcnJvcjtcbkZldGNoRXJyb3IucHJvdG90eXBlLm5hbWUgPSAnRmV0Y2hFcnJvcic7XG5cbmxldCBjb252ZXJ0O1xudHJ5IHtcblx0Y29udmVydCA9IHJlcXVpcmUoJ2VuY29kaW5nJykuY29udmVydDtcbn0gY2F0Y2ggKGUpIHt9XG5cbmNvbnN0IElOVEVSTkFMUyA9IFN5bWJvbCgnQm9keSBpbnRlcm5hbHMnKTtcblxuLy8gZml4IGFuIGlzc3VlIHdoZXJlIFwiUGFzc1Rocm91Z2hcIiBpc24ndCBhIG5hbWVkIGV4cG9ydCBmb3Igbm9kZSA8MTBcbmNvbnN0IFBhc3NUaHJvdWdoID0gU3RyZWFtLlBhc3NUaHJvdWdoO1xuXG4vKipcbiAqIEJvZHkgbWl4aW5cbiAqXG4gKiBSZWY6IGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNib2R5XG4gKlxuICogQHBhcmFtICAgU3RyZWFtICBib2R5ICBSZWFkYWJsZSBzdHJlYW1cbiAqIEBwYXJhbSAgIE9iamVjdCAgb3B0cyAgUmVzcG9uc2Ugb3B0aW9uc1xuICogQHJldHVybiAgVm9pZFxuICovXG5mdW5jdGlvbiBCb2R5KGJvZHkpIHtcblx0dmFyIF90aGlzID0gdGhpcztcblxuXHR2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge30sXG5cdCAgICBfcmVmJHNpemUgPSBfcmVmLnNpemU7XG5cblx0bGV0IHNpemUgPSBfcmVmJHNpemUgPT09IHVuZGVmaW5lZCA/IDAgOiBfcmVmJHNpemU7XG5cdHZhciBfcmVmJHRpbWVvdXQgPSBfcmVmLnRpbWVvdXQ7XG5cdGxldCB0aW1lb3V0ID0gX3JlZiR0aW1lb3V0ID09PSB1bmRlZmluZWQgPyAwIDogX3JlZiR0aW1lb3V0O1xuXG5cdGlmIChib2R5ID09IG51bGwpIHtcblx0XHQvLyBib2R5IGlzIHVuZGVmaW5lZCBvciBudWxsXG5cdFx0Ym9keSA9IG51bGw7XG5cdH0gZWxzZSBpZiAoaXNVUkxTZWFyY2hQYXJhbXMoYm9keSkpIHtcblx0XHQvLyBib2R5IGlzIGEgVVJMU2VhcmNoUGFyYW1zXG5cdFx0Ym9keSA9IEJ1ZmZlci5mcm9tKGJvZHkudG9TdHJpbmcoKSk7XG5cdH0gZWxzZSBpZiAoaXNCbG9iKGJvZHkpKSA7IGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkgOyBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYm9keSkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXScpIHtcblx0XHQvLyBib2R5IGlzIEFycmF5QnVmZmVyXG5cdFx0Ym9keSA9IEJ1ZmZlci5mcm9tKGJvZHkpO1xuXHR9IGVsc2UgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhib2R5KSkge1xuXHRcdC8vIGJvZHkgaXMgQXJyYXlCdWZmZXJWaWV3XG5cdFx0Ym9keSA9IEJ1ZmZlci5mcm9tKGJvZHkuYnVmZmVyLCBib2R5LmJ5dGVPZmZzZXQsIGJvZHkuYnl0ZUxlbmd0aCk7XG5cdH0gZWxzZSBpZiAoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSkgOyBlbHNlIHtcblx0XHQvLyBub25lIG9mIHRoZSBhYm92ZVxuXHRcdC8vIGNvZXJjZSB0byBzdHJpbmcgdGhlbiBidWZmZXJcblx0XHRib2R5ID0gQnVmZmVyLmZyb20oU3RyaW5nKGJvZHkpKTtcblx0fVxuXHR0aGlzW0lOVEVSTkFMU10gPSB7XG5cdFx0Ym9keSxcblx0XHRkaXN0dXJiZWQ6IGZhbHNlLFxuXHRcdGVycm9yOiBudWxsXG5cdH07XG5cdHRoaXMuc2l6ZSA9IHNpemU7XG5cdHRoaXMudGltZW91dCA9IHRpbWVvdXQ7XG5cblx0aWYgKGJvZHkgaW5zdGFuY2VvZiBTdHJlYW0pIHtcblx0XHRib2R5Lm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdGNvbnN0IGVycm9yID0gZXJyLm5hbWUgPT09ICdBYm9ydEVycm9yJyA/IGVyciA6IG5ldyBGZXRjaEVycm9yKGBJbnZhbGlkIHJlc3BvbnNlIGJvZHkgd2hpbGUgdHJ5aW5nIHRvIGZldGNoICR7X3RoaXMudXJsfTogJHtlcnIubWVzc2FnZX1gLCAnc3lzdGVtJywgZXJyKTtcblx0XHRcdF90aGlzW0lOVEVSTkFMU10uZXJyb3IgPSBlcnJvcjtcblx0XHR9KTtcblx0fVxufVxuXG5Cb2R5LnByb3RvdHlwZSA9IHtcblx0Z2V0IGJvZHkoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTXS5ib2R5O1xuXHR9LFxuXG5cdGdldCBib2R5VXNlZCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFNdLmRpc3R1cmJlZDtcblx0fSxcblxuXHQvKipcbiAgKiBEZWNvZGUgcmVzcG9uc2UgYXMgQXJyYXlCdWZmZXJcbiAgKlxuICAqIEByZXR1cm4gIFByb21pc2VcbiAgKi9cblx0YXJyYXlCdWZmZXIoKSB7XG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5LmNhbGwodGhpcykudGhlbihmdW5jdGlvbiAoYnVmKSB7XG5cdFx0XHRyZXR1cm4gYnVmLmJ1ZmZlci5zbGljZShidWYuYnl0ZU9mZnNldCwgYnVmLmJ5dGVPZmZzZXQgKyBidWYuYnl0ZUxlbmd0aCk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqXG4gICogUmV0dXJuIHJhdyByZXNwb25zZSBhcyBCbG9iXG4gICpcbiAgKiBAcmV0dXJuIFByb21pc2VcbiAgKi9cblx0YmxvYigpIHtcblx0XHRsZXQgY3QgPSB0aGlzLmhlYWRlcnMgJiYgdGhpcy5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykgfHwgJyc7XG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5LmNhbGwodGhpcykudGhlbihmdW5jdGlvbiAoYnVmKSB7XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihcblx0XHRcdC8vIFByZXZlbnQgY29weWluZ1xuXHRcdFx0bmV3IEJsb2IoW10sIHtcblx0XHRcdFx0dHlwZTogY3QudG9Mb3dlckNhc2UoKVxuXHRcdFx0fSksIHtcblx0XHRcdFx0W0JVRkZFUl06IGJ1ZlxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqXG4gICogRGVjb2RlIHJlc3BvbnNlIGFzIGpzb25cbiAgKlxuICAqIEByZXR1cm4gIFByb21pc2VcbiAgKi9cblx0anNvbigpIHtcblx0XHR2YXIgX3RoaXMyID0gdGhpcztcblxuXHRcdHJldHVybiBjb25zdW1lQm9keS5jYWxsKHRoaXMpLnRoZW4oZnVuY3Rpb24gKGJ1ZmZlcikge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0cmV0dXJuIEpTT04ucGFyc2UoYnVmZmVyLnRvU3RyaW5nKCkpO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdHJldHVybiBCb2R5LlByb21pc2UucmVqZWN0KG5ldyBGZXRjaEVycm9yKGBpbnZhbGlkIGpzb24gcmVzcG9uc2UgYm9keSBhdCAke190aGlzMi51cmx9IHJlYXNvbjogJHtlcnIubWVzc2FnZX1gLCAnaW52YWxpZC1qc29uJykpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXG5cdC8qKlxuICAqIERlY29kZSByZXNwb25zZSBhcyB0ZXh0XG4gICpcbiAgKiBAcmV0dXJuICBQcm9taXNlXG4gICovXG5cdHRleHQoKSB7XG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5LmNhbGwodGhpcykudGhlbihmdW5jdGlvbiAoYnVmZmVyKSB7XG5cdFx0XHRyZXR1cm4gYnVmZmVyLnRvU3RyaW5nKCk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqXG4gICogRGVjb2RlIHJlc3BvbnNlIGFzIGJ1ZmZlciAobm9uLXNwZWMgYXBpKVxuICAqXG4gICogQHJldHVybiAgUHJvbWlzZVxuICAqL1xuXHRidWZmZXIoKSB7XG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5LmNhbGwodGhpcyk7XG5cdH0sXG5cblx0LyoqXG4gICogRGVjb2RlIHJlc3BvbnNlIGFzIHRleHQsIHdoaWxlIGF1dG9tYXRpY2FsbHkgZGV0ZWN0aW5nIHRoZSBlbmNvZGluZyBhbmRcbiAgKiB0cnlpbmcgdG8gZGVjb2RlIHRvIFVURi04IChub24tc3BlYyBhcGkpXG4gICpcbiAgKiBAcmV0dXJuICBQcm9taXNlXG4gICovXG5cdHRleHRDb252ZXJ0ZWQoKSB7XG5cdFx0dmFyIF90aGlzMyA9IHRoaXM7XG5cblx0XHRyZXR1cm4gY29uc3VtZUJvZHkuY2FsbCh0aGlzKS50aGVuKGZ1bmN0aW9uIChidWZmZXIpIHtcblx0XHRcdHJldHVybiBjb252ZXJ0Qm9keShidWZmZXIsIF90aGlzMy5oZWFkZXJzKTtcblx0XHR9KTtcblx0fVxufTtcblxuLy8gSW4gYnJvd3NlcnMsIGFsbCBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhYmxlLlxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQm9keS5wcm90b3R5cGUsIHtcblx0Ym9keTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGJvZHlVc2VkOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0YXJyYXlCdWZmZXI6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRibG9iOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0anNvbjogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHRleHQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcblxuQm9keS5taXhJbiA9IGZ1bmN0aW9uIChwcm90bykge1xuXHRmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoQm9keS5wcm90b3R5cGUpKSB7XG5cdFx0Ly8gaXN0YW5idWwgaWdub3JlIGVsc2U6IGZ1dHVyZSBwcm9vZlxuXHRcdGlmICghKG5hbWUgaW4gcHJvdG8pKSB7XG5cdFx0XHRjb25zdCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihCb2R5LnByb3RvdHlwZSwgbmFtZSk7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sIG5hbWUsIGRlc2MpO1xuXHRcdH1cblx0fVxufTtcblxuLyoqXG4gKiBDb25zdW1lIGFuZCBjb252ZXJ0IGFuIGVudGlyZSBCb2R5IHRvIGEgQnVmZmVyLlxuICpcbiAqIFJlZjogaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2NvbmNlcHQtYm9keS1jb25zdW1lLWJvZHlcbiAqXG4gKiBAcmV0dXJuICBQcm9taXNlXG4gKi9cbmZ1bmN0aW9uIGNvbnN1bWVCb2R5KCkge1xuXHR2YXIgX3RoaXM0ID0gdGhpcztcblxuXHRpZiAodGhpc1tJTlRFUk5BTFNdLmRpc3R1cmJlZCkge1xuXHRcdHJldHVybiBCb2R5LlByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoYGJvZHkgdXNlZCBhbHJlYWR5IGZvcjogJHt0aGlzLnVybH1gKSk7XG5cdH1cblxuXHR0aGlzW0lOVEVSTkFMU10uZGlzdHVyYmVkID0gdHJ1ZTtcblxuXHRpZiAodGhpc1tJTlRFUk5BTFNdLmVycm9yKSB7XG5cdFx0cmV0dXJuIEJvZHkuUHJvbWlzZS5yZWplY3QodGhpc1tJTlRFUk5BTFNdLmVycm9yKTtcblx0fVxuXG5cdGxldCBib2R5ID0gdGhpcy5ib2R5O1xuXG5cdC8vIGJvZHkgaXMgbnVsbFxuXHRpZiAoYm9keSA9PT0gbnVsbCkge1xuXHRcdHJldHVybiBCb2R5LlByb21pc2UucmVzb2x2ZShCdWZmZXIuYWxsb2MoMCkpO1xuXHR9XG5cblx0Ly8gYm9keSBpcyBibG9iXG5cdGlmIChpc0Jsb2IoYm9keSkpIHtcblx0XHRib2R5ID0gYm9keS5zdHJlYW0oKTtcblx0fVxuXG5cdC8vIGJvZHkgaXMgYnVmZmVyXG5cdGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIHtcblx0XHRyZXR1cm4gQm9keS5Qcm9taXNlLnJlc29sdmUoYm9keSk7XG5cdH1cblxuXHQvLyBpc3RhbmJ1bCBpZ25vcmUgaWY6IHNob3VsZCBuZXZlciBoYXBwZW5cblx0aWYgKCEoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSkpIHtcblx0XHRyZXR1cm4gQm9keS5Qcm9taXNlLnJlc29sdmUoQnVmZmVyLmFsbG9jKDApKTtcblx0fVxuXG5cdC8vIGJvZHkgaXMgc3RyZWFtXG5cdC8vIGdldCByZWFkeSB0byBhY3R1YWxseSBjb25zdW1lIHRoZSBib2R5XG5cdGxldCBhY2N1bSA9IFtdO1xuXHRsZXQgYWNjdW1CeXRlcyA9IDA7XG5cdGxldCBhYm9ydCA9IGZhbHNlO1xuXG5cdHJldHVybiBuZXcgQm9keS5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblx0XHRsZXQgcmVzVGltZW91dDtcblxuXHRcdC8vIGFsbG93IHRpbWVvdXQgb24gc2xvdyByZXNwb25zZSBib2R5XG5cdFx0aWYgKF90aGlzNC50aW1lb3V0KSB7XG5cdFx0XHRyZXNUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGFib3J0ID0gdHJ1ZTtcblx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGBSZXNwb25zZSB0aW1lb3V0IHdoaWxlIHRyeWluZyB0byBmZXRjaCAke190aGlzNC51cmx9IChvdmVyICR7X3RoaXM0LnRpbWVvdXR9bXMpYCwgJ2JvZHktdGltZW91dCcpKTtcblx0XHRcdH0sIF90aGlzNC50aW1lb3V0KTtcblx0XHR9XG5cblx0XHQvLyBoYW5kbGUgc3RyZWFtIGVycm9yc1xuXHRcdGJvZHkub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuXHRcdFx0aWYgKGVyci5uYW1lID09PSAnQWJvcnRFcnJvcicpIHtcblx0XHRcdFx0Ly8gaWYgdGhlIHJlcXVlc3Qgd2FzIGFib3J0ZWQsIHJlamVjdCB3aXRoIHRoaXMgRXJyb3Jcblx0XHRcdFx0YWJvcnQgPSB0cnVlO1xuXHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIG90aGVyIGVycm9ycywgc3VjaCBhcyBpbmNvcnJlY3QgY29udGVudC1lbmNvZGluZ1xuXHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYEludmFsaWQgcmVzcG9uc2UgYm9keSB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggJHtfdGhpczQudXJsfTogJHtlcnIubWVzc2FnZX1gLCAnc3lzdGVtJywgZXJyKSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRib2R5Lm9uKCdkYXRhJywgZnVuY3Rpb24gKGNodW5rKSB7XG5cdFx0XHRpZiAoYWJvcnQgfHwgY2h1bmsgPT09IG51bGwpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoX3RoaXM0LnNpemUgJiYgYWNjdW1CeXRlcyArIGNodW5rLmxlbmd0aCA+IF90aGlzNC5zaXplKSB7XG5cdFx0XHRcdGFib3J0ID0gdHJ1ZTtcblx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGBjb250ZW50IHNpemUgYXQgJHtfdGhpczQudXJsfSBvdmVyIGxpbWl0OiAke190aGlzNC5zaXplfWAsICdtYXgtc2l6ZScpKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRhY2N1bUJ5dGVzICs9IGNodW5rLmxlbmd0aDtcblx0XHRcdGFjY3VtLnB1c2goY2h1bmspO1xuXHRcdH0pO1xuXG5cdFx0Ym9keS5vbignZW5kJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKGFib3J0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Y2xlYXJUaW1lb3V0KHJlc1RpbWVvdXQpO1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRyZXNvbHZlKEJ1ZmZlci5jb25jYXQoYWNjdW0sIGFjY3VtQnl0ZXMpKTtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHQvLyBoYW5kbGUgc3RyZWFtcyB0aGF0IGhhdmUgYWNjdW11bGF0ZWQgdG9vIG11Y2ggZGF0YSAoaXNzdWUgIzQxNClcblx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGBDb3VsZCBub3QgY3JlYXRlIEJ1ZmZlciBmcm9tIHJlc3BvbnNlIGJvZHkgZm9yICR7X3RoaXM0LnVybH06ICR7ZXJyLm1lc3NhZ2V9YCwgJ3N5c3RlbScsIGVycikpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcbn1cblxuLyoqXG4gKiBEZXRlY3QgYnVmZmVyIGVuY29kaW5nIGFuZCBjb252ZXJ0IHRvIHRhcmdldCBlbmNvZGluZ1xuICogcmVmOiBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1dELWh0bWw1LTIwMTEwMTEzL3BhcnNpbmcuaHRtbCNkZXRlcm1pbmluZy10aGUtY2hhcmFjdGVyLWVuY29kaW5nXG4gKlxuICogQHBhcmFtICAgQnVmZmVyICBidWZmZXIgICAgSW5jb21pbmcgYnVmZmVyXG4gKiBAcGFyYW0gICBTdHJpbmcgIGVuY29kaW5nICBUYXJnZXQgZW5jb2RpbmdcbiAqIEByZXR1cm4gIFN0cmluZ1xuICovXG5mdW5jdGlvbiBjb252ZXJ0Qm9keShidWZmZXIsIGhlYWRlcnMpIHtcblx0aWYgKHR5cGVvZiBjb252ZXJ0ICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgcGFja2FnZSBgZW5jb2RpbmdgIG11c3QgYmUgaW5zdGFsbGVkIHRvIHVzZSB0aGUgdGV4dENvbnZlcnRlZCgpIGZ1bmN0aW9uJyk7XG5cdH1cblxuXHRjb25zdCBjdCA9IGhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKTtcblx0bGV0IGNoYXJzZXQgPSAndXRmLTgnO1xuXHRsZXQgcmVzLCBzdHI7XG5cblx0Ly8gaGVhZGVyXG5cdGlmIChjdCkge1xuXHRcdHJlcyA9IC9jaGFyc2V0PShbXjtdKikvaS5leGVjKGN0KTtcblx0fVxuXG5cdC8vIG5vIGNoYXJzZXQgaW4gY29udGVudCB0eXBlLCBwZWVrIGF0IHJlc3BvbnNlIGJvZHkgZm9yIGF0IG1vc3QgMTAyNCBieXRlc1xuXHRzdHIgPSBidWZmZXIuc2xpY2UoMCwgMTAyNCkudG9TdHJpbmcoKTtcblxuXHQvLyBodG1sNVxuXHRpZiAoIXJlcyAmJiBzdHIpIHtcblx0XHRyZXMgPSAvPG1ldGEuKz9jaGFyc2V0PShbJ1wiXSkoLis/KVxcMS9pLmV4ZWMoc3RyKTtcblx0fVxuXG5cdC8vIGh0bWw0XG5cdGlmICghcmVzICYmIHN0cikge1xuXHRcdHJlcyA9IC88bWV0YVtcXHNdKz9odHRwLWVxdWl2PShbJ1wiXSljb250ZW50LXR5cGVcXDFbXFxzXSs/Y29udGVudD0oWydcIl0pKC4rPylcXDIvaS5leGVjKHN0cik7XG5cblx0XHRpZiAocmVzKSB7XG5cdFx0XHRyZXMgPSAvY2hhcnNldD0oLiopL2kuZXhlYyhyZXMucG9wKCkpO1xuXHRcdH1cblx0fVxuXG5cdC8vIHhtbFxuXHRpZiAoIXJlcyAmJiBzdHIpIHtcblx0XHRyZXMgPSAvPFxcP3htbC4rP2VuY29kaW5nPShbJ1wiXSkoLis/KVxcMS9pLmV4ZWMoc3RyKTtcblx0fVxuXG5cdC8vIGZvdW5kIGNoYXJzZXRcblx0aWYgKHJlcykge1xuXHRcdGNoYXJzZXQgPSByZXMucG9wKCk7XG5cblx0XHQvLyBwcmV2ZW50IGRlY29kZSBpc3N1ZXMgd2hlbiBzaXRlcyB1c2UgaW5jb3JyZWN0IGVuY29kaW5nXG5cdFx0Ly8gcmVmOiBodHRwczovL2hzaXZvbmVuLmZpL2VuY29kaW5nLW1lbnUvXG5cdFx0aWYgKGNoYXJzZXQgPT09ICdnYjIzMTInIHx8IGNoYXJzZXQgPT09ICdnYmsnKSB7XG5cdFx0XHRjaGFyc2V0ID0gJ2diMTgwMzAnO1xuXHRcdH1cblx0fVxuXG5cdC8vIHR1cm4gcmF3IGJ1ZmZlcnMgaW50byBhIHNpbmdsZSB1dGYtOCBidWZmZXJcblx0cmV0dXJuIGNvbnZlcnQoYnVmZmVyLCAnVVRGLTgnLCBjaGFyc2V0KS50b1N0cmluZygpO1xufVxuXG4vKipcbiAqIERldGVjdCBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqIHJlZjogaHR0cHM6Ly9naXRodWIuY29tL2JpdGlubi9ub2RlLWZldGNoL2lzc3Vlcy8yOTYjaXNzdWVjb21tZW50LTMwNzU5ODE0M1xuICpcbiAqIEBwYXJhbSAgIE9iamVjdCAgb2JqICAgICBPYmplY3QgdG8gZGV0ZWN0IGJ5IHR5cGUgb3IgYnJhbmRcbiAqIEByZXR1cm4gIFN0cmluZ1xuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyhvYmopIHtcblx0Ly8gRHVjay10eXBpbmcgYXMgYSBuZWNlc3NhcnkgY29uZGl0aW9uLlxuXHRpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIG9iai5hcHBlbmQgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIG9iai5kZWxldGUgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIG9iai5nZXQgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIG9iai5nZXRBbGwgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIG9iai5oYXMgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIG9iai5zZXQgIT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBCcmFuZC1jaGVja2luZyBhbmQgbW9yZSBkdWNrLXR5cGluZyBhcyBvcHRpb25hbCBjb25kaXRpb24uXG5cdHJldHVybiBvYmouY29uc3RydWN0b3IubmFtZSA9PT0gJ1VSTFNlYXJjaFBhcmFtcycgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFVSTFNlYXJjaFBhcmFtc10nIHx8IHR5cGVvZiBvYmouc29ydCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhIFczQyBgQmxvYmAgb2JqZWN0ICh3aGljaCBgRmlsZWAgaW5oZXJpdHMgZnJvbSlcbiAqIEBwYXJhbSAgeyp9IG9ialxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNCbG9iKG9iaikge1xuXHRyZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai5hcnJheUJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnR5cGUgPT09ICdzdHJpbmcnICYmIHR5cGVvZiBvYmouc3RyZWFtID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmouY29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5uYW1lID09PSAnc3RyaW5nJyAmJiAvXihCbG9ifEZpbGUpJC8udGVzdChvYmouY29uc3RydWN0b3IubmFtZSkgJiYgL14oQmxvYnxGaWxlKSQvLnRlc3Qob2JqW1N5bWJvbC50b1N0cmluZ1RhZ10pO1xufVxuXG4vKipcbiAqIENsb25lIGJvZHkgZ2l2ZW4gUmVzL1JlcSBpbnN0YW5jZVxuICpcbiAqIEBwYXJhbSAgIE1peGVkICBpbnN0YW5jZSAgUmVzcG9uc2Ugb3IgUmVxdWVzdCBpbnN0YW5jZVxuICogQHJldHVybiAgTWl4ZWRcbiAqL1xuZnVuY3Rpb24gY2xvbmUoaW5zdGFuY2UpIHtcblx0bGV0IHAxLCBwMjtcblx0bGV0IGJvZHkgPSBpbnN0YW5jZS5ib2R5O1xuXG5cdC8vIGRvbid0IGFsbG93IGNsb25pbmcgYSB1c2VkIGJvZHlcblx0aWYgKGluc3RhbmNlLmJvZHlVc2VkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgY2xvbmUgYm9keSBhZnRlciBpdCBpcyB1c2VkJyk7XG5cdH1cblxuXHQvLyBjaGVjayB0aGF0IGJvZHkgaXMgYSBzdHJlYW0gYW5kIG5vdCBmb3JtLWRhdGEgb2JqZWN0XG5cdC8vIG5vdGU6IHdlIGNhbid0IGNsb25lIHRoZSBmb3JtLWRhdGEgb2JqZWN0IHdpdGhvdXQgaGF2aW5nIGl0IGFzIGEgZGVwZW5kZW5jeVxuXHRpZiAoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSAmJiB0eXBlb2YgYm9keS5nZXRCb3VuZGFyeSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdC8vIHRlZSBpbnN0YW5jZSBib2R5XG5cdFx0cDEgPSBuZXcgUGFzc1Rocm91Z2goKTtcblx0XHRwMiA9IG5ldyBQYXNzVGhyb3VnaCgpO1xuXHRcdGJvZHkucGlwZShwMSk7XG5cdFx0Ym9keS5waXBlKHAyKTtcblx0XHQvLyBzZXQgaW5zdGFuY2UgYm9keSB0byB0ZWVkIGJvZHkgYW5kIHJldHVybiB0aGUgb3RoZXIgdGVlZCBib2R5XG5cdFx0aW5zdGFuY2VbSU5URVJOQUxTXS5ib2R5ID0gcDE7XG5cdFx0Ym9keSA9IHAyO1xuXHR9XG5cblx0cmV0dXJuIGJvZHk7XG59XG5cbi8qKlxuICogUGVyZm9ybXMgdGhlIG9wZXJhdGlvbiBcImV4dHJhY3QgYSBgQ29udGVudC1UeXBlYCB2YWx1ZSBmcm9tIHxvYmplY3R8XCIgYXNcbiAqIHNwZWNpZmllZCBpbiB0aGUgc3BlY2lmaWNhdGlvbjpcbiAqIGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNjb25jZXB0LWJvZHlpbml0LWV4dHJhY3RcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBpbnN0YW5jZS5ib2R5IGlzIHByZXNlbnQuXG4gKlxuICogQHBhcmFtICAgTWl4ZWQgIGluc3RhbmNlICBBbnkgb3B0aW9ucy5ib2R5IGlucHV0XG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RDb250ZW50VHlwZShib2R5KSB7XG5cdGlmIChib2R5ID09PSBudWxsKSB7XG5cdFx0Ly8gYm9keSBpcyBudWxsXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG5cdFx0Ly8gYm9keSBpcyBzdHJpbmdcblx0XHRyZXR1cm4gJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCc7XG5cdH0gZWxzZSBpZiAoaXNVUkxTZWFyY2hQYXJhbXMoYm9keSkpIHtcblx0XHQvLyBib2R5IGlzIGEgVVJMU2VhcmNoUGFyYW1zXG5cdFx0cmV0dXJuICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD1VVEYtOCc7XG5cdH0gZWxzZSBpZiAoaXNCbG9iKGJvZHkpKSB7XG5cdFx0Ly8gYm9keSBpcyBibG9iXG5cdFx0cmV0dXJuIGJvZHkudHlwZSB8fCBudWxsO1xuXHR9IGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkge1xuXHRcdC8vIGJvZHkgaXMgYnVmZmVyXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGJvZHkpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nKSB7XG5cdFx0Ly8gYm9keSBpcyBBcnJheUJ1ZmZlclxuXHRcdHJldHVybiBudWxsO1xuXHR9IGVsc2UgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhib2R5KSkge1xuXHRcdC8vIGJvZHkgaXMgQXJyYXlCdWZmZXJWaWV3XG5cdFx0cmV0dXJuIG51bGw7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGJvZHkuZ2V0Qm91bmRhcnkgPT09ICdmdW5jdGlvbicpIHtcblx0XHQvLyBkZXRlY3QgZm9ybSBkYXRhIGlucHV0IGZyb20gZm9ybS1kYXRhIG1vZHVsZVxuXHRcdHJldHVybiBgbXVsdGlwYXJ0L2Zvcm0tZGF0YTtib3VuZGFyeT0ke2JvZHkuZ2V0Qm91bmRhcnkoKX1gO1xuXHR9IGVsc2UgaWYgKGJvZHkgaW5zdGFuY2VvZiBTdHJlYW0pIHtcblx0XHQvLyBib2R5IGlzIHN0cmVhbVxuXHRcdC8vIGNhbid0IHJlYWxseSBkbyBtdWNoIGFib3V0IHRoaXNcblx0XHRyZXR1cm4gbnVsbDtcblx0fSBlbHNlIHtcblx0XHQvLyBCb2R5IGNvbnN0cnVjdG9yIGRlZmF1bHRzIG90aGVyIHRoaW5ncyB0byBzdHJpbmdcblx0XHRyZXR1cm4gJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCc7XG5cdH1cbn1cblxuLyoqXG4gKiBUaGUgRmV0Y2ggU3RhbmRhcmQgdHJlYXRzIHRoaXMgYXMgaWYgXCJ0b3RhbCBieXRlc1wiIGlzIGEgcHJvcGVydHkgb24gdGhlIGJvZHkuXG4gKiBGb3IgdXMsIHdlIGhhdmUgdG8gZXhwbGljaXRseSBnZXQgaXQgd2l0aCBhIGZ1bmN0aW9uLlxuICpcbiAqIHJlZjogaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2NvbmNlcHQtYm9keS10b3RhbC1ieXRlc1xuICpcbiAqIEBwYXJhbSAgIEJvZHkgICAgaW5zdGFuY2UgICBJbnN0YW5jZSBvZiBCb2R5XG4gKiBAcmV0dXJuICBOdW1iZXI/ICAgICAgICAgICAgTnVtYmVyIG9mIGJ5dGVzLCBvciBudWxsIGlmIG5vdCBwb3NzaWJsZVxuICovXG5mdW5jdGlvbiBnZXRUb3RhbEJ5dGVzKGluc3RhbmNlKSB7XG5cdGNvbnN0IGJvZHkgPSBpbnN0YW5jZS5ib2R5O1xuXG5cblx0aWYgKGJvZHkgPT09IG51bGwpIHtcblx0XHQvLyBib2R5IGlzIG51bGxcblx0XHRyZXR1cm4gMDtcblx0fSBlbHNlIGlmIChpc0Jsb2IoYm9keSkpIHtcblx0XHRyZXR1cm4gYm9keS5zaXplO1xuXHR9IGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkge1xuXHRcdC8vIGJvZHkgaXMgYnVmZmVyXG5cdFx0cmV0dXJuIGJvZHkubGVuZ3RoO1xuXHR9IGVsc2UgaWYgKGJvZHkgJiYgdHlwZW9mIGJvZHkuZ2V0TGVuZ3RoU3luYyA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdC8vIGRldGVjdCBmb3JtIGRhdGEgaW5wdXQgZnJvbSBmb3JtLWRhdGEgbW9kdWxlXG5cdFx0aWYgKGJvZHkuX2xlbmd0aFJldHJpZXZlcnMgJiYgYm9keS5fbGVuZ3RoUmV0cmlldmVycy5sZW5ndGggPT0gMCB8fCAvLyAxLnhcblx0XHRib2R5Lmhhc0tub3duTGVuZ3RoICYmIGJvZHkuaGFzS25vd25MZW5ndGgoKSkge1xuXHRcdFx0Ly8gMi54XG5cdFx0XHRyZXR1cm4gYm9keS5nZXRMZW5ndGhTeW5jKCk7XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdC8vIGJvZHkgaXMgc3RyZWFtXG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cbn1cblxuLyoqXG4gKiBXcml0ZSBhIEJvZHkgdG8gYSBOb2RlLmpzIFdyaXRhYmxlU3RyZWFtIChlLmcuIGh0dHAuUmVxdWVzdCkgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSAgIEJvZHkgICAgaW5zdGFuY2UgICBJbnN0YW5jZSBvZiBCb2R5XG4gKiBAcmV0dXJuICBWb2lkXG4gKi9cbmZ1bmN0aW9uIHdyaXRlVG9TdHJlYW0oZGVzdCwgaW5zdGFuY2UpIHtcblx0Y29uc3QgYm9keSA9IGluc3RhbmNlLmJvZHk7XG5cblxuXHRpZiAoYm9keSA9PT0gbnVsbCkge1xuXHRcdC8vIGJvZHkgaXMgbnVsbFxuXHRcdGRlc3QuZW5kKCk7XG5cdH0gZWxzZSBpZiAoaXNCbG9iKGJvZHkpKSB7XG5cdFx0Ym9keS5zdHJlYW0oKS5waXBlKGRlc3QpO1xuXHR9IGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkge1xuXHRcdC8vIGJvZHkgaXMgYnVmZmVyXG5cdFx0ZGVzdC53cml0ZShib2R5KTtcblx0XHRkZXN0LmVuZCgpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIGJvZHkgaXMgc3RyZWFtXG5cdFx0Ym9keS5waXBlKGRlc3QpO1xuXHR9XG59XG5cbi8vIGV4cG9zZSBQcm9taXNlXG5Cb2R5LlByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcblxuLyoqXG4gKiBoZWFkZXJzLmpzXG4gKlxuICogSGVhZGVycyBjbGFzcyBvZmZlcnMgY29udmVuaWVudCBoZWxwZXJzXG4gKi9cblxuY29uc3QgaW52YWxpZFRva2VuUmVnZXggPSAvW15cXF5fYGEtekEtWlxcLTAtOSEjJCUmJyorLnx+XS87XG5jb25zdCBpbnZhbGlkSGVhZGVyQ2hhclJlZ2V4ID0gL1teXFx0XFx4MjAtXFx4N2VcXHg4MC1cXHhmZl0vO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZU5hbWUobmFtZSkge1xuXHRuYW1lID0gYCR7bmFtZX1gO1xuXHRpZiAoaW52YWxpZFRva2VuUmVnZXgudGVzdChuYW1lKSB8fCBuYW1lID09PSAnJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYCR7bmFtZX0gaXMgbm90IGEgbGVnYWwgSFRUUCBoZWFkZXIgbmFtZWApO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlVmFsdWUodmFsdWUpIHtcblx0dmFsdWUgPSBgJHt2YWx1ZX1gO1xuXHRpZiAoaW52YWxpZEhlYWRlckNoYXJSZWdleC50ZXN0KHZhbHVlKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYCR7dmFsdWV9IGlzIG5vdCBhIGxlZ2FsIEhUVFAgaGVhZGVyIHZhbHVlYCk7XG5cdH1cbn1cblxuLyoqXG4gKiBGaW5kIHRoZSBrZXkgaW4gdGhlIG1hcCBvYmplY3QgZ2l2ZW4gYSBoZWFkZXIgbmFtZS5cbiAqXG4gKiBSZXR1cm5zIHVuZGVmaW5lZCBpZiBub3QgZm91bmQuXG4gKlxuICogQHBhcmFtICAgU3RyaW5nICBuYW1lICBIZWFkZXIgbmFtZVxuICogQHJldHVybiAgU3RyaW5nfFVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBmaW5kKG1hcCwgbmFtZSkge1xuXHRuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRmb3IgKGNvbnN0IGtleSBpbiBtYXApIHtcblx0XHRpZiAoa2V5LnRvTG93ZXJDYXNlKCkgPT09IG5hbWUpIHtcblx0XHRcdHJldHVybiBrZXk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmNvbnN0IE1BUCA9IFN5bWJvbCgnbWFwJyk7XG5jbGFzcyBIZWFkZXJzIHtcblx0LyoqXG4gICogSGVhZGVycyBjbGFzc1xuICAqXG4gICogQHBhcmFtICAgT2JqZWN0ICBoZWFkZXJzICBSZXNwb25zZSBoZWFkZXJzXG4gICogQHJldHVybiAgVm9pZFxuICAqL1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRsZXQgaW5pdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkO1xuXG5cdFx0dGhpc1tNQVBdID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuXHRcdGlmIChpbml0IGluc3RhbmNlb2YgSGVhZGVycykge1xuXHRcdFx0Y29uc3QgcmF3SGVhZGVycyA9IGluaXQucmF3KCk7XG5cdFx0XHRjb25zdCBoZWFkZXJOYW1lcyA9IE9iamVjdC5rZXlzKHJhd0hlYWRlcnMpO1xuXG5cdFx0XHRmb3IgKGNvbnN0IGhlYWRlck5hbWUgb2YgaGVhZGVyTmFtZXMpIHtcblx0XHRcdFx0Zm9yIChjb25zdCB2YWx1ZSBvZiByYXdIZWFkZXJzW2hlYWRlck5hbWVdKSB7XG5cdFx0XHRcdFx0dGhpcy5hcHBlbmQoaGVhZGVyTmFtZSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBXZSBkb24ndCB3b3JyeSBhYm91dCBjb252ZXJ0aW5nIHByb3AgdG8gQnl0ZVN0cmluZyBoZXJlIGFzIGFwcGVuZCgpXG5cdFx0Ly8gd2lsbCBoYW5kbGUgaXQuXG5cdFx0aWYgKGluaXQgPT0gbnVsbCkgOyBlbHNlIGlmICh0eXBlb2YgaW5pdCA9PT0gJ29iamVjdCcpIHtcblx0XHRcdGNvbnN0IG1ldGhvZCA9IGluaXRbU3ltYm9sLml0ZXJhdG9yXTtcblx0XHRcdGlmIChtZXRob2QgIT0gbnVsbCkge1xuXHRcdFx0XHRpZiAodHlwZW9mIG1ldGhvZCAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0hlYWRlciBwYWlycyBtdXN0IGJlIGl0ZXJhYmxlJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBzZXF1ZW5jZTxzZXF1ZW5jZTxCeXRlU3RyaW5nPj5cblx0XHRcdFx0Ly8gTm90ZTogcGVyIHNwZWMgd2UgaGF2ZSB0byBmaXJzdCBleGhhdXN0IHRoZSBsaXN0cyB0aGVuIHByb2Nlc3MgdGhlbVxuXHRcdFx0XHRjb25zdCBwYWlycyA9IFtdO1xuXHRcdFx0XHRmb3IgKGNvbnN0IHBhaXIgb2YgaW5pdCkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgcGFpciAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHBhaXJbU3ltYm9sLml0ZXJhdG9yXSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRWFjaCBoZWFkZXIgcGFpciBtdXN0IGJlIGl0ZXJhYmxlJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHBhaXJzLnB1c2goQXJyYXkuZnJvbShwYWlyKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IgKGNvbnN0IHBhaXIgb2YgcGFpcnMpIHtcblx0XHRcdFx0XHRpZiAocGFpci5sZW5ndGggIT09IDIpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0VhY2ggaGVhZGVyIHBhaXIgbXVzdCBiZSBhIG5hbWUvdmFsdWUgdHVwbGUnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5hcHBlbmQocGFpclswXSwgcGFpclsxXSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIHJlY29yZDxCeXRlU3RyaW5nLCBCeXRlU3RyaW5nPlxuXHRcdFx0XHRmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhpbml0KSkge1xuXHRcdFx0XHRcdGNvbnN0IHZhbHVlID0gaW5pdFtrZXldO1xuXHRcdFx0XHRcdHRoaXMuYXBwZW5kKGtleSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb3ZpZGVkIGluaXRpYWxpemVyIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG4gICogUmV0dXJuIGNvbWJpbmVkIGhlYWRlciB2YWx1ZSBnaXZlbiBuYW1lXG4gICpcbiAgKiBAcGFyYW0gICBTdHJpbmcgIG5hbWUgIEhlYWRlciBuYW1lXG4gICogQHJldHVybiAgTWl4ZWRcbiAgKi9cblx0Z2V0KG5hbWUpIHtcblx0XHRuYW1lID0gYCR7bmFtZX1gO1xuXHRcdHZhbGlkYXRlTmFtZShuYW1lKTtcblx0XHRjb25zdCBrZXkgPSBmaW5kKHRoaXNbTUFQXSwgbmFtZSk7XG5cdFx0aWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpc1tNQVBdW2tleV0uam9pbignLCAnKTtcblx0fVxuXG5cdC8qKlxuICAqIEl0ZXJhdGUgb3ZlciBhbGwgaGVhZGVyc1xuICAqXG4gICogQHBhcmFtICAgRnVuY3Rpb24gIGNhbGxiYWNrICBFeGVjdXRlZCBmb3IgZWFjaCBpdGVtIHdpdGggcGFyYW1ldGVycyAodmFsdWUsIG5hbWUsIHRoaXNBcmcpXG4gICogQHBhcmFtICAgQm9vbGVhbiAgIHRoaXNBcmcgICBgdGhpc2AgY29udGV4dCBmb3IgY2FsbGJhY2sgZnVuY3Rpb25cbiAgKiBAcmV0dXJuICBWb2lkXG4gICovXG5cdGZvckVhY2goY2FsbGJhY2spIHtcblx0XHRsZXQgdGhpc0FyZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuXG5cdFx0bGV0IHBhaXJzID0gZ2V0SGVhZGVycyh0aGlzKTtcblx0XHRsZXQgaSA9IDA7XG5cdFx0d2hpbGUgKGkgPCBwYWlycy5sZW5ndGgpIHtcblx0XHRcdHZhciBfcGFpcnMkaSA9IHBhaXJzW2ldO1xuXHRcdFx0Y29uc3QgbmFtZSA9IF9wYWlycyRpWzBdLFxuXHRcdFx0ICAgICAgdmFsdWUgPSBfcGFpcnMkaVsxXTtcblxuXHRcdFx0Y2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2YWx1ZSwgbmFtZSwgdGhpcyk7XG5cdFx0XHRwYWlycyA9IGdldEhlYWRlcnModGhpcyk7XG5cdFx0XHRpKys7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG4gICogT3ZlcndyaXRlIGhlYWRlciB2YWx1ZXMgZ2l2ZW4gbmFtZVxuICAqXG4gICogQHBhcmFtICAgU3RyaW5nICBuYW1lICAgSGVhZGVyIG5hbWVcbiAgKiBAcGFyYW0gICBTdHJpbmcgIHZhbHVlICBIZWFkZXIgdmFsdWVcbiAgKiBAcmV0dXJuICBWb2lkXG4gICovXG5cdHNldChuYW1lLCB2YWx1ZSkge1xuXHRcdG5hbWUgPSBgJHtuYW1lfWA7XG5cdFx0dmFsdWUgPSBgJHt2YWx1ZX1gO1xuXHRcdHZhbGlkYXRlTmFtZShuYW1lKTtcblx0XHR2YWxpZGF0ZVZhbHVlKHZhbHVlKTtcblx0XHRjb25zdCBrZXkgPSBmaW5kKHRoaXNbTUFQXSwgbmFtZSk7XG5cdFx0dGhpc1tNQVBdW2tleSAhPT0gdW5kZWZpbmVkID8ga2V5IDogbmFtZV0gPSBbdmFsdWVdO1xuXHR9XG5cblx0LyoqXG4gICogQXBwZW5kIGEgdmFsdWUgb250byBleGlzdGluZyBoZWFkZXJcbiAgKlxuICAqIEBwYXJhbSAgIFN0cmluZyAgbmFtZSAgIEhlYWRlciBuYW1lXG4gICogQHBhcmFtICAgU3RyaW5nICB2YWx1ZSAgSGVhZGVyIHZhbHVlXG4gICogQHJldHVybiAgVm9pZFxuICAqL1xuXHRhcHBlbmQobmFtZSwgdmFsdWUpIHtcblx0XHRuYW1lID0gYCR7bmFtZX1gO1xuXHRcdHZhbHVlID0gYCR7dmFsdWV9YDtcblx0XHR2YWxpZGF0ZU5hbWUobmFtZSk7XG5cdFx0dmFsaWRhdGVWYWx1ZSh2YWx1ZSk7XG5cdFx0Y29uc3Qga2V5ID0gZmluZCh0aGlzW01BUF0sIG5hbWUpO1xuXHRcdGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpc1tNQVBdW2tleV0ucHVzaCh2YWx1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXNbTUFQXVtuYW1lXSA9IFt2YWx1ZV07XG5cdFx0fVxuXHR9XG5cblx0LyoqXG4gICogQ2hlY2sgZm9yIGhlYWRlciBuYW1lIGV4aXN0ZW5jZVxuICAqXG4gICogQHBhcmFtICAgU3RyaW5nICAgbmFtZSAgSGVhZGVyIG5hbWVcbiAgKiBAcmV0dXJuICBCb29sZWFuXG4gICovXG5cdGhhcyhuYW1lKSB7XG5cdFx0bmFtZSA9IGAke25hbWV9YDtcblx0XHR2YWxpZGF0ZU5hbWUobmFtZSk7XG5cdFx0cmV0dXJuIGZpbmQodGhpc1tNQVBdLCBuYW1lKSAhPT0gdW5kZWZpbmVkO1xuXHR9XG5cblx0LyoqXG4gICogRGVsZXRlIGFsbCBoZWFkZXIgdmFsdWVzIGdpdmVuIG5hbWVcbiAgKlxuICAqIEBwYXJhbSAgIFN0cmluZyAgbmFtZSAgSGVhZGVyIG5hbWVcbiAgKiBAcmV0dXJuICBWb2lkXG4gICovXG5cdGRlbGV0ZShuYW1lKSB7XG5cdFx0bmFtZSA9IGAke25hbWV9YDtcblx0XHR2YWxpZGF0ZU5hbWUobmFtZSk7XG5cdFx0Y29uc3Qga2V5ID0gZmluZCh0aGlzW01BUF0sIG5hbWUpO1xuXHRcdGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0ZGVsZXRlIHRoaXNbTUFQXVtrZXldO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuICAqIFJldHVybiByYXcgaGVhZGVycyAobm9uLXNwZWMgYXBpKVxuICAqXG4gICogQHJldHVybiAgT2JqZWN0XG4gICovXG5cdHJhdygpIHtcblx0XHRyZXR1cm4gdGhpc1tNQVBdO1xuXHR9XG5cblx0LyoqXG4gICogR2V0IGFuIGl0ZXJhdG9yIG9uIGtleXMuXG4gICpcbiAgKiBAcmV0dXJuICBJdGVyYXRvclxuICAqL1xuXHRrZXlzKCkge1xuXHRcdHJldHVybiBjcmVhdGVIZWFkZXJzSXRlcmF0b3IodGhpcywgJ2tleScpO1xuXHR9XG5cblx0LyoqXG4gICogR2V0IGFuIGl0ZXJhdG9yIG9uIHZhbHVlcy5cbiAgKlxuICAqIEByZXR1cm4gIEl0ZXJhdG9yXG4gICovXG5cdHZhbHVlcygpIHtcblx0XHRyZXR1cm4gY3JlYXRlSGVhZGVyc0l0ZXJhdG9yKHRoaXMsICd2YWx1ZScpO1xuXHR9XG5cblx0LyoqXG4gICogR2V0IGFuIGl0ZXJhdG9yIG9uIGVudHJpZXMuXG4gICpcbiAgKiBUaGlzIGlzIHRoZSBkZWZhdWx0IGl0ZXJhdG9yIG9mIHRoZSBIZWFkZXJzIG9iamVjdC5cbiAgKlxuICAqIEByZXR1cm4gIEl0ZXJhdG9yXG4gICovXG5cdFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuXHRcdHJldHVybiBjcmVhdGVIZWFkZXJzSXRlcmF0b3IodGhpcywgJ2tleSt2YWx1ZScpO1xuXHR9XG59XG5IZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEhlYWRlcnMucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcblx0dmFsdWU6ICdIZWFkZXJzJyxcblx0d3JpdGFibGU6IGZhbHNlLFxuXHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0Y29uZmlndXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoSGVhZGVycy5wcm90b3R5cGUsIHtcblx0Z2V0OiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0Zm9yRWFjaDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHNldDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGFwcGVuZDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGhhczogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGRlbGV0ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGtleXM6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHR2YWx1ZXM6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRlbnRyaWVzOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5cbmZ1bmN0aW9uIGdldEhlYWRlcnMoaGVhZGVycykge1xuXHRsZXQga2luZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJ2tleSt2YWx1ZSc7XG5cblx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGhlYWRlcnNbTUFQXSkuc29ydCgpO1xuXHRyZXR1cm4ga2V5cy5tYXAoa2luZCA9PT0gJ2tleScgPyBmdW5jdGlvbiAoaykge1xuXHRcdHJldHVybiBrLnRvTG93ZXJDYXNlKCk7XG5cdH0gOiBraW5kID09PSAndmFsdWUnID8gZnVuY3Rpb24gKGspIHtcblx0XHRyZXR1cm4gaGVhZGVyc1tNQVBdW2tdLmpvaW4oJywgJyk7XG5cdH0gOiBmdW5jdGlvbiAoaykge1xuXHRcdHJldHVybiBbay50b0xvd2VyQ2FzZSgpLCBoZWFkZXJzW01BUF1ba10uam9pbignLCAnKV07XG5cdH0pO1xufVxuXG5jb25zdCBJTlRFUk5BTCA9IFN5bWJvbCgnaW50ZXJuYWwnKTtcblxuZnVuY3Rpb24gY3JlYXRlSGVhZGVyc0l0ZXJhdG9yKHRhcmdldCwga2luZCkge1xuXHRjb25zdCBpdGVyYXRvciA9IE9iamVjdC5jcmVhdGUoSGVhZGVyc0l0ZXJhdG9yUHJvdG90eXBlKTtcblx0aXRlcmF0b3JbSU5URVJOQUxdID0ge1xuXHRcdHRhcmdldCxcblx0XHRraW5kLFxuXHRcdGluZGV4OiAwXG5cdH07XG5cdHJldHVybiBpdGVyYXRvcjtcbn1cblxuY29uc3QgSGVhZGVyc0l0ZXJhdG9yUHJvdG90eXBlID0gT2JqZWN0LnNldFByb3RvdHlwZU9mKHtcblx0bmV4dCgpIHtcblx0XHQvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcblx0XHRpZiAoIXRoaXMgfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpICE9PSBIZWFkZXJzSXRlcmF0b3JQcm90b3R5cGUpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1ZhbHVlIG9mIGB0aGlzYCBpcyBub3QgYSBIZWFkZXJzSXRlcmF0b3InKTtcblx0XHR9XG5cblx0XHR2YXIgX0lOVEVSTkFMID0gdGhpc1tJTlRFUk5BTF07XG5cdFx0Y29uc3QgdGFyZ2V0ID0gX0lOVEVSTkFMLnRhcmdldCxcblx0XHQgICAgICBraW5kID0gX0lOVEVSTkFMLmtpbmQsXG5cdFx0ICAgICAgaW5kZXggPSBfSU5URVJOQUwuaW5kZXg7XG5cblx0XHRjb25zdCB2YWx1ZXMgPSBnZXRIZWFkZXJzKHRhcmdldCwga2luZCk7XG5cdFx0Y29uc3QgbGVuID0gdmFsdWVzLmxlbmd0aDtcblx0XHRpZiAoaW5kZXggPj0gbGVuKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR2YWx1ZTogdW5kZWZpbmVkLFxuXHRcdFx0XHRkb25lOiB0cnVlXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdHRoaXNbSU5URVJOQUxdLmluZGV4ID0gaW5kZXggKyAxO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlOiB2YWx1ZXNbaW5kZXhdLFxuXHRcdFx0ZG9uZTogZmFsc2Vcblx0XHR9O1xuXHR9XG59LCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoT2JqZWN0LmdldFByb3RvdHlwZU9mKFtdW1N5bWJvbC5pdGVyYXRvcl0oKSkpKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEhlYWRlcnNJdGVyYXRvclByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG5cdHZhbHVlOiAnSGVhZGVyc0l0ZXJhdG9yJyxcblx0d3JpdGFibGU6IGZhbHNlLFxuXHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0Y29uZmlndXJhYmxlOiB0cnVlXG59KTtcblxuLyoqXG4gKiBFeHBvcnQgdGhlIEhlYWRlcnMgb2JqZWN0IGluIGEgZm9ybSB0aGF0IE5vZGUuanMgY2FuIGNvbnN1bWUuXG4gKlxuICogQHBhcmFtICAgSGVhZGVycyAgaGVhZGVyc1xuICogQHJldHVybiAgT2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGV4cG9ydE5vZGVDb21wYXRpYmxlSGVhZGVycyhoZWFkZXJzKSB7XG5cdGNvbnN0IG9iaiA9IE9iamVjdC5hc3NpZ24oeyBfX3Byb3RvX186IG51bGwgfSwgaGVhZGVyc1tNQVBdKTtcblxuXHQvLyBodHRwLnJlcXVlc3QoKSBvbmx5IHN1cHBvcnRzIHN0cmluZyBhcyBIb3N0IGhlYWRlci4gVGhpcyBoYWNrIG1ha2VzXG5cdC8vIHNwZWNpZnlpbmcgY3VzdG9tIEhvc3QgaGVhZGVyIHBvc3NpYmxlLlxuXHRjb25zdCBob3N0SGVhZGVyS2V5ID0gZmluZChoZWFkZXJzW01BUF0sICdIb3N0Jyk7XG5cdGlmIChob3N0SGVhZGVyS2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHRvYmpbaG9zdEhlYWRlcktleV0gPSBvYmpbaG9zdEhlYWRlcktleV1bMF07XG5cdH1cblxuXHRyZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIEhlYWRlcnMgb2JqZWN0IGZyb20gYW4gb2JqZWN0IG9mIGhlYWRlcnMsIGlnbm9yaW5nIHRob3NlIHRoYXQgZG9cbiAqIG5vdCBjb25mb3JtIHRvIEhUVFAgZ3JhbW1hciBwcm9kdWN0aW9ucy5cbiAqXG4gKiBAcGFyYW0gICBPYmplY3QgIG9iaiAgT2JqZWN0IG9mIGhlYWRlcnNcbiAqIEByZXR1cm4gIEhlYWRlcnNcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSGVhZGVyc0xlbmllbnQob2JqKSB7XG5cdGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuXHRmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXMob2JqKSkge1xuXHRcdGlmIChpbnZhbGlkVG9rZW5SZWdleC50ZXN0KG5hbWUpKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkob2JqW25hbWVdKSkge1xuXHRcdFx0Zm9yIChjb25zdCB2YWwgb2Ygb2JqW25hbWVdKSB7XG5cdFx0XHRcdGlmIChpbnZhbGlkSGVhZGVyQ2hhclJlZ2V4LnRlc3QodmFsKSkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChoZWFkZXJzW01BUF1bbmFtZV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGhlYWRlcnNbTUFQXVtuYW1lXSA9IFt2YWxdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGhlYWRlcnNbTUFQXVtuYW1lXS5wdXNoKHZhbCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKCFpbnZhbGlkSGVhZGVyQ2hhclJlZ2V4LnRlc3Qob2JqW25hbWVdKSkge1xuXHRcdFx0aGVhZGVyc1tNQVBdW25hbWVdID0gW29ialtuYW1lXV07XG5cdFx0fVxuXHR9XG5cdHJldHVybiBoZWFkZXJzO1xufVxuXG5jb25zdCBJTlRFUk5BTFMkMSA9IFN5bWJvbCgnUmVzcG9uc2UgaW50ZXJuYWxzJyk7XG5cbi8vIGZpeCBhbiBpc3N1ZSB3aGVyZSBcIlNUQVRVU19DT0RFU1wiIGFyZW4ndCBhIG5hbWVkIGV4cG9ydCBmb3Igbm9kZSA8MTBcbmNvbnN0IFNUQVRVU19DT0RFUyA9IGh0dHAuU1RBVFVTX0NPREVTO1xuXG4vKipcbiAqIFJlc3BvbnNlIGNsYXNzXG4gKlxuICogQHBhcmFtICAgU3RyZWFtICBib2R5ICBSZWFkYWJsZSBzdHJlYW1cbiAqIEBwYXJhbSAgIE9iamVjdCAgb3B0cyAgUmVzcG9uc2Ugb3B0aW9uc1xuICogQHJldHVybiAgVm9pZFxuICovXG5jbGFzcyBSZXNwb25zZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdGxldCBib2R5ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBudWxsO1xuXHRcdGxldCBvcHRzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuXHRcdEJvZHkuY2FsbCh0aGlzLCBib2R5LCBvcHRzKTtcblxuXHRcdGNvbnN0IHN0YXR1cyA9IG9wdHMuc3RhdHVzIHx8IDIwMDtcblx0XHRjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0cy5oZWFkZXJzKTtcblxuXHRcdGlmIChib2R5ICE9IG51bGwgJiYgIWhlYWRlcnMuaGFzKCdDb250ZW50LVR5cGUnKSkge1xuXHRcdFx0Y29uc3QgY29udGVudFR5cGUgPSBleHRyYWN0Q29udGVudFR5cGUoYm9keSk7XG5cdFx0XHRpZiAoY29udGVudFR5cGUpIHtcblx0XHRcdFx0aGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsIGNvbnRlbnRUeXBlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzW0lOVEVSTkFMUyQxXSA9IHtcblx0XHRcdHVybDogb3B0cy51cmwsXG5cdFx0XHRzdGF0dXMsXG5cdFx0XHRzdGF0dXNUZXh0OiBvcHRzLnN0YXR1c1RleHQgfHwgU1RBVFVTX0NPREVTW3N0YXR1c10sXG5cdFx0XHRoZWFkZXJzLFxuXHRcdFx0Y291bnRlcjogb3B0cy5jb3VudGVyXG5cdFx0fTtcblx0fVxuXG5cdGdldCB1cmwoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDFdLnVybCB8fCAnJztcblx0fVxuXG5cdGdldCBzdGF0dXMoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDFdLnN0YXR1cztcblx0fVxuXG5cdC8qKlxuICAqIENvbnZlbmllbmNlIHByb3BlcnR5IHJlcHJlc2VudGluZyBpZiB0aGUgcmVxdWVzdCBlbmRlZCBub3JtYWxseVxuICAqL1xuXHRnZXQgb2soKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDFdLnN0YXR1cyA+PSAyMDAgJiYgdGhpc1tJTlRFUk5BTFMkMV0uc3RhdHVzIDwgMzAwO1xuXHR9XG5cblx0Z2V0IHJlZGlyZWN0ZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDFdLmNvdW50ZXIgPiAwO1xuXHR9XG5cblx0Z2V0IHN0YXR1c1RleHQoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDFdLnN0YXR1c1RleHQ7XG5cdH1cblxuXHRnZXQgaGVhZGVycygpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0uaGVhZGVycztcblx0fVxuXG5cdC8qKlxuICAqIENsb25lIHRoaXMgcmVzcG9uc2VcbiAgKlxuICAqIEByZXR1cm4gIFJlc3BvbnNlXG4gICovXG5cdGNsb25lKCkge1xuXHRcdHJldHVybiBuZXcgUmVzcG9uc2UoY2xvbmUodGhpcyksIHtcblx0XHRcdHVybDogdGhpcy51cmwsXG5cdFx0XHRzdGF0dXM6IHRoaXMuc3RhdHVzLFxuXHRcdFx0c3RhdHVzVGV4dDogdGhpcy5zdGF0dXNUZXh0LFxuXHRcdFx0aGVhZGVyczogdGhpcy5oZWFkZXJzLFxuXHRcdFx0b2s6IHRoaXMub2ssXG5cdFx0XHRyZWRpcmVjdGVkOiB0aGlzLnJlZGlyZWN0ZWRcblx0XHR9KTtcblx0fVxufVxuXG5Cb2R5Lm1peEluKFJlc3BvbnNlLnByb3RvdHlwZSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFJlc3BvbnNlLnByb3RvdHlwZSwge1xuXHR1cmw6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRzdGF0dXM6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRvazogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHJlZGlyZWN0ZWQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRzdGF0dXNUZXh0OiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0aGVhZGVyczogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGNsb25lOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZXNwb25zZS5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywge1xuXHR2YWx1ZTogJ1Jlc3BvbnNlJyxcblx0d3JpdGFibGU6IGZhbHNlLFxuXHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0Y29uZmlndXJhYmxlOiB0cnVlXG59KTtcblxuY29uc3QgSU5URVJOQUxTJDIgPSBTeW1ib2woJ1JlcXVlc3QgaW50ZXJuYWxzJyk7XG5cbi8vIGZpeCBhbiBpc3N1ZSB3aGVyZSBcImZvcm1hdFwiLCBcInBhcnNlXCIgYXJlbid0IGEgbmFtZWQgZXhwb3J0IGZvciBub2RlIDwxMFxuY29uc3QgcGFyc2VfdXJsID0gVXJsLnBhcnNlO1xuY29uc3QgZm9ybWF0X3VybCA9IFVybC5mb3JtYXQ7XG5cbmNvbnN0IHN0cmVhbURlc3RydWN0aW9uU3VwcG9ydGVkID0gJ2Rlc3Ryb3knIGluIFN0cmVhbS5SZWFkYWJsZS5wcm90b3R5cGU7XG5cbi8qKlxuICogQ2hlY2sgaWYgYSB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBSZXF1ZXN0LlxuICpcbiAqIEBwYXJhbSAgIE1peGVkICAgaW5wdXRcbiAqIEByZXR1cm4gIEJvb2xlYW5cbiAqL1xuZnVuY3Rpb24gaXNSZXF1ZXN0KGlucHV0KSB7XG5cdHJldHVybiB0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnICYmIHR5cGVvZiBpbnB1dFtJTlRFUk5BTFMkMl0gPT09ICdvYmplY3QnO1xufVxuXG5mdW5jdGlvbiBpc0Fib3J0U2lnbmFsKHNpZ25hbCkge1xuXHRjb25zdCBwcm90byA9IHNpZ25hbCAmJiB0eXBlb2Ygc2lnbmFsID09PSAnb2JqZWN0JyAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc2lnbmFsKTtcblx0cmV0dXJuICEhKHByb3RvICYmIHByb3RvLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdBYm9ydFNpZ25hbCcpO1xufVxuXG4vKipcbiAqIFJlcXVlc3QgY2xhc3NcbiAqXG4gKiBAcGFyYW0gICBNaXhlZCAgIGlucHV0ICBVcmwgb3IgUmVxdWVzdCBpbnN0YW5jZVxuICogQHBhcmFtICAgT2JqZWN0ICBpbml0ICAgQ3VzdG9tIG9wdGlvbnNcbiAqIEByZXR1cm4gIFZvaWRcbiAqL1xuY2xhc3MgUmVxdWVzdCB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0bGV0IGluaXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG5cdFx0bGV0IHBhcnNlZFVSTDtcblxuXHRcdC8vIG5vcm1hbGl6ZSBpbnB1dFxuXHRcdGlmICghaXNSZXF1ZXN0KGlucHV0KSkge1xuXHRcdFx0aWYgKGlucHV0ICYmIGlucHV0LmhyZWYpIHtcblx0XHRcdFx0Ly8gaW4gb3JkZXIgdG8gc3VwcG9ydCBOb2RlLmpzJyBVcmwgb2JqZWN0czsgdGhvdWdoIFdIQVRXRydzIFVSTCBvYmplY3RzXG5cdFx0XHRcdC8vIHdpbGwgZmFsbCBpbnRvIHRoaXMgYnJhbmNoIGFsc28gKHNpbmNlIHRoZWlyIGB0b1N0cmluZygpYCB3aWxsIHJldHVyblxuXHRcdFx0XHQvLyBgaHJlZmAgcHJvcGVydHkgYW55d2F5KVxuXHRcdFx0XHRwYXJzZWRVUkwgPSBwYXJzZV91cmwoaW5wdXQuaHJlZik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBjb2VyY2UgaW5wdXQgdG8gYSBzdHJpbmcgYmVmb3JlIGF0dGVtcHRpbmcgdG8gcGFyc2Vcblx0XHRcdFx0cGFyc2VkVVJMID0gcGFyc2VfdXJsKGAke2lucHV0fWApO1xuXHRcdFx0fVxuXHRcdFx0aW5wdXQgPSB7fTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cGFyc2VkVVJMID0gcGFyc2VfdXJsKGlucHV0LnVybCk7XG5cdFx0fVxuXG5cdFx0bGV0IG1ldGhvZCA9IGluaXQubWV0aG9kIHx8IGlucHV0Lm1ldGhvZCB8fCAnR0VUJztcblx0XHRtZXRob2QgPSBtZXRob2QudG9VcHBlckNhc2UoKTtcblxuXHRcdGlmICgoaW5pdC5ib2R5ICE9IG51bGwgfHwgaXNSZXF1ZXN0KGlucHV0KSAmJiBpbnB1dC5ib2R5ICE9PSBudWxsKSAmJiAobWV0aG9kID09PSAnR0VUJyB8fCBtZXRob2QgPT09ICdIRUFEJykpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlcXVlc3Qgd2l0aCBHRVQvSEVBRCBtZXRob2QgY2Fubm90IGhhdmUgYm9keScpO1xuXHRcdH1cblxuXHRcdGxldCBpbnB1dEJvZHkgPSBpbml0LmJvZHkgIT0gbnVsbCA/IGluaXQuYm9keSA6IGlzUmVxdWVzdChpbnB1dCkgJiYgaW5wdXQuYm9keSAhPT0gbnVsbCA/IGNsb25lKGlucHV0KSA6IG51bGw7XG5cblx0XHRCb2R5LmNhbGwodGhpcywgaW5wdXRCb2R5LCB7XG5cdFx0XHR0aW1lb3V0OiBpbml0LnRpbWVvdXQgfHwgaW5wdXQudGltZW91dCB8fCAwLFxuXHRcdFx0c2l6ZTogaW5pdC5zaXplIHx8IGlucHV0LnNpemUgfHwgMFxuXHRcdH0pO1xuXG5cdFx0Y29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKGluaXQuaGVhZGVycyB8fCBpbnB1dC5oZWFkZXJzIHx8IHt9KTtcblxuXHRcdGlmIChpbnB1dEJvZHkgIT0gbnVsbCAmJiAhaGVhZGVycy5oYXMoJ0NvbnRlbnQtVHlwZScpKSB7XG5cdFx0XHRjb25zdCBjb250ZW50VHlwZSA9IGV4dHJhY3RDb250ZW50VHlwZShpbnB1dEJvZHkpO1xuXHRcdFx0aWYgKGNvbnRlbnRUeXBlKSB7XG5cdFx0XHRcdGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCBjb250ZW50VHlwZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bGV0IHNpZ25hbCA9IGlzUmVxdWVzdChpbnB1dCkgPyBpbnB1dC5zaWduYWwgOiBudWxsO1xuXHRcdGlmICgnc2lnbmFsJyBpbiBpbml0KSBzaWduYWwgPSBpbml0LnNpZ25hbDtcblxuXHRcdGlmIChzaWduYWwgIT0gbnVsbCAmJiAhaXNBYm9ydFNpZ25hbChzaWduYWwpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBzaWduYWwgdG8gYmUgYW4gaW5zdGFuY2VvZiBBYm9ydFNpZ25hbCcpO1xuXHRcdH1cblxuXHRcdHRoaXNbSU5URVJOQUxTJDJdID0ge1xuXHRcdFx0bWV0aG9kLFxuXHRcdFx0cmVkaXJlY3Q6IGluaXQucmVkaXJlY3QgfHwgaW5wdXQucmVkaXJlY3QgfHwgJ2ZvbGxvdycsXG5cdFx0XHRoZWFkZXJzLFxuXHRcdFx0cGFyc2VkVVJMLFxuXHRcdFx0c2lnbmFsXG5cdFx0fTtcblxuXHRcdC8vIG5vZGUtZmV0Y2gtb25seSBvcHRpb25zXG5cdFx0dGhpcy5mb2xsb3cgPSBpbml0LmZvbGxvdyAhPT0gdW5kZWZpbmVkID8gaW5pdC5mb2xsb3cgOiBpbnB1dC5mb2xsb3cgIT09IHVuZGVmaW5lZCA/IGlucHV0LmZvbGxvdyA6IDIwO1xuXHRcdHRoaXMuY29tcHJlc3MgPSBpbml0LmNvbXByZXNzICE9PSB1bmRlZmluZWQgPyBpbml0LmNvbXByZXNzIDogaW5wdXQuY29tcHJlc3MgIT09IHVuZGVmaW5lZCA/IGlucHV0LmNvbXByZXNzIDogdHJ1ZTtcblx0XHR0aGlzLmNvdW50ZXIgPSBpbml0LmNvdW50ZXIgfHwgaW5wdXQuY291bnRlciB8fCAwO1xuXHRcdHRoaXMuYWdlbnQgPSBpbml0LmFnZW50IHx8IGlucHV0LmFnZW50O1xuXHR9XG5cblx0Z2V0IG1ldGhvZCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMl0ubWV0aG9kO1xuXHR9XG5cblx0Z2V0IHVybCgpIHtcblx0XHRyZXR1cm4gZm9ybWF0X3VybCh0aGlzW0lOVEVSTkFMUyQyXS5wYXJzZWRVUkwpO1xuXHR9XG5cblx0Z2V0IGhlYWRlcnMoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDJdLmhlYWRlcnM7XG5cdH1cblxuXHRnZXQgcmVkaXJlY3QoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDJdLnJlZGlyZWN0O1xuXHR9XG5cblx0Z2V0IHNpZ25hbCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMl0uc2lnbmFsO1xuXHR9XG5cblx0LyoqXG4gICogQ2xvbmUgdGhpcyByZXF1ZXN0XG4gICpcbiAgKiBAcmV0dXJuICBSZXF1ZXN0XG4gICovXG5cdGNsb25lKCkge1xuXHRcdHJldHVybiBuZXcgUmVxdWVzdCh0aGlzKTtcblx0fVxufVxuXG5Cb2R5Lm1peEluKFJlcXVlc3QucHJvdG90eXBlKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlcXVlc3QucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcblx0dmFsdWU6ICdSZXF1ZXN0Jyxcblx0d3JpdGFibGU6IGZhbHNlLFxuXHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0Y29uZmlndXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUmVxdWVzdC5wcm90b3R5cGUsIHtcblx0bWV0aG9kOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0dXJsOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0aGVhZGVyczogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHJlZGlyZWN0OiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0Y2xvbmU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRzaWduYWw6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgUmVxdWVzdCB0byBOb2RlLmpzIGh0dHAgcmVxdWVzdCBvcHRpb25zLlxuICpcbiAqIEBwYXJhbSAgIFJlcXVlc3QgIEEgUmVxdWVzdCBpbnN0YW5jZVxuICogQHJldHVybiAgT2JqZWN0ICAgVGhlIG9wdGlvbnMgb2JqZWN0IHRvIGJlIHBhc3NlZCB0byBodHRwLnJlcXVlc3RcbiAqL1xuZnVuY3Rpb24gZ2V0Tm9kZVJlcXVlc3RPcHRpb25zKHJlcXVlc3QpIHtcblx0Y29uc3QgcGFyc2VkVVJMID0gcmVxdWVzdFtJTlRFUk5BTFMkMl0ucGFyc2VkVVJMO1xuXHRjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMocmVxdWVzdFtJTlRFUk5BTFMkMl0uaGVhZGVycyk7XG5cblx0Ly8gZmV0Y2ggc3RlcCAxLjNcblx0aWYgKCFoZWFkZXJzLmhhcygnQWNjZXB0JykpIHtcblx0XHRoZWFkZXJzLnNldCgnQWNjZXB0JywgJyovKicpO1xuXHR9XG5cblx0Ly8gQmFzaWMgZmV0Y2hcblx0aWYgKCFwYXJzZWRVUkwucHJvdG9jb2wgfHwgIXBhcnNlZFVSTC5ob3N0bmFtZSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09ubHkgYWJzb2x1dGUgVVJMcyBhcmUgc3VwcG9ydGVkJyk7XG5cdH1cblxuXHRpZiAoIS9eaHR0cHM/OiQvLnRlc3QocGFyc2VkVVJMLnByb3RvY29sKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09ubHkgSFRUUChTKSBwcm90b2NvbHMgYXJlIHN1cHBvcnRlZCcpO1xuXHR9XG5cblx0aWYgKHJlcXVlc3Quc2lnbmFsICYmIHJlcXVlc3QuYm9keSBpbnN0YW5jZW9mIFN0cmVhbS5SZWFkYWJsZSAmJiAhc3RyZWFtRGVzdHJ1Y3Rpb25TdXBwb3J0ZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0NhbmNlbGxhdGlvbiBvZiBzdHJlYW1lZCByZXF1ZXN0cyB3aXRoIEFib3J0U2lnbmFsIGlzIG5vdCBzdXBwb3J0ZWQgaW4gbm9kZSA8IDgnKTtcblx0fVxuXG5cdC8vIEhUVFAtbmV0d29yay1vci1jYWNoZSBmZXRjaCBzdGVwcyAyLjQtMi43XG5cdGxldCBjb250ZW50TGVuZ3RoVmFsdWUgPSBudWxsO1xuXHRpZiAocmVxdWVzdC5ib2R5ID09IG51bGwgJiYgL14oUE9TVHxQVVQpJC9pLnRlc3QocmVxdWVzdC5tZXRob2QpKSB7XG5cdFx0Y29udGVudExlbmd0aFZhbHVlID0gJzAnO1xuXHR9XG5cdGlmIChyZXF1ZXN0LmJvZHkgIT0gbnVsbCkge1xuXHRcdGNvbnN0IHRvdGFsQnl0ZXMgPSBnZXRUb3RhbEJ5dGVzKHJlcXVlc3QpO1xuXHRcdGlmICh0eXBlb2YgdG90YWxCeXRlcyA9PT0gJ251bWJlcicpIHtcblx0XHRcdGNvbnRlbnRMZW5ndGhWYWx1ZSA9IFN0cmluZyh0b3RhbEJ5dGVzKTtcblx0XHR9XG5cdH1cblx0aWYgKGNvbnRlbnRMZW5ndGhWYWx1ZSkge1xuXHRcdGhlYWRlcnMuc2V0KCdDb250ZW50LUxlbmd0aCcsIGNvbnRlbnRMZW5ndGhWYWx1ZSk7XG5cdH1cblxuXHQvLyBIVFRQLW5ldHdvcmstb3ItY2FjaGUgZmV0Y2ggc3RlcCAyLjExXG5cdGlmICghaGVhZGVycy5oYXMoJ1VzZXItQWdlbnQnKSkge1xuXHRcdGhlYWRlcnMuc2V0KCdVc2VyLUFnZW50JywgJ25vZGUtZmV0Y2gvMS4wICgraHR0cHM6Ly9naXRodWIuY29tL2JpdGlubi9ub2RlLWZldGNoKScpO1xuXHR9XG5cblx0Ly8gSFRUUC1uZXR3b3JrLW9yLWNhY2hlIGZldGNoIHN0ZXAgMi4xNVxuXHRpZiAocmVxdWVzdC5jb21wcmVzcyAmJiAhaGVhZGVycy5oYXMoJ0FjY2VwdC1FbmNvZGluZycpKSB7XG5cdFx0aGVhZGVycy5zZXQoJ0FjY2VwdC1FbmNvZGluZycsICdnemlwLGRlZmxhdGUnKTtcblx0fVxuXG5cdGxldCBhZ2VudCA9IHJlcXVlc3QuYWdlbnQ7XG5cdGlmICh0eXBlb2YgYWdlbnQgPT09ICdmdW5jdGlvbicpIHtcblx0XHRhZ2VudCA9IGFnZW50KHBhcnNlZFVSTCk7XG5cdH1cblxuXHRpZiAoIWhlYWRlcnMuaGFzKCdDb25uZWN0aW9uJykgJiYgIWFnZW50KSB7XG5cdFx0aGVhZGVycy5zZXQoJ0Nvbm5lY3Rpb24nLCAnY2xvc2UnKTtcblx0fVxuXG5cdC8vIEhUVFAtbmV0d29yayBmZXRjaCBzdGVwIDQuMlxuXHQvLyBjaHVua2VkIGVuY29kaW5nIGlzIGhhbmRsZWQgYnkgTm9kZS5qc1xuXG5cdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwYXJzZWRVUkwsIHtcblx0XHRtZXRob2Q6IHJlcXVlc3QubWV0aG9kLFxuXHRcdGhlYWRlcnM6IGV4cG9ydE5vZGVDb21wYXRpYmxlSGVhZGVycyhoZWFkZXJzKSxcblx0XHRhZ2VudFxuXHR9KTtcbn1cblxuLyoqXG4gKiBhYm9ydC1lcnJvci5qc1xuICpcbiAqIEFib3J0RXJyb3IgaW50ZXJmYWNlIGZvciBjYW5jZWxsZWQgcmVxdWVzdHNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBBYm9ydEVycm9yIGluc3RhbmNlXG4gKlxuICogQHBhcmFtICAgU3RyaW5nICAgICAgbWVzc2FnZSAgICAgIEVycm9yIG1lc3NhZ2UgZm9yIGh1bWFuXG4gKiBAcmV0dXJuICBBYm9ydEVycm9yXG4gKi9cbmZ1bmN0aW9uIEFib3J0RXJyb3IobWVzc2FnZSkge1xuICBFcnJvci5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuXG4gIHRoaXMudHlwZSA9ICdhYm9ydGVkJztcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblxuICAvLyBoaWRlIGN1c3RvbSBlcnJvciBpbXBsZW1lbnRhdGlvbiBkZXRhaWxzIGZyb20gZW5kLXVzZXJzXG4gIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xufVxuXG5BYm9ydEVycm9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKTtcbkFib3J0RXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQWJvcnRFcnJvcjtcbkFib3J0RXJyb3IucHJvdG90eXBlLm5hbWUgPSAnQWJvcnRFcnJvcic7XG5cbi8vIGZpeCBhbiBpc3N1ZSB3aGVyZSBcIlBhc3NUaHJvdWdoXCIsIFwicmVzb2x2ZVwiIGFyZW4ndCBhIG5hbWVkIGV4cG9ydCBmb3Igbm9kZSA8MTBcbmNvbnN0IFBhc3NUaHJvdWdoJDEgPSBTdHJlYW0uUGFzc1Rocm91Z2g7XG5jb25zdCByZXNvbHZlX3VybCA9IFVybC5yZXNvbHZlO1xuXG4vKipcbiAqIEZldGNoIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtICAgTWl4ZWQgICAgdXJsICAgQWJzb2x1dGUgdXJsIG9yIFJlcXVlc3QgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIE9iamVjdCAgIG9wdHMgIEZldGNoIG9wdGlvbnNcbiAqIEByZXR1cm4gIFByb21pc2VcbiAqL1xuZnVuY3Rpb24gZmV0Y2godXJsLCBvcHRzKSB7XG5cblx0Ly8gYWxsb3cgY3VzdG9tIHByb21pc2Vcblx0aWYgKCFmZXRjaC5Qcm9taXNlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCduYXRpdmUgcHJvbWlzZSBtaXNzaW5nLCBzZXQgZmV0Y2guUHJvbWlzZSB0byB5b3VyIGZhdm9yaXRlIGFsdGVybmF0aXZlJyk7XG5cdH1cblxuXHRCb2R5LlByb21pc2UgPSBmZXRjaC5Qcm9taXNlO1xuXG5cdC8vIHdyYXAgaHR0cC5yZXF1ZXN0IGludG8gZmV0Y2hcblx0cmV0dXJuIG5ldyBmZXRjaC5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblx0XHQvLyBidWlsZCByZXF1ZXN0IG9iamVjdFxuXHRcdGNvbnN0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIG9wdHMpO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSBnZXROb2RlUmVxdWVzdE9wdGlvbnMocmVxdWVzdCk7XG5cblx0XHRjb25zdCBzZW5kID0gKG9wdGlvbnMucHJvdG9jb2wgPT09ICdodHRwczonID8gaHR0cHMgOiBodHRwKS5yZXF1ZXN0O1xuXHRcdGNvbnN0IHNpZ25hbCA9IHJlcXVlc3Quc2lnbmFsO1xuXG5cdFx0bGV0IHJlc3BvbnNlID0gbnVsbDtcblxuXHRcdGNvbnN0IGFib3J0ID0gZnVuY3Rpb24gYWJvcnQoKSB7XG5cdFx0XHRsZXQgZXJyb3IgPSBuZXcgQWJvcnRFcnJvcignVGhlIHVzZXIgYWJvcnRlZCBhIHJlcXVlc3QuJyk7XG5cdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0aWYgKHJlcXVlc3QuYm9keSAmJiByZXF1ZXN0LmJvZHkgaW5zdGFuY2VvZiBTdHJlYW0uUmVhZGFibGUpIHtcblx0XHRcdFx0cmVxdWVzdC5ib2R5LmRlc3Ryb3koZXJyb3IpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFyZXNwb25zZSB8fCAhcmVzcG9uc2UuYm9keSkgcmV0dXJuO1xuXHRcdFx0cmVzcG9uc2UuYm9keS5lbWl0KCdlcnJvcicsIGVycm9yKTtcblx0XHR9O1xuXG5cdFx0aWYgKHNpZ25hbCAmJiBzaWduYWwuYWJvcnRlZCkge1xuXHRcdFx0YWJvcnQoKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBhYm9ydEFuZEZpbmFsaXplID0gZnVuY3Rpb24gYWJvcnRBbmRGaW5hbGl6ZSgpIHtcblx0XHRcdGFib3J0KCk7XG5cdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdH07XG5cblx0XHQvLyBzZW5kIHJlcXVlc3Rcblx0XHRjb25zdCByZXEgPSBzZW5kKG9wdGlvbnMpO1xuXHRcdGxldCByZXFUaW1lb3V0O1xuXG5cdFx0aWYgKHNpZ25hbCkge1xuXHRcdFx0c2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRBbmRGaW5hbGl6ZSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZmluYWxpemUoKSB7XG5cdFx0XHRyZXEuYWJvcnQoKTtcblx0XHRcdGlmIChzaWduYWwpIHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0QW5kRmluYWxpemUpO1xuXHRcdFx0Y2xlYXJUaW1lb3V0KHJlcVRpbWVvdXQpO1xuXHRcdH1cblxuXHRcdGlmIChyZXF1ZXN0LnRpbWVvdXQpIHtcblx0XHRcdHJlcS5vbmNlKCdzb2NrZXQnLCBmdW5jdGlvbiAoc29ja2V0KSB7XG5cdFx0XHRcdHJlcVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYG5ldHdvcmsgdGltZW91dCBhdDogJHtyZXF1ZXN0LnVybH1gLCAncmVxdWVzdC10aW1lb3V0JykpO1xuXHRcdFx0XHRcdGZpbmFsaXplKCk7XG5cdFx0XHRcdH0sIHJlcXVlc3QudGltZW91dCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXEub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuXHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGByZXF1ZXN0IHRvICR7cmVxdWVzdC51cmx9IGZhaWxlZCwgcmVhc29uOiAke2Vyci5tZXNzYWdlfWAsICdzeXN0ZW0nLCBlcnIpKTtcblx0XHRcdGZpbmFsaXplKCk7XG5cdFx0fSk7XG5cblx0XHRyZXEub24oJ3Jlc3BvbnNlJywgZnVuY3Rpb24gKHJlcykge1xuXHRcdFx0Y2xlYXJUaW1lb3V0KHJlcVRpbWVvdXQpO1xuXG5cdFx0XHRjb25zdCBoZWFkZXJzID0gY3JlYXRlSGVhZGVyc0xlbmllbnQocmVzLmhlYWRlcnMpO1xuXG5cdFx0XHQvLyBIVFRQIGZldGNoIHN0ZXAgNVxuXHRcdFx0aWYgKGZldGNoLmlzUmVkaXJlY3QocmVzLnN0YXR1c0NvZGUpKSB7XG5cdFx0XHRcdC8vIEhUVFAgZmV0Y2ggc3RlcCA1LjJcblx0XHRcdFx0Y29uc3QgbG9jYXRpb24gPSBoZWFkZXJzLmdldCgnTG9jYXRpb24nKTtcblxuXHRcdFx0XHQvLyBIVFRQIGZldGNoIHN0ZXAgNS4zXG5cdFx0XHRcdGNvbnN0IGxvY2F0aW9uVVJMID0gbG9jYXRpb24gPT09IG51bGwgPyBudWxsIDogcmVzb2x2ZV91cmwocmVxdWVzdC51cmwsIGxvY2F0aW9uKTtcblxuXHRcdFx0XHQvLyBIVFRQIGZldGNoIHN0ZXAgNS41XG5cdFx0XHRcdHN3aXRjaCAocmVxdWVzdC5yZWRpcmVjdCkge1xuXHRcdFx0XHRcdGNhc2UgJ2Vycm9yJzpcblx0XHRcdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgcmVkaXJlY3QgbW9kZSBpcyBzZXQgdG8gZXJyb3I6ICR7cmVxdWVzdC51cmx9YCwgJ25vLXJlZGlyZWN0JykpO1xuXHRcdFx0XHRcdFx0ZmluYWxpemUoKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRjYXNlICdtYW51YWwnOlxuXHRcdFx0XHRcdFx0Ly8gbm9kZS1mZXRjaC1zcGVjaWZpYyBzdGVwOiBtYWtlIG1hbnVhbCByZWRpcmVjdCBhIGJpdCBlYXNpZXIgdG8gdXNlIGJ5IHNldHRpbmcgdGhlIExvY2F0aW9uIGhlYWRlciB2YWx1ZSB0byB0aGUgcmVzb2x2ZWQgVVJMLlxuXHRcdFx0XHRcdFx0aWYgKGxvY2F0aW9uVVJMICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdC8vIGhhbmRsZSBjb3JydXB0ZWQgaGVhZGVyXG5cdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0aGVhZGVycy5zZXQoJ0xvY2F0aW9uJywgbG9jYXRpb25VUkwpO1xuXHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogbm9kZWpzIHNlcnZlciBwcmV2ZW50IGludmFsaWQgcmVzcG9uc2UgaGVhZGVycywgd2UgY2FuJ3QgdGVzdCB0aGlzIHRocm91Z2ggbm9ybWFsIHJlcXVlc3Rcblx0XHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnZm9sbG93Jzpcblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCAyXG5cdFx0XHRcdFx0XHRpZiAobG9jYXRpb25VUkwgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCA1XG5cdFx0XHRcdFx0XHRpZiAocmVxdWVzdC5jb3VudGVyID49IHJlcXVlc3QuZm9sbG93KSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgbWF4aW11bSByZWRpcmVjdCByZWFjaGVkIGF0OiAke3JlcXVlc3QudXJsfWAsICdtYXgtcmVkaXJlY3QnKSk7XG5cdFx0XHRcdFx0XHRcdGZpbmFsaXplKCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDYgKGNvdW50ZXIgaW5jcmVtZW50KVxuXHRcdFx0XHRcdFx0Ly8gQ3JlYXRlIGEgbmV3IFJlcXVlc3Qgb2JqZWN0LlxuXHRcdFx0XHRcdFx0Y29uc3QgcmVxdWVzdE9wdHMgPSB7XG5cdFx0XHRcdFx0XHRcdGhlYWRlcnM6IG5ldyBIZWFkZXJzKHJlcXVlc3QuaGVhZGVycyksXG5cdFx0XHRcdFx0XHRcdGZvbGxvdzogcmVxdWVzdC5mb2xsb3csXG5cdFx0XHRcdFx0XHRcdGNvdW50ZXI6IHJlcXVlc3QuY291bnRlciArIDEsXG5cdFx0XHRcdFx0XHRcdGFnZW50OiByZXF1ZXN0LmFnZW50LFxuXHRcdFx0XHRcdFx0XHRjb21wcmVzczogcmVxdWVzdC5jb21wcmVzcyxcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcblx0XHRcdFx0XHRcdFx0Ym9keTogcmVxdWVzdC5ib2R5LFxuXHRcdFx0XHRcdFx0XHRzaWduYWw6IHJlcXVlc3Quc2lnbmFsLFxuXHRcdFx0XHRcdFx0XHR0aW1lb3V0OiByZXF1ZXN0LnRpbWVvdXRcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCA5XG5cdFx0XHRcdFx0XHRpZiAocmVzLnN0YXR1c0NvZGUgIT09IDMwMyAmJiByZXF1ZXN0LmJvZHkgJiYgZ2V0VG90YWxCeXRlcyhyZXF1ZXN0KSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoJ0Nhbm5vdCBmb2xsb3cgcmVkaXJlY3Qgd2l0aCBib2R5IGJlaW5nIGEgcmVhZGFibGUgc3RyZWFtJywgJ3Vuc3VwcG9ydGVkLXJlZGlyZWN0JykpO1xuXHRcdFx0XHRcdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCAxMVxuXHRcdFx0XHRcdFx0aWYgKHJlcy5zdGF0dXNDb2RlID09PSAzMDMgfHwgKHJlcy5zdGF0dXNDb2RlID09PSAzMDEgfHwgcmVzLnN0YXR1c0NvZGUgPT09IDMwMikgJiYgcmVxdWVzdC5tZXRob2QgPT09ICdQT1NUJykge1xuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0T3B0cy5tZXRob2QgPSAnR0VUJztcblx0XHRcdFx0XHRcdFx0cmVxdWVzdE9wdHMuYm9keSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0cmVxdWVzdE9wdHMuaGVhZGVycy5kZWxldGUoJ2NvbnRlbnQtbGVuZ3RoJyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCAxNVxuXHRcdFx0XHRcdFx0cmVzb2x2ZShmZXRjaChuZXcgUmVxdWVzdChsb2NhdGlvblVSTCwgcmVxdWVzdE9wdHMpKSk7XG5cdFx0XHRcdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIHByZXBhcmUgcmVzcG9uc2Vcblx0XHRcdHJlcy5vbmNlKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmIChzaWduYWwpIHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0QW5kRmluYWxpemUpO1xuXHRcdFx0fSk7XG5cdFx0XHRsZXQgYm9keSA9IHJlcy5waXBlKG5ldyBQYXNzVGhyb3VnaCQxKCkpO1xuXG5cdFx0XHRjb25zdCByZXNwb25zZV9vcHRpb25zID0ge1xuXHRcdFx0XHR1cmw6IHJlcXVlc3QudXJsLFxuXHRcdFx0XHRzdGF0dXM6IHJlcy5zdGF0dXNDb2RlLFxuXHRcdFx0XHRzdGF0dXNUZXh0OiByZXMuc3RhdHVzTWVzc2FnZSxcblx0XHRcdFx0aGVhZGVyczogaGVhZGVycyxcblx0XHRcdFx0c2l6ZTogcmVxdWVzdC5zaXplLFxuXHRcdFx0XHR0aW1lb3V0OiByZXF1ZXN0LnRpbWVvdXQsXG5cdFx0XHRcdGNvdW50ZXI6IHJlcXVlc3QuY291bnRlclxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gSFRUUC1uZXR3b3JrIGZldGNoIHN0ZXAgMTIuMS4xLjNcblx0XHRcdGNvbnN0IGNvZGluZ3MgPSBoZWFkZXJzLmdldCgnQ29udGVudC1FbmNvZGluZycpO1xuXG5cdFx0XHQvLyBIVFRQLW5ldHdvcmsgZmV0Y2ggc3RlcCAxMi4xLjEuNDogaGFuZGxlIGNvbnRlbnQgY29kaW5nc1xuXG5cdFx0XHQvLyBpbiBmb2xsb3dpbmcgc2NlbmFyaW9zIHdlIGlnbm9yZSBjb21wcmVzc2lvbiBzdXBwb3J0XG5cdFx0XHQvLyAxLiBjb21wcmVzc2lvbiBzdXBwb3J0IGlzIGRpc2FibGVkXG5cdFx0XHQvLyAyLiBIRUFEIHJlcXVlc3Rcblx0XHRcdC8vIDMuIG5vIENvbnRlbnQtRW5jb2RpbmcgaGVhZGVyXG5cdFx0XHQvLyA0LiBubyBjb250ZW50IHJlc3BvbnNlICgyMDQpXG5cdFx0XHQvLyA1LiBjb250ZW50IG5vdCBtb2RpZmllZCByZXNwb25zZSAoMzA0KVxuXHRcdFx0aWYgKCFyZXF1ZXN0LmNvbXByZXNzIHx8IHJlcXVlc3QubWV0aG9kID09PSAnSEVBRCcgfHwgY29kaW5ncyA9PT0gbnVsbCB8fCByZXMuc3RhdHVzQ29kZSA9PT0gMjA0IHx8IHJlcy5zdGF0dXNDb2RlID09PSAzMDQpIHtcblx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2Vfb3B0aW9ucyk7XG5cdFx0XHRcdHJlc29sdmUocmVzcG9uc2UpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZvciBOb2RlIHY2K1xuXHRcdFx0Ly8gQmUgbGVzcyBzdHJpY3Qgd2hlbiBkZWNvZGluZyBjb21wcmVzc2VkIHJlc3BvbnNlcywgc2luY2Ugc29tZXRpbWVzXG5cdFx0XHQvLyBzZXJ2ZXJzIHNlbmQgc2xpZ2h0bHkgaW52YWxpZCByZXNwb25zZXMgdGhhdCBhcmUgc3RpbGwgYWNjZXB0ZWRcblx0XHRcdC8vIGJ5IGNvbW1vbiBicm93c2Vycy5cblx0XHRcdC8vIEFsd2F5cyB1c2luZyBaX1NZTkNfRkxVU0ggaXMgd2hhdCBjVVJMIGRvZXMuXG5cdFx0XHRjb25zdCB6bGliT3B0aW9ucyA9IHtcblx0XHRcdFx0Zmx1c2g6IHpsaWIuWl9TWU5DX0ZMVVNILFxuXHRcdFx0XHRmaW5pc2hGbHVzaDogemxpYi5aX1NZTkNfRkxVU0hcblx0XHRcdH07XG5cblx0XHRcdC8vIGZvciBnemlwXG5cdFx0XHRpZiAoY29kaW5ncyA9PSAnZ3ppcCcgfHwgY29kaW5ncyA9PSAneC1nemlwJykge1xuXHRcdFx0XHRib2R5ID0gYm9keS5waXBlKHpsaWIuY3JlYXRlR3VuemlwKHpsaWJPcHRpb25zKSk7XG5cdFx0XHRcdHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGJvZHksIHJlc3BvbnNlX29wdGlvbnMpO1xuXHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBmb3IgZGVmbGF0ZVxuXHRcdFx0aWYgKGNvZGluZ3MgPT0gJ2RlZmxhdGUnIHx8IGNvZGluZ3MgPT0gJ3gtZGVmbGF0ZScpIHtcblx0XHRcdFx0Ly8gaGFuZGxlIHRoZSBpbmZhbW91cyByYXcgZGVmbGF0ZSByZXNwb25zZSBmcm9tIG9sZCBzZXJ2ZXJzXG5cdFx0XHRcdC8vIGEgaGFjayBmb3Igb2xkIElJUyBhbmQgQXBhY2hlIHNlcnZlcnNcblx0XHRcdFx0Y29uc3QgcmF3ID0gcmVzLnBpcGUobmV3IFBhc3NUaHJvdWdoJDEoKSk7XG5cdFx0XHRcdHJhdy5vbmNlKCdkYXRhJywgZnVuY3Rpb24gKGNodW5rKSB7XG5cdFx0XHRcdFx0Ly8gc2VlIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzc1MTk4Mjhcblx0XHRcdFx0XHRpZiAoKGNodW5rWzBdICYgMHgwRikgPT09IDB4MDgpIHtcblx0XHRcdFx0XHRcdGJvZHkgPSBib2R5LnBpcGUoemxpYi5jcmVhdGVJbmZsYXRlKCkpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRib2R5ID0gYm9keS5waXBlKHpsaWIuY3JlYXRlSW5mbGF0ZVJhdygpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2Vfb3B0aW9ucyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIGZvciBiclxuXHRcdFx0aWYgKGNvZGluZ3MgPT0gJ2JyJyAmJiB0eXBlb2YgemxpYi5jcmVhdGVCcm90bGlEZWNvbXByZXNzID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdGJvZHkgPSBib2R5LnBpcGUoemxpYi5jcmVhdGVCcm90bGlEZWNvbXByZXNzKCkpO1xuXHRcdFx0XHRyZXNwb25zZSA9IG5ldyBSZXNwb25zZShib2R5LCByZXNwb25zZV9vcHRpb25zKTtcblx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gb3RoZXJ3aXNlLCB1c2UgcmVzcG9uc2UgYXMtaXNcblx0XHRcdHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGJvZHksIHJlc3BvbnNlX29wdGlvbnMpO1xuXHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XG5cdFx0fSk7XG5cblx0XHR3cml0ZVRvU3RyZWFtKHJlcSwgcmVxdWVzdCk7XG5cdH0pO1xufVxuLyoqXG4gKiBSZWRpcmVjdCBjb2RlIG1hdGNoaW5nXG4gKlxuICogQHBhcmFtICAgTnVtYmVyICAgY29kZSAgU3RhdHVzIGNvZGVcbiAqIEByZXR1cm4gIEJvb2xlYW5cbiAqL1xuZmV0Y2guaXNSZWRpcmVjdCA9IGZ1bmN0aW9uIChjb2RlKSB7XG5cdHJldHVybiBjb2RlID09PSAzMDEgfHwgY29kZSA9PT0gMzAyIHx8IGNvZGUgPT09IDMwMyB8fCBjb2RlID09PSAzMDcgfHwgY29kZSA9PT0gMzA4O1xufTtcblxuLy8gZXhwb3NlIFByb21pc2VcbmZldGNoLlByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcblxuZnVuY3Rpb24gZ2V0X3BhZ2VfaGFuZGxlcihcblx0bWFuaWZlc3QsXG5cdHNlc3Npb25fZ2V0dGVyXG4pIHtcblx0Y29uc3QgZ2V0X2J1aWxkX2luZm8gPSBkZXZcblx0XHQ/ICgpID0+IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihidWlsZF9kaXIsICdidWlsZC5qc29uJyksICd1dGYtOCcpKVxuXHRcdDogKGFzc2V0cyA9PiAoKSA9PiBhc3NldHMpKEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihidWlsZF9kaXIsICdidWlsZC5qc29uJyksICd1dGYtOCcpKSk7XG5cblx0Y29uc3QgdGVtcGxhdGUgPSBkZXZcblx0XHQ/ICgpID0+IHJlYWRfdGVtcGxhdGUoc3JjX2Rpcilcblx0XHQ6IChzdHIgPT4gKCkgPT4gc3RyKShyZWFkX3RlbXBsYXRlKGJ1aWxkX2RpcikpO1xuXG5cdGNvbnN0IGhhc19zZXJ2aWNlX3dvcmtlciA9IGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKGJ1aWxkX2RpciwgJ3NlcnZpY2Utd29ya2VyLmpzJykpO1xuXG5cdGNvbnN0IHsgc2VydmVyX3JvdXRlcywgcGFnZXMgfSA9IG1hbmlmZXN0O1xuXHRjb25zdCBlcnJvcl9yb3V0ZSA9IG1hbmlmZXN0LmVycm9yO1xuXG5cdGZ1bmN0aW9uIGJhaWwocmVxLCByZXMsIGVycikge1xuXHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcblxuXHRcdGNvbnN0IG1lc3NhZ2UgPSBkZXYgPyBlc2NhcGVfaHRtbChlcnIubWVzc2FnZSkgOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJztcblxuXHRcdHJlcy5zdGF0dXNDb2RlID0gNTAwO1xuXHRcdHJlcy5lbmQoYDxwcmU+JHttZXNzYWdlfTwvcHJlPmApO1xuXHR9XG5cblx0ZnVuY3Rpb24gaGFuZGxlX2Vycm9yKHJlcSwgcmVzLCBzdGF0dXNDb2RlLCBlcnJvcikge1xuXHRcdGhhbmRsZV9wYWdlKHtcblx0XHRcdHBhdHRlcm46IG51bGwsXG5cdFx0XHRwYXJ0czogW1xuXHRcdFx0XHR7IG5hbWU6IG51bGwsIGNvbXBvbmVudDogZXJyb3Jfcm91dGUgfVxuXHRcdFx0XVxuXHRcdH0sIHJlcSwgcmVzLCBzdGF0dXNDb2RlLCBlcnJvciB8fCBuZXcgRXJyb3IoJ1Vua25vd24gZXJyb3IgaW4gcHJlbG9hZCBmdW5jdGlvbicpKTtcblx0fVxuXG5cdGFzeW5jIGZ1bmN0aW9uIGhhbmRsZV9wYWdlKHBhZ2UsIHJlcSwgcmVzLCBzdGF0dXMgPSAyMDAsIGVycm9yID0gbnVsbCkge1xuXHRcdGNvbnN0IGlzX3NlcnZpY2Vfd29ya2VyX2luZGV4ID0gcmVxLnBhdGggPT09ICcvc2VydmljZS13b3JrZXItaW5kZXguaHRtbCc7XG5cdFx0Y29uc3QgYnVpbGRfaW5mb1xuXG5cblxuXG4gPSBnZXRfYnVpbGRfaW5mbygpO1xuXG5cdFx0cmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQvaHRtbCcpO1xuXHRcdHJlcy5zZXRIZWFkZXIoJ0NhY2hlLUNvbnRyb2wnLCBkZXYgPyAnbm8tY2FjaGUnIDogJ21heC1hZ2U9NjAwJyk7XG5cblx0XHQvLyBwcmVsb2FkIG1haW4uanMgYW5kIGN1cnJlbnQgcm91dGVcblx0XHQvLyBUT0RPIGRldGVjdCBvdGhlciBzdHVmZiB3ZSBjYW4gcHJlbG9hZD8gaW1hZ2VzLCBDU1MsIGZvbnRzP1xuXHRcdGxldCBwcmVsb2FkZWRfY2h1bmtzID0gQXJyYXkuaXNBcnJheShidWlsZF9pbmZvLmFzc2V0cy5tYWluKSA/IGJ1aWxkX2luZm8uYXNzZXRzLm1haW4gOiBbYnVpbGRfaW5mby5hc3NldHMubWFpbl07XG5cdFx0aWYgKCFlcnJvciAmJiAhaXNfc2VydmljZV93b3JrZXJfaW5kZXgpIHtcblx0XHRcdHBhZ2UucGFydHMuZm9yRWFjaChwYXJ0ID0+IHtcblx0XHRcdFx0aWYgKCFwYXJ0KSByZXR1cm47XG5cblx0XHRcdFx0Ly8gdXNpbmcgY29uY2F0IGJlY2F1c2UgaXQgY291bGQgYmUgYSBzdHJpbmcgb3IgYW4gYXJyYXkuIHRoYW5rcyB3ZWJwYWNrIVxuXHRcdFx0XHRwcmVsb2FkZWRfY2h1bmtzID0gcHJlbG9hZGVkX2NodW5rcy5jb25jYXQoYnVpbGRfaW5mby5hc3NldHNbcGFydC5uYW1lXSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZiAoYnVpbGRfaW5mby5idW5kbGVyID09PSAncm9sbHVwJykge1xuXHRcdFx0Ly8gVE9ETyBhZGQgZGVwZW5kZW5jaWVzIGFuZCBDU1Ncblx0XHRcdGNvbnN0IGxpbmsgPSBwcmVsb2FkZWRfY2h1bmtzXG5cdFx0XHRcdC5maWx0ZXIoZmlsZSA9PiBmaWxlICYmICFmaWxlLm1hdGNoKC9cXC5tYXAkLykpXG5cdFx0XHRcdC5tYXAoZmlsZSA9PiBgPCR7cmVxLmJhc2VVcmx9L2NsaWVudC8ke2ZpbGV9PjtyZWw9XCJtb2R1bGVwcmVsb2FkXCJgKVxuXHRcdFx0XHQuam9pbignLCAnKTtcblxuXHRcdFx0cmVzLnNldEhlYWRlcignTGluaycsIGxpbmspO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBsaW5rID0gcHJlbG9hZGVkX2NodW5rc1xuXHRcdFx0XHQuZmlsdGVyKGZpbGUgPT4gZmlsZSAmJiAhZmlsZS5tYXRjaCgvXFwubWFwJC8pKVxuXHRcdFx0XHQubWFwKChmaWxlKSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgYXMgPSAvXFwuY3NzJC8udGVzdChmaWxlKSA/ICdzdHlsZScgOiAnc2NyaXB0Jztcblx0XHRcdFx0XHRyZXR1cm4gYDwke3JlcS5iYXNlVXJsfS9jbGllbnQvJHtmaWxlfT47cmVsPVwicHJlbG9hZFwiO2FzPVwiJHthc31cImA7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5qb2luKCcsICcpO1xuXG5cdFx0XHRyZXMuc2V0SGVhZGVyKCdMaW5rJywgbGluayk7XG5cdFx0fVxuXG5cdFx0bGV0IHNlc3Npb247XG5cdFx0dHJ5IHtcblx0XHRcdHNlc3Npb24gPSBhd2FpdCBzZXNzaW9uX2dldHRlcihyZXEsIHJlcyk7XG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRyZXR1cm4gYmFpbChyZXEsIHJlcywgZXJyKTtcblx0XHR9XG5cblx0XHRsZXQgcmVkaXJlY3Q7XG5cdFx0bGV0IHByZWxvYWRfZXJyb3I7XG5cblx0XHRjb25zdCBwcmVsb2FkX2NvbnRleHQgPSB7XG5cdFx0XHRyZWRpcmVjdDogKHN0YXR1c0NvZGUsIGxvY2F0aW9uKSA9PiB7XG5cdFx0XHRcdGlmIChyZWRpcmVjdCAmJiAocmVkaXJlY3Quc3RhdHVzQ29kZSAhPT0gc3RhdHVzQ29kZSB8fCByZWRpcmVjdC5sb2NhdGlvbiAhPT0gbG9jYXRpb24pKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDb25mbGljdGluZyByZWRpcmVjdHNgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsb2NhdGlvbiA9IGxvY2F0aW9uLnJlcGxhY2UoL15cXC8vZywgJycpOyAvLyBsZWFkaW5nIHNsYXNoIChvbmx5KVxuXHRcdFx0XHRyZWRpcmVjdCA9IHsgc3RhdHVzQ29kZSwgbG9jYXRpb24gfTtcblx0XHRcdH0sXG5cdFx0XHRlcnJvcjogKHN0YXR1c0NvZGUsIG1lc3NhZ2UpID0+IHtcblx0XHRcdFx0cHJlbG9hZF9lcnJvciA9IHsgc3RhdHVzQ29kZSwgbWVzc2FnZSB9O1xuXHRcdFx0fSxcblx0XHRcdGZldGNoOiAodXJsLCBvcHRzKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHBhcnNlZCA9IG5ldyBVcmwuVVJMKHVybCwgYGh0dHA6Ly8xMjcuMC4wLjE6JHtwcm9jZXNzLmVudi5QT1JUfSR7cmVxLmJhc2VVcmwgPyByZXEuYmFzZVVybCArICcvJyA6Jyd9YCk7XG5cblx0XHRcdFx0b3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpO1xuXG5cdFx0XHRcdGNvbnN0IGluY2x1ZGVfY3JlZGVudGlhbHMgPSAoXG5cdFx0XHRcdFx0b3B0cy5jcmVkZW50aWFscyA9PT0gJ2luY2x1ZGUnIHx8XG5cdFx0XHRcdFx0b3B0cy5jcmVkZW50aWFscyAhPT0gJ29taXQnICYmIHBhcnNlZC5vcmlnaW4gPT09IGBodHRwOi8vMTI3LjAuMC4xOiR7cHJvY2Vzcy5lbnYuUE9SVH1gXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0aWYgKGluY2x1ZGVfY3JlZGVudGlhbHMpIHtcblx0XHRcdFx0XHRvcHRzLmhlYWRlcnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRzLmhlYWRlcnMpO1xuXG5cdFx0XHRcdFx0Y29uc3QgY29va2llcyA9IE9iamVjdC5hc3NpZ24oXG5cdFx0XHRcdFx0XHR7fSxcblx0XHRcdFx0XHRcdGNvb2tpZS5wYXJzZShyZXEuaGVhZGVycy5jb29raWUgfHwgJycpLFxuXHRcdFx0XHRcdFx0Y29va2llLnBhcnNlKG9wdHMuaGVhZGVycy5jb29raWUgfHwgJycpXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdGNvbnN0IHNldF9jb29raWUgPSByZXMuZ2V0SGVhZGVyKCdTZXQtQ29va2llJyk7XG5cdFx0XHRcdFx0KEFycmF5LmlzQXJyYXkoc2V0X2Nvb2tpZSkgPyBzZXRfY29va2llIDogW3NldF9jb29raWVdKS5mb3JFYWNoKHN0ciA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IC8oW149XSspPShbXjtdKykvLmV4ZWMoc3RyKTtcblx0XHRcdFx0XHRcdGlmIChtYXRjaCkgY29va2llc1ttYXRjaFsxXV0gPSBtYXRjaFsyXTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdGNvbnN0IHN0ciA9IE9iamVjdC5rZXlzKGNvb2tpZXMpXG5cdFx0XHRcdFx0XHQubWFwKGtleSA9PiBgJHtrZXl9PSR7Y29va2llc1trZXldfWApXG5cdFx0XHRcdFx0XHQuam9pbignOyAnKTtcblxuXHRcdFx0XHRcdG9wdHMuaGVhZGVycy5jb29raWUgPSBzdHI7XG5cblx0XHRcdFx0XHRpZiAoIW9wdHMuaGVhZGVycy5hdXRob3JpemF0aW9uICYmIHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24pIHtcblx0XHRcdFx0XHRcdG9wdHMuaGVhZGVycy5hdXRob3JpemF0aW9uID0gcmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZmV0Y2gocGFyc2VkLmhyZWYsIG9wdHMpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRsZXQgcHJlbG9hZGVkO1xuXHRcdGxldCBtYXRjaDtcblx0XHRsZXQgcGFyYW1zO1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJvb3RfcHJlbG9hZGVkID0gbWFuaWZlc3Qucm9vdF9wcmVsb2FkXG5cdFx0XHRcdD8gbWFuaWZlc3Qucm9vdF9wcmVsb2FkLmNhbGwocHJlbG9hZF9jb250ZXh0LCB7XG5cdFx0XHRcdFx0aG9zdDogcmVxLmhlYWRlcnMuaG9zdCxcblx0XHRcdFx0XHRwYXRoOiByZXEucGF0aCxcblx0XHRcdFx0XHRxdWVyeTogcmVxLnF1ZXJ5LFxuXHRcdFx0XHRcdHBhcmFtczoge31cblx0XHRcdFx0fSwgc2Vzc2lvbilcblx0XHRcdFx0OiB7fTtcblxuXHRcdFx0bWF0Y2ggPSBlcnJvciA/IG51bGwgOiBwYWdlLnBhdHRlcm4uZXhlYyhyZXEucGF0aCk7XG5cblxuXHRcdFx0bGV0IHRvUHJlbG9hZCA9IFtyb290X3ByZWxvYWRlZF07XG5cdFx0XHRpZiAoIWlzX3NlcnZpY2Vfd29ya2VyX2luZGV4KSB7XG5cdFx0XHRcdHRvUHJlbG9hZCA9IHRvUHJlbG9hZC5jb25jYXQocGFnZS5wYXJ0cy5tYXAocGFydCA9PiB7XG5cdFx0XHRcdFx0aWYgKCFwYXJ0KSByZXR1cm4gbnVsbDtcblxuXHRcdFx0XHRcdC8vIHRoZSBkZWVwZXN0IGxldmVsIGlzIHVzZWQgYmVsb3csIHRvIGluaXRpYWxpc2UgdGhlIHN0b3JlXG5cdFx0XHRcdFx0cGFyYW1zID0gcGFydC5wYXJhbXMgPyBwYXJ0LnBhcmFtcyhtYXRjaCkgOiB7fTtcblxuXHRcdFx0XHRcdHJldHVybiBwYXJ0LnByZWxvYWRcblx0XHRcdFx0XHRcdD8gcGFydC5wcmVsb2FkLmNhbGwocHJlbG9hZF9jb250ZXh0LCB7XG5cdFx0XHRcdFx0XHRcdGhvc3Q6IHJlcS5oZWFkZXJzLmhvc3QsXG5cdFx0XHRcdFx0XHRcdHBhdGg6IHJlcS5wYXRoLFxuXHRcdFx0XHRcdFx0XHRxdWVyeTogcmVxLnF1ZXJ5LFxuXHRcdFx0XHRcdFx0XHRwYXJhbXNcblx0XHRcdFx0XHRcdH0sIHNlc3Npb24pXG5cdFx0XHRcdFx0XHQ6IHt9O1xuXHRcdFx0XHR9KSk7XG5cdFx0XHR9XG5cblx0XHRcdHByZWxvYWRlZCA9IGF3YWl0IFByb21pc2UuYWxsKHRvUHJlbG9hZCk7XG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0cmV0dXJuIGJhaWwocmVxLCByZXMsIGVycilcblx0XHRcdH1cblxuXHRcdFx0cHJlbG9hZF9lcnJvciA9IHsgc3RhdHVzQ29kZTogNTAwLCBtZXNzYWdlOiBlcnIgfTtcblx0XHRcdHByZWxvYWRlZCA9IFtdOyAvLyBhcHBlYXNlIFR5cGVTY3JpcHRcblx0XHR9XG5cblx0XHR0cnkge1xuXHRcdFx0aWYgKHJlZGlyZWN0KSB7XG5cdFx0XHRcdGNvbnN0IGxvY2F0aW9uID0gVXJsLnJlc29sdmUoKHJlcS5iYXNlVXJsIHx8ICcnKSArICcvJywgcmVkaXJlY3QubG9jYXRpb24pO1xuXG5cdFx0XHRcdHJlcy5zdGF0dXNDb2RlID0gcmVkaXJlY3Quc3RhdHVzQ29kZTtcblx0XHRcdFx0cmVzLnNldEhlYWRlcignTG9jYXRpb24nLCBsb2NhdGlvbik7XG5cdFx0XHRcdHJlcy5lbmQoKTtcblxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmIChwcmVsb2FkX2Vycm9yKSB7XG5cdFx0XHRcdGhhbmRsZV9lcnJvcihyZXEsIHJlcywgcHJlbG9hZF9lcnJvci5zdGF0dXNDb2RlLCBwcmVsb2FkX2Vycm9yLm1lc3NhZ2UpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHNlZ21lbnRzID0gcmVxLnBhdGguc3BsaXQoJy8nKS5maWx0ZXIoQm9vbGVhbik7XG5cblx0XHRcdC8vIFRPRE8gbWFrZSB0aGlzIGxlc3MgY29uZnVzaW5nXG5cdFx0XHRjb25zdCBsYXlvdXRfc2VnbWVudHMgPSBbc2VnbWVudHNbMF1dO1xuXHRcdFx0bGV0IGwgPSAxO1xuXG5cdFx0XHRwYWdlLnBhcnRzLmZvckVhY2goKHBhcnQsIGkpID0+IHtcblx0XHRcdFx0bGF5b3V0X3NlZ21lbnRzW2xdID0gc2VnbWVudHNbaSArIDFdO1xuXHRcdFx0XHRpZiAoIXBhcnQpIHJldHVybiBudWxsO1xuXHRcdFx0XHRsKys7XG5cdFx0XHR9KTtcblxuXHRcdFx0Y29uc3QgcHJvcHMgPSB7XG5cdFx0XHRcdHN0b3Jlczoge1xuXHRcdFx0XHRcdHBhZ2U6IHtcblx0XHRcdFx0XHRcdHN1YnNjcmliZTogd3JpdGFibGUoe1xuXHRcdFx0XHRcdFx0XHRob3N0OiByZXEuaGVhZGVycy5ob3N0LFxuXHRcdFx0XHRcdFx0XHRwYXRoOiByZXEucGF0aCxcblx0XHRcdFx0XHRcdFx0cXVlcnk6IHJlcS5xdWVyeSxcblx0XHRcdFx0XHRcdFx0cGFyYW1zXG5cdFx0XHRcdFx0XHR9KS5zdWJzY3JpYmVcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHByZWxvYWRpbmc6IHtcblx0XHRcdFx0XHRcdHN1YnNjcmliZTogd3JpdGFibGUobnVsbCkuc3Vic2NyaWJlXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZXNzaW9uOiB3cml0YWJsZShzZXNzaW9uKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZWdtZW50czogbGF5b3V0X3NlZ21lbnRzLFxuXHRcdFx0XHRzdGF0dXM6IGVycm9yID8gc3RhdHVzIDogMjAwLFxuXHRcdFx0XHRlcnJvcjogZXJyb3IgPyBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IgOiB7IG1lc3NhZ2U6IGVycm9yIH0gOiBudWxsLFxuXHRcdFx0XHRsZXZlbDA6IHtcblx0XHRcdFx0XHRwcm9wczogcHJlbG9hZGVkWzBdXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGxldmVsMToge1xuXHRcdFx0XHRcdHNlZ21lbnQ6IHNlZ21lbnRzWzBdLFxuXHRcdFx0XHRcdHByb3BzOiB7fVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAoIWlzX3NlcnZpY2Vfd29ya2VyX2luZGV4KSB7XG5cdFx0XHRcdGxldCBsID0gMTtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYWdlLnBhcnRzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdFx0Y29uc3QgcGFydCA9IHBhZ2UucGFydHNbaV07XG5cdFx0XHRcdFx0aWYgKCFwYXJ0KSBjb250aW51ZTtcblxuXHRcdFx0XHRcdHByb3BzW2BsZXZlbCR7bCsrfWBdID0ge1xuXHRcdFx0XHRcdFx0Y29tcG9uZW50OiBwYXJ0LmNvbXBvbmVudCxcblx0XHRcdFx0XHRcdHByb3BzOiBwcmVsb2FkZWRbaSArIDFdIHx8IHt9LFxuXHRcdFx0XHRcdFx0c2VnbWVudDogc2VnbWVudHNbaV1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHsgaHRtbCwgaGVhZCwgY3NzIH0gPSBBcHAucmVuZGVyKHByb3BzKTtcblxuXHRcdFx0Y29uc3Qgc2VyaWFsaXplZCA9IHtcblx0XHRcdFx0cHJlbG9hZGVkOiBgWyR7cHJlbG9hZGVkLm1hcChkYXRhID0+IHRyeV9zZXJpYWxpemUoZGF0YSkpLmpvaW4oJywnKX1dYCxcblx0XHRcdFx0c2Vzc2lvbjogc2Vzc2lvbiAmJiB0cnlfc2VyaWFsaXplKHNlc3Npb24sIGVyciA9PiB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gc2VyaWFsaXplIHNlc3Npb24gZGF0YTogJHtlcnIubWVzc2FnZX1gKTtcblx0XHRcdFx0fSksXG5cdFx0XHRcdGVycm9yOiBlcnJvciAmJiBzZXJpYWxpemVfZXJyb3IocHJvcHMuZXJyb3IpXG5cdFx0XHR9O1xuXG5cdFx0XHRsZXQgc2NyaXB0ID0gYF9fU0FQUEVSX189eyR7W1xuXHRcdFx0XHRlcnJvciAmJiBgZXJyb3I6JHtzZXJpYWxpemVkLmVycm9yfSxzdGF0dXM6JHtzdGF0dXN9YCxcblx0XHRcdFx0YGJhc2VVcmw6XCIke3JlcS5iYXNlVXJsfVwiYCxcblx0XHRcdFx0c2VyaWFsaXplZC5wcmVsb2FkZWQgJiYgYHByZWxvYWRlZDoke3NlcmlhbGl6ZWQucHJlbG9hZGVkfWAsXG5cdFx0XHRcdHNlcmlhbGl6ZWQuc2Vzc2lvbiAmJiBgc2Vzc2lvbjoke3NlcmlhbGl6ZWQuc2Vzc2lvbn1gXG5cdFx0XHRdLmZpbHRlcihCb29sZWFuKS5qb2luKCcsJyl9fTtgO1xuXG5cdFx0XHRpZiAoaGFzX3NlcnZpY2Vfd29ya2VyKSB7XG5cdFx0XHRcdHNjcmlwdCArPSBgaWYoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvciluYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlcignJHtyZXEuYmFzZVVybH0vc2VydmljZS13b3JrZXIuanMnKTtgO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBmaWxlID0gW10uY29uY2F0KGJ1aWxkX2luZm8uYXNzZXRzLm1haW4pLmZpbHRlcihmaWxlID0+IGZpbGUgJiYgL1xcLmpzJC8udGVzdChmaWxlKSlbMF07XG5cdFx0XHRjb25zdCBtYWluID0gYCR7cmVxLmJhc2VVcmx9L2NsaWVudC8ke2ZpbGV9YDtcblxuXHRcdFx0aWYgKGJ1aWxkX2luZm8uYnVuZGxlciA9PT0gJ3JvbGx1cCcpIHtcblx0XHRcdFx0aWYgKGJ1aWxkX2luZm8ubGVnYWN5X2Fzc2V0cykge1xuXHRcdFx0XHRcdGNvbnN0IGxlZ2FjeV9tYWluID0gYCR7cmVxLmJhc2VVcmx9L2NsaWVudC9sZWdhY3kvJHtidWlsZF9pbmZvLmxlZ2FjeV9hc3NldHMubWFpbn1gO1xuXHRcdFx0XHRcdHNjcmlwdCArPSBgKGZ1bmN0aW9uKCl7dHJ5e2V2YWwoXCJhc3luYyBmdW5jdGlvbiB4KCl7fVwiKTt2YXIgbWFpbj1cIiR7bWFpbn1cIn1jYXRjaChlKXttYWluPVwiJHtsZWdhY3lfbWFpbn1cIn07dmFyIHM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTt0cnl7bmV3IEZ1bmN0aW9uKFwiaWYoMClpbXBvcnQoJycpXCIpKCk7cy5zcmM9bWFpbjtzLnR5cGU9XCJtb2R1bGVcIjtzLmNyb3NzT3JpZ2luPVwidXNlLWNyZWRlbnRpYWxzXCI7fWNhdGNoKGUpe3Muc3JjPVwiJHtyZXEuYmFzZVVybH0vY2xpZW50L3NoaW1wb3J0QCR7YnVpbGRfaW5mby5zaGltcG9ydH0uanNcIjtzLnNldEF0dHJpYnV0ZShcImRhdGEtbWFpblwiLG1haW4pO31kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHMpO30oKSk7YDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzY3JpcHQgKz0gYHZhciBzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7dHJ5e25ldyBGdW5jdGlvbihcImlmKDApaW1wb3J0KCcnKVwiKSgpO3Muc3JjPVwiJHttYWlufVwiO3MudHlwZT1cIm1vZHVsZVwiO3MuY3Jvc3NPcmlnaW49XCJ1c2UtY3JlZGVudGlhbHNcIjt9Y2F0Y2goZSl7cy5zcmM9XCIke3JlcS5iYXNlVXJsfS9jbGllbnQvc2hpbXBvcnRAJHtidWlsZF9pbmZvLnNoaW1wb3J0fS5qc1wiO3Muc2V0QXR0cmlidXRlKFwiZGF0YS1tYWluXCIsXCIke21haW59XCIpfWRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocylgO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzY3JpcHQgKz0gYDwvc2NyaXB0PjxzY3JpcHQgc3JjPVwiJHttYWlufVwiPmA7XG5cdFx0XHR9XG5cblx0XHRcdGxldCBzdHlsZXM7XG5cblx0XHRcdC8vIFRPRE8gbWFrZSB0aGlzIGNvbnNpc3RlbnQgYWNyb3NzIGFwcHNcblx0XHRcdC8vIFRPRE8gZW1iZWQgYnVpbGRfaW5mbyBpbiBwbGFjZWhvbGRlci50c1xuXHRcdFx0aWYgKGJ1aWxkX2luZm8uY3NzICYmIGJ1aWxkX2luZm8uY3NzLm1haW4pIHtcblx0XHRcdFx0Y29uc3QgY3NzX2NodW5rcyA9IG5ldyBTZXQoKTtcblx0XHRcdFx0aWYgKGJ1aWxkX2luZm8uY3NzLm1haW4pIGNzc19jaHVua3MuYWRkKGJ1aWxkX2luZm8uY3NzLm1haW4pO1xuXHRcdFx0XHRwYWdlLnBhcnRzLmZvckVhY2gocGFydCA9PiB7XG5cdFx0XHRcdFx0aWYgKCFwYXJ0KSByZXR1cm47XG5cdFx0XHRcdFx0Y29uc3QgY3NzX2NodW5rc19mb3JfcGFydCA9IGJ1aWxkX2luZm8uY3NzLmNodW5rc1twYXJ0LmZpbGVdO1xuXG5cdFx0XHRcdFx0aWYgKGNzc19jaHVua3NfZm9yX3BhcnQpIHtcblx0XHRcdFx0XHRcdGNzc19jaHVua3NfZm9yX3BhcnQuZm9yRWFjaChmaWxlID0+IHtcblx0XHRcdFx0XHRcdFx0Y3NzX2NodW5rcy5hZGQoZmlsZSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHN0eWxlcyA9IEFycmF5LmZyb20oY3NzX2NodW5rcylcblx0XHRcdFx0XHQubWFwKGhyZWYgPT4gYDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiY2xpZW50LyR7aHJlZn1cIj5gKVxuXHRcdFx0XHRcdC5qb2luKCcnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHN0eWxlcyA9IChjc3MgJiYgY3NzLmNvZGUgPyBgPHN0eWxlPiR7Y3NzLmNvZGV9PC9zdHlsZT5gIDogJycpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyB1c2VycyBjYW4gc2V0IGEgQ1NQIG5vbmNlIHVzaW5nIHJlcy5sb2NhbHMubm9uY2Vcblx0XHRcdGNvbnN0IG5vbmNlX2F0dHIgPSAocmVzLmxvY2FscyAmJiByZXMubG9jYWxzLm5vbmNlKSA/IGAgbm9uY2U9XCIke3Jlcy5sb2NhbHMubm9uY2V9XCJgIDogJyc7XG5cblx0XHRcdGNvbnN0IGJvZHkgPSB0ZW1wbGF0ZSgpXG5cdFx0XHRcdC5yZXBsYWNlKCclc2FwcGVyLmJhc2UlJywgKCkgPT4gYDxiYXNlIGhyZWY9XCIke3JlcS5iYXNlVXJsfS9cIj5gKVxuXHRcdFx0XHQucmVwbGFjZSgnJXNhcHBlci5zY3JpcHRzJScsICgpID0+IGA8c2NyaXB0JHtub25jZV9hdHRyfT4ke3NjcmlwdH08L3NjcmlwdD5gKVxuXHRcdFx0XHQucmVwbGFjZSgnJXNhcHBlci5odG1sJScsICgpID0+IGh0bWwpXG5cdFx0XHRcdC5yZXBsYWNlKCclc2FwcGVyLmhlYWQlJywgKCkgPT4gYDxub3NjcmlwdCBpZD0nc2FwcGVyLWhlYWQtc3RhcnQnPjwvbm9zY3JpcHQ+JHtoZWFkfTxub3NjcmlwdCBpZD0nc2FwcGVyLWhlYWQtZW5kJz48L25vc2NyaXB0PmApXG5cdFx0XHRcdC5yZXBsYWNlKCclc2FwcGVyLnN0eWxlcyUnLCAoKSA9PiBzdHlsZXMpO1xuXG5cdFx0XHRyZXMuc3RhdHVzQ29kZSA9IHN0YXR1cztcblx0XHRcdHJlcy5lbmQoYm9keSk7XG5cdFx0fSBjYXRjaChlcnIpIHtcblx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRiYWlsKHJlcSwgcmVzLCBlcnIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aGFuZGxlX2Vycm9yKHJlcSwgcmVzLCA1MDAsIGVycik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGZ1bmN0aW9uIGZpbmRfcm91dGUocmVxLCByZXMsIG5leHQpIHtcblx0XHRpZiAocmVxLnBhdGggPT09ICcvc2VydmljZS13b3JrZXItaW5kZXguaHRtbCcpIHtcblx0XHRcdGNvbnN0IGhvbWVQYWdlID0gcGFnZXMuZmluZChwYWdlID0+IHBhZ2UucGF0dGVybi50ZXN0KCcvJykpO1xuXHRcdFx0aGFuZGxlX3BhZ2UoaG9tZVBhZ2UsIHJlcSwgcmVzKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRmb3IgKGNvbnN0IHBhZ2Ugb2YgcGFnZXMpIHtcblx0XHRcdGlmIChwYWdlLnBhdHRlcm4udGVzdChyZXEucGF0aCkpIHtcblx0XHRcdFx0aGFuZGxlX3BhZ2UocGFnZSwgcmVxLCByZXMpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aGFuZGxlX2Vycm9yKHJlcSwgcmVzLCA0MDQsICdOb3QgZm91bmQnKTtcblx0fTtcbn1cblxuZnVuY3Rpb24gcmVhZF90ZW1wbGF0ZShkaXIgPSBidWlsZF9kaXIpIHtcblx0cmV0dXJuIGZzLnJlYWRGaWxlU3luYyhgJHtkaXJ9L3RlbXBsYXRlLmh0bWxgLCAndXRmLTgnKTtcbn1cblxuZnVuY3Rpb24gdHJ5X3NlcmlhbGl6ZShkYXRhLCBmYWlsKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIGRldmFsdWUoZGF0YSk7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdGlmIChmYWlsKSBmYWlsKGVycik7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cbn1cblxuLy8gRW5zdXJlIHdlIHJldHVybiBzb21ldGhpbmcgdHJ1dGh5IHNvIHRoZSBjbGllbnQgd2lsbCBub3QgcmUtcmVuZGVyIHRoZSBwYWdlIG92ZXIgdGhlIGVycm9yXG5mdW5jdGlvbiBzZXJpYWxpemVfZXJyb3IoZXJyb3IpIHtcblx0aWYgKCFlcnJvcikgcmV0dXJuIG51bGw7XG5cdGxldCBzZXJpYWxpemVkID0gdHJ5X3NlcmlhbGl6ZShlcnJvcik7XG5cdGlmICghc2VyaWFsaXplZCkge1xuXHRcdGNvbnN0IHsgbmFtZSwgbWVzc2FnZSwgc3RhY2sgfSA9IGVycm9yIDtcblx0XHRzZXJpYWxpemVkID0gdHJ5X3NlcmlhbGl6ZSh7IG5hbWUsIG1lc3NhZ2UsIHN0YWNrIH0pO1xuXHR9XG5cdGlmICghc2VyaWFsaXplZCkge1xuXHRcdHNlcmlhbGl6ZWQgPSAne30nO1xuXHR9XG5cdHJldHVybiBzZXJpYWxpemVkO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVfaHRtbChodG1sKSB7XG5cdGNvbnN0IGNoYXJzID0ge1xuXHRcdCdcIicgOiAncXVvdCcsXG5cdFx0XCInXCI6ICcjMzknLFxuXHRcdCcmJzogJ2FtcCcsXG5cdFx0JzwnIDogJ2x0Jyxcblx0XHQnPicgOiAnZ3QnXG5cdH07XG5cblx0cmV0dXJuIGh0bWwucmVwbGFjZSgvW1wiJyY8Pl0vZywgYyA9PiBgJiR7Y2hhcnNbY119O2ApO1xufVxuXG5mdW5jdGlvbiBtaWRkbGV3YXJlKG9wdHNcblxuXG4gPSB7fSkge1xuXHRjb25zdCB7IHNlc3Npb24sIGlnbm9yZSB9ID0gb3B0cztcblxuXHRsZXQgZW1pdHRlZF9iYXNlcGF0aCA9IGZhbHNlO1xuXG5cdHJldHVybiBjb21wb3NlX2hhbmRsZXJzKGlnbm9yZSwgW1xuXHRcdChyZXEsIHJlcywgbmV4dCkgPT4ge1xuXHRcdFx0aWYgKHJlcS5iYXNlVXJsID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0bGV0IHsgb3JpZ2luYWxVcmwgfSA9IHJlcTtcblx0XHRcdFx0aWYgKHJlcS51cmwgPT09ICcvJyAmJiBvcmlnaW5hbFVybFtvcmlnaW5hbFVybC5sZW5ndGggLSAxXSAhPT0gJy8nKSB7XG5cdFx0XHRcdFx0b3JpZ2luYWxVcmwgKz0gJy8nO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVxLmJhc2VVcmwgPSBvcmlnaW5hbFVybFxuXHRcdFx0XHRcdD8gb3JpZ2luYWxVcmwuc2xpY2UoMCwgLXJlcS51cmwubGVuZ3RoKVxuXHRcdFx0XHRcdDogJyc7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghZW1pdHRlZF9iYXNlcGF0aCAmJiBwcm9jZXNzLnNlbmQpIHtcblx0XHRcdFx0cHJvY2Vzcy5zZW5kKHtcblx0XHRcdFx0XHRfX3NhcHBlcl9fOiB0cnVlLFxuXHRcdFx0XHRcdGV2ZW50OiAnYmFzZXBhdGgnLFxuXHRcdFx0XHRcdGJhc2VwYXRoOiByZXEuYmFzZVVybFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRlbWl0dGVkX2Jhc2VwYXRoID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHJlcS5wYXRoID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cmVxLnBhdGggPSByZXEudXJsLnJlcGxhY2UoL1xcPy4qLywgJycpO1xuXHRcdFx0fVxuXG5cdFx0XHRuZXh0KCk7XG5cdFx0fSxcblxuXHRcdGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKGJ1aWxkX2RpciwgJ3NlcnZpY2Utd29ya2VyLmpzJykpICYmIHNlcnZlKHtcblx0XHRcdHBhdGhuYW1lOiAnL3NlcnZpY2Utd29ya2VyLmpzJyxcblx0XHRcdGNhY2hlX2NvbnRyb2w6ICduby1jYWNoZSwgbm8tc3RvcmUsIG11c3QtcmV2YWxpZGF0ZSdcblx0XHR9KSxcblxuXHRcdGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKGJ1aWxkX2RpciwgJ3NlcnZpY2Utd29ya2VyLmpzLm1hcCcpKSAmJiBzZXJ2ZSh7XG5cdFx0XHRwYXRobmFtZTogJy9zZXJ2aWNlLXdvcmtlci5qcy5tYXAnLFxuXHRcdFx0Y2FjaGVfY29udHJvbDogJ25vLWNhY2hlLCBuby1zdG9yZSwgbXVzdC1yZXZhbGlkYXRlJ1xuXHRcdH0pLFxuXG5cdFx0c2VydmUoe1xuXHRcdFx0cHJlZml4OiAnL2NsaWVudC8nLFxuXHRcdFx0Y2FjaGVfY29udHJvbDogZGV2ID8gJ25vLWNhY2hlJyA6ICdtYXgtYWdlPTMxNTM2MDAwLCBpbW11dGFibGUnXG5cdFx0fSksXG5cblx0XHRnZXRfc2VydmVyX3JvdXRlX2hhbmRsZXIobWFuaWZlc3Quc2VydmVyX3JvdXRlcyksXG5cblx0XHRnZXRfcGFnZV9oYW5kbGVyKG1hbmlmZXN0LCBzZXNzaW9uIHx8IG5vb3ApXG5cdF0uZmlsdGVyKEJvb2xlYW4pKTtcbn1cblxuZnVuY3Rpb24gY29tcG9zZV9oYW5kbGVycyhpZ25vcmUsIGhhbmRsZXJzKSB7XG5cdGNvbnN0IHRvdGFsID0gaGFuZGxlcnMubGVuZ3RoO1xuXG5cdGZ1bmN0aW9uIG50aF9oYW5kbGVyKG4sIHJlcSwgcmVzLCBuZXh0KSB7XG5cdFx0aWYgKG4gPj0gdG90YWwpIHtcblx0XHRcdHJldHVybiBuZXh0KCk7XG5cdFx0fVxuXG5cdFx0aGFuZGxlcnNbbl0ocmVxLCByZXMsICgpID0+IG50aF9oYW5kbGVyKG4rMSwgcmVxLCByZXMsIG5leHQpKTtcblx0fVxuXG5cdHJldHVybiAhaWdub3JlXG5cdFx0PyAocmVxLCByZXMsIG5leHQpID0+IG50aF9oYW5kbGVyKDAsIHJlcSwgcmVzLCBuZXh0KVxuXHRcdDogKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG5cdFx0XHRpZiAoc2hvdWxkX2lnbm9yZShyZXEucGF0aCwgaWdub3JlKSkge1xuXHRcdFx0XHRuZXh0KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRudGhfaGFuZGxlcigwLCByZXEsIHJlcywgbmV4dCk7XG5cdFx0XHR9XG5cdFx0fTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkX2lnbm9yZSh1cmksIHZhbCkge1xuXHRpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSByZXR1cm4gdmFsLnNvbWUoeCA9PiBzaG91bGRfaWdub3JlKHVyaSwgeCkpO1xuXHRpZiAodmFsIGluc3RhbmNlb2YgUmVnRXhwKSByZXR1cm4gdmFsLnRlc3QodXJpKTtcblx0aWYgKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHJldHVybiB2YWwodXJpKTtcblx0cmV0dXJuIHVyaS5zdGFydHNXaXRoKHZhbC5jaGFyQ29kZUF0KDApID09PSA0NyA/IHZhbCA6IGAvJHt2YWx9YCk7XG59XG5cbmZ1bmN0aW9uIHNlcnZlKHsgcHJlZml4LCBwYXRobmFtZSwgY2FjaGVfY29udHJvbCB9XG5cblxuXG4pIHtcblx0Y29uc3QgZmlsdGVyID0gcGF0aG5hbWVcblx0XHQ/IChyZXEpID0+IHJlcS5wYXRoID09PSBwYXRobmFtZVxuXHRcdDogKHJlcSkgPT4gcmVxLnBhdGguc3RhcnRzV2l0aChwcmVmaXgpO1xuXG5cdGNvbnN0IGNhY2hlID0gbmV3IE1hcCgpO1xuXG5cdGNvbnN0IHJlYWQgPSBkZXZcblx0XHQ/IChmaWxlKSA9PiBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGJ1aWxkX2RpciwgZmlsZSkpXG5cdFx0OiAoZmlsZSkgPT4gKGNhY2hlLmhhcyhmaWxlKSA/IGNhY2hlIDogY2FjaGUuc2V0KGZpbGUsIGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oYnVpbGRfZGlyLCBmaWxlKSkpKS5nZXQoZmlsZSk7XG5cblx0cmV0dXJuIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuXHRcdGlmIChmaWx0ZXIocmVxKSkge1xuXHRcdFx0Y29uc3QgdHlwZSA9IGxpdGUuZ2V0VHlwZShyZXEucGF0aCk7XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IGZpbGUgPSBwYXRoLnBvc2l4Lm5vcm1hbGl6ZShkZWNvZGVVUklDb21wb25lbnQocmVxLnBhdGgpKTtcblx0XHRcdFx0Y29uc3QgZGF0YSA9IHJlYWQoZmlsZSk7XG5cblx0XHRcdFx0cmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgdHlwZSk7XG5cdFx0XHRcdHJlcy5zZXRIZWFkZXIoJ0NhY2hlLUNvbnRyb2wnLCBjYWNoZV9jb250cm9sKTtcblx0XHRcdFx0cmVzLmVuZChkYXRhKTtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRyZXMuc3RhdHVzQ29kZSA9IDQwNDtcblx0XHRcdFx0cmVzLmVuZCgnbm90IGZvdW5kJyk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5leHQoKTtcblx0XHR9XG5cdH07XG59XG5cbmZ1bmN0aW9uIG5vb3AoKXt9XG5cbmV4cG9ydCB7IG1pZGRsZXdhcmUgfTtcbiIsImltcG9ydCBzaXJ2IGZyb20gJ3NpcnYnO1xuaW1wb3J0IHBvbGthIGZyb20gJ3BvbGthJztcbmltcG9ydCBjb21wcmVzc2lvbiBmcm9tICdjb21wcmVzc2lvbic7XG5pbXBvcnQgKiBhcyBzYXBwZXIgZnJvbSAnQHNhcHBlci9zZXJ2ZXInO1xuXG5jb25zdCB7IFBPUlQsIE5PREVfRU5WIH0gPSBwcm9jZXNzLmVudjtcbmNvbnN0IGRldiA9IE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnO1xuXG5wb2xrYSgpIC8vIFlvdSBjYW4gYWxzbyB1c2UgRXhwcmVzc1xuXHQudXNlKFxuXHRcdGNvbXByZXNzaW9uKHsgdGhyZXNob2xkOiAwIH0pLFxuXHRcdHNpcnYoJ3N0YXRpYycsIHsgZGV2IH0pLFxuXHRcdHNhcHBlci5taWRkbGV3YXJlKClcblx0KVxuXHQubGlzdGVuKFBPUlQsIGVyciA9PiB7XG5cdFx0aWYgKGVycikgY29uc29sZS5sb2coJ2Vycm9yJywgZXJyKTtcblx0fSk7XG4iXSwibmFtZXMiOlsiZ2V0IiwiZmFGbGFnVXNhIiwiZmFHbG9iZSIsImZhQXJyb3dzQWx0SCIsInByZWxvYWQiLCJmYUNhbGN1bGF0b3IiLCJmYUluZm9DaXJjbGUiLCJmYUJhbGFuY2VTY2FsZSIsImZhUGFwZXJQbGFuZSIsImZhVXNlck1kIiwiZmFEb2ciLCJmYVBlbmNpbFJ1bGVyIiwiY29tcG9uZW50XzAiLCJjb21wb25lbnRfMSIsImNvbXBvbmVudF8yIiwiY29tcG9uZW50XzMiLCJjb21wb25lbnRfNCIsImNvbXBvbmVudF81IiwiY29tcG9uZW50XzYiLCJwcmVsb2FkXzYiLCJjb21wb25lbnRfNyIsInByZWxvYWRfNyIsImNvbXBvbmVudF84Iiwicm9vdCIsImVycm9yIiwiZXNjYXBlZCIsIm5vb3AiLCJzYXBwZXIubWlkZGxld2FyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sS0FBSyxHQUFHO0FBQ2QsQ0FBQztBQUNELEVBQUUsS0FBSyxFQUFFLGlCQUFpQjtBQUMxQixFQUFFLElBQUksRUFBRSxnQkFBZ0I7QUFDeEIsRUFBRSxJQUFJLEVBQUUsQ0FBQztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsQ0FBQztBQUNILEVBQUU7QUFDRjtBQUNBLENBQUM7QUFDRCxFQUFFLEtBQUssRUFBRSxtQkFBbUI7QUFDNUIsRUFBRSxJQUFJLEVBQUUsbUJBQW1CO0FBQzNCLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxDQUFDO0FBQ0gsRUFBRTtBQUNGO0FBQ0EsQ0FBQztBQUNELEVBQUUsS0FBSyxFQUFFLGVBQWU7QUFDeEIsRUFBRSxJQUFJLEVBQUUsY0FBYztBQUN0QixFQUFFLElBQUksRUFBRSxDQUFDO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsRUFBRSxDQUFDO0FBQ0gsRUFBRTtBQUNGO0FBQ0EsQ0FBQztBQUNELEVBQUUsS0FBSyxFQUFFLHVDQUF1QztBQUNoRCxFQUFFLElBQUksRUFBRSxtQ0FBbUM7QUFDM0MsRUFBRSxJQUFJLEVBQUUsQ0FBQztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLENBQUM7QUFDSCxFQUFFO0FBQ0Y7QUFDQSxDQUFDO0FBQ0QsRUFBRSxLQUFLLEVBQUUseUJBQXlCO0FBQ2xDLEVBQUUsSUFBSSxFQUFFLHdCQUF3QjtBQUNoQyxFQUFFLElBQUksRUFBRSxDQUFDO0FBQ1Q7QUFDQSxFQUFFLENBQUM7QUFDSCxFQUFFO0FBQ0YsQ0FBQyxDQUFDO0FBQ0Y7QUFDQSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSTtBQUN0QixDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQy9DLENBQUMsQ0FBQzs7QUN2RkYsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSTtBQUNsRCxDQUFDLE9BQU87QUFDUixFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztBQUNuQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtBQUNqQixFQUFFLENBQUM7QUFDSCxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0o7QUFDQSxBQUFPLFNBQVMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDOUIsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtBQUNwQixFQUFFLGNBQWMsRUFBRSxrQkFBa0I7QUFDcEMsRUFBRSxDQUFDLENBQUM7QUFDSjtBQUNBLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNuQjs7Ozs7OztDQUFDLERDYkQsTUFBTSxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUN6QixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSTtBQUN0QixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDN0MsQ0FBQyxDQUFDLENBQUM7QUFDSDtBQUNBLEFBQU8sU0FBU0EsS0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQ3BDO0FBQ0E7QUFDQSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQzdCO0FBQ0EsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDdkIsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtBQUNyQixHQUFHLGNBQWMsRUFBRSxrQkFBa0I7QUFDckMsR0FBRyxDQUFDLENBQUM7QUFDTDtBQUNBLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDNUIsRUFBRSxNQUFNO0FBQ1IsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtBQUNyQixHQUFHLGNBQWMsRUFBRSxrQkFBa0I7QUFDckMsR0FBRyxDQUFDLENBQUM7QUFDTDtBQUNBLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0FBQ3pCLEdBQUcsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO0FBQ3ZCLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDTixFQUFFO0FBQ0YsQ0FBQzs7Ozs7OztBQzNCRCxTQUFTLElBQUksR0FBRyxHQUFHO0FBQ25CLEFBZUEsU0FBUyxHQUFHLENBQUMsRUFBRSxFQUFFO0FBQ2pCLElBQUksT0FBTyxFQUFFLEVBQUUsQ0FBQztBQUNoQixDQUFDO0FBQ0QsU0FBUyxZQUFZLEdBQUc7QUFDeEIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUNELFNBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUN0QixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckIsQ0FBQztBQUNELEFBR0EsU0FBUyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUM5QixJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxLQUFLLE9BQU8sQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDO0FBQ2xHLENBQUM7QUFDRCxBQXVrQkE7QUFDQSxJQUFJLGlCQUFpQixDQUFDO0FBQ3RCLFNBQVMscUJBQXFCLENBQUMsU0FBUyxFQUFFO0FBQzFDLElBQUksaUJBQWlCLEdBQUcsU0FBUyxDQUFDO0FBQ2xDLENBQUM7QUFDRCxTQUFTLHFCQUFxQixHQUFHO0FBQ2pDLElBQUksSUFBSSxDQUFDLGlCQUFpQjtBQUMxQixRQUFRLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDLENBQUM7QUFDNUUsSUFBSSxPQUFPLGlCQUFpQixDQUFDO0FBQzdCLENBQUM7QUFDRCxBQU1BLFNBQVMsV0FBVyxDQUFDLEVBQUUsRUFBRTtBQUN6QixJQUFJLHFCQUFxQixFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUNELEFBaUJBLFNBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUU7QUFDbEMsSUFBSSxxQkFBcUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBQ0QsQUFxbkJBLE1BQU0sT0FBTyxHQUFHO0FBQ2hCLElBQUksR0FBRyxFQUFFLFFBQVE7QUFDakIsSUFBSSxHQUFHLEVBQUUsT0FBTztBQUNoQixJQUFJLEdBQUcsRUFBRSxPQUFPO0FBQ2hCLElBQUksR0FBRyxFQUFFLE1BQU07QUFDZixJQUFJLEdBQUcsRUFBRSxNQUFNO0FBQ2YsQ0FBQyxDQUFDO0FBQ0YsU0FBUyxNQUFNLENBQUMsSUFBSSxFQUFFO0FBQ3RCLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDckUsQ0FBQztBQUNELFNBQVMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUU7QUFDekIsSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDakIsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzlDLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0IsS0FBSztBQUNMLElBQUksT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBQ0QsTUFBTSxpQkFBaUIsR0FBRztBQUMxQixJQUFJLFFBQVEsRUFBRSxNQUFNLEVBQUU7QUFDdEIsQ0FBQyxDQUFDO0FBQ0YsU0FBUyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFO0FBQzdDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7QUFDM0MsUUFBUSxJQUFJLElBQUksS0FBSyxrQkFBa0I7QUFDdkMsWUFBWSxJQUFJLElBQUksYUFBYSxDQUFDO0FBQ2xDLFFBQVEsTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsK0pBQStKLENBQUMsQ0FBQyxDQUFDO0FBQ25NLEtBQUs7QUFDTCxJQUFJLE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUM7QUFDRCxBQUtBLElBQUksVUFBVSxDQUFDO0FBQ2YsU0FBUyxvQkFBb0IsQ0FBQyxFQUFFLEVBQUU7QUFDbEMsSUFBSSxTQUFTLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7QUFDdEQsUUFBUSxNQUFNLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDO0FBQ25ELFFBQVEsTUFBTSxFQUFFLEdBQUc7QUFDbkIsWUFBWSxVQUFVO0FBQ3RCLFlBQVksT0FBTyxFQUFFLElBQUksR0FBRyxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2pGO0FBQ0EsWUFBWSxRQUFRLEVBQUUsRUFBRTtBQUN4QixZQUFZLGFBQWEsRUFBRSxFQUFFO0FBQzdCLFlBQVksWUFBWSxFQUFFLEVBQUU7QUFDNUIsWUFBWSxTQUFTLEVBQUUsWUFBWSxFQUFFO0FBQ3JDLFNBQVMsQ0FBQztBQUNWLFFBQVEscUJBQXFCLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLFFBQVEsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3hELFFBQVEscUJBQXFCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNoRCxRQUFRLE9BQU8sSUFBSSxDQUFDO0FBQ3BCLEtBQUs7QUFDTCxJQUFJLE9BQU87QUFDWCxRQUFRLE1BQU0sRUFBRSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsT0FBTyxHQUFHLEVBQUUsS0FBSztBQUM5QyxZQUFZLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDNUIsWUFBWSxNQUFNLE1BQU0sR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDO0FBQ25FLFlBQVksTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzlELFlBQVksT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2hDLFlBQVksT0FBTztBQUNuQixnQkFBZ0IsSUFBSTtBQUNwQixnQkFBZ0IsR0FBRyxFQUFFO0FBQ3JCLG9CQUFvQixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztBQUNoRixvQkFBb0IsR0FBRyxFQUFFLElBQUk7QUFDN0IsaUJBQWlCO0FBQ2pCLGdCQUFnQixJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSTtBQUNoRCxhQUFhLENBQUM7QUFDZCxTQUFTO0FBQ1QsUUFBUSxRQUFRO0FBQ2hCLEtBQUssQ0FBQztBQUNOLENBQUM7QUFDRCxTQUFTLGFBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtBQUM3QyxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksS0FBSyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDNUMsUUFBUSxPQUFPLEVBQUUsQ0FBQztBQUNsQixJQUFJLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsS0FBSyxLQUFLLElBQUksR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsT0FBTyxLQUFLLEtBQUssUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0gsQ0FBQzs7Ozs7Y0MxMENHLEtBQUssR0FBRyxFQUFFO09BRUgsRUFBRSxHQUFHLEVBQUU7T0FDUCxLQUFLLEdBQUcsRUFBRTtPQUVWLElBQUk7T0FDSixFQUFFLEdBQUcsS0FBSztPQUNWLElBQUksR0FBRyxLQUFLO09BQ1osSUFBSSxHQUFHLEtBQUs7T0FDWixNQUFNLEdBQUcsS0FBSztPQUNkLElBQUksR0FBRyxLQUFLO09BQ1osS0FBSyxHQUFHLEVBQUU7T0FHVixZQUFZLEdBQUcsRUFBRTtPQUNqQixjQUFjLEdBQUcsRUFBRTtPQUNuQixjQUFjLEdBQUcsQ0FBQztPQUNsQixnQkFBZ0IsR0FBRyxHQUFHO09BQ3RCLFdBQVcsR0FBRyxLQUFLO0tBRTFCLENBQUM7S0FDRCxDQUFDO0tBQ0QsU0FBUzs7Ozs7Ozs7Ozs7Ozs7OztDQUVWLENBQUMsR0FBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksS0FBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFOzs7O09BR3pDLEtBQUs7T0FDTCxLQUFLO1NBQ0gsTUFBTSxHQUFHLEtBQUs7T0FDaEIsVUFBVTtPQUNWLFFBQVE7T0FDUixTQUFTO09BQ1QsYUFBYSxHQUFHLFNBQVM7U0FDdkIsUUFBUSxHQUFHLFNBQVM7O09BRXRCLEVBQUU7SUFDSixTQUFTLEdBQUcsUUFBUTtJQUNwQixLQUFLLEdBQUcsUUFBUTs7O09BR2QsSUFBSTtJQUNOLEtBQUssR0FBRyxJQUFJOzs7T0FHVixJQUFJO1FBQ0YsSUFBSSxJQUFJLElBQUk7S0FDZCxRQUFRLEdBQUcsV0FBVztLQUN0QixVQUFVLEdBQUcsT0FBTztLQUNwQixhQUFhLEdBQUcsU0FBUztlQUNoQixJQUFJLElBQUksSUFBSTtLQUNyQixRQUFRLEdBQUcsT0FBTztlQUNULElBQUksSUFBSSxJQUFJO0tBQ3JCLFFBQVEsR0FBRyxRQUFROztLQUVuQixRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSTs7OztTQUkvQixRQUFRO0lBQ1osS0FBSztJQUNMLEtBQUs7SUFDTCxNQUFNO0lBQ04sYUFBYSxFQUFFLFVBQVU7SUFDekIsV0FBVyxFQUFFLFFBQVE7SUFDckIsWUFBWSxFQUFFLFNBQVM7SUFDdkIsZ0JBQWdCLEVBQUUsYUFBYTtJQUMvQixRQUFROzs7T0FFTixRQUFRLEdBQUcsRUFBRTs7Y0FDTixJQUFJLElBQUksUUFBUTtRQUNyQixRQUFRLENBQUMsSUFBSTtLQUNmLFFBQVEsT0FBTyxJQUFJLElBQUksUUFBUSxDQUFDLElBQUk7Ozs7R0FHeEMsQ0FBQyxHQUFHLFFBQVEsR0FBRyxLQUFLOzs7Ozs7T0FJaEIsQ0FBQyxHQUFHLEVBQUU7O09BRU4sSUFBSTtRQUNGLEtBQUssR0FBRyxDQUFDO1FBQ1QsS0FBSyxHQUFHLENBQUM7O1FBQ1QsSUFBSSxJQUFJLFlBQVk7S0FDdEIsS0FBSyxJQUFJLENBQUM7ZUFDRCxJQUFJLElBQUksVUFBVTtLQUMzQixLQUFLLElBQUksQ0FBQzs7S0FFVixLQUFLLEdBQUcsS0FBSyxJQUFJLENBQUM7OztJQUVwQixDQUFDLGNBQWMsS0FBSyxJQUFJLEtBQUs7OztPQUczQixNQUFNO0lBQ1IsQ0FBQyxlQUFlLE1BQU07OztHQUd4QixTQUFTLEdBQUcsQ0FBQzs7OztXQUlWLENBQUMsQ0FBQyxDQUFDOzhCQUVBLEVBQUUsOEJBQ0MsS0FBSyw4QkFDTCxDQUFDLHVDQUNRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsdUxBU1gsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFROytCQUVyQixDQUFDLENBQUMsQ0FBQyw4QkFDQSxLQUFLLElBQUksWUFBWSxJQUFJLGNBQWM7K0JBSzFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyw4QkFDSCxjQUFjLElBQUksS0FBSyxJQUFJLGNBQWMscUNBQ2pDLFdBQVcsSUFBSSxLQUFLLEdBQUcsY0FBYyxHQUFHLGdCQUFnQjtvQ0FJbkUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLDhCQUNILFlBQVksSUFBSSxLQUFLLElBQUksY0FBYyxxQ0FDL0IsV0FBVyxJQUFJLEtBQUssR0FBRyxnQkFBZ0IsR0FBRyxjQUFjOzs7Ozs7OztLQ2pHNUUsS0FBSzs7R0FBSyxNQUFNLEVBQUMsZUFBZTtHQUFDLFVBQVUsRUFBQyxlQUFlO0dBQUMsbUJBQW1CLEVBQUMsT0FBTztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxRQUFRO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsSUFBSTtHQUFDLFNBQVMsRUFBQyxJQUFJOzs7R0FBRyxNQUFNLEVBQUMsY0FBYztHQUFDLFVBQVUsRUFBQyxlQUFlO0dBQUMsbUJBQW1CLEVBQUMsSUFBSTtHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxNQUFNO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxHQUFHOzs7R0FBRyxNQUFNLEVBQUMsU0FBUztHQUFDLFVBQVUsRUFBQyxlQUFlO0dBQUMsbUJBQW1CLEVBQUMsTUFBTTtHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsa0JBQWtCO0dBQUMsVUFBVSxFQUFDLE9BQU87R0FBQyxtQkFBbUIsRUFBQyxNQUFNO0dBQUMsa0JBQWtCLEVBQUMsS0FBSztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLEtBQUs7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxJQUFJO0dBQUMsU0FBUyxFQUFDLEtBQUs7OztHQUFHLE1BQU0sRUFBQyw4Q0FBOEM7R0FBQyxVQUFVLEVBQUMsYUFBYTtHQUFDLG1CQUFtQixFQUFDLE9BQU87R0FBQyxrQkFBa0IsRUFBQyxHQUFHO0dBQUMsUUFBUSxFQUFDLEdBQUc7R0FBQyxTQUFTLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxHQUFHO0dBQUMsU0FBUyxFQUFDLElBQUk7R0FBQyxTQUFTLEVBQUMsSUFBSTs7O0dBQUcsTUFBTSxFQUFDLHFCQUFxQjtHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsV0FBVztHQUFDLGtCQUFrQixFQUFDLEtBQUs7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxNQUFNOzs7R0FBRyxNQUFNLEVBQUMsb0NBQW9DO0dBQUMsVUFBVSxFQUFDLFFBQVE7R0FBQyxtQkFBbUIsRUFBQyxNQUFNO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLEtBQUs7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxJQUFJO0dBQUMsU0FBUyxFQUFDLEtBQUs7OztHQUFHLE1BQU0sRUFBQyxTQUFTO0dBQUMsVUFBVSxFQUFDLFFBQVE7R0FBQyxtQkFBbUIsRUFBQyxXQUFXO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxPQUFPO0dBQUMsU0FBUyxFQUFDLFNBQVM7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxLQUFLO0dBQUMsU0FBUyxFQUFDLE1BQU07OztHQUFHLE1BQU0sRUFBQyxnQ0FBZ0M7R0FBQyxVQUFVLEVBQUMsT0FBTztHQUFDLG1CQUFtQixFQUFDLE9BQU87R0FBQyxrQkFBa0IsRUFBQyxLQUFLO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsV0FBVztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLE1BQU07R0FBQyxTQUFTLEVBQUMsSUFBSTs7O0dBQUcsTUFBTSxFQUFDLFNBQVM7R0FBQyxVQUFVLEVBQUMsT0FBTztHQUFDLG1CQUFtQixFQUFDLFNBQVM7R0FBQyxrQkFBa0IsRUFBQyxNQUFNO0dBQUMsUUFBUSxFQUFDLElBQUk7R0FBQyxTQUFTLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxLQUFLO0dBQUMsU0FBUyxFQUFDLElBQUk7R0FBQyxTQUFTLEVBQUMsS0FBSzs7O0dBQUcsTUFBTSxFQUFDLHVCQUF1QjtHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsTUFBTTtHQUFDLGtCQUFrQixFQUFDLEtBQUs7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxLQUFLO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsSUFBSTtHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsVUFBVTtHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsU0FBUztHQUFDLGtCQUFrQixFQUFDLEtBQUs7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxXQUFXO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsYUFBYTtHQUFDLFVBQVUsRUFBQyxlQUFlO0dBQUMsbUJBQW1CLEVBQUMsS0FBSztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxRQUFRO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsSUFBSTtHQUFDLFNBQVMsRUFBQyxHQUFHOzs7R0FBRyxNQUFNLEVBQUMsc0JBQXNCO0dBQUMsVUFBVSxFQUFDLE9BQU87R0FBQyxtQkFBbUIsRUFBQyxRQUFRO0dBQUMsa0JBQWtCLEVBQUMsS0FBSztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLFNBQVM7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxLQUFLO0dBQUMsU0FBUyxFQUFDLElBQUk7OztHQUFHLE1BQU0sRUFBQyxZQUFZO0dBQUMsVUFBVSxFQUFDLGVBQWU7R0FBQyxtQkFBbUIsRUFBQyxPQUFPO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLFFBQVE7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxJQUFJO0dBQUMsU0FBUyxFQUFDLElBQUk7OztHQUFHLE1BQU0sRUFBQyxVQUFVO0dBQUMsVUFBVSxFQUFDLGVBQWU7R0FBQyxtQkFBbUIsRUFBQyxPQUFPO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxPQUFPO0dBQUMsU0FBUyxFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxJQUFJO0dBQUMsU0FBUyxFQUFDLElBQUk7OztHQUFHLE1BQU0sRUFBQyxxQkFBcUI7R0FBQyxVQUFVLEVBQUMsUUFBUTtHQUFDLG1CQUFtQixFQUFDLFdBQVc7R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLE9BQU87R0FBQyxTQUFTLEVBQUMsTUFBTTtHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLEdBQUc7R0FBQyxTQUFTLEVBQUMsTUFBTTs7O0dBQUcsTUFBTSxFQUFDLHVCQUF1QjtHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsT0FBTztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxJQUFJOzs7R0FBRyxNQUFNLEVBQUMsWUFBWTtHQUFDLFVBQVUsRUFBQyxlQUFlO0dBQUMsbUJBQW1CLEVBQUMsU0FBUztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsZUFBZTtHQUFDLFVBQVUsRUFBQyxRQUFRO0dBQUMsbUJBQW1CLEVBQUMsU0FBUztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsdUJBQXVCO0dBQUMsVUFBVSxFQUFDLGVBQWU7R0FBQyxtQkFBbUIsRUFBQyxPQUFPO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxPQUFPO0dBQUMsU0FBUyxFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxJQUFJO0dBQUMsU0FBUyxFQUFDLElBQUk7OztHQUFHLE1BQU0sRUFBQyxhQUFhO0dBQUMsVUFBVSxFQUFDLE9BQU87R0FBQyxtQkFBbUIsRUFBQyxLQUFLO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLE1BQU07R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxHQUFHO0dBQUMsU0FBUyxFQUFDLEdBQUc7OztHQUFHLE1BQU0sRUFBQyxhQUFhO0dBQUMsVUFBVSxFQUFDLGVBQWU7R0FBQyxtQkFBbUIsRUFBQyxPQUFPO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxLQUFLO0dBQUMsU0FBUyxFQUFDLFNBQVM7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxLQUFLO0dBQUMsU0FBUyxFQUFDLElBQUk7OztHQUFHLE1BQU0sRUFBQyxTQUFTO0dBQUMsVUFBVSxFQUFDLE9BQU87R0FBQyxtQkFBbUIsRUFBQyxRQUFRO0dBQUMsa0JBQWtCLEVBQUMsS0FBSztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLFdBQVc7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLElBQUk7OztHQUFHLE1BQU0sRUFBQyxpQkFBaUI7R0FBQyxVQUFVLEVBQUMsT0FBTztHQUFDLG1CQUFtQixFQUFDLFFBQVE7R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsU0FBUztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLEtBQUs7R0FBQyxTQUFTLEVBQUMsSUFBSTs7O0dBQUcsTUFBTSxFQUFDLGVBQWU7R0FBQyxVQUFVLEVBQUMsUUFBUTtHQUFDLG1CQUFtQixFQUFDLEtBQUs7R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLE9BQU87R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLElBQUk7R0FBQyxTQUFTLEVBQUMsSUFBSTs7O0dBQUcsTUFBTSxFQUFDLGdCQUFnQjtHQUFDLFVBQVUsRUFBQyxRQUFRO0dBQUMsbUJBQW1CLEVBQUMsT0FBTztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxJQUFJOzs7R0FBRyxNQUFNLEVBQUMsK0JBQStCO0dBQUMsVUFBVSxFQUFDLE9BQU87R0FBQyxtQkFBbUIsRUFBQyxLQUFLO0dBQUMsa0JBQWtCLEVBQUMsS0FBSztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLE1BQU07R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxLQUFLO0dBQUMsU0FBUyxFQUFDLElBQUk7OztHQUFHLE1BQU0sRUFBQyw2QkFBNkI7R0FBQyxVQUFVLEVBQUMsZUFBZTtHQUFDLG1CQUFtQixFQUFDLE1BQU07R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLEdBQUc7R0FBQyxTQUFTLEVBQUMsTUFBTTtHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLEdBQUc7R0FBQyxTQUFTLEVBQUMsR0FBRzs7O0dBQUcsTUFBTSxFQUFDLDRCQUE0QjtHQUFDLFVBQVUsRUFBQyxRQUFRO0dBQUMsbUJBQW1CLEVBQUMsS0FBSztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxHQUFHOzs7R0FBRyxNQUFNLEVBQUMsa0JBQWtCO0dBQUMsVUFBVSxFQUFDLFFBQVE7R0FBQyxtQkFBbUIsRUFBQyxPQUFPO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxJQUFJO0dBQUMsU0FBUyxFQUFDLFNBQVM7R0FBQyxRQUFRLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxLQUFLO0dBQUMsU0FBUyxFQUFDLElBQUk7OztHQUFHLE1BQU0sRUFBQyxnQkFBZ0I7R0FBQyxVQUFVLEVBQUMsT0FBTztHQUFDLG1CQUFtQixFQUFDLFFBQVE7R0FBQyxrQkFBa0IsRUFBQyxXQUFXO0dBQUMsUUFBUSxFQUFDLE9BQU87R0FBQyxTQUFTLEVBQUMsV0FBVztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLE1BQU07R0FBQyxTQUFTLEVBQUMsSUFBSTs7O0dBQUcsTUFBTSxFQUFDLG9CQUFvQjtHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsUUFBUTtHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLEtBQUs7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxJQUFJOzs7R0FBRyxNQUFNLEVBQUMsa0JBQWtCO0dBQUMsVUFBVSxFQUFDLGVBQWU7R0FBQyxtQkFBbUIsRUFBQyxRQUFRO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLFNBQVM7R0FBQyxRQUFRLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxLQUFLO0dBQUMsU0FBUyxFQUFDLElBQUk7OztHQUFHLE1BQU0sRUFBQyxVQUFVO0dBQUMsVUFBVSxFQUFDLE9BQU87R0FBQyxtQkFBbUIsRUFBQyxXQUFXO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxPQUFPO0dBQUMsU0FBUyxFQUFDLFFBQVE7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxJQUFJO0dBQUMsU0FBUyxFQUFDLE1BQU07OztHQUFHLE1BQU0sRUFBQyxTQUFTO0dBQUMsVUFBVSxFQUFDLGFBQWE7R0FBQyxtQkFBbUIsRUFBQyxNQUFNO0dBQUMsa0JBQWtCLEVBQUMsTUFBTTtHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLFdBQVc7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLEdBQUc7OztHQUFHLE1BQU0sRUFBQyxZQUFZO0dBQUMsVUFBVSxFQUFDLFFBQVE7R0FBQyxtQkFBbUIsRUFBQyxXQUFXO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxJQUFJO0dBQUMsU0FBUyxFQUFDLE1BQU07OztHQUFHLE1BQU0sRUFBQyxrQ0FBa0M7R0FBQyxVQUFVLEVBQUMsT0FBTztHQUFDLG1CQUFtQixFQUFDLE9BQU87R0FBQyxrQkFBa0IsRUFBQyxLQUFLO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsV0FBVztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLE1BQU07R0FBQyxTQUFTLEVBQUMsSUFBSTs7O0dBQUcsTUFBTSxFQUFDLGVBQWU7R0FBQyxVQUFVLEVBQUMsUUFBUTtHQUFDLG1CQUFtQixFQUFDLE1BQU07R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLE9BQU87R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLElBQUk7R0FBQyxTQUFTLEVBQUMsS0FBSzs7O0dBQUcsTUFBTSxFQUFDLDRCQUE0QjtHQUFDLFVBQVUsRUFBQyxRQUFRO0dBQUMsbUJBQW1CLEVBQUMsT0FBTztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxJQUFJOzs7R0FBRyxNQUFNLEVBQUMsYUFBYTtHQUFDLFVBQVUsRUFBQyxhQUFhO0dBQUMsbUJBQW1CLEVBQUMsU0FBUztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsR0FBRztHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsR0FBRztHQUFDLFNBQVMsRUFBQyxHQUFHOzs7R0FBRyxNQUFNLEVBQUMsYUFBYTtHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsT0FBTztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsR0FBRztHQUFDLFNBQVMsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsSUFBSTtHQUFDLFNBQVMsRUFBQyxJQUFJOzs7R0FBRyxNQUFNLEVBQUMsb0JBQW9CO0dBQUMsVUFBVSxFQUFDLE9BQU87R0FBQyxtQkFBbUIsRUFBQyxTQUFTO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxPQUFPO0dBQUMsU0FBUyxFQUFDLFdBQVc7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLEtBQUs7OztHQUFHLE1BQU0sRUFBQyxrQkFBa0I7R0FBQyxVQUFVLEVBQUMsT0FBTztHQUFDLG1CQUFtQixFQUFDLFNBQVM7R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsVUFBVTtHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLEtBQUs7R0FBQyxTQUFTLEVBQUMsS0FBSzs7O0dBQUcsTUFBTSxFQUFDLGdDQUFnQztHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsU0FBUztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsUUFBUTtHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsU0FBUztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsU0FBUztHQUFDLFNBQVMsRUFBQyxXQUFXO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsU0FBUztHQUFDLFVBQVUsRUFBQyxhQUFhO0dBQUMsbUJBQW1CLEVBQUMsTUFBTTtHQUFDLGtCQUFrQixFQUFDLE1BQU07R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxVQUFVO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxHQUFHOzs7R0FBRyxNQUFNLEVBQUMsc0JBQXNCO0dBQUMsVUFBVSxFQUFDLGdCQUFnQjtHQUFDLG1CQUFtQixFQUFDLE9BQU87R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLE9BQU87R0FBQyxTQUFTLEVBQUMsU0FBUztHQUFDLFFBQVEsRUFBQyxLQUFLO0dBQUMsU0FBUyxFQUFDLEtBQUs7R0FBQyxTQUFTLEVBQUMsSUFBSTs7O0dBQUcsTUFBTSxFQUFDLElBQUk7R0FBQyxVQUFVLEVBQUMsZ0JBQWdCO0dBQUMsbUJBQW1CLEVBQUMsV0FBVztHQUFDLGtCQUFrQixFQUFDLEVBQUU7R0FBQyxRQUFRLEVBQUMsR0FBRztHQUFDLFNBQVMsRUFBQyxXQUFXO0dBQUMsUUFBUSxFQUFDLEVBQUU7R0FBQyxTQUFTLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxNQUFNOzs7R0FBRyxNQUFNLEVBQUMsYUFBYTtHQUFDLFVBQVUsRUFBQyxnQkFBZ0I7R0FBQyxtQkFBbUIsRUFBQyxRQUFRO0dBQUMsa0JBQWtCLEVBQUMsRUFBRTtHQUFDLFFBQVEsRUFBQyxPQUFPO0dBQUMsU0FBUyxFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxJQUFJO0dBQUMsU0FBUyxFQUFDLElBQUk7OztHQUFHLE1BQU0sRUFBQyxzQ0FBc0M7R0FBQyxVQUFVLEVBQUMsUUFBUTtHQUFDLG1CQUFtQixFQUFDLE1BQU07R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLEdBQUc7R0FBQyxTQUFTLEVBQUMsTUFBTTtHQUFDLFFBQVEsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLEtBQUs7R0FBQyxTQUFTLEVBQUMsS0FBSzs7O0dBQUcsTUFBTSxFQUFDLGlCQUFpQjtHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsT0FBTztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxNQUFNOzs7R0FBRyxNQUFNLEVBQUMsdUJBQXVCO0dBQUMsVUFBVSxFQUFDLE9BQU87R0FBQyxtQkFBbUIsRUFBQyxPQUFPO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxJQUFJO0dBQUMsU0FBUyxFQUFDLFNBQVM7R0FBQyxRQUFRLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxLQUFLO0dBQUMsU0FBUyxFQUFDLElBQUk7OztHQUFHLE1BQU0sRUFBQyxlQUFlO0dBQUMsVUFBVSxFQUFDLE9BQU87R0FBQyxtQkFBbUIsRUFBQyxXQUFXO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxPQUFPO0dBQUMsU0FBUyxFQUFDLFNBQVM7R0FBQyxRQUFRLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxLQUFLO0dBQUMsU0FBUyxFQUFDLE1BQU07OztHQUFHLE1BQU0sRUFBQyxlQUFlO0dBQUMsVUFBVSxFQUFDLE9BQU87R0FBQyxtQkFBbUIsRUFBQyxTQUFTO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxPQUFPO0dBQUMsU0FBUyxFQUFDLFdBQVc7R0FBQyxRQUFRLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLEtBQUs7OztHQUFHLE1BQU0sRUFBQyxTQUFTO0dBQUMsVUFBVSxFQUFDLGFBQWE7R0FBQyxtQkFBbUIsRUFBQyxTQUFTO0dBQUMsa0JBQWtCLEVBQUMsTUFBTTtHQUFDLFFBQVEsRUFBQyxPQUFPO0dBQUMsU0FBUyxFQUFDLFVBQVU7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxLQUFLO0dBQUMsU0FBUyxFQUFDLEtBQUs7OztHQUFHLE1BQU0sRUFBQyxVQUFVO0dBQUMsVUFBVSxFQUFDLGVBQWU7R0FBQyxtQkFBbUIsRUFBQyxNQUFNO0dBQUMsa0JBQWtCLEVBQUMsTUFBTTtHQUFDLFFBQVEsRUFBQyxPQUFPO0dBQUMsU0FBUyxFQUFDLFNBQVM7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxLQUFLO0dBQUMsU0FBUyxFQUFDLEdBQUc7OztHQUFHLE1BQU0sRUFBQyxZQUFZO0dBQUMsVUFBVSxFQUFDLFFBQVE7R0FBQyxtQkFBbUIsRUFBQyxNQUFNO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxPQUFPO0dBQUMsU0FBUyxFQUFDLFNBQVM7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxLQUFLO0dBQUMsU0FBUyxFQUFDLEdBQUc7OztHQUFHLE1BQU0sRUFBQyxrQkFBa0I7R0FBQyxVQUFVLEVBQUMsT0FBTztHQUFDLG1CQUFtQixFQUFDLFdBQVc7R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLE1BQU07R0FBQyxTQUFTLEVBQUMsV0FBVztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLE1BQU07R0FBQyxTQUFTLEVBQUMsTUFBTTs7O0dBQUcsTUFBTSxFQUFDLGdCQUFnQjtHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsVUFBVTtHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxXQUFXO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMseUJBQXlCO0dBQUMsVUFBVSxFQUFDLE9BQU87R0FBQyxtQkFBbUIsRUFBQyxLQUFLO0dBQUMsa0JBQWtCLEVBQUMsTUFBTTtHQUFDLFFBQVEsRUFBQyxHQUFHO0dBQUMsU0FBUyxFQUFDLEtBQUs7R0FBQyxRQUFRLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxJQUFJO0dBQUMsU0FBUyxFQUFDLElBQUk7OztHQUFHLE1BQU0sRUFBQyxlQUFlO0dBQUMsVUFBVSxFQUFDLGVBQWU7R0FBQyxtQkFBbUIsRUFBQyxNQUFNO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxPQUFPO0dBQUMsU0FBUyxFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxJQUFJO0dBQUMsU0FBUyxFQUFDLEdBQUc7OztHQUFHLE1BQU0sRUFBQyx3QkFBd0I7R0FBQyxVQUFVLEVBQUMsZUFBZTtHQUFDLG1CQUFtQixFQUFDLE9BQU87R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLEdBQUc7R0FBQyxTQUFTLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLElBQUk7R0FBQyxTQUFTLEVBQUMsSUFBSTs7O0dBQUcsTUFBTSxFQUFDLDBCQUEwQjtHQUFDLFVBQVUsRUFBQyxhQUFhO0dBQUMsbUJBQW1CLEVBQUMsS0FBSztHQUFDLGtCQUFrQixFQUFDLEdBQUc7R0FBQyxRQUFRLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxNQUFNO0dBQUMsUUFBUSxFQUFDLG1CQUFtQjtHQUFDLFNBQVMsRUFBQyxLQUFLO0dBQUMsU0FBUyxFQUFDLElBQUk7OztHQUFHLE1BQU0sRUFBQyxnQ0FBZ0M7R0FBQyxVQUFVLEVBQUMsT0FBTztHQUFDLG1CQUFtQixFQUFDLE1BQU07R0FBQyxrQkFBa0IsRUFBQyxNQUFNO0dBQUMsUUFBUSxFQUFDLEdBQUc7R0FBQyxTQUFTLEVBQUMsTUFBTTtHQUFDLFFBQVEsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLEtBQUs7R0FBQyxTQUFTLEVBQUMsS0FBSzs7O0dBQUcsTUFBTSxFQUFDLFlBQVk7R0FBQyxVQUFVLEVBQUMsT0FBTztHQUFDLG1CQUFtQixFQUFDLE9BQU87R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLFNBQVM7R0FBQyxTQUFTLEVBQUMsU0FBUztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLEtBQUs7R0FBQyxTQUFTLEVBQUMsSUFBSTs7O0dBQUcsTUFBTSxFQUFDLGFBQWE7R0FBQyxVQUFVLEVBQUMsT0FBTztHQUFDLG1CQUFtQixFQUFDLFFBQVE7R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLFNBQVM7R0FBQyxTQUFTLEVBQUMsU0FBUztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLEtBQUs7R0FBQyxTQUFTLEVBQUMsSUFBSTs7O0dBQUcsTUFBTSxFQUFDLGVBQWU7R0FBQyxVQUFVLEVBQUMsT0FBTztHQUFDLG1CQUFtQixFQUFDLE9BQU87R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLElBQUk7R0FBQyxTQUFTLEVBQUMsU0FBUztHQUFDLFFBQVEsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLEtBQUs7R0FBQyxTQUFTLEVBQUMsSUFBSTs7O0dBQUcsTUFBTSxFQUFDLGlCQUFpQjtHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsT0FBTztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsSUFBSTtHQUFDLFNBQVMsRUFBQyxJQUFJOzs7R0FBRyxNQUFNLEVBQUMsa0JBQWtCO0dBQUMsVUFBVSxFQUFDLGVBQWU7R0FBQyxtQkFBbUIsRUFBQyxTQUFTO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxPQUFPO0dBQUMsU0FBUyxFQUFDLFVBQVU7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxLQUFLO0dBQUMsU0FBUyxFQUFDLEtBQUs7OztHQUFHLE1BQU0sRUFBQyxVQUFVO0dBQUMsVUFBVSxFQUFDLGVBQWU7R0FBQyxtQkFBbUIsRUFBQyxRQUFRO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxHQUFHO0dBQUMsU0FBUyxFQUFDLFFBQVE7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxJQUFJO0dBQUMsU0FBUyxFQUFDLElBQUk7OztHQUFHLE1BQU0sRUFBQyxnQkFBZ0I7R0FBQyxVQUFVLEVBQUMsUUFBUTtHQUFDLG1CQUFtQixFQUFDLFFBQVE7R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLE9BQU87R0FBQyxTQUFTLEVBQUMsU0FBUztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLEtBQUs7R0FBQyxTQUFTLEVBQUMsSUFBSTs7O0dBQUcsTUFBTSxFQUFDLGdCQUFnQjtHQUFDLFVBQVUsRUFBQyxRQUFRO0dBQUMsbUJBQW1CLEVBQUMsUUFBUTtHQUFDLGtCQUFrQixFQUFDLE1BQU07R0FBQyxRQUFRLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxJQUFJOzs7R0FBRyxNQUFNLEVBQUMsK0JBQStCO0dBQUMsVUFBVSxFQUFDLGVBQWU7R0FBQyxtQkFBbUIsRUFBQyxNQUFNO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLEtBQUs7OztHQUFHLE1BQU0sRUFBQyxxQ0FBcUM7R0FBQyxVQUFVLEVBQUMsZUFBZTtHQUFDLG1CQUFtQixFQUFDLFNBQVM7R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsV0FBVztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLE1BQU07R0FBQyxTQUFTLEVBQUMsS0FBSzs7O0dBQUcsTUFBTSxFQUFDLDBCQUEwQjtHQUFDLFVBQVUsRUFBQyxlQUFlO0dBQUMsbUJBQW1CLEVBQUMsS0FBSztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxNQUFNO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsNkNBQTZDO0dBQUMsVUFBVSxFQUFDLGVBQWU7R0FBQyxtQkFBbUIsRUFBQyxLQUFLO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLElBQUk7OztHQUFHLE1BQU0sRUFBQyw2Q0FBNkM7R0FBQyxVQUFVLEVBQUMsZUFBZTtHQUFDLG1CQUFtQixFQUFDLE1BQU07R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLE9BQU87R0FBQyxTQUFTLEVBQUMsS0FBSzs7O0dBQUcsTUFBTSxFQUFDLGdCQUFnQjtHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsTUFBTTtHQUFDLGtCQUFrQixFQUFDLE1BQU07R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsSUFBSTtHQUFDLFNBQVMsRUFBQyxHQUFHOzs7R0FBRyxNQUFNLEVBQUMsOENBQThDO0dBQUMsVUFBVSxFQUFDLE9BQU87R0FBQyxtQkFBbUIsRUFBQyxHQUFHO0dBQUMsa0JBQWtCLEVBQUMsUUFBUTtHQUFDLFFBQVEsRUFBQyxHQUFHO0dBQUMsU0FBUyxFQUFDLEdBQUc7R0FBQyxRQUFRLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxHQUFHO0dBQUMsU0FBUyxFQUFDLEdBQUc7OztHQUFHLE1BQU0sRUFBQyxVQUFVO0dBQUMsVUFBVSxFQUFDLGFBQWE7R0FBQyxtQkFBbUIsRUFBQyxVQUFVO0dBQUMsa0JBQWtCLEVBQUMsTUFBTTtHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLFlBQVk7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLEtBQUs7OztHQUFHLE1BQU0sRUFBQyxTQUFTO0dBQUMsVUFBVSxFQUFDLE9BQU87R0FBQyxtQkFBbUIsRUFBQyxTQUFTO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxPQUFPO0dBQUMsU0FBUyxFQUFDLFFBQVE7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxJQUFJO0dBQUMsU0FBUyxFQUFDLEtBQUs7OztHQUFHLE1BQU0sRUFBQyxZQUFZO0dBQUMsVUFBVSxFQUFDLFFBQVE7R0FBQyxtQkFBbUIsRUFBQyxTQUFTO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxJQUFJO0dBQUMsU0FBUyxFQUFDLEtBQUs7OztHQUFHLE1BQU0sRUFBQyxZQUFZO0dBQUMsVUFBVSxFQUFDLE9BQU87R0FBQyxtQkFBbUIsRUFBQyxPQUFPO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxPQUFPO0dBQUMsU0FBUyxFQUFDLFVBQVU7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxLQUFLO0dBQUMsU0FBUyxFQUFDLElBQUk7OztHQUFHLE1BQU0sRUFBQyxXQUFXO0dBQUMsVUFBVSxFQUFDLGVBQWU7R0FBQyxtQkFBbUIsRUFBQyxTQUFTO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLFNBQVM7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxLQUFLO0dBQUMsU0FBUyxFQUFDLEtBQUs7OztHQUFHLE1BQU0sRUFBQyxXQUFXO0dBQUMsVUFBVSxFQUFDLE9BQU87R0FBQyxtQkFBbUIsRUFBQyxTQUFTO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxPQUFPO0dBQUMsU0FBUyxFQUFDLFNBQVM7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxLQUFLO0dBQUMsU0FBUyxFQUFDLEtBQUs7OztHQUFHLE1BQU0sRUFBQyxzQkFBc0I7R0FBQyxVQUFVLEVBQUMsUUFBUTtHQUFDLG1CQUFtQixFQUFDLFdBQVc7R0FBQyxrQkFBa0IsRUFBQyxNQUFNO0dBQUMsUUFBUSxFQUFDLE9BQU87R0FBQyxTQUFTLEVBQUMsVUFBVTtHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLEtBQUs7R0FBQyxTQUFTLEVBQUMsTUFBTTs7O0dBQUcsTUFBTSxFQUFDLGtCQUFrQjtHQUFDLFVBQVUsRUFBQyxRQUFRO0dBQUMsbUJBQW1CLEVBQUMsU0FBUztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLEtBQUs7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMscUNBQXFDO0dBQUMsVUFBVSxFQUFDLFFBQVE7R0FBQyxtQkFBbUIsRUFBQyxRQUFRO0dBQUMsa0JBQWtCLEVBQUMsR0FBRztHQUFDLFFBQVEsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLFdBQVc7R0FBQyxRQUFRLEVBQUMsbUJBQW1CO0dBQUMsU0FBUyxFQUFDLE1BQU07R0FBQyxTQUFTLEVBQUMsSUFBSTs7O0dBQUcsTUFBTSxFQUFDLHNCQUFzQjtHQUFDLFVBQVUsRUFBQyxRQUFRO0dBQUMsbUJBQW1CLEVBQUMsUUFBUTtHQUFDLGtCQUFrQixFQUFDLEdBQUc7R0FBQyxRQUFRLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxXQUFXO0dBQUMsUUFBUSxFQUFDLG1CQUFtQjtHQUFDLFNBQVMsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLElBQUk7OztHQUFHLE1BQU0sRUFBQyx3QkFBd0I7R0FBQyxVQUFVLEVBQUMsUUFBUTtHQUFDLG1CQUFtQixFQUFDLFFBQVE7R0FBQyxrQkFBa0IsRUFBQyxHQUFHO0dBQUMsUUFBUSxFQUFDLE1BQU07R0FBQyxTQUFTLEVBQUMsV0FBVztHQUFDLFFBQVEsRUFBQyxtQkFBbUI7R0FBQyxTQUFTLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxJQUFJOzs7R0FBRyxNQUFNLEVBQUMseUJBQXlCO0dBQUMsVUFBVSxFQUFDLFFBQVE7R0FBQyxtQkFBbUIsRUFBQyxRQUFRO0dBQUMsa0JBQWtCLEVBQUMsR0FBRztHQUFDLFFBQVEsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLFdBQVc7R0FBQyxRQUFRLEVBQUMsbUJBQW1CO0dBQUMsU0FBUyxFQUFDLE1BQU07R0FBQyxTQUFTLEVBQUMsSUFBSTs7O0dBQUcsTUFBTSxFQUFDLHVCQUF1QjtHQUFDLFVBQVUsRUFBQyxRQUFRO0dBQUMsbUJBQW1CLEVBQUMsUUFBUTtHQUFDLGtCQUFrQixFQUFDLEdBQUc7R0FBQyxRQUFRLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxXQUFXO0dBQUMsUUFBUSxFQUFDLG1CQUFtQjtHQUFDLFNBQVMsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLElBQUk7OztHQUFHLE1BQU0sRUFBQyxzQkFBc0I7R0FBQyxVQUFVLEVBQUMsUUFBUTtHQUFDLG1CQUFtQixFQUFDLFFBQVE7R0FBQyxrQkFBa0IsRUFBQyxHQUFHO0dBQUMsUUFBUSxFQUFDLE1BQU07R0FBQyxTQUFTLEVBQUMsV0FBVztHQUFDLFFBQVEsRUFBQyxtQkFBbUI7R0FBQyxTQUFTLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxJQUFJOzs7R0FBRyxNQUFNLEVBQUMsdUJBQXVCO0dBQUMsVUFBVSxFQUFDLFFBQVE7R0FBQyxtQkFBbUIsRUFBQyxRQUFRO0dBQUMsa0JBQWtCLEVBQUMsR0FBRztHQUFDLFFBQVEsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLFdBQVc7R0FBQyxRQUFRLEVBQUMsbUJBQW1CO0dBQUMsU0FBUyxFQUFDLE1BQU07R0FBQyxTQUFTLEVBQUMsSUFBSTs7O0dBQUcs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cUJBQXFCO0dBQUMsVUFBVSxFQUFDLE9BQU87R0FBQyxtQkFBbUIsRUFBQyxNQUFNO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLFFBQVE7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxJQUFJO0dBQUMsU0FBUyxFQUFDLEdBQUc7OztHQUFHLE1BQU0sRUFBQyxhQUFhO0dBQUMsVUFBVSxFQUFDLGVBQWU7R0FBQyxtQkFBbUIsRUFBQyxRQUFRO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxPQUFPO0dBQUMsU0FBUyxFQUFDLFNBQVM7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxLQUFLO0dBQUMsU0FBUyxFQUFDLElBQUk7OztHQUFHLE1BQU0sRUFBQyxVQUFVO0dBQUMsVUFBVSxFQUFDLGVBQWU7R0FBQyxtQkFBbUIsRUFBQyxVQUFVO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLFdBQVc7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLEtBQUs7OztHQUFHLE1BQU0sRUFBQyxTQUFTO0dBQUMsVUFBVSxFQUFDLFFBQVE7R0FBQyxtQkFBbUIsRUFBQyxTQUFTO0dBQUMsa0JBQWtCLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxPQUFPO0dBQUMsU0FBUyxFQUFDLFNBQVM7R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxLQUFLO0dBQUMsU0FBUyxFQUFDLEtBQUs7OztHQUFHLE1BQU0sRUFBQyxXQUFXO0dBQUMsVUFBVSxFQUFDLE9BQU87R0FBQyxtQkFBbUIsRUFBQyxNQUFNO0dBQUMsa0JBQWtCLEVBQUMsTUFBTTtHQUFDLFFBQVEsRUFBQyxPQUFPO0dBQUMsU0FBUyxFQUFDLE1BQU07R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxLQUFLO0dBQUMs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QUFPO0dBQUMsUUFBUSxFQUFDLEtBQUs7R0FBQyxTQUFTLEVBQUMsV0FBVztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLE1BQU07R0FBQyxTQUFTLEVBQUMsS0FBSzs7O0dBQUcsTUFBTSxFQUFDLFdBQVc7R0FBQyxVQUFVLEVBQUMsYUFBYTtHQUFDLG1CQUFtQixFQUFDLE9BQU87R0FBQyxrQkFBa0IsRUFBQyxNQUFNO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsU0FBUztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLEtBQUs7R0FBQyxTQUFTLEVBQUMsSUFBSTs7O0dBQUcsTUFBTSxFQUFDLGFBQWE7R0FBQyxVQUFVLEVBQUMsUUFBUTtHQUFDLG1CQUFtQixFQUFDLFNBQVM7R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLEdBQUc7R0FBQyxTQUFTLEVBQUMsU0FBUztHQUFDLFFBQVEsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLEtBQUs7R0FBQyxTQUFTLEVBQUMsS0FBSzs7O0dBQUcsTUFBTSxFQUFDLFdBQVc7R0FBQyxVQUFVLEVBQUMsT0FBTztHQUFDLG1CQUFtQixFQUFDLE9BQU87R0FBQyxrQkFBa0IsRUFBQyxFQUFFO0dBQUMsUUFBUSxFQUFDLE9BQU87R0FBQyxTQUFTLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLElBQUk7R0FBQyxTQUFTLEVBQUMsSUFBSTs7O0dBQUcsTUFBTSxFQUFDLFlBQVk7R0FBQyxVQUFVLEVBQUMsZUFBZTtHQUFDLG1CQUFtQixFQUFDLFNBQVM7R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLE9BQU87R0FBQyxTQUFTLEVBQUMsV0FBVztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLE1BQU07R0FBQyxTQUFTLEVBQUMsS0FBSzs7O0dBQUcsTUFBTSxFQUFDLFNBQVM7R0FBQyxVQUFVLEVBQUMsT0FBTztHQUFDLG1CQUFt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LFNBQVMsRUFBQyxHQUFHOzs7R0FBRyxNQUFNLEVBQUMsWUFBWTtHQUFDLFVBQVUsRUFBQyxRQUFRO0dBQUMsbUJBQW1CLEVBQUMsU0FBUztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxNQUFNO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsR0FBRztHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsY0FBYztHQUFDLFVBQVUsRUFBQyxlQUFlO0dBQUMsbUJBQW1CLEVBQUMsV0FBVztHQUFDLGtCQUFrQixFQUFDLE1BQU07R0FBQyxRQUFRLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxRQUFRO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsSUFBSTtHQUFDLFNBQVMsRUFBQyxNQUFNOzs7R0FBRyxNQUFNLEVBQUMsWUFBWTtHQUFDLFVBQVUsRUFBQyxRQUFRO0dBQUMsbUJBQW1CLEVBQUMsS0FBSztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxRQUFRO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxHQUFHOzs7R0FBRyxNQUFNLEVBQUMsWUFBWTtHQUFDLFVBQVUsRUFBQyxlQUFlO0dBQUMsbUJBQW1CLEVBQUMsUUFBUTtHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxJQUFJOzs7R0FBRyxNQUFNLEVBQUMsa0JBQWtCO0dBQUMsVUFBVSxFQUFDLE9BQU87R0FBQyxtQkFBbUIsRUFBQyxTQUFTO0dBQUMsa0JBQWtCLEVBQUMsTUFBTTtHQUFDLFFBQVEsRUFBQyxHQUFHO0dBQUMsU0FBUyxFQUFDLFNBQVM7R0FBQyxRQUFRLEVB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QkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLE9BQU87R0FBQyxTQUFTLEVBQUMsU0FBUztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLEtBQUs7R0FBQyxTQUFTLEVBQUMsSUFBSTs7O0dBQUcsTUFBTSxFQUFDLFdBQVc7R0FBQyxVQUFVLEVBQUMsUUFBUTtHQUFDLG1CQUFtQixFQUFDLFNBQVM7R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsUUFBUTtHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLElBQUk7R0FBQyxTQUFTLEVBQUMsS0FBSzs7O0dBQUcsTUFBTSxFQUFDLFlBQVk7R0FBQyxVQUFVLEVBQUMsT0FBTztHQUFDLG1CQUFtQixFQUFDLFNBQVM7R0FBQyxrQkFBa0IsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLEdBQUc7R0FBQyxTQUFTLEVBQUMsU0FBUztHQUFDLFFBQVEsRUFBQyxTQUFTO0dBQUMsU0FBUyxFQUFDLEtBQUs7R0FBQyxTQUFTLEVBQUMsS0FBSzs7O0dBQUcsTUFBTSxFQUFDLGFBQWE7R0FBQyxVQUFVLEVBQUMsT0FBTztHQUFDLG1CQUFtQixFQUFDLFVBQVU7R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLEdBQUc7R0FBQyxTQUFTLEVBQUMsVUFBVTtHQUFDLFFBQVEsRUFBQyxNQUFNO0dBQUMsU0FBUyxFQUFDLEtBQUs7R0FBQyxTQUFTLEVBQUMsS0FBSzs7O0dBQUcsTUFBTSxFQUFDLFNBQVM7R0FBQyxVQUFVLEVBQUMsT0FBTztHQUFDLG1CQUFtQixFQUFDLFNBQVM7R0FBQyxrQkFBa0IsRUFBQyxFQUFFO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsT0FBTztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLElBQUk7R0FBQyxTQUFTLEVBQUMsS0FBSzs7O0dBQUcsTUFBTSxFQUFDLFVBQVU7R0FBQyxVQUFVLEVBQUMsZUFB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R0FBQyxRQUFRLEVBQUMsSUFBSTtHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLE1BQU07R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxNQUFNOzs7R0FBRyxNQUFNLEVBQUMsY0FBYztHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsTUFBTTtHQUFDLGtCQUFrQixFQUFDLEVBQUU7R0FBQyxRQUFRLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxJQUFJO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsR0FBRztHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsZUFBZTtHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsTUFBTTtHQUFDLGtCQUFrQixFQUFDLEVBQUU7R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxNQUFNO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsV0FBVztHQUFDLFVBQVUsRUFBQyxlQUFlO0dBQUMsbUJBQW1CLEVBQUMsTUFBTTtHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsSUFBSTtHQUFDLFNBQVMsRUFBQyxHQUFHOzs7R0FBRyxNQUFNLEVBQUMsY0FBYztHQUFDLFVBQVUsRUFBQyxlQUFlO0dBQUMsbUJBQW1CLEVBQUMsTUFBTTtHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsSUFBSTtHQUFDLFNBQVMsRUFBQyxHQUFHOzs7R0FBRyxNQUFNLEVBQUMsY0FBYztHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsU0FBUztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxVQUFVO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxNQUFNOzs7R0FBRyxNQUFNLEVBQUMsV0FBVztHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsVUFBVTtHQUFDLGtCQUFrQixFQUFDLE1BQU07R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxVQUFVO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsU0FBUztHQUFDLFVBQVUsRUFBQyxRQUFRO0dBQUMsbUJBQW1CLEVBQUMsU0FBUztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsY0FBYztHQUFDLFVBQVUsRUFBQyxRQUFRO0dBQUMsbUJBQW1CLEVBQUMsU0FBUztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsYUFBYTtHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsUUFBUTtHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxJQUFJOzs7R0FBRyxNQUFNLEVBQUMsMkJBQTJCO0dB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R0FBRyxNQUFNLEVBQUMsWUFBWTtHQUFDLFVBQVUsRUFBQyxlQUFlO0dBQUMsbUJBQW1CLEVBQUMsS0FBSztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxVQUFVO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxHQUFHOzs7R0FBRyxNQUFNLEVBQUMsY0FBYztHQUFDLFVBQVUsRUFBQyxlQUFlO0dBQUMsbUJBQW1CLEVBQUMsU0FBUztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsV0FBVztHQUFDLFVBQVUsRUFBQyxRQUFRO0dBQUMsbUJBQW1CLEVBQUMsU0FBUztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsSUFBSTtHQUFDLFNBQVMsRUFBQyxRQUFRO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsSUFBSTtHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsZUFBZTtHQUFDLFVBQVUsRUFBQyxRQUFRO0dBQUMsbUJBQW1CLEVBQUMsT0FBTztHQUFDLGtCQUFrQixFQUFDLEdBQUc7R0FBQyxRQUFRLEVBQUMsR0FBRztHQUFDLFNBQVMsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLEdBQUc7R0FBQyxTQUFTLEVBQUMsSUFBSTtHQUFDLFNBQVMsRUFBQyxJQUFJOzs7R0FBRyxNQUFNLEVBQUMsZUFBZTtHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsTUFBTTtHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsR0FBRztHQUFDLFNBQVMsRUFBQyxNQUFNO0dBQUMsUUFBUSxFQUFDLE1BQU07R0FBQyxTQUFTLEVB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QUMsU0FBUztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsSUFBSTtHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsVUFBVTtHQUFDLFVBQVUsRUFBQyxRQUFRO0dBQUMsbUJBQW1CLEVBQUMsU0FBUztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsSUFBSTtHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsZUFBZTtHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsTUFBTTtHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxHQUFHOzs7R0FBRyxNQUFNLEVBQUMsV0FBVztHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsU0FBUztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsY0FBYztHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsT0FBTztHQUFDLGtCQUFrQixFQUFDLFFBQVE7R0FBQyxRQUFRLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxHQUFHOzs7R0FBRyxNQUFNLEVBQUMsUUFBUTtHQUFDLFVBQVUsRUFBQyxRQUFRO0dBQUMsbUJBQW1CLEVBQUMsU0FBUztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsZUFBZTtHQUFDLFVBQVUsRUFBQyxlQUFlO0dBQUMsbUJBQW1CLEVBQUMsUUFBUTtHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxJQUFJOzs7R0FBRyxNQUFNLEVBQUMsWUFBWTtHQUFDLFVBQVUsRUFBQyxlQUFlO0dBQUMsbUJBQW1CLEVBQUMsT0FBTztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsSUFBSTtHQUFDLFNBQVMsRUFBQyxJQUFJOzs7R0FBRyxNQUFNLEVBQUMsNkJBQTZCO0dBQUMsVUFBVSxFQUFDLE9BQU87R0FBQyxtQkFBbUIsRUFBQyxTQUFTO0dBQUMsa0JBQWtCLEVBQUMsUUFBUTtHQUFDLFFBQVEsRUFBQyxPQUFPO0dBQUMsU0FBUyxFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxJQUFJO0dBQUMsU0FBUyxFQUFDLEtBQUs7OztHQUFHLE1BQU0sRUFBQyxtQ0FBbUM7R0FBQyxVQUFVLEVBQUMsUUFBUTtHQUFDLG1CQUFtQixFQUFDLEtBQUs7R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLE9BQU87R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLElBQUk7R0FBQyxTQUFTLEVBQUMsSUFBSTs7O0dBQUcsTUFBTSxFQUFDLGFBQWE7R0FBQyxVQUFVLEVBQUMsUUFBUTtHQUFDLG1CQUFtQixFQUFDLFNBQVM7R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLE9BQU87R0FBQyxTQUFTLEVBQUMsU0FBUztHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLEtBQUs7R0FBQyxTQUFTLEVBQUMsS0FBSzs7O0dBQUcsTUFBTSxFQUFDLFdBQVc7R0FBQyxVQUFVLEVBQUMsZUFBZTtHQUFDLG1CQUFtQixFQUFDLFNBQVM7R0FBQyxrQkFBa0IsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLEtBQUs7R0FBQyxTQUFTLEVBQUMsVUFBVTtHQUFDLFFBQVEsRUFBQyxRQUFRO0dBQUMsU0FBUyxFQUFDLEtBQUs7R0FBQyxTQUFTLEVBQUMsS0FBSzs7O0dBQUcsTUFBTSxFQUFDLHFCQUFxQjtHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsT0FBTztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxXQUFXO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxJQUFJOzs7R0FBRyxNQUFNLEVBQUMsV0FBVztHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsS0FBSztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxNQUFNO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsR0FBRztHQUFDLFNBQVMsRUFBQyxHQUFHOzs7R0FBRyxNQUFNLEVBQUMsV0FBVztHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsTUFBTTtHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxHQUFHOzs7R0FBRyxNQUFNLEVBQUMsWUFBWTtHQUFDLFVBQVUsRUFBQyxhQUFhO0dBQUMsbUJBQW1CLEVBQUMsU0FBUztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsTUFBTTtHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsV0FBVztHQUFDLFVBQVUsRUFBQyxRQUFRO0dBQUMsbUJBQW1CLEVBQUMsTUFBTTtHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxRQUFRO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsSUFBSTtHQUFDLFNBQVMsRUFBQyxHQUFHOzs7R0FBRyxNQUFNLEVBQUMsYUFBYTtHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsU0FBUztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsUUFBUTtHQUFDLFNBQVMsRUFBQyxTQUFTO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsS0FBSztHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsVUFBVTtHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsU0FBUztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsT0FBTztHQUFDLFNBQVMsRUFBQyxPQUFPO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxTQUFTLEVBQUMsSUFBSTtHQUFDLFNBQVMsRUFBQyxLQUFLOzs7R0FBRyxNQUFNLEVBQUMsVUFBVTtHQUFDLFVBQVUsRUFBQyxPQUFPO0dBQUMsbUJBQW1CLEVBQUMsT0FBTztHQUFDLGtCQUFrQixFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsS0FBSztHQUFDLFNBQVMs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QyxTQUFTLEVBQUMsRUFBRTtHQUFDLFFBQVEsRUFBQyxJQUFJO0dBQUMsa0JBQWtCLEVBQUMsUUFBUTtHQUFDLFFBQVEsRUFBQyxJQUFJO0dBQUMsUUFBUSxFQUFDLE9BQU87R0FBQyxRQUFRLEVBQUMsR0FBRzs7O0dBQUcsU0FBUyxFQUFDLEVBQUU7R0FBQyxTQUFTLEVBQUMsRUFBRTtHQUFDLFFBQVEsRUFBQyxJQUFJO0dBQUMsa0JBQWtCLEVBQUMsUUFBUTtHQUFDLFFBQVEsRUFBQyxNQUFNO0dBQUMsUUFBUSxFQUFDLFdBQVc7R0FBQyxRQUFRLEVBQUMsSUFBSTs7O0dBQUcsU0FBUyxFQUFDLEVBQUU7R0FBQyxTQUFTLEVBQUMsRUFBRTtHQUFDLFFBQVEsRUFBQyxLQUFLO0dBQUMsa0JBQWtCLEVBQUMsV0FBVztHQUFDLFFBQVEsRUFBQyxHQUFHO0dBQUMsUUFBUSxFQUFDLGFBQWE7R0FBQyxRQUFRLEVBQUMsSUFBSTs7O0dBQUcsU0FBUyxFQUFDLEVBQUU7R0FBQyxTQUFTLEVBQUMsRUFBRTtHQUFDLFFBQVEsRUFBQyxNQUFNO0dBQUMsa0JBQWtCLEVBQUMsYUFBYTtHQUFDLFFBQVEsRUFBQyxJQUFJO0dBQUMsUUFBUSxFQUFDLGFBQWE7R0FBQyxRQUFRLEVBQUMsSUFBSTs7O0dBQUcsU0FBUyxFQUFDLEVBQUU7R0FBQyxTQUFTLEVBQUMsRUFBRTtHQUFDLFFBQVEsRUFBQyxPQUFPO0dBQUMsa0JBQWtCLEVBQUMsY0FBYztHQUFDLFFBQVEsRUFBQyxJQUFJO0dBQUMsUUFBUSxFQUFDLGFBQWE7R0FBQyxRQUFRLEVBQUMsSUFBSTs7O0dBQUcsU0FBUyxFQUFDLEVBQUU7R0FBQyxTQUFTLEVBQUMsRUFBRTtHQUFDLFFBQVEsRUFBQyxHQUFHO0dBQUMsa0JBQWtCLEVBQUMsTUFBTTtHQUFDLFFBQVEsRUFBQyxNQUFNO0dBQUMsUUFBUSxFQUFDLFFBQVE7R0FBQyxRQUFRLEVBQUMsR0FBRzs7O0dBQUcsU0FBUyxFQUFDLEVBQUU7R0FBQyxTQUFTLEVBQUMsRUFBRTtHQUFDLFFBQVEsRUFBQyxJQUFJ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QUF1QixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLHlDQUF5QyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM3c1A7QUFDQSxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoQztBQUNBLFNBQVMsd0JBQXdCLENBQUMsTUFBTSxFQUFFO0FBQzFDLENBQUMsZUFBZSxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQ3BELEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzFEO0FBQ0EsRUFBRSxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzFDO0FBQ0E7QUFDQSxFQUFFLE1B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
