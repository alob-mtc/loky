const _ = require('lodash');

const findData = function(data, state){
    const state_ = _.find(state, { id: Number(data.stateId) });
    const lga_ = _.find(state_.locals, { id: Number(data.lgaId) });
    const newData = {
        country: 'Nigeria',
        state: state_.name,
        lga: lga_.name,
    };
    return newData;
};

module.exports = findData;