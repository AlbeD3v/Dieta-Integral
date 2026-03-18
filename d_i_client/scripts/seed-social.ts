import { PrismaClient } from '@prisma/client'

async function main() {
  const prisma = new PrismaClient()
  try {
    const youtube = ['fZeeDKMPV7k']
    const instagram = ['https://www.instagram.com/p/DVOswHPDpNh/']

    await prisma.setting.upsert({
      where: { id: 'youtube.videos' },
      update: { value: youtube },
      create: { id: 'youtube.videos', value: youtube },
    })

    await prisma.setting.upsert({
      where: { id: 'instagram.reels' },
      update: { value: instagram },
      create: { id: 'instagram.reels', value: instagram },
    })

    console.log('Seed social OK:', { youtube, instagram })
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
