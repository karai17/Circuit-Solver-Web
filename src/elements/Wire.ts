'use strict';
class Wire {
	private initialized: boolean;
	public elm: Element2;
	public p1: PointF;
	public p2: PointF;
	private theta_m90: number;
	private theta: number;
	private c_x: number;
	private c_y: number;
	private x_space: number;
	private y_space: number;
	private line_paint: Paint;
	private point_paint: Paint;
	private text_paint: Paint;
	private wire_point: PointF;
	public bounds: RectF;
	private total_bounds: RectF;
	private wire_voltage: number;
	public multi_selected: boolean;
	private line_buffer: Array<Array<number>>;
	private circle_buffer: Array<Array<number>>;
	private build_element_flag: boolean;
	private angle: number;
	private indexer: number;
	public is_translating: boolean;
	private node_id_array: Array<number>;
	constructor(type: number, id: number, n1: number, n2: number) {
		this.initialized = false;
		this.elm = new Element2(id, type, global.utils.copy(global.PROPERTY.PROPERTY_WIRE));
		this.elm.set_nodes(n1, n2);
		this.p1 = new PointF(0, 0);
		this.p2 = new PointF(0, 0);
		if (this.elm.consistent()) {
			this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
			this.p2.set_point(nodes[this.elm.n2].location.x, nodes[this.elm.n2].location.y);
		}
		this.capture_nodes();
		this.theta_m90 = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.CONSTANTS.PI_DIV_2;
		this.theta = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
		this.c_x = 0;
		this.c_y = 0;
		if (this.elm.consistent()) {
			this.c_x = global.utils.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n2].location.x);
			this.c_y = global.utils.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n2].location.y);
		}
		this.x_space = global.variables.node_space_x >> 1;
		this.y_space = global.variables.node_space_y >> 1;
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
		this.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.text_paint.set_text_size(global.variables.canvas_text_size_3_zoom);
		this.text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.text_paint.set_alpha(255);
		this.text_paint.set_paint_align(paint.align.CENTER);
		this.wire_point = new PointF(0, 0);
		this.update_wire_style();
		this.bounds = new RectF(0, 0, 0, 0);
		this.total_bounds = new RectF(0, 0, 0, 0);
		this.wire_voltage = 0;
		this.initialized = true;
		this.multi_selected = false;
		this.line_buffer = [];
		this.circle_buffer = [];
		this.build_element_flag = true;
		this.angle = 0;
		this.indexer = 0;
		this.is_translating = false;
	}
	refresh_bounds(): void {
		if (this.elm.consistent()) {
			this.p1 = new PointF(0, 0);
			this.p2 = new PointF(0, 0);
			this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
			this.p2.set_point(nodes[this.elm.n2].location.x, nodes[this.elm.n2].location.y);
		}
	}
	stamp(): void {}
	release_wires(): void {}
	release_nodes(): void {
		if (this.elm.consistent()) {
			nodes[this.elm.n1].remove_reference(this.elm.id, this.elm.type);
			nodes[this.elm.n2].remove_reference(this.elm.id, this.elm.type);
			this.elm.set_nodes(-1, -1);
		}
		this.build_element_flag = true;
	}
	release_node_1() {
		if (this.elm.n1 !== -1) {
			nodes[this.elm.n1].remove_reference(this.elm.id, this.elm.type);
			this.elm.set_node_1(-1);
		}
		this.build_element_flag = true;
	}
	release_node_2() {
		if (this.elm.n2 !== -1) {
			nodes[this.elm.n2].remove_reference(this.elm.id, this.elm.type);
			this.elm.set_node_2(-1);
		}
		this.build_element_flag = true;
	}
	capture_nodes(): void {
		this.elm.map_node2(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
		if (this.elm.consistent() && !this.is_translating) {
			nodes[this.elm.n1].add_reference(this.elm.id, this.elm.type);
			nodes[this.elm.n2].add_reference(this.elm.id, this.elm.type);
		}
		this.build_element_flag = true;
	}
	move_element(dx: number, dy: number): void {}
	mouse_down(): void {
		if (
			global.flags.flag_idle &&
			!global.flags.flag_save_image &&
			!global.flags.flag_save_circuit &&
			!global.flags.flag_zoom &&
			!global.flags.flag_element_options &&
			!global.flags.flag_element_options_edit &&
			!global.flags.flag_select_element &&
			!global.flags.flag_select_timestep &&
			!global.flags.flag_select_settings &&
			!global.flags.flag_remove_all &&
			!global.flags.flag_menu_element_toolbox
		) {
			if (!global.variables.focused && !global.variables.component_touched && !global.variables.multi_selected) {
				if (this.wire_collision() && !global.variables.component_touched) {
					global.variables.focused_id = this.elm.id;
					global.variables.focused_type = this.elm.type;
					global.variables.focused_bounds = global.CONSTANTS.NULL;
					global.variables.focused = true;
					global.variables.component_touched = true;
				}
			}
		}
	}
	mouse_move(): void {}
	mouse_up(): void {
		if (global.flags.flag_idle) {
			if (global.variables.focused && global.variables.focused_id === this.elm.id && global.variables.focused_type === this.elm.type) {
				if (!global.variables.selected) {
					this.select();
				} else {
					if (global.variables.selected_id === this.elm.id && global.variables.selected_type === this.elm.type) {
						global.variables.selected_id = global.CONSTANTS.NULL;
						global.variables.selected_type = -1;
						global.variables.selected_bounds = global.CONSTANTS.NULL;
						global.variables.selected_properties = global.CONSTANTS.NULL;
						global.variables.selected_wire_style = global.CONSTANTS.NULL;
						global.variables.selected = false;
					} else {
						this.select();
					}
				}
				global.variables.focused_id = global.CONSTANTS.NULL;
				global.variables.focused_type = global.CONSTANTS.NULL;
				global.variables.focused_bounds = global.CONSTANTS.NULL;
				global.variables.focused = false;
			}
			if (global.variables.selected_id === this.elm.id && global.variables.selected_type === this.elm.type) {
				this.update_total_bounds();
				global.variables.selected_bounds = global.utils.copy(this.total_bounds);
			}
		}
	}
	select(): void {
		if (global.variables.wire_builder['step'] !== 0) {
			wire_manager.reset_wire_builder();
		}
		global.variables.selected_id = this.elm.id;
		global.variables.selected_type = this.elm.type;
		this.update_total_bounds();
		global.variables.selected_bounds = global.utils.copy(this.total_bounds);
		global.variables.selected_properties = global.utils.copy(this.elm.properties);
		global.variables.selected_wire_style = this.elm.wire_style;
		global.variables.selected = true;
	}
	update_total_bounds() {
		this.total_bounds.left = Math.min(this.p1.x, this.p2.x);
		this.total_bounds.top = Math.min(this.p1.y, this.p2.y);
		this.total_bounds.right = Math.max(this.p1.x, this.p2.x);
		this.total_bounds.bottom = Math.max(this.p1.y, this.p2.y);
		if (this.total_bounds.get_width() < 2 * global.variables.node_space_x) {
			this.total_bounds.set_center2(this.c_x, this.c_y, 2 * global.variables.node_space_x, this.total_bounds.get_height());
		}
		if (this.total_bounds.get_height() < 2 * global.variables.node_space_y) {
			this.total_bounds.set_center2(this.c_x, this.c_y, this.total_bounds.get_width(), 2 * global.variables.node_space_y);
		}
	}
	update_wire_style() {
		if (this.elm.wire_style === global.CONSTANTS.WIRE_STYLE_1) {
			this.wire_point.x = Math.max(this.p1.x, this.p2.x);
			this.wire_point.y = Math.min(this.p1.y, this.p2.y);
		} else if (this.elm.wire_style === global.CONSTANTS.WIRE_STYLE_2) {
			this.wire_point.x = Math.max(this.p1.x, this.p2.x);
			this.wire_point.y = Math.max(this.p1.y, this.p2.y);
		} else if (this.elm.wire_style === global.CONSTANTS.WIRE_STYLE_3) {
			this.wire_point.x = Math.min(this.p1.x, this.p2.x);
			this.wire_point.y = Math.max(this.p1.y, this.p2.y);
		} else if (this.elm.wire_style === global.CONSTANTS.WIRE_STYLE_4) {
			this.wire_point.x = Math.min(this.p1.x, this.p2.x);
			this.wire_point.y = Math.min(this.p1.y, this.p2.y);
		} else {
			this.wire_point.x = global.utils.get_average2(this.p1.x, this.p2.x);
			this.wire_point.y = global.utils.get_average2(this.p1.y, this.p2.y);
		}
		global.flags.flag_build_element = true;
	}
	refactor(): void {
		if (this.build_element_flag || global.flags.flag_build_element) {
			this.x_space = global.variables.node_space_x >> 1;
			this.y_space = global.variables.node_space_y >> 1;
			this.c_x = this.bounds.get_center_x();
			this.c_y = this.bounds.get_center_y();
		}
	}
	resize(): void {
		if (this.build_element_flag || global.flags.flag_build_element) {
			this.update_wire_style();
			if (this.elm.consistent()) {
				this.c_x = global.utils.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n2].location.x);
				this.c_y = global.utils.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n2].location.y);
			}
			this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_1_zoom);
			this.line_paint.set_text_size(global.variables.canvas_text_size_3_zoom);
			this.point_paint.set_stroke_width(global.variables.canvas_stroke_width_1_zoom);
			this.point_paint.set_text_size(global.variables.canvas_text_size_3_zoom);
			this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1_zoom);
			this.text_paint.set_text_size(global.variables.canvas_text_size_3_zoom);
			if (this.elm.n1 !== -1) {
				this.p1.x = nodes[this.elm.n1].location.x;
				this.p1.y = nodes[this.elm.n1].location.y;
			}
			if (this.elm.n2 !== -1) {
				this.p2.x = nodes[this.elm.n2].location.x;
				this.p2.y = nodes[this.elm.n2].location.y;
			}
			if (this.elm.consistent()) {
				this.bounds.left = this.c_x - this.x_space;
				this.bounds.top = this.c_y - this.y_space;
				this.bounds.right = this.c_x + this.x_space;
				this.bounds.bottom = this.c_y + this.y_space;
				this.update_total_bounds();
			}
			this.build_element_flag = false;
		}
	}
	update(): void {
		if (global.flags.flag_simulating && simulation_manager.solutions_ready) {
			if (this.elm.consistent()) {
				this.wire_voltage = Math.max(engine_functions.get_voltage(this.elm.n1, -1), engine_functions.get_voltage(this.elm.n2, -1));
			}
		}
	}
	set_flip(flip: number): void {
		this.build_element_flag = true;
		wire_manager.reset_wire_builder();
		this.release_nodes();
		this.elm.set_flip(flip);
		this.refactor();
		this.capture_nodes();
	}
	set_rotation(rotation: number): void {
		this.build_element_flag = true;
		wire_manager.reset_wire_builder();
		this.release_nodes();
		this.elm.set_rotation(rotation);
		this.refactor();
		this.capture_nodes();
	}
	push_history(): void {
		if (this.initialized) {
			global.variables.history['packet'].push(engine_functions.history_snapshot());
		}
	}
	set_wire_style(style: number): void {
		this.elm.set_wire_style(style);
		this.refactor();
		if (global.variables.selected_id === this.elm.id && global.variables.selected_type === this.elm.type) {
			global.variables.selected_wire_style = this.elm.wire_style;
		}
		this.push_history();
	}
	increment_style() {
		this.elm.wire_style++;
		if (this.elm.wire_style > global.CONSTANTS.WIRE_STYLE_4) {
			this.elm.wire_style = global.CONSTANTS.WIRE_STYLE_0;
		}
		this.set_wire_style(this.elm.wire_style);
	}
	increment_flip(): void {}
	remove_focus(): void {
		if (global.variables.focused && global.variables.focused_id === this.elm.id && global.variables.focused_type === this.elm.type) {
			global.variables.focused_id = global.CONSTANTS.NULL;
			global.variables.focused_type = global.CONSTANTS.NULL;
			global.variables.focused_bounds = global.CONSTANTS.NULL;
			global.variables.focused = false;
		}
	}
	remove_selection(): void {
		if (global.variables.selected_id === this.elm.id && global.variables.selected_type === this.elm.type) {
			global.variables.selected_id = global.CONSTANTS.NULL;
			global.variables.selected_type = -1;
			global.variables.selected_bounds = global.CONSTANTS.NULL;
			global.variables.selected_properties = global.CONSTANTS.NULL;
			global.variables.selected_wire_style = global.CONSTANTS.NULL;
			global.variables.selected = false;
		}
	}
	recolor(): void {
		if (global.variables.selected) {
			if (global.variables.selected_id === this.elm.id && global.variables.selected_type === this.elm.type) {
				this.line_paint.set_color(global.COLORS.SELECTED_COLOR);
				this.point_paint.set_color(global.COLORS.SELECTED_COLOR);
				this.text_paint.set_color(global.COLORS.SELECTED_COLOR);
			} else {
				this.line_paint.set_color(global.COLORS.ELEMENT_COLOR);
				this.point_paint.set_color(global.COLORS.ELEMENT_COLOR);
				this.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
			}
		} else {
			if (this.multi_selected) {
				this.line_paint.set_color(global.COLORS.MULTI_SELECTED_COLOR);
				this.point_paint.set_color(global.COLORS.MULTI_SELECTED_COLOR);
				this.text_paint.set_color(global.COLORS.MULTI_SELECTED_COLOR);
			} else {
				this.line_paint.set_color(global.COLORS.ELEMENT_COLOR);
				this.point_paint.set_color(global.COLORS.ELEMENT_COLOR);
				this.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
			}
		}
	}
	wire_collision(): boolean {
		if (this.elm.wire_style === global.CONSTANTS.WIRE_STYLE_0) {
			let collision_0: boolean = global.utils.line_collision(
				global.variables.mouse_x - (global.variables.node_space_x >> 1),
				global.variables.mouse_y - global.variables.canvas_stroke_width_1_zoom,
				global.variables.mouse_x + (global.variables.node_space_x >> 1),
				global.variables.mouse_y + global.variables.canvas_stroke_width_1_zoom,
				this.p1.x,
				this.p1.y,
				this.p2.x,
				this.p2.y
			);
			let collision_1: boolean = global.utils.line_collision(
				global.variables.mouse_x - global.variables.canvas_stroke_width_1_zoom,
				global.variables.mouse_y - (global.variables.node_space_x >> 1),
				global.variables.mouse_x + global.variables.canvas_stroke_width_1,
				global.variables.mouse_y + (global.variables.node_space_x >> 1),
				this.p1.x,
				this.p1.y,
				this.p2.x,
				this.p2.y
			);
			return collision_0 || collision_1;
		} else {
			let collision_2: boolean = global.utils.line_collision(
				global.variables.mouse_x - (global.variables.node_space_x >> 1),
				global.variables.mouse_y,
				global.variables.mouse_x + (global.variables.node_space_x >> 1),
				global.variables.mouse_y,
				this.p1.x,
				this.p1.y,
				this.wire_point.x,
				this.wire_point.y
			);
			let collision_3: boolean = global.utils.line_collision(
				global.variables.mouse_x,
				global.variables.mouse_y - (global.variables.node_space_x >> 1),
				global.variables.mouse_x,
				global.variables.mouse_y + global.variables.node_space_x / 2,
				this.p1.x,
				this.p1.y,
				this.wire_point.x,
				this.wire_point.y
			);
			let collision_4: boolean = global.utils.line_collision(
				global.variables.mouse_x - (global.variables.node_space_x >> 1),
				global.variables.mouse_y,
				global.variables.mouse_x + (global.variables.node_space_x >> 1),
				global.variables.mouse_y,
				this.wire_point.x,
				this.wire_point.y,
				this.p2.x,
				this.p2.y
			);
			let collision_5: boolean = global.utils.line_collision(
				global.variables.mouse_x,
				global.variables.mouse_y - (global.variables.node_space_x >> 1),
				global.variables.mouse_x,
				global.variables.mouse_y + global.variables.node_space_x / 2,
				this.wire_point.x,
				this.wire_point.y,
				this.p2.x,
				this.p2.y
			);
			return collision_2 || collision_3 || collision_4 || collision_5;
		}
	}
	is_selected_element(): boolean {
		return global.variables.selected_id === this.elm.id && global.variables.selected_type === this.elm.type;
	}
	draw_component(canvas: GraphicsEngine): void {
		this.refactor();
		this.recolor();
		this.resize();
		if (this.multi_selected) {
			multi_select_manager.determine_enveloping_bounds(this.bounds);
		}
		if (this.elm.wire_style === global.CONSTANTS.WIRE_STYLE_0) {
			this.indexer = 0;
			this.line_buffer = [];
			if (!this.is_selected_element) {
				global.variables.wire_line_buffer[global.variables.wire_line_buffer_index++] = Array(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
			} else {
				this.line_buffer[this.indexer++] = Array(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
				canvas.draw_line_buffer(this.line_buffer, this.line_paint);
			}
			if (global.flags.flag_simulating && simulation_manager.solutions_ready && this.is_selected_element() && simulation_manager.simulation_time >= simulation_manager.time_step) {
				if (this.elm.consistent()) {
					this.angle = global.utils.retrieve_angle(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
					if ((this.angle > 170 && this.angle < 190) || (this.angle > -10 && this.angle < 10)) {
						canvas.draw_text(
							global.TEMPLATES.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.utils.exponentiate_quickly(this.wire_voltage)).replace('{UNIT}', 'V'),
							this.c_x,
							this.c_y - this.y_space * 1.5,
							this.text_paint
						);
					} else if ((this.angle > 260 && this.angle < 280) || (this.angle > 80 && this.angle < 100)) {
						canvas.rotate(this.c_x, this.c_y, -90);
						canvas.draw_text(
							global.TEMPLATES.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.utils.exponentiate_quickly(this.wire_voltage)).replace('{UNIT}', 'V'),
							this.c_x,
							this.c_y - this.y_space * 1.5,
							this.text_paint
						);
						canvas.restore();
					} else {
						canvas.rotate(this.c_x, this.c_y, Math.round(this.angle));
						canvas.draw_text(
							global.TEMPLATES.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.utils.exponentiate_quickly(this.wire_voltage)).replace('{UNIT}', 'V'),
							this.c_x,
							this.c_y - this.y_space * 1.5,
							this.text_paint
						);
						canvas.restore();
					}
				}
			}
		} else {
			this.indexer = 0;
			this.circle_buffer = [];
			this.line_buffer = [];
			if (!this.is_selected_element) {
				global.variables.wire_line_buffer[global.variables.wire_line_buffer_index++] = Array(this.p1.x, this.p1.y, this.wire_point.x, this.wire_point.y);
				global.variables.wire_line_buffer[global.variables.wire_line_buffer_index++] = Array(this.p2.x, this.p2.y, this.wire_point.x, this.wire_point.y);
			} else {
				this.line_buffer[this.indexer++] = Array(this.p1.x, this.p1.y, this.wire_point.x, this.wire_point.y);
				this.line_buffer[this.indexer++] = Array(this.p2.x, this.p2.y, this.wire_point.x, this.wire_point.y);
				canvas.draw_line_buffer(this.line_buffer, this.line_paint);
			}
			if (global.flags.flag_simulating && simulation_manager.solutions_ready && this.is_selected_element() && simulation_manager.simulation_time >= simulation_manager.time_step) {
				if (this.elm.consistent()) {
					if (global.variables.workspace_zoom_scale > 1.085 || (!MOBILE_MODE && global.variables.workspace_zoom_scale >= 0.99)) {
						if (global.utils.norm(this.wire_point.x - this.p1.x, this.wire_point.y - this.p1.y) > global.utils.norm(this.p2.x - this.wire_point.x, this.p2.y - this.wire_point.y) * 1.05) {
							this.angle = global.utils.retrieve_angle(this.wire_point.x - this.p1.x, this.wire_point.y - this.p1.y);
							if ((this.angle > 170 && this.angle < 190) || (this.angle > -10 && global.utils.retrieve_angle(this.wire_point.x - this.p1.x, this.wire_point.y - this.p1.y) < 10)) {
								canvas.draw_text(
									global.TEMPLATES.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.utils.exponentiate_quickly(this.wire_voltage)).replace('{UNIT}', 'V'),
									global.utils.get_average2(this.wire_point.x, this.p1.x),
									global.utils.get_average2(this.wire_point.y, this.p1.y) - this.y_space * 1.5,
									this.text_paint
								);
							} else if ((this.angle > 260 && this.angle < 280) || (this.angle > 80 && this.angle < 100)) {
								canvas.rotate(global.utils.get_average2(this.wire_point.x, this.p1.x), global.utils.get_average2(this.wire_point.y, this.p1.y), -90);
								canvas.draw_text(
									global.TEMPLATES.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.utils.exponentiate_quickly(this.wire_voltage)).replace('{UNIT}', 'V'),
									global.utils.get_average2(this.wire_point.x, this.p1.x),
									global.utils.get_average2(this.wire_point.y, this.p1.y) - this.y_space * 1.5,
									this.text_paint
								);
								canvas.restore();
							} else {
								canvas.rotate(this.c_x, this.c_y, Math.round(global.utils.retrieve_angle(this.p2.x - this.p1.x, this.p2.y - this.p1.y)));
								canvas.draw_text(
									global.TEMPLATES.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.utils.exponentiate_quickly(this.wire_voltage)).replace('{UNIT}', 'V'),
									this.c_x,
									this.c_y - this.y_space * 1.5,
									this.text_paint
								);
								canvas.restore();
							}
						} else {
							this.angle = global.utils.retrieve_angle(this.p2.x - this.wire_point.x, this.p2.y - this.wire_point.y);
							if ((this.angle > 170 && this.angle < 190) || (this.angle > -10 && global.utils.retrieve_angle(this.p2.x - this.wire_point.x, this.p2.y - this.wire_point.y) < 10)) {
								canvas.draw_text(
									global.TEMPLATES.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.utils.exponentiate_quickly(this.wire_voltage)).replace('{UNIT}', 'V'),
									global.utils.get_average2(this.wire_point.x, this.p2.x),
									global.utils.get_average2(this.wire_point.y, this.p2.y) - this.y_space * 1.5,
									this.text_paint
								);
							} else if ((this.angle > 260 && this.angle < 280) || (this.angle > 80 && this.angle < 100)) {
								canvas.rotate(global.utils.get_average2(this.wire_point.x, this.p2.x), global.utils.get_average2(this.wire_point.y, this.p2.y), -90);
								canvas.draw_text(
									global.TEMPLATES.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.utils.exponentiate_quickly(this.wire_voltage)).replace('{UNIT}', 'V'),
									global.utils.get_average2(this.wire_point.x, this.p2.x),
									global.utils.get_average2(this.wire_point.y, this.p2.y) - this.y_space * 1.5,
									this.text_paint
								);
								canvas.restore();
							} else {
								canvas.rotate(this.c_x, this.c_y, Math.round(global.utils.retrieve_angle(this.p2.x - this.p1.x, this.p2.y - this.p1.y)));
								canvas.draw_text(
									global.TEMPLATES.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.utils.exponentiate_quickly(this.wire_voltage)).replace('{UNIT}', 'V'),
									this.c_x,
									this.c_y - this.y_space * 1.5,
									this.text_paint
								);
								canvas.restore();
							}
						}
					}
				}
			}
		}
		if (global.CONSTANTS.DEVELOPER_MODE) {
			canvas.draw_text(<string>(<unknown>this.elm.id), this.c_x, this.c_y, this.text_paint);
			canvas.draw_rect2(this.total_bounds, this.line_paint);
		}
	}
	patch(): void {
		if (!global.utils.not_null(this.total_bounds)) {
			this.total_bounds = new RectF(0, 0, 0, 0);
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
	}
	time_data(): TIME_DATA_TEMPLATE_T {
		/* #INSERT_GENERATE_TIME_DATA# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		var time_data: TIME_DATA_TEMPLATE_T = global.utils.copy(global.TEMPLATES.TIME_DATA_TEMPLATE);
		var keys: Array<string> = Object.keys(this.elm.properties);
		for (var i: number = keys.length - 1; i > -1; i--) {
			if (typeof this.elm.properties[keys[i]] === 'number') {
				if (keys[i] === 'Frequency' || keys[i] === 'Resistance' || keys[i] === 'Capacitance' || keys[i] === 'Inductance') {
					time_data[keys[i]] = global.utils.copy(this.elm.properties[keys[i]]);
				}
			}
		}

		return time_data;
		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	reset(): void {}
}
