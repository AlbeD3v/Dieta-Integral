import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const rows = [
  { id: 1, title: 'Primer artículo', status: 'Draft', updatedAt: '2026-02-01' },
  { id: 2, title: 'Salud integral', status: 'Published', updatedAt: '2026-01-28' },
]

export default function ContentPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Content</CardTitle>
          <Button>New article</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(r => (
              <TableRow key={r.id}>
                <TableCell>{r.title}</TableCell>
                <TableCell>
                  <Badge variant={r.status === 'Published' ? 'default' : 'secondary'}>{r.status}</Badge>
                </TableCell>
                <TableCell>{r.updatedAt}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
