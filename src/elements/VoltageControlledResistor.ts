'use strict';
class VoltageControlledResistor {
	private initialized: boolean;
	public bounds: RectF;
	public elm: Element3;
	private p1: PointF;
	private p2: PointF;
	private p3: PointF;
	private vcr_0: PointF;
	private vcr_1: PointF;
	private vcr_2: PointF;
	private vcr_3: PointF;
	private vcr_4: PointF;
	private vcr_6: PointF;
	private vcr_5: PointF;
	private vcr_7: PointF;
	private vcr_8: PointF;
	private vcr_9: PointF;
	private vcr_10: PointF;
	private vcr_11: PointF;
	private vcr_12: PointF;
	private vcr_13: PointF;
	private vcr_14: PointF;
	private vcr_15: PointF;
	private vcr_16: PointF;
	private c_x: number;
	private c_y: number;
	private x_space: number;
	private y_space: number;
	private connect1_x: number;
	private connect1_y: number;
	private connect2_x: number;
	private connect2_y: number;
	private theta_m90: number;
	private theta: number;
	private phi: number;
	private grid_point: Array<number>;
	private line_paint: Paint;
	private point_paint: Paint;
	private text_paint: Paint;
	public is_translating: boolean;
	public wire_reference: Array<WIRE_REFERENCE_T>;
	public simulation_id: number;
	private indexer: number;
	private m_x: number;
	private m_y: number;
	public multi_selected: boolean;
	private line_buffer: Array<Array<number>>;
	private circle_buffer: Array<Array<number>>;
	private build_element_flag: boolean;
	private angle: number;
	private node_id_array: Array<number>;
	constructor(type: number, id: number, n1: number, n2: number, n3: number) {
		this.initialized = false;
		this.bounds = new RectF(0, 0, 0, 0);
		this.elm = new Element3(id, type, global.utils.copy(global.PROPERTY.PROPERTY_VCR));
		this.elm.set_nodes(n1, n2, n3);
		if (this.elm.consistent()) {
			this.bounds.set_center2(
				global.utils.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n3].location.x),
				global.utils.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n3].location.y),
				global.variables.node_space_x * 2,
				global.variables.node_space_y * 2
			);
		}
		this.elm.set_rotation(global.CONSTANTS.ROTATION_0);
		this.elm.set_flip(global.CONSTANTS.FLIP_0);
		this.release_nodes();
		let vertices: Array<number> = this.get_vertices();
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
		this.vcr_0 = new PointF(0, 0);
		this.vcr_1 = new PointF(0, 0);
		this.vcr_2 = new PointF(0, 0);
		this.vcr_3 = new PointF(0, 0);
		this.vcr_4 = new PointF(0, 0);
		this.vcr_6 = new PointF(0, 0);
		this.vcr_5 = new PointF(0, 0);
		this.vcr_7 = new PointF(0, 0);
		this.vcr_8 = new PointF(0, 0);
		this.vcr_9 = new PointF(0, 0);
		this.vcr_10 = new PointF(0, 0);
		this.vcr_11 = new PointF(0, 0);
		this.vcr_12 = new PointF(0, 0);
		this.vcr_13 = new PointF(0, 0);
		this.vcr_14 = new PointF(0, 0);
		this.vcr_15 = new PointF(0, 0);
		this.vcr_16 = new PointF(0, 0);
		this.c_x = this.bounds.get_center_x();
		this.c_y = this.bounds.get_center_y();
		this.x_space = global.variables.node_space_x >> 1;
		this.y_space = global.variables.node_space_y >> 1;
		this.connect1_x = 0;
		this.connect1_y = 0;
		this.connect2_x = 0;
		this.connect2_y = 0;
		this.theta_m90 = global.utils.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y) - global.CONSTANTS.PI_DIV_2;
		this.theta = global.utils.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y);
		this.phi = global.utils.retrieve_angle_radian(this.c_x - this.p2.x, this.c_y - this.p2.y);
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
		this.indexer = 0;
		this.m_x = 0;
		this.m_y = 0;
		this.initialized = true;
		this.multi_selected = false;
		this.line_buffer = [];
		this.circle_buffer = [];
		this.build_element_flag = true;
		this.angle = 0;
		this.node_id_array = [];
	}
	refresh_bounds(): void {
		if (this.elm.consistent()) {
			this.p1 = new PointF(0, 0);
			this.p2 = new PointF(0, 0);
			this.p3 = new PointF(0, 0);
			this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
			this.p2.set_point(nodes[this.elm.n2].location.x, nodes[this.elm.n2].location.y);
			this.p3.set_point(nodes[this.elm.n3].location.x, nodes[this.elm.n3].location.y);
			this.bounds.set_center2(
				global.utils.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n3].location.x),
				global.utils.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n3].location.y),
				global.variables.node_space_x * 2,
				global.variables.node_space_y * 2
			);
		}
	}
	push_reference(ref: WIRE_REFERENCE_T): void {
		this.wire_reference.push(ref);
	}
	update(): void {
		if (global.flags.flag_simulating && simulation_manager.solutions_ready && simulation_manager.simulation_step !== 0) {
			if (this.elm.consistent()) {
				this.elm.properties['Input Voltage'] = global.utils.limit(engine_functions.get_voltage(this.elm.n2, -1), this.elm.properties['Low Voltage'], this.elm.properties['High Voltage']);
				if (this.elm.properties['Interpolate'] === global.CONSTANTS.ON) {
					this.elm.properties['Output Resistance'] = global.utils.linterp(
						[
							this.elm.properties['High Voltage'] * 0,
							this.elm.properties['High Voltage'] * 0.25,
							this.elm.properties['High Voltage'] * 0.5,
							this.elm.properties['High Voltage'] * 0.75,
							this.elm.properties['High Voltage']
						],
						[this.elm.properties['Elm0'], this.elm.properties['Elm1'], this.elm.properties['Elm2'], this.elm.properties['Elm3'], this.elm.properties['Elm4']],
						this.elm.properties['Input Voltage']
					);
				} else if (this.elm.properties['Interpolate'] === global.CONSTANTS.OFF) {
					let index: number = 0;
					if (this.elm.properties['Input Voltage'] >= this.elm.properties['High Voltage'] * 0 && this.elm.properties['Input Voltage'] <= this.elm.properties['High Voltage'] * 0.2) {
						index = 0;
					} else if (this.elm.properties['Input Voltage'] >= this.elm.properties['High Voltage'] * 0.2 && this.elm.properties['Input Voltage'] <= this.elm.properties['High Voltage'] * 0.4) {
						index = 1;
					} else if (this.elm.properties['Input Voltage'] >= this.elm.properties['High Voltage'] * 0.4 && this.elm.properties['Input Voltage'] <= this.elm.properties['High Voltage'] * 0.6) {
						index = 2;
					} else if (this.elm.properties['Input Voltage'] >= this.elm.properties['High Voltage'] * 0.6 && this.elm.properties['Input Voltage'] <= this.elm.properties['High Voltage'] * 0.8) {
						index = 3;
					} else if (this.elm.properties['Input Voltage'] >= this.elm.properties['High Voltage'] * 0.8 && this.elm.properties['Input Voltage'] <= this.elm.properties['High Voltage'] * 1.0) {
						index = 4;
					}
					this.elm.properties['Output Resistance'] = [this.elm.properties['Elm0'], this.elm.properties['Elm1'], this.elm.properties['Elm2'], this.elm.properties['Elm3'], this.elm.properties['Elm4']][
						index
					];
				}
			}
		}
	}
	stamp(): void {
		if (this.elm.consistent()) {
			engine_functions.stamp_resistor(this.elm.n1, this.elm.n3, global.utils.limit(this.elm.properties['Output Resistance'], global.settings.WIRE_RESISTANCE, global.settings.R_MAX));
			engine_functions.stamp_node(this.elm.n2, global.settings.R_MAX);
		}
	}
	get_vertices(): Array<number> {
		let vertices: Array<number> = [];
		let p1: Array<number> = [];
		let p2: Array<number> = [];
		let p3: Array<number> = [];
		if (this.elm.rotation === global.CONSTANTS.ROTATION_0) {
			p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
			p2 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.get_center_y() - global.variables.node_space_y);
			p3 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
			vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
		} else if (this.elm.rotation === global.CONSTANTS.ROTATION_90) {
			p1 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.get_center_y() - global.variables.node_space_y);
			p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
			p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.get_center_y() + global.variables.node_space_y);
			vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
		} else if (this.elm.rotation === global.CONSTANTS.ROTATION_180) {
			p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
			p2 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.get_center_y() + global.variables.node_space_y);
			p3 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
			vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
		} else if (this.elm.rotation === global.CONSTANTS.ROTATION_270) {
			p1 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.get_center_y() + global.variables.node_space_y);
			p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
			p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.get_center_y() - global.variables.node_space_y);
			vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
		} else {
			p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
			p2 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.get_center_y() - global.variables.node_space_y);
			p3 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
			vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
		}
		return vertices;
	}
	release_wires(): void {
		if (this.wire_reference.length > 0) {
			let id: number = -1;
			for (var i: number = this.wire_reference.length - 1; i > -1; i--) {
				id = engine_functions.get_wire(this.wire_reference[i]['wire_id']);
				if (id > -1 && id < wires.length) {
					wires[id].release_nodes();
					wires.splice(id, 1);
				}
			}
			this.wire_reference = [];
		}
	}
	release_nodes(): void {
		if (this.elm.consistent()) {
			nodes[this.elm.n1].remove_reference(this.elm.id, this.elm.type);
			nodes[this.elm.n2].remove_reference(this.elm.id, this.elm.type);
			nodes[this.elm.n3].remove_reference(this.elm.id, this.elm.type);
			this.elm.set_nodes(-1, -1, -1);
		}
	}
	capture_nodes(): void {
		let vertices: Array<number> = this.get_vertices();
		this.elm.map_node3(vertices[0], vertices[1], vertices[2], vertices[3], vertices[4], vertices[5]);
		if (this.elm.consistent() && !this.is_translating) {
			nodes[this.elm.n1].add_reference(this.elm.id, this.elm.type);
			nodes[this.elm.n2].add_reference(this.elm.id, this.elm.type);
			nodes[this.elm.n3].add_reference(this.elm.id, this.elm.type);
		}
	}
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
				if (this.bounds.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, this.bounds.get_width() >> 1, this.bounds.get_height() >> 1) && !global.variables.component_touched) {
					this.is_translating = false;
					global.variables.focused_id = this.elm.id;
					global.variables.focused_type = this.elm.type;
					global.variables.focused_bounds = global.utils.copy(this.bounds);
					global.variables.focused = true;
					global.variables.component_touched = true;
				} else {
					if (this.elm.consistent() && !global.variables.component_touched && !global.flags.flag_simulating) {
						if (nodes[this.elm.n1].contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
							this.handle_wire_builder(this.elm.n1, global.variables.anchor_point['p1']);
							global.variables.component_touched = true;
						} else if (nodes[this.elm.n2].contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
							this.handle_wire_builder(this.elm.n2, global.variables.anchor_point['p2']);
							global.variables.component_touched = true;
						} else if (nodes[this.elm.n3].contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
							this.handle_wire_builder(this.elm.n3, global.variables.anchor_point['p3']);
							global.variables.component_touched = true;
						}
					}
				}
			}
		}
	}
	handle_wire_builder(n: number, anchor: number): void {
		global.utils.update_wire_builder(n, anchor, this.elm.type, this.elm.id);
	}
	move_element(dx: number, dy: number): void {
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
	mouse_move(): void {
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
					} else {
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
	mouse_up(): void {
		if (global.flags.flag_idle) {
			if (global.variables.focused && global.variables.focused_id === this.elm.id && global.variables.focused_type === this.elm.type) {
				if (this.is_translating) {
					this.is_translating = false;
					this.capture_nodes();
					this.push_history();
					this.bounds.anchored = true;
					this.anchor_wires();
				} else {
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
	select(): void {
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
	remove_focus(): void {
		global.utils.remove_focus(this.elm.type, this.elm.id);
	}
	remove_selection(): void {
		global.utils.remove_selection(this.elm.type, this.elm.id);
	}
	wire_reference_maintenance(): void {
		global.utils.wire_reference_maintenance(this.wire_reference);
	}
	unanchor_wires(): void {
		global.utils.unanchor_wires(this.wire_reference, this.get_vertices());
	}
	anchor_wires(): void {
		global.utils.anchor_wires(this.wire_reference, this.get_vertices());
	}
	set_flip(flip: number): void {
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
	set_rotation(rotation: number): void {
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
	push_history(): void {
		if (this.initialized) {
			global.variables.history['packet'].push(engine_functions.history_snapshot());
		}
	}
	build_element(): void {
		if (
			(this.build_element_flag || global.flags.flag_build_element) &&
			((this.c_x >= view_port.left - global.variables.node_space_x &&
				this.c_x - global.variables.node_space_x <= view_port.right &&
				this.c_y >= view_port.top + -global.variables.node_space_y &&
				this.c_y - global.variables.node_space_y <= view_port.bottom) ||
				global.flags.flag_picture_request)
		) {
			let cache_0: number = 0.66 * this.x_space;
			let cache_1: number = 0.66 * this.y_space;
			let cache_2: number = 0.33 * this.x_space;
			let cache_3: number = 0.33 * this.y_space;
			let cache_4: number = 0.667 * this.x_space;
			let cache_5: number = 0.667 * this.y_space;
			let cache_6: number = 0.5 * this.x_space;
			let cache_7: number = 0.5 * this.y_space;
			let cache_8: number = this.x_space;
			let cache_9: number = this.y_space;
			this.connect1_x = this.c_x - cache_8 * global.utils.cosine(this.theta);
			this.connect1_y = this.c_y - cache_9 * global.utils.sine(this.theta);
			this.connect2_x = this.c_x + cache_8 * global.utils.cosine(this.theta);
			this.connect2_y = this.c_y + cache_9 * global.utils.sine(this.theta);
			this.vcr_4.x = this.c_x - cache_0 * global.utils.cosine(this.theta) + (cache_8 >> 1) * global.utils.cosine(this.theta_m90);
			this.vcr_4.y = this.c_y - cache_1 * global.utils.sine(this.theta) + (cache_9 >> 1) * global.utils.sine(this.theta_m90);
			this.vcr_5.x = this.c_x + (cache_8 >> 1) * global.utils.cosine(this.theta_m90);
			this.vcr_5.y = this.c_y + (cache_9 >> 1) * global.utils.sine(this.theta_m90);
			this.vcr_6.x = this.c_x - cache_2 * global.utils.cosine(this.theta) + (cache_8 >> 1) * global.utils.cosine(Math.PI + this.theta_m90);
			this.vcr_6.y = this.c_y - cache_3 * global.utils.sine(this.theta) + (cache_9 >> 1) * global.utils.sine(Math.PI + this.theta_m90);
			this.vcr_7.x = this.c_x + cache_2 * global.utils.cosine(this.theta) + (cache_8 >> 1) * global.utils.cosine(Math.PI + this.theta_m90);
			this.vcr_7.y = this.c_y + cache_3 * global.utils.sine(this.theta) + (cache_9 >> 1) * global.utils.sine(Math.PI + this.theta_m90);
			this.vcr_8.x = this.c_x + cache_0 * global.utils.cosine(this.theta) + (cache_8 >> 1) * global.utils.cosine(this.theta_m90);
			this.vcr_8.y = this.c_y + cache_1 * global.utils.sine(this.theta) + (cache_9 >> 1) * global.utils.sine(this.theta_m90);
			this.vcr_9.x = this.c_x + cache_8 * global.utils.cosine(this.theta) + cache_4 * global.utils.cosine(this.theta_m90);
			this.vcr_9.y = this.c_y + cache_9 * global.utils.sine(this.theta) + cache_5 * global.utils.sine(this.theta_m90);
			this.vcr_10.x = this.c_x - cache_8 * global.utils.cosine(this.theta) + cache_4 * global.utils.cosine(this.theta_m90);
			this.vcr_10.y = this.c_y - cache_9 * global.utils.sine(this.theta) + cache_5 * global.utils.sine(this.theta_m90);
			this.vcr_11.x = this.c_x + cache_8 * global.utils.cosine(this.theta) + cache_4 * global.utils.cosine(Math.PI + this.theta_m90);
			this.vcr_11.y = this.c_y + cache_9 * global.utils.sine(this.theta) + cache_5 * global.utils.sine(Math.PI + this.theta_m90);
			this.vcr_12.x = this.c_x - cache_8 * global.utils.cosine(this.theta) + cache_4 * global.utils.cosine(Math.PI + this.theta_m90);
			this.vcr_12.y = this.c_y - cache_9 * global.utils.sine(this.theta) + cache_5 * global.utils.sine(Math.PI + this.theta_m90);
			this.vcr_0.x = this.connect1_x + cache_8 * global.utils.cosine(this.theta) + cache_6 * global.utils.cosine(this.theta_m90);
			this.vcr_0.y = this.connect1_y + cache_9 * global.utils.sine(this.theta) + cache_7 * global.utils.sine(this.theta_m90);
			this.vcr_13.x = this.p1.x + 1.5 * cache_8 * global.utils.cosine(this.theta - global.CONSTANTS.PI_DIV_4);
			this.vcr_13.y = this.p1.y + 1.5 * cache_9 * global.utils.sine(this.theta - global.CONSTANTS.PI_DIV_4);
			this.vcr_14.x = this.p3.x - 1.5 * cache_8 * global.utils.cosine(this.theta - global.CONSTANTS.PI_DIV_4);
			this.vcr_14.y = this.p3.y - 1.5 * cache_9 * global.utils.sine(this.theta - global.CONSTANTS.PI_DIV_4);
			this.theta = global.utils.retrieve_angle_radian(this.vcr_14.x - this.vcr_13.x, this.vcr_14.y - this.vcr_13.y);
			this.vcr_15.x = this.vcr_14.x - 0.4 * cache_8 * global.utils.cosine(this.theta + global.CONSTANTS.PI_DIV_6);
			this.vcr_15.y = this.vcr_14.y - 0.4 * cache_9 * global.utils.sine(this.theta + global.CONSTANTS.PI_DIV_6);
			this.vcr_16.x = this.vcr_14.x - 0.4 * cache_8 * global.utils.cosine(this.theta - global.CONSTANTS.PI_DIV_6);
			this.vcr_16.y = this.vcr_14.y - 0.4 * cache_9 * global.utils.sine(this.theta - global.CONSTANTS.PI_DIV_6);
			this.theta = global.utils.retrieve_angle_radian(-(this.c_x - this.p2.x), -(this.c_y - this.p2.y));
			this.vcr_1.x = this.p2.x + 0.8 * cache_8 * global.utils.cosine(this.phi);
			this.vcr_1.y = this.p2.y + 0.8 * cache_9 * global.utils.sine(this.phi);
			this.vcr_2.x = this.vcr_1.x + 0.4 * cache_8 * global.utils.cosine(this.theta - global.CONSTANTS.PI_DIV_6);
			this.vcr_2.y = this.vcr_1.y + 0.4 * cache_9 * global.utils.sine(this.theta - global.CONSTANTS.PI_DIV_6);
			this.vcr_3.x = this.vcr_1.x + 0.4 * cache_8 * global.utils.cosine(this.theta + global.CONSTANTS.PI_DIV_6);
			this.vcr_3.y = this.vcr_1.y + 0.4 * cache_9 * global.utils.sine(this.theta + global.CONSTANTS.PI_DIV_6);
			this.theta = global.utils.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y);
			this.build_element_flag = false;
		}
	}
	resize(): void {
		if (this.build_element_flag || global.flags.flag_build_element) {
			if (this.bounds.anchored) {
				if (this.elm.consistent()) {
					this.bounds.set_center2(
						global.utils.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n3].location.x),
						global.utils.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n3].location.y),
						global.variables.node_space_x * 2,
						global.variables.node_space_y * 2
					);
					this.refactor();
				}
				this.unanchor_wires();
				this.anchor_wires();
			} else {
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
	refactor(): void {
		let vertices: Array<number> = this.get_vertices();
		this.p1.x = vertices[0];
		this.p1.y = vertices[1];
		this.p2.x = vertices[2];
		this.p2.y = vertices[3];
		this.p3.x = vertices[4];
		this.p3.y = vertices[5];
		this.x_space = global.variables.node_space_x >> 1;
		this.y_space = global.variables.node_space_y >> 1;
		this.c_x = this.bounds.get_center_x();
		this.c_y = this.bounds.get_center_y();
		this.theta_m90 = global.utils.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y) - global.CONSTANTS.PI_DIV_2;
		this.theta = global.utils.retrieve_angle_radian(this.p3.x - this.p1.x, this.p3.y - this.p1.y);
		this.phi = global.utils.retrieve_angle_radian(this.c_x - this.p2.x, this.c_y - this.p2.y);
		this.build_element();
	}
	increment_rotation(): void {
		this.elm.rotation++;
		if (this.elm.rotation > global.CONSTANTS.ROTATION_270) {
			this.elm.rotation = global.CONSTANTS.ROTATION_0;
		}
		this.set_rotation(this.elm.rotation);
	}
	increment_flip(): void {}
	recolor(): void {
		if (global.variables.selected) {
			if (global.variables.selected_id === this.elm.id && global.variables.selected_type === this.elm.type) {
				this.line_paint.set_color(global.COLORS.SELECTED_COLOR);
				this.point_paint.set_color(global.COLORS.SELECTED_COLOR);
				this.text_paint.set_color(global.COLORS.SELECTED_COLOR);
			} else {
				this.line_paint.set_color(global.COLORS.ELEMENT_COLOR);
				this.point_paint.set_color(global.COLORS.ELEMENT_COLOR);
				this.text_paint.set_color(global.COLORS.ELEMENT_COLOR);
			}
		} else {
			if (this.multi_selected) {
				this.line_paint.set_color(global.COLORS.MULTI_SELECTED_COLOR);
				this.point_paint.set_color(global.COLORS.MULTI_SELECTED_COLOR);
				this.text_paint.set_color(global.COLORS.MULTI_SELECTED_COLOR);
			} else {
				this.line_paint.set_color(global.COLORS.ELEMENT_COLOR);
				this.point_paint.set_color(global.COLORS.ELEMENT_COLOR);
				this.text_paint.set_color(global.COLORS.ELEMENT_COLOR);
			}
		}
	}
	is_selected_element(): boolean {
		return global.variables.selected_id === this.elm.id && global.variables.selected_type === this.elm.type;
	}
	draw_component(canvas: GraphicsEngine): void {
		this.wire_reference_maintenance();
		this.recolor();
		this.resize();
		if (this.multi_selected) {
			multi_select_manager.determine_enveloping_bounds(this.bounds);
		}
		if (
			global.flags.flag_picture_request ||
			(this.c_x >= view_port.left - global.variables.node_space_x &&
				this.c_x - global.variables.node_space_x <= view_port.right &&
				this.c_y >= view_port.top + -global.variables.node_space_y &&
				this.c_y - global.variables.node_space_y <= view_port.bottom)
		) {
			this.indexer = 0;
			this.circle_buffer = [];
			this.line_buffer = [];
			this.line_buffer[this.indexer++] = Array(this.connect1_x, this.connect1_y, this.vcr_4.x, this.vcr_4.y);
			this.line_buffer[this.indexer++] = Array(this.vcr_4.x, this.vcr_4.y, this.vcr_6.x, this.vcr_6.y);
			this.line_buffer[this.indexer++] = Array(this.vcr_6.x, this.vcr_6.y, this.vcr_5.x, this.vcr_5.y);
			this.line_buffer[this.indexer++] = Array(this.vcr_5.x, this.vcr_5.y, this.vcr_7.x, this.vcr_7.y);
			this.line_buffer[this.indexer++] = Array(this.vcr_7.x, this.vcr_7.y, this.vcr_8.x, this.vcr_8.y);
			this.line_buffer[this.indexer++] = Array(this.vcr_8.x, this.vcr_8.y, this.connect2_x, this.connect2_y);
			this.line_buffer[this.indexer++] = Array(this.p1.x, this.p1.y, this.connect1_x, this.connect1_y);
			this.line_buffer[this.indexer++] = Array(this.p3.x, this.p3.y, this.connect2_x, this.connect2_y);
			this.line_buffer[this.indexer++] = Array(this.p2.x, this.p2.y, this.vcr_1.x, this.vcr_1.y);
			this.line_buffer[this.indexer++] = Array(this.vcr_2.x, this.vcr_2.y, this.vcr_1.x, this.vcr_1.y);
			this.line_buffer[this.indexer++] = Array(this.vcr_3.x, this.vcr_3.y, this.vcr_1.x, this.vcr_1.y);
			this.line_buffer[this.indexer++] = Array(this.vcr_14.x, this.vcr_14.y, this.vcr_13.x, this.vcr_13.y);
			this.line_buffer[this.indexer++] = Array(this.vcr_14.x, this.vcr_14.y, this.vcr_15.x, this.vcr_15.y);
			this.line_buffer[this.indexer++] = Array(this.vcr_14.x, this.vcr_14.y, this.vcr_16.x, this.vcr_16.y);
			canvas.draw_line_buffer(this.line_buffer, this.line_paint);
			this.indexer = 0;
			this.circle_buffer[this.indexer++] = Array(this.p1.x, this.p1.y, global.variables.canvas_stroke_width_2_zoom);
			this.circle_buffer[this.indexer++] = Array(this.p2.x, this.p2.y, global.variables.canvas_stroke_width_2_zoom);
			this.circle_buffer[this.indexer++] = Array(this.p3.x, this.p3.y, global.variables.canvas_stroke_width_2_zoom);
			canvas.draw_circle_buffer(this.circle_buffer, this.point_paint);
			if (global.CONSTANTS.DEVELOPER_MODE) {
				canvas.draw_rect2(this.bounds, this.line_paint);
				canvas.draw_text(<string>(<unknown>this.wire_reference.length), this.c_x, this.c_y - 50, this.text_paint);
			}
			if (global.variables.workspace_zoom_scale > 1.085 || (!MOBILE_MODE && global.variables.workspace_zoom_scale >= 0.99)) {
				this.angle = global.utils.retrieve_angle(this.p3.x - this.p1.x, this.p3.y - this.p1.y);
				if (this.angle > 170 && this.angle < 190) {
					canvas.draw_text(
						global.TEMPLATES.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', <string>(<unknown>this.elm.id)),
						this.c_x,
						this.bounds.top + this.bounds.get_height() * 0.1,
						this.text_paint
					);
				} else if (this.angle > -10 && this.angle < 10) {
					canvas.draw_text(
						global.TEMPLATES.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', <string>(<unknown>this.elm.id)),
						this.c_x,
						this.bounds.bottom - this.bounds.get_height() * 0.1,
						this.text_paint
					);
				} else if (this.angle > 260 && this.angle < 280) {
					canvas.rotate(this.c_x, this.c_y, -90);
					canvas.draw_text(
						global.TEMPLATES.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', <string>(<unknown>this.elm.id)),
						this.c_x,
						this.bounds.bottom - this.bounds.get_height() * 0.1,
						this.text_paint
					);
					canvas.restore();
				} else if (this.angle > 80 && this.angle < 100) {
					canvas.rotate(this.c_x, this.c_y, -90);
					canvas.draw_text(
						global.TEMPLATES.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', <string>(<unknown>this.elm.id)),
						this.c_x,
						this.bounds.top + this.bounds.get_height() * 0.1,
						this.text_paint
					);
					canvas.restore();
				}
			}
			if (!MOBILE_MODE) {
				if (
					global.variables.wire_builder['step'] === 0 &&
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
					!global.variables.is_dragging
				) {
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
	patch(): void {
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
		if (!global.utils.not_null(this.vcr_13)) {
			this.vcr_13 = new PointF(0, 0);
		}
		if (!global.utils.not_null(this.vcr_14)) {
			this.vcr_14 = new PointF(0, 0);
		}
		if (!global.utils.not_null(this.vcr_15)) {
			this.vcr_15 = new PointF(0, 0);
		}
		if (!global.utils.not_null(this.vcr_16)) {
			this.vcr_16 = new PointF(0, 0);
		}
		if (!global.utils.not_null(this.initialized)) {
			this.initialized = false;
		}
		if (!global.utils.not_null(this.multi_selected)) {
			this.multi_selected = false;
		}
	}
	reset(): void {}
}
