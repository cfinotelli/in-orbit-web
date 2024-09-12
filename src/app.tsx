import { useQuery } from '@tanstack/react-query'
import { CreateGoalDialog } from './components/create-goal-dialog'
import { EmptyGoals } from './components/empty-goals'
import { Summary } from './components/summary'
import { Dialog } from './components/ui/dialog'

import { getSummary } from './http/get-summary'

export function App() {
	const { data: summary } = useQuery({
		queryKey: ['summary'],
		queryFn: getSummary,
		staleTime: 1000 * 60,
	})

	return (
		<Dialog>
			{summary && summary.total > 0 ? <Summary /> : <EmptyGoals />}
			<CreateGoalDialog />
		</Dialog>
	)
}
