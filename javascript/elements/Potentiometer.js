'use strict';
class Potentiometer {
    constructor(type, id, n1, n2, n3) {
        this.initialized = false;
        this.bounds = new RectF(0, 0, 0, 0);
        this.elm = new Element3(id, type, global.copy(global.PROPERTY_POTENTIOMETER));
        this.elm.set_nodes(n1, n2, n3);
        if (this.elm.consistent()) {
            this.bounds.set_center2(global.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n3].location.x), global.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n3].location.y), global.node_space_x * 2, global.node_space_y * 2);
        }
        this.elm.set_rotation(global.ROTATION_0);
        this.elm.set_flip(global.FLIP_0);
        this.release_nodes();
        let vertices = this.get_vertices();
        this.elm.map_node3(vertices[0], vertices[1], vertices[2], vertices[3], vertices[4], vertices[5]);
        this.capture_nodes();
        this.p1 = new PointF(0, 0);
        this.p2 = new PointF(0, 0);
        this.p3 = new PointF(0, 0);
        if (this.elm.consistent()) {
            this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
            this.p2.set_point(nodes[this.elm.n2].location.x, nodes[this.elm.n2].location.y);
            this.p3.set_point(nodes[this.elm.n3].location.x, nodes[this.elm.n3].location.y);
        }
        this.pot_0 = new PointF(0, 0);
        this.pot_1 = new PointF(0, 0);
        this.pot_2 = new PointF(0, 0);
        this.pot_3 = new PointF(0, 0);
        this.pot_4 = new PointF(0, 0);
        this.pot_5 = new PointF(0, 0);
        this.pot_6 = new PointF(0, 0);
        this.pot_7 = new PointF(0, 0);
        this.pot_8 = new PointF(0, 0);
        this.pot_9 = new PointF(0, 0);
        this.pot_10 = new PointF(0, 0);
        this.pot_11 = new PointF(0, 0);
        this.pot_12 = new PointF(0, 0);
        this.pot_13 = new PointF(0, 0);
        this.c_x = this.bounds.get_center_x();
        this.c_y = this.bounds.get_center_y();
        this.x_space = global.node_space_x >> 1;
        this.y_space = global.node_space_y >> 1;
        this.connect1_x = 0;
        this.connect1_y = 0;
        this.connect2_x = 0;
        this.connect2_y = 0;
        this.theta_m90 = global.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y) - global.PI_DIV_2;
        this.theta = global.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y);
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
        this.build_element();
        this.wire_reference = [];
        this.simulation_id = 0;
        this.indexer = 0;
        this.m_x = 0;
        this.m_y = 0;
        this.initialized = true;
        this.multi_selected = false;
        this.line_buffer = [];
        this.circle_buffer = [];
        this.build_element_flag = true;
        this.angle = 0;
    }
    refresh_bounds() {
        if (this.elm.consistent()) {
            this.p1 = new PointF(0, 0);
            this.p2 = new PointF(0, 0);
            this.p3 = new PointF(0, 0);
            this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
            this.p2.set_point(nodes[this.elm.n2].location.x, nodes[this.elm.n2].location.y);
            this.p3.set_point(nodes[this.elm.n3].location.x, nodes[this.elm.n3].location.y);
            this.bounds.set_center2(global.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n3].location.x), global.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n3].location.y), global.node_space_x * 2, global.node_space_y * 2);
        }
    }
    push_reference(ref) {
        this.wire_reference.push(ref);
    }
    stamp() {
        if (this.elm.consistent()) {
            engine_functions.stamp_resistor(this.elm.n1, this.elm.n2, global.limit(this.elm.properties['Wiper Percentage'], 0.01, 99.99) * 0.01 * this.elm.properties['Resistance']);
            engine_functions.stamp_resistor(this.elm.n2, this.elm.n3, (1 - global.limit(this.elm.properties['Wiper Percentage'], 0.01, 99.99) * 0.01) * this.elm.properties['Resistance']);
        }
    }
    get_vertices() {
        let vertices = [];
        let p1 = [];
        let p2 = [];
        let p3 = [];
        if (this.elm.rotation === global.ROTATION_0) {
            p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
            p2 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.get_center_y() - global.node_space_y);
            p3 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
            vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
        }
        else if (this.elm.rotation === global.ROTATION_90) {
            p1 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.get_center_y() - global.node_space_y);
            p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
            p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.get_center_y() + global.node_space_y);
            vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
        }
        else if (this.elm.rotation === global.ROTATION_180) {
            p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
            p2 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.get_center_y() + global.node_space_y);
            p3 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
            vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
        }
        else if (this.elm.rotation === global.ROTATION_270) {
            p1 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.get_center_y() + global.node_space_y);
            p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
            p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.get_center_y() - global.node_space_y);
            vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
        }
        else {
            p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
            p2 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.get_center_y() - global.node_space_y);
            p3 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
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
        if (global.wire_builder['step'] === 0) {
            global.wire_builder['n1'] = n;
            global.wire_builder['type1'] = this.elm.type;
            global.wire_builder['id1'] = this.elm.id;
            global.wire_builder['anchor_point1'] = anchor;
            global.wire_builder['linkage1']['wire'] = global.wire_builder['step'];
            global.wire_builder['step']++;
        }
        else if (global.wire_builder['step'] === 1) {
            global.wire_builder['n2'] = n;
            global.wire_builder['type2'] = this.elm.type;
            global.wire_builder['id2'] = this.elm.id;
            global.wire_builder['anchor_point2'] = anchor;
            global.wire_builder['linkage2']['wire'] = global.wire_builder['step'];
            global.wire_builder['step']++;
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
                        this.build_element_flag = true;
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
        if (global.wire_builder['step'] !== 0) {
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
            global.history_manager['packet'].push(engine_functions.history_snapshot());
        }
    }
    build_element() {
        if (this.build_element_flag || global.signal_build_element) {
            let cache_0 = 0.66 * this.x_space;
            let cache_1 = 0.66 * this.y_space;
            let cache_2 = 0.33 * this.x_space;
            let cache_3 = 0.33 * this.y_space;
            let cache_4 = 0.667 * this.x_space;
            let cache_5 = 0.667 * this.y_space;
            let cache_6 = 1.682 * this.x_space;
            let cache_7 = 1.682 * this.y_space;
            let cache_8 = 0.4 * this.x_space;
            let cache_9 = 0.4 * this.y_space;
            let cache_10 = this.x_space;
            let cache_11 = this.y_space;
            this.pot_0.x = this.c_x - cache_0 * global.cosine(this.theta) + (cache_10 >> 1) * global.cosine(this.theta_m90);
            this.pot_0.y = this.c_y - cache_1 * global.sine(this.theta) + (cache_11 >> 1) * global.sine(this.theta_m90);
            this.pot_4.x = this.c_x + (cache_10 >> 1) * global.cosine(this.theta_m90);
            this.pot_4.y = this.c_y + (cache_11 >> 1) * global.sine(this.theta_m90);
            this.pot_2.x = this.c_x - cache_2 * global.cosine(this.theta) + (cache_10 >> 1) * global.cosine(Math.PI + this.theta_m90);
            this.pot_2.y = this.c_y - cache_3 * global.sine(this.theta) + (cache_11 >> 1) * global.sine(Math.PI + this.theta_m90);
            this.pot_6.x = this.c_x + cache_2 * global.cosine(this.theta) + (cache_10 >> 1) * global.cosine(Math.PI + this.theta_m90);
            this.pot_6.y = this.c_y + cache_3 * global.sine(this.theta) + (cache_11 >> 1) * global.sine(Math.PI + this.theta_m90);
            this.pot_8.x = this.c_x + cache_0 * global.cosine(this.theta) + (cache_10 >> 1) * global.cosine(this.theta_m90);
            this.pot_8.y = this.c_y + cache_1 * global.sine(this.theta) + (cache_11 >> 1) * global.sine(this.theta_m90);
            this.pot_7.x = this.c_x + cache_10 * global.cosine(this.theta) + cache_4 * global.cosine(this.theta_m90);
            this.pot_7.y = this.c_y + cache_11 * global.sine(this.theta) + cache_5 * global.sine(this.theta_m90);
            this.pot_9.x = this.c_x - cache_10 * global.cosine(this.theta) + cache_4 * global.cosine(this.theta_m90);
            this.pot_9.y = this.c_y - cache_11 * global.sine(this.theta) + cache_5 * global.sine(this.theta_m90);
            this.pot_10.x = this.c_x + cache_10 * global.cosine(this.theta) + cache_4 * global.cosine(Math.PI + this.theta_m90);
            this.pot_10.y = this.c_y + cache_11 * global.sine(this.theta) + cache_5 * global.sine(Math.PI + this.theta_m90);
            this.pot_11.x = this.c_x - cache_10 * global.cosine(this.theta) + cache_4 * global.cosine(Math.PI + this.theta_m90);
            this.pot_11.y = this.c_y - cache_11 * global.sine(this.theta) + cache_5 * global.sine(Math.PI + this.theta_m90);
            this.pot_12.x = this.p1.x + 4 * cache_10 * (this.elm.properties['Wiper Percentage'] * 0.01) * global.cosine(this.theta) + cache_10 * global.cosine(this.theta_m90);
            this.pot_12.y = this.p1.y + 4 * cache_11 * (this.elm.properties['Wiper Percentage'] * 0.01) * global.sine(this.theta) + cache_11 * global.sine(this.theta_m90);
            this.pot_13.x = this.p1.x + 4 * cache_10 * (this.elm.properties['Wiper Percentage'] * 0.01) * global.cosine(this.theta) + cache_6 * global.cosine(this.theta_m90);
            this.pot_13.y = this.p1.y + 4 * cache_11 * (this.elm.properties['Wiper Percentage'] * 0.01) * global.sine(this.theta) + cache_7 * global.sine(this.theta_m90);
            this.connect1_x = this.c_x - cache_10 * global.cosine(this.theta);
            this.connect1_y = this.c_y - cache_11 * global.sine(this.theta);
            this.connect2_x = this.c_x + cache_10 * global.cosine(this.theta);
            this.connect2_y = this.c_y + cache_11 * global.sine(this.theta);
            this.theta = global.retrieve_angle_radian(-(this.c_x - this.p2.x), -(this.c_y - this.p2.y));
            this.pot_1.x = this.p2.x + cache_8 * global.cosine(this.phi);
            this.pot_1.y = this.p2.y + cache_9 * global.sine(this.phi);
            this.pot_3.x = this.pot_12.x + cache_8 * global.cosine(this.theta - global.PI_DIV_6);
            this.pot_3.y = this.pot_12.y + cache_9 * global.sine(this.theta - global.PI_DIV_6);
            this.pot_5.x = this.pot_12.x + cache_8 * global.cosine(this.theta + global.PI_DIV_6);
            this.pot_5.y = this.pot_12.y + cache_9 * global.sine(this.theta + global.PI_DIV_6);
            this.theta = global.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y);
            this.build_element_flag = false;
        }
    }
    resize() {
        if (this.build_element_flag || global.signal_build_element) {
            if (this.bounds.anchored) {
                if (this.elm.consistent()) {
                    this.bounds.set_center2(global.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n3].location.x), global.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n3].location.y), global.node_space_x * 2, global.node_space_y * 2);
                    this.refactor();
                }
                this.unanchor_wires();
                this.anchor_wires();
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
        this.theta_m90 = global.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y) - global.PI_DIV_2;
        this.theta = global.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y);
        this.phi = global.retrieve_angle_radian(this.c_x - this.p2.x, this.c_y - this.p2.y);
        this.build_element();
    }
    update() { }
    increment_rotation() {
        this.elm.rotation++;
        if (this.elm.rotation > global.ROTATION_270) {
            this.elm.rotation = global.ROTATION_0;
        }
        this.set_rotation(this.elm.rotation);
    }
    increment_flip() { }
    recolor() {
        if (global.selected) {
            if (global.selected_id === this.elm.id && global.selected_type === this.elm.type) {
                this.line_paint.set_color(global.SELECTED_COLOR);
                this.point_paint.set_color(global.SELECTED_COLOR);
                this.text_paint.set_color(global.SELECTED_COLOR);
            }
            else {
                this.line_paint.set_color(global.ELEMENT_COLOR);
                this.point_paint.set_color(global.ELEMENT_COLOR);
                this.text_paint.set_color(global.ELEMENT_COLOR);
            }
        }
        else {
            if (this.multi_selected) {
                this.line_paint.set_color(global.MULTI_SELECTED_COLOR);
                this.point_paint.set_color(global.MULTI_SELECTED_COLOR);
                this.text_paint.set_color(global.MULTI_SELECTED_COLOR);
            }
            else {
                this.line_paint.set_color(global.ELEMENT_COLOR);
                this.point_paint.set_color(global.ELEMENT_COLOR);
                this.text_paint.set_color(global.ELEMENT_COLOR);
            }
        }
    }
    is_selected_element() {
        return global.selected_id === this.elm.id && global.selected_type === this.elm.type;
    }
    draw_component(canvas) {
        this.wire_reference_maintenance();
        this.recolor();
        this.resize();
        if (this.multi_selected) {
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
            this.line_buffer[this.indexer++] = Array(this.connect1_x, this.connect1_y, this.pot_0.x, this.pot_0.y);
            this.line_buffer[this.indexer++] = Array(this.pot_0.x, this.pot_0.y, this.pot_2.x, this.pot_2.y);
            this.line_buffer[this.indexer++] = Array(this.pot_2.x, this.pot_2.y, this.pot_4.x, this.pot_4.y);
            this.line_buffer[this.indexer++] = Array(this.pot_4.x, this.pot_4.y, this.pot_6.x, this.pot_6.y);
            this.line_buffer[this.indexer++] = Array(this.pot_6.x, this.pot_6.y, this.pot_8.x, this.pot_8.y);
            this.line_buffer[this.indexer++] = Array(this.pot_8.x, this.pot_8.y, this.connect2_x, this.connect2_y);
            this.line_buffer[this.indexer++] = Array(this.p1.x, this.p1.y, this.connect1_x, this.connect1_y);
            this.line_buffer[this.indexer++] = Array(this.p3.x, this.p3.y, this.connect2_x, this.connect2_y);
            this.line_buffer[this.indexer++] = Array(this.p2.x, this.p2.y, this.pot_1.x, this.pot_1.y);
            this.line_buffer[this.indexer++] = Array(this.pot_1.x, this.pot_1.y, this.pot_13.x, this.pot_13.y);
            this.line_buffer[this.indexer++] = Array(this.pot_12.x, this.pot_12.y, this.pot_13.x, this.pot_13.y);
            this.line_buffer[this.indexer++] = Array(this.pot_3.x, this.pot_3.y, this.pot_12.x, this.pot_12.y);
            this.line_buffer[this.indexer++] = Array(this.pot_5.x, this.pot_5.y, this.pot_12.x, this.pot_12.y);
            canvas.draw_line_buffer(this.line_buffer, this.line_paint);
            this.indexer = 0;
            this.circle_buffer[this.indexer++] = Array(this.p1.x, this.p1.y, global.canvas_stroke_width_2_zoom);
            this.circle_buffer[this.indexer++] = Array(this.p2.x, this.p2.y, global.canvas_stroke_width_2_zoom);
            this.circle_buffer[this.indexer++] = Array(this.p3.x, this.p3.y, global.canvas_stroke_width_2_zoom);
            canvas.draw_circle_buffer(this.circle_buffer, this.point_paint);
            if (global.DEVELOPER_MODE) {
                canvas.draw_rect2(this.bounds, this.line_paint);
                canvas.draw_text(this.wire_reference.length, this.c_x, this.c_y - 50, this.text_paint);
            }
            if (global.workspace_zoom_scale > 1.085 || (!global.MOBILE_MODE && global.workspace_zoom_scale >= 0.99)) {
                this.angle = global.retrieve_angle(this.p3.x - this.p1.x, this.p3.y - this.p1.y);
                if (this.angle > 170 && this.angle < 190) {
                    canvas.draw_text(global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.exponentiate_quickly(this.elm.properties['Resistance'])).replace('{UNIT}', this.elm.properties['units']), this.c_x, this.bounds.top - this.bounds.get_height() * 0.1, this.text_paint);
                    canvas.draw_text(global.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', this.elm.id), this.c_x, this.bounds.top + this.bounds.get_height() * 0.1, this.text_paint);
                }
                else if (this.angle > -10 && this.angle < 10) {
                    canvas.draw_text(global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.exponentiate_quickly(this.elm.properties['Resistance'])).replace('{UNIT}', this.elm.properties['units']), this.c_x, this.bounds.bottom - this.bounds.get_height() * 0.1, this.text_paint);
                    canvas.draw_text(global.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', this.elm.id), this.c_x, this.bounds.bottom + this.bounds.get_height() * 0.1, this.text_paint);
                }
                else if (this.angle > 260 && this.angle < 280) {
                    canvas.rotate(this.c_x, this.c_y, -90);
                    canvas.draw_text(global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.exponentiate_quickly(this.elm.properties['Resistance'])).replace('{UNIT}', this.elm.properties['units']), this.c_x, this.bounds.bottom - this.bounds.get_height() * 0.1, this.text_paint);
                    canvas.draw_text(global.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', this.elm.id), this.c_x, this.bounds.bottom + this.bounds.get_height() * 0.1, this.text_paint);
                    canvas.restore();
                }
                else if (this.angle > 80 && this.angle < 100) {
                    canvas.rotate(this.c_x, this.c_y, -90);
                    canvas.draw_text(global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.exponentiate_quickly(this.elm.properties['Resistance'])).replace('{UNIT}', this.elm.properties['units']), this.c_x, this.bounds.top - this.bounds.get_height() * 0.1, this.text_paint);
                    canvas.draw_text(global.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', this.elm.id), this.c_x, this.bounds.top + this.bounds.get_height() * 0.1, this.text_paint);
                    canvas.restore();
                }
            }
            if (!global.MOBILE_MODE) {
                if (global.wire_builder['step'] === 0 &&
                    this.bounds.contains_xywh(global.mouse_x, global.mouse_y, this.bounds.get_width() * 1.25, this.bounds.get_height() * 1.25) &&
                    global.NODE_HINTS &&
                    !multi_select_manager.multi_select &&
                    !this.multi_selected &&
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
    patch() {
        if (!global.not_null(this.line_buffer)) {
            this.line_buffer = [];
        }
        if (!global.not_null(this.circle_buffer)) {
            this.circle_buffer = [];
        }
        if (!global.not_null(this.build_element_flag)) {
            this.build_element_flag = false;
        }
        if (!global.not_null(this.angle)) {
            this.angle = 0;
        }
        if (!global.not_null(this.indexer)) {
            this.indexer = 0;
        }
        if (!global.not_null(this.initialized)) {
            this.initialized = false;
        }
        if (!global.not_null(this.multi_selected)) {
            this.multi_selected = false;
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
    reset() { }
}
