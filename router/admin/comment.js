const express = require('express');
const comment = express.Router();


comment.get('/comment-show', require('./comment/comment-show'));
comment.get('/comment-delete', require('./comment/comment-delete'));

module.exports = comment;