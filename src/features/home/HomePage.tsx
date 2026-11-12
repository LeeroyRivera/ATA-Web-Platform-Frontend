import { useState } from 'react'
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

function greeting(hour: number) {
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function HomePage() {
  const { user } = useSession()
  const toast = useToast()
  const firstName = user.name.split(' ')[0]
  const [now] = useState(() => new Date())
  const today = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.eyebrow}>{today}</span>
          <h1>
            {greeting(now.getHours())}, {firstName}
          </h1>
          <p>Welcome to the ATA Web Platform. Choose a tool to get started.</p>
        </div>
        <svg className={styles.heroArt} viewBox="0 0 320 200" aria-hidden="true">
          <path d="M40 170 C 120 170, 140 30, 280 30" />
          <path d="M20 140 C 110 140, 150 10, 300 10" />
          <path d="M60 196 C 140 196, 160 60, 300 60" />
        </svg>
      </section>

      <div className={styles.sectionHead}>
        <h2>Tools</h2>
        <span>1 available · 3 coming soon</span>
      </div>
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
