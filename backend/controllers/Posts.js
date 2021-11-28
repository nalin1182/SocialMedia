const Posts = require('../models/Posts');

exports.getAllPosts = async (req,res)=>{

     try {
         let allPosts = await Posts.find({}).sort({_id:-1});
         return res.status(200).json(allPosts);
     } catch (error) {
        return res.status(500).json({ message: error.message });
     }

}

exports.createPosts = async (req,res)=>{

    try {
       
        const {title,description,tags} = req.body;

        if(!title||!description){
            return res.status(406).json({ message:"Don't create empty Post"});
        }

        const newPost = await Posts.create({creator_id:req.user_id,title,description,tags});
        return res.status(200).json({newPost});

    } catch (error) {
       return res.status(500).json({ message: error.message });
    }

}

exports.deletePosts = async (req,res)=>{

    try {
        const {id} = req.params;

        const findPost = await Posts.findById(id);
        if(!findPost){
            return res.status(404).json({ errors: 'No Post found' });
        }

        if(findPost.creator_id!=req.user_id){
            return res.status(404).json({ errors: 'Access denied' });
        }


        await Posts.findByIdAndDelete(id);
        return res.status(200).json({message:"Post deleted Successfully",id});

    } catch (error) {
       return res.status(500).json({ message: error.message });
    }

}

exports.editPosts = async (req,res)=>{

    try {
        const {id} = req.params;
        const {title,description,tags} = req.body;

        const newPost = {};
        if(title){newPost.title=title};
        if(description){newPost.description=description};
        if(tags){newPost.tags=tags};

        const findPost = await Posts.findById(id);
        if(!findPost){
            return res.status(404).json({ errors: 'No Post found' });
        }

        if(findPost.creator_id!=req.user_id){
            return res.status(404).json({ errors: 'Access denied' });
        }

        const updatedPost =  await Posts.findByIdAndUpdate(id,{$set:newPost},{new:true});
        return res.status(200).json({message:"Post updated Successfully",updatedPost});

    } catch (error) {
       return res.status(500).json({ message: error.message });
    }

}

exports.likePost = async (req,res)=>{

    try{

        const {id} = req.params;
        const user_id = req.user_id;
        
        if(!user_id){
            return res.status(404).json({message:'Unauthenticated'});
        }

        const post = await Posts.findById(id);
        if(!post){
            return res.status(404).json({ errors: 'No Post found' });
        }

        const index = post.likes.findIndex((id)=>String(id)===String(user_id));
        console.log(index) ;   
 
        if(index===-1){
            //like the post
            post.likes.push(user_id);
        }else{
            //dislike the post
            post.likes = post.likes.filter((id)=>String(id)!==String(user_id));
           
        }

        const updatedPost =  await Posts.findByIdAndUpdate(id,post,{new:true});
        return res.status(200).json({message:"Post updated Successfully",updatedPost});


    }catch(error){
       return res.status(500).json({message:error.message});
    }

}