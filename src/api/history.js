import service from "./http.js";

// 历史页数据
export function getHistory() {
  return service({
    url: "/history",
    method: "get",
  });
}
