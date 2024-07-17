// const express = require('express');
// const Router = express.Router();

// // const app = express();

//  Router.get('/new',(req,resp)=>{
//     resp.render("article/new");
// })
// Router.post('/',(req,resp)=>{
//     console.log("hello");
// })

// module.exports = Router;

const express = require('express');
const Router = express.Router();
const Article = require('../models/mongodb')

Router.get('/new', (req, resp) => {
    resp.render("article/new");
});

Router.get('/:slug',async(req,resp)=>{
   const article = await Article.findOne({slug:req.params.slug})
   if(article==null){resp.redirect('/')}
   resp.render('article/show',{article:article});
})

Router.get('/delete/:id',async(req,resp)=>{
      await Article.deleteOne({_id:req.params.id})
            resp.redirect('/')
         
       
})



Router.get('/edit/:id',async (req,resp)=>{
   const data = await Article.findOne({_id:req.params.id});
   

   resp.render('article/edit',{article:data});
})


Router.post('/edit/:id', async (req, resp) => {
   const data = await Article.updateOne(
       { _id: req.params.id },
       {
           $set: {
               title: req.body.title,
               content: req.body.content,
               moreinfo: req.body.moreinfo
           }
       }
   );

   resp.redirect('/'); // or wherever you want to redirect after the update
});

// Router.post('/edit/:id',async (req,resp)=>{
//    const data =  await Article.updateOne({_id:req.params.id},{$set:{content:req.body.content}});
   

//   resp.redirect('/')

// })

Router.post('/', (req, resp) => {
     const article = new Article({
        title:req.body.title,
        content:req.body.content,
        moreinfo:req.body.moreinfo
     })
     article.save().then(()=>{
        resp.redirect('/');
     })
    // resp.send("Form submitted");
});

module.exports = Router;
