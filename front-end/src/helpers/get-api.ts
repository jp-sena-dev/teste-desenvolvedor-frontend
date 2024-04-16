const getApi = async (url: string): Promise<unknown> => {
  const data = await fetch(url);
  return data.json();
};

export default getApi;
