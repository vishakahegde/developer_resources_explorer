// This selectore is moved from the resource selecte file to here since it has data from multiple sources

export const selectDevelopersFavoritesResources = (developerId) => (state) => {
  const developer = state.developers.find((dev) => dev.id === developerId);
  if (!developer) {
    return [];
  }

  return state.resources.filter((resource) => {
    return developer.favorites.includes(resource.id);
  });
};

export const selectLoggedinUser = (state) => {
  const developer = state.developers.find((dev) => dev.id === state.user.id);
  if (!developer) {
    return [];
  }

  return developer;
};
