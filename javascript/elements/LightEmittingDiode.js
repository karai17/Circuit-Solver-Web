'use strict';
class LightEmittingDiode {
    constructor(type, id, n1, n2) {
        this.initialized = false;
        this.bounds = new RectF(0, 0, 0, 0);
        this.elm = new Element2(id, type, global.utils.copy(global.PROPERTY.PROPERTY_LED));
        this.elm.set_nodes(n1, n2);
        if (this.elm.consistent()) {
            this.bounds.set_center2(global.utils.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n2].location.x), global.utils.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n2].location.y), global.variables.node_space_x * 2, global.variables.node_space_y * 2);
        }
        this.elm.set_rotation(global.CONSTANTS.ROTATION_0);
        this.elm.set_flip(global.CONSTANTS.FLIP_0);
        this.release_nodes();
        let vertices = this.get_vertices();
        this.elm.map_node2(vertices[0], vertices[1], vertices[2], vertices[3]);
        this.capture_nodes();
        this.p1 = new PointF(0, 0);
        this.p2 = new PointF(0, 0);
        if (this.elm.consistent()) {
            this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
            this.p2.set_point(nodes[this.elm.n2].location.x, nodes[this.elm.n2].location.y);
        }
        this.theta_m90 = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.CONSTANTS.PI_DIV_2;
        this.theta = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
        this.led_0 = new PointF(0, 0);
        this.led_1 = new PointF(0, 0);
        this.led_2 = new PointF(0, 0);
        this.led_3 = new PointF(0, 0);
        this.led_4 = new PointF(0, 0);
        this.led_5 = new PointF(0, 0);
        this.led_6 = new PointF(0, 0);
        this.led_7 = new PointF(0, 0);
        this.led_8 = new PointF(0, 0);
        this.led_9 = new PointF(0, 0);
        this.led_10 = new PointF(0, 0);
        this.led_11 = new PointF(0, 0);
        this.c_x = this.bounds.get_center_x();
        this.c_y = this.bounds.get_center_y();
        this.x_space = global.variables.node_space_x >> 1;
        this.y_space = global.variables.node_space_y >> 1;
        this.connect1_x = 0;
        this.connect1_y = 0;
        this.connect2_x = 0;
        this.connect2_y = 0;
        this.grid_point = [];
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(paint.style.STROKE);
        this.line_paint.set_paint_cap(paint.cap.ROUND);
        this.line_paint.set_paint_join(paint.join.ROUND);
        this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_1_zoom);
        this.line_paint.set_color(global.COLORS.ELEMENT_COLOR);
        this.line_paint.set_text_size(global.variables.canvas_text_size_3_zoom);
        this.line_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(paint.align.CENTER);
        this.point_paint = new Paint();
        this.point_paint.set_paint_style(paint.style.FILL);
        this.point_paint.set_paint_cap(paint.cap.ROUND);
        this.point_paint.set_paint_join(paint.join.ROUND);
        this.point_paint.set_stroke_width(global.variables.canvas_stroke_width_1_zoom);
        this.point_paint.set_color(global.COLORS.ELEMENT_COLOR);
        this.point_paint.set_text_size(global.variables.canvas_text_size_3_zoom);
        this.point_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.point_paint.set_alpha(255);
        this.point_paint.set_paint_align(paint.align.CENTER);
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(paint.style.FILL);
        this.text_paint.set_paint_cap(paint.cap.ROUND);
        this.text_paint.set_paint_join(paint.join.ROUND);
        this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1_zoom);
        this.text_paint.set_color(global.COLORS.ELEMENT_COLOR);
        this.text_paint.set_text_size(global.variables.canvas_text_size_3_zoom);
        this.text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(paint.align.CENTER);
        this.is_translating = false;
        this.build_element();
        this.wire_reference = [];
        this.simulation_id = 0;
        this.gamma = 0.12;
        this.kappa = 0.414;
        this.gmin = 1e-9;
        this.gmin_start = 12;
        this.damping_safety_factor = 0.97;
        this.indexer = 0;
        this.m_x = 0;
        this.m_y = 0;
        this.led_status = global.CONSTANTS.OFF;
        this.initialized = true;
        this.multi_selected = false;
        this.line_buffer = [];
        this.circle_buffer = [];
        this.build_element_flag = true;
        this.angle = 0;
        this.node_id_array = [];
    }
    refresh_bounds() {
        if (this.elm.consistent()) {
            this.p1 = new PointF(0, 0);
            this.p2 = new PointF(0, 0);
            this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
            this.p2.set_point(nodes[this.elm.n2].location.x, nodes[this.elm.n2].location.y);
            this.bounds.set_center2(global.utils.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n2].location.x), global.utils.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n2].location.y), global.variables.node_space_x * 2, global.variables.node_space_y * 2);
        }
    }
    push_reference(ref) {
        this.wire_reference.push(ref);
    }
    stamp() {
        if (this.elm.consistent()) {
            engine_functions.stamp_resistor(this.elm.n1, this.elm.n2, 1.0 / this.gmin);
            engine_functions.stamp_current(this.elm.n1, this.elm.n2, this.elm.properties['Equivalent Current']);
            engine_functions.stamp_resistor(this.elm.n1, this.elm.n2, this.elm.properties['Resistance']);
        }
    }
    calculate_vcrit() {
        return (this.elm.properties['Emission Coefficient'] *
            global.settings.THERMAL_VOLTAGE *
            Math.log((this.elm.properties['Emission Coefficient'] * global.settings.THERMAL_VOLTAGE) / (1.41421 * this.elm.properties['Saturation Current'])));
    }
    is_converged() {
        if (this.get_led_error() < global.settings.TOLERANCE) {
            return true;
        }
        else {
            return false;
        }
    }
    get_led_error() {
        return Math.abs(this.elm.properties['Voltage'] - this.elm.properties['Last Voltage']);
    }
    update() {
        if (global.flags.flag_simulating && simulation_manager.solutions_ready) {
            if (this.elm.consistent()) {
                this.elm.properties['Last Voltage'] = this.elm.properties['Voltage'];
                this.elm.properties['Last Current'] = this.elm.properties['Equivalent Current'];
                let next_voltage = engine_functions.get_voltage(this.elm.n1, this.elm.n2);
                let vcrit = this.calculate_vcrit();
                let diode_voltage = 0;
                if (next_voltage > this.damping_safety_factor * vcrit) {
                    diode_voltage = global.utils.log_damping(next_voltage, this.elm.properties['Voltage'], this.gamma, this.kappa);
                }
                else if (diode_voltage < -this.damping_safety_factor * vcrit) {
                    diode_voltage = global.utils.log_damping(next_voltage, this.elm.properties['Voltage'], this.gamma, this.kappa);
                }
                else {
                    diode_voltage = next_voltage;
                }
                diode_voltage = global.utils.limit(diode_voltage, -vcrit, vcrit);
                this.gmin_step(this.gmin_start, this.get_led_error());
                this.elm.properties['Voltage'] = diode_voltage;
                this.elm.properties['Resistance'] =
                    1.0 /
                        ((this.elm.properties['Saturation Current'] / (this.elm.properties['Emission Coefficient'] * global.settings.THERMAL_VOLTAGE)) *
                            Math.exp(this.elm.properties['Voltage'] / (this.elm.properties['Emission Coefficient'] * global.settings.THERMAL_VOLTAGE)));
                this.elm.properties['Equivalent Current'] = -(this.elm.properties['Saturation Current'] * (Math.exp(this.elm.properties['Voltage'] / (this.elm.properties['Emission Coefficient'] * global.settings.THERMAL_VOLTAGE)) - 1) -
                    this.elm.properties['Voltage'] / this.elm.properties['Resistance']);
            }
        }
        else {
            this.led_status = global.CONSTANTS.OFF;
        }
    }
    turn_on_check() {
        if (Math.abs(this.elm.properties['Equivalent Current']) > this.elm.properties['Turn On Current'] &&
            this.elm.properties['Last Current'] > this.elm.properties['Turn On Current'] &&
            simulation_manager.simulation_step !== 0) {
            this.led_status = global.CONSTANTS.ON;
        }
        else {
            this.led_status = global.CONSTANTS.OFF;
        }
    }
    gmin_step(step, error) {
        this.gmin = global.settings.GMIN_DEFAULT;
        if (simulation_manager.iterator > step && error > global.settings.TOLERANCE) {
            this.gmin = Math.exp(-24.723 * (1.0 - 0.99 * (simulation_manager.iterator / global.settings.ITL4)));
        }
    }
    get_vertices() {
        let vertices = [];
        let p1 = [];
        let p2 = [];
        if (this.elm.rotation === global.CONSTANTS.ROTATION_0) {
            p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
            p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
            vertices = Array(p1[0], p1[1], p2[0], p2[1]);
        }
        else if (this.elm.rotation === global.CONSTANTS.ROTATION_90) {
            p1 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.top);
            p2 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.bottom);
            vertices = Array(p1[0], p1[1], p2[0], p2[1]);
        }
        else if (this.elm.rotation === global.CONSTANTS.ROTATION_180) {
            p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
            p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
            vertices = Array(p1[0], p1[1], p2[0], p2[1]);
        }
        else if (this.elm.rotation === global.CONSTANTS.ROTATION_270) {
            p1 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.bottom);
            p2 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.top);
            vertices = Array(p1[0], p1[1], p2[0], p2[1]);
        }
        else {
            p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
            p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
            vertices = Array(p1[0], p1[1], p2[0], p2[1]);
        }
        return vertices;
    }
    release_wires() {
        if (this.wire_reference.length > 0) {
            let id = -1;
            for (var i = this.wire_reference.length - 1; i > -1; i--) {
                id = engine_functions.get_wire(this.wire_reference[i]['wire_id']);
                if (id > -1 && id < wires.length) {
                    wires[id].release_nodes();
                    wires.splice(id, 1);
                }
            }
            this.wire_reference = [];
        }
    }
    release_nodes() {
        if (this.elm.consistent()) {
            nodes[this.elm.n1].remove_reference(this.elm.id, this.elm.type);
            nodes[this.elm.n2].remove_reference(this.elm.id, this.elm.type);
            this.elm.set_nodes(-1, -1);
        }
    }
    capture_nodes() {
        let vertices = this.get_vertices();
        this.elm.map_node2(vertices[0], vertices[1], vertices[2], vertices[3]);
        if (this.elm.consistent() && !this.is_translating) {
            nodes[this.elm.n1].add_reference(this.elm.id, this.elm.type);
            nodes[this.elm.n2].add_reference(this.elm.id, this.elm.type);
        }
    }
    mouse_down() {
        if (global.flags.flag_idle &&
            !global.flags.flag_save_image &&
            !global.flags.flag_save_circuit &&
            !global.flags.flag_zoom &&
            !global.flags.flag_element_options &&
            !global.flags.flag_element_options_edit &&
            !global.flags.flag_select_element &&
            !global.flags.flag_select_timestep &&
            !global.flags.flag_select_settings &&
            !global.flags.flag_remove_all &&
            !global.flags.flag_menu_element_toolbox) {
            if (!global.variables.focused && !global.variables.component_touched && !global.variables.multi_selected) {
                if (this.bounds.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, this.bounds.get_width() >> 1, this.bounds.get_height() >> 1) && !global.variables.component_touched) {
                    this.is_translating = false;
                    global.variables.focused_id = this.elm.id;
                    global.variables.focused_type = this.elm.type;
                    global.variables.focused_bounds = global.utils.copy(this.bounds);
                    global.variables.focused = true;
                    global.variables.component_touched = true;
                }
                else {
                    if (this.elm.consistent() && !global.variables.component_touched && !global.flags.flag_simulating) {
                        if (nodes[this.elm.n1].contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
                            this.handle_wire_builder(this.elm.n1, global.variables.anchor_point['p1']);
                            global.variables.component_touched = true;
                        }
                        else if (nodes[this.elm.n2].contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
                            this.handle_wire_builder(this.elm.n2, global.variables.anchor_point['p2']);
                            global.variables.component_touched = true;
                        }
                    }
                }
            }
        }
    }
    handle_wire_builder(n, anchor) {
        global.utils.update_wire_builder(n, anchor, this.elm.type, this.elm.id);
    }
    move_element(dx, dy) {
        wire_manager.reset_wire_builder();
        this.unanchor_wires();
        this.release_nodes();
        this.m_x = this.c_x + dx;
        this.m_y = this.c_y + dy;
        [this.m_x, this.m_y] = global.utils.clip_bounds(this.m_x, this.m_y);
        this.grid_point = this.elm.snap_to_grid(this.m_x, this.m_y);
        this.bounds.set_center(this.grid_point[0], this.grid_point[1]);
        this.refactor();
        this.capture_nodes();
        this.anchor_wires();
    }
    mouse_move() {
        if (global.flags.flag_idle && !global.flags.flag_simulating) {
            if (global.variables.focused) {
                if (global.variables.focused_id === this.elm.id && global.variables.focused_type === this.elm.type) {
                    global.variables.is_dragging = false;
                    if (!this.is_translating) {
                        if (!this.bounds.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, this.bounds.get_width() * 0.75, this.bounds.get_height() * 0.75)) {
                            this.release_nodes();
                            this.bounds.anchored = false;
                            this.is_translating = true;
                            global.variables.component_translating = true;
                            this.select();
                        }
                    }
                    else {
                        this.m_x = global.variables.mouse_x;
                        this.m_y = global.variables.mouse_y;
                        [this.m_x, this.m_y] = global.utils.clip_bounds(this.m_x, this.m_y);
                        this.grid_point = this.elm.snap_to_grid(this.m_x, this.m_y);
                        wire_manager.reset_wire_builder();
                        this.bounds.set_center(this.grid_point[0], this.grid_point[1]);
                        this.unanchor_wires();
                        this.build_element_flag = true;
                    }
                }
            }
        }
    }
    mouse_up() {
        if (global.flags.flag_idle) {
            if (global.variables.focused && global.variables.focused_id === this.elm.id && global.variables.focused_type === this.elm.type) {
                if (this.is_translating) {
                    this.is_translating = false;
                    this.capture_nodes();
                    this.push_history();
                    this.bounds.anchored = true;
                    this.anchor_wires();
                }
                else {
                    if (!global.variables.selected) {
                        this.select();
                    }
                    else {
                        if (global.variables.selected_id === this.elm.id && global.variables.selected_type === this.elm.type) {
                            global.variables.selected_id = global.CONSTANTS.NULL;
                            global.variables.selected_type = -1;
                            global.variables.selected_bounds = global.CONSTANTS.NULL;
                            global.variables.selected_properties = global.CONSTANTS.NULL;
                            global.variables.selected = false;
                        }
                        else {
                            this.select();
                        }
                    }
                }
                global.variables.focused_id = global.CONSTANTS.NULL;
                global.variables.focused_type = global.CONSTANTS.NULL;
                global.variables.focused_bounds = global.CONSTANTS.NULL;
                global.variables.focused = false;
            }
            if (global.variables.selected_id === this.elm.id && global.variables.selected_type === this.elm.type) {
                global.variables.selected_bounds = global.utils.copy(this.bounds);
            }
        }
    }
    select() {
        if (global.variables.wire_builder['step'] !== 0) {
            wire_manager.reset_wire_builder();
        }
        global.variables.selected_id = this.elm.id;
        global.variables.selected_type = this.elm.type;
        global.variables.selected_bounds = global.utils.copy(this.bounds);
        global.variables.selected_properties = global.utils.copy(this.elm.properties);
        global.variables.selected_wire_style = global.CONSTANTS.NULL;
        global.variables.selected = true;
    }
    remove_focus() {
        global.utils.remove_focus(this.elm.type, this.elm.id);
    }
    remove_selection() {
        global.utils.remove_selection(this.elm.type, this.elm.id);
    }
    wire_reference_maintenance() {
        global.utils.wire_reference_maintenance(this.wire_reference);
    }
    unanchor_wires() {
        global.utils.unanchor_wires(this.wire_reference, this.get_vertices());
    }
    anchor_wires() {
        global.utils.anchor_wires(this.wire_reference, this.get_vertices());
    }
    set_flip(flip) {
        this.build_element_flag = true;
        wire_manager.reset_wire_builder();
        this.unanchor_wires();
        this.push_history();
        this.release_nodes();
        this.elm.set_flip(flip);
        this.refactor();
        this.capture_nodes();
        this.anchor_wires();
    }
    set_rotation(rotation) {
        this.build_element_flag = true;
        wire_manager.reset_wire_builder();
        this.unanchor_wires();
        this.push_history();
        this.release_nodes();
        this.elm.set_rotation(rotation);
        this.refactor();
        this.capture_nodes();
        this.anchor_wires();
    }
    push_history() {
        if (this.initialized) {
            global.variables.history['packet'].push(engine_functions.history_snapshot());
        }
    }
    build_element() {
        if ((this.build_element_flag || global.flags.flag_build_element) &&
            ((this.c_x >= view_port.left - global.variables.node_space_x &&
                this.c_x - global.variables.node_space_x <= view_port.right &&
                this.c_y >= view_port.top + -global.variables.node_space_y &&
                this.c_y - global.variables.node_space_y <= view_port.bottom) ||
                global.flags.flag_picture_request)) {
            let cache_0 = 1.25 * this.x_space;
            let cache_1 = 1.25 * this.y_space;
            let cache_2 = 2.25 * this.x_space;
            let cache_3 = 2.25 * this.y_space;
            let cache_4 = this.x_space;
            let cache_5 = this.y_space;
            let delta_x = 0;
            let delta_y = 0;
            this.led_0.x = this.c_x + (cache_4 >> 1) * global.utils.cosine(this.theta) + (cache_4 >> 1) * global.utils.cosine(this.theta_m90);
            this.led_0.y = this.c_y + (cache_5 >> 1) * global.utils.sine(this.theta) + (cache_5 >> 1) * global.utils.sine(this.theta_m90);
            this.led_2.x = this.c_x - (cache_4 >> 1) * global.utils.cosine(this.theta) + (cache_4 >> 1) * global.utils.cosine(this.theta_m90);
            this.led_2.y = this.c_y - (cache_5 >> 1) * global.utils.sine(this.theta) + (cache_5 >> 1) * global.utils.sine(this.theta_m90);
            this.led_6.x = this.c_x + (cache_4 >> 1) * global.utils.cosine(this.theta) + (cache_4 >> 1) * global.utils.cosine(Math.PI + this.theta_m90);
            this.led_6.y = this.c_y + (cache_5 >> 1) * global.utils.sine(this.theta) + (cache_5 >> 1) * global.utils.sine(Math.PI + this.theta_m90);
            this.led_4.x = this.c_x - (cache_4 >> 1) * global.utils.cosine(this.theta) + (cache_4 >> 1) * global.utils.cosine(Math.PI + this.theta_m90);
            this.led_4.y = this.c_y - (cache_5 >> 1) * global.utils.sine(this.theta) + (cache_5 >> 1) * global.utils.sine(Math.PI + this.theta_m90);
            this.connect1_x = this.c_x - (cache_4 >> 1) * global.utils.cosine(this.theta);
            this.connect1_y = this.c_y - (cache_5 >> 1) * global.utils.sine(this.theta);
            this.connect2_x = this.c_x + (cache_4 >> 1) * global.utils.cosine(this.theta);
            this.connect2_y = this.c_y + (cache_5 >> 1) * global.utils.sine(this.theta);
            this.led_8.x = this.c_x - (cache_4 >> 1) * global.utils.cosine(this.theta) + cache_0 * global.utils.cosine(this.theta_m90);
            this.led_8.y = this.c_y - (cache_5 >> 1) * global.utils.sine(this.theta) + cache_1 * global.utils.sine(this.theta_m90);
            this.led_10.x = this.c_x + (cache_4 >> 1) * global.utils.cosine(this.theta) + cache_0 * global.utils.cosine(this.theta_m90);
            this.led_10.y = this.c_y + (cache_5 >> 1) * global.utils.sine(this.theta) + cache_1 * global.utils.sine(this.theta_m90);
            this.led_1.x = this.c_x - ((cache_4 >> 1) - (cache_4 >> 2)) * global.utils.cosine(this.theta) + cache_2 * global.utils.cosine(this.theta_m90);
            this.led_1.y = this.c_y - ((cache_5 >> 1) - (cache_5 >> 2)) * global.utils.sine(this.theta) + cache_3 * global.utils.sine(this.theta_m90);
            this.led_3.x = this.c_x + ((cache_4 >> 1) + (cache_4 >> 2)) * global.utils.cosine(this.theta) + cache_2 * global.utils.cosine(this.theta_m90);
            this.led_3.y = this.c_y + ((cache_5 >> 1) + (cache_5 >> 2)) * global.utils.sine(this.theta) + cache_3 * global.utils.sine(this.theta_m90);
            delta_x = this.led_1.x - this.led_8.x;
            delta_y = this.led_1.y - this.led_8.y;
            this.theta_m90 = global.utils.retrieve_angle_radian(delta_x, delta_y) - global.CONSTANTS.PI_DIV_2;
            this.theta = global.utils.retrieve_angle_radian(delta_x, delta_y);
            this.led_5.x = this.led_1.x + (cache_4 >> 1) * global.utils.cosine(this.theta - 35);
            this.led_5.y = this.led_1.y + cache_5 * 0.5 * global.utils.sine(this.theta - 35);
            this.led_7.x = this.led_1.x + (cache_4 >> 1) * global.utils.cosine(this.theta + 35);
            this.led_7.y = this.led_1.y + cache_5 * 0.5 * global.utils.sine(this.theta + 35);
            this.led_9.x = this.led_3.x + (cache_4 >> 1) * global.utils.cosine(this.theta - 35);
            this.led_9.y = this.led_3.y + cache_5 * 0.5 * global.utils.sine(this.theta - 35);
            this.led_11.x = this.led_3.x + (cache_4 >> 1) * global.utils.cosine(this.theta + 35);
            this.led_11.y = this.led_3.y + cache_5 * 0.5 * global.utils.sine(this.theta + 35);
            this.build_element_flag = false;
        }
    }
    resize() {
        if (this.build_element_flag || global.flags.flag_build_element) {
            if (this.bounds.anchored) {
                if (this.elm.consistent()) {
                    this.bounds.set_center2(global.utils.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n2].location.x), global.utils.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n2].location.y), global.variables.node_space_x * 2, global.variables.node_space_y * 2);
                    this.refactor();
                }
                this.unanchor_wires();
                this.anchor_wires();
            }
            else {
                this.refactor();
            }
            this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_1_zoom);
            this.line_paint.set_text_size(global.variables.canvas_text_size_3_zoom);
            this.point_paint.set_stroke_width(global.variables.canvas_stroke_width_1_zoom);
            this.point_paint.set_text_size(global.variables.canvas_text_size_3_zoom);
            this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1_zoom);
            this.text_paint.set_text_size(global.variables.canvas_text_size_3_zoom);
        }
    }
    refactor() {
        let vertices = this.get_vertices();
        this.p1.x = vertices[0];
        this.p1.y = vertices[1];
        this.p2.x = vertices[2];
        this.p2.y = vertices[3];
        this.x_space = global.variables.node_space_x >> 1;
        this.y_space = global.variables.node_space_y >> 1;
        this.c_x = this.bounds.get_center_x();
        this.c_y = this.bounds.get_center_y();
        this.theta_m90 = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.CONSTANTS.PI_DIV_2;
        this.theta = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
        this.build_element();
    }
    increment_rotation() {
        this.elm.rotation++;
        if (this.elm.rotation > global.CONSTANTS.ROTATION_270) {
            this.elm.rotation = global.CONSTANTS.ROTATION_0;
        }
        this.set_rotation(this.elm.rotation);
    }
    increment_flip() { }
    map_rotation() {
        if (this.elm.rotation === global.CONSTANTS.ROTATION_0 || this.elm.rotation === global.CONSTANTS.ROTATION_180) {
            return this.x_space;
        }
        else if (this.elm.rotation === global.CONSTANTS.ROTATION_90 || this.elm.rotation === global.CONSTANTS.ROTATION_270) {
            return this.y_space;
        }
    }
    recolor() {
        if (global.variables.selected) {
            if (global.variables.selected_id === this.elm.id && global.variables.selected_type === this.elm.type) {
                this.line_paint.set_color(global.COLORS.SELECTED_COLOR);
                this.point_paint.set_color(global.COLORS.SELECTED_COLOR);
                this.text_paint.set_color(global.COLORS.SELECTED_COLOR);
            }
            else {
                this.line_paint.set_color(global.COLORS.ELEMENT_COLOR);
                this.point_paint.set_color(global.COLORS.ELEMENT_COLOR);
                this.text_paint.set_color(global.COLORS.ELEMENT_COLOR);
            }
        }
        else {
            if (this.multi_selected) {
                this.line_paint.set_color(global.COLORS.MULTI_SELECTED_COLOR);
                this.point_paint.set_color(global.COLORS.MULTI_SELECTED_COLOR);
                this.text_paint.set_color(global.COLORS.MULTI_SELECTED_COLOR);
            }
            else {
                this.line_paint.set_color(global.COLORS.ELEMENT_COLOR);
                this.point_paint.set_color(global.COLORS.ELEMENT_COLOR);
                this.text_paint.set_color(global.COLORS.ELEMENT_COLOR);
            }
        }
    }
    is_selected_element() {
        return global.variables.selected_id === this.elm.id && global.variables.selected_type === this.elm.type;
    }
    wavelength_to_color(wavelength) {
        let R, G, B, alpha, color_space, wl = wavelength, gamma = 1;
        if (wl >= 380 && wl < 440) {
            R = (-1 * (wl - 440)) / (440 - 380);
            G = 0;
            B = 1;
        }
        else if (wl >= 440 && wl < 490) {
            R = 0;
            G = (wl - 440) / (490 - 440);
            B = 1;
        }
        else if (wl >= 490 && wl < 510) {
            R = 0;
            G = 1;
            B = (-1 * (wl - 510)) / (510 - 490);
        }
        else if (wl >= 510 && wl < 580) {
            R = (wl - 510) / (580 - 510);
            G = 1;
            B = 0;
        }
        else if (wl >= 580 && wl < 645) {
            R = 1;
            G = (-1 * (wl - 645)) / (645 - 580);
            B = 0.0;
        }
        else if (wl >= 645 && wl <= 780) {
            R = 1;
            G = 0;
            B = 0;
        }
        else {
            R = 0;
            G = 0;
            B = 0;
        }
        if (wl > 780 || wl < 380) {
            alpha = 0;
        }
        else if (wl > 700) {
            alpha = (780 - wl) / (780 - 700);
        }
        else if (wl < 420) {
            alpha = (wl - 380) / (420 - 380);
        }
        else {
            alpha = 1;
        }
        color_space = ['rgb(' + R * 100 + ',' + G * 100 + ',' + B * 100 + ')', alpha];
        return color_space;
    }
    draw_component(canvas) {
        this.wire_reference_maintenance();
        this.recolor();
        this.resize();
        if (this.multi_selected) {
            multi_select_manager.determine_enveloping_bounds(this.bounds);
        }
        if (global.flags.flag_picture_request ||
            (this.c_x >= view_port.left - global.variables.node_space_x &&
                this.c_x - global.variables.node_space_x <= view_port.right &&
                this.c_y >= view_port.top + -global.variables.node_space_y &&
                this.c_y - global.variables.node_space_y <= view_port.bottom)) {
            if (global.flags.flag_simulating && this.led_status === global.CONSTANTS.ON) {
                let color = this.point_paint.color;
                let alpha = this.point_paint.alpha;
                let new_color = this.wavelength_to_color(this.elm.properties['Wavelength']);
                this.point_paint.set_color(new_color[0]);
                this.point_paint.set_alpha(new_color[1] * 255);
                canvas.draw_circle(this.c_x, this.c_y, this.x_space, this.point_paint);
                this.point_paint.set_color(color);
                this.point_paint.set_alpha(alpha * 255);
            }
            this.indexer = 0;
            this.circle_buffer = [];
            this.line_buffer = [];
            this.line_buffer[this.indexer++] = Array(this.led_2.x, this.led_2.y, this.led_4.x, this.led_4.y);
            this.line_buffer[this.indexer++] = Array(this.led_6.x, this.led_6.y, this.led_0.x, this.led_0.y);
            this.line_buffer[this.indexer++] = Array(this.led_2.x, this.led_2.y, this.connect2_x, this.connect2_y);
            this.line_buffer[this.indexer++] = Array(this.led_4.x, this.led_4.y, this.connect2_x, this.connect2_y);
            this.line_buffer[this.indexer++] = Array(this.p1.x, this.p1.y, this.connect1_x, this.connect1_y);
            this.line_buffer[this.indexer++] = Array(this.connect2_x, this.connect2_y, this.p2.x, this.p2.y);
            this.line_buffer[this.indexer++] = Array(this.led_8.x, this.led_8.y, this.led_1.x, this.led_1.y);
            this.line_buffer[this.indexer++] = Array(this.led_10.x, this.led_10.y, this.led_3.x, this.led_3.y);
            this.line_buffer[this.indexer++] = Array(this.led_1.x, this.led_1.y, this.led_5.x, this.led_5.y);
            this.line_buffer[this.indexer++] = Array(this.led_1.x, this.led_1.y, this.led_7.x, this.led_7.y);
            this.line_buffer[this.indexer++] = Array(this.led_3.x, this.led_3.y, this.led_9.x, this.led_9.y);
            this.line_buffer[this.indexer++] = Array(this.led_3.x, this.led_3.y, this.led_11.x, this.led_11.y);
            canvas.draw_line_buffer(this.line_buffer, this.line_paint);
            this.indexer = 0;
            this.circle_buffer[this.indexer++] = Array(this.p1.x, this.p1.y, global.variables.canvas_stroke_width_2_zoom);
            this.circle_buffer[this.indexer++] = Array(this.p2.x, this.p2.y, global.variables.canvas_stroke_width_2_zoom);
            canvas.draw_circle_buffer(this.circle_buffer, this.point_paint);
            if (global.CONSTANTS.DEVELOPER_MODE) {
                canvas.draw_rect2(this.bounds, this.line_paint);
            }
            if (global.variables.workspace_zoom_scale > 1.085 || (!MOBILE_MODE && global.variables.workspace_zoom_scale >= 0.99)) {
                this.angle = global.utils.retrieve_angle(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
                if (this.angle > 170 && this.angle < 190) {
                    canvas.draw_text(global.TEMPLATES.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', this.elm.id), this.c_x, this.bounds.top + this.bounds.get_height() * 0.1, this.text_paint);
                }
                else if (this.angle > -10 && this.angle < 10) {
                    canvas.draw_text(global.TEMPLATES.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', this.elm.id), this.c_x, this.bounds.bottom - this.bounds.get_height() * 0.1, this.text_paint);
                }
                else if (this.angle > 260 && this.angle < 280) {
                    canvas.rotate(this.c_x, this.c_y, -90);
                    canvas.draw_text(global.TEMPLATES.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', this.elm.id), this.c_x, this.bounds.bottom - this.bounds.get_height() * 0.1, this.text_paint);
                    canvas.restore();
                }
                else if (this.angle > 80 && this.angle < 100) {
                    canvas.rotate(this.c_x, this.c_y, -90);
                    canvas.draw_text(global.TEMPLATES.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', this.elm.id), this.c_x, this.bounds.top + this.bounds.get_height() * 0.1, this.text_paint);
                    canvas.restore();
                }
            }
            if (!MOBILE_MODE) {
                if (global.variables.wire_builder['step'] === 0 &&
                    this.bounds.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, this.bounds.get_width() * 1.25, this.bounds.get_height() * 1.25) &&
                    global.CONSTANTS.NODE_HINTS &&
                    !multi_select_manager.multi_select &&
                    !this.multi_selected &&
                    !global.flags.flag_add_element &&
                    !global.flags.flag_history_lock &&
                    !global.flags.flag_picture_request &&
                    !global.flags.flag_save_circuit &&
                    !global.flags.flag_save_image &&
                    !global.flags.flag_menu_element_toolbox &&
                    !global.flags.flag_select_timestep &&
                    !global.flags.flag_element_options &&
                    !global.flags.flag_element_options_edit &&
                    !global.flags.flag_zoom &&
                    !global.flags.flag_graph &&
                    !global.flags.flag_simulating &&
                    !global.flags.flag_select_settings &&
                    !global.flags.flag_select_element &&
                    !global.flags.flag_remove_all &&
                    !global.flags.flag_add_element &&
                    !global.variables.is_dragging) {
                    if (this.elm.consistent()) {
                        this.node_id_array = this.elm.get_nodes();
                        for (var i = 0; i < this.node_id_array.length; i++) {
                            canvas.draw_rect2(nodes[this.node_id_array[i]].get_bounds(), this.line_paint);
                        }
                    }
                }
            }
            if (this.is_translating) {
                canvas.draw_rect3(this.bounds.get_center_x(), this.bounds.get_center_y(), global.variables.node_space_x << 2, global.variables.node_space_y << 2, global.variables.move_paint);
            }
        }
    }
    patch() {
        if (!global.utils.not_null(this.gmin)) {
            this.gmin = 1e-9;
        }
        if (!global.utils.not_null(this.gmin_start)) {
            this.gmin_start = 12;
        }
        if (!global.utils.not_null(this.gamma)) {
            this.gamma = 0.8;
        }
        if (!global.utils.not_null(this.kappa)) {
            this.kappa = 0.414;
        }
        if (!global.utils.not_null(this.line_buffer)) {
            this.line_buffer = [];
        }
        if (!global.utils.not_null(this.circle_buffer)) {
            this.circle_buffer = [];
        }
        if (!global.utils.not_null(this.build_element_flag)) {
            this.build_element_flag = false;
        }
        if (!global.utils.not_null(this.angle)) {
            this.angle = 0;
        }
        if (!global.utils.not_null(this.indexer)) {
            this.indexer = 0;
        }
        if (!global.utils.not_null(this.initialized)) {
            this.initialized = false;
        }
        if (!global.utils.not_null(this.multi_selected)) {
            this.multi_selected = false;
        }
        if (!global.utils.not_null(this.damping_safety_factor)) {
            this.damping_safety_factor = 0.97;
        }
        if (!global.utils.not_null(this.led_status)) {
            this.led_status = global.CONSTANTS.OFF;
        }
        if (this.gmin !== 1e-9) {
            this.gmin = 1e-9;
        }
        if (this.gmin_start !== 12) {
            this.gmin_start = 12;
        }
        if (this.gamma !== 0.8) {
            this.gamma = 0.8;
        }
        if (this.kappa !== 0.414) {
            this.kappa = 0.414;
        }
    }
    reset() {
        this.elm.properties['Voltage'] = 0;
        this.elm.properties['Last Voltage'] = this.calculate_vcrit();
        this.elm.properties['Last Current'] = global.settings.TOLERANCE * 2;
        this.elm.properties['Resistance'] = global.settings.R_MAX;
        this.elm.properties['Equivalent Current'] = 0;
        this.led_status = global.CONSTANTS.OFF;
        this.update();
    }
}
