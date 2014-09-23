
exports.findPosition = function(element) {
  var body = document.body,
      win = document.defaultView,
      docElem = document.documentElement,
      box = document.createElement('div');
  box.style.paddingLeft = box.style.width = "1px";
  body.appendChild(box);
  var isBoxModel = box.offsetWidth == 2;
  body.removeChild(box);
  box = element.getBoundingClientRect();
  var clientTop  = docElem.clientTop  || body.clientTop  || 0,
      clientLeft = docElem.clientLeft || body.clientLeft || 0,
      scrollTop  = win.pageYOffset || isBoxModel && docElem.scrollTop  || body.scrollTop,
      scrollLeft = win.pageXOffset || isBoxModel && docElem.scrollLeft || body.scrollLeft;
  return {
    top : box.top  + scrollTop  - clientTop,
    left: box.left + scrollLeft - clientLeft
  };
}

exports.getCursorPosition = function(e, canvas_offset) {
  var x;
  var y;
  if (e.pageX != undefined && e.pageY != undefined) {
    x = e.pageX;
    y = e.pageY;
  } else {
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  x -= canvas_offset.left;
    y -= canvas_offset.top;
  var click_position = {x: x, y: y};
  click_position.touches = [ {x: x, y: y } ];
  return click_position;
}

exports.getTouchPosition = function(e, canvas_offset) {
  var x;
  var y;
  x = e.targetTouches[0].pageX;
  y = e.targetTouches[0].pageY;
  x -= canvas_offset.left;
    y -= canvas_offset.top;
  var click_position = {x: x, y: y};
  console.log("touches="+e.touches.length);
  console.log("target="+e.targetTouches.length);
  console.log("changed="+e.changedTouches.length);

  click_position.touches = new Array();
  for (var i=0;i<e.targetTouches.length;i++) {
     click_position.touches.push({
      x: e.targetTouches[i].pageX - canvas_offset.left,
      y: e.targetTouches[i].pageY - canvas_offset.top
    });
  }
  return click_position;
}