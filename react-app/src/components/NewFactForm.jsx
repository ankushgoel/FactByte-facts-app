import { useState } from 'react'
import { CATEGORIES } from '../data'
import supabase from '../supabase'

const NewFactForm = ({ setFacts, setShowForm }) => {
    const [factText, setFactText] = useState("");
    const [factSource, setFactSource] = useState("");
    const [category, setCategory] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const textLength = factText.length;

    async function handleSubmit(e) {
        e.preventDefault();
        if (factText && isValidHttpUrl(factSource) && category && textLength <= 200) {
            // const newFactObj = {
            //   text: factText,
            //   source: factSource,
            //   category,
            //   up_votes: 0,
            //   down_votes: 0,
            //   mindblowing_votes: 0
            // }

            setIsUploading(true)
            //Add fact to DB
            const { data: newFactObj, error } = await supabase
                .from('facts')
                .insert([
                    { text: factText, source: factSource, category },
                ])
                .select()
            setIsUploading(false)
            console.log(newFactObj);
            console.log(error);

            if (!error) {
                setFacts((facts) => [newFactObj[0], ...facts]);

                setFactText("");
                setFactSource("");
                setCategory("")
            }
            setShowForm(false);

        } else {
            alert("Please add valid data before posting!")
        }
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
            <button className="btn font-bold" disabled={isUploading} type="submit">Post</button>
        </form>
    )
}

export default NewFactForm