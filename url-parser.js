const urlParser = (urlFormat, urlInstance) => {
	const urlFormatParts = urlFormat.split("/").slice(1);
	const urlInstanceArr = urlInstance.split("?");
	const urlPath = urlInstanceArr[0].split("/").slice(1);
	const urlQueryParams = urlInstanceArr[1].split("&");
	const parsedUrl = {};
	for (let i = 0; i < urlFormatParts.length; i++) {
		if (urlFormatParts[i][0] === ":") {
			parsedUrl[urlFormatParts[i].slice(1)] = urlPath[i];
		}
	}
	for (let i = 0; i < urlQueryParams.length; i++) {
		parsedUrl[urlQueryParams[i].split("=")[0]] = urlQueryParams[i].split("=")[1];
	}
	return parsedUrl;
};
