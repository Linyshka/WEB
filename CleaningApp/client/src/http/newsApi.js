import { $authHost, $host } from "./index";

export const createNew = async (service) => {
  const { data } = await $authHost.post("api/news", service);
  return data;
};

export const getNews = async (page, limit = 3, query, sortItem, sortOrder) => {
  const { data } = await $host.get("api/news", {
    params: {
      page,
      limit,
      query,
      sortOrder,
      sortItem
    },
  });
  return data;
};

export const getNew = async (id) => {
  const { data } = await $host.get("api/news/" + id);
  return data;
};

export const getLastNew = async () => {
  const { data } = await $host.get("api/news/get/lastNew/");
  return data;
};