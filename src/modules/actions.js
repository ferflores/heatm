import drawMap from './drawMap';
import queuePostPoint from './pointQueuePoster';

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
  }else{
    throw new Error('No postPointsUrl configured');
  }
}

export function stopPostingPoints(state){
  state.posting = false;
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
    queuePostPoint({x:x,y:y});
  }
}
