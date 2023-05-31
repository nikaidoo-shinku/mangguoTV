import service from "./http.js";

// 电视剧板块数据
export function getTvPlay() {
  return service({
    url: "/tvPlay",
    method: "get",
  });
}

// 电视剧详情数据
export function getTvPlayDetail() {
  return service({
    url: `/video/123`,
    method: "get",
  });
}
