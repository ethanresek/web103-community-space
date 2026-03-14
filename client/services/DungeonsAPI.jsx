
export const fetchAllDungeons = async () => {
  const response = await fetch('/api/dungeons');
  const data = await response.json();
  return data;
};

export const fetchDungeonWithAdventures = async (id) => {
  const response = await fetch(`/api/dungeons/${id}`);
  const data = await response.json();
  return data;
}

