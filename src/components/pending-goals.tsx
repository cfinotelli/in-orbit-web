import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { createGoalCompletion } from '../http/create-goal-completion'
import { getPendingGoals } from '../http/get-pending-goals'
import { OutlineButton } from './ui/outline-button'

export const PendingGoals = () => {
	const queryClient = useQueryClient()

	const { data: pendingGoals } = useQuery({
		queryKey: ['pending-goals'],
		queryFn: getPendingGoals,
		staleTime: 1000 * 60,
	})

	async function handleCompleteGoal(goalId: string) {
		await createGoalCompletion(goalId)

		queryClient.invalidateQueries({ queryKey: ['summary'] })
		queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
	}

	return (
		<div className="flex gap-3 flex-wrap">
			{pendingGoals?.map(goal => {
				return (
					<OutlineButton
						key={goal.id}
						onClick={() => handleCompleteGoal(goal.id)}
						disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
					>
						<Plus className="size-4 text-zinc-600" />
						{goal.title}
					</OutlineButton>
				)
			})}
		</div>
	)
}
