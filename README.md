# Url Shortener 🔗

## Instructions

- Fork and clone [this repository](https://github.com/JoinCODED/Task-Express-M6-Authentication-urlShortener-noSql) to your `Development` folder.

After forking the repository, you will find a fully functional url shortener!.

The goal is to prevent any unauthorized user from using our service.

### Signup

#### Signup Controller

1. Install `bcrypt` and require it in `users.controllers`.
2. In `users.controllers`, implement the following inside the `signup` controller:
   - Hash the password with `10` salt rounds and overwrite `req.body.password` with the new, hashed password.
   - Pass the body of the request to `User.create`.
   - Change the response status to `201` and end it with a message.
3. Test your route in Postman.

#### Generating a Token

Generate and return a token in `users.controllers`'s `signup` function.

1. Install `jsonwebtoken`.
2. Require `jwt` from `jsonwebtoken`.
3. In `users.controllers`, create a function called `generateToken` that takes `user` as an argument.
4. In this function, create an object called `payload` and pass it the user's `username` and `_id` that's coming from `user`.
5. After creating your `payload` object, call `jwt.sign()` and pass it two arguments:
   1. `payload`
   2. `JWT_SECRET`
6. Add an object as a third parameter to the `jwt.sign()` function that has a `expiresIn` key and its value is the token's duration from the `JWT_TOKEN_EXP` variable.
7. In the `signup` function, after creating the user call `generateToken` and pass it the new user.
8. Save the returned value in a variable called `token` and send it as a response (json object should have a key of token with an encoded string as its value).
9. Test your route in Postman.

### Signin

#### Passport Setup

1. Install `passport` and `passport-local`.
2. Require `passport` in `app.js`.
3. Call the `app.use` method and pass it `passport.initialize()`.

#### Local Strategy

1. In `middleware`, create a file called `passport.js`.
2. Require `LocalStrategy` from `passport-local`.
3. Create a variable called `localStrategy` that's equal to a `LocalStrategy` instance.
4. Pass `LocalStrategy` an asynchronous function as an argument. This function receives three parameters: `username`, `password` and `done`.
5. Add a `try catch` statement in the function. In the `catch` block, call `done` and pass it `error`.
6. Look for a `user` in the `User` model that has the `username` that's passed to the local strategy. Save it in a variable called `user`.
7. Don't forget to import `User`.
8. Import `bcrypt`.
9. If `user` exists, call `bcrypt.compare()` and pass it `password` and `user.password` for comparison.
10. Save the returned value in a variable called `passwordsMatch`.
11. If `user` doesn't exist, set `passwordsMatch` to `false`.
12. If `passwordsMatch` is `true`, return `done()` and pass it two arguments, `null` and `user`.
13. Else, return `done()` and pass it two arguments, `null` and `false`.
14. In `app.js`, require the `localStrategy` instance that we just created.
15. Under the passport initialization, call `passport.use()` and pass it `localStrategy`.
16. In the `/signin` route, call `passport.authenticate()` and pass it "`local`" and `{ session: false }` as arguments.

#### Signin Controller

Generate a token a token in `users.controllers`'s `signin` function.

1. In the `signin` function, call `generateToken` and pass it the user object obtained from passport middleware.
2. Save the returned value in a variable called `token` and send it as a response (json object should have a key of token with an encoded string as its value).
3. Test your route in Postman.

### Authentication

#### JWT Strategy

1. Start with installing the `JWT strategy`.
2. In `middleware/passport.js` require `JWTStrategy`.
3. We will create a JWT strategy instance, which takes two arguments, an `options` object and a callback function.
4. Tokens can be extracted from the request in many ways. We will pass our token in the request's authorization header with the scheme bearer. We need to require `fromAuthHeaderAsBearerToken`.
5. Now we will pass this function to our `options` object. Also, we will pass our `JWT_SECRET` for the key `secretOrKey`.
6. Now the second argument, an asynchronous callback function, takes two arguments, the token's payload and done function. So the JWT strategy decodes the token and passes the payload as an argument.
7. Check if the token is expired or not by comparing the expiration date to the date right now. If the token is expired, call `done` and pass it `null` and `false` as arguments, which will throw a `401` error.
8. If the token is not expired, we will find the `user` with the ID saved in the token. You can use `findOne` and pass it the `username`. Then we will pass the found `user` to `done`. If no `user` is found, it will throw a `401` error.
9. Let's initialize our strategy in `app.js`. Require `jwtStrategy` and pass it to `passport.use()`.

#### Authenticating Users

1. In `urls.routes` we will restrict the `shorten` endpoint to only allow authenticated users to create shortened urls. Start by requiring `passport` in `users.routes`
2. In the `/shorten/:userId` route, call `passport.authenticate()` and pass it "`jwt`" and `{ session: false }` as arguments.
3. Remove the `/:userId` param from the route.
4. In the `urls.controllers`, modify the `shorten` function to use `req.user` instead of the route param.
5. Test your endpoint in Postman.

### Permissions

1. In the `urls.routes`, call `passport.authenticate()` and pass it "`jwt`" and `{ session: false }` as arguments in the delete endpoint.
2. In the `urls.controllers`'s deleteUrl function, add a condition that will compare the ids of the user making the request, and the id of the user that created the instance. In the condition, only allow the user who created the url to delete the url.
3. Return an authorized status and message to the user if they are attempting to delete the url and if they are not the creator!
