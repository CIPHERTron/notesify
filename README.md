# notesify
A full stack note taking app

# Server Structure

**server.js** -> Main express app file, Database connection, Use routes
<hr>

**/models**
1. userModel.js -> Contains User Schema and exports User model
2. noteModel.js -> Contains Note Schema and exports Note model
<hr>

**/routes**
1. userRoutes.js (/user)
- Signup Route (/user/signup)
- Login Route (/user/login)

2. noteRoutes.js (/notes/api)
- /
  - get -> Get All Notes
  - post -> Add a new note 
- /:id
   - get -> Get the note having id same as id in the params
   - put -> Update the note having id same as id in the params
   - delete -> Delete the note having id same as id in the params
<hr>

**/controllers**
1. user.js -> Contains controller methods of userRoutes.js
2. note.js -> Contains controller methods of noteRoutes.js
<hr>

**/middlewares**
1. auth.js -> Contain auth method for token verification using JWT
