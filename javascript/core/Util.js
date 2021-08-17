'use strict';
class Util {
    constructor(CONSTANTS, TEMPLATES, KEY_CODES) {
        this.TRIG_SINE_TABLE = CONSTANTS.TRIG_SINE_TABLE;
        this.TRIG_TABLE_SCALE_CONSTANT = CONSTANTS.TRIG_TABLE_SCALE_CONSTANT;
        this.TRIG_TABLE_INDEX_CONSTANT = CONSTANTS.TRIG_TABLE_INDEX_CONSTANT;
        this.TRIG_TABLE_MASK = CONSTANTS.TRIG_TABLE_MASK;
        this.TRIG_TABLE_ROUND = CONSTANTS.TRIG_TABLE_ROUND;
        this.NULL = CONSTANTS.NULL;
        this.DEVELOPER_MODE = CONSTANTS.DEVELOPER_MODE;
        this.GARBAGE_COLLECTOR_SIZE = CONSTANTS.GARBAGE_COLLECTOR_SIZE;
        this._180_DIV_PI = CONSTANTS._180_DIV_PI;
        this.PI_DIV_2 = CONSTANTS.PI_DIV_2;
        this.PI_DIV_180 = CONSTANTS.PI_DIV_180;
        this.PI_MUL_2 = CONSTANTS.PI_MUL_2;
        this.ELEMENT_VAL_TEMPLATE = TEMPLATES.ELEMENT_VAL_TEMPLATE;
        this.KEY_EVENT_CODES = KEY_CODES.KEY_EVENT_CODES;
        this.KEY_EVENT_CODES_KEYS = KEY_CODES.KEY_EVENT_CODES_KEYS;
        this.INV_SQRT_BUF = new ArrayBuffer(4);
        this.INV_SQRT_F32 = new Float32Array(this.INV_SQRT_BUF);
        this.INV_SQRT_U32 = new Uint32Array(this.INV_SQRT_BUF);
        this.SI_UNIT_ARRAY = [1 / 1e21, 1 / 1e18, 1 / 1e15, 1 / 1e12, 1 / 1e9, 1 / 1e6, 1 / 1e3, 1, 1 / 1e-3, 1 / 1e-6, 1 / 1e-9, 1 / 1e-12, 1 / 1e-15, 1 / 1e-18, 1 / 1e-21];
        this.SI_UNIT_THRESHOLD_ARRAY = [
            0.99 * 1e21,
            0.99 * 1e18,
            0.99 * 1e15,
            0.99 * 1e12,
            0.99 * 1e9,
            0.99 * 1e6,
            0.99 * 1e3,
            0.99 * 1,
            0.99 * 1e-3,
            0.99 * 1e-6,
            0.99 * 1e-9,
            0.99 * 1e-12,
            0.99 * 1e-15,
            0.99 * 1e-18,
            0.99 * 1e-21
        ];
        this.SI_UNIT_ABBREVIATION = ['Z', 'E', 'P', 'T', 'G', 'M', 'k', '', 'm', 'u', 'n', 'p', 'f', 'a', 'z'];
        this.last_surface_width = 0;
        this.last_surface_height = 0;
        this.last_view_port_width = 0;
        this.last_view_port_height = 0;
        this.last_view_port_right = 0;
        this.last_view_port_bottom = 0;
        this.general_integer = 0;
        this.general_integer2 = 0;
        this.general_integer3 = 0;
        this.general_integer4 = 0;
        this.general_integer5 = 0;
        this.resize_w_factor = 0;
        this.resize_h_factor = 0;
        this.angle_search_obj;
        this.angle_radian_search_obj;
        this.angle_array = [];
        this.angle_radian_array = [];
        this.saved_angle = -1;
        this.saved_angle_radians = -1;
        this.temp_boolean = false;
        this.general_index = -1;
        this.element_max_array = [];
        this.meter_max_array = [];
        this.non_linear_max_array = [];
        this.max_general_number = 0;
        this.str = '';
        this.val = 0;
        this.abs_input = 0;
        this.found = false;
    }
    push_history() {
        if (!global.flags.flag_history_lock) {
            global.variables.history['packet'].push(engine_functions.history_snapshot());
        }
    }
    sine(theta) {
        return this.TRIG_SINE_TABLE[(theta * this.TRIG_TABLE_INDEX_CONSTANT) & this.TRIG_TABLE_MASK];
    }
    cosine(theta) {
        return this.TRIG_SINE_TABLE[(theta * this.TRIG_TABLE_INDEX_CONSTANT + this.TRIG_TABLE_ROUND) & this.TRIG_TABLE_MASK];
    }
    remap_position(input, is_width) {
        if (is_width === true) {
            return view_port.right - (this.last_view_port_right - input) * this.resize_w_factor;
        }
        else {
            return view_port.bottom - (this.last_view_port_bottom - input) * this.resize_h_factor;
        }
    }
    reset_angle_cache() {
        this.angle_array = [];
    }
    reset_angle_radian_cache() {
        this.angle_radian_array = [];
    }
    search_angle_array(x, y) {
        this.temp_boolean = false;
        this.saved_angle = -1;
        for (var i = 0; i < this.angle_array.length; i++) {
            if (!this.temp_boolean) {
                this.angle_search_obj = this.angle_array[i];
                if (this.angle_search_obj['x'] === x && this.angle_search_obj['y'] === y) {
                    this.saved_angle = this.angle_search_obj['angle'];
                    this.temp_boolean = true;
                    break;
                }
            }
        }
        return this.temp_boolean;
    }
    search_angle_radian_array(x, y) {
        this.temp_boolean = false;
        this.saved_angle_radians = -1;
        for (var i = 0; i < this.angle_radian_array.length; i++) {
            if (!this.temp_boolean) {
                this.angle_radian_search_obj = this.angle_radian_array[i];
                if (this.angle_radian_search_obj['x'] === x && this.angle_radian_search_obj['y'] === y) {
                    this.saved_angle_radians = this.angle_radian_search_obj['angle'];
                    this.temp_boolean = true;
                    break;
                }
            }
        }
        return this.temp_boolean;
    }
    retrieve_angle(x, y) {
        if (this.search_angle_array(x, y)) {
            return this.saved_angle;
        }
        else {
            if (this.angle_array.length > this.GARBAGE_COLLECTOR_SIZE) {
                this.house_keeping();
            }
            this.angle_array.push({
                x: x,
                y: y,
                angle: this.calc_degree(x, y)
            });
            return this.angle_array[this.angle_array.length - 1]['angle'];
        }
    }
    retrieve_angle_radian(x, y) {
        if (this.search_angle_radian_array(x, y)) {
            return this.saved_angle_radians;
        }
        else {
            if (this.angle_radian_array.length > this.GARBAGE_COLLECTOR_SIZE) {
                this.house_keeping_radians();
            }
            this.angle_radian_array.push({
                x: x,
                y: y,
                angle: this.calc_degree_radians(x, y)
            });
            return this.angle_radian_array[this.angle_radian_array.length - 1]['angle'];
        }
    }
    house_keeping() {
        this.angle_array.splice(this.angle_array.length - 1, 1);
    }
    house_keeping_radians() {
        this.angle_radian_array.splice(this.angle_radian_array.length - 1, 1);
    }
    calc_degree(x, y) {
        this.general_integer = this.atan2_approx2(y, x) * this._180_DIV_PI;
        if (this.general_integer < 0) {
            this.general_integer += 360;
        }
        return this.general_integer;
    }
    calc_degree_radians(x, y) {
        this.general_integer = this.atan2_approx2(y, x);
        if (this.general_integer < 0) {
            this.general_integer += this.PI_MUL_2;
        }
        return this.general_integer;
    }
    to_radians(degrees) {
        return degrees * this.PI_DIV_180;
    }
    inv_sqrt(x) {
        let x2 = 0.5 * (this.INV_SQRT_F32[0] = x);
        this.INV_SQRT_U32[0] = 0x5f3759df - (this.INV_SQRT_U32[0] >> 1);
        let y = this.INV_SQRT_F32[0];
        y = y * (1.5 - x2 * y * y);
        return y;
    }
    atan2_approx2(y, x) {
        if (x === 0.0) {
            if (y > 0.0) {
                return this.PI_DIV_2;
            }
            if (y === 0.0) {
                return 0.0;
            }
            return -this.PI_DIV_2;
        }
        this.general_integer = y / x;
        this.general_integer2 = 0;
        if (Math.abs(this.general_integer) < 1.0) {
            this.general_integer2 = this.general_integer / (1.0 + 0.28 * this.general_integer * this.general_integer);
            if (x < 0.0) {
                if (y < 0.0) {
                    return this.general_integer2 - Math.PI;
                }
                return this.general_integer2 + Math.PI;
            }
        }
        else {
            this.general_integer2 = this.PI_DIV_2 - this.general_integer / (this.general_integer * this.general_integer + 0.28);
            if (y < 0.0) {
                return this.general_integer2 - Math.PI;
            }
        }
        return this.general_integer2;
    }
    norm(x, y) {
        return Math.sqrt(x * x + y * y);
    }
    round(value) {
        return Math.round((value + Number.EPSILON) * 1000) / 1000;
    }
    cast_int(value) {
        return Math.trunc(Math.round(value));
    }
    get_average2(a, b) {
        return (a + b) * 0.5;
    }
    get_average3(a, b, c) {
        return (a + b + c) * 0.333;
    }
    equilateral_triangle_center(p1_x, p2_x, p3_x, p1_y, p2_y, p3_y) {
        let temp = 0;
        temp = this.norm(p2_x - p1_x, p2_y - p1_y) * 0.5;
        let theta_p1_p2 = this.retrieve_angle_radian(p2_x - p1_x, p2_y - p1_y);
        let p_x = p1_x + temp * this.cosine(theta_p1_p2);
        let p_y = p1_y + temp * this.sine(theta_p1_p2);
        let theta_p_p3 = this.retrieve_angle_radian(p3_x - p_x, p3_y - p_y);
        let c_x = p_x + temp * this.cosine(theta_p_p3);
        let c_y = p_y + temp * this.sine(theta_p_p3);
        return Array(c_x, c_y);
    }
    clip_bounds(m_x, m_y) {
        if (m_x < workspace.bounds.left + 2.5 * global.variables.node_space_x) {
            m_x = workspace.bounds.left + 2.5 * global.variables.node_space_x;
        }
        else if (m_x > workspace.bounds.right - 2.0 * global.variables.node_space_x) {
            m_x = workspace.bounds.right - 2.0 * global.variables.node_space_x;
        }
        if (m_y < workspace.bounds.top + 2.5 * global.variables.node_space_y) {
            m_y = workspace.bounds.top + 2.5 * global.variables.node_space_y;
        }
        else if (m_y > workspace.bounds.bottom - 2.0 * global.variables.node_space_y) {
            m_y = workspace.bounds.bottom - 2.0 * global.variables.node_space_y;
        }
        return [m_x, m_y];
    }
    unanchor_wires(wire_reference, vertices) {
        if (wire_reference.length > 0) {
            let id = -1;
            for (var i = wire_reference.length - 1; i > -1; i--) {
                id = engine_functions.get_wire(wire_reference[i]['wire_id']);
                if (id > -1 && id < wires.length) {
                    if (wire_reference[i]['anchor_point'] === global.variables.anchor_point['p1']) {
                        wires[id].release_nodes();
                        if (wire_reference[i]['linkage'] === 0) {
                            wires[id].p1.x = vertices[0];
                            wires[id].p1.y = vertices[1];
                        }
                        else if (wire_reference[i]['linkage'] === 1) {
                            wires[id].p2.y = vertices[1];
                            wires[id].p2.x = vertices[0];
                        }
                    }
                    else if (wire_reference[i]['anchor_point'] === global.variables.anchor_point['p2']) {
                        wires[id].release_nodes();
                        if (wire_reference[i]['linkage'] === 0) {
                            wires[id].p1.x = vertices[2];
                            wires[id].p1.y = vertices[3];
                        }
                        else if (wire_reference[i]['linkage'] === 1) {
                            wires[id].p2.x = vertices[2];
                            wires[id].p2.y = vertices[3];
                        }
                    }
                    else if (wire_reference[i]['anchor_point'] === global.variables.anchor_point['p3']) {
                        wires[id].release_nodes();
                        if (wire_reference[i]['linkage'] === 0) {
                            wires[id].p1.x = vertices[4];
                            wires[id].p1.y = vertices[5];
                        }
                        else if (wire_reference[i]['linkage'] === 1) {
                            wires[id].p2.x = vertices[4];
                            wires[id].p2.y = vertices[5];
                        }
                    }
                    else if (wire_reference[i]['anchor_point'] === global.variables.anchor_point['p4']) {
                        wires[id].release_nodes();
                        if (wire_reference[i]['linkage'] === 0) {
                            wires[id].p1.x = vertices[6];
                            wires[id].p1.y = vertices[7];
                        }
                        else if (wire_reference[i]['linkage'] === 1) {
                            wires[id].p2.x = vertices[6];
                            wires[id].p2.y = vertices[7];
                        }
                    }
                }
                else {
                    wire_reference.splice(i, 1);
                }
            }
        }
    }
    anchor_wires(wire_reference, vertices) {
        if (wire_reference.length > 0) {
            let id = -1;
            for (var i = wire_reference.length - 1; i > -1; i--) {
                id = engine_functions.get_wire(wire_reference[i]['wire_id']);
                if (id > -1 && id < wires.length) {
                    if (wire_reference[i]['anchor_point'] === global.variables.anchor_point['p1']) {
                        if (wire_reference[i]['linkage'] === 0) {
                            wires[id].p1.x = vertices[0];
                            wires[id].p1.y = vertices[1];
                        }
                        else if (wire_reference[i]['linkage'] === 1) {
                            wires[id].p2.x = vertices[0];
                            wires[id].p2.y = vertices[1];
                        }
                        wires[id].capture_nodes();
                    }
                    else if (wire_reference[i]['anchor_point'] === global.variables.anchor_point['p2']) {
                        if (wire_reference[i]['linkage'] === 0) {
                            wires[id].p1.x = vertices[2];
                            wires[id].p1.y = vertices[3];
                        }
                        else if (wire_reference[i]['linkage'] === 1) {
                            wires[id].p2.x = vertices[2];
                            wires[id].p2.y = vertices[3];
                        }
                        wires[id].capture_nodes();
                    }
                    else if (wire_reference[i]['anchor_point'] === global.variables.anchor_point['p3']) {
                        if (wire_reference[i]['linkage'] === 0) {
                            wires[id].p1.x = vertices[4];
                            wires[id].p1.y = vertices[5];
                        }
                        else if (wire_reference[i]['linkage'] === 1) {
                            wires[id].p2.x = vertices[4];
                            wires[id].p2.y = vertices[5];
                        }
                        wires[id].capture_nodes();
                    }
                    else if (wire_reference[i]['anchor_point'] === global.variables.anchor_point['p4']) {
                        if (wire_reference[i]['linkage'] === 0) {
                            wires[id].p1.x = vertices[6];
                            wires[id].p1.y = vertices[7];
                        }
                        else if (wire_reference[i]['linkage'] === 1) {
                            wires[id].p2.x = vertices[6];
                            wires[id].p2.y = vertices[7];
                        }
                        wires[id].capture_nodes();
                    }
                }
                else {
                    wire_reference.splice(i, 1);
                }
            }
        }
    }
    update_wire_builder(n, anchor, type, id) {
        if (global.variables.wire_builder['step'] === 0) {
            global.variables.wire_builder['n1'] = n;
            global.variables.wire_builder['type1'] = type;
            global.variables.wire_builder['id1'] = id;
            global.variables.wire_builder['anchor_point1'] = anchor;
            global.variables.wire_builder['linkage1']['wire'] = global.variables.wire_builder['step'];
            global.variables.wire_builder['step']++;
        }
        else if (global.variables.wire_builder['step'] === 1) {
            global.variables.wire_builder['n2'] = n;
            global.variables.wire_builder['type2'] = type;
            global.variables.wire_builder['id2'] = id;
            global.variables.wire_builder['anchor_point2'] = anchor;
            global.variables.wire_builder['linkage2']['wire'] = global.variables.wire_builder['step'];
            global.variables.wire_builder['step']++;
        }
    }
    wire_reference_maintenance(wire_reference) {
        if (wire_reference.length > 0 && global.flags.flag_wire_deleted) {
            let id = -1;
            for (var i = wire_reference.length - 1; i > -1; i--) {
                id = engine_functions.get_wire(wire_reference[i]['wire_id']);
                if (!(id > -1 && id < wires.length)) {
                    wire_reference.splice(i, 1);
                }
            }
        }
    }
    remove_focus(type, id) {
        if (global.variables.focused && global.variables.focused_id === id && global.variables.focused_type === type) {
            global.variables.focused_id = global.CONSTANTS.NULL;
            global.variables.focused_type = global.CONSTANTS.NULL;
            global.variables.focused_bounds = global.CONSTANTS.NULL;
            global.variables.focused = false;
        }
    }
    remove_selection(type, id) {
        if (global.variables.selected_id === id && global.variables.selected_type === type) {
            global.variables.selected_id = global.CONSTANTS.NULL;
            global.variables.selected_type = -1;
            global.variables.selected_bounds = global.CONSTANTS.NULL;
            global.variables.selected_properties = global.CONSTANTS.NULL;
            global.variables.selected_wire_style = global.CONSTANTS.NULL;
            global.variables.selected = false;
        }
    }
    get_average4(a, b, c, d) {
        return (a + b + c + d) * 0.25;
    }
    not_null(obj) {
        return !(obj == this.NULL);
    }
    copy(obj) {
        return _.cloneDeep(obj);
    }
    print(obj) {
        if (this.DEVELOPER_MODE) {
            console.log(obj);
        }
    }
    exponentiate_quickly(input) {
        this.str = '';
        this.val = 0;
        this.abs_input = Math.abs(input);
        this.found = false;
        for (var i = 0; i < this.SI_UNIT_THRESHOLD_ARRAY.length; i++) {
            if (this.abs_input >= this.SI_UNIT_THRESHOLD_ARRAY[i]) {
                this.val = input * this.SI_UNIT_ARRAY[i];
                this.str = this.round(this.val) + this.SI_UNIT_ABBREVIATION[i];
                this.found = true;
                break;
            }
            else if (this.abs_input === 0) {
                this.val = 0;
                this.str = this.ELEMENT_VAL_TEMPLATE.replace('{VAL}', this.val).replace('{UNIT}', '');
                this.found = true;
                break;
            }
        }
        if (!this.found) {
            this.str = '--- ';
        }
        return this.str;
    }
    element_max() {
        /* #INSERT_GENERATE_MAX_ELEMENT# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        this.element_max_array = Array(resistors.length, capacitors.length, inductors.length, grounds.length, dcsources.length, dccurrents.length, acsources.length, accurrents.length, squarewaves.length, sawwaves.length, trianglewaves.length, constants.length, wires.length, nets.length, notes.length, rails.length, voltmeters.length, ohmmeters.length, ammeters.length, wattmeters.length, fuses.length, spsts.length, spdts.length, nots.length, diodes.length, leds.length, zeners.length, potentiometers.length, ands.length, ors.length, nands.length, nors.length, xors.length, xnors.length, dffs.length, vsats.length, adders.length, subtractors.length, multipliers.length, dividers.length, gains.length, absvals.length, vcsws.length, vcvss.length, vccss.length, cccss.length, ccvss.length, opamps.length, nmosfets.length, pmosfets.length, npns.length, pnps.length, adcs.length, dacs.length, sandhs.length, pwms.length, integrators.length, differentiators.length, lowpasses.length, highpasses.length, relays.length, pids.length, luts.length, vcrs.length, vccas.length, vcls.length, grts.length, tptzs.length, transformers.length);
        /* <!-- END AUTOMATICALLY GENERATED !--> */
        this.max_general_number = 0;
        for (var i = 0; i < this.element_max_array.length; i++) {
            if (this.element_max_array[i] > this.max_general_number) {
                this.max_general_number = this.element_max_array[i];
            }
        }
        return this.max_general_number;
    }
    meter_max() {
        /* #INSERT_GENERATE_MAX_METER# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        this.meter_max_array = Array(voltmeters.length, ohmmeters.length, ammeters.length, wattmeters.length);
        /* <!-- END AUTOMATICALLY GENERATED !--> */
        this.max_general_number = 0;
        for (var i = 0; i < this.meter_max_array.length; i++) {
            if (this.meter_max_array[i] > this.max_general_number) {
                this.max_general_number = this.meter_max_array[i];
            }
        }
        return this.max_general_number;
    }
    non_linear_max() {
        /* #INSERT_GENERATE_MAX_NON_LINEAR# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        this.non_linear_max_array = Array(nots.length, diodes.length, leds.length, zeners.length, ands.length, ors.length, nands.length, nors.length, xors.length, xnors.length, nmosfets.length, pmosfets.length, npns.length, pnps.length);
        /* <!-- END AUTOMATICALLY GENERATED !--> */
        this.max_general_number = 0;
        for (var i = 0; i < this.non_linear_max_array.length; i++) {
            if (this.non_linear_max_array[i] > this.max_general_number) {
                this.max_general_number = this.non_linear_max_array[i];
            }
        }
        return this.max_general_number;
    }
    line_collision(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) {
        let s1_x = p1_x - p0_x;
        let s1_y = p1_y - p0_y;
        let s2_x = p3_x - p2_x;
        let s2_y = p3_y - p2_y;
        let s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
        let t = (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);
        return s >= 0 && s <= 1 && t >= 0 && t <= 1;
    }
    decode_key(key_event) {
        let shift = key_event['shift'];
        let caps = key_event['caps'];
        let code = key_event['event'].code;
        let ret = '';
        for (var i = 0; i < this.KEY_EVENT_CODES_KEYS.length; i++) {
            if (code === this.KEY_EVENT_CODES_KEYS[i]) {
                if (shift) {
                    ret = this.KEY_EVENT_CODES[this.KEY_EVENT_CODES_KEYS[i]][1];
                }
                else if (caps) {
                    ret = this.KEY_EVENT_CODES[this.KEY_EVENT_CODES_KEYS[i]][2];
                }
                else {
                    ret = this.KEY_EVENT_CODES[this.KEY_EVENT_CODES_KEYS[i]][0];
                }
            }
        }
        return ret;
    }
    key_to_code(character) {
        let ret = '';
        for (var i = 0; i < this.KEY_EVENT_CODES_KEYS.length; i++) {
            if (character === this.KEY_EVENT_CODES[this.KEY_EVENT_CODES_KEYS[i]][0] || character === this.KEY_EVENT_CODES[this.KEY_EVENT_CODES_KEYS[i]][1]) {
                ret = this.copy(this.KEY_EVENT_CODES_KEYS[i]);
                break;
            }
        }
        return ret;
    }
    is_alpha_numeric(key_event) {
        return /[a-z A-Z0-9]/.test(this.decode_key(key_event));
    }
    is_alpha_numeric_note(key_event) {
        return /[!@#$%`~^&_{}()a-z A-Z0-9=:'",?<>;:*/+-|]/.test(this.decode_key(key_event));
    }
    is_valid_si_units(key_event) {
        return /[-.kmu0123456789MnGpf]/.test(this.decode_key(key_event));
    }
    limit(inp, low, high) {
        if (inp < low) {
            return low;
        }
        else if (inp > high) {
            return high;
        }
        else {
            return inp;
        }
    }
    get_date_stamp() {
        let date = new Date();
        return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
    }
    get_time_stamp() {
        let date = new Date();
        return '{DATE}->{TIME_ZONE}'.replace('{DATE}', date.toJSON()).replace('{TIME_ZONE}', date.getTimezoneOffset());
    }
    log_damping(next, now, gamma, kappa) {
        return now + (gamma / kappa) * this.signum(next - now) * this.logbx(Math.E, 1 + Math.abs(next - now) * kappa);
    }
    signum(inp) {
        if (inp < 0) {
            return -1;
        }
        else {
            return 1;
        }
    }
    logbx(b, x) {
        return Math.log(x) / Math.log(b);
    }
    map_range(inp, lower_bound, upper_bound) {
        return lower_bound + inp * (upper_bound - lower_bound);
    }
    perm32(inp) {
        this.general_integer = 12;
        let x = ((inp >> 8) ^ inp) * 0x6b + this.general_integer--;
        x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
        x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
        x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
        x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
        x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
        x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
        x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
        x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
        x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
        x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
        x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
        return x;
    }
    unique_color(net_name) {
        //@ts-ignore
        let rgb = this.perm32(net_name.hashCode());
        let r = 0, g = 0, b = 0;
        r = (rgb & 0x00ff0000) >> 16;
        g = (rgb & 0x0000ff00) >> 8;
        b = rgb & 0x000000ff;
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
    wrap(inp, max) {
        return inp - max * Math.floor(inp / max);
    }
    linterp(x_arr, y_arr, inp) {
        let k = this.linsearch(x_arr, inp, y_arr.length);
        let x0 = x_arr[k], x1 = x_arr[k + 1], y0 = y_arr[k], y1 = y_arr[k + 1];
        if (inp > x_arr[x_arr.length - 1]) {
            return y_arr[y_arr.length - 1];
        }
        else if (inp < x_arr[0]) {
            return y_arr[0];
        }
        return y0 + ((y1 - y0) / (x1 - x0)) * (inp - x0);
    }
    linsearch(x_arr, inp, size) {
        let i = 0;
        let out = 0;
        for (i = 0; i < size - 1; i++) {
            if (inp >= x_arr[i] && inp <= x_arr[i + 1]) {
                out = i;
                break;
            }
        }
        return out;
    }
    min3(a, b, c) {
        return Math.min(a, Math.min(b, c));
    }
}
