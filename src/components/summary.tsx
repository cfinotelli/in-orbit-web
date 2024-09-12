import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { CheckCircle2, Plus } from 'lucide-react'
import { getSummary } from '../http/get-summary'
import { InOrbitIcon } from './in-orbit-icon'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'

import ptBR from 'dayjs/locale/pt-br'
import { PendingGoals } from './pending-goals'

dayjs.locale(ptBR)

export const Summary = () => {
	const { data: summary } = useQuery({
		queryKey: ['summary'],
		queryFn: getSummary,
		staleTime: 1000 * 60,
	})

	if (!summary) {
		return null
	}

	const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
	const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

	const completedPercentage = summary
		? Math.round((summary.completed / summary.total) * 100)
		: 0

	return (
		<div className="max-w-[480px] py-10 px-5 mx-auto flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<InOrbitIcon />{' '}
					<span className="text-lg font-semibold">
						de {firstDayOfWeek} - {lastDayOfWeek}
					</span>
				</div>
				<DialogTrigger asChild>
					<Button size="sm" variant="primary">
						<Plus className="size-4" />
						Cadastrar meta
					</Button>
				</DialogTrigger>
			</div>

			<div className="flex flex-col gap-3 ">
				<Progress value={summary?.completed} max={summary?.total}>
					<ProgressIndicator
						style={{
							width: `${completedPercentage}%`,
						}}
					/>
				</Progress>

				<div className="flex items-center justify-between text-xs text-zinc-400">
					<span>
						Você completou{' '}
						<span className="font-semibold text-zinc-100">
							{summary?.completed}
						</span>{' '}
						de{' '}
						<span className="font-semibold text-zinc-100">
							{summary?.total}
						</span>{' '}
						metas nessa semana.
					</span>
					<span>{completedPercentage}%</span>
				</div>

				<Separator />

				<PendingGoals />

				<div className="flex flex-col gap-6">
					<h2 className="text-cxxl font-medium">Sua semana</h2>

					{Object.entries(summary.goalsPerDay).map(([date, goals]) => {
						const weekDay = dayjs(date).format('dddd')
						const formattedDate = dayjs(date).format('DD[ de ]MMMM')

						return (
							<div key={date} className="flex flex-col gap-4">
								<h3 className="font-medium">
									<span className="capitalize">{weekDay}</span>{' '}
									<span
										className="text-zinc-400 text-xs
"
									>
										({formattedDate})
									</span>
								</h3>
								<ul className="flex flex-col gap-3">
									{goals.map(goal => {
										const hours = dayjs(goal.completedAt).format(
											'HH:mm'
										)

										return (
											<li
												key={goal.id}
												className="flex items-center gap-2"
											>
												<CheckCircle2 className="size-4 text-pink-500" />
												<span className="text-sm text-zinc-400">
													Você completou "
													<span className="text-zinc-100">
														{goal.title}
													</span>
													" as{' '}
													<span className="text-zinc-100">
														{hours}h
													</span>
													.
												</span>
											</li>
										)
									})}
								</ul>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
