import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardPage() {
  const base = process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {["Visitors","Signups","Articles","Revenue"].map((k) => (
        <Card key={k}>
          <CardHeader>
            <CardTitle>{k}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">--</div>
          </CardContent>
        </Card>
      ))}
      <div className="md:col-span-2 xl:col-span-4">
        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Button>Create article</Button>
            <Button variant="outline">Invite user</Button>
          </CardContent>
        </Card>
      </div>

      {/* Preview del cliente dentro del dashboard */}
      <div className="md:col-span-2 xl:col-span-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle>Preview del cliente</CardTitle>
              <Link href="/preview" className="text-sm underline underline-offset-4 opacity-80 hover:opacity-100">
                Abrir vista completa
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border overflow-hidden">
              <iframe
                title="Preview Home"
                src={`${base}/`}
                className="w-full h-[60vh] rounded-xl"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span>Atajos:</span>
              {['/','/planes','/recetas','/articulos','/sobre-mi','/minimal'].map((p) => (
                <Link key={p} href={`/preview?path=${encodeURIComponent(p)}`} className="rounded-full border px-3 py-1 hover:border-black/40">
                  {p === '/' ? 'Home' : p.replace('/','')}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
