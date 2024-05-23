/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

import supabase from './supabase'
import Header from './components/Header'
import NewFactForm from './components/NewFactForm'
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
    getFacts()
  }, [currentCategory])

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

function Factslist({ facts, setFacts, currentCategory }) {
  // const facts = initialFacts;
  if (facts.length === 0 && currentCategory !== "all") {
    return <p className="message">No facts for this category yet! Maybe You can create the first one.</p>
  }
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database</p>
    </section>
  )
}

function Fact(props) {
  const { fact, setFacts } = props;
  const [isUpdating, setIsUpdating] = useState(false)
  const isDisputed = fact.up_votes + fact.mindblowing_votes < fact.down_votes

  async function handleVote(voteAction) {
    // console.log(voteAction);
    setIsUpdating(true)
    const { data: updatedFact, error } = await supabase
      .from('facts')
      .update({ [voteAction]: fact[voteAction] + 1 })
      .eq('id', fact.id)
      .select();
    setIsUpdating(false);

    if (!error) {
      setFacts((facts) => facts.map((f) => f.id == fact.id ? updatedFact[0] : f))
    }
  }

  return (
    <li className="fact">
      <p>
        {isDisputed ? <span className='disputed'>
          [⛔️DISPUTED]
        </span> : null}
        {fact.text}
        <a className="source"
          href={fact.source}
          target="_blank">(Source)</a>

      </p>
      <span className={`tag ${fact.category}`}>{fact.category}</span>
      <div className="vote-buttons">
        <button onClick={() => handleVote("up_votes")} disabled={isUpdating}>👍 {fact.up_votes}</button>
        <button onClick={() => handleVote("mindblowing_votes")} disabled={isUpdating}>🤯 {fact.mindblowing_votes}</button>
        <button onClick={() => handleVote("down_votes")} disabled={isUpdating}>⛔️ {fact.down_votes}</button>
      </div>
    </li>
  )
}

export default App
