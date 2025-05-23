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

  // 載入facemesh模型（新版ml5.js用faceMesh）
  facemesh = ml5.faceMesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model loaded!");
}

function draw() {
  background(220);

  drawGreenShapeBetweenLines(); // 先畫綠色區域
  drawKeyLines();
  drawExtraLines();
}

function drawGreenShapeBetweenLines() {
  const extraPoints = [76,77,90,180,85,16,315,404,320,307,306,408,304,303,302,11,72,73,74,184];
  if (predictions.length > 0) {
    let keypoints = predictions[0].scaledMesh;
    fill(0, 255, 0, 180); // 半透明綠色
    noStroke();
    beginShape();
    // 第一組點
    for (let i = 0; i < points.length; i++) {
      let idx = points[i];
      let [x, y] = keypoints[idx];
      vertex(x, y);
    }
    // 第二組點（反向連接）
    for (let i = extraPoints.length - 1; i >= 0; i--) {
      let idx = extraPoints[i];
      let [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape(CLOSE);
  }
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

function drawExtraLines() {
  const extraPoints = [76,77,90,180,85,16,315,404,320,307,306,408,304,303,302,11,72,73,74,184];
  if (predictions.length > 0) {
    let keypoints = predictions[0].scaledMesh;
    stroke(255, 0, 0);
    strokeWeight(2);
    noFill();
    for (let i = 0; i < extraPoints.length - 1; i++) {
      let idxA = extraPoints[i];
      let idxB = extraPoints[i + 1];
      let [x1, y1] = keypoints[idxA];
      let [x2, y2] = keypoints[idxB];
      line(x1, y1, x2, y2);
    }
  }
}
