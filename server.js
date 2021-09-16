const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/:repoName", async (req, res) => {
  const gitHubRes = await fetch(
    `https://api.github.com/users/${req.params.repoName}/repos`
  ).catch((e) => {
    console.log(e);
    res.status(500).send("Something went wrong on the initial fetch call");
    return;
  });

  let data = await gitHubRes.json();
  if (data.message) {
    //limit hit
    res
      .status(555)
      .send(
        "Free tier of github API is reached, come back in an hour to get more"
      );
  }
  const linkHeader = gitHubRes.headers.get("Link");

  if (linkHeader) {
    const linkHeaderRegex = /page=([0-9]+)/;
    const linkHeaders = linkHeader.split(",");

    //match 2nd to get last value
    const match = linkHeaders[1].match(linkHeaderRegex);

    //call other paginated req - start at 2 due to first call being page 1
    for (let index = 2; index <= match[1]; index++) {
      let newGitHubRes = await fetch(
        `https://api.github.com/users/${req.params.repoName}/repos`
      ).catch((e) => {
        console.log(e);
        res
          .status(500)
          .send("Something went wrong inside the pagination fetch loop");
        return;
      });
      let newData = await newGitHubRes.json().catch((e) => console.log(e));
      data = [...data, ...newData];
    }
  }
  res.json(data);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
