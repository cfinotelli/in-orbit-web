import { CreateGoalDialog } from './components/create-goal-dialog'
import { Summary } from './components/summary'
import { Dialog } from './components/ui/dialog'

export function App() {
	return (
		<Dialog>
			<Summary />
			{/* <EmptyGoals /> */}
			<CreateGoalDialog />
		</Dialog>
	)
}
