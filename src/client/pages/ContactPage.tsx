import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <section className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold text-navy mb-4">Contact Us</h1>
      <p className="text-gray-800 mb-4">
        Have questions or need support? Reach out to us via the channels below.
      </p>
      <ul className="list-none space-y-2 text-gray-800">
        <li>Email: <a href="mailto:support@ritcareerhub.ai" className="text-violet-600 underline">support@ritcareerhub.ai</a></li>
        <li>Phone: +91 98765 43210</li>
        <li>Address: Rajeev Institute of Technology, Hassan, Karnataka, India</li>
      </ul>
    </section>
  );
};

export default ContactPage;
