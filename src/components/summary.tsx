import { CheckCircle2, Plus } from 'lucide-react'
import { InOrbitIcon } from './in-orbit-icon'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { OutlineButton } from './ui/outline-button'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'

export const Summary = () => {
	return (
		<div className="max-w-[480px] py-10 px-5 mx-auto flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<InOrbitIcon />{' '}
					<span className="text-lg font-semibold">5 a 10 de agosto</span>
				</div>
				<DialogTrigger asChild>
					<Button size="sm" variant="primary">
						<Plus className="size-4" />
						Cadastrar meta
					</Button>
				</DialogTrigger>
			</div>

			<div className="flex flex-col gap-3 ">
				<Progress value={5} max={10}>
					<ProgressIndicator
						style={{
							width: '50%',
						}}
					/>
				</Progress>

				<div className="flex items-center justify-between text-xs text-zinc-400">
					<span>
						Você completou{' '}
						<span className="font-semibold text-zinc-100">8</span> de{' '}
						<span className="font-semibold text-zinc-100">15</span> metas
						nessa semana.
					</span>
					<span>58%</span>
				</div>

				<Separator />

				<div className="flex gap-3 flex-wrap">
					<OutlineButton>
						<Plus className="size-4 text-zinc-600" />
						Nadar
					</OutlineButton>
					<OutlineButton>
						<Plus className="size-4 text-zinc-600" />
						Fazer academia
					</OutlineButton>

					<OutlineButton>
						<Plus className="size-4 text-zinc-600" />
						Fazer compras no mercado nagumo
					</OutlineButton>

					<OutlineButton>
						<Plus className="size-4 text-zinc-600" />
						Ir para a igreja
					</OutlineButton>
				</div>

				<div className="flex flex-col gap-6">
					<h2 className="text-cxxl font-medium">Sua semana</h2>

					<div className="flex flex-col gap-4">
						<h3 className="font-medium ">
							Domingo{' '}
							<span
								className="text-zinc-400 text-xs
"
							>
								(10 de agosto)
							</span>
						</h3>
						<ul className="flex flex-col gap-3">
							<li className="flex items-center gap-2">
								<CheckCircle2 className="size-4 text-pink-500" />
								<span className="text-sm text-zinc-400">
									Você completou "
									<span className="text-zinc-100">
										Fazer compras no mercado nagumo
									</span>
									" as <span className="text-zinc-100">10:30h</span>.
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
