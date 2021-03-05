const Post = require('../models/post');

const getPost = async(req, res) => {
    await Post.findAll({
        limit: 4,
        order: [
            ['created_at', 'DESC']
        ]
    })
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => {
            console.error(error);
            return error;
        })
};

const getPostDetail = async(req, res) => {
    await Post.findAll({
        where: { id: req.params.id },
    })
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((error) => {
            console.error(error);
            return error;
        })
};

const createPost = async(req, res) => {
    await Post.create({
        host: req.body.host,
        title: req.body.title,
        writer: req.body.writer,
        description: req.body.description,
        event_date: req.body.event_date,
        link: req.body.link,
    });
    res.status(200);
    res.end();
}

const updatePost = async(req, res) => {
    const response = {
        host: req.boby.host,
        title: req.body.title,
        writer: req.body.writer,
        description: req.body.description,
        event_date: req.body.event_date,
        link: req.body.link
    };
    await Post.findOneAndUpdate({ id: req.params.id }, response, function(err, post) {
        if(err) {
            return res.status(400).json({ message: "Failed update Post"});
        } if(!post) {
            return res.status(401).json({ message: "Failed update Post"});
        }
        res.status(200);
        res.end();
    })
}

const deletePost = async(req, res) => {
    await Post.findOneAndRemove({ id: req.params.id }, function (err, post) {
        if(err) {
            return res.status(400).json({ message: "Failed delete Post"});
        } if(!post) {
            return res.status(401).json({ message: "Failed delete Post"});
        }
        res.status(200);
    });
};

module.exports = {
    getPost,
    getPostDetail,
    createPost,
    updatePost,
    deletePost,
};