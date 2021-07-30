'use strict';
class OhmMeter {
	private initialized: boolean;
	private x_axis_length: number;
	private y_axis_length: number;
	private ratio: number;
	public bounds: RectF;
	private trace_bounds: RectF;
	private meter_trace: Trace;
	public elm: Element2;
	private plus_point: PointF;
	private p1: PointF;
	private p2: PointF;
	private theta_m90: number;
	private theta: number;
	private c_x: number;
	private c_y: number;
	private x_space: number;
	private y_space: number;
	private connect1_x: number;
	private connect1_y: number;
	private connect2_x: number;
	private connect2_y: number;
	private grid_point: Array<number>;
	private line_paint: Paint;
	private point_paint: Paint;
	private text_paint: Paint;
	public is_translating: boolean;
	private meter_symbol: MeterSymbols;
	private temp_color: string;
	public resize_meter_trace: boolean;
	private scope_index_check: number;
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
	constructor(type: number, id: number, n1: number, n2: number) {
		this.initialized = false;
		this.x_axis_length = 600;
		this.y_axis_length = 100;
		this.ratio = 0.75;
		this.bounds = new RectF(0, 0, 0, 0);
		this.trace_bounds = new RectF(0, 0, 0, 0);
		this.meter_trace = new Trace(this.x_axis_length, this.y_axis_length, this.ratio);
		this.meter_trace.set_color(global.COLORS.TRACE_DEFAULT_COLOR);
		this.elm = new Element2(id, type, global.utils.copy(global.PROPERTY.PROPERTY_OHMMETER));
		this.elm.set_nodes(n1, n2);
		if (this.elm.consistent()) {
			this.bounds.set_center2(
				global.utils.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n2].location.x),
				global.utils.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n2].location.y),
				global.variables.node_space_x * 2,
				global.variables.node_space_y * 2
			);
			this.trace_bounds.set_bounds(
				this.c_x - global.variables.node_space_x,
				this.c_y - 2 * global.variables.node_space_y,
				this.c_x + global.variables.node_space_x,
				this.c_y - 1 * global.variables.node_space_y
			);
			this.meter_trace.update_parameters(this.trace_bounds, this.ratio, this.trace_bounds.get_width(), this.trace_bounds.get_height(), 0);
		}
		this.elm.set_rotation(global.CONSTANTS.ROTATION_0);
		this.elm.set_flip(global.CONSTANTS.FLIP_0);
		this.release_nodes();
		let vertices: Array<number> = this.get_vertices();
		this.elm.map_node2(vertices[0], vertices[1], vertices[2], vertices[3]);
		this.capture_nodes();
		this.plus_point = new PointF(0, 0);
		this.p1 = new PointF(0, 0);
		this.p2 = new PointF(0, 0);
		if (this.elm.consistent()) {
			this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
			this.p2.set_point(nodes[this.elm.n2].location.x, nodes[this.elm.n2].location.y);
		}
		this.theta_m90 = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.CONSTANTS.PI_DIV_2;
		this.theta = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
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
		this.meter_symbol = new MeterSymbols();
		this.meter_symbol.reset(global.CONSTANTS.METER_SYMBOL_RESISTANCE, global.CONSTANTS.METER_STYLE_0);
		this.meter_symbol.set_bounds(
			this.bounds.left + this.bounds.get_width() * 0.4,
			this.bounds.top + this.bounds.get_height() * 0.4,
			this.bounds.right - this.bounds.get_width() * 0.4,
			this.bounds.bottom - this.bounds.get_height() * 0.4
		);
		this.meter_symbol.set_color(global.COLORS.ELEMENT_COLOR);
		this.temp_color = global.COLORS.GENERAL_RED_COLOR;
		this.build_element();
		this.resize_meter_trace = false;
		this.scope_index_check = -1;
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
			this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
			this.p2.set_point(nodes[this.elm.n2].location.x, nodes[this.elm.n2].location.y);
			this.bounds.set_center2(
				global.utils.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n2].location.x),
				global.utils.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n2].location.y),
				global.variables.node_space_x * 2,
				global.variables.node_space_y * 2
			);
			this.trace_bounds.set_bounds(
				this.c_x - global.variables.node_space_x,
				this.c_y - 2 * global.variables.node_space_y,
				this.c_x + global.variables.node_space_x,
				this.c_y - 1 * global.variables.node_space_y
			);
			this.meter_trace.update_parameters(this.trace_bounds, this.ratio, this.trace_bounds.get_width(), this.trace_bounds.get_height(), 0);
		}
	}
	push_reference(ref: WIRE_REFERENCE_T): void {
		this.wire_reference.push(ref);
	}
	stamp(): void {
		if (this.elm.consistent()) {
			engine_functions.stamp_voltage(this.elm.n1, this.elm.n2, this.elm.properties['Test Voltage'], simulation_manager.ELEMENT_OHMMETER_OFFSET + this.simulation_id);
		}
	}
	get_vertices(): Array<number> {
		let vertices: Array<number> = [];
		let p1: Array<number> = [];
		let p2: Array<number> = [];
		if (this.elm.rotation === global.CONSTANTS.ROTATION_0) {
			p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
			p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
			vertices = Array(p1[0], p1[1], p2[0], p2[1]);
		} else if (this.elm.rotation === global.CONSTANTS.ROTATION_90) {
			p1 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.top);
			p2 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.bottom);
			vertices = Array(p1[0], p1[1], p2[0], p2[1]);
		} else if (this.elm.rotation === global.CONSTANTS.ROTATION_180) {
			p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
			p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
			vertices = Array(p1[0], p1[1], p2[0], p2[1]);
		} else if (this.elm.rotation === global.CONSTANTS.ROTATION_270) {
			p1 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.bottom);
			p2 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.top);
			vertices = Array(p1[0], p1[1], p2[0], p2[1]);
		} else {
			p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
			p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
			vertices = Array(p1[0], p1[1], p2[0], p2[1]);
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
			this.elm.set_nodes(-1, -1);
		}
	}
	capture_nodes(): void {
		let vertices: Array<number> = this.get_vertices();
		this.elm.map_node2(vertices[0], vertices[1], vertices[2], vertices[3]);
		if (this.elm.consistent() && !this.is_translating) {
			nodes[this.elm.n1].add_reference(this.elm.id, this.elm.type);
			nodes[this.elm.n2].add_reference(this.elm.id, this.elm.type);
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
				if (global.variables.wire_builder['step'] === 0 && this.bounds.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, this.bounds.get_width() >> 1, this.bounds.get_height() >> 1) && !global.variables.component_touched) {
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
	reset_trace_path(): void {
		if (global.utils.not_null(this.meter_trace)) {
			this.meter_trace.trace_path.reset();
		}
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
						this.trace_bounds.set_bounds(
							this.c_x - global.variables.node_space_x,
							this.c_y - 2 * global.variables.node_space_y,
							this.c_x + global.variables.node_space_x,
							this.c_y - 1 * global.variables.node_space_y
						);
						this.meter_trace.update_parameters(this.trace_bounds, this.ratio, this.trace_bounds.get_width(), this.trace_bounds.get_height(), 0);
						this.resize_meter_trace = true;
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
		if (this.initialized && !this.is_translating) {
			global.utils.push_history();
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
			let cache_0: number = 1.25 * this.x_space;
			let cache_1: number = 1.25 * this.y_space;
			let cache_2: number = this.x_space;
			let cache_3: number = this.y_space;
			let w_cache: number = this.bounds.get_width() * 0.4;
			let h_cache: number = this.bounds.get_height() * 0.4;
			this.connect1_x = this.c_x - cache_2 * global.utils.cosine(this.theta);
			this.connect1_y = this.c_y - cache_3 * global.utils.sine(this.theta);
			this.connect2_x = this.c_x + cache_2 * global.utils.cosine(this.theta);
			this.connect2_y = this.c_y + cache_3 * global.utils.sine(this.theta);
			this.plus_point.x = this.c_x - cache_0 * global.utils.cosine(this.theta) - cache_0 * global.utils.cosine(this.theta_m90);
			this.plus_point.y = this.c_y - cache_1 * global.utils.sine(this.theta) - cache_1 * global.utils.sine(this.theta_m90);
			this.meter_symbol.set_bounds(this.bounds.left + w_cache, this.bounds.top + h_cache, this.bounds.right - w_cache, this.bounds.bottom - h_cache);
			this.meter_symbol.resize_symbol(global.CONSTANTS.METER_STYLE_0);
			this.build_element_flag = false;
		}
	}
	resize(): void {
		if (this.build_element_flag || global.flags.flag_build_element || this.resize_meter_trace) {
			if (this.bounds.anchored) {
				if (this.elm.consistent()) {
					this.bounds.set_center2(
						global.utils.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n2].location.x),
						global.utils.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n2].location.y),
						global.variables.node_space_x * 2,
						global.variables.node_space_y * 2
					);
					this.refactor();
					this.trace_bounds.set_bounds(
						this.c_x - global.variables.node_space_x,
						this.c_y - 2 * global.variables.node_space_y,
						this.c_x + global.variables.node_space_x,
						this.c_y - global.variables.node_space_y
					);
					this.meter_trace.update_parameters(this.trace_bounds, this.ratio, this.trace_bounds.get_width(), this.trace_bounds.get_height(), 0);
				}
				this.unanchor_wires();
				this.anchor_wires();
				if (this.resize_meter_trace) {
					this.meter_trace.resize_trace();
					this.resize_meter_trace = false;
				}
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
		this.x_space = global.variables.node_space_x >> 1;
		this.y_space = global.variables.node_space_y >> 1;
		this.c_x = this.bounds.get_center_x();
		this.c_y = this.bounds.get_center_y();
		this.theta_m90 = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.CONSTANTS.PI_DIV_2;
		this.theta = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
		this.build_element();
	}
	update(): void { }
	increment_rotation(): void {
		this.elm.rotation++;
		if (this.elm.rotation > global.CONSTANTS.ROTATION_270) {
			this.elm.rotation = global.CONSTANTS.ROTATION_0;
		}
		this.set_rotation(this.elm.rotation);
	}
	increment_flip(): void { }
	map_rotation(): number {
		if (this.elm.rotation === global.CONSTANTS.ROTATION_0 || this.elm.rotation === global.CONSTANTS.ROTATION_180) {
			return this.x_space;
		} else if (this.elm.rotation === global.CONSTANTS.ROTATION_90 || this.elm.rotation === global.CONSTANTS.ROTATION_270) {
			return this.y_space;
		}
	}
	reset_trace(): void {
		this.meter_trace.reset();
	}
	reset_meter(): void {
		this.elm.properties['Voltage'] = 0;
	}
	push_voltage_current(voltage: number, current: number): void {
		if (global.flags.flag_simulating && simulation_manager.simulation_time >= simulation_manager.time_step && simulation_manager.solutions_ready) {
			this.elm.properties['Sensed Resistance'] = Math.abs(voltage / current);
			this.meter_trace.push(this.elm.properties['Sensed Resistance'], simulation_manager.simulation_time);
		}
	}
	get_simulation_index(): number {
		return simulation_manager.node_size + simulation_manager.ELEMENT_OHMMETER_OFFSET + this.simulation_id;
	}
	recolor(): void {
		if (global.variables.selected) {
			if (global.variables.selected_id === this.elm.id && global.variables.selected_type === this.elm.type) {
				this.line_paint.set_color(global.COLORS.SELECTED_COLOR);
				this.point_paint.set_color(global.COLORS.SELECTED_COLOR);
				this.text_paint.set_color(global.COLORS.SELECTED_COLOR);
				this.meter_symbol.set_color(global.COLORS.SELECTED_COLOR);
			} else {
				this.line_paint.set_color(global.COLORS.ELEMENT_COLOR);
				this.point_paint.set_color(global.COLORS.ELEMENT_COLOR);
				this.text_paint.set_color(global.COLORS.ELEMENT_COLOR);
				this.meter_symbol.set_color(global.COLORS.ELEMENT_COLOR);
			}
		} else {
			if (this.multi_selected) {
				this.line_paint.set_color(global.COLORS.MULTI_SELECTED_COLOR);
				this.point_paint.set_color(global.COLORS.MULTI_SELECTED_COLOR);
				this.text_paint.set_color(global.COLORS.MULTI_SELECTED_COLOR);
				this.meter_symbol.set_color(global.COLORS.MULTI_SELECTED_COLOR);
			} else {
				this.line_paint.set_color(global.COLORS.ELEMENT_COLOR);
				this.point_paint.set_color(global.COLORS.ELEMENT_COLOR);
				this.text_paint.set_color(global.COLORS.ELEMENT_COLOR);
				this.meter_symbol.set_color(global.COLORS.ELEMENT_COLOR);
			}
		}
		this.scope_index_check = scope_manager.find_entry_index(this.elm.id, this.elm.type);
		if (this.scope_index_check > -1) {
			if (this.scope_index_check === graph_window.SCOPE_0_INDEX) {
				this.meter_trace.set_color(global.COLORS.TRACE_I_COLOR);
			} else if (this.scope_index_check === graph_window.SCOPE_1_INDEX) {
				this.meter_trace.set_color(global.COLORS.TRACE_II_COLOR);
			} else if (this.scope_index_check === graph_window.SCOPE_2_INDEX) {
				this.meter_trace.set_color(global.COLORS.TRACE_III_COLOR);
			} else {
				this.meter_trace.set_color(global.COLORS.TRACE_DEFAULT_COLOR);
			}
		} else {
			this.meter_trace.set_color(global.COLORS.TRACE_DEFAULT_COLOR);
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
			this.temp_color = this.line_paint.get_color();
			this.line_paint.set_color(global.COLORS.GENERAL_RED_COLOR);
			this.indexer = 0;
			this.circle_buffer = [];
			this.line_buffer = [];
			this.line_buffer[this.indexer++] = Array(this.plus_point.x - this.bounds.get_width() * 0.05, this.plus_point.y, this.plus_point.x + this.bounds.get_width() * 0.05, this.plus_point.y);
			this.line_buffer[this.indexer++] = Array(this.plus_point.x, this.plus_point.y + this.bounds.get_width() * 0.05, this.plus_point.x, this.plus_point.y - this.bounds.get_width() * 0.05);
			canvas.draw_line_buffer(this.line_buffer, this.line_paint);
			this.indexer = 0;
			this.line_paint.set_color(this.temp_color);
			canvas.draw_circle(this.c_x, this.c_y, this.map_rotation(), this.line_paint);
			canvas.draw_line(this.p1.x, this.p1.y, this.connect1_x, this.connect1_y, this.line_paint);
			canvas.draw_line(this.p2.x, this.p2.y, this.connect2_x, this.connect2_y, this.line_paint);
			this.circle_buffer[this.indexer++] = Array(this.p1.x, this.p1.y, global.variables.canvas_stroke_width_2_zoom);
			this.circle_buffer[this.indexer++] = Array(this.p2.x, this.p2.y, global.variables.canvas_stroke_width_2_zoom);
			canvas.draw_circle_buffer(this.circle_buffer, this.point_paint);
			if (global.CONSTANTS.DEVELOPER_MODE) {
				canvas.draw_rect2(this.bounds, this.line_paint);
			}
			this.angle = global.utils.retrieve_angle(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
			if ((this.angle > 170 && this.angle < 190) || (this.angle > -10 && this.angle < 10)) {
				if (global.variables.workspace_zoom_scale > 1.085 || (!MOBILE_MODE && global.variables.workspace_zoom_scale >= 0.99)) {
					if (global.flags.flag_simulating && simulation_manager.simulation_time >= simulation_manager.time_step && simulation_manager.solutions_ready) {
						this.text_paint.set_color(global.COLORS.GENERAL_GREEN_COLOR);
						canvas.draw_text(
							global.TEMPLATES.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.utils.exponentiate_quickly(this.elm.properties['Sensed Resistance'])).replace('{UNIT}', this.elm.properties['units']),
							this.c_x,
							this.bounds.top + this.bounds.get_height() * 0.025,
							this.text_paint
						);
						this.text_paint.set_color(global.COLORS.ELEMENT_COLOR);
					}
					canvas.draw_text(
						global.TEMPLATES.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', <string>(<unknown>this.elm.id)),
						this.c_x,
						this.bounds.bottom - this.bounds.get_height() * 0.025,
						this.text_paint
					);
				}
				this.meter_symbol.draw_symbol(canvas);
			} else if ((this.angle > 260 && this.angle < 280) || (this.angle > 80 && this.angle < 100)) {
				canvas.rotate(this.c_x, this.c_y, -90);
				this.meter_symbol.draw_symbol(canvas);
				if (global.variables.workspace_zoom_scale > 1.085 || (!MOBILE_MODE && global.variables.workspace_zoom_scale >= 0.99)) {
					if (global.flags.flag_simulating && simulation_manager.simulation_time >= simulation_manager.time_step && simulation_manager.solutions_ready) {
						this.text_paint.set_color(global.COLORS.GENERAL_GREEN_COLOR);
						canvas.draw_text(
							global.TEMPLATES.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.utils.exponentiate_quickly(this.elm.properties['Sensed Resistance'])).replace('{UNIT}', this.elm.properties['units']),
							this.c_x,
							this.bounds.top + this.bounds.get_height() * 0.025,
							this.text_paint
						);
						this.recolor();
					}
					canvas.draw_text(
						global.TEMPLATES.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', <string>(<unknown>this.elm.id)),
						this.c_x,
						this.bounds.bottom - this.bounds.get_height() * 0.025,
						this.text_paint
					);
				}
				canvas.restore();
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
					!global.variables.is_dragging &&
					!this.is_translating
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
	draw_trace(canvas: GraphicsEngine): void {
		if (global.flags.flag_simulating) {
			this.meter_trace.draw_trace(canvas, this.bounds.left, 0);
		}
	}
	patch(): void {
		if (this.elm.properties['Test Voltage'] !== 1e-9) {
			this.elm.properties['Test Voltage'] = 1e-9;
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
		if (!global.utils.not_null(this.x_axis_length)) {
			this.x_axis_length = 600;
		}
		if (!global.utils.not_null(this.y_axis_length)) {
			this.y_axis_length = 100;
		}
		if (!global.utils.not_null(this.ratio)) {
			this.ratio = 0.75;
		}
		if (!global.utils.not_null(this.multi_selected)) {
			this.multi_selected = false;
		}
		if (!global.utils.not_null(this.resize_meter_trace)) {
			this.resize_meter_trace = false;
		}
		if (!global.utils.not_null(this.scope_index_check)) {
			this.scope_index_check = -1;
		}
	}
	reset(): void {
		this.elm.properties['Sensed Resistance'] = global.settings.INV_R_MAX;
	}
}
