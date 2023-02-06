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
  let url = window.location.search;
  if(value =='') url = removeURLParameter(url, key) 
  
  let searchParams = new URLSearchParams(url);
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

export const clearParams = ()=>{
  window.history.pushState({ path: window.location.origin }, "", window.location.origin);

}

/**
 * Removed a specific parameter from parameter to keep the url clean
 * @param url 
 * @param parameter 
 * @returns 
 */
function removeURLParameter(url:string, parameter: string) {
  //prefer to use l.search if you have a location/link object
  const urlparts = url.split('?');   
  if (urlparts.length >= 2) {

      const prefix = encodeURIComponent(parameter) + '=';
      const pars = urlparts[1].split(/[&;]/g);

      //reverse iteration as may be destructive
      for (let i = pars.length; i-- > 0;) {    
          //idiom for string.startsWith
          if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
              pars.splice(i, 1);
          }
      }

      return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
  }
  return url;
}

/**
 * 
 * @returns Object of Query Params
 */
export const getUrlParameters = () => {
  let url = new URL(window.location.href);
  let params:any = new URLSearchParams(url.search);
  let object :any = {};
  for (const [key, value] of params) {
    object[key] = value;
  }
  return object;
};

