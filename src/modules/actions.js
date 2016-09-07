import drawMap from './drawMap';
import pointQueuePoster from './pointQueuePoster';

let _pointPoster = null;

export function startRecording(state){
  state.recording = true;
  addMouseEvents(state);
}

export function stopRecording(state){
  state.recording = false;
  window.onmousemove = null;
}

export function startPostingPoints(state){
  if(state.config.postPointsUrl){
    state.posting = true;
    addMouseEvents(state);

    if(!_pointPoster){
      _pointPoster = pointQueuePoster(
        state.config.postPointsUrl,
        state.config.pointsPostBatch
      );
    }

    _pointPoster.startPosting();

  }else{
    throw new Error('No postPointsUrl configured');
  }
}

export function stopPostingPoints(state){
  state.posting = false;
  if(_pointPoster){
    _pointPoster.stopPosting();
  }
}

export function drawHeatMap(state, pointsBatch){
  stopRecording(state);
  drawMap(state.recordedPoints, pointsBatch);
}

function addMouseEvents(state){
  if(!window.onmousemove){
    window.onmousemove = event => {
      mouseMoved(state, event.clientX, event.clientY);
    }
  }
}

function mouseMoved(state, x, y){
  if(state.config.onNewPoint){
    state.config.onNewPoint(x, y);
  }

  if(state.recording){
    state.recordedPoints.push({x:x,y:y});
  }

  if(state.posting){
    _pointPoster.queuePoint({x:x,y:y});
  }
}
