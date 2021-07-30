'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* #START_GLOBAL_EXTRACT# */
const paint = new Paint();
var global = new Global();
//@ts-ignore
String.prototype.hashCode = function () {
    let hash = 0;
    let chr = '';
    if (this.length === 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash;
};
var file_reader = global.CONSTANTS.NULL;
if (MOBILE_MODE) {
    file_reader = document.getElementById('file_explorer_mobile');
}
else {
    file_reader = document.getElementById('file_explorer');
}
var file_saver = document.getElementById('file_saver');
var file_loader = document.getElementById('file_loader');
var solver_container = document.getElementById('solver');
var surface = document.createElement('canvas');
surface.id = 'canvas';
surface.style.visibility = 'hidden';
surface.style.zIndex = '0';
surface.style.position = 'absolute';
solver_container.appendChild(surface);
var ctx = surface.getContext('2d');
var virtual_surface = new VirtualCanvas(1, 1, global.variables.virtual_canvas_id++);
var linear_algebra = new LinearAlgebra();
var language_manager = new LanguageManager();
var shortcut_manager = new ShortcutManager();
var string_operator = new StringOperator();
var multi_select_manager = new MultiSelectManager();
var canvas_aspect_ratio = 1.333;
if (MOBILE_MODE) {
    canvas_aspect_ratio = 1.618;
}
var view_port = new Viewport(canvas_aspect_ratio, 800, 800 / canvas_aspect_ratio);
var workspace = new Workspace(0, 0, 0, 0, global.variables.workspace_zoom_scale);
var simulation_manager = global.CONSTANTS.NULL;
var scope_manager = new ScopeManager();
var matrix_a = linear_algebra.matrix(1, 1);
var matrix_z = linear_algebra.matrix(1, 1);
var matrix_x = linear_algebra.matrix(1, 1);
var matrix_x_copy = linear_algebra.matrix(1, 1);
/* #INSERT_GENERATE_CREATE_ELEMENT_INSTANCE# */
/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
var resistors = [];
var capacitors = [];
var inductors = [];
var grounds = [];
var dcsources = [];
var dccurrents = [];
var acsources = [];
var accurrents = [];
var squarewaves = [];
var sawwaves = [];
var trianglewaves = [];
var constants = [];
var wires = [];
var nets = [];
var notes = [];
var rails = [];
var voltmeters = [];
var ohmmeters = [];
var ammeters = [];
var wattmeters = [];
var fuses = [];
var spsts = [];
var spdts = [];
var nots = [];
var diodes = [];
var leds = [];
var zeners = [];
var potentiometers = [];
var ands = [];
var ors = [];
var nands = [];
var nors = [];
var xors = [];
var xnors = [];
var dffs = [];
var vsats = [];
var adders = [];
var subtractors = [];
var multipliers = [];
var dividers = [];
var gains = [];
var absvals = [];
var vcsws = [];
var vcvss = [];
var vccss = [];
var cccss = [];
var ccvss = [];
var opamps = [];
var nmosfets = [];
var pmosfets = [];
var npns = [];
var pnps = [];
var adcs = [];
var dacs = [];
var sandhs = [];
var pwms = [];
var integrators = [];
var differentiators = [];
var lowpasses = [];
var highpasses = [];
var relays = [];
var pids = [];
var luts = [];
var vcrs = [];
var vccas = [];
var vcls = [];
var grts = [];
var tptzs = [];
var transformers = [];
/* <!-- END AUTOMATICALLY GENERATED !--> */
var on_screen_keyboard = new OnScreenKeyboard();
var toast = global.CONSTANTS.NULL;
var history_manager = new HistoryManager();
var element_options = global.CONSTANTS.NULL;
var menu_bar = global.CONSTANTS.NULL;
var bottom_menu = global.CONSTANTS.NULL;
var time_step_window = global.CONSTANTS.NULL;
var save_circuit_window = global.CONSTANTS.NULL;
var save_image_window = global.CONSTANTS.NULL;
var element_options_window = global.CONSTANTS.NULL;
var element_options_edit_window = global.CONSTANTS.NULL;
var zoom_window = global.CONSTANTS.NULL;
var settings_window = global.CONSTANTS.NULL;
var confirm_window = global.CONSTANTS.NULL;
var wire_manager = new WireManager();
var engine_functions = new EngineFunctions();
var nodes = [];
var node_manager = new NodeManager();
var graph_window = global.CONSTANTS.NULL;
const FPS = 30;
var fps_iterator = 0;
var fps_div = 0;
var watermark_paint = new Paint();
var web_link_text_paint = new Paint();
var drag_text_paint = new Paint();
var drag_fill_paint = new Paint();
var drag_padding = 0;
var drag_line_buffer = [];
var webpage_document_title = global.CONSTANTS.NULL;
var last_webpage_document_title = 'untitled';
var sizing_initialized = false;
/* #END_GLOBAL_EXTRACT# */
function load_app() {
    browser_detection();
    workspace = new Workspace(view_port.left, view_port.top, view_port.view_width, view_port.view_height, global.variables.workspace_zoom_scale);
    let workspace_sqrt = Math.round(global.settings.SQRT_MAXNODES * 0.75);
    let work_space_x_space = 0;
    let work_space_y_space = 0;
    global.utils.last_surface_width = 0;
    global.utils.last_surface_height = 0;
    let canvas = new GraphicsEngine(virtual_surface.context);
    let fifo_index = 0;
    let touch = global.CONSTANTS.NULL;
    let temp_draw_signal = false;
    let node_space_x_cache = 0;
    let node_space_y_cache = 0;
    let mult_node_space_x_cache = 0;
    let mult_node_space_y_cache = 0;
    let node_length = 0;
    let cached_width = 0;
    let cached_height = 0;
    let temp_mouse_x = 0;
    let temp_mouse_y = 0;
    watermark_paint = new Paint();
    watermark_paint.set_paint_style(paint.style.FILL);
    watermark_paint.set_paint_cap(paint.cap.ROUND);
    watermark_paint.set_paint_join(paint.join.ROUND);
    watermark_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
    watermark_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
    watermark_paint.set_text_size(global.variables.canvas_text_size_4_zoom);
    watermark_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
    watermark_paint.set_alpha(255);
    watermark_paint.set_paint_align(paint.align.LEFT);
    web_link_text_paint = new Paint();
    web_link_text_paint.set_paint_style(paint.style.FILL);
    web_link_text_paint.set_paint_cap(paint.cap.ROUND);
    web_link_text_paint.set_paint_join(paint.join.ROUND);
    web_link_text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
    web_link_text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
    web_link_text_paint.set_text_size(global.variables.canvas_text_size_5_zoom);
    web_link_text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
    web_link_text_paint.set_alpha(255);
    web_link_text_paint.set_paint_align(paint.align.CENTER);
    drag_text_paint = new Paint();
    drag_text_paint.set_paint_style(paint.style.FILL);
    drag_text_paint.set_paint_cap(paint.cap.ROUND);
    drag_text_paint.set_paint_join(paint.join.ROUND);
    drag_text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
    drag_text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
    drag_text_paint.set_text_size(global.variables.canvas_text_size_5_zoom);
    drag_text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
    drag_text_paint.set_alpha(255);
    drag_text_paint.set_paint_align(paint.align.CENTER);
    drag_fill_paint = new Paint();
    drag_fill_paint.set_paint_style(paint.style.FILL);
    drag_fill_paint.set_paint_cap(paint.cap.ROUND);
    drag_fill_paint.set_paint_join(paint.join.ROUND);
    drag_fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
    drag_fill_paint.set_color(global.COLORS.GENERAL_GREEN_COLOR);
    drag_fill_paint.set_text_size(global.variables.canvas_text_size_5_zoom);
    drag_fill_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
    drag_fill_paint.set_alpha(127);
    drag_fill_paint.set_paint_align(paint.align.CENTER);
    function initialize(step) {
        if (step === 0) {
            toast = new Toast();
            resize_canvas(true);
            simulation_manager = new SimulationManager();
            engine_functions.create_nodes(workspace.bounds);
            global.utils.push_history();
        }
        else if (step === 1) {
            menu_bar = new MenuBar();
            bottom_menu = new BottomMenu();
            element_options = new ElementOptions();
            graph_window = new GraphWindow();
        }
        else if (step === 2) {
            time_step_window = new TimeStepWindow();
            save_circuit_window = new SaveCircuitWindow();
            save_image_window = new SaveImageWindow();
            element_options_window = new ElementOptionsWindow();
        }
        else if (step === 3) {
            element_options_edit_window = new ElementOptionsEditWindow();
            zoom_window = new ZoomWindow();
            settings_window = new SettingsWindow();
            confirm_window = new ConfirmWindow();
        }
        else if (step === 4) {
            register_cross_platform_listeners();
            if (!MOBILE_MODE) {
                webpage_document_title = document.getElementById('title_text');
            }
            if (global.variables.system_options['values'][global.CONSTANTS.SYSTEM_OPTION_STRETCH_WINDOW] === global.CONSTANTS.ON) {
                view_port.apply_spread_factor = true;
                global.flags.flag_force_resize_event = true;
            }
            else {
                global.flags.flag_force_resize_event = true;
            }
        }
    }
    function register_cross_platform_listeners() {
        if (MOBILE_MODE === true) {
            window.addEventListener('touchstart', mouse_down, true);
            window.addEventListener('touchmove', mouse_move, true);
            window.addEventListener('touchend', mouse_up, true);
        }
        else {
            window.addEventListener('mousedown', mouse_down, true);
            window.addEventListener('mousemove', mouse_move, true);
            window.addEventListener('mouseup', mouse_up, true);
            if (global.variables.browser_firefox) {
                window.addEventListener('DOMMouseScroll', mouse_wheel, true);
            }
            else {
                window.addEventListener('mousewheel', mouse_wheel, true);
            }
            window.addEventListener('keydown', key_down, true);
            window.addEventListener('keyup', key_up, true);
            window.addEventListener('dblclick', double_click, true);
        }
        window.addEventListener('resize', resize_canvas, true);
        window.addEventListener('focus', resize_canvas, true);
    }
    function resize_canvas(override) {
        try {
            let override_signal = (override != null && override);
            let resize_enabled = false;
            let temp = global.TEMPLATES.PIXEL_TEMPLATE.replace('{VALUE}', window.innerWidth);
            if (solver_container.style.width !== temp || override_signal) {
                solver_container.style.width = temp;
                resize_enabled = true;
            }
            temp = global.TEMPLATES.PIXEL_TEMPLATE.replace('{VALUE}', window.innerHeight);
            if (solver_container.style.height !== temp || override_signal) {
                solver_container.style.height = temp;
                resize_enabled = true;
            }
            if (resize_enabled) {
                global.variables.device_pixel_ratio = window.devicePixelRatio || 1;
                if (global.flags.flag_resize_event === false || override_signal) {
                    global.utils.last_view_port_right = view_port.right;
                    global.utils.last_view_port_bottom = view_port.bottom;
                    global.utils.last_view_port_width = view_port.view_width;
                    global.utils.last_view_port_height = view_port.view_height;
                    global.utils.last_surface_width = surface.width;
                    global.utils.last_surface_height = surface.height;
                }
                temp = 'black';
                if (solver_container.style.background !== temp || override_signal) {
                    solver_container.style.background = temp;
                }
                cached_width = window.innerWidth * global.variables.device_pixel_ratio;
                cached_height = window.innerHeight * global.variables.device_pixel_ratio;
                view_port.resize(canvas_aspect_ratio, cached_width, cached_height);
                if (surface.width !== cached_width || override_signal) {
                    surface.width = cached_width;
                }
                if (surface.height !== cached_height || override_signal) {
                    surface.height = cached_height;
                }
                temp = global.TEMPLATES.PIXEL_TEMPLATE.replace('{VALUE}', window.innerWidth);
                if (surface.style.width !== temp || override_signal) {
                    surface.style.width = temp;
                }
                temp = global.TEMPLATES.PIXEL_TEMPLATE.replace('{VALUE}', window.innerHeight);
                if (surface.style.height !== temp || override_signal) {
                    surface.style.height = temp;
                }
                global.utils.resize_w_factor = view_port.view_width / global.utils.last_view_port_width;
                global.utils.resize_h_factor = view_port.view_height / global.utils.last_view_port_height;
                if (MOBILE_MODE) {
                    global.variables.canvas_stroke_width_base = 0.000775 * view_port.view_width;
                    global.variables.canvas_text_size_base = 0.000775 * view_port.view_width;
                }
                else {
                    global.variables.canvas_stroke_width_base = 0.000725 * view_port.view_width;
                    global.variables.canvas_text_size_base = 0.000725 * view_port.view_width;
                }
                try {
                    temp = 'copy';
                    if (ctx.globalCompositeOperation !== temp || override_signal) {
                        ctx.globalCompositeOperation = temp;
                    }
                    if (ctx.imageSmoothingEnabled || override_signal) {
                        ctx.imageSmoothingEnabled = false;
                    }
                    //@ts-expect-error
                    if (ctx.mozImageSmoothingEnabled || override_signal) {
                        //@ts-expect-error
                        ctx.mozImageSmoothingEnabled = false;
                    }
                    //@ts-expect-error
                    if (ctx.oImageSmoothingEnabled || override_signal) {
                        //@ts-expect-error
                        ctx.oImageSmoothingEnabled = false;
                    }
                    //@ts-expect-error
                    if (ctx.webkitImageSmoothingEnabled || override_signal) {
                        //@ts-expect-error
                        ctx.webkitImageSmoothingEnabled = false;
                    }
                    //@ts-expect-error
                    if (ctx.msImageSmoothingEnabled || override_signal) {
                        //@ts-expect-error
                        ctx.msImageSmoothingEnabled = false;
                    }
                }
                catch (e) { }
                global.variables.canvas_stroke_width_1 = global.variables.canvas_stroke_width_base * 2.25;
                global.variables.canvas_stroke_width_2 = global.variables.canvas_stroke_width_base * 2.65;
                global.variables.canvas_stroke_width_3 = global.variables.canvas_stroke_width_base * 9;
                global.variables.canvas_stroke_width_4 = global.variables.canvas_stroke_width_base * 16;
                global.variables.canvas_stroke_width_5 = global.variables.canvas_stroke_width_base * 21;
                global.variables.canvas_stroke_width_6 = global.variables.canvas_stroke_width_base * 43;
                global.variables.canvas_text_size_1 = global.variables.canvas_text_size_base * 2.25;
                global.variables.canvas_text_size_2 = global.variables.canvas_text_size_base * 2.65;
                global.variables.canvas_text_size_3 = global.variables.canvas_text_size_base * 9;
                global.variables.canvas_text_size_4 = global.variables.canvas_text_size_base * 16;
                global.variables.canvas_text_size_5 = global.variables.canvas_text_size_base * 21;
                global.variables.canvas_text_size_6 = global.variables.canvas_text_size_base * 43;
                global.flags.flag_build_element = true;
                global.variables.flag_build_counter = 0;
                virtual_surface.resize(cached_width, cached_height, override_signal);
                global.flags.flag_resize_event = true;
                canvas.on_resize();
                temp = 'hidden';
                if (surface.style.backfaceVisibility !== temp || override_signal) {
                    surface.style.backfaceVisibility = temp;
                }
                if (surface.style.visibility === temp || override_signal) {
                    surface.style.visibility = 'visible';
                }
            }
        }
        catch (e) { }
    }
    function mouse_down(mouse_event) {
        mouse_event.preventDefault();
        if (global.variables.system_initialization['completed']) {
            if (MOBILE_MODE === false) {
                global.variables.mouse_x = mouse_event.clientX * global.variables.device_pixel_ratio;
                global.variables.mouse_y = mouse_event.clientY * global.variables.device_pixel_ratio;
            }
            else {
                //@ts-ignore
                touch = mouse_event.touches[0];
                global.variables.mouse_x = touch.clientX * global.variables.device_pixel_ratio;
                global.variables.mouse_y = touch.clientY * global.variables.device_pixel_ratio;
            }
            if (bottom_menu.handle_file_explorer()) {
                if (!global.variables.user_file_selected) {
                    file_reader.click();
                }
                else {
                    toast.set_text(language_manager.TRY_AGAIN[global.CONSTANTS.LANGUAGES[global.variables.language_index]]);
                    toast.show(global.COLORS.GENERAL_RED_COLOR);
                }
            }
            else {
                if (global.variables.mouse_x >= view_port.left && global.variables.mouse_x <= view_port.right && global.variables.mouse_y >= view_port.top && global.variables.mouse_y <= view_port.bottom) {
                    global.flags.flag_mouse_down_event = true;
                    global.events.mouse_down_event_queue.push(mouse_event);
                }
            }
        }
    }
    function mouse_move(mouse_event) {
        mouse_event.preventDefault();
        if (!global.flags.flag_mouse_move_event) {
            if (!MOBILE_MODE) {
                temp_mouse_x = mouse_event.clientX * global.variables.device_pixel_ratio;
                temp_mouse_y = mouse_event.clientY * global.variables.device_pixel_ratio;
                if (temp_mouse_x >= view_port.left && temp_mouse_x <= view_port.right && temp_mouse_y >= view_port.top && temp_mouse_y <= view_port.bottom) {
                    global.flags.flag_mouse_move_event = true;
                    global.events.mouse_move_event = mouse_event;
                }
            }
            else {
                //@ts-expect-error
                touch = mouse_event.touches[0];
                temp_mouse_x = touch.clientX * global.variables.device_pixel_ratio;
                temp_mouse_y = touch.clientY * global.variables.device_pixel_ratio;
                if (temp_mouse_x >= view_port.left && temp_mouse_x <= view_port.right && temp_mouse_y >= view_port.top && temp_mouse_y <= view_port.bottom) {
                    global.flags.flag_mouse_move_event = true;
                    global.events.mouse_move_event = mouse_event;
                }
            }
        }
    }
    function mouse_up(mouse_event) {
        mouse_event.preventDefault();
        global.flags.flag_mouse_up_event = true;
        global.events.mouse_up_event_queue.push(mouse_event);
    }
    function mouse_wheel(mouse_event) {
        if (!global.flags.flag_mouse_wheel_event && !MOBILE_MODE) {
            global.flags.flag_mouse_wheel_event = true;
            global.events.mouse_wheel_event_queue.push(mouse_event);
        }
    }
    function double_click(mouse_event) {
        mouse_event.preventDefault();
        if (!MOBILE_MODE) {
            global.flags.flag_mouse_double_click_event = true;
            global.events.mouse_double_click_event_queue.push(mouse_event);
        }
    }
    function key_down(key_event) {
        key_event.preventDefault();
        if (!MOBILE_MODE) {
            global.flags.flag_key_down_event = true;
            global.events.key_down_event_queue.push({
                event: key_event,
                alt: key_event.getModifierState('Alt'),
                shift: key_event.getModifierState('Shift'),
                ctrl: key_event.getModifierState('Control'),
                caps: key_event.getModifierState('CapsLock')
            });
        }
    }
    function key_up(key_event) {
        key_event.preventDefault();
        if (!MOBILE_MODE) {
            global.flags.flag_key_up_event = true;
            global.events.key_up_event_queue.push({
                event: key_event,
                alt: key_event.getModifierState('Alt'),
                shift: key_event.getModifierState('Shift'),
                ctrl: key_event.getModifierState('Control'),
                caps: key_event.getModifierState('CapsLock')
            });
        }
    }
    function resize_components() {
        global.variables.natural_height = 2 * (view_port.view_height * global.settings.WORKSPACE_RATIO_Y);
        if (global.settings.WORKSPACE_PERFECT_SQUARE) {
            global.variables.natural_width = global.variables.natural_height;
        }
        else {
            global.variables.natural_width = 2 * (view_port.view_width * global.settings.WORKSPACE_RATIO_X);
        }
        workspace.workspace_resize();
        reset_zoom();
        menu_bar.resize_menu_bar();
        bottom_menu.resize_bottom_menu();
        element_options.resize();
        multi_select_manager.resize();
        time_step_window.resize_window();
        save_circuit_window.resize_window();
        save_image_window.resize_window();
        element_options_window.resize_window();
        element_options_edit_window.resize_window();
        zoom_window.resize_window();
        settings_window.resize_window();
        confirm_window.resize_window();
        graph_window.resize_window();
        toast.resize_toast();
        on_screen_keyboard.resize_keyboard();
        global.variables.wire_paint.set_stroke_width(global.variables.canvas_stroke_width_1_zoom);
        global.variables.wire_paint.set_text_size(global.variables.canvas_text_size_3_zoom);
        /* #INSERT_METER_RESIZE_TRACE# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        for (var i = voltmeters.length - 1; i > -1; i--) {
            voltmeters[i].resize_meter_trace = true;
        }
        for (var i = ohmmeters.length - 1; i > -1; i--) {
            ohmmeters[i].resize_meter_trace = true;
        }
        for (var i = ammeters.length - 1; i > -1; i--) {
            ammeters[i].resize_meter_trace = true;
        }
        for (var i = wattmeters.length - 1; i > -1; i--) {
            wattmeters[i].resize_meter_trace = true;
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
    function handle_zoom(mouse_event) {
        if (!global.variables.focused) {
            global.variables.x_offset = (global.variables.mouse_x - global.variables.delta_x) / global.variables.workspace_zoom_scale;
            global.variables.y_offset = (global.variables.mouse_y - global.variables.delta_y) / global.variables.workspace_zoom_scale;
            //@ts-ignore
            if (mouse_event.wheelDelta < 0 || mouse_event.detail > 0) {
                if (global.variables.workspace_zoom_scale > global.CONSTANTS.ZOOM_MIN) {
                    global.variables.workspace_zoom_scale /= global.CONSTANTS.ZOOM_FACTOR;
                }
            }
            else {
                if (global.variables.workspace_zoom_scale < global.CONSTANTS.ZOOM_MAX) {
                    global.variables.workspace_zoom_scale *= global.CONSTANTS.ZOOM_FACTOR;
                }
            }
            global.variables.delta_x = global.variables.mouse_x - global.variables.x_offset * global.variables.workspace_zoom_scale;
            global.variables.delta_y = global.variables.mouse_y - global.variables.y_offset * global.variables.workspace_zoom_scale;
            workspace.workspace_zoom();
        }
    }
    function reset_zoom() {
        global.variables.x_offset = 0;
        global.variables.y_offset = 0;
        global.variables.delta_x = workspace.bounds.left;
        global.variables.delta_y = workspace.bounds.top;
    }
    function normal_draw_permissions() {
        if (global.variables.system_initialization['completed']) {
            return (global.flags.flag_resize_event ||
                global.flags.flag_mouse_down_event ||
                global.flags.flag_mouse_move_event ||
                global.flags.flag_mouse_up_event ||
                global.flags.flag_mouse_wheel_event ||
                global.flags.flag_mouse_double_click_event ||
                global.flags.flag_key_up_event ||
                global.flags.flag_key_down_event ||
                global.flags.flag_picture_request ||
                global.flags.flag_simulating ||
                !workspace.flag_draw_to_screen ||
                toast.draw_text ||
                !global.variables.system_initialization['completed']);
        }
        else {
            return (global.flags.flag_resize_event ||
                global.flags.flag_mouse_down_event ||
                global.flags.flag_mouse_move_event ||
                global.flags.flag_mouse_up_event ||
                global.flags.flag_mouse_wheel_event ||
                global.flags.flag_mouse_double_click_event ||
                global.flags.flag_key_up_event ||
                global.flags.flag_key_down_event ||
                global.flags.flag_picture_request ||
                global.flags.flag_simulating ||
                !global.variables.system_initialization['completed']);
        }
    }
    function render() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!global.flags.flag_draw_block) {
                ctx.drawImage(virtual_surface.surface, view_port.left, view_port.top, view_port.view_width, view_port.view_height, view_port.left, view_port.top, view_port.view_width, view_port.view_height);
            }
            canvas.release();
            canvas.clear_xywh(view_port.left, view_port.top, view_port.view_width, view_port.view_height);
            draw();
            if (global.flags.flag_draw_block) {
                global.flags.flag_draw_block = false;
            }
            return null;
        });
    }
    function system_loop() {
        try {
            if (normal_draw_permissions()) {
                global.variables.canvas_draw_counter = 0;
                global.flags.flag_canvas_draw_event = true;
            }
            if (global.flags.flag_canvas_draw_event) {
                if (global.variables.system_initialization['completed']) {
                    temp_draw_signal =
                        !global.flags.flag_simulating ||
                            global.flags.flag_resize_event ||
                            global.flags.flag_mouse_down_event ||
                            global.flags.flag_mouse_move_event ||
                            global.flags.flag_mouse_up_event ||
                            global.flags.flag_mouse_wheel_event ||
                            global.flags.flag_mouse_double_click_event ||
                            global.flags.flag_key_up_event ||
                            global.flags.flag_key_down_event ||
                            global.flags.flag_picture_request ||
                            !workspace.flag_draw_to_screen ||
                            toast.draw_text;
                }
                else {
                    temp_draw_signal =
                        !global.flags.flag_simulating ||
                            global.flags.flag_resize_event ||
                            global.flags.flag_mouse_down_event ||
                            global.flags.flag_mouse_move_event ||
                            global.flags.flag_mouse_up_event ||
                            global.flags.flag_mouse_wheel_event ||
                            global.flags.flag_mouse_double_click_event ||
                            global.flags.flag_key_up_event ||
                            global.flags.flag_key_down_event ||
                            global.flags.flag_picture_request ||
                            !workspace.flag_draw_to_screen;
                }
                global.variables.last_selected = global.variables.selected;
                update().then(function () { });
                if (global.variables.last_selected !== global.variables.selected) {
                    wire_manager.reset_wire_builder();
                }
                if (global.flags.flag_force_resize_event) {
                    global.flags.flag_build_element = true;
                    global.variables.flag_build_counter = 0;
                    global.flags.flag_force_resize_event = false;
                    global.flags.flag_draw_block = true;
                    resize_canvas(true);
                }
                fps_div ^= 1;
                if (((fps_div === 1 || temp_draw_signal) && global.flags.flag_simulating) || !global.flags.flag_simulating) {
                    if (global.variables.system_initialization['completed']) {
                        if ((global.flags.flag_simulating && global.flags.flag_canvas_draw_request) || temp_draw_signal) {
                            if (!global.flags.flag_on_restore_event) {
                                render().then(function () { });
                            }
                            if (global.flags.flag_canvas_draw_request) {
                                if (global.variables.flag_canvas_draw_request_counter++ >= global.CONSTANTS.CANVAS_DRAW_REQUEST_COUNTER_MAX) {
                                    global.variables.flag_canvas_draw_request_counter = 0;
                                    global.flags.flag_canvas_draw_request = false;
                                }
                            }
                        }
                    }
                }
                if (global.flags.flag_build_element) {
                    if (global.variables.flag_build_counter++ >= global.CONSTANTS.SIGNAL_BUILD_COUNTER_MAX) {
                        global.flags.flag_build_element = false;
                        global.variables.flag_build_counter = 0;
                    }
                }
                if (global.flags.flag_wire_deleted) {
                    if (global.variables.flag_wire_deleted_counter++ >= global.CONSTANTS.SIGNAL_WIRE_DELETED_COUNTER_MAX) {
                        global.flags.flag_wire_deleted = false;
                        global.variables.flag_wire_deleted_counter = 0;
                    }
                }
                if (global.variables.canvas_draw_counter++ > global.CONSTANTS.CANVAS_REDRAW_MAX) {
                    global.variables.canvas_draw_counter = 0;
                    global.flags.flag_canvas_draw_event = false;
                }
            }
        }
        catch (e) {
        }
    }
    function update() {
        return __awaiter(this, void 0, void 0, function* () {
            if (global.variables.system_initialization['completed']) {
                engine_functions.file_manager();
                global.variables.component_translating = false;
                if (MOBILE_MODE) {
                    if (global.flags.flag_on_restore_event) {
                        global.flags.flag_build_element = true;
                        window.JsInterface.onRestore();
                        global.flags.flag_on_restore_event = false;
                    }
                }
                if (global.events.mouse_down_event_queue.length > 0) {
                    fifo_index = global.events.mouse_down_event_queue.length - 1;
                    global.events.mouse_down_event = global.events.mouse_down_event_queue[fifo_index];
                    handle_mouse_down();
                    global.events.mouse_down_event_queue.splice(fifo_index, 1);
                    if (global.events.mouse_down_event_queue.length === 0) {
                        global.flags.flag_mouse_down_event = false;
                    }
                    global.flags.flag_canvas_draw_request = true;
                    global.variables.flag_canvas_draw_request_counter = 0;
                }
                if (global.flags.flag_mouse_move_event) {
                    handle_mouse_move();
                    global.flags.flag_canvas_draw_request = true;
                    global.variables.flag_canvas_draw_request_counter = 0;
                    global.flags.flag_mouse_move_event = false;
                }
                if (global.events.mouse_up_event_queue.length > 0) {
                    fifo_index = global.events.mouse_up_event_queue.length - 1;
                    global.events.mouse_up_event = global.events.mouse_up_event_queue[fifo_index];
                    handle_mouse_up();
                    global.events.mouse_up_event_queue.splice(fifo_index, 1);
                    if (global.events.mouse_up_event_queue.length === 0) {
                        global.flags.flag_mouse_up_event = false;
                        global.variables.is_dragging = false;
                    }
                    global.flags.flag_canvas_draw_request = true;
                    global.variables.flag_canvas_draw_request_counter = 0;
                }
                if (global.events.mouse_double_click_event_queue.length > 0) {
                    fifo_index = global.events.mouse_double_click_event_queue.length - 1;
                    global.events.mouse_double_click_event = global.events.mouse_double_click_event_queue[fifo_index];
                    handle_double_click();
                    global.events.mouse_double_click_event_queue.splice(fifo_index, 1);
                    if (global.events.mouse_double_click_event_queue.length === 0) {
                        global.flags.flag_mouse_double_click_event = false;
                    }
                    global.flags.flag_canvas_draw_request = true;
                    global.variables.flag_canvas_draw_request_counter = 0;
                }
                if (global.events.mouse_wheel_event_queue.length > 0) {
                    fifo_index = global.events.mouse_wheel_event_queue.length - 1;
                    global.events.mouse_wheel_event = global.events.mouse_wheel_event_queue[fifo_index];
                    handle_mouse_wheel();
                    global.events.mouse_wheel_event_queue.splice(fifo_index, 1);
                    if (global.events.mouse_wheel_event_queue.length === 0) {
                        global.flags.flag_mouse_wheel_event = false;
                    }
                    global.flags.flag_canvas_draw_request = true;
                    global.variables.flag_canvas_draw_request_counter = 0;
                    global.variables.is_dragging = false;
                }
                if (global.flags.flag_resize_event) {
                    watermark_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
                    watermark_paint.set_text_size(global.variables.canvas_text_size_4_zoom);
                    web_link_text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
                    web_link_text_paint.set_text_size(global.variables.canvas_text_size_5_zoom);
                    drag_text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
                    drag_text_paint.set_text_size(global.variables.canvas_text_size_5_zoom);
                    drag_fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
                    drag_fill_paint.set_text_size(global.variables.canvas_text_size_5_zoom);
                    global.variables.mouse_x = 0;
                    global.variables.mouse_y = 0;
                    resize_components();
                    if (!sizing_initialized) {
                        sizing_initialized = true;
                    }
                    global.flags.flag_resize_event = false;
                }
                if (global.events.key_down_event_queue.length > 0) {
                    fifo_index = global.events.key_down_event_queue.length - 1;
                    global.events.key_down_event = global.events.key_down_event_queue[fifo_index];
                    handle_key_down();
                    global.events.key_down_event_queue.splice(fifo_index, 1);
                    if (global.events.key_down_event_queue.length === 0) {
                        global.flags.flag_key_down_event = false;
                    }
                    global.flags.flag_canvas_draw_request = true;
                    global.variables.flag_canvas_draw_request_counter = 0;
                }
                if (global.events.key_up_event_queue.length > 0) {
                    fifo_index = global.events.key_up_event_queue.length - 1;
                    global.events.key_up_event = global.events.key_up_event_queue[fifo_index];
                    handle_key_up();
                    global.events.key_up_event_queue.splice(fifo_index, 1);
                    if (global.events.key_up_event_queue.length === 0) {
                        global.events.key_down_event_queue = [];
                        global.flags.flag_key_up_event = false;
                    }
                    global.flags.flag_canvas_draw_request = true;
                    global.variables.flag_canvas_draw_request_counter = 0;
                }
                if (global.variables.mouse_keyboard_lock) {
                    global.variables.mouse_keyboard_lock = false;
                }
                if (global.flags.flag_idle &&
                    !global.flags.flag_save_image &&
                    !global.flags.flag_save_circuit &&
                    !global.flags.flag_zoom &&
                    !global.flags.flag_element_options &&
                    !global.flags.flag_element_options_edit &&
                    !global.flags.flag_select_timestep &&
                    !global.flags.flag_select_settings &&
                    !global.flags.flag_remove_all) {
                    simulation_manager.simulate();
                    if (simulation_manager.simulation_step !== 0) {
                        /* #INSERT_GENERATE_UPDATE# */
                        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
                        for (var i = resistors.length - 1; i > -1; i--) {
                            resistors[i].update();
                        }
                        for (var i = capacitors.length - 1; i > -1; i--) {
                            capacitors[i].update();
                        }
                        for (var i = inductors.length - 1; i > -1; i--) {
                            inductors[i].update();
                        }
                        for (var i = grounds.length - 1; i > -1; i--) {
                            grounds[i].update();
                        }
                        for (var i = dcsources.length - 1; i > -1; i--) {
                            dcsources[i].update();
                        }
                        for (var i = dccurrents.length - 1; i > -1; i--) {
                            dccurrents[i].update();
                        }
                        for (var i = acsources.length - 1; i > -1; i--) {
                            acsources[i].update();
                        }
                        for (var i = accurrents.length - 1; i > -1; i--) {
                            accurrents[i].update();
                        }
                        for (var i = squarewaves.length - 1; i > -1; i--) {
                            squarewaves[i].update();
                        }
                        for (var i = sawwaves.length - 1; i > -1; i--) {
                            sawwaves[i].update();
                        }
                        for (var i = trianglewaves.length - 1; i > -1; i--) {
                            trianglewaves[i].update();
                        }
                        for (var i = constants.length - 1; i > -1; i--) {
                            constants[i].update();
                        }
                        for (var i = wires.length - 1; i > -1; i--) {
                            wires[i].update();
                        }
                        for (var i = nets.length - 1; i > -1; i--) {
                            nets[i].update();
                        }
                        for (var i = notes.length - 1; i > -1; i--) {
                            notes[i].update();
                        }
                        for (var i = rails.length - 1; i > -1; i--) {
                            rails[i].update();
                        }
                        for (var i = voltmeters.length - 1; i > -1; i--) {
                            voltmeters[i].update();
                        }
                        for (var i = ohmmeters.length - 1; i > -1; i--) {
                            ohmmeters[i].update();
                        }
                        for (var i = ammeters.length - 1; i > -1; i--) {
                            ammeters[i].update();
                        }
                        for (var i = wattmeters.length - 1; i > -1; i--) {
                            wattmeters[i].update();
                        }
                        for (var i = fuses.length - 1; i > -1; i--) {
                            fuses[i].update();
                        }
                        for (var i = spsts.length - 1; i > -1; i--) {
                            spsts[i].update();
                        }
                        for (var i = spdts.length - 1; i > -1; i--) {
                            spdts[i].update();
                        }
                        for (var i = potentiometers.length - 1; i > -1; i--) {
                            potentiometers[i].update();
                        }
                        for (var i = dffs.length - 1; i > -1; i--) {
                            dffs[i].update();
                        }
                        for (var i = vsats.length - 1; i > -1; i--) {
                            vsats[i].update();
                        }
                        for (var i = adders.length - 1; i > -1; i--) {
                            adders[i].update();
                        }
                        for (var i = subtractors.length - 1; i > -1; i--) {
                            subtractors[i].update();
                        }
                        for (var i = multipliers.length - 1; i > -1; i--) {
                            multipliers[i].update();
                        }
                        for (var i = dividers.length - 1; i > -1; i--) {
                            dividers[i].update();
                        }
                        for (var i = gains.length - 1; i > -1; i--) {
                            gains[i].update();
                        }
                        for (var i = absvals.length - 1; i > -1; i--) {
                            absvals[i].update();
                        }
                        for (var i = vcsws.length - 1; i > -1; i--) {
                            vcsws[i].update();
                        }
                        for (var i = vcvss.length - 1; i > -1; i--) {
                            vcvss[i].update();
                        }
                        for (var i = vccss.length - 1; i > -1; i--) {
                            vccss[i].update();
                        }
                        for (var i = cccss.length - 1; i > -1; i--) {
                            cccss[i].update();
                        }
                        for (var i = ccvss.length - 1; i > -1; i--) {
                            ccvss[i].update();
                        }
                        for (var i = opamps.length - 1; i > -1; i--) {
                            opamps[i].update();
                        }
                        for (var i = adcs.length - 1; i > -1; i--) {
                            adcs[i].update();
                        }
                        for (var i = dacs.length - 1; i > -1; i--) {
                            dacs[i].update();
                        }
                        for (var i = sandhs.length - 1; i > -1; i--) {
                            sandhs[i].update();
                        }
                        for (var i = pwms.length - 1; i > -1; i--) {
                            pwms[i].update();
                        }
                        for (var i = integrators.length - 1; i > -1; i--) {
                            integrators[i].update();
                        }
                        for (var i = differentiators.length - 1; i > -1; i--) {
                            differentiators[i].update();
                        }
                        for (var i = lowpasses.length - 1; i > -1; i--) {
                            lowpasses[i].update();
                        }
                        for (var i = highpasses.length - 1; i > -1; i--) {
                            highpasses[i].update();
                        }
                        for (var i = relays.length - 1; i > -1; i--) {
                            relays[i].update();
                        }
                        for (var i = pids.length - 1; i > -1; i--) {
                            pids[i].update();
                        }
                        for (var i = luts.length - 1; i > -1; i--) {
                            luts[i].update();
                        }
                        for (var i = vcrs.length - 1; i > -1; i--) {
                            vcrs[i].update();
                        }
                        for (var i = vccas.length - 1; i > -1; i--) {
                            vccas[i].update();
                        }
                        for (var i = vcls.length - 1; i > -1; i--) {
                            vcls[i].update();
                        }
                        for (var i = grts.length - 1; i > -1; i--) {
                            grts[i].update();
                        }
                        for (var i = tptzs.length - 1; i > -1; i--) {
                            tptzs[i].update();
                        }
                        for (var i = transformers.length - 1; i > -1; i--) {
                            transformers[i].update();
                        }
                        /* <!-- END AUTOMATICALLY GENERATED !--> */
                    }
                    menu_bar.update();
                    bottom_menu.update();
                    element_options.update();
                    history_manager.watch();
                    wire_manager.watch();
                    if (!MOBILE_MODE) {
                        if (last_webpage_document_title !== global.variables.user_file.title) {
                            webpage_document_title.innerHTML = global.variables.user_file.title;
                            last_webpage_document_title = global.variables.user_file.title;
                        }
                    }
                }
            }
            else {
                initialize(global.variables.system_initialization['step']);
                global.variables.system_initialization['step']++;
                if (global.variables.system_initialization['step'] >= global.variables.system_initialization['max']) {
                    if (MOBILE_MODE) {
                        global.flags.flag_on_restore_event = true;
                    }
                    global.variables.system_initialization['step'] = 0;
                    global.variables.system_initialization['completed'] = true;
                    global.flags.flag_build_element = true;
                }
            }
        });
    }
    function refactor_sizes() {
        global.variables.canvas_stroke_width_1_zoom = global.variables.canvas_stroke_width_base * 2.25 * global.variables.workspace_zoom_scale;
        global.variables.canvas_stroke_width_2_zoom = global.variables.canvas_stroke_width_base * 2.65 * global.variables.workspace_zoom_scale;
        global.variables.canvas_stroke_width_3_zoom = global.variables.canvas_stroke_width_base * 9 * global.variables.workspace_zoom_scale;
        global.variables.canvas_stroke_width_4_zoom = global.variables.canvas_stroke_width_base * 16 * global.variables.workspace_zoom_scale;
        global.variables.canvas_stroke_width_5_zoom = global.variables.canvas_stroke_width_base * 21 * global.variables.workspace_zoom_scale;
        global.variables.canvas_stroke_width_6_zoom = global.variables.canvas_stroke_width_base * 43 * global.variables.workspace_zoom_scale;
        global.variables.canvas_text_size_1_zoom = global.variables.canvas_text_size_base * 2.25 * global.variables.workspace_zoom_scale;
        global.variables.canvas_text_size_2_zoom = global.variables.canvas_text_size_base * 2.65 * global.variables.workspace_zoom_scale;
        global.variables.canvas_text_size_3_zoom = global.variables.canvas_text_size_base * 9 * global.variables.workspace_zoom_scale;
        global.variables.canvas_text_size_4_zoom = global.variables.canvas_text_size_base * 16 * global.variables.workspace_zoom_scale;
        global.variables.canvas_text_size_5_zoom = global.variables.canvas_text_size_base * 21 * global.variables.workspace_zoom_scale;
        global.variables.canvas_text_size_6_zoom = global.variables.canvas_text_size_base * 43 * global.variables.workspace_zoom_scale;
        web_link_text_paint.set_text_size(global.variables.canvas_text_size_5_zoom);
        drag_text_paint.set_text_size(global.variables.canvas_text_size_5_zoom);
    }
    function draw() {
        refactor_sizes();
        engine_functions.image_manager();
        if (!global.flags.flag_picture_request) {
            if (!MOBILE_MODE) {
                if (global.flags.flag_idle &&
                    !global.flags.flag_save_image &&
                    !global.flags.flag_save_circuit &&
                    !global.flags.flag_zoom &&
                    !global.flags.flag_element_options &&
                    !global.flags.flag_element_options_edit &&
                    !global.flags.flag_select_element &&
                    !global.flags.flag_select_timestep &&
                    !global.flags.flag_select_settings &&
                    !global.flags.flag_remove_all &&
                    !global.flags.flag_menu_element_toolbox &&
                    !global.flags.flag_graph) {
                    multi_select_manager.reset_enveloping_bounds();
                }
                if (global.flags.flag_build_element) {
                    node_space_x_cache = 0.29375 * global.variables.node_space_x;
                    node_space_y_cache = 0.29375 * global.variables.node_space_y;
                    mult_node_space_x_cache = 1.75 * node_space_x_cache;
                    mult_node_space_y_cache = 1.75 * node_space_y_cache;
                    node_length = nodes.length;
                    for (var i = 0; i < node_length; i += 2) {
                        nodes[i].resize(node_space_x_cache, node_space_y_cache, mult_node_space_x_cache, mult_node_space_y_cache);
                        nodes[i + 1].resize(node_space_x_cache, node_space_y_cache, mult_node_space_x_cache, mult_node_space_y_cache);
                        nodes[node_length - 1 - i].resize(node_space_x_cache, node_space_y_cache, mult_node_space_x_cache, mult_node_space_y_cache);
                        nodes[node_length - 2 - i].resize(node_space_x_cache, node_space_y_cache, mult_node_space_x_cache, mult_node_space_y_cache);
                        if (node_length - 2 - i === i + 2) {
                            break;
                        }
                    }
                }
                if (global.CONSTANTS.DEVELOPER_MODE) {
                    node_length = nodes.length;
                    for (var i = 0; i < node_length; i += 2) {
                        nodes[i].draw(canvas);
                        nodes[i + 1].draw(canvas);
                        nodes[node_length - 1 - i].draw(canvas);
                        nodes[node_length - 2 - i].draw(canvas);
                        if (node_length - 2 - i === i + 2) {
                            break;
                        }
                    }
                }
                global.variables.element_on_board = false;
                global.variables.wire_line_buffer = [];
                global.variables.wire_line_buffer_index = 0;
                workspace.workspace_draw(canvas);
                engine_functions.draw_unselected_components(canvas);
                engine_functions.draw_wires(canvas);
                engine_functions.draw_selected_components(canvas);
                engine_functions.draw_meter_traces(canvas);
                if (global.variables.wire_builder['step'] > 0) {
                    global.variables.node_line_buffer = [];
                    global.variables.node_line_buffer_index = 0;
                    node_length = nodes.length;
                    for (var i = 0; i < node_length; i += 2) {
                        nodes[i].draw(canvas);
                        nodes[i + 1].draw(canvas);
                        nodes[node_length - 1 - i].draw(canvas);
                        nodes[node_length - 2 - i].draw(canvas);
                        if (node_length - 2 - i === i + 2) {
                            break;
                        }
                    }
                    if (global.variables.wire_builder['n1'] > -1 && global.variables.wire_builder['n1'] < global.settings.MAXNODES) {
                        canvas.draw_line_buffer(global.variables.node_line_buffer, nodes[global.variables.wire_builder['n1']].node_line_paint);
                        canvas.draw_rect2(nodes[global.variables.wire_builder['n1']].bounds, nodes[global.variables.wire_builder['n1']].node_fill_paint);
                    }
                }
                if (global.flags.flag_add_element) {
                    drag_padding = workspace.bounds.get_width() * 0.025;
                    if (!global.variables.element_on_board) {
                        if (view_port.left <= workspace.bounds.left || view_port.top <= workspace.bounds.top || view_port.right >= workspace.bounds.right || view_port.bottom >= workspace.bounds.bottom) {
                            canvas.draw_rect(workspace.bounds.left + drag_padding, workspace.bounds.top + drag_padding, workspace.bounds.right - drag_padding, workspace.bounds.bottom - drag_padding, drag_fill_paint);
                            canvas.draw_text(language_manager.DRAG_AND_DROP[global.CONSTANTS.LANGUAGES[global.variables.language_index]], workspace.bounds.get_center_x(), workspace.bounds.get_center_y(), drag_text_paint);
                        }
                        else {
                            canvas.draw_rect(view_port.left + drag_padding, view_port.top + drag_padding, view_port.right - drag_padding, view_port.bottom - drag_padding, drag_fill_paint);
                            canvas.draw_text(language_manager.DRAG_AND_DROP[global.CONSTANTS.LANGUAGES[global.variables.language_index]], view_port.center_x, view_port.center_y, drag_text_paint);
                        }
                    }
                }
                else {
                    if (!global.variables.element_on_board &&
                        DESKTOP_MODE &&
                        !global.flags.flag_select_timestep &&
                        !global.flags.flag_select_settings &&
                        !global.flags.flag_graph &&
                        !global.flags.flag_zoom &&
                        !global.flags.flag_remove_all &&
                        !global.flags.flag_save_circuit &&
                        !global.flags.flag_save_image &&
                        sizing_initialized) {
                        canvas.draw_text(language_manager.WEB_LINK, workspace.bounds.get_center_x(), workspace.bounds.get_center_y(), web_link_text_paint);
                    }
                    if (!global.variables.element_on_board &&
                        !DESKTOP_MODE &&
                        !MOBILE_MODE &&
                        !global.flags.flag_select_timestep &&
                        !global.flags.flag_select_settings &&
                        !global.flags.flag_graph &&
                        !global.flags.flag_zoom &&
                        !global.flags.flag_remove_all &&
                        !global.flags.flag_save_circuit &&
                        !global.flags.flag_save_image &&
                        sizing_initialized) {
                        canvas.draw_text(language_manager.APP_LINK, workspace.bounds.get_center_x(), workspace.bounds.get_center_y(), web_link_text_paint);
                    }
                }
                multi_select_manager.draw_bounds(canvas);
                element_options.draw_options(canvas);
                menu_bar.draw_menu_bar(canvas);
                bottom_menu.draw_bottom_menu(canvas);
                time_step_window.draw_window(canvas);
                save_circuit_window.draw_window(canvas);
                save_image_window.draw_window(canvas);
                element_options_window.draw_window(canvas);
                element_options_edit_window.draw_window(canvas);
                zoom_window.draw_window(canvas);
                settings_window.draw_window(canvas);
                confirm_window.draw_window(canvas);
                graph_window.draw_window(canvas);
                toast.draw_toast(canvas);
            }
            else {
                if (global.flags.flag_idle &&
                    !global.flags.flag_save_image &&
                    !global.flags.flag_save_circuit &&
                    !global.flags.flag_zoom &&
                    !global.flags.flag_element_options &&
                    !global.flags.flag_element_options_edit &&
                    !global.flags.flag_select_timestep &&
                    !global.flags.flag_select_settings &&
                    !global.flags.flag_remove_all) {
                    workspace.workspace_draw(canvas);
                    if (!global.flags.flag_graph) {
                        if (global.flags.flag_build_element) {
                            node_space_x_cache = 0.29375 * global.variables.node_space_x;
                            node_space_y_cache = 0.29375 * global.variables.node_space_y;
                            mult_node_space_x_cache = 1.75 * node_space_x_cache;
                            mult_node_space_y_cache = 1.75 * node_space_y_cache;
                            node_length = nodes.length;
                            for (var i = 0; i < node_length; i += 2) {
                                nodes[i].resize(node_space_x_cache, node_space_y_cache, mult_node_space_x_cache, mult_node_space_y_cache);
                                nodes[i + 1].resize(node_space_x_cache, node_space_y_cache, mult_node_space_x_cache, mult_node_space_y_cache);
                                nodes[node_length - 1 - i].resize(node_space_x_cache, node_space_y_cache, mult_node_space_x_cache, mult_node_space_y_cache);
                                nodes[node_length - 2 - i].resize(node_space_x_cache, node_space_y_cache, mult_node_space_x_cache, mult_node_space_y_cache);
                                if (node_length - 2 - i === i + 2) {
                                    break;
                                }
                            }
                        }
                        if (global.CONSTANTS.DEVELOPER_MODE) {
                            node_length = nodes.length;
                            for (var i = 0; i < node_length; i += 2) {
                                nodes[i].draw(canvas);
                                nodes[i + 1].draw(canvas);
                                nodes[node_length - 1 - i].draw(canvas);
                                nodes[node_length - 2 - i].draw(canvas);
                                if (node_length - 2 - i === i + 2) {
                                    break;
                                }
                            }
                        }
                        global.variables.element_on_board = false;
                        global.variables.wire_line_buffer = [];
                        global.variables.wire_line_buffer_index = 0;
                        engine_functions.draw_unselected_components(canvas);
                        engine_functions.draw_wires(canvas);
                        engine_functions.draw_selected_components(canvas);
                        engine_functions.draw_meter_traces(canvas);
                        if (global.variables.wire_builder['step'] > 0) {
                            global.variables.node_line_buffer = [];
                            global.variables.node_line_buffer_index = 0;
                            node_length = nodes.length;
                            for (var i = 0; i < node_length; i += 2) {
                                nodes[i].draw(canvas);
                                nodes[i + 1].draw(canvas);
                                nodes[node_length - 1 - i].draw(canvas);
                                nodes[node_length - 2 - i].draw(canvas);
                                if (node_length - 2 - i === i + 2) {
                                    break;
                                }
                            }
                            if (global.variables.wire_builder['n1'] > -1 && global.variables.wire_builder['n1'] < global.settings.MAXNODES) {
                                canvas.draw_line_buffer(global.variables.node_line_buffer, nodes[global.variables.wire_builder['n1']].node_line_paint);
                                canvas.draw_rect2(nodes[global.variables.wire_builder['n1']].bounds, nodes[global.variables.wire_builder['n1']].node_fill_paint);
                            }
                        }
                        if (global.flags.flag_add_element) {
                            drag_padding = workspace.bounds.get_width() * 0.025;
                            if (!global.variables.element_on_board) {
                                if (view_port.left <= workspace.bounds.left || view_port.top <= workspace.bounds.top || view_port.right >= workspace.bounds.right || view_port.bottom >= workspace.bounds.bottom) {
                                    canvas.draw_rect(workspace.bounds.left + drag_padding, workspace.bounds.top + drag_padding, workspace.bounds.right - drag_padding, workspace.bounds.bottom - drag_padding, drag_fill_paint);
                                    canvas.draw_text(language_manager.DRAG_AND_DROP[global.CONSTANTS.LANGUAGES[global.variables.language_index]], workspace.bounds.get_center_x(), workspace.bounds.get_center_y(), drag_text_paint);
                                }
                                else {
                                    canvas.draw_rect(view_port.left + drag_padding, view_port.top + drag_padding, view_port.right - drag_padding, view_port.bottom - drag_padding, drag_fill_paint);
                                    canvas.draw_text(language_manager.DRAG_AND_DROP[global.CONSTANTS.LANGUAGES[global.variables.language_index]], view_port.center_x, view_port.center_y, drag_text_paint);
                                }
                            }
                        }
                        else {
                            if (!global.variables.element_on_board &&
                                !global.flags.flag_select_timestep &&
                                !global.flags.flag_select_settings &&
                                !global.flags.flag_graph &&
                                !global.flags.flag_zoom &&
                                !global.flags.flag_remove_all &&
                                !global.flags.flag_save_circuit &&
                                !global.flags.flag_save_image &&
                                sizing_initialized) {
                                canvas.draw_text(language_manager.WEB_LINK, workspace.bounds.get_center_x(), workspace.bounds.get_center_y(), web_link_text_paint);
                            }
                        }
                        element_options.draw_options(canvas);
                        bottom_menu.draw_bottom_menu(canvas);
                    }
                    menu_bar.draw_menu_bar(canvas);
                }
                time_step_window.draw_window(canvas);
                save_circuit_window.draw_window(canvas);
                save_image_window.draw_window(canvas);
                element_options_window.draw_window(canvas);
                element_options_edit_window.draw_window(canvas);
                zoom_window.draw_window(canvas);
                settings_window.draw_window(canvas);
                confirm_window.draw_window(canvas);
                graph_window.draw_window(canvas);
                on_screen_keyboard.draw_keyboard(canvas);
                toast.draw_toast(canvas);
            }
        }
        if (global.CONSTANTS.DEVELOPER_MODE) {
            canvas.draw_circle(global.variables.mouse_x, global.variables.mouse_y, 20, watermark_paint);
            canvas.draw_text(global.variables.mouse_x + ', ' + global.variables.mouse_y, global.variables.mouse_x, global.variables.mouse_y + 50, watermark_paint);
        }
        view_port.draw_viewport(canvas);
    }
    function handle_mouse_down() {
        global.variables.component_touched = false;
        if (MOBILE_MODE === false) {
            global.variables.mouse_x = global.events.mouse_down_event.clientX * global.variables.device_pixel_ratio;
            global.variables.mouse_y = global.events.mouse_down_event.clientY * global.variables.device_pixel_ratio;
        }
        else {
            //@ts-expect-error
            touch = global.events.mouse_down_event.touches[0];
            global.variables.mouse_x = touch.clientX * global.variables.device_pixel_ratio;
            global.variables.mouse_y = touch.clientY * global.variables.device_pixel_ratio;
        }
        global.variables.last_mouse_x = global.variables.mouse_x;
        global.variables.last_mouse_y = global.variables.mouse_y;
        global.variables.is_touching = true;
        global.variables.mouse_down_x = global.variables.mouse_x;
        global.variables.mouse_down_y = global.variables.mouse_y;
        global.variables.translation_lock = true;
        if (!MOBILE_MODE) {
            if ('button' in global.events.mouse_down_event) {
                global.variables.is_right_click = global.events.mouse_down_event.button === 2;
            }
            else if ('which' in global.events.mouse_down_event) {
                //@ts-ignore
                global.variables.is_right_click = global.events.mouse_down_event.which === 3;
            }
        }
        else {
            global.variables.is_right_click = false;
        }
        if (!global.variables.is_right_click) {
            element_options.mouse_down();
            bottom_menu.mouse_down();
            time_step_window.mouse_down();
            save_circuit_window.mouse_down();
            save_image_window.mouse_down();
            menu_bar.mouse_down();
            element_options_window.mouse_down();
            element_options_edit_window.mouse_down();
            graph_window.mouse_down();
            zoom_window.mouse_down();
            settings_window.mouse_down();
            confirm_window.mouse_down();
            multi_select_manager.mouse_down();
            on_screen_keyboard.mouse_down();
        }
        if (!global.flags.flag_save_image &&
            !global.flags.flag_save_circuit &&
            !global.flags.flag_zoom &&
            !global.flags.flag_element_options &&
            !global.flags.flag_element_options_edit &&
            !global.flags.flag_graph &&
            !global.flags.flag_select_element &&
            !global.flags.flag_select_timestep &&
            !global.flags.flag_select_settings &&
            !global.flags.flag_remove_all &&
            !global.flags.flag_menu_element_toolbox) {
            if (MOBILE_MODE === false) {
                if (global.variables.is_right_click) {
                    global.variables.is_dragging = true;
                    global.variables.temp_is_dragging = global.variables.is_dragging;
                }
            }
            if (!global.variables.is_dragging) {
                /* #INSERT_GENERATE_MOUSE_DOWN# */
                /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
                for (var i = resistors.length - 1; i > -1; i--) {
                    resistors[i].mouse_down();
                }
                for (var i = capacitors.length - 1; i > -1; i--) {
                    capacitors[i].mouse_down();
                }
                for (var i = inductors.length - 1; i > -1; i--) {
                    inductors[i].mouse_down();
                }
                for (var i = grounds.length - 1; i > -1; i--) {
                    grounds[i].mouse_down();
                }
                for (var i = dcsources.length - 1; i > -1; i--) {
                    dcsources[i].mouse_down();
                }
                for (var i = dccurrents.length - 1; i > -1; i--) {
                    dccurrents[i].mouse_down();
                }
                for (var i = acsources.length - 1; i > -1; i--) {
                    acsources[i].mouse_down();
                }
                for (var i = accurrents.length - 1; i > -1; i--) {
                    accurrents[i].mouse_down();
                }
                for (var i = squarewaves.length - 1; i > -1; i--) {
                    squarewaves[i].mouse_down();
                }
                for (var i = sawwaves.length - 1; i > -1; i--) {
                    sawwaves[i].mouse_down();
                }
                for (var i = trianglewaves.length - 1; i > -1; i--) {
                    trianglewaves[i].mouse_down();
                }
                for (var i = constants.length - 1; i > -1; i--) {
                    constants[i].mouse_down();
                }
                for (var i = nets.length - 1; i > -1; i--) {
                    nets[i].mouse_down();
                }
                for (var i = notes.length - 1; i > -1; i--) {
                    notes[i].mouse_down();
                }
                for (var i = rails.length - 1; i > -1; i--) {
                    rails[i].mouse_down();
                }
                for (var i = voltmeters.length - 1; i > -1; i--) {
                    voltmeters[i].mouse_down();
                }
                for (var i = ohmmeters.length - 1; i > -1; i--) {
                    ohmmeters[i].mouse_down();
                }
                for (var i = ammeters.length - 1; i > -1; i--) {
                    ammeters[i].mouse_down();
                }
                for (var i = wattmeters.length - 1; i > -1; i--) {
                    wattmeters[i].mouse_down();
                }
                for (var i = fuses.length - 1; i > -1; i--) {
                    fuses[i].mouse_down();
                }
                for (var i = spsts.length - 1; i > -1; i--) {
                    spsts[i].mouse_down();
                }
                for (var i = spdts.length - 1; i > -1; i--) {
                    spdts[i].mouse_down();
                }
                for (var i = nots.length - 1; i > -1; i--) {
                    nots[i].mouse_down();
                }
                for (var i = diodes.length - 1; i > -1; i--) {
                    diodes[i].mouse_down();
                }
                for (var i = leds.length - 1; i > -1; i--) {
                    leds[i].mouse_down();
                }
                for (var i = zeners.length - 1; i > -1; i--) {
                    zeners[i].mouse_down();
                }
                for (var i = potentiometers.length - 1; i > -1; i--) {
                    potentiometers[i].mouse_down();
                }
                for (var i = ands.length - 1; i > -1; i--) {
                    ands[i].mouse_down();
                }
                for (var i = ors.length - 1; i > -1; i--) {
                    ors[i].mouse_down();
                }
                for (var i = nands.length - 1; i > -1; i--) {
                    nands[i].mouse_down();
                }
                for (var i = nors.length - 1; i > -1; i--) {
                    nors[i].mouse_down();
                }
                for (var i = xors.length - 1; i > -1; i--) {
                    xors[i].mouse_down();
                }
                for (var i = xnors.length - 1; i > -1; i--) {
                    xnors[i].mouse_down();
                }
                for (var i = dffs.length - 1; i > -1; i--) {
                    dffs[i].mouse_down();
                }
                for (var i = vsats.length - 1; i > -1; i--) {
                    vsats[i].mouse_down();
                }
                for (var i = adders.length - 1; i > -1; i--) {
                    adders[i].mouse_down();
                }
                for (var i = subtractors.length - 1; i > -1; i--) {
                    subtractors[i].mouse_down();
                }
                for (var i = multipliers.length - 1; i > -1; i--) {
                    multipliers[i].mouse_down();
                }
                for (var i = dividers.length - 1; i > -1; i--) {
                    dividers[i].mouse_down();
                }
                for (var i = gains.length - 1; i > -1; i--) {
                    gains[i].mouse_down();
                }
                for (var i = absvals.length - 1; i > -1; i--) {
                    absvals[i].mouse_down();
                }
                for (var i = vcsws.length - 1; i > -1; i--) {
                    vcsws[i].mouse_down();
                }
                for (var i = vcvss.length - 1; i > -1; i--) {
                    vcvss[i].mouse_down();
                }
                for (var i = vccss.length - 1; i > -1; i--) {
                    vccss[i].mouse_down();
                }
                for (var i = cccss.length - 1; i > -1; i--) {
                    cccss[i].mouse_down();
                }
                for (var i = ccvss.length - 1; i > -1; i--) {
                    ccvss[i].mouse_down();
                }
                for (var i = opamps.length - 1; i > -1; i--) {
                    opamps[i].mouse_down();
                }
                for (var i = nmosfets.length - 1; i > -1; i--) {
                    nmosfets[i].mouse_down();
                }
                for (var i = pmosfets.length - 1; i > -1; i--) {
                    pmosfets[i].mouse_down();
                }
                for (var i = npns.length - 1; i > -1; i--) {
                    npns[i].mouse_down();
                }
                for (var i = pnps.length - 1; i > -1; i--) {
                    pnps[i].mouse_down();
                }
                for (var i = adcs.length - 1; i > -1; i--) {
                    adcs[i].mouse_down();
                }
                for (var i = dacs.length - 1; i > -1; i--) {
                    dacs[i].mouse_down();
                }
                for (var i = sandhs.length - 1; i > -1; i--) {
                    sandhs[i].mouse_down();
                }
                for (var i = pwms.length - 1; i > -1; i--) {
                    pwms[i].mouse_down();
                }
                for (var i = integrators.length - 1; i > -1; i--) {
                    integrators[i].mouse_down();
                }
                for (var i = differentiators.length - 1; i > -1; i--) {
                    differentiators[i].mouse_down();
                }
                for (var i = lowpasses.length - 1; i > -1; i--) {
                    lowpasses[i].mouse_down();
                }
                for (var i = highpasses.length - 1; i > -1; i--) {
                    highpasses[i].mouse_down();
                }
                for (var i = relays.length - 1; i > -1; i--) {
                    relays[i].mouse_down();
                }
                for (var i = pids.length - 1; i > -1; i--) {
                    pids[i].mouse_down();
                }
                for (var i = luts.length - 1; i > -1; i--) {
                    luts[i].mouse_down();
                }
                for (var i = vcrs.length - 1; i > -1; i--) {
                    vcrs[i].mouse_down();
                }
                for (var i = vccas.length - 1; i > -1; i--) {
                    vccas[i].mouse_down();
                }
                for (var i = vcls.length - 1; i > -1; i--) {
                    vcls[i].mouse_down();
                }
                for (var i = grts.length - 1; i > -1; i--) {
                    grts[i].mouse_down();
                }
                for (var i = tptzs.length - 1; i > -1; i--) {
                    tptzs[i].mouse_down();
                }
                for (var i = transformers.length - 1; i > -1; i--) {
                    transformers[i].mouse_down();
                }
                /* <!-- END AUTOMATICALLY GENERATED !--> */
                for (var i = wires.length - 1; i > -1; i--) {
                    wires[i].mouse_down();
                }
            }
            if (MOBILE_MODE === true) {
                if (global.variables.component_touched === false) {
                    global.variables.is_dragging = true;
                    global.variables.temp_is_dragging = global.variables.is_dragging;
                    global.variables.is_right_click = true;
                }
            }
        }
    }
    function handle_mouse_move() {
        global.variables.last_mouse_x = global.variables.mouse_x;
        global.variables.last_mouse_y = global.variables.mouse_y;
        if (MOBILE_MODE === false) {
            global.variables.mouse_x = global.events.mouse_move_event.clientX * global.variables.device_pixel_ratio;
            global.variables.mouse_y = global.events.mouse_move_event.clientY * global.variables.device_pixel_ratio;
        }
        else {
            //@ts-expect-error
            touch = global.events.mouse_move_event.touches[0];
            global.variables.mouse_x = touch.clientX * global.variables.device_pixel_ratio;
            global.variables.mouse_y = touch.clientY * global.variables.device_pixel_ratio;
        }
        global.variables.dx = -(global.variables.last_mouse_x - global.variables.mouse_x) * global.settings.TRANSLATION_SCALE;
        global.variables.dy = -(global.variables.last_mouse_y - global.variables.mouse_y) * global.settings.TRANSLATION_SCALE;
        if (global.utils.norm(global.variables.mouse_down_x - global.variables.mouse_x, global.variables.mouse_down_y - global.variables.mouse_y) >
            1.0 * Math.min(global.variables.node_space_x, global.variables.node_space_y) &&
            global.variables.translation_lock) {
            global.variables.translation_lock = false;
            global.variables.is_dragging = global.variables.temp_is_dragging;
        }
        if (global.variables.translation_lock) {
            global.variables.is_dragging = false;
        }
        if (!global.flags.flag_save_image &&
            !global.flags.flag_save_circuit &&
            !global.flags.flag_zoom &&
            !global.flags.flag_element_options &&
            !global.flags.flag_element_options_edit &&
            !global.flags.flag_graph &&
            !global.flags.flag_select_element &&
            !global.flags.flag_select_timestep &&
            !global.flags.flag_select_settings &&
            !global.flags.flag_remove_all) {
            if (global.flags.flag_idle && !global.flags.flag_simulating) {
                /* #INSERT_GENERATE_MOUSE_MOVE# */
                /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
                for (var i = resistors.length - 1; i > -1; i--) {
                    resistors[i].mouse_move();
                }
                for (var i = capacitors.length - 1; i > -1; i--) {
                    capacitors[i].mouse_move();
                }
                for (var i = inductors.length - 1; i > -1; i--) {
                    inductors[i].mouse_move();
                }
                for (var i = grounds.length - 1; i > -1; i--) {
                    grounds[i].mouse_move();
                }
                for (var i = dcsources.length - 1; i > -1; i--) {
                    dcsources[i].mouse_move();
                }
                for (var i = dccurrents.length - 1; i > -1; i--) {
                    dccurrents[i].mouse_move();
                }
                for (var i = acsources.length - 1; i > -1; i--) {
                    acsources[i].mouse_move();
                }
                for (var i = accurrents.length - 1; i > -1; i--) {
                    accurrents[i].mouse_move();
                }
                for (var i = squarewaves.length - 1; i > -1; i--) {
                    squarewaves[i].mouse_move();
                }
                for (var i = sawwaves.length - 1; i > -1; i--) {
                    sawwaves[i].mouse_move();
                }
                for (var i = trianglewaves.length - 1; i > -1; i--) {
                    trianglewaves[i].mouse_move();
                }
                for (var i = constants.length - 1; i > -1; i--) {
                    constants[i].mouse_move();
                }
                for (var i = nets.length - 1; i > -1; i--) {
                    nets[i].mouse_move();
                }
                for (var i = notes.length - 1; i > -1; i--) {
                    notes[i].mouse_move();
                }
                for (var i = rails.length - 1; i > -1; i--) {
                    rails[i].mouse_move();
                }
                for (var i = voltmeters.length - 1; i > -1; i--) {
                    voltmeters[i].mouse_move();
                }
                for (var i = ohmmeters.length - 1; i > -1; i--) {
                    ohmmeters[i].mouse_move();
                }
                for (var i = ammeters.length - 1; i > -1; i--) {
                    ammeters[i].mouse_move();
                }
                for (var i = wattmeters.length - 1; i > -1; i--) {
                    wattmeters[i].mouse_move();
                }
                for (var i = fuses.length - 1; i > -1; i--) {
                    fuses[i].mouse_move();
                }
                for (var i = spsts.length - 1; i > -1; i--) {
                    spsts[i].mouse_move();
                }
                for (var i = spdts.length - 1; i > -1; i--) {
                    spdts[i].mouse_move();
                }
                for (var i = nots.length - 1; i > -1; i--) {
                    nots[i].mouse_move();
                }
                for (var i = diodes.length - 1; i > -1; i--) {
                    diodes[i].mouse_move();
                }
                for (var i = leds.length - 1; i > -1; i--) {
                    leds[i].mouse_move();
                }
                for (var i = zeners.length - 1; i > -1; i--) {
                    zeners[i].mouse_move();
                }
                for (var i = potentiometers.length - 1; i > -1; i--) {
                    potentiometers[i].mouse_move();
                }
                for (var i = ands.length - 1; i > -1; i--) {
                    ands[i].mouse_move();
                }
                for (var i = ors.length - 1; i > -1; i--) {
                    ors[i].mouse_move();
                }
                for (var i = nands.length - 1; i > -1; i--) {
                    nands[i].mouse_move();
                }
                for (var i = nors.length - 1; i > -1; i--) {
                    nors[i].mouse_move();
                }
                for (var i = xors.length - 1; i > -1; i--) {
                    xors[i].mouse_move();
                }
                for (var i = xnors.length - 1; i > -1; i--) {
                    xnors[i].mouse_move();
                }
                for (var i = dffs.length - 1; i > -1; i--) {
                    dffs[i].mouse_move();
                }
                for (var i = vsats.length - 1; i > -1; i--) {
                    vsats[i].mouse_move();
                }
                for (var i = adders.length - 1; i > -1; i--) {
                    adders[i].mouse_move();
                }
                for (var i = subtractors.length - 1; i > -1; i--) {
                    subtractors[i].mouse_move();
                }
                for (var i = multipliers.length - 1; i > -1; i--) {
                    multipliers[i].mouse_move();
                }
                for (var i = dividers.length - 1; i > -1; i--) {
                    dividers[i].mouse_move();
                }
                for (var i = gains.length - 1; i > -1; i--) {
                    gains[i].mouse_move();
                }
                for (var i = absvals.length - 1; i > -1; i--) {
                    absvals[i].mouse_move();
                }
                for (var i = vcsws.length - 1; i > -1; i--) {
                    vcsws[i].mouse_move();
                }
                for (var i = vcvss.length - 1; i > -1; i--) {
                    vcvss[i].mouse_move();
                }
                for (var i = vccss.length - 1; i > -1; i--) {
                    vccss[i].mouse_move();
                }
                for (var i = cccss.length - 1; i > -1; i--) {
                    cccss[i].mouse_move();
                }
                for (var i = ccvss.length - 1; i > -1; i--) {
                    ccvss[i].mouse_move();
                }
                for (var i = opamps.length - 1; i > -1; i--) {
                    opamps[i].mouse_move();
                }
                for (var i = nmosfets.length - 1; i > -1; i--) {
                    nmosfets[i].mouse_move();
                }
                for (var i = pmosfets.length - 1; i > -1; i--) {
                    pmosfets[i].mouse_move();
                }
                for (var i = npns.length - 1; i > -1; i--) {
                    npns[i].mouse_move();
                }
                for (var i = pnps.length - 1; i > -1; i--) {
                    pnps[i].mouse_move();
                }
                for (var i = adcs.length - 1; i > -1; i--) {
                    adcs[i].mouse_move();
                }
                for (var i = dacs.length - 1; i > -1; i--) {
                    dacs[i].mouse_move();
                }
                for (var i = sandhs.length - 1; i > -1; i--) {
                    sandhs[i].mouse_move();
                }
                for (var i = pwms.length - 1; i > -1; i--) {
                    pwms[i].mouse_move();
                }
                for (var i = integrators.length - 1; i > -1; i--) {
                    integrators[i].mouse_move();
                }
                for (var i = differentiators.length - 1; i > -1; i--) {
                    differentiators[i].mouse_move();
                }
                for (var i = lowpasses.length - 1; i > -1; i--) {
                    lowpasses[i].mouse_move();
                }
                for (var i = highpasses.length - 1; i > -1; i--) {
                    highpasses[i].mouse_move();
                }
                for (var i = relays.length - 1; i > -1; i--) {
                    relays[i].mouse_move();
                }
                for (var i = pids.length - 1; i > -1; i--) {
                    pids[i].mouse_move();
                }
                for (var i = luts.length - 1; i > -1; i--) {
                    luts[i].mouse_move();
                }
                for (var i = vcrs.length - 1; i > -1; i--) {
                    vcrs[i].mouse_move();
                }
                for (var i = vccas.length - 1; i > -1; i--) {
                    vccas[i].mouse_move();
                }
                for (var i = vcls.length - 1; i > -1; i--) {
                    vcls[i].mouse_move();
                }
                for (var i = grts.length - 1; i > -1; i--) {
                    grts[i].mouse_move();
                }
                for (var i = tptzs.length - 1; i > -1; i--) {
                    tptzs[i].mouse_move();
                }
                for (var i = transformers.length - 1; i > -1; i--) {
                    transformers[i].mouse_move();
                }
                /* <!-- END AUTOMATICALLY GENERATED !--> */
            }
        }
        for (var i = wires.length - 1; i > -1; i--) {
            wires[i].mouse_move();
        }
        menu_bar.mouse_move();
        bottom_menu.mouse_move();
        time_step_window.mouse_move();
        save_circuit_window.mouse_move();
        save_image_window.mouse_move();
        element_options.mouse_move();
        element_options_window.mouse_move();
        element_options_edit_window.mouse_move();
        zoom_window.mouse_move();
        settings_window.mouse_move();
        confirm_window.mouse_move();
        graph_window.mouse_move();
        multi_select_manager.mouse_move();
        if (global.variables.is_dragging) {
            handle_workspace_drag();
        }
    }
    function handle_mouse_up() {
        let temp_translation_lock = global.variables.translation_lock;
        global.variables.translation_lock = true;
        global.variables.mouse_down_x = -1;
        global.variables.mouse_down_y = -1;
        if (MOBILE_MODE === false) {
            global.variables.mouse_x = global.events.mouse_up_event.clientX * global.variables.device_pixel_ratio;
            global.variables.mouse_y = global.events.mouse_up_event.clientY * global.variables.device_pixel_ratio;
        }
        else {
        }
        global.variables.last_mouse_x = global.variables.mouse_x;
        global.variables.last_mouse_y = global.variables.mouse_y;
        global.variables.is_touching = false;
        global.variables.is_dragging = false;
        global.variables.temp_is_dragging = global.variables.is_dragging;
        if (!global.flags.flag_save_image &&
            !global.flags.flag_save_circuit &&
            !global.flags.flag_zoom &&
            !global.flags.flag_element_options &&
            !global.flags.flag_element_options_edit &&
            !global.flags.flag_graph &&
            !global.flags.flag_select_element &&
            !global.flags.flag_select_timestep &&
            !global.flags.flag_select_settings &&
            !global.flags.flag_remove_all) {
            if (!global.variables.component_touched && !global.variables.is_right_click) {
                if (global.variables.wire_builder['n1'] > -1 && global.variables.wire_builder['n1'] < global.settings.MAXNODES) {
                    wire_manager.reset_wire_builder();
                }
            }
            /* #INSERT_GENERATE_MOUSE_UP# */
            /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
            for (var i = resistors.length - 1; i > -1; i--) {
                resistors[i].mouse_up();
            }
            for (var i = capacitors.length - 1; i > -1; i--) {
                capacitors[i].mouse_up();
            }
            for (var i = inductors.length - 1; i > -1; i--) {
                inductors[i].mouse_up();
            }
            for (var i = grounds.length - 1; i > -1; i--) {
                grounds[i].mouse_up();
            }
            for (var i = dcsources.length - 1; i > -1; i--) {
                dcsources[i].mouse_up();
            }
            for (var i = dccurrents.length - 1; i > -1; i--) {
                dccurrents[i].mouse_up();
            }
            for (var i = acsources.length - 1; i > -1; i--) {
                acsources[i].mouse_up();
            }
            for (var i = accurrents.length - 1; i > -1; i--) {
                accurrents[i].mouse_up();
            }
            for (var i = squarewaves.length - 1; i > -1; i--) {
                squarewaves[i].mouse_up();
            }
            for (var i = sawwaves.length - 1; i > -1; i--) {
                sawwaves[i].mouse_up();
            }
            for (var i = trianglewaves.length - 1; i > -1; i--) {
                trianglewaves[i].mouse_up();
            }
            for (var i = constants.length - 1; i > -1; i--) {
                constants[i].mouse_up();
            }
            for (var i = nets.length - 1; i > -1; i--) {
                nets[i].mouse_up();
            }
            for (var i = notes.length - 1; i > -1; i--) {
                notes[i].mouse_up();
            }
            for (var i = rails.length - 1; i > -1; i--) {
                rails[i].mouse_up();
            }
            for (var i = voltmeters.length - 1; i > -1; i--) {
                voltmeters[i].mouse_up();
            }
            for (var i = ohmmeters.length - 1; i > -1; i--) {
                ohmmeters[i].mouse_up();
            }
            for (var i = ammeters.length - 1; i > -1; i--) {
                ammeters[i].mouse_up();
            }
            for (var i = wattmeters.length - 1; i > -1; i--) {
                wattmeters[i].mouse_up();
            }
            for (var i = fuses.length - 1; i > -1; i--) {
                fuses[i].mouse_up();
            }
            for (var i = spsts.length - 1; i > -1; i--) {
                spsts[i].mouse_up();
            }
            for (var i = spdts.length - 1; i > -1; i--) {
                spdts[i].mouse_up();
            }
            for (var i = nots.length - 1; i > -1; i--) {
                nots[i].mouse_up();
            }
            for (var i = diodes.length - 1; i > -1; i--) {
                diodes[i].mouse_up();
            }
            for (var i = leds.length - 1; i > -1; i--) {
                leds[i].mouse_up();
            }
            for (var i = zeners.length - 1; i > -1; i--) {
                zeners[i].mouse_up();
            }
            for (var i = potentiometers.length - 1; i > -1; i--) {
                potentiometers[i].mouse_up();
            }
            for (var i = ands.length - 1; i > -1; i--) {
                ands[i].mouse_up();
            }
            for (var i = ors.length - 1; i > -1; i--) {
                ors[i].mouse_up();
            }
            for (var i = nands.length - 1; i > -1; i--) {
                nands[i].mouse_up();
            }
            for (var i = nors.length - 1; i > -1; i--) {
                nors[i].mouse_up();
            }
            for (var i = xors.length - 1; i > -1; i--) {
                xors[i].mouse_up();
            }
            for (var i = xnors.length - 1; i > -1; i--) {
                xnors[i].mouse_up();
            }
            for (var i = dffs.length - 1; i > -1; i--) {
                dffs[i].mouse_up();
            }
            for (var i = vsats.length - 1; i > -1; i--) {
                vsats[i].mouse_up();
            }
            for (var i = adders.length - 1; i > -1; i--) {
                adders[i].mouse_up();
            }
            for (var i = subtractors.length - 1; i > -1; i--) {
                subtractors[i].mouse_up();
            }
            for (var i = multipliers.length - 1; i > -1; i--) {
                multipliers[i].mouse_up();
            }
            for (var i = dividers.length - 1; i > -1; i--) {
                dividers[i].mouse_up();
            }
            for (var i = gains.length - 1; i > -1; i--) {
                gains[i].mouse_up();
            }
            for (var i = absvals.length - 1; i > -1; i--) {
                absvals[i].mouse_up();
            }
            for (var i = vcsws.length - 1; i > -1; i--) {
                vcsws[i].mouse_up();
            }
            for (var i = vcvss.length - 1; i > -1; i--) {
                vcvss[i].mouse_up();
            }
            for (var i = vccss.length - 1; i > -1; i--) {
                vccss[i].mouse_up();
            }
            for (var i = cccss.length - 1; i > -1; i--) {
                cccss[i].mouse_up();
            }
            for (var i = ccvss.length - 1; i > -1; i--) {
                ccvss[i].mouse_up();
            }
            for (var i = opamps.length - 1; i > -1; i--) {
                opamps[i].mouse_up();
            }
            for (var i = nmosfets.length - 1; i > -1; i--) {
                nmosfets[i].mouse_up();
            }
            for (var i = pmosfets.length - 1; i > -1; i--) {
                pmosfets[i].mouse_up();
            }
            for (var i = npns.length - 1; i > -1; i--) {
                npns[i].mouse_up();
            }
            for (var i = pnps.length - 1; i > -1; i--) {
                pnps[i].mouse_up();
            }
            for (var i = adcs.length - 1; i > -1; i--) {
                adcs[i].mouse_up();
            }
            for (var i = dacs.length - 1; i > -1; i--) {
                dacs[i].mouse_up();
            }
            for (var i = sandhs.length - 1; i > -1; i--) {
                sandhs[i].mouse_up();
            }
            for (var i = pwms.length - 1; i > -1; i--) {
                pwms[i].mouse_up();
            }
            for (var i = integrators.length - 1; i > -1; i--) {
                integrators[i].mouse_up();
            }
            for (var i = differentiators.length - 1; i > -1; i--) {
                differentiators[i].mouse_up();
            }
            for (var i = lowpasses.length - 1; i > -1; i--) {
                lowpasses[i].mouse_up();
            }
            for (var i = highpasses.length - 1; i > -1; i--) {
                highpasses[i].mouse_up();
            }
            for (var i = relays.length - 1; i > -1; i--) {
                relays[i].mouse_up();
            }
            for (var i = pids.length - 1; i > -1; i--) {
                pids[i].mouse_up();
            }
            for (var i = luts.length - 1; i > -1; i--) {
                luts[i].mouse_up();
            }
            for (var i = vcrs.length - 1; i > -1; i--) {
                vcrs[i].mouse_up();
            }
            for (var i = vccas.length - 1; i > -1; i--) {
                vccas[i].mouse_up();
            }
            for (var i = vcls.length - 1; i > -1; i--) {
                vcls[i].mouse_up();
            }
            for (var i = grts.length - 1; i > -1; i--) {
                grts[i].mouse_up();
            }
            for (var i = tptzs.length - 1; i > -1; i--) {
                tptzs[i].mouse_up();
            }
            for (var i = transformers.length - 1; i > -1; i--) {
                transformers[i].mouse_up();
            }
            /* <!-- END AUTOMATICALLY GENERATED !--> */
        }
        for (var i = wires.length - 1; i > -1; i--) {
            wires[i].mouse_up();
        }
        if (global.flags.flag_wire_created) {
            global.utils.push_history();
            global.flags.flag_wire_created = false;
        }
        let component_touched = global.variables.component_touched;
        if (!global.variables.component_touched) {
            global.variables.component_touched = true;
        }
        menu_bar.mouse_up();
        bottom_menu.mouse_up();
        time_step_window.mouse_up();
        save_circuit_window.mouse_up(canvas);
        save_image_window.mouse_up();
        element_options.mouse_up();
        element_options_window.mouse_up();
        element_options_edit_window.mouse_up();
        graph_window.mouse_up();
        zoom_window.mouse_up();
        settings_window.mouse_up();
        confirm_window.mouse_up();
        on_screen_keyboard.mouse_up();
        multi_select_manager.mouse_up();
        global.variables.component_touched = component_touched;
        engine_functions.reset_selection(false);
        if (global.flags.flag_idle &&
            !global.flags.flag_save_image &&
            !global.flags.flag_save_circuit &&
            !global.flags.flag_zoom &&
            !global.flags.flag_element_options &&
            !global.flags.flag_element_options_edit &&
            !global.flags.flag_select_element &&
            !global.flags.flag_select_timestep &&
            !global.flags.flag_select_settings &&
            !global.flags.flag_remove_all &&
            !global.flags.flag_menu_element_toolbox &&
            !global.flags.flag_graph) {
            engine_functions.handle_nearest_neighbors(temp_translation_lock);
        }
        if (global.flags.flag_history_lock) {
            global.flags.flag_history_lock = false;
            global.utils.push_history();
        }
    }
    function handle_mouse_wheel() {
        global.variables.mouse_x = global.events.mouse_wheel_event.clientX * global.variables.device_pixel_ratio;
        global.variables.mouse_y = global.events.mouse_wheel_event.clientY * global.variables.device_pixel_ratio;
        if (!global.flags.flag_save_image &&
            !global.flags.flag_save_circuit &&
            !global.flags.flag_zoom &&
            !global.flags.flag_element_options &&
            !global.flags.flag_element_options_edit &&
            !global.flags.flag_graph &&
            !global.flags.flag_select_element &&
            !global.flags.flag_select_timestep &&
            !global.flags.flag_select_settings &&
            !global.flags.flag_remove_all &&
            !global.flags.flag_menu_element_toolbox) {
            handle_zoom(global.events.mouse_wheel_event);
        }
        menu_bar.mouse_wheel();
    }
    function handle_double_click() {
        global.variables.mouse_x = global.events.mouse_double_click_event.clientX * global.variables.device_pixel_ratio;
        global.variables.mouse_y = global.events.mouse_double_click_event.clientY * global.variables.device_pixel_ratio;
        time_step_window.double_click();
        save_image_window.double_click();
        save_circuit_window.double_click();
        element_options_edit_window.double_click();
    }
    function handle_key_down() {
        time_step_window.key_down(global.events.key_down_event);
        save_circuit_window.key_down(global.events.key_down_event, canvas);
        save_image_window.key_down(global.events.key_down_event);
        settings_window.key_down(global.events.key_down_event);
        confirm_window.key_down(global.events.key_down_event);
        zoom_window.key_down(global.events.key_down_event);
        menu_bar.key_down(global.events.key_down_event);
        graph_window.key_down(global.events.key_down_event);
        element_options_window.key_down(global.events.key_down_event);
        element_options_edit_window.key_down(global.events.key_down_event);
        multi_select_manager.key_down(global.events.key_down_event);
        shortcut_manager.listen(global.events.key_down_event);
    }
    function handle_key_up() {
        multi_select_manager.key_up(global.events.key_up_event);
    }
    function handle_workspace_drag() {
        work_space_x_space = workspace_sqrt * global.variables.node_space_x;
        work_space_y_space = workspace_sqrt * global.variables.node_space_y;
        if (workspace.bounds.left + global.variables.dx < view_port.left - work_space_x_space) {
            global.variables.dx = view_port.left - work_space_x_space - workspace.bounds.left;
        }
        if (workspace.bounds.right + global.variables.dx > view_port.right + work_space_x_space) {
            global.variables.dx = view_port.right + work_space_x_space - workspace.bounds.right;
        }
        if (workspace.bounds.top + global.variables.dy < view_port.top - work_space_y_space) {
            global.variables.dy = view_port.top - work_space_y_space - workspace.bounds.top;
        }
        if (workspace.bounds.bottom + global.variables.dy > view_port.bottom + work_space_y_space) {
            global.variables.dy = view_port.bottom + work_space_y_space - workspace.bounds.bottom;
        }
        workspace.workspace_translate_bounds(global.variables.dx, global.variables.dy);
        global.variables.delta_x += global.variables.dx;
        global.variables.delta_y += global.variables.dy;
    }
    function browser_detection() {
        if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) !== -1) {
            global.variables.browser_opera = true;
        }
        else if (navigator.userAgent.indexOf('Chrome') !== -1) {
            global.variables.browser_chrome = true;
        }
        else if (navigator.userAgent.indexOf('Safari') !== -1) {
            global.variables.browser_safari = true;
        }
        else if (navigator.userAgent.indexOf('Firefox') !== -1) {
            global.variables.browser_firefox = true;
            //@ts-ignore
        }
        else if (navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode === true) {
            global.variables.browser_ie = true;
        }
    }
    function throttle_loop() {
        if ((fps_iterator ^= 1) > 0) {
            system_loop();
        }
        requestAnimationFrame(throttle_loop);
    }
    throttle_loop();
}
load_app();
