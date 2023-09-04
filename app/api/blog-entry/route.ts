import { BlogEntry } from '@/app/_database/_models/entry';
import connectDB from '@/app/_database/db';
import { basicErrorLog } from '@/app/_experimental/errors';
import { NextResponse } from 'next/server';

export async function POST(req: Request){
	try {
		await connectDB()
		const data = Object.fromEntries(new URL(req.url).searchParams.entries())

		// if (!validateData(data, {})) return

		const newPost = new BlogEntry(data)
		newPost.save()
		return NextResponse.json(newPost)
	}
	catch (error) { basicErrorLog(error) }
}

function validateData(data: {[key: string]: any}, validators: {[key: string]: any}): void | { errors: any[] } {
	Object.entries(validators).forEach((entry: any[], i: number) => {
		const [key, obj] = entry
		if (data[key]) console.log(key)
	})
	return
}