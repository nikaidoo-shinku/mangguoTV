import service from "./http.js";

// 首页数据
export function getHome() {
  return service({
    url: "/home",
    method: "get",
  });
}
