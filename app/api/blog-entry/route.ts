// import { NextApiRequest, NextApiResponse } from "next"

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
// 	const reqMethod = req.method
// 	const reqBody = JSON.parse(String(req.body))
// 	console.log(req.body)
// 	switch (reqMethod) {
// 		case 'POST':
// 		default: console.log('wtf')
// 	}
// }

import { NextResponse } from 'next/server';

async function toJSON(body: any) {
  const reader = body.getReader(); // `ReadableStreamDefaultReader`
  const decoder = new TextDecoder();
  const chunks: any[] = [];

  async function read() {
    const { done, value } = await reader.read();

    // all chunks have been read?
    if (done) {
      return JSON.parse(chunks.join(''));
    }

    const chunk = decoder.decode(value, { stream: true });
    chunks.push(chunk);
    return read(); // read the next chunk
  }

  return read();
}

export async function POST(req: Request){
	const reader = req.body?.getReader()

	// const requestBody = JSON.parse(req.body as any);
	// console.log(requestBody)
	console.log(req.body)
	return NextResponse.json(await toJSON(req.body))  
}