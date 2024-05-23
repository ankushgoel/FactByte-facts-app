import { useState, useEffect } from 'react'

import supabase from './supabase'
import Header from './components/Header'
import NewFactForm from './components/NewFactForm'
import Factslist from './components/Factslist'

import Spinner from './components/Spinner'

import { CATEGORIES } from './data'
import './App.css'
import './style.css'

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [currentCategory, setCurrentCategory] = useState("all")

  useEffect(() => {
    async function getFacts() {
      setIsLoading(true);
      let query = supabase.from('facts').select('*')
      if (currentCategory !== "all") {
        query = query.eq("category", currentCategory)
      }
      let { data: facts, error } = await query
        .order('text', { ascending: false })
        .limit(1000);
      // console.log(facts);
      if (!error) {
        setFacts(facts);
      }
      else {
        alert("There was a problem while getting the data")
      }
      setIsLoading(false);
    }

    getFacts()
    console.log('getfacts useeffect');
  }, [currentCategory])

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ?
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} /> : null}
      <main>
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? <Loader isLoading={isLoading} /> : <Factslist facts={facts} setFacts={setFacts} currentCategory={currentCategory} />}
      </main>
    </>
  )
}

function Loader({ isLoading }) {
  return <div>
    <Spinner loading={isLoading} />
    <p className='loader'>Loading...</p>
  </div>

}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li><button className="btn btn-categories btn-all font-bold" onClick={() => setCurrentCategory("all")}>All</button></li>
        <br />
        {CATEGORIES.map((cat) => (
          <li key={cat.name}><button className={`btn btn-categories font-bold ${cat.name}`} onClick={() => setCurrentCategory(cat.name)}>{cat.name}</button></li>
          // <button className="btn btn-categories"> style={{backgroundColor: cat.color}}{cat.name}</button>
        ))}
      </ul>
    </aside>
  )
}


export default App