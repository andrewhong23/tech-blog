const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json'); 

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Post.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  await Comment.create({
    commentContent: 'test', 
    post_id: 1,
    user_id: 1
  }); 

  process.exit(0);
};

seedDatabase();