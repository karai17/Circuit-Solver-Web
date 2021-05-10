'use strict';
class LinearAlgebra {
	private x_matrix: Array<Array<number>>;
	private det_threshold: number;
	private row: Array<number>;
	private _i: number;
	private _j: number;
	private _k: number;
	private _i_max: number;
	private size: number;
	private max_a: number;
	private abs_a: number;
	private p_vector: Array<number>;
	private lup_det: number;
	public flag_first_solution: boolean;
	constructor() {
		this.x_matrix = [[0], [0]];
		this.det_threshold = 0;
		this.row = [];
		this._i = 0;
		this.size = 0;
		this._j = 0;
		this._k = 0;
		this._i_max = 0;
		this.max_a = 0;
		this.abs_a = 0;
		this.p_vector = [];
		this.lup_det = 0;
		this.flag_first_solution = true;
	}
	lup_solve(a_matrix: Array<Array<number>>, b_matrix: Array<Array<number>>): Array<Array<number>> {
		if (a_matrix.length > 0 && a_matrix[0].length > 0) {
			this.size = a_matrix[0].length;
			this._i = 0;
			this._j = 0;
			this._k = 0;
			this._i_max = 0;
			this.max_a = 0;
			this.abs_a = 0;
			if (this.flag_first_solution) {
				this.p_vector = this.vector2(this.size + 1);
				this.x_matrix = this.matrix(this.size, 1);
				this.flag_first_solution = false;
			} else {
				this.p_vector[this.p_vector.length - 1] = this.p_vector.length - 1;
				for (var i: number = 0; i < this.x_matrix.length; i++) {
					this.p_vector[i] = i;
					for (var j: number = 0; j < this.x_matrix[0].length; j++) {
						this.x_matrix[i][j] = 0;
					}
				}
			}
			for (this._i = 0; this._i < this.size; this._i++) {
				this.max_a = 0.0;
				this._i_max = this._i;
				for (this._k = this._i; this._k < this.size; this._k++) {
					if ((this.abs_a = Math.abs(a_matrix[this._k][this._i])) > this.max_a) {
						this.max_a = this.abs_a;
						this._i_max = this._k;
					}
				}
				if (this._i_max !== this._i) {
					this._j = this.p_vector[this._i];
					this.p_vector[this._i] = this.p_vector[this._i_max];
					this.p_vector[this._i_max] = this._j;
					this.row = a_matrix[this._i];
					a_matrix[this._i] = a_matrix[this._i_max];
					a_matrix[this._i_max] = this.row;
					this.p_vector[this.size]++;
				}
				for (this._j = this._i + 1; this._j < this.size; this._j++) {
					a_matrix[this._j][this._i] /= a_matrix[this._i][this._i];
					for (this._k = this._i + 1; this._k < this.size; this._k++) {
						a_matrix[this._j][this._k] -= a_matrix[this._j][this._i] * a_matrix[this._i][this._k];
					}
				}
			}
			this.lup_det = a_matrix[0][0];
			for (this._i = 1; this._i < this.size; this._i++) {
				this.lup_det *= a_matrix[this._i][this._i];
			}
			if (!((this.p_vector[this.size] - this.size) % 2 === 0)) {
				this.lup_det = -this.lup_det;
			}
			if (Math.abs(this.lup_det) <= this.det_threshold) {
				global.variables.is_singular = true;
				return this.x_matrix;
			}
			for (this._i = 0; this._i < this.size; this._i++) {
				this.x_matrix[this._i][0] = b_matrix[this.p_vector[this._i]][0];
				for (this._k = 0; this._k < this._i; this._k++) {
					this.x_matrix[this._i][0] -= a_matrix[this._i][this._k] * this.x_matrix[this._k][0];
				}
			}
			for (this._i = this.size - 1; this._i >= 0; this._i--) {
				for (this._k = this._i + 1; this._k < this.size; this._k++) {
					this.x_matrix[this._i][0] -= a_matrix[this._i][this._k] * this.x_matrix[this._k][0];
				}
				this.x_matrix[this._i][0] = this.x_matrix[this._i][0] / a_matrix[this._i][this._i];
			}
		}
		return this.x_matrix;
	}
	set_matrix_diagonal(matrix: Array<Array<number>>, value: number, n: number): void {
		for (var i: number = 0; i < n; i++) {
			matrix[i][i] = value;
		}
	}
	matrix(rows: number, cols: number): Array<Array<number>> {
		let general_matrix = [];
		for (var i: number = 0; i < rows; i++) {
			general_matrix.push(new Array(cols));
			for (var j: number = 0; j < cols; j++) {
				general_matrix[i][j] = 0;
			}
		}
		return general_matrix;
	}
	vector(size: number): Array<number> {
		let general_vector = new Array(size);
		for (var i: number = 0; i < size; i++) {
			general_vector[i] = 0;
		}
		return general_vector;
	}
	vector2(size: number): Array<number> {
		let general_vector = new Array(size);
		for (var i: number = 0; i < size; i++) {
			general_vector[i] = i;
		}
		return general_vector;
	}
}
