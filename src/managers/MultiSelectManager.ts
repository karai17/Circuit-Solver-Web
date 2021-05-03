'use strict';
class MultiSelectManager {
	private readonly OFFSCREEN_X: number;
	private readonly OFFSCREEN_Y: number;
	private multi_select_bounds: RectF;
	public multi_select: boolean;
	private line_paint: Paint;
	private fill_paint: Paint;
	private select_x: number;
	private select_y: number;
	private delta_center_x: number;
	private delta_center_y: number;
	private delta_end_x: number;
	private delta_end_y: number;
	private delta_dx: number;
	private delta_dy: number;
	private delta_last_dx: number;
	private delta_last_dy: number;
	private delta_latch: boolean;
	private elements_moved: boolean;
	public ctrl_pressed_started: boolean;
	public ctrl_pressed: boolean;
	private multi_selected_element: boolean;
	private mouse_down_flag: boolean;
	public selected_components_bounds: RectF;
	private draw_bounds_flag: RectF;
	constructor() {
		this.OFFSCREEN_X = -500e3;
		this.OFFSCREEN_Y = -500e3;
		this.multi_select_bounds = new RectF(this.OFFSCREEN_X, this.OFFSCREEN_Y, this.OFFSCREEN_X + 1, this.OFFSCREEN_Y + 1);
		this.multi_select = false;
		this.line_paint = new Paint();
		this.line_paint.set_paint_style(paint.style.STROKE);
		this.line_paint.set_paint_cap(paint.cap.ROUND);
		this.line_paint.set_paint_join(paint.join.ROUND);
		this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.line_paint.set_color(global.COLORS.MULTI_SELECTED_COLOR);
		this.line_paint.set_text_size(global.variables.canvas_text_size_5);
		this.line_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.line_paint.set_alpha(255);
		this.line_paint.set_paint_align(paint.align.CENTER);
		this.fill_paint = new Paint();
		this.fill_paint.set_paint_style(paint.style.FILL);
		this.fill_paint.set_paint_cap(paint.cap.ROUND);
		this.fill_paint.set_paint_join(paint.join.ROUND);
		this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.fill_paint.set_color(global.COLORS.GENERAL_GRAY_COLOR);
		this.fill_paint.set_text_size(global.variables.canvas_text_size_5);
		this.fill_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.fill_paint.set_alpha(90);
		this.fill_paint.set_paint_align(paint.align.CENTER);
		this.select_x = 0;
		this.select_y = 0;
		this.delta_center_x = 0;
		this.delta_center_y = 0;
		this.delta_end_x = 0;
		this.delta_end_y = 0;
		this.delta_dx = 0;
		this.delta_dy = 0;
		this.delta_last_dx = 0;
		this.delta_last_dy = 0;
		this.delta_latch = false;
		this.elements_moved = false;
		this.ctrl_pressed_started = false;
		this.ctrl_pressed = false;
		this.multi_selected_element = false;
		this.mouse_down_flag = false;
		this.selected_components_bounds = new RectF(-this.OFFSCREEN_X, -this.OFFSCREEN_Y, this.OFFSCREEN_X + 1, this.OFFSCREEN_Y + 1);
		this.draw_bounds_flag = new RectF(0, 0, 0, 0);
	}
	reset_enveloping_bounds(): void {
		global.variables.multi_selected = false;
		this.selected_components_bounds.left = -this.OFFSCREEN_X;
		this.selected_components_bounds.top = -this.OFFSCREEN_Y;
		this.selected_components_bounds.right = this.OFFSCREEN_X + 1;
		this.selected_components_bounds.bottom = this.OFFSCREEN_Y + 1;
	}
	refresh_multi_select(): void {
		this.multi_selected_element = false;
		if (global.variables.selected) {
			if (!global.variables.component_touched) {
				global.variables.selected_id = global.CONSTANTS.NULL;
				global.variables.selected_type = -1;
				global.variables.selected_bounds = global.CONSTANTS.NULL;
				global.variables.selected_properties = global.CONSTANTS.NULL;
				global.variables.selected = false;
			}
		}
		if (this.multi_select) {
			/* #INSERT_GENERATE_MULTI_SELECT_ELEMENTS# */
			/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
			for (var i: number = 0; i < resistors.length; i++) {
				if (this.multi_select_bounds.contains_xy(resistors[i].bounds.get_center_x(), resistors[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					resistors[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < capacitors.length; i++) {
				if (this.multi_select_bounds.contains_xy(capacitors[i].bounds.get_center_x(), capacitors[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					capacitors[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < inductors.length; i++) {
				if (this.multi_select_bounds.contains_xy(inductors[i].bounds.get_center_x(), inductors[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					inductors[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < grounds.length; i++) {
				if (this.multi_select_bounds.contains_xy(grounds[i].bounds.get_center_x(), grounds[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					grounds[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < dcsources.length; i++) {
				if (this.multi_select_bounds.contains_xy(dcsources[i].bounds.get_center_x(), dcsources[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					dcsources[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < dccurrents.length; i++) {
				if (this.multi_select_bounds.contains_xy(dccurrents[i].bounds.get_center_x(), dccurrents[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					dccurrents[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < acsources.length; i++) {
				if (this.multi_select_bounds.contains_xy(acsources[i].bounds.get_center_x(), acsources[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					acsources[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < accurrents.length; i++) {
				if (this.multi_select_bounds.contains_xy(accurrents[i].bounds.get_center_x(), accurrents[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					accurrents[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < squarewaves.length; i++) {
				if (this.multi_select_bounds.contains_xy(squarewaves[i].bounds.get_center_x(), squarewaves[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					squarewaves[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < sawwaves.length; i++) {
				if (this.multi_select_bounds.contains_xy(sawwaves[i].bounds.get_center_x(), sawwaves[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					sawwaves[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < trianglewaves.length; i++) {
				if (this.multi_select_bounds.contains_xy(trianglewaves[i].bounds.get_center_x(), trianglewaves[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					trianglewaves[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < constants.length; i++) {
				if (this.multi_select_bounds.contains_xy(constants[i].bounds.get_center_x(), constants[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					constants[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < wires.length; i++) {
				if (this.multi_select_bounds.contains_xy(wires[i].bounds.get_center_x(), wires[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					wires[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < nets.length; i++) {
				if (this.multi_select_bounds.contains_xy(nets[i].bounds.get_center_x(), nets[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					nets[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < notes.length; i++) {
				if (this.multi_select_bounds.contains_xy(notes[i].bounds.get_center_x(), notes[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					notes[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < rails.length; i++) {
				if (this.multi_select_bounds.contains_xy(rails[i].bounds.get_center_x(), rails[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					rails[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < voltmeters.length; i++) {
				if (this.multi_select_bounds.contains_xy(voltmeters[i].bounds.get_center_x(), voltmeters[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					voltmeters[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < ohmmeters.length; i++) {
				if (this.multi_select_bounds.contains_xy(ohmmeters[i].bounds.get_center_x(), ohmmeters[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					ohmmeters[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < ammeters.length; i++) {
				if (this.multi_select_bounds.contains_xy(ammeters[i].bounds.get_center_x(), ammeters[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					ammeters[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < wattmeters.length; i++) {
				if (this.multi_select_bounds.contains_xy(wattmeters[i].bounds.get_center_x(), wattmeters[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					wattmeters[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < fuses.length; i++) {
				if (this.multi_select_bounds.contains_xy(fuses[i].bounds.get_center_x(), fuses[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					fuses[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < spsts.length; i++) {
				if (this.multi_select_bounds.contains_xy(spsts[i].bounds.get_center_x(), spsts[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					spsts[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < spdts.length; i++) {
				if (this.multi_select_bounds.contains_xy(spdts[i].bounds.get_center_x(), spdts[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					spdts[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < nots.length; i++) {
				if (this.multi_select_bounds.contains_xy(nots[i].bounds.get_center_x(), nots[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					nots[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < diodes.length; i++) {
				if (this.multi_select_bounds.contains_xy(diodes[i].bounds.get_center_x(), diodes[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					diodes[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < leds.length; i++) {
				if (this.multi_select_bounds.contains_xy(leds[i].bounds.get_center_x(), leds[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					leds[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < zeners.length; i++) {
				if (this.multi_select_bounds.contains_xy(zeners[i].bounds.get_center_x(), zeners[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					zeners[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < potentiometers.length; i++) {
				if (this.multi_select_bounds.contains_xy(potentiometers[i].bounds.get_center_x(), potentiometers[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					potentiometers[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < ands.length; i++) {
				if (this.multi_select_bounds.contains_xy(ands[i].bounds.get_center_x(), ands[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					ands[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < ors.length; i++) {
				if (this.multi_select_bounds.contains_xy(ors[i].bounds.get_center_x(), ors[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					ors[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < nands.length; i++) {
				if (this.multi_select_bounds.contains_xy(nands[i].bounds.get_center_x(), nands[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					nands[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < nors.length; i++) {
				if (this.multi_select_bounds.contains_xy(nors[i].bounds.get_center_x(), nors[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					nors[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < xors.length; i++) {
				if (this.multi_select_bounds.contains_xy(xors[i].bounds.get_center_x(), xors[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					xors[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < xnors.length; i++) {
				if (this.multi_select_bounds.contains_xy(xnors[i].bounds.get_center_x(), xnors[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					xnors[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < dffs.length; i++) {
				if (this.multi_select_bounds.contains_xy(dffs[i].bounds.get_center_x(), dffs[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					dffs[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < vsats.length; i++) {
				if (this.multi_select_bounds.contains_xy(vsats[i].bounds.get_center_x(), vsats[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					vsats[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < adders.length; i++) {
				if (this.multi_select_bounds.contains_xy(adders[i].bounds.get_center_x(), adders[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					adders[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < subtractors.length; i++) {
				if (this.multi_select_bounds.contains_xy(subtractors[i].bounds.get_center_x(), subtractors[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					subtractors[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < multipliers.length; i++) {
				if (this.multi_select_bounds.contains_xy(multipliers[i].bounds.get_center_x(), multipliers[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					multipliers[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < dividers.length; i++) {
				if (this.multi_select_bounds.contains_xy(dividers[i].bounds.get_center_x(), dividers[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					dividers[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < gains.length; i++) {
				if (this.multi_select_bounds.contains_xy(gains[i].bounds.get_center_x(), gains[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					gains[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < absvals.length; i++) {
				if (this.multi_select_bounds.contains_xy(absvals[i].bounds.get_center_x(), absvals[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					absvals[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < vcsws.length; i++) {
				if (this.multi_select_bounds.contains_xy(vcsws[i].bounds.get_center_x(), vcsws[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					vcsws[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < vcvss.length; i++) {
				if (this.multi_select_bounds.contains_xy(vcvss[i].bounds.get_center_x(), vcvss[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					vcvss[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < vccss.length; i++) {
				if (this.multi_select_bounds.contains_xy(vccss[i].bounds.get_center_x(), vccss[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					vccss[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < cccss.length; i++) {
				if (this.multi_select_bounds.contains_xy(cccss[i].bounds.get_center_x(), cccss[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					cccss[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < ccvss.length; i++) {
				if (this.multi_select_bounds.contains_xy(ccvss[i].bounds.get_center_x(), ccvss[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					ccvss[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < opamps.length; i++) {
				if (this.multi_select_bounds.contains_xy(opamps[i].bounds.get_center_x(), opamps[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					opamps[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < nmosfets.length; i++) {
				if (this.multi_select_bounds.contains_xy(nmosfets[i].bounds.get_center_x(), nmosfets[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					nmosfets[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < pmosfets.length; i++) {
				if (this.multi_select_bounds.contains_xy(pmosfets[i].bounds.get_center_x(), pmosfets[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					pmosfets[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < npns.length; i++) {
				if (this.multi_select_bounds.contains_xy(npns[i].bounds.get_center_x(), npns[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					npns[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < pnps.length; i++) {
				if (this.multi_select_bounds.contains_xy(pnps[i].bounds.get_center_x(), pnps[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					pnps[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < adcs.length; i++) {
				if (this.multi_select_bounds.contains_xy(adcs[i].bounds.get_center_x(), adcs[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					adcs[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < dacs.length; i++) {
				if (this.multi_select_bounds.contains_xy(dacs[i].bounds.get_center_x(), dacs[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					dacs[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < sandhs.length; i++) {
				if (this.multi_select_bounds.contains_xy(sandhs[i].bounds.get_center_x(), sandhs[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					sandhs[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < pwms.length; i++) {
				if (this.multi_select_bounds.contains_xy(pwms[i].bounds.get_center_x(), pwms[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					pwms[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < integrators.length; i++) {
				if (this.multi_select_bounds.contains_xy(integrators[i].bounds.get_center_x(), integrators[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					integrators[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < differentiators.length; i++) {
				if (this.multi_select_bounds.contains_xy(differentiators[i].bounds.get_center_x(), differentiators[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					differentiators[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < lowpasses.length; i++) {
				if (this.multi_select_bounds.contains_xy(lowpasses[i].bounds.get_center_x(), lowpasses[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					lowpasses[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < highpasses.length; i++) {
				if (this.multi_select_bounds.contains_xy(highpasses[i].bounds.get_center_x(), highpasses[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					highpasses[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < relays.length; i++) {
				if (this.multi_select_bounds.contains_xy(relays[i].bounds.get_center_x(), relays[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					relays[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < pids.length; i++) {
				if (this.multi_select_bounds.contains_xy(pids[i].bounds.get_center_x(), pids[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					pids[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < luts.length; i++) {
				if (this.multi_select_bounds.contains_xy(luts[i].bounds.get_center_x(), luts[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					luts[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < vcrs.length; i++) {
				if (this.multi_select_bounds.contains_xy(vcrs[i].bounds.get_center_x(), vcrs[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					vcrs[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < vccas.length; i++) {
				if (this.multi_select_bounds.contains_xy(vccas[i].bounds.get_center_x(), vccas[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					vccas[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < vcls.length; i++) {
				if (this.multi_select_bounds.contains_xy(vcls[i].bounds.get_center_x(), vcls[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					vcls[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < grts.length; i++) {
				if (this.multi_select_bounds.contains_xy(grts[i].bounds.get_center_x(), grts[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					grts[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < tptzs.length; i++) {
				if (this.multi_select_bounds.contains_xy(tptzs[i].bounds.get_center_x(), tptzs[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					tptzs[i].multi_selected = true;
				}
			}
			for (var i: number = 0; i < transformers.length; i++) {
				if (this.multi_select_bounds.contains_xy(transformers[i].bounds.get_center_x(), transformers[i].bounds.get_center_y())) {
					this.multi_selected_element = true;
					transformers[i].multi_selected = true;
				}
			}
			/* <!-- END AUTOMATICALLY GENERATED !--> */
		}
		if (this.multi_selected_element) {
			this.multi_selected_element = false;
		}
		this.multi_select_bounds.left = this.OFFSCREEN_X;
		this.multi_select_bounds.top = this.OFFSCREEN_Y;
		this.multi_select_bounds.right = this.OFFSCREEN_X + 1;
		this.multi_select_bounds.bottom = this.OFFSCREEN_Y + 1;
		this.multi_select = false;
	}
	key_down(key_event: KEY_EVENT_T): void {
		if (!MOBILE_MODE) {
			if (
				!global.flags.flag_simulating &&
				!global.flags.flag_save_image &&
				!global.flags.flag_save_circuit &&
				!global.flags.flag_zoom &&
				!global.flags.flag_element_options &&
				!global.flags.flag_element_options_edit &&
				!global.flags.flag_graph &&
				!global.flags.flag_select_element &&
				!global.flags.flag_select_timestep &&
				!global.flags.flag_select_settings &&
				!global.flags.flag_remove_all &&
				!global.flags.flag_menu_element_toolbox &&
				!global.flags.flag_history_lock
			) {
				if (key_event['ctrl']) {
					this.ctrl_pressed_started = true;
				}
			}
		}
	}
	key_up(key_event: KEY_EVENT_T): void {
		if (!global.flags.flag_history_lock && !MOBILE_MODE) {
			if (!this.mouse_down_flag) {
				this.ctrl_pressed_started = false;
				this.ctrl_pressed = false;
				this.delta_latch = false;
			}
		}
	}
	mouse_down(): void {
		if (
			!global.flags.flag_simulating &&
			!global.flags.flag_save_image &&
			!global.flags.flag_save_circuit &&
			!global.flags.flag_zoom &&
			!global.flags.flag_element_options &&
			!global.flags.flag_element_options_edit &&
			!global.flags.flag_graph &&
			!global.flags.flag_select_element &&
			!global.flags.flag_select_timestep &&
			!global.flags.flag_select_settings &&
			!global.flags.flag_remove_all &&
			!global.flags.flag_menu_element_toolbox &&
			!global.flags.flag_history_lock &&
			!MOBILE_MODE
		) {
			if (!global.flags.flag_history_lock) {
				this.mouse_down_flag = true;
				if (this.ctrl_pressed_started) {
					this.multi_select = true;
					this.select_x = global.variables.mouse_x;
					this.select_y = global.variables.mouse_y;
					this.multi_select_bounds.left = global.variables.mouse_x;
					this.multi_select_bounds.top = global.variables.mouse_y;
					this.multi_select_bounds.right = global.variables.mouse_x;
					this.multi_select_bounds.bottom = global.variables.mouse_y;
					this.selected_components_bounds.left = -this.OFFSCREEN_X;
					this.selected_components_bounds.top = -this.OFFSCREEN_Y;
					this.selected_components_bounds.right = this.OFFSCREEN_X + 1;
					this.selected_components_bounds.bottom = this.OFFSCREEN_Y + 1;
				}
			} else {
				if (!global.variables.component_touched) {
					this.ctrl_pressed_started = true;
					this.multi_select = true;
					this.select_x = global.variables.mouse_x;
					this.select_y = global.variables.mouse_y;
					this.multi_select_bounds.left = global.variables.mouse_x;
					this.multi_select_bounds.top = global.variables.mouse_y;
					this.multi_select_bounds.right = global.variables.mouse_x;
					this.multi_select_bounds.bottom = global.variables.mouse_y;
					this.selected_components_bounds.left = -this.OFFSCREEN_X;
					this.selected_components_bounds.top = -this.OFFSCREEN_Y;
					this.selected_components_bounds.right = this.OFFSCREEN_X + 1;
					this.selected_components_bounds.bottom = this.OFFSCREEN_Y + 1;
				}
			}
			if (global.variables.multi_selected) {
				this.delta_center_x = global.variables.mouse_x;
				this.delta_center_y = global.variables.mouse_y;
				this.delta_dx = 0;
				this.delta_dy = 0;
				this.delta_last_dx = 0;
				this.delta_last_dy = 0;
				this.elements_moved = false;
				if (this.selected_components_bounds.contains_xy(global.variables.mouse_x, global.variables.mouse_y)) {
					this.delta_latch = true;
				} else {
					this.delta_latch = false;
				}
			}
		}
	}
	mouse_move(): void {
		if (
			!global.flags.flag_simulating &&
			!global.flags.flag_save_image &&
			!global.flags.flag_save_circuit &&
			!global.flags.flag_zoom &&
			!global.flags.flag_element_options &&
			!global.flags.flag_element_options_edit &&
			!global.flags.flag_graph &&
			!global.flags.flag_select_element &&
			!global.flags.flag_select_timestep &&
			!global.flags.flag_select_settings &&
			!global.flags.flag_remove_all &&
			!global.flags.flag_menu_element_toolbox &&
			!global.flags.flag_history_lock &&
			!MOBILE_MODE
		) {
			if (this.ctrl_pressed_started) {
				if (Math.abs(global.variables.mouse_x - this.select_x) > global.variables.node_space_x || Math.abs(global.variables.mouse_y - this.select_y) > global.variables.node_space_y) {
					this.ctrl_pressed = true;
				}
				if (global.variables.component_translating) {
					this.ctrl_pressed = false;
					this.ctrl_pressed_started = false;
				}
			}
			if (global.variables.multi_selected && this.delta_latch) {
				this.delta_end_x = global.variables.mouse_x;
				this.delta_end_y = global.variables.mouse_y;
				if (this.delta_center_x > 0 && this.delta_center_y > 0) {
					this.delta_last_dx = this.delta_dx;
					this.delta_last_dy = this.delta_dy;
					this.delta_dx = Math.floor((this.delta_end_x - this.delta_center_x) / global.variables.node_space_x);
					this.delta_dy = Math.floor((this.delta_end_y - this.delta_center_y) / global.variables.node_space_y);
					if (this.delta_dx !== this.delta_last_dx || this.delta_dy !== this.delta_last_dy) {
						this.handle_multi_move();
					}
				}
			}
		}
		if (this.ctrl_pressed) {
			if (global.variables.mouse_x >= this.select_x) {
				this.multi_select_bounds.left = this.select_x;
				this.multi_select_bounds.right = global.variables.mouse_x;
			} else {
				this.multi_select_bounds.right = this.select_x;
				this.multi_select_bounds.left = global.variables.mouse_x;
			}
			if (global.variables.mouse_y >= this.select_y) {
				this.multi_select_bounds.top = this.select_y;
				this.multi_select_bounds.bottom = global.variables.mouse_y;
			} else {
				this.multi_select_bounds.bottom = this.select_y;
				this.multi_select_bounds.top = global.variables.mouse_y;
			}
		}
	}
	mouse_up(): void {
		if (!MOBILE_MODE) {
			this.mouse_down_flag = false;
			this.ctrl_pressed_started = false;
			this.ctrl_pressed = false;
			this.delta_latch = false;
			if (this.elements_moved) {
				global.variables.history['packet'].push(engine_functions.history_snapshot());
				this.elements_moved = false;
			}
		}
	}
	handle_multi_move(): void {
		let dx: number = (this.delta_dx - this.delta_last_dx) * global.variables.node_space_x;
		let dy: number = (this.delta_dy - this.delta_last_dy) * global.variables.node_space_y;
		if (!(multi_select_manager.selected_components_bounds.top > workspace.bounds.top + global.variables.node_space_y)) {
			if (dy < 0) {
				dy = 0;
			}
		}
		if (!(multi_select_manager.selected_components_bounds.bottom < workspace.bounds.bottom - global.variables.node_space_y)) {
			if (dy > 0) {
				dy = 0;
			}
		}
		if (!(multi_select_manager.selected_components_bounds.left > workspace.bounds.left + global.variables.node_space_x)) {
			if (dx < 0) {
				dx = 0;
			}
		}
		if (!(multi_select_manager.selected_components_bounds.right < workspace.bounds.right - global.variables.node_space_x)) {
			if (dx > 0) {
				dx = 0;
			}
		}
		if (dx !== 0 || dy !== 0) {
			global.flags.flag_build_element = true;
			global.variables.flag_build_counter = 0;
			this.elements_moved = true;
			/* #INSERT_GENERATE_MULTI_SELECT_ELEMENT_MOVE# */
			/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
			for (var i: number = 0; i < resistors.length; i++) {
				if (resistors[i].multi_selected) {
					{
						resistors[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < capacitors.length; i++) {
				if (capacitors[i].multi_selected) {
					{
						capacitors[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < inductors.length; i++) {
				if (inductors[i].multi_selected) {
					{
						inductors[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < grounds.length; i++) {
				if (grounds[i].multi_selected) {
					{
						grounds[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < dcsources.length; i++) {
				if (dcsources[i].multi_selected) {
					{
						dcsources[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < dccurrents.length; i++) {
				if (dccurrents[i].multi_selected) {
					{
						dccurrents[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < acsources.length; i++) {
				if (acsources[i].multi_selected) {
					{
						acsources[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < accurrents.length; i++) {
				if (accurrents[i].multi_selected) {
					{
						accurrents[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < squarewaves.length; i++) {
				if (squarewaves[i].multi_selected) {
					{
						squarewaves[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < sawwaves.length; i++) {
				if (sawwaves[i].multi_selected) {
					{
						sawwaves[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < trianglewaves.length; i++) {
				if (trianglewaves[i].multi_selected) {
					{
						trianglewaves[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < constants.length; i++) {
				if (constants[i].multi_selected) {
					{
						constants[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < wires.length; i++) {
				if (wires[i].multi_selected) {
					{
						wires[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < nets.length; i++) {
				if (nets[i].multi_selected) {
					{
						nets[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < notes.length; i++) {
				if (notes[i].multi_selected) {
					{
						notes[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < rails.length; i++) {
				if (rails[i].multi_selected) {
					{
						rails[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < voltmeters.length; i++) {
				if (voltmeters[i].multi_selected) {
					{
						voltmeters[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < ohmmeters.length; i++) {
				if (ohmmeters[i].multi_selected) {
					{
						ohmmeters[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < ammeters.length; i++) {
				if (ammeters[i].multi_selected) {
					{
						ammeters[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < wattmeters.length; i++) {
				if (wattmeters[i].multi_selected) {
					{
						wattmeters[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < fuses.length; i++) {
				if (fuses[i].multi_selected) {
					{
						fuses[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < spsts.length; i++) {
				if (spsts[i].multi_selected) {
					{
						spsts[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < spdts.length; i++) {
				if (spdts[i].multi_selected) {
					{
						spdts[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < nots.length; i++) {
				if (nots[i].multi_selected) {
					{
						nots[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < diodes.length; i++) {
				if (diodes[i].multi_selected) {
					{
						diodes[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < leds.length; i++) {
				if (leds[i].multi_selected) {
					{
						leds[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < zeners.length; i++) {
				if (zeners[i].multi_selected) {
					{
						zeners[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < potentiometers.length; i++) {
				if (potentiometers[i].multi_selected) {
					{
						potentiometers[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < ands.length; i++) {
				if (ands[i].multi_selected) {
					{
						ands[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < ors.length; i++) {
				if (ors[i].multi_selected) {
					{
						ors[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < nands.length; i++) {
				if (nands[i].multi_selected) {
					{
						nands[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < nors.length; i++) {
				if (nors[i].multi_selected) {
					{
						nors[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < xors.length; i++) {
				if (xors[i].multi_selected) {
					{
						xors[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < xnors.length; i++) {
				if (xnors[i].multi_selected) {
					{
						xnors[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < dffs.length; i++) {
				if (dffs[i].multi_selected) {
					{
						dffs[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < vsats.length; i++) {
				if (vsats[i].multi_selected) {
					{
						vsats[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < adders.length; i++) {
				if (adders[i].multi_selected) {
					{
						adders[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < subtractors.length; i++) {
				if (subtractors[i].multi_selected) {
					{
						subtractors[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < multipliers.length; i++) {
				if (multipliers[i].multi_selected) {
					{
						multipliers[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < dividers.length; i++) {
				if (dividers[i].multi_selected) {
					{
						dividers[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < gains.length; i++) {
				if (gains[i].multi_selected) {
					{
						gains[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < absvals.length; i++) {
				if (absvals[i].multi_selected) {
					{
						absvals[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < vcsws.length; i++) {
				if (vcsws[i].multi_selected) {
					{
						vcsws[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < vcvss.length; i++) {
				if (vcvss[i].multi_selected) {
					{
						vcvss[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < vccss.length; i++) {
				if (vccss[i].multi_selected) {
					{
						vccss[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < cccss.length; i++) {
				if (cccss[i].multi_selected) {
					{
						cccss[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < ccvss.length; i++) {
				if (ccvss[i].multi_selected) {
					{
						ccvss[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < opamps.length; i++) {
				if (opamps[i].multi_selected) {
					{
						opamps[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < nmosfets.length; i++) {
				if (nmosfets[i].multi_selected) {
					{
						nmosfets[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < pmosfets.length; i++) {
				if (pmosfets[i].multi_selected) {
					{
						pmosfets[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < npns.length; i++) {
				if (npns[i].multi_selected) {
					{
						npns[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < pnps.length; i++) {
				if (pnps[i].multi_selected) {
					{
						pnps[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < adcs.length; i++) {
				if (adcs[i].multi_selected) {
					{
						adcs[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < dacs.length; i++) {
				if (dacs[i].multi_selected) {
					{
						dacs[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < sandhs.length; i++) {
				if (sandhs[i].multi_selected) {
					{
						sandhs[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < pwms.length; i++) {
				if (pwms[i].multi_selected) {
					{
						pwms[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < integrators.length; i++) {
				if (integrators[i].multi_selected) {
					{
						integrators[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < differentiators.length; i++) {
				if (differentiators[i].multi_selected) {
					{
						differentiators[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < lowpasses.length; i++) {
				if (lowpasses[i].multi_selected) {
					{
						lowpasses[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < highpasses.length; i++) {
				if (highpasses[i].multi_selected) {
					{
						highpasses[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < relays.length; i++) {
				if (relays[i].multi_selected) {
					{
						relays[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < pids.length; i++) {
				if (pids[i].multi_selected) {
					{
						pids[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < luts.length; i++) {
				if (luts[i].multi_selected) {
					{
						luts[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < vcrs.length; i++) {
				if (vcrs[i].multi_selected) {
					{
						vcrs[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < vccas.length; i++) {
				if (vccas[i].multi_selected) {
					{
						vccas[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < vcls.length; i++) {
				if (vcls[i].multi_selected) {
					{
						vcls[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < grts.length; i++) {
				if (grts[i].multi_selected) {
					{
						grts[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < tptzs.length; i++) {
				if (tptzs[i].multi_selected) {
					{
						tptzs[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < transformers.length; i++) {
				if (transformers[i].multi_selected) {
					{
						transformers[i].move_element(dx, dy);
					}
				}
			}

			/* <!-- END AUTOMATICALLY GENERATED !--> */
			if (!global.variables.component_touched) {
				global.variables.component_touched = true;
			}
		}
	}
	determine_enveloping_bounds(bounds: RectF): void {
		if (
			!global.flags.flag_save_image &&
			!global.flags.flag_save_circuit &&
			!global.flags.flag_zoom &&
			!global.flags.flag_element_options &&
			!global.flags.flag_element_options_edit &&
			!global.flags.flag_graph &&
			!global.flags.flag_select_element &&
			!global.flags.flag_select_timestep &&
			!global.flags.flag_select_settings &&
			!global.flags.flag_remove_all &&
			!global.flags.flag_menu_element_toolbox
		) {
			global.variables.multi_selected = true;
			this.selected_components_bounds.left = Math.min(this.selected_components_bounds.left, bounds.left - global.variables.node_space_x);
			this.selected_components_bounds.top = Math.min(this.selected_components_bounds.top, bounds.top - global.variables.node_space_y);
			this.selected_components_bounds.right = Math.max(this.selected_components_bounds.right, bounds.right + global.variables.node_space_x);
			this.selected_components_bounds.bottom = Math.max(this.selected_components_bounds.bottom, bounds.bottom + global.variables.node_space_y);
		}
	}
	draw_bounds(canvas: GraphicsEngine): void {
		if (this.multi_select) {
			if (
				!global.flags.flag_save_image &&
				!global.flags.flag_save_circuit &&
				!global.flags.flag_zoom &&
				!global.flags.flag_element_options &&
				!global.flags.flag_element_options_edit &&
				!global.flags.flag_graph &&
				!global.flags.flag_select_element &&
				!global.flags.flag_select_timestep &&
				!global.flags.flag_select_settings &&
				!global.flags.flag_remove_all &&
				!global.flags.flag_menu_element_toolbox
			) {
				canvas.draw_rect2(this.multi_select_bounds, this.fill_paint);
			}
		}
		if (global.variables.multi_selected) {
			if (
				this.selected_components_bounds.left > this.OFFSCREEN_X >> 1 &&
				this.selected_components_bounds.top > this.OFFSCREEN_Y >> 1 &&
				this.selected_components_bounds.right > this.OFFSCREEN_X >> 1 &&
				this.selected_components_bounds.bottom > this.OFFSCREEN_Y >> 1
			) {
				this.draw_bounds_flag.left = this.selected_components_bounds.left;
				this.draw_bounds_flag.top = this.selected_components_bounds.top;
				this.draw_bounds_flag.right = this.selected_components_bounds.right;
				this.draw_bounds_flag.bottom = this.selected_components_bounds.bottom;
				canvas.draw_rect2(this.draw_bounds_flag, this.line_paint);
			}
		}
		if (global.CONSTANTS.DEVELOPER_MODE) {
			canvas.draw_line(this.delta_center_x, this.delta_center_y, this.delta_end_x, this.delta_end_y, this.line_paint);
		}
	}
}
