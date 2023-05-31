import service from "./http.js";

// 动漫页数据
export function getAnimate() {
  return service({
    url: "/animate",
    method: "get",
  });
}
