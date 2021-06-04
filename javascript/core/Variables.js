'use strict';
class Variables {
    constructor(CONSTANTS, COLORS) {
        this.device_pixel_ratio = 1;
        this.system_initialization = {
            step: 0,
            max: 5,
            completed: false
        };
        if (MOBILE_MODE) {
            this.workspace_zoom_scale = 2.5;
        }
        else {
            this.workspace_zoom_scale = 1.0;
        }
        this.natural_width = 0;
        this.natural_height = 0;
        this.virtual_canvas_id = 0;
        this.element_on_board = false;
        this.focused = false;
        this.focused_id = CONSTANTS.NULL;
        this.focused_type = CONSTANTS.NULL;
        this.focused_bounds = CONSTANTS.NULL;
        this.last_selected = false;
        this.selected = false;
        this.selected_id = CONSTANTS.NULL;
        this.selected_type = -1;
        this.selected_wire_style = CONSTANTS.NULL;
        this.selected_bounds = CONSTANTS.NULL;
        this.selected_properties = CONSTANTS.NULL;
        this.selection_nearest_neighbors = [];
        this.nearest_neighbor_index = 0;
        this.multi_selected = false;
        this.clipboard_type = CONSTANTS.NULL;
        this.clipboard_rotation = CONSTANTS.NULL;
        this.clipboard_flip = CONSTANTS.NULL;
        this.clipboard_property = CONSTANTS.NULL;
        this.component_translating = false;
        this.flag_build_counter = 0;
        this.flag_focus_counter = 0;
        this.flag_wire_deleted_counter = 0;
        this.component_touched = false;
        this.mouse_keyboard_lock = false;
        this.translation_lock = true;
        this.is_singular = false;
        this.browser_ie = false;
        this.browser_chrome = false;
        this.browser_opera = false;
        this.browser_firefox = false;
        this.browser_safari = false;
        this.mouse_down_x = 0;
        this.mouse_down_y = 0;
        this.last_mouse_x = 0;
        this.last_mouse_y = 0;
        this.dx = 0;
        this.dy = 0;
        this.mouse_x = 0;
        this.mouse_y = 0;
        this.is_touching = false;
        this.is_dragging = false;
        this.temp_is_dragging = false;
        this.is_right_click = false;
        this.delta_x = 0;
        this.delta_y = 0;
        this.x_offset = 0;
        this.y_offset = 0;
        this.node_space_x = 0;
        this.node_space_y = 0;
        this.wire_builder = {
            n1: -1,
            id1: -1,
            type1: -1,
            anchor_point1: -1,
            linkage1: {
                wire: -1
            },
            n2: -1,
            id2: -1,
            type2: -1,
            anchor_point2: -1,
            linkage2: {
                wire: -1
            },
            step: 0
        };
        this.anchor_point = {
            p1: 0,
            p2: 1,
            p3: 2,
            p4: 3
        };
        this.wire_reference = {
            wire_id: -1,
            anchor_point: -1,
            linkage: -1
        };
        this.history = {
            packet: []
        };
        this.language_index = CONSTANTS.LANGUAGE_INDEX_ENGLISH;
        this.language_index_counter = CONSTANTS.LANGUAGE_INDEX_INDONESIAN + 1;
        this.system_options = {
            options: ['Language', 'Shortcut Hints', 'Full Window', '', ''],
            values: [CONSTANTS.LANGUAGES[this.language_index], CONSTANTS.ON, CONSTANTS.OFF, CONSTANTS.OFF, CONSTANTS.OFF]
        };
        this.node_line_buffer = [];
        this.node_line_buffer_index = 0;
        this.wire_line_buffer = [];
        this.wire_line_buffer_index = 0;
        if (MOBILE_MODE) {
            this.system_options['values'][CONSTANTS.SYSTEM_OPTION_SHORTCUT_HINTS] = CONSTANTS.OFF;
        }
        if (DESKTOP_MODE || MOBILE_MODE) {
            this.system_options['values'][CONSTANTS.SYSTEM_OPTION_STRETCH_WINDOW] = CONSTANTS.ON;
        }
        this.user_file_selected = false;
        this.user_file = new Circuit();
        this.flag_canvas_draw_request_counter = 0;
        this.canvas_draw_counter = 0;
        this.canvas_stroke_width_base = 1;
        this.canvas_stroke_width_1 = 2.25;
        this.canvas_stroke_width_2 = 2.5;
        this.canvas_stroke_width_3 = 9;
        this.canvas_stroke_width_4 = 16;
        this.canvas_stroke_width_5 = 21;
        this.canvas_stroke_width_6 = 43;
        this.canvas_stroke_width_1_zoom = 2.25;
        this.canvas_stroke_width_2_zoom = 2.5;
        this.canvas_stroke_width_3_zoom = 9;
        this.canvas_stroke_width_4_zoom = 16;
        this.canvas_stroke_width_5_zoom = 21;
        this.canvas_stroke_width_6_zoom = 43;
        this.canvas_text_size_base = 1;
        this.canvas_text_size_1 = 2.25;
        this.canvas_text_size_2 = 2.5;
        this.canvas_text_size_3 = 9;
        this.canvas_text_size_4 = 16;
        this.canvas_text_size_5 = 21;
        this.canvas_text_size_6 = 43;
        this.canvas_text_size_1_zoom = 2.25;
        this.canvas_text_size_2_zoom = 2.5;
        this.canvas_text_size_3_zoom = 9;
        this.canvas_text_size_4_zoom = 16;
        this.canvas_text_size_5_zoom = 21;
        this.canvas_text_size_6_zoom = 43;
        this.move_paint = new Paint();
        this.move_paint.set_paint_style(paint.style.FILL);
        this.move_paint.set_paint_cap(paint.cap.ROUND);
        this.move_paint.set_paint_join(paint.join.ROUND);
        this.move_paint.set_stroke_width(this.canvas_stroke_width_1);
        this.move_paint.set_color(COLORS.GENERAL_GRAY_COLOR);
        this.move_paint.set_text_size(this.canvas_text_size_1);
        this.move_paint.set_font(CONSTANTS.DEFAULT_FONT);
        this.move_paint.set_alpha(60);
        this.move_paint.set_paint_align(paint.align.CENTER);
        this.wire_paint = new Paint();
        this.wire_paint.set_paint_style(paint.style.STROKE);
        this.wire_paint.set_paint_cap(paint.cap.ROUND);
        this.wire_paint.set_paint_join(paint.join.ROUND);
        this.wire_paint.set_stroke_width(this.canvas_stroke_width_1_zoom);
        this.wire_paint.set_color(COLORS.ELEMENT_COLOR);
        this.wire_paint.set_text_size(this.canvas_text_size_3_zoom);
        this.wire_paint.set_font(CONSTANTS.DEFAULT_FONT);
        this.wire_paint.set_alpha(255);
        this.wire_paint.set_paint_align(paint.align.CENTER);
    }
}
