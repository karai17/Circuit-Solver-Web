'use strict';
class Variables {
	public device_pixel_ratio: number;
	public system_initialization: SYSTEM_INITIALIZATION_T;
	public workspace_zoom_scale: number;
	public node_line_buffer: Array<Array<number>>;
	public node_line_buffer_index: number;
	public wire_line_buffer: Array<Array<number>>;
	public wire_line_buffer_index: number;
	public natural_width: number;
	public natural_height: number;
	public virtual_canvas_id: number;
	public focused: boolean;
	public focused_id: number;
	public focused_type: number;
	public focused_bounds: RectF;
	public last_selected: boolean;
	public selected: boolean;
	public selected_id: number;
	public selected_type: number;
	public selected_wire_style: number;
	public selected_bounds: RectF;
	public selected_properties: ELEMENT_PROPERTY_T;
	public selection_nearest_neighbors: Array<NEAREST_NEIGHBOR_T>;
	public nearest_neighbor_index: number;
	public multi_selected: boolean;
	public clipboard_data: Array<CLIPBOARD_ENTRY_T>;
	public component_translating: boolean;
	public flag_build_counter: number;
	public flag_wire_deleted_counter: number;
	public component_touched: boolean;
	public mouse_keyboard_lock: boolean;
	public translation_lock: boolean;
	public is_singular: boolean;
	public browser_ie: boolean;
	public browser_chrome: boolean;
	public browser_opera: boolean;
	public browser_firefox: boolean;
	public browser_safari: boolean;
	public mouse_offset_x: number;
	public mouse_down_x: number;
	public mouse_down_y: number;
	public last_mouse_x: number;
	public last_mouse_y: number;
	public dx: number;
	public dy: number;
	public mouse_x: number;
	public mouse_y: number;
	public is_dragging: boolean;
	public temp_is_dragging: boolean;
	public is_right_click: boolean;
	public delta_x: number;
	public delta_y: number;
	public x_offset: number;
	public y_offset: number;
	public node_space_x: number;
	public node_space_y: number;
	public anchor_point: ANCHOR_POINT_T;
	public wire_reference: WIRE_REFERENCE_T;
	public wire_builder: WIRE_BUILDER_T;
	public language_index_counter: number;
	public language_index: number;
	public system_options: SYSTEM_OPTIONS_T;
	public user_file_selected: boolean;
	public user_file: Circuit;
	public flag_canvas_draw_request_counter: number;
	public canvas_draw_counter: number;
	public canvas_stroke_width_base: number;
	public canvas_stroke_width_1: number;
	public canvas_stroke_width_2: number;
	public canvas_stroke_width_3: number;
	public canvas_stroke_width_4: number;
	public canvas_stroke_width_5: number;
	public canvas_stroke_width_6: number;
	public canvas_stroke_width_1_zoom: number;
	public canvas_stroke_width_2_zoom: number;
	public canvas_stroke_width_3_zoom: number;
	public canvas_stroke_width_4_zoom: number;
	public canvas_stroke_width_5_zoom: number;
	public canvas_stroke_width_6_zoom: number;
	public canvas_text_size_base: number;
	public canvas_text_size_1: number;
	public canvas_text_size_2: number;
	public canvas_text_size_3: number;
	public canvas_text_size_4: number;
	public canvas_text_size_5: number;
	public canvas_text_size_6: number;
	public canvas_text_size_1_zoom: number;
	public canvas_text_size_2_zoom: number;
	public canvas_text_size_3_zoom: number;
	public canvas_text_size_4_zoom: number;
	public canvas_text_size_5_zoom: number;
	public canvas_text_size_6_zoom: number;
	public move_paint: Paint;
	public wire_paint: Paint;
	public history: HISTORY_T;
	public element_on_board: boolean;

	constructor(CONSTANTS: Constants, COLORS: Colors) {
		this.device_pixel_ratio = 1;
		this.system_initialization = {
			step: 0,
			max: 5,
			completed: false
		};
		if (MOBILE_MODE) {
			this.workspace_zoom_scale = 2.5;
		} else {
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
		this.clipboard_data = [];
		this.component_translating = false;
		this.flag_build_counter = 0;
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
		this.mouse_offset_x = 0;
		this.mouse_down_x = 0;
		this.mouse_down_y = 0;
		this.last_mouse_x = 0;
		this.last_mouse_y = 0;
		this.dx = 0;
		this.dy = 0;
		this.mouse_x = 0;
		this.mouse_y = 0;
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
		this.system_options['values'][CONSTANTS.SYSTEM_OPTION_STRETCH_WINDOW] = CONSTANTS.ON;
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
