
interface ICreacteGoalParams {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({ title, desiredWeeklyFrequency }: ICreacteGoalParams) {
  await fetch('http://localhost:3333/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, desiredWeeklyFrequency }),
  })
}