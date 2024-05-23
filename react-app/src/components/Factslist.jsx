import Fact from "./Fact"

const Factslist = ({ facts, setFacts, currentCategory }) => {
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

export default Factslist