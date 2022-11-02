const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = blogData.map((post) => post.get({ plain: true }));
    console.log(posts)
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
    try {
        const blogData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },

                {
                  model: Comment, 
                  include: [
                    User
                  ]
                },
            ],
        }); 

        const blog = blogData.get({ plain: true });
        console.log("blog", blog)
        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });


    } catch (err) {
      console.log('error', err)
        res.status(500).json(err);
    }
}); 

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post}],
        });

        const user = userData.get({ plain: true });
        console.log(user)
        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    }   catch(err) {
        res.status(500).json(err);
    }
}); 

router.get('/newpost', withAuth, async (req, res) => {
  res.render('newBlog')
}),


router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const editPost = await Post.findByPk(req.params.id)
    if (editPost) {
      const post = editPost.get({ plain: true })
      console.log(post)
      res.render('updatePost', { ...post })
    }
    
    else {res.status(404).end()}
    
  } 
  catch (err) {
    res.redirect('login')
  }
})

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});



module.exports = router; 