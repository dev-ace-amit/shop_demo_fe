import { userService } from '../services/userService';
import Head from 'next/head'

export default function Home() {
  return (
    <main className="p-8">
      <Head>
        <title>Shop Demo</title>
      </Head>
      <h1 className="text-center text-2xl">Welcome <span className="text-[#f9826c]">{userService.userValue.email}</span> To Shopping App </h1>
    </main>
  )
}
