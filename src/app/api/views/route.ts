import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/views.json');

export async function GET() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const { count } = JSON.parse(data);
    return NextResponse.json({ count });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Could not read view count' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    let { count } = JSON.parse(data);
    count += 1;
    fs.writeFileSync(dataFilePath, JSON.stringify({ count }));
    return NextResponse.json({ count });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Could not update view count' }, { status: 500 });
  }
}
