import { ClipboardList, FileText, Package, Tag } from 'lucide-react'
import { useSession } from '../../app/sessionContext.ts'
import { useToast } from '../../components/toast/toastContext.ts'
import ModuleCard from './ModuleCard.tsx'
import RecentUploads from './RecentUploads.tsx'
import styles from './HomePage.module.css'

const MODULES = [
  {
    title: 'GR Invoice Template',
    description: 'Upload the GRPO Excel from SAP and download commercial invoices by container.',
    icon: <FileText size={22} />,
    to: '/gr-invoice',
  },
  {
    title: 'Carhartt GCC',
    description: 'GCC documents for Carhartt shipments.',
    icon: <Package size={22} />,
  },
  {
    title: 'New Styles Extractor',
    description: 'Extract new styles for setup in the system.',
    icon: <Tag size={22} />,
  },
  {
    title: 'Packing List',
    description: 'Packing lists ready to copy and paste into SAP.',
    icon: <ClipboardList size={22} />,
  },
]

export default function HomePage() {
  const { user } = useSession()
  const toast = useToast()
  const firstName = user.name.split(' ')[0]

  return (
    <>
      <h1>Welcome, {firstName}</h1>
      <p className="sub">Choose a tool to get started.</p>

      <div className={styles.modules}>
        {MODULES.map((module, index) => (
          <ModuleCard
            key={module.title}
            index={index}
            {...module}
            onComingSoon={() => toast.show(`${module.title} is coming soon.`, 'info')}
          />
        ))}
      </div>

      <RecentUploads />
    </>
  )
}
