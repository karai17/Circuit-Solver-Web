'use strict';
class Colors {
	public readonly BACKGROUND_COLOR: string;
	public readonly ELEMENT_COLOR: string;
	public readonly SELECTED_COLOR: string;
	public readonly MULTI_SELECTED_COLOR: string;
	public readonly WORKSPACE_WORK_AREA_COLOR: string;
	public readonly GRAPH_AREA_COLOR: string;
	public readonly ZOOM_AREA_COLOR: string;
	public readonly TRACE_I_COLOR: string;
	public readonly TRACE_II_COLOR: string;
	public readonly TRACE_III_COLOR: string;
	public readonly TRACE_DEFAULT_COLOR: string;
	public readonly MENU_ICON_ACTIVE_COLOR: string;
	public readonly MENU_ICON_INACTIVE_COLOR: string;
	public readonly MENU_ICON_DEFAULT_COLOR: string;
	public readonly MENU_HIGHLIGHT_COLOR: string;
	public readonly MENU_FILL_COLOR: string;
	public readonly GENERAL_WHITE_COLOR: string;
	public readonly GENERAL_BLACK_COLOR: string;
	public readonly GENERAL_GRAY_COLOR: string;
	public readonly GENERAL_DARK_GRAY_COLOR: string;
	public readonly GENERAL_GREEN_COLOR: string;
	public readonly GENERAL_RED_COLOR: string;
	public readonly GENERAL_BLUE_COLOR: string;
	public readonly GENERAL_BOUNDS_COLOR: string;
	public readonly GENERAL_FILL_COLOR: string;
	public readonly GENERAL_INPUT_COLOR: string;
	public readonly GENERAL_CYAN_COLOR: string;
	public readonly GENERAL_HOVER_COLOR: string;
	public readonly GENERAL_YELLOW_COLOR: string;
	constructor() {
		this.BACKGROUND_COLOR = this.color_name_to_hex('black');
		this.ELEMENT_COLOR = this.color_name_to_hex('silver');
		this.SELECTED_COLOR = this.color_name_to_hex('cyan');
		this.MULTI_SELECTED_COLOR = this.color_name_to_hex('yellow');
		this.WORKSPACE_WORK_AREA_COLOR = '#292D29';
		this.GRAPH_AREA_COLOR = '#282828';
		this.ZOOM_AREA_COLOR = '#3C3C3C';
		this.TRACE_I_COLOR = this.color_name_to_hex('cyan');
		this.TRACE_II_COLOR = this.color_name_to_hex('magenta');
		this.TRACE_III_COLOR = this.color_name_to_hex('green');
		this.TRACE_DEFAULT_COLOR = this.color_name_to_hex('yellow');
		this.MENU_ICON_ACTIVE_COLOR = this.color_name_to_hex('cyan');
		this.MENU_ICON_INACTIVE_COLOR = '#9B9B9B';
		this.MENU_ICON_DEFAULT_COLOR = this.color_name_to_hex('white');
		this.MENU_HIGHLIGHT_COLOR = '#606060';
		this.MENU_FILL_COLOR = this.color_name_to_hex('gray');
		this.GENERAL_WHITE_COLOR = this.color_name_to_hex('white');
		this.GENERAL_BLACK_COLOR = this.color_name_to_hex('black');
		this.GENERAL_GRAY_COLOR = this.color_name_to_hex('gray');
		this.GENERAL_DARK_GRAY_COLOR = this.color_name_to_hex('darkgray');
		this.GENERAL_GREEN_COLOR = this.color_name_to_hex('green');
		this.GENERAL_RED_COLOR = this.color_name_to_hex('red');
		this.GENERAL_BLUE_COLOR = this.color_name_to_hex('blue');
		this.GENERAL_BOUNDS_COLOR = '#2e2e2e';
		this.GENERAL_FILL_COLOR = '#202020';
		this.GENERAL_INPUT_COLOR = '#1e2325';
		this.GENERAL_CYAN_COLOR = this.color_name_to_hex('cyan');
		this.GENERAL_HOVER_COLOR = '#18d8d8';
		this.GENERAL_YELLOW_COLOR = this.color_name_to_hex('yellow');
	}
	color_name_to_hex(color: string) {
		var colors: COLOR_ARRAY_T = {
			aliceblue: '#f0f8ff',
			antiquewhite: '#faebd7',
			aqua: '#00ffff',
			aquamarine: '#7fffd4',
			azure: '#f0ffff',
			beige: '#f5f5dc',
			bisque: '#ffe4c4',
			black: '#000000',
			blanchedalmond: '#ffebcd',
			blue: '#0000ff',
			blueviolet: '#8a2be2',
			brown: '#a52a2a',
			burlywood: '#deb887',
			cadetblue: '#5f9ea0',
			chartreuse: '#7fff00',
			chocolate: '#d2691e',
			coral: '#ff7f50',
			cornflowerblue: '#6495ed',
			cornsilk: '#fff8dc',
			crimson: '#dc143c',
			cyan: '#00ffff',
			darkblue: '#00008b',
			darkcyan: '#008b8b',
			darkgoldenrod: '#b8860b',
			darkgray: '#a9a9a9',
			darkgreen: '#006400',
			darkkhaki: '#bdb76b',
			darkmagenta: '#8b008b',
			darkolivegreen: '#556b2f',
			darkorange: '#ff8c00',
			darkorchid: '#9932cc',
			darkred: '#8b0000',
			darksalmon: '#e9967a',
			darkseagreen: '#8fbc8f',
			darkslateblue: '#483d8b',
			darkslategray: '#2f4f4f',
			darkturquoise: '#00ced1',
			darkviolet: '#9400d3',
			deeppink: '#ff1493',
			deepskyblue: '#00bfff',
			dimgray: '#696969',
			dodgerblue: '#1e90ff',
			firebrick: '#b22222',
			floralwhite: '#fffaf0',
			forestgreen: '#228b22',
			fuchsia: '#ff00ff',
			gainsboro: '#dcdcdc',
			ghostwhite: '#f8f8ff',
			gold: '#ffd700',
			goldenrod: '#daa520',
			gray: '#808080',
			green: '#008000',
			greenyellow: '#adff2f',
			honeydew: '#f0fff0',
			hotpink: '#ff69b4',
			indianred: '#cd5c5c',
			indigo: '#4b0082',
			ivory: '#fffff0',
			khaki: '#f0e68c',
			lavender: '#e6e6fa',
			lavenderblush: '#fff0f5',
			lawngreen: '#7cfc00',
			lemonchiffon: '#fffacd',
			lightblue: '#add8e6',
			lightcoral: '#f08080',
			lightcyan: '#e0ffff',
			lightgoldenrodyellow: '#fafad2',
			lightgrey: '#d3d3d3',
			lightgreen: '#90ee90',
			lightpink: '#ffb6c1',
			lightsalmon: '#ffa07a',
			lightseagreen: '#20b2aa',
			lightskyblue: '#87cefa',
			lightslategray: '#778899',
			lightsteelblue: '#b0c4de',
			lightyellow: '#ffffe0',
			lime: '#00ff00',
			limegreen: '#32cd32',
			linen: '#faf0e6',
			magenta: '#ff00ff',
			maroon: '#800000',
			mediumaquamarine: '#66cdaa',
			mediumblue: '#0000cd',
			mediumorchid: '#ba55d3',
			mediumpurple: '#9370d8',
			mediumseagreen: '#3cb371',
			mediumslateblue: '#7b68ee',
			mediumspringgreen: '#00fa9a',
			mediumturquoise: '#48d1cc',
			mediumvioletred: '#c71585',
			midnightblue: '#191970',
			mintcream: '#f5fffa',
			mistyrose: '#ffe4e1',
			moccasin: '#ffe4b5',
			navajowhite: '#ffdead',
			navy: '#000080',
			oldlace: '#fdf5e6',
			olive: '#808000',
			olivedrab: '#6b8e23',
			orange: '#ffa500',
			orangered: '#ff4500',
			orchid: '#da70d6',
			palegoldenrod: '#eee8aa',
			palegreen: '#98fb98',
			paleturquoise: '#afeeee',
			palevioletred: '#d87093',
			papayawhip: '#ffefd5',
			peachpuff: '#ffdab9',
			peru: '#cd853f',
			pink: '#ffc0cb',
			plum: '#dda0dd',
			powderblue: '#b0e0e6',
			purple: '#800080',
			rebeccapurple: '#663399',
			red: '#ff0000',
			rosybrown: '#bc8f8f',
			royalblue: '#4169e1',
			saddlebrown: '#8b4513',
			salmon: '#fa8072',
			sandybrown: '#f4a460',
			seagreen: '#2e8b57',
			seashell: '#fff5ee',
			sienna: '#a0522d',
			silver: '#c0c0c0',
			skyblue: '#87ceeb',
			slateblue: '#6a5acd',
			slategray: '#708090',
			snow: '#fffafa',
			springgreen: '#00ff7f',
			steelblue: '#4682b4',
			tan: '#d2b48c',
			teal: '#008080',
			thistle: '#d8bfd8',
			tomato: '#ff6347',
			turquoise: '#40e0d0',
			violet: '#ee82ee',
			wheat: '#f5deb3',
			white: '#ffffff',
			whitesmoke: '#f5f5f5',
			yellow: '#ffff00',
			yellowgreen: '#9acd32'
		};
		if (typeof colors[color.toLowerCase()] !== 'undefined') {
			return colors[color.toLowerCase()];
		}
		return color;
	}
}
