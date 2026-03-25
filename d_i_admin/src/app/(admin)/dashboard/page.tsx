import Link from 'next/link'
import { getClientBaseUrl } from '../../../utils/env'
import AdminDashboard from './AdminDashboard'

export default function DashboardPage() {
  const base = getClientBaseUrl()
  return <AdminDashboard clientBase={base} />
}
