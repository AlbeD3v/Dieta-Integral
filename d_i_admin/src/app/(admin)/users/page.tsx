import { getClientBaseUrl } from '../../../utils/env'
import UsersList from './UsersList'

export default function UsersPage() {
  const base = getClientBaseUrl()
  return <UsersList clientBase={base} />
}
