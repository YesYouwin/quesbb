import Layout from './components/Layout'
import javabb from './assets/java_ques.png'
import './css/about.css'

function About() {
  const comment = `This project is created for the sole purpose of studying and is meant
    to provide students who are willing to study, the tools necessary. Please use this
    tool responsibly. If you have any enquiry, discreation or advice. Feel free to
    contact me through discord as I am happy to reply regarding any matter related
    to quesbb.`;
  
  return (
    <Layout>
      <div className="about-page">
      <section className="aboutus">
        <h1 className="heading">About Quesbb</h1>
        <p>{comment}</p>
        <div className="Quotes">
          <p>Let's Make A Place</p>
          <p>Where Learning Isn't A Chore</p>
        </div>
         <figure className="java-memory">
        <img className="imgjav" src={javabb} alt="QuesBB In Java" /> 
          <figcaption>Where it all began.</figcaption>
          </figure>
        </section>

        <section className="about-next">
                  
        </section>
        
      </div>
    </Layout>
  )
}

export default About