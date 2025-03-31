import { Metadata } from 'next'
import { getLegalPages } from '@/services/wordpress'
import LegalPagesClient from './LegalPagesClient'

export const metadata: Metadata = {
  title: 'Documents Légaux | Uclic',
  description: 'Documents légaux et conditions générales de Uclic',
}

export default async function LegalPages() {
  const pages = await getLegalPages()
  
  return <LegalPagesClient />
} 