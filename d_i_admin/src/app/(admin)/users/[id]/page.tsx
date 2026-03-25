import { getClientBaseUrl } from '../../../../utils/env'
import UserDetail from './UserDetail'

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const base = getClientBaseUrl()
  return <UserDetail userId={id} clientBase={base} />
}
