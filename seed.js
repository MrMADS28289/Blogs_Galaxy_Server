const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Blog = require('./models/Blog');
const Rating = require('./models/Rating');
const Badge = require('./models/Badge');

const connectDB = require('./config/db');

const seedDB = async () => {
  connectDB();

  try {
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Blog.deleteMany({});
    await Rating.deleteMany({});
    await Badge.deleteMany({});
    console.log('Existing data cleared.');

    console.log('Seeding Users...');
    const users = [];
    for (let i = 0; i < 20; i++) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(`password${i + 1}`, salt);
      users.push({
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        password: hashedPassword,
        avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
        role: i === 0 ? 'admin' : 'user',
      });
    }
    const createdUsers = await User.insertMany(users);
    console.log('Users seeded.');

    console.log('Seeding Badges...');
    const badges = [];
    for (let i = 0; i < 20; i++) {
      badges.push({
        name: `Badge ${i + 1}`,
        icon: `icon${i + 1}.png`,
        condition: `${(i + 1) * 5} blogs written`,
      });
    }
    const createdBadges = await Badge.insertMany(badges);
    console.log('Badges seeded.');

    console.log('Seeding Blogs...');
    const blogs = [];
    for (let i = 0; i < 20; i++) {
      blogs.push({
        title: `Blog Title ${i + 1}`,
        content: `This is the content for blog ${i + 1}. It's a dummy blog post to populate the database.`,
        coverImage: `https://picsum.photos/seed/${i + 1}/800/400`,
        category: `Category ${i % 5}`,
        tags: [`tag${i % 3}`, `dummy`],
        author: createdUsers[i % createdUsers.length]._id,
        views: Math.floor(Math.random() * 1000),
        trending: Math.random() > 0.5,
      });
    }
    const createdBlogs = await Blog.insertMany(blogs);
    console.log('Blogs seeded.');

    console.log('Seeding Ratings...');
    const ratings = [];
    for (let i = 0; i < 20; i++) {
      ratings.push({
        user: createdUsers[i % createdUsers.length]._id,
        blog: createdBlogs[i % createdBlogs.length]._id,
        stars: (i % 5) + 1,
      });
    }
    await Rating.insertMany(ratings);
    console.log('Ratings seeded.');

    console.log('Dummy data seeding complete!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed.');
  }
};

seedDB();
