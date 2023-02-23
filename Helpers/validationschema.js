const Joi = require('joi');

const validationschema = Joi.object({
    store: Joi.string().trim().alphanum().min(3).max(30).required()
});

module.exports = {validationschema};