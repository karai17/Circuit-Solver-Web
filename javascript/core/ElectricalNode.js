'use strict';
class ElectricalNode {
    constructor(x, y, id) {
        this.location = new PointF(x, y);
        this.node_line_paint = new Paint();
        this.node_line_paint.set_paint_style(paint.style.STROKE);
        this.node_line_paint.set_paint_cap(paint.cap.ROUND);
        this.node_line_paint.set_paint_join(paint.join.ROUND);
        this.node_line_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.node_line_paint.set_color(global.COLORS.GENERAL_CYAN_COLOR);
        this.node_line_paint.set_text_size(global.variables.canvas_text_size_5);
        this.node_line_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.node_line_paint.set_alpha(192);
        this.node_line_paint.set_paint_align(paint.align.CENTER);
        this.node_fill_paint = new Paint();
        this.node_fill_paint.set_paint_style(paint.style.FILL);
        this.node_fill_paint.set_paint_cap(paint.cap.ROUND);
        this.node_fill_paint.set_paint_join(paint.join.ROUND);
        this.node_fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.node_fill_paint.set_color(global.COLORS.GENERAL_CYAN_COLOR);
        this.node_fill_paint.set_text_size(global.variables.canvas_text_size_5);
        this.node_fill_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.node_fill_paint.set_alpha(192);
        this.node_fill_paint.set_paint_align(paint.align.CENTER);
        this.id = id;
        this.simulation_id = -1;
        this.references = [];
        this.column = Math.floor(this.id / Math.round(global.settings.SQRT_MAXNODES));
        this.row = this.id % Math.round(global.settings.SQRT_MAXNODES);
        let node_space_x = 1.175 * (global.variables.node_space_x >> 2);
        let node_space_y = 1.175 * (global.variables.node_space_y >> 2);
        if (MOBILE_MODE) {
            node_space_x *= 1.25;
            node_space_y *= 1.25;
        }
        this.bounds = new RectF(this.location.x - node_space_x, this.location.y - node_space_y, this.location.x + node_space_x, this.location.y + node_space_y);
        this.loc_x_precalc = this.row * global.settings.INV_SQRT_M_1;
        this.loc_y_precalc = this.column * global.settings.INV_SQRT_M_1;
    }
    resize(n_x, n_y, m_n_x, m_n_y) {
        if (global.flags.flag_build_element) {
            this.location.x = workspace.bounds.left + this.loc_x_precalc * workspace.bounds.get_width();
            this.location.y = workspace.bounds.top + this.loc_y_precalc * workspace.bounds.get_height();
            if (!MOBILE_MODE) {
                this.bounds.set_bounds(this.location.x - n_x, this.location.y - n_y, this.location.x + n_x, this.location.y + n_y);
            }
            else {
                this.bounds.set_bounds(this.location.x - m_n_x, this.location.y - m_n_y, this.location.x + m_n_x, this.location.y + m_n_y);
            }
            this.node_line_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
            this.node_line_paint.set_text_size(global.variables.canvas_text_size_5);
            this.node_fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
            this.node_fill_paint.set_text_size(global.variables.canvas_text_size_5);
        }
    }
    set_color(color) {
        this.node_line_paint.set_color(color);
        this.node_fill_paint.set_color(color);
    }
    get_bounds() {
        return this.bounds;
    }
    contains_xy(x, y) {
        return this.bounds.contains_xy(x, y);
    }
    contains_xywh(x, y, w, h) {
        return this.bounds.contains_xywh(x, y, w, h);
    }
    get_id() {
        return this.id;
    }
    clear_references() {
        this.references = [];
        node_manager.remove_node(this.id);
    }
    add_reference_list(reference_list) {
        for (var i = 0; i < reference_list.length; i++) {
            this.add_reference(reference_list[i].id, reference_list[i].type);
        }
    }
    add_reference(id, type) {
        let is_found = false;
        for (var i = 0; i < this.references.length; i++) {
            if (this.references[i].id === id && this.references[i].type === type) {
                is_found = true;
                break;
            }
        }
        if (!is_found) {
            this.references.push(new NodeReference(id, type));
            if (this.references.length > 0) {
                node_manager.add_node(this.id);
            }
        }
    }
    remove_reference(id, type) {
        if (this.references.length > 0) {
            for (var i = 0; i < this.references.length; i++) {
                if (this.references[i].id === id && this.references[i].type === type) {
                    this.references.splice(i, 1);
                    break;
                }
            }
            if (this.references.length === 0) {
                node_manager.remove_node(this.id);
            }
        }
    }
    contains_element_type(type) {
        let out = false;
        for (var i = 0; i < this.references.length; i++) {
            if (this.references[i].type === type) {
                out = true;
                break;
            }
        }
        return out;
    }
    draw_node_builder_helper() {
        let count = 0;
        let index = -1;
        for (var i = 0; i < this.references.length; i++) {
            if (this.references[i].type === global.ELEMENT_TYPES.TYPE_NOTE) {
                index = engine_functions.get_note(this.references[i].id);
                if (index > -1 && index < notes.length) {
                    if (notes[index].elm.properties['Show Marker'] === global.CONSTANTS.OFF) {
                        count++;
                    }
                }
            }
            else {
                count = -1;
                break;
            }
        }
        if (count === this.references.length) {
            return false;
        }
        else {
            return true;
        }
    }
    debug_info() {
        let str = '';
        for (var i = 0; i < this.references.length; i++) {
            str += global.TEMPLATES.DEBUG_TEMPLATE.replace('{ID}', this.references[i].id).replace('{TYPE}', this.references[i].type);
        }
        return str;
    }
    draw(canvas) {
        if (this.references.length > 0) {
            if (global.CONSTANTS.DEVELOPER_MODE) {
                canvas.draw_circle(this.location.x, this.location.y, 2 * global.variables.canvas_stroke_width_3, this.node_line_paint);
                canvas.draw_text(this.debug_info(), this.location.x, this.location.y, this.node_line_paint);
            }
            else {
                if (global.variables.wire_builder['step'] > 0) {
                    if (global.variables.wire_builder['n1'] > -1 && global.variables.wire_builder['n1'] < global.settings.MAXNODES) {
                        if (global.variables.wire_builder['n1'] !== this.id && this.draw_node_builder_helper()) {
                            global.variables.node_line_buffer[global.variables.node_line_buffer_index++] = Array(this.bounds.left, this.bounds.top, this.bounds.right, this.bounds.top);
                            global.variables.node_line_buffer[global.variables.node_line_buffer_index++] = Array(this.bounds.left, this.bounds.bottom, this.bounds.right, this.bounds.bottom);
                            global.variables.node_line_buffer[global.variables.node_line_buffer_index++] = Array(this.bounds.left, this.bounds.top, this.bounds.left, this.bounds.bottom);
                            global.variables.node_line_buffer[global.variables.node_line_buffer_index++] = Array(this.bounds.right, this.bounds.top, this.bounds.right, this.bounds.bottom);
                        }
                    }
                }
            }
        }
        else {
            this.simulation_id = -1;
        }
    }
}
