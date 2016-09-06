export default (source, target, colorIncrement, alpha) => {
  if(JSON.stringify(source) === JSON.stringify(target)){
    return target;
  }
  
  var r = (source.R + (target.R - source.R) * colorIncrement);
  var g = (source.G + (target.G - source.G) * colorIncrement);
  var b = (source.B + (target.B - source.B) * colorIncrement);

  return {R:Math.floor(r), G:Math.floor(g), B:Math.floor(b), A:alpha};
}
