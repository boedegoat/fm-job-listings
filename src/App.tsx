import Filter from './components/Filter'
import Header from './components/Header'
import Jobs from './components/Jobs'

const App = () => {
    return (
        <main className='bg-cyan-light-(bg) min-h-screen'>
            <h1 className='sr-only'>Job Listings</h1>
            <Header />
            <Filter />
            <Jobs />
        </main>
    )
}

export default App
