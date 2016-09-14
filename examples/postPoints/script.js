var hmap = heatm({
  postPointsUrl:'http://localhost:3000/setPoints',
  postPointsBatch: 50,
  maxPointsToPost: 500,
  projectName:'default'
});

hmap.startPostingPoints();
