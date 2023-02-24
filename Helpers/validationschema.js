const Joi = require('joi');

// Simple validating of a queru string just to demonstrate
const validationschema = Joi.object({

    //The inout should be a string; no white spaces; min char length: 3 and max char length: 30: it is required
    //If any of the above didnt meet requirements; server sends an error with the information what requirement is missing
    store: Joi.string().trim().alphanum().min(3).max(30).required()
});

module.exports = {validationschema};