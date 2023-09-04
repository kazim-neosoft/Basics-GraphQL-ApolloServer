import db from './_db.js';
// _ means we dont want this parameter
export const resolversFunction =  {
    Query:{
        games(){
            return db.games;
        },
        authors(){
            return db.authors
        },
        reviews(){
            return db.reviews
        },
        review(_,args){
            return db.reviews.find(review => review.id === args.id)
        },
        game(_,args){
            return db.games.find(game => game.id === args.id)
        },
        author(_,args){
            return db.authors.find(author => author.id === args.id)
        },
    },
    Game:{
        reviews(parent){
            return db.reviews.filter(review=>review.game_id === parent.id) 
        }
    },
    Author:{
        reviews(parent){
            return db.reviews.filter(review=>review.author_id === parent.id) 
        }
    },
    Review:{
        game(parent){
            return db.games.find(game=>game.id === parent.game_id)
        },
        author(parent){
            return db.authors.find(author=>author.id === parent.author_id)
        }
    },
    Mutation:{
        deleteGame(_,args){
            const index = db.games.findIndex(game=>game.id== args.id)
            db.games.splice(index,1)
            return db.games
        },
        addGame(_,args){
            const newGame= {...args.game}
            newGame['id'] = Math.floor((Math.random() * (90 - 65 + 1)) + 65)
            db.games.push(newGame);

            return newGame;
        },
        updateGame(_,args){
            db.games = db.games.map((game)=>{
                if(game.id === args.id){
                    return {
                        ...game,
                        ...args.edits
                    };
                };
                return game
            });
            return db.games.find(game=>game.id === args.id)
        } 
    }
};