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

export const CreateGoalDialog = () => {
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

				<form className="flex flex-col justify-between flex-1">
					<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<Label htmlFor="title">Qual a atividade?</Label>
							<Input
								id="title"
								autoFocus
								placeholder="Praticar exercicios"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="title">Quantas vezes na semana?</Label>
							<RadioGroup>
								{Array.from({ length: 7 }).map((_, index) => {
									const value = (index + 1).toString()
									return (
										<RadioGroupItem
											key={`radio-item-${value}`}
											value={value}
										>
											<RadioGroupIndicator />
											<span className="text-zinc-300 text-sm font-medium leading-none">
												{value}x na semana
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
