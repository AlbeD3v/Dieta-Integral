import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const [
      totalUsers,
      usersLast30d,
      usersLast7d,
      onboardedUsers,
      freeUsers,
      premiumUsers,
      totalArticles,
      publishedArticles,
      totalProgressLogs,
      logsLast7d,
      totalBookmarks,
      recentUsers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      prisma.user.count({ where: { onboardingComplete: true } }),
      prisma.user.count({ where: { plan: 'free' } }),
      prisma.user.count({ where: { plan: 'premium' } }),
      prisma.article.count(),
      prisma.article.count({ where: { status: 'published' } }),
      prisma.progressLog.count(),
      prisma.progressLog.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      prisma.bookmark.count(),
      prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, name: true, email: true, image: true, createdAt: true, plan: true },
      }),
    ])

    return NextResponse.json({
      users: {
        total: totalUsers,
        last30d: usersLast30d,
        last7d: usersLast7d,
        onboarded: onboardedUsers,
        free: freeUsers,
        premium: premiumUsers,
      },
      articles: {
        total: totalArticles,
        published: publishedArticles,
      },
      activity: {
        totalLogs: totalProgressLogs,
        logsLast7d,
        totalBookmarks,
      },
      recentUsers,
    })
  } catch (err) {
    console.error('admin stats error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
