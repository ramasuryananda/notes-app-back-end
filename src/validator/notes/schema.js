/* eslint-disable import/no-extraneous-dependencies */
const Joi = require('joi');

const NotesPayloadSchema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
});

module.exports = { NotesPayloadSchema };
