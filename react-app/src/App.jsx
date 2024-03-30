import { useState } from 'react'
import logo from '/logo.png'
import { initialFacts, CATEGORIES } from './data'
import './App.css'
import './style.css'

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ?
        <NewFactForm /> : null}
      <main>
        <CategoryFilter />
        <Factslist />
      </main>
    </>
  )
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

function NewFactForm() {
  return (
    <form className="">
      <input type="text" placeholder="Share a fact here" />
      <input type="text" placeholder="Share your Trustworthy Source here" />
      <select name="" id="">
        <option value="">Choose Category:</option>
        <option value="technology">Technology</option>
        <option value="science">Science</option>
        <option value="finance">Finance</option>
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

function Factslist() {
  const facts = initialFacts;
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
