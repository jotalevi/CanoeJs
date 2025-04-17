const normalizeUrl = (url: string) => decodeURIComponent(url.replace(/\/+$/, ""));
export default normalizeUrl;