import axios from 'axios';

let _project = null;
let _postUrl = null;
let _batch = null;
let _queue = [];

function startPosting(){
  axios.post(_postUrl, { project: _project, points:[]})
}

function stopPosting(){
  console.log('start posting');
}

function queuePoint(point){
  _queue.push(point);
}

export default (project, postUrl, batch) => {

  _postUrl = postUrl;
  _batch = batch || 50;
  _project = project;

  return{
    startPosting: startPosting,
    stopPosting: stopPosting,
    queuePoint: queuePoint
  }
}
