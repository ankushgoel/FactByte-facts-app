import logo from '/logo.png'

const Header = ({ showForm, setShowForm }) => {
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

export default Header