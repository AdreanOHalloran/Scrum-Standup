const express = require('express');
const router = express.Router();
const { getTeamMembers, addTeamMember, deleteTeamMember } = require('../contollers/teamMembers');

router.route('/').get(getTeamMembers);
router.route('/:team').post(addTeamMember);
router.route('/:id').delete(deleteTeamMember);

module.exports = router;
