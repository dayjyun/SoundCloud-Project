<!-- To be filled out -->
# SoundCloud Project

The SoundCloud Project is a web application designed to replicate some functionalities found in [SoundCloud](SoundCloud.com).

Sign-up, login, or try out a Demo user. The repo is your playground.
Once in you'll be able to upload songs and hear works submitted by other users. Design your unique cover images to stand out and represent your creativity.

***Explore, listen, and create.***

Check it out! [SoundCloud Project](https://soundcloud-project-app.herokuapp.com/)

# Tech

The tech can be quite extensive but together they make the whole application complete:

- JavaScript
- React
- React-Redux
- Express
- Sequelize
- bcrypt.js
- CSRF.js
- AWS S3
- SQLite3 during development
- Postgress for production


## **Snapshots**
## Welcome Page
![Splash Page](./images/SoundCloud_Splash%20Page.png)

## Albums Page
![Albums Page](./images/SoundCloud_All%20Albums.png)

## Album Details
![Album Details](./images/SoundCloud_Album%20Details.png)


# Features

Here are the things that you can do:

- Albums
    - Create albums
    - Read album details such as its songs and artist
    - Update your album's details and upload songs
    - Delete your albums

- Songs
    - Create songs without needing to belong to an album
    - Read song details such as its corresponding album and artist
    - Update your song's details
    - Delete your songs

- Search Bar
    - Use to quickly look up existing song titles

- Play
    - Choose a song to listen to from your library or from songs uploaded by other artists


# Teach
It's hard to image the much work put into something that seems rather fundamental. One of the codes that was fun to work on was creating a stand-alone song that doesn't rely on being part of an album, as songs can be released as singles without being part of piece of a whole.

router.post("/", requireAuth, multipleFileKeysUpload([{ name: "url", maxCount: 1 }, { name: "imageUrl", maxCount: 1, }, ]), validateSong,
  async (req, res) => {
    const { user } = req;
    const { title, description } = req.body;
    const url = await singlePublicFileUpload(req.files.url[0]);
    const imageUrl = await singlePublicFileUpload(req.files.imageUrl[0]);

    const newSong = await Song.create({
      title,
      description,
      url,
      imageUrl,
      userId: user.id,
    });
    newSong.dataValues.previewImage = imageUrl;
    delete newSong.dataValues.imageUrl;

    res.status(201);
    res.json(newSong);
  }
);

# Future Features
- Song and Album sorting methods (A-Z, length, likes)
- CRUD actions for Playlists
- CRUD actions for Comments on songs
- Likes
- Search artists
- Follow artists
- Establish genre parameters
- Confirm song deletion
