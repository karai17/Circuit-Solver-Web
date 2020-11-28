/**********************************************************************
 * Project           : Circuit Solver
 * File		        : ShortcutManager.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A class to handle all the shortcuts in the system.
 *
 * Copyright PHASORSYSTEMS, 2019. All Rights Reserved.
 * UNPUBLISHED, LICENSED SOFTWARE.
 *
 * CONFIDENTIAL AND PROPRIETARY INFORMATION
 * WHICH IS THE PROPERTY OF PHASORSYSTEMS.
 *
 * Revision History  :
 *
 * Date        Author      	Ref    Revision (Date in YYYYMMDD format)
 * 20190928    nboatengc     1      Initial Commit.
 *
 ***********************************************************************/
class ShortcutManager {
  public SHORTCUT_COPY = global.KEY_CODE_C;
  public SHORTCUT_PASTE = global.KEY_CODE_V;
  public SHORTCUT_UNDO = global.KEY_CODE_Z;
  public SHORTCUT_ADD_ELEMENT = global.KEY_CODE_N;
  public SHORTCUT_REDO = global.KEY_CODE_Y;
  public SHORTCUT_SAVE_IMAGE = global.KEY_CODE_I;
  public SHORTCUT_SAVE_CIRCUIT = global.KEY_CODE_S;
  public SHORTCUT_ROTATE = global.KEY_CODE_R;
  public SHORTCUT_DELETE = global.KEY_CODE_DELETE;
  public SHORTCUT_FLIP = global.KEY_CODE_F;
  public SHORTCUT_EDIT = global.KEY_CODE_E;
  public SHORTCUT_REMOVE_ALL = global.KEY_CODE_X;
  public SHORTCUT_SIMULATE = global.KEY_CODE_A;
  public SHORTCUT_QUERY = global.KEY_CODE_Q;
  public SHORTCUT_RESET_WINDOW = global.KEY_CODE_M;
  public SHORTCUT_TOGGLE_SWITCH = global.KEY_CODE_SPACE;
  public MULTI_MOVED_ELEMENT = false;
  public MULTI_DELETED_ELEMENT = false;
  public ENABLE_ARROW_KEYS = true;
  public TEMP_HISTORY_SNAPSHOT = '';
  public command = '';
  public shift = '';
  public caps = '';

  constructor() {
    this.SHORTCUT_COPY = global.KEY_CODE_C;
    this.SHORTCUT_PASTE = global.KEY_CODE_V;
    this.SHORTCUT_UNDO = global.KEY_CODE_Z;
    this.SHORTCUT_ADD_ELEMENT = global.KEY_CODE_N;
    this.SHORTCUT_REDO = global.KEY_CODE_Y;
    this.SHORTCUT_SAVE_IMAGE = global.KEY_CODE_I;
    this.SHORTCUT_SAVE_CIRCUIT = global.KEY_CODE_S;
    this.SHORTCUT_ROTATE = global.KEY_CODE_R;
    this.SHORTCUT_DELETE = global.KEY_CODE_DELETE;
    this.SHORTCUT_FLIP = global.KEY_CODE_F;
    this.SHORTCUT_EDIT = global.KEY_CODE_E;
    this.SHORTCUT_REMOVE_ALL = global.KEY_CODE_X;
    this.SHORTCUT_SIMULATE = global.KEY_CODE_A;
    this.SHORTCUT_QUERY = global.KEY_CODE_Q;
    this.SHORTCUT_RESET_WINDOW = global.KEY_CODE_M;
    this.SHORTCUT_TOGGLE_SWITCH = global.KEY_CODE_SPACE;
    this.MULTI_MOVED_ELEMENT = false;
    this.MULTI_DELETED_ELEMENT = false;
    this.ENABLE_ARROW_KEYS = true;
    this.TEMP_HISTORY_SNAPSHOT = '';
    this.command = '';
    this.shift = '';
    this.caps = '';
  }
  listen(key_event) {
    if (
      !global.FLAG_SAVE_IMAGE &&
      !global.FLAG_SAVE_CIRCUIT &&
      !global.FLAG_ZOOM &&
      !global.FLAG_ELEMENT_OPTIONS &&
      !global.FLAG_ELEMENT_OPTIONS_EDIT &&
      !global.FLAG_SELECT_ELEMENT &&
      !global.FLAG_SELECT_TIMESTEP &&
      !global.FLAG_SELECT_SETTINGS &&
      !global.FLAG_REMOVE_ALL
    ) {
      if (!global.FLAG_GRAPH) {
        if (!global.FLAG_SIMULATING && !global.FLAG_MENU_OPEN_DOWN) {
          this.handle_rotate_shortcut(key_event);
          this.handle_delete_shortcut(key_event);
          this.handle_undo_shortcut(key_event);
          this.handle_redo_shortcut(key_event);
          this.handle_flip_shortcut(key_event);
          this.handle_edit_shortcut(key_event);
          this.handle_remove_all_shortcut(key_event);
          this.handle_copy_shortcut(key_event);
          this.handle_paste_shortcut(key_event);
          this.handle_add_element_flag(key_event);
          this.handle_escape_shortcut(key_event);
          this.handle_select_all(key_event);
          if (this.ENABLE_ARROW_KEYS) {
            this.handle_arrow_keys_multi_select(key_event);
            this.handle_arrow_keys_select(key_event);
          }
        } else if (!global.FLAG_SIMULATING) {
          if (!global.SIGNAL_ADD_ELEMENT) {
            this.handle_add_element_flag(key_event);
          } else {
            this.handle_escape_shortcut(key_event);
            this.handle_flip_shortcut(key_event);
            this.handle_rotate_shortcut(key_event);
          }
        } else if (global.FLAG_SIMULATING && !global.FLAG_MENU_OPEN_DOWN) {
          this.handle_edit_shortcut(key_event);
          this.handle_toggle_switches(key_event);
          this.handle_query_shortcut(key_event);
        }
        if (this.ENABLE_ARROW_KEYS) {
          this.handle_arrow_keys_menu_open_down(key_event);
        }
      }
      if (!global.FLAG_MENU_OPEN_DOWN) {
        this.handle_simulate_shortcut(key_event);
      }
    }
    if (
      !global.FLAG_SAVE_IMAGE &&
      !global.FLAG_SAVE_CIRCUIT &&
      !global.FLAG_ELEMENT_OPTIONS_EDIT &&
      !global.FLAG_SELECT_TIMESTEP
    ) {
      this.handle_reset_window_shortcut(key_event);
    }
    if (
      !global.FLAG_SAVE_IMAGE &&
      !global.FLAG_SAVE_CIRCUIT &&
      !global.FLAG_ZOOM &&
      !global.FLAG_ELEMENT_OPTIONS &&
      !global.FLAG_ELEMENT_OPTIONS_EDIT &&
      !global.FLAG_GRAPH &&
      !global.FLAG_SELECT_ELEMENT &&
      !global.FLAG_SELECT_TIMESTEP &&
      !global.FLAG_SELECT_SETTINGS &&
      !global.FLAG_REMOVE_ALL &&
      !global.FLAG_MENU_OPEN_DOWN
    ) {
      this.handle_save_image_flag(key_event);
      this.handle_save_circuit_flag(key_event);
    }
  }
  handle_select_all(key_event) {
    /* Extract the essentials. */
    this.shift = key_event['shift'];
    this.command = key_event['event'].code;
    this.caps = key_event['caps'];
    if (this.command === this.SHORTCUT_SIMULATE && key_event['ctrl'] === true) {
      global.selected_id = global.NULL;
      global.selected_type = -1;
      global.selected_bounds = global.NULL;
      global.selected_properties = global.NULL;
      global.selected_wire_style = global.NULL;
      global.selected = false;
      global.multi_selected = true;
      /* #INSERT_GENERATE_MULTI_SELECT_ELEMENTS_SHORTCUT# */
      /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
      for (var i = 0; i < resistors.length; i++) {
        resistors[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < capacitors.length; i++) {
        capacitors[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < inductors.length; i++) {
        inductors[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < grounds.length; i++) {
        grounds[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < dcsources.length; i++) {
        dcsources[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < dccurrents.length; i++) {
        dccurrents[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < acsources.length; i++) {
        acsources[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < accurrents.length; i++) {
        accurrents[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < squarewaves.length; i++) {
        squarewaves[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < sawwaves.length; i++) {
        sawwaves[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < trianglewaves.length; i++) {
        trianglewaves[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < constants.length; i++) {
        constants[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < wires.length; i++) {
        wires[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < nets.length; i++) {
        nets[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < notes.length; i++) {
        notes[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < rails.length; i++) {
        rails[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < voltmeters.length; i++) {
        voltmeters[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < ohmmeters.length; i++) {
        ohmmeters[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < ammeters.length; i++) {
        ammeters[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < wattmeters.length; i++) {
        wattmeters[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < fuses.length; i++) {
        fuses[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < spsts.length; i++) {
        spsts[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < spdts.length; i++) {
        spdts[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < nots.length; i++) {
        nots[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < diodes.length; i++) {
        diodes[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < leds.length; i++) {
        leds[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < zeners.length; i++) {
        zeners[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < potentiometers.length; i++) {
        potentiometers[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < ands.length; i++) {
        ands[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < ors.length; i++) {
        ors[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < nands.length; i++) {
        nands[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < nors.length; i++) {
        nors[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < xors.length; i++) {
        xors[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < xnors.length; i++) {
        xnors[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < dffs.length; i++) {
        dffs[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < vsats.length; i++) {
        vsats[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < adders.length; i++) {
        adders[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < subtractors.length; i++) {
        subtractors[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < multipliers.length; i++) {
        multipliers[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < dividers.length; i++) {
        dividers[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < gains.length; i++) {
        gains[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < absvals.length; i++) {
        absvals[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < vcsws.length; i++) {
        vcsws[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < vcvss.length; i++) {
        vcvss[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < vccss.length; i++) {
        vccss[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < cccss.length; i++) {
        cccss[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < ccvss.length; i++) {
        ccvss[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < opamps.length; i++) {
        opamps[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < nmosfets.length; i++) {
        nmosfets[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < pmosfets.length; i++) {
        pmosfets[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < npns.length; i++) {
        npns[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < pnps.length; i++) {
        pnps[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < adcs.length; i++) {
        adcs[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < dacs.length; i++) {
        dacs[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < sandhs.length; i++) {
        sandhs[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < pwms.length; i++) {
        pwms[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < integrators.length; i++) {
        integrators[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < differentiators.length; i++) {
        differentiators[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < lowpasses.length; i++) {
        lowpasses[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < highpasses.length; i++) {
        highpasses[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < relays.length; i++) {
        relays[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < pids.length; i++) {
        pids[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < luts.length; i++) {
        luts[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < vcrs.length; i++) {
        vcrs[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < grts.length; i++) {
        grts[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < tptzs.length; i++) {
        tptzs[i].MULTI_SELECTED = true;
      }
      for (var i = 0; i < transformers.length; i++) {
        transformers[i].MULTI_SELECTED = true;
      }
      /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
  }
  handle_toggle_switches(key_event) {
    /* Extract the essentials. */
    this.shift = key_event['shift'];
    this.command = key_event['event'].code;
    this.caps = key_event['caps'];
    if (key_event['event'].code === this.SHORTCUT_TOGGLE_SWITCH) {
      if (global.selected_type === global.TYPE_SPST) {
        let index = engine_functions.get_spst(global.selected_id);
        if (index > -1 && index < spsts.length) {
          if (spsts[index].elm.properties['Switch State'] === global.ON) {
            spsts[index].elm.properties['Switch State'] = global.OFF;
          } else if (
            spsts[index].elm.properties['Switch State'] === global.OFF
          ) {
            spsts[index].elm.properties['Switch State'] = global.ON;
          }
          global.selected_properties['Switch State'] =
            spsts[index].elm.properties['Switch State'];
        }
      } else if (global.selected_type === global.TYPE_SPDT) {
        let index = engine_functions.get_spdt(global.selected_id);
        if (index > -1 && index < spdts.length) {
          if (spdts[index].elm.properties['Switch State'] === global.ON) {
            spdts[index].elm.properties['Switch State'] = global.OFF;
          } else if (
            spdts[index].elm.properties['Switch State'] === global.OFF
          ) {
            spdts[index].elm.properties['Switch State'] = global.ON;
          }
          global.selected_properties['Switch State'] =
            spdts[index].elm.properties['Switch State'];
        }
      }
    }
  }
  handle_escape_shortcut(key_event) {
    if (key_event['event'].code === global.KEY_CODE_ESCAPE) {
      if (global.SIGNAL_HISTORY_LOCK && this.TEMP_HISTORY_SNAPSHOT != '') {
        engine_functions.parse_elements(this.TEMP_HISTORY_SNAPSHOT);
        this.TEMP_HISTORY_SNAPSHOT = '';
        global.SIGNAL_HISTORY_LOCK = false;
        if (global.SIGNAL_ADD_ELEMENT) {
          global.SIGNAL_ADD_ELEMENT = false;
          menu_bar.ESCAPE_INTERRUPT = true;
          /* Reset the element window draw flags. */
          menu_bar.mouse_move();
        }
      }
    }
  }
  handle_add_element_flag(key_event) {
    /* Extract the essentials. */
    this.shift = key_event['shift'];
    this.command = key_event['event'].code;
    this.caps = key_event['caps'];
    if (this.command === this.SHORTCUT_ADD_ELEMENT) {
      if (!global.FLAG_MENU_OPEN) {
        menu_bar.handle_menu_open_flag(!global.FLAG_MENU_OPEN);
      }
      menu_bar.handle_menu_open_down_flag(!global.FLAG_MENU_OPEN_DOWN);
    }
  }
  handle_arrow_keys_menu_open_down(key_event) {
    if (global.FLAG_MENU_OPEN_DOWN) {
      if (!global.focused) {
        if (
          key_event['event'].code === global.KEY_CODE_ARROW_LEFT ||
          key_event['event'].code === global.KEY_CODE_ARROW_RIGHT ||
          key_event['event'].code === global.KEY_CODE_END ||
          key_event['event'].code === global.KEY_CODE_HOME
        ) {
          /* Left. */
          if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
            let temp_x = global.mouse_x;
            let temp_y = global.mouse_y;
            global.mouse_x = menu_bar.element_window.positions[
              menu_bar.element_window.NAVIGATE_BACK
            ].get_center_x();
            global.mouse_y = menu_bar.element_window.positions[
              menu_bar.element_window.NAVIGATE_BACK
            ].get_center_y();
            menu_bar.element_window.mouse_down();
            menu_bar.element_window.mouse_up();
            global.mouse_x = temp_x;
            global.mouse_y = temp_y;
          } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
            /* Right. */
            let temp_x = global.mouse_x;
            let temp_y = global.mouse_y;
            global.mouse_x = menu_bar.element_window.positions[
              menu_bar.element_window.NAVIGATE_FORWARD
            ].get_center_x();
            global.mouse_y = menu_bar.element_window.positions[
              menu_bar.element_window.NAVIGATE_FORWARD
            ].get_center_y();
            menu_bar.element_window.mouse_down();
            menu_bar.element_window.mouse_up();
            global.mouse_x = temp_x;
            global.mouse_y = temp_y;
          } else if (key_event['event'].code === global.KEY_CODE_END) {
            /* End. */
            menu_bar.element_window.PAGE_NUMBER =
              menu_bar.element_window.MAX_PAGE_NUMBER;
          } else if (key_event['event'].code === global.KEY_CODE_HOME) {
            /* Home. */
            menu_bar.element_window.PAGE_NUMBER = 0;
          }
        }
      }
    }
  }
  handle_arrow_keys_select(key_event) {
    if (
      key_event['event'].code === global.KEY_CODE_ARROW_UP ||
      key_event['event'].code === global.KEY_CODE_ARROW_DOWN ||
      key_event['event'].code === global.KEY_CODE_ARROW_LEFT ||
      key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
    ) {
      global.SIGNAL_BUILD_ELEMENT = true;
      if (global.selected) {
        /* #INSERT_GENERATE_HANDLE_SELECT_ELEMENTS_MOVE# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        if (global.selected_type === global.TYPE_RESISTOR) {
          var index = engine_functions.get_resistor(global.selected_id);
          if (index < resistors.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              resistors[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              resistors[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              resistors[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              resistors[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_CAPACITOR) {
          var index = engine_functions.get_capacitor(global.selected_id);
          if (index < capacitors.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              capacitors[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              capacitors[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              capacitors[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              capacitors[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_INDUCTOR) {
          var index = engine_functions.get_inductor(global.selected_id);
          if (index < inductors.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              inductors[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              inductors[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              inductors[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              inductors[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_GROUND) {
          var index = engine_functions.get_ground(global.selected_id);
          if (index < grounds.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              grounds[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              grounds[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              grounds[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              grounds[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_DCSOURCE) {
          var index = engine_functions.get_dcsource(global.selected_id);
          if (index < dcsources.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              dcsources[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              dcsources[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              dcsources[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              dcsources[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_DCCURRENT) {
          var index = engine_functions.get_dccurrent(global.selected_id);
          if (index < dccurrents.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              dccurrents[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              dccurrents[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              dccurrents[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              dccurrents[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_ACSOURCE) {
          var index = engine_functions.get_acsource(global.selected_id);
          if (index < acsources.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              acsources[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              acsources[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              acsources[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              acsources[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_ACCURRENT) {
          var index = engine_functions.get_accurrent(global.selected_id);
          if (index < accurrents.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              accurrents[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              accurrents[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              accurrents[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              accurrents[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_SQUAREWAVE) {
          var index = engine_functions.get_squarewave(global.selected_id);
          if (index < squarewaves.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              squarewaves[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              squarewaves[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              squarewaves[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              squarewaves[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_SAW) {
          var index = engine_functions.get_sawwave(global.selected_id);
          if (index < sawwaves.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              sawwaves[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              sawwaves[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              sawwaves[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              sawwaves[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_TRI) {
          var index = engine_functions.get_trianglewave(global.selected_id);
          if (index < trianglewaves.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              trianglewaves[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              trianglewaves[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              trianglewaves[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              trianglewaves[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_CONSTANT) {
          var index = engine_functions.get_constant(global.selected_id);
          if (index < constants.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              constants[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              constants[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              constants[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              constants[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_NET) {
          var index = engine_functions.get_net(global.selected_id);
          if (index < nets.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              nets[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              nets[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              nets[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              nets[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_NOTE) {
          var index = engine_functions.get_note(global.selected_id);
          if (index < notes.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              notes[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              notes[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              notes[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              notes[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_RAIL) {
          var index = engine_functions.get_rail(global.selected_id);
          if (index < rails.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              rails[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              rails[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              rails[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              rails[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_VOLTMETER) {
          var index = engine_functions.get_voltmeter(global.selected_id);
          if (index < voltmeters.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              voltmeters[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              voltmeters[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              voltmeters[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              voltmeters[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_OHMMETER) {
          var index = engine_functions.get_ohmmeter(global.selected_id);
          if (index < ohmmeters.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              ohmmeters[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              ohmmeters[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              ohmmeters[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              ohmmeters[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_AMMETER) {
          var index = engine_functions.get_ammeter(global.selected_id);
          if (index < ammeters.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              ammeters[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              ammeters[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              ammeters[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              ammeters[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_WATTMETER) {
          var index = engine_functions.get_wattmeter(global.selected_id);
          if (index < wattmeters.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              wattmeters[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              wattmeters[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              wattmeters[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              wattmeters[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_FUSE) {
          var index = engine_functions.get_fuse(global.selected_id);
          if (index < fuses.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              fuses[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              fuses[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              fuses[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              fuses[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_SPST) {
          var index = engine_functions.get_spst(global.selected_id);
          if (index < spsts.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              spsts[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              spsts[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              spsts[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              spsts[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_SPDT) {
          var index = engine_functions.get_spdt(global.selected_id);
          if (index < spdts.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              spdts[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              spdts[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              spdts[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              spdts[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_NOT) {
          var index = engine_functions.get_not(global.selected_id);
          if (index < nots.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              nots[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              nots[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              nots[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              nots[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_DIODE) {
          var index = engine_functions.get_diode(global.selected_id);
          if (index < diodes.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              diodes[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              diodes[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              diodes[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              diodes[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_LED) {
          var index = engine_functions.get_led(global.selected_id);
          if (index < leds.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              leds[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              leds[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              leds[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              leds[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_ZENER) {
          var index = engine_functions.get_zener(global.selected_id);
          if (index < zeners.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              zeners[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              zeners[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              zeners[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              zeners[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_POTENTIOMETER) {
          var index = engine_functions.get_potentiometer(global.selected_id);
          if (index < potentiometers.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              potentiometers[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              potentiometers[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              potentiometers[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              potentiometers[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_AND) {
          var index = engine_functions.get_and(global.selected_id);
          if (index < ands.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              ands[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              ands[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              ands[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              ands[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_OR) {
          var index = engine_functions.get_or(global.selected_id);
          if (index < ors.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              ors[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              ors[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              ors[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              ors[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_NAND) {
          var index = engine_functions.get_nand(global.selected_id);
          if (index < nands.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              nands[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              nands[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              nands[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              nands[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_NOR) {
          var index = engine_functions.get_nor(global.selected_id);
          if (index < nors.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              nors[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              nors[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              nors[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              nors[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_XOR) {
          var index = engine_functions.get_xor(global.selected_id);
          if (index < xors.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              xors[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              xors[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              xors[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              xors[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_XNOR) {
          var index = engine_functions.get_xnor(global.selected_id);
          if (index < xnors.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              xnors[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              xnors[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              xnors[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              xnors[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_DFF) {
          var index = engine_functions.get_dff(global.selected_id);
          if (index < dffs.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              dffs[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              dffs[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              dffs[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              dffs[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_VSAT) {
          var index = engine_functions.get_vsat(global.selected_id);
          if (index < vsats.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              vsats[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              vsats[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              vsats[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              vsats[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_ADD) {
          var index = engine_functions.get_adder(global.selected_id);
          if (index < adders.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              adders[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              adders[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              adders[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              adders[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_SUB) {
          var index = engine_functions.get_subtractor(global.selected_id);
          if (index < subtractors.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              subtractors[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              subtractors[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              subtractors[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              subtractors[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_MUL) {
          var index = engine_functions.get_multiplier(global.selected_id);
          if (index < multipliers.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              multipliers[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              multipliers[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              multipliers[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              multipliers[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_DIV) {
          var index = engine_functions.get_divider(global.selected_id);
          if (index < dividers.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              dividers[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              dividers[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              dividers[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              dividers[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_GAIN) {
          var index = engine_functions.get_gain(global.selected_id);
          if (index < gains.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              gains[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              gains[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              gains[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              gains[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_ABS) {
          var index = engine_functions.get_absval(global.selected_id);
          if (index < absvals.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              absvals[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              absvals[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              absvals[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              absvals[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_VCSW) {
          var index = engine_functions.get_vcsw(global.selected_id);
          if (index < vcsws.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              vcsws[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              vcsws[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              vcsws[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              vcsws[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_VCVS) {
          var index = engine_functions.get_vcvs(global.selected_id);
          if (index < vcvss.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              vcvss[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              vcvss[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              vcvss[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              vcvss[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_VCCS) {
          var index = engine_functions.get_vccs(global.selected_id);
          if (index < vccss.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              vccss[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              vccss[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              vccss[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              vccss[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_CCCS) {
          var index = engine_functions.get_cccs(global.selected_id);
          if (index < cccss.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              cccss[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              cccss[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              cccss[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              cccss[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_CCVS) {
          var index = engine_functions.get_ccvs(global.selected_id);
          if (index < ccvss.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              ccvss[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              ccvss[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              ccvss[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              ccvss[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_OPAMP) {
          var index = engine_functions.get_opamp(global.selected_id);
          if (index < opamps.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              opamps[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              opamps[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              opamps[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              opamps[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_NMOS) {
          var index = engine_functions.get_nmosfet(global.selected_id);
          if (index < nmosfets.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              nmosfets[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              nmosfets[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              nmosfets[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              nmosfets[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_PMOS) {
          var index = engine_functions.get_pmosfet(global.selected_id);
          if (index < pmosfets.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              pmosfets[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              pmosfets[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              pmosfets[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              pmosfets[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_NPN) {
          var index = engine_functions.get_npn(global.selected_id);
          if (index < npns.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              npns[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              npns[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              npns[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              npns[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_PNP) {
          var index = engine_functions.get_pnp(global.selected_id);
          if (index < pnps.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              pnps[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              pnps[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              pnps[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              pnps[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_ADC) {
          var index = engine_functions.get_adc(global.selected_id);
          if (index < adcs.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              adcs[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              adcs[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              adcs[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              adcs[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_DAC) {
          var index = engine_functions.get_dac(global.selected_id);
          if (index < dacs.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              dacs[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              dacs[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              dacs[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              dacs[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_SAH) {
          var index = engine_functions.get_samplers(global.selected_id);
          if (index < sandhs.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              sandhs[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              sandhs[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              sandhs[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              sandhs[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_PWM) {
          var index = engine_functions.get_pwm(global.selected_id);
          if (index < pwms.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              pwms[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              pwms[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              pwms[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              pwms[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_INTEGRATOR) {
          var index = engine_functions.get_integrator(global.selected_id);
          if (index < integrators.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              integrators[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              integrators[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              integrators[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              integrators[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_DIFFERENTIATOR) {
          var index = engine_functions.get_differentiator(global.selected_id);
          if (index < differentiators.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              differentiators[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              differentiators[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              differentiators[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              differentiators[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_LPF) {
          var index = engine_functions.get_lowpass(global.selected_id);
          if (index < lowpasses.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              lowpasses[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              lowpasses[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              lowpasses[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              lowpasses[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_HPF) {
          var index = engine_functions.get_highpass(global.selected_id);
          if (index < highpasses.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              highpasses[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              highpasses[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              highpasses[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              highpasses[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_REL) {
          var index = engine_functions.get_relay(global.selected_id);
          if (index < relays.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              relays[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              relays[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              relays[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              relays[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_PID) {
          var index = engine_functions.get_pid(global.selected_id);
          if (index < pids.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              pids[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              pids[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              pids[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              pids[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_LUT) {
          var index = engine_functions.get_lut(global.selected_id);
          if (index < luts.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              luts[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              luts[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              luts[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              luts[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_VCR) {
          var index = engine_functions.get_vcr(global.selected_id);
          if (index < vcrs.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              vcrs[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              vcrs[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              vcrs[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              vcrs[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_GRT) {
          var index = engine_functions.get_grt(global.selected_id);
          if (index < grts.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              grts[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              grts[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              grts[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              grts[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_TPTZ) {
          var index = engine_functions.get_tptz(global.selected_id);
          if (index < tptzs.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              tptzs[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              tptzs[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              tptzs[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              tptzs[index].move_element(global.node_space_x, 0);
            }
          }
        } else if (global.selected_type === global.TYPE_TRAN) {
          var index = engine_functions.get_transformer(global.selected_id);
          if (index < transformers.length) {
            /* Up. */
            if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
              transformers[index].move_element(0, -global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
              /* Down. */
              transformers[index].move_element(0, global.node_space_y);
            } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
              /* Left. */
              transformers[index].move_element(-global.node_space_x, 0);
            } else if (
              /* Right. */
              key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
            ) {
              transformers[index].move_element(global.node_space_x, 0);
            }
          }
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
      }
    }
  }
  /* Look at where this is called, it could be that the SELECTED_COMPONENTS_BOUNDS is reset to max when it's called <_< */
  handle_arrow_keys_multi_select(key_event) {
    if (
      key_event['event'].code === global.KEY_CODE_ARROW_UP ||
      key_event['event'].code === global.KEY_CODE_ARROW_DOWN ||
      key_event['event'].code === global.KEY_CODE_ARROW_LEFT ||
      key_event['event'].code === global.KEY_CODE_ARROW_RIGHT
    ) {
      global.SIGNAL_BUILD_ELEMENT = true;
      this.MULTI_MOVED_ELEMENT = false;
      let elm_max = global.element_max();
      for (var i = 0; i < elm_max; i++) {
        /* #INSERT_GENERATE_HANDLE_MULTI_SELECT_ELEMENTS_MOVE_CALL# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        this.handle_move_resistors(i, key_event);
        this.handle_move_capacitors(i, key_event);
        this.handle_move_inductors(i, key_event);
        this.handle_move_grounds(i, key_event);
        this.handle_move_dcsources(i, key_event);
        this.handle_move_dccurrents(i, key_event);
        this.handle_move_acsources(i, key_event);
        this.handle_move_accurrents(i, key_event);
        this.handle_move_squarewaves(i, key_event);
        this.handle_move_sawwaves(i, key_event);
        this.handle_move_trianglewaves(i, key_event);
        this.handle_move_constants(i, key_event);
        this.handle_move_wires(i, key_event);
        this.handle_move_nets(i, key_event);
        this.handle_move_notes(i, key_event);
        this.handle_move_rails(i, key_event);
        this.handle_move_voltmeters(i, key_event);
        this.handle_move_ohmmeters(i, key_event);
        this.handle_move_ammeters(i, key_event);
        this.handle_move_wattmeters(i, key_event);
        this.handle_move_fuses(i, key_event);
        this.handle_move_spsts(i, key_event);
        this.handle_move_spdts(i, key_event);
        this.handle_move_nots(i, key_event);
        this.handle_move_diodes(i, key_event);
        this.handle_move_leds(i, key_event);
        this.handle_move_zeners(i, key_event);
        this.handle_move_potentiometers(i, key_event);
        this.handle_move_ands(i, key_event);
        this.handle_move_ors(i, key_event);
        this.handle_move_nands(i, key_event);
        this.handle_move_nors(i, key_event);
        this.handle_move_xors(i, key_event);
        this.handle_move_xnors(i, key_event);
        this.handle_move_dffs(i, key_event);
        this.handle_move_vsats(i, key_event);
        this.handle_move_adders(i, key_event);
        this.handle_move_subtractors(i, key_event);
        this.handle_move_multipliers(i, key_event);
        this.handle_move_dividers(i, key_event);
        this.handle_move_gains(i, key_event);
        this.handle_move_absvals(i, key_event);
        this.handle_move_vcsws(i, key_event);
        this.handle_move_vcvss(i, key_event);
        this.handle_move_vccss(i, key_event);
        this.handle_move_cccss(i, key_event);
        this.handle_move_ccvss(i, key_event);
        this.handle_move_opamps(i, key_event);
        this.handle_move_nmosfets(i, key_event);
        this.handle_move_pmosfets(i, key_event);
        this.handle_move_npns(i, key_event);
        this.handle_move_pnps(i, key_event);
        this.handle_move_adcs(i, key_event);
        this.handle_move_dacs(i, key_event);
        this.handle_move_sandhs(i, key_event);
        this.handle_move_pwms(i, key_event);
        this.handle_move_integrators(i, key_event);
        this.handle_move_differentiators(i, key_event);
        this.handle_move_lowpasses(i, key_event);
        this.handle_move_highpasses(i, key_event);
        this.handle_move_relays(i, key_event);
        this.handle_move_pids(i, key_event);
        this.handle_move_luts(i, key_event);
        this.handle_move_vcrs(i, key_event);
        this.handle_move_grts(i, key_event);
        this.handle_move_tptzs(i, key_event);
        this.handle_move_transformers(i, key_event);
        /* <!-- END AUTOMATICALLY GENERATED !--> */
      }
      if (this.MULTI_MOVED_ELEMENT) {
        global.HISTORY_MANAGER['packet'].push(
          engine_functions.history_snapshot()
        );
        this.MULTI_MOVED_ELEMENT = false;
      }
    }
  }
  handle_delete_shortcut(key_event) {
    /* Extract the essentials. */
    this.shift = key_event['shift'];
    this.command = key_event['event'].code;
    this.caps = key_event['caps'];
    if (key_event['event'].code === this.SHORTCUT_DELETE) {
      if (!global.multi_selected) {
        let index = -1;
        /* #INSERT_GENERATE_REMOVE_ELEMENTS_SHORTCUT# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        if (global.selected_type === global.TYPE_RESISTOR) {
          index = engine_functions.get_resistor(global.selected_id);

          if (index < resistors.length) {
            engine_functions.remove_resistor(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_CAPACITOR) {
          index = engine_functions.get_capacitor(global.selected_id);

          if (index < capacitors.length) {
            engine_functions.remove_capacitor(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_INDUCTOR) {
          index = engine_functions.get_inductor(global.selected_id);

          if (index < inductors.length) {
            engine_functions.remove_inductor(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_GROUND) {
          index = engine_functions.get_ground(global.selected_id);

          if (index < grounds.length) {
            engine_functions.remove_ground(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_DCSOURCE) {
          index = engine_functions.get_dcsource(global.selected_id);

          if (index < dcsources.length) {
            engine_functions.remove_dcsource(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_DCCURRENT) {
          index = engine_functions.get_dccurrent(global.selected_id);

          if (index < dccurrents.length) {
            engine_functions.remove_dccurrent(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_ACSOURCE) {
          index = engine_functions.get_acsource(global.selected_id);

          if (index < acsources.length) {
            engine_functions.remove_acsource(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_ACCURRENT) {
          index = engine_functions.get_accurrent(global.selected_id);

          if (index < accurrents.length) {
            engine_functions.remove_accurrent(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_SQUAREWAVE) {
          index = engine_functions.get_squarewave(global.selected_id);

          if (index < squarewaves.length) {
            engine_functions.remove_squarewave(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_SAW) {
          index = engine_functions.get_sawwave(global.selected_id);

          if (index < sawwaves.length) {
            engine_functions.remove_sawwave(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_TRI) {
          index = engine_functions.get_trianglewave(global.selected_id);

          if (index < trianglewaves.length) {
            engine_functions.remove_trianglewave(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_CONSTANT) {
          index = engine_functions.get_constant(global.selected_id);

          if (index < constants.length) {
            engine_functions.remove_constant(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_WIRE) {
          index = engine_functions.get_wire(global.selected_id);

          if (index < wires.length) {
            engine_functions.remove_wire(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_NET) {
          index = engine_functions.get_net(global.selected_id);

          if (index < nets.length) {
            engine_functions.remove_net(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_NOTE) {
          index = engine_functions.get_note(global.selected_id);

          if (index < notes.length) {
            engine_functions.remove_note(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_RAIL) {
          index = engine_functions.get_rail(global.selected_id);

          if (index < rails.length) {
            engine_functions.remove_rail(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_VOLTMETER) {
          index = engine_functions.get_voltmeter(global.selected_id);

          if (index < voltmeters.length) {
            engine_functions.remove_voltmeter(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_OHMMETER) {
          index = engine_functions.get_ohmmeter(global.selected_id);

          if (index < ohmmeters.length) {
            engine_functions.remove_ohmmeter(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_AMMETER) {
          index = engine_functions.get_ammeter(global.selected_id);

          if (index < ammeters.length) {
            engine_functions.remove_ammeter(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_WATTMETER) {
          index = engine_functions.get_wattmeter(global.selected_id);

          if (index < wattmeters.length) {
            engine_functions.remove_wattmeter(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_FUSE) {
          index = engine_functions.get_fuse(global.selected_id);

          if (index < fuses.length) {
            engine_functions.remove_fuse(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_SPST) {
          index = engine_functions.get_spst(global.selected_id);

          if (index < spsts.length) {
            engine_functions.remove_spst(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_SPDT) {
          index = engine_functions.get_spdt(global.selected_id);

          if (index < spdts.length) {
            engine_functions.remove_spdt(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_NOT) {
          index = engine_functions.get_not(global.selected_id);

          if (index < nots.length) {
            engine_functions.remove_not(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_DIODE) {
          index = engine_functions.get_diode(global.selected_id);

          if (index < diodes.length) {
            engine_functions.remove_diode(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_LED) {
          index = engine_functions.get_led(global.selected_id);

          if (index < leds.length) {
            engine_functions.remove_led(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_ZENER) {
          index = engine_functions.get_zener(global.selected_id);

          if (index < zeners.length) {
            engine_functions.remove_zener(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_POTENTIOMETER) {
          index = engine_functions.get_potentiometer(global.selected_id);

          if (index < potentiometers.length) {
            engine_functions.remove_potentiometer(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_AND) {
          index = engine_functions.get_and(global.selected_id);

          if (index < ands.length) {
            engine_functions.remove_and(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_OR) {
          index = engine_functions.get_or(global.selected_id);

          if (index < ors.length) {
            engine_functions.remove_or(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_NAND) {
          index = engine_functions.get_nand(global.selected_id);

          if (index < nands.length) {
            engine_functions.remove_nand(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_NOR) {
          index = engine_functions.get_nor(global.selected_id);

          if (index < nors.length) {
            engine_functions.remove_nor(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_XOR) {
          index = engine_functions.get_xor(global.selected_id);

          if (index < xors.length) {
            engine_functions.remove_xor(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_XNOR) {
          index = engine_functions.get_xnor(global.selected_id);

          if (index < xnors.length) {
            engine_functions.remove_xnor(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_DFF) {
          index = engine_functions.get_dff(global.selected_id);

          if (index < dffs.length) {
            engine_functions.remove_dff(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_VSAT) {
          index = engine_functions.get_vsat(global.selected_id);

          if (index < vsats.length) {
            engine_functions.remove_vsat(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_ADD) {
          index = engine_functions.get_adder(global.selected_id);

          if (index < adders.length) {
            engine_functions.remove_adder(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_SUB) {
          index = engine_functions.get_subtractor(global.selected_id);

          if (index < subtractors.length) {
            engine_functions.remove_subtractor(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_MUL) {
          index = engine_functions.get_multiplier(global.selected_id);

          if (index < multipliers.length) {
            engine_functions.remove_multiplier(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_DIV) {
          index = engine_functions.get_divider(global.selected_id);

          if (index < dividers.length) {
            engine_functions.remove_divider(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_GAIN) {
          index = engine_functions.get_gain(global.selected_id);

          if (index < gains.length) {
            engine_functions.remove_gain(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_ABS) {
          index = engine_functions.get_absval(global.selected_id);

          if (index < absvals.length) {
            engine_functions.remove_absval(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_VCSW) {
          index = engine_functions.get_vcsw(global.selected_id);

          if (index < vcsws.length) {
            engine_functions.remove_vcsw(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_VCVS) {
          index = engine_functions.get_vcvs(global.selected_id);

          if (index < vcvss.length) {
            engine_functions.remove_vcvs(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_VCCS) {
          index = engine_functions.get_vccs(global.selected_id);

          if (index < vccss.length) {
            engine_functions.remove_vccs(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_CCCS) {
          index = engine_functions.get_cccs(global.selected_id);

          if (index < cccss.length) {
            engine_functions.remove_cccs(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_CCVS) {
          index = engine_functions.get_ccvs(global.selected_id);

          if (index < ccvss.length) {
            engine_functions.remove_ccvs(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_OPAMP) {
          index = engine_functions.get_opamp(global.selected_id);

          if (index < opamps.length) {
            engine_functions.remove_opamp(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_NMOS) {
          index = engine_functions.get_nmosfet(global.selected_id);

          if (index < nmosfets.length) {
            engine_functions.remove_nmosfet(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_PMOS) {
          index = engine_functions.get_pmosfet(global.selected_id);

          if (index < pmosfets.length) {
            engine_functions.remove_pmosfet(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_NPN) {
          index = engine_functions.get_npn(global.selected_id);

          if (index < npns.length) {
            engine_functions.remove_npn(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_PNP) {
          index = engine_functions.get_pnp(global.selected_id);

          if (index < pnps.length) {
            engine_functions.remove_pnp(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_ADC) {
          index = engine_functions.get_adc(global.selected_id);

          if (index < adcs.length) {
            engine_functions.remove_adc(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_DAC) {
          index = engine_functions.get_dac(global.selected_id);

          if (index < dacs.length) {
            engine_functions.remove_dac(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_SAH) {
          index = engine_functions.get_samplers(global.selected_id);

          if (index < sandhs.length) {
            engine_functions.remove_samplers(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_PWM) {
          index = engine_functions.get_pwm(global.selected_id);

          if (index < pwms.length) {
            engine_functions.remove_pwm(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_INTEGRATOR) {
          index = engine_functions.get_integrator(global.selected_id);

          if (index < integrators.length) {
            engine_functions.remove_integrator(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_DIFFERENTIATOR) {
          index = engine_functions.get_differentiator(global.selected_id);

          if (index < differentiators.length) {
            engine_functions.remove_differentiator(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_LPF) {
          index = engine_functions.get_lowpass(global.selected_id);

          if (index < lowpasses.length) {
            engine_functions.remove_lowpass(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_HPF) {
          index = engine_functions.get_highpass(global.selected_id);

          if (index < highpasses.length) {
            engine_functions.remove_highpass(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_REL) {
          index = engine_functions.get_relay(global.selected_id);

          if (index < relays.length) {
            engine_functions.remove_relay(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_PID) {
          index = engine_functions.get_pid(global.selected_id);

          if (index < pids.length) {
            engine_functions.remove_pid(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_LUT) {
          index = engine_functions.get_lut(global.selected_id);

          if (index < luts.length) {
            engine_functions.remove_lut(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_VCR) {
          index = engine_functions.get_vcr(global.selected_id);

          if (index < vcrs.length) {
            engine_functions.remove_vcr(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_GRT) {
          index = engine_functions.get_grt(global.selected_id);

          if (index < grts.length) {
            engine_functions.remove_grt(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_TPTZ) {
          index = engine_functions.get_tptz(global.selected_id);

          if (index < tptzs.length) {
            engine_functions.remove_tptz(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        } else if (global.selected_type === global.TYPE_TRAN) {
          index = engine_functions.get_transformer(global.selected_id);

          if (index < transformers.length) {
            engine_functions.remove_transformer(index);
            global.HISTORY_MANAGER['packet'].push(
              engine_functions.history_snapshot()
            );
          }
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
      } else {
        this.handle_remove_multi_select_elements();
      }
    }
  }
  handle_rotate_shortcut(key_event) {
    /* Extract the essentials. */
    this.shift = key_event['shift'];
    this.command = key_event['event'].code;
    this.caps = key_event['caps'];
    if (this.command === this.SHORTCUT_ROTATE) {
      global.SIGNAL_BUILD_ELEMENT = true;
      let index = -1;
      /* #INSERT_GENERATE_ELEMENT_ROTATE_SHORTCUT# */
      /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
      if (global.selected_type === global.TYPE_RESISTOR) {
        index = engine_functions.get_resistor(global.selected_id);

        if (index < resistors.length) {
          resistors[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_CAPACITOR) {
        index = engine_functions.get_capacitor(global.selected_id);

        if (index < capacitors.length) {
          capacitors[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_INDUCTOR) {
        index = engine_functions.get_inductor(global.selected_id);

        if (index < inductors.length) {
          inductors[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_GROUND) {
        index = engine_functions.get_ground(global.selected_id);

        if (index < grounds.length) {
          grounds[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_DCSOURCE) {
        index = engine_functions.get_dcsource(global.selected_id);

        if (index < dcsources.length) {
          dcsources[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_DCCURRENT) {
        index = engine_functions.get_dccurrent(global.selected_id);

        if (index < dccurrents.length) {
          dccurrents[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_ACSOURCE) {
        index = engine_functions.get_acsource(global.selected_id);

        if (index < acsources.length) {
          acsources[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_ACCURRENT) {
        index = engine_functions.get_accurrent(global.selected_id);

        if (index < accurrents.length) {
          accurrents[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_SQUAREWAVE) {
        index = engine_functions.get_squarewave(global.selected_id);

        if (index < squarewaves.length) {
          squarewaves[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_SAW) {
        index = engine_functions.get_sawwave(global.selected_id);

        if (index < sawwaves.length) {
          sawwaves[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_TRI) {
        index = engine_functions.get_trianglewave(global.selected_id);

        if (index < trianglewaves.length) {
          trianglewaves[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_CONSTANT) {
        index = engine_functions.get_constant(global.selected_id);

        if (index < constants.length) {
          constants[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_WIRE) {
        index = engine_functions.get_wire(global.selected_id);

        if (index < wires.length) {
          wires[index].increment_style();
        }
      } else if (global.selected_type === global.TYPE_NET) {
        index = engine_functions.get_net(global.selected_id);

        if (index < nets.length) {
          nets[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_NOTE) {
        index = engine_functions.get_note(global.selected_id);

        if (index < notes.length) {
          notes[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_RAIL) {
        index = engine_functions.get_rail(global.selected_id);

        if (index < rails.length) {
          rails[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_VOLTMETER) {
        index = engine_functions.get_voltmeter(global.selected_id);

        if (index < voltmeters.length) {
          voltmeters[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_OHMMETER) {
        index = engine_functions.get_ohmmeter(global.selected_id);

        if (index < ohmmeters.length) {
          ohmmeters[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_AMMETER) {
        index = engine_functions.get_ammeter(global.selected_id);

        if (index < ammeters.length) {
          ammeters[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_WATTMETER) {
        index = engine_functions.get_wattmeter(global.selected_id);

        if (index < wattmeters.length) {
          wattmeters[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_FUSE) {
        index = engine_functions.get_fuse(global.selected_id);

        if (index < fuses.length) {
          fuses[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_SPST) {
        index = engine_functions.get_spst(global.selected_id);

        if (index < spsts.length) {
          spsts[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_SPDT) {
        index = engine_functions.get_spdt(global.selected_id);

        if (index < spdts.length) {
          spdts[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_NOT) {
        index = engine_functions.get_not(global.selected_id);

        if (index < nots.length) {
          nots[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_DIODE) {
        index = engine_functions.get_diode(global.selected_id);

        if (index < diodes.length) {
          diodes[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_LED) {
        index = engine_functions.get_led(global.selected_id);

        if (index < leds.length) {
          leds[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_ZENER) {
        index = engine_functions.get_zener(global.selected_id);

        if (index < zeners.length) {
          zeners[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_POTENTIOMETER) {
        index = engine_functions.get_potentiometer(global.selected_id);

        if (index < potentiometers.length) {
          potentiometers[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_AND) {
        index = engine_functions.get_and(global.selected_id);

        if (index < ands.length) {
          ands[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_OR) {
        index = engine_functions.get_or(global.selected_id);

        if (index < ors.length) {
          ors[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_NAND) {
        index = engine_functions.get_nand(global.selected_id);

        if (index < nands.length) {
          nands[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_NOR) {
        index = engine_functions.get_nor(global.selected_id);

        if (index < nors.length) {
          nors[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_XOR) {
        index = engine_functions.get_xor(global.selected_id);

        if (index < xors.length) {
          xors[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_XNOR) {
        index = engine_functions.get_xnor(global.selected_id);

        if (index < xnors.length) {
          xnors[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_DFF) {
        index = engine_functions.get_dff(global.selected_id);

        if (index < dffs.length) {
          dffs[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_VSAT) {
        index = engine_functions.get_vsat(global.selected_id);

        if (index < vsats.length) {
          vsats[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_ADD) {
        index = engine_functions.get_adder(global.selected_id);

        if (index < adders.length) {
          adders[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_SUB) {
        index = engine_functions.get_subtractor(global.selected_id);

        if (index < subtractors.length) {
          subtractors[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_MUL) {
        index = engine_functions.get_multiplier(global.selected_id);

        if (index < multipliers.length) {
          multipliers[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_DIV) {
        index = engine_functions.get_divider(global.selected_id);

        if (index < dividers.length) {
          dividers[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_GAIN) {
        index = engine_functions.get_gain(global.selected_id);

        if (index < gains.length) {
          gains[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_ABS) {
        index = engine_functions.get_absval(global.selected_id);

        if (index < absvals.length) {
          absvals[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_VCSW) {
        index = engine_functions.get_vcsw(global.selected_id);

        if (index < vcsws.length) {
          vcsws[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_VCVS) {
        index = engine_functions.get_vcvs(global.selected_id);

        if (index < vcvss.length) {
          vcvss[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_VCCS) {
        index = engine_functions.get_vccs(global.selected_id);

        if (index < vccss.length) {
          vccss[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_CCCS) {
        index = engine_functions.get_cccs(global.selected_id);

        if (index < cccss.length) {
          cccss[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_CCVS) {
        index = engine_functions.get_ccvs(global.selected_id);

        if (index < ccvss.length) {
          ccvss[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_OPAMP) {
        index = engine_functions.get_opamp(global.selected_id);

        if (index < opamps.length) {
          opamps[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_NMOS) {
        index = engine_functions.get_nmosfet(global.selected_id);

        if (index < nmosfets.length) {
          nmosfets[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_PMOS) {
        index = engine_functions.get_pmosfet(global.selected_id);

        if (index < pmosfets.length) {
          pmosfets[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_NPN) {
        index = engine_functions.get_npn(global.selected_id);

        if (index < npns.length) {
          npns[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_PNP) {
        index = engine_functions.get_pnp(global.selected_id);

        if (index < pnps.length) {
          pnps[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_ADC) {
        index = engine_functions.get_adc(global.selected_id);

        if (index < adcs.length) {
          adcs[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_DAC) {
        index = engine_functions.get_dac(global.selected_id);

        if (index < dacs.length) {
          dacs[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_SAH) {
        index = engine_functions.get_samplers(global.selected_id);

        if (index < sandhs.length) {
          sandhs[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_PWM) {
        index = engine_functions.get_pwm(global.selected_id);

        if (index < pwms.length) {
          pwms[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_INTEGRATOR) {
        index = engine_functions.get_integrator(global.selected_id);

        if (index < integrators.length) {
          integrators[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_DIFFERENTIATOR) {
        index = engine_functions.get_differentiator(global.selected_id);

        if (index < differentiators.length) {
          differentiators[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_LPF) {
        index = engine_functions.get_lowpass(global.selected_id);

        if (index < lowpasses.length) {
          lowpasses[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_HPF) {
        index = engine_functions.get_highpass(global.selected_id);

        if (index < highpasses.length) {
          highpasses[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_REL) {
        index = engine_functions.get_relay(global.selected_id);

        if (index < relays.length) {
          relays[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_PID) {
        index = engine_functions.get_pid(global.selected_id);

        if (index < pids.length) {
          pids[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_LUT) {
        index = engine_functions.get_lut(global.selected_id);

        if (index < luts.length) {
          luts[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_VCR) {
        index = engine_functions.get_vcr(global.selected_id);

        if (index < vcrs.length) {
          vcrs[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_GRT) {
        index = engine_functions.get_grt(global.selected_id);

        if (index < grts.length) {
          grts[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_TPTZ) {
        index = engine_functions.get_tptz(global.selected_id);

        if (index < tptzs.length) {
          tptzs[index].increment_rotation();
        }
      } else if (global.selected_type === global.TYPE_TRAN) {
        index = engine_functions.get_transformer(global.selected_id);

        if (index < transformers.length) {
          transformers[index].increment_rotation();
        }
      }
      /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
  }
  handle_reset_window_shortcut(key_event) {
    this.shift = key_event['shift'];
    this.command = key_event['event'].code;
    this.caps = key_event['caps'];
    if (this.command === this.SHORTCUT_RESET_WINDOW) {
      menu_bar.handle_element_options_flag(false);
      menu_bar.handle_element_options_edit_flag(false);
      menu_bar.handle_menu_open_flag(false);
      menu_bar.handle_menu_open_down_flag(false);
      menu_bar.handle_save_image_flag(false);
      menu_bar.handle_save_circuit_flag(false);
      menu_bar.handle_select_settings_flag(false);
      if (global.FLAG_SIMULATING === true) {
        menu_bar.handle_simulation_flag(false);
      }
      if (global.FLAG_GRAPH === true) {
        menu_bar.handle_graph_flag(false);
      }
      if (global.FLAG_REMOVE_ALL === true) {
        menu_bar.handle_remove_all_flag(false);
      }
      if (global.FLAG_ZOOM === true) {
        menu_bar.handle_zoom_flag(false);
      }
      bottom_menu.handle_timestep_flag(false);
    }
  }
  handle_query_shortcut(key_event) {
    this.shift = key_event['shift'];
    this.command = key_event['event'].code;
    this.caps = key_event['caps'];
    if (this.command === this.SHORTCUT_QUERY) {
      /* Get the text field */
      var text_input = document.getElementById('text_input');
      let MeterTemplate = {
        Tag: -1,
        Value: -1
      };
      let solution_vector = [];
      let met_max = global.meter_max();
      for (var i = 0; i < met_max; i++) {
        if (i < voltmeters.length) {
          MeterTemplate['Tag'] =
            voltmeters[i].elm.properties['tag'] + voltmeters[i].elm.id;
          MeterTemplate['Value'] = voltmeters[i].elm.properties['Voltage'];
          solution_vector.push(global.copy(MeterTemplate));
        }
        if (i < ohmmeters.length) {
          MeterTemplate['Tag'] =
            ohmmeters[i].elm.properties['tag'] + ohmmeters[i].elm.id;
          MeterTemplate['Value'] =
            ohmmeters[i].elm.properties['Sensed Resistance'];
          solution_vector.push(global.copy(MeterTemplate));
        }
        if (i < ammeters.length) {
          MeterTemplate['Tag'] =
            ammeters[i].elm.properties['tag'] + ammeters[i].elm.id;
          MeterTemplate['Value'] = ammeters[i].elm.properties['Current'];
          solution_vector.push(global.copy(MeterTemplate));
        }
        if (i < wattmeters.length) {
          MeterTemplate['Tag'] =
            wattmeters[i].elm.properties['tag'] + wattmeters[i].elm.id;
          MeterTemplate['Value'] = wattmeters[i].elm.properties['Wattage'];
          solution_vector.push(global.copy(MeterTemplate));
        }
      }
      text_input.value = JSON.stringify(solution_vector);
      /* Select the text field */
      text_input.select();
      /*For mobile devices*/
      text_input.setSelectionRange(0, 99999);
      /* Copy the text inside the text field */
      document.execCommand('copy');
    }
  }
  handle_undo_shortcut(key_event) {
    /* Extract the essentials. */
    this.shift = key_event['shift'];
    this.command = key_event['event'].code;
    this.caps = key_event['caps'];
    if (this.command === this.SHORTCUT_UNDO) {
      history_manager.undo();
    }
  }
  handle_redo_shortcut(key_event) {
    /* Extract the essentials. */
    this.shift = key_event['shift'];
    this.command = key_event['event'].code;
    this.caps = key_event['caps'];
    if (this.command === this.SHORTCUT_REDO) {
      history_manager.redo();
    }
  }
  handle_save_image_flag(key_event) {
    /* Extract the essentials. */
    this.shift = key_event['shift'];
    this.command = key_event['event'].code;
    this.caps = key_event['caps'];
    if (this.command === this.SHORTCUT_SAVE_IMAGE) {
      menu_bar.handle_save_image_flag(!global.FLAG_SAVE_IMAGE);
    }
  }
  handle_save_circuit_flag(key_event) {
    /* Extract the essentials. */
    this.shift = key_event['shift'];
    this.command = key_event['event'].code;
    this.caps = key_event['caps'];
    if (this.command === this.SHORTCUT_SAVE_CIRCUIT) {
      menu_bar.handle_save_circuit_flag(!global.FLAG_SAVE_CIRCUIT);
    }
  }
  handle_flip_shortcut(key_event) {
    /* Extract the essentials. */
    this.shift = key_event['shift'];
    this.command = key_event['event'].code;
    this.caps = key_event['caps'];
    if (this.command === this.SHORTCUT_FLIP) {
      global.SIGNAL_BUILD_ELEMENT = true;
      let index = -1;
      /* #INSERT_GENERATE_ELEMENT_FLIP_SHORTCUT# */
      /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
      if (global.selected_type === global.TYPE_RESISTOR) {
        index = engine_functions.get_resistor(global.selected_id);

        if (index < resistors.length) {
          resistors[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_CAPACITOR) {
        index = engine_functions.get_capacitor(global.selected_id);

        if (index < capacitors.length) {
          capacitors[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_INDUCTOR) {
        index = engine_functions.get_inductor(global.selected_id);

        if (index < inductors.length) {
          inductors[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_GROUND) {
        index = engine_functions.get_ground(global.selected_id);

        if (index < grounds.length) {
          grounds[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_DCSOURCE) {
        index = engine_functions.get_dcsource(global.selected_id);

        if (index < dcsources.length) {
          dcsources[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_DCCURRENT) {
        index = engine_functions.get_dccurrent(global.selected_id);

        if (index < dccurrents.length) {
          dccurrents[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_ACSOURCE) {
        index = engine_functions.get_acsource(global.selected_id);

        if (index < acsources.length) {
          acsources[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_ACCURRENT) {
        index = engine_functions.get_accurrent(global.selected_id);

        if (index < accurrents.length) {
          accurrents[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_SQUAREWAVE) {
        index = engine_functions.get_squarewave(global.selected_id);

        if (index < squarewaves.length) {
          squarewaves[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_SAW) {
        index = engine_functions.get_sawwave(global.selected_id);

        if (index < sawwaves.length) {
          sawwaves[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_TRI) {
        index = engine_functions.get_trianglewave(global.selected_id);

        if (index < trianglewaves.length) {
          trianglewaves[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_CONSTANT) {
        index = engine_functions.get_constant(global.selected_id);

        if (index < constants.length) {
          constants[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_WIRE) {
        index = engine_functions.get_wire(global.selected_id);

        if (index < wires.length) {
          wires[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_NET) {
        index = engine_functions.get_net(global.selected_id);

        if (index < nets.length) {
          nets[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_NOTE) {
        index = engine_functions.get_note(global.selected_id);

        if (index < notes.length) {
          notes[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_RAIL) {
        index = engine_functions.get_rail(global.selected_id);

        if (index < rails.length) {
          rails[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_VOLTMETER) {
        index = engine_functions.get_voltmeter(global.selected_id);

        if (index < voltmeters.length) {
          voltmeters[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_OHMMETER) {
        index = engine_functions.get_ohmmeter(global.selected_id);

        if (index < ohmmeters.length) {
          ohmmeters[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_AMMETER) {
        index = engine_functions.get_ammeter(global.selected_id);

        if (index < ammeters.length) {
          ammeters[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_WATTMETER) {
        index = engine_functions.get_wattmeter(global.selected_id);

        if (index < wattmeters.length) {
          wattmeters[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_FUSE) {
        index = engine_functions.get_fuse(global.selected_id);

        if (index < fuses.length) {
          fuses[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_SPST) {
        index = engine_functions.get_spst(global.selected_id);

        if (index < spsts.length) {
          spsts[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_SPDT) {
        index = engine_functions.get_spdt(global.selected_id);

        if (index < spdts.length) {
          spdts[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_NOT) {
        index = engine_functions.get_not(global.selected_id);

        if (index < nots.length) {
          nots[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_DIODE) {
        index = engine_functions.get_diode(global.selected_id);

        if (index < diodes.length) {
          diodes[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_LED) {
        index = engine_functions.get_led(global.selected_id);

        if (index < leds.length) {
          leds[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_ZENER) {
        index = engine_functions.get_zener(global.selected_id);

        if (index < zeners.length) {
          zeners[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_POTENTIOMETER) {
        index = engine_functions.get_potentiometer(global.selected_id);

        if (index < potentiometers.length) {
          potentiometers[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_AND) {
        index = engine_functions.get_and(global.selected_id);

        if (index < ands.length) {
          ands[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_OR) {
        index = engine_functions.get_or(global.selected_id);

        if (index < ors.length) {
          ors[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_NAND) {
        index = engine_functions.get_nand(global.selected_id);

        if (index < nands.length) {
          nands[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_NOR) {
        index = engine_functions.get_nor(global.selected_id);

        if (index < nors.length) {
          nors[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_XOR) {
        index = engine_functions.get_xor(global.selected_id);

        if (index < xors.length) {
          xors[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_XNOR) {
        index = engine_functions.get_xnor(global.selected_id);

        if (index < xnors.length) {
          xnors[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_DFF) {
        index = engine_functions.get_dff(global.selected_id);

        if (index < dffs.length) {
          dffs[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_VSAT) {
        index = engine_functions.get_vsat(global.selected_id);

        if (index < vsats.length) {
          vsats[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_ADD) {
        index = engine_functions.get_adder(global.selected_id);

        if (index < adders.length) {
          adders[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_SUB) {
        index = engine_functions.get_subtractor(global.selected_id);

        if (index < subtractors.length) {
          subtractors[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_MUL) {
        index = engine_functions.get_multiplier(global.selected_id);

        if (index < multipliers.length) {
          multipliers[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_DIV) {
        index = engine_functions.get_divider(global.selected_id);

        if (index < dividers.length) {
          dividers[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_GAIN) {
        index = engine_functions.get_gain(global.selected_id);

        if (index < gains.length) {
          gains[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_ABS) {
        index = engine_functions.get_absval(global.selected_id);

        if (index < absvals.length) {
          absvals[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_VCSW) {
        index = engine_functions.get_vcsw(global.selected_id);

        if (index < vcsws.length) {
          vcsws[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_VCVS) {
        index = engine_functions.get_vcvs(global.selected_id);

        if (index < vcvss.length) {
          vcvss[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_VCCS) {
        index = engine_functions.get_vccs(global.selected_id);

        if (index < vccss.length) {
          vccss[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_CCCS) {
        index = engine_functions.get_cccs(global.selected_id);

        if (index < cccss.length) {
          cccss[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_CCVS) {
        index = engine_functions.get_ccvs(global.selected_id);

        if (index < ccvss.length) {
          ccvss[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_OPAMP) {
        index = engine_functions.get_opamp(global.selected_id);

        if (index < opamps.length) {
          opamps[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_NMOS) {
        index = engine_functions.get_nmosfet(global.selected_id);

        if (index < nmosfets.length) {
          nmosfets[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_PMOS) {
        index = engine_functions.get_pmosfet(global.selected_id);

        if (index < pmosfets.length) {
          pmosfets[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_NPN) {
        index = engine_functions.get_npn(global.selected_id);

        if (index < npns.length) {
          npns[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_PNP) {
        index = engine_functions.get_pnp(global.selected_id);

        if (index < pnps.length) {
          pnps[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_ADC) {
        index = engine_functions.get_adc(global.selected_id);

        if (index < adcs.length) {
          adcs[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_DAC) {
        index = engine_functions.get_dac(global.selected_id);

        if (index < dacs.length) {
          dacs[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_SAH) {
        index = engine_functions.get_samplers(global.selected_id);

        if (index < sandhs.length) {
          sandhs[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_PWM) {
        index = engine_functions.get_pwm(global.selected_id);

        if (index < pwms.length) {
          pwms[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_INTEGRATOR) {
        index = engine_functions.get_integrator(global.selected_id);

        if (index < integrators.length) {
          integrators[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_DIFFERENTIATOR) {
        index = engine_functions.get_differentiator(global.selected_id);

        if (index < differentiators.length) {
          differentiators[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_LPF) {
        index = engine_functions.get_lowpass(global.selected_id);

        if (index < lowpasses.length) {
          lowpasses[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_HPF) {
        index = engine_functions.get_highpass(global.selected_id);

        if (index < highpasses.length) {
          highpasses[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_REL) {
        index = engine_functions.get_relay(global.selected_id);

        if (index < relays.length) {
          relays[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_PID) {
        index = engine_functions.get_pid(global.selected_id);

        if (index < pids.length) {
          pids[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_LUT) {
        index = engine_functions.get_lut(global.selected_id);

        if (index < luts.length) {
          luts[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_VCR) {
        index = engine_functions.get_vcr(global.selected_id);

        if (index < vcrs.length) {
          vcrs[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_GRT) {
        index = engine_functions.get_grt(global.selected_id);

        if (index < grts.length) {
          grts[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_TPTZ) {
        index = engine_functions.get_tptz(global.selected_id);

        if (index < tptzs.length) {
          tptzs[index].increment_flip();
        }
      } else if (global.selected_type === global.TYPE_TRAN) {
        index = engine_functions.get_transformer(global.selected_id);

        if (index < transformers.length) {
          transformers[index].increment_flip();
        }
      }
      /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
  }
  handle_edit_shortcut(key_event) {
    /* Extract the essentials. */
    this.shift = key_event['shift'];
    this.command = key_event['event'].code;
    this.caps = key_event['caps'];
    if (this.command === this.SHORTCUT_EDIT) {
      let index = -1;
      if (global.not_null(global.selected_properties)) {
        if (global.not_null(global.selected_properties['options'])) {
          if (
            element_options.opts['c1'] === element_options.EDIT_ICON ||
            element_options.opts['c2'] === element_options.EDIT_ICON ||
            element_options.opts['c3'] === element_options.EDIT_ICON ||
            element_options.opts['c4'] === element_options.EDIT_ICON
          ) {
            menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
          }
          if (
            element_options.opts['c1'] === element_options.EYE_ICON ||
            element_options.opts['c2'] === element_options.EYE_ICON ||
            element_options.opts['c3'] === element_options.EYE_ICON ||
            element_options.opts['c4'] === element_options.EYE_ICON
          ) {
            element_options.handle_eye_option();
          }
        }
      }
    }
  }
  handle_remove_all_shortcut(key_event) {
    /* Extract the essentials. */
    this.shift = key_event['shift'];
    this.command = key_event['event'].code;
    this.caps = key_event['caps'];
    if (this.command === this.SHORTCUT_REMOVE_ALL) {
      if (!global.FLAG_REMOVE_ALL) {
        menu_bar.handle_remove_all_flag(!global.FLAG_REMOVE_ALL);
      }
    }
  }
  handle_simulate_shortcut(key_event) {
    /* Extract the essentials. */
    this.shift = key_event['shift'];
    this.command = key_event['event'].code;
    this.caps = key_event['caps'];
    if (
      this.command === this.SHORTCUT_SIMULATE &&
      key_event['ctrl'] === false
    ) {
      menu_bar.handle_simulation_flag(!global.FLAG_SIMULATING);
    }
  }
  handle_copy_shortcut(key_event) {
    /* Extract the essentials. */
    this.shift = key_event['shift'];
    this.command = key_event['event'].code;
    this.caps = key_event['caps'];
    if (this.command === this.SHORTCUT_COPY) {
      if (!global.multi_selected) {
        if (
          global.not_null(global.selected_type) &&
          global.not_null(global.selected_properties) &&
          global.not_null(global.selected_id)
        ) {
          if (global.selected_type != global.TYPE_WIRE) {
            global.CLIPBOARD_TYPE = global.selected_type;
            global.CLIPBOARD_ROTATION = -1;
            global.CLIPBOARD_FLIP = -1;
            let index = -1;
            /* #INSERT_GENERATE_COPY_ELEMENT# */
            /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
            if (global.CLIPBOARD_TYPE === global.TYPE_RESISTOR) {
              index = engine_functions.get_resistor(global.selected_id);
              if (index < resistors.length) {
                global.CLIPBOARD_ROTATION = resistors[index].elm.rotation;
                global.CLIPBOARD_FLIP = resistors[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_CAPACITOR) {
              index = engine_functions.get_capacitor(global.selected_id);
              if (index < capacitors.length) {
                global.CLIPBOARD_ROTATION = capacitors[index].elm.rotation;
                global.CLIPBOARD_FLIP = capacitors[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_INDUCTOR) {
              index = engine_functions.get_inductor(global.selected_id);
              if (index < inductors.length) {
                global.CLIPBOARD_ROTATION = inductors[index].elm.rotation;
                global.CLIPBOARD_FLIP = inductors[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_GROUND) {
              index = engine_functions.get_ground(global.selected_id);
              if (index < grounds.length) {
                global.CLIPBOARD_ROTATION = grounds[index].elm.rotation;
                global.CLIPBOARD_FLIP = grounds[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_DCSOURCE) {
              index = engine_functions.get_dcsource(global.selected_id);
              if (index < dcsources.length) {
                global.CLIPBOARD_ROTATION = dcsources[index].elm.rotation;
                global.CLIPBOARD_FLIP = dcsources[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_DCCURRENT) {
              index = engine_functions.get_dccurrent(global.selected_id);
              if (index < dccurrents.length) {
                global.CLIPBOARD_ROTATION = dccurrents[index].elm.rotation;
                global.CLIPBOARD_FLIP = dccurrents[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_ACSOURCE) {
              index = engine_functions.get_acsource(global.selected_id);
              if (index < acsources.length) {
                global.CLIPBOARD_ROTATION = acsources[index].elm.rotation;
                global.CLIPBOARD_FLIP = acsources[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_ACCURRENT) {
              index = engine_functions.get_accurrent(global.selected_id);
              if (index < accurrents.length) {
                global.CLIPBOARD_ROTATION = accurrents[index].elm.rotation;
                global.CLIPBOARD_FLIP = accurrents[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_SQUAREWAVE) {
              index = engine_functions.get_squarewave(global.selected_id);
              if (index < squarewaves.length) {
                global.CLIPBOARD_ROTATION = squarewaves[index].elm.rotation;
                global.CLIPBOARD_FLIP = squarewaves[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_SAW) {
              index = engine_functions.get_sawwave(global.selected_id);
              if (index < sawwaves.length) {
                global.CLIPBOARD_ROTATION = sawwaves[index].elm.rotation;
                global.CLIPBOARD_FLIP = sawwaves[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_TRI) {
              index = engine_functions.get_trianglewave(global.selected_id);
              if (index < trianglewaves.length) {
                global.CLIPBOARD_ROTATION = trianglewaves[index].elm.rotation;
                global.CLIPBOARD_FLIP = trianglewaves[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_CONSTANT) {
              index = engine_functions.get_constant(global.selected_id);
              if (index < constants.length) {
                global.CLIPBOARD_ROTATION = constants[index].elm.rotation;
                global.CLIPBOARD_FLIP = constants[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_NET) {
              index = engine_functions.get_net(global.selected_id);
              if (index < nets.length) {
                global.CLIPBOARD_ROTATION = nets[index].elm.rotation;
                global.CLIPBOARD_FLIP = nets[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_NOTE) {
              index = engine_functions.get_note(global.selected_id);
              if (index < notes.length) {
                global.CLIPBOARD_ROTATION = notes[index].elm.rotation;
                global.CLIPBOARD_FLIP = notes[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_RAIL) {
              index = engine_functions.get_rail(global.selected_id);
              if (index < rails.length) {
                global.CLIPBOARD_ROTATION = rails[index].elm.rotation;
                global.CLIPBOARD_FLIP = rails[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_VOLTMETER) {
              index = engine_functions.get_voltmeter(global.selected_id);
              if (index < voltmeters.length) {
                global.CLIPBOARD_ROTATION = voltmeters[index].elm.rotation;
                global.CLIPBOARD_FLIP = voltmeters[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_OHMMETER) {
              index = engine_functions.get_ohmmeter(global.selected_id);
              if (index < ohmmeters.length) {
                global.CLIPBOARD_ROTATION = ohmmeters[index].elm.rotation;
                global.CLIPBOARD_FLIP = ohmmeters[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_AMMETER) {
              index = engine_functions.get_ammeter(global.selected_id);
              if (index < ammeters.length) {
                global.CLIPBOARD_ROTATION = ammeters[index].elm.rotation;
                global.CLIPBOARD_FLIP = ammeters[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_WATTMETER) {
              index = engine_functions.get_wattmeter(global.selected_id);
              if (index < wattmeters.length) {
                global.CLIPBOARD_ROTATION = wattmeters[index].elm.rotation;
                global.CLIPBOARD_FLIP = wattmeters[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_FUSE) {
              index = engine_functions.get_fuse(global.selected_id);
              if (index < fuses.length) {
                global.CLIPBOARD_ROTATION = fuses[index].elm.rotation;
                global.CLIPBOARD_FLIP = fuses[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_SPST) {
              index = engine_functions.get_spst(global.selected_id);
              if (index < spsts.length) {
                global.CLIPBOARD_ROTATION = spsts[index].elm.rotation;
                global.CLIPBOARD_FLIP = spsts[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_SPDT) {
              index = engine_functions.get_spdt(global.selected_id);
              if (index < spdts.length) {
                global.CLIPBOARD_ROTATION = spdts[index].elm.rotation;
                global.CLIPBOARD_FLIP = spdts[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_NOT) {
              index = engine_functions.get_not(global.selected_id);
              if (index < nots.length) {
                global.CLIPBOARD_ROTATION = nots[index].elm.rotation;
                global.CLIPBOARD_FLIP = nots[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_DIODE) {
              index = engine_functions.get_diode(global.selected_id);
              if (index < diodes.length) {
                global.CLIPBOARD_ROTATION = diodes[index].elm.rotation;
                global.CLIPBOARD_FLIP = diodes[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_LED) {
              index = engine_functions.get_led(global.selected_id);
              if (index < leds.length) {
                global.CLIPBOARD_ROTATION = leds[index].elm.rotation;
                global.CLIPBOARD_FLIP = leds[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_ZENER) {
              index = engine_functions.get_zener(global.selected_id);
              if (index < zeners.length) {
                global.CLIPBOARD_ROTATION = zeners[index].elm.rotation;
                global.CLIPBOARD_FLIP = zeners[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_POTENTIOMETER) {
              index = engine_functions.get_potentiometer(global.selected_id);
              if (index < potentiometers.length) {
                global.CLIPBOARD_ROTATION = potentiometers[index].elm.rotation;
                global.CLIPBOARD_FLIP = potentiometers[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_AND) {
              index = engine_functions.get_and(global.selected_id);
              if (index < ands.length) {
                global.CLIPBOARD_ROTATION = ands[index].elm.rotation;
                global.CLIPBOARD_FLIP = ands[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_OR) {
              index = engine_functions.get_or(global.selected_id);
              if (index < ors.length) {
                global.CLIPBOARD_ROTATION = ors[index].elm.rotation;
                global.CLIPBOARD_FLIP = ors[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_NAND) {
              index = engine_functions.get_nand(global.selected_id);
              if (index < nands.length) {
                global.CLIPBOARD_ROTATION = nands[index].elm.rotation;
                global.CLIPBOARD_FLIP = nands[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_NOR) {
              index = engine_functions.get_nor(global.selected_id);
              if (index < nors.length) {
                global.CLIPBOARD_ROTATION = nors[index].elm.rotation;
                global.CLIPBOARD_FLIP = nors[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_XOR) {
              index = engine_functions.get_xor(global.selected_id);
              if (index < xors.length) {
                global.CLIPBOARD_ROTATION = xors[index].elm.rotation;
                global.CLIPBOARD_FLIP = xors[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_XNOR) {
              index = engine_functions.get_xnor(global.selected_id);
              if (index < xnors.length) {
                global.CLIPBOARD_ROTATION = xnors[index].elm.rotation;
                global.CLIPBOARD_FLIP = xnors[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_DFF) {
              index = engine_functions.get_dff(global.selected_id);
              if (index < dffs.length) {
                global.CLIPBOARD_ROTATION = dffs[index].elm.rotation;
                global.CLIPBOARD_FLIP = dffs[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_VSAT) {
              index = engine_functions.get_vsat(global.selected_id);
              if (index < vsats.length) {
                global.CLIPBOARD_ROTATION = vsats[index].elm.rotation;
                global.CLIPBOARD_FLIP = vsats[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_ADD) {
              index = engine_functions.get_adder(global.selected_id);
              if (index < adders.length) {
                global.CLIPBOARD_ROTATION = adders[index].elm.rotation;
                global.CLIPBOARD_FLIP = adders[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_SUB) {
              index = engine_functions.get_subtractor(global.selected_id);
              if (index < subtractors.length) {
                global.CLIPBOARD_ROTATION = subtractors[index].elm.rotation;
                global.CLIPBOARD_FLIP = subtractors[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_MUL) {
              index = engine_functions.get_multiplier(global.selected_id);
              if (index < multipliers.length) {
                global.CLIPBOARD_ROTATION = multipliers[index].elm.rotation;
                global.CLIPBOARD_FLIP = multipliers[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_DIV) {
              index = engine_functions.get_divider(global.selected_id);
              if (index < dividers.length) {
                global.CLIPBOARD_ROTATION = dividers[index].elm.rotation;
                global.CLIPBOARD_FLIP = dividers[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_GAIN) {
              index = engine_functions.get_gain(global.selected_id);
              if (index < gains.length) {
                global.CLIPBOARD_ROTATION = gains[index].elm.rotation;
                global.CLIPBOARD_FLIP = gains[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_ABS) {
              index = engine_functions.get_absval(global.selected_id);
              if (index < absvals.length) {
                global.CLIPBOARD_ROTATION = absvals[index].elm.rotation;
                global.CLIPBOARD_FLIP = absvals[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_VCSW) {
              index = engine_functions.get_vcsw(global.selected_id);
              if (index < vcsws.length) {
                global.CLIPBOARD_ROTATION = vcsws[index].elm.rotation;
                global.CLIPBOARD_FLIP = vcsws[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_VCVS) {
              index = engine_functions.get_vcvs(global.selected_id);
              if (index < vcvss.length) {
                global.CLIPBOARD_ROTATION = vcvss[index].elm.rotation;
                global.CLIPBOARD_FLIP = vcvss[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_VCCS) {
              index = engine_functions.get_vccs(global.selected_id);
              if (index < vccss.length) {
                global.CLIPBOARD_ROTATION = vccss[index].elm.rotation;
                global.CLIPBOARD_FLIP = vccss[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_CCCS) {
              index = engine_functions.get_cccs(global.selected_id);
              if (index < cccss.length) {
                global.CLIPBOARD_ROTATION = cccss[index].elm.rotation;
                global.CLIPBOARD_FLIP = cccss[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_CCVS) {
              index = engine_functions.get_ccvs(global.selected_id);
              if (index < ccvss.length) {
                global.CLIPBOARD_ROTATION = ccvss[index].elm.rotation;
                global.CLIPBOARD_FLIP = ccvss[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_OPAMP) {
              index = engine_functions.get_opamp(global.selected_id);
              if (index < opamps.length) {
                global.CLIPBOARD_ROTATION = opamps[index].elm.rotation;
                global.CLIPBOARD_FLIP = opamps[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_NMOS) {
              index = engine_functions.get_nmosfet(global.selected_id);
              if (index < nmosfets.length) {
                global.CLIPBOARD_ROTATION = nmosfets[index].elm.rotation;
                global.CLIPBOARD_FLIP = nmosfets[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_PMOS) {
              index = engine_functions.get_pmosfet(global.selected_id);
              if (index < pmosfets.length) {
                global.CLIPBOARD_ROTATION = pmosfets[index].elm.rotation;
                global.CLIPBOARD_FLIP = pmosfets[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_NPN) {
              index = engine_functions.get_npn(global.selected_id);
              if (index < npns.length) {
                global.CLIPBOARD_ROTATION = npns[index].elm.rotation;
                global.CLIPBOARD_FLIP = npns[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_PNP) {
              index = engine_functions.get_pnp(global.selected_id);
              if (index < pnps.length) {
                global.CLIPBOARD_ROTATION = pnps[index].elm.rotation;
                global.CLIPBOARD_FLIP = pnps[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_ADC) {
              index = engine_functions.get_adc(global.selected_id);
              if (index < adcs.length) {
                global.CLIPBOARD_ROTATION = adcs[index].elm.rotation;
                global.CLIPBOARD_FLIP = adcs[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_DAC) {
              index = engine_functions.get_dac(global.selected_id);
              if (index < dacs.length) {
                global.CLIPBOARD_ROTATION = dacs[index].elm.rotation;
                global.CLIPBOARD_FLIP = dacs[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_SAH) {
              index = engine_functions.get_samplers(global.selected_id);
              if (index < sandhs.length) {
                global.CLIPBOARD_ROTATION = sandhs[index].elm.rotation;
                global.CLIPBOARD_FLIP = sandhs[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_PWM) {
              index = engine_functions.get_pwm(global.selected_id);
              if (index < pwms.length) {
                global.CLIPBOARD_ROTATION = pwms[index].elm.rotation;
                global.CLIPBOARD_FLIP = pwms[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_INTEGRATOR) {
              index = engine_functions.get_integrator(global.selected_id);
              if (index < integrators.length) {
                global.CLIPBOARD_ROTATION = integrators[index].elm.rotation;
                global.CLIPBOARD_FLIP = integrators[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_DIFFERENTIATOR) {
              index = engine_functions.get_differentiator(global.selected_id);
              if (index < differentiators.length) {
                global.CLIPBOARD_ROTATION = differentiators[index].elm.rotation;
                global.CLIPBOARD_FLIP = differentiators[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_LPF) {
              index = engine_functions.get_lowpass(global.selected_id);
              if (index < lowpasses.length) {
                global.CLIPBOARD_ROTATION = lowpasses[index].elm.rotation;
                global.CLIPBOARD_FLIP = lowpasses[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_HPF) {
              index = engine_functions.get_highpass(global.selected_id);
              if (index < highpasses.length) {
                global.CLIPBOARD_ROTATION = highpasses[index].elm.rotation;
                global.CLIPBOARD_FLIP = highpasses[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_REL) {
              index = engine_functions.get_relay(global.selected_id);
              if (index < relays.length) {
                global.CLIPBOARD_ROTATION = relays[index].elm.rotation;
                global.CLIPBOARD_FLIP = relays[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_PID) {
              index = engine_functions.get_pid(global.selected_id);
              if (index < pids.length) {
                global.CLIPBOARD_ROTATION = pids[index].elm.rotation;
                global.CLIPBOARD_FLIP = pids[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_LUT) {
              index = engine_functions.get_lut(global.selected_id);
              if (index < luts.length) {
                global.CLIPBOARD_ROTATION = luts[index].elm.rotation;
                global.CLIPBOARD_FLIP = luts[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_VCR) {
              index = engine_functions.get_vcr(global.selected_id);
              if (index < vcrs.length) {
                global.CLIPBOARD_ROTATION = vcrs[index].elm.rotation;
                global.CLIPBOARD_FLIP = vcrs[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_GRT) {
              index = engine_functions.get_grt(global.selected_id);
              if (index < grts.length) {
                global.CLIPBOARD_ROTATION = grts[index].elm.rotation;
                global.CLIPBOARD_FLIP = grts[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_TPTZ) {
              index = engine_functions.get_tptz(global.selected_id);
              if (index < tptzs.length) {
                global.CLIPBOARD_ROTATION = tptzs[index].elm.rotation;
                global.CLIPBOARD_FLIP = tptzs[index].elm.flip;
              }
            } else if (global.CLIPBOARD_TYPE === global.TYPE_TRAN) {
              index = engine_functions.get_transformer(global.selected_id);
              if (index < transformers.length) {
                global.CLIPBOARD_ROTATION = transformers[index].elm.rotation;
                global.CLIPBOARD_FLIP = transformers[index].elm.flip;
              }
            }
            /* <!-- END AUTOMATICALLY GENERATED !--> */
            global.CLIPBOARD_PROPERTY = global.copy(global.selected_properties);
            toast.set_text(
              language_manager.COPIED[global.LANGUAGES[global.LANGUAGE_INDEX]] +
                ' {' +
                global.selected_properties['tag'] +
                global.selected_id +
                '}'
            );
            toast.show();
          } else {
            toast.set_text(
              language_manager.CANNOT_COPY_WIRE[
                global.LANGUAGES[global.LANGUAGE_INDEX]
              ] + '.'
            );
            toast.show();
          }
        }
      } else {
        toast.set_text(
          language_manager.CANNOT_MULTI_SELECT[
            global.LANGUAGES[global.LANGUAGE_INDEX]
          ] + '.'
        );
        toast.show();
      }
    }
  }
  handle_paste_shortcut(key_event) {
    /* Extract the essentials. */
    this.shift = key_event['shift'];
    this.command = key_event['event'].code;
    this.caps = key_event['caps'];
    if (this.command === this.SHORTCUT_PASTE) {
      global.SIGNAL_BUILD_ELEMENT = true;
      this.TEMP_HISTORY_SNAPSHOT = engine_functions.history_snapshot();
      let id = -1;
      let index = -1;
      if (
        global.not_null(global.CLIPBOARD_TYPE) &&
        global.not_null(global.CLIPBOARD_PROPERTY)
      ) {
        /* #INSERT_GENERATE_PASTE_ELEMENT# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        if (global.CLIPBOARD_TYPE === global.TYPE_RESISTOR) {
          id = engine_functions.get_resistor_assignment();
          engine_functions.add_resistor();
          index = engine_functions.get_resistor(id);
          if (index < resistors.length) {
            resistors[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            resistors[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            resistors[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_CAPACITOR) {
          id = engine_functions.get_capacitor_assignment();
          engine_functions.add_capacitor();
          index = engine_functions.get_capacitor(id);
          if (index < capacitors.length) {
            capacitors[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            capacitors[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            capacitors[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_INDUCTOR) {
          id = engine_functions.get_inductor_assignment();
          engine_functions.add_inductor();
          index = engine_functions.get_inductor(id);
          if (index < inductors.length) {
            inductors[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            inductors[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            inductors[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_GROUND) {
          id = engine_functions.get_ground_assignment();
          engine_functions.add_ground();
          index = engine_functions.get_ground(id);
          if (index < grounds.length) {
            grounds[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            grounds[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            grounds[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_DCSOURCE) {
          id = engine_functions.get_dcsource_assignment();
          engine_functions.add_dcsource();
          index = engine_functions.get_dcsource(id);
          if (index < dcsources.length) {
            dcsources[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            dcsources[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            dcsources[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_DCCURRENT) {
          id = engine_functions.get_dccurrent_assignment();
          engine_functions.add_dccurrent();
          index = engine_functions.get_dccurrent(id);
          if (index < dccurrents.length) {
            dccurrents[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            dccurrents[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            dccurrents[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_ACSOURCE) {
          id = engine_functions.get_acsource_assignment();
          engine_functions.add_acsource();
          index = engine_functions.get_acsource(id);
          if (index < acsources.length) {
            acsources[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            acsources[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            acsources[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_ACCURRENT) {
          id = engine_functions.get_accurrent_assignment();
          engine_functions.add_accurrent();
          index = engine_functions.get_accurrent(id);
          if (index < accurrents.length) {
            accurrents[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            accurrents[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            accurrents[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_SQUAREWAVE) {
          id = engine_functions.get_squarewave_assignment();
          engine_functions.add_squarewave();
          index = engine_functions.get_squarewave(id);
          if (index < squarewaves.length) {
            squarewaves[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            squarewaves[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            squarewaves[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_SAW) {
          id = engine_functions.get_sawwave_assignment();
          engine_functions.add_sawwave();
          index = engine_functions.get_sawwave(id);
          if (index < sawwaves.length) {
            sawwaves[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            sawwaves[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            sawwaves[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_TRI) {
          id = engine_functions.get_trianglewave_assignment();
          engine_functions.add_trianglewave();
          index = engine_functions.get_trianglewave(id);
          if (index < trianglewaves.length) {
            trianglewaves[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            trianglewaves[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            trianglewaves[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_CONSTANT) {
          id = engine_functions.get_constant_assignment();
          engine_functions.add_constant();
          index = engine_functions.get_constant(id);
          if (index < constants.length) {
            constants[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            constants[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            constants[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_NET) {
          id = engine_functions.get_net_assignment();
          engine_functions.add_net();
          index = engine_functions.get_net(id);
          if (index < nets.length) {
            nets[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            nets[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            nets[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_NOTE) {
          id = engine_functions.get_note_assignment();
          engine_functions.add_note();
          index = engine_functions.get_note(id);
          if (index < notes.length) {
            notes[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            notes[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            notes[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_RAIL) {
          id = engine_functions.get_rail_assignment();
          engine_functions.add_rail();
          index = engine_functions.get_rail(id);
          if (index < rails.length) {
            rails[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            rails[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            rails[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_VOLTMETER) {
          id = engine_functions.get_voltmeter_assignment();
          engine_functions.add_voltmeter();
          index = engine_functions.get_voltmeter(id);
          if (index < voltmeters.length) {
            voltmeters[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            voltmeters[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            voltmeters[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_OHMMETER) {
          id = engine_functions.get_ohmmeter_assignment();
          engine_functions.add_ohmmeter();
          index = engine_functions.get_ohmmeter(id);
          if (index < ohmmeters.length) {
            ohmmeters[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            ohmmeters[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            ohmmeters[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_AMMETER) {
          id = engine_functions.get_ammeter_assignment();
          engine_functions.add_ammeter();
          index = engine_functions.get_ammeter(id);
          if (index < ammeters.length) {
            ammeters[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            ammeters[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            ammeters[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_WATTMETER) {
          id = engine_functions.get_wattmeter_assignment();
          engine_functions.add_wattmeter();
          index = engine_functions.get_wattmeter(id);
          if (index < wattmeters.length) {
            wattmeters[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            wattmeters[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            wattmeters[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_FUSE) {
          id = engine_functions.get_fuse_assignment();
          engine_functions.add_fuse();
          index = engine_functions.get_fuse(id);
          if (index < fuses.length) {
            fuses[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            fuses[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            fuses[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_SPST) {
          id = engine_functions.get_spst_assignment();
          engine_functions.add_spst();
          index = engine_functions.get_spst(id);
          if (index < spsts.length) {
            spsts[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            spsts[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            spsts[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_SPDT) {
          id = engine_functions.get_spdt_assignment();
          engine_functions.add_spdt();
          index = engine_functions.get_spdt(id);
          if (index < spdts.length) {
            spdts[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            spdts[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            spdts[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_NOT) {
          id = engine_functions.get_not_assignment();
          engine_functions.add_not();
          index = engine_functions.get_not(id);
          if (index < nots.length) {
            nots[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            nots[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            nots[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_DIODE) {
          id = engine_functions.get_diode_assignment();
          engine_functions.add_diode();
          index = engine_functions.get_diode(id);
          if (index < diodes.length) {
            diodes[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            diodes[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            diodes[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_LED) {
          id = engine_functions.get_led_assignment();
          engine_functions.add_led();
          index = engine_functions.get_led(id);
          if (index < leds.length) {
            leds[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            leds[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            leds[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_ZENER) {
          id = engine_functions.get_zener_assignment();
          engine_functions.add_zener();
          index = engine_functions.get_zener(id);
          if (index < zeners.length) {
            zeners[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            zeners[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            zeners[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_POTENTIOMETER) {
          id = engine_functions.get_potentiometer_assignment();
          engine_functions.add_potentiometer();
          index = engine_functions.get_potentiometer(id);
          if (index < potentiometers.length) {
            potentiometers[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            potentiometers[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            potentiometers[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_AND) {
          id = engine_functions.get_and_assignment();
          engine_functions.add_and();
          index = engine_functions.get_and(id);
          if (index < ands.length) {
            ands[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            ands[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            ands[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_OR) {
          id = engine_functions.get_or_assignment();
          engine_functions.add_or();
          index = engine_functions.get_or(id);
          if (index < ors.length) {
            ors[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            ors[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            ors[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_NAND) {
          id = engine_functions.get_nand_assignment();
          engine_functions.add_nand();
          index = engine_functions.get_nand(id);
          if (index < nands.length) {
            nands[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            nands[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            nands[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_NOR) {
          id = engine_functions.get_nor_assignment();
          engine_functions.add_nor();
          index = engine_functions.get_nor(id);
          if (index < nors.length) {
            nors[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            nors[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            nors[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_XOR) {
          id = engine_functions.get_xor_assignment();
          engine_functions.add_xor();
          index = engine_functions.get_xor(id);
          if (index < xors.length) {
            xors[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            xors[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            xors[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_XNOR) {
          id = engine_functions.get_xnor_assignment();
          engine_functions.add_xnor();
          index = engine_functions.get_xnor(id);
          if (index < xnors.length) {
            xnors[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            xnors[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            xnors[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_DFF) {
          id = engine_functions.get_dff_assignment();
          engine_functions.add_dff();
          index = engine_functions.get_dff(id);
          if (index < dffs.length) {
            dffs[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            dffs[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            dffs[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_VSAT) {
          id = engine_functions.get_vsat_assignment();
          engine_functions.add_vsat();
          index = engine_functions.get_vsat(id);
          if (index < vsats.length) {
            vsats[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            vsats[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            vsats[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_ADD) {
          id = engine_functions.get_adder_assignment();
          engine_functions.add_adder();
          index = engine_functions.get_adder(id);
          if (index < adders.length) {
            adders[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            adders[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            adders[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_SUB) {
          id = engine_functions.get_subtractor_assignment();
          engine_functions.add_subtractor();
          index = engine_functions.get_subtractor(id);
          if (index < subtractors.length) {
            subtractors[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            subtractors[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            subtractors[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_MUL) {
          id = engine_functions.get_multiplier_assignment();
          engine_functions.add_multiplier();
          index = engine_functions.get_multiplier(id);
          if (index < multipliers.length) {
            multipliers[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            multipliers[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            multipliers[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_DIV) {
          id = engine_functions.get_divider_assignment();
          engine_functions.add_divider();
          index = engine_functions.get_divider(id);
          if (index < dividers.length) {
            dividers[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            dividers[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            dividers[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_GAIN) {
          id = engine_functions.get_gain_assignment();
          engine_functions.add_gain();
          index = engine_functions.get_gain(id);
          if (index < gains.length) {
            gains[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            gains[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            gains[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_ABS) {
          id = engine_functions.get_absval_assignment();
          engine_functions.add_absval();
          index = engine_functions.get_absval(id);
          if (index < absvals.length) {
            absvals[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            absvals[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            absvals[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_VCSW) {
          id = engine_functions.get_vcsw_assignment();
          engine_functions.add_vcsw();
          index = engine_functions.get_vcsw(id);
          if (index < vcsws.length) {
            vcsws[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            vcsws[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            vcsws[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_VCVS) {
          id = engine_functions.get_vcvs_assignment();
          engine_functions.add_vcvs();
          index = engine_functions.get_vcvs(id);
          if (index < vcvss.length) {
            vcvss[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            vcvss[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            vcvss[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_VCCS) {
          id = engine_functions.get_vccs_assignment();
          engine_functions.add_vccs();
          index = engine_functions.get_vccs(id);
          if (index < vccss.length) {
            vccss[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            vccss[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            vccss[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_CCCS) {
          id = engine_functions.get_cccs_assignment();
          engine_functions.add_cccs();
          index = engine_functions.get_cccs(id);
          if (index < cccss.length) {
            cccss[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            cccss[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            cccss[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_CCVS) {
          id = engine_functions.get_ccvs_assignment();
          engine_functions.add_ccvs();
          index = engine_functions.get_ccvs(id);
          if (index < ccvss.length) {
            ccvss[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            ccvss[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            ccvss[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_OPAMP) {
          id = engine_functions.get_opamp_assignment();
          engine_functions.add_opamp();
          index = engine_functions.get_opamp(id);
          if (index < opamps.length) {
            opamps[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            opamps[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            opamps[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_NMOS) {
          id = engine_functions.get_nmosfet_assignment();
          engine_functions.add_nmosfet();
          index = engine_functions.get_nmosfet(id);
          if (index < nmosfets.length) {
            nmosfets[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            nmosfets[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            nmosfets[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_PMOS) {
          id = engine_functions.get_pmosfet_assignment();
          engine_functions.add_pmosfet();
          index = engine_functions.get_pmosfet(id);
          if (index < pmosfets.length) {
            pmosfets[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            pmosfets[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            pmosfets[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_NPN) {
          id = engine_functions.get_npn_assignment();
          engine_functions.add_npn();
          index = engine_functions.get_npn(id);
          if (index < npns.length) {
            npns[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            npns[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            npns[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_PNP) {
          id = engine_functions.get_pnp_assignment();
          engine_functions.add_pnp();
          index = engine_functions.get_pnp(id);
          if (index < pnps.length) {
            pnps[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            pnps[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            pnps[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_ADC) {
          id = engine_functions.get_adc_assignment();
          engine_functions.add_adc();
          index = engine_functions.get_adc(id);
          if (index < adcs.length) {
            adcs[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            adcs[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            adcs[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_DAC) {
          id = engine_functions.get_dac_assignment();
          engine_functions.add_dac();
          index = engine_functions.get_dac(id);
          if (index < dacs.length) {
            dacs[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            dacs[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            dacs[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_SAH) {
          id = engine_functions.get_samplers_assignment();
          engine_functions.add_samplers();
          index = engine_functions.get_samplers(id);
          if (index < sandhs.length) {
            sandhs[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            sandhs[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            sandhs[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_PWM) {
          id = engine_functions.get_pwm_assignment();
          engine_functions.add_pwm();
          index = engine_functions.get_pwm(id);
          if (index < pwms.length) {
            pwms[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            pwms[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            pwms[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_INTEGRATOR) {
          id = engine_functions.get_integrator_assignment();
          engine_functions.add_integrator();
          index = engine_functions.get_integrator(id);
          if (index < integrators.length) {
            integrators[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            integrators[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            integrators[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_DIFFERENTIATOR) {
          id = engine_functions.get_differentiator_assignment();
          engine_functions.add_differentiator();
          index = engine_functions.get_differentiator(id);
          if (index < differentiators.length) {
            differentiators[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            differentiators[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            differentiators[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_LPF) {
          id = engine_functions.get_lowpass_assignment();
          engine_functions.add_lowpass();
          index = engine_functions.get_lowpass(id);
          if (index < lowpasses.length) {
            lowpasses[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            lowpasses[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            lowpasses[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_HPF) {
          id = engine_functions.get_highpass_assignment();
          engine_functions.add_highpass();
          index = engine_functions.get_highpass(id);
          if (index < highpasses.length) {
            highpasses[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            highpasses[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            highpasses[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_REL) {
          id = engine_functions.get_relay_assignment();
          engine_functions.add_relay();
          index = engine_functions.get_relay(id);
          if (index < relays.length) {
            relays[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            relays[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            relays[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_PID) {
          id = engine_functions.get_pid_assignment();
          engine_functions.add_pid();
          index = engine_functions.get_pid(id);
          if (index < pids.length) {
            pids[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            pids[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            pids[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_LUT) {
          id = engine_functions.get_lut_assignment();
          engine_functions.add_lut();
          index = engine_functions.get_lut(id);
          if (index < luts.length) {
            luts[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            luts[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            luts[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_VCR) {
          id = engine_functions.get_vcr_assignment();
          engine_functions.add_vcr();
          index = engine_functions.get_vcr(id);
          if (index < vcrs.length) {
            vcrs[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            vcrs[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            vcrs[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_GRT) {
          id = engine_functions.get_grt_assignment();
          engine_functions.add_grt();
          index = engine_functions.get_grt(id);
          if (index < grts.length) {
            grts[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            grts[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            grts[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_TPTZ) {
          id = engine_functions.get_tptz_assignment();
          engine_functions.add_tptz();
          index = engine_functions.get_tptz(id);
          if (index < tptzs.length) {
            tptzs[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            tptzs[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            tptzs[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        } else if (global.CLIPBOARD_TYPE === global.TYPE_TRAN) {
          id = engine_functions.get_transformer_assignment();
          engine_functions.add_transformer();
          index = engine_functions.get_transformer(id);
          if (index < transformers.length) {
            transformers[index].elm.set_properties(
              global.copy(global.CLIPBOARD_PROPERTY)
            );
            transformers[index].elm.set_rotation(global.CLIPBOARD_ROTATION);
            transformers[index].elm.set_flip(global.CLIPBOARD_FLIP);
            global.SIGNAL_HISTORY_LOCK = true;
          }
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
      } else {
        toast.set_text(
          language_manager.NO_CLIPBOARD_DATA[
            global.LANGUAGES[global.LANGUAGE_INDEX]
          ] + '.'
        );
        toast.show();
      }
    }
  }
  /* #INSERT_GENERATE_HANDLE_MULTI_SELECT_ELEMENTS_MOVE# */
  /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
  handle_move_resistors(i, key_event) {
    if (i > -1 && i < resistors.length) {
      if (resistors[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            resistors[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            resistors[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            resistors[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            resistors[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_capacitors(i, key_event) {
    if (i > -1 && i < capacitors.length) {
      if (capacitors[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            capacitors[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            capacitors[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            capacitors[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            capacitors[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_inductors(i, key_event) {
    if (i > -1 && i < inductors.length) {
      if (inductors[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            inductors[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            inductors[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            inductors[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            inductors[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_grounds(i, key_event) {
    if (i > -1 && i < grounds.length) {
      if (grounds[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            grounds[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            grounds[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            grounds[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            grounds[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_dcsources(i, key_event) {
    if (i > -1 && i < dcsources.length) {
      if (dcsources[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            dcsources[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            dcsources[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            dcsources[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            dcsources[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_dccurrents(i, key_event) {
    if (i > -1 && i < dccurrents.length) {
      if (dccurrents[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            dccurrents[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            dccurrents[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            dccurrents[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            dccurrents[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_acsources(i, key_event) {
    if (i > -1 && i < acsources.length) {
      if (acsources[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            acsources[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            acsources[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            acsources[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            acsources[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_accurrents(i, key_event) {
    if (i > -1 && i < accurrents.length) {
      if (accurrents[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            accurrents[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            accurrents[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            accurrents[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            accurrents[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_squarewaves(i, key_event) {
    if (i > -1 && i < squarewaves.length) {
      if (squarewaves[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            squarewaves[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            squarewaves[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            squarewaves[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            squarewaves[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_sawwaves(i, key_event) {
    if (i > -1 && i < sawwaves.length) {
      if (sawwaves[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            sawwaves[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            sawwaves[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            sawwaves[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            sawwaves[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_trianglewaves(i, key_event) {
    if (i > -1 && i < trianglewaves.length) {
      if (trianglewaves[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            trianglewaves[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            trianglewaves[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            trianglewaves[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            trianglewaves[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_constants(i, key_event) {
    if (i > -1 && i < constants.length) {
      if (constants[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            constants[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            constants[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            constants[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            constants[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_wires(i, key_event) {
    if (i > -1 && i < wires.length) {
      if (wires[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            wires[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            wires[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            wires[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            wires[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_nets(i, key_event) {
    if (i > -1 && i < nets.length) {
      if (nets[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            nets[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            nets[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            nets[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            nets[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_notes(i, key_event) {
    if (i > -1 && i < notes.length) {
      if (notes[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            notes[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            notes[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            notes[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            notes[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_rails(i, key_event) {
    if (i > -1 && i < rails.length) {
      if (rails[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            rails[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            rails[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            rails[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            rails[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_voltmeters(i, key_event) {
    if (i > -1 && i < voltmeters.length) {
      if (voltmeters[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            voltmeters[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            voltmeters[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            voltmeters[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            voltmeters[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_ohmmeters(i, key_event) {
    if (i > -1 && i < ohmmeters.length) {
      if (ohmmeters[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            ohmmeters[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            ohmmeters[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            ohmmeters[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            ohmmeters[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_ammeters(i, key_event) {
    if (i > -1 && i < ammeters.length) {
      if (ammeters[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            ammeters[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            ammeters[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            ammeters[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            ammeters[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_wattmeters(i, key_event) {
    if (i > -1 && i < wattmeters.length) {
      if (wattmeters[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            wattmeters[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            wattmeters[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            wattmeters[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            wattmeters[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_fuses(i, key_event) {
    if (i > -1 && i < fuses.length) {
      if (fuses[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            fuses[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            fuses[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            fuses[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            fuses[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_spsts(i, key_event) {
    if (i > -1 && i < spsts.length) {
      if (spsts[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            spsts[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            spsts[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            spsts[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            spsts[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_spdts(i, key_event) {
    if (i > -1 && i < spdts.length) {
      if (spdts[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            spdts[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            spdts[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            spdts[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            spdts[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_nots(i, key_event) {
    if (i > -1 && i < nots.length) {
      if (nots[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            nots[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            nots[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            nots[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            nots[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_diodes(i, key_event) {
    if (i > -1 && i < diodes.length) {
      if (diodes[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            diodes[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            diodes[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            diodes[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            diodes[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_leds(i, key_event) {
    if (i > -1 && i < leds.length) {
      if (leds[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            leds[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            leds[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            leds[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            leds[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_zeners(i, key_event) {
    if (i > -1 && i < zeners.length) {
      if (zeners[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            zeners[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            zeners[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            zeners[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            zeners[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_potentiometers(i, key_event) {
    if (i > -1 && i < potentiometers.length) {
      if (potentiometers[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            potentiometers[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            potentiometers[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            potentiometers[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            potentiometers[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_ands(i, key_event) {
    if (i > -1 && i < ands.length) {
      if (ands[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            ands[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            ands[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            ands[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            ands[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_ors(i, key_event) {
    if (i > -1 && i < ors.length) {
      if (ors[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            ors[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            ors[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            ors[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            ors[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_nands(i, key_event) {
    if (i > -1 && i < nands.length) {
      if (nands[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            nands[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            nands[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            nands[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            nands[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_nors(i, key_event) {
    if (i > -1 && i < nors.length) {
      if (nors[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            nors[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            nors[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            nors[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            nors[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_xors(i, key_event) {
    if (i > -1 && i < xors.length) {
      if (xors[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            xors[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            xors[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            xors[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            xors[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_xnors(i, key_event) {
    if (i > -1 && i < xnors.length) {
      if (xnors[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            xnors[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            xnors[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            xnors[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            xnors[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_dffs(i, key_event) {
    if (i > -1 && i < dffs.length) {
      if (dffs[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            dffs[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            dffs[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            dffs[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            dffs[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_vsats(i, key_event) {
    if (i > -1 && i < vsats.length) {
      if (vsats[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            vsats[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            vsats[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            vsats[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            vsats[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_adders(i, key_event) {
    if (i > -1 && i < adders.length) {
      if (adders[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            adders[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            adders[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            adders[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            adders[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_subtractors(i, key_event) {
    if (i > -1 && i < subtractors.length) {
      if (subtractors[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            subtractors[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            subtractors[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            subtractors[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            subtractors[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_multipliers(i, key_event) {
    if (i > -1 && i < multipliers.length) {
      if (multipliers[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            multipliers[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            multipliers[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            multipliers[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            multipliers[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_dividers(i, key_event) {
    if (i > -1 && i < dividers.length) {
      if (dividers[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            dividers[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            dividers[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            dividers[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            dividers[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_gains(i, key_event) {
    if (i > -1 && i < gains.length) {
      if (gains[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            gains[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            gains[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            gains[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            gains[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_absvals(i, key_event) {
    if (i > -1 && i < absvals.length) {
      if (absvals[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            absvals[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            absvals[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            absvals[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            absvals[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_vcsws(i, key_event) {
    if (i > -1 && i < vcsws.length) {
      if (vcsws[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            vcsws[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            vcsws[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            vcsws[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            vcsws[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_vcvss(i, key_event) {
    if (i > -1 && i < vcvss.length) {
      if (vcvss[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            vcvss[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            vcvss[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            vcvss[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            vcvss[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_vccss(i, key_event) {
    if (i > -1 && i < vccss.length) {
      if (vccss[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            vccss[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            vccss[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            vccss[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            vccss[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_cccss(i, key_event) {
    if (i > -1 && i < cccss.length) {
      if (cccss[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            cccss[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            cccss[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            cccss[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            cccss[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_ccvss(i, key_event) {
    if (i > -1 && i < ccvss.length) {
      if (ccvss[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            ccvss[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            ccvss[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            ccvss[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            ccvss[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_opamps(i, key_event) {
    if (i > -1 && i < opamps.length) {
      if (opamps[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            opamps[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            opamps[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            opamps[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            opamps[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_nmosfets(i, key_event) {
    if (i > -1 && i < nmosfets.length) {
      if (nmosfets[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            nmosfets[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            nmosfets[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            nmosfets[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            nmosfets[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_pmosfets(i, key_event) {
    if (i > -1 && i < pmosfets.length) {
      if (pmosfets[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            pmosfets[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            pmosfets[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            pmosfets[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            pmosfets[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_npns(i, key_event) {
    if (i > -1 && i < npns.length) {
      if (npns[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            npns[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            npns[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            npns[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            npns[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_pnps(i, key_event) {
    if (i > -1 && i < pnps.length) {
      if (pnps[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            pnps[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            pnps[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            pnps[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            pnps[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_adcs(i, key_event) {
    if (i > -1 && i < adcs.length) {
      if (adcs[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            adcs[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            adcs[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            adcs[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            adcs[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_dacs(i, key_event) {
    if (i > -1 && i < dacs.length) {
      if (dacs[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            dacs[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            dacs[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            dacs[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            dacs[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_sandhs(i, key_event) {
    if (i > -1 && i < sandhs.length) {
      if (sandhs[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            sandhs[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            sandhs[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            sandhs[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            sandhs[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_pwms(i, key_event) {
    if (i > -1 && i < pwms.length) {
      if (pwms[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            pwms[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            pwms[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            pwms[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            pwms[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_integrators(i, key_event) {
    if (i > -1 && i < integrators.length) {
      if (integrators[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            integrators[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            integrators[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            integrators[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            integrators[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_differentiators(i, key_event) {
    if (i > -1 && i < differentiators.length) {
      if (differentiators[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            differentiators[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            differentiators[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            differentiators[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            differentiators[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_lowpasses(i, key_event) {
    if (i > -1 && i < lowpasses.length) {
      if (lowpasses[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            lowpasses[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            lowpasses[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            lowpasses[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            lowpasses[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_highpasses(i, key_event) {
    if (i > -1 && i < highpasses.length) {
      if (highpasses[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            highpasses[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            highpasses[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            highpasses[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            highpasses[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_relays(i, key_event) {
    if (i > -1 && i < relays.length) {
      if (relays[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            relays[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            relays[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            relays[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            relays[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_pids(i, key_event) {
    if (i > -1 && i < pids.length) {
      if (pids[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            pids[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            pids[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            pids[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            pids[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_luts(i, key_event) {
    if (i > -1 && i < luts.length) {
      if (luts[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            luts[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            luts[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            luts[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            luts[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_vcrs(i, key_event) {
    if (i > -1 && i < vcrs.length) {
      if (vcrs[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            vcrs[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            vcrs[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            vcrs[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            vcrs[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_grts(i, key_event) {
    if (i > -1 && i < grts.length) {
      if (grts[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            grts[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            grts[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            grts[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            grts[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_tptzs(i, key_event) {
    if (i > -1 && i < tptzs.length) {
      if (tptzs[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            tptzs[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            tptzs[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            tptzs[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            tptzs[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  handle_move_transformers(i, key_event) {
    if (i > -1 && i < transformers.length) {
      if (transformers[i].MULTI_SELECTED) {
        /* Up. */
        if (key_event['event'].code === global.KEY_CODE_ARROW_UP) {
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top >
            workspace.bounds.top + global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            global.SIGNAL_BUILD_ELEMENT = true;
            transformers[i].move_element(0, -global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_DOWN) {
          /* Down. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom <
            workspace.bounds.bottom - global.node_space_y
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            transformers[i].move_element(0, global.node_space_y);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT) {
          /* Left. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left >
            workspace.bounds.left + global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            transformers[i].move_element(-global.node_space_x, 0);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT) {
          /* Right. */
          if (
            multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right <
            workspace.bounds.right - global.node_space_x
          ) {
            this.MULTI_MOVED_ELEMENT = true;
            transformers[i].move_element(global.node_space_x, 0);
          }
        }
      }
    }
  }

  /* <!-- END AUTOMATICALLY GENERATED !--> */
  handle_remove_multi_select_elements() {
    this.MULTI_DELETED_ELEMENT = false;
    let elm_max = global.element_max();
    for (var i = elm_max - 1; i > -1; i--) {
      /* #INSERT_GENERATE_HANDLE_REMOVE_MULTI_SELECT_ELEMENTS# */
      /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
      if (i > -1 && i < resistors.length) {
        if (resistors[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_resistor(i);
        }
      }
      if (i > -1 && i < capacitors.length) {
        if (capacitors[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_capacitor(i);
        }
      }
      if (i > -1 && i < inductors.length) {
        if (inductors[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_inductor(i);
        }
      }
      if (i > -1 && i < grounds.length) {
        if (grounds[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_ground(i);
        }
      }
      if (i > -1 && i < dcsources.length) {
        if (dcsources[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_dcsource(i);
        }
      }
      if (i > -1 && i < dccurrents.length) {
        if (dccurrents[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_dccurrent(i);
        }
      }
      if (i > -1 && i < acsources.length) {
        if (acsources[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_acsource(i);
        }
      }
      if (i > -1 && i < accurrents.length) {
        if (accurrents[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_accurrent(i);
        }
      }
      if (i > -1 && i < squarewaves.length) {
        if (squarewaves[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_squarewave(i);
        }
      }
      if (i > -1 && i < sawwaves.length) {
        if (sawwaves[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_sawwave(i);
        }
      }
      if (i > -1 && i < trianglewaves.length) {
        if (trianglewaves[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_trianglewave(i);
        }
      }
      if (i > -1 && i < constants.length) {
        if (constants[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_constant(i);
        }
      }
      if (i > -1 && i < wires.length) {
        if (wires[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_wire(i);
        }
      }
      if (i > -1 && i < nets.length) {
        if (nets[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_net(i);
        }
      }
      if (i > -1 && i < notes.length) {
        if (notes[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_note(i);
        }
      }
      if (i > -1 && i < rails.length) {
        if (rails[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_rail(i);
        }
      }
      if (i > -1 && i < voltmeters.length) {
        if (voltmeters[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_voltmeter(i);
        }
      }
      if (i > -1 && i < ohmmeters.length) {
        if (ohmmeters[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_ohmmeter(i);
        }
      }
      if (i > -1 && i < ammeters.length) {
        if (ammeters[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_ammeter(i);
        }
      }
      if (i > -1 && i < wattmeters.length) {
        if (wattmeters[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_wattmeter(i);
        }
      }
      if (i > -1 && i < fuses.length) {
        if (fuses[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_fuse(i);
        }
      }
      if (i > -1 && i < spsts.length) {
        if (spsts[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_spst(i);
        }
      }
      if (i > -1 && i < spdts.length) {
        if (spdts[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_spdt(i);
        }
      }
      if (i > -1 && i < nots.length) {
        if (nots[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_not(i);
        }
      }
      if (i > -1 && i < diodes.length) {
        if (diodes[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_diode(i);
        }
      }
      if (i > -1 && i < leds.length) {
        if (leds[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_led(i);
        }
      }
      if (i > -1 && i < zeners.length) {
        if (zeners[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_zener(i);
        }
      }
      if (i > -1 && i < potentiometers.length) {
        if (potentiometers[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_potentiometer(i);
        }
      }
      if (i > -1 && i < ands.length) {
        if (ands[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_and(i);
        }
      }
      if (i > -1 && i < ors.length) {
        if (ors[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_or(i);
        }
      }
      if (i > -1 && i < nands.length) {
        if (nands[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_nand(i);
        }
      }
      if (i > -1 && i < nors.length) {
        if (nors[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_nor(i);
        }
      }
      if (i > -1 && i < xors.length) {
        if (xors[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_xor(i);
        }
      }
      if (i > -1 && i < xnors.length) {
        if (xnors[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_xnor(i);
        }
      }
      if (i > -1 && i < dffs.length) {
        if (dffs[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_dff(i);
        }
      }
      if (i > -1 && i < vsats.length) {
        if (vsats[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_vsat(i);
        }
      }
      if (i > -1 && i < adders.length) {
        if (adders[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_adder(i);
        }
      }
      if (i > -1 && i < subtractors.length) {
        if (subtractors[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_subtractor(i);
        }
      }
      if (i > -1 && i < multipliers.length) {
        if (multipliers[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_multiplier(i);
        }
      }
      if (i > -1 && i < dividers.length) {
        if (dividers[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_divider(i);
        }
      }
      if (i > -1 && i < gains.length) {
        if (gains[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_gain(i);
        }
      }
      if (i > -1 && i < absvals.length) {
        if (absvals[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_absval(i);
        }
      }
      if (i > -1 && i < vcsws.length) {
        if (vcsws[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_vcsw(i);
        }
      }
      if (i > -1 && i < vcvss.length) {
        if (vcvss[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_vcvs(i);
        }
      }
      if (i > -1 && i < vccss.length) {
        if (vccss[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_vccs(i);
        }
      }
      if (i > -1 && i < cccss.length) {
        if (cccss[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_cccs(i);
        }
      }
      if (i > -1 && i < ccvss.length) {
        if (ccvss[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_ccvs(i);
        }
      }
      if (i > -1 && i < opamps.length) {
        if (opamps[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_opamp(i);
        }
      }
      if (i > -1 && i < nmosfets.length) {
        if (nmosfets[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_nmosfet(i);
        }
      }
      if (i > -1 && i < pmosfets.length) {
        if (pmosfets[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_pmosfet(i);
        }
      }
      if (i > -1 && i < npns.length) {
        if (npns[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_npn(i);
        }
      }
      if (i > -1 && i < pnps.length) {
        if (pnps[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_pnp(i);
        }
      }
      if (i > -1 && i < adcs.length) {
        if (adcs[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_adc(i);
        }
      }
      if (i > -1 && i < dacs.length) {
        if (dacs[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_dac(i);
        }
      }
      if (i > -1 && i < sandhs.length) {
        if (sandhs[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_samplers(i);
        }
      }
      if (i > -1 && i < pwms.length) {
        if (pwms[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_pwm(i);
        }
      }
      if (i > -1 && i < integrators.length) {
        if (integrators[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_integrator(i);
        }
      }
      if (i > -1 && i < differentiators.length) {
        if (differentiators[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_differentiator(i);
        }
      }
      if (i > -1 && i < lowpasses.length) {
        if (lowpasses[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_lowpass(i);
        }
      }
      if (i > -1 && i < highpasses.length) {
        if (highpasses[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_highpass(i);
        }
      }
      if (i > -1 && i < relays.length) {
        if (relays[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_relay(i);
        }
      }
      if (i > -1 && i < pids.length) {
        if (pids[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_pid(i);
        }
      }
      if (i > -1 && i < luts.length) {
        if (luts[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_lut(i);
        }
      }
      if (i > -1 && i < vcrs.length) {
        if (vcrs[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_vcr(i);
        }
      }
      if (i > -1 && i < grts.length) {
        if (grts[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_grt(i);
        }
      }
      if (i > -1 && i < tptzs.length) {
        if (tptzs[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_tptz(i);
        }
      }
      if (i > -1 && i < transformers.length) {
        if (transformers[i].MULTI_SELECTED) {
          this.MULTI_DELETED_ELEMENT = true;
          engine_functions.remove_transformer(i);
        }
      }
      /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
    if (this.MULTI_DELETED_ELEMENT) {
      global.HISTORY_MANAGER['packet'].push(
        engine_functions.history_snapshot()
      );
      this.MULTI_DELETED_ELEMENT = false;
    }
  }
}