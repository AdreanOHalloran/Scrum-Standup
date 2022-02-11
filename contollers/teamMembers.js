const TeamMember = require('../models/TeamMember');

// @desc    Get all team members
// @route   GET /api/v1/teamMembers
// @access  Public
exports.getTeamMembers = async (req, res, next) => {
  try {
    const teamMembers = await TeamMember.find();

    return res.status(200).json({
      success: true,
      count: teamMembers.length,
      data: teamMembers,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Add a team member
// @route   POST /api/v1/teamMembers/:team
// @access  Public
exports.addTeamMember = async (req, res, next) => {
  try {
    const teams = req.body.team;
    const name = req.body.name;
    const teamMember = await TeamMember.update(
      { name },
      { $addToSet: { teams } },
      { upsert: true }
    );
      
    return res.status(201).json({
      success: true,
      data: teamMember,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

// @desc    Delete a team member
// @route   DELETE /api/v1/teamMembers/:team/:id
// @access  Public
exports.deleteTeamMember = async (req, res, next) => {
  try {
    const team = req.params.team;
    const teamMember = await TeamMember.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({
        sucess: false,
        error: 'No team member found',
      });
    }

    if (teamMember.teams.length < 2 || team === 'undefined') {
      await teamMember.remove();
    }
    else {
      await TeamMember.update(
        { _id: teamMember._id },
        { $pull: { teams: team }}
      );
    }
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
