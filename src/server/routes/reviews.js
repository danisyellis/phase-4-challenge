const express = require('express');
const router = express.Router();
const db = require('../../models/db/index');
const Reviews = require('../../models/reviews');

router.get(`/albums/:albumId/reviews/new`, (req, res) => {
  const albumId = req.params.albumId;
  db.getAlbumById(albumId)
  .then(album => {
    res.render('reviews/new', {album});
  })
  .catch(error => {
    res.status(500).render('common/error', {error});
    console.log("ERROR: ", error);
  });
});

router.post(`/albums/:albumId/reviews/new`, (req, res) => {
  const albumId = req.params.albumId;
  const review = req.body.newReview;
  const userId = res.locals.user.id;
  Reviews.create(review, userId, albumId)
  .then(() => {
    res.redirect(`/albums/${albumId}`);
  })
  .catch(error => {
    res.status(500).render('common/error', {error});
    console.log("ERROR: ", error);
  });
});

router.get('/albums/:albumId/reviews/:reviewId', (req, res) => {
  Reviews.destroy(req.params.reviewId)
  .then(() => {
    res.send("I did it");
  });
});

module.exports = router;
