import { $authHost, $host } from "./index";

export const createService = async (service) => {
  const { data } = await $authHost.post("api/service", service);
  return data;
};

export const getServices = async (page, limit = 3, query, sortItem, sortOrder) => {
  const { data } = await $host.get("api/service", {
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

export const getService = async (id) => {
  const { data } = await $host.get("api/service/" + id);
  return data;
};

export const deleteService = async (id) => {
  const response = await $authHost.delete("api/service/" + id);
  return response;
};

export const updateService = async (id, title, description, price, typeId) => {
  const {data} = await $authHost.put("api/service/" + id, {
    title,
    description,
    typeId,
    price
  });
  return data;
};