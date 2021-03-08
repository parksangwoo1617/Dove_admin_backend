const Post = require('../models/post');

const getPost = async(req, res) => {
    try {
        const posts = await Post.findAll({
            limit: 4,
            order: [
                ['created_at', 'DESC']
            ]
        })
        res.status(200).json(posts);
    } catch(error) {
        console.error(error);
        return error;
    }
};

const getPostDetail = async(req, res) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.id }
        })
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        return error;
    }
};

const createPost = async(req, res) => {
    try {
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
    } catch(error) {
        console.error(error);
        return error;
    }
}

const updatePost = async(req, res) => {
    try {
        const result = await Post.update({
            host: req.body.host,
            title: req.body.title,
            writer: req.body.writer,
            description: req.body.description,
            event_date: req.body.event_date,
            link: req.body.link,
        }, {
            where: { id: req.params.id },
        });
        res.json({
            message: "success",
            result
        });
        res.status(200);
        res.end();
    } catch(error) {
        console.error(error);
        return error;
    }
}

const deletePost = async(req, res) => {
    try {
        await Post.destroy({
            where: { id: req.params.id }
        });
        res.status(200);
        res.end();
    } catch(error) {
        console.error(error);
        return error;
    }
};

module.exports = {
    getPost,
    getPostDetail,
    createPost,
    updatePost,
    deletePost,
};