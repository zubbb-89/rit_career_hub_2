import React from 'react';

const FeaturesPage: React.FC = () => {
  return (
    <section className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-navy mb-4">Features</h1>
      <ul className="list-disc list-inside space-y-2 text-gray-800">
        <li>AI‑powered career readiness analyzer</li>
        <li>AI resume builder with PDF export</li>
        <li>Personal portfolio websites (MyRITfolio)</li>
        <li>Hackathon & event registration system</li>
        <li>Secure file uploads via Cloudinary</li>
        <li>Payment transaction management (PhonePe QR demo)</li>
        <li>Recruiter portal and talent discovery</li>
        <li>Progressive Web App (installable)</li>
      </ul>
    </section>
  );
};

export default FeaturesPage;
