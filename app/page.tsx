import Hero from './Hero'
import {connection} from 'next/server'

const page = async() => {
  await connection()
  return (
    <div>
      <Hero/>
    </div>
  )
}

export default page