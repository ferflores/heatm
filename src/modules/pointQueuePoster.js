import axios from 'axios';

let _project = null;
let _postUrl = null;
let _batch = null;
let _queue = [];
let _posting = false;
let _maxPoints = null;
let _pointsCount = 0;

function startPosting(){
  _posting = true;
  post();
}

function post(){

  if(_maxPoints && _pointsCount >= _maxPoints){
    _posting = false;
  }

  if(!_posting){
    return;
  }

  let slice = _queue.slice(0, _batch);

  if(slice.length + _pointsCount > _maxPoints){
    slice = slice.slice(0, _maxPoints - (_pointsCount + slice.length) )
  }
  _pointsCount += slice.length;

  if(slice.length > 0){
    var postData = {
      project: _project,
      points: slice,
      screen: {
        width: screen.availWidth,
        height: screen.availHeight
      }
    };

    axios.post(_postUrl, postData).then(response => {
        _queue = _queue.slice(_batch, _queue.length);
    }).catch(error => {
      console.log(error);
    });
  }

  setTimeout(post, 1000);
}

function stopPosting(){
  _posting = false;
}

function queuePoint(point){
  _queue.push(point);
}

export default (project, postUrl, batch, maxPoints) => {

  _postUrl = postUrl;
  _batch = batch || 50;
  _project = project;
  _maxPoints = maxPoints;

  return{
    startPosting: startPosting,
    stopPosting: stopPosting,
    queuePoint: queuePoint
  }
}
