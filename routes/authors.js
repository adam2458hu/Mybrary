const express  = require('express');
const router = express.Router();
const Author = require('../models/author');

//All author route
router.get('/',async(req,res)=>{
	let searchOptions = {};
	if (req.query.name!=null && req.query.name!==''){
		searchOptions.name = new RegExp(req.query.name,'i');
	}

	try {
		const authors = await Author.find(searchOptions);
		res.render('authors/index.ejs',{
			authors : authors,
			searchOptions : req.query
		})
	} catch(err){
		res.status(500).json(err);
	}
})

//New author form route
router.get('/new',(req,res)=>{
	res.render('authors/new.ejs',{author: new Author()});
})

//create author route
router.post('/',async(req,res)=>{
	const author = new Author({
		name : req.body.name
	})

	try {
		await author.save();
		res.redirect('authors');
	} catch(err){
		res.render('authors/new.ejs',{
			author: author,
			errorMessage: 'Error creating author'
		});
	}
})

module.exports = router;