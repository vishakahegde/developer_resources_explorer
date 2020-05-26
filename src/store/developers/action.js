export function toggleFavorite(developerId, resourceId) {
  return {
    type: "TOGGLE_FAVORITE",
    payload: {
      developerId: developerId,
      resourceId: resourceId,
    },
  };
}
