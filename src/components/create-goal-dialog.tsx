import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createGoal } from '../http/create-goal'
import { Button } from './ui/button'
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
	RadioGroup,
	RadioGroupIndicator,
	RadioGroupItem,
} from './ui/radio-group'

const createGoalFormSchema = z.object({
	title: z.string().min(1, 'Informe o nome da atividade que deseja realizar.'),
	desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
})

type CreateGoalFormData = z.infer<typeof createGoalFormSchema>

interface CreateGoalDialogProps {
	setOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateGoalDialog = ({ setOpened }: CreateGoalDialogProps) => {
	const queryClient = useQueryClient()

	const { register, control, handleSubmit, formState, reset } =
		useForm<CreateGoalFormData>({
			resolver: zodResolver(createGoalFormSchema),
		})

	async function handleSubmitCreateGoal({
		title,
		desiredWeeklyFrequency,
	}: CreateGoalFormData) {
		try {
			await createGoal({
				title,
				desiredWeeklyFrequency,
			})

			queryClient.invalidateQueries({ queryKey: ['summary'] })
			queryClient.invalidateQueries({ queryKey: ['pending-goals'] })

			reset()
			setOpened(false)
		} catch (error) {
			alert('Erro ao cadastrar meta')
		}
	}

	return (
		<DialogContent>
			<div className="flex flex-col gap-6 h-full">
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<DialogTitle>Cadastrar meta</DialogTitle>
						<DialogClose className="size-5 text-zinc-600">x</DialogClose>
					</div>
					<DialogDescription className="">
						Adicione atividades que te fazem bem e que você quer continuar
						praticando toda semana.
					</DialogDescription>
				</div>
				<form
					onSubmit={handleSubmit(handleSubmitCreateGoal)}
					className="flex flex-col justify-between flex-1"
				>
					<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<Label htmlFor="title">Qual a atividade?</Label>
							<Input
								{...register('title')}
								id="title"
								autoFocus
								placeholder="Praticar exercicios"
							/>

							{formState.errors.title && (
								<span className="text-xs text-red-500 flex flex-row gap-2 items-center text-center">
									<AlertCircle className="size-2" />
									{formState.errors.title.message}
								</span>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="title">Quantas vezes na semana?</Label>

							<Controller
								control={control}
								name="desiredWeeklyFrequency"
								render={({ field }) => {
									return (
										<RadioGroup
											onValueChange={field.onChange}
											value={String(field.value)}
											defaultValue={'1'}
										>
											{Array.from({ length: 7 }).map((_, index) => {
												const value = (index + 1).toString()
												return (
													<RadioGroupItem
														key={`radio-item-${value}`}
														value={value}
													>
														<RadioGroupIndicator />
														<span className="text-zinc-300 text-sm font-medium leading-none">
															{value !== '7' ? (
																<>{value}x na semana</>
															) : (
																'Todos os dias da semana'
															)}
														</span>

														<span className="text-lg leading-none">
															{value === '1' && '🥱'}
															{value === '2' && '🙂'}
															{value === '3' && '😎'}
															{value === '4' && '😜'}
															{value === '5' && '🤨'}
															{value === '6' && '🤯'}
															{value === '7' && '🔥'}
														</span>
													</RadioGroupItem>
												)
											})}
										</RadioGroup>
									)
								}}
							/>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<DialogClose asChild>
							<Button variant="secondary" className="flex-1">
								Fechar
							</Button>
						</DialogClose>
						<Button className="flex-1">Salvar</Button>
					</div>
				</form>
			</div>
		</DialogContent>
	)
}
