'use strict';
class ScopeManager {
	private readonly MAX_ENTRIES: number;
	public entry: Array<SCOPE_ENTRY_T>;
	private index: number;
	private met_max: number;
	private iteration_size: number;
	private v_side_1: number;
	private v_side_2: number;
	private curr: number;
	private voltage: number;
	private power: number;
	constructor() {
		this.MAX_ENTRIES = 3;
		this.entry = [];
		this.index = -1;
		this.met_max = -1;
		this.iteration_size = -1;
		this.v_side_1 = 0;
		this.v_side_2 = 0;
		this.curr = -1;
		this.voltage = -1;
		this.power = -1;
	}
	clear_entries(): void {
		this.entry.splice(0, this.entry.length);
	}
	get_units(index: number): string {
		if (index > -1 && index < this.entry.length) {
			if (this.entry[index]['element_type'] === global.ELEMENT_TYPES.TYPE_VOLTMETER) {
				return global.PROPERTY.PROPERTY_VOLTMETER['units'];
			} else if (this.entry[index]['element_type'] === global.ELEMENT_TYPES.TYPE_AMMETER) {
				return global.PROPERTY.PROPERTY_AMMETER['units'];
			} else if (this.entry[index]['element_type'] === global.ELEMENT_TYPES.TYPE_OHMMETER) {
				return global.PROPERTY.PROPERTY_OHMMETER['units'];
			} else if (this.entry[index]['element_type'] === global.ELEMENT_TYPES.TYPE_WATTMETER) {
				return global.PROPERTY.PROPERTY_WATTMETER['units'];
			}
		}
		return '';
	}
	get_scope_name(index: number): string {
		if (index > -1 && index < this.entry.length) {
			return this.entry[index]['element_tag'] + this.entry[index]['element_id'];
		}
		return '';
	}
	find_entry(id: number, type: number): boolean {
		for (var i: number = 0; i < this.entry.length; i++) {
			if (this.entry[i]['element_type'] === type && this.entry[i]['element_id'] === id) {
				return true;
			}
		}
		return false;
	}
	find_entry_index(id: number, type: number): number {
		for (var i: number = 0; i < this.entry.length; i++) {
			if (this.entry[i]['element_type'] === type && this.entry[i]['element_id'] === id) {
				return i;
			}
		}
		return -1;
	}
	is_meter(type: number): boolean {
		return type === global.ELEMENT_TYPES.TYPE_VOLTMETER || type === global.ELEMENT_TYPES.TYPE_OHMMETER || type === global.ELEMENT_TYPES.TYPE_AMMETER || type === global.ELEMENT_TYPES.TYPE_WATTMETER;
	}
	push(id: number, type: number, tag: string): void {
		if (this.is_meter(type)) {
			if (this.entry.length < this.MAX_ENTRIES) {
				if (!this.find_entry(id, type)) {
					this.entry.push({
						element_id: id,
						element_type: type,
						element_tag: tag
					});
				}
			} else {
				toast.set_text('SCOPE LIMIT = {' + this.MAX_ENTRIES + '}');
				toast.show(global.COLORS.GENERAL_RED_COLOR);
			}
		}
	}
	remove(id: number, type: number): void {
		let index: number = this.find_entry_index(id, type);
		if (index !== -1) {
			graph_window.reset_trace(index);
			this.entry.splice(index, 1);
		}
	}
	update_scopes(): void {
		this.index = -1;
		this.met_max = global.utils.meter_max();
		this.iteration_size = Math.max(this.met_max, this.entry.length);
		this.v_side_1 = 0;
		this.v_side_2 = 0;
		for (var i: number = 0; i < this.iteration_size; i++) {
			if (i < this.entry.length) {
				if (this.entry[i]['element_type'] === global.ELEMENT_TYPES.TYPE_VOLTMETER) {
					this.index = engine_functions.get_voltmeter(this.entry[i]['element_id']);
					if (this.index > -1 && this.index < voltmeters.length) {
						this.push_to_graph(i, engine_functions.get_voltage(voltmeters[this.index].elm.n1, voltmeters[this.index].elm.n2), simulation_manager.simulation_time);
					}
				} else if (this.entry[i]['element_type'] === global.ELEMENT_TYPES.TYPE_AMMETER) {
					this.index = engine_functions.get_ammeter(this.entry[i]['element_id']);
					if (this.index > -1 && this.index < ammeters.length) {
						this.push_to_graph(i, matrix_x[ammeters[this.index].get_simulation_index()][0], simulation_manager.simulation_time);
					}
				} else if (this.entry[i]['element_type'] === global.ELEMENT_TYPES.TYPE_OHMMETER) {
					this.index = engine_functions.get_ohmmeter(this.entry[i]['element_id']);
					if (this.index > -1 && this.index < ohmmeters.length) {
						this.push_to_graph(
							i,
							Math.abs(engine_functions.get_voltage(ohmmeters[this.index].elm.n1, ohmmeters[this.index].elm.n2) / matrix_x[ohmmeters[this.index].get_simulation_index()][0]),
							simulation_manager.simulation_time
						);
					}
				} else if (this.entry[i]['element_type'] === global.ELEMENT_TYPES.TYPE_WATTMETER) {
					this.index = engine_functions.get_wattmeter(this.entry[i]['element_id']);
					if (this.index > -1 && this.index < wattmeters.length) {
						this.v_side_1 = Math.abs(engine_functions.get_voltage(wattmeters[this.index].elm.n1, -1));
						this.v_side_2 = Math.abs(engine_functions.get_voltage(wattmeters[this.index].elm.n2, -1));
						this.curr = (this.v_side_1 - this.v_side_2) / global.settings.WIRE_RESISTANCE;
						this.voltage = Math.max(this.v_side_1, this.v_side_1);
						this.power = this.curr * this.voltage;
						this.push_to_graph(i, this.power, simulation_manager.simulation_time);
					}
				}
			}
			/* #METER_TAG# */
			if (i < voltmeters.length) {
				voltmeters[i].push_voltage(engine_functions.get_voltage(voltmeters[i].elm.n1, voltmeters[i].elm.n2));
			}
			if (i < ammeters.length) {
				if (ammeters[i].get_simulation_index() < matrix_x.length) {
					ammeters[i].push_current(matrix_x[ammeters[i].get_simulation_index()][0]);
				}
			}
			if (i < ohmmeters.length) {
				if (ohmmeters[i].get_simulation_index() < matrix_x.length) {
					ohmmeters[i].push_voltage_current(engine_functions.get_voltage(ohmmeters[i].elm.n1, ohmmeters[i].elm.n2), matrix_x[ohmmeters[i].get_simulation_index()][0]);
				}
			}
			if (i < wattmeters.length) {
				if (wattmeters[i].get_simulation_index() < matrix_x.length) {
					this.v_side_1 = Math.abs(engine_functions.get_voltage(wattmeters[i].elm.n1, -1));
					this.v_side_2 = Math.abs(engine_functions.get_voltage(wattmeters[i].elm.n2, -1));
					wattmeters[i].push_voltage(this.v_side_1, this.v_side_2);
				}
			}
		}
	}
	push_to_graph(selector: SCOPE_CHANNEL_T, value: number, time: number): void {
		if (selector === SCOPE_CHANNEL_T.CHANNEL_0) {
			graph_window.push_trace_a(value, time);
		} else if (selector === SCOPE_CHANNEL_T.CHANNEL_1) {
			graph_window.push_trace_b(value, time);
		} else if (selector === SCOPE_CHANNEL_T.CHANNEL_2) {
			graph_window.push_trace_c(value, time);
		}
	}
}
