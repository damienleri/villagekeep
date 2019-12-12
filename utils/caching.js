export const cachedRefresh = async ({
  cachedData,
  onHaveData,
  getData,
  updateCache,
  networkIsOffline = false
}) => {
  if (cachedData && onHaveData) {
    console.log("cachedRefresh: cache hit");
    onHaveData(cachedData);
  }
  if (networkIsOffline) return {};
  const { data, error } = await getData();
  if (error) return { error };
  if (onHaveData) onHaveData(data);
  updateCache(data);
  return {};
};
