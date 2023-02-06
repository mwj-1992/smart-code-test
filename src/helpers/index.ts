export const debounce = (func: any, timeout = 300) => {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export const insertUrlParam = (key: string, value: string | number) => {
  let searchParams = new URLSearchParams(window.location.search);
  searchParams.set(key, value as string);
  let newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    "?" +
    searchParams.toString();
  window.history.pushState({ path: newurl }, "", newurl);
};

// to remove the specific key
export const getUrlParameters = () => {
  let url = new URL(window.location.href);
  let params:any = new URLSearchParams(url.search);
  let object :any = {};
  for (const [key, value] of params) {
    object[key] = value;
  }
  return object;
};

export const queryParamsString = (params: any) => {
  const queryString: string = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
  return queryString;
};