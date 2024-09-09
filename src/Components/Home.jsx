import React, { useState } from 'react';

const Home = ({ onStartQuiz }) => { 
    const [name, setName] = useState('');
    const [isQuizStarted, setIsQuizStarted] = useState(false);

    function handleStartQuiz() {
        if (name) {
            setIsQuizStarted(true);
            if(name.trim()){
                onStartQuiz(name); 
            }
        }
    }

    return (
        <div className='main-div'>
            {!isQuizStarted ? (
                <div className='home-div'>
                    <h1>Let's Play Quiz</h1>
                    <p>Enter Your Information Below</p>
                    <div className='text-div'>
                        <input 
                            type="text" 
                            placeholder='Enter Your Name' 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required 
                        />
                        <button onClick={handleStartQuiz} type='button'>Let's Start Quiz</button>
                    </div>
                </div>
            ) : (
                <p>Starting the quiz...</p> 
            )}
        </div>
    );
}

export default Home;
