import type { ReactNode } from 'react'

import { Nav, Footer } from '@/components/global'

type MainLayoutProps = { children: ReactNode }
const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<>
			<main className="contents">{children}</main>
		</>
	)
}

export default MainLayout
