import { CONFIG } from '@/app/_config';
import { BlogEntry } from '@/app/_database/_models/entry';
import connectDB from '@/app/_database/db';
import { basicErrorLog } from '@/app/_experimental/errors';
import { NextResponse } from 'next/server';

export async function GET(req: Request){
	try {
		await connectDB()

		const posts = await BlogEntry.find()
		if (posts) Array.from(posts).forEach((post, i) => {
			posts[i].deleteOne()
		})
		return NextResponse.redirect(CONFIG.baseUri)
	}
	catch (error) { basicErrorLog(error) }
}