import { useQuery } from '@tanstack/react-query'
import { CreateGoalDialog } from './components/create-goal-dialog'
import { EmptyGoals } from './components/empty-goals'
import { Summary } from './components/summary'
import { Dialog } from './components/ui/dialog'

import { useState } from 'react'
import { getSummary } from './http/get-summary'

export function App() {
	const [opened, setOpened] = useState(false)
	const { data: summary } = useQuery({
		queryKey: ['summary'],
		queryFn: getSummary,
		staleTime: 1000 * 60,
	})

	return (
		<Dialog open={opened} onOpenChange={setOpened}>
			{summary && summary.total > 0 ? <Summary /> : <EmptyGoals />}

			<CreateGoalDialog setOpened={setOpened} />
		</Dialog>
	)
}
