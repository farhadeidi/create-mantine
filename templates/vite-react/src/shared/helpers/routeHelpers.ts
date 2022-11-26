export const isRouteActive = (path: string, link: string) => {
  if (link.length < 2) return link === path; // for home page

  if (path.includes(link)) {
    return true;
  }

  return false;
};
