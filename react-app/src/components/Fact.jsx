import { useState } from 'react'

import supabase from '../supabase'

const Fact = (props) => {
    const { fact, setFacts } = props;
    const [isUpdating, setIsUpdating] = useState(false)
    const isDisputed = fact.up_votes + fact.mindblowing_votes < fact.down_votes

    const handleVote = async (voteAction) => {
        setIsUpdating(true)
        try {
            // console.log(voteAction);
            const { data: updatedFact, status, error } = await supabase
                .from('facts')
                .update({ [voteAction]: fact[voteAction] + 1 })
                .eq('id', fact.id)
                .select();
            if (!error && status == 200) {
                setFacts((facts) => facts.map((f) => f.id == fact.id ? updatedFact[0] : f))
            } else {
                throw error;
            }
        } catch (error) {
            // ToDo show error msg via react toastify
            console.log('Error while updating votes', error);
        } finally {
            setIsUpdating(false);
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

export default Fact