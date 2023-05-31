import service from "./http.js";

// 登录
export function getUserInfos() {
  return service({
    url: "/userInfos",
    method: "get",
  });
}
