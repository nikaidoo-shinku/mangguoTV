import service from "./http.js";

// 综艺页数据
export function getVariety() {
  return service({
    url: "/varietyView",
    method: "get",
  });
}

// 综艺视频数据(青年Π计划)
export function getVarietyDetail(id) {
  return service({
    url: `/variety/${id}`,
    method: "get",
  });
}

// 青年Π计划单个视频播放
export function getVarietyPlayDetail(id) {
  return service({
    url: `/ver/video/${id}`,
    method: "get",
  });
}
