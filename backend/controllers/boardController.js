import { UserModel } from '../models/Users.js';

// @desc    Fetches all boards of a specific user.
// @route   GET /boards/fetch
// @access  Public
const fetchBoards = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.query.userID });
    if (!user) {
      return res.json({ message: 'Could not find user by that id!' });
    }

    res.json(user.boards);
  } catch (err) {
    res.json(err);
  }
};

// @desc    Updates boards of a specific user.
// @route   PUT /boards/update
// @access  Public
const updateBoards = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userID });

    if (!user) {
      return res.json({ message: 'User does not exist!' });
    }

    if (user.boards === req.body.boards) {
      return res.json({ message: 'Records up to date!' });
    }

    const result = await UserModel.findOneAndUpdate(
      { _id: req.body.userID },
      { boards: req.body.boards },
      {
        new: true,
      }
    );

    res.json(result.boards);
  } catch (err) {
    res.json(err);
  }
};

export { fetchBoards, updateBoards };
