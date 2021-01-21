'use strict';
class WattMeter {
    constructor(type, id, n1, n2, n3) {
        this.INITIALIZED = false;
        this.X_AXIS_LENGTH = 600;
        this.Y_AXIS_LENGTH = 100;
        this.RATIO = 0.75;
        this.bounds = new RectF(0, 0, 0, 0);
        this.trace_bounds = new RectF(0, 0, 0, 0);
        this.meter_trace = new Trace(this.X_AXIS_LENGTH, this.Y_AXIS_LENGTH, this.RATIO);
        this.meter_trace.set_color(global.TRACE_DEFAULT_COLOR);
        this.elm = new Element3(id, type, global.copy(global.PROPERTY_WATTMETER));
        this.elm.set_nodes(n1, n2, n3);
        if (this.elm.consistent()) {
            this.equilateral_center = global.equilateral_triangle_center(nodes[this.elm.n1].location.x, nodes[this.elm.n2].location.x, nodes[this.elm.n3].location.x, nodes[this.elm.n1].location.y, nodes[this.elm.n2].location.y, nodes[this.elm.n3].location.y);
            this.bounds.set_center2(this.equilateral_center[0], this.equilateral_center[1], global.node_space_x * 2, global.node_space_y * 2);
            this.trace_bounds.set_bounds(this.c_x - global.node_space_x, this.c_y - 2 * global.node_space_y, this.c_x + global.node_space_x, this.c_y - 1 * global.node_space_y);
            this.meter_trace.update_parameters(this.trace_bounds, this.RATIO, this.trace_bounds.get_width(), this.trace_bounds.get_height(), 0);
        }
        this.elm.set_rotation(global.ROTATION_0);
        this.elm.set_flip(global.FLIP_0);
        this.release_nodes();
        let vertices = this.get_vertices();
        this.elm.map_node3(vertices[0], vertices[1], vertices[2], vertices[3], vertices[4], vertices[5]);
        this.capture_nodes();
        this.plus_point = new PointF(0, 0);
        this.p1 = new PointF(0, 0);
        this.p2 = new PointF(0, 0);
        this.p3 = new PointF(0, 0);
        if (this.elm.consistent()) {
            this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
            this.p2.set_point(nodes[this.elm.n2].location.x, nodes[this.elm.n2].location.y);
            this.p3.set_point(nodes[this.elm.n3].location.x, nodes[this.elm.n3].location.y);
        }
        this.wattmeter_0 = new PointF(0, 0);
        this.wattmeter_1 = new PointF(0, 0);
        this.wattmeter_2 = new PointF(0, 0);
        this.wattmeter_3 = new PointF(0, 0);
        this.wattmeter_4 = new PointF(0, 0);
        this.wattmeter_5 = new PointF(0, 0);
        this.wattmeter_6 = new PointF(0, 0);
        this.equilateral_center = [];
        this.c_x = this.bounds.get_center_x();
        this.c_y = this.bounds.get_center_y();
        this.x_space = global.node_space_x >> 1;
        this.y_space = global.node_space_y >> 1;
        this.connect1_x = 0;
        this.connect1_y = 0;
        this.connect2_x = 0;
        this.connect2_y = 0;
        if (this.elm.flip === global.FLIP_0) {
            this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
        }
        else if (this.elm.flip === global.FLIP_180) {
            this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) + global.PI_DIV_2;
        }
        else {
            this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
        }
        this.theta = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
        this.phi = global.retrieve_angle_radian(this.c_x - this.p2.x, this.c_y - this.p2.y);
        this.grid_point = [];
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(this.line_paint.style.STROKE);
        this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
        this.line_paint.set_paint_join(this.line_paint.join.MITER);
        this.line_paint.set_stroke_width(global.canvas_stroke_width_1_zoom);
        this.line_paint.set_color(global.ELEMENT_COLOR);
        this.line_paint.set_text_size(global.canvas_text_size_3_zoom);
        this.line_paint.set_font(global.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(this.line_paint.align.CENTER);
        this.point_paint = new Paint();
        this.point_paint.set_paint_style(this.point_paint.style.FILL);
        this.point_paint.set_paint_cap(this.point_paint.cap.ROUND);
        this.point_paint.set_paint_join(this.point_paint.join.MITER);
        this.point_paint.set_stroke_width(global.canvas_stroke_width_1_zoom);
        this.point_paint.set_color(global.ELEMENT_COLOR);
        this.point_paint.set_text_size(global.canvas_text_size_3_zoom);
        this.point_paint.set_font(global.DEFAULT_FONT);
        this.point_paint.set_alpha(255);
        this.point_paint.set_paint_align(this.point_paint.align.CENTER);
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(this.text_paint.style.FILL);
        this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
        this.text_paint.set_paint_join(this.text_paint.join.MITER);
        this.text_paint.set_stroke_width(global.canvas_stroke_width_1_zoom);
        this.text_paint.set_color(global.ELEMENT_COLOR);
        this.text_paint.set_text_size(global.canvas_text_size_3_zoom);
        this.text_paint.set_font(global.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(this.text_paint.align.CENTER);
        this.is_translating = false;
        this.meter_symbol = new MeterSymbols();
        this.meter_symbol.reset(this.meter_symbol.METER_POWER, this.meter_symbol.STYLE_0);
        this.meter_symbol.set_bounds(this.bounds.left + this.bounds.get_width() * 0.4, this.bounds.top + this.bounds.get_height() * 0.4, this.bounds.right - this.bounds.get_width() * 0.4, this.bounds.bottom - this.bounds.get_height() * 0.4);
        this.meter_symbol.set_color(global.ELEMENT_COLOR);
        this.temp_color = global.GENERAL_RED_COLOR;
        this.build_element();
        this.RESIZE_METER_TRACE = false;
        this.SCOPE_INDEX_CHECK = -1;
        this.wire_reference = [];
        this.simulation_id = 0;
        this.indexer = 0;
        this.m_x = 0;
        this.m_y = 0;
        this.INITIALIZED = true;
        this.MULTI_SELECTED = false;
        this.line_buffer = [];
        this.circle_buffer = [];
        this.BUILD_ELEMENT = true;
        this.ANGLE = 0;
    }
    refresh_bounds() {
        if (this.elm.consistent()) {
            this.p1 = new PointF(0, 0);
            this.p2 = new PointF(0, 0);
            this.p3 = new PointF(0, 0);
            this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
            this.p2.set_point(nodes[this.elm.n2].location.x, nodes[this.elm.n2].location.y);
            this.p3.set_point(nodes[this.elm.n3].location.x, nodes[this.elm.n3].location.y);
            this.equilateral_center = global.equilateral_triangle_center(nodes[this.elm.n1].location.x, nodes[this.elm.n2].location.x, nodes[this.elm.n3].location.x, nodes[this.elm.n1].location.y, nodes[this.elm.n2].location.y, nodes[this.elm.n3].location.y);
            this.bounds.set_center2(this.equilateral_center[0], this.equilateral_center[1], global.node_space_x * 2, global.node_space_y * 2);
            this.trace_bounds.set_bounds(this.c_x - global.node_space_x, this.c_y - 2 * global.node_space_y, this.c_x + global.node_space_x, this.c_y - 1 * global.node_space_y);
            this.meter_trace.update_parameters(this.trace_bounds, this.RATIO, this.trace_bounds.get_width(), this.trace_bounds.get_height(), 0);
        }
    }
    push_reference(ref) {
        this.wire_reference.push(ref);
    }
    update() {
        if (global.flag_simulating && simulation_manager.SOLUTIONS_READY && simulation_manager.SIMULATION_STEP !== 0) {
            if (this.elm.consistent()) {
            }
        }
    }
    stamp() {
        if (this.elm.consistent()) {
            engine_functions.stamp_resistor(this.elm.n1, this.elm.n2, global.settings.WIRE_RESISTANCE);
            engine_functions.stamp_voltage(this.elm.n3, -1, this.elm.properties['Wattage'], simulation_manager.ELEMENT_WATTMETER_OFFSET + this.simulation_id);
        }
    }
    get_vertices() {
        let vertices = [];
        let p1 = [];
        let p2 = [];
        let p3 = [];
        if (this.elm.rotation === global.ROTATION_0) {
            if (this.elm.flip === global.FLIP_0) {
                p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
                p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
                p3 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
            }
            else if (this.elm.flip === global.FLIP_180) {
                p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
                p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
                p3 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
            }
            else {
                p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
                p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
                p3 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
            }
            vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
        }
        else if (this.elm.rotation === global.ROTATION_90) {
            if (this.elm.flip === global.FLIP_0) {
                p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
                p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
                p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.bottom);
            }
            else if (this.elm.flip === global.FLIP_180) {
                p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
                p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
                p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.bottom);
            }
            else {
                p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
                p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
                p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.bottom);
            }
            vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
        }
        else if (this.elm.rotation === global.ROTATION_180) {
            if (this.elm.flip === global.FLIP_0) {
                p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
                p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
                p3 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
            }
            else if (this.elm.flip === global.FLIP_180) {
                p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
                p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
                p3 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
            }
            else {
                p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
                p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
                p3 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
            }
            vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
        }
        else if (this.elm.rotation === global.ROTATION_270) {
            if (this.elm.flip === global.FLIP_0) {
                p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
                p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
                p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.top);
            }
            else if (this.elm.flip === global.FLIP_180) {
                p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
                p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
                p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.top);
            }
            else {
                p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
                p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
                p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.top);
            }
            vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
        }
        else {
            if (this.elm.flip === global.FLIP_0) {
                p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
                p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
                p3 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
            }
            else if (this.elm.flip === global.FLIP_180) {
                p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
                p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
                p3 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
            }
            else {
                p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
                p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
                p3 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
            }
            vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
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
            nodes[this.elm.n3].remove_reference(this.elm.id, this.elm.type);
            this.elm.set_nodes(-1, -1, -1);
        }
    }
    capture_nodes() {
        let vertices = this.get_vertices();
        this.elm.map_node3(vertices[0], vertices[1], vertices[2], vertices[3], vertices[4], vertices[5]);
        if (this.elm.consistent() && !this.is_translating) {
            nodes[this.elm.n1].add_reference(this.elm.id, this.elm.type);
            nodes[this.elm.n2].add_reference(this.elm.id, this.elm.type);
            nodes[this.elm.n3].add_reference(this.elm.id, this.elm.type);
        }
    }
    mouse_down() {
        if (global.flag_idle &&
            !global.flag_save_image &&
            !global.flag_save_circuit &&
            !global.flag_zoom &&
            !global.flag_element_options &&
            !global.flag_element_options_edit &&
            !global.flag_select_element &&
            !global.flag_select_timestep &&
            !global.flag_select_settings &&
            !global.flag_remove_all &&
            !global.flag_menu_element_toolbox) {
            if (!global.focused && !global.component_touched && !global.multi_selected) {
                if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, this.bounds.get_width() >> 1, this.bounds.get_height() >> 1) && !global.component_touched) {
                    this.is_translating = false;
                    global.focused_id = this.elm.id;
                    global.focused_type = this.elm.type;
                    global.focused_bounds = global.copy(this.bounds);
                    global.focused = true;
                    global.component_touched = true;
                }
                else {
                    if (this.elm.consistent() && !global.component_touched && !global.flag_simulating) {
                        if (nodes[this.elm.n1].contains_xy(global.mouse_x, global.mouse_y)) {
                            this.handle_wire_builder(this.elm.n1, global.ANCHOR_POINT['p1']);
                            global.component_touched = true;
                        }
                        else if (nodes[this.elm.n2].contains_xy(global.mouse_x, global.mouse_y)) {
                            this.handle_wire_builder(this.elm.n2, global.ANCHOR_POINT['p2']);
                            global.component_touched = true;
                        }
                        else if (nodes[this.elm.n3].contains_xy(global.mouse_x, global.mouse_y)) {
                            this.handle_wire_builder(this.elm.n3, global.ANCHOR_POINT['p3']);
                            global.component_touched = true;
                        }
                    }
                }
            }
        }
    }
    handle_wire_builder(n, anchor) {
        if (global.WIRE_BUILDER['step'] === 0) {
            global.WIRE_BUILDER['n1'] = n;
            global.WIRE_BUILDER['type1'] = this.elm.type;
            global.WIRE_BUILDER['id1'] = this.elm.id;
            global.WIRE_BUILDER['anchor_point1'] = anchor;
            global.WIRE_BUILDER['linkage1']['wire'] = global.WIRE_BUILDER['step'];
            global.WIRE_BUILDER['step']++;
        }
        else if (global.WIRE_BUILDER['step'] === 1) {
            global.WIRE_BUILDER['n2'] = n;
            global.WIRE_BUILDER['type2'] = this.elm.type;
            global.WIRE_BUILDER['id2'] = this.elm.id;
            global.WIRE_BUILDER['anchor_point2'] = anchor;
            global.WIRE_BUILDER['linkage2']['wire'] = global.WIRE_BUILDER['step'];
            global.WIRE_BUILDER['step']++;
        }
    }
    move_element(dx, dy) {
        wire_manager.reset_wire_builder();
        this.unanchor_wires();
        this.release_nodes();
        this.m_x = this.c_x + dx;
        this.m_y = this.c_y + dy;
        if (this.m_x < workspace.bounds.left + 2.5 * global.node_space_x) {
            this.m_x = workspace.bounds.left + 2.5 * global.node_space_x;
        }
        else if (this.m_x > workspace.bounds.right - 2.0 * global.node_space_x) {
            this.m_x = workspace.bounds.right - 2.0 * global.node_space_x;
        }
        if (this.m_y < workspace.bounds.top + 2.5 * global.node_space_y) {
            this.m_y = workspace.bounds.top + 2.5 * global.node_space_y;
        }
        else if (this.m_y > workspace.bounds.bottom - 2.0 * global.node_space_y) {
            this.m_y = workspace.bounds.bottom - 2.0 * global.node_space_y;
        }
        this.grid_point = this.elm.snap_to_grid(this.m_x, this.m_y);
        this.bounds.set_center(this.grid_point[0], this.grid_point[1]);
        this.refactor();
        this.capture_nodes();
        this.anchor_wires();
    }
    reset_trace_path() {
        if (global.not_null(this.meter_trace)) {
            this.meter_trace.trace_path.reset();
        }
    }
    mouse_move() {
        if (global.flag_idle && !global.flag_simulating) {
            if (global.focused) {
                if (global.focused_id === this.elm.id && global.focused_type === this.elm.type) {
                    global.is_dragging = false;
                    if (!this.is_translating) {
                        if (!this.bounds.contains_xywh(global.mouse_x, global.mouse_y, this.bounds.get_width() >> 1, this.bounds.get_height() >> 1)) {
                            this.release_nodes();
                            this.bounds.anchored = false;
                            this.is_translating = true;
                            global.component_translating = true;
                            this.select();
                        }
                    }
                    else {
                        this.m_x = global.mouse_x;
                        this.m_y = global.mouse_y;
                        if (this.m_x < workspace.bounds.left + 2.5 * global.node_space_x) {
                            this.m_x = workspace.bounds.left + 2.5 * global.node_space_x;
                        }
                        else if (this.m_x > workspace.bounds.right - 2.0 * global.node_space_x) {
                            this.m_x = workspace.bounds.right - 2.0 * global.node_space_x;
                        }
                        if (this.m_y < workspace.bounds.top + 2.5 * global.node_space_y) {
                            this.m_y = workspace.bounds.top + 2.5 * global.node_space_y;
                        }
                        else if (this.m_y > workspace.bounds.bottom - 2.0 * global.node_space_y) {
                            this.m_y = workspace.bounds.bottom - 2.0 * global.node_space_y;
                        }
                        this.grid_point = this.elm.snap_to_grid(this.m_x, this.m_y);
                        wire_manager.reset_wire_builder();
                        this.bounds.set_center(this.grid_point[0], this.grid_point[1]);
                        this.unanchor_wires();
                        this.trace_bounds.set_bounds(this.c_x - global.node_space_x, this.c_y - 2 * global.node_space_y, this.c_x + global.node_space_x, this.c_y - 1 * global.node_space_y);
                        this.meter_trace.update_parameters(this.trace_bounds, this.RATIO, this.trace_bounds.get_width(), this.trace_bounds.get_height(), 0);
                        this.RESIZE_METER_TRACE = true;
                        this.BUILD_ELEMENT = true;
                    }
                }
            }
        }
    }
    mouse_up() {
        if (global.flag_idle) {
            if (global.focused && global.focused_id === this.elm.id && global.focused_type === this.elm.type) {
                if (this.is_translating) {
                    this.is_translating = false;
                    this.capture_nodes();
                    this.push_history();
                    this.bounds.anchored = true;
                    this.anchor_wires();
                }
                else {
                    if (!global.selected) {
                        this.select();
                    }
                    else {
                        if (global.selected_id === this.elm.id && global.selected_type === this.elm.type) {
                            global.selected_id = global.NULL;
                            global.selected_type = -1;
                            global.selected_bounds = global.NULL;
                            global.selected_properties = global.NULL;
                            global.selected_wire_style = global.NULL;
                            global.selected = false;
                        }
                        else {
                            this.select();
                        }
                    }
                }
                global.focused_id = global.NULL;
                global.focused_type = global.NULL;
                global.focused_bounds = global.NULL;
                global.focused = false;
            }
            if (global.selected_id === this.elm.id && global.selected_type === this.elm.type) {
                global.selected_bounds = global.copy(this.bounds);
            }
        }
    }
    select() {
        if (global.WIRE_BUILDER['step'] !== 0) {
            wire_manager.reset_wire_builder();
        }
        global.selected_id = this.elm.id;
        global.selected_type = this.elm.type;
        global.selected_bounds = global.copy(this.bounds);
        global.selected_properties = global.copy(this.elm.properties);
        global.selected_wire_style = global.NULL;
        global.selected = true;
    }
    remove_focus() {
        if (global.focused && global.focused_id === this.elm.id && global.focused_type === this.elm.type) {
            global.focused_id = global.NULL;
            global.focused_type = global.NULL;
            global.focused_bounds = global.NULL;
            global.focused = false;
        }
    }
    remove_selection() {
        if (global.selected_id === this.elm.id && global.selected_type === this.elm.type) {
            global.selected_id = global.NULL;
            global.selected_type = -1;
            global.selected_bounds = global.NULL;
            global.selected_properties = global.NULL;
            global.selected_wire_style = global.NULL;
            global.selected = false;
        }
    }
    wire_reference_maintenance() {
        if (this.wire_reference.length > 0 && global.signal_wire_deleted) {
            let id = -1;
            for (var i = this.wire_reference.length - 1; i > -1; i--) {
                id = engine_functions.get_wire(this.wire_reference[i]['wire_id']);
                if (!(id > -1 && id < wires.length)) {
                    this.wire_reference.splice(i, 1);
                }
            }
        }
    }
    unanchor_wires() {
        if (this.wire_reference.length > 0) {
            let vertices = this.get_vertices();
            let id = -1;
            for (var i = this.wire_reference.length - 1; i > -1; i--) {
                id = engine_functions.get_wire(this.wire_reference[i]['wire_id']);
                if (id > -1 && id < wires.length) {
                    if (this.wire_reference[i]['anchor_point'] === global.ANCHOR_POINT['p1']) {
                        wires[id].release_nodes();
                        if (this.wire_reference[i]['linkage'] === 0) {
                            wires[id].p1.x = vertices[0];
                            wires[id].p1.y = vertices[1];
                        }
                        else if (this.wire_reference[i]['linkage'] === 1) {
                            wires[id].p2.y = vertices[1];
                            wires[id].p2.x = vertices[0];
                        }
                    }
                    else if (this.wire_reference[i]['anchor_point'] === global.ANCHOR_POINT['p2']) {
                        wires[id].release_nodes();
                        if (this.wire_reference[i]['linkage'] === 0) {
                            wires[id].p1.x = vertices[2];
                            wires[id].p1.y = vertices[3];
                        }
                        else if (this.wire_reference[i]['linkage'] === 1) {
                            wires[id].p2.x = vertices[2];
                            wires[id].p2.y = vertices[3];
                        }
                    }
                    else if (this.wire_reference[i]['anchor_point'] === global.ANCHOR_POINT['p3']) {
                        wires[id].release_nodes();
                        if (this.wire_reference[i]['linkage'] === 0) {
                            wires[id].p1.x = vertices[4];
                            wires[id].p1.y = vertices[5];
                        }
                        else if (this.wire_reference[i]['linkage'] === 1) {
                            wires[id].p2.x = vertices[4];
                            wires[id].p2.y = vertices[5];
                        }
                    }
                }
                else {
                    this.wire_reference.splice(i, 1);
                }
            }
        }
    }
    anchor_wires() {
        if (this.wire_reference.length > 0) {
            let vertices = this.get_vertices();
            let id = -1;
            for (var i = this.wire_reference.length - 1; i > -1; i--) {
                id = engine_functions.get_wire(this.wire_reference[i]['wire_id']);
                if (id > -1 && id < wires.length) {
                    if (this.wire_reference[i]['anchor_point'] === global.ANCHOR_POINT['p1']) {
                        if (this.wire_reference[i]['linkage'] === 0) {
                            wires[id].p1.x = vertices[0];
                            wires[id].p1.y = vertices[1];
                        }
                        else if (this.wire_reference[i]['linkage'] === 1) {
                            wires[id].p2.x = vertices[0];
                            wires[id].p2.y = vertices[1];
                        }
                        wires[id].capture_nodes();
                    }
                    else if (this.wire_reference[i]['anchor_point'] === global.ANCHOR_POINT['p2']) {
                        if (this.wire_reference[i]['linkage'] === 0) {
                            wires[id].p1.x = vertices[2];
                            wires[id].p1.y = vertices[3];
                        }
                        else if (this.wire_reference[i]['linkage'] === 1) {
                            wires[id].p2.x = vertices[2];
                            wires[id].p2.y = vertices[3];
                        }
                        wires[id].capture_nodes();
                    }
                    else if (this.wire_reference[i]['anchor_point'] === global.ANCHOR_POINT['p3']) {
                        if (this.wire_reference[i]['linkage'] === 0) {
                            wires[id].p1.x = vertices[4];
                            wires[id].p1.y = vertices[5];
                        }
                        else if (this.wire_reference[i]['linkage'] === 1) {
                            wires[id].p2.x = vertices[4];
                            wires[id].p2.y = vertices[5];
                        }
                        wires[id].capture_nodes();
                    }
                }
                else {
                    this.wire_reference.splice(i, 1);
                }
            }
        }
    }
    set_flip(flip) {
        this.BUILD_ELEMENT = true;
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
        this.BUILD_ELEMENT = true;
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
        if (this.INITIALIZED) {
            global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
        }
    }
    build_element() {
        if (this.BUILD_ELEMENT || global.signal_build_element) {
            let cache_0 = 1.5 * this.x_space;
            let cache_1 = 1.414 * this.x_space;
            let cache_2 = 1.5 * this.y_space;
            let cache_3 = 1.414 * this.y_space;
            let cache_4 = 2.0 * this.x_space;
            let cache_5 = 2.0 * this.y_space;
            let cache_6 = 0.75 * this.x_space;
            let cache_7 = 0.75 * this.y_space;
            let cache_8 = this.x_space;
            let cache_9 = this.y_space;
            this.plus_point.x = this.c_x - cache_0 * global.cosine(this.theta) - cache_1 * global.cosine(this.theta_m90);
            this.plus_point.y = this.c_y - cache_2 * global.sine(this.theta) - cache_3 * global.sine(this.theta_m90);
            this.wattmeter_0.x = this.p1.x + cache_4 * global.cosine(this.theta_m90);
            this.wattmeter_0.y = this.p1.y + cache_5 * global.sine(this.theta_m90);
            this.wattmeter_1.x = this.wattmeter_0.x + cache_8 * global.cosine(this.theta);
            this.wattmeter_1.y = this.wattmeter_0.y + cache_9 * global.sine(this.theta);
            this.wattmeter_2.x = this.wattmeter_1.x + cache_6 * global.cosine(this.theta - Math.PI);
            this.wattmeter_2.y = this.wattmeter_1.y + cache_7 * global.sine(this.theta - Math.PI);
            this.wattmeter_3.x = this.p2.x + cache_4 * global.cosine(this.theta_m90);
            this.wattmeter_3.y = this.p2.y + cache_5 * global.sine(this.theta_m90);
            this.wattmeter_4.x = this.wattmeter_3.x - cache_8 * global.cosine(this.theta);
            this.wattmeter_4.y = this.wattmeter_3.y - cache_9 * global.sine(this.theta);
            this.wattmeter_5.x = this.wattmeter_4.x + cache_6 * global.cosine(this.theta);
            this.wattmeter_5.y = this.wattmeter_4.y + cache_7 * global.sine(this.theta);
            this.wattmeter_6.x = this.p3.x - cache_8 * global.cosine(this.theta_m90);
            this.wattmeter_6.y = this.p3.y - cache_9 * global.sine(this.theta_m90);
            this.meter_symbol.set_bounds(this.bounds.left + this.bounds.get_width() * 0.4, this.bounds.top + this.bounds.get_height() * 0.4, this.bounds.right - this.bounds.get_width() * 0.4, this.bounds.bottom - this.bounds.get_height() * 0.4);
            this.meter_symbol.resize_symbol(this.meter_symbol.STYLE_0);
            this.BUILD_ELEMENT = false;
        }
    }
    resize() {
        if (this.BUILD_ELEMENT || global.signal_build_element || this.RESIZE_METER_TRACE) {
            if (this.bounds.anchored) {
                if (this.elm.consistent()) {
                    this.equilateral_center = global.equilateral_triangle_center(nodes[this.elm.n1].location.x, nodes[this.elm.n2].location.x, nodes[this.elm.n3].location.x, nodes[this.elm.n1].location.y, nodes[this.elm.n2].location.y, nodes[this.elm.n3].location.y);
                    this.bounds.set_center2(this.equilateral_center[0], this.equilateral_center[1], global.node_space_x * 2, global.node_space_y * 2);
                    this.refactor();
                    this.trace_bounds.set_bounds(this.c_x - global.node_space_x, this.c_y - 2 * global.node_space_y, this.c_x + global.node_space_x, this.c_y - global.node_space_y);
                    this.meter_trace.update_parameters(this.trace_bounds, this.RATIO, this.trace_bounds.get_width(), this.trace_bounds.get_height(), 0);
                }
                this.unanchor_wires();
                this.anchor_wires();
                if (this.RESIZE_METER_TRACE) {
                    this.meter_trace.resize_trace();
                    this.RESIZE_METER_TRACE = false;
                }
            }
            else {
                this.refactor();
            }
            this.line_paint.set_stroke_width(global.canvas_stroke_width_1_zoom);
            this.line_paint.set_text_size(global.canvas_text_size_3_zoom);
            this.point_paint.set_stroke_width(global.canvas_stroke_width_1_zoom);
            this.point_paint.set_text_size(global.canvas_text_size_3_zoom);
            this.text_paint.set_stroke_width(global.canvas_stroke_width_1_zoom);
            this.text_paint.set_text_size(global.canvas_text_size_3_zoom);
        }
    }
    refactor() {
        let vertices = this.get_vertices();
        this.p1.x = vertices[0];
        this.p1.y = vertices[1];
        this.p2.x = vertices[2];
        this.p2.y = vertices[3];
        this.p3.x = vertices[4];
        this.p3.y = vertices[5];
        this.x_space = global.node_space_x >> 1;
        this.y_space = global.node_space_y >> 1;
        this.c_x = this.bounds.get_center_x();
        this.c_y = this.bounds.get_center_y();
        if (this.elm.flip === global.FLIP_0) {
            this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
        }
        else if (this.elm.flip === global.FLIP_180) {
            this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) + global.PI_DIV_2;
        }
        else {
            this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
        }
        this.theta = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
        this.phi = global.retrieve_angle_radian(this.c_x - this.p2.x, this.c_y - this.p2.y);
        this.build_element();
    }
    increment_rotation() {
        this.elm.rotation++;
        if (this.elm.rotation > global.ROTATION_270) {
            this.elm.rotation = global.ROTATION_0;
        }
        this.set_rotation(this.elm.rotation);
    }
    increment_flip() {
        this.elm.flip++;
        if (this.elm.flip > global.FLIP_180) {
            this.elm.flip = global.FLIP_0;
        }
        this.set_flip(this.elm.flip);
    }
    reset_trace() {
        this.meter_trace.reset();
    }
    reset_meter() {
        this.elm.properties['Wattage'] = 0;
    }
    push_voltage(v1, v2) {
        if (global.flag_simulating && global.simulation_time >= global.time_step + global.time_step + global.time_step && simulation_manager.SOLUTIONS_READY) {
            let curr = (v1 - v2) / global.settings.WIRE_RESISTANCE;
            let voltage = Math.max(v1, v2);
            let power = curr * voltage;
            this.elm.properties['Wattage'] = power;
            this.meter_trace.push(power, global.simulation_time);
        }
    }
    get_simulation_index() {
        return simulation_manager.NODE_SIZE + simulation_manager.ELEMENT_WATTMETER_OFFSET + this.simulation_id;
    }
    recolor() {
        if (global.selected) {
            if (global.selected_id === this.elm.id && global.selected_type === this.elm.type) {
                this.line_paint.set_color(global.SELECTED_COLOR);
                this.point_paint.set_color(global.SELECTED_COLOR);
                this.text_paint.set_color(global.SELECTED_COLOR);
                this.meter_symbol.set_color(global.SELECTED_COLOR);
            }
            else {
                this.line_paint.set_color(global.ELEMENT_COLOR);
                this.point_paint.set_color(global.ELEMENT_COLOR);
                this.text_paint.set_color(global.ELEMENT_COLOR);
                this.meter_symbol.set_color(global.ELEMENT_COLOR);
            }
        }
        else {
            if (this.MULTI_SELECTED) {
                this.line_paint.set_color(global.MULTI_SELECTED_COLOR);
                this.point_paint.set_color(global.MULTI_SELECTED_COLOR);
                this.text_paint.set_color(global.MULTI_SELECTED_COLOR);
                this.meter_symbol.set_color(global.MULTI_SELECTED_COLOR);
            }
            else {
                this.line_paint.set_color(global.ELEMENT_COLOR);
                this.point_paint.set_color(global.ELEMENT_COLOR);
                this.text_paint.set_color(global.ELEMENT_COLOR);
                this.meter_symbol.set_color(global.ELEMENT_COLOR);
            }
        }
        this.SCOPE_INDEX_CHECK = scope_manager.find_entry_index(this.elm.id, this.elm.type);
        if (this.SCOPE_INDEX_CHECK > -1) {
            if (this.SCOPE_INDEX_CHECK === graph_window.SCOPE_0_INDEX) {
                this.meter_trace.set_color(global.TRACE_I_COLOR);
            }
            else if (this.SCOPE_INDEX_CHECK === graph_window.SCOPE_1_INDEX) {
                this.meter_trace.set_color(global.TRACE_II_COLOR);
            }
            else if (this.SCOPE_INDEX_CHECK === graph_window.SCOPE_2_INDEX) {
                this.meter_trace.set_color(global.TRACE_III_COLOR);
            }
            else {
                this.meter_trace.set_color(global.TRACE_DEFAULT_COLOR);
            }
        }
        else {
            this.meter_trace.set_color(global.TRACE_DEFAULT_COLOR);
        }
    }
    is_selected_element() {
        return global.selected_id === this.elm.id && global.selected_type === this.elm.type;
    }
    draw_component(canvas) {
        this.wire_reference_maintenance();
        this.recolor();
        this.resize();
        if (this.MULTI_SELECTED) {
            multi_select_manager.determine_enveloping_bounds(this.bounds);
        }
        if (global.picture_request_flag ||
            (this.c_x >= view_port.left - global.node_space_x &&
                this.c_x - global.node_space_x <= view_port.right &&
                this.c_y >= view_port.top + -global.node_space_y &&
                this.c_y - global.node_space_y <= view_port.bottom)) {
            this.indexer = 0;
            this.circle_buffer = [];
            this.line_buffer = [];
            this.line_buffer[this.indexer++] = Array(this.p1.x, this.p1.y, this.wattmeter_0.x, this.wattmeter_0.y);
            this.line_buffer[this.indexer++] = Array(this.wattmeter_0.x, this.wattmeter_0.y, this.wattmeter_1.x, this.wattmeter_1.y);
            this.line_buffer[this.indexer++] = Array(this.p2.x, this.p2.y, this.wattmeter_3.x, this.wattmeter_3.y);
            this.line_buffer[this.indexer++] = Array(this.wattmeter_3.x, this.wattmeter_3.y, this.wattmeter_4.x, this.wattmeter_4.y);
            this.line_buffer[this.indexer++] = Array(this.wattmeter_6.x, this.wattmeter_6.y, this.p3.x, this.p3.y);
            canvas.draw_line_buffer(this.line_buffer, this.line_paint);
            this.indexer = 0;
            canvas.draw_circle(this.bounds.get_center_x(), this.bounds.get_center_y(), this.bounds.get_width() * 0.2631, this.line_paint);
            this.circle_buffer[this.indexer++] = Array(this.p1.x, this.p1.y, global.canvas_stroke_width_2_zoom);
            this.circle_buffer[this.indexer++] = Array(this.p2.x, this.p2.y, global.canvas_stroke_width_2_zoom);
            this.circle_buffer[this.indexer++] = Array(this.p3.x, this.p3.y, global.canvas_stroke_width_2_zoom);
            canvas.draw_circle_buffer(this.circle_buffer, this.point_paint);
            if (global.DEVELOPER_MODE) {
                canvas.draw_rect2(this.bounds, this.line_paint);
                canvas.draw_text(this.wire_reference.length, this.c_x, this.c_y - 50, this.text_paint);
            }
            this.ANGLE = global.retrieve_angle(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
            if ((this.ANGLE > 170 && this.ANGLE < 190) || (this.ANGLE > -10 && this.ANGLE < 10)) {
                canvas.rotate(this.c_x, this.c_y, -90);
                this.meter_symbol.draw_symbol(canvas);
                if (global.workspace_zoom_scale > 1.085 || (!global.MOBILE_MODE && global.workspace_zoom_scale >= 0.99)) {
                    canvas.draw_text(global.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', this.elm.id), this.c_x, this.bounds.bottom + this.bounds.get_height() * 0.2, this.text_paint);
                    if (global.flag_simulating && global.simulation_time >= global.time_step + global.time_step + global.time_step && simulation_manager.SOLUTIONS_READY) {
                        this.text_paint.set_color(global.GENERAL_GREEN_COLOR);
                        canvas.draw_text(global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.exponentiate_quickly(this.elm.properties['Wattage'])).replace('{UNIT}', this.elm.properties['units']), this.c_x, this.bounds.bottom + this.bounds.get_height() * 0.4, this.text_paint);
                        this.text_paint.set_color(global.ELEMENT_COLOR);
                    }
                }
                canvas.restore();
            }
            else if ((this.ANGLE > 260 && this.ANGLE < 280) || (this.ANGLE > 80 && this.ANGLE < 100)) {
                this.meter_symbol.draw_symbol(canvas);
                if (global.workspace_zoom_scale > 1.085 || (!global.MOBILE_MODE && global.workspace_zoom_scale >= 0.99)) {
                    canvas.draw_text(global.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', this.elm.id), this.c_x, this.bounds.bottom + this.bounds.get_height() * 0.2, this.text_paint);
                    if (global.flag_simulating && global.simulation_time >= global.time_step + global.time_step + global.time_step && simulation_manager.SOLUTIONS_READY) {
                        this.text_paint.set_color(global.GENERAL_GREEN_COLOR);
                        canvas.draw_text(global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.exponentiate_quickly(this.elm.properties['Wattage'])).replace('{UNIT}', this.elm.properties['units']), this.c_x, this.bounds.bottom + this.bounds.get_height() * 0.4, this.text_paint);
                        this.recolor();
                    }
                }
            }
            if (!global.MOBILE_MODE) {
                if (global.WIRE_BUILDER['step'] === 0 &&
                    this.bounds.contains_xywh(global.mouse_x, global.mouse_y, this.bounds.get_width() * 1.25, this.bounds.get_height() * 1.25) &&
                    global.NODE_HINTS &&
                    !multi_select_manager.MULTI_SELECT &&
                    !this.MULTI_SELECTED &&
                    !global.signal_add_element &&
                    !global.signal_history_lock &&
                    !global.picture_request_flag &&
                    !global.flag_save_circuit &&
                    !global.flag_save_image &&
                    !global.flag_menu_element_toolbox &&
                    !global.flag_select_timestep &&
                    !global.flag_element_options &&
                    !global.flag_element_options_edit &&
                    !global.flag_zoom &&
                    !global.flag_graph &&
                    !global.flag_simulating &&
                    !global.flag_select_settings &&
                    !global.flag_select_element &&
                    !global.flag_remove_all &&
                    !global.signal_add_element) {
                    if (this.elm.consistent()) {
                        let node_id_array = this.elm.get_nodes();
                        for (var i = 0; i < node_id_array.length; i++) {
                            canvas.draw_rect2(nodes[node_id_array[i]].get_bounds(), this.line_paint);
                        }
                    }
                }
            }
            if (this.is_translating) {
                canvas.draw_rect3(this.bounds.get_center_x(), this.bounds.get_center_y(), global.node_space_x << 2, global.node_space_y << 2, global.move_paint);
            }
        }
    }
    draw_trace(canvas) {
        if (global.flag_simulating) {
            this.meter_trace.draw_trace(canvas, this.bounds.left, 0);
        }
    }
    patch() {
        if (this.elm.properties['Test Voltage'] !== 1e-9) {
            this.elm.properties['Test Voltage'] = 1e-9;
        }
        if (!global.not_null(this.line_buffer)) {
            this.line_buffer = [];
        }
        if (!global.not_null(this.circle_buffer)) {
            this.circle_buffer = [];
        }
        if (!global.not_null(this.BUILD_ELEMENT)) {
            this.BUILD_ELEMENT = false;
        }
        if (!global.not_null(this.ANGLE)) {
            this.ANGLE = 0;
        }
        if (!global.not_null(this.indexer)) {
            this.indexer = 0;
        }
    }
    time_data() {
        /* #INSERT_GENERATE_TIME_DATA# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        let time_data = global.copy(global.TIME_DATA_TEMPLATE);
        let keys = Object.keys(this.elm.properties);
        for (var i = keys.length - 1; i > -1; i--) {
            if (typeof this.elm.properties[keys[i]] === 'number') {
                if (keys[i] === 'Frequency' || keys[i] === 'Resistance' || keys[i] === 'Capacitance' || keys[i] === 'Inductance') {
                    time_data[keys[i]] = global.copy(this.elm.properties[keys[i]]);
                }
            }
        }
        return time_data;
        /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
    reset() {
        this.elm.properties['Wattage'] = 0;
    }
}
