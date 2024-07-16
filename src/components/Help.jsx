import React from 'react';
import '../Styles/Help.css'; 

export default function Help() {
  return (
    <div className="Help-container">
      <h5>How can we help?</h5>
      <p className="Help-paragraph">
        Welcome to our freelancer website! Our platform is designed to help students find freelance opportunities to earn money while gaining valuable experience.
      </p>
      <h6 className="Help-subheader">
        Here are some frequently asked questions:
      </h6>  
      <p className="Help-paragraph">
        <strong>Q: How do I create an account?</strong><br />
        A: Click on the "Sign Up" button on the top right corner of the homepage. Fill in your details, verify your email, and you're ready to start!
      </p>
      <p className="Help-paragraph">
        <strong>Q: How do I find job?</strong><br />
        A: Once logged in, navigate to the "Find Work" section. You can browse projects by category, skills required, or latest postings.
      </p>
      <p className="Help-paragraph">
        <strong>Q:How do I apply to a job ?</strong><br />
        A: After you select a job ,to apply to it click on "apply now" button and give confirmation.Your profile details will be sent to the employer.
      </p>
      <p className="Help-paragraph">
        <strong>Q: How do I contact my employer?</strong><br />
        A: On our website page, you can chat with the employer using live chat.
      </p>
      <p className="Help-paragraph">
        <strong>Q:How do I find talent ?</strong><br />
        A: In in "Find Talent" section you can post details related to your work/job then interested students will apply to it.You can see applicant details in "My Job" section.
      </p>
      <p className="Help-paragraph">
        <strong>Q: Who do I contact for support?</strong><br />
        A: If you need any assistance, you can reach out to our support team through help line numbers. We're here to help!
      </p>
      <br></br>
      <h6 className="Help-subheader">
        Helpline number: +01 234 567 88, +01 234 567 89
      </h6>
    </div>
  );
}
