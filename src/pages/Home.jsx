import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Welcome from '../components/Welcome';
import Upload from '../components/Upload';
const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const[isLoggedIn,setIsLoggedIn] = useState(false);
 
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  useEffect(()=>{
    const userId = localStorage.getItem('userId');
    if(userId)setIsLoggedIn(true);
  },[userId])
  const name = localStorage.getItem('name');
  const [activeSection,setActiveSection] = useState('');
  const bodyLanguageTips = [
    {
      id: 1,
      title: "Eye Contact Mastery",
      description: "Maintain natural eye contact to build trust and show confidence. Aim for 60-70% eye contact during conversations.",
      image: "/images/eye-contact.webp",
      path: "https://www.verywellmind.com/understand-body-language-and-facial-expressions-4147228"
    },
    {
      id: 2,
      title: "Power Posture",
      description: "Stand tall with shoulders back and head high. Good posture signals confidence and helps you appear more authoritative.",
      image: "/images/posture.webp",
      path: "https://www.physio-pedia.com/Posture"
    },
    {
      id: 3,
      title: "Purposeful Gestures",
      description: "Use deliberate hand movements to emphasize points. Open palms suggest honesty while pointing can appear aggressive.",
      image: "/images/gestures.webp",
      path: "https://www.scienceofpeople.com/hand-gestures/"
    },
    {
      id: 4,
      title: "Strategic Mirroring",
      description: "Subtly match the other person's posture and gestures to build rapport. This technique creates unconscious connection.",
      image: "/images/mirroring.webp",
      path: "https://childrenscommunitytherapies.uhb.nhs.uk/wp-content/uploads/Mirroring-Strategy.pdf"
    },
    {
      id: 5,
      title: "Facial Expressions",
      description: "Be mindful of your expressions as they reveal emotions. A genuine smile engages your eyes and creates instant connection.",
      image: "/images/facial-expressions.webp",
      path: "https://www.communicationtheory.org/importance-of-facial-expressions-in-communication/"
    },
    {
      id: 6,
      title: "Proximity & Space",
      description: "Respect personal space (typically 18-24 inches). Moving closer signals intimacy, while stepping back creates psychological distance.",
      image: "/images/proximity.webp",
      path: "https://www.skillsyouneed.com/ips/body-language.html"
    }
  ];

  const [isold, setisOld] = useState(false);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`https://skill-craft-backend-pied.vercel.app/api/questions/questions/${userId}`);

        let questionsList = response.data.data.questions;
        if (questionsList) {
          setisOld(true);
        }
      } catch (err) {
        console.error('Error fetching questions:', err);
      }
    };
    fetchQuestions();
  }, []);
  const handleStart = async()=>{

    if(isLoggedIn && isold )navigate('/tracker')
    else if(isLoggedIn &&  !isold) navigate('/upload');
  else navigate('/login')
  }
const newUser = localStorage.getItem('firstTime');
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("savedQuestions");
    localStorage.removeItem("userId");
    navigate('/login')
  }

  const handletracker = () => {
    if(!isLoggedIn)navigate('/login');
    else  navigate('/tracker')
  }

  const handleCreateResume = () => {
    // Option 1: Using window.location for full page redirect
   alert("Under Construction")
  }
  const render = ()=>{
    switch (activeSection){
      case  'upload' : return <Upload/>

    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16">
      <div className="flex items-center">
        <a href="/home" className="flex items-center gap-2">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <span className="text-xl font-bold">SkillCraft</span>
        </a>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-2">
        <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition duration-300 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Home
        </a>
        <button onClick={()=>navigate('/about')} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition duration-300 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          About
        </button>
        <button onClick={handletracker} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition duration-300 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Track
        </button>
        {
          isLoggedIn?( <div className="relative group">
            <button className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition duration-300 flex items-center gap-1" onClick={handleLogout}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Logout
            </button>
          </div>):(null)
        }
       
      </div>
      
      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-500 focus:outline-none transition duration-300"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
    </div>
  </div>
  
  {/* Mobile Navigation */}
  {isMenuOpen && (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a href="#" className=" px-3 py-2 rounded-md text-base font-medium hover:bg-blue-500 transition duration-300 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Home
        </a>
        <button onClick={()=>navigate('/about')} className=" px-3 py-2 rounded-md text-base font-medium hover:bg-blue-500 transition duration-300 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          About
        </button>
        <button onClick={handletracker} className="w-full text-left  px-3 py-2 rounded-md text-base font-medium hover:bg-blue-500 transition duration-300 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Track
        </button>
        {
          isLoggedIn?( <button className="w-full text-left  px-3 py-2 rounded-md text-base font-medium hover:bg-blue-500 transition duration-300 flex items-center gap-2" onClick={handleLogout}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Logout
            </button>):(null)
        }
         
      </div>
    </div>
  )}
</nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Boost Your Career Success
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                Prepare for your dream job with expert interview tips, personality development resources, and career guidance.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                {/* Resume Upload Button */}
                <label className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg flex items-center justify-center" onClick={handleStart}>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Start Preparing
                </label>
                
                {/* Create Resume Button - NEW */}
                {/* <button 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg flex items-center justify-center"
                  onClick={handleCreateResume}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  {/* Don't have a resume? Create one */}
                {/* </button> */} 
              </div>
            </div>
            <div className="flex justify-center">
              <img  src="/images/career-success.png"   alt="Career Success"  className="rounded-2xl shadow-2xl border border-gray-300 p-2 bg-white"  />
            </div>
          </div>
        </div>
      </div>

      {/* Body Language Section */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Master Your Body Language
            </h2>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
              Non-verbal communication makes up to 93% of your message. Learn how to leverage it to your advantage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bodyLanguageTips.map((tip) => (
              <div key={tip.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-56 overflow-hidden">
                  <img src={tip.image} alt={tip.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{tip.title}</h3>
                  <p className="text-gray-700">{tip.description}</p>
                  <div className="mt-4">
                    <Link
                      to={tip.path}
                      className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      <span>Learn more</span>
                      <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SkillCraft</h3>
              <p className="text-gray-400">Helping you succeed in your professional journey.</p>
            </div>           
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-gray-400 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} SkillCraft by Prasham Jain.</p>
          </div>
        </div>
      </footer>
      {
        newUser == 'true' ? (<div>
          <Welcome   newUser = {newUser} username = {name}/>
          </div>) : (null)
      }
    </div>
  );
};

export default HomePage;