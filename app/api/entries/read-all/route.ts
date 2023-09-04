import { BlogEntry } from '@/app/_database/_models/entry';
import connectDB from '@/app/_database/db';
import { basicErrorLog } from '@/app/_experimental/errors';
import { NextResponse } from 'next/server';

export async function GET(req: Request){
	try {
		await connectDB()

		const posts = await BlogEntry.find()
		console.log(posts)
		return NextResponse.json(posts)
	}
	catch (error) { basicErrorLog(error) }
}