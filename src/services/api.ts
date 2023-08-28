
export const fetchPlaylist = async () => {
  const response = await fetch(process.env.REACT_APP_API_URL + '/playlist');
  const data = await response.json();
  return data
}