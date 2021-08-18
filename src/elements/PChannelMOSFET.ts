'use strict';
class PChannelMOSFET {
	private initialized: boolean;
	public bounds: RectF;
	public elm: Element3;
	private p1: PointF;
	private p2: PointF;
	private p3: PointF;
	private pmos_0: PointF;
	private pmos_1: PointF;
	private pmos_2: PointF;
	private pmos_3: PointF;
	private pmos_4: PointF;
	private pmos_5: PointF;
	private pmos_6: PointF;
	private pmos_7: PointF;
	private pmos_8: PointF;
	private equilateral_center: Array<number>;
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
	private gamma: number;
	private kappa: number;
	private gmin: number;
	private gmin_start: number;
	private indexer: number;
	private m_x: number;
	private m_y: number;
	private y_hat: number;
	private y_out: number;
	private _alpha: number;
	private f_cutoff: number;
	public multi_selected: boolean;
	private line_buffer: Array<Array<number>>;
	private circle_buffer: Array<Array<number>>;
	private build_element_flag: boolean;
	private angle: number;
	private node_id_array: Array<number>;
	constructor(type: number, id: number, n1: number, n2: number, n3: number) {
		this.initialized = false;
		this.bounds = new RectF(0, 0, 0, 0);
		this.elm = new Element3(id, type, global.utils.copy(global.PROPERTY.PROPERTY_PMOS));
		this.elm.set_nodes(n1, n2, n3);
		if (this.elm.consistent()) {
			this.equilateral_center = global.utils.equilateral_triangle_center(
				nodes[this.elm.n1].location.x,
				nodes[this.elm.n2].location.x,
				nodes[this.elm.n3].location.x,
				nodes[this.elm.n1].location.y,
				nodes[this.elm.n2].location.y,
				nodes[this.elm.n3].location.y
			);
			this.bounds.set_center2(this.equilateral_center[0], this.equilateral_center[1], global.variables.node_space_x * 2, global.variables.node_space_y * 2);
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
		this.pmos_0 = new PointF(0, 0);
		this.pmos_1 = new PointF(0, 0);
		this.pmos_2 = new PointF(0, 0);
		this.pmos_3 = new PointF(0, 0);
		this.pmos_4 = new PointF(0, 0);
		this.pmos_5 = new PointF(0, 0);
		this.pmos_6 = new PointF(0, 0);
		this.pmos_7 = new PointF(0, 0);
		this.pmos_8 = new PointF(0, 0);
		this.equilateral_center = [];
		this.c_x = this.bounds.get_center_x();
		this.c_y = this.bounds.get_center_y();
		this.x_space = global.variables.node_space_x >> 1;
		this.y_space = global.variables.node_space_y >> 1;
		this.connect1_x = 0;
		this.connect1_y = 0;
		this.connect2_x = 0;
		this.connect2_y = 0;
		if (this.elm.flip === global.CONSTANTS.FLIP_180) {
			this.theta_m90 = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.CONSTANTS.PI_DIV_2;
		} else if (this.elm.flip === global.CONSTANTS.FLIP_0) {
			this.theta_m90 = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) + global.CONSTANTS.PI_DIV_2;
		} else {
			this.theta_m90 = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.CONSTANTS.PI_DIV_2;
		}
		this.theta = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
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
		this.gamma = 0.12;
		this.kappa = 0.414;
		this.gmin = 1e-9;
		this.gmin_start = 12;
		this.indexer = 0;
		this.m_x = 0;
		this.m_y = 0;
		this.y_hat = 0;
		this.y_out = 0;
		this._alpha = 0;
		this.f_cutoff = 250;
		this.initialized = true;
		this.multi_selected = false;
		this.line_buffer = [];
		this.circle_buffer = [];
		this.build_element_flag = true;
		this.angle = 0;
		this.node_id_array = [];
	}
	lpf(inp: number): number {
		this._alpha = (2.0 * Math.PI * simulation_manager.time_step * this.f_cutoff) / (2.0 * Math.PI * simulation_manager.time_step * this.f_cutoff + 1.0);
		this.y_hat = this._alpha * inp + (1 - this._alpha) * this.y_out;
		this.y_out = this.y_hat;
		return this.y_hat;
	}
	refresh_bounds(): void {
		if (this.elm.consistent()) {
			this.p1 = new PointF(0, 0);
			this.p2 = new PointF(0, 0);
			this.p3 = new PointF(0, 0);
			this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
			this.p2.set_point(nodes[this.elm.n2].location.x, nodes[this.elm.n2].location.y);
			this.p3.set_point(nodes[this.elm.n3].location.x, nodes[this.elm.n3].location.y);
			this.equilateral_center = global.utils.equilateral_triangle_center(
				nodes[this.elm.n1].location.x,
				nodes[this.elm.n2].location.x,
				nodes[this.elm.n3].location.x,
				nodes[this.elm.n1].location.y,
				nodes[this.elm.n2].location.y,
				nodes[this.elm.n3].location.y
			);
			this.bounds.set_center2(this.equilateral_center[0], this.equilateral_center[1], global.variables.node_space_x * 2, global.variables.node_space_y * 2);
		}
	}
	push_reference(ref: WIRE_REFERENCE_T): void {
		this.wire_reference.push(ref);
	}
	stamp(): void {
		if (this.elm.consistent()) {
			if (this.elm.properties['Mosfet Mode'] !== 0) {
				engine_functions.stamp_vccs(this.elm.n1, this.elm.n3, this.elm.n2, this.elm.n1, this.elm.properties['gm']);
			}
			engine_functions.stamp_resistor(this.elm.n1, this.elm.n2, 1.0 / this.gmin);
			engine_functions.stamp_current(this.elm.n1, this.elm.n2, this.elm.properties['Io']);
			engine_functions.stamp_resistor(this.elm.n1, this.elm.n2, 1.0 / this.elm.properties['gsd']);
		}
	}
	is_converged(): boolean {
		if (this.get_pmosfet_error() < global.settings.TOLERANCE) {
			return true;
		} else {
			return false;
		}
	}
	get_pmosfet_error(): number {
		return Math.abs(this.elm.properties['Vsg'] - this.elm.properties['Last Vsg']);
	}
	update(): void {
		if (global.flags.flag_simulating && simulation_manager.solutions_ready) {
			if (this.elm.consistent()) {
				this.elm.properties['Last Vsg'] = global.utils.copy(this.elm.properties['Vsg']);
				this.elm.properties['Last Io'] = global.utils.copy(this.elm.properties['Io']);
				this.elm.properties['Vsg'] = global.utils.log_damping(engine_functions.get_voltage(this.elm.n1, this.elm.n3), this.elm.properties['Vsg'], this.gamma, this.kappa);
				this.elm.properties['Vsd'] = global.utils.log_damping(engine_functions.get_voltage(this.elm.n1, this.elm.n2), this.elm.properties['Vsd'], this.gamma, this.kappa);
				this.gmin_step(this.gmin_start, this.get_pmosfet_error());
				let kp: number = 0.5 * this.elm.properties['W/L Ratio'] * -this.elm.properties["K'p"];
				if (this.elm.properties['Vsg'] <= -this.elm.properties['VTP']) {
					this.elm.properties['Mosfet Mode'] = 0;
					this.elm.properties['gm'] = 0;
					this.elm.properties['gsd'] = 1.0 / global.settings.R_MAX;
					this.elm.properties['Io'] = 0;
				} else if (this.elm.properties['Vsd'] <= this.elm.properties['Vsg'] + this.elm.properties['VTP']) {
					this.elm.properties['Mosfet Mode'] = 1;
					this.elm.properties['gsd'] = 2.0 * kp * (this.elm.properties['Vsg'] + this.elm.properties['VTP'] - this.elm.properties['Vsd']);
					this.elm.properties['gm'] = 2.0 * kp * this.elm.properties['Vsd'];
					this.elm.properties['Io'] =
						2.0 * kp * ((this.elm.properties['Vsg'] + this.elm.properties['VTP']) * this.elm.properties['Vsd'] - 0.5 * this.elm.properties['Vsd'] * this.elm.properties['Vsd']) -
						this.elm.properties['Vsg'] * this.elm.properties['gm'] -
						this.elm.properties['Vsd'] * this.elm.properties['gsd'];
				} else if (this.elm.properties['Vsd'] >= this.elm.properties['Vsg'] + this.elm.properties['VTP']) {
					this.elm.properties['Mosfet Mode'] = 2;
					this.elm.properties['gsd'] = kp * this.elm.properties['Lambda'] * Math.pow(this.elm.properties['Vsg'] + this.elm.properties['VTP'], 2);
					this.elm.properties['gm'] = 2.0 * kp * ((this.elm.properties['Vsg'] + this.elm.properties['VTP']) * (1.0 + this.elm.properties['Lambda'] * this.elm.properties['Vsd']));
					this.elm.properties['Io'] =
						kp * Math.pow(this.elm.properties['Vsg'] + this.elm.properties['VTP'], 2) * (1.0 + this.elm.properties['Lambda'] * this.elm.properties['Vsd']) -
						this.elm.properties['Vsg'] * this.elm.properties['gm'] -
						this.elm.properties['Vsd'] * this.elm.properties['gsd'];
				}
			}
		}
	}
	gmin_step(step: number, error: number): void {
		this.gmin = global.settings.GMIN_DEFAULT;
		if (simulation_manager.iterator > step && error > global.settings.TOLERANCE) {
			this.gmin = Math.exp(-24.723 * (1.0 - 0.99 * (simulation_manager.iterator / global.settings.ITL4)));
		}
	}
	get_vertices(): Array<number> {
		let vertices: Array<number> = [];
		let p1: Array<number> = [];
		let p2: Array<number> = [];
		let p3: Array<number> = [];
		if (this.elm.rotation === global.CONSTANTS.ROTATION_0) {
			if (this.elm.flip === global.CONSTANTS.FLIP_0) {
				p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
				p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
				p3 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
			} else if (this.elm.flip === global.CONSTANTS.FLIP_180) {
				p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
				p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
				p3 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
			} else {
				p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
				p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
				p3 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
			}
			vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
		} else if (this.elm.rotation === global.CONSTANTS.ROTATION_90) {
			if (this.elm.flip === global.CONSTANTS.FLIP_0) {
				p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
				p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
				p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.top);
			} else if (this.elm.flip === global.CONSTANTS.FLIP_180) {
				p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
				p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
				p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.bottom);
			} else {
				p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
				p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
				p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.top);
			}
			vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
		} else if (this.elm.rotation === global.CONSTANTS.ROTATION_180) {
			if (this.elm.flip === global.CONSTANTS.FLIP_0) {
				p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
				p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
				p3 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
			} else if (this.elm.flip === global.CONSTANTS.FLIP_180) {
				p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
				p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
				p3 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
			} else {
				p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
				p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
				p3 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
			}
			vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
		} else if (this.elm.rotation === global.CONSTANTS.ROTATION_270) {
			if (this.elm.flip === global.CONSTANTS.FLIP_0) {
				p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
				p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
				p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.bottom);
			} else if (this.elm.flip === global.CONSTANTS.FLIP_180) {
				p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
				p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
				p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.top);
			} else {
				p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
				p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
				p3 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.bottom);
			}
			vertices = Array(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
		} else {
			if (this.elm.flip === global.CONSTANTS.FLIP_0) {
				p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
				p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
				p3 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
			} else if (this.elm.flip === global.CONSTANTS.FLIP_180) {
				p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.bottom);
				p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.top);
				p3 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
			} else {
				p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.top);
				p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.bottom);
				p3 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
			}
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
				if (
					global.variables.wire_builder['step'] === 0 &&
					this.bounds.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, this.bounds.get_width() >> 1, this.bounds.get_height() >> 1) &&
					!global.variables.component_touched
				) {
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
			let cache_0: number = 1.5 * this.x_space;
			let cache_1: number = 2.5 * this.x_space;
			let cache_2: number = 1.5 * this.y_space;
			let cache_3: number = 2.5 * this.y_space;
			let cache_4: number = 3.0 * this.x_space;
			let cache_5: number = 3.0 * this.y_space;
			let cache_6: number = 1.605 * this.x_space;
			let cache_7: number = 1.605 * this.y_space;
			let cache_8: number = 0.707 * this.x_space;
			let cache_9: number = 0.707 * this.y_space;
			let cache_10: number = this.x_space;
			let cache_11: number = this.y_space;
			this.pmos_0.x = this.p1.x + cache_10 * global.utils.cosine(this.theta);
			this.pmos_0.y = this.p1.y + cache_11 * global.utils.sine(this.theta);
			this.pmos_1.x = this.pmos_0.x + 2 * cache_10 * global.utils.cosine(this.theta_m90);
			this.pmos_1.y = this.pmos_0.y + 2 * cache_11 * global.utils.sine(this.theta_m90);
			this.pmos_2.x = this.p1.x + cache_0 * global.utils.cosine(this.theta) + cache_1 * global.utils.cosine(this.theta_m90);
			this.pmos_2.y = this.p1.y + cache_2 * global.utils.sine(this.theta) + cache_3 * global.utils.sine(this.theta_m90);
			this.pmos_3.x = this.p1.x + cache_4 * global.utils.cosine(this.theta);
			this.pmos_3.y = this.p1.y + cache_5 * global.utils.sine(this.theta);
			this.pmos_4.x = this.pmos_3.x + 2 * cache_10 * global.utils.cosine(this.theta_m90);
			this.pmos_4.y = this.pmos_3.y + 2 * cache_11 * global.utils.sine(this.theta_m90);
			this.pmos_5.x = this.p1.x + cache_1 * global.utils.cosine(this.theta) + cache_1 * global.utils.cosine(this.theta_m90);
			this.pmos_5.y = this.p1.y + cache_3 * global.utils.sine(this.theta) + cache_3 * global.utils.sine(this.theta_m90);
			this.pmos_6.x = this.p3.x - cache_6 * global.utils.cosine(this.theta_m90);
			this.pmos_6.y = this.p3.y - cache_7 * global.utils.sine(this.theta_m90);
			this.pmos_7.x = this.pmos_1.x - cache_8 * global.utils.cosine(this.theta_m90 + global.CONSTANTS.PI_DIV_6);
			this.pmos_7.y = this.pmos_1.y - cache_9 * global.utils.sine(this.theta_m90 + global.CONSTANTS.PI_DIV_6);
			this.pmos_8.x = this.pmos_1.x - cache_8 * global.utils.cosine(this.theta_m90 - global.CONSTANTS.PI_DIV_6);
			this.pmos_8.y = this.pmos_1.y - cache_9 * global.utils.sine(this.theta_m90 - global.CONSTANTS.PI_DIV_6);
			this.build_element_flag = false;
		}
	}
	resize(): void {
		if (this.build_element_flag || global.flags.flag_build_element) {
			if (this.bounds.anchored) {
				if (this.elm.consistent()) {
					this.equilateral_center = global.utils.equilateral_triangle_center(
						nodes[this.elm.n1].location.x,
						nodes[this.elm.n2].location.x,
						nodes[this.elm.n3].location.x,
						nodes[this.elm.n1].location.y,
						nodes[this.elm.n2].location.y,
						nodes[this.elm.n3].location.y
					);
					this.bounds.set_center2(this.equilateral_center[0], this.equilateral_center[1], global.variables.node_space_x * 2, global.variables.node_space_y * 2);
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
		if (this.elm.flip === global.CONSTANTS.FLIP_180) {
			this.theta_m90 = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.CONSTANTS.PI_DIV_2;
		} else if (this.elm.flip === global.CONSTANTS.FLIP_0) {
			this.theta_m90 = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) + global.CONSTANTS.PI_DIV_2;
		} else {
			this.theta_m90 = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.CONSTANTS.PI_DIV_2;
		}
		this.theta = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
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
	increment_flip(): void {
		this.elm.flip++;
		if (this.elm.flip > global.CONSTANTS.FLIP_180) {
			this.elm.flip = global.CONSTANTS.FLIP_0;
		}
		this.set_flip(this.elm.flip);
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
			this.line_buffer[this.indexer++] = Array(this.p1.x, this.p1.y, this.pmos_0.x, this.pmos_0.y);
			this.line_buffer[this.indexer++] = Array(this.pmos_0.x, this.pmos_0.y, this.pmos_1.x, this.pmos_1.y);
			this.line_buffer[this.indexer++] = Array(this.p2.x, this.p2.y, this.pmos_3.x, this.pmos_3.y);
			this.line_buffer[this.indexer++] = Array(this.pmos_3.x, this.pmos_3.y, this.pmos_4.x, this.pmos_4.y);
			this.line_buffer[this.indexer++] = Array(this.pmos_1.x, this.pmos_1.y, this.pmos_4.x, this.pmos_4.y);
			this.line_buffer[this.indexer++] = Array(this.pmos_2.x, this.pmos_2.y, this.pmos_5.x, this.pmos_5.y);
			this.line_buffer[this.indexer++] = Array(this.pmos_6.x, this.pmos_6.y, this.p3.x, this.p3.y);
			this.line_buffer[this.indexer++] = Array(this.pmos_1.x, this.pmos_1.y, this.pmos_7.x, this.pmos_7.y);
			this.line_buffer[this.indexer++] = Array(this.pmos_1.x, this.pmos_1.y, this.pmos_8.x, this.pmos_8.y);
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
				this.angle = global.utils.retrieve_angle(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
				if ((this.angle > 170 && this.angle < 190) || (this.angle > -10 && this.angle < 10)) {
					canvas.rotate(this.c_x, this.c_y, -90);
					canvas.draw_text(
						global.TEMPLATES.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.utils.exponentiate_quickly(this.elm.properties['W/L Ratio'])).replace('{UNIT}', this.elm.properties['units']),
						this.c_x,
						this.bounds.top - this.bounds.get_height() * 0.15,
						this.text_paint
					);
					canvas.draw_text(
						global.TEMPLATES.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', <string>(<unknown>this.elm.id)),
						this.c_x,
						this.bounds.bottom + this.bounds.get_height() * 0.15,
						this.text_paint
					);
					canvas.restore();
				} else if ((this.angle > 260 && this.angle < 280) || (this.angle > 80 && this.angle < 100)) {
					canvas.draw_text(
						global.TEMPLATES.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.utils.exponentiate_quickly(this.elm.properties['W/L Ratio'])).replace('{UNIT}', this.elm.properties['units']),
						this.c_x,
						this.bounds.top - this.bounds.get_height() * 0.15,
						this.text_paint
					);
					canvas.draw_text(
						global.TEMPLATES.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', <string>(<unknown>this.elm.id)),
						this.c_x,
						this.bounds.bottom + this.bounds.get_height() * 0.15,
						this.text_paint
					);
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
	patch(): void {
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
	reset(): void {
		this.y_out = 0;
		this.y_hat = 0;
		this.elm.properties['Mosfet Mode'] = 0;
		this.elm.properties['Vsg'] = 0;
		this.elm.properties['Vsd'] = 0;
		this.elm.properties['Last Vsg'] = 2;
		this.elm.properties['Last Io'] = global.settings.TOLERANCE * 2;
		this.update();
	}
}
