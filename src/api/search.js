import service from "./http.js";

// 搜索页数据
export function getSearch() {
  return service({
    url: "/search",
    method: "get",
  });
}

// 搜索结果页数据
export function getSearchResult(keyword) {
  return service({
    url: `/searchWord/${keyword}`,
    method: "get",
  });
}
