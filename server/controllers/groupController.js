const groupModel = require("../models/groupModel");

exports.createGroup = async (req, res) => {
  try {
    const group = await new groupModel({ ...req.body }).save();
    return res.status(201).json({
      success: true,
      message: "Group created!",
      group,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating the group",
      error,
    });
  }
};

exports.getGroups = async (req, res) => {
  try {
    const groups = await groupModel.find({});
    return res.status(200).json({
      success: true,
      message: "Getting all groups",
      groups,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the all groups",
      error,
    });
  }
};

exports.getSingleGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await groupModel.findById({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Getting the single group",
      group,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the single group",
      error,
    });
  }
};

exports.updateGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await groupModel.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Group updated",
      group,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating the group",
      error,
    });
  }
};

exports.deleteGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await groupModel.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Group deleted",
      group,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting the group",
      error,
    });
  }
};
