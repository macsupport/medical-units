import { S as SvelteComponentDev, a as init, d as dispatch_dev, s as safe_not_equal, b as validate_slots, k as space, j as element, t as text, I as query_selector_all, p as detach_dev, q as claim_space, m as claim_element, n as children, o as claim_text, u as attr_dev, w as add_location, P as set_style, x as insert_dev, y as append_dev, O as noop } from './client.59e19162.js';

/* src/routes/about.svelte generated by Svelte v3.24.1 */

const file = "src/routes/about.svelte";

function create_fragment(ctx) {
	let t0;
	let h1;
	let t1;
	let t2;
	let p0;
	let t3;
	let t4;
	let p1;
	let t5;
	let t6;
	let p2;
	let t7;
	let t8;
	let p3;
	let t9;
	let t10;
	let ol0;
	let li0;
	let t11;
	let t12;
	let li1;
	let t13;
	let t14;
	let li2;
	let t15;
	let t16;
	let li3;
	let t17;
	let t18;
	let li4;
	let t19;
	let t20;
	let p4;
	let t21;
	let t22;
	let ol1;
	let li5;
	let t23;
	let t24;
	let li6;
	let t25;
	let t26;
	let footer;
	let t27;

	const block = {
		c: function create() {
			t0 = space();
			h1 = element("h1");
			t1 = text("About Unit Conversion");
			t2 = space();
			p0 = element("p");
			t3 = text("The Système Internationale d’Unites (SI), or the International System of Units was recommended for use in the health professions by the World Health Assembly in 1977. This system is slowly being adopted in the United States and many journals now require its use.");
			t4 = space();
			p1 = element("p");
			t5 = text("Medical Unit Converter easily converts  between US and International Human and Veterinary Medical lab values and Metric values. Enter a value in either the US or International input area and it will immediately be converted. Easily search for individual lab tests by typing in the name of the test.");
			t6 = space();
			p2 = element("p");
			t7 = text("The laboratory values and reference ranges are provided for illustration only and are not intended to be comprehensive or definitive. Each laboratory determines its own values, and reference ranges are highly method dependent.");
			t8 = text("\n Sources: \n ");
			p3 = element("p");
			t9 = text("Human References");
			t10 = space();
			ol0 = element("ol");
			li0 = element("li");
			t11 = text("Kratz A, Ferraro M, Sluss PM, Lewandrowski KB. Laboratory reference values. N Engl J Med. 2004;351(15):1548-1563");
			t12 = space();
			li1 = element("li");
			t13 = text("Young DS, Huth EJ. SI Units for Clinical Measurement. Philadelphia, PA: American College of Physicians; 1998");
			t14 = space();
			li2 = element("li");
			t15 = text("Henry JB, ed. Clinical Diagnosis and Management by Laboratory Methods. 20th ed. Philadelphia, PA: WB Saunders; 2001");
			t16 = space();
			li3 = element("li");
			t17 = text("Kasper DL, Braunwald E, Fauci AS, et al, eds. Harrison's Principles of Internal Medicine, 16th ed. New York, NY: McGraw Hill; 2004");
			t18 = space();
			li4 = element("li");
			t19 = text("Goldman L, Ausiello D. Cecil Textbook of Medicine. 22nd ed. Philadelphia, PA: WB Saunders; 2004");
			t20 = space();
			p4 = element("p");
			t21 = text("Veterinary References");
			t22 = space();
			ol1 = element("ol");
			li5 = element("li");
			t23 = text("Latimer KS, Duncan & Prasse’s Veterinary Laboratory Medicine: Clinical Pathology, 5th Ed., Wiley-Blackwell, 2011");
			t24 = space();
			li6 = element("li");
			t25 = text("Kaneko JJ, Harvey JW, Bruss ML, Clinical Biochemistry of Domestic Animals, 6th Ed., Academic Press, 2008");
			t26 = space();
			footer = element("footer");
			t27 = text("www.medicalunitconverter.com");
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-14gqc15\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			h1 = claim_element(nodes, "H1", { class: true });
			var h1_nodes = children(h1);
			t1 = claim_text(h1_nodes, "About Unit Conversion");
			h1_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			p0 = claim_element(nodes, "P", { class: true });
			var p0_nodes = children(p0);
			t3 = claim_text(p0_nodes, "The Système Internationale d’Unites (SI), or the International System of Units was recommended for use in the health professions by the World Health Assembly in 1977. This system is slowly being adopted in the United States and many journals now require its use.");
			p0_nodes.forEach(detach_dev);
			t4 = claim_space(nodes);
			p1 = claim_element(nodes, "P", { class: true });
			var p1_nodes = children(p1);
			t5 = claim_text(p1_nodes, "Medical Unit Converter easily converts  between US and International Human and Veterinary Medical lab values and Metric values. Enter a value in either the US or International input area and it will immediately be converted. Easily search for individual lab tests by typing in the name of the test.");
			p1_nodes.forEach(detach_dev);
			t6 = claim_space(nodes);
			p2 = claim_element(nodes, "P", { class: true });
			var p2_nodes = children(p2);
			t7 = claim_text(p2_nodes, "The laboratory values and reference ranges are provided for illustration only and are not intended to be comprehensive or definitive. Each laboratory determines its own values, and reference ranges are highly method dependent.");
			p2_nodes.forEach(detach_dev);
			t8 = claim_text(nodes, "\n Sources: \n ");
			p3 = claim_element(nodes, "P", { class: true });
			var p3_nodes = children(p3);
			t9 = claim_text(p3_nodes, "Human References");
			p3_nodes.forEach(detach_dev);
			t10 = claim_space(nodes);
			ol0 = claim_element(nodes, "OL", { style: true });
			var ol0_nodes = children(ol0);
			li0 = claim_element(ol0_nodes, "LI", {});
			var li0_nodes = children(li0);
			t11 = claim_text(li0_nodes, "Kratz A, Ferraro M, Sluss PM, Lewandrowski KB. Laboratory reference values. N Engl J Med. 2004;351(15):1548-1563");
			li0_nodes.forEach(detach_dev);
			t12 = claim_space(ol0_nodes);
			li1 = claim_element(ol0_nodes, "LI", {});
			var li1_nodes = children(li1);
			t13 = claim_text(li1_nodes, "Young DS, Huth EJ. SI Units for Clinical Measurement. Philadelphia, PA: American College of Physicians; 1998");
			li1_nodes.forEach(detach_dev);
			t14 = claim_space(ol0_nodes);
			li2 = claim_element(ol0_nodes, "LI", {});
			var li2_nodes = children(li2);
			t15 = claim_text(li2_nodes, "Henry JB, ed. Clinical Diagnosis and Management by Laboratory Methods. 20th ed. Philadelphia, PA: WB Saunders; 2001");
			li2_nodes.forEach(detach_dev);
			t16 = claim_space(ol0_nodes);
			li3 = claim_element(ol0_nodes, "LI", {});
			var li3_nodes = children(li3);
			t17 = claim_text(li3_nodes, "Kasper DL, Braunwald E, Fauci AS, et al, eds. Harrison's Principles of Internal Medicine, 16th ed. New York, NY: McGraw Hill; 2004");
			li3_nodes.forEach(detach_dev);
			t18 = claim_space(ol0_nodes);
			li4 = claim_element(ol0_nodes, "LI", {});
			var li4_nodes = children(li4);
			t19 = claim_text(li4_nodes, "Goldman L, Ausiello D. Cecil Textbook of Medicine. 22nd ed. Philadelphia, PA: WB Saunders; 2004");
			li4_nodes.forEach(detach_dev);
			ol0_nodes.forEach(detach_dev);
			t20 = claim_space(nodes);
			p4 = claim_element(nodes, "P", { class: true });
			var p4_nodes = children(p4);
			t21 = claim_text(p4_nodes, "Veterinary References");
			p4_nodes.forEach(detach_dev);
			t22 = claim_space(nodes);
			ol1 = claim_element(nodes, "OL", { style: true });
			var ol1_nodes = children(ol1);
			li5 = claim_element(ol1_nodes, "LI", {});
			var li5_nodes = children(li5);
			t23 = claim_text(li5_nodes, "Latimer KS, Duncan & Prasse’s Veterinary Laboratory Medicine: Clinical Pathology, 5th Ed., Wiley-Blackwell, 2011");
			li5_nodes.forEach(detach_dev);
			t24 = claim_space(ol1_nodes);
			li6 = claim_element(ol1_nodes, "LI", {});
			var li6_nodes = children(li6);
			t25 = claim_text(li6_nodes, "Kaneko JJ, Harvey JW, Bruss ML, Clinical Biochemistry of Domestic Animals, 6th Ed., Academic Press, 2008");
			li6_nodes.forEach(detach_dev);
			ol1_nodes.forEach(detach_dev);
			t26 = claim_space(nodes);
			footer = claim_element(nodes, "FOOTER", { class: true });
			var footer_nodes = children(footer);
			t27 = claim_text(footer_nodes, "www.medicalunitconverter.com");
			footer_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			document.title = "About Unit Conversion";
			attr_dev(h1, "class", "text-3xl mb-2");
			add_location(h1, file, 4, 0, 68);
			attr_dev(p0, "class", "mb-");
			add_location(p0, file, 5, 0, 121);
			attr_dev(p1, "class", "mb-2");
			add_location(p1, file, 6, 0, 403);
			attr_dev(p2, "class", "");
			add_location(p2, file, 7, 0, 723);
			attr_dev(p3, "class", "font-bold");
			add_location(p3, file, 9, 1, 979);
			add_location(li0, file, 11, 2, 1064);
			add_location(li1, file, 12, 2, 1189);
			add_location(li2, file, 13, 2, 1310);
			add_location(li3, file, 14, 2, 1438);
			add_location(li4, file, 15, 2, 1580);
			set_style(ol0, "list-style-type", "decimal");
			add_location(ol0, file, 10, 1, 1023);
			attr_dev(p4, "class", "font-bold");
			add_location(p4, file, 17, 1, 1693);
			add_location(li5, file, 19, 2, 1782);
			add_location(li6, file, 20, 2, 1906);
			set_style(ol1, "list-style-type", "decimal");
			add_location(ol1, file, 18, 1, 1741);
			attr_dev(footer, "class", "w-full text-center border-t border-grey p-4 pin-b");
			add_location(footer, file, 23, 1, 2030);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, h1, anchor);
			append_dev(h1, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, p0, anchor);
			append_dev(p0, t3);
			insert_dev(target, t4, anchor);
			insert_dev(target, p1, anchor);
			append_dev(p1, t5);
			insert_dev(target, t6, anchor);
			insert_dev(target, p2, anchor);
			append_dev(p2, t7);
			insert_dev(target, t8, anchor);
			insert_dev(target, p3, anchor);
			append_dev(p3, t9);
			insert_dev(target, t10, anchor);
			insert_dev(target, ol0, anchor);
			append_dev(ol0, li0);
			append_dev(li0, t11);
			append_dev(ol0, t12);
			append_dev(ol0, li1);
			append_dev(li1, t13);
			append_dev(ol0, t14);
			append_dev(ol0, li2);
			append_dev(li2, t15);
			append_dev(ol0, t16);
			append_dev(ol0, li3);
			append_dev(li3, t17);
			append_dev(ol0, t18);
			append_dev(ol0, li4);
			append_dev(li4, t19);
			insert_dev(target, t20, anchor);
			insert_dev(target, p4, anchor);
			append_dev(p4, t21);
			insert_dev(target, t22, anchor);
			insert_dev(target, ol1, anchor);
			append_dev(ol1, li5);
			append_dev(li5, t23);
			append_dev(ol1, t24);
			append_dev(ol1, li6);
			append_dev(li6, t25);
			insert_dev(target, t26, anchor);
			insert_dev(target, footer, anchor);
			append_dev(footer, t27);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(p0);
			if (detaching) detach_dev(t4);
			if (detaching) detach_dev(p1);
			if (detaching) detach_dev(t6);
			if (detaching) detach_dev(p2);
			if (detaching) detach_dev(t8);
			if (detaching) detach_dev(p3);
			if (detaching) detach_dev(t10);
			if (detaching) detach_dev(ol0);
			if (detaching) detach_dev(t20);
			if (detaching) detach_dev(p4);
			if (detaching) detach_dev(t22);
			if (detaching) detach_dev(ol1);
			if (detaching) detach_dev(t26);
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
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<About> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("About", $$slots, []);
	return [];
}

class About extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "About",
			options,
			id: create_fragment.name
		});
	}
}

export default About;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvdXQuMTE3MTU0MjkuanMiLCJzb3VyY2VzIjpbXSwic291cmNlc0NvbnRlbnQiOltdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
