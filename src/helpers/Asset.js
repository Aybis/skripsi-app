export const imageApi = (name) => {
  return `https://ui-avatars.com/api/?name=${name}&length=3&background=F3f3f3&color=000&format=svg`;
};

export const absoluteUrl = (path) => {
  return `${process.env.PUBLIC_URL}/${path}`;
};
