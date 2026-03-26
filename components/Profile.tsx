import React from 'react';

const Profile: React.FC = () => {
  return (
    <section id="profile" className="py-24 px-6 md:px-12 bg-white">
       <div className="max-w-4xl mx-auto">
          <div className="mb-12">
             <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">Profile</span>
             <h2 className="text-3xl font-serif text-neutral-900">The Operator</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div>
                <h3 className="text-sm font-bold uppercase text-neutral-900 mb-6 border-b border-neutral-100 pb-2">Education</h3>
                <div className="space-y-6">
                   <div>
                      <p className="font-medium text-neutral-900">M.S. Human Computer Interaction</p>
                      <p className="text-neutral-500 text-sm">Georgia Tech · 2017-2019</p>
                   </div>
                   <div>
                      <p className="font-medium text-neutral-900">B.A. Industrial Design</p>
                      <p className="text-neutral-500 text-sm">RISD · 2013-2017</p>
                   </div>
                </div>
             </div>

             <div>
                <h3 className="text-sm font-bold uppercase text-neutral-900 mb-6 border-b border-neutral-100 pb-2">Philosophy</h3>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  I believe design is a process of subtraction. My goal is always to reduce the cognitive load required to perform complex tasks.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  Currently obsessed with: AI-assisted workflows, typographic systems, and sustainable computing.
                </p>
             </div>
          </div>
       </div>
    </section>
  );
};

export default Profile;