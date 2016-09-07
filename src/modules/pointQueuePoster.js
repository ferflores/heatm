import axios from 'axios';

let _postUrl = null;
let _batch = null;
let _queue = [];

function startPosting(){
  console.log('start posting', _postUrl, _batch, _queue);
}

function stopPosting(){
  console.log('start posting');
}

function queuePoint(point){
  console.log('queue point', point);
}

export default (postUrl, batch) => {

  _postUrl = postUrl;
  _batch = batch || 50;

  return{
    startPosting: startPosting,
    stopPosting: stopPosting,
    queuePoint: queuePoint
  }
}
