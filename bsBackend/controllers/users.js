const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Blog, User } = require('../models');

const user_register = async (req, res, next) => {
  try {
    const { first_name, last_name, username, email, password } = req.body;

    // Check for mandatory fields
    if (!first_name || !last_name || !username || !email || !password) {
      return res.status(400).json({ error: 'All fields are mandatory!' });
    }

    // Check if email is already registered
    const userAvailable = await User.findOne({ where: { email } });
    if (userAvailable) {
      return res.status(400).json({ error: 'User already exists!' });
    }

    // Check if username is already taken
    const usernameTaken = await User.findOne({
      where: { username },
      attributes: ['username'],
    });
    if (usernameTaken) {
      return res.status(400).json({ error: 'Username taken!' });
    }

    // Hash the password
		const salt = bcrypt.genSaltSync(10);
		const password_hash = bcrypt.hashSync(password, salt);

    // Create the user
    const user = await User.create({
      first_name,
      last_name,
      username,
      email,
      password_hash,
      userGroup_id: 2,
    });

    // Send response
    return res.status(201).json({ _id: user.user_id, email: user.email });
  } catch (error) {
    console.error('Error registering user:', error);
    next(error);
  }
};

const user_login = async (req, res, next) => {
	try {
		const {email, password} = req.body;
		if (!email || !password) {
			return res.status(400).json({ error: 'All fields are mandatory!' });
		}

		const user = await User.findOne({ where: { email } });

		// compare password with hashedpassword
		if(user && (bcrypt.compareSync(password, user.password_hash))) {
			const accessToken = jwt.sign(
				{
					user: {
						username: user.username,
						email: user.email,
						id: user.user_id
					}
				}, 
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '30m'}
			);
			res.status(200).json({ accessToken });
		} else {
			res.status(200).json({ error: 'email or password is not valid' });
		}

	} catch(error) {
		next(error);
	}
}

const user_current = async (req, res) => {
	res.status(200).json(req.user);
}

module.exports = {
	user_register,
	user_login,
	user_current
}