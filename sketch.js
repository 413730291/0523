let facemesh;
let predictions = [];
const points = [409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291];

function setup() {
  // 置中畫布
  let cnv = createCanvas(640, 480);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);

  // 啟用視訊
  let video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // 載入facemesh模型
  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model loaded!");
}

function draw() {
  background(220);

  drawKeyLines();
}

function drawKeyLines() {
  if (predictions.length > 0) {
    let keypoints = predictions[0].scaledMesh;
    stroke(255, 0, 0);
    strokeWeight(15);
    noFill();
    beginShape();
    for (let i = 0; i < points.length; i++) {
      let idx = points[i];
      let [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape();
  }
}
