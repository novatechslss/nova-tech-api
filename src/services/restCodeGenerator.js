export function generateExamples({url,method='GET',body=''}){const safe=String(url||'').replace(/\/g,'\\').replace(/'/g,"'\''");const m=String(method||'GET').toUpperCase();const hasBody=body&& !['GET','HEAD'].includes(m);const jsBody=hasBody?`,
  headers: { 'Content-Type': 'application/json' },
  body: ${JSON.stringify(body)}`:'';const pyBody=hasBody?`, json=${body}`:'';return {curl:`curl -X ${m} '${safe}'${hasBody?` \
  -H 'Content-Type: application/json' \
  --data '${String(body).replace(/'/g,"'\''")}'`:''}`,javascript:`const response = await fetch(${JSON.stringify(url)}, {
  method: ${JSON.stringify(m)}${jsBody}
});
const data = await response.text();
console.log(response.status, data);`,python:`import requests

response = requests.request(${JSON.stringify(m)}, ${JSON.stringify(url)}${pyBody}, timeout=10)
print(response.status_code)
print(response.text)`};}
