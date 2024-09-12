import { Plus } from 'lucide-react'
import letsStart from '../assets/lets-start.svg'
import logo from '../assets/logo-in-orbit.svg'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'

export const EmptyGoals = () => {
	return (
		<div className="h-screen flex flex-col items-center justify-center gap-8">
			<img src={logo} alt="in-orbit" />
			<img src={letsStart} alt="lets-start" />

			<p className="text-zinc-300 leading-relaxed text-center max-w-80">
				Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora
				mesmo?
			</p>

			<DialogTrigger asChild>
				<Button size="default" variant="primary">
					<Plus className="size-4" />
					Cadastrar meta
				</Button>
			</DialogTrigger>
		</div>
	)
}
