'use strict';
class TimeStepManager {
    constructor() {
        this.element_properties = [];
        this.hstep_xmatrix = global.CONSTANTS.NULL;
        this.fstep_xmatrix = global.CONSTANTS.NULL;
        this.initial_time_step = 5e-6;
        this.time_step = 5e-6;
        this.timestep_iterator = 0;
        this.temp_error = 0;
        this.h_abs = 1e-1;
        this.h_rel = 1e-7;
        this.order = 2;
        this.eps = 0.9;
        this.q_max = 0;
        this.save_properties = false;
        this.SOLVER_FULL_STEP = 0;
        this.SOLVER_HALF_STEP = 3;
        this.updated_q_max = false;
        this.publish_solution = false;
    }
    initial_timestep() {
        return this.initial_time_step;
    }
    initialize(time_step) {
        this.initial_time_step = time_step;
        this.time_step = time_step;
        this.timestep_iterator = 0;
        this.save_properties = true;
        this.publish_solution = false;
        this.updated_q_max = false;
        this.q_max = 0;
        this.reset();
    }
    update(simulation_step, xmatrix) {
        if (simulation_step !== 0) {
            if (this.timestep_iterator === this.SOLVER_FULL_STEP) {
                this.fstep_xmatrix = global.utils.copy(xmatrix);
                simulation_manager.simulation_time -= this.time_step;
                this.time_step *= 0.5;
                simulation_manager.time_step = this.time_step;
                for (var i = capacitors.length - 1; i > -1; i--) {
                    capacitors[i].restore();
                    capacitors[i].conserve_energy();
                }
                this.timestep_iterator++;
                simulation_step = 0;
            }
            else {
                if (this.timestep_iterator++ >= this.SOLVER_HALF_STEP) {
                    this.hstep_xmatrix = global.utils.copy(xmatrix);
                    for (var i = 0; i < this.fstep_xmatrix.length; i++) {
                        for (var j = 0; j < this.fstep_xmatrix[0].length; j++) {
                            this.temp_error = Math.abs(this.fstep_xmatrix[i][j] - this.hstep_xmatrix[i][j]) / (this.h_abs + this.h_rel * Math.abs(this.fstep_xmatrix[i][j]));
                            if (this.temp_error > this.q_max) {
                                this.q_max = this.temp_error;
                                this.updated_q_max = true;
                            }
                        }
                    }
                    if (this.updated_q_max) {
                        if (this.q_max > 1) {
                            simulation_manager.simulation_time -= this.time_step * 2;
                            this.time_step = Math.pow((this.eps / this.q_max), 1 / (this.order + 1)) * this.time_step;
                            this.time_step = global.utils.limit(this.time_step, global.settings.MIN_TIME_CONSTANT, this.initial_time_step);
                            for (var i = capacitors.length - 1; i > -1; i--) {
                                capacitors[i].restore();
                                capacitors[i].conserve_energy();
                            }
                            simulation_step = 0;
                        }
                        else {
                            this.time_step = Math.pow((this.eps / this.q_max), 1 / (this.order + 1)) * this.time_step * 2;
                            this.time_step = global.utils.limit(this.time_step, global.settings.MIN_TIME_CONSTANT, this.initial_time_step);
                            for (var i = capacitors.length - 1; i > -1; i--) {
                                capacitors[i].conserve_energy();
                            }
                            simulation_step = 1;
                            this.publish_solution = true;
                        }
                        this.updated_q_max = false;
                    }
                    else {
                        this.time_step *= 2;
                        for (var i = capacitors.length - 1; i > -1; i--) {
                            capacitors[i].conserve_energy();
                        }
                        simulation_step = 1;
                        this.publish_solution = true;
                    }
                    simulation_manager.time_step = this.time_step;
                    this.save_properties = true;
                    this.reset();
                    this.timestep_iterator = 0;
                }
                else {
                    simulation_step = 1;
                    this.publish_solution = false;
                }
            }
        }
        return simulation_step;
    }
    retrieve_property(type, id) {
        for (var i = 0; i < this.element_properties.length; i++) {
            if (this.element_properties[i].Type === type &&
                this.element_properties[i].Id === id) {
                return this.element_properties[i].Property;
            }
        }
        return global.CONSTANTS.NULL;
    }
    push_property(type, id, property) {
        this.element_properties.push({
            Type: type,
            Id: id,
            Property: global.utils.copy(property)
        });
    }
    reset() {
        this.element_properties.splice(0, this.element_properties.length);
    }
}
