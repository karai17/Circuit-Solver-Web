'use strict';
/**
  ported from SimplyPID.java
 * A simple PID closed control loop.
 * <br><br>
 * License : MIT
 * @author Charles Grassin
 */
class PIDController {
	public set_point: number;
	public k_p: number;
	public k_i: number;
	public k_d: number;
	public min_limit: number;
	public max_limit: number;
	public previous_time: number;
	public last_error: number;
	public integral_error: number;
	constructor(set_point: number, k_p: number, k_i: number, k_d: number) {
		this.set_point = 0;
		this.k_p = k_d;
		this.k_i = k_i;
		this.k_d = k_d;
		this.min_limit = -global.settings.MAX_VOLTAGE;
		this.max_limit = global.settings.MAX_VOLTAGE;
		this.previous_time = 0;
		this.last_error = 0;
		this.integral_error = 0;
	}
	get_output(current_time: number, current_value: number): number {
		let error: number = this.set_point - current_value;
		let dt: number = current_time - this.previous_time;
		let derivative_error: number = dt !== 0 ? (error - this.last_error) / dt : 0;
		this.integral_error += error * dt;
		this.previous_time = current_time;
		this.last_error = error;
		return this.check_limits(this.k_p * error + this.k_i * this.integral_error + this.k_d * derivative_error);
	} reset(): void {
		this.previous_time = 0;
		this.last_error = 0;
		this.integral_error = 0;
	}
	check_limits(output: number): number {
		if (output < this.min_limit) {
			return this.min_limit;
		} else if (output > this.max_limit) {
			return this.max_limit;
		} else {
			return output;
		}
	}
	set_output_limits(min_limit: number, max_limit: number): void {
		if (min_limit < max_limit) {
			this.min_limit = min_limit;
			this.max_limit = max_limit;
		} else {
			this.min_limit = max_limit;
			this.max_limit = min_limit;
		}
	}
	set_kp(k_p: number): void {
		this.k_p = k_p;
		this.reset();
	}
	set_ki(k_i: number): void {
		this.k_i = k_i;
		this.reset();
	}
	set_kd(k_d: number): void {
		this.k_d = k_d;
		this.reset();
	}
	set_setpoint(set_point: number): void {
		this.reset();
		this.set_point = set_point;
	}
}
