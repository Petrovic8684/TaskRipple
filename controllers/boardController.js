import { UserModel } from '../models/Users.js';

// @desc    Fetches all boards of a specific user.
// @route   GET /boards/fetch
// @access  Public
const fetchBoards = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.query.userID });
    if (!user) {
      return res
        .status(404)
        .json({ message: 'Could not find user by that id!' });
    }

    res.status(302).json(user.boards);
  } catch (err) {
    res.status(500).json(err);
  }
};

// @desc    Updates boards of a specific user.
// @route   PUT /boards/update
// @access  Public
const updateBoards = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userID });

    if (!user) {
      return res.status(404).json({ message: 'User does not exist!' });
    }

    if (user.boards === req.body.boards) {
      return res.status(200).json({ message: 'Records up to date!' });
    }

    const result = await UserModel.findOneAndUpdate(
      { _id: req.body.userID },
      { boards: req.body.boards },
      {
        new: true,
      }
    );

    res.status(200).json(result.boards);
  } catch (err) {
    res.status(500).json(err);
  }
};

export { fetchBoards, updateBoards };
