// CORS - cross origin resource sharing
/*
All requests that are not GET or HEAD need to include an `origin` header. 
Set by the browser, not the script.
Server sets ACCESS-Control-Allow-Origin: http://127.0.0.1:5500

Simple Request: The preflight request is NOT needed when:

1. method is HEAD, GET, or POST;
2. and headers are only accept, accept-language, content-language, content-type, or range
3. and content-type is only `text/plain`, `multipart/form-data`, or `application/x-www-form-urlencoded`;
4. and `accept`, `accept-language`, and `content-language` are only standard values;
5. and no ReadableStream object is used in the Request

CORS OPTIONS request includes the 
`Access-Control-Request-Method` and 
`Access-Control-Request-Headers` headers.

Request Mode
- no-cors: skip the OPTIONS request
- cors: must meet the CORS criteria. OPTIONS request will be made
- same-origin: result in an error if not same origin
- navigate: only set by the browser, not by JS


Opaque responses can be used as the contents of a `<script>`, `<link rel="stylesheet">`, `<img>`, `<video>`, `<audio>`, `<iframe>`, `<embed>` or `<object>`.

Not for `<canvas>`.

Not for Web Fonts.

Not for Cache Storage `add()` or `addAll()`. But you can do a fetch and then use Cache `put()`.

Opaque responses have a status of 0.

Using no-cors mode basically means that, if you get an opaque response:

1. you don't care about seeing the resulting file
2. don't bother sending a preflight request.

A CORS-safelisted response-header names

`Cache-Control` `Content-Language` `Content-Length` `Content-Type` `Expires` `Last-Modified` `Pragma`
*/


/**  
Cross-Origin Resource Sharing (CORS) is a security feature implemented by web browsers to control how web pages in one domain can request and interact with resources (like APIs) from another domain. It is designed to prevent potentially unsafe cross-origin requests initiated by scripts running on a web page.

Here are some key points related to CORS:

Origin Header:

All requests that are not GET or HEAD need to include an Origin header, indicating the origin (protocol, domain, and port) from which the request is coming. This header is set by the browser automatically, not by the script.
Server Response:

The server needs to include the Access-Control-Allow-Origin header in its response, indicating which origins are permitted to access the resource. For example, Access-Control-Allow-Origin: http://127.0.0.1:5500.
Simple Requests:

Certain requests are considered "simple" and do not trigger a preflight OPTIONS request. Simple requests meet specific criteria, including using standard methods (GET, HEAD, POST), specific headers, and specific content types.
Preflight Requests:

For non-simple requests, the browser sends a preflight OPTIONS request to the server, including the Access-Control-Request-Method and Access-Control-Request-Headers headers. The server must respond with appropriate headers to allow the actual request.
Request Mode:

Requests can have different modes, such as no-cors (skipping the OPTIONS request), cors (meeting CORS criteria, including OPTIONS request), same-origin (must be from the same origin), and navigate (for navigation requests).
Opaque Responses:

Opaque responses are used for certain types of resources, such as <script>, <link rel="stylesheet">, <img>, <video>, <audio>, <iframe>, <embed>, or <object>. They have a status of 0 and can't be directly accessed by the script.
CORS-Safelisted Response-Headers:

Certain response headers, like Cache-Control, Content-Language, Content-Length, Content-Type, Expires, Last-Modified, and Pragma, are considered safe and can be included in responses without triggering CORS issues.
 */

export function getData() {
  //
  const imgurl = `https://picsum.photos/id/237/300/200`;

  let request = new Request(imgurl, {
    cache: 'default',
    credentials: 'same-origin',
    method: 'GET',
    mode: 'no-cors',
  });

  fetch(imgurl).then((resp) => {
    console.log('External IMG mode: cors');
    console.log(resp.status); // 200
  });
  fetch(imgurl, { mode: 'no-cors' }).then((resp) => {
    console.log('External IMG mode: no-cors');
    console.log(resp.status); // 0
  });

  const jsonurl = `http://127.0.0.1:5500/local-sample.json`;
  fetch(jsonurl, { mode: 'cors' }).then((resp) => {
    console.log('Local JSON mode: cors');
    console.log(resp.status); // 200
  });
  fetch(jsonurl, { mode: 'no-cors' }).then((resp) => {
    console.log('Local JSON mode: no-cors');
    console.log(resp.status); // 0
  });
}
