var hmap = heatm({
  postPointsUrl:'http://localhost:3000/setPoints',
  postPointsBatch: 50,
  maxPointsToPost: 10000,
  projectName:'default'
});

hmap.startPostingPoints();
