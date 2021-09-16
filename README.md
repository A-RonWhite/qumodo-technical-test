# Qumodo Technical Test

Built using React and styled components on the frontend and then used Express/ Node.js to call the API through a server. You used to be able to authenticate the Github API client side and through query parameters, it seems as though the only way to authenticate is to use OAuth 2.0 which I felt was overkill for a small demo app such as this which means you have a rate limit - should be enough to test this however.

Due to building a similar app previously, I tried to change it up a little bit more and instead of searching github users instead it would straight serve their repos if you searched a valid github user or organisation. This meant I could display some general information about the repos straight off the bat as well as provide links off to them.

## How to know if your rate limit has been reached?

There's a useEffect that checks your current rate limit for your IP address and it will replace the search section with some text telling you that it has been reached. If I had a bit more time I'd have also added a countdown or at least the time and date that the limit would be reset again.

## How to run both the server and frontend

    npm run dev

This will run the backend node server as well as the react app and open on an available port.

## Deploying

I would most likely deploy this to heroku or netlify, both are fairly easy to get setup and going with. It would mainly just be editing the server.js file to run the build command and then serve the index.html and then any specific configs required both can serve ENV files as well if I was to impliment authentication.

# Choices and what I would do with more time

### Styled Components

I have used styled components a few times but do tend to lean towards SASS due to familarity. I feel styled components are great for a small project like this but if used in a larger project then a more modular structure would have be implimented to stop the stylings getting out of hand. The freedom to use props and other conditional logic into the stylings as well as extend previous styled components to avoid repeating css is a big perk, being able to scope them to a component really helps to keep all information in one place. Larger components start to look quite busy especially with TypeScript as well.

### Node/ Express

Express is a really popular package for Node that works well and is simple to get up and running. I used node-fetch due to it being similar to the fetch api used client side, ended up running into a few issues (no longer supporting require). I would have usually used Axios as it's what I would have normally reached for on the client side as well but opted to keep it consistent between the two due to the requirement of using the fetch api.

### More time

If I had some more time I would have added some of the points from the Bonus section, mainly testing. I would have also refined and spent more time on the design as it was more of an after thought once I had gotten the functionality and node server working, displaying table data in an interesting way that has good UX is always a challenge that requires some designing. Adding some subtle animation would have been a nice touch and I would have also changed the github logo to the current users avatar_url and shown their github name underneath to make it more apparent who's repositories you're seeing once it's loaded. The error messages and loading states are pretty rushed and could have been implimented better.

Even for a small project my state was starting to run away with me, using a state managment library such as Redux would have been a good addition especially if the app would grow any larger or complex.
