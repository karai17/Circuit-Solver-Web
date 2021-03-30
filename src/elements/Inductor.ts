'use strict';
class Inductor {
	private initialized: boolean;
	public bounds: RectF;
	public elm: Element2;
	private p1: PointF;
	private p2: PointF;
	private theta_m90: number;
	private theta: number;
	private inductor_arc_0: Arc;
	private inductor_arc_1: Arc;
	private inductor_arc_2: Arc;
	private inductor_arc_3: Arc;
	private ind_0: PointF;
	private ind_1: PointF;
	private ind_2: PointF;
	private ind_3: PointF;
	private ind_4: PointF;
	private ind_5: PointF;
	private ind_6: PointF;
	private ind_7: PointF;
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
	constructor(type: number, id: number, n1: number, n2: number) {
		this.initialized = false;
		this.bounds = new RectF(0, 0, 0, 0);
		this.elm = new Element2(id, type, global.utils.copy(global.PROPERTY.PROPERTY_INDUCTOR));
		this.elm.set_nodes(n1, n2);
		if (this.elm.consistent()) {
			this.bounds.set_center2(
				global.utils.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n2].location.x),
				global.utils.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n2].location.y),
				global.variables.node_space_x * 2,
				global.variables.node_space_y * 2
			);
		}
		this.elm.set_rotation(global.CONSTANTS.ROTATION_0);
		this.elm.set_flip(global.CONSTANTS.FLIP_0);
		this.release_nodes();
		let vertices: Array<number> = this.get_vertices();
		this.elm.map_node2(vertices[0], vertices[1], vertices[2], vertices[3]);
		this.capture_nodes();
		this.p1 = new PointF(0, 0);
		this.p2 = new PointF(0, 0);
		if (this.elm.consistent()) {
			this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
			this.p2.set_point(nodes[this.elm.n2].location.x, nodes[this.elm.n2].location.y);
		}
		this.theta_m90 = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.CONSTANTS.PI_DIV_2;
		this.theta = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
		this.inductor_arc_0 = new Arc(0, 0, 0, 0, global.variables.canvas_stroke_width_5_zoom);
		this.inductor_arc_1 = new Arc(0, 0, 0, 0, global.variables.canvas_stroke_width_5_zoom);
		this.inductor_arc_2 = new Arc(0, 0, 0, 0, global.variables.canvas_stroke_width_5_zoom);
		this.inductor_arc_3 = new Arc(0, 0, 0, 0, global.variables.canvas_stroke_width_5_zoom);
		this.ind_0 = new PointF(0, 0);
		this.ind_1 = new PointF(0, 0);
		this.ind_2 = new PointF(0, 0);
		this.ind_3 = new PointF(0, 0);
		this.ind_4 = new PointF(0, 0);
		this.ind_5 = new PointF(0, 0);
		this.ind_6 = new PointF(0, 0);
		this.ind_7 = new PointF(0, 0);
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
		}
	}
	push_reference(ref: WIRE_REFERENCE_T): void {
		this.wire_reference.push(ref);
	}
	stamp(): void {
		if (this.elm.consistent()) {
			engine_functions.stamp_inductor(this.elm.n1, this.elm.n2, this.elm.properties['Transient Resistance'], this.elm.properties['Equivalent Current']);
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
						}
					}
				}
			}
		}
	}
	handle_wire_builder(n: number, anchor: number): void {
		if (global.variables.wire_builder['step'] === 0) {
			global.variables.wire_builder['n1'] = n;
			global.variables.wire_builder['type1'] = this.elm.type;
			global.variables.wire_builder['id1'] = this.elm.id;
			global.variables.wire_builder['anchor_point1'] = anchor;
			global.variables.wire_builder['linkage1']['wire'] = global.variables.wire_builder['step'];
			global.variables.wire_builder['step']++;
		} else if (global.variables.wire_builder['step'] === 1) {
			global.variables.wire_builder['n2'] = n;
			global.variables.wire_builder['type2'] = this.elm.type;
			global.variables.wire_builder['id2'] = this.elm.id;
			global.variables.wire_builder['anchor_point2'] = anchor;
			global.variables.wire_builder['linkage2']['wire'] = global.variables.wire_builder['step'];
			global.variables.wire_builder['step']++;
		}
	}
	move_element(dx: number, dy: number): void {
		wire_manager.reset_wire_builder();
		this.unanchor_wires();
		this.release_nodes();
		this.m_x = this.c_x + dx;
		this.m_y = this.c_y + dy;
		if (this.m_x < workspace.bounds.left + 2.5 * global.variables.node_space_x) {
			this.m_x = workspace.bounds.left + 2.5 * global.variables.node_space_x;
		} else if (this.m_x > workspace.bounds.right - 2.0 * global.variables.node_space_x) {
			this.m_x = workspace.bounds.right - 2.0 * global.variables.node_space_x;
		}
		if (this.m_y < workspace.bounds.top + 2.5 * global.variables.node_space_y) {
			this.m_y = workspace.bounds.top + 2.5 * global.variables.node_space_y;
		} else if (this.m_y > workspace.bounds.bottom - 2.0 * global.variables.node_space_y) {
			this.m_y = workspace.bounds.bottom - 2.0 * global.variables.node_space_y;
		}
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
						if (!this.bounds.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, this.bounds.get_width() >> 1, this.bounds.get_height() >> 1)) {
							this.release_nodes();
							this.bounds.anchored = false;
							this.is_translating = true;
							global.variables.component_translating = true;
							this.select();
						}
					} else {
						this.m_x = global.variables.mouse_x;
						this.m_y = global.variables.mouse_y;
						if (this.m_x < workspace.bounds.left + 2.5 * global.variables.node_space_x) {
							this.m_x = workspace.bounds.left + 2.5 * global.variables.node_space_x;
						} else if (this.m_x > workspace.bounds.right - 2.0 * global.variables.node_space_x) {
							this.m_x = workspace.bounds.right - 2.0 * global.variables.node_space_x;
						}
						if (this.m_y < workspace.bounds.top + 2.5 * global.variables.node_space_y) {
							this.m_y = workspace.bounds.top + 2.5 * global.variables.node_space_y;
						} else if (this.m_y > workspace.bounds.bottom - 2.0 * global.variables.node_space_y) {
							this.m_y = workspace.bounds.bottom - 2.0 * global.variables.node_space_y;
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
	wire_reference_maintenance(): void {
		if (this.wire_reference.length > 0 && global.flags.flag_wire_deleted) {
			let id: number = -1;
			for (var i: number = this.wire_reference.length - 1; i > -1; i--) {
				id = engine_functions.get_wire(this.wire_reference[i]['wire_id']);
				if (!(id > -1 && id < wires.length)) {
					this.wire_reference.splice(i, 1);
				}
			}
		}
	}
	unanchor_wires(): void {
		if (this.wire_reference.length > 0) {
			let vertices: Array<number> = this.get_vertices();
			let id: number = -1;
			for (var i: number = this.wire_reference.length - 1; i > -1; i--) {
				id = engine_functions.get_wire(this.wire_reference[i]['wire_id']);
				if (id > -1 && id < wires.length) {
					if (this.wire_reference[i]['anchor_point'] === global.variables.anchor_point['p1']) {
						wires[id].release_nodes();
						if (this.wire_reference[i]['linkage'] === 0) {
							wires[id].p1.x = vertices[0];
							wires[id].p1.y = vertices[1];
						} else if (this.wire_reference[i]['linkage'] === 1) {
							wires[id].p2.y = vertices[1];
							wires[id].p2.x = vertices[0];
						}
					} else if (this.wire_reference[i]['anchor_point'] === global.variables.anchor_point['p2']) {
						wires[id].release_nodes();
						if (this.wire_reference[i]['linkage'] === 0) {
							wires[id].p1.x = vertices[2];
							wires[id].p1.y = vertices[3];
						} else if (this.wire_reference[i]['linkage'] === 1) {
							wires[id].p2.x = vertices[2];
							wires[id].p2.y = vertices[3];
						}
					}
				} else {
					this.wire_reference.splice(i, 1);
				}
			}
		}
	}
	anchor_wires(): void {
		if (this.wire_reference.length > 0) {
			let vertices: Array<number> = this.get_vertices();
			let id: number = -1;
			for (var i: number = this.wire_reference.length - 1; i > -1; i--) {
				id = engine_functions.get_wire(this.wire_reference[i]['wire_id']);
				if (id > -1 && id < wires.length) {
					if (this.wire_reference[i]['anchor_point'] === global.variables.anchor_point['p1']) {
						if (this.wire_reference[i]['linkage'] === 0) {
							wires[id].p1.x = vertices[0];
							wires[id].p1.y = vertices[1];
						} else if (this.wire_reference[i]['linkage'] === 1) {
							wires[id].p2.x = vertices[0];
							wires[id].p2.y = vertices[1];
						}
						wires[id].capture_nodes();
					} else if (this.wire_reference[i]['anchor_point'] === global.variables.anchor_point['p2']) {
						if (this.wire_reference[i]['linkage'] === 0) {
							wires[id].p1.x = vertices[2];
							wires[id].p1.y = vertices[3];
						} else if (this.wire_reference[i]['linkage'] === 1) {
							wires[id].p2.x = vertices[2];
							wires[id].p2.y = vertices[3];
						}
						wires[id].capture_nodes();
					}
				} else {
					this.wire_reference.splice(i, 1);
				}
			}
		}
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
				this.c_y - global.variables.node_space_y <= view_port.bottom) || global.flags.flag_picture_request)
		) {
			let cache_0: number = 1.5 * this.x_space;
			let cache_1: number = 1.5 * this.y_space;
			let cache_2: number = this.x_space;
			let cache_3: number = this.y_space;
			this.connect1_x = this.c_x - cache_2 * global.utils.cosine(this.theta);
			this.connect1_y = this.c_y - cache_3 * global.utils.sine(this.theta);
			this.connect2_x = this.c_x + cache_2 * global.utils.cosine(this.theta);
			this.connect2_y = this.c_y + cache_3 * global.utils.sine(this.theta);
			this.ind_0.x = this.c_x + cache_2 * global.utils.cosine(this.theta);
			this.ind_0.y = this.c_y + cache_3 * global.utils.sine(this.theta);
			this.ind_1.x = this.c_x + (cache_2 >> 1) * global.utils.cosine(this.theta);
			this.ind_1.y = this.c_y + (cache_3 >> 1) * global.utils.sine(this.theta);
			this.ind_2.x = this.c_x + (cache_2 >> 1) * global.utils.cosine(this.theta - global.utils.to_radians(180));
			this.ind_2.y = this.c_y + (cache_3 >> 1) * global.utils.sine(this.theta - global.utils.to_radians(180));
			this.ind_3.x = this.c_x + cache_2 * global.utils.cosine(this.theta - global.utils.to_radians(180));
			this.ind_3.y = this.c_y + cache_3 * global.utils.sine(this.theta - global.utils.to_radians(180));
			this.ind_4.x = (this.ind_0.x + this.ind_1.x) * global.CONSTANTS.ZERO_PT_FIVE + cache_0 * global.utils.cosine(this.theta - global.utils.to_radians(90));
			this.ind_4.y = (this.ind_0.y + this.ind_1.y) * global.CONSTANTS.ZERO_PT_FIVE + cache_1 * global.utils.sine(this.theta - global.utils.to_radians(90));
			this.ind_5.x = (this.c_x + this.ind_1.x) * global.CONSTANTS.ZERO_PT_FIVE + cache_0 * global.utils.cosine(this.theta - global.utils.to_radians(90));
			this.ind_5.y = (this.c_y + this.ind_1.y) * global.CONSTANTS.ZERO_PT_FIVE + cache_1 * global.utils.sine(this.theta - global.utils.to_radians(90));
			this.ind_6.x = (this.c_x + this.ind_2.x) * global.CONSTANTS.ZERO_PT_FIVE + cache_0 * global.utils.cosine(this.theta - global.utils.to_radians(90));
			this.ind_6.y = (this.c_y + this.ind_2.y) * global.CONSTANTS.ZERO_PT_FIVE + cache_1 * global.utils.sine(this.theta - global.utils.to_radians(90));
			this.ind_7.x = (this.ind_3.x + this.ind_2.x) * global.CONSTANTS.ZERO_PT_FIVE + cache_0 * global.utils.cosine(this.theta - global.utils.to_radians(90));
			this.ind_7.y = (this.ind_3.y + this.ind_2.y) * global.CONSTANTS.ZERO_PT_FIVE + cache_1 * global.utils.sine(this.theta - global.utils.to_radians(90));
			this.inductor_arc_0.set_points(this.ind_0.x, this.ind_0.y, this.ind_1.x, this.ind_1.y);
			this.inductor_arc_0.amplitude = global.variables.canvas_stroke_width_5_zoom;
			this.inductor_arc_1.set_points(this.ind_1.x, this.ind_1.y, this.c_x, this.c_y);
			this.inductor_arc_1.amplitude = global.variables.canvas_stroke_width_5_zoom;
			this.inductor_arc_2.set_points(this.c_x, this.c_y, this.ind_2.x, this.ind_2.y);
			this.inductor_arc_2.amplitude = global.variables.canvas_stroke_width_5_zoom;
			this.inductor_arc_3.set_points(this.ind_2.x, this.ind_2.y, this.ind_3.x, this.ind_3.y);
			this.inductor_arc_3.amplitude = global.variables.canvas_stroke_width_5_zoom;
			this.build_element_flag = false;
		}
	}
	resize(): void {
		if (this.build_element_flag || global.flags.flag_build_element) {
			if (this.bounds.anchored) {
				if (this.elm.consistent()) {
					this.bounds.set_center2(
						global.utils.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n2].location.x),
						global.utils.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n2].location.y),
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
			this.inductor_arc_0.resize();
			this.inductor_arc_1.resize();
			this.inductor_arc_2.resize();
			this.inductor_arc_3.resize();
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
	update_inductor(): void {
		if (this.elm.consistent() && simulation_manager.solutions_ready) {
			let voltage: number = engine_functions.get_voltage(this.elm.n1, this.elm.n2);
			this.elm.properties['Transient Voltage'] = voltage;
			this.elm.properties['Transient Current'] = voltage / this.elm.properties['Transient Resistance'] + this.elm.properties['Equivalent Current'];
			this.elm.properties['Equivalent Current'] = this.elm.properties['Transient Voltage'] / this.elm.properties['Transient Resistance'] + this.elm.properties['Transient Current'];
		}
	}
	conserve_energy(): void {
		this.elm.properties['Transient Resistance'] = (2 * this.elm.properties['Inductance']) / simulation_manager.time_step;
		this.elm.properties['Equivalent Current'] = this.elm.properties['Transient Voltage'] / this.elm.properties['Transient Resistance'] + this.elm.properties['Transient Current'];
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
	recolor(): void {
		if (global.variables.selected) {
			if (global.variables.selected_id === this.elm.id && global.variables.selected_type === this.elm.type) {
				this.line_paint.set_color(global.COLORS.SELECTED_COLOR);
				this.point_paint.set_color(global.COLORS.SELECTED_COLOR);
				this.text_paint.set_color(global.COLORS.SELECTED_COLOR);
				this.inductor_arc_0.set_color(global.COLORS.SELECTED_COLOR);
				this.inductor_arc_1.set_color(global.COLORS.SELECTED_COLOR);
				this.inductor_arc_2.set_color(global.COLORS.SELECTED_COLOR);
				this.inductor_arc_3.set_color(global.COLORS.SELECTED_COLOR);
			} else {
				this.line_paint.set_color(global.COLORS.ELEMENT_COLOR);
				this.point_paint.set_color(global.COLORS.ELEMENT_COLOR);
				this.text_paint.set_color(global.COLORS.ELEMENT_COLOR);
				this.inductor_arc_0.set_color(global.COLORS.ELEMENT_COLOR);
				this.inductor_arc_1.set_color(global.COLORS.ELEMENT_COLOR);
				this.inductor_arc_2.set_color(global.COLORS.ELEMENT_COLOR);
				this.inductor_arc_3.set_color(global.COLORS.ELEMENT_COLOR);
			}
		} else {
			if (this.multi_selected) {
				this.line_paint.set_color(global.COLORS.MULTI_SELECTED_COLOR);
				this.point_paint.set_color(global.COLORS.MULTI_SELECTED_COLOR);
				this.text_paint.set_color(global.COLORS.MULTI_SELECTED_COLOR);
				this.inductor_arc_0.set_color(global.COLORS.MULTI_SELECTED_COLOR);
				this.inductor_arc_1.set_color(global.COLORS.MULTI_SELECTED_COLOR);
				this.inductor_arc_2.set_color(global.COLORS.MULTI_SELECTED_COLOR);
				this.inductor_arc_3.set_color(global.COLORS.MULTI_SELECTED_COLOR);
			} else {
				this.line_paint.set_color(global.COLORS.ELEMENT_COLOR);
				this.point_paint.set_color(global.COLORS.ELEMENT_COLOR);
				this.text_paint.set_color(global.COLORS.ELEMENT_COLOR);
				this.inductor_arc_0.set_color(global.COLORS.ELEMENT_COLOR);
				this.inductor_arc_1.set_color(global.COLORS.ELEMENT_COLOR);
				this.inductor_arc_2.set_color(global.COLORS.ELEMENT_COLOR);
				this.inductor_arc_3.set_color(global.COLORS.ELEMENT_COLOR);
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
			this.inductor_arc_0.draw_arc(canvas);
			this.inductor_arc_1.draw_arc(canvas);
			this.inductor_arc_2.draw_arc(canvas);
			this.inductor_arc_3.draw_arc(canvas);
			this.indexer = 0;
			this.circle_buffer = [];
			this.line_buffer = [];
			this.line_buffer[this.indexer++] = Array(this.p1.x, this.p1.y, this.connect1_x, this.connect1_y);
			this.line_buffer[this.indexer++] = Array(this.connect2_x, this.connect2_y, this.p2.x, this.p2.y);
			canvas.draw_line_buffer(this.line_buffer, this.line_paint);
			this.indexer = 0;
			this.circle_buffer[this.indexer++] = Array(this.p1.x, this.p1.y, global.variables.canvas_stroke_width_2_zoom);
			this.circle_buffer[this.indexer++] = Array(this.p2.x, this.p2.y, global.variables.canvas_stroke_width_2_zoom);
			canvas.draw_circle_buffer(this.circle_buffer, this.point_paint);
			if (global.CONSTANTS.DEVELOPER_MODE) {
				canvas.draw_rect2(this.bounds, this.line_paint);
			}
			if (global.variables.workspace_zoom_scale > 1.085 || (!MOBILE_MODE && global.variables.workspace_zoom_scale >= 0.99)) {
				this.angle = global.utils.retrieve_angle(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
				if (this.angle > 170 && this.angle < 190) {
					canvas.draw_text(
						global.TEMPLATES.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.utils.exponentiate_quickly(this.elm.properties['Inductance'])).replace('{UNIT}', this.elm.properties['units']),
						this.c_x,
						this.bounds.top + this.bounds.get_height() * 0.2,
						this.text_paint
					);
					canvas.draw_text(
						global.TEMPLATES.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', <string>(<unknown>this.elm.id)),
						this.c_x,
						this.bounds.bottom - this.bounds.get_height() * 0.2,
						this.text_paint
					);
				} else if (this.angle > -10 && this.angle < 10) {
					canvas.draw_text(
						global.TEMPLATES.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.utils.exponentiate_quickly(this.elm.properties['Inductance'])).replace('{UNIT}', this.elm.properties['units']),
						this.c_x,
						this.bounds.top + this.bounds.get_height() * 0.1,
						this.text_paint
					);
					canvas.draw_text(
						global.TEMPLATES.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', <string>(<unknown>this.elm.id)),
						this.c_x,
						this.bounds.bottom - this.bounds.get_height() * 0.2,
						this.text_paint
					);
				} else if (this.angle > 260 && this.angle < 280) {
					canvas.rotate(this.c_x, this.c_y, -90);
					canvas.draw_text(
						global.TEMPLATES.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.utils.exponentiate_quickly(this.elm.properties['Inductance'])).replace('{UNIT}', this.elm.properties['units']),
						this.c_x,
						this.bounds.top + this.bounds.get_height() * 0.1,
						this.text_paint
					);
					canvas.draw_text(
						global.TEMPLATES.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', <string>(<unknown>this.elm.id)),
						this.c_x,
						this.bounds.bottom - this.bounds.get_height() * 0.2,
						this.text_paint
					);
					canvas.restore();
				} else if (this.angle > 80 && this.angle < 100) {
					canvas.rotate(this.c_x, this.c_y, 90);
					canvas.draw_text(
						global.TEMPLATES.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.utils.exponentiate_quickly(this.elm.properties['Inductance'])).replace('{UNIT}', this.elm.properties['units']),
						this.c_x,
						this.bounds.top + this.bounds.get_height() * 0.1,
						this.text_paint
					);
					canvas.draw_text(
						global.TEMPLATES.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', <string>(<unknown>this.elm.id)),
						this.c_x,
						this.bounds.bottom - this.bounds.get_height() * 0.2,
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
					!global.flags.flag_add_element
				) {
					if (this.elm.consistent()) {
						let node_id_array: Array<number> = this.elm.get_nodes();
						for (var i = 0; i < node_id_array.length; i++) {
							canvas.draw_rect2(nodes[node_id_array[i]].get_bounds(), this.line_paint);
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
		let time_data: TIME_DATA_TEMPLATE_T = global.utils.copy(global.TEMPLATES.TIME_DATA_TEMPLATE);
		let keys: Array<string> = Object.keys(this.elm.properties);
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
	reset(): void {
		this.elm.properties['Transient Resistance'] = (2 * this.elm.properties['Inductance']) / simulation_manager.time_step;
		this.elm.properties['Transient Voltage'] = 0;
		this.elm.properties['Transient Current'] = global.utils.copy(this.elm.properties['Initial Current']);
		this.elm.properties['Equivalent Current'] = this.elm.properties['Transient Voltage'] / this.elm.properties['Transient Resistance'] + this.elm.properties['Transient Current'];
	}
}
