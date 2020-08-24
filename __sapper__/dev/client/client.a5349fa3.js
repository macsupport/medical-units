function noop() { }
const identity = x => x;
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}

function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function claim_element(nodes, name, attributes, svg) {
    for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeName === name) {
            let j = 0;
            const remove = [];
            while (j < node.attributes.length) {
                const attribute = node.attributes[j++];
                if (!attributes[attribute.name]) {
                    remove.push(attribute.name);
                }
            }
            for (let k = 0; k < remove.length; k++) {
                node.removeAttribute(remove[k]);
            }
            return nodes.splice(i, 1)[0];
        }
    }
    return svg ? svg_element(name) : element(name);
}
function claim_text(nodes, data) {
    for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeType === 3) {
            node.data = '' + data;
            return nodes.splice(i, 1)[0];
        }
    }
    return text(data);
}
function claim_space(nodes) {
    return claim_text(nodes, ' ');
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
function set_style(node, key, value, important) {
    node.style.setProperty(key, value, important ? 'important' : '');
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}
function query_selector_all(selector, parent = document.body) {
    return Array.from(parent.querySelectorAll(selector));
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

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}
function create_component(block) {
    block && block.c();
}
function claim_component(block, parent_nodes) {
    block && block.l(parent_nodes);
}
function mount_component(component, target, anchor) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    // onMount happens before the initial afterUpdate
    add_render_callback(() => {
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) {
            on_destroy.push(...new_on_destroy);
        }
        else {
            // Edge case - component was destroyed immediately,
            // most likely as a result of a binding initialising
            run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const prop_values = options.props || {};
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : []),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, prop_values, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor);
        flush();
    }
    set_current_component(parent_component);
}
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.24.1' }, detail)));
}
function append_dev(target, node) {
    dispatch_dev("SvelteDOMInsert", { target, node });
    append(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev("SvelteDOMInsert", { target, node, anchor });
    insert(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev("SvelteDOMRemove", { node });
    detach(node);
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
    else
        dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
}
function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev("SvelteDOMSetProperty", { node, property, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    dispatch_dev("SvelteDOMSetData", { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error(`'target' is a required option`);
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn(`Component was already destroyed`); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}

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

const preload = () => ({});

/* node_modules/svelte-fa/src/fa.svelte generated by Svelte v3.24.1 */

const file = "node_modules/svelte-fa/src/fa.svelte";

// (104:0) {#if i[4]}
function create_if_block(ctx) {
	let svg;
	let g1;
	let g0;
	let svg_viewBox_value;

	function select_block_type(ctx, dirty) {
		if (typeof /*i*/ ctx[8][4] == "string") return create_if_block_1;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			svg = svg_element("svg");
			g1 = svg_element("g");
			g0 = svg_element("g");
			if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			svg = claim_element(
				nodes,
				"svg",
				{
					id: true,
					class: true,
					style: true,
					viewBox: true,
					"aria-hidden": true,
					role: true,
					xmlns: true
				},
				1
			);

			var svg_nodes = children(svg);
			g1 = claim_element(svg_nodes, "g", { transform: true }, 1);
			var g1_nodes = children(g1);
			g0 = claim_element(g1_nodes, "g", { transform: true }, 1);
			var g0_nodes = children(g0);
			if_block.l(g0_nodes);
			g0_nodes.forEach(detach_dev);
			g1_nodes.forEach(detach_dev);
			svg_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(g0, "transform", /*transform*/ ctx[10]);
			add_location(g0, file, 116, 6, 2052);
			attr_dev(g1, "transform", "translate(256 256)");
			add_location(g1, file, 113, 4, 2000);
			attr_dev(svg, "id", /*id*/ ctx[1]);
			attr_dev(svg, "class", /*clazz*/ ctx[0]);
			attr_dev(svg, "style", /*s*/ ctx[9]);
			attr_dev(svg, "viewBox", svg_viewBox_value = `0 0 ${/*i*/ ctx[8][0]} ${/*i*/ ctx[8][1]}`);
			attr_dev(svg, "aria-hidden", "true");
			attr_dev(svg, "role", "img");
			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
			add_location(svg, file, 104, 2, 1830);
		},
		m: function mount(target, anchor) {
			insert_dev(target, svg, anchor);
			append_dev(svg, g1);
			append_dev(g1, g0);
			if_block.m(g0, null);
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(g0, null);
				}
			}

			if (dirty & /*transform*/ 1024) {
				attr_dev(g0, "transform", /*transform*/ ctx[10]);
			}

			if (dirty & /*id*/ 2) {
				attr_dev(svg, "id", /*id*/ ctx[1]);
			}

			if (dirty & /*clazz*/ 1) {
				attr_dev(svg, "class", /*clazz*/ ctx[0]);
			}

			if (dirty & /*s*/ 512) {
				attr_dev(svg, "style", /*s*/ ctx[9]);
			}

			if (dirty & /*i*/ 256 && svg_viewBox_value !== (svg_viewBox_value = `0 0 ${/*i*/ ctx[8][0]} ${/*i*/ ctx[8][1]}`)) {
				attr_dev(svg, "viewBox", svg_viewBox_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(svg);
			if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(104:0) {#if i[4]}",
		ctx
	});

	return block;
}

// (124:8) {:else}
function create_else_block(ctx) {
	let path0;
	let path0_d_value;
	let path0_fill_value;
	let path0_fill_opacity_value;
	let path1;
	let path1_d_value;
	let path1_fill_value;
	let path1_fill_opacity_value;

	const block = {
		c: function create() {
			path0 = svg_element("path");
			path1 = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path0 = claim_element(
				nodes,
				"path",
				{
					d: true,
					fill: true,
					"fill-opacity": true,
					transform: true
				},
				1
			);

			children(path0).forEach(detach_dev);

			path1 = claim_element(
				nodes,
				"path",
				{
					d: true,
					fill: true,
					"fill-opacity": true,
					transform: true
				},
				1
			);

			children(path1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", path0_d_value = /*i*/ ctx[8][4][0]);
			attr_dev(path0, "fill", path0_fill_value = /*secondaryColor*/ ctx[4] || /*color*/ ctx[2] || "currentColor");

			attr_dev(path0, "fill-opacity", path0_fill_opacity_value = /*swapOpacity*/ ctx[7] != false
			? /*primaryOpacity*/ ctx[5]
			: /*secondaryOpacity*/ ctx[6]);

			attr_dev(path0, "transform", "translate(-256 -256)");
			add_location(path0, file, 124, 10, 2286);
			attr_dev(path1, "d", path1_d_value = /*i*/ ctx[8][4][1]);
			attr_dev(path1, "fill", path1_fill_value = /*primaryColor*/ ctx[3] || /*color*/ ctx[2] || "currentColor");

			attr_dev(path1, "fill-opacity", path1_fill_opacity_value = /*swapOpacity*/ ctx[7] != false
			? /*secondaryOpacity*/ ctx[6]
			: /*primaryOpacity*/ ctx[5]);

			attr_dev(path1, "transform", "translate(-256 -256)");
			add_location(path1, file, 130, 10, 2529);
		},
		m: function mount(target, anchor) {
			insert_dev(target, path0, anchor);
			insert_dev(target, path1, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*i*/ 256 && path0_d_value !== (path0_d_value = /*i*/ ctx[8][4][0])) {
				attr_dev(path0, "d", path0_d_value);
			}

			if (dirty & /*secondaryColor, color*/ 20 && path0_fill_value !== (path0_fill_value = /*secondaryColor*/ ctx[4] || /*color*/ ctx[2] || "currentColor")) {
				attr_dev(path0, "fill", path0_fill_value);
			}

			if (dirty & /*swapOpacity, primaryOpacity, secondaryOpacity*/ 224 && path0_fill_opacity_value !== (path0_fill_opacity_value = /*swapOpacity*/ ctx[7] != false
			? /*primaryOpacity*/ ctx[5]
			: /*secondaryOpacity*/ ctx[6])) {
				attr_dev(path0, "fill-opacity", path0_fill_opacity_value);
			}

			if (dirty & /*i*/ 256 && path1_d_value !== (path1_d_value = /*i*/ ctx[8][4][1])) {
				attr_dev(path1, "d", path1_d_value);
			}

			if (dirty & /*primaryColor, color*/ 12 && path1_fill_value !== (path1_fill_value = /*primaryColor*/ ctx[3] || /*color*/ ctx[2] || "currentColor")) {
				attr_dev(path1, "fill", path1_fill_value);
			}

			if (dirty & /*swapOpacity, secondaryOpacity, primaryOpacity*/ 224 && path1_fill_opacity_value !== (path1_fill_opacity_value = /*swapOpacity*/ ctx[7] != false
			? /*secondaryOpacity*/ ctx[6]
			: /*primaryOpacity*/ ctx[5])) {
				attr_dev(path1, "fill-opacity", path1_fill_opacity_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(path0);
			if (detaching) detach_dev(path1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(124:8) {:else}",
		ctx
	});

	return block;
}

// (118:8) {#if typeof i[4] == 'string'}
function create_if_block_1(ctx) {
	let path;
	let path_d_value;
	let path_fill_value;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_element(nodes, "path", { d: true, fill: true, transform: true }, 1);
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", path_d_value = /*i*/ ctx[8][4]);
			attr_dev(path, "fill", path_fill_value = /*color*/ ctx[2] || /*primaryColor*/ ctx[3] || "currentColor");
			attr_dev(path, "transform", "translate(-256 -256)");
			add_location(path, file, 118, 10, 2116);
		},
		m: function mount(target, anchor) {
			insert_dev(target, path, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*i*/ 256 && path_d_value !== (path_d_value = /*i*/ ctx[8][4])) {
				attr_dev(path, "d", path_d_value);
			}

			if (dirty & /*color, primaryColor*/ 12 && path_fill_value !== (path_fill_value = /*color*/ ctx[2] || /*primaryColor*/ ctx[3] || "currentColor")) {
				attr_dev(path, "fill", path_fill_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(118:8) {#if typeof i[4] == 'string'}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let if_block_anchor;
	let if_block = /*i*/ ctx[8][4] && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (/*i*/ ctx[8][4]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
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

function instance($$self, $$props, $$invalidate) {
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

	const writable_props = [
		"class",
		"id",
		"style",
		"icon",
		"fw",
		"flip",
		"pull",
		"rotate",
		"size",
		"color",
		"primaryColor",
		"secondaryColor",
		"primaryOpacity",
		"secondaryOpacity",
		"swapOpacity"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Fa> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Fa", $$slots, []);

	$$self.$$set = $$props => {
		if ("class" in $$props) $$invalidate(0, clazz = $$props.class);
		if ("id" in $$props) $$invalidate(1, id = $$props.id);
		if ("style" in $$props) $$invalidate(11, style = $$props.style);
		if ("icon" in $$props) $$invalidate(12, icon = $$props.icon);
		if ("fw" in $$props) $$invalidate(13, fw = $$props.fw);
		if ("flip" in $$props) $$invalidate(14, flip = $$props.flip);
		if ("pull" in $$props) $$invalidate(15, pull = $$props.pull);
		if ("rotate" in $$props) $$invalidate(16, rotate = $$props.rotate);
		if ("size" in $$props) $$invalidate(17, size = $$props.size);
		if ("color" in $$props) $$invalidate(2, color = $$props.color);
		if ("primaryColor" in $$props) $$invalidate(3, primaryColor = $$props.primaryColor);
		if ("secondaryColor" in $$props) $$invalidate(4, secondaryColor = $$props.secondaryColor);
		if ("primaryOpacity" in $$props) $$invalidate(5, primaryOpacity = $$props.primaryOpacity);
		if ("secondaryOpacity" in $$props) $$invalidate(6, secondaryOpacity = $$props.secondaryOpacity);
		if ("swapOpacity" in $$props) $$invalidate(7, swapOpacity = $$props.swapOpacity);
	};

	$$self.$capture_state = () => ({
		clazz,
		id,
		style,
		icon,
		fw,
		flip,
		pull,
		rotate,
		size,
		color,
		primaryColor,
		secondaryColor,
		primaryOpacity,
		secondaryOpacity,
		swapOpacity,
		i,
		s,
		transform
	});

	$$self.$inject_state = $$props => {
		if ("clazz" in $$props) $$invalidate(0, clazz = $$props.clazz);
		if ("id" in $$props) $$invalidate(1, id = $$props.id);
		if ("style" in $$props) $$invalidate(11, style = $$props.style);
		if ("icon" in $$props) $$invalidate(12, icon = $$props.icon);
		if ("fw" in $$props) $$invalidate(13, fw = $$props.fw);
		if ("flip" in $$props) $$invalidate(14, flip = $$props.flip);
		if ("pull" in $$props) $$invalidate(15, pull = $$props.pull);
		if ("rotate" in $$props) $$invalidate(16, rotate = $$props.rotate);
		if ("size" in $$props) $$invalidate(17, size = $$props.size);
		if ("color" in $$props) $$invalidate(2, color = $$props.color);
		if ("primaryColor" in $$props) $$invalidate(3, primaryColor = $$props.primaryColor);
		if ("secondaryColor" in $$props) $$invalidate(4, secondaryColor = $$props.secondaryColor);
		if ("primaryOpacity" in $$props) $$invalidate(5, primaryOpacity = $$props.primaryOpacity);
		if ("secondaryOpacity" in $$props) $$invalidate(6, secondaryOpacity = $$props.secondaryOpacity);
		if ("swapOpacity" in $$props) $$invalidate(7, swapOpacity = $$props.swapOpacity);
		if ("i" in $$props) $$invalidate(8, i = $$props.i);
		if ("s" in $$props) $$invalidate(9, s = $$props.s);
		if ("transform" in $$props) $$invalidate(10, transform = $$props.transform);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*icon*/ 4096) {
			 $$invalidate(8, i = icon && icon.icon || [0, 0, "", [], ""]);
		}

		if ($$self.$$.dirty & /*fw, pull, size, style*/ 174080) {
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

				$$invalidate(9, s = styleStr + style);
			}
		}

		if ($$self.$$.dirty & /*flip, rotate*/ 81920) {
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

				$$invalidate(10, transform = t);
			}
		}
	};

	return [
		clazz,
		id,
		color,
		primaryColor,
		secondaryColor,
		primaryOpacity,
		secondaryOpacity,
		swapOpacity,
		i,
		s,
		transform,
		style,
		icon,
		fw,
		flip,
		pull,
		rotate,
		size
	];
}

class Fa extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance, create_fragment, safe_not_equal, {
			class: 0,
			id: 1,
			style: 11,
			icon: 12,
			fw: 13,
			flip: 14,
			pull: 15,
			rotate: 16,
			size: 17,
			color: 2,
			primaryColor: 3,
			secondaryColor: 4,
			primaryOpacity: 5,
			secondaryOpacity: 6,
			swapOpacity: 7
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Fa",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*icon*/ ctx[12] === undefined && !("icon" in props)) {
			console.warn("<Fa> was created without expected prop 'icon'");
		}
	}

	get class() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get id() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get style() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set style(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get icon() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set icon(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get fw() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set fw(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get flip() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set flip(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get pull() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set pull(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get rotate() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set rotate(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get size() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set size(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get color() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set color(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get primaryColor() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set primaryColor(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get secondaryColor() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set secondaryColor(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get primaryOpacity() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set primaryOpacity(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get secondaryOpacity() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set secondaryOpacity(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get swapOpacity() {
		throw new Error("<Fa>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set swapOpacity(value) {
		throw new Error("<Fa>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var faArrowsAltH = {
  prefix: 'fad',
  iconName: 'arrows-alt-h',
  icon: [512, 512, [], "f337", ["M134.1 216H378v80H134.1z", "M378 170v172c0 21.41 25.88 32.1 41 17l86-86a24 24 0 0 0 0-33.94L419 153c-15.17-15-41-4.36-41 17zM134.1 342V170.11c0-21.41-25.88-32.1-41-17l-86.1 86A24 24 0 0 0 7 273l86.1 86c15.15 15.06 41 4.37 41-17z"]]
};
var faBalanceScale = {
  prefix: 'fad',
  iconName: 'balance-scale',
  icon: [640, 512, [], "f24e", ["M544 464v32a16 16 0 0 1-16 16H112a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h176V153.25A80.06 80.06 0 0 1 241.61 96H112a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h144.36a79.28 79.28 0 0 1 127.28 0H528a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H398.39A80.06 80.06 0 0 1 352 153.25V448h176a16 16 0 0 1 16 16z", "M256 336c0-16.18 1.34-8.73-85-181.51-17.65-35.29-68.19-35.36-85.87 0C-2.06 328.75 0 320.33 0 336c0 44.18 57.31 80 128 80s128-35.82 128-80zM128 176l72 144H56zm512 160c0-16.18 1.34-8.73-85.05-181.51-17.65-35.29-68.19-35.36-85.87 0C381.94 328.75 384 320.33 384 336c0 44.18 57.31 80 128 80s128-35.82 128-80zm-200-16l72-144 72 144z"]]
};
var faCalculator = {
  prefix: 'fad',
  iconName: 'calculator',
  icon: [448, 512, [], "f1ec", ["M115.2 384H76.8c-6.4 0-12.8 6.4-12.8 12.8v38.4c0 6.4 6.4 12.8 12.8 12.8h38.4c6.4 0 12.8-6.4 12.8-12.8v-38.4c0-6.4-6.4-12.8-12.8-12.8zm0-128H76.8c-6.4 0-12.8 6.4-12.8 12.8v38.4c0 6.4 6.4 12.8 12.8 12.8h38.4c6.4 0 12.8-6.4 12.8-12.8v-38.4c0-6.4-6.4-12.8-12.8-12.8zm128 128h-38.4c-6.4 0-12.8 6.4-12.8 12.8v38.4c0 6.4 6.4 12.8 12.8 12.8h38.4c6.4 0 12.8-6.4 12.8-12.8v-38.4c0-6.4-6.4-12.8-12.8-12.8zm0-128h-38.4c-6.4 0-12.8 6.4-12.8 12.8v38.4c0 6.4 6.4 12.8 12.8 12.8h38.4c6.4 0 12.8-6.4 12.8-12.8v-38.4c0-6.4-6.4-12.8-12.8-12.8zm128 0h-38.4c-6.4 0-12.8 6.4-12.8 12.8v166.4c0 6.4 6.4 12.8 12.8 12.8h38.4c6.4 0 12.8-6.4 12.8-12.8V268.8c0-6.4-6.4-12.8-12.8-12.8z", "M400 0H48C22.4 0 0 22.4 0 48v416c0 25.6 22.4 48 48 48h352c25.6 0 48-22.4 48-48V48c0-25.6-22.4-48-48-48zM128 435.2c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8zm0-128c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8zm0-128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8V268.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8zm0-256c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8V76.8C64 70.4 70.4 64 76.8 64h294.4c6.4 0 12.8 6.4 12.8 12.8z"]]
};
var faDog = {
  prefix: 'fad',
  iconName: 'dog',
  icon: [576, 512, [], "f6d3", ["M448,278,299,224l21-26,128,46Z", "M128,224a32,32,0,0,1-32-32,32,32,0,0,0-64,0c0,41.66,26.83,76.85,64,90.1V496a16,16,0,0,0,16,16h64a16,16,0,0,0,16-16V384H352V496a16,16,0,0,0,16,16h64a16,16,0,0,0,16-16V277.55L298.05,224ZM528,96H464l-7.16-14.31A32,32,0,0,0,428.22,64H374.6L347.32,36.72C337.23,26.64,320,33.78,320,48V197.87l128,45.71V208h32a64,64,0,0,0,64-64V112A16,16,0,0,0,528,96ZM416,128a16,16,0,1,1,16-16A16,16,0,0,1,416,128Z"]]
};
var faFlagUsa = {
  prefix: 'fad',
  iconName: 'flag-usa',
  icon: [512, 512, [], "f74d", ["M299.9 303.62c-57.2-15.09-111.7-28.79-203.9 11.1V384c185.7-92.2 221.7 53.3 397.5-23.11a31.39 31.39 0 0 0 18.5-28.8v-36c-43.6 17.3-80.2 24.1-112.1 24.1-37.4-.07-68.9-8.36-100-16.57zm9.5-221.89c51.8 15.6 97.4 29 202.6-20.11V30.83c0-25.1-26.8-38.1-49.4-26.6-89.25 45.48-128.17 25.54-174.6 9.39v158c6.76 1.66 13.45 3.4 20.1 5.14 57.2 15 111.7 28.7 203.9-11.1V96.73c-53.6 23.5-93.3 31.39-126.1 31.39s-59-7.79-85.7-15.89c-4-1.21-8.1-2.4-12.1-3.5V75.52c7.2 2 14.3 4.1 21.3 6.21zm-9.5 125.89c-57.2-15.09-111.7-28.79-203.9 11.1v61.5c94.8-37.6 154.6-22.69 212.1-7.6 57.2 15.1 111.7 28.8 203.9-11.09V200c-43.6 17.3-80.2 24.09-112.1 24.09-37.4.03-68.9-8.26-100-16.47z", "M32 0A32 32 0 0 0 0 32v464a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V32A32 32 0 0 0 32 0zm64 32.4v151.93c83.83-33.17 140.29-25.43 192-12.75v-158C245.32-1.23 196.3-12.89 96 32.42zm64 95.7a16 16 0 1 1 16-16 16 16 0 0 1-16 16.02zm0-55.79a16 16 0 1 1 16-16 16 16 0 0 1-16 16.02zm64 47.9a16 16 0 1 1 16-16 16 16 0 0 1-16 16.02zm0-55.9a16 16 0 1 1 16-16 16 16 0 0 1-16 16.02z"]]
};
var faGlobe = {
  prefix: 'fad',
  iconName: 'globe',
  icon: [496, 512, [], "f0ac", ["M340.45,320H155.55a579.08,579.08,0,0,1,0-128h184.9A575,575,0,0,1,344,256,575,575,0,0,1,340.45,320ZM160.2,160H335.8c-.41-2.31-.84-4.62-1.28-6.91-6-30.85-14.42-58.37-25.13-81.78C299.54,49.77,288,32.54,276.05,21.48,266.38,12.53,256.94,8,248,8s-18.38,4.53-28,13.48c-12,11.06-23.49,28.29-33.34,49.83C176,94.72,167.5,122.24,161.53,153.09,161,155.38,160.61,157.69,160.2,160ZM120,256a608,608,0,0,1,3.34-64H8.35a249.52,249.52,0,0,0,0,128h115A608,608,0,0,1,120,256Zm367.62-64h-115A608.06,608.06,0,0,1,376,256a608,608,0,0,1-3.34,64h115a249.52,249.52,0,0,0,0-128ZM476.7,160A248.62,248.62,0,0,0,315.58,17.32c24.13,33,42.89,83.15,52.75,142.68ZM315.58,494.68A248.59,248.59,0,0,0,476.71,352H368.33C358.47,411.53,339.71,461.68,315.58,494.68ZM335.8,352H160.2c.41,2.31.84,4.62,1.28,6.91,6,30.85,14.42,58.37,25.13,81.78,9.85,21.54,21.38,38.77,33.34,49.83,9.67,9,19.11,13.48,28.05,13.48s18.38-4.53,28.05-13.48c12-11.06,23.49-28.29,33.34-49.83,10.71-23.41,19.16-50.93,25.13-81.78C335,356.62,335.39,354.31,335.8,352ZM180.42,17.32A248.59,248.59,0,0,0,19.29,160H127.67C137.53,100.47,156.29,50.32,180.42,17.32ZM19.29,352A248.59,248.59,0,0,0,180.42,494.68c-24.13-33-42.89-83.15-52.75-142.68Z", "M376,256a608,608,0,0,0-3.34-64h115a245.72,245.72,0,0,0-10.92-32H368.33c-9.86-59.53-28.62-109.68-52.75-142.68A248.23,248.23,0,0,0,248,8c8.94,0,18.38,4.53,28.05,13.48,12,11.06,23.49,28.29,33.34,49.83,10.71,23.41,19.16,50.93,25.13,81.78.44,2.29.87,4.6,1.28,6.91H160.2c.41-2.31.84-4.62,1.28-6.91,6-30.85,14.42-58.37,25.13-81.78C196.46,49.77,208,32.54,220,21.48,229.62,12.53,239.06,8,248,8a248.23,248.23,0,0,0-67.58,9.32c-24.13,33-42.89,83.15-52.75,142.68H19.29A245.72,245.72,0,0,0,8.37,192h115a613.93,613.93,0,0,0,0,128H8.37a245.72,245.72,0,0,0,10.92,32H127.67c9.86,59.53,28.62,109.68,52.75,142.68A248.23,248.23,0,0,0,248,504c-8.94,0-18.38-4.53-28.05-13.48-12-11.06-23.49-28.29-33.34-49.83-10.71-23.41-19.16-50.93-25.13-81.78-.44-2.29-.87-4.6-1.28-6.91H335.8c-.41,2.31-.84,4.62-1.28,6.91-6,30.85-14.42,58.37-25.13,81.78-9.85,21.54-21.38,38.77-33.34,49.83-9.67,9-19.11,13.48-28.05,13.48a248.23,248.23,0,0,0,67.58-9.32c24.13-33,42.89-83.15,52.75-142.68H476.71a245.72,245.72,0,0,0,10.92-32h-115A605.37,605.37,0,0,0,376,256Zm-35.54,64H155.55a579.08,579.08,0,0,1,0-128h184.9A575,575,0,0,1,344,256a575,575,0,0,1-3.55,64Z"]]
};
var faInfoCircle = {
  prefix: 'fad',
  iconName: 'info-circle',
  icon: [512, 512, [], "f05a", ["M256 8C119 8 8 119.08 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 110a42 42 0 1 1-42 42 42 42 0 0 1 42-42zm56 254a12 12 0 0 1-12 12h-88a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h12v-64h-12a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h64a12 12 0 0 1 12 12v100h12a12 12 0 0 1 12 12z", "M256 202a42 42 0 1 0-42-42 42 42 0 0 0 42 42zm44 134h-12V236a12 12 0 0 0-12-12h-64a12 12 0 0 0-12 12v24a12 12 0 0 0 12 12h12v64h-12a12 12 0 0 0-12 12v24a12 12 0 0 0 12 12h88a12 12 0 0 0 12-12v-24a12 12 0 0 0-12-12z"]]
};
var faPaperPlane = {
  prefix: 'fad',
  iconName: 'paper-plane',
  icon: [512, 512, [], "f1d8", ["M245.53 410.5l-75 92.83c-14 17.1-42.5 7.8-42.5-15.8V358l280.26-252.77c5.5-4.9 13.3 2.6 8.6 8.3L191.72 387.87z", "M511.59 28l-72 432a24.07 24.07 0 0 1-33 18.2l-214.87-90.33 225.17-274.34c4.7-5.7-3.1-13.2-8.6-8.3L128 358 14.69 313.83a24 24 0 0 1-2.2-43.2L476 3.23c17.29-10 39 4.6 35.59 24.77z"]]
};
var faPencilRuler = {
  prefix: 'fad',
  iconName: 'pencil-ruler',
  icon: [512, 512, [], "f5ae", ["M138.25 127.05a7.92 7.92 0 0 1-11.2 0l-11.21-11.21a7.92 7.92 0 0 1 0-11.21L177.5 43 143.87 9.3A31.73 31.73 0 0 0 99 9.3L9.29 99a31.74 31.74 0 0 0 0 44.86l100.17 100.19L244 109.49l-44.08-44.12zm364.46 241.1l-33.63-33.64-61.68 61.68a7.92 7.92 0 0 1-11.21 0L385 385a7.92 7.92 0 0 1 0-11.21l61.68-61.68L402.52 268 267.94 402.51l100.21 100.2a31.7 31.7 0 0 0 44.85 0L502.71 413a31.72 31.72 0 0 0 0-44.85z", "M497.94 59.32l-45.25-45.25a48.05 48.05 0 0 0-67.95 0l-46 46 113.21 113.2 46-46a48 48 0 0 0-.01-67.95zM19.08 379.68L.33 487.12a21.23 21.23 0 0 0 24.59 24.56l107.45-18.84 296.92-296.93L316.08 82.72z"]]
};
var faUserMd = {
  prefix: 'fad',
  iconName: 'user-md',
  icon: [448, 512, [], "f0f0", ["M352 128a128 128 0 1 0-128 128 128 128 0 0 0 128-128zM144 370.6V288h-9.6a135.6 135.6 0 0 0-22.4 1.87v80.73a56 56 0 1 0 32 0zM128 448a24 24 0 1 1 24-24 23.94 23.94 0 0 1-24 24zm191.8-85.6v-74.25c-2.06-.1-4.12-.15-6.2-.15h-16.7q-4.38 2-8.9 3.79v70.41c-28.2 7.5-48 34.5-48 64.6V456a16.06 16.06 0 0 0 4.7 11.3l10.3 10.3a8 8 0 0 0 11.3 0l11.3-11.3a8 8 0 0 0 0-11.3l-5.7-5.7V424a32.14 32.14 0 0 1 37.4-31.6c15.7 2.6 26.6 17.4 26.6 33.3v23.6l-5.7 5.7a8 8 0 0 0 0 11.3l11.3 11.3a8 8 0 0 0 11.3 0l10.3-10.3a16.06 16.06 0 0 0 4.7-11.3v-32a63.8 63.8 0 0 0-48-61.6z", "M319.8 288.15v74.25a63.8 63.8 0 0 1 48 61.6v32a16.06 16.06 0 0 1-4.7 11.3l-10.3 10.3a8 8 0 0 1-11.3 0l-11.3-11.3a8 8 0 0 1 0-11.3l5.7-5.7v-23.6c0-15.9-10.9-30.7-26.6-33.3a32.14 32.14 0 0 0-37.4 31.6v25.3l5.7 5.7a8 8 0 0 1 0 11.3l-11.3 11.3a8 8 0 0 1-11.3 0l-10.3-10.3A16.06 16.06 0 0 1 240 456v-29.2c0-30.1 19.8-57.1 48-64.6v-70.41A174 174 0 0 1 151.1 288H144v82.6a56 56 0 1 1-32 0v-80.73A134.47 134.47 0 0 0 0 422.4V464a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48v-41.6a134.44 134.44 0 0 0-128.2-134.25zM104 424a24 24 0 1 0 24-24 23.94 23.94 0 0 0-24 24z"]]
};
var faVial = {
  prefix: 'fad',
  iconName: 'vial',
  icon: [480, 512, [], "f492", ["M318 256L138.61 435.44a55.46 55.46 0 0 1-78.39.06 55.46 55.46 0 0 1-.09-78.44L161 256z", "M477.65 186.12L309.45 18.33a8 8 0 0 0-11.3 0l-34 33.9a8 8 0 0 0 0 11.29l11.2 11.1L33 316.53c-38.8 38.69-45.1 102-9.4 143.5a102.44 102.44 0 0 0 78 35.9h.4a102.75 102.75 0 0 0 72.9-30.09l246.3-245.71 11.2 11.1a8 8 0 0 0 11.3 0l34-33.89a7.92 7.92 0 0 0-.05-11.22zM141 431.84a54.65 54.65 0 0 1-38.95 16h-.36A54.09 54.09 0 0 1 60 428.76c-8.67-10.08-12.85-23.53-11.76-37.86a64.77 64.77 0 0 1 18.61-40.4l242.4-241.9 78 77.54z"]]
};

/* src/components/Nav.svelte generated by Svelte v3.24.1 */

const file$1 = "src/components/Nav.svelte";

function create_fragment$1(ctx) {
	let nav;
	let div3;
	let div1;
	let h1;
	let fa0;
	let t0;
	let t1;
	let h3;
	let t2;
	let t3;
	let div0;
	let span;
	let a0;
	let fa1;
	let t4;
	let a0_class_value;
	let t5;
	let a1;
	let fa2;
	let t6;
	let a1_class_value;
	let t7;
	let a2;
	let fa3;
	let t8;
	let a2_class_value;
	let t9;
	let div2;
	let t10;
	let ul;
	let li0;
	let a3;
	let fa4;
	let t11;
	let t12;
	let li1;
	let a4;
	let fa5;
	let t13;
	let t14;
	let li2;
	let a5;
	let fa6;
	let t15;
	let current;
	let mounted;
	let dispose;

	fa0 = new Fa({
			props: {
				class: "inline text-gray-600",
				primaryColor: "gray",
				secondaryColor: "white",
				size: "lg",
				icon: faCalculator
			},
			$$inline: true
		});

	fa1 = new Fa({
			props: {
				class: "inline-flex   pr-1",
				size: "lg",
				icon: faInfoCircle
			},
			$$inline: true
		});

	fa2 = new Fa({
			props: {
				class: "inline pr-1",
				size: "lg",
				icon: faBalanceScale
			},
			$$inline: true
		});

	fa3 = new Fa({
			props: {
				class: "inline pr-1",
				size: "lg",
				icon: faPaperPlane
			},
			$$inline: true
		});

	fa4 = new Fa({
			props: {
				class: "inline-flex  text-white pr-1",
				size: "2x",
				secondaryColor: "white",
				primaryColor: "green",
				icon: faUserMd
			},
			$$inline: true
		});

	fa5 = new Fa({
			props: {
				class: "inline-flex  text-white pr-1",
				size: "2x",
				primaryColor: "black",
				icon: faDog
			},
			$$inline: true
		});

	fa6 = new Fa({
			props: {
				class: "inline-flex  text-white pr-1",
				size: "2x",
				primaryColor: "orange",
				icon: faPencilRuler
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			nav = element("nav");
			div3 = element("div");
			div1 = element("div");
			h1 = element("h1");
			create_component(fa0.$$.fragment);
			t0 = text("  Medical Unit Converter");
			t1 = space();
			h3 = element("h3");
			t2 = text("Easily Convert Medical and Metric Values");
			t3 = space();
			div0 = element("div");
			span = element("span");
			a0 = element("a");
			create_component(fa1.$$.fragment);
			t4 = text(" About");
			t5 = space();
			a1 = element("a");
			create_component(fa2.$$.fragment);
			t6 = text(" Legal");
			t7 = space();
			a2 = element("a");
			create_component(fa3.$$.fragment);
			t8 = text(" Contact");
			t9 = space();
			div2 = element("div");
			t10 = space();
			ul = element("ul");
			li0 = element("li");
			a3 = element("a");
			create_component(fa4.$$.fragment);
			t11 = text("  Human");
			t12 = space();
			li1 = element("li");
			a4 = element("a");
			create_component(fa5.$$.fragment);
			t13 = text("  Veterinary");
			t14 = space();
			li2 = element("li");
			a5 = element("a");
			create_component(fa6.$$.fragment);
			t15 = text("  Metric");
			this.h();
		},
		l: function claim(nodes) {
			nav = claim_element(nodes, "NAV", { class: true });
			var nav_nodes = children(nav);
			div3 = claim_element(nav_nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			div1 = claim_element(div3_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			h1 = claim_element(div1_nodes, "H1", { class: true });
			var h1_nodes = children(h1);
			claim_component(fa0.$$.fragment, h1_nodes);
			t0 = claim_text(h1_nodes, "  Medical Unit Converter");
			h1_nodes.forEach(detach_dev);
			t1 = claim_space(div1_nodes);
			h3 = claim_element(div1_nodes, "H3", { class: true });
			var h3_nodes = children(h3);
			t2 = claim_text(h3_nodes, "Easily Convert Medical and Metric Values");
			h3_nodes.forEach(detach_dev);
			t3 = claim_space(div1_nodes);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			span = claim_element(div0_nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			a0 = claim_element(span_nodes, "A", { href: true, class: true });
			var a0_nodes = children(a0);
			claim_component(fa1.$$.fragment, a0_nodes);
			t4 = claim_text(a0_nodes, " About");
			a0_nodes.forEach(detach_dev);
			t5 = claim_space(span_nodes);
			a1 = claim_element(span_nodes, "A", { href: true, class: true });
			var a1_nodes = children(a1);
			claim_component(fa2.$$.fragment, a1_nodes);
			t6 = claim_text(a1_nodes, " Legal");
			a1_nodes.forEach(detach_dev);
			t7 = claim_space(span_nodes);
			a2 = claim_element(span_nodes, "A", { href: true, class: true });
			var a2_nodes = children(a2);
			claim_component(fa3.$$.fragment, a2_nodes);
			t8 = claim_text(a2_nodes, " Contact");
			a2_nodes.forEach(detach_dev);
			span_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			t9 = claim_space(div3_nodes);
			div2 = claim_element(div3_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div2_nodes.forEach(detach_dev);
			div3_nodes.forEach(detach_dev);
			nav_nodes.forEach(detach_dev);
			t10 = claim_space(nodes);
			ul = claim_element(nodes, "UL", { class: true });
			var ul_nodes = children(ul);
			li0 = claim_element(ul_nodes, "LI", { class: true });
			var li0_nodes = children(li0);
			a3 = claim_element(li0_nodes, "A", { class: true, href: true });
			var a3_nodes = children(a3);
			claim_component(fa4.$$.fragment, a3_nodes);
			t11 = claim_text(a3_nodes, "  Human");
			a3_nodes.forEach(detach_dev);
			li0_nodes.forEach(detach_dev);
			t12 = claim_space(ul_nodes);
			li1 = claim_element(ul_nodes, "LI", { class: true });
			var li1_nodes = children(li1);
			a4 = claim_element(li1_nodes, "A", { class: true, href: true });
			var a4_nodes = children(a4);
			claim_component(fa5.$$.fragment, a4_nodes);
			t13 = claim_text(a4_nodes, "  Veterinary");
			a4_nodes.forEach(detach_dev);
			li1_nodes.forEach(detach_dev);
			t14 = claim_space(ul_nodes);
			li2 = claim_element(ul_nodes, "LI", { class: true });
			var li2_nodes = children(li2);
			a5 = claim_element(li2_nodes, "A", { class: true, href: true });
			var a5_nodes = children(a5);
			claim_component(fa6.$$.fragment, a5_nodes);
			t15 = claim_text(a5_nodes, "  Metric");
			a5_nodes.forEach(detach_dev);
			li2_nodes.forEach(detach_dev);
			ul_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h1, "class", "font-sans text-xl md:text-2xl textShadow text-white svelte-1gdbd81");
			add_location(h1, file$1, 22, 4, 738);
			attr_dev(h3, "class", "tracking-wide mb-1 textShadow text-white svelte-1gdbd81");
			add_location(h3, file$1, 24, 4, 1249);
			attr_dev(a0, "href", "about");
			attr_dev(a0, "class", a0_class_value = "relative inline-flex items-center px-2 py-1 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-teal-300 active:text-gray-700 transition ease-in-out duration-150 " + (/*segment*/ ctx[0] === "about" ? "bg-teal-300" : ""));
			add_location(a0, file$1, 30, 2, 1470);
			attr_dev(a1, "href", "legal");
			attr_dev(a1, "class", a1_class_value = "-ml-px relative inline-flex items-center px-2 py-1 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-teal-300 active:text-gray-700 transition ease-in-out duration-150 " + (/*segment*/ ctx[0] === "legal" ? "bg-teal-300" : ""));
			add_location(a1, file$1, 33, 2, 1926);
			attr_dev(a2, "href", "mailto:info@vetcalculators.com");
			attr_dev(a2, "class", a2_class_value = "-ml-px relative inline-flex items-center px-2 py-1 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-teal-300 active:text-gray-700 transition ease-in-out duration-150 " + (/*segment*/ ctx[0] === "contact" ? "bg-teal-300" : ""));
			add_location(a2, file$1, 36, 2, 2372);
			attr_dev(span, "class", "relative z-0 inline-flex shadow-sm");
			add_location(span, file$1, 29, 0, 1418);
			attr_dev(div0, "class", "flex items-center justify-between py-1");
			add_location(div0, file$1, 25, 6, 1354);
			attr_dev(div1, "class", "mx-auto py-2 text-center");
			add_location(div1, file$1, 21, 3, 695);
			attr_dev(div2, "class", "text-center text-white pb-1");
			add_location(div2, file$1, 48, 4, 2918);
			attr_dev(div3, "class", "w-full mx-auto rounded-t shadow bg-teal-500 h-28");
			add_location(div3, file$1, 19, 2, 583);
			attr_dev(nav, "class", "w-full");
			add_location(nav, file$1, 17, 0, 420);
			attr_dev(a3, "class", "text-center block border border-white rounded bg-gray-600 hover:bg-teal-500   py-1 px-1 text-white");
			attr_dev(a3, "href", ".");
			toggle_class(a3, "bg-teal-500", /*current*/ ctx[1] === "Human");
			add_location(a3, file$1, 59, 4, 3063);
			attr_dev(li0, "class", "flex-1 mr-1 ml-1");
			add_location(li0, file$1, 58, 2, 3029);
			attr_dev(a4, "class", "text-center block border border-white rounded bg-gray-600 hover:bg-teal-500  py-1 px-1  text-white");
			attr_dev(a4, "href", "vet");
			toggle_class(a4, "bg-teal-500", /*current*/ ctx[1] === "Veterinary");
			add_location(a4, file$1, 62, 4, 3425);
			attr_dev(li1, "class", "flex-1 mr-1");
			add_location(li1, file$1, 61, 2, 3396);
			attr_dev(a5, "class", "text-center block border border-white rounded  bg-gray-600 hover:bg-teal-500  py-1 px-1  text-white");
			attr_dev(a5, "href", "metric");
			toggle_class(a5, "bg-teal-500", /*current*/ ctx[1] === "Metric Units");
			add_location(a5, file$1, 65, 4, 3777);
			attr_dev(li2, "class", "flex-1 mr-1");
			add_location(li2, file$1, 64, 2, 3748);
			attr_dev(ul, "class", "flex");
			add_location(ul, file$1, 57, 0, 3009);
		},
		m: function mount(target, anchor) {
			insert_dev(target, nav, anchor);
			append_dev(nav, div3);
			append_dev(div3, div1);
			append_dev(div1, h1);
			mount_component(fa0, h1, null);
			append_dev(h1, t0);
			append_dev(div1, t1);
			append_dev(div1, h3);
			append_dev(h3, t2);
			append_dev(div1, t3);
			append_dev(div1, div0);
			append_dev(div0, span);
			append_dev(span, a0);
			mount_component(fa1, a0, null);
			append_dev(a0, t4);
			append_dev(span, t5);
			append_dev(span, a1);
			mount_component(fa2, a1, null);
			append_dev(a1, t6);
			append_dev(span, t7);
			append_dev(span, a2);
			mount_component(fa3, a2, null);
			append_dev(a2, t8);
			append_dev(div3, t9);
			append_dev(div3, div2);
			insert_dev(target, t10, anchor);
			insert_dev(target, ul, anchor);
			append_dev(ul, li0);
			append_dev(li0, a3);
			mount_component(fa4, a3, null);
			append_dev(a3, t11);
			append_dev(ul, t12);
			append_dev(ul, li1);
			append_dev(li1, a4);
			mount_component(fa5, a4, null);
			append_dev(a4, t13);
			append_dev(ul, t14);
			append_dev(ul, li2);
			append_dev(li2, a5);
			mount_component(fa6, a5, null);
			append_dev(a5, t15);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(a3, "click", /*click_handler*/ ctx[2], false, false, false),
					listen_dev(a4, "click", /*click_handler_1*/ ctx[3], false, false, false),
					listen_dev(a5, "click", /*click_handler_2*/ ctx[4], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (!current || dirty & /*segment*/ 1 && a0_class_value !== (a0_class_value = "relative inline-flex items-center px-2 py-1 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-teal-300 active:text-gray-700 transition ease-in-out duration-150 " + (/*segment*/ ctx[0] === "about" ? "bg-teal-300" : ""))) {
				attr_dev(a0, "class", a0_class_value);
			}

			if (!current || dirty & /*segment*/ 1 && a1_class_value !== (a1_class_value = "-ml-px relative inline-flex items-center px-2 py-1 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-teal-300 active:text-gray-700 transition ease-in-out duration-150 " + (/*segment*/ ctx[0] === "legal" ? "bg-teal-300" : ""))) {
				attr_dev(a1, "class", a1_class_value);
			}

			if (!current || dirty & /*segment*/ 1 && a2_class_value !== (a2_class_value = "-ml-px relative inline-flex items-center px-2 py-1 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-teal-300 active:text-gray-700 transition ease-in-out duration-150 " + (/*segment*/ ctx[0] === "contact" ? "bg-teal-300" : ""))) {
				attr_dev(a2, "class", a2_class_value);
			}

			if (dirty & /*current*/ 2) {
				toggle_class(a3, "bg-teal-500", /*current*/ ctx[1] === "Human");
			}

			if (dirty & /*current*/ 2) {
				toggle_class(a4, "bg-teal-500", /*current*/ ctx[1] === "Veterinary");
			}

			if (dirty & /*current*/ 2) {
				toggle_class(a5, "bg-teal-500", /*current*/ ctx[1] === "Metric Units");
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(fa0.$$.fragment, local);
			transition_in(fa1.$$.fragment, local);
			transition_in(fa2.$$.fragment, local);
			transition_in(fa3.$$.fragment, local);
			transition_in(fa4.$$.fragment, local);
			transition_in(fa5.$$.fragment, local);
			transition_in(fa6.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(fa0.$$.fragment, local);
			transition_out(fa1.$$.fragment, local);
			transition_out(fa2.$$.fragment, local);
			transition_out(fa3.$$.fragment, local);
			transition_out(fa4.$$.fragment, local);
			transition_out(fa5.$$.fragment, local);
			transition_out(fa6.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(nav);
			destroy_component(fa0);
			destroy_component(fa1);
			destroy_component(fa2);
			destroy_component(fa3);
			if (detaching) detach_dev(t10);
			if (detaching) detach_dev(ul);
			destroy_component(fa4);
			destroy_component(fa5);
			destroy_component(fa6);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	let { segment } = $$props;
	let current = "Human";
	const writable_props = ["segment"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Nav> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Nav", $$slots, []);
	const click_handler = () => $$invalidate(1, current = "Human");
	const click_handler_1 = () => $$invalidate(1, current = "Veterinary");
	const click_handler_2 = () => $$invalidate(1, current = "Metric Units");

	$$self.$$set = $$props => {
		if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
	};

	$$self.$capture_state = () => ({
		segment,
		Fa,
		faFlagUsa,
		faGlobe,
		faArrowsAltH,
		faBalanceScale,
		faInfoCircle,
		faPaperPlane,
		faCalculator,
		faPencilRuler,
		faDog,
		faUserMd,
		faVial,
		current
	});

	$$self.$inject_state = $$props => {
		if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
		if ("current" in $$props) $$invalidate(1, current = $$props.current);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [segment, current, click_handler, click_handler_1, click_handler_2];
}

class Nav extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { segment: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Nav",
			options,
			id: create_fragment$1.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*segment*/ ctx[0] === undefined && !("segment" in props)) {
			console.warn("<Nav> was created without expected prop 'segment'");
		}
	}

	get segment() {
		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set segment(value) {
		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/routes/_layout.svelte generated by Svelte v3.24.1 */
const file$2 = "src/routes/_layout.svelte";

function create_fragment$2(ctx) {
	let nav;
	let t;
	let main;
	let current;

	nav = new Nav({
			props: { segment: /*segment*/ ctx[0] },
			$$inline: true
		});

	const default_slot_template = /*$$slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

	const block = {
		c: function create() {
			create_component(nav.$$.fragment);
			t = space();
			main = element("main");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			claim_component(nav.$$.fragment, nodes);
			t = claim_space(nodes);
			main = claim_element(nodes, "MAIN", { class: true });
			var main_nodes = children(main);
			if (default_slot) default_slot.l(main_nodes);
			main_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(main, "class", "svelte-1jakvlc");
			add_location(main, file$2, 19, 0, 264);
		},
		m: function mount(target, anchor) {
			mount_component(nav, target, anchor);
			insert_dev(target, t, anchor);
			insert_dev(target, main, anchor);

			if (default_slot) {
				default_slot.m(main, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			const nav_changes = {};
			if (dirty & /*segment*/ 1) nav_changes.segment = /*segment*/ ctx[0];
			nav.$set(nav_changes);

			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 2) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, null, null);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(nav.$$.fragment, local);
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(nav.$$.fragment, local);
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(nav, detaching);
			if (detaching) detach_dev(t);
			if (detaching) detach_dev(main);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let { segment } = $$props;
	const writable_props = ["segment"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Layout> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Layout", $$slots, ['default']);

	$$self.$$set = $$props => {
		if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({ Nav, segment });

	$$self.$inject_state = $$props => {
		if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [segment, $$scope, $$slots];
}

class Layout extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2, create_fragment$2, safe_not_equal, { segment: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Layout",
			options,
			id: create_fragment$2.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*segment*/ ctx[0] === undefined && !("segment" in props)) {
			console.warn("<Layout> was created without expected prop 'segment'");
		}
	}

	get segment() {
		throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set segment(value) {
		throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/routes/_error.svelte generated by Svelte v3.24.1 */

const { Error: Error_1 } = globals;
const file$3 = "src/routes/_error.svelte";

// (38:0) {#if dev && error.stack}
function create_if_block$1(ctx) {
	let pre;
	let t_value = /*error*/ ctx[1].stack + "";
	let t;

	const block = {
		c: function create() {
			pre = element("pre");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			pre = claim_element(nodes, "PRE", {});
			var pre_nodes = children(pre);
			t = claim_text(pre_nodes, t_value);
			pre_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(pre, file$3, 38, 1, 443);
		},
		m: function mount(target, anchor) {
			insert_dev(target, pre, anchor);
			append_dev(pre, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*error*/ 2 && t_value !== (t_value = /*error*/ ctx[1].stack + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(pre);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(38:0) {#if dev && error.stack}",
		ctx
	});

	return block;
}

function create_fragment$3(ctx) {
	let title_value;
	let t0;
	let h1;
	let t1;
	let t2;
	let p;
	let t3_value = /*error*/ ctx[1].message + "";
	let t3;
	let t4;
	let if_block_anchor;
	document.title = title_value = /*status*/ ctx[0];
	let if_block = /*dev*/ ctx[2] && /*error*/ ctx[1].stack && create_if_block$1(ctx);

	const block = {
		c: function create() {
			t0 = space();
			h1 = element("h1");
			t1 = text(/*status*/ ctx[0]);
			t2 = space();
			p = element("p");
			t3 = text(t3_value);
			t4 = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-1o9r2ue\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			h1 = claim_element(nodes, "H1", { class: true });
			var h1_nodes = children(h1);
			t1 = claim_text(h1_nodes, /*status*/ ctx[0]);
			h1_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			p = claim_element(nodes, "P", { class: true });
			var p_nodes = children(p);
			t3 = claim_text(p_nodes, t3_value);
			p_nodes.forEach(detach_dev);
			t4 = claim_space(nodes);
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
			this.h();
		},
		h: function hydrate() {
			attr_dev(h1, "class", "svelte-8od9u6");
			add_location(h1, file$3, 33, 0, 374);
			attr_dev(p, "class", "svelte-8od9u6");
			add_location(p, file$3, 35, 0, 393);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, h1, anchor);
			append_dev(h1, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, p, anchor);
			append_dev(p, t3);
			insert_dev(target, t4, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*status*/ 1 && title_value !== (title_value = /*status*/ ctx[0])) {
				document.title = title_value;
			}

			if (dirty & /*status*/ 1) set_data_dev(t1, /*status*/ ctx[0]);
			if (dirty & /*error*/ 2 && t3_value !== (t3_value = /*error*/ ctx[1].message + "")) set_data_dev(t3, t3_value);

			if (/*dev*/ ctx[2] && /*error*/ ctx[1].stack) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(p);
			if (detaching) detach_dev(t4);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props, $$invalidate) {
	let { status } = $$props;
	let { error } = $$props;
	const dev = "development" === "development";
	const writable_props = ["status", "error"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Error> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Error", $$slots, []);

	$$self.$$set = $$props => {
		if ("status" in $$props) $$invalidate(0, status = $$props.status);
		if ("error" in $$props) $$invalidate(1, error = $$props.error);
	};

	$$self.$capture_state = () => ({ status, error, dev });

	$$self.$inject_state = $$props => {
		if ("status" in $$props) $$invalidate(0, status = $$props.status);
		if ("error" in $$props) $$invalidate(1, error = $$props.error);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [status, error, dev];
}

class Error$1 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3, create_fragment$3, safe_not_equal, { status: 0, error: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Error",
			options,
			id: create_fragment$3.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*status*/ ctx[0] === undefined && !("status" in props)) {
			console.warn("<Error> was created without expected prop 'status'");
		}

		if (/*error*/ ctx[1] === undefined && !("error" in props)) {
			console.warn("<Error> was created without expected prop 'error'");
		}
	}

	get status() {
		throw new Error_1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set status(value) {
		throw new Error_1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get error() {
		throw new Error_1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set error(value) {
		throw new Error_1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/node_modules/@sapper/internal/App.svelte generated by Svelte v3.24.1 */

const { Error: Error_1$1 } = globals;

// (23:1) {:else}
function create_else_block$1(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [/*level1*/ ctx[4].props];
	var switch_value = /*level1*/ ctx[4].component;

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		l: function claim(nodes) {
			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty & /*level1*/ 16)
			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*level1*/ ctx[4].props)])
			: {};

			if (switch_value !== (switch_value = /*level1*/ ctx[4].component)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$1.name,
		type: "else",
		source: "(23:1) {:else}",
		ctx
	});

	return block;
}

// (21:1) {#if error}
function create_if_block$2(ctx) {
	let error_1;
	let current;

	error_1 = new Error$1({
			props: {
				error: /*error*/ ctx[0],
				status: /*status*/ ctx[1]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(error_1.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(error_1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(error_1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const error_1_changes = {};
			if (dirty & /*error*/ 1) error_1_changes.error = /*error*/ ctx[0];
			if (dirty & /*status*/ 2) error_1_changes.status = /*status*/ ctx[1];
			error_1.$set(error_1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(error_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(error_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(error_1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(21:1) {#if error}",
		ctx
	});

	return block;
}

// (20:0) <Layout segment="{segments[0]}" {...level0.props}>
function create_default_slot(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$2, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*error*/ ctx[0]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(20:0) <Layout segment=\\\"{segments[0]}\\\" {...level0.props}>",
		ctx
	});

	return block;
}

function create_fragment$4(ctx) {
	let layout;
	let current;
	const layout_spread_levels = [{ segment: /*segments*/ ctx[2][0] }, /*level0*/ ctx[3].props];

	let layout_props = {
		$$slots: { default: [create_default_slot] },
		$$scope: { ctx }
	};

	for (let i = 0; i < layout_spread_levels.length; i += 1) {
		layout_props = assign(layout_props, layout_spread_levels[i]);
	}

	layout = new Layout({ props: layout_props, $$inline: true });

	const block = {
		c: function create() {
			create_component(layout.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(layout.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(layout, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const layout_changes = (dirty & /*segments, level0*/ 12)
			? get_spread_update(layout_spread_levels, [
					dirty & /*segments*/ 4 && { segment: /*segments*/ ctx[2][0] },
					dirty & /*level0*/ 8 && get_spread_object(/*level0*/ ctx[3].props)
				])
			: {};

			if (dirty & /*$$scope, error, status, level1*/ 147) {
				layout_changes.$$scope = { dirty, ctx };
			}

			layout.$set(layout_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(layout.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(layout.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(layout, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4($$self, $$props, $$invalidate) {
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	let { notify } = $$props;
	afterUpdate(notify);
	setContext(CONTEXT_KEY, stores);
	const writable_props = ["stores", "error", "status", "segments", "level0", "level1", "notify"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("App", $$slots, []);

	$$self.$$set = $$props => {
		if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
		if ("error" in $$props) $$invalidate(0, error = $$props.error);
		if ("status" in $$props) $$invalidate(1, status = $$props.status);
		if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
		if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
		if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
		if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
	};

	$$self.$capture_state = () => ({
		setContext,
		afterUpdate,
		CONTEXT_KEY,
		Layout,
		Error: Error$1,
		stores,
		error,
		status,
		segments,
		level0,
		level1,
		notify
	});

	$$self.$inject_state = $$props => {
		if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
		if ("error" in $$props) $$invalidate(0, error = $$props.error);
		if ("status" in $$props) $$invalidate(1, status = $$props.status);
		if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
		if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
		if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
		if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [error, status, segments, level0, level1, stores, notify];
}

class App extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
			stores: 5,
			error: 0,
			status: 1,
			segments: 2,
			level0: 3,
			level1: 4,
			notify: 6
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "App",
			options,
			id: create_fragment$4.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*stores*/ ctx[5] === undefined && !("stores" in props)) {
			console.warn("<App> was created without expected prop 'stores'");
		}

		if (/*error*/ ctx[0] === undefined && !("error" in props)) {
			console.warn("<App> was created without expected prop 'error'");
		}

		if (/*status*/ ctx[1] === undefined && !("status" in props)) {
			console.warn("<App> was created without expected prop 'status'");
		}

		if (/*segments*/ ctx[2] === undefined && !("segments" in props)) {
			console.warn("<App> was created without expected prop 'segments'");
		}

		if (/*level0*/ ctx[3] === undefined && !("level0" in props)) {
			console.warn("<App> was created without expected prop 'level0'");
		}

		if (/*notify*/ ctx[6] === undefined && !("notify" in props)) {
			console.warn("<App> was created without expected prop 'notify'");
		}
	}

	get stores() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set stores(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get error() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set error(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get status() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set status(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get segments() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set segments(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get level0() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set level0(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get level1() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set level1(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get notify() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set notify(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

// This file is generated by Sapper — do not edit it!

const ignore = [/^\/blog\.json$/, /^\/blog\/([^\/]+?)\.json$/];

const components = [
	{
		js: () => import('./index.e078758e.js'),
		css: ["client.a5349fa3.css"]
	},
	{
		js: () => import('./contact.631e45b4.js'),
		css: ["client.a5349fa3.css"]
	},
	{
		js: () => import('./metric.c0c31a51.js'),
		css: ["client.a5349fa3.css"]
	},
	{
		js: () => import('./about.a2c8e1a2.js'),
		css: ["client.a5349fa3.css"]
	},
	{
		js: () => import('./legal.071a0c9c.js'),
		css: ["client.a5349fa3.css"]
	},
	{
		js: () => import('./index.fb339a75.js'),
		css: ["index.fb339a75.css","client.a5349fa3.css"]
	},
	{
		js: () => import('./[slug].adc3b4b2.js'),
		css: ["[slug].adc3b4b2.css","client.a5349fa3.css"]
	},
	{
		js: () => import('./vet.b7c5a69a.js'),
		css: ["client.a5349fa3.css"]
	}
];

const routes = (d => [
	{
		// index.svelte
		pattern: /^\/$/,
		parts: [
			{ i: 0 }
		]
	},

	{
		// contact.svelte
		pattern: /^\/contact\/?$/,
		parts: [
			{ i: 1 }
		]
	},

	{
		// metric.svelte
		pattern: /^\/metric\/?$/,
		parts: [
			{ i: 2 }
		]
	},

	{
		// about.svelte
		pattern: /^\/about\/?$/,
		parts: [
			{ i: 3 }
		]
	},

	{
		// legal.svelte
		pattern: /^\/legal\/?$/,
		parts: [
			{ i: 4 }
		]
	},

	{
		// blog/index.svelte
		pattern: /^\/blog\/?$/,
		parts: [
			{ i: 5 }
		]
	},

	{
		// blog/[slug].svelte
		pattern: /^\/blog\/([^\/]+?)\/?$/,
		parts: [
			null,
			{ i: 6, params: match => ({ slug: d(match[1]) }) }
		]
	},

	{
		// vet.svelte
		pattern: /^\/vet\/?$/,
		parts: [
			{ i: 7 }
		]
	}
])(decodeURIComponent);

if (typeof window !== 'undefined') {
	import('./sapper-dev-client.1e7a4a5e.js').then(client => {
		client.connect(10000);
	});
}

function goto(href, opts = { replaceState: false }) {
	const target = select_target(new URL(href, document.baseURI));

	if (target) {
		_history[opts.replaceState ? 'replaceState' : 'pushState']({ id: cid }, '', href);
		return navigate(target, null).then(() => {});
	}

	location.href = href;
	return new Promise(f => {}); // never resolves
}

/** Callback to inform of a value updates. */



















function page_store(value) {
	const store = writable(value);
	let ready = true;

	function notify() {
		ready = true;
		store.update(val => val);
	}

	function set(new_value) {
		ready = false;
		store.set(new_value);
	}

	function subscribe(run) {
		let old_value;
		return store.subscribe((value) => {
			if (old_value === undefined || (ready && value !== old_value)) {
				run(old_value = value);
			}
		});
	}

	return { notify, set, subscribe };
}

const initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;

let ready = false;
let root_component;
let current_token;
let root_preloaded;
let current_branch = [];
let current_query = '{}';

const stores = {
	page: page_store({}),
	preloading: writable(null),
	session: writable(initial_data && initial_data.session)
};

let $session;
let session_dirty;

stores.session.subscribe(async value => {
	$session = value;

	if (!ready) return;
	session_dirty = true;

	const target = select_target(new URL(location.href));

	const token = current_token = {};
	const { redirect, props, branch } = await hydrate_target(target);
	if (token !== current_token) return; // a secondary navigation happened while we were loading

	await render(redirect, branch, props, target.page);
});

let prefetching


 = null;
function set_prefetching(href, promise) {
	prefetching = { href, promise };
}

let target;
function set_target(element) {
	target = element;
}

let uid = 1;
function set_uid(n) {
	uid = n;
}

let cid;
function set_cid(n) {
	cid = n;
}

const _history = typeof history !== 'undefined' ? history : {
	pushState: (state, title, href) => {},
	replaceState: (state, title, href) => {},
	scrollRestoration: ''
};

const scroll_history = {};

function extract_query(search) {
	const query = Object.create(null);
	if (search.length > 0) {
		search.slice(1).split('&').forEach(searchParam => {
			let [, key, value = ''] = /([^=]*)(?:=(.*))?/.exec(decodeURIComponent(searchParam.replace(/\+/g, ' ')));
			if (typeof query[key] === 'string') query[key] = [query[key]];
			if (typeof query[key] === 'object') (query[key] ).push(value);
			else query[key] = value;
		});
	}
	return query;
}

function select_target(url) {
	if (url.origin !== location.origin) return null;
	if (!url.pathname.startsWith(initial_data.baseUrl)) return null;

	let path = url.pathname.slice(initial_data.baseUrl.length);

	if (path === '') {
		path = '/';
	}

	// avoid accidental clashes between server routes and page routes
	if (ignore.some(pattern => pattern.test(path))) return;

	for (let i = 0; i < routes.length; i += 1) {
		const route = routes[i];

		const match = route.pattern.exec(path);

		if (match) {
			const query = extract_query(url.search);
			const part = route.parts[route.parts.length - 1];
			const params = part.params ? part.params(match) : {};

			const page = { host: location.host, path, query, params };

			return { href: url.href, route, match, page };
		}
	}
}

function handle_error(url) {
	const { host, pathname, search } = location;
	const { session, preloaded, status, error } = initial_data;

	if (!root_preloaded) {
		root_preloaded = preloaded && preloaded[0];
	}

	const props = {
		error,
		status,
		session,
		level0: {
			props: root_preloaded
		},
		level1: {
			props: {
				status,
				error
			},
			component: Error$1
		},
		segments: preloaded

	};
	const query = extract_query(search);
	render(null, [], props, { host, path: pathname, query, params: {} });
}

function scroll_state() {
	return {
		x: pageXOffset,
		y: pageYOffset
	};
}

async function navigate(target, id, noscroll, hash) {
	if (id) {
		// popstate or initial navigation
		cid = id;
	} else {
		const current_scroll = scroll_state();

		// clicked on a link. preserve scroll state
		scroll_history[cid] = current_scroll;

		id = cid = ++uid;
		scroll_history[cid] = noscroll ? current_scroll : { x: 0, y: 0 };
	}

	cid = id;

	if (root_component) stores.preloading.set(true);

	const loaded = prefetching && prefetching.href === target.href ?
		prefetching.promise :
		hydrate_target(target);

	prefetching = null;

	const token = current_token = {};
	const { redirect, props, branch } = await loaded;
	if (token !== current_token) return; // a secondary navigation happened while we were loading

	await render(redirect, branch, props, target.page);
	if (document.activeElement) document.activeElement.blur();

	if (!noscroll) {
		let scroll = scroll_history[id];

		if (hash) {
			// scroll is an element id (from a hash), we need to compute y.
			const deep_linked = document.getElementById(hash.slice(1));

			if (deep_linked) {
				scroll = {
					x: 0,
					y: deep_linked.getBoundingClientRect().top + scrollY
				};
			}
		}

		scroll_history[cid] = scroll;
		if (scroll) scrollTo(scroll.x, scroll.y);
	}
}

async function render(redirect, branch, props, page) {
	if (redirect) return goto(redirect.location, { replaceState: true });

	stores.page.set(page);
	stores.preloading.set(false);

	if (root_component) {
		root_component.$set(props);
	} else {
		props.stores = {
			page: { subscribe: stores.page.subscribe },
			preloading: { subscribe: stores.preloading.subscribe },
			session: stores.session
		};
		props.level0 = {
			props: await root_preloaded
		};
		props.notify = stores.page.notify;

		// first load — remove SSR'd <head> contents
		const start = document.querySelector('#sapper-head-start');
		const end = document.querySelector('#sapper-head-end');

		if (start && end) {
			while (start.nextSibling !== end) detach$1(start.nextSibling);
			detach$1(start);
			detach$1(end);
		}

		root_component = new App({
			target,
			props,
			hydrate: true
		});
	}

	current_branch = branch;
	current_query = JSON.stringify(page.query);
	ready = true;
	session_dirty = false;
}

function part_changed(i, segment, match, stringified_query) {
	// TODO only check query string changes for preload functions
	// that do in fact depend on it (using static analysis or
	// runtime instrumentation)
	if (stringified_query !== current_query) return true;

	const previous = current_branch[i];

	if (!previous) return false;
	if (segment !== previous.segment) return true;
	if (previous.match) {
		if (JSON.stringify(previous.match.slice(1, i + 2)) !== JSON.stringify(match.slice(1, i + 2))) {
			return true;
		}
	}
}

async function hydrate_target(target)



 {
	const { route, page } = target;
	const segments = page.path.split('/').filter(Boolean);

	let redirect = null;

	const props = { error: null, status: 200, segments: [segments[0]] };

	const preload_context = {
		fetch: (url, opts) => fetch(url, opts),
		redirect: (statusCode, location) => {
			if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
				throw new Error(`Conflicting redirects`);
			}
			redirect = { statusCode, location };
		},
		error: (status, error) => {
			props.error = typeof error === 'string' ? new Error(error) : error;
			props.status = status;
		}
	};

	if (!root_preloaded) {
		root_preloaded = initial_data.preloaded[0] || preload.call(preload_context, {
			host: page.host,
			path: page.path,
			query: page.query,
			params: {}
		}, $session);
	}

	let branch;
	let l = 1;

	try {
		const stringified_query = JSON.stringify(page.query);
		const match = route.pattern.exec(page.path);

		let segment_dirty = false;

		branch = await Promise.all(route.parts.map(async (part, i) => {
			const segment = segments[i];

			if (part_changed(i, segment, match, stringified_query)) segment_dirty = true;

			props.segments[l] = segments[i + 1]; // TODO make this less confusing
			if (!part) return { segment };

			const j = l++;

			if (!session_dirty && !segment_dirty && current_branch[i] && current_branch[i].part === part.i) {
				return current_branch[i];
			}

			segment_dirty = false;

			const { default: component, preload } = await load_component(components[part.i]);

			let preloaded;
			if (ready || !initial_data.preloaded[i + 1]) {
				preloaded = preload
					? await preload.call(preload_context, {
						host: page.host,
						path: page.path,
						query: page.query,
						params: part.params ? part.params(target.match) : {}
					}, $session)
					: {};
			} else {
				preloaded = initial_data.preloaded[i + 1];
			}

			return (props[`level${j}`] = { component, props: preloaded, segment, match, part: part.i });
		}));
	} catch (error) {
		props.error = error;
		props.status = 500;
		branch = [];
	}

	return { redirect, props, branch };
}

function load_css(chunk) {
	const href = `client/${chunk}`;
	if (document.querySelector(`link[href="${href}"]`)) return;

	return new Promise((fulfil, reject) => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = href;

		link.onload = () => fulfil();
		link.onerror = reject;

		document.head.appendChild(link);
	});
}

function load_component(component)


 {
	// TODO this is temporary — once placeholders are
	// always rewritten, scratch the ternary
	const promises = (typeof component.css === 'string' ? [] : component.css.map(load_css));
	promises.unshift(component.js());
	return Promise.all(promises).then(values => values[0]);
}

function detach$1(node) {
	node.parentNode.removeChild(node);
}

function prefetch(href) {
	const target = select_target(new URL(href, document.baseURI));

	if (target) {
		if (!prefetching || href !== prefetching.href) {
			set_prefetching(href, hydrate_target(target));
		}

		return prefetching.promise;
	}
}

function start(opts

) {
	if ('scrollRestoration' in _history) {
		_history.scrollRestoration = 'manual';
	}
	
	// Adopted from Nuxt.js
	// Reset scrollRestoration to auto when leaving page, allowing page reload
	// and back-navigation from other pages to use the browser to restore the
	// scrolling position.
	addEventListener('beforeunload', () => {
		_history.scrollRestoration = 'auto';
	});

	// Setting scrollRestoration to manual again when returning to this page.
	addEventListener('load', () => {
		_history.scrollRestoration = 'manual';
	});

	set_target(opts.target);

	addEventListener('click', handle_click);
	addEventListener('popstate', handle_popstate);

	// prefetch
	addEventListener('touchstart', trigger_prefetch);
	addEventListener('mousemove', handle_mousemove);

	return Promise.resolve().then(() => {
		const { hash, href } = location;

		_history.replaceState({ id: uid }, '', href);

		const url = new URL(location.href);

		if (initial_data.error) return handle_error();

		const target = select_target(url);
		if (target) return navigate(target, uid, true, hash);
	});
}

let mousemove_timeout;

function handle_mousemove(event) {
	clearTimeout(mousemove_timeout);
	mousemove_timeout = setTimeout(() => {
		trigger_prefetch(event);
	}, 20);
}

function trigger_prefetch(event) {
	const a = find_anchor(event.target);
	if (!a || a.rel !== 'prefetch') return;

	prefetch(a.href);
}

function handle_click(event) {
	// Adapted from https://github.com/visionmedia/page.js
	// MIT license https://github.com/visionmedia/page.js#license
	if (which(event) !== 1) return;
	if (event.metaKey || event.ctrlKey || event.shiftKey) return;
	if (event.defaultPrevented) return;

	const a = find_anchor(event.target);
	if (!a) return;

	if (!a.href) return;

	// check if link is inside an svg
	// in this case, both href and target are always inside an object
	const svg = typeof a.href === 'object' && a.href.constructor.name === 'SVGAnimatedString';
	const href = String(svg ? (a).href.baseVal : a.href);

	if (href === location.href) {
		if (!location.hash) event.preventDefault();
		return;
	}

	// Ignore if tag has
	// 1. 'download' attribute
	// 2. rel='external' attribute
	if (a.hasAttribute('download') || a.getAttribute('rel') === 'external') return;

	// Ignore if <a> has a target
	if (svg ? (a).target.baseVal : a.target) return;

	const url = new URL(href);

	// Don't handle hash changes
	if (url.pathname === location.pathname && url.search === location.search) return;

	const target = select_target(url);
	if (target) {
		const noscroll = a.hasAttribute('sapper-noscroll');
		navigate(target, null, noscroll, url.hash);
		event.preventDefault();
		_history.pushState({ id: cid }, '', url.href);
	}
}

function which(event) {
	return event.which === null ? event.button : event.which;
}

function find_anchor(node) {
	while (node && node.nodeName.toUpperCase() !== 'A') node = node.parentNode; // SVG <a> elements have a lowercase name
	return node;
}

function handle_popstate(event) {
	scroll_history[cid] = scroll_state();

	if (event.state) {
		const url = new URL(location.href);
		const target = select_target(url);
		if (target) {
			navigate(target, event.state.id);
		} else {
			location.href = location.href;
		}
	} else {
		// hashchange
		set_uid(uid + 1);
		set_cid(uid);
		_history.replaceState({ id: cid }, '', location.href);
	}
}

start({
	target: document.querySelector('#sapper')
});

export { listen_dev as A, set_data_dev as B, prop_dev as C, transition_in as D, transition_out as E, Fa as F, destroy_component as G, run_all as H, query_selector_all as I, set_input_value as J, check_outros as K, destroy_each as L, group_outros as M, svg_element as N, noop as O, set_style as P, SvelteComponentDev as S, init as a, validate_slots as b, faGlobe as c, dispatch_dev as d, faArrowsAltH as e, faFlagUsa as f, faVial as g, faCalculator as h, identity as i, element as j, space as k, create_component as l, claim_element as m, children as n, claim_text as o, detach_dev as p, claim_space as q, claim_component as r, safe_not_equal as s, text as t, attr_dev as u, validate_each_argument as v, add_location as w, insert_dev as x, append_dev as y, mount_component as z };