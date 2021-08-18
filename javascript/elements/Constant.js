'use strict';
class Constant {
    constructor(type, id, n1) {
        this.initialized = false;
        this.bounds = new RectF(0, 0, 0, 0);
        this.elm = new Element1(id, type, global.utils.copy(global.PROPERTY.PROPERTY_CONSTANT));
        this.elm.set_nodes(n1);
        if (this.elm.consistent()) {
            this.bounds.set_center2(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y, global.variables.node_space_x * 2, global.variables.node_space_y * 2);
        }
        this.elm.set_rotation(global.CONSTANTS.ROTATION_0);
        this.release_nodes();
        let vertices = this.get_vertices();
        this.elm.map_node1(vertices[0], vertices[1]);
        this.capture_nodes();
        this.p1 = new PointF(0, 0);
        if (this.elm.consistent()) {
            this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
        }
        this.x_space = global.variables.node_space_x >> 1;
        this.y_space = global.variables.node_space_y >> 1;
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
        this.wire_reference = [];
        this.simulation_id = 0;
        this.indexer = 0;
        this.m_x = 0;
        this.m_y = 0;
        this.c_x = this.bounds.get_center_x();
        this.c_y = this.bounds.get_center_y();
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
            this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
            this.bounds.set_center2(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y, global.variables.node_space_x * 2, global.variables.node_space_y * 2);
        }
    }
    push_reference(ref) {
        this.wire_reference.push(ref);
    }
    stamp() {
        if (this.elm.consistent()) {
            engine_functions.stamp_voltage(this.elm.n1, -1, this.elm.properties['Voltage'], simulation_manager.ELEMENT_CONSTANT_OFFSET + this.simulation_id);
        }
    }
    get_vertices() {
        let p1 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.get_center_y());
        let vertices = Array(p1[0], p1[1]);
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
            this.elm.set_nodes(-1);
        }
    }
    capture_nodes() {
        let vertices = this.get_vertices();
        this.elm.map_node1(vertices[0], vertices[1]);
        if (this.elm.consistent() && !this.is_translating) {
            nodes[this.elm.n1].add_reference(this.elm.id, this.elm.type);
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
                if (this.elm.consistent() && !global.variables.component_touched) {
                    if (nodes[this.elm.n1].contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
                        this.handle_wire_builder(this.elm.n1, global.variables.anchor_point['p1']);
                        global.variables.component_touched = true;
                    }
                    else if (this.bounds.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, this.bounds.get_width(), this.bounds.get_height())) {
                        this.is_translating = false;
                        global.variables.focused_id = this.elm.id;
                        global.variables.focused_type = this.elm.type;
                        global.variables.focused_bounds = global.utils.copy(this.bounds);
                        global.variables.focused = true;
                        global.variables.component_touched = true;
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
                            global.variables.selected_wire_style = global.CONSTANTS.NULL;
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
    push_history() {
        if (this.initialized && !this.is_translating) {
            global.utils.push_history();
        }
    }
    resize() {
        if (this.build_element_flag || global.flags.flag_build_element) {
            if (this.bounds.anchored) {
                if (this.elm.consistent()) {
                    this.bounds.set_center2(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y, global.variables.node_space_x * 2, global.variables.node_space_y * 2);
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
        this.x_space = global.variables.node_space_x >> 1;
        this.y_space = global.variables.node_space_y >> 1;
        this.c_x = this.bounds.get_center_x();
        this.c_y = this.bounds.get_center_y();
        this.build_element_flag = false;
    }
    update() { }
    set_flip(flip) { }
    set_rotation(rotation) {
        this.build_element_flag = true;
        wire_manager.reset_wire_builder();
        this.push_history();
        this.release_nodes();
        this.elm.set_rotation(rotation);
        this.refactor();
        this.capture_nodes();
    }
    increment_rotation() {
        this.elm.rotation++;
        if (this.elm.rotation > global.CONSTANTS.ROTATION_270) {
            this.elm.rotation = global.CONSTANTS.ROTATION_0;
        }
        this.set_rotation(this.elm.rotation);
    }
    increment_flip() { }
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
            if (this.elm.rotation === global.CONSTANTS.ROTATION_0) {
                canvas.draw_circle(this.c_x, this.c_y, global.variables.canvas_stroke_width_2_zoom, this.point_paint);
                canvas.draw_line(this.c_x, this.c_y, this.c_x, this.c_y + this.y_space, this.line_paint);
                canvas.draw_rect3(this.c_x, this.c_y + this.y_space * 1.5, this.bounds.get_width() >> 2, this.bounds.get_width() >> 2, this.line_paint);
            }
            else if (this.elm.rotation === global.CONSTANTS.ROTATION_90) {
                canvas.draw_circle(this.c_x, this.c_y, global.variables.canvas_stroke_width_2_zoom, this.point_paint);
                canvas.draw_line(this.c_x, this.c_y, this.c_x - this.x_space, this.c_y, this.line_paint);
                canvas.draw_rect3(this.c_x - 1.5 * this.x_space, this.c_y, this.bounds.get_width() >> 2, this.bounds.get_width() >> 2, this.line_paint);
            }
            else if (this.elm.rotation === global.CONSTANTS.ROTATION_180) {
                canvas.draw_circle(this.c_x, this.c_y, global.variables.canvas_stroke_width_2_zoom, this.point_paint);
                canvas.draw_line(this.c_x, this.c_y, this.c_x, this.c_y - this.y_space, this.line_paint);
                canvas.draw_rect3(this.c_x, this.c_y - this.y_space * 1.5, this.bounds.get_width() >> 2, this.bounds.get_width() >> 2, this.line_paint);
            }
            else if (this.elm.rotation === global.CONSTANTS.ROTATION_270) {
                canvas.draw_circle(this.c_x, this.c_y, global.variables.canvas_stroke_width_2_zoom, this.point_paint);
                canvas.draw_line(this.c_x, this.c_y, this.c_x + this.x_space, this.c_y, this.line_paint);
                canvas.draw_rect3(this.c_x + 1.5 * this.x_space, this.c_y, this.bounds.get_width() >> 2, this.bounds.get_width() >> 2, this.line_paint);
            }
            if (global.variables.workspace_zoom_scale > 1.085 || (!MOBILE_MODE && global.variables.workspace_zoom_scale >= 0.99)) {
                if (this.elm.rotation === global.CONSTANTS.ROTATION_90) {
                    canvas.draw_text(global.TEMPLATES.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.utils.exponentiate_quickly(this.elm.properties['Voltage'])).replace('{UNIT}', this.elm.properties['units']), this.c_x, this.bounds.top + this.bounds.get_height() * 0.2, this.text_paint);
                }
                else if (this.elm.rotation === global.CONSTANTS.ROTATION_270) {
                    canvas.draw_text(global.TEMPLATES.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.utils.exponentiate_quickly(this.elm.properties['Voltage'])).replace('{UNIT}', this.elm.properties['units']), this.c_x, this.bounds.bottom - this.bounds.get_height() * 0.2, this.text_paint);
                }
                else if (this.elm.rotation === global.CONSTANTS.ROTATION_0) {
                    canvas.rotate(this.bounds.left, this.c_y, -90);
                    canvas.draw_text(global.TEMPLATES.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.utils.exponentiate_quickly(this.elm.properties['Voltage'])).replace('{UNIT}', this.elm.properties['units']), this.bounds.left, this.c_y + this.bounds.get_height() * 0.2, this.text_paint);
                    canvas.restore();
                }
                else if (this.elm.rotation === global.CONSTANTS.ROTATION_180) {
                    canvas.rotate(this.bounds.right, this.c_y, -90);
                    canvas.draw_text(global.TEMPLATES.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.utils.exponentiate_quickly(this.elm.properties['Voltage'])).replace('{UNIT}', this.elm.properties['units']), this.bounds.right, this.c_y - this.bounds.get_height() * 0.2, this.text_paint);
                    canvas.restore();
                }
            }
            if (global.CONSTANTS.DEVELOPER_MODE) {
                canvas.draw_rect2(this.bounds, this.line_paint);
                canvas.draw_text(this.wire_reference.length, this.c_x, this.c_y - 50, this.text_paint);
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
                    !global.variables.is_dragging &&
                    !this.is_translating) {
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
    }
    reset() { }
}
