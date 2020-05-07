function makeRequest(url, method = 'GET', body = '', contentType = 'application/json') {
    return fetch(url, {
        method,
        headers: {
            'Content-Type': contentType,
        },
        body,
    });
}

export default makeRequest;