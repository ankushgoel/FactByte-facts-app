import { useState, useEffect } from 'react'
import supabase from './supabase'

import logo from '/logo.png'
import { initialFacts, CATEGORIES } from './data'
import './App.css'
import './style.css'

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getFacts()
  }, [])

  async function getFacts() {
    setIsLoading(true);
    let { data: facts, error } = await supabase
      .from('facts')
      .select('*')
      .order('text', { ascending: false });
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
        <CategoryFilter />
        {isLoading ? <Loader /> : <Factslist facts={facts} />}
      </main>
    </>
  )
}

function Loader() {
  return <p className='loader'>Loading...</p>
}

function Header({ showForm, setShowForm }) {
  return (
    <header>
      <a href="/" className="logo" >
        <img src={logo} alt="FactByte logo" width="250" />
        {/* <img src="logo.png" alt="FactByte-logo" width="250" /> */}
      </a>
      <button className="btn share-fact-btn font-bold" onClick={() => setShowForm((show) => !show)}>
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  )
}

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
  const [factText, setFactText] = useState("");
  const [factSource, setFactSource] = useState("");
  const [category, setCategory] = useState("")
  const textLength = factText.length;

  function handleSubmit(e) {
    e.preventDefault();
    if (factText && isValidHttpUrl(factSource) && category && textLength <= 200) {
      const newFactObj = {
        text: factText,
        source: factSource,
        category,
        up_votes: 0,
        down_votes: 0,
        mindblowing_votes: 0
      }
      console.log(newFactObj);

      //ToDo - Add fact to DB
      setFacts((facts) => [newFactObj, ...facts]);

      setFactText("");
      setFactSource("");
      setCategory("")
      setShowForm(false);

    } else {
      alert("Please add valid data before posting!")
    }
  }

  return (
    <form className="" onSubmit={handleSubmit}>
      {/* <div> */}
      <input type="text" placeholder="Share a fact here" value={factText}
        onChange={(e) => setFactText(e.target.value)} />
      <span>{200 - textLength}</span>
      {/* </div> */}
      <input type="text" placeholder="Share your Trustworthy Source here" value={factSource}
        onChange={(e) => setFactSource(e.target.value)} />
      <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose Category:</option>
        {CATEGORIES.map((cat) => <option key={cat.name} value={cat.name}>{cat.name.toUpperCase()}</option>)}
      </select>
      <button className="btn font-bold" type="submit">Post</button>
    </form>
  )
}

function CategoryFilter() {
  return (
    <aside>
      <ul>
        <li><button className="btn btn-categories btn-all font-bold">All</button></li>
        <br />
        {CATEGORIES.map((cat) => (
          <li key={cat.name}><button className={`btn btn-categories font-bold ${cat.name}`}>{cat.name}</button></li>
          // <button className="btn btn-categories"> style={{backgroundColor: cat.color}}{cat.name}</button>
        ))}
      </ul>
    </aside>
  )
}

function Factslist({ facts }) {
  // const facts = initialFacts;
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database</p>
    </section>
  )
}

function Fact(props) {
  const { fact } = props;
  return (
    <li className="fact">
      <p>{fact.text}
        <a className="source"
          href={fact.source}
          target="_blank">(Source)</a>

      </p>
      <span className={`tag $.{fact.category}`}>{fact.category}</span>
      <div className="vote-buttons">
        <button>👍 {fact.up_votes}</button>
        <button>🤯 {fact.mindblowing_votes}</button>
        <button>⛔️ {fact.down_votes}</button>
      </div>
    </li>
  )
}

export default App
