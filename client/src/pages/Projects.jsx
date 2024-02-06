import CallToActions from '../components/CallToActions'

export default function Projects() {
  return (
    <div className='flex flex-col gap-4 my-20'>
      <h1 className='text-3xl font-bold text-center '>Projects</h1>
      <p className='text-center text-gray-500 text-xl'>Build fun and engaging projects while learning HTML, CSS and Javascript!</p>
      <div className='flex justify-center p-5'>
        <CallToActions />
      </div>
    </div>
  )
}
