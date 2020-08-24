import { S as SvelteComponentDev, a as init, d as dispatch_dev, s as safe_not_equal, b as validate_slots, k as space, j as element, t as text, N as svg_element, I as query_selector_all, p as detach_dev, q as claim_space, m as claim_element, n as children, o as claim_text, w as add_location, u as attr_dev, x as insert_dev, y as append_dev, O as noop } from './client.4cd7c324.js';

/* src/routes/contact.svelte generated by Svelte v3.24.1 */

const file = "src/routes/contact.svelte";

function create_fragment(ctx) {
	let t0;
	let h1;
	let t1;
	let t2;
	let p;
	let t3;
	let t4;
	let button;
	let svg;
	let path;
	let t5;
	let span;
	let t6;
	let t7;
	let footer;
	let t8;

	const block = {
		c: function create() {
			t0 = space();
			h1 = element("h1");
			t1 = text("Contact");
			t2 = space();
			p = element("p");
			t3 = text("This is the 'about' page. There's not much here.");
			t4 = space();
			button = element("button");
			svg = svg_element("svg");
			path = svg_element("path");
			t5 = space();
			span = element("span");
			t6 = text("Download");
			t7 = space();
			footer = element("footer");
			t8 = text("www.medicalunitconverter.com");
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-1ine71f\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			h1 = claim_element(nodes, "H1", {});
			var h1_nodes = children(h1);
			t1 = claim_text(h1_nodes, "Contact");
			h1_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			t3 = claim_text(p_nodes, "This is the 'about' page. There's not much here.");
			p_nodes.forEach(detach_dev);
			t4 = claim_space(nodes);
			button = claim_element(nodes, "BUTTON", { class: true });
			var button_nodes = children(button);
			svg = claim_element(button_nodes, "svg", { class: true, xmlns: true, viewBox: true }, 1);
			var svg_nodes = children(svg);
			path = claim_element(svg_nodes, "path", { d: true }, 1);
			children(path).forEach(detach_dev);
			svg_nodes.forEach(detach_dev);
			t5 = claim_space(button_nodes);
			span = claim_element(button_nodes, "SPAN", {});
			var span_nodes = children(span);
			t6 = claim_text(span_nodes, "Download");
			span_nodes.forEach(detach_dev);
			button_nodes.forEach(detach_dev);
			t7 = claim_space(nodes);
			footer = claim_element(nodes, "FOOTER", { class: true });
			var footer_nodes = children(footer);
			t8 = claim_text(footer_nodes, "www.medicalunitconverter.com");
			footer_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			document.title = "About";
			add_location(h1, file, 4, 0, 52);
			add_location(p, file, 6, 0, 70);
			attr_dev(path, "d", "M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z");
			add_location(path, file, 9, 96, 337);
			attr_dev(svg, "class", "fill-current w-4 h-4 mr-2");
			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr_dev(svg, "viewBox", "0 0 20 20");
			add_location(svg, file, 9, 2, 243);
			add_location(span, file, 10, 2, 399);
			attr_dev(button, "class", "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center");
			add_location(button, file, 8, 0, 127);
			attr_dev(footer, "class", "w-full text-center border-t border-grey p-4 pin-b");
			add_location(footer, file, 13, 0, 432);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, h1, anchor);
			append_dev(h1, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, p, anchor);
			append_dev(p, t3);
			insert_dev(target, t4, anchor);
			insert_dev(target, button, anchor);
			append_dev(button, svg);
			append_dev(svg, path);
			append_dev(button, t5);
			append_dev(button, span);
			append_dev(span, t6);
			insert_dev(target, t7, anchor);
			insert_dev(target, footer, anchor);
			append_dev(footer, t8);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(p);
			if (detaching) detach_dev(t4);
			if (detaching) detach_dev(button);
			if (detaching) detach_dev(t7);
			if (detaching) detach_dev(footer);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props) {
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Contact> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Contact", $$slots, []);
	return [];
}

class Contact extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Contact",
			options,
			id: create_fragment.name
		});
	}
}

export default Contact;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC5jNGM4YTBjNi5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
